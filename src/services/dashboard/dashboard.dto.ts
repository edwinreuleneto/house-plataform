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

// Estimates Time Series DTO
export const estimateTimeseriesSchema = z.object({
  range: z.object({
    start: z.string(),
    end: z.string(),
    interval: z.enum(['day', 'week', 'month']),
  }),
  requests: z.array(timeseriesPointSchema),
})
export type EstimateTimeSeriesResponse = z.infer<typeof estimateTimeseriesSchema>

// Reads Time Series DTO
export const readsTimeseriesSchema = z.object({
  range: z.object({
    start: z.string(),
    end: z.string(),
    interval: z.enum(['day', 'week', 'month']),
  }),
  reads: z.array(timeseriesPointSchema),
})
export type ReadsTimeSeriesResponse = z.infer<typeof readsTimeseriesSchema>

// Total Reads DTO
export const totalReadsSchema = z.object({ total: z.number() })
export type TotalReadsResponse = z.infer<typeof totalReadsSchema>

// Access Last 30 DTO
export const accessLast30Schema = z.object({
  range: z.object({ start: z.string(), end: z.string() }),
  views: z.number(),
  reads: z.number(),
  total: z.number(),
})
export type AccessLast30Response = z.infer<typeof accessLast30Schema>

// Top Read DTO
export const topReadItemSchema = z.object({
  blogId: z.string(),
  count: z.number(),
  blog: z
    .object({
      id: z.string(),
      title: z.string(),
      slug: z.string().nullable().optional(),
      readsCount: z.number(),
    })
    .nullable(),
})
export const topReadSchema = z.array(topReadItemSchema)
export type TopReadItem = z.infer<typeof topReadItemSchema>

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
  // According to API docs, author can be null when not found
  author: z
    .object({
      id: z.string(),
      email: z.string(),
      name: z.string().nullable(),
    })
    .nullable(),
})
export const authorListSchema = z.array(authorSchema)
export type DashboardAuthor = z.infer<typeof authorSchema>
