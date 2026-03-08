import React, { useState } from 'react';
import { Check, Lock, AlertCircle } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [formData, setFormData] = useState({
    cardName: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    email: '',
    phone: '',
  });

  // Get booking details from location state or use sample data
  const booking = location.state?.booking || {
    templeId: '67decafc3c',
    templeName: 'Tirupati Balaji',
    darshanName: 'Early Morning (Suprabatha Seva)',
    bookingDate: '22/3/2025',
    timing: '05:01 AM - 06:01 AM',
    quantity: 4,
    pricePerTicket: 100,
    convenienceFee: 45,
    gst: 25,
    totalAmount: 445,
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // Format card number
    if (name === 'cardNumber') {
      const formatted = value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
      setFormData({ ...formData, [name]: formatted });
    }
    // Format expiry date
    else if (name === 'expiryDate') {
      const formatted = value.replace(/\D/g, '').slice(0, 4);
      if (formatted.length >= 2) {
        setFormData({ ...formData, [name]: `${formatted.slice(0, 2)}/${formatted.slice(2)}` });
      } else {
        setFormData({ ...formData, [name]: formatted });
      }
    }
    // Limit CVV
    else if (name === 'cvv') {
      setFormData({ ...formData, [name]: value.slice(0, 4) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handlePayment = (e) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      // Generate booking ID
      const bookingId = `DARSHAN-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
      
      // Create booking object with all details
      const newBooking = {
        id: Date.now(),
        bookingId,
        templeId: booking.templeId,
        templeName: booking.templeName,
        darshanName: booking.darshanName,
        bookingDate: booking.bookingDate,
        timing: booking.timing,
        quantity: booking.quantity,
        pricePerTicket: booking.pricePerTicket,
        convenienceFee: booking.convenienceFee,
        gst: booking.gst,
        totalAmount: booking.totalAmount,
        status: 'Confirmed',
        paymentDate: new Date().toISOString(),
      };

      // Save to localStorage
      const existingBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
      localStorage.setItem('bookings', JSON.stringify([...existingBookings, newBooking]));
      
      setIsProcessing(false);
      setPaymentSuccess(true);
    }, 2000);
  };

  if (paymentSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md text-center">
          <div className="mb-6 flex justify-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center animate-bounce">
              <Check className="w-10 h-10 text-green-600" />
            </div>
          </div>

          <h1 className="text-3xl font-bold text-gray-800 mb-2">Payment Successful!</h1>
          <p className="text-gray-600 mb-6">Your booking has been confirmed</p>

          <div className="bg-green-50 border-2 border-green-200 rounded-xl p-4 mb-6">
            <p className="text-sm text-gray-600 mb-1">Booking ID</p>
            <p className="text-xl font-mono font-bold text-green-700">DARSHAN-{Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
          </div>

          <div className="space-y-3 mb-6 text-left">
            <div className="flex justify-between">
              <span className="text-gray-600">Temple:</span>
              <span className="font-semibold text-gray-800">{booking.templeName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Date:</span>
              <span className="font-semibold text-gray-800">{booking.bookingDate}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Time:</span>
              <span className="font-semibold text-gray-800">{booking.timing}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Tickets:</span>
              <span className="font-semibold text-gray-800">x{booking.quantity}</span>
            </div>
            <div className="border-t pt-3 flex justify-between">
              <span className="text-gray-800 font-semibold">Total Paid:</span>
              <span className="text-2xl font-bold text-green-600">₹{booking.totalAmount}</span>
            </div>
          </div>

          <button
            onClick={() => navigate('/my-bookings')}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition"
          >
            View My Bookings
          </button>

          <p className="text-xs text-gray-500 mt-4">
            A confirmation email has been sent to your registered email address.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800">Complete Your Payment</h1>
          <p className="text-gray-600 mt-2">Secure payment for your temple darshan booking</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Payment Form */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              {/* Payment Method Selection */}
              <div className="mb-8">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Payment Method</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    { id: 'card', label: '💳 Credit/Debit Card', icon: '🏦' },
                    { id: 'upi', label: '📱 UPI', icon: '📲' },
                    { id: 'wallet', label: '💰 Digital Wallet', icon: '💳' },
                  ].map((method) => (
                    <button
                      key={method.id}
                      onClick={() => setPaymentMethod(method.id)}
                      className={`p-4 rounded-lg border-2 transition ${
                        paymentMethod === method.id
                          ? 'border-blue-600 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <span className="text-2xl mb-2 block">{method.icon}</span>
                      <span className="text-sm font-semibold text-gray-700">{method.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Card Payment Form */}
              {paymentMethod === 'card' && (
                <form onSubmit={handlePayment} className="space-y-6">
                  {/* Cardholder Name */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Cardholder Name
                    </label>
                    <input
                      type="text"
                      name="cardName"
                      value={formData.cardName}
                      onChange={handleInputChange}
                      placeholder="John Doe"
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition"
                    />
                  </div>

                  {/* Card Number */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Card Number
                    </label>
                    <input
                      type="text"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      placeholder="1234 5678 9012 3456"
                      maxLength="19"
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition font-mono"
                    />
                  </div>

                  {/* Expiry Date and CVV */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        name="expiryDate"
                        value={formData.expiryDate}
                        onChange={handleInputChange}
                        placeholder="MM/YY"
                        maxLength="5"
                        required
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        CVV
                      </label>
                      <input
                        type="password"
                        name="cvv"
                        value={formData.cvv}
                        onChange={handleInputChange}
                        placeholder="123"
                        maxLength="4"
                        required
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition font-mono"
                      />
                    </div>
                  </div>

                  {/* Email and Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="user@example.com"
                        required
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+91 9876543210"
                        required
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition"
                      />
                    </div>
                  </div>

                  {/* Security Notice */}
                  <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded flex items-start gap-3">
                    <Lock className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-blue-900">Secure Payment</p>
                      <p className="text-xs text-blue-700">Your payment information is encrypted and secure.</p>
                    </div>
                  </div>

                  {/* Payment Button */}
                  <button
                    type="submit"
                    disabled={isProcessing}
                    className={`w-full py-4 rounded-lg font-bold text-lg transition flex items-center justify-center gap-2 ${
                      isProcessing
                        ? 'bg-gray-400 cursor-not-allowed text-gray-700'
                        : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white'
                    }`}
                  >
                    {isProcessing ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        Processing Payment...
                      </>
                    ) : (
                      <>
                        <Lock className="w-5 h-5" />
                        Pay ₹{booking.totalAmount}
                      </>
                    )}
                  </button>
                </form>
              )}

              {/* UPI Payment Form */}
              {paymentMethod === 'upi' && (
                <form onSubmit={handlePayment} className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      UPI ID
                    </label>
                    <input
                      type="text"
                      placeholder="user@upi"
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition"
                    />
                  </div>
                  <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-green-900">UPI Payment</p>
                      <p className="text-xs text-green-700">You'll be redirected to your UPI app to complete the payment.</p>
                    </div>
                  </div>
                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="w-full py-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-lg font-bold text-lg transition"
                  >
                    {isProcessing ? 'Processing...' : `Pay ₹${booking.totalAmount} via UPI`}
                  </button>
                </form>
              )}

              {/* Wallet Payment Form */}
              {paymentMethod === 'wallet' && (
                <form onSubmit={handlePayment} className="space-y-6">
                  <div>
                    <p className="text-gray-600 mb-4">Select your wallet:</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {['Google Pay', 'PhonePe', 'Paytm', 'Amazon Pay'].map((wallet) => (
                        <button
                          key={wallet}
                          type="button"
                          className="p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition text-sm font-semibold text-gray-700"
                        >
                          {wallet}
                        </button>
                      ))}
                    </div>
                  </div>
                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-lg font-bold text-lg transition"
                  >
                    {isProcessing ? 'Processing...' : `Pay ₹${booking.totalAmount} via Wallet`}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Order Summary */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-8 sticky top-8">
              <h2 className="text-xl font-bold text-gray-800 mb-6">Order Summary</h2>

              {/* Temple Details */}
              <div className="mb-6 pb-6 border-b border-gray-200">
                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider">Temple</p>
                    <p className="text-sm font-semibold text-gray-800">{booking.templeName}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider">Darshan Type</p>
                    <p className="text-sm font-semibold text-gray-800">{booking.darshanName}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider">Date & Time</p>
                    <p className="text-sm font-semibold text-gray-800">
                      {booking.bookingDate} · {booking.timing}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider">Tickets</p>
                    <p className="text-sm font-semibold text-gray-800">
                      {booking.quantity} × ₹{booking.pricePerTicket}
                    </p>
                  </div>
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold text-gray-800">₹{booking.quantity * booking.pricePerTicket}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Convenience Fee</span>
                  <span className="font-semibold text-gray-800">₹{booking.convenienceFee}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">GST (18%)</span>
                  <span className="font-semibold text-gray-800">₹{booking.gst}</span>
                </div>
                <div className="border-t border-gray-200 pt-3 flex justify-between">
                  <span className="font-bold text-gray-800">Total Amount</span>
                  <span className="text-2xl font-bold text-blue-600">₹{booking.totalAmount}</span>
                </div>
              </div>

              {/* Features */}
              <div className="bg-blue-50 rounded-lg p-4 space-y-2 text-sm">
                <div className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">✓</span>
                  <span className="text-gray-700">Instant confirmation</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">✓</span>
                  <span className="text-gray-700">Mobile ticket & QR code</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">✓</span>
                  <span className="text-gray-700">24/7 customer support</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">✓</span>
                  <span className="text-gray-700">Secure payment gateway</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;

