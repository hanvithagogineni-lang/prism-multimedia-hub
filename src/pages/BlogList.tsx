import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, ArrowRight, BookOpen, Calendar, Tag } from 'lucide-react';
import { Blog } from '../types';
import { fetchBlogs } from '../api/client';

export const BlogList: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [search, setSearch] = useState('');
  const [selectedCat, setSelectedCat] = useState('all');

  useEffect(() => {
    const load = async () => {
      const res = await fetchBlogs({
        category: selectedCat !== 'all' ? selectedCat : undefined,
        search: search || undefined,
      });
      setBlogs(res.data || []);
    };
    load();
  }, [selectedCat, search]);

  const categories = [
    { label: 'All Articles', slug: 'all' },
    { label: 'Keyboard Shortcuts', slug: 'keyboard-shortcuts' },
    { label: 'Career & Industry', slug: 'career' },
    { label: 'Design Insights', slug: 'design-insights' },
  ];

  return (
    <div className="bg-[#0a0a0d] text-white min-h-screen pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="text-xs font-bold text-[#ff6b35] uppercase tracking-widest mb-2">
            Knowledge Hub
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white font-display">
            Multimedia &amp; Design Insights
          </h1>
          <p className="mt-4 text-base text-gray-300">
            Tutorials, cheat sheets, keyboard shortcut guides, and career roadmaps from industry experts.
          </p>
        </div>

        {/* Categories & Search */}
        <div className="mt-12 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 w-full md:w-auto">
            {categories.map((c) => (
              <button
                key={c.slug}
                onClick={() => setSelectedCat(c.slug)}
                className={`px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedCat === c.slug
                    ? 'bg-[#ff6b35] text-white shadow-lg shadow-[#ff6b35]/25'
                    : 'bg-[#121217] text-gray-400 hover:text-white border border-[#232330]'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search articles..."
              className="w-full pl-9 pr-4 py-2 rounded-lg bg-[#121217] border border-[#232330] text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#ff6b35]"
            />
          </div>
        </div>

        {/* Blog Cards Grid */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <article
              key={blog.id}
              className="rounded-xl overflow-hidden bg-[#121217] border border-[#232330] hover:border-[#ff6b35]/40 transition-all flex flex-col group hover:-translate-y-1 hover:shadow-2xl"
            >
              <div className="h-48 overflow-hidden bg-gray-900">
                <img
                  src={blog.featured_image || './blog-poster-1.jpg'}
                  alt={blog.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e: any) => {
                    e.target.src = 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=800&q=80';
                  }}
                />
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-bold text-[#ff6b35] uppercase tracking-wider">
                    {blog.category?.name || 'Insights'}
                  </span>
                  <h3 className="text-lg font-bold text-white mt-1 group-hover:text-[#ff6b35] transition-colors line-clamp-2">
                    {blog.title}
                  </h3>
                  <p className="text-xs text-gray-400 mt-2 line-clamp-3 leading-relaxed">
                    {blog.excerpt}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
                  <span className="text-[11px] text-gray-500">Prism Faculty</span>
                  <Link
                    to={`/blog/${blog.slug}`}
                    className="text-xs font-bold text-white hover:text-[#ff6b35] inline-flex items-center gap-1 transition-colors"
                  >
                    <span>Read Article</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};
