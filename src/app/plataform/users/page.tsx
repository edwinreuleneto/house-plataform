"use client"

// Dependencies
import { useState } from 'react'
import { PlusIcon } from 'lucide-react'
import { useQuery } from 'react-query'

// Components
import Button from '@/components/Form/Button'
import Drawer from '@/components/catalyst/drawer'
import UserForm from './_components/UserForm'
import UserTable from './_components/UserTable'
import UserTableSkeleton from './_components/UserTableSkeleton'
import PaginationControls from './_components/Pagination'

// Services
import { GetListUser } from '@/services/users'

// Types
import type { GetUsersResponse } from '@/services/users/users.props'

const PageUsers = () => {
  const [page, setPage] = useState(1)
  const [open, setOpen] = useState(false)
  const limit = 10

  const { data, isFetching, refetch } = useQuery<GetUsersResponse>({
    queryKey: ['/users', page],
    queryFn: () => GetListUser({ page, limit }),
    keepPreviousData: true,
  })

  // Sync removido conforme solicitado

  return (
    <section>
      <div className="grid grid-cols-[1fr_auto_auto] gap-2 items-center mb-6 border-b border-gray-100 pb-4">
        <div>
          <h1 className="text-2xl font-medium">Colaboradores</h1>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 -mt-1">
            Lista completa de colaboradores
          </p>
        </div>
        <Button
          label="Add user"
          variant="primary"
          size="medium"
          icon={<PlusIcon className="w-4" />}
          onClick={() => setOpen(true)}
        />
        {/* Botão de Sync removido */}
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

      <Drawer open={open} onClose={() => setOpen(false)}>
        <h2 className="text-lg font-medium mb-4">Adicionar usuário</h2>
        <UserForm onSuccess={() => { setOpen(false); refetch() }} />
      </Drawer>
    </section>
  )
}

export default PageUsers
