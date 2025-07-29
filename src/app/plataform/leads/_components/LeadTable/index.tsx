'use client'

// Dependencies
import Link from 'next/link'
import { EyeIcon } from 'lucide-react'

// Types
import type { Lead } from '@/services/leads/leads.props'

interface LeadTableProps {
  leads: Lead[]
}

const LeadTable = ({ leads }: LeadTableProps) => {
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
          {leads.map((lead) => (
            <tr key={lead._id} className="hover:bg-gray-50 transition">
              <td className="px-6 py-4">{lead.orderID}</td>
              <td className="px-6 py-4">{lead.address.formatedAddress}</td>
              <td className="px-6 py-4">${lead.total.toFixed(2)}</td>
              <td className="px-6 py-4 text-right">
                <Link
                  href={`/plataform/leads/${lead._id}`}
                  className="text-gray-500 hover:text-gray-900"
                >
                  <EyeIcon className="h-5 w-5" />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default LeadTable
