// Dependencies
import { api } from '../api'

// Types
import type {
  ContractDTO,
  GetContractsFilters,
  GetContractsResponse,
  Contract,
  UploadAttachmentResponse,
} from './contracts.props'

// Services
const GetContracts = (filters?: GetContractsFilters): Promise<GetContractsResponse> => {
  const params = new URLSearchParams()
  if (filters?.page) params.append('page', String(filters.page))
  if (filters?.limit) params.append('limit', String(filters.limit))

  const query = params.size ? `?${params.toString()}` : ''

  return api(`/contracts${query}`, { method: 'GET' })
}

const GetContract = (id: string): Promise<Contract> =>
  api(`/contracts/${id}`, { method: 'GET' })

const CreateContract = (data: ContractDTO): Promise<Contract> =>
  api('/contracts', { method: 'POST', body: data })

const UpdateContract = (id: string, data: Partial<ContractDTO>): Promise<Contract> =>
  api(`/contracts/${id}`, { method: 'PATCH', body: data })

const AnalyzeContract = (form: FormData): Promise<Partial<ContractDTO>> =>
  api('/contracts/analyze', { method: 'POST', body: form })

const UploadContractFile = (
  form: FormData,
): Promise<UploadAttachmentResponse> =>
  api('/contracts/file', { method: 'POST', body: form })

export {
  GetContracts,
  GetContract,
  CreateContract,
  UpdateContract,
  AnalyzeContract,
  UploadContractFile,
}
