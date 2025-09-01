'use client'

// Dependencies
import { Suspense, useEffect, useState } from 'react'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { PlusIcon } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'

// Components
import PaginationControls from '../users/_components/Pagination'
import ListHeader from './_components/ListHeader'
import BlogTable from './_components/BlogTable'
import DeleteDialog from './_components/DeleteDialog'
import BlogFormModal from './_components/BlogFormModal'

// Services
import { GetBlogs, DeleteBlog } from '@/services/blogs'

// Types
import type { GetBlogsResponse } from '@/services/blogs/blogs.props'
import { useNotification } from '@/context/notification'

const BlogsContent = () => {
  const [page, setPage] = useState(1)
  const limit = 10
  const router = useRouter()
  const searchParams = useSearchParams()

  const { data } = useQuery<GetBlogsResponse>({
    queryKey: ['/blogs', page],
    queryFn: () => GetBlogs({ page, limit }),
    keepPreviousData: true,
  })

  const queryClient = useQueryClient()
  const { showNotification } = useNotification()

  const [toDeleteId, setToDeleteId] = useState<string | null>(null)
  const [createOpen, setCreateOpen] = useState(false)
  const [editId, setEditId] = useState<string | null>(null)

  // Open edit modal via ?edit=<id>
  useEffect(() => {
    const eid = searchParams.get('edit')
    if (eid && eid !== editId) {
      setEditId(eid)
      setCreateOpen(false)
    }
    if (!eid && editId) {
      setEditId(null)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams])

  const deleteMutation = useMutation(DeleteBlog, {
    onSuccess: () => {
      showNotification('Post deleted successfully', 'success')
      setToDeleteId(null)
      queryClient.invalidateQueries(['/blogs'])
    },
    onError: () => {
      showNotification('Failed to delete post', 'error')
    }
  })

  return (
    <section>
      <ListHeader
        title="Blogs"
        subtitle="Blog posts list"
        buttonLabel="New Post"
        buttonOnClick={() => setCreateOpen(true)}
        buttonIcon={<PlusIcon className="w-4 mr-1" />}
      />

      <BlogTable items={data?.data || []} onAskDelete={setToDeleteId} onEdit={(id) => setEditId(id)} />

      {data && data.totalPages > 1 && (
        <PaginationControls page={page} totalPages={data.totalPages} onChange={setPage} />
      )}

      <DeleteDialog
        open={!!toDeleteId}
        loading={deleteMutation.isLoading}
        onCancel={() => setToDeleteId(null)}
        onConfirm={() => toDeleteId && deleteMutation.mutate(toDeleteId)}
      />

      <BlogFormModal
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        onSaved={() => {
          setCreateOpen(false)
          queryClient.invalidateQueries(['/blogs'])
        }}
        title="New Post"
      />

      <BlogFormModal
        open={!!editId}
        onClose={() => {
          setEditId(null)
          router.replace('/plataform/blogs')
        }}
        onSaved={() => {
          setEditId(null)
          queryClient.invalidateQueries(['/blogs'])
          router.replace('/plataform/blogs')
        }}
        title="Edit Post"
        blogId={editId || undefined}
      />
    </section>
  )
}

export default PageBlogs

function PageBlogs() {
  return (
    <Suspense fallback={<section><p className="text-sm text-gray-500">Loading...</p></section>}>
      <BlogsContent />
    </Suspense>
  )
}
