import type { Control, FieldValues, Path } from 'react-hook-form'

export interface RichTextEditorProps<T extends FieldValues = FieldValues> {
  control: Control<T>
  name: Path<T>
  label?: string
  placeholder?: string
}

