'use client'

// Dependencies
import { PencilIcon, Trash2 } from 'lucide-react'

// Types
import type { BlogTableProps } from './blog-table.props'

const BlogTable = ({ items, onAskDelete, onEdit }: BlogTableProps) => {
  return (
    <div className="overflow-auto rounded-lg border border-gray-200">
      <table className="min-w-full divide-y divide-gray-100 bg-white">
        <thead className="bg-gray-50 text-xs font-semibold text-gray-500 uppercase tracking-wide">
          <tr>
            <th className="px-6 py-4 text-left">Título</th>
            <th className="px-6 py-4 text-left">Status</th>
            <th className="px-6 py-4 text-left">Autor</th>
            <th className="px-6 py-4 text-left">Criado em</th>
            <th className="px-6 py-4 text-right"><span className="sr-only">Ações</span></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
          {items.map((blog) => (
            <tr key={blog.id} className="hover:bg-gray-50 transition">
              <td className="px-6 py-4">{blog.title}</td>
              <td className="px-6 py-4">{blog.status}</td>
              <td className="px-6 py-4">{blog.author?.name || blog.author?.email}</td>
              <td className="px-6 py-4">{new Date(blog.createdAt).toLocaleString()}</td>
              <td className="px-6 py-4 text-right">
                <div className="flex items-center justify-end gap-3">
                  <button
                    onClick={() => onAskDelete(blog.id)}
                    className="text-red-500 hover:text-red-700"
                    aria-label="Excluir"
                    title="Excluir"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => onEdit(blog.id)}
                    className="text-gray-500 hover:text-gray-900"
                    aria-label="Editar"
                    title="Editar"
                  >
                    <PencilIcon className="h-5 w-5" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default BlogTable
