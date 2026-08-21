import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Clock, ArrowUpRight } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#070709] border-t border-[#1a1a24] text-gray-400 text-sm">
      {/* Top Banner */}
      <div className="border-b border-[#181824] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <h3 className="text-xl font-extrabold text-white">
              Ready to build a high-growth creative career?
            </h3>
            <p className="text-sm text-gray-400 mt-1">
              Join 10,000+ alumni placed across leading global studios and tech enterprises.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Link
              to="/courses"
              className="px-5 py-2.5 rounded-lg text-sm font-semibold text-white bg-white/10 hover:bg-white/15 border border-white/15 transition-all"
            >
              Explore Courses
            </Link>
            <Link
              to="/register"
              className="px-6 py-2.5 rounded-lg text-sm font-bold text-white bg-gradient-to-r from-[#ff6b35] to-[#e0531c] hover:from-[#ff8a5c] hover:to-[#ff6b35] shadow-lg shadow-[#ff6b35]/25 transition-all"
            >
              Register Now
            </Link>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
        {/* Col 1: Institute About */}
        <div className="lg:col-span-2 space-y-4">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#ff6b35] to-[#e0531c] flex items-center justify-center font-bold text-white shadow-lg">
              P
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-extrabold text-white tracking-wider">PRISM</span>
              <span className="text-[10px] tracking-[0.25em] text-gray-400 font-semibold uppercase -mt-1">
                Multimedia
              </span>
            </div>
          </Link>
          <p className="text-sm leading-relaxed text-gray-400 pr-4">
            Established in 1999, Prism Multimedia has been at the forefront of multimedia education, shaping the future of creative professionals across Graphic Design, UI/UX, 3D Animation, VFX, and Film Post-Production.
          </p>
          <p className="text-xs text-gray-500">
            A division of <span className="text-gray-300 font-semibold">Prism Educational Society</span>.
          </p>

          {/* Social Icons */}
          <div className="flex items-center gap-3 pt-2">
            <a
              href="https://www.facebook.com/prismmultimediahyderabad/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-[#ff6b35]/20 hover:border-[#ff6b35]/50 transition-all"
              aria-label="Facebook"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>
            <a
              href="https://www.instagram.com/prismmultimedia/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-[#ff6b35]/20 hover:border-[#ff6b35]/50 transition-all"
              aria-label="Instagram"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>
            <a
              href="https://www.youtube.com/@prismmultimedia"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-[#ff6b35]/20 hover:border-[#ff6b35]/50 transition-all"
              aria-label="YouTube"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </a>
            <a
              href="https://www.linkedin.com/company/prism-multimedia/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-[#ff6b35]/20 hover:border-[#ff6b35]/50 transition-all"
              aria-label="LinkedIn"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Col 2: Quick Links */}
        <div>
          <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4 border-l-2 border-[#ff6b35] pl-2.5">
            Quick Links
          </h4>
          <ul className="space-y-2.5 text-sm">
            <li><Link to="/" className="hover:text-[#ff6b35] transition-colors">Home</Link></li>
            <li><Link to="/about" className="hover:text-[#ff6b35] transition-colors">About Us</Link></li>
            <li><Link to="/courses" className="hover:text-[#ff6b35] transition-colors">All Courses</Link></li>
            <li><Link to="/student-works" className="hover:text-[#ff6b35] transition-colors">Student Works</Link></li>
            <li><Link to="/placements" className="hover:text-[#ff6b35] transition-colors">Placements Track</Link></li>
            <li><Link to="/alumni" className="hover:text-[#ff6b35] transition-colors">Alumni Success</Link></li>
            <li><Link to="/blog" className="hover:text-[#ff6b35] transition-colors">Insights &amp; Blog</Link></li>
          </ul>
        </div>

        {/* Col 3: Programs */}
        <div>
          <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4 border-l-2 border-[#ff6b35] pl-2.5">
            Top Programs
          </h4>
          <ul className="space-y-2.5 text-sm">
            <li><Link to="/courses/pgdim" className="hover:text-[#ff6b35] transition-colors">PGDIM Flagship</Link></li>
            <li><Link to="/courses/graphic-design" className="hover:text-[#ff6b35] transition-colors">Graphic Design</Link></li>
            <li><Link to="/courses/ui-design-and-development" className="hover:text-[#ff6b35] transition-colors">UI Design &amp; Dev</Link></li>
            <li><Link to="/courses/ux-design" className="hover:text-[#ff6b35] transition-colors">UX Design</Link></li>
            <li><Link to="/courses/3d-animation" className="hover:text-[#ff6b35] transition-colors">3D Animation</Link></li>
            <li><Link to="/courses/vfx" className="hover:text-[#ff6b35] transition-colors">Visual Effects (VFX)</Link></li>
            <li><Link to="/corporate-training" className="hover:text-[#ff6b35] transition-colors">Corporate Training</Link></li>
            <li><Link to="/franchise" className="hover:text-[#ff6b35] transition-colors">Franchise Partner</Link></li>
          </ul>
        </div>

        {/* Col 4: Contact Info */}
        <div>
          <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4 border-l-2 border-[#ff6b35] pl-2.5">
            Campus Info
          </h4>
          <ul className="space-y-3.5 text-xs leading-relaxed">
            <li className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-[#ff6b35] shrink-0 mt-0.5" />
              <span>#403, Delta Chambers, Beside Jeans Corner, Ameerpet, Hyderabad – 500016</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Phone className="w-4 h-4 text-[#ff6b35] shrink-0" />
              <div className="flex flex-col">
                <a href="tel:+919701334133" className="hover:text-white">+91 97013 34133</a>
                <a href="tel:+919177555040" className="hover:text-white">+91 91775 55040</a>
              </div>
            </li>
            <li className="flex items-center gap-2.5">
              <Mail className="w-4 h-4 text-[#ff6b35] shrink-0" />
              <a href="mailto:info@prismmultimedia.com" className="hover:text-white">
                info@prismmultimedia.com
              </a>
            </li>
            <li className="flex items-start gap-2.5">
              <Clock className="w-4 h-4 text-[#ff6b35] shrink-0 mt-0.5" />
              <span>Mon – Sat: 8:00 AM – 8:00 PM</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#181824] py-6 bg-[#050507]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p className="text-gray-500">
            © 1999 – 2026 Prism Multimedia. All rights reserved. Empowering creative professionals.
          </p>
          <div className="flex items-center gap-6">
            <Link to="/privacy-policy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-white transition-colors">
              Student Terms &amp; Conditions
            </Link>
            <Link to="/admin/login" className="text-gray-600 hover:text-gray-400 flex items-center gap-1">
              Admin Portal <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
