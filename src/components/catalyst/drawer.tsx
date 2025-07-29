'use client'

// Dependencies
import * as Headless from '@headlessui/react'
import clsx from 'clsx'
import type { ReactNode } from 'react'

interface DrawerProps {
  open: boolean
  onClose: () => void
  className?: string
  children: ReactNode
}

const Drawer = ({ open, onClose, className, children }: DrawerProps) => (
  <Headless.Dialog open={open} onClose={onClose} className="fixed inset-0 z-50 flex">
    <Headless.DialogBackdrop className="fixed inset-0 bg-black/30" />
    <div className="ml-auto h-full w-full max-w-md transform transition-transform duration-300">
      <Headless.DialogPanel className={clsx('h-full overflow-y-auto bg-white p-6 shadow-xl', className)}>
        {children}
      </Headless.DialogPanel>
    </div>
  </Headless.Dialog>
)

export default Drawer
