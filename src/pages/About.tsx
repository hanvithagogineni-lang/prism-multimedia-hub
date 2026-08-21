import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, Award, Users, BookOpen, Target, Compass, ArrowRight } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <div className="bg-[#0a0a0d] text-white min-h-screen pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="text-xs font-bold text-[#ff6b35] uppercase tracking-widest mb-2">
            About Our Institute
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white font-display">
            24+ Years of Creative Excellence
          </h1>
          <p className="mt-4 text-base text-gray-300 leading-relaxed">
            Established in 1999, Prism Multimedia is an enterprise run by experienced professionals with years of hands-on industry expertise in both teaching and development areas.
          </p>
        </div>

        {/* History & Foundation */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Shaping India’s Multimedia Industry
            </h2>
            <p className="text-sm text-gray-300 mt-4 leading-relaxed">
              Since 1999, we have been focused on multimedia education, professional development, and creative technology training. Our programs cover Graphic Design, Animation, 3D, Visual Effects, UI/UX, Web Technologies, Digital Media, and Video Production.
            </p>
            <p className="text-sm text-gray-300 mt-3 leading-relaxed">
              Our approach combines practical education with creative exploration and career preparation. Over 10,000+ alumni have transitioned into successful careers across India and internationally.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-[#121217] border border-[#232330]">
                <div className="text-2xl font-bold text-[#ff6b35]">1999</div>
                <div className="text-xs text-gray-400 mt-0.5">Year Established</div>
              </div>
              <div className="p-4 rounded-xl bg-[#121217] border border-[#232330]">
                <div className="text-2xl font-bold text-white">10,000+</div>
                <div className="text-xs text-gray-400 mt-0.5">Students Trained</div>
              </div>
              <div className="p-4 rounded-xl bg-[#121217] border border-[#232330]">
                <div className="text-2xl font-bold text-white">100%</div>
                <div className="text-xs text-gray-400 mt-0.5">Placement Assistance</div>
              </div>
              <div className="p-4 rounded-xl bg-[#121217] border border-[#232330]">
                <div className="text-2xl font-bold text-[#ff6b35]">24+</div>
                <div className="text-xs text-gray-400 mt-0.5">Years Track Record</div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden border border-[#232330] shadow-2xl bg-gray-900 aspect-video">
            <img
              src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80"
              alt="Prism Multimedia Campus and Training"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 rounded-2xl bg-[#121217] border border-[#232330]">
            <div className="w-12 h-12 rounded-xl bg-[#ff6b35]/10 border border-[#ff6b35]/20 flex items-center justify-center text-[#ff6b35] mb-5">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">Our Mission</h3>
            <p className="text-sm text-gray-300 mt-3 leading-relaxed">
              To help learners develop practical creative and technology skills that can support their professional ambitions through hands-on studio workflows and live client projects.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-[#121217] border border-[#232330]">
            <div className="w-12 h-12 rounded-xl bg-[#ff6b35]/10 border border-[#ff6b35]/20 flex items-center justify-center text-[#ff6b35] mb-5">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">Our Vision</h3>
            <p className="text-sm text-gray-300 mt-3 leading-relaxed">
              To create accessible, industry-oriented learning opportunities for aspiring creative professionals and empower every student to thrive in the global digital ecosystem.
            </p>
          </div>
        </div>

        {/* Leadership */}
        <div className="mt-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="text-xs font-bold text-[#ff6b35] uppercase tracking-widest">
              Executive Mentorship
            </div>
            <h2 className="text-3xl font-extrabold text-white mt-1">Guiding the Next Generation</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="p-6 rounded-2xl bg-[#121217] border border-[#232330] flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
              <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-[#ff6b35] shrink-0 bg-gray-800">
                <img src="./leader-srinivas-rao.png" alt="M. Srinivas Rao" className="w-full h-full object-cover" onError={(e: any) => { e.target.src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80'; }} />
              </div>
              <div>
                <div className="text-xs text-[#ff6b35] font-bold uppercase">Founder &amp; CEO</div>
                <h3 className="text-lg font-bold text-white mt-0.5">M. Srinivas Rao</h3>
                <p className="text-xs text-gray-400 mt-2 leading-relaxed">
                  A visionary entrepreneur who established Prism Multimedia with the goal of providing quality multimedia education and empowering young professionals with practical creative skills.
                </p>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[#121217] border border-[#232330] flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
              <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-[#ff6b35] shrink-0 bg-gray-800">
                <img src="./leader-anjee-yarlagadda.png" alt="Anjee Yarlagadda" className="w-full h-full object-cover" onError={(e: any) => { e.target.src = 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80'; }} />
              </div>
              <div>
                <div className="text-xs text-[#ff6b35] font-bold uppercase">Managing Director</div>
                <h3 className="text-lg font-bold text-white mt-0.5">Anjee Yarlagadda</h3>
                <p className="text-xs text-gray-400 mt-2 leading-relaxed">
                  A Design Mentor and Administrator with over 15 years of experience in Training &amp; Development, specializing in design education, corporate training, and people management.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-20 p-10 rounded-2xl bg-gradient-to-r from-white/[0.03] to-white/[0.01] border border-white/10 text-center">
          <h3 className="text-2xl font-bold text-white">Join Our Next Batch</h3>
          <p className="text-sm text-gray-400 mt-2 max-w-xl mx-auto">
            Transform your passion for visual creativity into a high-demand professional career.
          </p>
          <div className="mt-6 flex justify-center gap-4">
            <Link
              to="/courses"
              className="px-6 py-3 rounded-lg text-xs font-bold text-white bg-white/10 hover:bg-white/20 transition-all"
            >
              Explore Courses
            </Link>
            <Link
              to="/register"
              className="px-6 py-3 rounded-lg text-xs font-bold text-white bg-[#ff6b35] hover:bg-[#e0531c] shadow-lg shadow-[#ff6b35]/25 transition-all"
            >
              Register Online
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
