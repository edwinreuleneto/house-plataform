'use client'

// Dependencies
import Link from 'next/link'
import { twMerge } from 'tailwind-merge'

// Types
import { ButtonProps } from './Button.interfaces'

const Button = ({
  label,
  type = 'button',
  variant = 'primary',
  size = 'medium',
  loading = false,
  icon,
  to,
  disabled = false,
  onClick,
  className
}: ButtonProps) => {
  const baseStyles = 'flex w-full justify-center rounded-[6px] px-3 py-2 text-sm/6 font-semibold text-white hover:bg-[#0d1321] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 cursor-pointer'

  const variants = {
    primary: 'bg-[#0a0908] text-[#fff1f1] hover:bg-[#282828] focus-visible:outline-[#282828]',
    secondary: 'bg-[#748cab] text-[#f1f1f1] hover:bg-[#5d7089] focus-visible:outline-[#5d7089]',
    danger: 'bg-[#dc2626] text-[#ffffff] hover:bg-[#b91c1c] focus-visible:outline-[#b91c1c]',
    success: 'bg-[#5cb85c] text-[#ffffff] hover:bg-[#4aa94a] focus-visible:outline-[#4aa94a]',
    muted: 'bg-[#d4d4d4] text-[#404040] hover:bg-[#a3a3a3] focus-visible:outline-[#737373]',
    link: 'bg-transparent text-[#1a1a1a] hover:text-[#1a1a1a] shadow-none p-0 hover:bg-gray-100 border border-[#1a1a1a]',
    ghost: 'bg-transparent border-none'
  }

  const sizes = {
    small: 'px-3 py-2 text-sm',
    medium: 'px-4 py-2.5 text-sm',
    large: 'px-6 py-3 text-lg'
  }

  const combinedClasses = twMerge(
    baseStyles,
    variants[variant],
    sizes[size],
    disabled && 'opacity-50 cursor-not-allowed',
    loading && 'cursor-wait',
    className
  )

  const content = loading ? (
    <div className="animate-spin h-5 w-5 border-2 border-current border-t-transparent rounded-full" />
  ) : (
    <div className="flex items-center gap-2">
      {icon}
      {label}
    </div>
  )

  if (to) {
    return (
      <Link
        href={to}
        className={combinedClasses}
        aria-disabled={disabled}
        onClick={(e) => disabled && e.preventDefault()}
        scroll={true}
      >
        {content}
      </Link>
    )
  }

  return (
    <button
      type={type}
      className={combinedClasses}
      disabled={disabled || loading}
      onClick={onClick}
    >
      {content}
    </button>
  )
}

export default Button