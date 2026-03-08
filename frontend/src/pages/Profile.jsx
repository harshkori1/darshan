import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Phone, Shield, Building2, LogOut, Edit2, Save, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
import Footer from '../componenet/Footer';

const Profile = () => {
  const { user, role, logout, updateUser, getToken } = useAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: ''
  });
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        phone: user.phone || ''
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const token = getToken();
      const response = await api.put('/profile', formData, {
        headers: { Authorization: `Bearer ${token}` }
      });

      updateUser(response.data.user);
      setMessage({ type: 'success', text: 'Profile updated successfully!' });
      setIsEditing(false);
    } catch (err) {
      setMessage({ type: 'error', text: err.response?.data?.message || 'Failed to update profile' });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getRoleIcon = () => {
    switch (role) {
      case 'admin':
        return <Shield className="w-8 h-8 text-purple-600" />;
      case 'organizer':
        return <Building2 className="w-8 h-8 text-orange-600" />;
      default:
        return <User className="w-8 h-8 text-green-600" />;
    }
  };

  const getRoleLabel = () => {
    switch (role) {
      case 'admin':
        return 'Administrator';
      case 'organizer':
        return 'Organizer';
      default:
        return 'User';
    }
  };

  const getRoleColor = () => {
    switch (role) {
      case 'admin':
        return 'bg-purple-100 text-purple-800';
      case 'organizer':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-green-100 text-green-800';
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Profile Header Card */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-6">
          <div className="bg-gradient-to-r from-orange-500 to-red-500 h-32"></div>
          <div className="px-8 pb-8">
            <div className="flex flex-col items-center -mt-16">
              <div className="w-24 h-24 bg-white rounded-full shadow-lg flex items-center justify-center mb-4">
                {getRoleIcon()}
              </div>
              <h1 className="text-2xl font-bold text-gray-800">{user?.name || 'User'}</h1>
              <span className={`px-4 py-1 rounded-full text-sm font-medium mt-2 ${getRoleColor()}`}>
                {getRoleLabel()}
              </span>
              <p className="text-gray-500 mt-2">ID: {user?.userId || 'N/A'}</p>
            </div>
          </div>
        </div>

        {/* Profile Details Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-800">Profile Information</h2>
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition"
              >
                <Edit2 size={16} />
                Edit Profile
              </button>
            ) : (
              <button
                onClick={() => setIsEditing(false)}
                className="flex items-center gap-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
              >
                <X size={16} />
                Cancel
              </button>
            )}
          </div>

          {message.text && (
            <div className={`mb-6 p-4 rounded-lg ${
              message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
            }`}>
              {message.text}
            </div>
          )}

          {isEditing ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                <div className="flex items-center space-x-2 border border-gray-300 rounded-lg px-4 py-2">
                  <User size={18} className="text-gray-500" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                <div className="flex items-center space-x-2 border border-gray-300 rounded-lg px-4 py-2">
                  <Phone size={18} className="text-gray-500" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition disabled:opacity-50"
              >
                {loading ? 'Saving...' : (
                  <>
                    <Save size={18} />
                    Save Changes
                  </>
                )}
              </button>
            </form>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                <User className="text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Full Name</p>
                  <p className="font-semibold text-gray-800">{user?.name || 'Not provided'}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                <Mail className="text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Email Address</p>
                  <p className="font-semibold text-gray-800">{user?.email || 'Not provided'}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                <Phone className="text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Phone Number</p>
                  <p className="font-semibold text-gray-800">{user?.phone || 'Not provided'}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                {getRoleIcon()}
                <div>
                  <p className="text-sm text-gray-500">Account Type</p>
                  <p className="font-semibold text-gray-800">{getRoleLabel()}</p>
                </div>
              </div>
            </div>
          )}

          {/* Logout Button */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 bg-red-500 text-white py-3 rounded-lg font-semibold hover:bg-red-600 transition"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
};

export default Profile;

