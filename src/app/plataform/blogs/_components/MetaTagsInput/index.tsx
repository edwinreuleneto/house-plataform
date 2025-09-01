'use client'

import InputComponent from '@/components/Form/Input/InputComponent'
import type { MetaTagsInputProps } from './meta-tags-input.props'
import { type FieldValues } from 'react-hook-form'

function MetaTagsInput<T extends FieldValues = FieldValues>({ control, name, label = 'Meta tags (separadas por vírgula)', error }: MetaTagsInputProps<T>) {
  return (
    <InputComponent
      label={label}
      name={name}
      control={control}
      inputType="default"
      type="text"
      error={error}
    />
  )
}

export default MetaTagsInput

