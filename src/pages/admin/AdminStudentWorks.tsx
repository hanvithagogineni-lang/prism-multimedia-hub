import React, { useEffect, useState } from 'react';
import { Plus, Trash2, Palette, ExternalLink } from 'lucide-react';
import { StudentWork } from '../../types';
import { api } from '../../api/client';

export const AdminStudentWorks: React.FC = () => {
  const [works, setWorks] = useState<StudentWork[]>([]);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get('/student-works');
        setWorks(res.data.data || []);
      } catch {
        setWorks([
          { id: '1', title: 'Brand Identity System', student_name: 'Rahul Varma', category_id: '1', image_url: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=600&q=80', description: 'Complete vector branding suite.' },
          { id: '2', title: 'Fintech Mobile App UI/UX', student_name: 'Sneha Patel', category_id: '2', image_url: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&w=600&q=80', description: 'High-fidelity Figma prototype.' },
        ]);
      }
    };
    load();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-white">Student Works Portfolio</h1>
          <p className="text-xs text-gray-400 mt-0.5">Manage showcase gallery items submitted by students.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {works.map((w) => (
          <div key={w.id} className="p-4 rounded-xl bg-[#121217] border border-[#232330] space-y-3">
            <div className="h-40 rounded-lg overflow-hidden bg-gray-900">
              <img src={w.image_url} alt={w.title} className="w-full h-full object-cover" />
            </div>
            <div>
              <h3 className="font-bold text-white text-sm">{w.title}</h3>
              <p className="text-xs text-gray-400 mt-1">{w.description}</p>
              <div className="text-[11px] text-[#ff6b35] font-semibold mt-2">By: {w.student_name}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
