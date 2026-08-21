import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  BookOpen,
  Users,
  MessageSquare,
  Building,
  Briefcase,
  FileText,
  Palette,
  Award,
  Settings,
  LogOut,
  FolderKanban,
  Star,
} from 'lucide-react';

export const AdminSidebar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('prism_token');
    localStorage.removeItem('prism_user');
    navigate('/admin/login');
  };

  const navItems = [
    { label: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { label: 'Courses', path: '/admin/courses', icon: BookOpen },
    { label: 'Registrations', path: '/admin/registrations', icon: Users },
    { label: 'Leads & Enquiries', path: '/admin/leads', icon: MessageSquare },
    { label: 'Blogs & CMS', path: '/admin/blogs', icon: FileText },
    { label: 'Student Works', path: '/admin/student-works', icon: Palette },
    { label: 'Alumni Directory', path: '/admin/alumni', icon: Award },
    { label: 'Placements', path: '/admin/placements', icon: Briefcase },
    { label: 'Testimonials', path: '/admin/testimonials', icon: Star },
    { label: 'Media Library', path: '/admin/media', icon: FolderKanban },
    { label: 'Site Settings', path: '/admin/settings', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-[#0a0a0d] border-r border-[#1a1a24] flex flex-col justify-between shrink-0 h-screen sticky top-0">
      <div>
        {/* Brand */}
        <div className="p-5 border-b border-[#1a1a24] flex items-center justify-between">
          <Link to="/admin/dashboard" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#ff6b35] to-[#e0531c] flex items-center justify-center font-bold text-white text-sm">
              P
            </div>
            <div>
              <span className="font-extrabold text-white tracking-wider text-sm">PRISM</span>
              <span className="block text-[9px] text-[#ff6b35] uppercase font-bold tracking-widest -mt-0.5">
                Admin CMS
              </span>
            </div>
          </Link>
          <Link to="/" target="_blank" className="text-[10px] text-gray-400 hover:text-white px-2 py-1 bg-white/5 rounded border border-white/10">
            View Live
          </Link>
        </div>

        {/* Nav Links */}
        <nav className="p-3 space-y-1 overflow-y-auto max-h-[calc(100vh-140px)]">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-semibold transition-colors ${
                  isActive
                    ? 'bg-[#ff6b35] text-white shadow-lg shadow-[#ff6b35]/20'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer / Logout */}
      <div className="p-4 border-t border-[#1a1a24]">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold text-rose-400 hover:bg-rose-500/10 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
};
