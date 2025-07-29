'use client';

// Dependencies
import { useMutation } from 'react-query';
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

// Components
import InputComponent from "@/components/Form/Input/InputComponent"
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import Image from 'next/image'

// Context
import { useAuth } from '@/context/auth';
import { useNotification } from '@/context/notification';

// Schema
import FormAuthSchema from "./schema"

// Types
import { AuthFirebaseLoginAndPasswordProps } from "@/services/firebase/firebase.interface";
import { FormAuthProps } from "./form.types";

// Services
import { AuthLoginAndPassword, signInWithMicrosoft } from "@/services/firebase";
import Button from '@/components/Form/Button';


const LoginForm = () => {
  const searchParams = useSearchParams()
  const emailParam = searchParams.get('email') ?? ''

  const {
      handleSubmit,
      control,
      formState: { errors },
    } = useForm<FormAuthProps>({
    resolver: zodResolver(FormAuthSchema),
    defaultValues: {
      email: emailParam,
      password: "",
    },
  })

  // Context
  const { login } = useAuth();
  const { showNotification } = useNotification();

  const mutation = useMutation((data: AuthFirebaseLoginAndPasswordProps) => AuthLoginAndPassword(data), {
    onSuccess: (data) => {
      login(data);
    },
    onError: () => {
      showNotification('Erro de autenticação', 'error', 'Verifique suas credenciais e tente novamente.');
    },
  });

  const mutationMicrosoft = useMutation(() => signInWithMicrosoft(), {
    onSuccess: (data) => {
      if (data) {
        console.log('data', data);
        login(data);
      }
    },
    onError: () => {
      showNotification('Erro de autenticação', 'error', 'Tente novamente.');
    },
    onSettled: () => {
      // showNotification('Erro de autenticação', 'error', 'Tente novamente.');
    }
  });

  return (
    <>
      <>
        <div>
          <form onSubmit={handleSubmit((e) => mutation.mutate(e))} className="space-y-4">
            <div>
              <InputComponent
                label="E-mail"
                name="email"
                control={control}
                placeholder="email@houser.com"
                type="email"
                inputType="default"
                error={errors.email}
              />
            </div>

            <div>
              <InputComponent
                label="Senha"
                name="password"
                control={control}
                placeholder="••••••••"
                type="password"
                inputType="default"
                error={errors.password}
              />
            </div>

            <div className="flex items-center justify-end -mt-2">
              <div className="text-sm/4">
                <Link href="/forgot-password" className="text-sm font-medium text-neutral-700 hover:text-neutral-800">
                  Esqueceu a senha?
                </Link>
              </div>
            </div>

            <div>
              <Button
                label={'Entrar'}
                size='medium'
                type='submit'
                disabled={!!mutation.isLoading}
                loading={mutation.isLoading}
                variant={'primary'}
              />
            </div>

            {/* <div className='grid justify-center py-0 before:w-full before:h-[1px] before:bg-gray-200 relative before:absolute before:top-[20px] before:z-1'>
              <span className='bg-white p-2 px-6 mx-auto text-sm text-gray-600 z-2'> ou </span>
            </div>

            <div>
              <Button
                label={'Entrar com Microsoft'}
                size='medium'
                type='button'
                disabled={!!mutationMicrosoft.isLoading}
                loading={mutationMicrosoft.isLoading}
                variant={'link'}
                onClick={() => mutationMicrosoft.mutate()}
                icon={<Image src="/images/icons/microsoft-svgrepo-com.svg" alt="Microsoft" width={20} height={20} />}
              />
            </div> */}
          </form>
        </div>
      </>
    </>
  )
}

export default LoginForm;
