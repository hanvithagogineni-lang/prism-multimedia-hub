import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { apiRequest } from '../api/client';
import { ArrowLeft, Clock, User } from 'lucide-react';

export const BlogDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [blog, setBlog] = useState<any>(null);
  const [related, setRelated] = useState<any[]>([]);

  useEffect(() => {
    if (slug) {
      apiRequest(`/blogs/${slug}`)
        .then((data) => {
          setBlog(data.blog);
          setRelated(data.relatedBlogs || []);
        })
        .catch(console.error);
    }
  }, [slug]);

  if (!blog) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center text-gray-400">
        Loading article...
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 lg:px-8 py-12 space-y-10">
      <Link to="/blog" className="inline-flex items-center space-x-2 text-xs text-prismOrange font-bold hover:underline">
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to Blog</span>
      </Link>

      <div className="space-y-4">
        <span className="bg-prismOrange/20 text-prismOrange text-xs font-extrabold px-3 py-1 rounded-full uppercase">
          {blog.category?.name}
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white leading-tight">{blog.title}</h1>

        <div className="flex items-center space-x-4 text-xs text-gray-400 border-b border-white/10 pb-6">
          <div className="flex items-center space-x-1.5">
            <User className="w-4 h-4 text-prismOrange" />
            <span>{blog.author?.name || 'Prism Editorial'}</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <Clock className="w-4 h-4 text-prismOrange" />
            <span>{new Date(blog.publishedAt).toLocaleDateString()}</span>
          </div>
        </div>
      </div>

      <div
        className="text-gray-200 text-sm leading-relaxed space-y-4 prose prose-invert max-w-none"
        dangerouslySetInnerHTML={{ __html: blog.content }}
      />
    </div>
  );
};
