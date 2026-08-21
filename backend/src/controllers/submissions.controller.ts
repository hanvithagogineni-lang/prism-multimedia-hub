import { Request, Response } from 'express';
import { prisma } from '../config/prisma.js';

// 1. Student Registration Submission
export const submitRegistration = async (req: Request, res: Response) => {
  try {
    const { name, fatherName, gender, education, email, phone, alternatePhone, courseId, address1, address2, city, state, country } = req.body;

    if (!name || !email || !phone || !courseId || !address1 || !city || !state) {
      return res.status(400).json({ error: 'All required registration fields must be provided' });
    }

    const registration = await prisma.studentRegistration.create({
      data: {
        name,
        father_name: fatherName,
        gender: gender || 'Other',
        education: education || 'N/A',
        email,
        phone,
        alternate_phone: alternatePhone,
        course_id: Number(courseId),
        address1,
        address2,
        city,
        state,
        country: country || 'India',
        status: 'New'
      }
    });

    return res.status(201).json({
      message: 'Registration submitted successfully. Our team will contact you soon.',
      registrationId: registration.id
    });
  } catch (error: any) {
    console.error('Registration error:', error);
    return res.status(500).json({ error: 'Failed to submit registration' });
  }
};

export const getRegistrations = async (req: Request, res: Response) => {
  try {
    const registrations = await prisma.studentRegistration.findMany({
      include: { course: true, assignee: { select: { id: true, name: true } } },
      orderBy: { created_at: 'desc' }
    });
    return res.json({ registrations });
  } catch (error: any) {
    return res.status(500).json({ error: 'Failed to fetch registrations' });
  }
};

export const updateRegistration = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status, adminNotes, assignedTo } = req.body;

    const registration = await prisma.studentRegistration.update({
      where: { id: Number(id) },
      data: {
        status,
        admin_notes: adminNotes,
        assigned_to: assignedTo ? Number(assignedTo) : undefined
      }
    });

    return res.json({ message: 'Registration updated', registration });
  } catch (error: any) {
    return res.status(500).json({ error: 'Failed to update registration' });
  }
};

// 2. Course Enquiry Submission
export const submitCourseEnquiry = async (req: Request, res: Response) => {
  try {
    const { name, email, phone, courseId, message } = req.body;

    const enquiry = await prisma.courseEnquiry.create({
      data: {
        name,
        email,
        phone,
        course_id: Number(courseId),
        message,
        status: 'New'
      }
    });

    return res.status(201).json({ message: 'Enquiry submitted successfully', enquiryId: enquiry.id });
  } catch (error: any) {
    return res.status(500).json({ error: 'Failed to submit enquiry' });
  }
};

export const getCourseEnquiries = async (req: Request, res: Response) => {
  try {
    const enquiries = await prisma.courseEnquiry.findMany({
      include: { course: true },
      orderBy: { created_at: 'desc' }
    });
    return res.json({ enquiries });
  } catch (error: any) {
    return res.status(500).json({ error: 'Failed to fetch enquiries' });
  }
};

// 3. Contact Message Submission
export const submitContact = async (req: Request, res: Response) => {
  try {
    const { name, email, mobile, message, consent } = req.body;

    if (!name || !email || !mobile || !message) {
      return res.status(400).json({ error: 'Name, email, mobile and message are required' });
    }

    const contact = await prisma.contactMessage.create({
      data: {
        name,
        email,
        mobile,
        message,
        consent: consent ?? true,
        status: 'New'
      }
    });

    return res.status(201).json({ message: 'Message sent successfully', contactId: contact.id });
  } catch (error: any) {
    return res.status(500).json({ error: 'Failed to submit contact message' });
  }
};

export const getContactMessages = async (req: Request, res: Response) => {
  try {
    const contacts = await prisma.contactMessage.findMany({
      orderBy: { created_at: 'desc' }
    });
    return res.json({ contacts });
  } catch (error: any) {
    return res.status(500).json({ error: 'Failed to fetch contact messages' });
  }
};

// 4. Corporate Lead Submission
export const submitCorporateLead = async (req: Request, res: Response) => {
  try {
    const { companyName, contactName, phone, email, program, estimatedTrainees, courseTimeline, message } = req.body;

    const lead = await prisma.corporateLead.create({
      data: {
        company_name: companyName,
        contact_name: contactName,
        phone,
        email,
        program,
        estimated_trainees: estimatedTrainees ? Number(estimatedTrainees) : undefined,
        course_timeline: courseTimeline,
        message,
        status: 'New'
      }
    });

    return res.status(201).json({ message: 'Corporate training request submitted', leadId: lead.id });
  } catch (error: any) {
    return res.status(500).json({ error: 'Failed to submit corporate request' });
  }
};

export const getCorporateLeads = async (req: Request, res: Response) => {
  try {
    const leads = await prisma.corporateLead.findMany({
      orderBy: { created_at: 'desc' }
    });
    return res.json({ leads });
  } catch (error: any) {
    return res.status(500).json({ error: 'Failed to fetch corporate leads' });
  }
};

// 5. Franchise Lead Submission
export const submitFranchiseLead = async (req: Request, res: Response) => {
  try {
    const { name, phone, email, company, location, message } = req.body;

    const lead = await prisma.franchiseLead.create({
      data: {
        name,
        phone,
        email,
        company,
        location,
        message,
        status: 'New'
      }
    });

    return res.status(201).json({ message: 'Franchise lead submitted', leadId: lead.id });
  } catch (error: any) {
    return res.status(500).json({ error: 'Failed to submit franchise request' });
  }
};

export const getFranchiseLeads = async (req: Request, res: Response) => {
  try {
    const leads = await prisma.franchiseLead.findMany({
      orderBy: { created_at: 'desc' }
    });
    return res.json({ leads });
  } catch (error: any) {
    return res.status(500).json({ error: 'Failed to fetch franchise leads' });
  }
};
