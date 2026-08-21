import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Filter, BookOpen } from 'lucide-react';
import { CourseCard } from '../components/CourseCard';
import { Course } from '../types';
import { fetchCourses } from '../api/client';

export const Courses: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(searchParams.get('q') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('cat') || 'all');
  const [sortBy, setSortBy] = useState('default');

  const categories = [
    { label: 'All Courses', slug: 'all' },
    { label: 'Design', slug: 'design' },
    { label: 'UI/UX', slug: 'ui-ux' },
    { label: 'Animation', slug: 'animation' },
    { label: 'VFX', slug: 'vfx' },
    { label: 'Video', slug: 'video' },
    { label: 'Digital Marketing', slug: 'digital-marketing' },
    { label: 'Entrepreneurship', slug: 'entrepreneurship' },
    { label: 'Diploma', slug: 'diploma' },
  ];

  useEffect(() => {
    const loadCourses = async () => {
      setLoading(true);
      const data = await fetchCourses({
        category: selectedCategory !== 'all' ? selectedCategory : undefined,
        search: search || undefined,
      });
      setCourses(data);
      setLoading(false);
    };
    loadCourses();
  }, [selectedCategory, search]);

  const handleCategoryChange = (slug: string) => {
    setSelectedCategory(slug);
    if (slug === 'all') {
      searchParams.delete('cat');
    } else {
      searchParams.set('cat', slug);
    }
    setSearchParams(searchParams);
  };

  const sortedCourses = [...courses].sort((a, b) => {
    if (sortBy === 'title_asc') return a.title.localeCompare(b.title);
    if (sortBy === 'title_desc') return b.title.localeCompare(a.title);
    return 0;
  });

  return (
    <div className="bg-[#0a0a0d] text-white min-h-screen pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="text-xs font-bold text-[#ff6b35] uppercase tracking-widest mb-2">
            Course Catalog
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white font-display">
            Industry-Certified Programs
          </h1>
          <p className="mt-4 text-base text-gray-300">
            Explore our practical, project-based multimedia programs designed for careers in design, web, animation, VFX, and video post-production.
          </p>
        </div>

        {/* Filter Tabs & Search Bar */}
        <div className="mt-12 space-y-6">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.slug;
              return (
                <button
                  key={cat.slug}
                  onClick={() => handleCategoryChange(cat.slug)}
                  className={`px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                    isActive
                      ? 'bg-[#ff6b35] text-white shadow-lg shadow-[#ff6b35]/25'
                      : 'bg-[#121217] text-gray-400 hover:text-white border border-[#232330]'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Search & Sort Row */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl bg-[#121217] border border-[#232330]">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by course name or software..."
                className="w-full pl-9 pr-4 py-2 rounded-lg bg-[#0a0a0d] border border-[#232330] text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#ff6b35]"
              />
            </div>

            <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-4">
              <span className="text-xs text-gray-400">
                Showing <strong className="text-white">{sortedCourses.length}</strong> programs
              </span>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 rounded-lg bg-[#0a0a0d] border border-[#232330] text-xs text-gray-300 focus:outline-none focus:border-[#ff6b35]"
              >
                <option value="default">Default Order</option>
                <option value="title_asc">Title (A – Z)</option>
                <option value="title_desc">Title (Z – A)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Course Cards Grid */}
        <div className="mt-8">
          {sortedCourses.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {sortedCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-[#121217] rounded-2xl border border-[#232330]">
              <BookOpen className="w-12 h-12 text-gray-600 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-white">No courses match your filter</h3>
              <p className="text-xs text-gray-400 mt-1">Try selecting another category or clear your search.</p>
              <button
                onClick={() => { setSelectedCategory('all'); setSearch(''); }}
                className="mt-4 px-4 py-2 rounded-lg text-xs font-semibold bg-[#ff6b35] text-white"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
