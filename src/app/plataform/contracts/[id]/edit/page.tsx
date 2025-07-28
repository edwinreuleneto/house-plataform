'use client'

// Dependencies
import { useParams } from 'next/navigation'
import { useQuery } from 'react-query'

// Components
import ContractForm from '../../_components/ContractForm'

// Services
import { GetContract } from '@/services/contracts'
import type { Contract } from '@/services/contracts/contracts.props'

const EditContractPage = () => {
  const params = useParams()
  const id = params?.id as string

  const { data, isFetching } = useQuery<Contract>(['contract', id], () => GetContract(id), { enabled: !!id })

  if (isFetching) return <div>Loading...</div>

  return (
    <section>
      <h1 className="text-2xl font-medium mb-4">Edit Contract</h1>
      {data && (
        <ContractForm
          contractId={id}
          defaultValues={{
            companyName: data.companyName,
            description: data.description,
            website: data.website,
            startDate: data.startDate,
            endDate: data.endDate,
            attachmentIds: data.attachments?.map((att) => att.id) || [],
          }}
        />
      )}
    </section>
  )
}

export default EditContractPage
