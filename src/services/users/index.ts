// Dependencies
import { api } from '../api';

// Types
import type {
  CreateUserDTO,
  GetUsersFilters,
  GetUsersResponse,
} from './users.props';


// Users
const CreateUser = (data: CreateUserDTO) =>
  api('/users', {
    method: 'POST',
    body: data,
  })

const UpdateUser = (id: string, data: Partial<CreateUserDTO>) =>
  api(`/users/${id}`, {
    method: 'PATCH',
    body: data,
  })

const GetListUser = (filters?: GetUsersFilters): Promise<GetUsersResponse> => {
  const params = new URLSearchParams()
  if (filters?.email) params.append('email', filters.email)
  if (typeof filters?.active === 'boolean') params.append('active', String(filters.active))
  if (filters?.page) params.append('page', String(filters.page))
  if (filters?.limit) params.append('limit', String(filters.limit))

  const query = params.size ? `?${params.toString()}` : ''

  return api(`/users${query}`, {
    method: 'GET',
  })
}

const GetUser = (id: string) => api(`users/${id}`, {
  method: 'GET'
});

export {
  GetUser,
  GetListUser,
  CreateUser,
  UpdateUser,
};