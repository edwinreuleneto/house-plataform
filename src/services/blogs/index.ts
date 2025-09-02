// Dependencies
import { api } from '../api'

// Types
import type { Blog, GetBlogsFilters, GetBlogsResponse, BlogStatus } from './blogs.props'

// Helpers
const appendIfValue = (form: FormData, key: string, value?: string) => {
  if (typeof value === 'string' && value.trim() !== '') form.append(key, value)
}

// Services
const GetBlogs = (filters?: GetBlogsFilters): Promise<GetBlogsResponse> => {
  const params = new URLSearchParams()
  if (filters?.page) params.append('page', String(filters.page))
  if (filters?.limit) params.append('limit', String(filters.limit))
  if (filters?.title) params.append('title', filters.title)
  if (filters?.description) params.append('description', filters.description)
  if (filters?.status) params.append('status', filters.status)
  if (filters?.authorId) params.append('authorId', filters.authorId)
  if (filters?.publishedAt) params.append('publishedAt', filters.publishedAt)
  if (Array.isArray(filters?.metaTags)) {
    filters!.metaTags!.forEach((tag) => {
      if (tag && tag.trim()) params.append('metaTags', tag)
    })
  }

  const query = params.size ? `?${params.toString()}` : ''
  return api(`/blogs${query}`, { method: 'GET' })
}

const GetBlog = (id: string): Promise<Blog | null> =>
  api(`/blogs/${id}`, { method: 'GET' })

const CreateBlog = (form: FormData): Promise<Blog> =>
  api('/blogs', { method: 'POST', body: form })

const UpdateBlog = (id: string, form: FormData): Promise<Blog> =>
  api(`/blogs/${id}`, { method: 'PATCH', body: form })

const DeleteBlog = (id: string): Promise<Blog> =>
  api(`/blogs/${id}`, { method: 'DELETE' })

export { GetBlogs, GetBlog, CreateBlog, UpdateBlog, DeleteBlog }

// IA - Create full post from prompt
type CreateBlogAIInput = {
  prompt: string
  authorId: string
  status?: BlogStatus
  publishedAt?: string
}

const CreateBlogAI = (payload: CreateBlogAIInput): Promise<Blog> =>
  api('/blogs/ai', { method: 'POST', body: payload })

export { CreateBlogAI }
