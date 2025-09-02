import * as z from 'zod'

export const BlogSchema = z.object({
  title: z.string().min(1, { message: 'Required' }),
  description: z.string().min(1, { message: 'Required' }),
  status: z.enum(['DRAFT', 'PUBLISHED', 'ARCHIVED']).optional(),
  publishedAt: z.string().optional(),
  content: z.string().optional(),
})

export default BlogSchema
