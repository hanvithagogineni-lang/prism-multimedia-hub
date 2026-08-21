import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, BookOpen, Users, Mail, FileText, Settings, LogOut } from 'lucide-react';

export const AdminSidebar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('prism_admin_token');
    localStorage.removeItem('prism_admin_user');
    navigate('/admin/login');
  };

  const navItems = [
    { label: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { label: 'Courses CMS', path: '/admin/courses', icon: BookOpen },
    { label: 'Registrations', path: '/admin/registrations', icon: Users },
    { label: 'Lead Enquiries', path: '/admin/leads', icon: Mail },
    { label: 'Blogs CMS', path: '/admin/blogs', icon: FileText },
    { label: 'Site Settings', path: '/admin/settings', icon: Settings }
  ];

  return (
    <aside className="w-64 bg-[#0a0a0d] border-r border-white/10 p-6 flex flex-col justify-between min-h-screen">
      <div className="space-y-8">
        <Link to="/admin/dashboard" className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-prismOrange rounded-lg flex items-center justify-center font-bold text-white text-base">
            P
          </div>
          <div>
            <span className="font-extrabold text-sm text-white tracking-wider block leading-none">PRISM ADMIN</span>
            <span className="text-[9px] text-prismOrange tracking-widest uppercase block font-semibold">CMS PORTAL</span>
          </div>
        </Link>

        <nav className="space-y-2 text-xs font-semibold">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
                  active
                    ? 'bg-prismOrange text-white shadow-lg shadow-prismOrange/20'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <button
        onClick={handleLogout}
        className="flex items-center space-x-3 px-4 py-3 text-xs font-bold text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-xl transition-all w-full"
      >
        <LogOut className="w-4 h-4" />
        <span>LOGOUT</span>
      </button>
    </aside>
  );
};
