import React, { useEffect, useState } from 'react';
import { apiRequest } from '../api/client';

export const AlumniPage: React.FC = () => {
  const [alumni, setAlumni] = useState<any[]>([]);

  useEffect(() => {
    apiRequest('/alumni').then((data) => setAlumni(data.alumni || [])).catch(console.error);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-12 space-y-12">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-prismOrange text-xs font-extrabold tracking-widest uppercase block">Our Graduates</span>
        <h1 className="text-4xl font-extrabold text-white">Alumni Network</h1>
        <p className="text-gray-300 text-sm">
          Connect with over 15,000+ Prism alumni thriving across top global enterprises, game studios, and digital agencies.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {alumni.map((a) => (
          <div key={a.id} className="bg-[#121217] border border-white/10 rounded-2xl p-6 space-y-4">
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 bg-gradient-to-tr from-prismOrange to-orange-400 rounded-full flex items-center justify-center text-white font-bold text-xl">
                {a.name.charAt(0)}
              </div>
              <div>
                <h4 className="text-white font-bold text-base">{a.name}</h4>
                <p className="text-prismOrange text-xs font-semibold">{a.designation}</p>
                <p className="text-gray-400 text-xs">{a.company}</p>
              </div>
            </div>
            {a.story && (
              <p className="text-gray-300 text-xs italic border-t border-white/5 pt-3 leading-relaxed">
                "{a.story}"
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
