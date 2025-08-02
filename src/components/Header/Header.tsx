import React from 'react';

interface HeaderProps {
  title: string;
  subtitle?: string;
}

const Header: React.FC<HeaderProps> = ({ title, subtitle }) => {
  return (
    <header 
      className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md"
      role="banner"
      aria-label="Application Header"
    >
      <div className="px-6 py-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white">{title}</h1>
          {subtitle && (
            <p className="text-blue-100 mt-1">{subtitle}</p>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header; 