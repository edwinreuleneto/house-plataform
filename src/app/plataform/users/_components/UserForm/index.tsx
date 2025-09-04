'use client'

import { useMutation } from 'react-query'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

// Components
import InputComponent from '@/components/Form/Input/InputComponent'
import Button from '@/components/Form/Button'

// Context
import { useNotification } from '@/context/notification'

// Services
import { SignUpUser } from '@/services/auth'

// Types & Schema
import type { UserFormValues } from './form.types'
import UserSchema from './schema'

interface Props {
  onSuccess?: () => void
}

const UserForm = ({ onSuccess }: Props) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFormValues>({
    resolver: zodResolver(UserSchema),
    defaultValues: { name: '', email: '', password: '' },
  })

  const { showNotification } = useNotification()

  const mutation = useMutation((payload: UserFormValues) => SignUpUser(payload), {
    onSuccess: () => {
      showNotification('Usuário criado com sucesso', 'success')
      onSuccess?.()
    },
    onError: (err: any) => {
      const msg = String(err?.message || '')
      const conflict = msg.includes('409') || msg.includes('email-already-exists')
      showNotification(conflict ? 'Este e-mail já está em uso' : 'Falha ao criar usuário', 'error')
    },
  })

  return (
    <form onSubmit={handleSubmit((data) => mutation.mutate(data))} className="space-y-4 max-w-sm">
      <InputComponent
        label="Nome"
        name="name"
        control={control}
        placeholder="Nome completo"
        type="text"
        inputType="default"
        required
        error={errors.name}
      />
      <InputComponent
        label="E-mail"
        name="email"
        control={control}
        placeholder="email@houser.com"
        type="email"
        inputType="default"
        required
        error={errors.email}
      />
      <InputComponent
        label="Senha"
        name="password"
        control={control}
        placeholder="••••••••"
        type="password"
        inputType="default"
        required
        error={errors.password}
      />
      <Button label="Criar usuário" type="submit" variant="primary" loading={mutation.isLoading} />
    </form>
  )
}

export default UserForm

