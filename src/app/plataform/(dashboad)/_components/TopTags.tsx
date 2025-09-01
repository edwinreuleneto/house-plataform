"use client"

// DTOs
import type { DashboardTag } from "@/services/dashboard/dashboard.dto"

interface TopTagsProps {
  data: DashboardTag[]
}

const TopTags = ({ data }: TopTagsProps) => {
  return (
    <div className="p-4 bg-white dark:bg-neutral-900 rounded-lg shadow-sm ring-1 ring-gray-200 dark:ring-neutral-800">
      <h2 className="mb-4 text-lg font-medium">Top tags</h2>
      <ul className="space-y-2">
        {data.map((item) => (
          <li key={item.tag} className="flex justify-between text-sm">
            <span>{item.tag}</span>
            <span>{item.count}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TopTags
