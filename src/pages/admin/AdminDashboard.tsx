import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  BookOpen,
  Users,
  MessageSquare,
  Building,
  FileText,
  Award,
  ArrowRight,
  PlusCircle,
  Clock,
  TrendingUp,
} from 'lucide-react';
import { api } from '../../api/client';

export const AdminDashboard: React.FC = () => {
  const [metrics, setMetrics] = useState({
    totalCourses: 12,
    totalRegistrations: 48,
    newRegistrations: 14,
    pendingLeads: 26,
    contactMessages: 18,
    corporateLeads: 5,
    franchiseLeads: 3,
    totalBlogs: 12,
    totalAlumni: 8,
    totalPlacements: 8,
  });

  const [recentRegs, setRecentRegs] = useState<any[]>([]);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get('/admin/dashboard');
        if (res.data && res.data.metrics) {
          setMetrics(res.data.metrics);
          setRecentRegs(res.data.recentRegistrations || []);
        }
      } catch {
        // Fallback default metrics
        setRecentRegs([
          { id: '1', name: 'Kavita Sharma', email: 'kavita@gmail.com', phone: '+91 98765 12345', course: { title: 'PGDIM' }, status: 'New', created_at: new Date().toISOString() },
          { id: '2', name: 'Rohit Reddy', email: 'rohit@gmail.com', phone: '+91 91234 56789', course: { title: 'UI Design & Development' }, status: 'New', created_at: new Date().toISOString() },
          { id: '3', name: 'Divya Nair', email: 'divya@gmail.com', phone: '+91 97013 99999', course: { title: 'Graphic Design' }, status: 'Contacted', created_at: new Date().toISOString() },
        ]);
      }
    };
    load();
  }, []);

  return (
    <div className="space-y-8">
      {/* Top Welcome Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
            Executive CMS Dashboard
          </h1>
          <p className="text-xs text-gray-400 mt-1">
            Real-time admissions pipeline, course metrics, and inquiry management.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            to="/admin/courses"
            className="px-4 py-2 rounded-lg bg-[#ff6b35] hover:bg-[#e0531c] text-white text-xs font-bold transition-colors flex items-center gap-1.5"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Manage Courses</span>
          </Link>
          <Link
            to="/admin/registrations"
            className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-bold transition-colors"
          >
            View Applications
          </Link>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="p-5 rounded-2xl bg-[#121217] border border-[#232330]">
          <div className="flex items-center justify-between text-gray-400">
            <span className="text-xs font-semibold">Total Courses</span>
            <BookOpen className="w-5 h-5 text-[#ff6b35]" />
          </div>
          <div className="text-3xl font-extrabold text-white mt-3">{metrics.totalCourses}</div>
          <div className="text-[11px] text-emerald-400 font-medium mt-1 flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>All Published &amp; Active</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-[#121217] border border-[#232330]">
          <div className="flex items-center justify-between text-gray-400">
            <span className="text-xs font-semibold">New Registrations</span>
            <Users className="w-5 h-5 text-emerald-400" />
          </div>
          <div className="text-3xl font-extrabold text-emerald-400 mt-3">{metrics.newRegistrations}</div>
          <div className="text-[11px] text-gray-400 mt-1">Pending counselor review</div>
        </div>

        <div className="p-5 rounded-2xl bg-[#121217] border border-[#232330]">
          <div className="flex items-center justify-between text-gray-400">
            <span className="text-xs font-semibold">Pending Leads</span>
            <MessageSquare className="w-5 h-5 text-[#ff6b35]" />
          </div>
          <div className="text-3xl font-extrabold text-white mt-3">{metrics.pendingLeads}</div>
          <div className="text-[11px] text-gray-400 mt-1">
            Contact &amp; Corporate enquiries
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-[#121217] border border-[#232330]">
          <div className="flex items-center justify-between text-gray-400">
            <span className="text-xs font-semibold">Published Blogs</span>
            <FileText className="w-5 h-5 text-indigo-400" />
          </div>
          <div className="text-3xl font-extrabold text-white mt-3">{metrics.totalBlogs}</div>
          <div className="text-[11px] text-gray-400 mt-1">Knowledge hub articles</div>
        </div>
      </div>

      {/* Recent Admissions Table */}
      <div className="p-6 rounded-2xl bg-[#121217] border border-[#232330]">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-base font-bold text-white">Recent Student Applications</h2>
          <Link
            to="/admin/registrations"
            className="text-xs font-bold text-[#ff6b35] hover:underline flex items-center gap-1"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#232330] text-gray-400 font-semibold uppercase tracking-wider">
                <th className="pb-3">Candidate</th>
                <th className="pb-3">Contact</th>
                <th className="pb-3">Course</th>
                <th className="pb-3">Status</th>
                <th className="pb-3">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1a1a24]">
              {recentRegs.map((reg) => (
                <tr key={reg.id} className="hover:bg-white/[0.02]">
                  <td className="py-3.5 font-bold text-white">{reg.name}</td>
                  <td className="py-3.5 text-gray-300">
                    <div>{reg.phone}</div>
                    <div className="text-gray-500 text-[10px]">{reg.email}</div>
                  </td>
                  <td className="py-3.5 text-gray-300">{reg.course?.title || 'PGDIM'}</td>
                  <td className="py-3.5">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#ff6b35]/15 text-[#ff6b35] border border-[#ff6b35]/30">
                      {reg.status || 'New'}
                    </span>
                  </td>
                  <td className="py-3.5">
                    <Link
                      to="/admin/registrations"
                      className="px-3 py-1 rounded bg-white/5 hover:bg-white/10 text-gray-300 text-[11px] font-medium"
                    >
                      Manage
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
