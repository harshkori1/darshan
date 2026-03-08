import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { temples } from '../data/temples';
import Footer from '../componenet/Footer';
import { Clock, MapPin, Phone } from 'lucide-react';

const TempleDetails = () => {
  const { id } = useParams();
  const temple = temples.find((t) => t.id === parseInt(id));

  if (!temple) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-bold">Temple not found</h2>
        <Link to="/temples" className="text-orange-600 hover:underline mt-4 inline-block">
          Back to temples
        </Link>
      </div>
    );
  }

  return (
    <main>
      <div className="bg-gradient-to-br from-orange-100 to-red-100 py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="text-8xl mb-4">{temple.image}</div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">{temple.name}</h1>
          <p className="text-lg text-gray-700">{temple.location}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center space-x-3 mb-2">
              <Clock size={20} className="text-orange-600" />
              <h3 className="font-semibold">Timing</h3>
            </div>
            <p className="text-gray-700">{temple.openTime} - {temple.closeTime}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center space-x-3 mb-2">
              <MapPin size={20} className="text-orange-600" />
              <h3 className="font-semibold">Location</h3>
            </div>
            <p className="text-gray-700">{temple.location}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center space-x-3 mb-2">
              <Phone size={20} className="text-orange-600" />
              <h3 className="font-semibold">Contact</h3>
            </div>
            <p className="text-gray-700">+91-XXXX-XXXX-XXX</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow mb-8">
          <h2 className="text-2xl font-bold mb-4">About</h2>
          <p className="text-gray-700">{temple.description}</p>
        </div>

        <Link
          to={`/booking/${temple.id}`}
          className="inline-block px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
        >
          Book Now
        </Link>
      </div>

      <Footer />
    </main>
  );
};

export default TempleDetails;
