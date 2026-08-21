import { Request, Response } from 'express';
import { prisma } from '../config/db';

// 1. Student Registration
export const createRegistration = async (req: Request, res: Response) => {
  try {
    const { name, father_name, gender, education, email, phone, alternate_phone, course_id, address1, address2, city, state, country } = req.body;

    if (!name || !email || !phone || !course_id || !address1 || !city || !state) {
      return res.status(400).json({ success: false, message: 'Please fill in all required fields' });
    }

    // Resolve course_id if slug or title passed
    let resolvedCourseId = course_id;
    const courseObj = await prisma.course.findFirst({
      where: {
        OR: [{ id: course_id }, { slug: course_id }, { title: course_id }]
      }
    });
    if (courseObj) {
      resolvedCourseId = courseObj.id;
    }

    const reg = await prisma.studentRegistration.create({
      data: {
        name,
        father_name,
        gender: gender || 'Other',
        education: education || 'Graduate',
        email,
        phone,
        alternate_phone,
        course_id: resolvedCourseId,
        address1,
        address2,
        city,
        state,
        country: country || 'India',
        status: 'New'
      }
    });

    return res.status(201).json({
      success: true,
      message: 'Registration submitted successfully. Our team will contact you soon.',
      data: reg
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getRegistrations = async (req: Request, res: Response) => {
  try {
    const registrations = await prisma.studentRegistration.findMany({
      include: { course: true },
      orderBy: { created_at: 'desc' }
    });
    return res.json({ success: true, data: registrations });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const updateRegistrationStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status, admin_notes, assigned_to } = req.body;
    const updated = await prisma.studentRegistration.update({
      where: { id },
      data: { status, admin_notes, assigned_to }
    });
    return res.json({ success: true, data: updated });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// 2. Course Enquiry
export const createCourseEnquiry = async (req: Request, res: Response) => {
  try {
    const { name, email, phone, course_id, message } = req.body;
    const enquiry = await prisma.courseEnquiry.create({
      data: { name, email, phone, course_id, message }
    });
    return res.status(201).json({ success: true, message: 'Enquiry submitted successfully', data: enquiry });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getCourseEnquiries = async (req: Request, res: Response) => {
  try {
    const enquiries = await prisma.courseEnquiry.findMany({
      include: { course: true },
      orderBy: { created_at: 'desc' }
    });
    return res.json({ success: true, data: enquiries });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// 3. Contact Messages
export const createContactMessage = async (req: Request, res: Response) => {
  try {
    const { name, email, mobile, message, consent } = req.body;
    const msg = await prisma.contactMessage.create({
      data: { name, email, mobile, message, consent: consent ?? true }
    });
    return res.status(201).json({ success: true, message: 'Message sent successfully', data: msg });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getContactMessages = async (req: Request, res: Response) => {
  try {
    const messages = await prisma.contactMessage.findMany({ orderBy: { created_at: 'desc' } });
    return res.json({ success: true, data: messages });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// 4. Corporate Leads
export const createCorporateLead = async (req: Request, res: Response) => {
  try {
    const { company_name, contact_name, phone, email, program, estimated_trainees, course_timeline, message } = req.body;
    const lead = await prisma.corporateLead.create({
      data: { company_name, contact_name, phone, email, program, estimated_trainees: Number(estimated_trainees) || null, course_timeline, message }
    });
    return res.status(201).json({ success: true, message: 'Corporate request submitted successfully', data: lead });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getCorporateLeads = async (req: Request, res: Response) => {
  try {
    const leads = await prisma.corporateLead.findMany({ orderBy: { created_at: 'desc' } });
    return res.json({ success: true, data: leads });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// 5. Franchise Leads
export const createFranchiseLead = async (req: Request, res: Response) => {
  try {
    const { name, phone, email, company, location, message } = req.body;
    const lead = await prisma.franchiseLead.create({
      data: { name, phone, email, company, location, message }
    });
    return res.status(201).json({ success: true, message: 'Franchise enquiry submitted successfully', data: lead });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getFranchiseLeads = async (req: Request, res: Response) => {
  try {
    const leads = await prisma.franchiseLead.findMany({ orderBy: { created_at: 'desc' } });
    return res.json({ success: true, data: leads });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
