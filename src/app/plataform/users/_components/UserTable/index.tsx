'use client'

// Dependencies
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { EllipsisVerticalIcon } from 'lucide-react'

// Components
import { Avatar } from '@/components/catalyst/avatar'

// Types
import type { User } from '@/services/users/users.props'
import { Badge } from '@/components/catalyst/badge'

interface UserTableProps {
  users: User[]
}

const UserTable = ({ users }: UserTableProps) => {
  return (
    <div className="overflow-auto rounded-lg border border-gray-200">
      <table className="min-w-full divide-y divide-gray-100 bg-white table-auto">
        <thead className="bg-gray-50 text-xs font-semibold text-gray-500 uppercase tracking-wide">
          <tr>
            <th scope="col" className="px-6 py-4 text-left">Nome</th>
            <th className="px-6 py-4 text-center">Status</th>
            <th className="px-6 py-4 text-right w-14"><span className="sr-only">Ações</span></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
          {users.map((user) => (
            <tr key={user.id} className="hover:bg-gray-50 transition">
              <td className="px-6 py-4 w-[400px]">
                <div className="flex items-center gap-x-3">
                  <div className='relative'>
                    <Avatar
                      src={user.photo?.url}
                      initials={user.name.charAt(0)}
                      className="w-10 h-10 rounded-full bg-gray-100"
                      alt={user.name}
                    />
                    <span className={`w-4 h-4 absolute bg-white rounded-full -bottom-0.5 right-0 before:w-[60%] before:h-[60%] ${!!user.active ? 'before:bg-green-500' : 'before:bg-gray-300'} before:absolute before:left-[20%] before:top-[20%] before:rounded-full`} />
                  </div>
                  <div className='grid'>
                    <p className="font-medium text-slate-800 truncate"> {user.name} </p>
                    <small className='font-medium text-slate-600 truncate'> {user.email?.toLocaleLowerCase()} </small>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 table-cell items-center text-center">
                <Badge color={user.active ? 'green' : 'red'} > {user.active ? 'Ativo' : 'Inativo'} </Badge>
              </td>
              <td className="px-6 py-4 text-right">
                <Menu as="div" className="relative inline-block text-left">
                  <MenuButton className="text-gray-500 hover:text-gray-900">
                    <span className="sr-only">Abrir opções</span>
                    <EllipsisVerticalIcon className="h-5 w-5" />
                  </MenuButton>
                  <MenuItems className="absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
                    <MenuItem>
                      <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        Editar
                      </a>
                    </MenuItem>
                    <MenuItem>
                      <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        Mensagem
                      </a>
                    </MenuItem>
                    <MenuItem>
                      <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        Desativar
                      </a>
                    </MenuItem>
                  </MenuItems>
                </Menu>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default UserTable
