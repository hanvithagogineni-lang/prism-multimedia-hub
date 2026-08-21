import React from 'react';
import { Image, UploadCloud, Folder } from 'lucide-react';

export const AdminMedia: React.FC = () => {
  const mediaItems = [
    { name: 'program-card-pgdim.jpg', size: '240 KB', path: './program-card-pgdim.jpg' },
    { name: 'program-card-graphic.jpg', size: '180 KB', path: './program-card-graphic.jpg' },
    { name: 'program-card-ux.jpg', size: '210 KB', path: './program-card-ux.jpg' },
    { name: 'blog-poster-1.jpg', size: '320 KB', path: './blog-poster-1.jpg' },
    { name: 'alumni-bolle-madhu.jpg', size: '95 KB', path: './alumni-bolle-madhu.jpg' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-white">Media Library</h1>
          <p className="text-xs text-gray-400 mt-0.5">Manage banners, course posters, and alumni photographs.</p>
        </div>
      </div>

      <div className="p-8 rounded-2xl border-2 border-dashed border-[#232330] hover:border-[#ff6b35] transition-colors text-center cursor-pointer bg-[#121217]">
        <UploadCloud className="w-10 h-10 text-[#ff6b35] mx-auto mb-2" />
        <h3 className="font-bold text-white text-sm">Upload New Media Asset</h3>
        <p className="text-xs text-gray-500 mt-1">PNG, JPG, WEBP, SVG up to 10MB</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {mediaItems.map((m, i) => (
          <div key={i} className="p-3 rounded-xl bg-[#121217] border border-[#232330] space-y-2">
            <div className="h-28 rounded-lg overflow-hidden bg-gray-900">
              <img src={m.path} alt={m.name} className="w-full h-full object-cover" />
            </div>
            <div className="text-[11px] font-medium text-white truncate">{m.name}</div>
            <div className="text-[10px] text-gray-500">{m.size}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
