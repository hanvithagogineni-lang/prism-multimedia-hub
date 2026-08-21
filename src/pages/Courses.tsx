import React, { useEffect, useState } from 'react';
import { apiRequest } from '../api/client';
import { CourseCard } from '../components/CourseCard';
import { Search } from 'lucide-react';

export const Courses: React.FC = () => {
  const [courses, setCourses] = useState<any[]>([]);
  const [activeCat, setActiveCat] = useState('all');
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchCourses();
  }, [activeCat]);

  const fetchCourses = () => {
    let url = '/courses';
    const params = new URLSearchParams();
    if (activeCat !== 'all') params.append('category', activeCat);
    if (search) params.append('search', search);
    if (params.toString()) url += `?${params.toString()}`;

    apiRequest(url).then((data) => setCourses(data.courses || [])).catch(console.error);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchCourses();
  };

  const categories = [
    { label: 'All Courses', slug: 'all' },
    { label: 'Design', slug: 'design' },
    { label: 'UI/UX', slug: 'ui-ux' },
    { label: 'Animation', slug: 'animation' },
    { label: 'VFX', slug: 'vfx' },
    { label: 'Video', slug: 'video' },
    { label: 'Digital Marketing', slug: 'digital-marketing' },
    { label: 'Entrepreneurship', slug: 'entrepreneurship' },
    { label: 'Diploma', slug: 'diploma' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-12 space-y-8">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-prismOrange text-xs font-extrabold tracking-widest uppercase block">Curriculum & Programs</span>
        <h1 className="text-4xl font-extrabold text-white">All Professional Courses</h1>
        <p className="text-gray-300 text-sm">
          Industry-aligned programs with practical studio projects, expert mentoring, and 100% placement support.
        </p>
      </div>

      {/* Filter & Search Controls */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-[#121217] border border-white/10 p-4 rounded-2xl">
        <div className="flex flex-wrap gap-2 w-full md:w-auto">
          {categories.map((cat) => (
            <button
              key={cat.slug}
              onClick={() => setActiveCat(cat.slug)}
              className={`text-xs font-semibold px-4 py-2 rounded-full transition-all ${
                activeCat === cat.slug
                  ? 'bg-prismOrange text-white shadow-lg shadow-prismOrange/20'
                  : 'bg-white/5 text-gray-300 hover:bg-white/10'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <form onSubmit={handleSearchSubmit} className="relative w-full md:w-64">
          <input
            type="text"
            placeholder="Search course title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white/5 text-xs text-white placeholder-gray-400 border border-white/10 rounded-full px-4 py-2 pr-9 focus:outline-none focus:border-prismOrange"
          />
          <button type="submit" className="absolute right-3 top-2.5 text-gray-400">
            <Search className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>

      {/* Course Grid */}
      {courses.length === 0 ? (
        <div className="text-center py-16 text-gray-400 text-sm">
          No courses found matching your selection.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((c) => (
            <CourseCard key={c.id} course={c} />
          ))}
        </div>
      )}
    </div>
  );
};
