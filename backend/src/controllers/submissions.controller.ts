import { Request, Response } from 'express';
import { prisma } from '../config/prisma.js';
import { AuthRequest, logAudit } from '../middleware/auth.js';

// ==================== 1. STUDENT REGISTRATIONS ====================
export const submitRegistration = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      name,
      father_name,
      gender,
      education,
      email,
      phone,
      alternate_phone,
      course_id,
      address1,
      address2,
      city,
      state,
      country,
    } = req.body;

    if (!name || !email || !phone || !gender || !education || !course_id || !address1 || !city || !state) {
      res.status(400).json({ error: 'Please fill in all required fields.' });
      return;
    }

    // Verify course
    const course = await prisma.course.findFirst({
      where: { OR: [{ id: course_id }, { slug: course_id }] },
    });

    if (!course) {
      res.status(400).json({ error: 'Selected course not found.' });
      return;
    }

    const registration = await prisma.studentRegistration.create({
      data: {
        name,
        father_name,
        gender,
        education,
        email: email.toLowerCase().trim(),
        phone: phone.trim(),
        alternate_phone: alternate_phone ? alternate_phone.trim() : null,
        course_id: course.id,
        address1,
        address2,
        city,
        state,
        country: country || 'India',
        status: 'New',
      },
      include: { course: true },
    });

    res.status(201).json({
      message: 'Registration submitted successfully. Our team will contact you soon.',
      id: registration.id,
    });
  } catch (err: any) {
    console.error('Registration error:', err);
    res.status(500).json({ error: 'Failed to process registration.' });
  }
};

export const getRegistrations = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { status, course_id, search } = req.query;

    const where: any = {};
    if (status && status !== 'all') where.status = String(status);
    if (course_id && course_id !== 'all') where.course_id = String(course_id);
    if (search) {
      where.OR = [
        { name: { contains: String(search) } },
        { email: { contains: String(search) } },
        { phone: { contains: String(search) } },
        { city: { contains: String(search) } },
      ];
    }

    const list = await prisma.studentRegistration.findMany({
      where,
      orderBy: { created_at: 'desc' },
      include: { course: true, assigned_user: true },
    });

    res.json(list);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch registrations' });
  }
};

export const updateRegistration = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { status, admin_notes, assigned_to } = req.body;

    const updated = await prisma.studentRegistration.update({
      where: { id },
      data: {
        status: status || undefined,
        admin_notes: admin_notes !== undefined ? admin_notes : undefined,
        assigned_to: assigned_to !== undefined ? assigned_to : undefined,
      },
      include: { course: true },
    });

    await logAudit(req.user?.id, 'UPDATE_REGISTRATION', 'REGISTRATION', id, req.ip);

    res.json(updated);
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to update registration' });
  }
};

// ==================== 2. COURSE ENQUIRIES ====================
export const submitCourseEnquiry = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, phone, course_id, message } = req.body;

    if (!name || !email || !phone || !course_id) {
      res.status(400).json({ error: 'Name, email, phone, and course are required.' });
      return;
    }

    const course = await prisma.course.findFirst({
      where: { OR: [{ id: course_id }, { slug: course_id }] },
    });

    if (!course) {
      res.status(400).json({ error: 'Course not found.' });
      return;
    }

    const enquiry = await prisma.courseEnquiry.create({
      data: {
        name,
        email: email.toLowerCase().trim(),
        phone: phone.trim(),
        course_id: course.id,
        message: message || 'Interested in course syllabus and batch timings.',
        status: 'New',
      },
    });

    res.status(201).json({ message: 'Course enquiry submitted successfully.', id: enquiry.id });
  } catch (err) {
    res.status(500).json({ error: 'Failed to submit course enquiry.' });
  }
};

export const getCourseEnquiries = async (_req: AuthRequest, res: Response): Promise<void> => {
  try {
    const list = await prisma.courseEnquiry.findMany({
      orderBy: { created_at: 'desc' },
      include: { course: true },
    });
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch course enquiries' });
  }
};

// ==================== 3. CONTACT MESSAGES ====================
export const submitContact = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, mobile, message, consent } = req.body;

    if (!name || !email || !mobile || !message) {
      res.status(400).json({ error: 'Name, email, mobile, and message are required.' });
      return;
    }

    const contact = await prisma.contactMessage.create({
      data: {
        name,
        email: email.toLowerCase().trim(),
        mobile: mobile.trim(),
        message,
        consent: consent !== false,
        status: 'New',
      },
    });

    res.status(201).json({ message: 'Thank you. We have received your message and will respond shortly.', id: contact.id });
  } catch (err) {
    res.status(500).json({ error: 'Failed to submit contact message.' });
  }
};

export const getContactMessages = async (_req: AuthRequest, res: Response): Promise<void> => {
  try {
    const list = await prisma.contactMessage.findMany({
      orderBy: { created_at: 'desc' },
    });
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch contact messages' });
  }
};

// ==================== 4. CORPORATE LEADS ====================
export const submitCorporateLead = async (req: Request, res: Response): Promise<void> => {
  try {
    const { company_name, contact_name, phone, email, program, estimated_trainees, course_timeline, message } = req.body;

    if (!company_name || !contact_name || !phone || !email || !program) {
      res.status(400).json({ error: 'Please provide company name, contact name, phone, email, and program.' });
      return;
    }

    const lead = await prisma.corporateLead.create({
      data: {
        company_name,
        contact_name,
        phone: phone.trim(),
        email: email.toLowerCase().trim(),
        program,
        estimated_trainees: estimated_trainees ? parseInt(estimated_trainees, 10) : null,
        course_timeline,
        message,
        status: 'New',
      },
    });

    res.status(201).json({ message: 'Thank you. Our corporate training team will contact you shortly.', id: lead.id });
  } catch (err) {
    res.status(500).json({ error: 'Failed to submit corporate training enquiry.' });
  }
};

export const getCorporateLeads = async (_req: AuthRequest, res: Response): Promise<void> => {
  try {
    const list = await prisma.corporateLead.findMany({
      orderBy: { created_at: 'desc' },
    });
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch corporate leads' });
  }
};

// ==================== 5. FRANCHISE LEADS ====================
export const submitFranchiseLead = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, phone, email, company, location, message } = req.body;

    if (!name || !phone || !email || !location) {
      res.status(400).json({ error: 'Name, phone, email, and location are required.' });
      return;
    }

    const lead = await prisma.franchiseLead.create({
      data: {
        name,
        phone: phone.trim(),
        email: email.toLowerCase().trim(),
        company,
        location,
        message,
        status: 'New',
      },
    });

    res.status(201).json({ message: 'Thank you for your interest. Our franchise partnerships director will contact you.', id: lead.id });
  } catch (err) {
    res.status(500).json({ error: 'Failed to submit franchise enquiry.' });
  }
};

export const getFranchiseLeads = async (_req: AuthRequest, res: Response): Promise<void> => {
  try {
    const list = await prisma.franchiseLead.findMany({
      orderBy: { created_at: 'desc' },
    });
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch franchise leads' });
  }
};

// ==================== 6. CSV EXPORT ====================
export const exportDataCSV = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { type } = req.params;

    let rows: any[] = [];
    let headers: string[] = [];

    if (type === 'registrations') {
      const data = await prisma.studentRegistration.findMany({ include: { course: true } });
      headers = ['ID', 'Name', 'Email', 'Phone', 'Course', 'City', 'State', 'Status', 'Date'];
      rows = data.map((d) => [
        d.id,
        `"${d.name}"`,
        d.email,
        d.phone,
        `"${d.course?.title}"`,
        d.city,
        d.state,
        d.status,
        d.created_at.toISOString(),
      ]);
    } else if (type === 'corporate-leads') {
      const data = await prisma.corporateLead.findMany();
      headers = ['ID', 'Company', 'Contact', 'Phone', 'Email', 'Program', 'Trainees', 'Status', 'Date'];
      rows = data.map((d) => [
        d.id,
        `"${d.company_name}"`,
        `"${d.contact_name}"`,
        d.phone,
        d.email,
        `"${d.program}"`,
        d.estimated_trainees || 0,
        d.status,
        d.created_at.toISOString(),
      ]);
    } else if (type === 'contact') {
      const data = await prisma.contactMessage.findMany();
      headers = ['ID', 'Name', 'Email', 'Mobile', 'Message', 'Status', 'Date'];
      rows = data.map((d) => [
        d.id,
        `"${d.name}"`,
        d.email,
        d.mobile,
        `"${d.message.replace(/"/g, '""')}"`,
        d.status,
        d.created_at.toISOString(),
      ]);
    }

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename="prism-${type}-${Date.now()}.csv"`);
    res.send(csvContent);
  } catch (err) {
    res.status(500).json({ error: 'Failed to generate CSV export' });
  }
};
