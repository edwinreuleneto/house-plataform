export interface CoverInputProps {
  label?: string
  accept?: string
  maxSizeMB?: number
  previewUrl?: string
  onChange: (file: File | null) => void
}
