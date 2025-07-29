'use client'

// Dependencies
import { useState } from 'react'
import { Plug2Icon, SunIcon } from 'lucide-react'
import { useMutation, useQuery } from 'react-query'

// Components
import Button from '@/components/Form/Button'
import UserTable from './_components/UserTable'
import UserTableSkeleton from './_components/UserTableSkeleton'
import PaginationControls from './_components/Pagination'

// Services
import { GetListUser } from '@/services/users'
import { SyncUsers } from '@/services/graph'

// Types
import type { GetUsersResponse } from '@/services/users/users.props'

const PageUsers = () => {
  const [page, setPage] = useState(1)
  const limit = 10

  const { data, isFetching, refetch } = useQuery<GetUsersResponse>({
    queryKey: ['/users', page],
    queryFn: () => GetListUser({ page, limit }),
    keepPreviousData: true,
  })

  const syncMutation = useMutation(SyncUsers, {
    onSuccess: () => {
      refetch()
    },
  })

  return (
    <section>
      <div className="grid grid-cols-[1fr_auto] justify-between items-center mb-6 border-b border-gray-100 pb-4">
        <div>
          <h1 className="text-2xl font-medium">Colaboradores</h1>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 -mt-1">
            Lista completa de colaboradores
          </p>
        </div>
        <Button
          label="New user"
          variant="primary"
          size="medium"
          icon={<Plug2Icon className={`w-4 mr-0.5 ${syncMutation.isLoading ? 'animate-spin' : ''}`} />}
          onClick={() => syncMutation.mutate()}
        />
      </div>

      {isFetching ? (
        <UserTableSkeleton />
      ) : (
        <UserTable users={data?.data || []} />
      )}

      {data && data.totalPages > 1 && (
        <PaginationControls
          page={page}
          totalPages={data.totalPages}
          onChange={setPage}
        />
      )}
    </section>
  )
}

export default PageUsers
