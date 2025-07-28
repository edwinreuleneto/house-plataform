export type FormValues = {
  name: string
  email: string
  company?: string
  message: string
}

export type ModalSupportProps = {
  isOpen: boolean
  onClose: () => void
}