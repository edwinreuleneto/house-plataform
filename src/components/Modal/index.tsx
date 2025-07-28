'use client'

// Dependencies
import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

// Icons
import { X } from 'lucide-react'

// Componentes
import { BlurFade } from '@/components/magicui/blur-fade'

// Props
import { ModalProps } from './modal.types'

const Modal = ({
  isOpen,
  onClose,
  children,
  classNameWrapper,
  classNameContent,
}: ModalProps) => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    return () => setMounted(false)
  }, [])

  if (!mounted || !isOpen) return null

  return createPortal(
    <BlurFade direction="down" className={`fixed inset-0 z-[9999] bg-black/60 grid items-center max-w-screen max-h-screen ${classNameWrapper ?? ''}`}>
      <div className={`relative m-6 w-full rounded-lg bg-white shadow-lg mx-auto ${classNameContent ?? 'p-6 max-w-4xl'}`}>
        {children}
        <button
          onClick={onClose}
          className="absolute -top-3 -right-3 bg-white p-1.5 rounded-full shadow text-gray-700 hover:bg-gray-100 z-10"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </BlurFade>,
    document.body
  )
}

export default Modal
