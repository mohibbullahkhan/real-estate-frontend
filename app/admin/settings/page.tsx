'use client';

import { useState } from 'react';
import api from '@/lib/api';
import { handleApiError } from '@/lib/utils';
import { showSuccess, showError } from '@/lib/alerts';

export default function SettingsPage() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [isLoading, setIsLoading] = useState(false);
  const [currentPasswordError, setCurrentPasswordError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPasswordError('');
    
    if (newPassword !== confirmPassword) {
      await showError('Passwords do not match', 'Your new password and confirmation do not match.');
      return;
    }
    if (newPassword.length < 8 || !/\d/.test(newPassword)) {
      await showError('Weak password', 'Password must be at least 8 characters long and contain at least one number.');
      return;
    }

    if (isLoading) return;
    setIsLoading(true);

    try {
      await api.post('/api/auth/change-password', { currentPassword, newPassword });
      await showSuccess('Password updated successfully', 'Your new password is active immediately.');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err: any) {
      const msg = handleApiError(err);
      if (err?.response?.status === 401) {
        setCurrentPasswordError(msg || 'Current password is incorrect');
        await showError('Incorrect password', 'The current password you entered is wrong. Please try again.');
      } else {
        await showError('Failed to update password', msg || 'An unexpected error occurred. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Settings</h1>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Change Password</h2>
          <p className="text-sm text-gray-500 mt-1">Update your password to keep your account secure.</p>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
              <input 
                type="password" 
                required 
                value={currentPassword}
                onChange={(e) => {
                  setCurrentPassword(e.target.value);
                  setCurrentPasswordError('');
                }}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-black focus:border-black ${currentPasswordError ? 'border-red-500' : 'border-gray-300'}`} 
              />
              {currentPasswordError && (
                <p className="mt-1 text-sm text-red-600">{currentPasswordError}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
              <input 
                type="password" 
                required 
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-black focus:border-black" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
              <input 
                type="password" 
                required 
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-black focus:border-black" 
              />
            </div>
          </div>
          
          <div className="flex justify-end">
            <button 
              type="submit" 
              disabled={isLoading}
              className="px-5 py-2.5 text-sm font-medium text-white bg-black hover:bg-gray-800 rounded-lg transition-colors disabled:opacity-70"
            >
              {isLoading ? 'Updating...' : 'Update Password'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
