import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Calendar, ArrowRight, User } from 'lucide-react';
import { BLOG_POSTS } from '../data/blogPosts';
import { SEO } from '../components/common/SEO';

export function BlogPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 text-left">
      <SEO
        title="Journal & Perspectives"
        description="Essays on horology, artisanal leathercraft, minimalist product architecture, and thoughtful living."
        canonical="/blog"
      />

      {/* Editorial Header */}
      <header className="max-w-3xl mb-12 sm:mb-16 space-y-3">
        <span className="text-xs font-semibold uppercase tracking-widest text-[#71717a]">
          Milprime Journal
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#09090b]">
          Dispatches on Craft, Material, and Design
        </h1>
        <p className="text-sm sm:text-base text-[#71717a] leading-relaxed">
          Deep-dives into the architecture of modern timepieces, the sensory longevity of vegetable-tanned leather, and the philosophies informing our permanent collection.
        </p>
      </header>

      {/* Article Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {BLOG_POSTS.map((post) => (
          <article
            key={post.id}
            className="group flex flex-col justify-between rounded-2xl border border-[#e4e4e7] bg-white overflow-hidden hover:border-[#09090b] transition-all duration-300 shadow-xs hover:shadow-md"
          >
            <div>
              {/* Image Frame */}
              <Link to={`/blog/${post.slug}`} className="block relative aspect-16/10 overflow-hidden bg-[#f4f4f5]">
                <img
                  src={post.image}
                  alt={post.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-103"
                  loading="lazy"
                />
                <span className="absolute top-4 left-4 rounded-full bg-white/95 backdrop-blur-xs px-3 py-1 text-[11px] font-semibold text-[#09090b] tracking-wider uppercase shadow-xs">
                  {post.category}
                </span>
              </Link>

              {/* Text Card */}
              <div className="p-6 sm:p-8 space-y-4">
                <div className="flex items-center gap-4 text-xs text-[#71717a]">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5" />
                    {post.date}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5" />
                    {post.readTime}
                  </span>
                </div>

                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#09090b] group-hover:underline leading-snug">
                  <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                </h2>

                <p className="text-xs sm:text-sm text-[#71717a] line-clamp-3 leading-relaxed">
                  {post.excerpt}
                </p>
              </div>
            </div>

            {/* Footer with Author & CTA */}
            <div className="px-6 pb-6 sm:px-8 sm:pb-8 pt-0 flex items-center justify-between border-t border-[#f4f4f5] mt-4">
              <div className="flex items-center gap-2.5 pt-4">
                <div className="h-7 w-7 rounded-full bg-[#f4f4f5] flex items-center justify-center text-[#71717a]">
                  <User className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-[#09090b]">{post.author}</p>
                  <p className="text-[10px] text-[#71717a]">{post.authorRole}</p>
                </div>
              </div>

              <Link
                to={`/blog/${post.slug}`}
                className="pt-4 inline-flex items-center text-xs font-semibold text-[#09090b] group-hover:translate-x-1 transition-transform"
              >
                Read Article <ArrowRight className="h-3.5 w-3.5 ml-1" />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
