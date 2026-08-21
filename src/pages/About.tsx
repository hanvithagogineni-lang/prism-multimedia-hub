import React from 'react';
import { Award, CheckCircle, Target, Eye, Users } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-12 space-y-16">
      {/* Hero */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-prismOrange text-xs font-extrabold tracking-widest uppercase block">About Us</span>
        <h1 className="text-4xl font-extrabold text-white">Prism Multimedia Training Institute</h1>
        <p className="text-gray-300 text-sm leading-relaxed">
          Established in 1999, Prism Multimedia is an enterprise run by experienced professionals with years of hands-on industry expertise in training creative leaders across Hyderabad and India.
        </p>
      </div>

      {/* Vision & Mission */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-[#121217] border border-white/10 rounded-2xl p-8 space-y-4">
          <div className="w-12 h-12 bg-prismOrange/20 rounded-xl flex items-center justify-center text-prismOrange">
            <Target className="w-6 h-6" />
          </div>
          <h3 className="text-2xl font-bold text-white">Our Mission</h3>
          <p className="text-gray-300 text-sm leading-relaxed">
            To empower aspiring creative students and working professionals with practical, industry-oriented training in Graphic Design, UI/UX, Motion Graphics, 2D/3D Animation, VFX, and Digital Media.
          </p>
        </div>

        <div className="bg-[#121217] border border-white/10 rounded-2xl p-8 space-y-4">
          <div className="w-12 h-12 bg-prismOrange/20 rounded-xl flex items-center justify-center text-prismOrange">
            <Eye className="w-6 h-6" />
          </div>
          <h3 className="text-2xl font-bold text-white">Our Vision</h3>
          <p className="text-gray-300 text-sm leading-relaxed">
            To remain the top-tier multimedia training hub that bridges the gap between academic education and commercial studio production pipelines.
          </p>
        </div>
      </div>

      {/* Leadership */}
      <div className="bg-[#121217] border border-white/10 rounded-3xl p-8 md:p-12 space-y-8">
        <h2 className="text-3xl font-extrabold text-white text-center">Institute Leadership</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="space-y-3">
            <div className="text-xs font-bold text-prismOrange uppercase tracking-wider">FOUNDER & CEO</div>
            <h4 className="text-xl font-bold text-white">M. Srinivas Rao</h4>
            <p className="text-gray-300 text-xs leading-relaxed">
              A visionary entrepreneur who established Prism Multimedia with the goal of providing quality multimedia education and empowering young professionals with practical creative skills.
            </p>
          </div>

          <div className="space-y-3">
            <div className="text-xs font-bold text-prismOrange uppercase tracking-wider">MANAGING DIRECTOR</div>
            <h4 className="text-xl font-bold text-white">Anjee Yarlagadda</h4>
            <p className="text-gray-300 text-xs leading-relaxed">
              Design Mentor and Administrator with over 15 years of experience in Training & Development, specializing in design education, corporate training, and people management.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
