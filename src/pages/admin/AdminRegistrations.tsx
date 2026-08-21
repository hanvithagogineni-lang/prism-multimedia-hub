import React, { useEffect, useState } from 'react';
import { apiRequest } from '../../api/client';
import { AdminSidebar } from '../../components/AdminSidebar';
import { Download } from 'lucide-react';

export const AdminRegistrations: React.FC = () => {
  const [registrations, setRegistrations] = useState<any[]>([]);

  useEffect(() => {
    fetchRegistrations();
  }, []);

  const fetchRegistrations = () => {
    apiRequest('/admin/registrations').then((data) => setRegistrations(data.registrations || [])).catch(console.error);
  };

  const exportCSV = () => {
    if (registrations.length === 0) return;
    const headers = ['ID', 'Name', 'Email', 'Phone', 'Course', 'City', 'State', 'Status', 'Date'];
    const rows = registrations.map(r => [r.id, r.name, r.email, r.phone, r.course?.title || '', r.city, r.state, r.status, r.createdAt]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'registrations_export.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex min-h-screen bg-[#050508]">
      <AdminSidebar />
      <main className="flex-1 p-8 space-y-6 overflow-y-auto">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-extrabold text-white">Student Registrations</h1>
            <p className="text-gray-400 text-xs mt-1">Manage and track student course registrations</p>
          </div>
          <button
            onClick={exportCSV}
            className="flex items-center space-x-2 bg-prismOrange hover:bg-prismOrangeHover text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-lg"
          >
            <Download className="w-4 h-4" />
            <span>EXPORT CSV</span>
          </button>
        </div>

        <div className="bg-[#121217] border border-white/10 rounded-2xl p-6">
          <table className="w-full text-left text-xs text-gray-300">
            <thead className="bg-white/5 text-gray-400 uppercase text-[10px] tracking-wider border-b border-white/10">
              <tr>
                <th className="p-3">ID</th>
                <th className="p-3">Student Name</th>
                <th className="p-3">Contact</th>
                <th className="p-3">Course</th>
                <th className="p-3">Location</th>
                <th className="p-3">Status</th>
                <th className="p-3">Submitted Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {registrations.map((r) => (
                <tr key={r.id} className="hover:bg-white/5">
                  <td className="p-3 font-mono text-gray-500">#{r.id}</td>
                  <td className="p-3 font-semibold text-white">{r.name}</td>
                  <td className="p-3">{r.email}<br/><span className="text-[10px] text-gray-400">{r.phone}</span></td>
                  <td className="p-3 text-prismOrange font-medium">{r.course?.title}</td>
                  <td className="p-3">{r.city}, {r.state}</td>
                  <td className="p-3">
                    <span className="bg-prismOrange/20 text-prismOrange font-bold px-2 py-0.5 rounded text-[10px]">
                      {r.status}
                    </span>
                  </td>
                  <td className="p-3 text-gray-400">{new Date(r.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};
