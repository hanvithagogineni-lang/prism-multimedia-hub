import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { ShieldCheck, FileText } from 'lucide-react';

export const LegalPage: React.FC = () => {
  const location = useLocation();
  const isPrivacy = location.pathname.includes('privacy');

  return (
    <div className="bg-[#0a0a0d] text-white min-h-screen pt-32 pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Tabs */}
        <div className="flex justify-center gap-4 mb-8">
          <Link
            to="/privacy-policy"
            className={`px-5 py-2.5 rounded-lg text-xs font-bold transition-all ${
              isPrivacy
                ? 'bg-[#ff6b35] text-white shadow-lg shadow-[#ff6b35]/25'
                : 'bg-[#121217] text-gray-400 hover:text-white border border-[#232330]'
            }`}
          >
            Privacy Policy
          </Link>
          <Link
            to="/terms"
            className={`px-5 py-2.5 rounded-lg text-xs font-bold transition-all ${
              !isPrivacy
                ? 'bg-[#ff6b35] text-white shadow-lg shadow-[#ff6b35]/25'
                : 'bg-[#121217] text-gray-400 hover:text-white border border-[#232330]'
            }`}
          >
            Student Terms &amp; Conditions
          </Link>
        </div>

        {/* Content Box */}
        <div className="p-8 sm:p-12 rounded-2xl bg-[#121217] border border-[#232330] leading-relaxed text-gray-300 text-sm space-y-6">
          {isPrivacy ? (
            <>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Privacy Policy</h1>
              <p className="text-xs text-gray-400">Effective Date: 24th February, 2025</p>

              <h2 className="text-lg font-bold text-white pt-4">1. Introduction</h2>
              <p>
                This Privacy Policy describes Our policies and procedures on the collection, use and disclosure of Your information when You use the Service and tells You about Your privacy rights and how the law protects You.
              </p>

              <h2 className="text-lg font-bold text-white pt-4">2. Entity &amp; Definitions</h2>
              <p>
                <strong>Company</strong> refers to Prism Educational Society, #403, 4th Floor, Delta Chambers, Beside Jeans Corner Lane, Near Chennai Shopping Mall, Ameerpet, Hyderabad, Telangana State – 500016.
              </p>

              <h2 className="text-lg font-bold text-white pt-4">3. Collecting and Using Your Personal Data</h2>
              <p>
                While using Our Service, We may ask You to provide Us with certain personally identifiable information that can be used to contact or identify You, including: Email address, First and Last Name, Phone number, City and State.
              </p>

              <h2 className="text-lg font-bold text-white pt-4">4. Usage Data &amp; Cookies</h2>
              <p>
                Usage Data is collected automatically when using the Service. We use Cookies and similar tracking technologies to track activity on Our Service to enhance your browsing experience and improve course counseling delivery.
              </p>

              <h2 className="text-lg font-bold text-white pt-4">5. Contact Information</h2>
              <p>
                If you have any questions about this Privacy Policy, You can contact us by email: <a href="mailto:info@prismmultimedia.com" className="text-[#ff6b35] underline">info@prismmultimedia.com</a> or phone: <a href="tel:+919701334133" className="text-[#ff6b35] underline">+91 97013 34133</a>.
              </p>
            </>
          ) : (
            <>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Student Terms &amp; Conditions</h1>
              <p className="text-xs text-gray-400">Effective Date: 24th February, 2025</p>

              <h2 className="text-lg font-bold text-white pt-4">1. Enrollment &amp; Registration</h2>
              <p>
                Enrollment in any course requires completion of the Institute's registration process, verification of eligibility documents, and fee clearance.
              </p>

              <h2 className="text-lg font-bold text-white pt-4">2. Fees &amp; Payment Policies</h2>
              <p>
                All course fees must be paid in the prescribed manner and deadlines. The Institute reserves the right to review fee structures periodically.
              </p>

              <h2 className="text-lg font-bold text-white pt-4">3. Academic Integrity &amp; Code of Conduct</h2>
              <p>
                Students must uphold high standards of academic integrity, regular lab attendance, and professional decorum. Plagiarism or disruptive behavior will lead to disciplinary actions.
              </p>

              <h2 className="text-lg font-bold text-white pt-4">4. Intellectual Property Rights</h2>
              <p>
                All training curriculum, lecture recordings, project briefs, and software assets provided remain the exclusive intellectual property of Prism Multimedia.
              </p>

              <h2 className="text-lg font-bold text-white pt-4">5. Certification &amp; Placement Support</h2>
              <p>
                Certifications and placement drive referrals are awarded upon successful completion of curriculum modules, mandatory assignments, and showreel approval by faculty.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
