import { Request, Response } from 'express';
import { prisma } from '../config/prisma.js';

export const getCourses = async (req: Request, res: Response) => {
  try {
    const { category, search } = req.query;

    let where: any = { status: 'PUBLISHED' };

    if (search) {
      where.OR = [
        { title: { contains: String(search) } },
        { short_description: { contains: String(search) } }
      ];
    }

    if (category && category !== 'all') {
      where.categories = {
        some: {
          category: {
            slug: String(category)
          }
        }
      };
    }

    const courses = await prisma.course.findMany({
      where,
      include: {
        categories: { include: { category: true } },
        tools: true,
        curriculum: true
      },
      orderBy: { created_at: 'desc' }
    });

    return res.json({ courses });
  } catch (error: any) {
    console.error('Error fetching courses:', error);
    return res.status(500).json({ error: 'Failed to fetch courses' });
  }
};

export const getCourseBySlug = async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;

    const course = await prisma.course.findUnique({
      where: { slug },
      include: {
        categories: { include: { category: true } },
        curriculum: { orderBy: { sort_order: 'asc' } },
        tools: { orderBy: { sort_order: 'asc' } },
        mentors: { orderBy: { sort_order: 'asc' } },
        careers: true,
        projects: true,
        faqs: { orderBy: { sort_order: 'asc' } }
      }
    });

    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }

    // Related courses
    const relatedCourses = await prisma.course.findMany({
      where: {
        status: 'PUBLISHED',
        id: { not: course.id }
      },
      take: 3
    });

    return res.json({ course, relatedCourses });
  } catch (error: any) {
    return res.status(500).json({ error: 'Failed to fetch course details' });
  }
};

export const createCourse = async (req: Request, res: Response) => {
  try {
    const { title, slug, shortDescription, longDescription, duration, certification, placementAssistance, onlineAvailable, classroomAvailable, heroImage, brochureUrl, seoTitle, seoDescription } = req.body;

    const course = await prisma.course.create({
      data: {
        title,
        slug: slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        short_description: shortDescription,
        long_description: longDescription,
        duration,
        certification,
        placement_assistance: placementAssistance || 'Yes',
        online_available: onlineAvailable ?? true,
        classroom_available: classroomAvailable ?? true,
        hero_image: heroImage,
        brochure_url: brochureUrl,
        seo_title: seoTitle,
        seo_description: seoDescription
      }
    });

    return res.status(201).json({ message: 'Course created successfully', course });
  } catch (error: any) {
    return res.status(500).json({ error: error.message || 'Failed to create course' });
  }
};

export const updateCourse = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const course = await prisma.course.update({
      where: { id: Number(id) },
      data: req.body
    });

    return res.json({ message: 'Course updated successfully', course });
  } catch (error: any) {
    return res.status(500).json({ error: 'Failed to update course' });
  }
};

export const deleteCourse = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.course.delete({
      where: { id: Number(id) }
    });

    return res.json({ message: 'Course deleted successfully' });
  } catch (error: any) {
    return res.status(500).json({ error: 'Failed to delete course' });
  }
};
