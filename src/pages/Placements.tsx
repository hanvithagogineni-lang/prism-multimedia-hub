import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, Building, CheckCircle2, Award, ShieldCheck, ArrowRight } from 'lucide-react';
import { Placement } from '../types';
import { api } from '../api/client';

export const Placements: React.FC = () => {
  const [placements, setPlacements] = useState<Placement[]>([]);

  const fallbackPlacements: Placement[] = [
    { id: '1', student_name: 'Bolle Madhu', job_title: 'Graphic Designer', company: 'Sitara Foods', year: 2025, student_photo: './alumni-bolle-madhu.jpg' },
    { id: '2', student_name: 'Venkateswara Rao', job_title: 'Visual Designer', company: 'Chota News', year: 2025, student_photo: './alumni-venkateswara-rao.jpg' },
    { id: '3', student_name: 'Maggidi Uday Kiran', job_title: 'Social Media Executive', company: 'BigTV', year: 2025, student_photo: './alumni-maggidi-uday.jpg' },
    { id: '4', student_name: 'Nikhilesh Mishra', job_title: 'Social Media Lead', company: 'CyberSRC', year: 2025, student_photo: './alumni-nikhilesh-mishra.jpg' },
    { id: '5', student_name: 'Yarlagadda Haritha', job_title: 'UI/UX Designer', company: 'Innomagine Consulting', year: 2024, student_photo: './alumni-yarlagadda-haritha.jpg' },
    { id: '6', student_name: 'Byrla Anandakumar', job_title: 'Software Engineer', company: 'WHO', year: 2024, student_photo: './alumni-byrla-anandakumar.jpg' },
    { id: '7', student_name: 'Bokkena Sriguru Sairam', job_title: 'VFX Supervisor', company: 'Greengold Animation', year: 2024, student_photo: './alumni-bokkena-sairam.jpg' },
    { id: '8', student_name: 'Srinaiah Jinkala', job_title: 'Managing Director', company: 'Spruko Technologies', year: 2023, student_photo: './alumni-srinaiah-jinkala.jpg' },
  ];

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get('/placements');
        setPlacements(res.data && res.data.length ? res.data : fallbackPlacements);
      } catch {
        setPlacements(fallbackPlacements);
      }
    };
    load();
  }, []);

  return (
    <div className="bg-[#0a0a0d] text-white min-h-screen pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="text-xs font-bold text-[#ff6b35] uppercase tracking-widest mb-2">
            Career Transitions
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white font-display">
            100% Placement Track Record
          </h1>
          <p className="mt-4 text-base text-gray-300">
            Prism Multimedia actively bridges the gap between learning and professional employment with dedicated placement counseling and recruiter tie-ups.
          </p>
        </div>

        {/* Stats Row */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="p-6 rounded-xl bg-[#121217] border border-[#232330] text-center">
            <div className="text-3xl sm:text-4xl font-extrabold text-[#ff6b35]">100%</div>
            <div className="text-xs text-gray-400 mt-1">Placement Support</div>
          </div>
          <div className="p-6 rounded-xl bg-[#121217] border border-[#232330] text-center">
            <div className="text-3xl sm:text-4xl font-extrabold text-white">500+</div>
            <div className="text-xs text-gray-400 mt-1">Hiring Studio Partners</div>
          </div>
          <div className="p-6 rounded-xl bg-[#121217] border border-[#232330] text-center">
            <div className="text-3xl sm:text-4xl font-extrabold text-white">10,000+</div>
            <div className="text-xs text-gray-400 mt-1">Alumni Placed</div>
          </div>
          <div className="p-6 rounded-xl bg-[#121217] border border-[#232330] text-center">
            <div className="text-3xl sm:text-4xl font-extrabold text-[#ff6b35]">24+</div>
            <div className="text-xs text-gray-400 mt-1">Years Industry Trust</div>
          </div>
        </div>

        {/* Process Steps */}
        <div className="mt-20">
          <h2 className="text-2xl font-bold text-white text-center mb-10">Our 5-Step Placement Process</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              { num: '01', title: 'Learn', desc: 'Build fundamental theoretical & tool mastery.' },
              { num: '02', title: 'Practice', desc: 'Work on live studio briefs and assignments.' },
              { num: '03', title: 'Build', desc: 'Curate a production-grade portfolio & showreel.' },
              { num: '04', title: 'Prepare', desc: 'Resume polish, mock technical & HR interviews.' },
              { num: '05', title: 'Place', desc: 'Direct interview drives with hiring companies.' },
            ].map((step, i) => (
              <div key={i} className="p-5 rounded-xl bg-[#121217] border border-[#232330]">
                <div className="text-xl font-extrabold text-[#ff6b35]">{step.num}</div>
                <h3 className="text-base font-bold text-white mt-1">{step.title}</h3>
                <p className="text-xs text-gray-400 mt-1">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Placements Cards Grid */}
        <div className="mt-20">
          <h2 className="text-2xl font-bold text-white mb-8">Recent Verified Placements</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {placements.map((p) => (
              <div
                key={p.id}
                className="p-5 rounded-xl bg-[#121217] border border-[#232330] hover:border-[#ff6b35]/40 transition-all flex flex-col items-center text-center group"
              >
                <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-[#ff6b35]/30 mb-4 bg-gray-800">
                  <img
                    src={p.student_photo || './alumni-bolle-madhu.jpg'}
                    alt={p.student_name}
                    className="w-full h-full object-cover"
                    onError={(e: any) => {
                      e.target.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80';
                    }}
                  />
                </div>
                <h3 className="font-bold text-white text-base">{p.student_name}</h3>
                <div className="text-xs text-gray-400 mt-0.5">{p.job_title}</div>
                <div className="mt-3 px-3 py-1 rounded bg-[#ff6b35]/10 border border-[#ff6b35]/20 text-xs font-semibold text-[#ff6b35]">
                  {p.company}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-20 p-10 rounded-2xl bg-gradient-to-r from-[#ff6b35] to-[#e0531c] text-center">
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white">Join Our Placement Network</h3>
          <p className="text-sm text-white/90 mt-2 max-w-xl mx-auto">
            Get trained, build a stellar portfolio, and get placed with our 500+ hiring partners.
          </p>
          <Link
            to="/register"
            className="mt-6 inline-block px-8 py-3.5 rounded-xl text-sm font-extrabold text-[#0a0a0d] bg-white hover:bg-gray-100 shadow-xl transition-all"
          >
            REGISTER FOR PLACEMENT TRACK
          </Link>
        </div>
      </div>
    </div>
  );
};
