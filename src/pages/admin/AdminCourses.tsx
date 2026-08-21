import React, { useEffect, useState } from 'react';
import { Plus, Edit2, Trash2, Search, CheckCircle, Clock } from 'lucide-react';
import { Course } from '../../types';
import { fetchCourses, api } from '../../api/client';

export const AdminCourses: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);

  const [form, setForm] = useState({
    title: '',
    slug: '',
    short_description: '',
    long_description: '',
    duration: '3 Months',
    certification: 'Certified Multimedia Professional',
    placement_assistance: '100% Placement Support',
    status: 'PUBLISHED',
  });

  const loadData = async () => {
    const data = await fetchCourses();
    setCourses(data);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleOpenCreate = () => {
    setEditingCourse(null);
    setForm({
      title: '',
      slug: '',
      short_description: '',
      long_description: '',
      duration: '3 Months',
      certification: 'Certified Multimedia Professional',
      placement_assistance: '100% Placement Support',
      status: 'PUBLISHED',
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (course: Course) => {
    setEditingCourse(course);
    setForm({
      title: course.title,
      slug: course.slug,
      short_description: course.short_description,
      long_description: course.long_description || course.short_description,
      duration: course.duration,
      certification: course.certification,
      placement_assistance: course.placement_assistance,
      status: course.status,
    });
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingCourse) {
        await api.put(`/courses/${editingCourse.id}`, form);
      } else {
        await api.post('/courses', form);
      }
      setIsModalOpen(false);
      loadData();
    } catch {
      // Local fallback state update
      if (editingCourse) {
        setCourses(courses.map((c) => (c.id === editingCourse.id ? { ...c, ...form } : c)));
      } else {
        setCourses([
          ...courses,
          {
            id: String(Date.now()),
            ...form,
            online_available: true,
            classroom_available: true,
          },
        ]);
      }
      setIsModalOpen(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this course?')) return;
    try {
      await api.delete(`/courses/${id}`);
      loadData();
    } catch {
      setCourses(courses.filter((c) => c.id !== id));
    }
  };

  const filtered = courses.filter((c) => c.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6">
      {/* Top Action Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white">Course Management</h1>
          <p className="text-xs text-gray-400 mt-0.5">
            Manage course catalog, durations, syllabi, tools, and certifications.
          </p>
        </div>
        <button
          onClick={handleOpenCreate}
          className="px-4 py-2.5 rounded-lg bg-[#ff6b35] hover:bg-[#e0531c] text-white text-xs font-bold transition-colors flex items-center gap-2 shadow-lg shadow-[#ff6b35]/25"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Course</span>
        </button>
      </div>

      {/* Search Input */}
      <div className="p-4 rounded-xl bg-[#121217] border border-[#232330] flex items-center gap-3">
        <Search className="w-4 h-4 text-gray-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Filter courses by name..."
          className="w-full bg-transparent text-xs text-white placeholder-gray-500 focus:outline-none"
        />
      </div>

      {/* Table */}
      <div className="rounded-2xl bg-[#121217] border border-[#232330] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#232330] text-gray-400 font-semibold uppercase tracking-wider bg-white/[0.01]">
                <th className="p-4">Course Title</th>
                <th className="p-4">Duration</th>
                <th className="p-4">Certification</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1a1a24]">
              {filtered.map((c) => (
                <tr key={c.id} className="hover:bg-white/[0.02]">
                  <td className="p-4 font-bold text-white max-w-xs">{c.title}</td>
                  <td className="p-4 text-gray-300">{c.duration}</td>
                  <td className="p-4 text-gray-400">{c.certification}</td>
                  <td className="p-4">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                      {c.status}
                    </span>
                  </td>
                  <td className="p-4 text-right space-x-2">
                    <button
                      onClick={() => handleOpenEdit(c)}
                      className="p-1.5 rounded bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white"
                      title="Edit Course"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(c.id)}
                      className="p-1.5 rounded bg-rose-500/10 hover:bg-rose-500/20 text-rose-400"
                      title="Delete Course"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Course Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="bg-[#121217] border border-[#232330] rounded-2xl max-w-xl w-full p-6 shadow-2xl my-8">
            <h2 className="text-lg font-bold text-white mb-4">
              {editingCourse ? 'Edit Course' : 'Create New Course'}
            </h2>
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">Course Title *</label>
                <input
                  type="text"
                  required
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="e.g. 3D Animation & VFX Masterclass"
                  className="w-full px-3 py-2 rounded-lg bg-[#0a0a0d] border border-[#232330] text-xs text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">Duration *</label>
                  <input
                    type="text"
                    required
                    value={form.duration}
                    onChange={(e) => setForm({ ...form, duration: e.target.value })}
                    placeholder="e.g. 6 Months"
                    className="w-full px-3 py-2 rounded-lg bg-[#0a0a0d] border border-[#232330] text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">Slug</label>
                  <input
                    type="text"
                    value={form.slug}
                    onChange={(e) => setForm({ ...form, slug: e.target.value })}
                    placeholder="3d-animation-vfx"
                    className="w-full px-3 py-2 rounded-lg bg-[#0a0a0d] border border-[#232330] text-xs text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">Short Description *</label>
                <textarea
                  rows={2}
                  required
                  value={form.short_description}
                  onChange={(e) => setForm({ ...form, short_description: e.target.value })}
                  placeholder="Brief summary for card display..."
                  className="w-full px-3 py-2 rounded-lg bg-[#0a0a0d] border border-[#232330] text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">Long Description &amp; Overview</label>
                <textarea
                  rows={4}
                  value={form.long_description}
                  onChange={(e) => setForm({ ...form, long_description: e.target.value })}
                  placeholder="Detailed course description..."
                  className="w-full px-3 py-2 rounded-lg bg-[#0a0a0d] border border-[#232330] text-xs text-white"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-lg text-xs font-semibold text-gray-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-[#ff6b35] hover:bg-[#e0531c] text-white text-xs font-bold"
                >
                  Save Course
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
