import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Clock,
  Award,
  ShieldCheck,
  CheckCircle2,
  ChevronDown,
  Download,
  Phone,
  ArrowRight,
  Sparkles,
  Layers,
  Briefcase,
  HelpCircle,
} from 'lucide-react';
import { Course } from '../types';
import { fetchCourseBySlug } from '../api/client';
import { CourseCard } from '../components/CourseCard';

export const CourseDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [openCurriculum, setOpenCurriculum] = useState<number | null>(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    const loadDetail = async () => {
      if (!slug) return;
      setLoading(true);
      const data = await fetchCourseBySlug(slug);
      setCourse(data);
      setLoading(false);
      window.scrollTo(0, 0);
    };
    loadDetail();
  }, [slug]);

  if (loading) {
    return (
      <div className="bg-[#0a0a0d] min-h-screen pt-44 pb-20 text-center text-white">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#ff6b35] mb-4" />
        <p className="text-sm text-gray-400">Loading course syllabus and details...</p>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="bg-[#0a0a0d] min-h-screen pt-44 pb-20 text-center text-white">
        <h2 className="text-2xl font-bold">Course Not Found</h2>
        <p className="text-sm text-gray-400 mt-2">The course you are looking for does not exist.</p>
        <Link to="/courses" className="mt-6 inline-block px-6 py-2.5 bg-[#ff6b35] text-white text-xs font-bold rounded-lg">
          Back to Courses
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[#0a0a0d] text-white min-h-screen pt-28 pb-24">
      {/* 1. HERO BANNER */}
      <section className="relative py-16 bg-gradient-to-b from-[#121217] to-[#0a0a0d] border-b border-[#1a1a24]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-center">
            <div className="lg:col-span-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#ff6b35]/20 border border-[#ff6b35]/30 text-xs font-bold text-[#ff6b35] uppercase mb-4">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Certified Multimedia Program</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-extrabold text-white leading-tight font-display">
                {course.title}
              </h1>
              <p className="mt-4 text-sm sm:text-base text-gray-300 leading-relaxed max-w-2xl">
                {course.short_description}
              </p>

              {/* Highlights */}
              <div className="mt-6 flex flex-wrap gap-4 text-xs font-medium">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-gray-300">
                  <Clock className="w-4 h-4 text-[#ff6b35]" />
                  <span>Duration: <strong>{course.duration}</strong></span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-gray-300">
                  <Award className="w-4 h-4 text-[#ff6b35]" />
                  <span>{course.certification}</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-emerald-400">
                  <ShieldCheck className="w-4 h-4" />
                  <span>{course.placement_assistance}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link
                  to={`/register?course=${course.slug}`}
                  className="px-8 py-3.5 rounded-xl text-sm font-extrabold text-white bg-gradient-to-r from-[#ff6b35] to-[#e0531c] hover:from-[#ff8a5c] hover:to-[#ff6b35] shadow-xl shadow-[#ff6b35]/25 transition-all hover:scale-105"
                >
                  ENROLL NOW ↗
                </Link>
                <a
                  href="#curriculum"
                  className="px-6 py-3.5 rounded-xl text-sm font-bold text-white bg-white/10 hover:bg-white/15 border border-white/15 transition-all flex items-center gap-2"
                >
                  <Download className="w-4 h-4 text-[#ff6b35]" />
                  <span>Download Syllabus</span>
                </a>
                <Link
                  to="/contact"
                  className="px-6 py-3.5 rounded-xl text-sm font-semibold text-gray-400 hover:text-white transition-colors"
                >
                  Ask a Question
                </Link>
              </div>
            </div>

            {/* Hero Visual Card */}
            <div className="rounded-2xl overflow-hidden border border-[#232330] shadow-2xl bg-gray-900 aspect-video lg:aspect-square">
              <img
                src={course.hero_image || './program-card-graphic.jpg'}
                alt={course.title}
                className="w-full h-full object-cover"
                onError={(e: any) => {
                  e.target.src = 'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=800&q=80';
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. COURSE OVERVIEW */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 sm:p-10 rounded-2xl bg-[#121217] border border-[#232330]">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">
              Course Overview &amp; Learning Objectives
            </h2>
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
              {course.long_description}
            </p>
          </div>
        </div>
      </section>

      {/* 3. TOOLS & SOFTWARE MASTERED */}
      {course.tools && course.tools.length > 0 && (
        <section className="py-12 bg-[#0d0d12] border-y border-[#1a1a24]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-xs font-bold text-[#ff6b35] uppercase tracking-widest mb-2">
              Industry Software Stack
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-8">
              Tools &amp; Technologies You Will Master
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {course.tools.map((tool, i) => (
                <div
                  key={i}
                  className="p-4 rounded-xl bg-[#121217] border border-[#232330] hover:border-[#ff6b35]/50 transition-all text-center flex flex-col items-center justify-center gap-2 group"
                >
                  <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center font-bold text-[#ff6b35] group-hover:scale-110 transition-transform">
                    <Layers className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-bold text-white group-hover:text-[#ff6b35] transition-colors">
                    {tool.tool_name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 4. CURRICULUM ACCORDION */}
      {course.curriculum && course.curriculum.length > 0 && (
        <section className="py-16" id="curriculum">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-xs font-bold text-[#ff6b35] uppercase tracking-widest mb-2">
              Detailed Syllabus
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-8">
              Course Curriculum Breakdown
            </h2>

            <div className="space-y-4 max-w-4xl">
              {course.curriculum.map((module, idx) => {
                const isOpen = openCurriculum === idx;
                return (
                  <div
                    key={idx}
                    className="rounded-xl bg-[#121217] border border-[#232330] overflow-hidden transition-all"
                  >
                    <button
                      onClick={() => setOpenCurriculum(isOpen ? null : idx)}
                      className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-white hover:text-[#ff6b35] transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-full bg-[#ff6b35]/20 text-[#ff6b35] text-xs flex items-center justify-center font-bold">
                          {idx + 1}
                        </span>
                        <span className="text-sm sm:text-base">{module.title}</span>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-gray-400">
                        {module.duration && <span>{module.duration}</span>}
                        <ChevronDown
                          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180 text-[#ff6b35]' : ''}`}
                        />
                      </div>
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-gray-300 border-t border-white/5 leading-relaxed">
                        {module.description}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* 5. CAREER OPPORTUNITIES */}
      {course.careers && course.careers.length > 0 && (
        <section className="py-16 bg-[#0d0d12] border-y border-[#1a1a24]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-xs font-bold text-[#ff6b35] uppercase tracking-widest mb-2">
              Career Pathways
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-8">
              Job Roles &amp; Hiring Industries
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {course.careers.map((career, i) => (
                <div
                  key={i}
                  className="p-6 rounded-xl bg-[#121217] border border-[#232330] hover:border-[#ff6b35]/40 transition-all"
                >
                  <div className="w-8 h-8 rounded-lg bg-[#ff6b35]/10 text-[#ff6b35] flex items-center justify-center mb-4">
                    <Briefcase className="w-4 h-4" />
                  </div>
                  <h3 className="font-bold text-white text-base">{career.career_name}</h3>
                  <div className="text-xs text-[#ff6b35] font-semibold mt-1">{career.industry}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 6. FAQS ACCORDION */}
      {course.faqs && course.faqs.length > 0 && (
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-xs font-bold text-[#ff6b35] uppercase tracking-widest mb-2">
              Questions &amp; Answers
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-8">
              Frequently Asked Questions
            </h2>

            <div className="space-y-4 max-w-4xl">
              {course.faqs.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div
                    key={idx}
                    className="rounded-xl bg-[#121217] border border-[#232330] overflow-hidden"
                  >
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-white hover:text-[#ff6b35] transition-colors text-sm"
                    >
                      <span>{faq.question}</span>
                      <ChevronDown
                        className={`w-4 h-4 shrink-0 transition-transform ${isOpen ? 'rotate-180 text-[#ff6b35]' : ''}`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-gray-300 border-t border-white/5 leading-relaxed">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* 7. ENROLLMENT CTA */}
      <section className="py-16 bg-gradient-to-r from-[#ff6b35] to-[#e0531c] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-4xl font-extrabold font-display">
            Enroll in {course.title}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-white/90 max-w-xl mx-auto">
            Upcoming batch starting soon. Limited seats per batch to guarantee individual mentor attention.
          </p>
          <div className="mt-6 flex justify-center gap-4">
            <Link
              to={`/register?course=${course.slug}`}
              className="px-8 py-3.5 rounded-xl text-sm font-extrabold text-[#0a0a0d] bg-white hover:bg-gray-100 shadow-2xl transition-all hover:scale-105"
            >
              REGISTER FOR THIS COURSE
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
