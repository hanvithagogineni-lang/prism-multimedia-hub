import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { apiRequest } from '../api/client';
import { CheckCircle, Send } from 'lucide-react';

export const Register: React.FC = () => {
  const [searchParams] = useSearchParams();
  const preSelectedCourse = searchParams.get('course') || '';

  const [courses, setCourses] = useState<any[]>([]);
  const [form, setForm] = useState({
    name: '',
    fatherName: '',
    gender: 'Female',
    education: '',
    email: '',
    phone: '',
    alternatePhone: '',
    courseId: '',
    address1: '',
    address2: '',
    city: 'Hyderabad',
    state: 'Telangana',
    country: 'India'
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    apiRequest('/courses').then((data) => {
      const list = data.courses || [];
      setCourses(list);
      if (preSelectedCourse) {
        const found = list.find((c: any) => c.slug === preSelectedCourse);
        if (found) {
          setForm((prev) => ({ ...prev, courseId: String(found.id) }));
        }
      } else if (list.length > 0) {
        setForm((prev) => ({ ...prev, courseId: String(list[0].id) }));
      }
    }).catch(console.error);
  }, [preSelectedCourse]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await apiRequest('/registrations', {
        method: 'POST',
        body: JSON.stringify(form)
      });
      setSubmitted(true);
      setError('');
    } catch (err: any) {
      setError(err.message || 'Failed to submit registration');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 lg:px-8 py-12 space-y-8">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-prismOrange text-xs font-extrabold tracking-widest uppercase block">Admissions</span>
        <h1 className="text-4xl font-extrabold text-white">Student Registration</h1>
        <p className="text-gray-300 text-sm">
          Fill out your information below to register for your desired course. Our admissions team will reach out to confirm your seat.
        </p>
      </div>

      <div className="bg-[#121217] border border-white/10 rounded-3xl p-8 shadow-2xl">
        {submitted ? (
          <div className="text-center py-12 space-y-4">
            <div className="w-16 h-16 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-white">Registration Submitted Successfully!</h3>
            <p className="text-gray-300 text-sm max-w-md mx-auto">
              Thank you for registering with Prism Multimedia. Our admissions team will contact you shortly regarding counselor guidance, batch timings, and fee structures.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-3 rounded-xl text-xs">{error}</div>}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                <label className="text-xs text-gray-300 block mb-1">Father's Name</label>
                <input
                  type="text"
                  value={form.fatherName}
                  onChange={(e) => setForm({ ...form, fatherName: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-prismOrange"
                />
              </div>

              <div>
                <label className="text-xs text-gray-300 block mb-1">Gender *</label>
                <select
                  value={form.gender}
                  onChange={(e) => setForm({ ...form, gender: e.target.value })}
                  className="w-full bg-[#181820] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-prismOrange"
                >
                  <option value="Female">Female</option>
                  <option value="Male">Male</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="text-xs text-gray-300 block mb-1">Educational Qualification *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. B.Tech / Inter / Graduate"
                  value={form.education}
                  onChange={(e) => setForm({ ...form, education: e.target.value })}
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
                <label className="text-xs text-gray-300 block mb-1">Phone Number *</label>
                <input
                  type="tel"
                  required
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-prismOrange"
                />
              </div>

              <div>
                <label className="text-xs text-gray-300 block mb-1">Alternate Phone Number</label>
                <input
                  type="tel"
                  value={form.alternatePhone}
                  onChange={(e) => setForm({ ...form, alternatePhone: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-prismOrange"
                />
              </div>

              <div>
                <label className="text-xs text-gray-300 block mb-1">Course Opted For *</label>
                <select
                  required
                  value={form.courseId}
                  onChange={(e) => setForm({ ...form, courseId: e.target.value })}
                  className="w-full bg-[#181820] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-prismOrange"
                >
                  {courses.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.title} ({c.duration})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-4 border-t border-white/10 pt-6">
              <div>
                <label className="text-xs text-gray-300 block mb-1">Address Line 1 *</label>
                <input
                  type="text"
                  required
                  value={form.address1}
                  onChange={(e) => setForm({ ...form, address1: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-prismOrange"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs text-gray-300 block mb-1">City *</label>
                  <input
                    type="text"
                    required
                    value={form.city}
                    onChange={(e) => setForm({ ...form, city: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-prismOrange"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-300 block mb-1">State *</label>
                  <input
                    type="text"
                    required
                    value={form.state}
                    onChange={(e) => setForm({ ...form, state: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-prismOrange"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-300 block mb-1">Country *</label>
                  <input
                    type="text"
                    required
                    value={form.country}
                    onChange={(e) => setForm({ ...form, country: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-prismOrange"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-prismOrange hover:bg-prismOrangeHover text-white font-bold py-3.5 rounded-xl shadow-lg text-sm transition-all flex items-center justify-center space-x-2"
            >
              <span>SUBMIT REGISTRATION</span>
              <Send className="w-4 h-4" />
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
