import { Router } from 'express';
import * as authController from '../controllers/authController';
import * as courseController from '../controllers/courseController';
import * as leadController from '../controllers/leadController';
import * as cmsController from '../controllers/cmsController';
import { authenticateJWT, requireRole } from '../middleware/auth';

const router = Router();

// ==========================================
// 1. AUTHENTICATION API
// ==========================================
router.post('/auth/login', authController.login);
router.post('/auth/logout', authController.logout);
router.get('/auth/me', authenticateJWT, authController.getMe);
router.post('/auth/forgot-password', authController.forgotPassword);

// ==========================================
// 2. PUBLIC & CMS APIS
// ==========================================

// Courses API
router.get('/courses', courseController.getCourses);
router.get('/courses/:slug', courseController.getCourseBySlug);
router.post('/courses', authenticateJWT, requireRole(['SUPER_ADMIN', 'ADMIN', 'EDITOR']), courseController.createCourse);
router.put('/courses/:id', authenticateJWT, requireRole(['SUPER_ADMIN', 'ADMIN', 'EDITOR']), courseController.updateCourse);
router.delete('/courses/:id', authenticateJWT, requireRole(['SUPER_ADMIN', 'ADMIN']), courseController.deleteCourse);

// Form Submission APIs
router.post('/registrations', leadController.createRegistration);
router.get('/registrations', authenticateJWT, leadController.getRegistrations);
router.put('/registrations/:id', authenticateJWT, leadController.updateRegistrationStatus);

router.post('/course-enquiries', leadController.createCourseEnquiry);
router.get('/course-enquiries', authenticateJWT, leadController.getCourseEnquiries);

router.post('/contact', leadController.createContactMessage);
router.get('/contact', authenticateJWT, leadController.getContactMessages);

router.post('/corporate-leads', leadController.createCorporateLead);
router.get('/corporate-leads', authenticateJWT, leadController.getCorporateLeads);

router.post('/franchise-leads', leadController.createFranchiseLead);
router.get('/franchise-leads', authenticateJWT, leadController.getFranchiseLeads);

// Blogs API
router.get('/blogs', cmsController.getBlogs);
router.get('/blogs/:slug', cmsController.getBlogBySlug);
router.post('/blogs', authenticateJWT, cmsController.createBlog);

// Student Works API
router.get('/student-works', cmsController.getStudentWorks);

// Alumni API
router.get('/alumni', cmsController.getAlumni);

// Placements API
router.get('/placements', cmsController.getPlacements);

// Testimonials API
router.get('/testimonials', cmsController.getTestimonials);

// Settings API
router.get('/settings', cmsController.getSettings);
router.put('/settings', authenticateJWT, requireRole(['SUPER_ADMIN', 'ADMIN']), cmsController.updateSettings);

// Search API
router.get('/search', cmsController.globalSearch);

// Admin Dashboard Stats
router.get('/admin/dashboard', authenticateJWT, cmsController.getAdminDashboardStats);

export default router;
