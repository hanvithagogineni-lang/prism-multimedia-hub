import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Search, Phone, ChevronRight } from 'lucide-react';

export const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setIsSearchOpen(false);
  }, [location.pathname]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'About Us', path: '/about' },
    { label: 'Courses', path: '/courses' },
    { label: 'Student Works', path: '/student-works' },
    { label: 'Placements', path: '/placements' },
    { label: 'Alumni Success', path: '/alumni' },
    { label: 'Blog', path: '/blog' },
    { label: 'Corporate Training', path: '/corporate-training' },
    { label: 'Contact Us', path: '/contact' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-[#0a0a0d]/95 backdrop-blur-md border-b border-[#232330] shadow-2xl py-3'
            : 'bg-gradient-to-b from-[#0a0a0d]/90 to-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#ff6b35] to-[#e0531c] flex items-center justify-center font-bold text-white shadow-lg shadow-[#ff6b35]/20 group-hover:scale-105 transition-transform">
              P
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-extrabold tracking-wider text-white group-hover:text-[#ff6b35] transition-colors">
                PRISM
              </span>
              <span className="text-[10px] tracking-[0.25em] text-gray-400 font-semibold uppercase -mt-1">
                Multimedia
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden xl:flex items-center space-x-1 lg:space-x-2">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors relative ${
                    isActive
                      ? 'text-[#ff6b35] font-semibold'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#ff6b35] rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Action CTAs */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2.5 text-gray-400 hover:text-white hover:bg-white/5 rounded-full transition-colors"
              title="Search"
              aria-label="Search site"
            >
              <Search className="w-5 h-5" />
            </button>

            <a
              href="tel:+919701334133"
              className="hidden 2xl:flex items-center gap-2 text-xs font-semibold text-gray-300 hover:text-[#ff6b35] px-3 py-2 rounded-lg bg-white/5 border border-white/10"
            >
              <Phone className="w-3.5 h-3.5 text-[#ff6b35]" />
              <span>+91 97013 34133</span>
            </a>

            <Link
              to="/register"
              className="px-5 py-2.5 rounded-lg text-sm font-bold text-white bg-gradient-to-r from-[#ff6b35] to-[#e0531c] hover:from-[#ff8a5c] hover:to-[#ff6b35] shadow-lg shadow-[#ff6b35]/25 hover:shadow-[#ff6b35]/40 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              REGISTER NOW
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 xl:hidden">
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 text-gray-400 hover:text-white"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-gray-300 hover:text-white focus:outline-none"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
            </button>
          </div>
        </div>

        {/* Search Bar Overlay */}
        {isSearchOpen && (
          <div className="bg-[#121217] border-b border-[#232330] py-3 px-4 shadow-xl">
            <form onSubmit={handleSearchSubmit} className="max-w-3xl mx-auto flex items-center gap-2">
              <Search className="w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search courses, software tools, blogs, alumni..."
                className="w-full bg-transparent text-white placeholder-gray-500 focus:outline-none text-sm py-1.5"
                autoFocus
              />
              <button
                type="submit"
                className="px-4 py-1.5 bg-[#ff6b35] text-white text-xs font-semibold rounded-md hover:bg-[#e0531c]"
              >
                Search
              </button>
              <button
                type="button"
                onClick={() => setIsSearchOpen(false)}
                className="text-gray-400 hover:text-white text-xs px-2 py-1.5"
              >
                Close
              </button>
            </form>
          </div>
        )}
      </header>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-40 bg-[#0a0a0d]/98 backdrop-blur-lg flex flex-col pt-24 px-6 pb-8 overflow-y-auto xl:hidden">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center justify-between py-3 text-lg font-medium border-b border-white/5 ${
                    isActive ? 'text-[#ff6b35] font-bold' : 'text-gray-300'
                  }`}
                >
                  <span>{link.label}</span>
                  <ChevronRight className="w-4 h-4 text-gray-500" />
                </Link>
              );
            })}
          </div>

          <div className="mt-8 pt-6 border-t border-white/10 flex flex-col gap-4">
            <div className="flex items-center gap-3 text-sm text-gray-400">
              <Phone className="w-4 h-4 text-[#ff6b35]" />
              <a href="tel:+919701334133" className="hover:text-white">
                +91 97013 34133
              </a>
            </div>
            <Link
              to="/register"
              className="w-full text-center py-3.5 rounded-lg font-bold text-white bg-gradient-to-r from-[#ff6b35] to-[#e0531c] shadow-lg shadow-[#ff6b35]/30"
            >
              REGISTER NOW
            </Link>
          </div>
        </div>
      )}
    </>
  );
};
