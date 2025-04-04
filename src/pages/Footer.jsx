import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

function Footer() {
  return (
    <footer className="bg-gradient-to-r from-blue-700 via-blue-500 to-blue-400 text-white p-6 mt-10">
      <div className="container mx-auto text-center md:text-left grid md:grid-cols-3 gap-6">
        
        {/* About Section */}
        <div>
          <h2 className="text-xl font-bold">About Us</h2>
          <p className="mt-2 text-sm">
            A secure and modern voting system ensuring fair elections with advanced technology.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-xl font-bold">Quick Links</h2>
          <ul className="mt-2 space-y-1">
            <li><Link to="/" className="hover:underline">Home</Link></li>
            <li><Link to="/login" className="hover:underline">Login</Link></li>
            <li><Link to="/register" className="hover:underline">Register</Link></li>
            <li><Link to="/contact" className="hover:underline">Contact Us</Link></li>
          </ul>
        </div>

        {/* Social Media Links */}
        <div>
          <h2 className="text-xl font-bold">Follow Us</h2>
          <div className="flex justify-center md:justify-start space-x-4 mt-2">
            <a href="#" className="hover:text-gray-300"><Facebook size={24} /></a>
            <a href="#" className="hover:text-gray-300"><Twitter size={24} /></a>
            <a href="#" className="hover:text-gray-300"><Instagram size={24} /></a>
            <a href="#" className="hover:text-gray-300"><Linkedin size={24} /></a>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="text-center border-t border-white mt-4 pt-2 text-sm">
        &copy; {new Date().getFullYear()} Voting System. All Rights Reserved.
      </div>
    </footer>
  );
}

export default Footer;
