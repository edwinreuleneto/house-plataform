'use client'

// Dependencies
import Link from 'next/link'
import { PencilIcon, Trash2Icon } from 'lucide-react'

// Types
import type { Sale } from '@/services/sales/sales.props'

interface SalesTableProps {
  sales: Sale[]
}

const SalesTable = ({ sales }: SalesTableProps) => {
  return (
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
          {sales.map((sale) => (
            <tr key={sale.id} className="hover:bg-gray-50 transition">
              <td className="px-6 py-4">{sale.address}</td>
              <td className="px-6 py-4">{sale.responsibleName}</td>
              <td className="px-6 py-4 text-right flex justify-end gap-2">
                <Link
                  href={`/plataform/sales/${sale.id}/edit`}
                  className="text-gray-500 hover:text-gray-900"
                >
                  <PencilIcon className="h-5 w-5" />
                </Link>
                <button className="text-gray-500 hover:text-red-600">
                  <Trash2Icon className="h-5 w-5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default SalesTable
