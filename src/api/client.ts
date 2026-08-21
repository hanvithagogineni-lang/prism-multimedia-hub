import axios from 'axios';
import { Course, Blog, Alumni, Placement, Testimonial, StudentWork, SiteSettings } from '../types';

const API_BASE = (import.meta as any).env?.VITE_API_URL || 'http://localhost:5000/api';

export const api = axios.create({
  baseURL: API_BASE,
  timeout: 4000,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('prism_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Fallback seed data
export const FALLBACK_SETTINGS: SiteSettings = {
  institute_name: 'Prism Multimedia',
  tagline: 'Best Multimedia Training Institute in Hyderabad',
  established_year: '1999',
  phone_primary: '+91 97013 34133',
  phone_secondary: '+91 91775 55040',
  email_primary: 'info@prismmultimedia.com',
  address: '#403, 4th Floor, Delta Chambers, Beside Jeans Corner Lane, Near Chennai Shopping Mall, Ameerpet, Hyderabad, Telangana State – 500016',
  working_hours: 'Monday – Saturday: 8:00 AM – 8:00 PM | Sunday: 10:00 AM – 2:00 PM',
  facebook_url: 'https://www.facebook.com/prismmultimediahyderabad/',
  instagram_url: 'https://www.instagram.com/prismmultimedia/',
  youtube_url: 'https://www.youtube.com/@prismmultimedia',
  linkedin_url: 'https://www.linkedin.com/company/prism-multimedia/',
  google_maps_url: 'https://maps.google.com/?q=Prism+Multimedia+Ameerpet+Hyderabad',
  students_count: '10,000+',
  placement_rate: '100%',
  experience_years: '24+',
  corporate_society: 'Prism Educational Society',
};

export const FALLBACK_COURSES: Course[] = [
  {
    id: 'pgdim',
    title: 'Post Graduate Diploma in Multimedia (PGDIM)',
    slug: 'pgdim',
    short_description: 'Comprehensive 18-month flagship program covering Graphic Design, UI/UX, 2D/3D Animation, VFX, and Video Editing.',
    long_description: 'The Post Graduate Diploma in Multimedia (PGDIM) is Prism Multimedia’s premier flagship master curriculum. Spanning 18 months of intensive hands-on training, live studio briefs, and masterclasses, it equips students with complete cross-disciplinary mastery across design, web technologies, motion graphics, character animation, and film post-production.',
    duration: '18 Months',
    certification: 'Master Professional PGDIM Diploma Certification',
    placement_assistance: '100% Guaranteed Placement Support with Top MNCs',
    online_available: true,
    classroom_available: true,
    hero_image: './program-card-pgdim.jpg',
    status: 'PUBLISHED',
    tools: [
      { id: '1', tool_name: 'Photoshop', sort_order: 1 },
      { id: '2', tool_name: 'Illustrator', sort_order: 2 },
      { id: '3', tool_name: 'Adobe InDesign', sort_order: 3 },
      { id: '4', tool_name: 'HTML5 / CSS3', sort_order: 4 },
      { id: '5', tool_name: 'JavaScript / Angular', sort_order: 5 },
      { id: '6', tool_name: 'Adobe Animate', sort_order: 6 },
      { id: '7', tool_name: 'Premiere Pro', sort_order: 7 },
      { id: '8', tool_name: 'After Effects', sort_order: 8 },
      { id: '9', tool_name: 'Audition', sort_order: 9 },
      { id: '10', tool_name: 'Autodesk Maya', sort_order: 10 },
      { id: '11', tool_name: 'Blender', sort_order: 11 }
    ],
    curriculum: [
      { id: '1', title: 'Module 1: Visual Design & Brand Identity', description: 'Master layout composition, vector graphics, print typography, and high-fidelity branding.', duration: '3 Months', sort_order: 1 },
      { id: '2', title: 'Module 2: UI/UX & Interactive Web Technologies', description: 'Front-end development with HTML, CSS, JavaScript, responsive frameworks, and prototyping.', duration: '3 Months', sort_order: 2 },
      { id: '3', title: 'Module 3: 2D Animation & Motion Graphic Storytelling', description: 'Character animation, storyboard creation, motion graphics, and visual effects.', duration: '4 Months', sort_order: 3 },
      { id: '4', title: 'Module 4: 3D Maya Modeling, Rigging & Animation', description: 'Industry 3D pipeline from asset modeling and texturing to lighting, rigging, and rendering.', duration: '4 Months', sort_order: 4 },
      { id: '5', title: 'Module 5: Film VFX, Video Editing & Capstone Showreel', description: 'Compositing, green screen removal, multi-camera editing, color grading, and portfolio polish.', duration: '4 Months', sort_order: 5 }
    ],
    careers: [
      { id: '1', career_name: 'Lead Multimedia Specialist', industry: 'MNCs & Tech Enterprises' },
      { id: '2', career_name: 'Senior UI/UX Designer', industry: 'Product Companies & Startups' },
      { id: '3', career_name: '3D Animator & Modeler', industry: 'Gaming & Animation Studios' },
      { id: '4', career_name: 'VFX Compositor & Video Editor', industry: 'Film, Broadcast & Advertising' }
    ],
    faqs: [
      { id: '1', question: 'What is the eligibility for PGDIM?', answer: 'Graduates or undergraduates from any discipline with a passion for creative multimedia can enroll.' },
      { id: '2', question: 'Does Prism provide placement for PGDIM?', answer: 'Yes! PGDIM includes 100% placement support with dedicated resume building, portfolio curation, and mock interviews.' }
    ]
  },
  {
    id: 'gdim',
    title: 'Graduate Diploma in Multimedia (GDIM)',
    slug: 'gdim',
    short_description: 'Fast-track 10-month diploma specializing in Graphic Design, UI/UX, Video Editing, and Motion Graphics.',
    long_description: 'GDIM is designed for graduates seeking a high-velocity, practical transition into creative media careers. It combines commercial graphic design, modern responsive UI front-end techniques, and broadcast-quality video editing.',
    duration: '10 Months',
    certification: 'Graduate Diploma in Multimedia Certification',
    placement_assistance: '100% Placement Assistance',
    online_available: true,
    classroom_available: true,
    hero_image: './program-card-gdim.jpg',
    status: 'PUBLISHED',
    tools: [
      { id: '1', tool_name: 'Photoshop', sort_order: 1 },
      { id: '2', tool_name: 'Illustrator', sort_order: 2 },
      { id: '3', tool_name: 'HTML5 / CSS3', sort_order: 3 },
      { id: '4', tool_name: 'Premiere Pro', sort_order: 4 },
      { id: '5', tool_name: 'After Effects', sort_order: 5 }
    ]
  },
  {
    id: 'graphic-design',
    title: 'Graphic Design',
    slug: 'graphic-design',
    short_description: 'Master industry-standard visual design tools, typography, brand identity, and print production.',
    long_description: 'Develop high-impact visual communication skills. Learn color theory, composition grids, vector illustration, and publication layout design used across global marketing agencies and brand studios.',
    duration: '3 Months',
    certification: 'Certified Graphic Design Professional',
    placement_assistance: '100% Placement Support',
    online_available: true,
    classroom_available: true,
    hero_image: './program-card-graphic.jpg',
    status: 'PUBLISHED',
    tools: [
      { id: '1', tool_name: 'Photoshop', sort_order: 1 },
      { id: '2', tool_name: 'Illustrator', sort_order: 2 },
      { id: '3', tool_name: 'Adobe InDesign', sort_order: 3 },
      { id: '4', tool_name: 'CorelDRAW', sort_order: 4 }
    ]
  },
  {
    id: 'ux-design',
    title: 'UX Design',
    slug: 'ux-design',
    short_description: 'User research, wireframing, usability testing, and intuitive design systems for digital apps.',
    long_description: 'Learn how to solve complex user problems by conducting qualitative and quantitative user research, constructing empathy maps, wireframing prototypes in Figma, and running usability benchmarks.',
    duration: '4 Months',
    certification: 'Certified UX Research & Design Specialist',
    placement_assistance: '100% Placement Assistance',
    online_available: true,
    classroom_available: true,
    hero_image: './program-card-ux.jpg',
    status: 'PUBLISHED',
    tools: [
      { id: '1', tool_name: 'Figma', sort_order: 1 },
      { id: '2', tool_name: 'Adobe XD', sort_order: 2 },
      { id: '3', tool_name: 'Miro', sort_order: 3 },
      { id: '4', tool_name: 'FigJam', sort_order: 4 }
    ]
  },
  {
    id: 'ui-design-and-development',
    title: 'UI Design & Development',
    slug: 'ui-design-and-development',
    short_description: 'Design beautiful app interfaces and convert them into responsive, interactive code.',
    long_description: 'Bridge the gap between design and engineering. Create high-fidelity design systems in Figma and build responsive front-ends with HTML, CSS, JavaScript, Bootstrap, jQuery, and Angular.',
    duration: '5 Months',
    certification: 'Certified UI Designer & Front-End Developer',
    placement_assistance: '100% Placement Assistance',
    online_available: true,
    classroom_available: true,
    hero_image: './program-card-uidev.jpg',
    status: 'PUBLISHED',
    tools: [
      { id: '1', tool_name: 'Figma', sort_order: 1 },
      { id: '2', tool_name: 'Photoshop', sort_order: 2 },
      { id: '3', tool_name: 'HTML5 / CSS3', sort_order: 3 },
      { id: '4', tool_name: 'JavaScript', sort_order: 4 },
      { id: '5', tool_name: 'Bootstrap / jQuery', sort_order: 5 }
    ]
  },
  {
    id: '2d-animation',
    title: '2D Animation',
    slug: '2d-animation',
    short_description: 'Character design, storyboarding, digital illustration, and frame-by-frame animation.',
    long_description: 'Bring characters and stories to life with traditional animation principles applied to modern digital pipelines using Adobe Animate, Photoshop, and Premiere Pro.',
    duration: '5 Months',
    certification: 'Certified 2D Animation Artist',
    placement_assistance: '100% Placement Assistance',
    online_available: true,
    classroom_available: true,
    hero_image: './program-card-2d.jpg',
    status: 'PUBLISHED',
    tools: [
      { id: '1', tool_name: 'Adobe Animate', sort_order: 1 },
      { id: '2', tool_name: 'Photoshop', sort_order: 2 },
      { id: '3', tool_name: 'Premiere Pro', sort_order: 3 }
    ]
  },
  {
    id: 'digital-marketing',
    title: 'Digital Marketing',
    slug: 'digital-marketing',
    short_description: 'Master SEO, social media marketing, Google Ads, content strategy, and digital analytics.',
    long_description: 'Build robust digital marketing strategies that generate leads and drive brand growth. Master search engine optimization (SEO), performance pay-per-click advertising, social media campaigns, and Google Analytics.',
    duration: '3 Months',
    certification: 'Certified Digital Marketing Professional',
    placement_assistance: '100% Placement Assistance',
    online_available: true,
    classroom_available: true,
    hero_image: './program-card-dm.jpg',
    status: 'PUBLISHED',
    tools: [
      { id: '1', tool_name: 'Google Ads', sort_order: 1 },
      { id: '2', tool_name: 'Meta Ads Manager', sort_order: 2 },
      { id: '3', tool_name: 'GA4 Analytics', sort_order: 3 },
      { id: '4', tool_name: 'SEMrush', sort_order: 4 }
    ]
  },
  {
    id: 'audio-video-editing',
    title: 'Audio & Video Editing',
    slug: 'audio-video-editing',
    short_description: 'Professional post-production video editing, color grading, sound design, and finishing.',
    long_description: 'Master Adobe Premiere Pro, Audition, and Media Encoder. Learn narrative cutting, multi-camera editing, dialogue cleanup, sound design, and color grading for YouTube, TV, and cinema.',
    duration: '4 Months',
    certification: 'Certified Video Editor & Audio Post-Production Artist',
    placement_assistance: '100% Placement Assistance',
    online_available: true,
    classroom_available: true,
    hero_image: './program-card-av.jpg',
    status: 'PUBLISHED',
    tools: [
      { id: '1', tool_name: 'Premiere Pro', sort_order: 1 },
      { id: '2', tool_name: 'Adobe Audition', sort_order: 2 },
      { id: '3', tool_name: 'DaVinci Resolve', sort_order: 3 },
      { id: '4', tool_name: 'Media Encoder', sort_order: 4 }
    ]
  },
  {
    id: '3d-animation',
    title: '3D Animation',
    slug: '3d-animation',
    short_description: 'Autodesk Maya & Blender 3D modeling, texturing, rigging, lighting, and animation.',
    long_description: 'Step into the world of cinematic 3D animation. Master polygonal modeling, PBR texturing, character skeleton rigging, keyframe animation, Arnold lighting, and rendering pipelines.',
    duration: '6 Months',
    certification: 'Certified 3D Animation & Maya Specialist',
    placement_assistance: '100% Placement Assistance',
    online_available: true,
    classroom_available: true,
    hero_image: './program-card-3d.jpg',
    status: 'PUBLISHED',
    tools: [
      { id: '1', tool_name: 'Autodesk Maya', sort_order: 1 },
      { id: '2', tool_name: 'Blender', sort_order: 2 },
      { id: '3', tool_name: 'Substance 3D Painter', sort_order: 3 },
      { id: '4', tool_name: 'Arnold Renderer', sort_order: 4 }
    ]
  },
  {
    id: 'vfx',
    title: 'VFX (Visual Effects)',
    slug: 'vfx',
    short_description: 'Compositing, green screen keying, camera tracking, rotoscoping, and CGI integration.',
    long_description: 'Transform raw camera footage into cinematic magic. Learn node-based and layer-based compositing, matchmoving camera tracking, rotoscoping, clean plating, and particle effects.',
    duration: '6 Months',
    certification: 'Certified Visual Effects & Compositing Artist',
    placement_assistance: '100% Placement Assistance',
    online_available: true,
    classroom_available: true,
    hero_image: './program-card-vfx.jpg',
    status: 'PUBLISHED',
    tools: [
      { id: '1', tool_name: 'After Effects', sort_order: 1 },
      { id: '2', tool_name: 'Foundry Nuke', sort_order: 2 },
      { id: '3', tool_name: 'Mocha Pro', sort_order: 3 }
    ]
  },
  {
    id: 'motion-graphics',
    title: 'Motion Graphics',
    slug: 'motion-graphics',
    short_description: 'Dynamic kinetic typography, 2D/3D broadcast motion design, and explainer animations.',
    long_description: 'Combine graphic design with movement. Learn keyframe graph editing, kinetic typography, HUD interface motion, 3D camera layers, and logo reveals in After Effects and Premiere Pro.',
    duration: '4 Months',
    certification: 'Certified Motion Graphics Designer',
    placement_assistance: '100% Placement Assistance',
    online_available: true,
    classroom_available: true,
    hero_image: './program-card-motion.jpg',
    status: 'PUBLISHED',
    tools: [
      { id: '1', tool_name: 'After Effects', sort_order: 1 },
      { id: '2', tool_name: 'Premiere Pro', sort_order: 2 },
      { id: '3', tool_name: 'Illustrator', sort_order: 3 },
      { id: '4', tool_name: 'Cinema 4D Lite', sort_order: 4 }
    ]
  },
  {
    id: 'edp',
    title: 'Entrepreneurship Development Program (EDP)',
    slug: 'edp',
    short_description: 'Build your own creative agency, studio, or freelance business with expert mentorship.',
    long_description: 'Designed for ambitious creative minds seeking to launch agencies, freelance businesses, or multimedia production houses. Covers business model canvas, client acquisition, pricing, contract negotiation, and scaling creative teams.',
    duration: '6 Months',
    certification: 'Certified Creative Entrepreneur (EDP)',
    placement_assistance: 'Incubation & Client Referral Support',
    online_available: true,
    classroom_available: true,
    hero_image: './program-card-edp.jpg',
    status: 'PUBLISHED',
    tools: [
      { id: '1', tool_name: 'Business Model Canvas', sort_order: 1 },
      { id: '2', tool_name: 'Notion', sort_order: 2 },
      { id: '3', tool_name: 'Figma', sort_order: 3 },
      { id: '4', tool_name: 'QuickBooks', sort_order: 4 }
    ]
  }
];

export const FALLBACK_ALUMNI: Alumni[] = [
  { id: '1', name: 'Bolle Madhu', designation: 'Graphic Designer', company: 'Sitara Foods', photo: './alumni-bolle-madhu.jpg' },
  { id: '2', name: 'Venkateswara Rao', designation: 'Graphic Designer', company: 'Chota News', photo: './alumni-venkateswara-rao.jpg' },
  { id: '3', name: 'Maggidi Uday Kiran', designation: 'Social Media Executive', company: 'BigTV', photo: './alumni-maggidi-uday.jpg' },
  { id: '4', name: 'Nikhilesh Mishra', designation: 'Social Media Executive', company: 'CyberSRC Consultancy', photo: './alumni-nikhilesh-mishra.jpg' },
  { id: '5', name: 'Yarlagadda Haritha', designation: 'UI UX Designer', company: 'Innomagine Consulting', photo: './alumni-yarlagadda-haritha.jpg' },
  { id: '6', name: 'Byrla Anandakumar', designation: 'Software Engineer', company: 'World Health Organization (WHO)', photo: './alumni-byrla-anandakumar.jpg' },
  { id: '7', name: 'Bokkena Sriguru Sairam', designation: '2D & 3D – VFX Supervisor', company: 'Greengold Animation', photo: './alumni-bokkena-sairam.jpg' },
  { id: '8', name: 'Srinaiah Jinkala', designation: 'Managing Director', company: 'Spruko Technologies', photo: './alumni-srinaiah-jinkala.jpg' },
];

export const FALLBACK_TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Byrla Anandakumar',
    designation: 'Software Engineer',
    company: 'WHO',
    testimonial: 'It was an excellent experience for me, PRISM imparts excellent training, beneficial for both career and personal growth. The faculty is skilled and possesses deep knowledge of subjects.',
    rating: 5,
  },
  {
    id: '2',
    name: 'Krishna Boorugu',
    designation: 'Service Delivery Manager',
    company: 'Cognizant',
    testimonial: 'My tenure at PRISM has been a wonderful experience of prolific learning. It provided the guidance and support needed to grow both professionally and personally.',
    rating: 5,
  },
  {
    id: '3',
    name: 'Mandali Chandra Lekha',
    designation: 'Chief Operating Officer',
    company: 'Shachi Media',
    testimonial: 'Connecting talent with industry is the hallmark of Prism. As an alumna, I have seen this first-hand. It is my pride to have trained at Prism.',
    rating: 5,
  },
  {
    id: '4',
    name: 'Nagesh V',
    designation: 'Technology Lead',
    company: 'Tectoro Consulting',
    testimonial: '“Thank you Prism” is heartfelt from me as an alumnus. I have benefited greatly from the practical, project-based training methodology.',
    rating: 5,
  }
];

export const FALLBACK_BLOGS: Blog[] = [
  {
    id: '1',
    title: 'Master Adobe InDesign: Top 100 Essential Keyboard Shortcuts',
    slug: 'master-adobe-indesign-top-100-essential-keyboard-shortcuts',
    excerpt: 'Complete guide featuring all 100 essential Adobe InDesign shortcuts across document setup, typography, and layout formatting.',
    content: 'Adobe InDesign is the gold standard for editorial design, typography layout, and multi-page publishing. Mastering these 100 keyboard shortcuts will 10x your layout speed across Tools, Document Setup, Typography, Frame Manipulation, and Color swatches.',
    featured_image: './blog-poster-1.jpg',
    published_at: '2026-08-15',
    category: { name: 'Keyboard Shortcuts', slug: 'keyboard-shortcuts' },
  },
  {
    id: '2',
    title: 'Unlock Efficiency: Top 100 Adobe Illustrator Keyboard Shortcuts',
    slug: 'unlock-efficiency-top-100-adobe-illustrator-keyboard-shortcuts',
    excerpt: 'Boost your vector workflow with 100 must-know Illustrator shortcuts for pen tool, pathfinders, shapes, and layer hierarchies.',
    content: 'Whether creating iconic vector logos or complex isometric illustrations, knowing your keyboard shortcuts lets you focus entirely on your creative vision.',
    featured_image: './blog-poster-2.jpg',
    published_at: '2026-08-14',
    category: { name: 'Keyboard Shortcuts', slug: 'keyboard-shortcuts' },
  },
  {
    id: '3',
    title: 'Master Adobe Photoshop: Top 100 Time-Saving Shortcuts',
    slug: 'master-adobe-photoshop-top-100-time-saving-shortcuts',
    excerpt: 'The definitive cheat sheet with 100 top Photoshop shortcuts for layer management, masking, retouching, and filter effects.',
    content: 'Photoshop productivity depends on muscle memory. Learn shortcuts for quick masking, blend modes, adjustment layers, and smart object transformations.',
    featured_image: './blog-poster-3.jpg',
    published_at: '2026-08-12',
    category: { name: 'Keyboard Shortcuts', slug: 'keyboard-shortcuts' },
  },
  {
    id: '4',
    title: 'Exploring the Intersection of Multimedia and Social Media',
    slug: 'exploring-the-intersection-of-multimedia-and-social-media',
    excerpt: 'Discover how multimedia micro-animations and rich visual storytelling drive user retention and brand conversions across modern social platforms.',
    content: 'The significance of multimedia has amplified social media potential, allowing brands to communicate authentic stories and engage visually stimulated audiences.',
    featured_image: './blog-poster-4.jpg',
    published_at: '2026-08-10',
    category: { name: 'Career & Industry', slug: 'career' },
  },
  {
    id: '5',
    title: 'Why should I opt for PRISM MULTIMEDIA to boost my career? Top 10 Reasons',
    slug: 'why-should-i-opt-for-prism-multimedia-to-boost-my-career-here-are-top-10-reasons',
    excerpt: 'Explore the top 10 advantages of studying at Prism Multimedia Hyderabad, from 24+ years experience to 100% placement support.',
    content: 'Choosing the right institute is the first critical step for a creative career. Prism Multimedia stands out with experienced faculty, live studio projects, state-of-the-art lab infrastructure, and unmatched alumni placement records.',
    featured_image: './blog-poster-5.jpg',
    published_at: '2026-08-08',
    category: { name: 'Career & Industry', slug: 'career' },
  },
  {
    id: '6',
    title: 'Motion Graphics in User Interface (UI) Design',
    slug: 'motion-graphics-in-user-interface-ui-design',
    excerpt: 'How micro-interactions, smooth easing curves, and dynamic motion graphics elevate digital product usability.',
    content: 'Motion graphics bring life to static app interfaces, giving users immediate visual feedback, spatial orientation, and delighted engagement.',
    featured_image: './blog-poster-6.jpg',
    published_at: '2026-08-05',
    category: { name: 'Design Insights', slug: 'design-insights' },
  }
];

// Unified API Methods with graceful fallbacks
export const fetchCourses = async (params?: any): Promise<Course[]> => {
  try {
    const res = await api.get('/courses', { params });
    return res.data && res.data.length ? res.data : FALLBACK_COURSES;
  } catch {
    return FALLBACK_COURSES;
  }
};

export const fetchCourseBySlug = async (slug: string): Promise<Course | null> => {
  try {
    const res = await api.get(`/courses/${slug}`);
    return res.data;
  } catch {
    return FALLBACK_COURSES.find((c) => c.slug === slug || c.id === slug) || null;
  }
};

export const fetchAlumni = async (): Promise<Alumni[]> => {
  try {
    const res = await api.get('/alumni');
    return res.data && res.data.length ? res.data : FALLBACK_ALUMNI;
  } catch {
    return FALLBACK_ALUMNI;
  }
};

export const fetchTestimonials = async (): Promise<Testimonial[]> => {
  try {
    const res = await api.get('/testimonials');
    return res.data && res.data.length ? res.data : FALLBACK_TESTIMONIALS;
  } catch {
    return FALLBACK_TESTIMONIALS;
  }
};

export const fetchBlogs = async (params?: any): Promise<{ data: Blog[]; pagination?: any }> => {
  try {
    const res = await api.get('/blogs', { params });
    return res.data;
  } catch {
    return { data: FALLBACK_BLOGS, pagination: { total: FALLBACK_BLOGS.length, page: 1, pages: 1 } };
  }
};

export const fetchBlogBySlug = async (slug: string): Promise<Blog | null> => {
  try {
    const res = await api.get(`/blogs/${slug}`);
    return res.data;
  } catch {
    return FALLBACK_BLOGS.find((b) => b.slug === slug || b.id === slug) || null;
  }
};

export const fetchSettings = async (): Promise<SiteSettings> => {
  try {
    const res = await api.get('/settings');
    return { ...FALLBACK_SETTINGS, ...res.data };
  } catch {
    return FALLBACK_SETTINGS;
  }
};
