import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowLeft, Clock, Calendar, Share2, User } from 'lucide-react';
import { BLOG_POSTS } from '../data/blogPosts';
import { SEO } from '../components/common/SEO';
import { useUIStore } from '../store/uiStore';

export function BlogArticlePage() {
  const { slug } = useParams();
  const { addToast } = useUIStore();
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  const otherPost = BLOG_POSTS.find((p) => p.slug !== slug);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      addToast('Article URL copied to clipboard.', 'success');
    }
  };

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    image: post.image,
    datePublished: '2026-02-24T08:00:00+00:00',
    dateModified: '2026-03-12T10:00:00+00:00',
    author: {
      '@type': 'Person',
      name: post.author,
      jobTitle: post.authorRole,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Milprime',
      logo: {
        '@type': 'ImageObject',
        url: 'https://milprime.shop/favicon.ico',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://milprime.shop/blog/${post.slug}`,
    },
  };

  return (
    <article className="min-h-screen bg-white text-left py-10 sm:py-16">
      <SEO
        title={`${post.title} — Milprime Journal`}
        description={post.excerpt}
        image={post.image}
        url={`/blog/${post.slug}`}
        type="article"
        schema={articleSchema}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation / Back link */}
        <div className="mb-8 flex items-center justify-between">
          <Link
            to="/blog"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#71717a] hover:text-[#09090b] transition-colors"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Journal
          </Link>

          <button
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 text-xs text-[#71717a] hover:text-[#09090b] p-1.5 rounded-lg hover:bg-[#f4f4f5] transition-colors cursor-pointer"
            aria-label="Share article"
          >
            <Share2 className="h-3.5 w-3.5" /> Share
          </button>
        </div>

        {/* Article Header */}
        <header className="space-y-4 pb-8 border-b border-[#e4e4e7]">
          <span className="inline-block rounded-full bg-[#f4f4f5] px-3 py-1 text-xs font-semibold text-[#09090b] tracking-wider uppercase">
            {post.category}
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#09090b] leading-[1.15]">
            {post.title}
          </h1>

          <p className="text-base sm:text-lg text-[#71717a] leading-relaxed">
            {post.excerpt}
          </p>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 text-xs text-[#71717a]">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-[#f4f4f5] border border-[#e4e4e7] flex items-center justify-center text-[#71717a]">
                <User className="h-5 w-5" />
              </div>
              <div>
                <p className="font-bold text-[#09090b] text-sm">{post.author}</p>
                <p className="text-[11px] text-[#71717a]">{post.authorRole}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5" /> {post.date}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" /> {post.readTime}
              </span>
            </div>
          </div>
        </header>

        {/* Featured Editorial Photo */}
        <div className="my-10 rounded-2xl overflow-hidden border border-[#e4e4e7] aspect-16/9 bg-[#f4f4f5]">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Longform Editorial Content */}
        <div className="space-y-10 text-base sm:text-lg text-[#27272a] leading-relaxed max-w-3xl">
          {post.content.map((sec, idx) => (
            <section key={idx} className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#09090b]">
                {sec.heading}
              </h2>
              <p className="text-sm sm:text-base leading-relaxed text-[#52525b]">
                {sec.text}
              </p>
            </section>
          ))}

          {/* Editorial Pullquote */}
          <blockquote className="my-10 border-l-2 border-black pl-6 py-2 italic text-lg sm:text-xl text-[#09090b] font-medium">
            &ldquo;Perfection is achieved, not when there is nothing more to add, but when there is nothing left to take away.&rdquo;
          </blockquote>
        </div>

        {/* Author Footer Bio */}
        <div className="mt-16 pt-8 border-t border-[#e4e4e7] bg-[#fafafa] rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center gap-5">
          <div className="h-14 w-14 rounded-full bg-white border border-[#e4e4e7] flex items-center justify-center text-[#71717a] shrink-0">
            <User className="h-7 w-7" />
          </div>
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-[#09090b]">{post.author}</h3>
            <p className="text-xs text-[#71717a]">{post.authorRole} at Milprime Design Studio</p>
            <p className="text-xs text-[#52525b] leading-relaxed pt-1">
              Curator and materials specialist dedicated to sustainable sourcing, architectural discipline, and heirloom object lifespans.
            </p>
          </div>
        </div>

        {/* Next Suggested Article */}
        {otherPost && (
          <div className="mt-12 pt-8 border-t border-[#e4e4e7]">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#71717a]">
              Next in Journal
            </span>
            <Link
              to={`/blog/${otherPost.slug}`}
              className="mt-3 block group rounded-2xl border border-[#e4e4e7] p-6 hover:border-[#09090b] transition-all bg-white"
            >
              <span className="text-[11px] font-semibold text-[#71717a] uppercase">
                {otherPost.category} • {otherPost.readTime}
              </span>
              <h4 className="text-lg font-bold text-[#09090b] group-hover:underline mt-1">
                {otherPost.title}
              </h4>
              <p className="text-xs text-[#71717a] mt-1 line-clamp-2">
                {otherPost.excerpt}
              </p>
            </Link>
          </div>
        )}

      </div>
    </article>
  );
}
