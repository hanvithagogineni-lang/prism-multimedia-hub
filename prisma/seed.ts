import pkg from '@prisma/client';
const { PrismaClient } = pkg;
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting Prism Multimedia Database Seeding...');

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

  // 2. Default Super Admin User
  const passwordHash = await bcrypt.hash('Admin@123456', 10);
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@prismmultimedia.com' },
    update: { password_hash: passwordHash },
    create: {
      name: 'Prism System Administrator',
      email: 'admin@prismmultimedia.com',
      password_hash: passwordHash,
      role_id: superAdminRole.id,
      status: 'Active'
    }
  });

  console.log(`👤 Admin User created: ${adminUser.email} (Password: Admin@123456)`);

  // 3. Initial Courses
  const coursesData = [
    {
      title: 'Post Graduate Diploma in Multimedia (PGDIM)',
      slug: 'pgdim',
      short_description: 'Comprehensive 18-month flagship program covering Graphic Design, UI/UX, Motion Graphics, 2D/3D Animation & VFX.',
      long_description: 'The Post Graduate Diploma in Multimedia (PGDIM) is Prism Multimedia’s premier flagship program designed for students seeking a master-level command over multimedia technologies.',
      duration: '18 Months',
      certification: 'Master Diploma in Multimedia',
      placement_assistance: '100% Guaranteed Placement Support',
      hero_image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80',
      tools: ['Photoshop', 'Illustrator', 'HTML', 'CSS', 'JavaScript', 'Bootstrap', 'jQuery', 'Angular', 'Adobe Animate', 'Premiere Pro', 'After Effects', 'Audition', 'Autodesk Maya', 'Blender']
    },
    {
      title: 'Graphic Design',
      slug: 'graphic-design',
      short_description: 'Master commercial layout, color theory, typography, and brand identity design using Adobe Creative Cloud.',
      long_description: 'Graphic Design course at Prism Multimedia equips students with essential creative and technical skills for modern digital and print media.',
      duration: '3 Months',
      certification: 'Certified Graphic Specialist',
      placement_assistance: '100% Placement Assistance',
      hero_image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=800&q=80',
      tools: ['Photoshop', 'Illustrator', 'InDesign', 'Acrobat']
    },
    {
      title: 'UX Design',
      slug: 'ux-design',
      short_description: 'Learn User Research, Wireframing, Prototyping, and Usability Testing using Figma and Adobe XD.',
      long_description: 'UX Design focuses on understanding user needs and creating intuitive, goal-driven user experiences for digital products.',
      duration: '4 Months',
      certification: 'UX Design Professional Certification',
      placement_assistance: 'Placement Assistance Available',
      hero_image: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&w=800&q=80',
      tools: ['Figma', 'Adobe XD', 'Miro']
    },
    {
      title: 'UI Design & Development',
      slug: 'ui-design-and-development',
      short_description: 'Bridge creative design and web development using Photoshop, Illustrator, HTML5, CSS3, JavaScript, and Angular.',
      long_description: 'Learn modern responsive web design and frontend UI development pipelines to build interactive commercial web applications.',
      duration: '5 Months',
      certification: 'UI Frontend Developer Certificate',
      placement_assistance: '100% Placement Assistance',
      hero_image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80',
      tools: ['Photoshop', 'Illustrator', 'HTML5', 'CSS3', 'JavaScript', 'Bootstrap', 'jQuery', 'Angular']
    },
    {
      title: '2D Animation',
      slug: '2d-animation',
      short_description: 'Character design, vector illustration, frame-by-frame animation, and digital filmmaking.',
      long_description: 'Master traditional principles of animation translated into modern vector digital pipelines using Adobe Animate and After Effects.',
      duration: '5 Months',
      certification: '2D Animator Specialist Certificate',
      placement_assistance: 'Placement Assistance Included',
      hero_image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?auto=format&fit=crop&w=800&q=80',
      tools: ['Photoshop', 'Illustrator', 'Adobe Animate', 'Premiere Pro', 'Media Encoder']
    },
    {
      title: 'Digital Marketing',
      slug: 'digital-marketing',
      short_description: 'Master SEO, SMM, PPC Advertising, Content Strategy, and Analytics to drive brand growth.',
      long_description: 'Comprehensive digital marketing course covering Google Ads, Social Media Marketing, Analytics, and Content Marketing strategy.',
      duration: '3 Months',
      certification: 'Certified Digital Marketer',
      placement_assistance: 'Placement Assistance Support',
      hero_image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
      tools: ['Google Ads', 'Google Analytics', 'Meta Ads Manager', 'SEMrush', 'WordPress']
    },
    {
      title: 'Audio & Video Editing',
      slug: 'audio-video-editing',
      short_description: 'Professional post-production, timeline editing, color grading, and sound mixing.',
      long_description: 'Learn non-linear editing using Premiere Pro, Audition, and After Effects to edit commercials, films, and YouTube content.',
      duration: '3 Months',
      certification: 'Video Editor & Sound Finishing Specialist',
      placement_assistance: 'Placement Support Provided',
      hero_image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=800&q=80',
      tools: ['Premiere Pro', 'Audition', 'After Effects', 'Media Encoder']
    },
    {
      title: '3D Animation',
      slug: '3d-animation',
      short_description: '3D modeling, texturing, lighting, character rigging, and high-fidelity rendering.',
      long_description: 'Complete 3D production pipeline training using Autodesk Maya and Blender for animation, film, and game design.',
      duration: '6 Months',
      certification: '3D Animation Production Diploma',
      placement_assistance: '100% Placement Support',
      hero_image: 'https://images.unsplash.com/photo-1617791160588-241658c0f566?auto=format&fit=crop&w=800&q=80',
      tools: ['Autodesk Maya', 'Blender', 'Substance Painter', 'ZBrush', 'Arnold']
    },
    {
      title: 'Visual Effects (VFX)',
      slug: 'vfx',
      short_description: 'Compositing, green screen keying, motion tracking, rotoscoping, and CGI integration.',
      long_description: 'Learn cinematic VFX compositing and visual effects assembly using Nuke, After Effects, and Maya for feature films and ads.',
      duration: '6 Months',
      certification: 'VFX Compositing Specialist',
      placement_assistance: '100% Studio Placement Assistance',
      hero_image: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&w=800&q=80',
      tools: ['After Effects', 'Nuke', 'Mocha Pro', 'Photoshop', 'Maya']
    },
    {
      title: 'Entrepreneurship Development Program (EDP)',
      slug: 'edp',
      short_description: 'Business models, agency establishment, creative client management, and leadership.',
      long_description: 'Empower creative professionals to start their own design studios, marketing agencies, or production houses.',
      duration: '2 Months',
      certification: 'Creative Entrepreneurship Certificate',
      placement_assistance: 'Incubation & Business Guidance',
      hero_image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
      tools: ['Business Canvas', 'Financial Modeling', 'Client Proposal Kits', 'Agency Tools']
    }
  ];

  for (const cdata of coursesData) {
    const course = await prisma.course.upsert({
      where: { slug: cdata.slug },
      update: {
        title: cdata.title,
        short_description: cdata.short_description,
        long_description: cdata.long_description,
        duration: cdata.duration,
        certification: cdata.certification,
        placement_assistance: cdata.placement_assistance,
        hero_image: cdata.hero_image
      },
      create: {
        title: cdata.title,
        slug: cdata.slug,
        short_description: cdata.short_description,
        long_description: cdata.long_description,
        duration: cdata.duration,
        certification: cdata.certification,
        placement_assistance: cdata.placement_assistance,
        hero_image: cdata.hero_image,
        status: 'Published'
      }
    });

    // Add tools
    let idx = 0;
    for (const tname of cdata.tools) {
      await prisma.courseTool.create({
        data: {
          course_id: course.id,
          tool_name: tname,
          sort_order: idx++
        }
      });
    }

    // Add sample curriculum steps
    await prisma.courseCurriculum.createMany({
      data: [
        { course_id: course.id, title: 'Module 1: Design Fundamentals & Tools', description: 'Core principles, software setup, and hands-on exercises.', sort_order: 1 },
        { course_id: course.id, title: 'Module 2: Advanced Workflows & Production', description: 'Real-world commercial project execution and studio techniques.', sort_order: 2 },
        { course_id: course.id, title: 'Module 3: Portfolio & Placement Preparation', description: 'Showreel creation, resume development, and mock interviews.', sort_order: 3 }
      ]
    });
  }

  console.log('📚 Courses seeded successfully!');

  // 4. Site Settings
  const settingsMap = {
    institute_name: 'Prism Multimedia',
    logo_url: './prism-logo.png',
    phone_primary: '+91 97013 34133',
    phone_secondary: '+91 91775 55040',
    email: 'info@prismmultimedia.com',
    working_hours: '8:00 AM – 8:00 PM (Monday to Saturday)',
    address: 'Prism Multimedia, Ameerpet Circle, Hyderabad, Telangana 500016',
    facebook_url: 'https://facebook.com/prismmultimedia',
    instagram_url: 'https://instagram.com/prismmultimedia',
    youtube_url: 'https://youtube.com/prismmultimedia',
    linkedin_url: 'https://linkedin.com/company/prismmultimedia',
    google_maps_url: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.495034638706!2d78.446864!3d17.433544!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb90d79679f225%3A0x51c726a27e77b4dd!2sPrism%20Multimedia!5e0!3m2!1sen!2sin!4v1700000000000'
  };

  for (const [k, v] of Object.entries(settingsMap)) {
    await prisma.setting.upsert({
      where: { key: k },
      update: { value: v },
      create: { key: k, value: v }
    });
  }

  console.log('⚙️ Site Settings seeded successfully!');
  console.log('🎉 Seeding Complete!');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
