import React, { useState } from 'react';
import { 
  PlusIcon, 
  PencilIcon, 
  TrashIcon, 
  CalendarIcon,
  UsersIcon,
  UserGroupIcon
} from '@heroicons/react/24/outline';

interface WorkingGroup {
  id: string;
  groupName: string;
  members: string[];
  meetingDates: string[];
}

interface PPWorkingGroupsProps {
  data: WorkingGroup[];
  updateData: (data: WorkingGroup[]) => void;
  projectData: any;
}

const PPWorkingGroups: React.FC<PPWorkingGroupsProps> = ({ data, updateData }) => {
  const [isAddingGroup, setIsAddingGroup] = useState(false);
  const [editingGroup, setEditingGroup] = useState<WorkingGroup | null>(null);
  const [newGroup, setNewGroup] = useState<Partial<WorkingGroup>>({
    groupName: '',
    members: [],
    meetingDates: []
  });

  // Mock data for dropdowns - in real app, this would come from API
  const availableMembers = [
    'John Smith',
    'Sarah Johnson',
    'Michael Brown',
    'Emily Davis',
    'David Wilson',
    'Lisa Anderson',
    'Robert Taylor',
    'Jennifer Martinez',
    'Thomas Garcia',
    'Amanda Rodriguez',
    'Christopher Lee',
    'Michelle White'
  ];

  const handleAddGroup = () => {
    if (!newGroup.groupName || newGroup.members?.length === 0) {
      return;
    }

    const group: WorkingGroup = {
      id: Date.now().toString(),
      groupName: newGroup.groupName,
      members: newGroup.members || [],
      meetingDates: newGroup.meetingDates || []
    };

    updateData([...data, group]);
    setNewGroup({
      groupName: '',
      members: [],
      meetingDates: []
    });
    setIsAddingGroup(false);
  };

  const handleUpdateGroup = (groupId: string, updates: Partial<WorkingGroup>) => {
    const updatedGroups = data.map(group => 
      group.id === groupId ? { ...group, ...updates } : group
    );
    updateData(updatedGroups);
    setEditingGroup(null);
  };

  const handleDeleteGroup = (groupId: string) => {
    const updatedGroups = data.filter(group => group.id !== groupId);
    updateData(updatedGroups);
  };

  const handleMemberToggle = (member: string, isSelected: boolean, group: WorkingGroup) => {
    const updatedMembers = isSelected
      ? [...group.members, member]
      : group.members.filter(m => m !== member);
    
    if (editingGroup?.id === group.id) {
      setEditingGroup({ ...group, members: updatedMembers });
    } else {
      handleUpdateGroup(group.id, { members: updatedMembers });
    }
  };

  const handleAddMeetingDate = (groupId: string, date: string) => {
    const group = data.find(g => g.id === groupId);
    if (group && date) {
      const updatedDates = [...group.meetingDates, date];
      handleUpdateGroup(groupId, { meetingDates: updatedDates });
    }
  };

  const handleRemoveMeetingDate = (groupId: string, dateToRemove: string) => {
    const group = data.find(g => g.id === groupId);
    if (group) {
      const updatedDates = group.meetingDates.filter(date => date !== dateToRemove);
      handleUpdateGroup(groupId, { meetingDates: updatedDates });
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-orange-50 to-yellow-50 border border-orange-200 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-orange-800 mb-4">
          Working Groups
        </h2>
        <p className="text-orange-700 mb-6">
          Define stakeholder working groups and schedule meeting dates for collaborative risk management planning.
        </p>
      </div>

      {/* Add Group Button */}
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">
          Working Groups ({data.length})
        </h3>
        <button
          onClick={() => setIsAddingGroup(true)}
          className="flex items-center px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
        >
          <PlusIcon className="h-4 w-4 mr-2" />
          Add Working Group
        </button>
      </div>

      {/* Add Group Form */}
      {isAddingGroup && (
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h4 className="text-lg font-medium text-gray-900 mb-4">Add New Working Group</h4>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Group Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={newGroup.groupName}
                onChange={(e) => setNewGroup({ ...newGroup, groupName: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Enter group name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Members <span className="text-red-500">*</span>
              </label>
              <div className="border border-gray-300 rounded-md p-3 max-h-48 overflow-y-auto">
                {availableMembers.map(member => (
                  <label key={member} className="flex items-center space-x-2 py-1">
                    <input
                      type="checkbox"
                      checked={newGroup.members?.includes(member) || false}
                      onChange={(e) => {
                        const updatedMembers = e.target.checked
                          ? [...(newGroup.members || []), member]
                          : (newGroup.members || []).filter(m => m !== member);
                        setNewGroup({ ...newGroup, members: updatedMembers });
                      }}
                      className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                    />
                    <span className="text-sm text-gray-700">{member}</span>
                  </label>
                ))}
              </div>
              {newGroup.members && newGroup.members.length > 0 && (
                <p className="mt-2 text-sm text-gray-600">
                  Selected: {newGroup.members.length} member(s)
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Meeting Dates
              </label>
              <div className="flex space-x-2">
                <input
                  type="date"
                  id="newMeetingDate"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <button
                  onClick={() => {
                    const dateInput = document.getElementById('newMeetingDate') as HTMLInputElement;
                    if (dateInput.value) {
                      setNewGroup({
                        ...newGroup,
                        meetingDates: [...(newGroup.meetingDates || []), dateInput.value]
                      });
                      dateInput.value = '';
                    }
                  }}
                  className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                >
                  Add Date
                </button>
              </div>
              {newGroup.meetingDates && newGroup.meetingDates.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {newGroup.meetingDates.map((date, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800"
                    >
                      {new Date(date).toLocaleDateString()}
                      <button
                        onClick={() => setNewGroup({
                          ...newGroup,
                          meetingDates: newGroup.meetingDates?.filter((_, i) => i !== index)
                        })}
                        className="ml-1 text-orange-600 hover:text-orange-800"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-end space-x-3 mt-4">
            <button
              onClick={() => {
                setIsAddingGroup(false);
                setNewGroup({
                  groupName: '',
                  members: [],
                  meetingDates: []
                });
              }}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Cancel
            </button>
            <button
              onClick={handleAddGroup}
              disabled={!newGroup.groupName || !newGroup.members || newGroup.members.length === 0}
              className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Add Group
            </button>
          </div>
        </div>
      )}

      {/* Groups List */}
      <div className="space-y-4">
        {data.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-gray-400 mb-4">
              <UserGroupIcon className="h-12 w-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No working groups yet</h3>
            <p className="text-gray-500">Get started by adding your first working group.</p>
          </div>
        ) : (
          data.map((group) => (
            <div key={group.id} className="bg-white border border-gray-200 rounded-lg p-6">
              {editingGroup?.id === group.id ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Group Name
                    </label>
                    <input
                      type="text"
                      value={editingGroup.groupName}
                      onChange={(e) => setEditingGroup({ ...editingGroup, groupName: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Members
                    </label>
                    <div className="border border-gray-300 rounded-md p-3 max-h-48 overflow-y-auto">
                      {availableMembers.map(member => (
                        <label key={member} className="flex items-center space-x-2 py-1">
                          <input
                            type="checkbox"
                            checked={editingGroup.members.includes(member)}
                            onChange={(e) => handleMemberToggle(member, e.target.checked, editingGroup)}
                            className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                          />
                          <span className="text-sm text-gray-700">{member}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Meeting Dates
                    </label>
                    <div className="flex space-x-2">
                      <input
                        type="date"
                        id={`editMeetingDate-${group.id}`}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                      <button
                        onClick={() => {
                          const dateInput = document.getElementById(`editMeetingDate-${group.id}`) as HTMLInputElement;
                          if (dateInput.value) {
                            handleAddMeetingDate(group.id, dateInput.value);
                            dateInput.value = '';
                          }
                        }}
                        className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                      >
                        Add Date
                      </button>
                    </div>
                    {editingGroup.meetingDates.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-2">
                        {editingGroup.meetingDates.map((date, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800"
                          >
                            {new Date(date).toLocaleDateString()}
                            <button
                              onClick={() => handleRemoveMeetingDate(group.id, date)}
                              className="ml-1 text-orange-600 hover:text-orange-800"
                            >
                              ×
                            </button>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="flex justify-end space-x-3">
                    <button
                      onClick={() => setEditingGroup(null)}
                      className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleUpdateGroup(group.id, editingGroup)}
                      className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-3">
                        <UserGroupIcon className="h-5 w-5 text-orange-600" />
                        <h3 className="text-lg font-medium text-gray-900">
                          {group.groupName}
                        </h3>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                          {group.members.length} member(s)
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="text-sm font-medium text-gray-700 mb-2">Members</h4>
                          <div className="space-y-1">
                            {group.members.map(member => (
                              <div key={member} className="flex items-center text-sm text-gray-600">
                                <UsersIcon className="h-4 w-4 mr-2 text-gray-400" />
                                {member}
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="text-sm font-medium text-gray-700 mb-2">Meeting Dates</h4>
                          {group.meetingDates.length > 0 ? (
                            <div className="space-y-1">
                              {group.meetingDates.map((date, index) => (
                                <div key={index} className="flex items-center text-sm text-gray-600">
                                  <CalendarIcon className="h-4 w-4 mr-2 text-gray-400" />
                                  {new Date(date).toLocaleDateString()}
                                </div>
                              ))}
                            </div>
                          ) : (
                            <p className="text-sm text-gray-500 italic">No meeting dates scheduled</p>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2 ml-4">
                      <button
                        onClick={() => setEditingGroup(group)}
                        className="p-2 text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                      >
                        <PencilIcon className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteGroup(group.id)}
                        className="p-2 text-gray-400 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                      >
                        <TrashIcon className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Summary */}
      {data.length > 0 && (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-gray-900">{data.length}</div>
              <div className="text-sm text-gray-600">Working Groups</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-orange-600">
                {data.reduce((total, group) => total + group.members.length, 0)}
              </div>
              <div className="text-sm text-gray-600">Total Members</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-600">
                {data.reduce((total, group) => total + group.meetingDates.length, 0)}
              </div>
              <div className="text-sm text-gray-600">Scheduled Meetings</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PPWorkingGroups; 