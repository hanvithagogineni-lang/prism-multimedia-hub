import { Router } from 'express';
import * as auth from '../controllers/auth.controller.js';
import * as courses from '../controllers/courses.controller.js';
import * as submissions from '../controllers/submissions.controller.js';
import * as cms from '../controllers/cms.controller.js';
import { authenticateToken, requireRole } from '../middleware/auth.js';

const router = Router();

// --- PUBLIC AUTH ROUTES ---
router.post('/auth/login', auth.login);
router.post('/auth/logout', auth.logout);
router.get('/auth/me', authenticateToken, auth.getMe);

// --- PUBLIC COURSES ---
router.get('/courses', courses.getCourses);
router.get('/courses/:slug', courses.getCourseBySlug);

// --- PUBLIC FORM SUBMISSIONS ---
router.post('/registrations', submissions.submitRegistration);
router.post('/course-enquiries', submissions.submitCourseEnquiry);
router.post('/contact', submissions.submitContact);
router.post('/corporate-leads', submissions.submitCorporateLead);
router.post('/franchise-leads', submissions.submitFranchiseLead);

// --- PUBLIC SHOWCASE & CMS ---
router.get('/blogs', cms.getBlogs);
router.get('/blogs/:slug', cms.getBlogBySlug);
router.get('/student-works', cms.getStudentWorks);
router.get('/alumni', cms.getAlumni);
router.get('/placements', cms.getPlacements);
router.get('/testimonials', cms.getTestimonials);
router.get('/settings', cms.getSettings);
router.get('/search', cms.globalSearch);

// --- PROTECTED ADMIN ROUTES ---
const adminAuth = [authenticateToken, requireRole(['SUPER_ADMIN', 'ADMIN', 'EDITOR', 'ADMISSIONS_STAFF'])];

// Admin Courses
router.post('/admin/courses', adminAuth, courses.createCourse);
router.put('/admin/courses/:id', adminAuth, courses.updateCourse);
router.delete('/admin/courses/:id', adminAuth, courses.deleteCourse);

// Admin Submissions Management
router.get('/admin/registrations', adminAuth, submissions.getRegistrations);
router.put('/admin/registrations/:id', adminAuth, submissions.updateRegistration);
router.get('/admin/course-enquiries', adminAuth, submissions.getCourseEnquiries);
router.get('/admin/contact-messages', adminAuth, submissions.getContactMessages);
router.get('/admin/corporate-leads', adminAuth, submissions.getCorporateLeads);
router.get('/admin/franchise-leads', adminAuth, submissions.getFranchiseLeads);

// Admin CMS Management
router.post('/admin/blogs', adminAuth, cms.createBlog);
router.delete('/admin/blogs/:id', adminAuth, cms.deleteBlog);
router.post('/admin/student-works', adminAuth, cms.createStudentWork);
router.post('/admin/alumni', adminAuth, cms.createAlumni);
router.put('/admin/settings', adminAuth, cms.updateSettings);
router.get('/admin/dashboard', adminAuth, cms.getDashboardStats);

export default router;
