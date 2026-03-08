import React, { useState } from 'react';
import { BarChart3, Users, Building2, DollarSign, TrendingUp, LogOut, Edit, Trash2, Eye, Search, Plus } from 'lucide-react';
import Footer from '../../componenet/Footer';

const AdminHome = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');

  const stats = {
    totalUsers: 1250,
    totalTemples: 156,
    totalBookings: 5420,
    totalRevenue: '₹5,42,000',
    totalDonations: '₹8,50,000',
    newUsersThisMonth: 145,
    newBookingsThisMonth: 680,
    pendingApprovals: 12,
  };

  const users = [
    {
      id: 1,
      name: 'Raj Kumar',
      email: 'raj@example.com',
      phone: '9876543210',
      role: 'user',
      bookings: 5,
      status: 'active',
      joinedDate: '2026-01-15',
    },
    {
      id: 2,
      name: 'Priya Singh',
      email: 'priya@example.com',
      phone: '9123456789',
      role: 'organizer',
      bookings: 42,
      status: 'active',
      joinedDate: '2025-12-20',
    },
    {
      id: 3,
      name: 'Amit Patel',
      email: 'amit@example.com',
      phone: '8765432109',
      role: 'user',
      bookings: 2,
      status: 'inactive',
      joinedDate: '2026-02-10',
    },
  ];

  const temples = [
    {
      id: 1,
      name: 'Varanasi Kashi Vishwanath',
      location: 'Varanasi, UP',
      organizer: 'Priya Singh',
      rating: 4.8,
      bookings: 450,
      status: 'active',
      revenue: '₹45,000',
    },
    {
      id: 2,
      name: 'Tirupati Balaji',
      location: 'Tirupati, AP',
      organizer: 'Ram Kumar',
      rating: 4.9,
      bookings: 680,
      status: 'active',
      revenue: '₹68,000',
    },
    {
      id: 3,
      name: 'Golden Temple',
      location: 'Amritsar, Punjab',
      organizer: 'Simran Kaur',
      rating: 4.7,
      bookings: 320,
      status: 'pending_approval',
      revenue: '₹32,000',
    },
  ];

  const recentBookings = [
    {
      id: 1,
      bookingId: 'DARSHAN-20260308-1234',
      user: 'Raj Kumar',
      temple: 'Varanasi Kashi Vishwanath',
      amount: '₹100',
      status: 'confirmed',
      date: '2026-03-08',
    },
    {
      id: 2,
      bookingId: 'DARSHAN-20260307-5432',
      user: 'Priya Singh',
      temple: 'Tirupati Balaji',
      amount: '₹200',
      status: 'pending',
      date: '2026-03-07',
    },
    {
      id: 3,
      bookingId: 'DARSHAN-20260306-7890',
      user: 'Amit Patel',
      temple: 'Golden Temple',
      amount: '₹150',
      status: 'confirmed',
      date: '2026-03-06',
    },
  ];

  const revenueData = [
    { month: 'Jan', revenue: '₹45,000', bookings: 450 },
    { month: 'Feb', revenue: '₹58,000', bookings: 580 },
    { month: 'Mar (Current)', revenue: '₹72,500', bookings: 725 },
  ];

  const pendingApprovals = [
    {
      id: 1,
      type: 'Temple',
      name: 'Meenakshi Temple',
      location: 'Madurai, TN',
      organizer: 'Simran Kaur',
      submittedDate: '2026-03-05',
    },
    {
      id: 2,
      type: 'Organizer Account',
      name: 'Vikram Kumar',
      location: 'Jaipur, RJ',
      organizer: 'New Account',
      submittedDate: '2026-03-07',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50">
      {/* Header */}
      <div className="bg-white shadow-lg sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
              <p className="text-gray-600">System Management & Analytics</p>
            </div>
            <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-2">
              <LogOut size={18} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-semibold">Total Users</p>
                <p className="text-3xl font-bold text-gray-800 mt-2">{stats.totalUsers}</p>
                <p className="text-xs text-green-600 mt-1">+{stats.newUsersThisMonth} this month</p>
              </div>
              <Users size={40} className="text-blue-500 opacity-20" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-semibold">Active Temples</p>
                <p className="text-3xl font-bold text-gray-800 mt-2">{stats.totalTemples}</p>
                <p className="text-xs text-yellow-600 mt-1">{stats.pendingApprovals} pending</p>
              </div>
              <Building2 size={40} className="text-orange-500 opacity-20" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-semibold">Total Bookings</p>
                <p className="text-3xl font-bold text-gray-800 mt-2">{stats.totalBookings}</p>
                <p className="text-xs text-green-600 mt-1">+{stats.newBookingsThisMonth} this month</p>
              </div>
              <BarChart3 size={40} className="text-green-500 opacity-20" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-semibold">Total Revenue</p>
                <p className="text-3xl font-bold text-gray-800 mt-2">{stats.totalRevenue}</p>
                <p className="text-xs text-gray-600 mt-1">All time earnings</p>
              </div>
              <DollarSign size={40} className="text-green-600 opacity-20" />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-4 mb-6 border-b border-gray-200 overflow-x-auto">
          {['overview', 'users', 'temples', 'bookings', 'approvals'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-3 font-semibold whitespace-nowrap border-b-2 transition-colors ${
                activeTab === tab
                  ? 'border-purple-600 text-purple-600'
                  : 'border-transparent text-gray-600 hover:text-purple-600'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Revenue Chart */}
            <div className="lg:col-span-2 bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6">Revenue Trend</h2>
              <div className="space-y-4">
                {revenueData.map((item, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-700 font-semibold">{item.month}</span>
                      <div className="flex space-x-4">
                        <span className="text-gray-600">{item.revenue}</span>
                        <span className="text-gray-600">({item.bookings} bookings)</span>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-purple-600 to-indigo-600 h-2 rounded-full transition-all"
                        style={{ width: `${(idx + 1) * 30}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* System Health */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6">System Health</h2>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600 text-sm">Database</span>
                    <span className="text-green-600 font-semibold">100%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '100%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600 text-sm">Server</span>
                    <span className="text-green-600 font-semibold">99.8%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '99.8%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600 text-sm">API Response</span>
                    <span className="text-yellow-600 font-semibold">98.5%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '98.5%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div>
            <div className="mb-6 flex space-x-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600"
                />
              </div>
              <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center space-x-2">
                <Plus size={18} />
                <span>Add User</span>
              </button>
            </div>

            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Name</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Email</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Role</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Bookings</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Status</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {users.map((user) => (
                      <tr key={user.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm font-semibold text-gray-800">{user.name}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{user.email}</td>
                        <td className="px-6 py-4 text-sm">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            user.role === 'admin'
                              ? 'bg-red-100 text-red-700'
                              : user.role === 'organizer'
                              ? 'bg-blue-100 text-blue-700'
                              : 'bg-gray-100 text-gray-700'
                          }`}>
                            {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">{user.bookings}</td>
                        <td className="px-6 py-4 text-sm">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            user.status === 'active'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-yellow-100 text-yellow-700'
                          }`}>
                            {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm flex space-x-2">
                          <button className="p-2 text-blue-600 hover:bg-blue-50 rounded">
                            <Eye size={18} />
                          </button>
                          <button className="p-2 text-orange-600 hover:bg-orange-50 rounded">
                            <Edit size={18} />
                          </button>
                          <button className="p-2 text-red-600 hover:bg-red-50 rounded">
                            <Trash2 size={18} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Temples Tab */}
        {activeTab === 'temples' && (
          <div>
            <div className="mb-6">
              <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center space-x-2">
                <Plus size={18} />
                <span>Add Temple</span>
              </button>
            </div>

            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Temple Name</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Location</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Organizer</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Rating</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Bookings</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Status</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {temples.map((temple) => (
                      <tr key={temple.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm font-semibold text-gray-800">{temple.name}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{temple.location}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{temple.organizer}</td>
                        <td className="px-6 py-4 text-sm text-yellow-600 font-semibold">{temple.rating}⭐</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{temple.bookings}</td>
                        <td className="px-6 py-4 text-sm">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            temple.status === 'active'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-yellow-100 text-yellow-700'
                          }`}>
                            {temple.status === 'pending_approval' ? 'Pending' : 'Active'}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm flex space-x-2">
                          <button className="p-2 text-blue-600 hover:bg-blue-50 rounded">
                            <Eye size={18} />
                          </button>
                          <button className="p-2 text-orange-600 hover:bg-orange-50 rounded">
                            <Edit size={18} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Bookings Tab */}
        {activeTab === 'bookings' && (
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-800">Recent Bookings</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Booking ID</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">User</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Temple</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Amount</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Status</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {recentBookings.map((booking) => (
                    <tr key={booking.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-mono text-gray-700">{booking.bookingId}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{booking.user}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{booking.temple}</td>
                      <td className="px-6 py-4 text-sm font-semibold text-gray-800">{booking.amount}</td>
                      <td className="px-6 py-4 text-sm">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          booking.status === 'confirmed'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">{booking.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Approvals Tab */}
        {activeTab === 'approvals' && (
          <div className="space-y-4">
            {pendingApprovals.length === 0 ? (
              <div className="bg-white rounded-lg shadow-lg p-12 text-center">
                <p className="text-gray-600 mb-2">No pending approvals</p>
                <p className="text-sm text-gray-500">All requests have been reviewed</p>
              </div>
            ) : (
              pendingApprovals.map((approval) => (
                <div key={approval.id} className="bg-white rounded-lg shadow-lg p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm font-semibold">
                          {approval.type}
                        </span>
                        <h3 className="text-lg font-bold text-gray-800">{approval.name}</h3>
                      </div>
                      <p className="text-sm text-gray-600 mb-1">{approval.location}</p>
                      <p className="text-xs text-gray-500">Submitted: {approval.submittedDate}</p>
                    </div>
                  </div>

                  <div className="flex space-x-3">
                    <button className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold">
                      Approve
                    </button>
                    <button className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-semibold">
                      Reject
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default AdminHome;