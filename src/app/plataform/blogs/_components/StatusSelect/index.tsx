'use client'

import { Controller, type FieldValues, type Path } from 'react-hook-form'
import type { StatusSelectProps } from './status-select.props'

function StatusSelect<T extends FieldValues = FieldValues>({ control, name, label = 'Status' }: StatusSelectProps<T>) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <Controller
        name={name as Path<T>}
        control={control}
        render={({ field }) => (
          <select
            {...field}
            className="bg-white border border-neutral-300 text-neutral-900 text-sm h-10 w-full rounded-md py-2 px-3 font-medium outline-none transition-all duration-300 focus:border-[#0b3954]"
          >
            <option value="DRAFT">Draft</option>
            <option value="PUBLISHED">Published</option>
            <option value="ARCHIVED">Archived</option>
          </select>
        )}
      />
    </div>
  )
}

export default StatusSelect
