'use client'

// Dependencies
import { useState } from 'react'
import { useQuery } from 'react-query'

// Components
import PaginationControls from '../users/_components/Pagination'
import SalesTable from './_components/SalesTable'
import SalesTableSkeleton from './_components/SalesTableSkeleton'

// Services
import { GetSales } from '@/services/sales'

// Types
import type { GetSalesResponse } from '@/services/sales/sales.props'

const PageSales = () => {
  const [page, setPage] = useState(1)
  const limit = 10

  const { data, isFetching } = useQuery<GetSalesResponse>({
    queryKey: ['/sales', page],
    queryFn: () => GetSales({ page, limit }),
    keepPreviousData: true,
  })

  return (
    <section>
      <div className="grid grid-cols-[1fr_auto] justify-between items-center mb-6 border-b border-gray-100 pb-4">
        <div>
          <h1 className="text-2xl font-medium">Sales</h1>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 -mt-1">Listagem de vendas</p>
        </div>
      </div>

      {isFetching ? (
        <SalesTableSkeleton />
      ) : (
        <SalesTable sales={data?.data || []} />
      )}

      {data && data.totalPages > 1 && (
        <PaginationControls page={page} totalPages={data.totalPages} onChange={setPage} />
      )}
    </section>
  )
}

export default PageSales
