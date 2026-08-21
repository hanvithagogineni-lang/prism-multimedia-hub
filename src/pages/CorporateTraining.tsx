import React, { useState } from 'react';
import { Building, Users, CheckCircle2, ShieldCheck, ArrowRight, Send } from 'lucide-react';
import { api } from '../api/client';

export const CorporateTraining: React.FC = () => {
  const [form, setForm] = useState({
    company_name: '',
    contact_name: '',
    phone: '',
    email: '',
    program: 'UI/UX & Design Systems',
    estimated_trainees: '10-25',
    course_timeline: '1 Month',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await api.post('/corporate-leads', form);
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
            Enterprise Solutions
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white font-display">
            Custom Corporate Training Programs
          </h1>
          <p className="mt-4 text-base text-gray-300">
            Upskill your creative and product engineering workforce with customized training in Figma design systems, motion graphics, 3D modeling, and video production.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Info */}
          <div className="lg:col-span-7 space-y-8">
            <div className="p-8 rounded-2xl bg-[#121217] border border-[#232330]">
              <h2 className="text-2xl font-bold text-white mb-4">Why Partner with Prism for Corporate Training?</h2>
              <div className="space-y-4">
                {[
                  'Tailored Curricula aligned with your specific company software stack and project pipeline',
                  'Flexible Delivery Formats: On-premise classroom, live remote, or hybrid corporate workshops',
                  'Expert Master Trainers with 15+ years hands-on production studio experience',
                  'Measurable Assessment Benchmarks, sprint deliverables, and certification of completion',
                  'Post-Training Support & mentorship sprints for real product rollout',
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3 text-sm text-gray-300">
                    <CheckCircle2 className="w-4 h-4 text-[#ff6b35] shrink-0 mt-1" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Popular Programs */}
            <div className="p-8 rounded-2xl bg-[#121217] border border-[#232330]">
              <h3 className="text-xl font-bold text-white mb-4">Popular Corporate Tracks</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { title: 'Design Systems in Figma', desc: 'Component tokens, auto-layout, and developer handoff.' },
                  { title: 'Motion Graphics for Marketers', desc: 'After Effects explainer reels, branding motion, and ads.' },
                  { title: '3D Product Visualization', desc: 'Blender and Maya realistic product modeling and rendering.' },
                  { title: 'Generative Creative AI', desc: 'AI-assisted asset generation, Photoshop Neural Filters, workflows.' },
                ].map((track, i) => (
                  <div key={i} className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                    <h4 className="font-bold text-white text-sm text-[#ff6b35]">{track.title}</h4>
                    <p className="text-xs text-gray-400 mt-1">{track.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Lead Form */}
          <div className="lg:col-span-5 p-8 rounded-2xl bg-[#121217] border border-[#232330] shadow-2xl">
            <h3 className="text-xl font-bold text-white mb-2">Request a Corporate Quote</h3>
            <p className="text-xs text-gray-400 mb-6">
              Fill out your team requirements and our corporate partnerships manager will contact you within 24 hours.
            </p>

            {submitted ? (
              <div className="p-6 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-center text-emerald-400">
                <CheckCircle2 className="w-10 h-10 mx-auto mb-2" />
                <h4 className="font-bold text-base">Request Received!</h4>
                <p className="text-xs text-gray-300 mt-1">
                  Thank you. Our corporate training coordinator will connect with you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">Company Name *</label>
                  <input
                    type="text"
                    required
                    value={form.company_name}
                    onChange={(e) => setForm({ ...form, company_name: e.target.value })}
                    placeholder="e.g. Acme Tech Corp"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#0a0a0d] border border-[#232330] text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#ff6b35]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">Contact Person Name *</label>
                  <input
                    type="text"
                    required
                    value={form.contact_name}
                    onChange={(e) => setForm({ ...form, contact_name: e.target.value })}
                    placeholder="e.g. John Doe"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#0a0a0d] border border-[#232330] text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#ff6b35]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1">Phone *</label>
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
                    <label className="block text-xs font-semibold text-gray-300 mb-1">Work Email *</label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="john@company.com"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#0a0a0d] border border-[#232330] text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#ff6b35]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">Program Required *</label>
                  <select
                    value={form.program}
                    onChange={(e) => setForm({ ...form, program: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#0a0a0d] border border-[#232330] text-xs text-white focus:outline-none focus:border-[#ff6b35]"
                  >
                    <option>UI/UX & Design Systems</option>
                    <option>Motion Graphics & Video Post-Production</option>
                    <option>3D Animation & Maya Pipelines</option>
                    <option>VFX & Compositing Workflows</option>
                    <option>Digital Marketing & Campaign Analytics</option>
                    <option>Custom Enterprise Multi-Track</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">Specific Requirements / Message</label>
                  <textarea
                    rows={3}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Tell us about your team size, timeline, and goals..."
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#0a0a0d] border border-[#232330] text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#ff6b35]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3 rounded-lg text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-[#ff6b35] to-[#e0531c] hover:from-[#ff8a5c] hover:to-[#ff6b35] shadow-lg shadow-[#ff6b35]/25 transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{submitting ? 'Submitting Request...' : 'Submit Request'}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
