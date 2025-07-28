export type ButtonProps = {
  label?: string
  type?: 'submit' | 'button' | 'reset'
  variant: 'primary' | 'secondary' | 'danger' | 'success' | 'muted' | 'link' | 'ghost'
  size?: 'small' | 'medium' | 'large'
  loading?: boolean
  icon?: React.ReactNode
  to?: string
  disabled?: boolean
  onClick?: () => void
  className?: string
}