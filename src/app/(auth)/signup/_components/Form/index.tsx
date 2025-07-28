'use client'

// Dependencies
import { useMutation } from 'react-query'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'

// Components
import InputComponent from '@/components/Form/Input/InputComponent'
import Button from '@/components/Form/Button'

// Context
import { useAuth } from '@/context/auth'
import { useNotification } from '@/context/notification'

// Services
import { SignUpUser } from '@/services/auth'
import { signUpWithMicrosoft } from '@/services/firebase'

// Schema
import SignUpSchema from './schema'
import type { SignUpFormProps } from './form.types'

const SignUpForm = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<SignUpFormProps>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: { name: '', email: '', phone: '', password: '' },
  })

  const { login } = useAuth()
  const { showNotification } = useNotification()

  const mutation = useMutation((data: SignUpFormProps) =>
    SignUpUser({ ...data, threadId: '', provider: 'local' }), {
    onSuccess: (data) => {
      login(data)
    },
    onError: () => {
      showNotification('Erro ao criar conta', 'error')
    },
  })

  const mutationMicrosoft = useMutation(() => signUpWithMicrosoft(), {
    onSuccess: (data) => {
      if (data) {
        login(data)
      }
    },
    onError: () => {
      showNotification('Erro ao criar conta', 'error')
    },
  })

  return (
    <form onSubmit={handleSubmit((e) => mutation.mutate(e))} className="space-y-4">
      <InputComponent
        label="Nome"
        name="name"
        control={control}
        placeholder="Seu nome"
        type="text"
        inputType="default"
        error={errors.name}
      />
      <InputComponent
        label="E-mail"
        name="email"
        control={control}
        placeholder="email@donna.com"
        type="email"
        inputType="default"
        error={errors.email}
      />
      <InputComponent
        label="Senha"
        name="password"
        control={control}
        placeholder="••••••••"
        type="password"
        inputType="default"
        error={errors.password}
      />
      <Button
        label={'Cadastrar'}
        size="medium"
        type="submit"
        disabled={!!mutation.isLoading}
        loading={mutation.isLoading}
        variant={'primary'}
      />

      <div className='grid justify-center py-0 before:w-full before:h-[1px] before:bg-gray-200 relative before:absolute before:top-[20px] before:z-1'>
        <span className='bg-white p-2 px-6 mx-auto text-sm text-gray-600 z-2'> ou </span>
      </div>

      <Button
        label={'Cadastrar com Microsoft'}
        size="medium"
        type="button"
        disabled={!!mutationMicrosoft.isLoading}
        loading={mutationMicrosoft.isLoading}
        variant={'link'}
        onClick={() => mutationMicrosoft.mutate()}
        icon={<Image src="/images/icons/microsoft-svgrepo-com.svg" alt="Microsoft" width={20} height={20} />}
      />
    </form>
  )
}

export default SignUpForm
