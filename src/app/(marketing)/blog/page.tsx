import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ChevronRight, Phone } from "lucide-react";
import { LOCATIONS } from "@/lib/constants";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Blog | Exotics By The Bay",
  description:
    "Latest news, exotic car rental tips, and luxury lifestyle content from Exotics By The Bay.",
};

export default async function BlogPage() {
  const supabase = await createClient();
  const { data: posts } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("status", "published")
    .order("published_at", { ascending: false });

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 lg:pt-40 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gold/5 via-transparent to-transparent" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gold text-sm font-semibold uppercase tracking-[0.3em] mb-6">
            Latest News
          </p>
          <h1 className="font-heading text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[0.9] tracking-tight">
            <span className="text-gradient-gold">Blog</span>
          </h1>
          <p className="mx-auto mt-8 max-w-2xl text-lg text-white/60 leading-relaxed">
            Exotic car news, rental tips, and the latest from Exotics By The
            Bay.
          </p>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-24 border-t border-white/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {posts && posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {posts.map((post: any) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="group rounded-lg border border-white/5 bg-card overflow-hidden transition-all duration-300 hover:border-gold/20"
                >
                  {post.featured_image && (
                    <div className="relative aspect-[16/9] overflow-hidden">
                      <Image
                        src={post.featured_image}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    {post.published_at && (
                      <p className="text-gold text-xs font-semibold uppercase tracking-[0.2em] mb-3">
                        {new Date(post.published_at).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )}
                      </p>
                    )}
                    <h2 className="font-heading text-xl sm:text-2xl font-bold text-white mb-3 group-hover:text-gold transition-colors">
                      {post.title}
                    </h2>
                    {post.excerpt && (
                      <p className="text-white/50 text-sm leading-relaxed mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>
                    )}
                    <span className="inline-flex items-center text-gold text-sm font-semibold group-hover:gap-2 transition-all">
                      Read More
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="py-24 text-center">
              <p className="text-white/50 text-lg max-w-md mx-auto">
                No blog posts yet. Check back soon for the latest exotic car
                news, rental tips, and more.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-gold/10 via-gold/5 to-gold/10 border-y border-gold/10">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-3xl sm:text-5xl font-bold text-white mb-6">
            Ready to Experience{" "}
            <span className="text-gradient-gold">Luxury?</span>
          </h2>
          <p className="text-white/50 text-lg mb-10 max-w-2xl mx-auto">
            Browse our hand-picked collection of exotic vehicles and find the
            perfect car for your next adventure.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/fleet">
              <Button
                size="lg"
                className="gold-shimmer bg-gold text-black font-bold text-lg px-10 py-6"
              >
                Browse Fleet
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <a href={`tel:${LOCATIONS.tampa.phoneRaw}`}>
              <Button
                size="lg"
                variant="outline"
                className="border-gold/30 text-gold hover:bg-gold/10 text-lg px-10 py-6"
              >
                <Phone className="mr-2 h-5 w-5" />
                Call Now
              </Button>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
