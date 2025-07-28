'use client'

// Dependencies
import { useState } from 'react'
import Link from 'next/link'
import { useQuery } from 'react-query'
import { PlusIcon, PencilIcon } from 'lucide-react'

// Components
import Button from '@/components/Form/Button'
import PaginationControls from '../users/_components/Pagination'

// Services
import { GetContracts } from '@/services/contracts'

// Types
import type { GetContractsResponse } from '@/services/contracts/contracts.props'

const PageContracts = () => {
  const [page, setPage] = useState(1)
  const limit = 10

  const { data } = useQuery<GetContractsResponse>({
    queryKey: ['/contracts', page],
    queryFn: () => GetContracts({ page, limit }),
    keepPreviousData: true,
  })

  return (
    <section>
      <div className="grid grid-cols-[1fr_auto] justify-between items-center mb-6 border-b border-gray-100 pb-4">
        <div>
          <h1 className="text-2xl font-medium">Contracts</h1>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 -mt-1">Complete list of contracts</p>
        </div>
        <Button
          label="New Contract"
          variant="primary"
          size="medium"
          to="/plataform/contracts/new"
          icon={<PlusIcon className="w-4 mr-1" />}
        />
      </div>

      <div className="overflow-auto rounded-lg border border-gray-200">
        <table className="min-w-full divide-y divide-gray-100 bg-white">
          <thead className="bg-gray-50 text-xs font-semibold text-gray-500 uppercase tracking-wide">
            <tr>
              <th className="px-6 py-4 text-left">Company</th>
              <th className="px-6 py-4 text-left">Description</th>
              <th className="px-6 py-4 text-left">Start</th>
              <th className="px-6 py-4 text-left">End</th>
              <th className="px-6 py-4 text-right"><span className="sr-only">Actions</span></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
            {data?.data.map((contract) => (
              <tr key={contract.id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4">{contract.companyName}</td>
                <td className="px-6 py-4">{contract.description}</td>
                <td className="px-6 py-4">{contract.startDate}</td>
                <td className="px-6 py-4">{contract.endDate}</td>
                <td className="px-6 py-4 text-right">
                  <Link href={`/plataform/contracts/${contract.id}/edit`} className="text-gray-500 hover:text-gray-900">
                    <PencilIcon className="h-5 w-5" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {data && data.totalPages > 1 && (
        <PaginationControls page={page} totalPages={data.totalPages} onChange={setPage} />
      )}
    </section>
  )
}

export default PageContracts
