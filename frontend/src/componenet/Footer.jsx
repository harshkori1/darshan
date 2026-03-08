import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Send } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="footer-section">
      <div className="footer-container">
        <div className="footer-grid">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-red-500 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">🏛️</span>
              </div>
              <span className="text-xl font-bold text-white font-serif">DarshanEase</span>
            </div>
            <p className="text-sm text-gray-400 mb-4">
              Book your sacred temple visits with ease. Experience spiritual journeys like never before.
            </p>
            <div className="footer-social">
              <a href="#" className="social-icon" aria-label="Twitter">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-12.7 12.5S.2 4.3 6.8 4.3c2.5 0 4.1 1.5 4.1 1.5l2.1-2.5s-1.8-1.6-1.8-3.8z"/>
                  <path d="M22 4L15 10"/>
                </svg>
              </a>
              <a href="#" className="social-icon" aria-label="Facebook">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </a>
              <a href="#" className="social-icon" aria-label="Instagram">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="footer-title">Quick Links</h4>
            <ul className="space-y-1">
              <li><Link to="/" className="footer-link">Home</Link></li>
              <li><Link to="/temples" className="footer-link">Temples</Link></li>
              <li><Link to="/about" className="footer-link">About Us</Link></li>
              <li><Link to="/contact" className="footer-link">Contact</Link></li>
              <li><a href="#" className="footer-link">FAQ</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="footer-title">Support</h4>
            <ul className="space-y-1">
              <li><a href="#" className="footer-link">Help Center</a></li>
              <li><a href="#" className="footer-link">Terms of Service</a></li>
              <li><a href="#" className="footer-link">Privacy Policy</a></li>
              <li><a href="#" className="footer-link">Refund Policy</a></li>
              <li><a href="#" className="footer-link">Accessibility</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="footer-title">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-gray-400">
                <MapPin size={18} className="text-orange-500 flex-shrink-0 mt-0.5" />
                <span>123 Temple Road, Sacred City, India</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-400">
                <Phone size={18} className="text-orange-500 flex-shrink-0" />
                <span>+91 123 456 7890</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-400">
                <Mail size={18} className="text-orange-500 flex-shrink-0" />
                <span>support@darshanEase.com</span>
              </li>
            </ul>
            
            {/* Newsletter */}
            <div className="mt-4">
              <p className="text-sm text-gray-400 mb-2">Subscribe to our newsletter</p>
              <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="newsletter-input"
                />
                <button type="submit" className="newsletter-btn">
                  <Send size={16} />
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} DarshanEase. All rights reserved. Made with ❤️ in India</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
