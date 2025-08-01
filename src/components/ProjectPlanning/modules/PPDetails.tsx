import React, { useState } from 'react';
import { 
  CalendarIcon, 
  UserIcon, 
  CheckCircleIcon,
  XCircleIcon,
  InformationCircleIcon
} from '@heroicons/react/24/outline';

interface PPDetailsProps {
  data: {
    projectTitle: string;
    startDate: string;
    endDate: string;
    projectManager: string;
    riskPlanSponsor: string;
    riskPlanCoordinator: string;
    projectStatus: 'New' | 'In Progress' | 'Closed';
    planApproved: boolean;
    approvalDate: string;
    projectDescription: string;
    whyNeeded: string;
    objectives: string;
  };
  updateData: (data: any) => void;
  projectData: any;
}

const PPDetails: React.FC<PPDetailsProps> = ({ data, updateData }) => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Mock data for dropdowns - in real app, this would come from API
  const projectManagers = [
    'John Smith',
    'Sarah Johnson',
    'Michael Brown',
    'Emily Davis'
  ];

  const sponsors = [
    'David Wilson',
    'Lisa Anderson',
    'Robert Taylor',
    'Jennifer Martinez'
  ];

  const coordinators = [
    'Thomas Garcia',
    'Amanda Rodriguez',
    'Christopher Lee',
    'Michelle White'
  ];

  const validateField = (name: string, value: any): string => {
    switch (name) {
      case 'projectTitle':
        return value.trim() === '' ? 'Project title is required' : '';
      case 'startDate':
        return value === '' ? 'Start date is required' : '';
      case 'endDate':
        if (value === '') return 'End date is required';
        if (data.startDate && new Date(value) <= new Date(data.startDate)) {
          return 'End date must be after start date';
        }
        return '';
      case 'projectManager':
        return value === '' ? 'Project manager is required' : '';
      case 'riskPlanSponsor':
        return value === '' ? 'Risk plan sponsor is required' : '';
      case 'riskPlanCoordinator':
        return value === '' ? 'Risk plan coordinator is required' : '';
      case 'projectDescription':
        return value.trim() === '' ? 'Project description is required' : '';
      default:
        return '';
    }
  };

  const handleFieldChange = (name: string, value: any) => {
    const error = validateField(name, value);
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));

    // Auto-set approval date when plan is approved
    if (name === 'planApproved' && value === true) {
      updateData({
        ...data,
        [name]: value,
        approvalDate: new Date().toISOString().split('T')[0]
      });
    } else {
      updateData({
        ...data,
        [name]: value
      });
    }
  };

  const isFormValid = () => {
    const requiredFields = ['projectTitle', 'startDate', 'endDate', 'projectManager', 'riskPlanSponsor', 'riskPlanCoordinator', 'projectDescription'];
    return requiredFields.every(field => !errors[field] && data[field as keyof typeof data]);
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-50 to-teal-50 border border-blue-200 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-blue-800 mb-4">
          Project Details
        </h2>
        <p className="text-blue-700 mb-6">
          Define the core project metadata and governance structure for your risk management initiative.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Basic Information */}
        <div className="space-y-6">
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Basic Information
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Project Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={data.projectTitle}
                  onChange={(e) => handleFieldChange('projectTitle', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.projectTitle ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="Enter project title"
                />
                {errors.projectTitle && (
                  <p className="mt-1 text-sm text-red-600">{errors.projectTitle}</p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Start Date <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      value={data.startDate}
                      onChange={(e) => handleFieldChange('startDate', e.target.value)}
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.startDate ? 'border-red-300' : 'border-gray-300'
                      }`}
                    />
                    <CalendarIcon className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                  </div>
                  {errors.startDate && (
                    <p className="mt-1 text-sm text-red-600">{errors.startDate}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    End Date <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      value={data.endDate}
                      onChange={(e) => handleFieldChange('endDate', e.target.value)}
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.endDate ? 'border-red-300' : 'border-gray-300'
                      }`}
                    />
                    <CalendarIcon className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                  </div>
                  {errors.endDate && (
                    <p className="mt-1 text-sm text-red-600">{errors.endDate}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Project Status
                </label>
                <select
                  value={data.projectStatus}
                  onChange={(e) => handleFieldChange('projectStatus', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="New">New</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>
            </div>
          </div>

          {/* Project Description */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Project Description
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={data.projectDescription}
                  onChange={(e) => handleFieldChange('projectDescription', e.target.value)}
                  rows={4}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.projectDescription ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="Describe the project scope and objectives"
                />
                {errors.projectDescription && (
                  <p className="mt-1 text-sm text-red-600">{errors.projectDescription}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Why is the project needed?
                </label>
                <textarea
                  value={data.whyNeeded}
                  onChange={(e) => handleFieldChange('whyNeeded', e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Explain the business need and drivers"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Objectives and Measurable Outcomes
                </label>
                <textarea
                  value={data.objectives}
                  onChange={(e) => handleFieldChange('objectives', e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Define specific, measurable objectives"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Governance & Approval */}
        <div className="space-y-6">
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Governance & Roles
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Project Manager <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select
                    value={data.projectManager}
                    onChange={(e) => handleFieldChange('projectManager', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.projectManager ? 'border-red-300' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Select Project Manager</option>
                    {projectManagers.map(manager => (
                      <option key={manager} value={manager}>{manager}</option>
                    ))}
                  </select>
                  <UserIcon className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
                {errors.projectManager && (
                  <p className="mt-1 text-sm text-red-600">{errors.projectManager}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Risk Plan Sponsor <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select
                    value={data.riskPlanSponsor}
                    onChange={(e) => handleFieldChange('riskPlanSponsor', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.riskPlanSponsor ? 'border-red-300' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Select Risk Plan Sponsor</option>
                    {sponsors.map(sponsor => (
                      <option key={sponsor} value={sponsor}>{sponsor}</option>
                    ))}
                  </select>
                  <UserIcon className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
                {errors.riskPlanSponsor && (
                  <p className="mt-1 text-sm text-red-600">{errors.riskPlanSponsor}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Risk Plan Coordinator <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select
                    value={data.riskPlanCoordinator}
                    onChange={(e) => handleFieldChange('riskPlanCoordinator', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.riskPlanCoordinator ? 'border-red-300' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Select Risk Plan Coordinator</option>
                    {coordinators.map(coordinator => (
                      <option key={coordinator} value={coordinator}>{coordinator}</option>
                    ))}
                  </select>
                  <UserIcon className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
                {errors.riskPlanCoordinator && (
                  <p className="mt-1 text-sm text-red-600">{errors.riskPlanCoordinator}</p>
                )}
              </div>
            </div>
          </div>

          {/* Approval Section */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Plan Approval
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={data.planApproved}
                    onChange={(e) => handleFieldChange('planApproved', e.target.checked)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm font-medium text-gray-700">
                    Plan Approved?
                  </span>
                </label>
                {data.planApproved ? (
                  <CheckCircleIcon className="h-5 w-5 text-green-500" />
                ) : (
                  <XCircleIcon className="h-5 w-5 text-gray-400" />
                )}
              </div>

              {data.planApproved && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Approval Date
                  </label>
                  <input
                    type="date"
                    value={data.approvalDate}
                    onChange={(e) => handleFieldChange('approvalDate', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Form Status */}
          <div className={`border rounded-lg p-4 ${
            isFormValid() ? 'bg-green-50 border-green-200' : 'bg-yellow-50 border-yellow-200'
          }`}>
            <div className="flex items-center">
              {isFormValid() ? (
                <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
              ) : (
                <InformationCircleIcon className="h-5 w-5 text-yellow-500 mr-2" />
              )}
              <span className={`text-sm font-medium ${
                isFormValid() ? 'text-green-800' : 'text-yellow-800'
              }`}>
                {isFormValid() ? 'All required fields completed' : 'Please complete all required fields'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PPDetails; 