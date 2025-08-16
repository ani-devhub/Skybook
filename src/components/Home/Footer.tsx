import React from 'react';
import { Separator } from '@/components/ui/separator';
import { Plane, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  const footerSections = [
    {
      title: 'Company',
      links: ['About Us', 'Careers', 'Press', 'Blog', 'Investor Relations']
    },
    {
      title: 'Support', 
      links: ['Help Center', 'Contact Us', 'Booking Support', 'Refund Policy', 'Terms & Conditions']
    },
    {
      title: 'Services',
      links: ['Flight Booking', 'Hotel Booking', 'Car Rental', 'Travel Insurance', 'Visa Services']
    },
    {
      title: 'Destinations',
      links: ['Domestic Flights', 'International Flights', 'Weekend Getaways', 'Holiday Packages', 'Business Travel']
    }
  ];

  const socialLinks = [
    { icon: <Facebook className="h-5 w-5" />, href: '#', name: 'Facebook' },
    { icon: <Twitter className="h-5 w-5" />, href: '#', name: 'Twitter' },
    { icon: <Instagram className="h-5 w-5" />, href: '#', name: 'Instagram' },
    { icon: <Linkedin className="h-5 w-5" />, href: '#', name: 'LinkedIn' }
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center space-x-2">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Plane className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-blue-400">SkyBook</span>
            </div>
            <p className="text-gray-400 leading-relaxed">
              Your trusted travel companion for booking flights worldwide. 
              We make travel simple, affordable, and memorable.
            </p>
            
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-gray-400">
                <Mail className="h-4 w-4" />
                <span>support@skybook.com</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-400">
                <Phone className="h-4 w-4" />
                <span>+91 1800-123-4567</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-400">
                <MapPin className="h-4 w-4" />
                <span>Mumbai, India</span>
              </div>
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section, index) => (
            <div key={index} className="space-y-4">
              <h3 className="text-lg font-semibold text-white">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a 
                      href="#" 
                      className="text-gray-400 hover:text-blue-400 transition-colors text-sm"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="my-8 bg-gray-800" />

        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-gray-400 text-sm">
            © 2024 SkyBook. All rights reserved. Built with ❤️ for travelers worldwide.
          </div>
          
          <div className="flex items-center space-x-4">
            <span className="text-gray-400 text-sm">Follow us:</span>
            <div className="flex space-x-3">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 pt-4 border-t border-gray-800">
          <div className="flex flex-wrap justify-center items-center space-x-6 text-xs text-gray-500">
            <span>🛡️ Secure SSL Encryption</span>
            <span>✅ IATA Certified</span>
            <span>🏆 Award Winning Service</span>
            <span>💳 Safe Payment Gateway</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;