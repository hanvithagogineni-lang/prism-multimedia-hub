import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Award, ShieldCheck, ArrowRight } from 'lucide-react';
import { Course } from '../types';

interface CourseCardProps {
  course: Course;
}

export const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  return (
    <div className="group relative bg-[#121217] border border-[#232330] hover:border-[#ff6b35]/50 rounded-xl overflow-hidden flex flex-col transition-all duration-300 hover:shadow-2xl hover:shadow-[#ff6b35]/10 hover:-translate-y-1">
      {/* Course Image & Badge */}
      <div className="relative h-48 w-full overflow-hidden bg-gray-900">
        <img
          src={course.hero_image || './program-card-graphic.jpg'}
          alt={course.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e: any) => {
            e.target.src = 'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=800&q=80';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#121217] via-transparent to-transparent" />
        <div className="absolute top-3 right-3 px-2.5 py-1 rounded-md bg-[#0a0a0d]/80 backdrop-blur-md border border-white/10 text-xs font-semibold text-[#ff6b35] flex items-center gap-1">
          <Clock className="w-3.5 h-3.5" />
          <span>{course.duration}</span>
        </div>
      </div>

      {/* Course Details */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-bold text-white group-hover:text-[#ff6b35] transition-colors line-clamp-1">
            {course.title}
          </h3>
          <p className="text-xs text-gray-400 mt-2 line-clamp-2 leading-relaxed">
            {course.short_description}
          </p>

          {/* Highlights */}
          <div className="mt-4 pt-4 border-t border-white/5 space-y-2">
            <div className="flex items-center gap-2 text-xs text-gray-300">
              <Award className="w-3.5 h-3.5 text-[#ff6b35] shrink-0" />
              <span className="truncate">{course.certification}</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-emerald-400">
              <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">{course.placement_assistance}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 pt-4 border-t border-white/5 grid grid-cols-2 gap-2">
          <Link
            to={`/courses/${course.slug}`}
            className="py-2 text-center rounded-lg text-xs font-semibold text-gray-300 bg-white/5 hover:bg-white/10 hover:text-white border border-white/10 transition-colors flex items-center justify-center gap-1"
          >
            <span>View Course</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
          <Link
            to={`/register?course=${course.slug}`}
            className="py-2 text-center rounded-lg text-xs font-bold text-white bg-[#ff6b35] hover:bg-[#e0531c] transition-colors shadow-md shadow-[#ff6b35]/20"
          >
            Register Now
          </Link>
        </div>
      </div>
    </div>
  );
};
