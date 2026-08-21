import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, BookOpen, FileText, Users, Palette, ArrowRight } from 'lucide-react';
import { api } from '../api/client';
import { Course, Blog, Alumni, StudentWork } from '../types';

export const SearchPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [searchInput, setSearchInput] = useState(query);
  const [results, setResults] = useState<{
    courses: Course[];
    blogs: Blog[];
    studentWorks: StudentWork[];
    alumni: Alumni[];
  }>({ courses: [], blogs: [], studentWorks: [], alumni: [] });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const doSearch = async () => {
      if (!query.trim()) return;
      setLoading(true);
      try {
        const res = await api.get(`/search?q=${encodeURIComponent(query.trim())}`);
        setResults(res.data);
      } catch {
        setResults({ courses: [], blogs: [], studentWorks: [], alumni: [] });
      } finally {
        setLoading(false);
      }
    };
    doSearch();
  }, [query]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      setSearchParams({ q: searchInput.trim() });
    }
  };

  const totalResults =
    results.courses.length +
    results.blogs.length +
    results.studentWorks.length +
    results.alumni.length;

  return (
    <div className="bg-[#0a0a0d] text-white min-h-screen pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Search Header */}
        <div className="text-center max-w-2xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white font-display">
            Global Search
          </h1>
          <form onSubmit={handleSearchSubmit} className="mt-6 relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search courses, software tools, blogs, alumni..."
              className="w-full pl-12 pr-28 py-3.5 rounded-xl bg-[#121217] border border-[#232330] text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#ff6b35] shadow-xl"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 px-5 py-2 rounded-lg bg-[#ff6b35] hover:bg-[#e0531c] text-white text-xs font-bold transition-colors"
            >
              Search
            </button>
          </form>
          {query && (
            <p className="text-xs text-gray-400 mt-3">
              Found <strong className="text-white">{totalResults}</strong> results for "{query}"
            </p>
          )}
        </div>

        {/* Results Sections */}
        <div className="mt-12 space-y-12">
          {/* Courses Results */}
          {results.courses.length > 0 && (
            <div>
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-[#ff6b35]" />
                <span>Courses ({results.courses.length})</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {results.courses.map((course) => (
                  <Link
                    key={course.id}
                    to={`/courses/${course.slug}`}
                    className="p-5 rounded-xl bg-[#121217] border border-[#232330] hover:border-[#ff6b35]/50 transition-all block group"
                  >
                    <h3 className="font-bold text-white text-base group-hover:text-[#ff6b35] transition-colors">
                      {course.title}
                    </h3>
                    <p className="text-xs text-gray-400 mt-1 line-clamp-2">{course.short_description}</p>
                    <div className="mt-3 text-xs text-[#ff6b35] font-semibold flex items-center gap-1">
                      <span>View Course Syllabus</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Blogs Results */}
          {results.blogs.length > 0 && (
            <div>
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#ff6b35]" />
                <span>Articles &amp; Guides ({results.blogs.length})</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {results.blogs.map((blog) => (
                  <Link
                    key={blog.id}
                    to={`/blog/${blog.slug}`}
                    className="p-5 rounded-xl bg-[#121217] border border-[#232330] hover:border-[#ff6b35]/50 transition-all block group"
                  >
                    <h3 className="font-bold text-white text-base group-hover:text-[#ff6b35] transition-colors">
                      {blog.title}
                    </h3>
                    <p className="text-xs text-gray-400 mt-1 line-clamp-2">{blog.excerpt}</p>
                    <div className="mt-3 text-xs text-[#ff6b35] font-semibold flex items-center gap-1">
                      <span>Read Article</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Alumni Results */}
          {results.alumni.length > 0 && (
            <div>
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Users className="w-5 h-5 text-[#ff6b35]" />
                <span>Alumni ({results.alumni.length})</span>
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {results.alumni.map((a) => (
                  <div key={a.id} className="p-4 rounded-xl bg-[#121217] border border-[#232330] text-center">
                    <div className="font-bold text-white text-sm">{a.name}</div>
                    <div className="text-xs text-gray-400 mt-0.5">{a.company}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Empty State */}
          {!loading && query && totalResults === 0 && (
            <div className="text-center py-20 bg-[#121217] rounded-2xl border border-[#232330]">
              <Search className="w-12 h-12 text-gray-600 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-white">No results found for "{query}"</h3>
              <p className="text-xs text-gray-400 mt-1">Try searching for keywords like "Photoshop", "PGDIM", "UI/UX", or "Animation".</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
