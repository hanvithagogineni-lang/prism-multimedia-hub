import React, { useEffect, useState } from 'react';
import { Palette, ExternalLink, X } from 'lucide-react';
import { StudentWork } from '../types';
import { api } from '../api/client';

export const StudentWorks: React.FC = () => {
  const [works, setWorks] = useState<StudentWork[]>([]);
  const [selectedCat, setSelectedCat] = useState('all');
  const [activeModalWork, setActiveModalWork] = useState<StudentWork | null>(null);

  const fallbackWorks: StudentWork[] = [
    { id: '1', title: 'Brand Identity System', student_name: 'Rahul Varma', category_id: 'graphic-design', category: { name: 'Graphic Design', slug: 'graphic-design' }, image_url: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=800&q=80', description: 'Complete vector branding, logo guidelines, packaging, and business suite.' },
    { id: '2', title: 'Fintech Mobile App UI/UX', student_name: 'Sneha Patel', category_id: 'ui-ux', category: { name: 'UI/UX', slug: 'ui-ux' }, image_url: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&w=800&q=80', description: 'High-fidelity Figma prototype, design system components, and usability testing.' },
    { id: '3', title: '2D Character Short Film', student_name: 'Arjun Das', category_id: 'animation', category: { name: 'Animation', slug: 'animation' }, image_url: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?auto=format&fit=crop&w=800&q=80', description: 'Adobe Animate digital character walk cycles, lip-sync, and short narrative reel.' },
    { id: '4', title: 'CGI Sci-Fi Environment VFX', student_name: 'Kavita Menon', category_id: 'vfx', category: { name: 'VFX', slug: 'vfx' }, image_url: 'https://images.unsplash.com/photo-1535016120720-40c646be5580?auto=format&fit=crop&w=800&q=80', description: 'After Effects matchmoving, green screen keying, CGI asset integration, and particle fog.' },
    { id: '5', title: 'Commercial Video Reel', student_name: 'Deepak Rao', category_id: 'video', category: { name: 'Video Editing', slug: 'video' }, image_url: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=800&q=80', description: 'Premiere Pro dynamic cutting, audio sweetening, and Lumetri color grading.' },
    { id: '6', title: 'Kinetic Typography Promo', student_name: 'Pooja Sharma', category_id: 'motion', category: { name: 'Motion Graphics', slug: 'motion' }, image_url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80', description: 'Kinetic type animations, broadcast lower thirds, and logo intro stingers.' }
  ];

  useEffect(() => {
    const loadWorks = async () => {
      try {
        const res = await api.get('/student-works');
        setWorks(res.data.data && res.data.data.length ? res.data.data : fallbackWorks);
      } catch {
        setWorks(fallbackWorks);
      }
    };
    loadWorks();
  }, []);

  const categories = [
    { label: 'All Works', slug: 'all' },
    { label: 'Graphic Design', slug: 'graphic-design' },
    { label: 'UI/UX', slug: 'ui-ux' },
    { label: 'Animation', slug: 'animation' },
    { label: 'VFX', slug: 'vfx' },
    { label: 'Video Editing', slug: 'video' },
  ];

  const filtered = selectedCat === 'all'
    ? works
    : works.filter((w) => w.category?.slug === selectedCat || w.category_id === selectedCat);

  return (
    <div className="bg-[#0a0a0d] text-white min-h-screen pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="text-xs font-bold text-[#ff6b35] uppercase tracking-widest mb-2">
            Student Showcase
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white font-display">
            Explore the Incredible Creativity of Our Students
          </h1>
          <p className="mt-4 text-base text-gray-300">
            Real portfolio projects crafted by Prism Multimedia students during their training.
          </p>
        </div>

        {/* Categories */}
        <div className="mt-10 flex items-center justify-center gap-2 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat.slug}
              onClick={() => setSelectedCat(cat.slug)}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                selectedCat === cat.slug
                  ? 'bg-[#ff6b35] text-white shadow-lg shadow-[#ff6b35]/25'
                  : 'bg-[#121217] text-gray-400 hover:text-white border border-[#232330]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((work) => (
            <div
              key={work.id}
              onClick={() => setActiveModalWork(work)}
              className="group cursor-pointer rounded-xl overflow-hidden bg-[#121217] border border-[#232330] hover:border-[#ff6b35]/50 transition-all hover:-translate-y-1 hover:shadow-2xl flex flex-col"
            >
              <div className="relative h-56 overflow-hidden bg-gray-900">
                <img
                  src={work.image_url}
                  alt={work.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#121217] via-transparent to-transparent opacity-80" />
                <div className="absolute top-3 right-3 p-2 rounded-full bg-black/60 backdrop-blur-md text-white opacity-0 group-hover:opacity-100 transition-opacity">
                  <ExternalLink className="w-4 h-4" />
                </div>
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-bold text-[#ff6b35] uppercase tracking-wider">
                    {work.category?.name || 'Project'}
                  </span>
                  <h3 className="text-base font-bold text-white mt-1 group-hover:text-[#ff6b35] transition-colors">
                    {work.title}
                  </h3>
                  <p className="text-xs text-gray-400 mt-1 line-clamp-2">
                    {work.description}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-white/5 text-xs text-gray-500">
                  Created by: <strong className="text-gray-300">{work.student_name}</strong>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Project Modal Viewer */}
        {activeModalWork && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <div className="relative max-w-2xl w-full bg-[#121217] border border-[#232330] rounded-2xl overflow-hidden shadow-2xl p-6">
              <button
                onClick={() => setActiveModalWork(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="rounded-xl overflow-hidden mb-4 max-h-80 bg-gray-900">
                <img
                  src={activeModalWork.image_url}
                  alt={activeModalWork.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-xs font-bold text-[#ff6b35] uppercase">
                {activeModalWork.category?.name}
              </span>
              <h2 className="text-xl font-bold text-white mt-1">{activeModalWork.title}</h2>
              <p className="text-sm text-gray-300 mt-2">{activeModalWork.description}</p>
              <div className="mt-4 text-xs text-gray-400">
                Student: <strong className="text-white">{activeModalWork.student_name}</strong>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
