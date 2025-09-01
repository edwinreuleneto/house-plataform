export interface DeleteDialogProps {
  open: boolean
  loading?: boolean
  title?: string
  description?: string
  onCancel: () => void
  onConfirm: () => void
}

