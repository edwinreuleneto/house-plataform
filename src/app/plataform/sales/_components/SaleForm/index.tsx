'use client'

// Dependencies
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from 'react-query'

// Components
import InputComponent from '@/components/Form/Input/InputComponent'
import Button from '@/components/Form/Button'

// Services
import { CreateSale } from '@/services/sales'
import { GeocodeAddress } from '@/services/geocode'

// Context
import { useNotification } from '@/context/notification'

// Types
import type { SaleFormProps, SaleFormValues } from './form.types'
import SaleSchema from './schema'

const SaleForm = ({ onSuccess }: SaleFormProps) => {
  const { control, handleSubmit, setValue } = useForm<SaleFormValues>({
    resolver: zodResolver(SaleSchema),
    defaultValues: {
      address: '',
      responsibleName: '',
      phone: '',
    },
  })

  const { showNotification } = useNotification()

  const mutation = useMutation(CreateSale, {
    onSuccess: () => {
      showNotification('Sale created', 'success')
      onSuccess?.()
    },
    onError: () => {
      showNotification('Failed to create sale', 'error')
    },
  })

  const handleAddressBlur = async (value: string) => {
    const coords = await GeocodeAddress(value)
    if (coords) {
      setValue('lat', coords.lat)
      setValue('long', coords.long)
    }
  }

  return (
    <form onSubmit={handleSubmit((data) => mutation.mutate(data))} className="space-y-4 max-w-sm">
      <InputComponent
        label="Address"
        name="address"
        control={control}
        required
        handleBlur={handleAddressBlur}
        inputType="default"
        type="text"
      />
      <InputComponent
        label="Responsible name"
        name="responsibleName"
        control={control}
        required
        inputType="default"
        type="text"
      />
      <InputComponent
        label="Phone"
        name="phone"
        control={control}
        inputType="mask"
      />
      <Button label="Save" type="submit" variant="primary" loading={mutation.isLoading} />
    </form>
  )
}

export default SaleForm
