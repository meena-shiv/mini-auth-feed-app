import React from 'react';

const Footer: React.FC = () => (
  <footer className="w-full py-6 bg-white border-t border-gray-200 mt-12 text-center text-gray-500 text-sm animate-fade-in">
    <span>&copy; {new Date().getFullYear()} foo-rum. All rights reserved.</span>
    <span className="mx-2">|</span>
    <a href="https://github.com/meena-shiv" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline group relative overflow-hidden">
      @Shiv Meena
      <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
    </a>
  </footer>
);

export default Footer; 