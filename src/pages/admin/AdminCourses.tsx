import React, { useEffect, useState } from 'react';
import { apiRequest } from '../../api/client';
import { AdminSidebar } from '../../components/AdminSidebar';
import { Plus, Trash2, Edit } from 'lucide-react';

export const AdminCourses: React.FC = () => {
  const [courses, setCourses] = useState<any[]>([]);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = () => {
    apiRequest('/courses').then((data) => setCourses(data.courses || [])).catch(console.error);
  };

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this course?')) {
      try {
        await apiRequest(`/admin/courses/${id}`, { method: 'DELETE' });
        fetchCourses();
      } catch (err: any) {
        alert(err.message);
      }
    }
  };

  return (
    <div className="flex min-h-screen bg-[#050508]">
      <AdminSidebar />
      <main className="flex-1 p-8 space-y-6 overflow-y-auto">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-extrabold text-white">Course Management</h1>
            <p className="text-gray-400 text-xs mt-1">Add, edit, or remove courses from database</p>
          </div>
        </div>

        <div className="bg-[#121217] border border-white/10 rounded-2xl p-6">
          <table className="w-full text-left text-xs text-gray-300">
            <thead className="bg-white/5 text-gray-400 uppercase text-[10px] tracking-wider border-b border-white/10">
              <tr>
                <th className="p-3">Course Title</th>
                <th className="p-3">Slug</th>
                <th className="p-3">Duration</th>
                <th className="p-3">Certification</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {courses.map((c) => (
                <tr key={c.id} className="hover:bg-white/5">
                  <td className="p-3 font-semibold text-white">{c.title}</td>
                  <td className="p-3 text-gray-400">{c.slug}</td>
                  <td className="p-3 text-prismOrange font-medium">{c.duration}</td>
                  <td className="p-3">{c.certification}</td>
                  <td className="p-3 text-right">
                    <button
                      onClick={() => handleDelete(c.id)}
                      className="text-red-400 hover:text-red-300 p-1"
                    >
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
