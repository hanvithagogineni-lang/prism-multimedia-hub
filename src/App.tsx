import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

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
import { SearchPage, PrivacyPolicy, Terms } from './pages/SearchPage';

import { AdminLogin } from './pages/admin/AdminLogin';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminCourses } from './pages/admin/AdminCourses';
import { AdminRegistrations } from './pages/admin/AdminRegistrations';
import { AdminLeads } from './pages/admin/AdminLeads';
import { AdminBlogs } from './pages/admin/AdminBlogs';
import { AdminSettings } from './pages/admin/AdminSettings';

const ProtectedAdminRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const token = localStorage.getItem('prism_admin_token');
  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }
  return <>{children}</>;
};

export const App: React.FC = () => {
  return (
    <Routes>
      {/* PUBLIC ROUTES WITH HEADER/FOOTER */}
      <Route
        path="/*"
        element={
          <div className="min-h-screen flex flex-col justify-between bg-darkBg text-white">
            <Header />
            <main className="flex-1">
              <Routes>
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
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/terms" element={<Terms />} />
              </Routes>
            </main>
            <Footer />
          </div>
        }
      />

      {/* ADMIN PORTAL ROUTES */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
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
        path="/admin/settings"
        element={
          <ProtectedAdminRoute>
            <AdminSettings />
          </ProtectedAdminRoute>
        }
      />
    </Routes>
  );
};

export default App;
