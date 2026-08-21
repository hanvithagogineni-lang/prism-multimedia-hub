import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Award,
  Users,
  Building,
  Sparkles,
  ChevronRight,
  Star,
  CheckCircle2,
  Phone,
  BookOpen,
} from 'lucide-react';
import { CourseCard } from '../components/CourseCard';
import { Course, Alumni, Testimonial, Blog } from '../types';
import { fetchCourses, fetchAlumni, fetchTestimonials, fetchBlogs } from '../api/client';

export const Home: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [alumni, setAlumni] = useState<Alumni[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const [cList, aList, tList, bRes] = await Promise.all([
        fetchCourses(),
        fetchAlumni(),
        fetchTestimonials(),
        fetchBlogs(),
      ]);
      setCourses(cList);
      setAlumni(aList);
      setTestimonials(tList);
      setBlogs(bRes.data || []);
      setLoading(false);
    };
    loadData();
  }, []);

  return (
    <div className="bg-[#0a0a0d] text-white min-h-screen">
      {/* 1. HERO SECTION */}
      <section className="relative pt-32 pb-20 md:pt-44 md:pb-32 overflow-hidden">
        {/* Background Gradients & Grid */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,107,53,0.15),transparent_50%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(224,83,28,0.1),transparent_50%)] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            {/* Institute Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-[#ff6b35] mb-6 backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5" />
              <span>ESTABLISHED 1999 • 24+ YEARS TEACHING EXCELLENCE</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-tight font-display">
              Best Multimedia <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-[#ff6b35] via-[#ff8a5c] to-white bg-clip-text text-transparent">
                Training Institute
              </span>
            </h1>

            {/* Subtext */}
            <p className="mt-6 text-base sm:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Prism Multimedia has been shaping the future of creative professionals with practical learning, certified mentors, live studio workflows, and 100% placement support.
            </p>

            {/* CTA Buttons */}
            <div className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-4">
              <Link
                to="/courses"
                className="px-8 py-3.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-[#ff6b35] to-[#e0531c] hover:from-[#ff8a5c] hover:to-[#ff6b35] shadow-xl shadow-[#ff6b35]/25 hover:scale-105 transition-all flex items-center gap-2"
              >
                <span>Explore Courses</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/register"
                className="px-8 py-3.5 rounded-xl text-sm font-bold text-white bg-white/10 hover:bg-white/15 border border-white/15 backdrop-blur-md hover:scale-105 transition-all"
              >
                Register Now
              </Link>
              <Link
                to="/contact"
                className="px-8 py-3.5 rounded-xl text-sm font-semibold text-gray-300 hover:text-white hover:bg-white/5 transition-all"
              >
                Contact Us
              </Link>
            </div>

            {/* Stats Counter Bar */}
            <div className="mt-16 pt-10 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-6 text-left max-w-4xl mx-auto">
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                <div className="text-3xl sm:text-4xl font-extrabold text-white">10,000+</div>
                <div className="text-xs text-gray-400 font-medium mt-1">Students Opted</div>
              </div>
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                <div className="text-3xl sm:text-4xl font-extrabold text-[#ff6b35]">100%</div>
                <div className="text-xs text-gray-400 font-medium mt-1">Successfully Placed</div>
              </div>
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                <div className="text-3xl sm:text-4xl font-extrabold text-white">24+</div>
                <div className="text-xs text-gray-400 font-medium mt-1">Years Experience</div>
              </div>
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                <div className="text-3xl sm:text-4xl font-extrabold text-white">100%</div>
                <div className="text-xs text-gray-400 font-medium mt-1">Certified Faculty</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. ABOUT US OVERVIEW SECTION */}
      <section className="py-20 bg-[#0d0d12] border-y border-[#1a1a24]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold text-[#ff6b35] tracking-widest uppercase mb-3">
                <span>About Prism Multimedia</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
                Empowering Creative Minds Since 1999
              </h2>
              <p className="text-sm sm:text-base text-gray-300 mt-4 leading-relaxed">
                Prism Multimedia is an enterprise run by experienced professionals with years of hands-on industry expertise in both teaching and development areas. Established in 1999 to impart training in multimedia applications.
              </p>
              <div className="mt-6 space-y-3">
                {[
                  'Industry-oriented curriculum designed by creative directors',
                  'Hands-on project work and portfolio showreel preparation',
                  'State-of-the-art lab workstations with latest software suites',
                  'Dedicated corporate training and 100% placement support',
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-sm text-gray-300">
                    <CheckCircle2 className="w-4 h-4 text-[#ff6b35] shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <div className="mt-8">
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-xs font-bold uppercase tracking-wider text-white bg-white/10 hover:bg-[#ff6b35] transition-all"
                >
                  <span>Know More About Us</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="rounded-2xl overflow-hidden border border-[#232330] shadow-2xl bg-gray-900 aspect-video">
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80"
                  alt="Prism Multimedia Learning Environment"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 p-6 rounded-xl bg-[#121217] border border-[#232330] shadow-2xl max-w-xs hidden sm:block">
                <div className="text-2xl font-extrabold text-[#ff6b35]">10,000+</div>
                <div className="text-xs text-gray-400 mt-1">
                  Successful professionals working globally in top creative roles.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. DYNAMIC COURSES GRID */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <div className="text-xs font-bold text-[#ff6b35] uppercase tracking-widest">
                Explore Programs
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-1">
                Industry-Oriented Multimedia Courses
              </h2>
            </div>
            <Link
              to="/courses"
              className="text-xs font-bold text-[#ff6b35] hover:text-white uppercase tracking-wider flex items-center gap-1.5 transition-colors"
            >
              <span>View All 12 Courses</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {courses.slice(0, 8).map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/courses"
              className="px-8 py-3.5 rounded-xl text-sm font-bold text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-all inline-flex items-center gap-2"
            >
              <span>View Complete Course Catalog (12 Programs)</span>
              <ArrowRight className="w-4 h-4 text-[#ff6b35]" />
            </Link>
          </div>
        </div>
      </section>

      {/* 4. FLAGSHIP PGDIM HIGHLIGHT */}
      <section className="py-20 bg-gradient-to-br from-[#121217] to-[#0a0a0d] border-y border-[#1a1a24] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="p-8 sm:p-12 rounded-2xl bg-gradient-to-r from-white/[0.03] to-white/[0.01] border border-white/10 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="max-w-2xl">
              <div className="inline-block px-3 py-1 rounded bg-[#ff6b35]/20 border border-[#ff6b35]/30 text-xs font-bold text-[#ff6b35] uppercase mb-3">
                Flagship Master Program
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
                PGDIM — Post Graduate Diploma in Multimedia
              </h2>
              <p className="text-sm text-gray-300 mt-3 leading-relaxed">
                An intensive 18-month master program spanning Graphic Design, UI/UX, 2D/3D Animation, Film Visual Effects, and Audio/Video Post-Production. Complete studio pipeline training with 100% placement assurance.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {['Photoshop', 'Illustrator', 'Figma', 'HTML/CSS/JS', 'Adobe Animate', 'Maya', 'Blender', 'Premiere Pro', 'After Effects'].map((tool, i) => (
                  <span key={i} className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-xs text-gray-300">
                    {tool}
                  </span>
                ))}
              </div>
            </div>
            <div className="shrink-0 flex flex-col sm:flex-row gap-4">
              <Link
                to="/courses/pgdim"
                className="px-6 py-3 rounded-lg text-sm font-bold text-white bg-white/10 hover:bg-white/20 border border-white/15 text-center transition-all"
              >
                View PGDIM Details
              </Link>
              <Link
                to="/register?course=pgdim"
                className="px-6 py-3 rounded-lg text-sm font-bold text-white bg-[#ff6b35] hover:bg-[#e0531c] shadow-lg shadow-[#ff6b35]/25 text-center transition-all"
              >
                Apply for PGDIM
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 5. SUCCESSFUL ALUMNI SHOWCASE */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <div className="text-xs font-bold text-[#ff6b35] uppercase tracking-widest">
                Proven Track Record
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-1">
                Our Successful Alumni
              </h2>
            </div>
            <Link
              to="/alumni"
              className="text-xs font-bold text-[#ff6b35] hover:text-white uppercase tracking-wider flex items-center gap-1.5 transition-colors"
            >
              <span>View All Alumni</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {alumni.slice(0, 8).map((alumnus) => (
              <div
                key={alumnus.id}
                className="p-5 rounded-xl bg-[#121217] border border-[#232330] hover:border-[#ff6b35]/40 transition-all text-center flex flex-col items-center group"
              >
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-2 border-[#ff6b35]/40 group-hover:scale-105 transition-transform bg-gray-800">
                  <img
                    src={alumnus.photo || './alumni-bolle-madhu.jpg'}
                    alt={alumnus.name}
                    className="w-full h-full object-cover"
                    onError={(e: any) => {
                      e.target.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80';
                    }}
                  />
                </div>
                <h3 className="font-bold text-white mt-4 text-sm sm:text-base group-hover:text-[#ff6b35] transition-colors">
                  {alumnus.name}
                </h3>
                <div className="text-xs text-gray-400 font-medium mt-0.5">{alumnus.designation}</div>
                <div className="text-xs text-[#ff6b35] font-semibold mt-2 px-2.5 py-1 rounded bg-[#ff6b35]/10 border border-[#ff6b35]/20">
                  {alumnus.company}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. WHAT OUR PAST STUDENTS SAY / TESTIMONIALS */}
      <section className="py-20 bg-[#0d0d12] border-y border-[#1a1a24]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="text-xs font-bold text-[#ff6b35] uppercase tracking-widest">
              Alumni Feedback
            </div>
            <h2 className="text-3xl font-extrabold text-white mt-1">
              What Our Past Students Say
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.slice(0, 4).map((t) => (
              <div
                key={t.id}
                className="p-6 rounded-xl bg-[#121217] border border-[#232330] flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-1 text-[#ff6b35] mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-sm text-gray-300 leading-relaxed italic">
                    "{t.testimonial}"
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-white text-sm">{t.name}</div>
                    <div className="text-xs text-gray-400">{t.designation}, {t.company}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. LATEST INSIGHTS & BLOGS */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <div className="text-xs font-bold text-[#ff6b35] uppercase tracking-widest">
                Articles &amp; Guides
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-1">
                Insights for Creative Professionals
              </h2>
            </div>
            <Link
              to="/blog"
              className="text-xs font-bold text-[#ff6b35] hover:text-white uppercase tracking-wider flex items-center gap-1.5 transition-colors"
            >
              <span>View All Articles</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {blogs.slice(0, 3).map((blog) => (
              <article
                key={blog.id}
                className="rounded-xl overflow-hidden bg-[#121217] border border-[#232330] hover:border-[#ff6b35]/40 transition-all flex flex-col group"
              >
                <div className="h-44 overflow-hidden bg-gray-900">
                  <img
                    src={blog.featured_image || './blog-poster-1.jpg'}
                    alt={blog.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e: any) => {
                      e.target.src = 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=800&q=80';
                    }}
                  />
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-bold tracking-wider text-[#ff6b35] uppercase">
                      {blog.category?.name || 'Insights'}
                    </span>
                    <h3 className="text-base font-bold text-white mt-1 group-hover:text-[#ff6b35] transition-colors line-clamp-2">
                      {blog.title}
                    </h3>
                    <p className="text-xs text-gray-400 mt-2 line-clamp-2 leading-relaxed">
                      {blog.excerpt}
                    </p>
                  </div>
                  <div className="mt-5 pt-4 border-t border-white/5">
                    <Link
                      to={`/blog/${blog.slug}`}
                      className="text-xs font-bold text-white hover:text-[#ff6b35] inline-flex items-center gap-1 transition-colors"
                    >
                      <span>Read Article</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 8. ADMISSIONS & REGISTRATION CTA */}
      <section className="py-20 bg-gradient-to-r from-[#ff6b35] to-[#e0531c] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-5xl font-extrabold font-display">
            Start Your Creative Journey Today
          </h2>
          <p className="mt-4 text-base sm:text-lg text-white/90 max-w-2xl mx-auto">
            Admissions open for upcoming batches. Speak with our career counselors and enroll in the industry's most respected multimedia programs.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/register"
              className="px-8 py-3.5 rounded-xl text-sm font-extrabold text-[#0a0a0d] bg-white hover:bg-gray-100 shadow-2xl hover:scale-105 transition-all"
            >
              ONLINE COURSE REGISTRATION
            </Link>
            <a
              href="tel:+919701334133"
              className="px-8 py-3.5 rounded-xl text-sm font-bold text-white bg-black/20 hover:bg-black/30 border border-white/20 transition-all flex items-center gap-2"
            >
              <Phone className="w-4 h-4" />
              <span>Call +91 97013 34133</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
