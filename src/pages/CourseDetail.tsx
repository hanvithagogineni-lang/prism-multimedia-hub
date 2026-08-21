import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { apiRequest } from '../api/client';
import { Clock, Award, CheckCircle, ChevronDown, ChevronUp, Download, Mail, UserCheck } from 'lucide-react';

export const CourseDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [course, setCourse] = useState<any>(null);
  const [related, setRelated] = useState<any[]>([]);
  const [openCurriculum, setOpenCurriculum] = useState<number | null>(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    if (slug) {
      apiRequest(`/courses/${slug}`)
        .then((data) => {
          setCourse(data.course);
          setRelated(data.relatedCourses || []);
        })
        .catch(console.error);
    }
  }, [slug]);

  if (!course) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center text-gray-400">
        Loading course details...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-12 space-y-16">
      {/* Course Hero */}
      <div className="bg-[#121217] border border-white/10 rounded-3xl p-8 sm:p-12 grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-6">
          <span className="text-prismOrange text-xs font-extrabold tracking-widest uppercase block">Course Program</span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white">{course.title}</h1>
          <p className="text-gray-300 text-sm sm:text-base leading-relaxed">{course.longDescription}</p>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-white/10 text-xs">
            <div>
              <span className="text-gray-400 block">Duration</span>
              <span className="text-white font-bold text-sm">{course.duration}</span>
            </div>
            <div>
              <span className="text-gray-400 block">Certification</span>
              <span className="text-white font-bold text-sm">{course.certification}</span>
            </div>
            <div>
              <span className="text-gray-400 block">Placement Support</span>
              <span className="text-green-400 font-bold text-sm">{course.placementAssistance}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 pt-4">
            <Link
              to={`/register?course=${course.slug}`}
              className="bg-prismOrange hover:bg-prismOrangeHover text-white font-bold px-8 py-3 rounded-full shadow-lg shadow-prismOrange/20 text-sm transition-all"
            >
              Register Now
            </Link>
            <Link
              to="/contact"
              className="bg-white/10 hover:bg-white/20 text-white font-bold px-6 py-3 rounded-full border border-white/10 text-sm transition-all"
            >
              Contact Us
            </Link>
          </div>
        </div>

        <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
          <img
            src={course.heroImage || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80'}
            alt={course.title}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Curriculum Accordion */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-white">Course Curriculum</h2>
        <div className="space-y-4">
          {course.curriculum?.map((item: any, idx: number) => (
            <div key={item.id} className="bg-[#121217] border border-white/10 rounded-2xl overflow-hidden">
              <button
                onClick={() => setOpenCurriculum(openCurriculum === idx ? null : idx)}
                className="w-full flex items-center justify-between p-5 text-left font-bold text-white text-sm hover:text-prismOrange transition-colors"
              >
                <span>{item.title}</span>
                {openCurriculum === idx ? <ChevronUp className="w-4 h-4 text-prismOrange" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              {openCurriculum === idx && (
                <div className="px-5 pb-5 text-gray-300 text-xs leading-relaxed border-t border-white/5 pt-3">
                  {item.description}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Software Tools */}
      {course.tools?.length > 0 && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-white">Software Tools Covered</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {course.tools.map((t: any) => (
              <div key={t.id} className="bg-[#121217] border border-white/10 rounded-xl p-4 text-center">
                <div className="font-bold text-white text-sm mb-1">{t.toolName}</div>
                <div className="text-gray-400 text-[11px]">{t.description || 'Master software tool'}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Course FAQs */}
      {course.faqs?.length > 0 && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-white">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {course.faqs.map((f: any, idx: number) => (
              <div key={f.id} className="bg-[#121217] border border-white/10 rounded-2xl p-5">
                <h4 className="font-bold text-white text-sm mb-2">{f.question}</h4>
                <p className="text-gray-300 text-xs leading-relaxed">{f.answer}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
