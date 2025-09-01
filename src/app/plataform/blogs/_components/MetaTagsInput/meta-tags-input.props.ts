import type { Control, FieldError, FieldValues, Path } from 'react-hook-form'

export interface MetaTagsInputProps<T extends FieldValues = FieldValues> {
  control: Control<T>
  name: Path<T>
  label?: string
  error?: FieldError
}

