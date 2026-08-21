import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting comprehensive database seed with all 12 courses and 12 articles...');

  // 1. Clean existing database
  await prisma.auditLog.deleteMany();
  await prisma.setting.deleteMany();
  await prisma.seoMetadata.deleteMany();
  await prisma.blog.deleteMany();
  await prisma.blogCategory.deleteMany();
  await prisma.studentWork.deleteMany();
  await prisma.studentWorkCategory.deleteMany();
  await prisma.testimonial.deleteMany();
  await prisma.placement.deleteMany();
  await prisma.alumni.deleteMany();
  await prisma.studentRegistration.deleteMany();
  await prisma.courseEnquiry.deleteMany();
  await prisma.contactMessage.deleteMany();
  await prisma.corporateLead.deleteMany();
  await prisma.franchiseLead.deleteMany();
  await prisma.fAQ.deleteMany();
  await prisma.courseProject.deleteMany();
  await prisma.courseCareer.deleteMany();
  await prisma.courseMentor.deleteMany();
  await prisma.courseTool.deleteMany();
  await prisma.courseCurriculum.deleteMany();
  await prisma.courseCategoryMap.deleteMany();
  await prisma.course.deleteMany();
  await prisma.courseCategory.deleteMany();
  await prisma.rolePermission.deleteMany();
  await prisma.permission.deleteMany();
  await prisma.user.deleteMany();
  await prisma.role.deleteMany();

  // 2. Seed Roles & Permissions
  const roleSuperAdmin = await prisma.role.create({
    data: { name: 'SUPER_ADMIN' }
  });
  const roleAdmin = await prisma.role.create({
    data: { name: 'ADMIN' }
  });
  const roleEditor = await prisma.role.create({
    data: { name: 'EDITOR' }
  });
  const roleCounselor = await prisma.role.create({
    data: { name: 'COUNSELOR' }
  });

  const permissionsList = [
    'courses:read', 'courses:create', 'courses:update', 'courses:delete',
    'registrations:read', 'registrations:update', 'registrations:export',
    'leads:read', 'leads:update', 'leads:export',
    'blogs:read', 'blogs:create', 'blogs:update', 'blogs:delete',
    'media:read', 'media:upload', 'media:delete',
    'settings:read', 'settings:update',
    'users:read', 'users:manage'
  ];

  for (const perm of permissionsList) {
    const p = await prisma.permission.create({
      data: { name: perm }
    });
    await prisma.rolePermission.create({
      data: { role_id: roleSuperAdmin.id, permission_id: p.id }
    });
  }

  // 3. Seed Default Super Admin User
  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash('Admin@123456', salt);

  const adminUser = await prisma.user.create({
    data: {
      name: 'Super Admin',
      email: 'admin@prismmultimedia.com',
      password_hash: passwordHash,
      role_id: roleSuperAdmin.id,
      status: 'ACTIVE',
    }
  });

  // 4. Seed Course Categories
  const catDesign = await prisma.courseCategory.create({ data: { name: 'Design', slug: 'design' } });
  const catUIUX = await prisma.courseCategory.create({ data: { name: 'UI/UX', slug: 'ui-ux' } });
  const catAnimation = await prisma.courseCategory.create({ data: { name: 'Animation', slug: 'animation' } });
  const catVFX = await prisma.courseCategory.create({ data: { name: 'VFX', slug: 'vfx' } });
  const catVideo = await prisma.courseCategory.create({ data: { name: 'Video Editing', slug: 'video' } });
  const catMarketing = await prisma.courseCategory.create({ data: { name: 'Digital Marketing', slug: 'digital-marketing' } });
  const catEDP = await prisma.courseCategory.create({ data: { name: 'Entrepreneurship', slug: 'entrepreneurship' } });
  const catDiploma = await prisma.courseCategory.create({ data: { name: 'Diploma Programs', slug: 'diploma' } });

  // 5. Seed 12 Complete Courses
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
      categories: [catDiploma.id, catDesign.id, catUIUX.id, catAnimation.id, catVFX.id, catVideo.id],
      tools: ['Photoshop', 'Illustrator', 'Adobe InDesign', 'CorelDRAW', 'HTML5 / CSS3', 'JavaScript / Angular', 'Adobe Animate', 'Premiere Pro', 'After Effects', 'Audition', 'Autodesk Maya', 'Blender'],
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
      categories: [catDiploma.id, catDesign.id, catUIUX.id, catVideo.id],
      tools: ['Photoshop', 'Illustrator', 'Adobe InDesign', 'HTML5 / CSS3', 'JavaScript', 'Premiere Pro', 'After Effects'],
      curriculum: [
        { title: 'Graphic & Print Production Design', desc: 'Vector drawing, corporate visual identity, and print layout standards.', duration: '3 Months' },
        { title: 'UI Front-End & Responsive Web Design', desc: 'Modern responsive web development using HTML5, CSS3, Flexbox, and JavaScript.', duration: '3 Months' },
        { title: 'Audio/Video Post-Production & Motion Graphics', desc: 'Timeline editing, multi-track audio cleanup, kinetic motion typography, and color grading.', duration: '4 Months' }
      ],
      careers: [
        { name: 'Multimedia Developer', industry: 'Digital Agencies' },
        { name: 'Graphic & UI Designer', industry: 'Software Companies' },
        { name: 'Video Content Creator', industry: 'Social Media & Marketing' }
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
      tools: ['Photoshop', 'Illustrator', 'Adobe InDesign', 'CorelDRAW'],
      curriculum: [
        { title: 'Design Fundamentals & Color Psychology', desc: 'Color palettes, layout hierarchy, grid systems, and typography rules.', duration: '2 Weeks' },
        { title: 'Raster Manipulation in Adobe Photoshop', desc: 'Layer masking, photo composite retouching, digital painting, and banner designs.', duration: '4 Weeks' },
        { title: 'Vector Illustration in Adobe Illustrator', desc: 'Pen tool mastery, logo design, iconography, and commercial packaging.', duration: '4 Weeks' },
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
        { name: 'Digital Marketing Specialist', industry: 'Tech & E-commerce Brands' },
        { name: 'SEO & Performance Lead', industry: 'Marketing Agencies' },
        { name: 'Social Media Campaign Manager', industry: 'Media Houses & Startups' }
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
      tools: ['Adobe Premiere Pro', 'Adobe Audition', 'DaVinci Resolve', 'Adobe Media Encoder', 'Photoshop'],
      curriculum: [
        { title: 'Non-Linear Editing & Assembly in Premiere', desc: 'Project setup, sequence pacing, narrative cutting, and shortcut workflow.', duration: '4 Weeks' },
        { title: 'Audio Mixing, Mastering & Restoration', desc: 'Noise reduction, equalization, dynamic compression, and sound FX layering.', duration: '3 Weeks' },
        { title: 'Color Grading & Lumetri Scopes', desc: 'Primary & secondary color correction, LUTs, and broadcast skin tones.', duration: '5 Weeks' },
        { title: 'Commercial Reels & Final Delivery', desc: 'Export presets for OTT platforms, YouTube 4K, and cinema reels.', duration: '4 Weeks' }
      ],
      careers: [
        { name: 'Video Editor & Colorist', industry: 'Film, TV & Web Media' },
        { name: 'Sound Designer & Audio Engineer', industry: 'Music & Podcasting' },
        { name: 'Content Post-Producer', industry: 'Ad Agencies & YouTube Creators' }
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
      tools: ['Autodesk Maya', 'Blender', 'Substance 3D Painter', 'ZBrush', 'Arnold Renderer'],
      curriculum: [
        { title: '3D Hard Surface & Organic Modeling', desc: 'Polygon topology, edge loops, organic sculpting, and low/high poly modeling.', duration: '6 Weeks' },
        { title: 'UV Unwrapping & PBR Texturing', desc: 'Substance Painter maps (diffuse, roughness, metallic, normal), shader creation.', duration: '4 Weeks' },
        { title: 'Character Rigging & Skinning', desc: 'Joint hierarchies, IK/FK solvers, blendshapes, and skin weights.', duration: '6 Weeks' },
        { title: '3D Keyframe Animation & Lighting', desc: 'Body mechanics, walk/run cycles, Arnold studio lighting, and rendering.', duration: '8 Weeks' }
      ],
      careers: [
        { name: '3D Character Animator', industry: 'Feature Film & Gaming' },
        { name: '3D Asset Modeler & Texture Artist', industry: 'VFX & AR/VR Studios' },
        { name: 'Lighting & Rendering Technical Director', industry: 'Animation Houses' }
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
      tools: ['Adobe After Effects', 'Foundry Nuke', 'Mocha Pro', 'Silhouette FX', 'Premiere Pro'],
      curriculum: [
        { title: 'Rotoscoping & Paint / Clean Plating', desc: 'Planar tracking in Mocha, articulate roto splines, wire removal, and matte prep.', duration: '6 Weeks' },
        { title: 'Chroma Keying & Green Screen Extraction', desc: 'Primatte, Keylight, edge spill suppression, and alpha edge blending.', duration: '5 Weeks' },
        { title: '3D Camera Tracking & Matchmoving', desc: 'Camera solving, point cloud tracking, and CGI asset spatial alignment.', duration: '5 Weeks' },
        { title: 'Node-Based Compositing & Particle FX', desc: 'Nuke channel management, multi-pass EXR compositing, fire, smoke, and explosions.', duration: '8 Weeks' }
      ],
      careers: [
        { name: 'VFX Compositor', industry: 'International VFX Studios' },
        { name: 'Roto & Prep Artist', industry: 'Feature Film Post-Houses' },
        { name: 'Matchmove & Tracking Specialist', industry: 'Commercial Studios' }
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
      categories: [catDesign.id, catVideo.id, catAnimation.id],
      tools: ['Adobe After Effects', 'Premiere Pro', 'Adobe Illustrator', 'Photoshop', 'Cinema 4D Lite'],
      curriculum: [
        { title: 'Design for Motion & Vector Assets', desc: 'Preparing Illustrator vector artwork and layer hierarchies for animation.', duration: '3 Weeks' },
        { title: 'Keyframing & Graph Editor Dynamics', desc: 'Easing curves, speed graphs, spatial interpolation, and secondary motion.', duration: '4 Weeks' },
        { title: 'Kinetic Typography & Broadcast Branding', desc: 'Animated text reveals, lower thirds, title openers, and channel ident bumpers.', duration: '5 Weeks' },
        { title: '3D Space & Commercial Motion Reels', desc: 'Camera layers, 3D depth of field, particle presets, and client sizzle reels.', duration: '4 Weeks' }
      ],
      careers: [
        { name: 'Motion Graphic Designer', industry: 'Broadcast TV & Streaming' },
        { name: 'Explainer Video Specialist', industry: 'Tech Startups & Agencies' },
        { name: 'Social Media Motion Artist', industry: 'Digital Brand Studios' }
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
      categories: [catEDP.id],
      tools: ['Business Model Canvas', 'Notion', 'Figma', 'Slack', 'QuickBooks', 'Google Workspace'],
      curriculum: [
        { title: 'Creative Business Strategy & Market Fit', desc: 'Niche identification, market research, and value proposition design.', duration: '4 Weeks' },
        { title: 'Client Acquisition & Pitch Deck Creation', desc: 'Lead generation, sales funnels, portfolio presentation, and RFP pitching.', duration: '6 Weeks' },
        { title: 'Pricing Models, Contracts & Financials', desc: 'Value-based pricing, retainer agreements, client service contracts, and cash flow.', duration: '6 Weeks' },
        { title: 'Studio Operations & Team Scaling', desc: 'Hiring freelancers, project management pipelines, quality assurance, and growth.', duration: '8 Weeks' }
      ],
      careers: [
        { name: 'Creative Agency Founder', industry: 'Design & Multimedia Studios' },
        { name: 'Independent Creative Director', industry: 'Freelance & Consultancies' },
        { name: 'Studio Operations Manager', industry: 'Media & Production Houses' }
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
        status: 'PUBLISHED',
        seo_title: `${c.title} Training Course | Prism Multimedia`,
        seo_description: c.short_description,
      }
    });

    for (const catId of c.categories) {
      await prisma.courseCategoryMap.create({
        data: { course_id: course.id, category_id: catId }
      });
    }

    for (let i = 0; i < c.tools.length; i++) {
      await prisma.courseTool.create({
        data: { course_id: course.id, tool_name: c.tools[i], sort_order: i + 1 }
      });
    }

    for (let i = 0; i < c.curriculum.length; i++) {
      await prisma.courseCurriculum.create({
        data: {
          course_id: course.id,
          title: c.curriculum[i].title,
          description: c.curriculum[i].desc,
          duration: c.curriculum[i].duration,
          sort_order: i + 1
        }
      });
    }

    for (const career of c.careers) {
      await prisma.courseCareer.create({
        data: { course_id: course.id, career_name: career.name, industry: career.industry }
      });
    }

    await prisma.fAQ.createMany({
      data: [
        { course_id: course.id, question: `What is the eligibility for ${c.title}?`, answer: 'Any graduate or undergraduate passionate about creative design and multimedia is eligible to enroll. No prior coding or design experience is required as we start from fundamental principles.', sort_order: 1 },
        { course_id: course.id, question: `Does Prism provide placement support for ${c.title}?`, answer: 'Yes! We provide 100% placement support with dedicated resume preparation, portfolio showreel curation, and interview referrals to our network of 500+ top hiring studios and tech enterprises.', sort_order: 2 },
        { course_id: course.id, question: `Are both classroom and online batches available?`, answer: 'Yes, we offer flexible learning modes including in-person lab training at our Ameerpet Hyderabad campus as well as live instructor-led interactive online batches.', sort_order: 3 }
      ]
    });
  }

  // 6. Seed Mentors
  const pGDIMCourse = await prisma.course.findFirst({ where: { slug: 'pgdim' } });
  if (pGDIMCourse) {
    await prisma.courseMentor.createMany({
      data: [
        { course_id: pGDIMCourse.id, mentor_name: 'M. Srinivas Rao', designation: 'Founder & Senior Creative Mentor', bio: '24+ years in multimedia education and creative industry training.', sort_order: 1 },
        { course_id: pGDIMCourse.id, mentor_name: 'Anjee Yarlagadda', designation: 'Managing Director & Design Mentor', bio: '15+ years in Training & Development, design systems, and corporate training.', sort_order: 2 }
      ]
    });
  }

  // 7. Seed Alumni
  const alumniData = [
    { name: 'Bolle Madhu', designation: 'Graphic Designer', company: 'Sitara Foods', photo: './alumni-bolle-madhu.jpg' },
    { name: 'Venkateswara Rao', designation: 'Graphic Designer', company: 'Chota News', photo: './alumni-venkateswara-rao.jpg' },
    { name: 'Maggidi Uday Kiran', designation: 'Social Media Executive', company: 'BigTV', photo: './alumni-maggidi-uday.jpg' },
    { name: 'Nikhilesh Mishra', designation: 'Social Media Executive', company: 'CyberSRC Consultancy', photo: './alumni-nikhilesh-mishra.jpg' },
    { name: 'Yarlagadda Haritha', designation: 'UI UX Designer', company: 'Innomagine Consulting', photo: './alumni-yarlagadda-haritha.jpg' },
    { name: 'Byrla Anandakumar', designation: 'Software Engineer', company: 'World Health Organization (WHO)', photo: './alumni-byrla-anandakumar.jpg' },
    { name: 'Bokkena Sriguru Sairam', designation: '2D & 3D – VFX Supervisor', company: 'Greengold Animation', photo: './alumni-bokkena-sairam.jpg' },
    { name: 'Srinaiah Jinkala', designation: 'Managing Director', company: 'Spruko Technologies', photo: './alumni-srinaiah-jinkala.jpg' },
  ];

  for (const a of alumniData) {
    await prisma.alumni.create({
      data: {
        name: a.name,
        designation: a.designation,
        company: a.company,
        photo: a.photo,
        course_id: pGDIMCourse!.id,
        status: 'ACTIVE',
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

  // 11. Seed Blog Categories and ALL 12 Complete Blogs
  const bCatShortcuts = await prisma.blogCategory.create({ data: { name: 'Keyboard Shortcuts', slug: 'keyboard-shortcuts' } });
  const bCatCareer = await prisma.blogCategory.create({ data: { name: 'Career & Industry', slug: 'career' } });
  const bCatDesign = await prisma.blogCategory.create({ data: { name: 'Design Insights', slug: 'design-insights' } });

  const all12Blogs = [
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
    },
    {
      title: 'The Growing Demand for UI/UX Designers in 2026 and Beyond',
      slug: 'the-growing-demand-for-ui-ux-designers-in-2026-and-beyond',
      category_id: bCatCareer.id,
      excerpt: 'Why user experience and user interface design have become mission-critical roles in tech companies worldwide.',
      content: 'In the digital era, product usability dictates commercial success. Companies no longer compete purely on technology features; they compete on user experience.',
      image: './blog-poster-4.jpg'
    },
    {
      title: '10 Crucial Principles of Graphic Design Every Beginner Must Know',
      slug: '10-crucial-principles-of-graphic-design-every-beginner-must-know',
      category_id: bCatDesign.id,
      excerpt: 'Master hierarchy, balance, contrast, proximity, and whitespace to craft professional, visually compelling designs.',
      content: 'Understanding foundational design principles separates amateur layouts from professional visual communication that moves audiences.',
      image: './blog-poster-5.jpg'
    },
    {
      title: 'Why 3D Animation and VFX are Dominating the Entertainment Industry',
      slug: 'why-3d-animation-and-vfx-are-dominating-the-entertainment-industry',
      category_id: bCatCareer.id,
      excerpt: 'From blockbuster cinema to OTT series and next-gen gaming, explore the exponential rise of 3D pipelines.',
      content: 'With expanding OTT platforms, virtual production stages, and AAA gaming titles, the demand for skilled 3D modelers and VFX compositors is at an all-time peak.',
      image: './blog-poster-1.jpg'
    },
    {
      title: 'Video Editing Masterclass: Essential Techniques for High-Impact Storytelling',
      slug: 'video-editing-masterclass-essential-techniques-for-high-impact-storytelling',
      category_id: bCatDesign.id,
      excerpt: 'Learn the psychological power of pacing, sound design, rhythm cutting, and color grading in modern film editing.',
      content: 'Great video editing is invisible. It guides the viewer emotionally through seamless cuts, auditory tension, and color harmony.',
      image: './blog-poster-2.jpg'
    },
    {
      title: 'From Fresher to Professional: How to Build an Irresistible Design Portfolio',
      slug: 'from-fresher-to-professional-how-to-build-an-irresistible-design-portfolio',
      category_id: bCatCareer.id,
      excerpt: 'Step-by-step strategies for creating Behance case studies, showreels, and UI prototypes that land top studio jobs.',
      content: 'Your portfolio is your creative resume. Recruiters spend under 60 seconds reviewing portfolios—learn how to showcase problem-solving and craft immediately.',
      image: './blog-poster-3.jpg'
    },
    {
      title: 'The Entrepreneurial Designer: Launching and Scaling Your Own Agency',
      slug: 'the-entrepreneurial-designer-launching-and-scaling-your-own-agency',
      category_id: bCatCareer.id,
      excerpt: 'How creative professionals can transition from freelancing to building profitable studios and creative teams.',
      content: 'Discover how to price projects with value-based billing, acquire high-paying retainer clients, and establish streamlined production workflows.',
      image: './blog-poster-6.jpg'
    }
  ];

  for (const b of all12Blogs) {
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

  console.log('✅ Database seeded successfully with all 12 courses and 12 articles!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
