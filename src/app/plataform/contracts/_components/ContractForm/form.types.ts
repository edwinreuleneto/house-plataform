export interface ContractFormValues {
  companyName: string
  description: string
  website: string
  startDate: string
  endDate: string
  attachmentIds?: string[]
}

export interface ContractFormProps {
  contractId?: string
  defaultValues?: ContractFormValues
}
