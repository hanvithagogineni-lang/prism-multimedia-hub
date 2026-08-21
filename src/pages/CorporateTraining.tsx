import React, { useState } from 'react';
import { apiRequest } from '../api/client';
import { Building2, CheckCircle, Send } from 'lucide-react';

export const CorporateTraining: React.FC = () => {
  const [form, setForm] = useState({
    companyName: '',
    contactName: '',
    phone: '',
    email: '',
    program: '',
    estimatedTrainees: '',
    courseTimeline: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await apiRequest('/corporate-leads', {
        method: 'POST',
        body: JSON.stringify(form)
      });
      setSubmitted(true);
      setError('');
    } catch (err: any) {
      setError(err.message || 'Failed to submit request');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-12 space-y-16">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-prismOrange text-xs font-extrabold tracking-widest uppercase block">Enterprise Solutions</span>
        <h1 className="text-4xl font-extrabold text-white">Corporate Training Programs</h1>
        <p className="text-gray-300 text-sm">
          Customized training programs tailored for corporate workforces, creative agencies, and IT companies.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-white">Why Choose Prism Corporate Training?</h2>
          <div className="space-y-4 text-xs text-gray-300">
            <div className="flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-prismOrange shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block text-sm mb-0.5">Customized Modules</strong>
                <span>Tailored curriculum matching your company's software tools and workflow requirements.</span>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-prismOrange shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block text-sm mb-0.5">Flexible Training Formats</strong>
                <span>On-premise studio workshops, live online interactive sessions, or hybrid schedules.</span>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-prismOrange shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block text-sm mb-0.5">Certified Mentors</strong>
                <span>Trainers with 15+ years of production experience in Graphic Design, UI/UX, and Video Editing.</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#121217] border border-white/10 rounded-3xl p-8 shadow-xl">
          <h3 className="text-xl font-bold text-white mb-6">Request Corporate Training</h3>

          {submitted ? (
            <div className="bg-green-500/10 border border-green-500/30 text-green-400 p-4 rounded-xl text-xs font-semibold text-center">
              Thank you! Our corporate training division will contact you shortly.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && <div className="text-red-400 text-xs">{error}</div>}
              <div>
                <label className="text-xs text-gray-300 block mb-1">Company Name *</label>
                <input
                  type="text"
                  required
                  value={form.companyName}
                  onChange={(e) => setForm({ ...form, companyName: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-prismOrange"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-gray-300 block mb-1">Contact Person *</label>
                  <input
                    type="text"
                    required
                    value={form.contactName}
                    onChange={(e) => setForm({ ...form, contactName: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-prismOrange"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-300 block mb-1">Phone *</label>
                  <input
                    type="tel"
                    required
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-prismOrange"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-gray-300 block mb-1">Official Email *</label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-prismOrange"
                />
              </div>

              <div>
                <label className="text-xs text-gray-300 block mb-1">Required Training Program *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. UI/UX Design for Product Managers"
                  value={form.program}
                  onChange={(e) => setForm({ ...form, program: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-prismOrange"
                />
              </div>

              <div>
                <label className="text-xs text-gray-300 block mb-1">Message & Requirements</label>
                <textarea
                  rows={3}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-prismOrange"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-prismOrange hover:bg-prismOrangeHover text-white font-bold py-3 rounded-xl shadow-lg text-xs transition-all flex items-center justify-center space-x-2"
              >
                <span>SUBMIT CORPORATE REQUEST</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
