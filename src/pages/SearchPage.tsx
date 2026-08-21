import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { apiRequest } from '../api/client';
import { CourseCard } from '../components/CourseCard';

export const SearchPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const q = searchParams.get('q') || '';
  const [results, setResults] = useState<{ courses: any[]; blogs: any[]; studentWorks: any[]; alumni: any[] }>({
    courses: [],
    blogs: [],
    studentWorks: [],
    alumni: []
  });

  useEffect(() => {
    if (q) {
      apiRequest(`/search?q=${encodeURIComponent(q)}`)
        .then((data) => setResults(data))
        .catch(console.error);
    }
  }, [q]);

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-12 space-y-12">
      <div className="text-center max-w-3xl mx-auto space-y-2">
        <span className="text-prismOrange text-xs font-extrabold tracking-widest uppercase block">Global Search</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">Search Results for "{q}"</h1>
      </div>

      {results.courses?.length > 0 && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-white border-b border-white/10 pb-2">Matching Courses</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {results.courses.map((c) => (
              <CourseCard key={c.id} course={c} />
            ))}
          </div>
        </div>
      )}

      {results.blogs?.length > 0 && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-white border-b border-white/10 pb-2">Matching Articles & Blogs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {results.blogs.map((b) => (
              <Link key={b.id} to={`/blog/${b.slug}`} className="bg-[#121217] border border-white/10 rounded-2xl p-5 hover:border-prismOrange/50 transition-all block">
                <h3 className="text-lg font-bold text-white mb-2">{b.title}</h3>
                <p className="text-gray-400 text-xs line-clamp-2">{b.excerpt}</p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export const PrivacyPolicy: React.FC = () => (
  <div className="max-w-4xl mx-auto px-4 py-12 space-y-6 text-gray-300 text-sm">
    <h1 className="text-3xl font-bold text-white">Privacy Policy</h1>
    <p>At Prism Multimedia, we value student and visitor privacy. Information collected during course registration or enquiries is strictly utilized for academic counseling and course communication.</p>
  </div>
);

export const Terms: React.FC = () => (
  <div className="max-w-4xl mx-auto px-4 py-12 space-y-6 text-gray-300 text-sm">
    <h1 className="text-3xl font-bold text-white">Terms & Conditions</h1>
    <p>All curriculum material, showreels, and studio assignments are property of Prism Multimedia Training Institute. Course duration and placement support rules apply.</p>
  </div>
);
