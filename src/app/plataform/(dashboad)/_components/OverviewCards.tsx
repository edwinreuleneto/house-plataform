"use client"

// Dependencies
import AnimatedNumber from "@/components/AnimatedNumber"

// DTOs
import type { DashboardOverview } from "@/services/dashboard/dashboard.dto"

interface OverviewCardsProps {
  data: DashboardOverview
}

const OverviewCards = ({ data }: OverviewCardsProps) => {
  const { blogs } = data

  const Kpi = ({ title, value }: { title: string; value: number }) => (
    <div className="p-4 bg-white dark:bg-neutral-900 rounded-lg shadow-sm ring-1 ring-gray-200 dark:ring-neutral-800">
      <p className="text-sm text-neutral-500 dark:text-neutral-400">{title}</p>
      <p className="mt-2 text-2xl font-semibold text-neutral-800 dark:text-neutral-100">
        <AnimatedNumber value={value} />
      </p>
    </div>
  )

  return (
    <div className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Kpi title="Total posts" value={blogs.total} />
        <Kpi title="Created last 30 days" value={blogs.createdLast30Days} />
        <Kpi title="Created last 7 days" value={blogs.createdLast7Days} />
        <Kpi title="Avg. days to publish" value={blogs.avgTimeToPublishDays} />
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div className="p-4 bg-white dark:bg-neutral-900 rounded-lg shadow-sm ring-1 ring-gray-200 dark:ring-neutral-800">
          <p className="mb-2 text-sm text-neutral-500 dark:text-neutral-400">By status</p>
          <ul className="space-y-1 text-sm">
            <li className="flex justify-between"><span>Draft</span><span>{blogs.byStatus.DRAFT}</span></li>
            <li className="flex justify-between"><span>Published</span><span>{blogs.byStatus.PUBLISHED}</span></li>
            <li className="flex justify-between"><span>Archived</span><span>{blogs.byStatus.ARCHIVED}</span></li>
          </ul>
        </div>

        <div className="p-4 bg-white dark:bg-neutral-900 rounded-lg shadow-sm ring-1 ring-gray-200 dark:ring-neutral-800">
          <p className="mb-2 text-sm text-neutral-500 dark:text-neutral-400">Missing</p>
          <ul className="space-y-1 text-sm">
            <li className="flex justify-between"><span>Without cover</span><span>{blogs.missing.withoutCover}</span></li>
            <li className="flex justify-between"><span>Without meta tags</span><span>{blogs.missing.withoutMetaTags}</span></li>
            <li className="flex justify-between"><span>Without social</span><span>{blogs.missing.withoutSocial}</span></li>
          </ul>
        </div>

        <div className="p-4 bg-white dark:bg-neutral-900 rounded-lg shadow-sm ring-1 ring-gray-200 dark:ring-neutral-800">
          <p className="mb-2 text-sm text-neutral-500 dark:text-neutral-400">Social coverage</p>
          <ul className="space-y-1 text-sm">
            <li className="flex justify-between"><span>Posts with social</span><span>{blogs.socialCoverage.blogsWithAnySocial}</span></li>
            <li className="flex justify-between"><span>LinkedIn posts</span><span>{blogs.socialCoverage.linkedinPosts}</span></li>
            <li className="flex justify-between"><span>Instagram posts</span><span>{blogs.socialCoverage.instagramPosts}</span></li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default OverviewCards
