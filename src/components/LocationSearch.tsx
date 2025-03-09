'use client';

import React, { useState } from 'react';
import { getCurrentLocation } from '../utils/weatherService';

interface LocationSearchProps {
  onSearch: (city: string) => void;
  onLocationSearch: (lat: number, lon: number) => void;
  isLoading: boolean;
}

const LocationSearch: React.FC<LocationSearchProps> = ({ onSearch, onLocationSearch, isLoading }) => {
  const [city, setCity] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city.trim());
    }
  };

  const handleCurrentLocation = async () => {
    try {
      const position = await getCurrentLocation();
      const { latitude, longitude } = position.coords;
      onLocationSearch(latitude, longitude);
    } catch (error) {
      alert('Error getting your location. Please make sure location services are enabled.');
      console.error('Error getting location:', error);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">Location</h2>
      
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="flex flex-col gap-4">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city name"
            className="w-full px-4 py-3 bg-[#2a2a2a] border border-[#3a3a3a] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--accent)] text-white placeholder-gray-400"
            disabled={isLoading}
          />
          <button
            type="submit"
            className="primary-button disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isLoading || !city.trim()}
          >
            {isLoading ? 'Loading...' : 'Search'}
          </button>
        </div>
      </form>
      
      <div className="text-center mb-4">
        <span className="text-[var(--text-secondary)]">or</span>
      </div>
      
      <button
        onClick={handleCurrentLocation}
        className="w-full py-3 px-4 bg-[#2a2a2a] hover:bg-[#3a3a3a] text-white rounded-xl transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={isLoading}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--accent)]" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
        </svg>
        {isLoading ? 'Loading...' : 'Use My Location'}
      </button>
    </div>
  );
};

export default LocationSearch; 