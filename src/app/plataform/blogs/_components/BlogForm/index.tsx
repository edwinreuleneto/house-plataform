"use client";

// Dependencies
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "react-query";
import { useRouter } from "next/navigation";

// Components
import InputComponent from "@/components/Form/Input/InputComponent";
import Button from "@/components/Form/Button";

// Context
import { useNotification } from "@/context/notification";

// Services
import { CreateBlog, UpdateBlog, CreateBlogAI } from "@/services/blogs";

// Schema
import BlogSchema from "./schema";
import type { BlogFormProps, BlogFormValues } from "./form.types";
import CoverInput from "../CoverInput";
import StatusSelect from "../StatusSelect";
import RichTextEditor from "../RichTextEditor";
import { useAuth } from "@/context/auth";
import { motion } from "framer-motion";
import { Sparkles, Wand2 } from "lucide-react";

const BlogForm = ({ blogId, defaultValues, onSuccess }: BlogFormProps) => {
  const router = useRouter();
  const { showNotification } = useNotification();
  const { user } = useAuth();

  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [aiPrompt, setAiPrompt] = useState("");
  const [showCelebrate, setShowCelebrate] = useState(false);
  const [activeTab, setActiveTab] = useState<'AI' | 'Manual'>(blogId ? 'Manual' : 'AI');

  const formatDateTimeLocal = (iso?: string) => {
    if (!iso) return "";
    const d = new Date(iso);
    if (isNaN(d.getTime())) return "";
    const pad = (n: number) => String(n).padStart(2, "0");
    const yyyy = d.getFullYear();
    const mm = pad(d.getMonth() + 1);
    const dd = pad(d.getDate());
    const hh = pad(d.getHours());
    const mi = pad(d.getMinutes());
    return `${yyyy}-${mm}-${dd}T${hh}:${mi}`;
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<BlogFormValues>({
    resolver: zodResolver(BlogSchema),
    defaultValues: {
      title: defaultValues?.title || "",
      description: defaultValues?.description || "",
      status: (defaultValues?.status as any) || "DRAFT",
      publishedAt: formatDateTimeLocal(defaultValues?.publishedAt),
      content: defaultValues?.content || "",
    },
  });

  const mutation = useMutation(
    async (values: BlogFormValues) => {
      const form = new FormData();
      form.append("title", values.title);
      form.append("description", values.description);
      const authorId = user?.user?.id;
      if (authorId) form.append("authorId", authorId);
      if (values.status) form.append("status", values.status);
      if (values.publishedAt) {
        const iso = new Date(values.publishedAt).toISOString();
        form.append("publishedAt", iso);
      }
      if (values.content) form.append("content", values.content);

      if (coverFile) form.append("cover", coverFile);

      return blogId ? UpdateBlog(blogId, form) : CreateBlog(form);
    },
    {
      onSuccess: () => {
        showNotification("Blog saved successfully", "success");
        if (onSuccess) return onSuccess();
        router.push("/plataform/blogs");
      },
      onError: () => {
        showNotification("Failed to save blog", "error");
      },
    }
  );

  const statusWatch = watch("status");
  const publishedAtWatch = watch("publishedAt");

  const aiMutation = useMutation(
    async () => {
      if (!aiPrompt.trim()) throw new Error("Please enter a topic/subject");
      const authorId = user?.user?.id as string | undefined;
      if (!authorId) throw new Error("User not authenticated");

      const payload: any = {
        prompt: aiPrompt.trim(),
        authorId,
      };

      if (statusWatch) payload.status = statusWatch as any;
      if (publishedAtWatch) {
        const iso = new Date(publishedAtWatch).toISOString();
        payload.publishedAt = iso;
      }

      return CreateBlogAI(payload);
    },
    {
      onSuccess: (blog) => {
        setShowCelebrate(true);
        showNotification("Post generated with AI!", "success");
        // Open edit modal on the blogs page instead of redirecting to edit page
        setTimeout(() => {
          router.push(`/plataform/blogs?edit=${blog.id}`)
        }, 600);
      },
      onError: (err: any) => {
        const msg = err?.message || "Failed to generate with AI";
        showNotification(msg, "error");
      },
    }
  );

  return (
    <form onSubmit={handleSubmit((data) => mutation.mutate(data))} className="space-y-4 w-full">
      {!blogId && (
        <div className="w-full">
          <div className="relative inline-flex rounded-lg bg-gray-100 p-1 text-sm font-medium">
            {(['AI', 'Manual'] as const).map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`relative z-10 px-4 py-2 rounded-md transition-colors ${
                  activeTab === tab ? 'text-[#0b3954]' : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                <span className="flex items-center gap-1.5">
                  {tab === 'AI' ? <Sparkles className="h-4 w-4" /> : <Wand2 className="h-4 w-4 rotate-45" />}
                  {tab === 'AI' ? 'AI' : 'Manual'}
                </span>
                {activeTab === tab && (
                  <motion.span
                    layoutId="tabIndicator"
                    className="absolute inset-0 z-[-1] rounded-md bg-white shadow"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {(!blogId && activeTab === 'AI') && (
        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Wand2 className="h-5 w-5 text-indigo-600" />
              <h3 className="text-base font-semibold text-[#18292c]">Generate post with AI</h3>
            </div>
            <span className="text-[11px] text-gray-500">POST /blogs/ai</span>
          </div>

          <div className="mt-3 grid grid-cols-1 gap-3">
            <textarea
              value={aiPrompt}
              onChange={(e) => setAiPrompt(e.target.value)}
              placeholder="Describe the post theme/subject (e.g., Real estate trends for 2025)"
              className="min-h-24 w-full rounded-md border border-neutral-300 bg-white p-3 text-sm font-medium text-neutral-900 outline-none transition-all focus:border-[#0b3954]"
            />

            <div className="flex items-center gap-2">
              <Button
                label={aiMutation.isLoading ? "Generating..." : "Generate with AI"}
                size="medium"
                variant="success"
                onClick={() => aiMutation.mutate()}
                loading={aiMutation.isLoading}
                icon={<Sparkles className="w-4" />}
                disabled={!aiPrompt.trim() || aiMutation.isLoading}
                className="w-auto"
              />
              <p className="text-xs text-gray-500">
                A complete post will be created with cover, title, summary and content.
              </p>
            </div>

            {aiMutation.isLoading && (
              <div className="mt-2 space-y-3 rounded-md border border-gray-100 bg-gradient-to-br from-white to-indigo-50 p-3">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4 }}
                  className="flex items-center gap-2 text-indigo-700"
                >
                  <Sparkles className="h-4 w-4 animate-pulse" />
                  <span className="text-sm font-medium">Generating epic content...</span>
                </motion.div>

                <motion.div className="h-2 w-full rounded-full bg-indigo-200/60 overflow-hidden">
                  <motion.div
                    className="h-full w-1/3 bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-amber-400"
                    animate={{ x: ["0%", "200%"] }}
                    transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                  />
                </motion.div>

                <div className="grid grid-cols-1 gap-2">
                  <div className="h-6 w-1/2 animate-pulse rounded-md bg-indigo-100" />
                  <div className="h-4 w-3/4 animate-pulse rounded-md bg-indigo-100" />
                  <div className="h-4 w-2/3 animate-pulse rounded-md bg-indigo-100" />
                </div>
              </div>
            )}

            {showCelebrate && (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 220, damping: 18 }}
                className="rounded-md border border-green-200 bg-green-50 p-3 text-green-700"
              >
                Post created! Redirecting to edit...
              </motion.div>
            )}
          </div>
        </div>
      )}

      {(blogId || activeTab === 'Manual') && (
        <>
          <CoverInput
            onChange={setCoverFile}
            previewUrl={defaultValues?.coverUrl}
            accept="image/png,image/jpeg,image/webp"
            maxSizeMB={5}
          />

          <InputComponent
            label="Title"
            name="title"
            control={control}
            inputType="default"
            type="text"
            error={errors.title}
            required
          />

          <InputComponent
            label="Summary"
            name="description"
            control={control}
            inputType="default"
            type="text"
            error={errors.description}
            required
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <StatusSelect control={control} name="status" />
            <InputComponent
              label="Published at"
              name="publishedAt"
              control={control}
              inputType="default"
              type="datetime-local"
              error={errors.publishedAt}
            />
          </div>

          <RichTextEditor control={control} name="content" label="Content" />

          <Button
            label={blogId ? "Update" : "Create"}
            size="medium"
            type="submit"
            disabled={!!mutation.isLoading || aiMutation.isLoading}
            loading={mutation.isLoading}
            variant="primary"
          />
        </>
      )}
    </form>
  );
};

export default BlogForm;
