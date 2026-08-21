import React, { useEffect, useState } from 'react';
import { Plus, Edit2, Trash2, Search, FileText } from 'lucide-react';
import { Blog } from '../../types';
import { fetchBlogs, api } from '../../api/client';

export const AdminBlogs: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    featured_image: './blog-poster-1.jpg',
  });

  const load = async () => {
    const res = await fetchBlogs();
    setBlogs(res.data || []);
  };

  useEffect(() => {
    load();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/blogs', form);
      setIsModalOpen(false);
      load();
    } catch {
      setBlogs([
        {
          id: String(Date.now()),
          ...form,
          published_at: new Date().toISOString(),
          category: { name: 'Insights', slug: 'insights' },
        },
        ...blogs,
      ]);
      setIsModalOpen(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-white">Blog &amp; Knowledge CMS</h1>
          <p className="text-xs text-gray-400 mt-0.5">Manage articles, shortcuts cheat sheets, and tutorials.</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2.5 rounded-lg bg-[#ff6b35] hover:bg-[#e0531c] text-white text-xs font-bold transition-colors flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Article</span>
        </button>
      </div>

      <div className="rounded-2xl bg-[#121217] border border-[#232330] overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-[#232330] text-gray-400 uppercase tracking-wider bg-white/[0.01]">
              <th className="p-4">Article Title</th>
              <th className="p-4">Category</th>
              <th className="p-4">Date</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1a1a24]">
            {blogs.map((b) => (
              <tr key={b.id} className="hover:bg-white/[0.02]">
                <td className="p-4 font-bold text-white max-w-md">{b.title}</td>
                <td className="p-4 text-[#ff6b35] font-semibold">{b.category?.name || 'General'}</td>
                <td className="p-4 text-gray-400">{b.published_at ? b.published_at.slice(0, 10) : '2026-08'}</td>
                <td className="p-4 text-right space-x-2">
                  <button className="p-1.5 rounded bg-white/5 text-gray-300 hover:text-white">
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#121217] border border-[#232330] rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4">
            <h2 className="text-lg font-bold text-white">Create New Blog Article</h2>
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">Article Title *</label>
                <input
                  type="text"
                  required
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="e.g. Master Figma Components in 10 Steps"
                  className="w-full px-3 py-2 rounded-lg bg-[#0a0a0d] border border-[#232330] text-xs text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">Excerpt *</label>
                <textarea
                  rows={2}
                  required
                  value={form.excerpt}
                  onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                  placeholder="Summary for preview cards..."
                  className="w-full px-3 py-2 rounded-lg bg-[#0a0a0d] border border-[#232330] text-xs text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">Article Content *</label>
                <textarea
                  rows={6}
                  required
                  value={form.content}
                  onChange={(e) => setForm({ ...form, content: e.target.value })}
                  placeholder="Full article content / markdown..."
                  className="w-full px-3 py-2 rounded-lg bg-[#0a0a0d] border border-[#232330] text-xs text-white"
                />
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-gray-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-[#ff6b35] text-white text-xs font-bold"
                >
                  Publish Article
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
