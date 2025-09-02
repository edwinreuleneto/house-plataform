export interface BlogFormValues {
  title: string
  description: string
  status?: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED'
  publishedAt?: string
  content?: string
}

export interface BlogFormProps {
  blogId?: string
  defaultValues?: Partial<BlogFormValues> & {
    coverUrl?: string
  }
  onSuccess?: () => void
}
