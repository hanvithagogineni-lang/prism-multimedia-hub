import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, Search } from 'lucide-react';

export const Header: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setMobileOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-[#0a0a0d]/90 backdrop-blur-md border-b border-white/10 px-4 lg:px-8 py-3 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-3 group">
          <div className="w-10 h-10 bg-gradient-to-tr from-prismOrange to-orange-400 rounded-lg flex items-center justify-center font-bold text-white text-xl shadow-lg shadow-prismOrange/20 group-hover:scale-105 transition-transform">
            P
          </div>
          <div>
            <span className="font-extrabold text-lg text-white tracking-wider block leading-none">PRISM</span>
            <span className="text-[10px] text-prismOrange tracking-widest uppercase block font-semibold">MULTIMEDIA</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center space-x-6 text-sm font-medium">
          <Link to="/" className="text-gray-300 hover:text-prismOrange transition-colors">Home</Link>
          <Link to="/about" className="text-gray-300 hover:text-prismOrange transition-colors">About Us</Link>
          <Link to="/courses" className="text-gray-300 hover:text-prismOrange transition-colors">Courses</Link>
          <Link to="/student-works" className="text-gray-300 hover:text-prismOrange transition-colors">Student Works</Link>
          <Link to="/placements" className="text-gray-300 hover:text-prismOrange transition-colors">Placements</Link>
          <Link to="/alumni" className="text-gray-300 hover:text-prismOrange transition-colors">Alumni</Link>
          <Link to="/blog" className="text-gray-300 hover:text-prismOrange transition-colors">Blog</Link>
          <Link to="/corporate-training" className="text-gray-300 hover:text-prismOrange transition-colors">Corporate</Link>
          <Link to="/contact" className="text-gray-300 hover:text-prismOrange transition-colors">Contact</Link>
        </nav>

        {/* Desktop Right Actions */}
        <div className="hidden lg:flex items-center space-x-4">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-white/5 text-xs text-white placeholder-gray-400 border border-white/10 rounded-full px-3 py-1.5 pr-8 focus:outline-none focus:border-prismOrange transition-all w-36 focus:w-48"
            />
            <button type="submit" className="absolute right-2 top-2 text-gray-400 hover:text-prismOrange">
              <Search className="w-3.5 h-3.5" />
            </button>
          </form>

          <Link
            to="/register"
            className="bg-prismOrange hover:bg-prismOrangeHover text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg shadow-prismOrange/30 hover:scale-105 transition-all"
          >
            REGISTER NOW
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden text-gray-300 hover:text-white p-1"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="lg:hidden mt-3 pt-3 border-t border-white/10 space-y-3 px-2 pb-4">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              placeholder="Search courses, blogs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 text-sm text-white placeholder-gray-400 border border-white/10 rounded-lg px-3 py-2 pr-8 focus:outline-none focus:border-prismOrange"
            />
            <button type="submit" className="absolute right-3 top-2.5 text-gray-400">
              <Search className="w-4 h-4" />
            </button>
          </form>
          <div className="grid grid-cols-2 gap-2 text-sm font-medium">
            <Link to="/" onClick={() => setMobileOpen(false)} className="text-gray-300 hover:text-prismOrange py-1.5">Home</Link>
            <Link to="/about" onClick={() => setMobileOpen(false)} className="text-gray-300 hover:text-prismOrange py-1.5">About Us</Link>
            <Link to="/courses" onClick={() => setMobileOpen(false)} className="text-gray-300 hover:text-prismOrange py-1.5">Courses</Link>
            <Link to="/student-works" onClick={() => setMobileOpen(false)} className="text-gray-300 hover:text-prismOrange py-1.5">Student Works</Link>
            <Link to="/placements" onClick={() => setMobileOpen(false)} className="text-gray-300 hover:text-prismOrange py-1.5">Placements</Link>
            <Link to="/alumni" onClick={() => setMobileOpen(false)} className="text-gray-300 hover:text-prismOrange py-1.5">Alumni</Link>
            <Link to="/blog" onClick={() => setMobileOpen(false)} className="text-gray-300 hover:text-prismOrange py-1.5">Blog</Link>
            <Link to="/corporate-training" onClick={() => setMobileOpen(false)} className="text-gray-300 hover:text-prismOrange py-1.5">Corporate</Link>
            <Link to="/contact" onClick={() => setMobileOpen(false)} className="text-gray-300 hover:text-prismOrange py-1.5">Contact</Link>
          </div>
          <Link
            to="/register"
            onClick={() => setMobileOpen(false)}
            className="block text-center bg-prismOrange hover:bg-prismOrangeHover text-white text-sm font-bold py-2.5 rounded-lg shadow-lg"
          >
            REGISTER NOW
          </Link>
        </div>
      )}
    </header>
  );
};
