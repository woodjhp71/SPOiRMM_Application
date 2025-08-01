import React, { useState } from 'react';
import {
  CheckCircleIcon,
  XCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon
} from '@heroicons/react/24/outline';

interface PPAssessmentProps {
  data: {
    needsSatisfied: boolean;
    needsDescription: string;
    objectivesAchieved: boolean;
    objectivesDescription: string;
    projectManagerSignoff: boolean;
    signoffDate: string;
  };
  updateData: (data: any) => void;
  projectData: any;
}

const PPAssessment: React.FC<PPAssessmentProps> = ({ data, updateData, projectData }) => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleFieldChange = (name: string, value: any) => {
    // Auto-set signoff date when project manager signs off
    if (name === 'projectManagerSignoff' && value === true) {
      updateData({
        ...data,
        [name]: value,
        signoffDate: new Date().toISOString().split('T')[0]
      });
    } else {
      updateData({
        ...data,
        [name]: value
      });
    }

    // Clear errors when field is updated
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateAssessment = () => {
    const newErrors: Record<string, string> = {};

    if (data.needsSatisfied === false && !data.needsDescription.trim()) {
      newErrors.needsDescription = 'Please describe why the needs were not satisfied';
    }

    if (data.objectivesAchieved === false && !data.objectivesDescription.trim()) {
      newErrors.objectivesDescription = 'Please describe what was achieved';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const canSignOff = () => {
    // Check if project status is "Closed" (business rule)
    if (projectData?.details?.projectStatus !== 'Closed') {
      return false;
    }

    // Check if all required fields are completed
    if (data.needsSatisfied === false && !data.needsDescription.trim()) {
      return false;
    }

    if (data.objectivesAchieved === false && !data.objectivesDescription.trim()) {
      return false;
    }

    return true;
  };

  const getStatusColor = (satisfied: boolean) => {
    return satisfied ? 'text-green-600' : 'text-red-600';
  };

  const getStatusIcon = (satisfied: boolean) => {
    return satisfied ? (
      <CheckCircleIcon className="h-5 w-5 text-green-500" />
    ) : (
      <XCircleIcon className="h-5 w-5 text-red-500" />
    );
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-teal-50 to-blue-50 border border-teal-200 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-teal-800 mb-4">
          Project Assessment
        </h2>
        <p className="text-teal-700 mb-6">
          Evaluate project outcomes and obtain final sign-off for the risk management project.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Needs Assessment */}
        <div className="space-y-6">
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Needs Assessment
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Have the needs been satisfied?
                </label>
                <div className="flex space-x-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="needsSatisfied"
                      checked={data.needsSatisfied === true}
                      onChange={() => handleFieldChange('needsSatisfied', true)}
                      className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300"
                    />
                    <span className="ml-2 text-sm font-medium text-gray-700">Yes</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="needsSatisfied"
                      checked={data.needsSatisfied === false}
                      onChange={() => handleFieldChange('needsSatisfied', false)}
                      className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300"
                    />
                    <span className="ml-2 text-sm font-medium text-gray-700">No</span>
                  </label>
                </div>
                {data.needsSatisfied !== null && (
                  <div className="flex items-center mt-2">
                    {getStatusIcon(data.needsSatisfied)}
                    <span className={`ml-2 text-sm font-medium ${getStatusColor(data.needsSatisfied)}`}>
                      {data.needsSatisfied ? 'Needs have been satisfied' : 'Needs have not been satisfied'}
                    </span>
                  </div>
                )}
              </div>

              {data.needsSatisfied === false && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Describe how or why not <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={data.needsDescription}
                    onChange={(e) => handleFieldChange('needsDescription', e.target.value)}
                    rows={4}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 ${
                      errors.needsDescription ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="Explain why the needs were not satisfied and what could be done differently"
                  />
                  {errors.needsDescription && (
                    <p className="mt-1 text-sm text-red-600">{errors.needsDescription}</p>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Objectives Assessment */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Objectives Assessment
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Were the objectives achieved?
                </label>
                <div className="flex space-x-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="objectivesAchieved"
                      checked={data.objectivesAchieved === true}
                      onChange={() => handleFieldChange('objectivesAchieved', true)}
                      className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300"
                    />
                    <span className="ml-2 text-sm font-medium text-gray-700">Yes</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="objectivesAchieved"
                      checked={data.objectivesAchieved === false}
                      onChange={() => handleFieldChange('objectivesAchieved', false)}
                      className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300"
                    />
                    <span className="ml-2 text-sm font-medium text-gray-700">No</span>
                  </label>
                </div>
                {data.objectivesAchieved !== null && (
                  <div className="flex items-center mt-2">
                    {getStatusIcon(data.objectivesAchieved)}
                    <span className={`ml-2 text-sm font-medium ${getStatusColor(data.objectivesAchieved)}`}>
                      {data.objectivesAchieved ? 'Objectives have been achieved' : 'Objectives have not been achieved'}
                    </span>
                  </div>
                )}
              </div>

              {data.objectivesAchieved === false && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Describe what was achieved <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={data.objectivesDescription}
                    onChange={(e) => handleFieldChange('objectivesDescription', e.target.value)}
                    rows={4}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 ${
                      errors.objectivesDescription ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="Describe what was actually achieved and any partial successes"
                  />
                  {errors.objectivesDescription && (
                    <p className="mt-1 text-sm text-red-600">{errors.objectivesDescription}</p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sign-off Section */}
        <div className="space-y-6">
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Project Manager Sign-off
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={data.projectManagerSignoff}
                    onChange={(e) => handleFieldChange('projectManagerSignoff', e.target.checked)}
                    disabled={!canSignOff()}
                    className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded disabled:opacity-50"
                  />
                  <span className="ml-2 text-sm font-medium text-gray-700">
                    I confirm the assessment is complete and accurate
                  </span>
                </label>
                {data.projectManagerSignoff ? (
                  <CheckCircleIcon className="h-5 w-5 text-green-500" />
                ) : (
                  <XCircleIcon className="h-5 w-5 text-gray-400" />
                )}
              </div>

              {data.projectManagerSignoff && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Sign-off Date
                  </label>
                  <input
                    type="date"
                    value={data.signoffDate}
                    onChange={(e) => handleFieldChange('signoffDate', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Assessment Summary */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Assessment Summary
            </h3>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Needs Satisfied:</span>
                <div className="flex items-center">
                  {data.needsSatisfied !== null ? (
                    <>
                      {getStatusIcon(data.needsSatisfied)}
                      <span className={`ml-2 text-sm font-medium ${getStatusColor(data.needsSatisfied)}`}>
                        {data.needsSatisfied ? 'Yes' : 'No'}
                      </span>
                    </>
                  ) : (
                    <span className="text-sm text-gray-400">Not assessed</span>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Objectives Achieved:</span>
                <div className="flex items-center">
                  {data.objectivesAchieved !== null ? (
                    <>
                      {getStatusIcon(data.objectivesAchieved)}
                      <span className={`ml-2 text-sm font-medium ${getStatusColor(data.objectivesAchieved)}`}>
                        {data.objectivesAchieved ? 'Yes' : 'No'}
                      </span>
                    </>
                  ) : (
                    <span className="text-sm text-gray-400">Not assessed</span>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Project Manager Sign-off:</span>
                <div className="flex items-center">
                  {data.projectManagerSignoff ? (
                    <>
                      <CheckCircleIcon className="h-5 w-5 text-green-500" />
                      <span className="ml-2 text-sm font-medium text-green-600">Signed</span>
                    </>
                  ) : (
                    <>
                      <XCircleIcon className="h-5 w-5 text-gray-400" />
                      <span className="ml-2 text-sm text-gray-400">Not signed</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Business Rules Alert */}
          {projectData?.details?.projectStatus !== 'Closed' && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <ExclamationTriangleIcon className="h-5 w-5 text-yellow-400" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-yellow-800">
                    Project Status Requirement
                  </h3>
                  <div className="mt-2 text-sm text-yellow-700">
                    <p>
                      The project status must be set to "Closed" before final assessment can be signed off.
                      Current status: <strong>{projectData?.details?.projectStatus || 'Not set'}</strong>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Validation Status */}
          <div className={`border rounded-lg p-4 ${
            canSignOff() ? 'bg-green-50 border-green-200' : 'bg-yellow-50 border-yellow-200'
          }`}>
            <div className="flex items-center">
              {canSignOff() ? (
                <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
              ) : (
                <InformationCircleIcon className="h-5 w-5 text-yellow-500 mr-2" />
              )}
              <span className={`text-sm font-medium ${
                canSignOff() ? 'text-green-800' : 'text-yellow-800'
              }`}>
                {canSignOff() 
                  ? 'Assessment is ready for sign-off' 
                  : 'Complete all required fields and ensure project status is "Closed"'
                }
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end space-x-3">
        <button
          onClick={validateAssessment}
          className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
        >
          Validate Assessment
        </button>
        <button
          onClick={() => {
            if (validateAssessment() && canSignOff()) {
              handleFieldChange('projectManagerSignoff', true);
            }
          }}
          disabled={!canSignOff()}
          className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Sign Off Assessment
        </button>
      </div>
    </div>
  );
};

export default PPAssessment; 