import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const metadata = {
  title: "Blog Management",
};

export default async function AdminBlogPage() {
  const supabase = await createClient();

  const { data: posts } = await supabase
    .from("blog_posts")
    .select("*")
    .order("created_at", { ascending: false });

  const publishedCount = posts?.filter((p) => p.status === "published").length || 0;
  const draftCount = posts?.filter((p) => p.status === "draft").length || 0;

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold text-white">
            Blog Management
          </h1>
          <p className="mt-1 text-sm text-white/50">
            {publishedCount} published, {draftCount} draft &middot;{" "}
            {posts?.length || 0} total posts
          </p>
        </div>
        <Link href="/admin/blog/new">
          <Button className="bg-gold text-black font-semibold hover:bg-gold/90">
            New Post
          </Button>
        </Link>
      </div>

      {posts && posts.length > 0 ? (
        <Card className="border-white/10 bg-white/5 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="border-white/10 hover:bg-transparent">
                <TableHead className="text-white/50">Post</TableHead>
                <TableHead className="text-white/50">Category</TableHead>
                <TableHead className="text-white/50">Status</TableHead>
                <TableHead className="text-white/50">Published</TableHead>
                <TableHead className="text-right text-white/50">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {posts.map((post: any) => (
                <TableRow
                  key={post.id}
                  className="border-white/5 hover:bg-white/5"
                >
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="relative h-10 w-16 overflow-hidden rounded bg-white/5 shrink-0">
                        {post.featured_image_url ? (
                          /* eslint-disable-next-line @next/next/no-img-element */
                          <img
                            src={post.featured_image_url}
                            alt={post.title}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center text-[10px] text-white/20">
                            No img
                          </div>
                        )}
                      </div>
                      <div className="min-w-0">
                        <p className="font-medium text-white truncate max-w-[300px]">
                          {post.title}
                        </p>
                        <p className="text-xs text-white/40 truncate max-w-[300px]">
                          /blog/{post.slug}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-white/60 capitalize">
                    {post.category || "—"}
                  </TableCell>
                  <TableCell>
                    <BlogStatusBadge status={post.status} />
                  </TableCell>
                  <TableCell className="text-white/50 text-sm">
                    {post.published_at
                      ? new Date(post.published_at).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })
                      : "—"}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      {post.status === "published" && (
                        <Link href={`/blog/${post.slug}`} target="_blank">
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-white/10 text-white/40 hover:border-white/20 hover:text-white/60"
                          >
                            View
                          </Button>
                        </Link>
                      )}
                      <Link href={`/admin/blog/${post.id}/edit`}>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-white/10 text-white/60 hover:border-gold/30 hover:text-gold"
                        >
                          Edit
                        </Button>
                      </Link>
                      <DeletePostButton postId={post.id} />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      ) : (
        <Card className="border-white/10 bg-white/5 p-8 text-center">
          <p className="text-white/50">No blog posts yet.</p>
          <Link href="/admin/blog/new">
            <Button className="mt-4 bg-gold text-black hover:bg-gold/90">
              Create Your First Post
            </Button>
          </Link>
        </Card>
      )}
    </div>
  );
}

function BlogStatusBadge({ status }: { status: string }) {
  const variants: Record<string, string> = {
    published: "bg-green-500/10 text-green-400 border-green-500/20",
    draft: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
    archived: "bg-white/10 text-white/40 border-white/10",
  };

  return (
    <Badge
      variant="outline"
      className={variants[status] || variants.draft}
    >
      {status}
    </Badge>
  );
}

function DeletePostButton({ postId }: { postId: string }) {
  return (
    <form
      action={async () => {
        "use server";
        const supabase = await createClient();
        await supabase.from("blog_posts").delete().eq("id", postId);
      }}
    >
      <Button
        variant="outline"
        size="sm"
        type="submit"
        className="border-red-500/20 text-red-400 hover:border-red-500/40 hover:bg-red-500/10"
      >
        Delete
      </Button>
    </form>
  );
}
