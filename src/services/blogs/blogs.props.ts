export type BlogStatus = 'DRAFT' | 'PUBLISHED' | 'ARCHIVED'

export interface FileInfo {
  id: string
  name: string
  extension: string
  baseUrl: string
  folder: string
  file: string
  url: string
  size: number
  createdAt: string
  updatedAt: string
}

export interface UserInfo {
  id: string
  email: string
  firebaseUid?: string | null
  name?: string | null
  fileId?: string | null
  active: boolean
  phone?: string | null
  firstAccess: boolean
  createdAt: string
  updatedAt: string
  deletedAt?: string | null
}

export interface Blog {
  id: string
  title: string
  description: string
  content?: string
  metaTags: string[]
  status: BlogStatus
  authorId: string
  coverId?: string
  publishedAt?: string
  createdAt: string
  updatedAt: string
  cover?: FileInfo
  author: UserInfo
}

export interface GetBlogsFilters {
  page?: number
  limit?: number
  title?: string
  description?: string
  status?: BlogStatus
  authorId?: string
  metaTags?: string[]
  publishedAt?: string
}

export interface GetBlogsResponse {
  data: Blog[]
  page: number
  totalPages: number
}
