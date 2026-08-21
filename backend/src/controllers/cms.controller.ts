import { Request, Response } from 'express';
import { prisma } from '../config/prisma.js';

// --- BLOGS ---
export const getBlogs = async (req: Request, res: Response) => {
  try {
    const { category, search } = req.query;
    let where: any = { published: true };

    if (search) {
      where.OR = [
        { title: { contains: String(search) } },
        { excerpt: { contains: String(search) } }
      ];
    }

    if (category && category !== 'all') {
      where.category = { slug: String(category) };
    }

    const blogs = await prisma.blog.findMany({
      where,
      include: { category: true, author: { select: { name: true } } },
      orderBy: { published_at: 'desc' }
    });

    return res.json({ blogs });
  } catch (error: any) {
    return res.status(500).json({ error: 'Failed to fetch blogs' });
  }
};

export const getBlogBySlug = async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;
    const blog = await prisma.blog.findUnique({
      where: { slug },
      include: { category: true, author: { select: { name: true } } }
    });

    if (!blog) {
      return res.status(404).json({ error: 'Blog post not found' });
    }

    const relatedBlogs = await prisma.blog.findMany({
      where: { published: true, id: { not: blog.id } },
      take: 3
    });

    return res.json({ blog, relatedBlogs });
  } catch (error: any) {
    return res.status(500).json({ error: 'Failed to fetch blog post' });
  }
};

export const createBlog = async (req: Request, res: Response) => {
  try {
    const { title, slug, excerpt, content, categoryId, featuredImage, tags, published } = req.body;
    const blog = await prisma.blog.create({
      data: {
        title,
        slug: slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        excerpt,
        content,
        category_id: Number(categoryId),
        featured_image: featuredImage,
        tags,
        published: published ?? true
      }
    });
    return res.status(201).json({ message: 'Blog created', blog });
  } catch (error: any) {
    return res.status(500).json({ error: 'Failed to create blog' });
  }
};

export const deleteBlog = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.blog.delete({ where: { id: Number(id) } });
    return res.json({ message: 'Blog deleted' });
  } catch (error: any) {
    return res.status(500).json({ error: 'Failed to delete blog' });
  }
};

// --- STUDENT WORKS ---
export const getStudentWorks = async (req: Request, res: Response) => {
  try {
    const { category } = req.query;
    let where: any = { status: 'PUBLISHED' };

    if (category && category !== 'all') {
      where.category = { slug: String(category) };
    }

    const works = await prisma.studentWork.findMany({
      where,
      include: { category: true },
      orderBy: { created_at: 'desc' }
    });

    return res.json({ works });
  } catch (error: any) {
    return res.status(500).json({ error: 'Failed to fetch student works' });
  }
};

export const createStudentWork = async (req: Request, res: Response) => {
  try {
    const { title, studentName, categoryId, description, imageUrl, videoUrl, featured } = req.body;
    const work = await prisma.studentWork.create({
      data: {
        title,
        student_name: studentName,
        category_id: Number(categoryId),
        description,
        image_url: imageUrl,
        video_url: videoUrl,
        featured: featured ?? false,
        status: 'PUBLISHED'
      }
    });
    return res.status(201).json({ message: 'Student work created', work });
  } catch (error: any) {
    return res.status(500).json({ error: 'Failed to create student work' });
  }
};

// --- ALUMNI ---
export const getAlumni = async (req: Request, res: Response) => {
  try {
    const alumni = await prisma.alumni.findMany({
      where: { status: 'PUBLISHED' },
      include: { course: true },
      orderBy: { created_at: 'desc' }
    });
    return res.json({ alumni });
  } catch (error: any) {
    return res.status(500).json({ error: 'Failed to fetch alumni' });
  }
};

export const createAlumni = async (req: Request, res: Response) => {
  try {
    const alumni = await prisma.alumni.create({ data: req.body });
    return res.status(201).json({ message: 'Alumni created', alumni });
  } catch (error: any) {
    return res.status(500).json({ error: 'Failed to create alumni' });
  }
};

// --- PLACEMENTS ---
export const getPlacements = async (req: Request, res: Response) => {
  try {
    const placements = await prisma.placement.findMany({
      where: { status: 'PUBLISHED' },
      include: { course: true },
      orderBy: { year: 'desc' }
    });
    return res.json({ placements });
  } catch (error: any) {
    return res.status(500).json({ error: 'Failed to fetch placements' });
  }
};

// --- TESTIMONIALS ---
export const getTestimonials = async (req: Request, res: Response) => {
  try {
    const testimonials = await prisma.testimonial.findMany({
      where: { status: 'PUBLISHED' },
      orderBy: { created_at: 'desc' }
    });
    return res.json({ testimonials });
  } catch (error: any) {
    return res.status(500).json({ error: 'Failed to fetch testimonials' });
  }
};

// --- GLOBAL SEARCH ---
export const globalSearch = async (req: Request, res: Response) => {
  try {
    const q = String(req.query.q || '').trim();
    if (!q) {
      return res.json({ courses: [], blogs: [], studentWorks: [], alumni: [] });
    }

    const courses = await prisma.course.findMany({
      where: {
        status: 'PUBLISHED',
        OR: [
          { title: { contains: q } },
          { short_description: { contains: q } }
        ]
      },
      take: 5
    });

    const blogs = await prisma.blog.findMany({
      where: {
        published: true,
        OR: [
          { title: { contains: q } },
          { excerpt: { contains: q } }
        ]
      },
      take: 5
    });

    const studentWorks = await prisma.studentWork.findMany({
      where: {
        status: 'PUBLISHED',
        OR: [
          { title: { contains: q } },
          { student_name: { contains: q } }
        ]
      },
      take: 5
    });

    const alumni = await prisma.alumni.findMany({
      where: {
        status: 'PUBLISHED',
        OR: [
          { name: { contains: q } },
          { company: { contains: q } },
          { designation: { contains: q } }
        ]
      },
      take: 5
    });

    return res.json({ courses, blogs, studentWorks, alumni });
  } catch (error: any) {
    return res.status(500).json({ error: 'Search failed' });
  }
};

// --- SETTINGS ---
export const getSettings = async (req: Request, res: Response) => {
  try {
    const settingsList = await prisma.setting.findMany();
    const settingsMap: Record<string, string> = {};
    settingsList.forEach((s) => {
      settingsMap[s.key] = s.value;
    });
    return res.json({ settings: settingsMap });
  } catch (error: any) {
    return res.status(500).json({ error: 'Failed to fetch settings' });
  }
};

export const updateSettings = async (req: Request, res: Response) => {
  try {
    const settings = req.body;
    for (const [key, value] of Object.entries(settings)) {
      await prisma.setting.upsert({
        where: { key },
        update: { value: String(value) },
        create: { key, value: String(value) }
      });
    }
    return res.json({ message: 'Settings updated successfully' });
  } catch (error: any) {
    return res.status(500).json({ error: 'Failed to update settings' });
  }
};

// --- ADMIN DASHBOARD STATS ---
export const getDashboardStats = async (req: Request, res: Response) => {
  try {
    const totalCourses = await prisma.course.count();
    const totalRegistrations = await prisma.studentRegistration.count();
    const pendingRegistrations = await prisma.studentRegistration.count({ where: { status: 'New' } });
    const totalCourseEnquiries = await prisma.courseEnquiry.count();
    const totalContactMessages = await prisma.contactMessage.count();
    const totalCorporateLeads = await prisma.corporateLead.count();
    const totalFranchiseLeads = await prisma.franchiseLead.count();
    const totalAlumni = await prisma.alumni.count();
    const totalBlogs = await prisma.blog.count();
    const totalStudentWorks = await prisma.studentWork.count();

    const recentRegistrations = await prisma.studentRegistration.findMany({
      take: 5,
      orderBy: { created_at: 'desc' },
      include: { course: true }
    });

    return res.json({
      stats: {
        totalCourses,
        totalRegistrations,
        pendingRegistrations,
        totalCourseEnquiries,
        totalContactMessages,
        totalCorporateLeads,
        totalFranchiseLeads,
        totalAlumni,
        totalBlogs,
        totalStudentWorks
      },
      recentRegistrations
    });
  } catch (error: any) {
    return res.status(500).json({ error: 'Failed to fetch dashboard stats' });
  }
};
