import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Award, CheckCircle } from 'lucide-react';

interface CourseCardProps {
  course: {
    id: number;
    title: string;
    slug: string;
    shortDescription: string;
    duration: string;
    certification: string;
    placementAssistance: string;
    heroImage?: string;
  };
}

export const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  return (
    <div className="bg-[#121217] border border-white/10 rounded-2xl overflow-hidden hover:border-prismOrange/50 transition-all group flex flex-col justify-between shadow-lg hover:shadow-prismOrange/10">
      <div>
        <div className="relative h-48 overflow-hidden">
          <img
            src={course.heroImage || 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=800&q=80'}
            alt={course.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#121217] via-transparent to-transparent"></div>
          <span className="absolute top-3 left-3 bg-prismOrange text-white text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider shadow">
            {course.duration}
          </span>
        </div>
        <div className="p-6">
          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-prismOrange transition-colors">
            {course.title}
          </h3>
          <p className="text-gray-400 text-xs leading-relaxed mb-4 line-clamp-2">
            {course.shortDescription}
          </p>

          <div className="space-y-2 border-t border-white/5 pt-4 text-xs text-gray-300">
            <div className="flex items-center space-x-2">
              <Clock className="w-3.5 h-3.5 text-prismOrange" />
              <span>Duration: <strong className="text-white">{course.duration}</strong></span>
            </div>
            <div className="flex items-center space-x-2">
              <Award className="w-3.5 h-3.5 text-prismOrange" />
              <span>{course.certification}</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-3.5 h-3.5 text-green-400" />
              <span>Placement Support: <strong className="text-green-400">{course.placementAssistance}</strong></span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 pt-0 grid grid-cols-2 gap-3">
        <Link
          to={`/courses/${course.slug}`}
          className="w-full text-center bg-white/5 hover:bg-white/10 text-white text-xs font-semibold py-2.5 rounded-xl border border-white/10 transition-colors"
        >
          View Course
        </Link>
        <Link
          to={`/register?course=${course.slug}`}
          className="w-full text-center bg-prismOrange hover:bg-prismOrangeHover text-white text-xs font-semibold py-2.5 rounded-xl shadow-lg shadow-prismOrange/20 transition-all"
        >
          Register Now
        </Link>
      </div>
    </div>
  );
};
