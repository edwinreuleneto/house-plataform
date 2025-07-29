'use client'

// Dependencies
import { useState } from 'react'
import { useQuery } from 'react-query'

// Components
import PaginationControls from '../users/_components/Pagination'
import LeadTable from './_components/LeadTable'
import LeadTableSkeleton from './_components/LeadTableSkeleton'

// Services
import { GetLeads } from '@/services/leads'

// Types
import type { GetLeadsResponse } from '@/services/leads/leads.props'

const PageLeads = () => {
  const [page, setPage] = useState(1)
  const limit = 10

  const { data, isFetching } = useQuery<GetLeadsResponse>({
    queryKey: ['/leads', page],
    queryFn: () => GetLeads({ page, limit }),
    keepPreviousData: true,
  })

  return (
    <section>
      <div className="grid grid-cols-[1fr_auto] justify-between items-center mb-6 border-b border-gray-100 pb-4">
        <div>
          <h1 className="text-2xl font-medium">Leads</h1>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 -mt-1">Lista de oportunidades</p>
        </div>
      </div>

      {isFetching ? (
        <LeadTableSkeleton />
      ) : (
        <LeadTable leads={data?.data || []} />
      )}

      {data && data.totalPages > 1 && (
        <PaginationControls page={page} totalPages={data.totalPages} onChange={setPage} />
      )}
    </section>
  )
}

export default PageLeads
