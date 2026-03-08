
import React from 'react';
import { Link } from 'react-router-dom';
import { Star, MapPin, Clock } from 'lucide-react';

const TempleCard = ({ temple }) => {
  return (
    <Link to={`/temple/${temple.id}`} className="block">
      <div className="temple-card">
        {/* Image Section */}
        <div className="temple-card-image">
          <img 
            src={temple.image} 
            alt={temple.name}
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Content Section */}
        <div className="temple-card-content">
          <h3 className="temple-card-title">{temple.name}</h3>
          
          {/* Location */}
          <div className="temple-card-location">
            <MapPin size={14} />
            <span>{temple.location}</span>
          </div>
          
          {/* Description */}
          <p className="temple-card-description">{temple.description}</p>
          
          {/* Footer */}
          <div className="temple-card-footer">
            {/* Rating */}
            <div className="temple-card-rating">
              <Star size={14} className="fill-current" />
              <span>{temple.rating}</span>
            </div>
            
            {/* Timing */}
            <div className="temple-card-timing">
              <Clock size={12} />
              <span>{temple.openTime} - {temple.closeTime}</span>
            </div>
          </div>
          
          {/* Book Now Button */}
          <button className="book-now-btn w-full mt-4">
            <span>Book Now</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
        </div>
      </div>
    </Link>
  );
};

export default TempleCard;

