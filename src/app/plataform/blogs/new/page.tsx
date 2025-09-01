'use client'

// Components
import BlogForm from '../_components/BlogForm'

const NewBlogPage = () => {
  return (
    <section>
      <div className="mb-6 border-b border-gray-100 pb-4">
        <h1 className="text-2xl font-medium">New Post</h1>
        <p className="text-sm text-neutral-600 dark:text-neutral-400 -mt-1">Create a new blog post</p>
      </div>
      <BlogForm />
    </section>
  )
}

export default NewBlogPage
