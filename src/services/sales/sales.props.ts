export interface Sale {
  id: string
  address: string
  lat: number
  long: number
  responsibleName: string
  phone?: string
}

export interface SaleDTO {
  address: string
  lat?: number
  long?: number
  responsibleName: string
  phone?: string
}

export interface GetSalesFilters {
  address?: string
  lat?: number
  long?: number
  responsibleName?: string
  phone?: string
  page?: number
  limit?: number
}

export interface GetSalesResponse {
  data: Sale[]
  page: number
  totalPages: number
}
