"use client"

// Dependencies
import dayjs from "dayjs"
import { useQuery } from "react-query"
import { useAuth } from "@/context/auth"

// Components
import { FadeIn } from "@/components/Animated"
import OverviewCards from "./_components/OverviewCards"
import TimeSeriesChart from "./_components/TimeSeriesChart"
import TopTags from "./_components/TopTags"
import TopAuthors from "./_components/TopAuthors"

// Services
import {
  GetDashboardOverview,
  GetDashboardTimeseries,
  GetDashboardTopTags,
  GetDashboardTopAuthors,
} from "@/services/dashboard"

// DTOs
import type {
  DashboardOverview,
  DashboardTimeSeriesResponse,
  DashboardTag,
  DashboardAuthor,
} from "@/services/dashboard/dashboard.dto"

const DashboardPage = () => {
  const { user } = useAuth()

  const { data: overview } = useQuery<DashboardOverview>({
    queryKey: ["/dashboard/overview"],
    queryFn: GetDashboardOverview,
  })

  const { data: timeseries } = useQuery<DashboardTimeSeriesResponse>({
    queryKey: ["/dashboard/timeseries"],
    queryFn: () => GetDashboardTimeseries({ range: "30d", interval: "day" }),
  })

  const { data: tags } = useQuery<DashboardTag[]>({
    queryKey: ["/dashboard/top-tags"],
    queryFn: () => GetDashboardTopTags(20),
  })

  const { data: authors } = useQuery<DashboardAuthor[]>({
    queryKey: ["/dashboard/top-authors"],
    queryFn: () => GetDashboardTopAuthors(10),
  })

  const getGreeting = () => {
    const hour = dayjs().hour()
    if (hour < 12) return "Good morning"
    if (hour < 18) return "Good afternoon"
    return "Good evening"
  }

  return (
    <FadeIn>
      <header className="mb-8">
        <h1 className="text-2xl font-medium text-neutral-600">
          {getGreeting()}, {user?.user.name?.split(" ")[0]} 👋
        </h1>
        <p className="text-sm text-neutral-600 dark:text-neutral-400 -mt-1">
          Track the main indicators and alerts.
        </p>
      </header>

      <div className="space-y-8">
        {overview && <OverviewCards data={overview} />}
        {timeseries && <TimeSeriesChart data={timeseries} />}
        {tags && <TopTags data={tags} />}
        {authors && <TopAuthors data={authors} />}
      </div>
    </FadeIn>
  )
}

export default DashboardPage
