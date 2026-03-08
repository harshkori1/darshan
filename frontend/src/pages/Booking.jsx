import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { temples } from '../data/temples';
import SlotCard from '../componenet/SlotCard';
import Footer from '../componenet/Footer';

const Booking = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const temple = temples.find((t) => t.id === parseInt(id));
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [visitorCount, setVisitorCount] = useState(1);

  const timeSlots = [
    { id: 1, time: '06:00 AM - 08:00 AM', available: 45 },
    { id: 2, time: '08:00 AM - 10:00 AM', available: 30 },
    { id: 3, time: '02:00 PM - 04:00 PM', available: 50 },
    { id: 4, time: '04:00 PM - 06:00 PM', available: 40 },
  ];

  const handleBooking = (e) => {
    e.preventDefault();
    if (selectedDate && selectedSlot) {
      // Calculate pricing
      const pricePerTicket = temple.price || 50;
      const subtotal = visitorCount * pricePerTicket;
      const convenienceFee = 45;
      const gst = Math.round(subtotal * 0.18);
      const totalAmount = subtotal + convenienceFee + gst;

      const bookingDetails = {
        templeId: temple.id,
        templeName: temple.name,
        darshanName: selectedSlot.time,
        bookingDate: selectedDate,
        timing: selectedSlot.time,
        quantity: visitorCount,
        pricePerTicket,
        convenienceFee,
        gst,
        totalAmount,
      };

      navigate('/payment', { state: { booking: bookingDetails } });
    } else {
      alert('Please select date and time slot');
    }
  };

  if (!temple) return <div className="text-center py-12">Temple not found</div>;

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">Book Tickets for {temple.name}</h1>

        <form onSubmit={handleBooking} className="bg-white p-8 rounded-lg shadow-lg">
          {/* Date Selection */}
          <div className="mb-8">
            <label className="block text-lg font-semibold mb-4">Select Date</label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          {/* Time Slot Selection */}
          <div className="mb-8">
            <label className="block text-lg font-semibold mb-4">Select Time Slot</label>
            <div className="space-y-3">
              {timeSlots.map((slot) => (
                <SlotCard
                  key={slot.id}
                  slot={slot}
                  selected={selectedSlot}
                  onSelect={setSelectedSlot}
                />
              ))}
            </div>
          </div>

          {/* Visitor Count */}
          <div className="mb-8">
            <label className="block text-lg font-semibold mb-4">Number of Visitors</label>
            <input
              type="number"
              min="1"
              max="10"
              value={visitorCount}
              onChange={(e) => setVisitorCount(parseInt(e.target.value))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          {/* Booking Summary */}
          {selectedSlot && selectedDate && (
            <div className="bg-orange-50 p-4 rounded-lg mb-8">
              <h3 className="font-semibold mb-2">Booking Summary</h3>
              <p className="text-sm text-gray-700">Date: {selectedDate}</p>
              <p className="text-sm text-gray-700">Time: {selectedSlot.time}</p>
              <p className="text-sm text-gray-700">Visitors: {visitorCount}</p>
              <p className="text-lg font-bold text-orange-600 mt-2">Total: ₹{visitorCount * 50}</p>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all"
          >
            Confirm Booking
          </button>
        </form>
      </div>

      <Footer />
    </main>
  );
};

export default Booking;
