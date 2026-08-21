import React, { useEffect, useState } from 'react';
import { apiRequest } from '../../api/client';
import { AdminSidebar } from '../../components/AdminSidebar';

export const AdminLeads: React.FC = () => {
  const [contacts, setContacts] = useState<any[]>([]);
  const [corporate, setCorporate] = useState<any[]>([]);
  const [franchise, setFranchise] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<'contact' | 'corporate' | 'franchise'>('contact');

  useEffect(() => {
    apiRequest('/admin/contact-messages').then((data) => setContacts(data.contacts || [])).catch(console.error);
    apiRequest('/admin/corporate-leads').then((data) => setCorporate(data.leads || [])).catch(console.error);
    apiRequest('/admin/franchise-leads').then((data) => setFranchise(data.leads || [])).catch(console.error);
  }, []);

  return (
    <div className="flex min-h-screen bg-[#050508]">
      <AdminSidebar />
      <main className="flex-1 p-8 space-y-6 overflow-y-auto">
        <div>
          <h1 className="text-3xl font-extrabold text-white">Lead Enquiries</h1>
          <p className="text-gray-400 text-xs mt-1">Manage contact messages, corporate requests, and franchise inquiries</p>
        </div>

        {/* Tab Selection */}
        <div className="flex space-x-2 border-b border-white/10 pb-3">
          <button
            onClick={() => setActiveTab('contact')}
            className={`text-xs font-bold px-4 py-2 rounded-xl transition-all ${
              activeTab === 'contact' ? 'bg-prismOrange text-white' : 'text-gray-400 hover:text-white'
            }`}
          >
            Contact Messages ({contacts.length})
          </button>
          <button
            onClick={() => setActiveTab('corporate')}
            className={`text-xs font-bold px-4 py-2 rounded-xl transition-all ${
              activeTab === 'corporate' ? 'bg-prismOrange text-white' : 'text-gray-400 hover:text-white'
            }`}
          >
            Corporate Leads ({corporate.length})
          </button>
          <button
            onClick={() => setActiveTab('franchise')}
            className={`text-xs font-bold px-4 py-2 rounded-xl transition-all ${
              activeTab === 'franchise' ? 'bg-prismOrange text-white' : 'text-gray-400 hover:text-white'
            }`}
          >
            Franchise Leads ({franchise.length})
          </button>
        </div>

        <div className="bg-[#121217] border border-white/10 rounded-2xl p-6">
          {activeTab === 'contact' && (
            <table className="w-full text-left text-xs text-gray-300">
              <thead className="bg-white/5 text-gray-400 uppercase text-[10px] tracking-wider border-b border-white/10">
                <tr>
                  <th className="p-3">Name</th>
                  <th className="p-3">Contact</th>
                  <th className="p-3">Message</th>
                  <th className="p-3">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {contacts.map((c) => (
                  <tr key={c.id} className="hover:bg-white/5">
                    <td className="p-3 font-semibold text-white">{c.name}</td>
                    <td className="p-3">{c.email}<br/><span className="text-[10px] text-gray-400">{c.mobile}</span></td>
                    <td className="p-3 max-w-xs truncate">{c.message}</td>
                    <td className="p-3 text-gray-400">{new Date(c.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {activeTab === 'corporate' && (
            <table className="w-full text-left text-xs text-gray-300">
              <thead className="bg-white/5 text-gray-400 uppercase text-[10px] tracking-wider border-b border-white/10">
                <tr>
                  <th className="p-3">Company</th>
                  <th className="p-3">Contact Person</th>
                  <th className="p-3">Program Required</th>
                  <th className="p-3">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {corporate.map((c) => (
                  <tr key={c.id} className="hover:bg-white/5">
                    <td className="p-3 font-semibold text-white">{c.companyName}</td>
                    <td className="p-3">{c.contactName}<br/><span className="text-[10px] text-gray-400">{c.email} / {c.phone}</span></td>
                    <td className="p-3 text-prismOrange font-medium">{c.program}</td>
                    <td className="p-3 text-gray-400">{new Date(c.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {activeTab === 'franchise' && (
            <table className="w-full text-left text-xs text-gray-300">
              <thead className="bg-white/5 text-gray-400 uppercase text-[10px] tracking-wider border-b border-white/10">
                <tr>
                  <th className="p-3">Applicant Name</th>
                  <th className="p-3">Proposed Location</th>
                  <th className="p-3">Contact</th>
                  <th className="p-3">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {franchise.map((f) => (
                  <tr key={f.id} className="hover:bg-white/5">
                    <td className="p-3 font-semibold text-white">{f.name}</td>
                    <td className="p-3 text-prismOrange font-medium">{f.location}</td>
                    <td className="p-3">{f.email}<br/><span className="text-[10px] text-gray-400">{f.phone}</span></td>
                    <td className="p-3 text-gray-400">{new Date(f.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>
    </div>
  );
};
