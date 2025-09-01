"use client";

import { Dialog, DialogActions, DialogBody } from "@/components/catalyst/dialog";
import type { BlogFormModalProps } from "./blog-form-modal.props";
import { useQuery } from "react-query";
import { GetBlog } from "@/services/blogs";
import { X } from "lucide-react";
import BlogForm from "../BlogForm";
import SocialTab from "../SocialTab";
import { useState } from "react";

const BlogFormModal = ({
  open,
  onClose,
  onSaved,
  title = "New Post",
  blogId,
  defaultValues,
}: BlogFormModalProps) => {
  const { data, isLoading } = useQuery({
    queryKey: ["/blogs", blogId],
    queryFn: () => GetBlog(blogId as string),
    enabled: !!blogId && open,
  });

  const resolvedDefaults =
    blogId && data
      ? {
          title: data.title,
          description: data.description,
          status: data.status,
          publishedAt: data.publishedAt,
          content: (data as any).content,
          coverUrl: data.cover?.url,
        }
      : defaultValues;

  const [activeTab, setActiveTab] = useState<'Post' | 'INSTAGRAM' | 'LINKEDIN'>('Post');
  const showTabs = !!blogId;

  return (
    <Dialog open={open} onClose={onClose} size="5xl" className="relative">
      <div className="grid grid-cols-[1fr_auto] pb-4 border-b border-gray-200 mb-4">
        <div className="grid grid-cols-1">
          <h1 className="text-xl font-semibold text-[#18292c]"> {title}</h1>
          <p className="text-sm text-gray-500">Fill in the blog post details.</p>
        </div>
        <button
          type="button"
          aria-label="Fechar"
          title="Fechar"
          onClick={onClose}
          className="absolute top-3 right-3 inline-flex items-center justify-center rounded-md px-2.5 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 text-gray-700 hover:bg-gray-50"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
      <DialogBody>
        {showTabs && (
          <div className="mb-4">
            <div className="relative inline-flex rounded-lg bg-gray-100 p-1 text-sm font-medium">
              {(['Post', 'INSTAGRAM', 'LINKEDIN'] as const).map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={`relative z-10 px-4 py-2 rounded-md transition-colors ${
                    activeTab === tab ? 'text-[#0b3954]' : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  {tab === 'Post' ? 'Post' : tab === 'INSTAGRAM' ? 'Instagram' : 'LinkedIn'}
                  {activeTab === tab && (
                    <span className="absolute inset-0 z-[-1] rounded-md bg-white shadow" />
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {blogId && isLoading ? (
          <p className="text-sm text-gray-500">Loading...</p>
        ) : activeTab !== 'Post' && blogId ? (
          <SocialTab blogId={blogId} platform={activeTab} />
        ) : (
          <BlogForm
            blogId={blogId}
            defaultValues={resolvedDefaults}
            onSuccess={onSaved || onClose}
          />
        )}
      </DialogBody>
      <DialogActions />
    </Dialog>
  );
};

export default BlogFormModal;
