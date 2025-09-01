"use client"

// DTOs
import type { DashboardAuthor } from "@/services/dashboard/dashboard.dto"

interface TopAuthorsProps {
  data: DashboardAuthor[]
}

const TopAuthors = ({ data }: TopAuthorsProps) => {
  return (
    <div className="p-4 bg-white dark:bg-neutral-900 rounded-lg shadow-sm ring-1 ring-gray-200 dark:ring-neutral-800">
      <h2 className="mb-4 text-lg font-medium">Top authors</h2>
      <ul className="space-y-2">
        {data.map((item) => (
          <li key={item.authorId} className="flex justify-between text-sm">
            <span>{item.author.name ?? item.author.email}</span>
            <span>{item.count}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TopAuthors
