import { api } from '../api'
import type { ListSocialPostsFilters, SocialPost } from './social.props'

const ListSocialPosts = (filters?: ListSocialPostsFilters): Promise<SocialPost[]> => {
  const params = new URLSearchParams()
  if (filters?.blogId) params.append('blogId', filters.blogId)
  if (filters?.platform) params.append('platform', filters.platform)
  const query = params.size ? `?${params.toString()}` : ''
  return api(`/social-posts${query}`, { method: 'GET' })
}

const GetSocialPost = (id: string): Promise<SocialPost> => api(`/social-posts/${id}`, { method: 'GET' })

const CreateSocialPost = (payload: { blogId: string; platform: SocialPost['platform']; content: string }): Promise<SocialPost> =>
  api('/social-posts', { method: 'POST', body: payload })

const CreateSocialPostsForBlog = (payload: { blogId: string; socialLinkedin?: string; socialInstagram?: string }): Promise<{ count: number } | any> =>
  api('/social-posts/blog', { method: 'POST', body: payload })

const UpdateSocialPost = (id: string, body: Partial<Pick<SocialPost, 'blogId' | 'platform' | 'content'>>): Promise<SocialPost> =>
  api(`/social-posts/${id}`, { method: 'PATCH', body })

const DeleteSocialPost = (id: string): Promise<SocialPost> => api(`/social-posts/${id}`, { method: 'DELETE' })

export {
  ListSocialPosts,
  GetSocialPost,
  CreateSocialPost,
  CreateSocialPostsForBlog,
  UpdateSocialPost,
  DeleteSocialPost,
}

