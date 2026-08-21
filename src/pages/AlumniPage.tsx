import React, { useEffect, useState } from 'react';
import { Search, Building, Award } from 'lucide-react';
import { Alumni } from '../types';
import { fetchAlumni } from '../api/client';

export const AlumniPage: React.FC = () => {
  const [alumni, setAlumni] = useState<Alumni[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const load = async () => {
      const data = await fetchAlumni();
      setAlumni(data);
    };
    load();
  }, []);

  const filtered = alumni.filter(
    (a) =>
      a.name.toLowerCase().includes(search.toLowerCase()) ||
      a.company.toLowerCase().includes(search.toLowerCase()) ||
      a.designation.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-[#0a0a0d] text-white min-h-screen pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="text-xs font-bold text-[#ff6b35] uppercase tracking-widest mb-2">
            Alumni Directory
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white font-display">
            Our Successful Alumni Network
          </h1>
          <p className="mt-4 text-base text-gray-300">
            Meet the creative professionals and leaders who started their journeys at Prism Multimedia.
          </p>
        </div>

        {/* Search */}
        <div className="mt-10 max-w-md mx-auto relative">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, company, or role..."
            className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-[#121217] border border-[#232330] text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#ff6b35]"
          />
        </div>

        {/* Grid */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filtered.map((a) => (
            <div
              key={a.id}
              className="p-6 rounded-2xl bg-[#121217] border border-[#232330] hover:border-[#ff6b35]/40 transition-all text-center flex flex-col items-center group"
            >
              <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-[#ff6b35]/40 mb-4 group-hover:scale-105 transition-transform bg-gray-800">
                <img
                  src={a.photo || './alumni-bolle-madhu.jpg'}
                  alt={a.name}
                  className="w-full h-full object-cover"
                  onError={(e: any) => {
                    e.target.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80';
                  }}
                />
              </div>
              <h3 className="font-bold text-white text-base group-hover:text-[#ff6b35] transition-colors">
                {a.name}
              </h3>
              <div className="text-xs text-gray-400 font-medium mt-1">{a.designation}</div>
              <div className="mt-3 px-3 py-1 rounded-lg bg-[#ff6b35]/10 border border-[#ff6b35]/20 text-xs font-semibold text-[#ff6b35]">
                {a.company}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
