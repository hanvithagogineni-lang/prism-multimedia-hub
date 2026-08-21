import React, { useEffect, useState } from 'react';
import { apiRequest } from '../../api/client';
import { AdminSidebar } from '../../components/AdminSidebar';
import { Trash2 } from 'lucide-react';

export const AdminBlogs: React.FC = () => {
  const [blogs, setBlogs] = useState<any[]>([]);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = () => {
    apiRequest('/blogs').then((data) => setBlogs(data.blogs || [])).catch(console.error);
  };

  const handleDelete = async (id: number) => {
    if (confirm('Delete this blog post?')) {
      try {
        await apiRequest(`/admin/blogs/${id}`, { method: 'DELETE' });
        fetchBlogs();
      } catch (err: any) {
        alert(err.message);
      }
    }
  };

  return (
    <div className="flex min-h-screen bg-[#050508]">
      <AdminSidebar />
      <main className="flex-1 p-8 space-y-6 overflow-y-auto">
        <div>
          <h1 className="text-3xl font-extrabold text-white">Blog CMS Management</h1>
          <p className="text-gray-400 text-xs mt-1">Manage published blogs and software shortcut guides</p>
        </div>

        <div className="bg-[#121217] border border-white/10 rounded-2xl p-6">
          <table className="w-full text-left text-xs text-gray-300">
            <thead className="bg-white/5 text-gray-400 uppercase text-[10px] tracking-wider border-b border-white/10">
              <tr>
                <th className="p-3">Title</th>
                <th className="p-3">Category</th>
                <th className="p-3">Published Date</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {blogs.map((b) => (
                <tr key={b.id} className="hover:bg-white/5">
                  <td className="p-3 font-semibold text-white">{b.title}</td>
                  <td className="p-3 text-prismOrange font-medium">{b.category?.name}</td>
                  <td className="p-3 text-gray-400">{new Date(b.publishedAt).toLocaleDateString()}</td>
                  <td className="p-3 text-right">
                    <button onClick={() => handleDelete(b.id)} className="text-red-400 p-1">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};
