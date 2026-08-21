import React, { useState } from 'react';
import { apiRequest } from '../api/client';
import { Send } from 'lucide-react';

export const Franchise: React.FC = () => {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    company: '',
    location: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await apiRequest('/franchise-leads', {
        method: 'POST',
        body: JSON.stringify(form)
      });
      setSubmitted(true);
      setError('');
    } catch (err: any) {
      setError(err.message || 'Failed to submit enquiry');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-12 space-y-16">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-prismOrange text-xs font-extrabold tracking-widest uppercase block">Partner With Us</span>
        <h1 className="text-4xl font-extrabold text-white">Franchise Opportunities</h1>
        <p className="text-gray-300 text-sm">
          Partner with Prism Multimedia to launch a premier creative training center backed by 24+ years of academic brand leadership.
        </p>
      </div>

      <div className="max-w-xl mx-auto bg-[#121217] border border-white/10 rounded-3xl p-8 shadow-xl">
        <h3 className="text-xl font-bold text-white mb-6">Franchise Enquiry Form</h3>

        {submitted ? (
          <div className="bg-green-500/10 border border-green-500/30 text-green-400 p-4 rounded-xl text-xs font-semibold text-center">
            Thank you for your interest! Our franchise operations team will contact you.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && <div className="text-red-400 text-xs">{error}</div>}
            <div>
              <label className="text-xs text-gray-300 block mb-1">Full Name *</label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-prismOrange"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
              <div>
                <label className="text-xs text-gray-300 block mb-1">Email *</label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-prismOrange"
                />
              </div>
            </div>

            <div>
              <label className="text-xs text-gray-300 block mb-1">Proposed Location / City *</label>
              <input
                type="text"
                required
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-prismOrange"
              />
            </div>

            <div>
              <label className="text-xs text-gray-300 block mb-1">Message & Investment Capacity</label>
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
              <span>SUBMIT FRANCHISE ENQUIRY</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
