'use client'

// Dependencies
import Skeleton from '@/components/catalyst/skeleton'

const ROWS = 10

const LeadTableSkeleton = () => {
  return (
    <div className="overflow-auto rounded-lg border border-gray-200">
      <table className="min-w-full divide-y divide-gray-100 bg-white table-auto">
        <thead className="bg-gray-50 text-xs font-semibold text-gray-500 uppercase tracking-wide">
          <tr>
            <th className="px-6 py-4 text-left">Order</th>
            <th className="px-6 py-4 text-left">Address</th>
            <th className="px-6 py-4 text-left">Total</th>
            <th className="px-6 py-4 text-right w-14">
              <span className="sr-only">Actions</span>
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
          {Array.from({ length: ROWS }).map((_, index) => (
            <tr key={index} className="hover:bg-gray-50 transition">
              <td className="px-6 py-4"><Skeleton className="h-4 w-20" /></td>
              <td className="px-6 py-4"><Skeleton className="h-4 w-56" /></td>
              <td className="px-6 py-4"><Skeleton className="h-4 w-16" /></td>
              <td className="px-6 py-4 text-right">
                <Skeleton className="h-5 w-5 ml-auto" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default LeadTableSkeleton
