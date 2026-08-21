import React, { useEffect, useState } from 'react';
import { Download, MessageSquare, Building, Users, Clock } from 'lucide-react';
import { api } from '../../api/client';

export const AdminLeads: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'contact' | 'corporate' | 'franchise'>('contact');
  const [contactList, setContactList] = useState<any[]>([]);
  const [corporateList, setCorporateList] = useState<any[]>([]);
  const [franchiseList, setFranchiseList] = useState<any[]>([]);

  useEffect(() => {
    const load = async () => {
      try {
        const [cRes, corpRes, fRes] = await Promise.all([
          api.get('/contact'),
          api.get('/corporate-leads'),
          api.get('/franchise-leads'),
        ]);
        setContactList(cRes.data || []);
        setCorporateList(corpRes.data || []);
        setFranchiseList(fRes.data || []);
      } catch {
        setContactList([
          { id: '1', name: 'Pooja Reddy', email: 'pooja@gmail.com', mobile: '+91 97013 11111', message: 'Interested in UI UX evening weekend batches.', status: 'New', created_at: new Date().toISOString() }
        ]);
        setCorporateList([
          { id: '1', company_name: 'TechWave Solutions', contact_name: 'Ravi Teja', email: 'ravi@techwave.com', phone: '+91 98888 22222', program: 'UI/UX & Design Systems', estimated_trainees: 15, status: 'New', created_at: new Date().toISOString() }
        ]);
        setFranchiseList([
          { id: '1', name: 'Suresh Kumar', email: 'suresh@gmail.com', phone: '+91 99999 33333', location: 'Vijayawada', company: 'Kumar Education Group', status: 'New', created_at: new Date().toISOString() }
        ]);
      }
    };
    load();
  }, []);

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white">Leads &amp; Enquiries Management</h1>
          <p className="text-xs text-gray-400 mt-0.5">
            Review general queries, corporate training quotes, and franchise expansion applications.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-[#232330] pb-3">
        <button
          onClick={() => setActiveTab('contact')}
          className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
            activeTab === 'contact'
              ? 'bg-[#ff6b35] text-white shadow-md'
              : 'bg-[#121217] text-gray-400 hover:text-white'
          }`}
        >
          Contact Messages ({contactList.length})
        </button>
        <button
          onClick={() => setActiveTab('corporate')}
          className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
            activeTab === 'corporate'
              ? 'bg-[#ff6b35] text-white shadow-md'
              : 'bg-[#121217] text-gray-400 hover:text-white'
          }`}
        >
          Corporate Leads ({corporateList.length})
        </button>
        <button
          onClick={() => setActiveTab('franchise')}
          className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
            activeTab === 'franchise'
              ? 'bg-[#ff6b35] text-white shadow-md'
              : 'bg-[#121217] text-gray-400 hover:text-white'
          }`}
        >
          Franchise Leads ({franchiseList.length})
        </button>
      </div>

      {/* Content Table */}
      <div className="rounded-2xl bg-[#121217] border border-[#232330] overflow-hidden">
        <div className="overflow-x-auto">
          {activeTab === 'contact' && (
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-[#232330] text-gray-400 uppercase tracking-wider bg-white/[0.01]">
                  <th className="p-4">Sender</th>
                  <th className="p-4">Contact</th>
                  <th className="p-4">Message</th>
                  <th className="p-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1a1a24]">
                {contactList.map((item) => (
                  <tr key={item.id} className="hover:bg-white/[0.02]">
                    <td className="p-4 font-bold text-white">{item.name}</td>
                    <td className="p-4 text-gray-300">
                      <div>{item.mobile}</div>
                      <div className="text-gray-500 text-[10px]">{item.email}</div>
                    </td>
                    <td className="p-4 text-gray-300 max-w-md">{item.message}</td>
                    <td className="p-4">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#ff6b35]/15 text-[#ff6b35]">
                        {item.status || 'New'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {activeTab === 'corporate' && (
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-[#232330] text-gray-400 uppercase tracking-wider bg-white/[0.01]">
                  <th className="p-4">Company</th>
                  <th className="p-4">Contact Person</th>
                  <th className="p-4">Program</th>
                  <th className="p-4">Trainees</th>
                  <th className="p-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1a1a24]">
                {corporateList.map((item) => (
                  <tr key={item.id} className="hover:bg-white/[0.02]">
                    <td className="p-4 font-bold text-white">{item.company_name}</td>
                    <td className="p-4 text-gray-300">
                      <div>{item.contact_name}</div>
                      <div className="text-gray-500 text-[10px]">{item.email} • {item.phone}</div>
                    </td>
                    <td className="p-4 text-[#ff6b35] font-medium">{item.program}</td>
                    <td className="p-4 text-gray-300">{item.estimated_trainees || 'N/A'}</td>
                    <td className="p-4">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-400">
                        {item.status || 'New'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {activeTab === 'franchise' && (
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-[#232330] text-gray-400 uppercase tracking-wider bg-white/[0.01]">
                  <th className="p-4">Applicant</th>
                  <th className="p-4">Contact</th>
                  <th className="p-4">Proposed Location</th>
                  <th className="p-4">Background</th>
                  <th className="p-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1a1a24]">
                {franchiseList.map((item) => (
                  <tr key={item.id} className="hover:bg-white/[0.02]">
                    <td className="p-4 font-bold text-white">{item.name}</td>
                    <td className="p-4 text-gray-300">
                      <div>{item.phone}</div>
                      <div className="text-gray-500 text-[10px]">{item.email}</div>
                    </td>
                    <td className="p-4 text-[#ff6b35] font-bold">{item.location}</td>
                    <td className="p-4 text-gray-300">{item.company || 'N/A'}</td>
                    <td className="p-4">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-indigo-500/15 text-indigo-400">
                        {item.status || 'New'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};
