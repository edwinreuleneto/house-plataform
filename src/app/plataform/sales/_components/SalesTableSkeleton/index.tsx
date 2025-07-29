'use client'

// Dependencies
import Skeleton from '@/components/catalyst/skeleton'

const ROWS = 10

const SalesTableSkeleton = () => (
  <div className="overflow-auto rounded-lg border border-gray-200">
    <table className="min-w-full divide-y divide-gray-100 bg-white">
      <thead className="bg-gray-50 text-xs font-semibold text-gray-500 uppercase tracking-wide">
        <tr>
          <th className="px-6 py-4 text-left">Address</th>
          <th className="px-6 py-4 text-left">Responsible</th>
          <th className="px-6 py-4 text-right w-20">
            <span className="sr-only">Actions</span>
          </th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
        {Array.from({ length: ROWS }).map((_, index) => (
          <tr key={index} className="hover:bg-gray-50 transition">
            <td className="px-6 py-4"><Skeleton className="h-4 w-40" /></td>
            <td className="px-6 py-4"><Skeleton className="h-4 w-24" /></td>
            <td className="px-6 py-4 text-right flex justify-end gap-2">
              <Skeleton className="h-5 w-5" />
              <Skeleton className="h-5 w-5" />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)

export default SalesTableSkeleton
