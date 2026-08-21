import React, { useEffect, useState } from 'react';
import { Briefcase } from 'lucide-react';
import { Placement } from '../../types';
import { api } from '../../api/client';

export const AdminPlacements: React.FC = () => {
  const [placements, setPlacements] = useState<Placement[]>([]);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get('/placements');
        setPlacements(res.data || []);
      } catch {
        setPlacements([]);
      }
    };
    load();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-white">Placements Tracker</h1>
          <p className="text-xs text-gray-400 mt-0.5">Manage verified student placement records.</p>
        </div>
      </div>

      <div className="rounded-2xl bg-[#121217] border border-[#232330] overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-[#232330] text-gray-400 uppercase tracking-wider bg-white/[0.01]">
              <th className="p-4">Student</th>
              <th className="p-4">Job Title</th>
              <th className="p-4">Company</th>
              <th className="p-4">Year</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1a1a24]">
            {placements.map((p) => (
              <tr key={p.id} className="hover:bg-white/[0.02]">
                <td className="p-4 font-bold text-white">{p.student_name}</td>
                <td className="p-4 text-gray-300">{p.job_title}</td>
                <td className="p-4 text-[#ff6b35] font-semibold">{p.company}</td>
                <td className="p-4 text-gray-400">{p.year}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
