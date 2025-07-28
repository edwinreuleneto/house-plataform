'use client'

import { useEffect } from 'react'
import { useForm as useHookForm, Controller } from 'react-hook-form'
import { useForm as useFormspree, ValidationError } from '@formspree/react'

// Icons
import { CheckCircle2 } from 'lucide-react'

// Components
import Modal from '@/components/Modal'
import InputComponent from '@/components/Form/Input/InputComponent'
import Button from '@/components/Form/Button'
import { Textarea } from '@/components/catalyst/textarea'

// Hook
import { useAuthenticatedUser } from '@/context/auth/_hook/User'

// Types
import { FormValues, ModalSupportProps } from './suport.types'

const ModalSupport = ({ isOpen, onClose }: ModalSupportProps) => {
  const { user } = useAuthenticatedUser()

  const methods = useHookForm<FormValues>({
    defaultValues: {
      name: '',
      email: '',
      company: 'DUX',
      message: '',
    },
  })

  const { control, handleSubmit, formState, reset } = methods
  const [state, submitToFormspree] = useFormspree('mrbqqevd')

  useEffect(() => {
    if (user?.email && user?.name) {
      reset({
        name: user.name,
        email: user.email,
        company: 'DUX',
        message: '',
      })
    }
  }, [user, reset])

  const onSubmit = async (data: FormValues) => {
    await submitToFormspree({ ...data, company: 'DUX' })
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} classNameContent="p-0 max-w-[650px]">
      <section className="w-full rounded-2xl overflow-hidden" id="contact">
        <div className="mb-8 text-left bg-gray-100 p-6 border-b border-b-gray-200">
          <h2 className="text-xl sm:text-4xl font-bold text-neutral-950">Contact Us</h2>
          <p className="text-neutral-400 text-sm">
            Fill out the form below and we`ll get back to you as soon as possible.
          </p>
        </div>
        <div className="pt-0 p-4 px-6">
          {state.succeeded ? (
            <div className="bg-green-50 border border-green-300 text-green-700 px-4 py-6 rounded-md flex items-start gap-3">
              <CheckCircle2 className="w-6 h-6 mt-1 text-green-600" />
              <div>
                <p className="font-medium">Message sent successfully!</p>
                <p className="text-sm">Thanks for reaching out. We`ll get back to you soon.</p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <InputComponent<FormValues>
                control={control}
                name="name"
                label="Full Name"
                required
                placeholder="Your name"
                error={formState.errors.name}
              />

              <InputComponent<FormValues>
                control={control}
                name="email"
                label="Email"
                required
                placeholder="you@example.com"
                type="email"
                inputMode="email"
                error={formState.errors.email}
              />
              <ValidationError prefix="Email" field="email" errors={state.errors} />

              <Controller
                control={control}
                name="company"
                defaultValue="DUX"
                render={() => <></>}
              />

              <div className="grid gap-1.5">
                <label htmlFor="message" className="text-sm font-medium text-neutral-700">
                  Message <span className="text-red-500">*</span>
                </label>
                <Controller
                  control={control}
                  name="message"
                  rules={{ required: 'This field is required' }}
                  render={({ field }) => (
                    <Textarea
                      id="message"
                      placeholder="Type your message here..."
                      rows={4}
                      {...field}
                      autoFocus
                    />
                  )}
                />
                {formState.errors.message && (
                  <span className="text-xs text-red-500 mt-1 block">{formState.errors.message.message}</span>
                )}
                <ValidationError prefix="Message" field="message" errors={state.errors} />
              </div>

              <Button
                variant="primary"
                label={state.submitting ? 'Sending...' : 'Send Message'}
                type="submit"
                disabled={state.submitting}
                className="w-full"
              />
            </form>
          )}
        </div>
      </section>
    </Modal>
  )
}

export default ModalSupport
