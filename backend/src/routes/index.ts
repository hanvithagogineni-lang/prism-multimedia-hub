import { Router } from 'express';
import * as auth from '../controllers/auth.controller.js';
import * as courses from '../controllers/courses.controller.js';
import * as submissions from '../controllers/submissions.controller.js';
import * as cms from '../controllers/cms.controller.js';
import { requireAuth, requireRole } from '../middleware/auth.js';

const router = Router();

// ==================== AUTH ====================
router.post('/auth/login', auth.login);
router.post('/auth/logout', requireAuth, auth.logout);
router.get('/auth/me', requireAuth, auth.getMe);

// ==================== COURSES ====================
router.get('/courses', courses.getCourses);
router.get('/courses/categories', courses.getCategories);
router.get('/courses/:slug', courses.getCourseBySlug);
router.post('/courses', requireAuth, requireRole(['SUPER_ADMIN', 'ADMIN']), courses.createCourse);
router.put('/courses/:id', requireAuth, requireRole(['SUPER_ADMIN', 'ADMIN']), courses.updateCourse);
router.delete('/courses/:id', requireAuth, requireRole(['SUPER_ADMIN']), courses.deleteCourse);

// ==================== SUBMISSIONS & LEADS ====================
router.post('/registrations', submissions.submitRegistration);
router.get('/registrations', requireAuth, submissions.getRegistrations);
router.put('/registrations/:id', requireAuth, submissions.updateRegistration);

router.post('/course-enquiries', submissions.submitCourseEnquiry);
router.get('/course-enquiries', requireAuth, submissions.getCourseEnquiries);

router.post('/contact', submissions.submitContact);
router.get('/contact', requireAuth, submissions.getContactMessages);

router.post('/corporate-leads', submissions.submitCorporateLead);
router.get('/corporate-leads', requireAuth, submissions.getCorporateLeads);

router.post('/franchise-leads', submissions.submitFranchiseLead);
router.get('/franchise-leads', requireAuth, submissions.getFranchiseLeads);

router.get('/export/:type', requireAuth, submissions.exportDataCSV);

// ==================== CMS ====================
router.get('/blogs', cms.getBlogs);
router.get('/blogs/:slug', cms.getBlogBySlug);
router.post('/blogs', requireAuth, requireRole(['SUPER_ADMIN', 'ADMIN', 'EDITOR']), cms.createBlog);

router.get('/student-works', cms.getStudentWorks);
router.get('/alumni', cms.getAlumni);
router.get('/placements', cms.getPlacements);
router.get('/testimonials', cms.getTestimonials);

router.get('/settings', cms.getSettings);
router.put('/settings', requireAuth, requireRole(['SUPER_ADMIN', 'ADMIN']), cms.updateSettings);

router.get('/search', cms.searchGlobal);
router.get('/admin/dashboard', requireAuth, cms.getAdminDashboardMetrics);

export default router;
