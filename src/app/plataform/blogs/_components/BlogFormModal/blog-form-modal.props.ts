import type { BlogFormProps } from '../BlogForm/form.types'

export interface BlogFormModalProps extends Omit<BlogFormProps, 'onSuccess'> {
  open: boolean
  title?: string
  onClose: () => void
  onSaved?: () => void
}

