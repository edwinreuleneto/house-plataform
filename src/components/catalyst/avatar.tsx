import * as Headless from '@headlessui/react'
import clsx from 'clsx'
import React, { forwardRef } from 'react'
import { TouchTarget } from './button'
import { Link } from './link'

type AvatarProps = {
  src?: string | null
  square?: boolean
  initials?: string
  alt?: string
  className?: string
}

export function Avatar({
  src = null,
  square = false,
  initials,
  alt = '',
  className,
  ...props
}: AvatarProps & React.ComponentPropsWithoutRef<'span'>) {
  return (
    <span
      data-slot="avatar"
      {...props}
      className={clsx(
        className,
        // Basic layout
        'inline-grid align-middle [--avatar-radius:10%] *:col-start-1 *:row-start-1 bg-slate-700 text-white',
        ' dark:outline-white/(--ring-opacity)',
        // Add the correct border radius
        square ? 'rounded-(--avatar-radius) *:rounded-(--avatar-radius)' : 'rounded-full *:rounded-full'
      )}
    >
      {initials && (
        <svg
          className="size-full fill-current text-[52px] font-semibold uppercase select-none flex"
          viewBox="0 0 100 100"
          aria-hidden={alt ? undefined : 'true'}
        >
          {alt && <title>{alt}</title>}
          <text x="50%" y="47%" alignmentBaseline="middle" dominantBaseline="middle" textAnchor="middle" dy=".125em" className='font-semibold w-full text-center'>
            {initials}
          </text>
        </svg>
      )}
      {src && <img className="size-full" src={src} alt={alt} />}
    </span>
  )
}

export const AvatarButton = forwardRef(function AvatarButton(
  {
    src,
    square = false,
    initials,
    alt,
    className,
    ...props
  }: AvatarProps &
    (Omit<Headless.ButtonProps, 'as' | 'className'> | Omit<React.ComponentPropsWithoutRef<typeof Link>, 'className'>),
  ref: React.ForwardedRef<HTMLElement>
) {
  const classes = clsx(
    className,
    square ? 'rounded-[20%]' : 'rounded-full',
    'relative inline-grid focus:outline-hidden data-focus:outline-2 data-focus:outline-offset-2 data-focus:outline-blue-500'
  )

  return 'href' in props ? (
    <Link {...props} className={classes} ref={ref as React.ForwardedRef<HTMLAnchorElement>}>
      <TouchTarget>
        <Avatar src={src} square={square} initials={initials} alt={alt} />
      </TouchTarget>
    </Link>
  ) : (
    <Headless.Button {...props} className={classes} ref={ref}>
      <TouchTarget>
        <Avatar src={src} square={square} initials={initials} alt={alt} />
      </TouchTarget>
    </Headless.Button>
  )
})
