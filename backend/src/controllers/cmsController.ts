import { Request, Response } from 'express';
import { prisma } from '../config/db';

// 1. Blogs
export const getBlogs = async (req: Request, res: Response) => {
  try {
    const blogs = await prisma.blog.findMany({
      where: { published: true },
      include: { category: true, author: true },
      orderBy: { published_at: 'desc' }
    });
    return res.json({ success: true, data: blogs });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getBlogBySlug = async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;
    const blog = await prisma.blog.findUnique({
      where: { slug },
      include: { category: true, author: true }
    });
    if (!blog) {
      return res.status(404).json({ success: false, message: 'Blog post not found' });
    }
    return res.json({ success: true, data: blog });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const createBlog = async (req: Request, res: Response) => {
  try {
    const { title, slug, excerpt, content, featured_image, category_id, tags, seo_title, seo_description } = req.body;
    const blog = await prisma.blog.create({
      data: {
        title,
        slug: slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        excerpt,
        content,
        featured_image,
        category_id,
        tags,
        seo_title,
        seo_description
      }
    });
    return res.status(201).json({ success: true, data: blog });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// 2. Student Works
export const getStudentWorks = async (req: Request, res: Response) => {
  try {
    const works = await prisma.studentWork.findMany({
      include: { category: true },
      orderBy: { created_at: 'desc' }
    });
    return res.json({ success: true, data: works });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// 3. Alumni
export const getAlumni = async (req: Request, res: Response) => {
  try {
    const alumni = await prisma.alumni.findMany({
      include: { course: true },
      orderBy: { created_at: 'desc' }
    });
    return res.json({ success: true, data: alumni });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// 4. Placements
export const getPlacements = async (req: Request, res: Response) => {
  try {
    const placements = await prisma.placement.findMany({
      include: { course: true },
      orderBy: { created_at: 'desc' }
    });
    return res.json({ success: true, data: placements });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// 5. Testimonials
export const getTestimonials = async (req: Request, res: Response) => {
  try {
    const testimonials = await prisma.testimonial.findMany({
      where: { status: 'Published' },
      include: { course: true },
      orderBy: { created_at: 'desc' }
    });
    return res.json({ success: true, data: testimonials });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// 6. Settings
export const getSettings = async (req: Request, res: Response) => {
  try {
    const settings = await prisma.setting.findMany();
    const settingsMap: Record<string, string> = {};
    settings.forEach(s => {
      settingsMap[s.key] = s.value;
    });
    return res.json({ success: true, data: settingsMap });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const updateSettings = async (req: Request, res: Response) => {
  try {
    const settingsObj = req.body;
    for (const [key, value] of Object.entries(settingsObj)) {
      await prisma.setting.upsert({
        where: { key },
        update: { value: String(value) },
        create: { key, value: String(value) }
      });
    }
    return res.json({ success: true, message: 'Settings updated successfully' });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// 7. Global Search
export const globalSearch = async (req: Request, res: Response) => {
  try {
    const q = String(req.query.q || '');
    if (!q) {
      return res.json({ success: true, data: { courses: [], blogs: [], student_works: [], alumni: [] } });
    }

    const courses = await prisma.course.findMany({
      where: {
        OR: [
          { title: { contains: q } },
          { short_description: { contains: q } }
        ]
      }
    });

    const blogs = await prisma.blog.findMany({
      where: {
        OR: [
          { title: { contains: q } },
          { excerpt: { contains: q } }
        ]
      }
    });

    const works = await prisma.studentWork.findMany({
      where: {
        OR: [
          { title: { contains: q } },
          { student_name: { contains: q } }
        ]
      }
    });

    const alumni = await prisma.alumni.findMany({
      where: {
        OR: [
          { name: { contains: q } },
          { company: { contains: q } }
        ]
      }
    });

    return res.json({
      success: true,
      data: {
        courses,
        blogs,
        student_works: works,
        alumni
      }
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// 8. Admin Dashboard Stats
export const getAdminDashboardStats = async (req: Request, res: Response) => {
  try {
    const totalCourses = await prisma.course.count();
    const totalStudents = await prisma.studentRegistration.count();
    const newRegistrations = await prisma.studentRegistration.count({ where: { status: 'New' } });
    const pendingEnquiries = await prisma.courseEnquiry.count({ where: { status: 'New' } });
    const contactMessages = await prisma.contactMessage.count({ where: { status: 'New' } });
    const corporateLeads = await prisma.corporateLead.count({ where: { status: 'New' } });
    const franchiseLeads = await prisma.franchiseLead.count({ where: { status: 'New' } });
    const totalBlogs = await prisma.blog.count();
    const totalStudentWorks = await prisma.studentWork.count();
    const totalAlumni = await prisma.alumni.count();

    const recentRegistrations = await prisma.studentRegistration.findMany({
      take: 5,
      include: { course: true },
      orderBy: { created_at: 'desc' }
    });

    return res.json({
      success: true,
      data: {
        stats: {
          totalCourses,
          totalStudents,
          newRegistrations,
          pendingEnquiries,
          contactMessages,
          corporateLeads,
          franchiseLeads,
          totalBlogs,
          totalStudentWorks,
          totalAlumni
        },
        recentRegistrations
      }
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
