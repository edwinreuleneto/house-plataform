export interface SaleFormValues {
  address: string
  lat?: number
  long?: number
  responsibleName: string
  phone?: string
}

export interface SaleFormProps {
  onSuccess?: () => void
}
