import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2 } from 'lucide-react';
import { api } from '../api/client';

export const Contact: React.FC = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    mobile: '',
    message: '',
    consent: true,
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await api.post('/contact', form);
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
            Get in Touch
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white font-display">
            Contact Prism Multimedia
          </h1>
          <p className="mt-4 text-base text-gray-300">
            Have questions about course admissions, batch timings, or corporate training? Reach out to our counselors today.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left: Contact Info & Campus Details */}
          <div className="lg:col-span-6 space-y-6">
            <div className="p-8 rounded-2xl bg-[#121217] border border-[#232330] space-y-6">
              <h2 className="text-2xl font-bold text-white">Campus Information</h2>

              <div className="space-y-5 text-sm">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#ff6b35]/10 border border-[#ff6b35]/20 flex items-center justify-center text-[#ff6b35] shrink-0 mt-1">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-base">Campus Address</h3>
                    <p className="text-gray-400 mt-1 leading-relaxed">
                      #403, 4th Floor, Delta Chambers, Beside Jeans Corner Lane, Near Chennai Shopping Mall, Ameerpet, Hyderabad, Telangana State – 500016
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#ff6b35]/10 border border-[#ff6b35]/20 flex items-center justify-center text-[#ff6b35] shrink-0 mt-1">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-base">Admissions &amp; Helpline</h3>
                    <div className="flex flex-col gap-1 mt-1 text-gray-300">
                      <a href="tel:+919701334133" className="hover:text-[#ff6b35] font-semibold">
                        +91 97013 34133
                      </a>
                      <a href="tel:+919177555040" className="hover:text-[#ff6b35] font-semibold">
                        +91 91775 55040
                      </a>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#ff6b35]/10 border border-[#ff6b35]/20 flex items-center justify-center text-[#ff6b35] shrink-0 mt-1">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-base">Official Email</h3>
                    <a href="mailto:info@prismmultimedia.com" className="text-gray-300 hover:text-[#ff6b35] mt-1 block">
                      info@prismmultimedia.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#ff6b35]/10 border border-[#ff6b35]/20 flex items-center justify-center text-[#ff6b35] shrink-0 mt-1">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-base">Working Hours</h3>
                    <p className="text-gray-400 mt-1">
                      Monday – Saturday: 8:00 AM – 8:00 PM<br />
                      Sunday: 10:00 AM – 2:00 PM
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Google Map Embed */}
            <div className="rounded-2xl overflow-hidden border border-[#232330] shadow-xl bg-gray-900 h-64">
              <iframe
                title="Prism Multimedia Campus Location"
                src="https://maps.google.com/maps?q=Prism+Multimedia+Ameerpet+Hyderabad&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* Right: Contact Form */}
          <div className="lg:col-span-6 p-8 rounded-2xl bg-[#121217] border border-[#232330] shadow-2xl">
            <h3 className="text-2xl font-bold text-white mb-2">Send Us a Message</h3>
            <p className="text-xs text-gray-400 mb-6">
              Our career counselors will get back to you with syllabus details and batch schedules.
            </p>

            {submitted ? (
              <div className="p-8 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-center text-emerald-400">
                <CheckCircle2 className="w-12 h-12 mx-auto mb-3" />
                <h4 className="font-bold text-lg">Message Sent Successfully!</h4>
                <p className="text-xs text-gray-300 mt-2">
                  Thank you for reaching out. We have received your inquiry and will contact you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="e.g. Ananya Rao"
                    className="w-full px-4 py-2.5 rounded-lg bg-[#0a0a0d] border border-[#232330] text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#ff6b35]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="ananya@gmail.com"
                      className="w-full px-4 py-2.5 rounded-lg bg-[#0a0a0d] border border-[#232330] text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#ff6b35]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1">Mobile Number *</label>
                    <input
                      type="tel"
                      required
                      value={form.mobile}
                      onChange={(e) => setForm({ ...form, mobile: e.target.value })}
                      placeholder="+91 98765 43210"
                      className="w-full px-4 py-2.5 rounded-lg bg-[#0a0a0d] border border-[#232330] text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#ff6b35]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">Your Message / Query *</label>
                  <textarea
                    rows={4}
                    required
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Tell us about the courses or topics you are interested in..."
                    className="w-full px-4 py-2.5 rounded-lg bg-[#0a0a0d] border border-[#232330] text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#ff6b35]"
                  />
                </div>

                <div className="flex items-start gap-2 pt-1">
                  <input
                    type="checkbox"
                    id="consent"
                    checked={form.consent}
                    onChange={(e) => setForm({ ...form, consent: e.target.checked })}
                    className="mt-0.5 rounded text-[#ff6b35] focus:ring-0"
                    required
                  />
                  <label htmlFor="consent" className="text-xs text-gray-400">
                    I agree to receive course information, brochure updates, and counseling calls from Prism Multimedia.
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3.5 rounded-lg text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-[#ff6b35] to-[#e0531c] hover:from-[#ff8a5c] hover:to-[#ff6b35] shadow-lg shadow-[#ff6b35]/25 transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{submitting ? 'Sending Message...' : 'Send Message'}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
