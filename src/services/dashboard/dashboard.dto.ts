// Dependencies
import { z } from 'zod'

// Overview DTO
export const overviewSchema = z.object({
  blogs: z.object({
    total: z.number(),
    byStatus: z.object({
      DRAFT: z.number(),
      PUBLISHED: z.number(),
      ARCHIVED: z.number(),
    }),
    createdLast30Days: z.number(),
    createdLast7Days: z.number(),
    avgTimeToPublishDays: z.number(),
    missing: z.object({
      withoutCover: z.number(),
      withoutMetaTags: z.number(),
      withoutSocial: z.number(),
    }),
    socialCoverage: z.object({
      blogsWithAnySocial: z.number(),
      linkedinPosts: z.number(),
      instagramPosts: z.number(),
    }),
  }),
})
export type DashboardOverview = z.infer<typeof overviewSchema>

// Time Series DTO
export const timeseriesPointSchema = z.object({ t: z.string(), c: z.number() })
export const timeseriesSchema = z.object({
  range: z.object({
    start: z.string(),
    end: z.string(),
    interval: z.enum(['day', 'week', 'month']),
  }),
  created: z.array(timeseriesPointSchema),
  published: z.array(timeseriesPointSchema),
})
export type DashboardTimeSeriesResponse = z.infer<typeof timeseriesSchema>

// Top Tags DTO
export const tagSchema = z.object({
  tag: z.string(),
  count: z.number(),
})
export const tagListSchema = z.array(tagSchema)
export type DashboardTag = z.infer<typeof tagSchema>

// Top Authors DTO
export const authorSchema = z.object({
  authorId: z.string(),
  count: z.number(),
  author: z.object({
    id: z.string(),
    email: z.string(),
    name: z.string().nullable(),
  }),
})
export const authorListSchema = z.array(authorSchema)
export type DashboardAuthor = z.infer<typeof authorSchema>
