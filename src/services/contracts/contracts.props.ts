export interface Attachment {
  id: string
  name: string
  url: string
}

export interface UploadAttachmentResponse extends Attachment {}

export interface Contract {
  id: string
  companyName: string
  description: string
  website: string
  startDate: string
  endDate: string
  attachments?: Attachment[]
}

export interface ContractDTO {
  companyName: string
  description: string
  website: string
  startDate: string
  endDate: string
  attachmentIds?: string[]
}

export interface GetContractsFilters {
  page?: number
  limit?: number
}

export interface GetContractsResponse {
  data: Contract[]
  page: number
  totalPages: number
}
