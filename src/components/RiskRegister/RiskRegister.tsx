import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProject } from '../../contexts/ProjectContext';
import {
  PlusIcon,
  ArrowLeftIcon
} from '@heroicons/react/24/outline';

export interface Risk {
  id: string;
  projectId: string;
  issueDescription: string;
  riskStatement: string;
  riskCategory: 'Governance' | 'Business' | 'Operational';
  spoirmmToolContext: 'Jurisdiction' | 'Market' | 'Enterprise' | 'Organisation' | 'Agreements' | 'Resources';
  externalStakeholders: string[];
  internalDepartments: string[];
  likelihood: number;
  consequence: number;
  riskScore: number;
  riskEvaluation: 'High' | 'Medium' | 'Low';
  mitigationStrategy: string;
  accountablePerson: string;
  status: 'New' | 'Under Review' | 'Approved' | 'Treated' | 'Closed';
  reviewDate: string;
  attachments: string[];
  createdBy: string;
  lastModified: string;
}

const RiskRegister: React.FC = () => {
  const { id: projectId } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { projectData, updateRisks } = useProject();

  const [risks] = useState<Risk[]>(projectData?.risks || []);
  const [isAddingRisk, setIsAddingRisk] = useState(false);

  // Placeholder for future functionality
  useEffect(() => {
    // updateRisks(risks);
  }, [risks, updateRisks]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-green-600 to-teal-600 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => navigate(`/project/${projectId}`)}
                  className="flex items-center px-3 py-2 text-white hover:bg-green-700 rounded-md transition-colors"
                >
                  <ArrowLeftIcon className="h-4 w-4 mr-2" />
                  Back to Project
                </button>
                <div>
                  <h1 className="text-2xl font-bold text-white">
                    Risk Register - SPOiRMM
                  </h1>
                  <p className="text-green-100 mt-1">
                    Risk Management and Assessment
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsAddingRisk(true)}
                className="flex items-center px-4 py-2 bg-white text-green-600 rounded-md hover:bg-green-50 transition-colors"
              >
                <PlusIcon className="h-5 w-5 mr-2" />
                Add Risk
              </button>
            </div>
          </div>

          {/* Content placeholder */}
          <div className="p-6">
            <div className="text-center py-12">
              <div className="mx-auto h-12 w-12 text-gray-400 mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <PlusIcon className="h-6 w-6 text-green-600" />
                </div>
              </div>
              <h3 className="mt-2 text-sm font-medium text-gray-900">No risks found</h3>
              <p className="mt-1 text-sm text-gray-500">
                Get started by adding your first risk.
              </p>
              <div className="mt-6">
                <button
                  onClick={() => setIsAddingRisk(true)}
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
                >
                  <PlusIcon className="h-4 w-4 mr-2" />
                  Add Risk
                </button>
              </div>
              {isAddingRisk && (
                <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-md">
                  <p className="text-green-700">Add Risk functionality coming soon...</p>
                  <button
                    onClick={() => setIsAddingRisk(false)}
                    className="mt-2 px-3 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700"
                  >
                    Close
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RiskRegister; 