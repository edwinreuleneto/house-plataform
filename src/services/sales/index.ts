// Dependencies
import { api } from '../api'

// Types
import type { GetSalesFilters, GetSalesResponse, Sale } from './sales.props'

// Services
const GetSales = (filters?: GetSalesFilters): Promise<GetSalesResponse> => {
  const params = new URLSearchParams()
  if (filters?.address) params.append('address', filters.address)
  if (typeof filters?.lat === 'number') params.append('lat', String(filters.lat))
  if (typeof filters?.long === 'number') params.append('long', String(filters.long))
  if (filters?.responsibleName) params.append('responsibleName', filters.responsibleName)
  if (filters?.phone) params.append('phone', filters.phone)
  if (filters?.page) params.append('page', String(filters.page))
  if (filters?.limit) params.append('limit', String(filters.limit))

  const query = params.size ? `?${params.toString()}` : ''

  return api(`/sales${query}`, { method: 'GET' })
}

const GetSale = (id: string): Promise<Sale> =>
  api(`/sales/${id}`, { method: 'GET' })

export { GetSales, GetSale }
