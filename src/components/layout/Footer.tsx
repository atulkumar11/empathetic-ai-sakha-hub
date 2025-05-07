
import { Link } from "react-router-dom";
import { Mail, Phone } from "lucide-react";
import PrepzrLogo from '@/components/common/PrepzrLogo';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-blue-900 to-blue-950 text-white py-16 shadow-lg">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link to="/" className="flex items-center mb-4 group">
              <PrepzrLogo width={50} height={50} />
            </Link>
            <p className="text-blue-100 leading-relaxed">
              The AI that listens, learns, and evolves with you across your learning journey, helping you ace your exams with personalized support.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4 text-white relative inline-block">
              Exams
              <span className="absolute -bottom-1 left-0 w-12 h-0.5 bg-blue-400"></span>
            </h3>
            <ul className="space-y-3">
              <li>
                <Link to="/#neet" className="text-blue-200 hover:text-white transition-colors flex items-center gap-1.5 group">
                  <span className="w-1 h-1 bg-blue-400 rounded-full transition-all group-hover:w-2 group-hover:bg-white"></span>
                  NEET
                </Link>
              </li>
              <li>
                <Link to="/#iit-jee" className="text-blue-200 hover:text-white transition-colors flex items-center gap-1.5 group">
                  <span className="w-1 h-1 bg-blue-400 rounded-full transition-all group-hover:w-2 group-hover:bg-white"></span>
                  IIT-JEE
                </Link>
              </li>
              <li>
                <Link to="/#upsc" className="text-blue-200 hover:text-white transition-colors flex items-center gap-1.5 group">
                  <span className="w-1 h-1 bg-blue-400 rounded-full transition-all group-hover:w-2 group-hover:bg-white"></span>
                  UPSC
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4 text-white relative inline-block">
              Features
              <span className="absolute -bottom-1 left-0 w-12 h-0.5 bg-blue-400"></span>
            </h3>
            <ul className="space-y-3">
              <li>
                <Link to="/#features" className="text-blue-200 hover:text-white transition-colors flex items-center gap-1.5 group">
                  <span className="w-1 h-1 bg-blue-400 rounded-full transition-all group-hover:w-2 group-hover:bg-white"></span>
                  24/7 AI Tutor
                </Link>
              </li>
              <li>
                <Link to="/#features" className="text-blue-200 hover:text-white transition-colors flex items-center gap-1.5 group">
                  <span className="w-1 h-1 bg-blue-400 rounded-full transition-all group-hover:w-2 group-hover:bg-white"></span>
                  Flashcards
                </Link>
              </li>
              <li>
                <Link to="/#features" className="text-blue-200 hover:text-white transition-colors flex items-center gap-1.5 group">
                  <span className="w-1 h-1 bg-blue-400 rounded-full transition-all group-hover:w-2 group-hover:bg-white"></span>
                  Concept Cards
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4 text-white relative inline-block">
              Contact Us
              <span className="absolute -bottom-1 left-0 w-12 h-0.5 bg-blue-400"></span>
            </h3>
            <ul className="space-y-3">
              <li className="text-blue-200 flex items-center gap-2">
                <Mail size={16} className="text-blue-300" />
                <span>hello@prepzr.com</span>
              </li>
              <li className="text-blue-200 flex items-center gap-2">
                <Phone size={16} className="text-blue-300" />
                <span>+91-8007194747</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-blue-800 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-blue-200 mb-4 md:mb-0">© {new Date().getFullYear()} PREPZR. All rights reserved.</p>
          <div className="flex space-x-6">
            <Link to="/terms" className="text-blue-200 hover:text-white transition-colors">Terms</Link>
            <Link to="/privacy" className="text-blue-200 hover:text-white transition-colors">Privacy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
