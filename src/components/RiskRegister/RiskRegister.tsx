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

  const [risks, setRisks] = useState<Risk[]>(projectData?.risks || []);
  const [isAddingRisk, setIsAddingRisk] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [newRisk, setNewRisk] = useState<Partial<Risk>>({
    issueDescription: '',
    riskStatement: '',
    riskCategory: 'Governance',
    spoirmmToolContext: 'Jurisdiction',
    externalStakeholders: [],
    internalDepartments: [],
    likelihood: 1,
    consequence: 1,
    riskScore: 1,
    riskEvaluation: 'Low',
    mitigationStrategy: '',
    accountablePerson: '',
    status: 'New',
    reviewDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 30 days from now
    attachments: [],
    createdBy: 'current-user',
    lastModified: new Date().toISOString()
  });

  // Available stakeholders and departments
  const availableStakeholders = ['Recipient', 'Provider', 'Staff', 'Supplier', 'Regulator', 'Representative'];
  const availableDepartments = ['L1 - Decision', 'L2 - Exchange', 'L3 - Satisfy'];
  const availableTeamMembers = [
    { id: 'user1', name: 'John Smith', role: 'Risk Plan Coordinator' },
    { id: 'user2', name: 'Sarah Johnson', role: 'Risk Plan Sponsor' },
    { id: 'user3', name: 'Mike Davis', role: 'Project Manager' },
    { id: 'user4', name: 'Lisa Wilson', role: 'Working Group Member' }
  ];

  useEffect(() => {
    updateRisks(risks);
  }, [risks, updateRisks]);

  const calculateRiskScore = (likelihood: number, consequence: number): number => {
    return likelihood * consequence;
  };

  const calculateRiskEvaluation = (riskScore: number): 'High' | 'Medium' | 'Low' => {
    if (riskScore >= 15) return 'High';
    if (riskScore >= 8) return 'Medium';
    return 'Low';
  };

  const validateRisk = (risk: Partial<Risk>): Record<string, string> => {
    const errors: Record<string, string> = {};

    if (!risk.issueDescription?.trim()) {
      errors.issueDescription = 'Issue description is required';
    }

    if (!risk.riskStatement?.trim()) {
      errors.riskStatement = 'Risk statement is required';
    }

    if (!risk.mitigationStrategy?.trim()) {
      errors.mitigationStrategy = 'Mitigation strategy is required';
    }

    if (!risk.accountablePerson) {
      errors.accountablePerson = 'Please select an accountable person';
    }

    if (!risk.externalStakeholders || risk.externalStakeholders.length === 0) {
      errors.externalStakeholders = 'At least one external stakeholder must be selected';
    }

    if (!risk.internalDepartments || risk.internalDepartments.length === 0) {
      errors.internalDepartments = 'At least one internal department must be selected';
    }

    return errors;
  };

  const handleAddRisk = () => {
    const validationErrors = validateRisk(newRisk);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const riskScore = calculateRiskScore(newRisk.likelihood!, newRisk.consequence!);
    const riskEvaluation = calculateRiskEvaluation(riskScore);

    const risk: Risk = {
      id: Date.now().toString(),
      projectId: projectId || '',
      issueDescription: newRisk.issueDescription!,
      riskStatement: newRisk.riskStatement!,
      riskCategory: newRisk.riskCategory!,
      spoirmmToolContext: newRisk.spoirmmToolContext!,
      externalStakeholders: newRisk.externalStakeholders!,
      internalDepartments: newRisk.internalDepartments!,
      likelihood: newRisk.likelihood!,
      consequence: newRisk.consequence!,
      riskScore,
      riskEvaluation,
      mitigationStrategy: newRisk.mitigationStrategy!,
      accountablePerson: newRisk.accountablePerson!,
      status: newRisk.status!,
      reviewDate: newRisk.reviewDate!,
      attachments: newRisk.attachments || [],
      createdBy: newRisk.createdBy!,
      lastModified: new Date().toISOString()
    };

    setRisks([...risks, risk]);
    setNewRisk({
      issueDescription: '',
      riskStatement: '',
      riskCategory: 'Governance',
      spoirmmToolContext: 'Jurisdiction',
      externalStakeholders: [],
      internalDepartments: [],
      likelihood: 1,
      consequence: 1,
      riskScore: 1,
      riskEvaluation: 'Low',
      mitigationStrategy: '',
      accountablePerson: '',
      status: 'New',
      reviewDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      attachments: [],
      createdBy: 'current-user',
      lastModified: new Date().toISOString()
    });
    setIsAddingRisk(false);
    setErrors({});
  };

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

          {/* Add Risk Form */}
          {isAddingRisk && (
            <div className="p-6 border-b border-gray-200 bg-green-50">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Add New Risk</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Issue Description *
                  </label>
                  <textarea
                    value={newRisk.issueDescription}
                    onChange={(e) => setNewRisk({ ...newRisk, issueDescription: e.target.value })}
                    rows={3}
                    className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
                      errors.issueDescription ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Describe the issue that led to this risk..."
                  />
                  {errors.issueDescription && (
                    <p className="text-red-500 text-sm mt-1">{errors.issueDescription}</p>
                  )}
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Risk Statement *
                  </label>
                  <textarea
                    value={newRisk.riskStatement}
                    onChange={(e) => setNewRisk({ ...newRisk, riskStatement: e.target.value })}
                    rows={3}
                    className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
                      errors.riskStatement ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Clearly state the risk in terms of likelihood and consequence..."
                  />
                  {errors.riskStatement && (
                    <p className="text-red-500 text-sm mt-1">{errors.riskStatement}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Risk Category *
                  </label>
                  <select
                    value={newRisk.riskCategory}
                    onChange={(e) => setNewRisk({ ...newRisk, riskCategory: e.target.value as Risk['riskCategory'] })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  >
                    <option value="Governance">Governance</option>
                    <option value="Business">Business</option>
                    <option value="Operational">Operational</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    SPOiRMM Tool Context *
                  </label>
                  <select
                    value={newRisk.spoirmmToolContext}
                    onChange={(e) => setNewRisk({ ...newRisk, spoirmmToolContext: e.target.value as Risk['spoirmmToolContext'] })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  >
                    <option value="Jurisdiction">Jurisdiction</option>
                    <option value="Market">Market</option>
                    <option value="Enterprise">Enterprise</option>
                    <option value="Organisation">Organisation</option>
                    <option value="Agreements">Agreements</option>
                    <option value="Resources">Resources</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Likelihood (1-5) *
                  </label>
                  <select
                    value={newRisk.likelihood}
                    onChange={(e) => {
                      const likelihood = parseInt(e.target.value);
                      const consequence = newRisk.consequence || 1;
                      const riskScore = calculateRiskScore(likelihood, consequence);
                      const riskEvaluation = calculateRiskEvaluation(riskScore);
                      setNewRisk({ 
                        ...newRisk, 
                        likelihood,
                        riskScore,
                        riskEvaluation
                      });
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  >
                    <option value={1}>1 - Very Low</option>
                    <option value={2}>2 - Low</option>
                    <option value={3}>3 - Medium</option>
                    <option value={4}>4 - High</option>
                    <option value={5}>5 - Very High</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Consequence (1-5) *
                  </label>
                  <select
                    value={newRisk.consequence}
                    onChange={(e) => {
                      const consequence = parseInt(e.target.value);
                      const likelihood = newRisk.likelihood || 1;
                      const riskScore = calculateRiskScore(likelihood, consequence);
                      const riskEvaluation = calculateRiskEvaluation(riskScore);
                      setNewRisk({ 
                        ...newRisk, 
                        consequence,
                        riskScore,
                        riskEvaluation
                      });
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  >
                    <option value={1}>1 - Very Low</option>
                    <option value={2}>2 - Low</option>
                    <option value={3}>3 - Medium</option>
                    <option value={4}>4 - High</option>
                    <option value={5}>5 - Very High</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Risk Score (Auto-calculated)
                  </label>
                  <div className="px-3 py-2 bg-gray-100 border border-gray-300 rounded-md">
                    <span className="text-lg font-semibold">{newRisk.riskScore}</span>
                    <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${
                      newRisk.riskEvaluation === 'High' ? 'bg-red-100 text-red-800' :
                      newRisk.riskEvaluation === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {newRisk.riskEvaluation}
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Accountable Person *
                  </label>
                  <select
                    value={newRisk.accountablePerson}
                    onChange={(e) => setNewRisk({ ...newRisk, accountablePerson: e.target.value })}
                    className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
                      errors.accountablePerson ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Select accountable person...</option>
                    {availableTeamMembers.map(member => (
                      <option key={member.id} value={member.id}>{member.name} ({member.role})</option>
                    ))}
                  </select>
                  {errors.accountablePerson && (
                    <p className="text-red-500 text-sm mt-1">{errors.accountablePerson}</p>
                  )}
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    External Stakeholders *
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {availableStakeholders.map(stakeholder => (
                      <label key={stakeholder} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={newRisk.externalStakeholders?.includes(stakeholder) || false}
                          onChange={(e) => {
                            const updatedStakeholders = e.target.checked
                              ? [...(newRisk.externalStakeholders || []), stakeholder]
                              : (newRisk.externalStakeholders || []).filter(s => s !== stakeholder);
                            setNewRisk({ ...newRisk, externalStakeholders: updatedStakeholders });
                          }}
                          className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                        />
                        <span className="ml-2 text-sm text-gray-700">{stakeholder}</span>
                      </label>
                    ))}
                  </div>
                  {errors.externalStakeholders && (
                    <p className="text-red-500 text-sm mt-1">{errors.externalStakeholders}</p>
                  )}
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Internal Departments *
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                    {availableDepartments.map(department => (
                      <label key={department} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={newRisk.internalDepartments?.includes(department) || false}
                          onChange={(e) => {
                            const updatedDepartments = e.target.checked
                              ? [...(newRisk.internalDepartments || []), department]
                              : (newRisk.internalDepartments || []).filter(d => d !== department);
                            setNewRisk({ ...newRisk, internalDepartments: updatedDepartments });
                          }}
                          className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                        />
                        <span className="ml-2 text-sm text-gray-700">{department}</span>
                      </label>
                    ))}
                  </div>
                  {errors.internalDepartments && (
                    <p className="text-red-500 text-sm mt-1">{errors.internalDepartments}</p>
                  )}
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Mitigation Strategy *
                  </label>
                  <textarea
                    value={newRisk.mitigationStrategy}
                    onChange={(e) => setNewRisk({ ...newRisk, mitigationStrategy: e.target.value })}
                    rows={4}
                    className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
                      errors.mitigationStrategy ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Describe the strategy to mitigate this risk..."
                  />
                  {errors.mitigationStrategy && (
                    <p className="text-red-500 text-sm mt-1">{errors.mitigationStrategy}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Review Date
                  </label>
                  <input
                    type="date"
                    value={newRisk.reviewDate}
                    onChange={(e) => setNewRisk({ ...newRisk, reviewDate: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Status
                  </label>
                  <select
                    value={newRisk.status}
                    onChange={(e) => setNewRisk({ ...newRisk, status: e.target.value as Risk['status'] })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  >
                    <option value="New">New</option>
                    <option value="Under Review">Under Review</option>
                    <option value="Approved">Approved</option>
                    <option value="Treated">Treated</option>
                    <option value="Closed">Closed</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => {
                    setIsAddingRisk(false);
                    setNewRisk({
                      issueDescription: '',
                      riskStatement: '',
                      riskCategory: 'Governance',
                      spoirmmToolContext: 'Jurisdiction',
                      externalStakeholders: [],
                      internalDepartments: [],
                      likelihood: 1,
                      consequence: 1,
                      riskScore: 1,
                      riskEvaluation: 'Low',
                      mitigationStrategy: '',
                      accountablePerson: '',
                      status: 'New',
                      reviewDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                      attachments: [],
                      createdBy: 'current-user',
                      lastModified: new Date().toISOString()
                    });
                    setErrors({});
                  }}
                  className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddRisk}
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                >
                  Add Risk
                </button>
              </div>
            </div>
          )}

          {/* Risks List */}
          <div className="p-6">
            {risks.length === 0 ? (
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
              </div>
            ) : (
              <div className="space-y-4">
                {risks.map((risk) => (
                  <div key={risk.id} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-lg font-medium text-gray-900">{risk.issueDescription}</h3>
                        <p className="mt-1 text-sm text-gray-600">{risk.riskStatement}</p>
                        <div className="mt-2 flex items-center space-x-4 text-sm text-gray-500">
                          <span>Category: {risk.riskCategory}</span>
                          <span>Tool: {risk.spoirmmToolContext}</span>
                          <span>Score: {risk.riskScore}</span>
                          <span>Accountable: {availableTeamMembers.find(m => m.id === risk.accountablePerson)?.name || risk.accountablePerson}</span>
                        </div>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {risk.externalStakeholders.map(stakeholder => (
                            <span key={stakeholder} className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-blue-100 text-blue-800">
                              {stakeholder}
                            </span>
                          ))}
                          {risk.internalDepartments.map(department => (
                            <span key={department} className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-green-100 text-green-800">
                              {department}
                            </span>
                          ))}
                        </div>
                        <div className="mt-2">
                          <p className="text-sm text-gray-600"><strong>Mitigation:</strong> {risk.mitigationStrategy}</p>
                        </div>
                      </div>
                      <div className="ml-4 flex flex-col items-end space-y-2">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          risk.status === 'New' ? 'bg-blue-100 text-blue-800' :
                          risk.status === 'Under Review' ? 'bg-yellow-100 text-yellow-800' :
                          risk.status === 'Approved' ? 'bg-green-100 text-green-800' :
                          risk.status === 'Treated' ? 'bg-purple-100 text-purple-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {risk.status}
                        </span>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          risk.riskEvaluation === 'High' ? 'bg-red-100 text-red-800' :
                          risk.riskEvaluation === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {risk.riskEvaluation} Risk
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RiskRegister; 