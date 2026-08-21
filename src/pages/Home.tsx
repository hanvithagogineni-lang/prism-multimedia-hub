import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { apiRequest } from '../api/client';
import { CourseCard } from '../components/CourseCard';
import { Award, Users, BookOpen, CheckCircle, ArrowRight, Star } from 'lucide-react';

export const Home: React.FC = () => {
  const [courses, setCourses] = useState<any[]>([]);
  const [alumni, setAlumni] = useState<any[]>([]);
  const [testimonials, setTestimonials] = useState<any[]>([]);

  useEffect(() => {
    apiRequest('/courses').then((data) => setCourses(data.courses || [])).catch(console.error);
    apiRequest('/alumni').then((data) => setAlumni(data.alumni || [])).catch(console.error);
    apiRequest('/testimonials').then((data) => setTestimonials(data.testimonials || [])).catch(console.error);
  }, []);

  return (
    <div className="space-y-20 pb-20">
      {/* SECTION 1 — HERO */}
      <section className="relative min-h-[85vh] flex items-center justify-center pt-12 pb-20 px-4 lg:px-8 overflow-hidden bg-gradient-to-b from-[#0e0e14] via-darkBg to-darkBg">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-prismOrange/20 via-transparent to-transparent opacity-60"></div>
        <div className="max-w-5xl mx-auto text-center relative z-10 space-y-6">
          <div className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 text-xs text-prismOrange font-semibold uppercase tracking-wider backdrop-blur-md">
            <Award className="w-4 h-4 text-prismOrange" />
            <span>Established in 1999 · 24+ Years Excellence</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-tight">
            Best Multimedia <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-prismOrange to-orange-300">
              Training Institute
            </span>
          </h1>

          <p className="text-gray-300 text-base sm:text-lg max-w-3xl mx-auto font-light leading-relaxed">
            Prism Multimedia has been at the forefront of multimedia education, shaping the future of creative professionals through hands-on practical studio training in Graphic Design, UI/UX, Motion Graphics, 2D/3D Animation, VFX, and Digital Marketing.
          </p>

          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <Link
              to="/courses"
              className="bg-prismOrange hover:bg-prismOrangeHover text-white font-bold px-8 py-3.5 rounded-full shadow-xl shadow-prismOrange/30 hover:scale-105 transition-all text-sm flex items-center space-x-2"
            >
              <span>Explore Courses</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/register"
              className="bg-white/10 hover:bg-white/20 text-white font-bold px-8 py-3.5 rounded-full border border-white/20 hover:scale-105 transition-all text-sm"
            >
              Register Now
            </Link>
            <Link
              to="/contact"
              className="bg-transparent hover:bg-white/5 text-gray-300 hover:text-white font-semibold px-6 py-3.5 rounded-full border border-white/10 text-sm"
            >
              Contact Us
            </Link>
          </div>

          {/* Key Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-12 border-t border-white/10 max-w-4xl mx-auto">
            <div>
              <div className="text-3xl font-extrabold text-white">10,000+</div>
              <div className="text-xs text-gray-400 font-medium">Students Opted</div>
            </div>
            <div>
              <div className="text-3xl font-extrabold text-prismOrange">100%</div>
              <div className="text-xs text-gray-400 font-medium">Successfully Placed</div>
            </div>
            <div>
              <div className="text-3xl font-extrabold text-white">24+ Years</div>
              <div className="text-xs text-gray-400 font-medium">Teaching Experience</div>
            </div>
            <div>
              <div className="text-3xl font-extrabold text-prismOrange">Certified</div>
              <div className="text-xs text-gray-400 font-medium">Experienced Faculty</div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2 — ABOUT OVERVIEW */}
      <section className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="bg-[#121217] border border-white/10 rounded-3xl p-8 sm:p-12 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-6">
            <span className="text-prismOrange text-xs font-extrabold tracking-widest uppercase block">About Our Institute</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Pioneering Creative Education Since 1999
            </h2>
            <p className="text-gray-300 text-sm leading-relaxed">
              Prism Multimedia is an enterprise run by experienced professionals with years of hands-on industry expertise in both teaching and development areas. Established in 1999 to impart training in multimedia applications, design, web technologies, and visual effects.
            </p>
            <div className="grid grid-cols-2 gap-4 text-xs text-gray-300 pt-2">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-prismOrange" />
                <span>Industry-Oriented Curriculum</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-prismOrange" />
                <span>Live Studio Assignments</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-prismOrange" />
                <span>Dedicated Placement Support</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-prismOrange" />
                <span>Experienced Mentors</span>
              </div>
            </div>
            <div>
              <Link
                to="/about"
                className="inline-flex items-center space-x-2 bg-white/10 hover:bg-white/20 text-white text-xs font-bold px-6 py-3 rounded-full transition-all"
              >
                <span>Know More</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
          <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10">
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80"
              alt="Prism Studio"
              className="w-full h-80 object-cover"
            />
          </div>
        </div>
      </section>

      {/* SECTION 3 — COURSES */}
      <section className="max-w-7xl mx-auto px-4 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between">
          <div>
            <span className="text-prismOrange text-xs font-extrabold tracking-widest uppercase block">Our Programs</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Explore Professional Courses</h2>
          </div>
          <Link to="/courses" className="text-prismOrange hover:underline text-sm font-bold mt-2 md:mt-0">
            View All Courses →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.slice(0, 6).map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </section>

      {/* SECTION 4 — ALUMNI SUCCESS */}
      <section className="max-w-7xl mx-auto px-4 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-prismOrange text-xs font-extrabold tracking-widest uppercase block">Success Stories</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Our Placed Alumni</h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {alumni.map((item) => (
            <div key={item.id} className="bg-[#121217] border border-white/10 rounded-2xl p-5 text-center hover:border-prismOrange/50 transition-all">
              <div className="w-16 h-16 bg-prismOrange/20 rounded-full flex items-center justify-center text-prismOrange font-bold text-xl mx-auto mb-3">
                {item.name.charAt(0)}
              </div>
              <h4 className="text-white font-bold text-sm">{item.name}</h4>
              <p className="text-prismOrange text-xs font-semibold">{item.designation}</p>
              <p className="text-gray-400 text-[11px] mt-1">{item.company}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 5 — TESTIMONIALS */}
      <section className="max-w-7xl mx-auto px-4 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-prismOrange text-xs font-extrabold tracking-widest uppercase block">Student Feedback</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">What Our Past Students Say</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((t) => (
            <div key={t.id} className="bg-[#121217] border border-white/10 rounded-2xl p-6 space-y-4">
              <div className="flex text-yellow-400 space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="text-gray-300 text-xs italic leading-relaxed">"{t.testimonial}"</p>
              <div>
                <h5 className="text-white font-bold text-sm">{t.name}</h5>
                <p className="text-gray-400 text-xs">{t.designation} · {t.company}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
