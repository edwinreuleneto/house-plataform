export interface LeadAddress {
  placeId: string
  zipCode: string
  addressLine1: string
  addressLine2: string
  country: string
  shortCountry: string
  state: string
  shortState: string
  city: string
  shortCity: string
  formatedAddress: string
  latitude: number
  longitude: number
}

export interface LeadProperty {
  image?: string
  origin?: string
  description?: string
  livingAreaValue?: number
  propertyType?: string
}

export interface LeadItem {
  id: number
  idItem: number
  label: string
  title: string
  value: string
  multiple: number
  valueAdicional: number
  summaryLabel: string
}

export interface Lead {
  _id: string
  orderID: string
  status: string
  initialValue?: number
  total: number
  discount?: number
  invoiceStatus?: string
  address: LeadAddress
  statusApprovedInvoice?: boolean
  acceptSMS?: boolean
  photos?: string[]
  statusPayment?: string
  suggestionSchedule?: unknown[]
  property: LeadProperty[]
  items: LeadItem[]
  /** Personal information */
  name?: string
  email?: string
  phone?: string
  isHomeOwner?: boolean
  productType?: string
  roof?: string
  roofColor?: string
  step?: string
  /** Billing info */
  fileInvoice?: string
  idPayment?: string
  invoiceDueDate?: string
  invoiceStartDate?: string
  urlPayment?: string
}

export interface GetLeadsFilters {
  page?: number
  limit?: number
}

export interface GetLeadsResponse {
  data: Lead[]
  page: number
  totalPages: number
}
