import React, { useEffect, useState } from 'react';
import { Star } from 'lucide-react';
import { Testimonial } from '../../types';
import { fetchTestimonials } from '../../api/client';

export const AdminTestimonials: React.FC = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    const load = async () => {
      const data = await fetchTestimonials();
      setTestimonials(data);
    };
    load();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-white">Student Reviews &amp; Testimonials</h1>
          <p className="text-xs text-gray-400 mt-0.5">Manage verified alumni feedback shown on the homepage.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {testimonials.map((t) => (
          <div key={t.id} className="p-5 rounded-xl bg-[#121217] border border-[#232330] space-y-3">
            <div className="flex items-center gap-1 text-[#ff6b35]">
              {[...Array(t.rating || 5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-current" />
              ))}
            </div>
            <p className="text-xs text-gray-300 italic">"{t.testimonial}"</p>
            <div className="text-xs font-bold text-white pt-2 border-t border-white/5">
              {t.name} <span className="text-gray-500 font-normal">({t.company})</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
