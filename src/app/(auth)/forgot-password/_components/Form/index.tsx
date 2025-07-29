'use client'

import { useMutation } from 'react-query'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import InputComponent from '@/components/Form/Input/InputComponent'
import Button from '@/components/Form/Button'

import { useNotification } from '@/context/notification'

import ForgotPasswordSchema from './schema'
import type { ForgotPasswordFormProps } from './form.types'
import { forgotPassword } from '@/services/firebase'

const ForgotPasswordForm = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ForgotPasswordFormProps>({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: { email: '' },
  })

  const { showNotification } = useNotification()

  const mutation = useMutation((data: ForgotPasswordFormProps) => forgotPassword(data), {
    onSuccess: () => {
      showNotification('Solicitação enviada', 'success', 'Verifique seu e-mail para redefinir sua senha.')
    },
    onError: () => {
      showNotification('Erro ao solicitar redefinição de senha', 'error')
    },
  })

  return (
    <form onSubmit={handleSubmit((e) => mutation.mutate(e))} className="space-y-6">
      <InputComponent
        label="E-mail"
        name="email"
        control={control}
        placeholder="email@houser.com"
        type="email"
        inputType="default"
        error={errors.email}
      />

      <Button
        label={'Enviar'}
        size="medium"
        type="submit"
        disabled={!!mutation.isLoading}
        loading={mutation.isLoading}
        variant={'primary'}
      />
    </form>
  )
}

export default ForgotPasswordForm
