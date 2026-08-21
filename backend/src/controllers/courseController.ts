import { Request, Response } from 'express';
import { prisma } from '../config/db';

export const getCourses = async (req: Request, res: Response) => {
  try {
    const { category, search, sort } = req.query;

    let whereClause: any = { status: 'Published' };

    if (search) {
      whereClause.OR = [
        { title: { contains: String(search) } },
        { short_description: { contains: String(search) } },
        { duration: { contains: String(search) } }
      ];
    }

    const courses = await prisma.course.findMany({
      where: whereClause,
      include: {
        category_maps: {
          include: { category: true }
        },
        tools: { orderBy: { sort_order: 'asc' } },
        curriculum: { orderBy: { sort_order: 'asc' } }
      },
      orderBy: { created_at: 'desc' }
    });

    let filtered = courses;
    if (category && category !== 'All') {
      filtered = courses.filter(c => 
        c.category_maps.some(cm => cm.category.name.toLowerCase() === String(category).toLowerCase() || cm.category.slug === String(category))
      );
    }

    return res.json({ success: true, count: filtered.length, data: filtered });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getCourseBySlug = async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;

    const course = await prisma.course.findUnique({
      where: { slug },
      include: {
        category_maps: { include: { category: true } },
        curriculum: { orderBy: { sort_order: 'asc' } },
        tools: { orderBy: { sort_order: 'asc' } },
        mentors: { orderBy: { sort_order: 'asc' } },
        careers: true,
        projects: true,
        faqs: { orderBy: { sort_order: 'asc' } }
      }
    });

    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }

    return res.json({ success: true, data: course });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const createCourse = async (req: Request, res: Response) => {
  try {
    const { title, slug, short_description, long_description, duration, certification, placement_assistance, online_available, classroom_available, hero_image, brochure_url, status, seo_title, seo_description } = req.body;

    const course = await prisma.course.create({
      data: {
        title,
        slug: slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        short_description,
        long_description,
        duration,
        certification,
        placement_assistance,
        online_available: online_available ?? true,
        classroom_available: classroom_available ?? true,
        hero_image,
        brochure_url,
        status: status || 'Published',
        seo_title,
        seo_description
      }
    });

    return res.status(201).json({ success: true, data: course });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const updateCourse = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const course = await prisma.course.update({
      where: { id },
      data: req.body
    });
    return res.json({ success: true, data: course });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteCourse = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.course.delete({ where: { id } });
    return res.json({ success: true, message: 'Course deleted successfully' });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
