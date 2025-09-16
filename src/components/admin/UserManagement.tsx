import React, { useState } from 'react';
import { UserRole } from '../../types';
import { Settings, Plus, Edit, Lock, Shield } from 'lucide-react';

const UserManagement: React.FC = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingUser, setEditingUser] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    employee_id: '',
    role: 'employee' as UserRole
  });

  // Mock user data - in real app, this would come from context/API
  const users = [
    { id: '1', username: 'admin', employee_id: 'EMP001', role: 'admin' as UserRole, created_at: '2024-01-01', last_login: '2024-12-20' },
    { id: '2', username: 'hr.manager', employee_id: 'EMP002', role: 'hr' as UserRole, created_at: '2024-01-15', last_login: '2024-12-19' },
    { id: '3', username: 'line.manager', employee_id: 'EMP003', role: 'line_manager' as UserRole, created_at: '2024-02-01', last_login: '2024-12-18' },
    { id: '4', username: 'employee', employee_id: 'EMP004', role: 'employee' as UserRole, created_at: '2024-02-15', last_login: '2024-12-17' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In real app, this would call an API or context method
    console.log('Creating/updating user:', formData);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      username: '',
      password: '',
      employee_id: '',
      role: 'employee'
    });
    setShowAddForm(false);
    setEditingUser(null);
  };

  const handleEdit = (user: any) => {
    setFormData({
      username: user.username,
      password: '',
      employee_id: user.employee_id,
      role: user.role
    });
    setEditingUser(user.id);
    setShowAddForm(true);
  };

  const handleResetPassword = (userId: string, username: string) => {
    if (window.confirm(`Reset password for user ${username}?`)) {
      // In real app, this would call an API
      console.log('Resetting password for user:', userId);
    }
  };

  const getRoleColor = (role: UserRole) => {
    switch (role) {
      case 'admin':
        return 'bg-red-100 text-red-800';
      case 'hr':
        return 'bg-purple-100 text-purple-800';
      case 'line_manager':
        return 'bg-blue-100 text-blue-800';
      case 'employee':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getRoleIcon = (role: UserRole) => {
    switch (role) {
      case 'admin':
        return <Shield className="w-4 h-4" />;
      case 'hr':
        return <Settings className="w-4 h-4" />;
      case 'line_manager':
        return <Settings className="w-4 h-4" />;
      case 'employee':
        return <Settings className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Settings className="w-8 h-8 text-purple-600" />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
            <p className="text-gray-600">Manage user accounts and access permissions</p>
          </div>
        </div>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add User
        </button>
      </div>

      {/* Add/Edit Form */}
      {showAddForm && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {editingUser ? 'Edit User' : 'Add New User'}
          </h3>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Username *
              </label>
              <input
                type="text"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {editingUser ? 'New Password' : 'Password *'}
              </label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                required={!editingUser}
                placeholder={editingUser ? 'Leave blank to keep current password' : ''}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Employee ID *
              </label>
              <input
                type="text"
                value={formData.employee_id}
                onChange={(e) => setFormData({ ...formData, employee_id: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Role *
              </label>
              <select
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value as UserRole })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                required
              >
                <option value="employee">Employee</option>
                <option value="line_manager">Line Manager</option>
                <option value="hr">HR Manager</option>
                <option value="admin">Administrator</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h4 className="font-medium text-yellow-800 mb-2">Role Permissions:</h4>
                <ul className="text-sm text-yellow-700 space-y-1">
                  {formData.role === 'admin' && (
                    <>
                      <li>• Full system administration access</li>
                      <li>• Manage all users, employees, and departments</li>
                      <li>• Configure system settings and workflows</li>
                    </>
                  )}
                  {formData.role === 'hr' && (
                    <>
                      <li>• View and manage all employee leave requests</li>
                      <li>• Generate reports and analytics</li>
                      <li>• Manage company holidays</li>
                    </>
                  )}
                  {formData.role === 'line_manager' && (
                    <>
                      <li>• Approve/reject team member leave requests</li>
                      <li>• View team leave schedules</li>
                      <li>• First-level approval authority</li>
                    </>
                  )}
                  {formData.role === 'employee' && (
                    <>
                      <li>• Submit and manage personal leave requests</li>
                      <li>• View personal leave balance and history</li>
                      <li>• Access personal profile and calendar</li>
                    </>
                  )}
                </ul>
              </div>
            </div>

            <div className="md:col-span-2 flex gap-3">
              <button
                type="submit"
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
              >
                {editingUser ? 'Update User' : 'Create User'}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-700 rounded-lg transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Users List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-3 px-6 font-medium text-gray-600">User</th>
                <th className="text-left py-3 px-6 font-medium text-gray-600">Employee ID</th>
                <th className="text-left py-3 px-6 font-medium text-gray-600">Role</th>
                <th className="text-left py-3 px-6 font-medium text-gray-600">Created</th>
                <th className="text-left py-3 px-6 font-medium text-gray-600">Last Login</th>
                <th className="text-left py-3 px-6 font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                        {getRoleIcon(user.role)}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{user.username}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-gray-900">{user.employee_id}</td>
                  <td className="py-4 px-6">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${getRoleColor(user.role)}`}>
                      {user.role.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-gray-600 text-sm">
                    {new Date(user.created_at).toLocaleDateString()}
                  </td>
                  <td className="py-4 px-6 text-gray-600 text-sm">
                    {new Date(user.last_login).toLocaleDateString()}
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleEdit(user)}
                        className="flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm font-medium"
                      >
                        <Edit className="w-4 h-4" />
                        Edit
                      </button>
                      <button
                        onClick={() => handleResetPassword(user.id, user.username)}
                        className="flex items-center gap-1 text-orange-600 hover:text-orange-800 text-sm font-medium"
                      >
                        <Lock className="w-4 h-4" />
                        Reset
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Role Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {['admin', 'hr', 'line_manager', 'employee'].map((role) => {
          const count = users.filter(u => u.role === role).length;
          return (
            <div key={role} className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  role === 'admin' ? 'bg-red-100' :
                  role === 'hr' ? 'bg-purple-100' :
                  role === 'line_manager' ? 'bg-blue-100' : 'bg-green-100'
                }`}>
                  {getRoleIcon(role as UserRole)}
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{count}</p>
                  <p className="text-sm text-gray-600 capitalize">{role.replace('_', ' ')}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UserManagement;