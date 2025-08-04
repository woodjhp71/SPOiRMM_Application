import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../Header/Header';

const AgreementsPage: React.FC = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate('/organization');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Standardized Header */}
      <Header title="Agreements Management" showUserInfo={true} />

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Agreements Module
          </h2>
          <p className="text-lg text-gray-600">Store reusable contract or SLA records that can be linked to Players</p>
        </div>

        {/* Placeholder Content */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-500 rounded-full mx-auto mb-4 flex items-center justify-center">
              <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Coming Soon</h3>
            <p className="text-gray-600 mb-6">
              The Agreements module will allow you to store and manage reusable contract or SLA records 
              that can be linked to Players in your risk management framework.
            </p>
            <div className="bg-gray-50 rounded-lg p-6">
              <h4 className="font-semibold text-gray-900 mb-3">Planned Features:</h4>
              <ul className="text-left text-gray-600 space-y-2">
                <li>• Create and manage contract templates</li>
                <li>• Store SLA (Service Level Agreement) records</li>
                <li>• Link agreements to specific Players</li>
                <li>• Track agreement terms and conditions</li>
                <li>• Monitor agreement compliance and renewal dates</li>
                <li>• Version control for agreement documents</li>
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

export default AgreementsPage; 