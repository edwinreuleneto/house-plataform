"use client"

import { toast, Toaster } from "sonner"

interface NotificationProps {
  show: boolean
  message: string
  description?: string
  type: "success" | "error" | "info"
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'top-center' | 'bottom-center',
  onClose: () => void
}

const Notification = ({ show, message, description = "", type, onClose, position = 'bottom-right' }: NotificationProps) => {
  if (show) {
    switch (type) {
      case "success":
        toast.success(message, {
          description: description,
          onDismiss: onClose,
          position: position
        })
        break
      case "error":
        toast.error(message, {
          description: description,
          onDismiss: onClose,
          position: position
        })
        break
      case "info":
        toast.info(message, {
          description: description,
          onDismiss: onClose,
          position: position
        })
        break
      default:
        toast(message, {
          description: description,
          onDismiss: onClose,
          position: position
        })
    }
  }

  return <Toaster />
}

// Export a function to directly call toasts without the component
export const showNotification = (type: "success" | "error" | "info", message: string, description?: string) => {
  switch (type) {
    case "success":
      toast.success(message, { description })
      break
    case "error":
      toast.error(message, { description })
      break
    case "info":
      toast.info(message, { description })
      break
    default:
      toast(message, { description })
  }
}

export default Notification

