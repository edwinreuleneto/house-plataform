import type { Blog } from '@/services/blogs/blogs.props'

export interface BlogTableProps {
  items: Blog[]
  onAskDelete: (id: string) => void
  onEdit: (id: string) => void
}
