import React from 'react';

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <header 
      className="bg-purple-700 text-white shadow-md"
      role="banner"
      aria-label="Application Header"
    >
      <div className="px-6 py-4">
        <div className="text-center">
          <h2 className="text-xl font-semibold">{title}</h2>
        </div>
      </div>
    </header>
  );
};

export default Header; 