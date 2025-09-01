'use client'

// Dependencies
import { useParams } from 'next/navigation'
import { useQuery } from 'react-query'

// Components
import BlogForm from '../../_components/BlogForm'

// Services
import { GetBlog } from '@/services/blogs'

const EditBlogPage = () => {
  const params = useParams<{ id: string }>()
  const id = params?.id as string

  const { data } = useQuery({
    queryKey: ['/blogs', id],
    queryFn: () => GetBlog(id),
    enabled: !!id,
  })

  const blog = data || undefined

  return (
    <section>
      <div className="mb-6 border-b border-gray-100 pb-4">
        <h1 className="text-2xl font-medium">Edit Post</h1>
        <p className="text-sm text-neutral-600 dark:text-neutral-400 -mt-1">Update post details</p>
      </div>
      <BlogForm
        blogId={id}
        defaultValues={blog ? {
          title: blog.title,
          description: blog.description,
          status: blog.status,
          publishedAt: blog.publishedAt,
          content: blog.content,
          coverUrl: blog.cover?.url,
        } : undefined}
      />
    </section>
  )
}

export default EditBlogPage
