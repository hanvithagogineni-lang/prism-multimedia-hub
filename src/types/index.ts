export interface Course {
  id: string;
  title: string;
  slug: string;
  short_description: string;
  long_description: string;
  duration: string;
  certification: string;
  placement_assistance: string;
  online_available: boolean;
  classroom_available: boolean;
  hero_image?: string;
  brochure_url?: string;
  status: string;
  categories?: { category: CourseCategory }[];
  tools?: CourseTool[];
  curriculum?: CourseCurriculum[];
  mentors?: CourseMentor[];
  careers?: CourseCareer[];
  projects?: CourseProject[];
  faqs?: FAQ[];
  relatedCourses?: Course[];
}

export interface CourseCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
}

export interface CourseTool {
  id: string;
  tool_name: string;
  tool_icon?: string;
  description?: string;
  sort_order: number;
}

export interface CourseCurriculum {
  id: string;
  title: string;
  description: string;
  duration?: string;
  sort_order: number;
}

export interface CourseMentor {
  id: string;
  mentor_name: string;
  mentor_image?: string;
  designation: string;
  bio?: string;
  sort_order: number;
}

export interface CourseCareer {
  id: string;
  career_name: string;
  industry: string;
  description?: string;
}

export interface CourseProject {
  id: string;
  title: string;
  description: string;
  image_url?: string;
  video_url?: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  sort_order?: number;
}

export interface Alumni {
  id: string;
  name: string;
  photo?: string;
  designation: string;
  company: string;
  story?: string;
  course?: { title: string };
}

export interface Placement {
  id: string;
  student_name: string;
  student_photo?: string;
  job_title: string;
  company: string;
  year: number;
  course?: { title: string };
}

export interface Testimonial {
  id: string;
  name: string;
  photo?: string;
  designation?: string;
  company?: string;
  testimonial: string;
  rating: number;
}

export interface StudentWork {
  id: string;
  title: string;
  student_name: string;
  category_id: string;
  category?: { name: string; slug: string };
  description?: string;
  image_url: string;
  video_url?: string;
  featured?: boolean;
}

export interface Blog {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featured_image?: string;
  category?: { name: string; slug: string };
  author?: { name: string };
  tags?: string;
  published_at?: string;
  recent?: Blog[];
}

export interface StudentRegistration {
  id: string;
  name: string;
  father_name?: string;
  gender: string;
  education: string;
  email: string;
  phone: string;
  alternate_phone?: string;
  course_id: string;
  course?: { title: string };
  address1: string;
  address2?: string;
  city: string;
  state: string;
  country: string;
  status: string;
  admin_notes?: string;
  created_at: string;
}

export interface Lead {
  id: string;
  type: 'contact' | 'course' | 'corporate' | 'franchise';
  name?: string;
  contact_name?: string;
  company_name?: string;
  company?: string;
  email: string;
  phone?: string;
  mobile?: string;
  program?: string;
  location?: string;
  message?: string;
  status: string;
  created_at: string;
}

export interface SiteSettings {
  institute_name: string;
  tagline: string;
  established_year: string;
  phone_primary: string;
  phone_secondary: string;
  email_primary: string;
  address: string;
  working_hours: string;
  facebook_url: string;
  instagram_url: string;
  youtube_url: string;
  linkedin_url: string;
  google_maps_url: string;
  students_count: string;
  placement_rate: string;
  experience_years: string;
  corporate_society: string;
  [key: string]: string;
}
