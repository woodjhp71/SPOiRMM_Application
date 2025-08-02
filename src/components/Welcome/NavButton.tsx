import React from 'react';
import { useNavigate } from 'react-router-dom';

interface NavButtonProps {
  label: string;
  color: 'blue' | 'red' | 'teal' | 'yellow' | 'indigo' | 'orange' | 'slate';
  navigateTo: string;
  description: string;
}

const NavButton: React.FC<NavButtonProps> = ({ label, color, navigateTo, description }) => {
  const navigate = useNavigate();

  const getColorClasses = (color: string) => {
    const colorMap = {
      blue: {
        bg: 'bg-blue-500',
        hover: 'hover:bg-blue-600',
        border: 'border-blue-200',
        text: 'text-blue-700',
        icon: 'text-blue-500'
      },
      red: {
        bg: 'bg-red-500',
        hover: 'hover:bg-red-600',
        border: 'border-red-200',
        text: 'text-red-700',
        icon: 'text-red-500'
      },
      teal: {
        bg: 'bg-teal-500',
        hover: 'hover:bg-teal-600',
        border: 'border-teal-200',
        text: 'text-teal-700',
        icon: 'text-teal-500'
      },
      yellow: {
        bg: 'bg-yellow-500',
        hover: 'hover:bg-yellow-600',
        border: 'border-yellow-200',
        text: 'text-yellow-700',
        icon: 'text-yellow-500'
      },
      indigo: {
        bg: 'bg-indigo-700',
        hover: 'hover:bg-indigo-800',
        border: 'border-indigo-200',
        text: 'text-indigo-700',
        icon: 'text-indigo-500'
      },
      orange: {
        bg: 'bg-orange-700',
        hover: 'hover:bg-orange-800',
        border: 'border-orange-200',
        text: 'text-orange-700',
        icon: 'text-orange-500'
      },
      slate: {
        bg: 'bg-slate-700',
        hover: 'hover:bg-slate-800',
        border: 'border-slate-200',
        text: 'text-slate-700',
        icon: 'text-slate-500'
      }
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.blue;
  };

  const colors = getColorClasses(color);

  const getIcon = (label: string) => {
    switch (label.toLowerCase()) {
      case 'dashboard':
        return (
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        );
      case 'planning':
        return (
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
          </svg>
        );
      case 'reports':
        return (
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        );
      case 'admin / settings':
        return (
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        );
      default:
        return (
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        );
    }
  };

  const handleClick = () => {
    navigate(navigateTo);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleClick();
    }
  };

  return (
    <button
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className={`
        w-full p-6 bg-white rounded-lg shadow-sm border-2 border-gray-200 
        hover:shadow-md transition-all duration-200 transform hover:scale-105
        focus:outline-none focus:ring-4 focus:ring-opacity-50 focus:ring-blue-500
        ${colors.border}
      `}
      aria-label={`Navigate to ${label} module`}
      role="button"
      tabIndex={0}
    >
      <div className="text-center">
        <div className={`w-16 h-16 ${colors.bg} rounded-full mx-auto mb-4 flex items-center justify-center`}>
          <div className="text-white">
            {getIcon(label)}
          </div>
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{label}</h3>
        <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
      </div>
    </button>
  );
};

export default NavButton; 