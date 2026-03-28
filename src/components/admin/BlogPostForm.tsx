"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

interface BlogPostData {
  id?: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featured_image_url: string;
  status: string;
  category: string;
  tags: string[];
  meta_title: string;
  meta_description: string;
  published_at: string;
}

interface BlogPostFormProps {
  initialData?: Partial<BlogPostData>;
  mode: "create" | "edit";
}

export function BlogPostForm({ initialData, mode }: BlogPostFormProps) {
  const router = useRouter();
  const supabase = createClient();

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState<BlogPostData>({
    title: initialData?.title || "",
    slug: initialData?.slug || "",
    excerpt: initialData?.excerpt || "",
    content: initialData?.content || "",
    featured_image_url: initialData?.featured_image_url || "",
    status: initialData?.status || "draft",
    category: initialData?.category || "",
    tags: initialData?.tags || [],
    meta_title: initialData?.meta_title || "",
    meta_description: initialData?.meta_description || "",
    published_at: initialData?.published_at
      ? new Date(initialData.published_at).toISOString().slice(0, 16)
      : "",
  });

  const [tagsInput, setTagsInput] = useState(
    initialData?.tags?.join(", ") || ""
  );

  const handleChange = useCallback(
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) => {
      const { name, value } = e.target;
      setForm((prev) => {
        const updated = { ...prev, [name]: value };
        if (name === "title" && mode === "create") {
          updated.slug = slugify(value);
        }
        return updated;
      });
    },
    [mode]
  );

  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTagsInput(e.target.value);
    const tags = e.target.value
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
    setForm((prev) => ({ ...prev, tags }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const payload: Record<string, any> = {
      title: form.title,
      slug: form.slug,
      excerpt: form.excerpt || null,
      content: form.content,
      featured_image_url: form.featured_image_url || null,
      status: form.status,
      category: form.category || null,
      tags: form.tags,
      meta_title: form.meta_title || null,
      meta_description: form.meta_description || null,
      published_at:
        form.status === "published"
          ? form.published_at
            ? new Date(form.published_at).toISOString()
            : new Date().toISOString()
          : form.published_at
            ? new Date(form.published_at).toISOString()
            : null,
    };

    let result;
    if (mode === "edit" && initialData?.id) {
      result = await supabase
        .from("blog_posts")
        .update(payload)
        .eq("id", initialData.id);
    } else {
      result = await supabase.from("blog_posts").insert(payload);
    }

    if (result.error) {
      setError(result.error.message);
      setSaving(false);
      return;
    }

    router.push("/admin/blog");
    router.refresh();
  };

  const generateExcerpt = () => {
    if (form.content) {
      const text = form.content
        .replace(/<[^>]+>/g, "")
        .replace(/\s+/g, " ")
        .trim();
      setForm((prev) => ({
        ...prev,
        excerpt: text.slice(0, 200) + (text.length > 200 ? "..." : ""),
      }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
          {error}
        </div>
      )}

      {/* Title & Slug */}
      <Card className="border-white/10 bg-white/5 p-6">
        <h2 className="text-lg font-semibold text-white">Post Details</h2>
        <Separator className="my-4 bg-white/10" />

        <div className="space-y-4">
          <div>
            <Label htmlFor="title" className="text-white/70">
              Title *
            </Label>
            <Input
              id="title"
              name="title"
              value={form.title}
              onChange={handleChange}
              required
              className="mt-1.5 border-white/10 bg-white/5 text-white placeholder:text-white/30"
              placeholder="Your blog post title"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="slug" className="text-white/70">
                Slug (URL path)
              </Label>
              <Input
                id="slug"
                name="slug"
                value={form.slug}
                onChange={handleChange}
                required
                className="mt-1.5 border-white/10 bg-white/5 text-white/50 placeholder:text-white/30"
                placeholder="your-post-slug"
              />
              <p className="mt-1 text-[11px] text-white/30">
                /blog/{form.slug || "..."}
              </p>
            </div>
            <div>
              <Label htmlFor="category" className="text-white/70">
                Category
              </Label>
              <Input
                id="category"
                name="category"
                value={form.category}
                onChange={handleChange}
                className="mt-1.5 border-white/10 bg-white/5 text-white placeholder:text-white/30"
                placeholder="e.g. Luxury Cars, Travel, Tips"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="tags" className="text-white/70">
              Tags (comma-separated)
            </Label>
            <Input
              id="tags"
              value={tagsInput}
              onChange={handleTagsChange}
              className="mt-1.5 border-white/10 bg-white/5 text-white placeholder:text-white/30"
              placeholder="exotic cars, tampa, rental tips"
            />
            {form.tags.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-1.5">
                {form.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded bg-gold/10 px-2 py-0.5 text-[11px] font-medium text-gold"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </Card>

      {/* Featured Image */}
      <Card className="border-white/10 bg-white/5 p-6">
        <h2 className="text-lg font-semibold text-white">Featured Image</h2>
        <Separator className="my-4 bg-white/10" />

        <div>
          <Label htmlFor="featured_image_url" className="text-white/70">
            Image URL
          </Label>
          <Input
            id="featured_image_url"
            name="featured_image_url"
            value={form.featured_image_url}
            onChange={handleChange}
            className="mt-1.5 border-white/10 bg-white/5 text-white placeholder:text-white/30"
            placeholder="https://..."
          />
          {form.featured_image_url && (
            <div className="mt-3 relative aspect-[16/9] max-w-md overflow-hidden rounded-lg border border-white/10">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={form.featured_image_url}
                alt="Featured preview"
                className="h-full w-full object-cover"
              />
            </div>
          )}
        </div>
      </Card>

      {/* Content */}
      <Card className="border-white/10 bg-white/5 p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">Content</h2>
          <p className="text-[11px] text-white/30">
            HTML supported. Use headings, paragraphs, images, links.
          </p>
        </div>
        <Separator className="my-4 bg-white/10" />

        <div>
          <Textarea
            id="content"
            name="content"
            value={form.content}
            onChange={handleChange}
            required
            rows={20}
            className="mt-1.5 border-white/10 bg-white/5 text-white placeholder:text-white/30 font-mono text-sm"
            placeholder="<p>Write your blog post content in HTML...</p>"
          />
          <p className="mt-1.5 text-[11px] text-white/30">
            {form.content.length.toLocaleString()} characters
          </p>
        </div>
      </Card>

      {/* Excerpt & SEO */}
      <Card className="border-white/10 bg-white/5 p-6">
        <h2 className="text-lg font-semibold text-white">Excerpt & SEO</h2>
        <Separator className="my-4 bg-white/10" />

        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between">
              <Label htmlFor="excerpt" className="text-white/70">
                Excerpt
              </Label>
              <button
                type="button"
                onClick={generateExcerpt}
                className="text-[11px] text-gold hover:text-gold/80 transition-colors"
              >
                Auto-generate from content
              </button>
            </div>
            <Textarea
              id="excerpt"
              name="excerpt"
              value={form.excerpt}
              onChange={handleChange}
              rows={3}
              className="mt-1.5 border-white/10 bg-white/5 text-white placeholder:text-white/30"
              placeholder="Short summary for post cards and SEO..."
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="meta_title" className="text-white/70">
                Meta Title
              </Label>
              <Input
                id="meta_title"
                name="meta_title"
                value={form.meta_title}
                onChange={handleChange}
                className="mt-1.5 border-white/10 bg-white/5 text-white placeholder:text-white/30"
                placeholder="Custom SEO title (optional)"
              />
              <p className="mt-1 text-[11px] text-white/30">
                {(form.meta_title || form.title).length}/60 characters
              </p>
            </div>
            <div>
              <Label htmlFor="meta_description" className="text-white/70">
                Meta Description
              </Label>
              <Input
                id="meta_description"
                name="meta_description"
                value={form.meta_description}
                onChange={handleChange}
                className="mt-1.5 border-white/10 bg-white/5 text-white placeholder:text-white/30"
                placeholder="Custom SEO description (optional)"
              />
              <p className="mt-1 text-[11px] text-white/30">
                {(form.meta_description || form.excerpt).length}/160 characters
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* Publishing */}
      <Card className="border-white/10 bg-white/5 p-6">
        <h2 className="text-lg font-semibold text-white">Publishing</h2>
        <Separator className="my-4 bg-white/10" />

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="status" className="text-white/70">
              Status
            </Label>
            <select
              id="status"
              name="status"
              value={form.status}
              onChange={handleChange}
              className="mt-1.5 flex h-9 w-full rounded-lg border border-white/10 bg-white/5 px-3 text-sm text-white outline-none focus:border-gold/50"
            >
              <option value="draft" className="bg-black text-white">
                Draft
              </option>
              <option value="published" className="bg-black text-white">
                Published
              </option>
              <option value="archived" className="bg-black text-white">
                Archived
              </option>
            </select>
          </div>
          <div>
            <Label htmlFor="published_at" className="text-white/70">
              Publish Date
            </Label>
            <Input
              id="published_at"
              name="published_at"
              type="datetime-local"
              value={form.published_at}
              onChange={handleChange}
              className="mt-1.5 border-white/10 bg-white/5 text-white"
            />
            <p className="mt-1 text-[11px] text-white/30">
              Leave empty to publish immediately when status is set to Published.
            </p>
          </div>
        </div>
      </Card>

      {/* Actions */}
      <div className="flex gap-3">
        <Button
          type="submit"
          disabled={saving}
          className="flex-1 bg-gold text-black font-semibold hover:bg-gold/90 disabled:opacity-50"
        >
          {saving
            ? mode === "edit"
              ? "Saving..."
              : "Creating..."
            : mode === "edit"
              ? "Save Changes"
              : form.status === "published"
                ? "Publish Post"
                : "Save Draft"}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/admin/blog")}
          className="border-white/10 text-white/60 hover:border-white/20"
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
