// src/pages/ProfilePage.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiEdit2, FiSave } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import { authAPI } from '../api/authApi';
import { Button } from '../components/Button';
import { Input } from '../components/Input';

export const ProfilePage: React.FC = () => {
  const { user, logout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
  });

  const navigate = useNavigate();

  const handleSave = async () => {
    setLoading(true);
    try {
      await authAPI.updateProfile(formData);
      
      // Update local storage
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const updatedUser = { ...JSON.parse(storedUser), ...formData };
        localStorage.setItem('user', JSON.stringify(updatedUser));
      }

      toast.success('Profile updated successfully');
      setIsEditing(false);
    } catch (error) {
        console.log(error);
      toast.error('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white  border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/dashboard')}
                className="p-2 hover:bg-gray-100 rounded-lg transition"
              >
                <FiArrowLeft size={20} />
              </button>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Profile
              </h1>
            </div>

            
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white  rounded-2xl shadow-xl border border-gray-200  p-8">
          <div className="space-y-8">
            {/* Avatar Section */}
            <div className="text-center space-y-4">
              <div className="w-24 h-24 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center text-white text-3xl font-bold mx-auto">
                {formData.firstName.charAt(0)}
                {formData.lastName.charAt(0)}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 ">
                  {formData.firstName} {formData.lastName}
                </h2>
                <p className="text-gray-600 ">{formData.email}</p>
              </div>
            </div>

            <div className="border-t border-gray-200 " />

            {/* Form Section */}
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-gray-900 ">
                  Personal Information
                </h3>
                <Button
                  variant="ghost"
                  onClick={() => setIsEditing(!isEditing)}
                  className="text-purple-600"
                >
                  <FiEdit2 /> {isEditing ? 'Cancel' : 'Edit'}
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  type="text"
                  name="firstName"
                  label="First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                  disabled={!isEditing}
                />

                <Input
                  type="text"
                  name="lastName"
                  label="Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>

              <Input
                type="email"
                name="email"
                label="Email Address"
                value={formData.email}
                onChange={handleChange}
                disabled={!isEditing}
              />

              {isEditing && (
                <Button
                  variant="gradient"
                  size="lg"
                  onClick={handleSave}
                  disabled={loading}
                  className="w-full"
                >
                  {loading ? 'Saving...' : (
                    <>
                      <FiSave /> Save Changes
                    </>
                  )}
                </Button>
              )}
            </div>

            <div className="border-t border-gray-200" />

            {/* Danger Zone */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-gray-900">
                Account Actions
              </h3>
              <Button
                variant="outline"
                onClick={logout}
                className="w-full border-red-600 text-red-600 hover:bg-red-50"
              >
                <FiArrowLeft /> Logout
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};