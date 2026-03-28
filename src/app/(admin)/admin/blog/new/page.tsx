"use client";

import { BlogPostForm } from "@/components/admin/BlogPostForm";

export default function NewBlogPostPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-bold text-white">
          New Blog Post
        </h1>
        <p className="mt-1 text-sm text-white/50">
          Create a new blog post for the site.
        </p>
      </div>

      <BlogPostForm mode="create" />
    </div>
  );
}
