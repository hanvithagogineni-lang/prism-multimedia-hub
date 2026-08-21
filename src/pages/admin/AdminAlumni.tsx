import React, { useEffect, useState } from 'react';
import { Plus, Award } from 'lucide-react';
import { Alumni } from '../../types';
import { fetchAlumni } from '../../api/client';

export const AdminAlumni: React.FC = () => {
  const [alumni, setAlumni] = useState<Alumni[]>([]);

  useEffect(() => {
    const load = async () => {
      const data = await fetchAlumni();
      setAlumni(data);
    };
    load();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-white">Alumni Directory CMS</h1>
          <p className="text-xs text-gray-400 mt-0.5">Manage alumni profiles, photos, and current designations.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {alumni.map((a) => (
          <div key={a.id} className="p-4 rounded-xl bg-[#121217] border border-[#232330] text-center flex flex-col items-center">
            <div className="w-16 h-16 rounded-full overflow-hidden border border-[#ff6b35] mb-2 bg-gray-800">
              <img src={a.photo || './alumni-bolle-madhu.jpg'} alt={a.name} className="w-full h-full object-cover" />
            </div>
            <h3 className="font-bold text-white text-sm">{a.name}</h3>
            <div className="text-xs text-gray-400 mt-0.5">{a.designation}</div>
            <div className="text-xs text-[#ff6b35] font-semibold mt-2">{a.company}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
