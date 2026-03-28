"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { BlogPostForm } from "@/components/admin/BlogPostForm";

export default function EditBlogPostPage() {
  const params = useParams();
  const postId = params.id as string;
  const supabase = createClient();

  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPost() {
      const { data } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("id", postId)
        .single();

      if (data) setPost(data);
      setLoading(false);
    }
    loadPost();
  }, [postId]);

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#fbdd2f] border-t-transparent" />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <p className="text-white/50">Post not found.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-bold text-white">
          Edit Post
        </h1>
        <p className="mt-1 text-sm text-white/50">
          Update &ldquo;{post.title}&rdquo;
        </p>
      </div>

      <BlogPostForm
        mode="edit"
        initialData={{
          id: post.id,
          title: post.title,
          slug: post.slug,
          excerpt: post.excerpt || "",
          content: post.content || "",
          featured_image_url: post.featured_image_url || "",
          status: post.status,
          category: post.category || "",
          tags: post.tags || [],
          meta_title: post.meta_title || "",
          meta_description: post.meta_description || "",
          published_at: post.published_at || "",
        }}
      />
    </div>
  );
}
