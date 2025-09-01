'use client'

// Components
import { Dialog, DialogActions, DialogBody, DialogDescription, DialogTitle } from '@/components/catalyst/dialog'

// Types
import type { DeleteDialogProps } from './delete-dialog.props'

const DeleteDialog = ({ open, loading, title, description, onCancel, onConfirm }: DeleteDialogProps) => {
  return (
    <Dialog open={open} onClose={onCancel}>
      <DialogTitle>{title || 'Delete post'}</DialogTitle>
      <DialogDescription>
        {description || 'Are you sure you want to delete this post? This action cannot be undone.'}
      </DialogDescription>
      <DialogBody />
      <DialogActions>
        <button
          onClick={onCancel}
          className="inline-flex items-center justify-center rounded-md px-3 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 text-gray-700 hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          className="inline-flex items-center justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white hover:bg-red-700 disabled:opacity-60"
          disabled={loading}
        >
          {loading ? 'Deleting...' : 'Delete'}
        </button>
      </DialogActions>
    </Dialog>
  )
}

export default DeleteDialog
