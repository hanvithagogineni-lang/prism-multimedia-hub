import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock, Facebook, Instagram, Youtube, Linkedin } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#050508] border-t border-white/10 pt-16 pb-8 text-gray-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Col 1 */}
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 bg-prismOrange rounded-lg flex items-center justify-center font-bold text-white text-lg">
              P
            </div>
            <div>
              <span className="font-extrabold text-base text-white tracking-wider block leading-none">PRISM</span>
              <span className="text-[9px] text-prismOrange tracking-widest uppercase block font-semibold">MULTIMEDIA</span>
            </div>
          </div>
          <p className="text-xs text-gray-400 leading-relaxed">
            Prism Multimedia has been at the forefront of multimedia education since 1999, empowering creative professionals through hands-on practical studio learning.
          </p>
          <div className="flex space-x-3 pt-2">
            <a href="https://facebook.com/prismmultimedia" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-300 hover:text-prismOrange hover:border-prismOrange transition-colors">
              <Facebook className="w-4 h-4" />
            </a>
            <a href="https://instagram.com/prismmultimedia" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-300 hover:text-prismOrange hover:border-prismOrange transition-colors">
              <Instagram className="w-4 h-4" />
            </a>
            <a href="https://youtube.com/prismmultimedia" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-300 hover:text-prismOrange hover:border-prismOrange transition-colors">
              <Youtube className="w-4 h-4" />
            </a>
            <a href="https://linkedin.com/company/prismmultimedia" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-300 hover:text-prismOrange hover:border-prismOrange transition-colors">
              <Linkedin className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Col 2 */}
        <div>
          <h4 className="text-white font-bold text-base mb-4 border-b border-prismOrange/30 pb-2 inline-block">Quick Links</h4>
          <ul className="space-y-2 text-xs">
            <li><Link to="/about" className="hover:text-prismOrange transition-colors">About Us</Link></li>
            <li><Link to="/courses" className="hover:text-prismOrange transition-colors">All Courses</Link></li>
            <li><Link to="/student-works" className="hover:text-prismOrange transition-colors">Student Showcase</Link></li>
            <li><Link to="/placements" className="hover:text-prismOrange transition-colors">Placement Records</Link></li>
            <li><Link to="/alumni" className="hover:text-prismOrange transition-colors">Alumni Success</Link></li>
            <li><Link to="/blog" className="hover:text-prismOrange transition-colors">Blog & Shortcuts</Link></li>
            <li><Link to="/corporate-training" className="hover:text-prismOrange transition-colors">Corporate Training</Link></li>
            <li><Link to="/franchise" className="hover:text-prismOrange transition-colors">Franchise Opportunities</Link></li>
          </ul>
        </div>

        {/* Col 3 */}
        <div>
          <h4 className="text-white font-bold text-base mb-4 border-b border-prismOrange/30 pb-2 inline-block">Popular Courses</h4>
          <ul className="space-y-2 text-xs">
            <li><Link to="/courses/pgdim" className="hover:text-prismOrange transition-colors">PGDIM (Post Graduate Diploma)</Link></li>
            <li><Link to="/courses/graphic-design" className="hover:text-prismOrange transition-colors">Graphic Design</Link></li>
            <li><Link to="/courses/ux-design" className="hover:text-prismOrange transition-colors">UX Design</Link></li>
            <li><Link to="/courses/ui-design-and-development" className="hover:text-prismOrange transition-colors">UI Design & Development</Link></li>
            <li><Link to="/courses/2d-animation" className="hover:text-prismOrange transition-colors">2D Animation</Link></li>
            <li><Link to="/courses/3d-animation" className="hover:text-prismOrange transition-colors">3D Animation</Link></li>
            <li><Link to="/courses/vfx" className="hover:text-prismOrange transition-colors">Visual Effects (VFX)</Link></li>
            <li><Link to="/courses/digital-marketing" className="hover:text-prismOrange transition-colors">Digital Marketing</Link></li>
          </ul>
        </div>

        {/* Col 4 */}
        <div>
          <h4 className="text-white font-bold text-base mb-4 border-b border-prismOrange/30 pb-2 inline-block">Contact Info</h4>
          <ul className="space-y-3 text-xs">
            <li className="flex items-start space-x-3">
              <MapPin className="w-4 h-4 text-prismOrange shrink-0 mt-0.5" />
              <span>Ameerpet Circle, Above HDFC Bank, Hyderabad - 500016, Telangana, India</span>
            </li>
            <li className="flex items-center space-x-3">
              <Phone className="w-4 h-4 text-prismOrange shrink-0" />
              <a href="tel:+919701334133" className="hover:text-prismOrange">+91 97013 34133 / +91 91775 55040</a>
            </li>
            <li className="flex items-center space-x-3">
              <Mail className="w-4 h-4 text-prismOrange shrink-0" />
              <a href="mailto:info@prismmultimedia.com" className="hover:text-prismOrange">info@prismmultimedia.com</a>
            </li>
            <li className="flex items-center space-x-3">
              <Clock className="w-4 h-4 text-prismOrange shrink-0" />
              <span>Mon - Sat: 8:00 AM - 8:00 PM</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 lg:px-8 mt-12 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between text-xs text-gray-500">
        <p>© 2026 Prism Multimedia. All Rights Reserved.</p>
        <div className="flex space-x-6 mt-4 md:mt-0">
          <Link to="/privacy-policy" className="hover:text-gray-300">Privacy Policy</Link>
          <Link to="/terms" className="hover:text-gray-300">Terms & Conditions</Link>
          <Link to="/admin/login" className="hover:text-prismOrange font-semibold">Admin Login</Link>
        </div>
      </div>
    </footer>
  );
};
