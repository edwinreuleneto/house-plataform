'use client'

// Dependencies
import { Controller, type FieldValues, type Path } from 'react-hook-form'
import { useQuery } from 'react-query'

// Services
import { GetListUser } from '@/services/users'

// Types
import type { AuthorSelectProps } from './author-select.props'
import type { GetUsersResponse } from '@/services/users/users.props'

function AuthorSelect<T extends FieldValues = FieldValues>({ control, name, label = 'Autor', error }: AuthorSelectProps<T>) {
  const { data: users } = useQuery<GetUsersResponse>({
    queryKey: ['/users', 'for-blog-select'],
    queryFn: () => GetListUser({ page: 1, limit: 50 }),
    keepPreviousData: true,
  })

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <Controller
        name={name as Path<T>}
        control={control}
        render={({ field }) => (
          <select
            {...field}
            className={`bg-white border border-neutral-300 text-neutral-900 text-sm h-10 w-full rounded-md py-2 px-3 font-medium outline-none transition-all duration-300 focus:border-[#0b3954] ${error ? 'border-red-500' : ''}`}
          >
            <option value="">Selecione um autor</option>
            {users?.data?.map((u) => (
              <option key={u.id} value={u.id}>{u.name || u.email}</option>
            ))}
          </select>
        )}
      />
      {error?.message && <span className="text-xs text-red-500 mt-1 block">{error.message}</span>}
    </div>
  )
}

export default AuthorSelect

