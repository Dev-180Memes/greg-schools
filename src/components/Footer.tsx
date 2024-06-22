import React from 'react';
import { FaFacebook, FaInstagram, FaGoogle, FaTwitter, FaYoutube } from 'react-icons/fa';

const Footer: React.FC = () => {
  return (
    <footer className="py-8 px-6 md:px-12 bg-black text-white">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-start gap-4">
          <div className="mb-6 md:mb-0 md:w-1/3">
            <h3 className="text-xl font-bold mb-2 text-blue-400">Greggart9</h3>
            <p>The Ultimate Collaboration Hub for Students and Lecturers to Expand Knowledge and Sharpen Skills.</p>
          </div>
          <div className="mb-6 md:mb-0 md:w-1/3">
            <h3 className="text-xl font-bold mb-2 text-blue-400">Contact Us</h3>
            <p><span className="text-blue-400">Email:</span><br /> info@greg.com</p>
            <p><span className="text-blue-400">Phone:</span><br /> 09064108835</p>
          </div>
          <div className="md:w-1/3">
            <h3 className="text-xl font-bold mb-2">Follow Us On</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-blue-500"><FaInstagram size={24} /></a>
              <a href="#" className="text-blue-500"><FaFacebook size={24} /></a>
              <a href="#" className="text-blue-500"><FaGoogle size={24} /></a>
              <a href="#" className="text-blue-500"><FaTwitter size={24} /></a>
              <a href="#" className="text-blue-500"><FaYoutube size={24} /></a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
