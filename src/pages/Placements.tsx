import React, { useEffect, useState } from 'react';
import { apiRequest } from '../api/client';

export const Placements: React.FC = () => {
  const [placements, setPlacements] = useState<any[]>([]);

  useEffect(() => {
    apiRequest('/placements').then((data) => setPlacements(data.placements || [])).catch(console.error);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-12 space-y-12">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-prismOrange text-xs font-extrabold tracking-widest uppercase block">Career Achievements</span>
        <h1 className="text-4xl font-extrabold text-white">Placement Records</h1>
        <p className="text-gray-300 text-sm">
          100% placement support helping students launch careers at leading software firms, MNCs, design agencies, and animation studios.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {placements.map((p) => (
          <div key={p.id} className="bg-[#121217] border border-white/10 rounded-2xl p-6 text-center space-y-2">
            <div className="w-14 h-14 bg-prismOrange/20 rounded-full flex items-center justify-center text-prismOrange font-bold text-lg mx-auto">
              {p.studentName.charAt(0)}
            </div>
            <h4 className="text-white font-bold text-sm">{p.studentName}</h4>
            <p className="text-prismOrange font-semibold text-xs">{p.jobTitle}</p>
            <p className="text-gray-400 text-xs">{p.company}</p>
            <span className="inline-block bg-white/5 border border-white/10 text-gray-300 text-[10px] px-2 py-0.5 rounded-full mt-2">
              Batch {p.year}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
