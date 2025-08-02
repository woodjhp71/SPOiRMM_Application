import React from 'react';
import { useNavigate } from 'react-router-dom';

const SettingsPage: React.FC = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate('/organization');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header
        className="bg-gradient-to-r from-red-600 to-red-700 text-white shadow-md"
        role="banner"
        aria-label="Application Header"
      >
        <div className="px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-white">SPOiRMM</h1>
            </div>
            <div className="text-center flex-1">
              <h2 className="text-2xl font-bold text-white">Settings Management</h2>
            </div>
            <div className="flex-shrink-0">
              <button
                onClick={handleBackClick}
                className="p-2 text-white hover:text-red-100 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 rounded-md transition-colors duration-200"
                aria-label="Return to organization setup"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Settings Module
          </h2>
          <p className="text-lg text-gray-600">Set time zone, jurisdiction, and default frameworks (e.g., ISO 31000)</p>
        </div>

        {/* Placeholder Content */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-red-500 rounded-full mx-auto mb-4 flex items-center justify-center">
              <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Coming Soon</h3>
            <p className="text-gray-600 mb-6">
              The Settings module will allow you to configure system-wide settings including time zone, 
              jurisdiction, and default frameworks like ISO 31000.
            </p>
            <div className="bg-gray-50 rounded-lg p-6">
              <h4 className="font-semibold text-gray-900 mb-3">Planned Features:</h4>
              <ul className="text-left text-gray-600 space-y-2">
                <li>• Configure system time zone and date formats</li>
                <li>• Set default jurisdiction and regulatory framework</li>
                <li>• Select default risk management frameworks (ISO 31000, COSO, etc.)</li>
                <li>• Configure user preferences and system defaults</li>
                <li>• Manage system-wide notification settings</li>
                <li>• Set default risk assessment criteria</li>
                <li>• Configure data retention and backup settings</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Back Button */}
        <div className="text-center mt-8">
          <button
            onClick={handleBackClick}
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors duration-200"
            aria-label="Return to organization setup"
          >
            <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Organization Setup
          </button>
        </div>

        {/* Footer Info */}
        <div className="mt-12 text-center">
          <p className="text-sm text-gray-500">
            SPOiRMM - Strategic Planning of Integrated Risk Management Model
          </p>
        </div>
      </main>
    </div>
  );
};

export default SettingsPage; 