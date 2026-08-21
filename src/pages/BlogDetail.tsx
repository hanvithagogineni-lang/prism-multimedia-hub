import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, User, ArrowLeft, ArrowRight, Share2, Tag, ArrowUp } from 'lucide-react';
import { Blog } from '../types';
import { fetchBlogBySlug } from '../api/client';

export const BlogDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      if (!slug) return;
      setLoading(true);
      const data = await fetchBlogBySlug(slug);
      setBlog(data);
      setLoading(false);
      window.scrollTo(0, 0);
    };
    load();
  }, [slug]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className="bg-[#0a0a0d] min-h-screen pt-44 pb-20 text-center text-white">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#ff6b35] mb-4" />
        <p className="text-sm text-gray-400">Loading article...</p>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="bg-[#0a0a0d] min-h-screen pt-44 pb-20 text-center text-white">
        <h2 className="text-2xl font-bold">Article Not Found</h2>
        <Link to="/blog" className="mt-4 inline-block px-6 py-2 bg-[#ff6b35] text-white text-xs font-bold rounded-lg">
          Back to Blogs
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[#0a0a0d] text-white min-h-screen pt-32 pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <Link to="/blog" className="inline-flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-[#ff6b35] mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Articles</span>
        </Link>

        {/* Category & Title */}
        <div className="space-y-4">
          <span className="px-3 py-1 rounded bg-[#ff6b35]/20 border border-[#ff6b35]/30 text-xs font-bold text-[#ff6b35] uppercase tracking-wider">
            {blog.category?.name || 'Knowledge Hub'}
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white leading-tight font-display">
            {blog.title}
          </h1>
          <div className="flex items-center gap-4 text-xs text-gray-400 pt-2 border-b border-white/10 pb-6">
            <div className="flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-[#ff6b35]" />
              <span>{blog.author?.name || 'Prism Multimedia Expert'}</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#ff6b35]" />
              <span>{blog.published_at ? new Date(blog.published_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Aug 2026'}</span>
            </div>
          </div>
        </div>

        {/* Featured Image */}
        <div className="mt-8 rounded-2xl overflow-hidden border border-[#232330] shadow-2xl bg-gray-900 aspect-video">
          <img
            src={blog.featured_image || './blog-poster-1.jpg'}
            alt={blog.title}
            className="w-full h-full object-cover"
            onError={(e: any) => {
              e.target.src = 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1200&q=80';
            }}
          />
        </div>

        {/* Article Body */}
        <div className="mt-10 p-8 sm:p-10 rounded-2xl bg-[#121217] border border-[#232330] leading-relaxed text-gray-300 text-sm sm:text-base space-y-6">
          <div className="font-semibold text-lg text-white border-l-4 border-[#ff6b35] pl-4 italic">
            {blog.excerpt}
          </div>
          <div
            className="prose prose-invert max-w-none space-y-4"
            dangerouslySetInnerHTML={{ __html: blog.content.replace(/\n/g, '<br />') }}
          />
        </div>

        {/* Scroll To Top Action */}
        <div className="mt-8 flex justify-end">
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-gray-300 transition-colors"
          >
            <ArrowUp className="w-4 h-4 text-[#ff6b35]" />
            <span>Scroll to Top</span>
          </button>
        </div>

        {/* CTA */}
        <div className="mt-16 p-8 rounded-2xl bg-gradient-to-r from-[#ff6b35] to-[#e0531c] text-center">
          <h3 className="text-2xl font-bold text-white">Want to Master These Creative Skills?</h3>
          <p className="text-xs text-white/90 mt-2">
            Join Prism Multimedia Hyderabad for certified hands-on studio courses with 100% placement support.
          </p>
          <Link
            to="/register"
            className="mt-5 inline-block px-6 py-2.5 bg-white text-[#0a0a0d] text-xs font-extrabold rounded-lg shadow-xl hover:bg-gray-100 transition-all"
          >
            REGISTER NOW
          </Link>
        </div>
      </div>
    </div>
  );
};
