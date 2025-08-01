import React, { useState } from 'react';
import { 
  PlusIcon, 
  PencilIcon, 
  TrashIcon, 
  CalendarIcon,
  UserIcon,
  CheckCircleIcon,
  ClockIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';

interface Task {
  id: string;
  taskNumber: number;
  description: string;
  assignedTo: string;
  dueDate: string;
  status: 'New' | 'In Progress' | 'Completed';
  notes: string;
}

interface PPActionPlanProps {
  data: Task[];
  updateData: (data: Task[]) => void;
  projectData: any;
}

const PPActionPlan: React.FC<PPActionPlanProps> = ({ data, updateData }) => {
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [newTask, setNewTask] = useState<Partial<Task>>({
    description: '',
    assignedTo: '',
    dueDate: '',
    status: 'New',
    notes: ''
  });

  // Mock data for dropdowns - in real app, this would come from API
  const teamMembers = [
    'John Smith',
    'Sarah Johnson',
    'Michael Brown',
    'Emily Davis',
    'David Wilson',
    'Lisa Anderson',
    'Robert Taylor',
    'Jennifer Martinez'
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'In Progress':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'New':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Completed':
        return <CheckCircleIcon className="h-4 w-4 text-green-600" />;
      case 'In Progress':
        return <ClockIcon className="h-4 w-4 text-blue-600" />;
      case 'New':
        return <ExclamationTriangleIcon className="h-4 w-4 text-gray-600" />;
      default:
        return <ExclamationTriangleIcon className="h-4 w-4 text-gray-600" />;
    }
  };

  const handleAddTask = () => {
    if (!newTask.description || !newTask.assignedTo) {
      return;
    }

    const task: Task = {
      id: Date.now().toString(),
      taskNumber: data.length + 1,
      description: newTask.description,
      assignedTo: newTask.assignedTo,
      dueDate: newTask.dueDate || '',
      status: newTask.status || 'New',
      notes: newTask.notes || ''
    };

    updateData([...data, task]);
    setNewTask({
      description: '',
      assignedTo: '',
      dueDate: '',
      status: 'New',
      notes: ''
    });
    setIsAddingTask(false);
  };

  const handleUpdateTask = (taskId: string, updates: Partial<Task>) => {
    const updatedTasks = data.map(task => 
      task.id === taskId ? { ...task, ...updates } : task
    );
    updateData(updatedTasks);
    setEditingTask(null);
  };

  const handleDeleteTask = (taskId: string) => {
    const updatedTasks = data.filter(task => task.id !== taskId);
    // Renumber remaining tasks
    const renumberedTasks = updatedTasks.map((task, index) => ({
      ...task,
      taskNumber: index + 1
    }));
    updateData(renumberedTasks);
  };

  const isOverdue = (dueDate: string) => {
    if (!dueDate) return false;
    return new Date(dueDate) < new Date();
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-green-50 to-teal-50 border border-green-200 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-green-800 mb-4">
          Action Plan
        </h2>
        <p className="text-green-700 mb-6">
          Define tasks, assign responsibilities, and track progress for your risk management project.
        </p>
      </div>

      {/* Add Task Button */}
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">
          Tasks ({data.length})
        </h3>
        <button
          onClick={() => setIsAddingTask(true)}
          className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          <PlusIcon className="h-4 w-4 mr-2" />
          Add Task
        </button>
      </div>

      {/* Add Task Form */}
      {isAddingTask && (
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h4 className="text-lg font-medium text-gray-900 mb-4">Add New Task</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Task Description <span className="text-red-500">*</span>
              </label>
              <textarea
                value={newTask.description}
                onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Describe the task to be completed"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Assigned To <span className="text-red-500">*</span>
              </label>
              <select
                value={newTask.assignedTo}
                onChange={(e) => setNewTask({ ...newTask, assignedTo: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="">Select Team Member</option>
                {teamMembers.map(member => (
                  <option key={member} value={member}>{member}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Due Date
              </label>
              <input
                type="date"
                value={newTask.dueDate}
                onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                value={newTask.status}
                onChange={(e) => setNewTask({ ...newTask, status: e.target.value as any })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="New">New</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Notes
              </label>
              <textarea
                value={newTask.notes}
                onChange={(e) => setNewTask({ ...newTask, notes: e.target.value })}
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Additional notes or comments"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-3 mt-4">
            <button
              onClick={() => {
                setIsAddingTask(false);
                setNewTask({
                  description: '',
                  assignedTo: '',
                  dueDate: '',
                  status: 'New',
                  notes: ''
                });
              }}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Cancel
            </button>
            <button
              onClick={handleAddTask}
              disabled={!newTask.description || !newTask.assignedTo}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Add Task
            </button>
          </div>
        </div>
      )}

      {/* Tasks List */}
      <div className="space-y-4">
        {data.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-gray-400 mb-4">
              <PlusIcon className="h-12 w-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No tasks yet</h3>
            <p className="text-gray-500">Get started by adding your first task.</p>
          </div>
        ) : (
          data.map((task) => (
            <div key={task.id} className="bg-white border border-gray-200 rounded-lg p-6">
              {editingTask?.id === task.id ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Task Description
                      </label>
                      <textarea
                        value={editingTask.description}
                        onChange={(e) => setEditingTask({ ...editingTask, description: e.target.value })}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Assigned To
                      </label>
                      <select
                        value={editingTask.assignedTo}
                        onChange={(e) => setEditingTask({ ...editingTask, assignedTo: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      >
                        {teamMembers.map(member => (
                          <option key={member} value={member}>{member}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Due Date
                      </label>
                      <input
                        type="date"
                        value={editingTask.dueDate}
                        onChange={(e) => setEditingTask({ ...editingTask, dueDate: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Status
                      </label>
                      <select
                        value={editingTask.status}
                        onChange={(e) => setEditingTask({ ...editingTask, status: e.target.value as any })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      >
                        <option value="New">New</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                      </select>
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Notes
                      </label>
                      <textarea
                        value={editingTask.notes}
                        onChange={(e) => setEditingTask({ ...editingTask, notes: e.target.value })}
                        rows={2}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end space-x-3">
                    <button
                      onClick={() => setEditingTask(null)}
                      className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleUpdateTask(task.id, editingTask)}
                      className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          Task #{task.taskNumber}
                        </span>
                        <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
                          {getStatusIcon(task.status)}
                          <span className="ml-1">{task.status}</span>
                        </div>
                        {isOverdue(task.dueDate) && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                            Overdue
                          </span>
                        )}
                      </div>
                      
                      <h3 className="text-lg font-medium text-gray-900 mb-2">
                        {task.description}
                      </h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                        <div className="flex items-center">
                          <UserIcon className="h-4 w-4 mr-2" />
                          <span>{task.assignedTo}</span>
                        </div>
                        {task.dueDate && (
                          <div className="flex items-center">
                            <CalendarIcon className="h-4 w-4 mr-2" />
                            <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
                          </div>
                        )}
                        {task.notes && (
                          <div className="md:col-span-3">
                            <p className="text-gray-500 italic">"{task.notes}"</p>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex space-x-2 ml-4">
                      <button
                        onClick={() => setEditingTask(task)}
                        className="p-2 text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                      >
                        <PencilIcon className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteTask(task.id)}
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
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-gray-900">{data.length}</div>
              <div className="text-sm text-gray-600">Total Tasks</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">
                {data.filter(t => t.status === 'Completed').length}
              </div>
              <div className="text-sm text-gray-600">Completed</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-600">
                {data.filter(t => t.status === 'In Progress').length}
              </div>
              <div className="text-sm text-gray-600">In Progress</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-600">
                {data.filter(t => t.status === 'New').length}
              </div>
              <div className="text-sm text-gray-600">New</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PPActionPlan; 