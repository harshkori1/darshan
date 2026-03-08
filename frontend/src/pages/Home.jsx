
import React, { useState } from 'react';
import { temples } from '../data/temples';
import TempleCard from '../componenet/TempleCard';
import Footer from '../componenet/Footer';
import { Search, Sparkles, ArrowRight } from 'lucide-react';

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTemples = temples.filter(
    (temple) =>
      temple.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      temple.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="min-h-screen">
      <section className="hero-section">
        <div className="max-w-7xl mx-auto">
          <div className="hero-content">
            <h1 className="hero-title">Discover Sacred Temple Journeys</h1>
            <p className="hero-subtitle">Book your darshan slots effortlessly and experience the divine presence.</p>
            <div className="search-container">
              <Search className="search-icon" size={20} />
              <input type="text" placeholder="Search temples by name or location..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="search-input" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 rounded-2xl hover:bg-orange-50">
              <div className="w-14 h-14 bg-gradient-to-br from-orange-100 to-red-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Sparkles className="text-orange-600" size={28} />
              </div>
              <h3 className="font-semibold text-lg text-gray-800 mb-2">Instant Booking</h3>
              <p className="text-sm text-gray-600">Book your darshan slots in seconds</p>
            </div>
            <div className="text-center p-6 rounded-2xl hover:bg-orange-50">
              <div className="w-14 h-14 bg-gradient-to-br from-orange-100 to-red-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Sparkles className="text-orange-600" size={28} />
              </div>
              <h3 className="font-semibold text-lg text-gray-800 mb-2">Secure Payments</h3>
              <p className="text-sm text-gray-600">100% secure payment gateway</p>
            </div>
            <div className="text-center p-6 rounded-2xl hover:bg-orange-50">
              <div className="w-14 h-14 bg-gradient-to-br from-orange-100 to-red-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Sparkles className="text-orange-600" size={28} />
              </div>
              <h3 className="font-semibold text-lg text-gray-800 mb-2">24/7 Support</h3>
              <p className="text-sm text-gray-600">Round-the-clock support</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="text-center mb-10">
          <h2 className="section-title">Popular Temples</h2>
          <p className="section-subtitle">Discover the most visited temples and book your slots today</p>
        </div>
        <div className="temples-grid">
          {filteredTemples.map((temple, index) => (
            <div key={temple.id} className={`animate-float-in opacity-0 stagger-${index + 1}`}>
              <TempleCard temple={temple} />
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 bg-gradient-to-r from-orange-500 to-red-500">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl font-bold text-white mb-4 font-serif">Ready for Your Spiritual Journey?</h2>
          <p className="text-orange-100 text-lg mb-8">Join thousands of devotees who have booked their darshan through DarshanEase</p>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Home;

