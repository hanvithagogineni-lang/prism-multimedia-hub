import React, { useEffect, useState } from 'react';
import { apiRequest } from '../../api/client';
import { AdminSidebar } from '../../components/AdminSidebar';
import { BookOpen, Users, Mail, FileText, CheckCircle, Clock } from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState<any>(null);
  const [recentRegs, setRecentRegs] = useState<any[]>([]);

  useEffect(() => {
    apiRequest('/admin/dashboard')
      .then((data) => {
        setStats(data.stats);
        setRecentRegs(data.recentRegistrations || []);
      })
      .catch(console.error);
  }, []);

  return (
    <div className="flex min-h-screen bg-[#050508]">
      <AdminSidebar />

      <main className="flex-1 p-8 space-y-8 overflow-y-auto">
        <div>
          <h1 className="text-3xl font-extrabold text-white">Admin Dashboard</h1>
          <p className="text-gray-400 text-xs mt-1">Real-time overview of registrations, leads, and CMS metrics</p>
        </div>

        {/* Stats Grid */}
        {stats && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-[#121217] border border-white/10 p-6 rounded-2xl space-y-2">
              <div className="flex justify-between items-center text-gray-400 text-xs">
                <span>Total Registrations</span>
                <Users className="w-4 h-4 text-prismOrange" />
              </div>
              <div className="text-3xl font-extrabold text-white">{stats.totalRegistrations}</div>
              <div className="text-[11px] text-prismOrange font-semibold">{stats.pendingRegistrations} New Pending</div>
            </div>

            <div className="bg-[#121217] border border-white/10 p-6 rounded-2xl space-y-2">
              <div className="flex justify-between items-center text-gray-400 text-xs">
                <span>Published Courses</span>
                <BookOpen className="w-4 h-4 text-prismOrange" />
              </div>
              <div className="text-3xl font-extrabold text-white">{stats.totalCourses}</div>
              <div className="text-[11px] text-gray-400">Active Programs</div>
            </div>

            <div className="bg-[#121217] border border-white/10 p-6 rounded-2xl space-y-2">
              <div className="flex justify-between items-center text-gray-400 text-xs">
                <span>Corporate & Franchise Leads</span>
                <Mail className="w-4 h-4 text-prismOrange" />
              </div>
              <div className="text-3xl font-extrabold text-white">{stats.totalCorporateLeads + stats.totalFranchiseLeads}</div>
              <div className="text-[11px] text-gray-400">Enterprise Enquiries</div>
            </div>

            <div className="bg-[#121217] border border-white/10 p-6 rounded-2xl space-y-2">
              <div className="flex justify-between items-center text-gray-400 text-xs">
                <span>Total Articles & Alumni</span>
                <FileText className="w-4 h-4 text-prismOrange" />
              </div>
              <div className="text-3xl font-extrabold text-white">{stats.totalBlogs + stats.totalAlumni}</div>
              <div className="text-[11px] text-gray-400">Published CMS Items</div>
            </div>
          </div>
        )}

        {/* Recent Registrations Table */}
        <div className="bg-[#121217] border border-white/10 rounded-2xl p-6 space-y-4">
          <h3 className="text-lg font-bold text-white">Recent Student Registrations</h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-gray-300">
              <thead className="bg-white/5 text-gray-400 uppercase text-[10px] tracking-wider border-b border-white/10">
                <tr>
                  <th className="p-3">Student Name</th>
                  <th className="p-3">Email / Phone</th>
                  <th className="p-3">Course</th>
                  <th className="p-3">Location</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {recentRegs.map((reg) => (
                  <tr key={reg.id} className="hover:bg-white/5">
                    <td className="p-3 font-semibold text-white">{reg.name}</td>
                    <td className="p-3">{reg.email}<br/><span className="text-[10px] text-gray-500">{reg.phone}</span></td>
                    <td className="p-3 text-prismOrange font-medium">{reg.course?.title}</td>
                    <td className="p-3">{reg.city}, {reg.state}</td>
                    <td className="p-3">
                      <span className="bg-prismOrange/20 text-prismOrange font-bold px-2 py-0.5 rounded text-[10px]">
                        {reg.status}
                      </span>
                    </td>
                    <td className="p-3 text-gray-400">{new Date(reg.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};
