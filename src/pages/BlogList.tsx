import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { apiRequest } from '../api/client';
import { ArrowRight, BookOpen } from 'lucide-react';

export const BlogList: React.FC = () => {
  const [blogs, setBlogs] = useState<any[]>([]);

  useEffect(() => {
    apiRequest('/blogs').then((data) => setBlogs(data.blogs || [])).catch(console.error);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-12 space-y-12">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-prismOrange text-xs font-extrabold tracking-widest uppercase block">Articles & Shortcuts</span>
        <h1 className="text-4xl font-extrabold text-white">Blog & Industry Insights</h1>
        <p className="text-gray-300 text-sm">
          Design tutorials, software keyboard shortcuts guides, UI/UX trends, and creative career advice.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogs.map((b) => (
          <div key={b.id} className="bg-[#121217] border border-white/10 rounded-2xl overflow-hidden group flex flex-col justify-between">
            <div className="p-6 space-y-3">
              <span className="bg-prismOrange/20 text-prismOrange text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider">
                {b.category?.name || 'Design'}
              </span>
              <h3 className="text-xl font-bold text-white group-hover:text-prismOrange transition-colors">
                {b.title}
              </h3>
              <p className="text-gray-300 text-xs leading-relaxed line-clamp-3">
                {b.excerpt || 'Read full article for complete step-by-step insights.'}
              </p>
            </div>
            <div className="p-6 pt-0">
              <Link
                to={`/blog/${b.slug}`}
                className="inline-flex items-center space-x-2 text-prismOrange text-xs font-bold hover:underline"
              >
                <span>Read Article</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
