import React, { useState } from 'react';
import { BarChart3, Calendar, DollarSign, Users, TrendingUp, Settings, LogOut, Eye, Edit, Trash2 } from 'lucide-react';
import Footer from '../../componenet/Footer';

const OrganizerHome = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [organizer, setOrganizer] = useState({
    name: 'Temple Management Team',
    temple: 'Varanasi Kashi Vishwanath',
    email: 'organizer@temple.com',
    phone: '9876543210',
  });

  const stats = {
    totalBookings: 156,
    totalRevenue: '₹15,600',
    activeSlots: 24,
    averageRating: 4.5,
    monthlyBookings: 42,
    monthlyRevenue: '₹4,200',
    pendingReviews: 8,
    totalDonations: '₹25,000',
  };

  const bookings = [
    {
      id: 1,
      bookingId: 'DARSHAN-20260308-1234',
      visitor: 'Raj Kumar',
      date: '2026-03-15',
      time: '06:00 AM - 08:00 AM',
      visitors: 2,
      amount: '₹100',
      status: 'confirmed',
      paidAt: '2026-03-08',
    },
    {
      id: 2,
      bookingId: 'DARSHAN-20260307-5432',
      visitor: 'Priya Singh',
      date: '2026-03-20',
      time: '02:00 PM - 04:00 PM',
      visitors: 4,
      amount: '₹200',
      status: 'pending',
      paidAt: '-',
    },
    {
      id: 3,
      bookingId: 'DARSHAN-20260306-7890',
      visitor: 'Amit Patel',
      date: '2026-03-25',
      time: '04:00 PM - 06:00 PM',
      visitors: 3,
      amount: '₹150',
      status: 'confirmed',
      paidAt: '2026-03-06',
    },
  ];

  const timeSlots = [
    { id: 1, time: '06:00 AM - 08:00 AM', booked: 45, available: 5, status: 'full' },
    { id: 2, time: '08:00 AM - 10:00 AM', booked: 30, available: 20, status: 'available' },
    { id: 3, time: '02:00 PM - 04:00 PM', booked: 40, available: 10, status: 'available' },
    { id: 4, time: '04:00 PM - 06:00 PM', booked: 25, available: 25, status: 'available' },
  ];

  const donations = [
    {
      id: 1,
      donorName: 'Anonymous',
      amount: '₹5,000',
      date: '2026-03-05',
      purpose: 'Temple Maintenance',
      type: 'monetary',
    },
    {
      id: 2,
      donorName: 'Shyam Gupta',
      amount: '₹10,000',
      date: '2026-02-28',
      purpose: 'Charity',
      type: 'monetary',
    },
    {
      id: 3,
      donorName: 'Radha Singh',
      amount: '₹2,000',
      date: '2026-02-20',
      purpose: 'Education',
      type: 'monetary',
    },
  ];

  const reviews = [
    {
      id: 1,
      reviewer: 'Ananya Sharma',
      rating: 5,
      comment: 'Amazing experience! Very clean and well-organized.',
      date: '2026-03-01',
      status: 'approved',
    },
    {
      id: 2,
      reviewer: 'Vikram Kumar',
      rating: 4,
      comment: 'Good facilities, slightly crowded.',
      date: '2026-02-25',
      status: 'pending',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Header */}
      <div className="bg-white shadow-lg sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Temple Dashboard</h1>
              <p className="text-gray-600">{organizer.temple}</p>
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
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-semibold">Total Bookings</p>
                <p className="text-3xl font-bold text-gray-800 mt-2">{stats.totalBookings}</p>
              </div>
              <Calendar size={40} className="text-blue-500 opacity-20" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-semibold">Total Revenue</p>
                <p className="text-3xl font-bold text-gray-800 mt-2">{stats.totalRevenue}</p>
              </div>
              <DollarSign size={40} className="text-green-500 opacity-20" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-semibold">Active Time Slots</p>
                <p className="text-3xl font-bold text-gray-800 mt-2">{stats.activeSlots}</p>
              </div>
              <TrendingUp size={40} className="text-orange-500 opacity-20" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-semibold">Average Rating</p>
                <p className="text-3xl font-bold text-gray-800 mt-2">{stats.averageRating}⭐</p>
              </div>
              <BarChart3 size={40} className="text-yellow-500 opacity-20" />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-4 mb-6 border-b border-gray-200 overflow-x-auto">
          {['overview', 'bookings', 'slots', 'donations', 'reviews'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-3 font-semibold whitespace-nowrap border-b-2 transition-colors ${
                activeTab === tab
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-blue-600'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Monthly Stats */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">This Month</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                  <span className="text-gray-600">Bookings</span>
                  <span className="text-2xl font-bold text-blue-600">{stats.monthlyBookings}</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                  <span className="text-gray-600">Revenue</span>
                  <span className="text-2xl font-bold text-green-600">{stats.monthlyRevenue}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total Donations</span>
                  <span className="text-2xl font-bold text-orange-600">{stats.totalDonations}</span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <button className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold">
                  + Add Time Slot
                </button>
                <button className="w-full px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold">
                  View Revenue Report
                </button>
                <button className="w-full px-4 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors font-semibold">
                  Manage Donations
                </button>
                <button className="w-full px-4 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-semibold flex items-center justify-center space-x-2">
                  <Settings size={18} />
                  <span>Settings</span>
                </button>
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
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Visitor</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Date</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Visitors</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Amount</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Status</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {bookings.map((booking) => (
                    <tr key={booking.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-mono text-gray-700">{booking.bookingId}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{booking.visitor}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{booking.date}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{booking.visitors}</td>
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
        )}

        {/* Time Slots Tab */}
        {activeTab === 'slots' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {timeSlots.map((slot) => (
              <div key={slot.id} className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-gray-800">{slot.time}</h3>
                    <p className="text-sm text-gray-600">Total Capacity: 50</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    slot.status === 'full'
                      ? 'bg-red-100 text-red-700'
                      : 'bg-green-100 text-green-700'
                  }`}>
                    {slot.status === 'full' ? 'Full' : 'Available'}
                  </span>
                </div>

                {/* Capacity Bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">Booked: {slot.booked}</span>
                    <span className="text-gray-600">Available: {slot.available}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all"
                      style={{ width: `${(slot.booked / 50) * 100}%` }}
                    ></div>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-semibold">
                    Edit
                  </button>
                  <button className="flex-1 px-4 py-2 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-semibold">
                    View Bookings
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Donations Tab */}
        {activeTab === 'donations' && (
          <div className="space-y-4">
            {donations.map((donation) => (
              <div key={donation.id} className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-800">{donation.donorName}</h3>
                    <p className="text-sm text-gray-600 mt-1">{donation.purpose}</p>
                    <p className="text-xs text-gray-500 mt-2">{donation.date}</p>
                  </div>
                  <span className="text-2xl font-bold text-green-600">{donation.amount}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Reviews Tab */}
        {activeTab === 'reviews' && (
          <div className="space-y-4">
            {reviews.map((review) => (
              <div key={review.id} className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-bold text-gray-800">{review.reviewer}</h3>
                    <div className="flex items-center space-x-1 mt-1">
                      {[...Array(5)].map((_, i) => (
                        <span
                          key={i}
                          className={i < review.rating ? 'text-yellow-400' : 'text-gray-300'}
                        >
                          ⭐
                        </span>
                      ))}
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    review.status === 'approved'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {review.status.charAt(0).toUpperCase() + review.status.slice(1)}
                  </span>
                </div>
                <p className="text-gray-700 mb-3">{review.comment}</p>
                <p className="text-xs text-gray-500">{review.date}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default OrganizerHome;