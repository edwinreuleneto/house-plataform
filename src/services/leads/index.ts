// Dependencies
import { api } from '../api'

// Types
import type { GetLeadsFilters, GetLeadsResponse, Lead } from './leads.props'

// Services
const GetLeads = (filters?: GetLeadsFilters): Promise<GetLeadsResponse> => {
  const params = new URLSearchParams()
  params.append('items', '{}')
  if (filters?.page) params.append('page', String(filters.page))
  if (filters?.limit) params.append('limit', String(filters.limit))

  return api(`/house_estimate?${params.toString()}`, { method: 'GET' })
}

const GetLead = (id: string): Promise<Lead> =>
  api(`/house_estimate/${id}`, { method: 'GET' })

export { GetLeads, GetLead }
