"use client"

import { useEffect, useMemo, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { useNotification } from '@/context/notification'
import { ListSocialPosts, CreateSocialPost, UpdateSocialPost } from '@/services/social-posts'
import type { SocialPost, SocialPlatform } from '@/services/social-posts/social.props'

interface SocialTabProps {
  blogId: string
  platform?: SocialPlatform // when set, shows only this platform editor
}

const platformLabels: Record<SocialPlatform, string> = {
  LINKEDIN: 'LinkedIn',
  INSTAGRAM: 'Instagram',
}

export default function SocialTab({ blogId, platform }: SocialTabProps) {
  const { showNotification } = useNotification()
  const queryClient = useQueryClient()
  const [active, setActive] = useState<SocialPlatform>(platform || 'LINKEDIN')

  const { data: posts, isLoading } = useQuery<SocialPost[]>({
    queryKey: ['/social-posts', blogId],
    queryFn: () => ListSocialPosts({ blogId }),
    enabled: !!blogId,
  })

  const byPlatform = useMemo(() => {
    const map: Partial<Record<SocialPlatform, SocialPost | undefined>> = {}
    posts?.forEach((p) => (map[p.platform] = p))
    return map
  }, [posts])

  const [drafts, setDrafts] = useState<Record<SocialPlatform, string>>({
    LINKEDIN: '',
    INSTAGRAM: '',
  })

  // Initialize drafts when posts load
  useEffect(() => {
    setDrafts({
      LINKEDIN: byPlatform.LINKEDIN?.content || '',
      INSTAGRAM: byPlatform.INSTAGRAM?.content || '',
    })
  }, [byPlatform])

  const saveMutation = useMutation(
    async () => {
      const existing = byPlatform[active]
      const content = drafts[active]?.trim() || ''
      if (!content) throw new Error('Content is required')
      if (existing) return UpdateSocialPost(existing.id, { content })
      return CreateSocialPost({ blogId, platform: active, content })
    },
    {
      onSuccess: () => {
        showNotification('Social post saved', 'success')
        queryClient.invalidateQueries(['/social-posts', blogId])
      },
      onError: () => showNotification('Failed to save social post', 'error'),
    }
  )

  // No explicit delete UI per request

  useEffect(() => {
    if (platform) setActive(platform)
  }, [platform])

  const showInnerTabs = !platform

  return (
    <div className="space-y-4">
      {showInnerTabs && (
        <div className="relative inline-flex rounded-lg bg-gray-100 p-1 text-sm font-medium">
          {(['LINKEDIN', 'INSTAGRAM'] as SocialPlatform[]).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActive(tab)}
              className={`relative z-10 px-4 py-2 rounded-md transition-colors ${
                active === tab ? 'text-[#0b3954]' : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              {platformLabels[tab]}
              {active === tab && (
                <span className="absolute inset-0 z-[-1] rounded-md bg-white shadow" />
              )}
            </button>
          ))}
        </div>
      )}

      {isLoading ? (
        <div className="space-y-2">
          <div className="h-6 w-1/4 animate-pulse rounded bg-gray-200" />
          <div className="h-32 w-full animate-pulse rounded bg-gray-100" />
        </div>
      ) : (
        <div className="space-y-3">
          <label className="block text-sm/6 font-medium text-gray-700">
            {platformLabels[active]} copy
          </label>
          <textarea
            value={drafts[active]}
            onChange={(e) => setDrafts((d) => ({ ...d, [active]: e.target.value }))}
            onBlur={() => {
              const current = drafts[active]?.trim() || ''
              const existing = byPlatform[active]?.content || ''
              if (current !== existing && !saveMutation.isLoading) {
                saveMutation.mutate()
              }
            }}
            placeholder={`${platformLabels[active]} content...`}
            className="min-h-40 w-full rounded-md border border-neutral-300 bg-white p-3 text-sm font-medium text-neutral-900 outline-none transition-all focus:border-[#0b3954]"
          />
          <p className="text-xs text-gray-500">Changes save automatically when you leave the field.</p>
        </div>
      )}
    </div>
  )
}
