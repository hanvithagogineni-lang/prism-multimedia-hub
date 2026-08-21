import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, Mail, ArrowRight, ShieldCheck, KeyRound } from 'lucide-react';
import { api } from '../../api/client';

export const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState('admin@prismmultimedia.com');
  const [password, setPassword] = useState('Admin@123456');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await api.post('/auth/login', { email, password });
      localStorage.setItem('prism_token', res.data.token);
      localStorage.setItem('prism_user', JSON.stringify(res.data.user));
      navigate('/admin/dashboard');
    } catch (err: any) {
      // Fallback for offline preview: If credentials match default admin, allow local session
      if (email === 'admin@prismmultimedia.com' && password === 'Admin@123456') {
        localStorage.setItem('prism_token', 'demo-prism-token-2026');
        localStorage.setItem(
          'prism_user',
          JSON.stringify({ name: 'Super Admin', email, role: 'SUPER_ADMIN' })
        );
        navigate('/admin/dashboard');
      } else {
        setError(err.response?.data?.error || 'Invalid email or password');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#070709] flex flex-col justify-center py-12 sm:px-6 lg:px-8 text-white">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link to="/" className="inline-flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#ff6b35] to-[#e0531c] flex items-center justify-center font-extrabold text-white text-xl shadow-xl shadow-[#ff6b35]/25">
            P
          </div>
          <div className="text-left">
            <span className="text-2xl font-extrabold text-white tracking-wider block">PRISM</span>
            <span className="text-[10px] tracking-[0.25em] text-[#ff6b35] font-bold uppercase block -mt-1">
              Admin Portal
            </span>
          </div>
        </Link>
        <h2 className="mt-6 text-2xl font-bold text-white">Sign In to Admin Dashboard</h2>
        <p className="mt-1 text-xs text-gray-400">
          Manage courses, student admissions, leads, alumni, and website CMS.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-[#121217] py-8 px-6 shadow-2xl rounded-2xl border border-[#232330] sm:px-10">
          {error && (
            <div className="mb-6 p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-semibold">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@prismmultimedia.com"
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-[#0a0a0d] border border-[#232330] text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#ff6b35]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-[#0a0a0d] border border-[#232330] text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#ff6b35]"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-[#ff6b35] to-[#e0531c] hover:from-[#ff8a5c] hover:to-[#ff6b35] shadow-lg shadow-[#ff6b35]/25 transition-all flex items-center justify-center gap-2"
            >
              <span>{loading ? 'Authenticating...' : 'Sign In to Dashboard'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>

          {/* Quick Demo Credentials Box */}
          <div className="mt-6 pt-6 border-t border-[#1a1a24] text-xs text-gray-400">
            <div className="flex items-center gap-1.5 text-gray-300 font-semibold mb-2">
              <KeyRound className="w-3.5 h-3.5 text-[#ff6b35]" />
              <span>Default Super Admin Credentials:</span>
            </div>
            <div className="p-3 rounded-lg bg-black/40 border border-white/5 font-mono text-[11px] space-y-1">
              <div>Email: <strong className="text-white">admin@prismmultimedia.com</strong></div>
              <div>Password: <strong className="text-white">Admin@123456</strong></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
