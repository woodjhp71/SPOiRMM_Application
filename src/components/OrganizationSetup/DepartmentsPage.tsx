import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../Header/Header';

const DepartmentsPage: React.FC = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate('/organization');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Standardized Header */}
      <Header title="Departments Management" showUserInfo={true} />

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Departments Module
          </h2>
          <p className="text-lg text-gray-600">Define internal departments classified as L1, L2, or L3 functions</p>
        </div>

        {/* Placeholder Content */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-500 rounded-full mx-auto mb-4 flex items-center justify-center">
              <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Coming Soon</h3>
            <p className="text-gray-600 mb-6">
              The Departments module will allow you to define internal departments classified as L1, L2, or L3 functions 
              for your organization's risk management framework.
            </p>
            <div className="bg-gray-50 rounded-lg p-6">
              <h4 className="font-semibold text-gray-900 mb-3">Planned Features:</h4>
              <ul className="text-left text-gray-600 space-y-2">
                <li>• Define internal departments and their functions</li>
                <li>• Classify departments as L1, L2, or L3 functions</li>
                <li>• Department workflow management</li>
                <li>• Department registry and documentation</li>
                <li>• Internal functions mapping</li>
                <li>• Performance metrics tracking</li>
                <li>• Department hierarchy and reporting structure</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Back Button */}
        <div className="text-center mt-8">
          <button
            onClick={handleBackClick}
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-sky-500 hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 transition-colors duration-200"
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

export default DepartmentsPage; 