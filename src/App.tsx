import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { AdminSidebar } from './components/AdminSidebar';

// Public Pages
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Courses } from './pages/Courses';
import { CourseDetail } from './pages/CourseDetail';
import { StudentWorks } from './pages/StudentWorks';
import { Placements } from './pages/Placements';
import { AlumniPage } from './pages/AlumniPage';
import { CorporateTraining } from './pages/CorporateTraining';
import { Franchise } from './pages/Franchise';
import { BlogList } from './pages/BlogList';
import { BlogDetail } from './pages/BlogDetail';
import { Contact } from './pages/Contact';
import { Register } from './pages/Register';
import { SearchPage } from './pages/SearchPage';
import { LegalPage } from './pages/LegalPage';

// Admin Pages
import { AdminLogin } from './pages/admin/AdminLogin';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminCourses } from './pages/admin/AdminCourses';
import { AdminRegistrations } from './pages/admin/AdminRegistrations';
import { AdminLeads } from './pages/admin/AdminLeads';
import { AdminBlogs } from './pages/admin/AdminBlogs';
import { AdminStudentWorks } from './pages/admin/AdminStudentWorks';
import { AdminAlumni } from './pages/admin/AdminAlumni';
import { AdminPlacements } from './pages/admin/AdminPlacements';
import { AdminTestimonials } from './pages/admin/AdminTestimonials';
import { AdminMedia } from './pages/admin/AdminMedia';
import { AdminSettings } from './pages/admin/AdminSettings';

const ProtectedAdminRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const token = localStorage.getItem('prism_token');
  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }
  return (
    <div className="flex bg-[#070709] min-h-screen text-white">
      <AdminSidebar />
      <main className="flex-1 p-8 overflow-y-auto max-h-screen">{children}</main>
    </div>
  );
};

export const App: React.FC = () => {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  return (
    <div className="min-h-screen bg-[#0a0a0d] text-white flex flex-col font-sans selection:bg-[#ff6b35] selection:text-white">
      {!isAdmin && <Header />}

      <div className="flex-1">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/:slug" element={<CourseDetail />} />
          <Route path="/student-works" element={<StudentWorks />} />
          <Route path="/placements" element={<Placements />} />
          <Route path="/alumni" element={<AlumniPage />} />
          <Route path="/corporate-training" element={<CorporateTraining />} />
          <Route path="/franchise" element={<Franchise />} />
          <Route path="/blog" element={<BlogList />} />
          <Route path="/blog/:slug" element={<BlogDetail />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/register" element={<Register />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/privacy-policy" element={<LegalPage />} />
          <Route path="/terms" element={<LegalPage />} />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedAdminRoute>
                <AdminDashboard />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/admin/courses"
            element={
              <ProtectedAdminRoute>
                <AdminCourses />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/admin/registrations"
            element={
              <ProtectedAdminRoute>
                <AdminRegistrations />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/admin/leads"
            element={
              <ProtectedAdminRoute>
                <AdminLeads />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/admin/blogs"
            element={
              <ProtectedAdminRoute>
                <AdminBlogs />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/admin/student-works"
            element={
              <ProtectedAdminRoute>
                <AdminStudentWorks />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/admin/alumni"
            element={
              <ProtectedAdminRoute>
                <AdminAlumni />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/admin/placements"
            element={
              <ProtectedAdminRoute>
                <AdminPlacements />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/admin/testimonials"
            element={
              <ProtectedAdminRoute>
                <AdminTestimonials />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/admin/media"
            element={
              <ProtectedAdminRoute>
                <AdminMedia />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/admin/settings"
            element={
              <ProtectedAdminRoute>
                <AdminSettings />
              </ProtectedAdminRoute>
            }
          />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>

      {!isAdmin && <Footer />}
    </div>
  );
};
