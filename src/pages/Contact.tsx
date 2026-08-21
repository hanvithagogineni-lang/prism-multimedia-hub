import React, { useState } from 'react';
import { apiRequest } from '../api/client';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';

export const Contact: React.FC = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    mobile: '',
    message: '',
    consent: true
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await apiRequest('/contact', {
        method: 'POST',
        body: JSON.stringify(form)
      });
      setSubmitted(true);
      setError('');
    } catch (err: any) {
      setError(err.message || 'Failed to send message');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-12 space-y-16">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-prismOrange text-xs font-extrabold tracking-widest uppercase block">Get In Touch</span>
        <h1 className="text-4xl font-extrabold text-white">Contact Prism Multimedia</h1>
        <p className="text-gray-300 text-sm">
          Have questions about course schedules, batch timings, or fee structures? Speak with our counselors.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Contact Information & Map */}
        <div className="space-y-8">
          <div className="bg-[#121217] border border-white/10 rounded-3xl p-8 space-y-6">
            <h3 className="text-xl font-bold text-white">Campus Information</h3>
            <div className="space-y-4 text-xs text-gray-300">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-prismOrange shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block text-sm mb-0.5">Address</strong>
                  <span># 203, 2nd Floor, Above HDFC Bank, Ameerpet Circle, Hyderabad - 500016, Telangana, India</span>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Phone className="w-5 h-5 text-prismOrange shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block text-sm mb-0.5">Phone Numbers</strong>
                  <a href="tel:+919701334133" className="hover:text-prismOrange block">+91 97013 34133</a>
                  <a href="tel:+919177555040" className="hover:text-prismOrange block">+91 91775 55040</a>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Mail className="w-5 h-5 text-prismOrange shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block text-sm mb-0.5">Email Address</strong>
                  <a href="mailto:info@prismmultimedia.com" className="hover:text-prismOrange">info@prismmultimedia.com</a>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Clock className="w-5 h-5 text-prismOrange shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block text-sm mb-0.5">Working Hours</strong>
                  <span>Monday - Saturday: 8:00 AM - 8:00 PM</span>
                </div>
              </div>
            </div>
          </div>

          {/* Embedded Map Container */}
          <div className="rounded-3xl overflow-hidden border border-white/10 shadow-2xl h-64 bg-[#121217] flex items-center justify-center text-xs text-gray-400">
            <iframe
              title="Prism Location Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.452656910609!2d78.4482592!3d17.4356066!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb90d79679f225%3A0x51c726a27e77b4dd!2sPrism%20Multimedia!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
            ></iframe>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-[#121217] border border-white/10 rounded-3xl p-8 shadow-xl">
          <h3 className="text-xl font-bold text-white mb-6">Send Us a Message</h3>

          {submitted ? (
            <div className="bg-green-500/10 border border-green-500/30 text-green-400 p-4 rounded-xl text-xs font-semibold text-center">
              Thank you! Your message has been received. Our team will contact you.
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

              <div>
                <label className="text-xs text-gray-300 block mb-1">Email ID *</label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-prismOrange"
                />
              </div>

              <div>
                <label className="text-xs text-gray-300 block mb-1">Mobile Number *</label>
                <input
                  type="tel"
                  required
                  value={form.mobile}
                  onChange={(e) => setForm({ ...form, mobile: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-prismOrange"
                />
              </div>

              <div>
                <label className="text-xs text-gray-300 block mb-1">Your Message *</label>
                <textarea
                  rows={4}
                  required
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-prismOrange"
                ></textarea>
              </div>

              <div className="flex items-center space-x-2 text-xs text-gray-400">
                <input
                  type="checkbox"
                  required
                  checked={form.consent}
                  onChange={(e) => setForm({ ...form, consent: e.target.checked })}
                  className="rounded border-white/10 text-prismOrange focus:ring-0"
                />
                <span>I agree to be contacted regarding course information.</span>
              </div>

              <button
                type="submit"
                className="w-full bg-prismOrange hover:bg-prismOrangeHover text-white font-bold py-3 rounded-xl shadow-lg text-xs transition-all flex items-center justify-center space-x-2"
              >
                <span>SEND MESSAGE</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
