import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting comprehensive database seed...');

  // 1. Clean existing records in correct relation order
  await prisma.auditLog.deleteMany();
  await prisma.studentRegistration.deleteMany();
  await prisma.courseEnquiry.deleteMany();
  await prisma.contactMessage.deleteMany();
  await prisma.corporateLead.deleteMany();
  await prisma.franchiseLead.deleteMany();
  await prisma.studentWork.deleteMany();
  await prisma.studentWorkCategory.deleteMany();
  await prisma.alumni.deleteMany();
  await prisma.placement.deleteMany();
  await prisma.testimonial.deleteMany();
  await prisma.blog.deleteMany();
  await prisma.blogCategory.deleteMany();
  await prisma.media.deleteMany();
  await prisma.setting.deleteMany();
  await prisma.seoMetadata.deleteMany();
  await prisma.courseProject.deleteMany();
  await prisma.courseCareer.deleteMany();
  await prisma.courseMentor.deleteMany();
  await prisma.courseTool.deleteMany();
  await prisma.courseCurriculum.deleteMany();
  await prisma.fAQ.deleteMany();
  await prisma.courseCategoryMap.deleteMany();
  await prisma.course.deleteMany();
  await prisma.courseCategory.deleteMany();
  await prisma.rolePermission.deleteMany();
  await prisma.permission.deleteMany();
  await prisma.user.deleteMany();
  await prisma.role.deleteMany();

  // 2. Seed Roles & Permissions
  const superAdminRole = await prisma.role.create({ data: { name: 'SUPER_ADMIN' } });
  const adminRole = await prisma.role.create({ data: { name: 'ADMIN' } });
  const editorRole = await prisma.role.create({ data: { name: 'EDITOR' } });
  const admissionsRole = await prisma.role.create({ data: { name: 'ADMISSIONS_STAFF' } });

  const permissions = [
    'ALL_ACCESS', 'MANAGE_COURSES', 'MANAGE_LEADS', 'MANAGE_BLOGS',
    'MANAGE_STUDENTS', 'MANAGE_SETTINGS', 'MANAGE_USERS', 'EXPORT_DATA'
  ];

  for (const p of permissions) {
    const perm = await prisma.permission.create({ data: { name: p } });
    await prisma.rolePermission.create({
      data: { role_id: superAdminRole.id, permission_id: perm.id }
    });
  }

  // 3. Seed Super Admin User
  const passwordHash = await bcrypt.hash('Admin@123456', 10);
  const adminUser = await prisma.user.create({
    data: {
      name: 'Super Admin',
      email: 'admin@prismmultimedia.com',
      password_hash: passwordHash,
      role_id: superAdminRole.id,
      status: 'ACTIVE',
    }
  });

  // 4. Seed Course Categories
  const catDesign = await prisma.courseCategory.create({ data: { name: 'Design', slug: 'design', description: 'Visual & Graphic Design' } });
  const catUIUX = await prisma.courseCategory.create({ data: { name: 'UI/UX', slug: 'ui-ux', description: 'User Interface and User Experience' } });
  const catAnimation = await prisma.courseCategory.create({ data: { name: 'Animation', slug: 'animation', description: '2D & 3D Animation' } });
  const catVFX = await prisma.courseCategory.create({ data: { name: 'VFX', slug: 'vfx', description: 'Visual Effects & Compositing' } });
  const catVideo = await prisma.courseCategory.create({ data: { name: 'Video', slug: 'video', description: 'Video Editing & Motion Design' } });
  const catMarketing = await prisma.courseCategory.create({ data: { name: 'Digital Marketing', slug: 'digital-marketing', description: 'Digital Marketing & Growth' } });
  const catEDP = await prisma.courseCategory.create({ data: { name: 'Entrepreneurship', slug: 'entrepreneurship', description: 'Business & Startup Incubation' } });
  const catDiploma = await prisma.courseCategory.create({ data: { name: 'Diploma', slug: 'diploma', description: 'Full Professional Diploma Programs' } });

  // 5. Seed Initial Courses
  const coursesData = [
    {
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
      categories: [catDiploma.id, catDesign.id, catAnimation.id, catVFX.id],
      tools: ['Photoshop', 'Illustrator', 'Adobe InDesign', 'HTML5', 'CSS3', 'JavaScript', 'Bootstrap', 'jQuery', 'Angular', 'Adobe Animate', 'Premiere Pro', 'After Effects', 'Media Encoder', 'Audition', 'Autodesk Maya', 'Blender'],
      curriculum: [
        { title: 'Module 1: Visual Design & Brand Identity', desc: 'Master layout composition, vector graphics, print typography, and high-fidelity branding.', duration: '3 Months' },
        { title: 'Module 2: UI/UX & Interactive Web Technologies', desc: 'Front-end development with HTML, CSS, JavaScript, responsive frameworks, and prototyping.', duration: '3 Months' },
        { title: 'Module 3: 2D Animation & Motion Graphic Storytelling', desc: 'Character animation, storyboard creation, motion graphics, and visual effects.', duration: '4 Months' },
        { title: 'Module 4: 3D Maya Modeling, Rigging & Animation', desc: 'Industry 3D pipeline from asset modeling and texturing to lighting, rigging, and rendering.', duration: '4 Months' },
        { title: 'Module 5: Film VFX, Video Editing & Capstone Showreel', desc: 'Compositing, green screen removal, multi-camera editing, color grading, and portfolio polish.', duration: '4 Months' }
      ],
      careers: [
        { name: 'Lead Multimedia Specialist', industry: 'MNCs & Tech Enterprises' },
        { name: 'Senior UI/UX Designer', industry: 'Product Companies & Startups' },
        { name: '3D Animator & Modeler', industry: 'Gaming & Animation Studios' },
        { name: 'VFX Compositor & Video Editor', industry: 'Film, Broadcast & Advertising' }
      ]
    },
    {
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
      categories: [catDiploma.id, catDesign.id, catVideo.id],
      tools: ['Photoshop', 'Illustrator', 'Adobe InDesign', 'HTML5', 'CSS3', 'JavaScript', 'Premiere Pro', 'After Effects'],
      curriculum: [
        { title: 'Commercial Graphic Design', desc: 'Print media, brand guidelines, typography, and advertising design.', duration: '3 Months' },
        { title: 'UI Design & Front-End Basics', desc: 'Web layouts, responsive design, HTML, CSS, and basic JavaScript.', duration: '3 Months' },
        { title: 'Video Editing & Motion Graphics', desc: 'Timeline editing, audio sweetening, title motion, and showreel creation.', duration: '4 Months' }
      ],
      careers: [
        { name: 'Creative Designer', industry: 'Advertising & Marketing Agencies' },
        { name: 'Motion Graphic Artist', industry: 'Broadcasting & YouTube Media' },
        { name: 'Web UI Designer', industry: 'IT & Software Firms' }
      ]
    },
    {
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
      categories: [catDesign.id],
      tools: ['Photoshop', 'Illustrator', 'Adobe InDesign', 'Adobe Acrobat', 'CorelDRAW'],
      curriculum: [
        { title: 'Design Principles & Color Psychology', desc: 'Understanding color harmonies, typography hierarchy, and visual balance.', duration: '2 Weeks' },
        { title: 'Raster Graphics & Photo Manipulation', desc: 'Mastering Adobe Photoshop tools, layers, masking, and commercial retouching.', duration: '4 Weeks' },
        { title: 'Vector Illustration & Logo Crafting', desc: 'Adobe Illustrator pathfinding, iconography, branding suites, and merchandise.', duration: '4 Weeks' },
        { title: 'Editorial Publishing & Print Prep', desc: 'InDesign multi-page book layouts, magazine spreads, pre-press calibration.', duration: '2 Weeks' }
      ],
      careers: [
        { name: 'Brand Identity Designer', industry: 'Creative Agencies' },
        { name: 'Packaging & Print Specialist', industry: 'Publishing & Packaging' },
        { name: 'Digital Visual Artist', industry: 'E-commerce & Social Media' }
      ]
    },
    {
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
      categories: [catUIUX.id],
      tools: ['Figma', 'Adobe XD', 'Miro', 'Notion', 'FigJam'],
      curriculum: [
        { title: 'User Research & Personas', desc: 'Interviews, surveys, persona creation, and empathy mapping.', duration: '3 Weeks' },
        { title: 'Information Architecture & User Journeys', desc: 'Sitemaps, user flows, journey maps, and wireframe blueprints.', duration: '4 Weeks' },
        { title: 'Interactive Prototyping & Design Systems', desc: 'High-fidelity Figma prototypes, component libraries, and tokens.', duration: '5 Weeks' },
        { title: 'Usability Testing & Case Studies', desc: 'A/B testing, user testing heuristics, and portfolio case studies.', duration: '4 Weeks' }
      ],
      careers: [
        { name: 'UX Researcher', industry: 'Product Companies' },
        { name: 'Product Experience Designer', industry: 'SaaS & Fintech' },
        { name: 'Information Architect', industry: 'Enterprise IT' }
      ]
    },
    {
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
      categories: [catUIUX.id, catDesign.id],
      tools: ['Figma', 'Photoshop', 'Illustrator', 'HTML5', 'CSS3', 'JavaScript', 'Bootstrap', 'jQuery', 'Angular'],
      curriculum: [
        { title: 'UI Design Systems & Components', desc: 'Designing modern UI interfaces, typography, and responsive grids.', duration: '4 Weeks' },
        { title: 'HTML5 Semantic Layouts & CSS3 Styling', desc: 'CSS Flexbox, CSS Grid, media queries, and fluid layouts.', duration: '6 Weeks' },
        { title: 'JavaScript & Interactive DOM Scripting', desc: 'ES6 JavaScript, events, AJAX, animations, and jQuery.', duration: '6 Weeks' },
        { title: 'Front-End Frameworks (Angular/Bootstrap)', desc: 'Component architecture, single-page application structure, and hosting.', duration: '4 Weeks' }
      ],
      careers: [
        { name: 'UI/UX Developer', industry: 'Tech Startups & IT Services' },
        { name: 'Front-End Web Engineer', industry: 'Software Agencies' },
        { name: 'Web App UI Designer', industry: 'Digital Product Studios' }
      ]
    },
    {
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
      categories: [catAnimation.id],
      tools: ['Adobe Animate', 'Photoshop', 'Illustrator', 'Premiere Pro', 'Media Encoder'],
      curriculum: [
        { title: '12 Principles of Animation', desc: 'Squash & stretch, timing, anticipation, easing, and staging.', duration: '4 Weeks' },
        { title: 'Character Design & Model Sheets', desc: 'Drawing turnaround sheets, expressions, and anatomy.', duration: '4 Weeks' },
        { title: 'Digital Vector Animation in Adobe Animate', desc: 'Symbol rigging, bone tools, lip sync, and frame-by-frame animation.', duration: '8 Weeks' },
        { title: 'Audio Synchronization & Short Film Production', desc: 'Voiceover sync, background art compositing, and final movie export.', duration: '4 Weeks' }
      ],
      careers: [
        { name: '2D Character Animator', industry: 'Animation Studios & Gaming' },
        { name: 'Storyboard Artist', industry: 'Film & Advertising' },
        { name: 'Digital Caricature Artist', industry: 'Publishing & Media' }
      ]
    },
    {
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
      categories: [catMarketing.id],
      tools: ['Google Ads', 'Google Analytics 4', 'Meta Ads Manager', 'SEMrush', 'WordPress', 'Mailchimp', 'Canva'],
      curriculum: [
        { title: 'Search Engine Optimization (SEO)', desc: 'On-page SEO, technical audits, keyword research, and backlink strategies.', duration: '3 Weeks' },
        { title: 'Social Media Marketing & Meta Ads', desc: 'Organic growth, viral reels strategy, paid Meta campaign funnels.', duration: '3 Weeks' },
        { title: 'Google Ads & Performance Marketing', desc: 'Search ads, Display network, YouTube video campaigns, and conversion tracking.', duration: '3 Weeks' },
        { title: 'Analytics, Email Marketing & Strategy', desc: 'GA4 data interpretation, ROI metrics, email automation funnels.', duration: '3 Weeks' }
      ],
      careers: [
        { name: 'Digital Marketing Specialist', industry: 'Corporate & Brands' },
        { name: 'SEO & Performance Lead', industry: 'E-commerce & Agencies' },
        { name: 'Social Media Strategist', industry: 'Media & Influencer Brands' }
      ]
    },
    {
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
      categories: [catVideo.id],
      tools: ['Premiere Pro', 'Adobe Audition', 'DaVinci Resolve', 'Media Encoder'],
      curriculum: [
        { title: 'Non-Linear Editing Fundamentals', desc: 'Timeline management, cutting pacing, shot selections, and transitions.', duration: '4 Weeks' },
        { title: 'Audio Restoration & Sound Design', desc: 'Noise reduction, equalization, ambient Foley, and master audio mixing.', duration: '4 Weeks' },
        { title: 'Color Correction & Color Grading', desc: 'Lumetri Color scopes, LUTs, mood lighting, and HDR export.', duration: '4 Weeks' },
        { title: 'Multi-Cam Editing & Showreel Packaging', desc: 'Concert/podcast multi-cam workflow, high-res delivery, and showreel.', duration: '4 Weeks' }
      ],
      careers: [
        { name: 'Professional Video Editor', industry: 'Film, TV & YouTube Studios' },
        { name: 'Sound Designer & Podcast Mixer', industry: 'Audio Production & Radio' },
        { name: 'Colorist & Finishing Artist', industry: 'Post-Production Houses' }
      ]
    },
    {
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
      categories: [catAnimation.id],
      tools: ['Autodesk Maya', 'Blender', 'Substance 3D Painter', 'Arnold Renderer'],
      curriculum: [
        { title: '3D Asset Modeling & Topology', desc: 'Hard-surface props, environments, and organic character modeling.', duration: '6 Weeks' },
        { title: 'PBR Texturing & UV Unwrapping', desc: 'Substance Painter texturing, UV layout optimization, and material creation.', duration: '4 Weeks' },
        { title: 'Character Rigging & Skinning', desc: 'FK/IK bone controls, facial blendshapes, and weight painting.', duration: '6 Weeks' },
        { title: '3D Animation, Lighting & Arnold Rendering', desc: 'Walk cycles, physics interactions, three-point lighting, and batch rendering.', duration: '8 Weeks' }
      ],
      careers: [
        { name: '3D Character Animator', industry: 'Gaming & Animation Studios' },
        { name: '3D Environment Artist', industry: 'Architectural & Game Design' },
        { name: 'Lighting & Rendering Artist', industry: 'Visual Effects Studios' }
      ]
    },
    {
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
      categories: [catVFX.id],
      tools: ['After Effects', 'Foundry Nuke', 'Mocha Pro', 'Photoshop', 'Premiere Pro'],
      curriculum: [
        { title: 'Rotoscoping & Paint / Clean Plate', desc: 'Silhouette painting, wire removal, and background reconstruction.', duration: '6 Weeks' },
        { title: 'Green Screen Keying & Spill Suppression', desc: 'Primatte, Keylight, edge refining, and core matte management.', duration: '6 Weeks' },
        { title: '3D Matchmoving & Planar Tracking', desc: 'Mocha Pro tracking, camera solving, and CGI asset integration.', duration: '6 Weeks' },
        { title: 'Final Compositing & Particle FX', desc: 'Atmospheric depth, color matching, muzzle flashes, and showreel.', duration: '6 Weeks' }
      ],
      careers: [
        { name: 'VFX Compositor', industry: 'Feature Film & OTT Studios' },
        { name: 'Roto & Paint Artist', industry: 'VFX Production Houses' },
        { name: 'Matchmove & Tracking Specialist', industry: 'Commercial Advertising' }
      ]
    },
    {
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
      categories: [catVideo.id, catDesign.id],
      tools: ['After Effects', 'Premiere Pro', 'Illustrator', 'Cinema 4D Lite', 'Media Encoder'],
      curriculum: [
        { title: 'Motion Fundamentals & Easing Curves', desc: 'Speed graphs, value curves, rhythm, and kinetic motion physics.', duration: '4 Weeks' },
        { title: 'Kinetic Typography & Title Sequences', desc: 'Text animators, 3D space typography, and title intro design.', duration: '4 Weeks' },
        { title: 'Vector Motion & Explainer Videos', desc: 'Importing vector artwork, shape layers, and character rigs.', duration: '4 Weeks' },
        { title: 'Commercial Broadcast Graphics & Reels', desc: 'Lower thirds, channel branding, product promo packaging.', duration: '4 Weeks' }
      ],
      careers: [
        { name: 'Motion Graphics Artist', industry: 'Design Agencies & TV Channels' },
        { name: 'Explainer Video Animator', industry: 'Tech Startups & Marketing' },
        { name: 'UI Motion Designer', industry: 'Product & Mobile App Studios' }
      ]
    },
    {
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
      categories: [catEDP.id, catDiploma.id],
      tools: ['Business Model Canvas', 'Notion', 'Figma', 'Google Workspace', 'QuickBooks'],
      curriculum: [
        { title: 'Creative Business Foundations & Niche Selection', desc: 'Identifying market opportunities, positioning, and service offerings.', duration: '6 Weeks' },
        { title: 'Marketing, Lead Generation & Sales Funnels', desc: 'Inbound marketing, proposal drafting, and client closing techniques.', duration: '6 Weeks' },
        { title: 'Financial Planning, Contracts & Legalities', desc: 'Pricing models, project contracts, invoices, and cash flow management.', duration: '6 Weeks' },
        { title: 'Studio Operations, Team Scaling & Incubation', desc: 'Hiring freelancers, project delivery systems, and live business launch.', duration: '6 Weeks' }
      ],
      careers: [
        { name: 'Creative Agency Founder', industry: 'Self-Employed / Studio Owner' },
        { name: 'Independent High-Ticket Freelancer', industry: 'Global Remote Consulting' },
        { name: 'Creative Studio Director', industry: 'Production & Digital Media' }
      ]
    }
  ];

  for (const c of coursesData) {
    const course = await prisma.course.create({
      data: {
        title: c.title,
        slug: c.slug,
        short_description: c.short_description,
        long_description: c.long_description,
        duration: c.duration,
        certification: c.certification,
        placement_assistance: c.placement_assistance,
        online_available: c.online_available,
        classroom_available: c.classroom_available,
        hero_image: c.hero_image,
        seo_title: `${c.title} Training in Hyderabad | Prism Multimedia`,
        seo_description: `Learn ${c.title} with 100% placement support at Prism Multimedia, Ameerpet, Hyderabad.`,
      }
    });

    // Link categories
    for (const catId of c.categories) {
      await prisma.courseCategoryMap.create({
        data: { course_id: course.id, category_id: catId }
      });
    }

    // Tools
    for (let i = 0; i < c.tools.length; i++) {
      await prisma.courseTool.create({
        data: { course_id: course.id, tool_name: c.tools[i], sort_order: i }
      });
    }

    // Curriculum
    for (let i = 0; i < c.curriculum.length; i++) {
      await prisma.courseCurriculum.create({
        data: {
          course_id: course.id,
          title: c.curriculum[i].title,
          description: c.curriculum[i].desc,
          duration: c.curriculum[i].duration,
          sort_order: i
        }
      });
    }

    // Careers
    for (const car of c.careers) {
      await prisma.courseCareer.create({
        data: {
          course_id: course.id,
          career_name: car.name,
          industry: car.industry,
        }
      });
    }

    // Common Course FAQs
    await prisma.fAQ.createMany({
      data: [
        { course_id: course.id, question: `What are the prerequisites for the ${c.title} course?`, answer: 'No prior technical background is required. We start from basic foundations and advance to studio-grade mastery.' },
        { course_id: course.id, question: `Is placement assistance provided after completing ${c.title}?`, answer: 'Yes, Prism Multimedia provides 100% placement assistance, resume preparation, mock interviews, and showreel guidance.' }
      ]
    });
  }

  // 6. Seed Institute FAQs
  await prisma.fAQ.createMany({
    data: [
      { question: 'What courses does Prism Multimedia offer?', answer: 'Prism Multimedia offers comprehensive training in Graphic Design, UI/UX Design, 2D Animation, 3D Animation, VFX, Audio & Video Editing, Digital Marketing, EDP, and Flagship PGDIM.', sort_order: 1 },
      { question: 'Why should I choose Prism Multimedia for multimedia training?', answer: 'Established in 1999 with 24+ years of excellence, Prism Multimedia offers certified expert mentors, studio workflow training, 10,000+ successful alumni, and 100% placement support.', sort_order: 2 },
      { question: 'Are the courses at Prism Multimedia suitable for beginners?', answer: 'Yes! All courses are structured from absolute fundamentals to advanced production pipelines suitable for students, graduates, and working professionals.', sort_order: 3 },
      { question: 'How can I enroll in a course at Prism Multimedia?', answer: 'You can submit the online registration form on our website or visit our Ameerpet campus directly for in-person counseling.', sort_order: 4 },
      { question: 'Can I find job opportunities through Prism Multimedia?', answer: 'Yes, our dedicated placement cell actively connects students with hiring partners across creative agencies, animation studios, and IT firms.', sort_order: 5 }
    ]
  });

  // 7. Seed Alumni
  const pGDIMCourse = await prisma.course.findFirst({ where: { slug: 'pgdim' } });
  const graphicCourse = await prisma.course.findFirst({ where: { slug: 'graphic-design' } });
  const uiuxCourse = await prisma.course.findFirst({ where: { slug: 'ui-design-and-development' } });
  const vfxCourse = await prisma.course.findFirst({ where: { slug: 'vfx' } });

  const alumniList = [
    { name: 'Bolle Madhu', designation: 'Graphic Designer', company: 'Sitara Foods', photo: './alumni-bolle-madhu.jpg', course_id: graphicCourse?.id || pGDIMCourse!.id },
    { name: 'Venkateswara Rao', designation: 'Graphic Designer', company: 'Chota News', photo: './alumni-venkateswara-rao.jpg', course_id: graphicCourse?.id || pGDIMCourse!.id },
    { name: 'Maggidi Uday Kiran', designation: 'Social Media Executive', company: 'BigTV', photo: './alumni-maggidi-uday.jpg', course_id: graphicCourse?.id || pGDIMCourse!.id },
    { name: 'Nikhilesh Mishra', designation: 'Social Media Executive', company: 'CyberSRC Consultancy', photo: './alumni-nikhilesh-mishra.jpg', course_id: graphicCourse?.id || pGDIMCourse!.id },
    { name: 'Yarlagadda Haritha', designation: 'UI UX Designer', company: 'Innomagine Consulting', photo: './alumni-yarlagadda-haritha.jpg', course_id: uiuxCourse?.id || pGDIMCourse!.id },
    { name: 'Byrla Anandakumar', designation: 'Software Engineer', company: 'World Health Organization (WHO)', photo: './alumni-byrla-anandakumar.jpg', course_id: pGDIMCourse!.id },
    { name: 'Bokkena Sriguru Sairam', designation: '2D & 3D – VFX Supervisor', company: 'Greengold Animation', photo: './alumni-bokkena-sairam.jpg', course_id: vfxCourse?.id || pGDIMCourse!.id },
    { name: 'Srinaiah Jinkala', designation: 'Managing Director', company: 'Spruko Technologies', photo: './alumni-srinaiah-jinkala.jpg', course_id: pGDIMCourse!.id }
  ];

  for (const a of alumniList) {
    await prisma.alumni.create({
      data: {
        name: a.name,
        designation: a.designation,
        company: a.company,
        photo: a.photo,
        course_id: a.course_id,
        featured: true,
      }
    });
  }

  // 8. Seed Testimonials
  await prisma.testimonial.createMany({
    data: [
      {
        name: 'Byrla Anandakumar',
        designation: 'Software Engineer',
        company: 'WHO',
        testimonial: 'It was an excellent experience for me, PRISM imparts excellent training, beneficial for both career and personal growth. The faculty is skilled and possesses deep knowledge of subjects.',
        rating: 5,
        featured: true,
      },
      {
        name: 'Krishna Boorugu',
        designation: 'Service Delivery Manager',
        company: 'Cognizant',
        testimonial: 'My tenure at PRISM has been a wonderful experience of prolific learning. It provided the guidance and support needed to grow both professionally and personally.',
        rating: 5,
        featured: true,
      },
      {
        name: 'Mandali Chandra Lekha',
        designation: 'Chief Operating Officer',
        company: 'Shachi Media',
        testimonial: 'Connecting talent with industry is the hallmark of Prism. As an alumna, I have seen this first-hand. It is my pride to have trained at Prism.',
        rating: 5,
        featured: true,
      },
      {
        name: 'Nagesh V',
        designation: 'Technology Lead',
        company: 'Tectoro Consulting',
        testimonial: '“Thank you Prism” is heartfelt from me as an alumnus. I have benefited greatly from the practical, project-based training methodology.',
        rating: 5,
        featured: true,
      }
    ]
  });

  // 9. Seed Placements
  const placementCompanies = [
    { student: 'Bolle Madhu', role: 'Graphic Designer', company: 'Sitara Foods', year: 2025 },
    { student: 'Venkateswara Rao', role: 'Senior Visual Artist', company: 'Chota News', year: 2025 },
    { student: 'Yarlagadda Haritha', role: 'UI/UX Designer', company: 'Innomagine Consulting', year: 2024 },
    { student: 'Bokkena Sriguru Sairam', role: 'VFX Supervisor', company: 'Greengold Animation', year: 2024 },
    { student: 'Anantha Krishnan', role: '3D Compositor', company: 'Prime Focus', year: 2025 },
    { student: 'Priyanka Reddy', role: 'Motion Graphic Artist', company: 'Cognizant Media', year: 2025 },
    { student: 'Rakesh Sharma', role: 'Web Front-End Lead', company: 'TCS Interactive', year: 2024 },
    { student: 'Vikram Kumar', role: 'Digital Marketing Strategist', company: 'Spruko Tech', year: 2025 }
  ];

  for (const p of placementCompanies) {
    await prisma.placement.create({
      data: {
        student_name: p.student,
        job_title: p.role,
        company: p.company,
        year: p.year,
        course_id: pGDIMCourse!.id,
      }
    });
  }

  // 10. Seed Student Works
  const swCatGraphic = await prisma.studentWorkCategory.create({ data: { name: 'Graphic Design', slug: 'graphic-design' } });
  const swCatUI = await prisma.studentWorkCategory.create({ data: { name: 'UI/UX', slug: 'ui-ux' } });
  const swCatAnim = await prisma.studentWorkCategory.create({ data: { name: 'Animation', slug: 'animation' } });
  const swCatVFX = await prisma.studentWorkCategory.create({ data: { name: 'VFX', slug: 'vfx' } });

  await prisma.studentWork.createMany({
    data: [
      { title: 'Brand Identity System', student_name: 'Rahul Varma', category_id: swCatGraphic.id, image_url: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=800&q=80', description: 'Complete brand guidelines, stationery, and packaging suite.' },
      { title: 'Fintech Mobile App UI', student_name: 'Sneha Patel', category_id: swCatUI.id, image_url: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&w=800&q=80', description: 'Micro-interaction design, user flows, and wireframes for mobile wallet.' },
      { title: '2D Character Short Film', student_name: 'Arjun Das', category_id: swCatAnim.id, image_url: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?auto=format&fit=crop&w=800&q=80', description: 'Hand-crafted digital vector animation and storyboard pacing.' },
      { title: 'CGI Alien Environment VFX', student_name: 'Kavita Menon', category_id: swCatVFX.id, image_url: 'https://images.unsplash.com/photo-1535016120720-40c646be5580?auto=format&fit=crop&w=800&q=80', description: 'Camera matchmoving, live-action keying, and particle dust layers.' }
    ]
  });

  // 11. Seed Blog Categories and Blogs
  const bCatShortcuts = await prisma.blogCategory.create({ data: { name: 'Keyboard Shortcuts', slug: 'keyboard-shortcuts' } });
  const bCatCareer = await prisma.blogCategory.create({ data: { name: 'Career & Industry', slug: 'career' } });
  const bCatDesign = await prisma.blogCategory.create({ data: { name: 'Design Insights', slug: 'design-insights' } });

  const blogsList = [
    {
      title: 'Master Adobe InDesign: Top 100 Essential Keyboard Shortcuts',
      slug: 'master-adobe-indesign-top-100-essential-keyboard-shortcuts',
      category_id: bCatShortcuts.id,
      excerpt: 'Complete guide featuring all 100 essential Adobe InDesign shortcuts across document setup, typography, and layout formatting.',
      content: 'Adobe InDesign is the gold standard for editorial design, typography layout, and multi-page publishing. Mastering these 100 keyboard shortcuts will 10x your layout speed across Tools, Document Setup, Typography, Frame Manipulation, and Color swatches.',
      image: './blog-poster-1.jpg'
    },
    {
      title: 'Unlock Efficiency: Top 100 Adobe Illustrator Keyboard Shortcuts',
      slug: 'unlock-efficiency-top-100-adobe-illustrator-keyboard-shortcuts',
      category_id: bCatShortcuts.id,
      excerpt: 'Boost your vector workflow with 100 must-know Illustrator shortcuts for pen tool, pathfinders, shapes, and layer hierarchies.',
      content: 'Whether creating iconic vector logos or complex isometric illustrations, knowing your keyboard shortcuts lets you focus entirely on your creative vision.',
      image: './blog-poster-2.jpg'
    },
    {
      title: 'Master Adobe Photoshop: Top 100 Time-Saving Shortcuts',
      slug: 'master-adobe-photoshop-top-100-time-saving-shortcuts',
      category_id: bCatShortcuts.id,
      excerpt: 'The definitive cheat sheet with 100 top Photoshop shortcuts for layer management, masking, retouching, and filter effects.',
      content: 'Photoshop productivity depends on muscle memory. Learn shortcuts for quick masking, blend modes, adjustment layers, and smart object transformations.',
      image: './blog-poster-3.jpg'
    },
    {
      title: 'Exploring the Intersection of Multimedia and Social Media',
      slug: 'exploring-the-intersection-of-multimedia-and-social-media',
      category_id: bCatCareer.id,
      excerpt: 'Discover how multimedia micro-animations and rich visual storytelling drive user retention and brand conversions across modern social platforms.',
      content: 'The significance of multimedia has amplified social media potential, allowing brands to communicate authentic stories and engage visually stimulated audiences.',
      image: './blog-poster-4.jpg'
    },
    {
      title: 'Why should I opt for PRISM MULTIMEDIA to boost my career? Top 10 Reasons',
      slug: 'why-should-i-opt-for-prism-multimedia-to-boost-my-career-here-are-top-10-reasons',
      category_id: bCatCareer.id,
      excerpt: 'Explore the top 10 advantages of studying at Prism Multimedia Hyderabad, from 24+ years experience to 100% placement support.',
      content: 'Choosing the right institute is the first critical step for a creative career. Prism Multimedia stands out with experienced faculty, live studio projects, state-of-the-art lab infrastructure, and unmatched alumni placement records.',
      image: './blog-poster-5.jpg'
    },
    {
      title: 'Motion Graphics in User Interface (UI) Design',
      slug: 'motion-graphics-in-user-interface-ui-design',
      category_id: bCatDesign.id,
      excerpt: 'How micro-interactions, smooth easing curves, and dynamic motion graphics elevate digital product usability.',
      content: 'Motion graphics bring life to static app interfaces, giving users immediate visual feedback, spatial orientation, and delighted engagement.',
      image: './blog-poster-6.jpg'
    }
  ];

  for (const b of blogsList) {
    await prisma.blog.create({
      data: {
        title: b.title,
        slug: b.slug,
        excerpt: b.excerpt,
        content: b.content,
        category_id: b.category_id,
        author_id: adminUser.id,
        featured_image: b.image,
        published: true,
        seo_title: `${b.title} | Prism Multimedia Blog`,
        seo_description: b.excerpt,
      }
    });
  }

  // 12. Seed Site Settings
  const settingsData = [
    { key: 'institute_name', value: 'Prism Multimedia' },
    { key: 'established_year', value: '1999' },
    { key: 'tagline', value: 'Best Multimedia Training Institute in Hyderabad' },
    { key: 'phone_primary', value: '+91 97013 34133' },
    { key: 'phone_secondary', value: '+91 91775 55040' },
    { key: 'email_primary', value: 'info@prismmultimedia.com' },
    { key: 'address', value: '#403, 4th Floor, Delta Chambers, Beside Jeans Corner Lane, Near Chennai Shopping Mall, Ameerpet, Hyderabad, Telangana State – 500016' },
    { key: 'working_hours', value: 'Monday – Saturday: 8:00 AM – 8:00 PM | Sunday: 10:00 AM – 2:00 PM' },
    { key: 'facebook_url', value: 'https://www.facebook.com/prismmultimediahyderabad/' },
    { key: 'instagram_url', value: 'https://www.instagram.com/prismmultimedia/' },
    { key: 'youtube_url', value: 'https://www.youtube.com/@prismmultimedia' },
    { key: 'linkedin_url', value: 'https://www.linkedin.com/company/prism-multimedia/' },
    { key: 'google_maps_url', value: 'https://maps.google.com/?q=Prism+Multimedia+Ameerpet+Hyderabad' },
    { key: 'students_count', value: '10,000+' },
    { key: 'placement_rate', value: '100%' },
    { key: 'experience_years', value: '24+' },
    { key: 'corporate_society', value: 'Prism Educational Society' }
  ];

  for (const s of settingsData) {
    await prisma.setting.create({ data: s });
  }

  // 13. Seed SEO Metadata
  const seoData = [
    { page: 'home', title: 'Prism Multimedia | Best Multimedia Training Institute in Hyderabad', description: 'Join Prism Multimedia for Graphic Design, UI/UX, 3D Animation, VFX, Video Editing & Digital Marketing with 100% placement support.' },
    { page: 'courses', title: 'All Multimedia Courses | Prism Multimedia', description: 'Explore industry-certified professional courses in Graphic Design, UI/UX, Animation, VFX, Video Editing & PGDIM.' },
    { page: 'about', title: 'About Us | 24+ Years of Multimedia Excellence | Prism Multimedia', description: 'Learn about Prism Multimedia established in 1999, our faculty, training philosophy, and educational mission.' },
    { page: 'placements', title: '100% Placement Support & Recruiter Network | Prism Multimedia', description: 'Check our verified student placement track record and hiring partner network across top studios and MNCs.' },
    { page: 'alumni', title: 'Alumni Success Stories | Prism Multimedia', description: 'Discover where our 10,000+ alumni work today, including WHO, Cognizant, Greengold, Spruko, and BigTV.' },
    { page: 'contact', title: 'Contact Us | Ameerpet Campus | Prism Multimedia', description: 'Get in touch with Prism Multimedia Hyderabad for admissions, batch timings, and career counseling.' },
    { page: 'register', title: 'Student Course Registration | Prism Multimedia', description: 'Register online for upcoming batches in Graphic Design, UI/UX, 3D Animation, VFX, and PGDIM.' }
  ];

  for (const seo of seoData) {
    await prisma.seoMetadata.create({ data: seo });
  }

  console.log('✅ Database seeded successfully with 12 courses, alumni, reviews, settings, and superadmin!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
