import type React from 'react'

export interface ListHeaderProps {
  title: string
  subtitle?: string
  buttonLabel: string
  buttonHref?: string
  buttonOnClick?: () => void
  buttonIcon?: React.ReactNode
}
