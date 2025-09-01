export type SocialPlatform = 'LINKEDIN' | 'INSTAGRAM'

export interface SocialPost {
  id: string
  blogId: string
  platform: SocialPlatform
  content: string
  createdAt: string
  updatedAt: string
}

export interface ListSocialPostsFilters {
  blogId?: string
  platform?: SocialPlatform
}

