"use client"

// Dependencies
import { useEffect, useMemo, useState } from "react"
import dayjs from "dayjs"
import { useAuth } from "@/context/auth"

// UI
import { FadeIn } from "@/components/Animated"
import AnimatedNumber from "@/components/AnimatedNumber"
import { Select } from "@/components/catalyst/select"
import Skeleton from "@/components/catalyst/skeleton"

// Services
import {
  GetDashboardOverview,
  GetDashboardTimeseries,
  GetDashboardTopTags,
  GetDashboardTopAuthors,
  GetEstimateTimeseries,
  GetDashboardReadsTimeseries,
  GetDashboardAccessLast30,
  GetDashboardTotalReads,
} from "@/services/dashboard"

// Components
import OverviewCards from "./_components/OverviewCards"
import TimeSeriesChart from "./_components/TimeSeriesChart"
import TopTags from "./_components/TopTags"
import TopAuthors from "./_components/TopAuthors"

const DashboardPage = () => {
  const { user } = useAuth()

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [overview, setOverview] = useState<Awaited<ReturnType<typeof GetDashboardOverview>> | null>(null)
  const [timeseries, setTimeseries] = useState<Awaited<ReturnType<typeof GetDashboardTimeseries>> | null>(null)
  const [estimateTimeseries, setEstimateTimeseries] = useState<Awaited<ReturnType<typeof GetEstimateTimeseries>> | null>(null)
  const [readsTimeseries, setReadsTimeseries] = useState<Awaited<ReturnType<typeof GetDashboardReadsTimeseries>> | null>(null)
  const [accessLast30, setAccessLast30] = useState<Awaited<ReturnType<typeof GetDashboardAccessLast30>> | null>(null)
  const [totalReads, setTotalReads] = useState<Awaited<ReturnType<typeof GetDashboardTotalReads>> | null>(null)
  const [topTags, setTopTags] = useState<Awaited<ReturnType<typeof GetDashboardTopTags>>>([])
  const [topAuthors, setTopAuthors] = useState<Awaited<ReturnType<typeof GetDashboardTopAuthors>>>([])

  const [range, setRange] = useState<string>('30d')
  const [interval, setInterval] = useState<'day' | 'week' | 'month'>('day')

  const getGreeting = () => {
    const hour = dayjs().hour()
    if (hour < 12) return "Good morning"
    if (hour < 18) return "Good afternoon"
    return "Good evening"
  }

  const categories = useMemo(() => timeseries?.created.map((p) => p.t) ?? [], [timeseries])
  const series = useMemo(() => {
    return [
      { name: 'Created', data: timeseries?.created.map((p) => p.c) ?? [] },
      { name: 'Published', data: timeseries?.published.map((p) => p.c) ?? [] },
    ]
  }, [timeseries])
  const totalsBlogs = useMemo(() => ({
    created: (timeseries?.created ?? []).reduce((acc, p) => acc + p.c, 0),
    published: (timeseries?.published ?? []).reduce((acc, p) => acc + p.c, 0),
  }), [timeseries])

  const estimateCategories = useMemo(() => estimateTimeseries?.requests.map((p) => p.t) ?? [], [estimateTimeseries])
  const estimateSeries = useMemo(() => {
    return [
      { name: 'Estimate requests', data: estimateTimeseries?.requests.map((p) => p.c) ?? [] },
    ]
  }, [estimateTimeseries])
  const totalEstimates = useMemo(() => (estimateTimeseries?.requests ?? []).reduce((acc, p) => acc + p.c, 0), [estimateTimeseries])

  const readsCategories = useMemo(() => readsTimeseries?.reads.map((p) => p.t) ?? [], [readsTimeseries])
  const readsSeries = useMemo(() => {
    return [
      { name: 'Reads', data: readsTimeseries?.reads.map((p) => p.c) ?? [] },
    ]
  }, [readsTimeseries])
  const totalReadsRange = useMemo(() => (readsTimeseries?.reads ?? []).reduce((acc, p) => acc + p.c, 0), [readsTimeseries])

  const fetchAll = async () => {
    setLoading(true)
    setError(null)
    try {
      const [ov, ts, estTs, readsTs, access30, totalR, tags, authors] = await Promise.all([
        GetDashboardOverview(),
        GetDashboardTimeseries({ range, interval }),
        GetEstimateTimeseries({ range, interval }),
        GetDashboardReadsTimeseries({ range, interval }),
        GetDashboardAccessLast30(),
        GetDashboardTotalReads(),
        GetDashboardTopTags(10),
        GetDashboardTopAuthors(10),
      ])
      setOverview(ov)
      setTimeseries(ts)
      setEstimateTimeseries(estTs)
      setReadsTimeseries(readsTs)
      setAccessLast30(access30)
      setTotalReads(totalR)
      setTopTags(tags)
      setTopAuthors(authors)
    } catch (err: any) {
      setError(err?.message ?? 'Failed to load dashboard data')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAll()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [range, interval])

  return (
    <FadeIn>
      <div className="grid grid-cols-[auto_auto] justify-between">
        <header className="flex flex-col gap-2 mb-12">
          <h1 className="text-2xl font-medium text-neutral-600">
            {getGreeting()}, {user?.user?.name?.split(" ")[0] || user?.user?.email || 'User'} 👋
          </h1>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 -mt-2">
            Track the main indicators and alerts.
          </p>
        </header>
      </div>

      {error && (
        <div className="mb-6 p-4 text-sm text-red-700 bg-red-50 rounded-lg border border-red-200 dark:bg-red-900/20 dark:text-red-300 dark:border-red-900/50">
          {error}
        </div>
      )}

      {/* Overview cards */}
      {loading && !overview ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-24" />
          ))}
        </div>
      ) : overview ? (
        <OverviewCards data={overview} />
      ) : null}

      {/* Timeseries with controls */}
      <div className="mt-8 space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-medium text-neutral-700 dark:text-neutral-200">Activity over time</h2>
          <div className="flex items-center gap-2">
            <label className="text-sm text-neutral-600 dark:text-neutral-400">Range</label>
            <Select value={range} onChange={(e) => setRange((e.target as HTMLSelectElement).value)}>
              <option value="7d">7 days</option>
              <option value="30d">30 days</option>
              <option value="12w">12 weeks</option>
              <option value="6m">6 months</option>
              <option value="1y">1 year</option>
            </Select>
            <label className="text-sm text-neutral-600 dark:text-neutral-400 ml-3">Interval</label>
            <Select value={interval} onChange={(e) => setInterval(((e.target as HTMLSelectElement).value as 'day' | 'week' | 'month'))}>
              <option value="day">day</option>
              <option value="week">week</option>
              <option value="month">month</option>
            </Select>
          </div>
        </div>

        {loading && !timeseries ? (
          <Skeleton className="h-[320px]" />
        ) : timeseries ? (
          <div className="space-y-2">
            <div className="text-sm text-neutral-600 dark:text-neutral-400">
              In range: Created <span className="font-medium"><AnimatedNumber value={totalsBlogs.created} /></span> · Published <span className="font-medium"><AnimatedNumber value={totalsBlogs.published} /></span>
            </div>
            <TimeSeriesChart
              categories={categories}
              series={series}
              height={320}
              type="area"
              colors={["#3b82f6", "#10b981"]}
            />
          </div>
        ) : null}
      </div>

      {/* Estimate requests timeseries */}
      <div className="mt-8 space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-medium text-neutral-700 dark:text-neutral-200">Estimate requests over time</h2>
          <div className="text-sm text-neutral-600 dark:text-neutral-400">In range: <span className="font-medium"><AnimatedNumber value={totalEstimates} /></span></div>
        </div>

        {loading && !estimateTimeseries ? (
          <Skeleton className="h-[320px]" />
        ) : estimateTimeseries ? (
          <TimeSeriesChart categories={estimateCategories} series={estimateSeries} height={320} type="area" colors={["#f59e0b"]} />
        ) : null}
      </div>

      {/* Reads timeseries */}
      <div className="mt-8 space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-medium text-neutral-700 dark:text-neutral-200">Reads over time</h2>
          <div className="text-sm text-neutral-600 dark:text-neutral-400">In range: <span className="font-medium"><AnimatedNumber value={totalReadsRange} /></span></div>
        </div>

        {loading && !readsTimeseries ? (
          <Skeleton className="h-[320px]" />
        ) : readsTimeseries ? (
          <TimeSeriesChart categories={readsCategories} series={readsSeries} height={320} type="area" colors={["#8b5cf6"]} />
        ) : null}
      </div>

      {/* Access last 30 days */}
      <div className="mt-8 space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-medium text-neutral-700 dark:text-neutral-200">Access (last 30 days)</h2>
        </div>
        <div className="grid gap-6 sm:grid-cols-3">
          {loading && !accessLast30 ? (
            <>
              <Skeleton className="h-24" />
              <Skeleton className="h-24" />
              <Skeleton className="h-24" />
            </>
          ) : accessLast30 ? (
            <>
              <div className="p-4 bg-white dark:bg-neutral-900 rounded-lg shadow-sm ring-1 ring-gray-200 dark:ring-neutral-800">
                <p className="text-sm text-neutral-500 dark:text-neutral-400">Views</p>
                <p className="mt-2 text-2xl font-semibold text-neutral-800 dark:text-neutral-100"><AnimatedNumber value={accessLast30.views} /></p>
              </div>
              <div className="p-4 bg-white dark:bg-neutral-900 rounded-lg shadow-sm ring-1 ring-gray-200 dark:ring-neutral-800">
                <p className="text-sm text-neutral-500 dark:text-neutral-400">Reads</p>
                <p className="mt-2 text-2xl font-semibold text-neutral-800 dark:text-neutral-100"><AnimatedNumber value={accessLast30.reads} /></p>
              </div>
              <div className="p-4 bg-white dark:bg-neutral-900 rounded-lg shadow-sm ring-1 ring-gray-200 dark:ring-neutral-800">
                <p className="text-sm text-neutral-500 dark:text-neutral-400">Total</p>
                <p className="mt-2 text-2xl font-semibold text-neutral-800 dark:text-neutral-100"><AnimatedNumber value={accessLast30.total} /></p>
              </div>
            </>
          ) : null}
        </div>
        {totalReads && (
          <p className="text-sm text-neutral-600 dark:text-neutral-400">All-time reads: <span className="font-medium"><AnimatedNumber value={totalReads.total} /></span></p>
        )}
      </div>

      {/* Top tags and authors */}
      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        {loading && topTags.length === 0 ? (
          <Skeleton className="h-60" />
        ) : (
          <TopTags data={topTags} />
        )}

        {loading && topAuthors.length === 0 ? (
          <Skeleton className="h-60" />
        ) : (
          <TopAuthors data={topAuthors} />
        )}
      </div>
    </FadeIn>
  );
};

export default DashboardPage;
