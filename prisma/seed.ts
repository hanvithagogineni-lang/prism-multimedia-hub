import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('--- Seeding Prism Multimedia Database ---');

  // 1. Roles & Permissions
  const superAdminRole = await prisma.role.upsert({
    where: { name: 'SUPER_ADMIN' },
    update: {},
    create: { name: 'SUPER_ADMIN' }
  });

  await prisma.role.upsert({
    where: { name: 'ADMIN' },
    update: {},
    create: { name: 'ADMIN' }
  });

  await prisma.role.upsert({
    where: { name: 'EDITOR' },
    update: {},
    create: { name: 'EDITOR' }
  });

  await prisma.role.upsert({
    where: { name: 'ADMISSIONS_STAFF' },
    update: {},
    create: { name: 'ADMISSIONS_STAFF' }
  });

  const permAll = await prisma.permission.upsert({
    where: { name: 'all' },
    update: {},
    create: { name: 'all' }
  });

  await prisma.rolePermission.upsert({
    where: { role_id_permission_id: { role_id: superAdminRole.id, permission_id: permAll.id } },
    update: {},
    create: { role_id: superAdminRole.id, permission_id: permAll.id }
  });

  // 2. Super Admin User
  const hashedPassword = await bcrypt.hash('Admin@123456', 10);
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@prismmultimedia.com' },
    update: {},
    create: {
      name: 'Prism System Admin',
      email: 'admin@prismmultimedia.com',
      password_hash: hashedPassword,
      role_id: superAdminRole.id,
      status: 'ACTIVE'
    }
  });
  console.log(`Created Super Admin User: ${adminUser.email}`);

  // 3. Site Settings
  const settingsData = [
    { key: 'institute_name', value: 'Prism Multimedia Training Institute' },
    { key: 'logo_url', value: '/logo.png' },
    { key: 'favicon_url', value: '/favicon.ico' },
    { key: 'phone', value: '+91 97013 34133' },
    { key: 'alt_phone', value: '+91 91775 55040' },
    { key: 'email', value: 'info@prismmultimedia.com' },
    { key: 'address', value: '# 203, 2nd Floor, Above HDFC Bank, Ameerpet Circle, Hyderabad - 500016, Telangana, India' },
    { key: 'working_hours', value: 'Monday - Saturday: 8:00 AM - 8:00 PM' },
    { key: 'facebook_url', value: 'https://facebook.com/prismmultimedia' },
    { key: 'instagram_url', value: 'https://instagram.com/prismmultimedia' },
    { key: 'youtube_url', value: 'https://youtube.com/prismmultimedia' },
    { key: 'linkedin_url', value: 'https://linkedin.com/company/prismmultimedia' },
    { key: 'google_maps_url', value: 'https://maps.google.com/?q=Prism+Multimedia+Ameerpet+Hyderabad' },
    { key: 'footer_text', value: 'Prism Multimedia has been at the forefront of multimedia education since 1999, empowering creative professionals.' },
    { key: 'copyright_text', value: '© 2026 Prism Multimedia. All Rights Reserved.' },
    { key: 'default_seo_title', value: 'Prism Multimedia | Best Multimedia Training Institute in Hyderabad' },
    { key: 'default_seo_desc', value: 'Premier multimedia training institute in Hyderabad offering Graphic Design, UI/UX, Motion Graphics, 2D/3D Animation, VFX, and Digital Marketing.' }
  ];

  for (const s of settingsData) {
    await prisma.setting.upsert({
      where: { key: s.key },
      update: { value: s.value },
      create: s
    });
  }

  // 4. Course Categories
  const categories = [
    { name: 'Design', slug: 'design', description: 'Graphic Design, Branding, and Visual Communication' },
    { name: 'UI/UX', slug: 'ui-ux', description: 'User Experience and User Interface Architecture' },
    { name: 'Animation', slug: 'animation', description: '2D & 3D Character Animation and Modeling' },
    { name: 'VFX', slug: 'vfx', description: 'Visual Effects, Compositing, and Motion Tracking' },
    { name: 'Video', slug: 'video', description: 'Audio & Video Editing, Post-Production' },
    { name: 'Digital Marketing', slug: 'digital-marketing', description: 'SEO, SMM, SEM, Content Strategy' },
    { name: 'Entrepreneurship', slug: 'entrepreneurship', description: 'Business Development for Creatives' },
    { name: 'Diploma', slug: 'diploma', description: 'Full-fledged Master Diploma Programs' }
  ];

  const catMap: Record<string, number> = {};
  for (const c of categories) {
    const cat = await prisma.courseCategory.upsert({
      where: { slug: c.slug },
      update: {},
      create: c
    });
    catMap[c.slug] = cat.id;
  }

  // 5. Initial Courses Data
  const coursesList = [
    {
      title: 'Post Graduate Diploma in Multimedia (PGDIM)',
      slug: 'pgdim',
      short_description: 'Comprehensive 18-month flagship diploma covering Graphic Design, UI/UX, Animation, VFX, and Video Editing.',
      long_description: 'The Post Graduate Diploma in Multimedia (PGDIM) is Prism Multimedia’s premier 18-month program designed to turn aspiring students into industry-ready creative leaders. The course covers complete studio workflows across Adobe Creative Cloud, Autodesk Maya, and Blender.',
      duration: '18 Months',
      certification: 'Prism Master Diploma Certification',
      placement_assistance: 'Yes (100% Placement Support)',
      online_available: true,
      classroom_available: true,
      hero_image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80',
      seo_title: 'PGDIM - Post Graduate Diploma in Multimedia | Prism',
      seo_description: 'Master Graphic Design, UI/UX, 3D Animation & VFX with our 18-month flagship PGDIM program.'
    },
    {
      title: 'Graduate Diploma in Multimedia (GDIM)',
      slug: 'gdim',
      short_description: '10-month professional diploma in Graphic Design, UI Development, Audio/Video Editing, and Motion Graphics.',
      long_description: 'GDIM offers a streamlined 10-month curriculum focused on commercial design, video editing, frontend UI web development, and motion graphics production.',
      duration: '10 Months',
      certification: 'Prism Graduate Diploma Certification',
      placement_assistance: 'Yes',
      online_available: true,
      classroom_available: true,
      hero_image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
      seo_title: 'GDIM - Graduate Diploma in Multimedia | Prism Multimedia',
      seo_description: '10-Month diploma course covering commercial graphics, UI, and video post-production.'
    },
    {
      title: 'Graphic Design',
      slug: 'graphic-design',
      short_description: 'Master vector illustration, layout design, branding identities, print media, and commercial digital graphics.',
      long_description: 'Graphic Design at Prism Multimedia covers visual communication fundamentals, color theory, grid layouts, brand strategy, typography, and commercial print/digital software workflows.',
      duration: '3 Months',
      certification: 'Certified Graphic Designer',
      placement_assistance: 'Yes',
      online_available: true,
      classroom_available: true,
      hero_image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=800&q=80',
      seo_title: 'Graphic Design Course in Hyderabad | Prism Multimedia',
      seo_description: 'Learn Graphic Design with Photoshop, Illustrator, and InDesign. 100% practical studio training.'
    },
    {
      title: 'UX Design',
      slug: 'ux-design',
      short_description: 'User research, wireframing, interactive prototyping, usability testing, and design systems.',
      long_description: 'UX Design focuses on user-centric design methodologies, user research, wireframing in Figma/Adobe XD, usability testing, and building interactive portfolio case studies.',
      duration: '4 Months',
      certification: 'Certified UX Designer',
      placement_assistance: 'Yes',
      online_available: true,
      classroom_available: true,
      hero_image: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&w=800&q=80',
      seo_title: 'UX Design Course in Hyderabad | Figma & Adobe XD',
      seo_description: 'Master UX Research, Wireframing, Prototyping, and Design Systems with hands-on projects.'
    },
    {
      title: 'UI Design & Development',
      slug: 'ui-design-and-development',
      short_description: 'Combine beautiful modern UI layouts with frontend web technologies like HTML5, CSS3, JavaScript, and Bootstrap.',
      long_description: 'UI Design & Development trains students to design high-converting web interfaces and turn them into responsive frontend websites using HTML5, CSS3, JavaScript, and Bootstrap.',
      duration: '5 Months',
      certification: 'Certified UI Frontend Developer',
      placement_assistance: 'Yes',
      online_available: true,
      classroom_available: true,
      hero_image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80',
      seo_title: 'UI Design & Development Course | HTML, CSS, JS, Bootstrap',
      seo_description: 'Learn UI interface design and frontend code implementation with practical live projects.'
    },
    {
      title: '2D Animation',
      slug: '2d-animation',
      short_description: 'Character design, storyboarding, digital filmmaking, and traditional vector animation techniques.',
      long_description: 'Learn 2D Animation principles, character design, keyframing, lip-syncing, storyboarding, and digital filmmaking in Adobe Animate and After Effects.',
      duration: '5 Months',
      certification: 'Certified 2D Animator',
      placement_assistance: 'Yes',
      online_available: true,
      classroom_available: true,
      hero_image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?auto=format&fit=crop&w=800&q=80',
      seo_title: '2D Animation Course | Adobe Animate & Storyboarding',
      seo_description: 'Master 2D animation, character rigging, and animated storytelling.'
    },
    {
      title: 'Digital Marketing',
      slug: 'digital-marketing',
      short_description: 'SEO, Social Media Marketing, PPC Google Ads, Content Strategy, and Growth Analytics.',
      long_description: 'Comprehensive Digital Marketing course covering search engine optimization, Google Ads campaigns, social media management, email marketing, and lead funnel strategies.',
      duration: '3 Months',
      certification: 'Certified Digital Marketing Specialist',
      placement_assistance: 'Yes',
      online_available: true,
      classroom_available: true,
      hero_image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
      seo_title: 'Digital Marketing Course in Hyderabad | SEO, SMM, PPC',
      seo_description: 'Master digital marketing strategies, SEO optimization, and social media advertising.'
    },
    {
      title: 'Audio & Video Editing',
      slug: 'audio-video-editing',
      short_description: 'Professional video editing, color grading, sound mixing, title transitions, and finishing workflows.',
      long_description: 'Learn commercial video editing in Adobe Premiere Pro and sound engineering in Adobe Audition. Master color correction, multi-cam editing, audio noise reduction, and video exporting.',
      duration: '4 Months',
      certification: 'Certified Video Editor',
      placement_assistance: 'Yes',
      online_available: true,
      classroom_available: true,
      hero_image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=800&q=80',
      seo_title: 'Audio & Video Editing Course | Premiere Pro & Audition',
      seo_description: 'Master professional video post-production, sound engineering, and color grading.'
    },
    {
      title: '3D Animation',
      slug: '3d-animation',
      short_description: '3D modeling, texturing, lighting, character rigging, animation, and Arnold rendering in Autodesk Maya and Blender.',
      long_description: 'Master the complete 3D production pipeline in Maya and Blender. Build realistic 3D assets, environment sets, character rigs, and rendered short films.',
      duration: '6 Months',
      certification: 'Certified 3D Specialist',
      placement_assistance: 'Yes',
      online_available: true,
      classroom_available: true,
      hero_image: 'https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?auto=format&fit=crop&w=800&q=80',
      seo_title: '3D Animation Course | Autodesk Maya & Blender',
      seo_description: 'Master 3D modeling, rigging, texturing, lighting, and animation pipelines.'
    },
    {
      title: 'Visual Effects (VFX)',
      slug: 'vfx',
      short_description: 'Compositing, green screen keying, motion tracking, rotoscoping, and particle effects.',
      long_description: 'VFX course focusing on high-end visual effects compositing, rotoscoping, camera tracking, matte painting, and clean plate creation for film and television.',
      duration: '6 Months',
      certification: 'Certified VFX Compositor',
      placement_assistance: 'Yes',
      online_available: true,
      classroom_available: true,
      hero_image: 'https://images.unsplash.com/photo-1535016120720-40c646be5580?auto=format&fit=crop&w=800&q=80',
      seo_title: 'VFX & Compositing Course | After Effects & Nuke',
      seo_description: 'Learn green screen keying, motion tracking, rotoscoping, and visual effects.'
    },
    {
      title: 'Motion Graphics',
      slug: 'motion-graphics',
      short_description: 'Title design, kinetic typography, 2D/3D motion design, Lottie animations, and promo graphics.',
      long_description: 'Motion Graphics training covering kinetic typography, commercial visual intros, logo animations, micro-interactions, and 3D motion design.',
      duration: '4 Months',
      certification: 'Certified Motion Designer',
      placement_assistance: 'Yes',
      online_available: true,
      classroom_available: true,
      hero_image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80',
      seo_title: 'Motion Graphics Course | After Effects & Cinema4D',
      seo_description: 'Master commercial title design, motion graphics, and kinetic typography.'
    },
    {
      title: 'Entrepreneurship Development Program (EDP)',
      slug: 'edp',
      short_description: 'Business models, creative agency management, client acquisition, and project delivery.',
      long_description: 'EDP empowers creative professionals to launch design agencies, video studios, or freelance consultancy businesses with practical guidance on legal setup, client pitching, and financial management.',
      duration: '3 Months',
      certification: 'Certified Creative Entrepreneur',
      placement_assistance: 'Yes',
      online_available: true,
      classroom_available: true,
      hero_image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
      seo_title: 'EDP - Entrepreneurship Development Program | Prism',
      seo_description: 'Learn business setup, agency management, and freelancing business models.'
    }
  ];

  for (const cData of coursesList) {
    const course = await prisma.course.upsert({
      where: { slug: cData.slug },
      update: {},
      create: cData
    });

    // Seed sample curriculum modules
    await prisma.courseCurriculum.createMany({
      data: [
        { course_id: course.id, title: 'Module 1: Fundamentals & Conceptualization', description: 'Core principles, creative visual theory, software orientation, and setup.', duration: '4 Weeks', sort_order: 1 },
        { course_id: course.id, title: 'Module 2: Advanced Software Workflows', description: 'Hands-on project creation using industry-standard tools.', duration: '6 Weeks', sort_order: 2 },
        { course_id: course.id, title: 'Module 3: Studio Live Projects & Portfolio', description: 'Building real-world portfolio case studies and showreels for industry placement.', duration: '4 Weeks', sort_order: 3 }
      ]
    });

    // Seed sample tools
    await prisma.courseTool.createMany({
      data: [
        { course_id: course.id, tool_name: 'Adobe Photoshop', tool_icon: 'photoshop', description: 'Image editing and raster graphics', sort_order: 1 },
        { course_id: course.id, tool_name: 'Adobe Illustrator', tool_icon: 'illustrator', description: 'Vector illustrations and logos', sort_order: 2 },
        { course_id: course.id, tool_name: 'Adobe After Effects', tool_icon: 'aftereffects', description: 'Motion graphics and visual effects', sort_order: 3 }
      ]
    });

    // Seed sample FAQs
    await prisma.faq.createMany({
      data: [
        { course_id: course.id, question: `Is ${course.title} suitable for beginners?`, answer: 'Yes! All our courses start from foundational principles before progressing to advanced studio workflows.', sort_order: 1 },
        { course_id: course.id, question: 'Does Prism Multimedia provide placement assistance?', answer: 'Yes, Prism Multimedia provides 100% placement assistance, resume building, and portfolio review sessions.', sort_order: 2 }
      ]
    });
  }

  // 6. Alumni Data
  const alumniData = [
    { name: 'Bolle Madhu', designation: 'Graphic Designer', company: 'Sitara Foods', graduation_year: 2022, story: 'Prism Multimedia helped me transform my passion for visual design into a professional graphic design career.' },
    { name: 'Venkateswara Rao', designation: 'Graphic Designer', company: 'Chota News', graduation_year: 2021, story: 'The practical studio projects gave me confidence to create commercial media layouts.' },
    { name: 'Maggidi Uday kiran', designation: 'Social Media Executive', company: 'BigTV', graduation_year: 2023, story: 'Hands-on training in digital media graphics prepared me for news channel advertising.' },
    { name: 'Nikhilesh Mishra', designation: 'Social Media Executive', company: 'CyberSRC Consultancy', graduation_year: 2022, story: 'Great mentorship and career placement assistance!' },
    { name: 'Yarlagadda Haritha', designation: 'UI UX Designer', company: 'Innomagine Consulting', graduation_year: 2023, story: 'Learning Figma and user research methodologies helped me land a top UI/UX role.' },
    { name: 'Byrla Anandakumar', designation: 'Software Engineer', company: 'World Health Organization', graduation_year: 2020, story: 'Prism imparts excellent training beneficial for both career and personal growth.' },
    { name: 'Bokkena Sriguru Sairam', designation: '2D & 3D VFX Supervisor', company: 'Greengold Animation', graduation_year: 2019, story: 'Working on Maya and After Effects pipelines prepared me for top animation studios.' },
    { name: 'Srinaiah Jinkala', designation: 'Managing Director', company: 'SPRUKO TECHNOLOGIES', graduation_year: 2018, story: 'Prism provided the entrepreneurial foundation to launch my own software firm.' }
  ];

  for (const a of alumniData) {
    await prisma.alumni.create({
      data: { ...a, featured: true, status: 'PUBLISHED' }
    });
  }

  // 7. Testimonials Data
  const testimonialsData = [
    { name: 'Byrla Anandakumar', designation: 'Software Engineer', company: 'World Health Organization', testimonial: 'It was an excellent experience for me, PRISM imparts excellent training, beneficial for both the career and personal life. The faculty is skilled and possesses good knowledge of the subjects.', rating: 5, featured: true },
    { name: 'Krishna Boorugu', designation: 'Service Delivery Manager', company: 'Cognizant', testimonial: 'I am Krishna Boorugu, a proud student of Prism Multimedia. My tenure here in PRISM has been a wonderful experience of learning with prolific exposure.', rating: 5, featured: true },
    { name: 'Mandali Chandra Lekha', designation: 'Chief Operating Officer', company: 'Shachi Media', testimonial: 'Connecting the talent with industry is the unique quality of Prism. It is my pride to be trained at Prism.', rating: 5, featured: true },
    { name: 'Nagesh V', designation: 'Technology Lead', company: 'Tectoro Consulting', testimonial: 'Thank you Prism. This is a heartfelt response from an alumnus. I have benefited greatly by the unique training method of Prism.', rating: 5, featured: true }
  ];

  for (const t of testimonialsData) {
    await prisma.testimonial.create({
      data: { ...t, status: 'PUBLISHED' }
    });
  }

  // 8. Blog Categories & 12 Blogs
  const blogCats = [
    { name: 'Design', slug: 'design', description: 'Design trends, tips, and tutorials' },
    { name: 'Social Media', slug: 'social-media', description: 'Social media strategy and graphics' },
    { name: 'UI Design', slug: 'ui-design', description: 'User interface principles' },
    { name: 'Career', slug: 'career', description: 'Career guidance and industry insights' },
    { name: 'Company', slug: 'company', description: 'Prism institute announcements' },
    { name: 'Portfolio', slug: 'portfolio', description: 'Portfolio development strategies' },
    { name: 'Motion Graphics', slug: 'motion-graphics', description: 'Motion graphics evolution and workflows' }
  ];

  const blogCatMap: Record<string, number> = {};
  for (const bc of blogCats) {
    const created = await prisma.blogCategory.upsert({
      where: { slug: bc.slug },
      update: {},
      create: bc
    });
    blogCatMap[bc.slug] = created.id;
  }

  const blogsList = [
    { title: 'Master Adobe InDesign: Top 100 Essential Keyboard Shortcuts', slug: 'master-adobe-indesign-top-100-essential-keyboard-shortcuts', categorySlug: 'design', excerpt: 'Unlock efficiency with all 100 essential Adobe InDesign keyboard shortcuts organized by workflow.', content: '<p>Mastering keyboard shortcuts is the single fastest way to boost your layout speed in Adobe InDesign.</p><h3>Top 100 InDesign Shortcuts</h3><ol><li>V - Selection Tool</li><li>A - Direct Selection Tool</li><li>P - Pen Tool</li><li>T - Type Tool</li></ol>' },
    { title: 'Unlock Efficiency: Top 100 Adobe Illustrator Keyboard Shortcuts', slug: 'unlock-efficiency-top-100-adobe-illustrator-keyboard-shortcuts', categorySlug: 'design', excerpt: 'Complete guide to 100 time-saving keyboard shortcuts in Adobe Illustrator for graphic designers.', content: '<p>Speed up vector illustration work with our complete reference guide to Adobe Illustrator keyboard shortcuts.</p>' },
    { title: 'Master Adobe Photoshop: Top 100 Time-Saving Shortcuts', slug: 'master-adobe-photoshop-top-100-time-saving-shortcuts', categorySlug: 'design', excerpt: 'Master Photoshop with 100 essential shortcuts for selection, retouching, and layer management.', content: '<p>Photoshop is the industry standard tool for photo editing and visual asset creation.</p>' },
    { title: 'Exploring the Intersection of Multimedia and Social Media', slug: 'exploring-the-intersection-of-multimedia-and-social-media', categorySlug: 'social-media', excerpt: 'How visual storytelling and motion graphics amplify social media brand engagement.', content: '<p>The significance of multimedia has further amplified the potential of social media, allowing users to create and share dynamic visual content.</p>' },
    { title: 'Why should I opt for PRISM MULTIMEDIA to boost my career? Top 10 Reasons', slug: 'why-should-i-opt-for-prism-multimedia-to-boost-my-career', categorySlug: 'company', excerpt: 'Discover the top 10 reasons why Prism Multimedia is the leading institute in Hyderabad.', content: '<p>Choosing the right training institute is the first step for building a successful career in graphic design, motion graphics, and VFX.</p>' },
    { title: 'Motion Graphics in User Interface (UI) Design', slug: 'motion-graphics-in-user-interface-ui-design', categorySlug: 'ui-design', excerpt: 'How micro-animations and motion transform static interfaces into intuitive experiences.', content: '<p>Motion graphics play an important role in modern user interface (UI) design, transforming static interfaces into dynamic experiences.</p>' }
  ];

  for (const b of blogsList) {
    await prisma.blog.upsert({
      where: { slug: b.slug },
      update: {},
      create: {
        title: b.title,
        slug: b.slug,
        excerpt: b.excerpt,
        content: b.content,
        category_id: blogCatMap[b.categorySlug] || blogCatMap['design'],
        author_id: adminUser.id,
        published: true
      }
    });
  }

  // 9. Student Work Categories & Works
  const workCatGraphic = await prisma.studentWorkCategory.upsert({
    where: { slug: 'graphic-design' },
    update: {},
    create: { name: 'Graphic Design', slug: 'graphic-design' }
  });

  const workCatUI = await prisma.studentWorkCategory.upsert({
    where: { slug: 'ui-ux' },
    update: {},
    create: { name: 'UI/UX', slug: 'ui-ux' }
  });

  await prisma.studentWork.create({
    data: {
      title: 'Brand Identity System',
      student_name: 'Bolle Madhu',
      category_id: workCatGraphic.id,
      description: 'Complete commercial brand manual, logo concepts, and collateral design.',
      image_url: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=800&q=80',
      featured: true,
      status: 'PUBLISHED'
    }
  });

  await prisma.studentWork.create({
    data: {
      title: 'E-Commerce Mobile App UI',
      student_name: 'Yarlagadda Haritha',
      category_id: workCatUI.id,
      description: 'End-to-end user research, wireframing, and interactive prototype for a retail shopping app.',
      image_url: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&w=800&q=80',
      featured: true,
      status: 'PUBLISHED'
    }
  });

  console.log('--- Database Seeding Completed Successfully! ---');
}

main()
  .catch((e) => {
    console.error('Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
