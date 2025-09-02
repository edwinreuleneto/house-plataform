'use client'

// Dependencies
import { useMutation } from 'react-query'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'

// Components
import InputComponent from '@/components/Form/Input/InputComponent'
import Button from '@/components/Form/Button'

// Context
import { useNotification } from '@/context/notification'

// Services
import {
  CreateContract,
  UpdateContract,
  AnalyzeContract,
  UploadContractFile,
} from '@/services/contracts'

// Schema
import ContractSchema from './schema'
import type { ContractFormValues, ContractFormProps } from './form.types'
import type { Attachment } from '@/services/contracts/contracts.props'

const ContractForm = ({ contractId, defaultValues }: ContractFormProps) => {
  const router = useRouter()
  const { showNotification } = useNotification()

  const [attachmentIds, setAttachmentIds] = useState<string[]>(
    defaultValues?.attachmentIds || [],
  )
  const [attachments, setAttachments] = useState<Attachment[]>([])

  const { control, handleSubmit, setValue, formState: { errors } } =
    useForm<ContractFormValues>({
      resolver: zodResolver(ContractSchema),
      defaultValues: {
        companyName: '',
        description: '',
        website: '',
        startDate: '',
        endDate: '',
        attachmentIds: [],
        ...defaultValues,
      },
    })

  const mutation = useMutation((data: ContractFormValues) => {
    const payload = { ...data, attachmentIds, website: data.website ?? '' }
    return contractId ? UpdateContract(contractId, payload) : CreateContract(payload)
  }, {
      onSuccess: () => {
        showNotification('Contract saved', 'success')
        router.push('/plataform/contracts')
      },
      onError: () => {
        showNotification('Error saving contract', 'error')
      },
    })

  const analyzeMutation = useMutation(AnalyzeContract, {
    onSuccess: (data) => {
      if (!data) return
      if (data.companyName) setValue('companyName', data.companyName)
      if (data.description) setValue('description', data.description)
      if (data.website) setValue('website', data.website)
      if (data.startDate) setValue('startDate', data.startDate)
      if (data.endDate) setValue('endDate', data.endDate)
    },
    onError: () => {
      showNotification('Failed to analyze contract', 'error')
    },
  })

  const uploadMutation = useMutation(UploadContractFile, {
    onSuccess: (data) => {
      setAttachmentIds((prev) => [...prev, data.id])
      setAttachments((prev) => [...prev, data])
    },
    onError: () => {
      showNotification('Failed to upload file', 'error')
    },
  })

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    files.forEach((file) => {
      const formData = new FormData()
      formData.append('file', file)
      analyzeMutation.mutate(formData)
      uploadMutation.mutate(formData)
    })
  }

  return (
    <form onSubmit={handleSubmit((data) => mutation.mutate(data))} className="space-y-4 max-w-lg">
      <div>
        <label className="block text-sm font-medium text-gray-700">Contract file</label>
        <input
          type="file"
          multiple
          onChange={handleFile}
          className="mt-1 block w-full text-sm text-gray-900 border border-gray-300 rounded-md"
        />
        {attachments.length > 0 && (
          <ul className="mt-2 space-y-1 text-sm text-gray-700">
            {attachments.map((att) => (
              <li key={att.id}>{att.name}</li>
            ))}
          </ul>
        )}
      </div>
      <InputComponent
        label="Company name"
        name="companyName"
        control={control}
        inputType="default"
        type="text"
        error={errors.companyName}
      />
      <InputComponent
        label="Description"
        name="description"
        control={control}
        inputType="default"
        type="text"
        error={errors.description}
      />
      <InputComponent
        label="Website"
        name="website"
        control={control}
        inputType="default"
        type="text"
        error={errors.website}
      />
      <InputComponent
        label="Start date"
        name="startDate"
        control={control}
        inputType="datetime"
        type="date"
        error={errors.startDate}
      />
      <InputComponent
        label="End date"
        name="endDate"
        control={control}
        inputType="datetime"
        type="date"
        error={errors.endDate}
      />
      <Button
        label={contractId ? 'Update' : 'Create'}
        size="medium"
        type="submit"
        disabled={!!mutation.isLoading}
        loading={mutation.isLoading}
        variant="primary"
      />
    </form>
  )
}

export default ContractForm
