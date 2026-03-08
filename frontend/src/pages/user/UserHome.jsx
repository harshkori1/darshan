import React, { useState } from 'react';
import { Calendar, Heart, DollarSign, Settings, LogOut, Star, MapPin, Phone, Mail } from 'lucide-react';
import Footer from '../../componenet/Footer';

const UserHome = () => {
  const [activeTab, setActiveTab] = useState('bookings');
  const [user, setUser] = useState({
    name: 'Raj Kumar',
    email: 'raj@example.com',
    phone: '9876543210',
    profileImage: '👤',
    memberSince: 'January 2026',
  });

  const bookings = [
    {
      id: 1,
      temple: 'Varanasi Kashi Vishwanath',
      date: '2026-03-15',
      time: '06:00 AM - 08:00 AM',
      visitors: 2,
      status: 'confirmed',
      amount: '₹100',
      bookingId: 'DARSHAN-20260308-1234',
    },
    {
      id: 2,
      temple: 'Golden Temple',
      date: '2026-03-20',
      time: '02:00 PM - 04:00 PM',
      visitors: 4,
      status: 'pending',
      amount: '₹200',
      bookingId: 'DARSHAN-20260307-5432',
    },
  ];

  const donations = [
    {
      id: 1,
      temple: 'Tirupati Balaji',
      amount: '₹500',
      date: '2026-02-28',
      type: 'monetary',
      status: 'completed',
      receipt: 'DONATION-20260228-001',
    },
    {
      id: 2,
      temple: 'Varanasi Kashi Vishwanath',
      amount: '₹1000',
      date: '2026-03-05',
      type: 'monetary',
      status: 'completed',
      receipt: 'DONATION-20260305-002',
    },
  ];

  const reviews = [
    {
      id: 1,
      temple: 'Golden Temple',
      rating: 5,
      comment: 'Amazing experience, very spiritual and peaceful.',
      date: '2026-03-01',
    },
    {
      id: 2,
      temple: 'Varanasi Kashi Vishwanath',
      rating: 4,
      comment: 'Great location and facilities. A bit crowded during peak hours.',
      date: '2026-02-25',
    },
  ];

  const savedTemples = [
    { id: 1, name: 'Meenakshi Temple', location: 'Madurai, Tamil Nadu', rating: 4.7 },
    { id: 2, name: 'Khajuraho Temples', location: 'Madhya Pradesh', rating: 4.8 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      {/* Header */}
      <div className="bg-white shadow-lg sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">My Dashboard</h1>
              <p className="text-gray-600">Welcome back, {user.name}!</p>
            </div>
            <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-2">
              <LogOut size={18} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Profile Card */}
            <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
              <div className="text-center mb-4">
                <div className="text-6xl mb-4">{user.profileImage}</div>
                <h2 className="text-xl font-bold text-gray-800">{user.name}</h2>
                <p className="text-sm text-gray-600">Member since {user.memberSince}</p>
              </div>
              
              <div className="space-y-3 text-sm">
                <div className="flex items-center space-x-2 text-gray-600">
                  <Mail size={16} />
                  <span className="truncate">{user.email}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <Phone size={16} />
                  <span>{user.phone}</span>
                </div>
              </div>

              <button className="w-full mt-4 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors flex items-center justify-center space-x-2">
                <Settings size={18} />
                <span>Edit Profile</span>
              </button>
            </div>

            {/* Stats Card */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="font-bold text-gray-800 mb-4">Your Stats</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total Bookings</span>
                  <span className="text-2xl font-bold text-orange-600">2</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total Donated</span>
                  <span className="text-2xl font-bold text-orange-600">₹1,500</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Reviews Posted</span>
                  <span className="text-2xl font-bold text-orange-600">2</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Saved Temples</span>
                  <span className="text-2xl font-bold text-orange-600">2</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Tabs */}
            <div className="flex space-x-4 mb-6 border-b border-gray-200 overflow-x-auto">
              {['bookings', 'donations', 'reviews', 'saved'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-3 font-semibold whitespace-nowrap border-b-2 transition-colors ${
                    activeTab === tab
                      ? 'border-orange-600 text-orange-600'
                      : 'border-transparent text-gray-600 hover:text-orange-600'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>

            {/* Bookings Tab */}
            {activeTab === 'bookings' && (
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">My Bookings</h2>
                {bookings.map((booking) => (
                  <div key={booking.id} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-gray-800">{booking.temple}</h3>
                        <p className="text-sm text-gray-600">Booking ID: {booking.bookingId}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        booking.status === 'confirmed'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mb-4 text-sm">
                      <div className="flex items-center space-x-2 text-gray-600">
                        <Calendar size={16} />
                        <span>{booking.date}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-gray-600">
                        <span>🕐 {booking.time}</span>
                      </div>
                      <div className="text-gray-600">Visitors: {booking.visitors}</div>
                    </div>

                    <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                      <span className="text-lg font-bold text-orange-600">{booking.amount}</span>
                      <button className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors">
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Donations Tab */}
            {activeTab === 'donations' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold text-gray-800">My Donations</h2>
                  <button className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors">
                    + New Donation
                  </button>
                </div>

                {donations.map((donation) => (
                  <div key={donation.id} className="bg-white rounded-lg shadow-lg p-6">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="text-lg font-bold text-gray-800">{donation.temple}</h3>
                        <p className="text-sm text-gray-600">Receipt: {donation.receipt}</p>
                      </div>
                      <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                        {donation.status.charAt(0).toUpperCase() + donation.status.slice(1)}
                      </span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">{donation.date}</span>
                      <span className="text-2xl font-bold text-orange-600">{donation.amount}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Reviews Tab */}
            {activeTab === 'reviews' && (
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">My Reviews</h2>
                {reviews.map((review) => (
                  <div key={review.id} className="bg-white rounded-lg shadow-lg p-6">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="text-lg font-bold text-gray-800">{review.temple}</h3>
                        <div className="flex items-center space-x-1 mt-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={16}
                              className={i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                            />
                          ))}
                        </div>
                      </div>
                      <span className="text-sm text-gray-600">{review.date}</span>
                    </div>
                    <p className="text-gray-700">{review.comment}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Saved Temples Tab */}
            {activeTab === 'saved' && (
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Saved Temples</h2>
                {savedTemples.map((temple) => (
                  <div key={temple.id} className="bg-white rounded-lg shadow-lg p-6 flex justify-between items-center">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-800">{temple.name}</h3>
                      <div className="flex items-center space-x-3 mt-2">
                        <div className="flex items-center space-x-1">
                          <MapPin size={16} className="text-gray-600" />
                          <span className="text-gray-600">{temple.location}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Star size={16} className="fill-yellow-400 text-yellow-400" />
                          <span className="text-gray-600">{temple.rating}</span>
                        </div>
                      </div>
                    </div>
                    <button className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors">
                      Visit
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default UserHome;