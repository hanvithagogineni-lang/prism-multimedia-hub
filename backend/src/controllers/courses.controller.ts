import { Request, Response } from 'express';
import { prisma } from '../config/prisma.js';
import { AuthRequest, logAudit } from '../middleware/auth.js';

export const getCourses = async (req: Request, res: Response): Promise<void> => {
  try {
    const { category, search, sort } = req.query;

    const where: any = { status: 'PUBLISHED' };

    if (search) {
      where.OR = [
        { title: { contains: String(search) } },
        { short_description: { contains: String(search) } },
      ];
    }

    if (category && category !== 'all') {
      where.categories = {
        some: {
          category: {
            slug: String(category),
          },
        },
      };
    }

    let orderBy: any = { created_at: 'asc' };
    if (sort === 'title_asc') orderBy = { title: 'asc' };
    if (sort === 'title_desc') orderBy = { title: 'desc' };

    const courses = await prisma.course.findMany({
      where,
      orderBy,
      include: {
        categories: {
          include: { category: true },
        },
        tools: {
          orderBy: { sort_order: 'asc' },
        },
      },
    });

    res.json(courses);
  } catch (err) {
    console.error('Error fetching courses:', err);
    res.status(500).json({ error: 'Failed to fetch courses' });
  }
};

export const getCourseBySlug = async (req: Request, res: Response): Promise<void> => {
  try {
    const { slug } = req.params;

    const course = await prisma.course.findFirst({
      where: {
        OR: [{ slug }, { id: slug }],
      },
      include: {
        categories: {
          include: { category: true },
        },
        curriculum: {
          orderBy: { sort_order: 'asc' },
        },
        tools: {
          orderBy: { sort_order: 'asc' },
        },
        mentors: {
          orderBy: { sort_order: 'asc' },
        },
        careers: true,
        projects: true,
        faqs: {
          orderBy: { sort_order: 'asc' },
        },
      },
    });

    if (!course) {
      res.status(404).json({ error: 'Course not found' });
      return;
    }

    // Also fetch related courses
    const relatedCourses = await prisma.course.findMany({
      where: {
        id: { not: course.id },
        status: 'PUBLISHED',
      },
      take: 3,
      include: {
        categories: {
          include: { category: true },
        },
      },
    });

    res.json({ ...course, relatedCourses });
  } catch (err) {
    console.error('Error fetching course detail:', err);
    res.status(500).json({ error: 'Failed to fetch course details' });
  }
};

export const getCategories = async (_req: Request, res: Response): Promise<void> => {
  try {
    const categories = await prisma.courseCategory.findMany({
      where: { status: 'ACTIVE' },
      include: {
        _count: {
          select: { courses: true },
        },
      },
    });
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
};

export const createCourse = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const {
      title,
      slug,
      short_description,
      long_description,
      duration,
      certification,
      placement_assistance,
      online_available,
      classroom_available,
      hero_image,
      brochure_url,
      status,
      category_ids,
    } = req.body;

    const courseSlug = slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-');

    const course = await prisma.course.create({
      data: {
        title,
        slug: courseSlug,
        short_description,
        long_description: long_description || short_description,
        duration: duration || '3 Months',
        certification: certification || 'Industry Recognized Certification',
        placement_assistance: placement_assistance || '100% Placement Assistance',
        online_available: online_available !== false,
        classroom_available: classroom_available !== false,
        hero_image: hero_image || './program-card-graphic.jpg',
        brochure_url,
        status: status || 'PUBLISHED',
      },
    });

    if (category_ids && Array.isArray(category_ids)) {
      for (const catId of category_ids) {
        await prisma.courseCategoryMap.create({
          data: { course_id: course.id, category_id: catId },
        });
      }
    }

    await logAudit(req.user?.id, 'CREATE_COURSE', 'COURSE', course.id, req.ip);

    res.status(201).json(course);
  } catch (err: any) {
    console.error('Error creating course:', err);
    res.status(500).json({ error: err.message || 'Failed to create course' });
  }
};

export const updateCourse = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const data = req.body;

    const updated = await prisma.course.update({
      where: { id },
      data: {
        title: data.title,
        slug: data.slug,
        short_description: data.short_description,
        long_description: data.long_description,
        duration: data.duration,
        certification: data.certification,
        placement_assistance: data.placement_assistance,
        online_available: data.online_available,
        classroom_available: data.classroom_available,
        hero_image: data.hero_image,
        brochure_url: data.brochure_url,
        status: data.status,
      },
    });

    await logAudit(req.user?.id, 'UPDATE_COURSE', 'COURSE', id, req.ip);

    res.json(updated);
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Failed to update course' });
  }
};

export const deleteCourse = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    await prisma.course.delete({ where: { id } });
    await logAudit(req.user?.id, 'DELETE_COURSE', 'COURSE', id, req.ip);
    res.json({ message: 'Course deleted successfully' });
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Failed to delete course' });
  }
};
