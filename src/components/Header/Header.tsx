import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

interface HeaderProps {
  title?: string;
  showUserInfo?: boolean;
}

const Header: React.FC<HeaderProps> = ({ 
  title = "Risk Management Platform Navigation",
  showUserInfo = true 
}) => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut();
      // The auth context will handle the redirect automatically
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const userName = user?.displayName || user?.email || 'User';

  return (
    <header 
      className="bg-gradient-to-r from-sky-500 to-sky-600 text-white shadow-md"
      role="banner"
      aria-label="Application Header"
    >
      <div className="px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-white">SPOiRMM</h1>
          </div>
          <div className="text-center flex-1">
            <h2 className="text-2xl font-bold text-white">{title}</h2>
          </div>
          {showUserInfo && user && (
            <div className="flex items-center space-x-4">
              <span className="text-sm">Welcome, {userName}</span>
              <button
                onClick={handleSignOut}
                className="bg-white bg-opacity-20 hover:bg-opacity-30 px-3 py-1 rounded text-sm transition-colors"
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header; 