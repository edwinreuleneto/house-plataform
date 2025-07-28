export interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
  classNameWrapper?: string
  classNameContent?: string
}