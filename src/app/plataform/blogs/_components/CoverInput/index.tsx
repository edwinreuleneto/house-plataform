'use client'

import { useCallback, useMemo, useRef, useState } from 'react'
import type { CoverInputProps } from './cover-input.props'

const CoverInput = ({ label = 'Cover', accept = 'image/*', maxSizeMB = 5, previewUrl, onChange }: CoverInputProps) => {
  const [filePreview, setFilePreview] = useState<string | null>(previewUrl || null)
  const [error, setError] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const acceptList = useMemo(() => accept.split(',').map((t) => t.trim()), [accept])

  const validate = useCallback((file: File) => {
    const isValidType = acceptList.some((type) => file.type.includes(type.replace('image/', '')) || type === file.type || type === 'image/*')
    if (!isValidType) return `Invalid format. Accepted: ${accept}`
    const maxBytes = maxSizeMB * 1024 * 1024
    if (file.size > maxBytes) return `File larger than ${maxSizeMB}MB`
    return null
  }, [acceptList, maxSizeMB, accept])

  const handleFile = (file: File | null) => {
    if (!file) {
      setFilePreview(null)
      setError(null)
      onChange(null)
      return
    }
    const v = validate(file)
    if (v) {
      setError(v)
      return
    }
    setError(null)
    const url = URL.createObjectURL(file)
    setFilePreview(url)
    onChange(file)
  }

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const file = e.dataTransfer.files?.[0] || null
    handleFile(file)
  }

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={onDrop}
        className="mt-1 flex flex-col items-center justify-center gap-2 border-2 border-dashed border-gray-300 rounded-md p-4 bg-white hover:bg-gray-50 transition"
      >
        {filePreview ? (
          <img src={filePreview} alt="Cover preview" className="w-full max-h-56 object-contain rounded" />
        ) : (
          <>
            <p className="text-sm text-gray-600">Drag and drop an image here or</p>
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="inline-flex items-center justify-center rounded-md bg-slate-800 px-3 py-2 text-sm font-semibold text-white hover:bg-slate-900"
            >
              Select file
            </button>
            <p className="text-xs text-gray-400">Accepted types: {accept}. Up to {maxSizeMB}MB</p>
          </>
        )}
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          className="hidden"
          onChange={(e) => handleFile(e.target.files?.[0] || null)}
        />
        {filePreview && (
          <div className="flex gap-2 mt-2">
            <button type="button" onClick={() => inputRef.current?.click()} className="text-sm text-blue-600 hover:underline">Change</button>
            <button type="button" onClick={() => handleFile(null)} className="text-sm text-red-600 hover:underline">Remove</button>
          </div>
        )}
        {error && <span className="text-xs text-red-500 mt-1">{error}</span>}
      </div>
    </div>
  )
}

export default CoverInput
