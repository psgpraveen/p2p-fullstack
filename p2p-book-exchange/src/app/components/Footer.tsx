import React from 'react';
import { FaGithub, FaLinkedin, FaGlobe } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-6 mt-10">
      <div className="max-w-5xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
        <div className="text-center md:text-left mb-4 md:mb-0">
          <h1 className="text-lg font-semibold">Made with ❤️ by Praveen</h1>
          <p className="text-sm">Contact: <a href="mailto:adm21002947@rmlau.ac.in" className="underline">adm21002947@rmlau.ac.in</a></p>
        </div>
        <div className="flex gap-4 text-xl">
          <a href="https://psgpraveen.github.io/port" target="_blank" rel="noopener noreferrer">
            <FaGlobe />
          </a>
          <a href="https://github.com/psgpraveen" target="_blank" rel="noopener noreferrer">
            <FaGithub />
          </a>
          <a href="https://linkedin.com/in/psgpraveen" target="_blank" rel="noopener noreferrer">
            <FaLinkedin />
          </a>
        </div>
      </div>
    </footer> 
  );
};

export default Footer;
