import clsx from 'clsx'
import React from 'react'

const colors = {
  red: 'text-red-600 border-red-500 bg-transparent',
  orange: 'text-orange-600 border-orange-500 bg-transparent',
  amber: 'text-amber-600 border-amber-400 bg-transparent',
  yellow: 'text-yellow-600 border-yellow-400 bg-transparent',
  lime: 'text-lime-600 border-lime-500 bg-transparent',
  green: 'text-green-600 border-green-500 bg-transparent',
  emerald: 'text-emerald-600 border-emerald-500 bg-transparent',
  teal: 'text-teal-600 border-teal-500 bg-transparent',
  cyan: 'text-cyan-600 border-cyan-400 bg-transparent',
  sky: 'text-sky-600 border-sky-500 bg-transparent',
  blue: 'text-blue-600 border-blue-500 bg-transparent',
  indigo: 'text-indigo-600 border-indigo-500 bg-transparent',
  violet: 'text-violet-600 border-violet-500 bg-transparent',
  purple: 'text-purple-600 border-purple-500 bg-transparent',
  fuchsia: 'text-fuchsia-600 border-fuchsia-500 bg-transparent',
  pink: 'text-pink-600 border-pink-500 bg-transparent',
  rose: 'text-rose-600 border-rose-500 bg-transparent',
  zinc: 'text-zinc-800 border-zinc-500 bg-transparent',
}

const dots = {
  red: 'bg-red-500',
  orange: 'bg-orange-500',
  amber: 'bg-amber-400',
  yellow: 'bg-yellow-400',
  lime: 'bg-lime-500',
  green: 'bg-green-500',
  emerald: 'bg-emerald-500',
  teal: 'bg-teal-500',
  cyan: 'bg-cyan-400',
  sky: 'bg-sky-500',
  blue: 'bg-blue-500',
  indigo: 'bg-indigo-500',
  violet: 'bg-violet-500',
  purple: 'bg-purple-500',
  fuchsia: 'bg-fuchsia-500',
  pink: 'bg-pink-400',
  rose: 'bg-rose-400',
  zinc: 'bg-zinc-600',
}

type BadgeProps = {
  color?: keyof typeof colors
  children: React.ReactNode
  className?: string
} & React.ComponentPropsWithoutRef<'span'>

export function Badge({ color = 'zinc', children, className, ...props }: BadgeProps) {
  const textAndBorder = colors[color] ?? colors.zinc
  const dotColor = dots[color] ?? dots.zinc

  return (
    <span
      {...props}
      className={clsx(
        'inline-flex items-center gap-2 rounded-sm border px-3 py-1 text-xs font-medium',
        textAndBorder,
        className
      )}
    >
      <span className={clsx('h-2 w-2 rounded-full', dotColor)} />
      {children}
    </span>
  )
}
