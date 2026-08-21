import React, { useState } from 'react';
import { Building, Award, CheckCircle2, Send, ShieldCheck } from 'lucide-react';
import { api } from '../api/client';

export const Franchise: React.FC = () => {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    company: '',
    location: '',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await api.post('/franchise-leads', form);
      setSubmitted(true);
    } catch {
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-[#0a0a0d] text-white min-h-screen pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="text-xs font-bold text-[#ff6b35] uppercase tracking-widest mb-2">
            Partnership Opportunities
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white font-display">
            Partner with Prism Multimedia
          </h1>
          <p className="mt-4 text-base text-gray-300">
            Expand into the booming multimedia education market with an established 24-year brand, proven curriculum, master trainers, and end-to-end operational support.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left: Support Offerings */}
          <div className="lg:col-span-7 space-y-6">
            <div className="p-8 rounded-2xl bg-[#121217] border border-[#232330]">
              <h2 className="text-2xl font-bold text-white mb-4">Complete Franchise Support Ecosystem</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { title: 'Training Materials', desc: 'Complete courseware, practical assignments, and student project guides.' },
                  { title: 'Placement Support', desc: 'Centralized placement cell connection with 500+ top hiring partners.' },
                  { title: 'Certification Support', desc: 'Industry-recognized Prism Educational Society diploma certification.' },
                  { title: 'Faculty Training', desc: 'Comprehensive Train-the-Trainer (TTT) onboarding for all mentors.' },
                  { title: 'Brand & Marketing', desc: 'National digital marketing campaigns, creatives, and regional ad kits.' },
                  { title: 'Operational Guidance', desc: 'Campus lab layout blueprints, workstation specs, and CRM systems.' },
                ].map((item, i) => (
                  <div key={i} className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                    <h3 className="font-bold text-white text-sm text-[#ff6b35]">{item.title}</h3>
                    <p className="text-xs text-gray-400 mt-1">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 rounded-xl bg-[#121217] border border-[#232330] flex items-center gap-4">
              <ShieldCheck className="w-8 h-8 text-[#ff6b35] shrink-0" />
              <div className="text-xs text-gray-300">
                Prism Multimedia franchises benefit from 24+ years of reputation, high student conversion rates, and sustainable returns.
              </div>
            </div>
          </div>

          {/* Right: Franchise Enquiry Form */}
          <div className="lg:col-span-5 p-8 rounded-2xl bg-[#121217] border border-[#232330] shadow-2xl">
            <h3 className="text-xl font-bold text-white mb-2">Franchise Partnership Application</h3>
            <p className="text-xs text-gray-400 mb-6">
              Submit your location and contact details to receive our detailed Franchise Information Deck.
            </p>

            {submitted ? (
              <div className="p-6 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-center text-emerald-400">
                <CheckCircle2 className="w-10 h-10 mx-auto mb-2" />
                <h4 className="font-bold text-base">Application Submitted!</h4>
                <p className="text-xs text-gray-300 mt-1">
                  Thank you for your interest. Our franchise expansion director will connect with you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="e.g. Ramesh Kumar"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#0a0a0d] border border-[#232330] text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#ff6b35]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#0a0a0d] border border-[#232330] text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#ff6b35]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1">Email ID *</label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="ramesh@gmail.com"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#0a0a0d] border border-[#232330] text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#ff6b35]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">Proposed Location / City *</label>
                  <input
                    type="text"
                    required
                    value={form.location}
                    onChange={(e) => setForm({ ...form, location: e.target.value })}
                    placeholder="e.g. Vijayawada, Vizag, Warangal, Bangalore"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#0a0a0d] border border-[#232330] text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#ff6b35]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">Existing Business / Background</label>
                  <input
                    type="text"
                    value={form.company}
                    onChange={(e) => setForm({ ...form, company: e.target.value })}
                    placeholder="e.g. Education Consultancy / IT Training"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#0a0a0d] border border-[#232330] text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#ff6b35]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">Message / Investment Plan</label>
                  <textarea
                    rows={3}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Commercial space area, target launch timeline, etc."
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#0a0a0d] border border-[#232330] text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#ff6b35]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3 rounded-lg text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-[#ff6b35] to-[#e0531c] hover:from-[#ff8a5c] hover:to-[#ff6b35] shadow-lg shadow-[#ff6b35]/25 transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{submitting ? 'Submitting Application...' : 'Submit Franchise Application'}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
