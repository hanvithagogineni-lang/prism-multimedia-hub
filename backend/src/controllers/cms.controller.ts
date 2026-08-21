import { Request, Response } from 'express';
import { prisma } from '../config/prisma.js';
import { AuthRequest, logAudit } from '../middleware/auth.js';

// ==================== 1. BLOGS ====================
export const getBlogs = async (req: Request, res: Response): Promise<void> => {
  try {
    const { category, search, page = '1', limit = '12' } = req.query;
    const pageNum = parseInt(String(page), 10) || 1;
    const limitNum = parseInt(String(limit), 10) || 12;
    const skip = (pageNum - 1) * limitNum;

    const where: any = { published: true };

    if (category && category !== 'all') {
      where.category = { slug: String(category) };
    }

    if (search) {
      where.OR = [
        { title: { contains: String(search) } },
        { excerpt: { contains: String(search) } },
        { content: { contains: String(search) } },
      ];
    }

    const [total, blogs] = await Promise.all([
      prisma.blog.count({ where }),
      prisma.blog.findMany({
        where,
        skip,
        take: limitNum,
        orderBy: { published_at: 'desc' },
        include: { category: true, author: { select: { name: true } } },
      }),
    ]);

    res.json({
      data: blogs,
      pagination: {
        total,
        page: pageNum,
        pages: Math.ceil(total / limitNum),
      },
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch blogs' });
  }
};

export const getBlogBySlug = async (req: Request, res: Response): Promise<void> => {
  try {
    const { slug } = req.params;

    const blog = await prisma.blog.findFirst({
      where: { OR: [{ slug }, { id: slug }] },
      include: { category: true, author: { select: { name: true } } },
    });

    if (!blog) {
      res.status(404).json({ error: 'Blog not found' });
      return;
    }

    const recent = await prisma.blog.findMany({
      where: { id: { not: blog.id }, published: true },
      take: 4,
      orderBy: { published_at: 'desc' },
      include: { category: true },
    });

    res.json({ ...blog, recent });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch blog post' });
  }
};

export const createBlog = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { title, slug, excerpt, content, category_id, featured_image, tags } = req.body;
    const blogSlug = slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-');

    const blog = await prisma.blog.create({
      data: {
        title,
        slug: blogSlug,
        excerpt: excerpt || content.slice(0, 160),
        content,
        category_id,
        featured_image: featured_image || './blog-poster-1.jpg',
        author_id: req.user?.id,
        tags,
        published: true,
      },
    });

    await logAudit(req.user?.id, 'CREATE_BLOG', 'BLOG', blog.id, req.ip);
    res.status(201).json(blog);
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Failed to create blog' });
  }
};

// ==================== 2. STUDENT WORKS ====================
export const getStudentWorks = async (req: Request, res: Response): Promise<void> => {
  try {
    const { category, search } = req.query;

    const where: any = { status: 'PUBLISHED' };
    if (category && category !== 'all') {
      where.category = { slug: String(category) };
    }
    if (search) {
      where.OR = [
        { title: { contains: String(search) } },
        { student_name: { contains: String(search) } },
      ];
    }

    const list = await prisma.studentWork.findMany({
      where,
      orderBy: { created_at: 'desc' },
      include: { category: true },
    });

    const categories = await prisma.studentWorkCategory.findMany();

    res.json({ data: list, categories });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch student works' });
  }
};

// ==================== 3. ALUMNI ====================
export const getAlumni = async (req: Request, res: Response): Promise<void> => {
  try {
    const { search } = req.query;
    const where: any = { status: 'ACTIVE' };

    if (search) {
      where.OR = [
        { name: { contains: String(search) } },
        { company: { contains: String(search) } },
        { designation: { contains: String(search) } },
      ];
    }

    const list = await prisma.alumni.findMany({
      where,
      orderBy: { created_at: 'asc' },
      include: { course: true },
    });

    res.json(list);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch alumni' });
  }
};

// ==================== 4. PLACEMENTS ====================
export const getPlacements = async (_req: Request, res: Response): Promise<void> => {
  try {
    const list = await prisma.placement.findMany({
      where: { status: 'PUBLISHED' },
      orderBy: { year: 'desc' },
      include: { course: true },
    });
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch placements' });
  }
};

// ==================== 5. TESTIMONIALS ====================
export const getTestimonials = async (_req: Request, res: Response): Promise<void> => {
  try {
    const list = await prisma.testimonial.findMany({
      where: { status: 'APPROVED' },
      orderBy: { created_at: 'desc' },
    });
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch testimonials' });
  }
};

// ==================== 6. SETTINGS & SEO ====================
export const getSettings = async (_req: Request, res: Response): Promise<void> => {
  try {
    const settingsList = await prisma.setting.findMany();
    const settingsMap: Record<string, string> = {};
    settingsList.forEach((s) => {
      settingsMap[s.key] = s.value;
    });
    res.json(settingsMap);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch settings' });
  }
};

export const updateSettings = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const updates = req.body;
    for (const [key, value] of Object.entries(updates)) {
      await prisma.setting.upsert({
        where: { key },
        update: { value: String(value) },
        create: { key, value: String(value) },
      });
    }

    await logAudit(req.user?.id, 'UPDATE_SETTINGS', 'SETTING', 'ALL', req.ip);
    res.json({ message: 'Settings updated successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update settings' });
  }
};

// ==================== 7. GLOBAL SEARCH ====================
export const searchGlobal = async (req: Request, res: Response): Promise<void> => {
  try {
    const { q } = req.query;
    if (!q || String(q).trim().length < 2) {
      res.json({ courses: [], blogs: [], studentWorks: [], alumni: [] });
      return;
    }

    const query = String(q).trim();

    const [courses, blogs, studentWorks, alumni] = await Promise.all([
      prisma.course.findMany({
        where: {
          status: 'PUBLISHED',
          OR: [
            { title: { contains: query } },
            { short_description: { contains: query } },
          ],
        },
        take: 6,
        select: { id: true, title: true, slug: true, duration: true, hero_image: true, short_description: true },
      }),
      prisma.blog.findMany({
        where: {
          published: true,
          OR: [
            { title: { contains: query } },
            { excerpt: { contains: query } },
          ],
        },
        take: 6,
        select: { id: true, title: true, slug: true, excerpt: true, featured_image: true },
      }),
      prisma.studentWork.findMany({
        where: {
          status: 'PUBLISHED',
          OR: [
            { title: { contains: query } },
            { student_name: { contains: query } },
          ],
        },
        take: 6,
      }),
      prisma.alumni.findMany({
        where: {
          status: 'ACTIVE',
          OR: [
            { name: { contains: query } },
            { company: { contains: query } },
          ],
        },
        take: 6,
      }),
    ]);

    res.json({ courses, blogs, studentWorks, alumni });
  } catch (err) {
    res.status(500).json({ error: 'Failed to perform search' });
  }
};

// ==================== 8. ADMIN DASHBOARD METRICS ====================
export const getAdminDashboardMetrics = async (_req: AuthRequest, res: Response): Promise<void> => {
  try {
    const [
      totalCourses,
      totalRegistrations,
      newRegistrations,
      contactMessages,
      corporateLeads,
      franchiseLeads,
      courseEnquiries,
      totalBlogs,
      totalAlumni,
      totalPlacements,
      recentRegistrations,
      recentLeads,
    ] = await Promise.all([
      prisma.course.count(),
      prisma.studentRegistration.count(),
      prisma.studentRegistration.count({ where: { status: 'New' } }),
      prisma.contactMessage.count({ where: { status: 'New' } }),
      prisma.corporateLead.count({ where: { status: 'New' } }),
      prisma.franchiseLead.count({ where: { status: 'New' } }),
      prisma.courseEnquiry.count({ where: { status: 'New' } }),
      prisma.blog.count(),
      prisma.alumni.count(),
      prisma.placement.count(),
      prisma.studentRegistration.findMany({
        take: 5,
        orderBy: { created_at: 'desc' },
        include: { course: true },
      }),
      prisma.contactMessage.findMany({
        take: 5,
        orderBy: { created_at: 'desc' },
      }),
    ]);

    res.json({
      metrics: {
        totalCourses,
        totalRegistrations,
        newRegistrations,
        pendingLeads: contactMessages + corporateLeads + franchiseLeads + courseEnquiries,
        contactMessages,
        corporateLeads,
        franchiseLeads,
        totalBlogs,
        totalAlumni,
        totalPlacements,
      },
      recentRegistrations,
      recentLeads,
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch dashboard metrics' });
  }
};
