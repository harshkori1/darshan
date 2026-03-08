import React, { useState, useEffect } from 'react';
import Footer from '../componenet/Footer';
import { Calendar, MapPin, Users, Clock, DollarSign, X } from 'lucide-react';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [bookingToCancel, setBookingToCancel] = useState(null);

  useEffect(() => {
    // Load bookings from localStorage
    const savedBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    setBookings(savedBookings);
  }, []);

  const handleCancelClick = (booking) => {
    setBookingToCancel(booking);
    setShowCancelModal(true);
  };

  const confirmCancel = () => {
    if (bookingToCancel) {
      const updatedBookings = bookings.filter(b => b.id !== bookingToCancel.id);
      setBookings(updatedBookings);
      localStorage.setItem('bookings', JSON.stringify(updatedBookings));
      setShowCancelModal(false);
      setBookingToCancel(null);
    }
  };

  const viewDetails = (booking) => {
    setSelectedBooking(booking);
  };

  const closeDetails = () => {
    setSelectedBooking(null);
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">My Bookings</h1>

        {bookings.length === 0 ? (
          <div className="bg-white p-8 rounded-lg shadow text-center">
            <p className="text-gray-600 mb-4">No bookings found</p>
            <a href="/temples" className="text-orange-600 hover:underline">
              Book a temple visit
            </a>
          </div>
        ) : (
          <div className="space-y-4">
            {bookings.map((booking) => (
              <div
                key={booking.id}
                className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">{booking.templeName}</h3>
                    <p className="text-sm text-gray-500">Booking ID: {booking.bookingId}</p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      booking.status === 'Confirmed'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}
                  >
                    {booking.status}
                  </span>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Calendar size={16} />
                    <span className="text-sm">{booking.bookingDate}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Clock size={16} />
                    <span className="text-sm">{booking.timing}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Users size={16} />
                    <span className="text-sm">{booking.quantity} visitors</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600">
                    <DollarSign size={16} />
                    <span className="text-sm font-semibold">₹{booking.totalAmount}</span>
                  </div>
                </div>
                
                <div className="mt-4 flex space-x-2">
                  <button 
                    onClick={() => viewDetails(booking)}
                    className="px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700 transition-colors"
                  >
                    View Details
                  </button>
                  {booking.status !== 'Cancelled' && (
                    <button 
                      onClick={() => handleCancelClick(booking)}
                      className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors text-red-600"
                    >
                      Cancel Booking
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Booking Details Modal */}
      {selectedBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold text-gray-800">Booking Details</h2>
                <button onClick={closeDetails} className="text-gray-500 hover:text-gray-700">
                  <X size={24} />
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="bg-orange-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500">Booking ID</p>
                  <p className="text-lg font-mono font-bold text-orange-600">{selectedBooking.bookingId}</p>
                </div>
                
                <div className="border-t pt-4">
                  <h3 className="font-semibold text-gray-800 mb-2">Temple Information</h3>
                  <p className="text-gray-600">{selectedBooking.templeName}</p>
                  <p className="text-sm text-gray-500">{selectedBooking.darshanName}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4 border-t pt-4">
                  <div>
                    <p className="text-sm text-gray-500">Date</p>
                    <p className="font-semibold">{selectedBooking.bookingDate}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Time</p>
                    <p className="font-semibold">{selectedBooking.timing}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Number of Visitors</p>
                    <p className="font-semibold">{selectedBooking.quantity}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Status</p>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      selectedBooking.status === 'Confirmed'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {selectedBooking.status}
                    </span>
                  </div>
                </div>
                
                <div className="border-t pt-4">
                  <h3 className="font-semibold text-gray-800 mb-2">Payment Details</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Price per Ticket</span>
                      <span>₹{selectedBooking.pricePerTicket} × {selectedBooking.quantity}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Subtotal</span>
                      <span>₹{selectedBooking.pricePerTicket * selectedBooking.quantity}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Convenience Fee</span>
                      <span>₹{selectedBooking.convenienceFee}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">GST (18%)</span>
                      <span>₹{selectedBooking.gst}</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg border-t pt-2">
                      <span>Total Paid</span>
                      <span className="text-green-600">₹{selectedBooking.totalAmount}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cancel Confirmation Modal */}
      {showCancelModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <X className="w-8 h-8 text-red-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Cancel Booking?</h2>
              <p className="text-gray-600 mb-6">
                Are you sure you want to cancel your booking for <strong>{bookingToCancel?.templeName}</strong>? 
                This action cannot be undone.
              </p>
              <div className="flex space-x-4">
                <button
                  onClick={() => setShowCancelModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
                >
                  No, Keep Booking
                </button>
                <button
                  onClick={confirmCancel}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                >
                  Yes, Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </main>
  );
};

export default MyBookings;

