import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiRequest } from '../../api/client';
import { Lock, Mail, ShieldAlert } from 'lucide-react';

export const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState('admin@prismmultimedia.com');
  const [password, setPassword] = useState('Admin@123456');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const data = await apiRequest('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password })
      });

      localStorage.setItem('prism_admin_token', data.token);
      localStorage.setItem('prism_admin_user', JSON.stringify(data.user));
      navigate('/admin/dashboard');
    } catch (err: any) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#050508] px-4">
      <div className="max-w-md w-full bg-[#121217] border border-white/10 rounded-3xl p-8 space-y-6 shadow-2xl">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 bg-prismOrange rounded-2xl flex items-center justify-center font-bold text-white text-2xl mx-auto shadow-lg shadow-prismOrange/30">
            P
          </div>
          <h2 className="text-2xl font-extrabold text-white">Admin CMS Portal</h2>
          <p className="text-gray-400 text-xs">Login to manage registrations, leads, and website content</p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-3 rounded-xl text-xs flex items-center space-x-2">
            <ShieldAlert className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="text-xs text-gray-300 block mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-4 py-2.5 text-xs text-white focus:outline-none focus:border-prismOrange"
              />
            </div>
          </div>

          <div>
            <label className="text-xs text-gray-300 block mb-1">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-4 py-2.5 text-xs text-white focus:outline-none focus:border-prismOrange"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-prismOrange hover:bg-prismOrangeHover text-white font-bold py-3 rounded-xl shadow-lg text-xs transition-all disabled:opacity-50"
          >
            {loading ? 'AUTHENTICATING...' : 'LOGIN TO ADMIN PORTAL'}
          </button>
        </form>

        <div className="text-center text-[11px] text-gray-500">
          Default Super Admin: <span className="text-gray-300 font-mono">admin@prismmultimedia.com</span>
        </div>
      </div>
    </div>
  );
};
