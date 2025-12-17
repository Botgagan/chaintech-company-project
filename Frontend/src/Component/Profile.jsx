import React, { useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { user, updateUser, logout } = useAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('');

  useEffect(() => {
    if (!user) {
      navigate('/');
    } else {
      setName(user.name);
    }
  }, [user, navigate]);

  const handleSave = () => {
    updateUser({ name });
    setIsEditing(false);
  };

  if (!user) return null;

  return (
    <div className="min-h-screen p-8 flex justify-center">
      <div className="w-full max-w-2xl">
        
        <div className="bg-white rounded-xl shadow-md p-6 mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
            <p className="text-gray-500">Manage your account information</p>
          </div>
          <button 
            onClick={() => { logout(); navigate('/'); }} 
            className="px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 font-medium transition"
          >
            Logout
          </button>
        </div>

        
        <div className="bg-white rounded-xl shadow-md p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-700">Profile Details</h2>
            {!isEditing && (
              <button 
                onClick={() => setIsEditing(true)} 
                className="text-indigo-600 hover:text-indigo-700 font-medium"
              >
                Edit Profile
              </button>
            )}
          </div>

          <div className="space-y-6">
        
            <div>
              <label className="block text-sm font-medium text-gray-500 uppercase tracking-wider mb-1">Email</label>
              <div className="text-gray-900 font-medium text-lg border-b pb-2 border-gray-100">
                {user.email}
              </div>
            </div>

        
            <div>
              <label className="block text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">Full Name</label>
              
              {isEditing ? (
                <div className="flex gap-3">
                  <input 
                    value={name} 
                    onChange={(e) => setName(e.target.value)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                  />
                  <button 
                    onClick={handleSave}
                    className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                  >
                    Save
                  </button>
                  <button 
                    onClick={() => setIsEditing(false)}
                    className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <div className="text-gray-900 font-medium text-lg border-b pb-2 border-gray-100">
                  {user.name}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;