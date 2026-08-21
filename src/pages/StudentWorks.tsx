import React, { useEffect, useState } from 'react';
import { apiRequest } from '../api/client';

export const StudentWorks: React.FC = () => {
  const [works, setWorks] = useState<any[]>([]);

  useEffect(() => {
    apiRequest('/student-works').then((data) => setWorks(data.works || [])).catch(console.error);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-12 space-y-8">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-prismOrange text-xs font-extrabold tracking-widest uppercase block">Student Portfolio</span>
        <h1 className="text-4xl font-extrabold text-white">Student Showcase</h1>
        <p className="text-gray-300 text-sm">
          Explore real-world creative projects, brand identities, UI designs, and showreels crafted by our students.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {works.map((w) => (
          <div key={w.id} className="bg-[#121217] border border-white/10 rounded-2xl overflow-hidden group">
            <div className="h-52 overflow-hidden relative">
              <img
                src={w.imageUrl || 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=800&q=80'}
                alt={w.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute top-3 left-3 bg-black/60 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase">
                {w.category?.name || 'Project'}
              </span>
            </div>
            <div className="p-5 space-y-2">
              <h3 className="text-lg font-bold text-white group-hover:text-prismOrange transition-colors">{w.title}</h3>
              <p className="text-gray-400 text-xs font-medium">Created by: <span className="text-white">{w.studentName}</span></p>
              <p className="text-gray-300 text-xs line-clamp-2">{w.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
