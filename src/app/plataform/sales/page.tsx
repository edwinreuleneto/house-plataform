'use client'

// Dependencies
import { useState } from 'react'
import { useQuery } from 'react-query'
import { PlusIcon } from 'lucide-react'

// Components
import PaginationControls from '../users/_components/Pagination'
import SalesTable from './_components/SalesTable'
import SalesTableSkeleton from './_components/SalesTableSkeleton'
import SaleForm from './_components/SaleForm'
import Drawer from '@/components/catalyst/drawer'
import Button from '@/components/Form/Button'

// Services
import { GetSales } from '@/services/sales'

// Types
import type { GetSalesResponse } from '@/services/sales/sales.props'

const PageSales = () => {
  const [page, setPage] = useState(1)
  const [open, setOpen] = useState(false)
  const limit = 10

  const { data, isFetching, refetch } = useQuery<GetSalesResponse>({
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
        <Button
          label="New"
          variant="primary"
          size="medium"
          icon={<PlusIcon className="w-4" />}
          onClick={() => setOpen(true)}
        />
      </div>

      {isFetching ? (
        <SalesTableSkeleton />
      ) : (
        <SalesTable sales={data?.data || []} />
      )}

      {data && data.totalPages > 1 && (
        <PaginationControls page={page} totalPages={data.totalPages} onChange={setPage} />
      )}

      <Drawer open={open} onClose={() => setOpen(false)}>
        <h2 className="text-lg font-medium mb-4">New Sale</h2>
        <SaleForm onSuccess={() => { setOpen(false); refetch() }} />
      </Drawer>
    </section>
  )
}

export default PageSales
