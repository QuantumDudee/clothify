'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import LocationSearch from '../components/LocationSearch';
import WeatherDisplay from '../components/WeatherDisplay';
import OutfitRecommendation from '../components/OutfitRecommendation';
import { getWeatherData, getWeatherByCoordinates, WeatherData } from '../utils/weatherService';
import { getOutfitRecommendation, OutfitRecommendation as OutfitType } from '../utils/outfitRecommendations';

export default function Home() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [outfit, setOutfit] = useState<OutfitType | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleCitySearch = async (city: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const data = await getWeatherData(city);
      setWeatherData(data);
      const recommendedOutfit = getOutfitRecommendation(data);
      setOutfit(recommendedOutfit);
    } catch (err) {
      setError('Error fetching weather data. Please check the city name and try again.');
      console.error('Error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLocationSearch = async (lat: number, lon: number) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const data = await getWeatherByCoordinates(lat, lon);
      setWeatherData(data);
      const recommendedOutfit = getOutfitRecommendation(data);
      setOutfit(recommendedOutfit);
    } catch (err) {
      setError('Error fetching weather data for your location.');
      console.error('Error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] pb-12">
      <header className="pt-8 pb-6 px-6">
        <div className="container mx-auto">
          <h1 className="text-4xl font-bold">Dashboard</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Controls */}
          <div className="flex flex-col gap-6">
            <div className="dashboard-card p-6">
              <LocationSearch 
                onSearch={handleCitySearch} 
                onLocationSearch={handleLocationSearch}
                isLoading={isLoading}
              />
            </div>
            
            <div className="dashboard-card p-6">
              <button className="primary-button w-full mb-6">
                Generate
              </button>
              
              <button className="primary-button w-full bg-white text-black hover:bg-gray-100">
                Wardrobe
              </button>
            </div>
          </div>
          
          {/* Center and Right - Weather and Outfit */}
          <div className="lg:col-span-2">
            <div className="dashboard-card p-8">
              <h2 className="card-title">Weather Summary</h2>
              
              {weatherData ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <p className="weather-summary">
                      It's gonna be a little {weatherData.description} today with the 
                      temperatures ranging from {Math.round(weatherData.temperature - 5)}°-{Math.round(weatherData.temperature + 5)}°
                    </p>
                    
                    {error && (
                      <div className="mt-4 text-red-500">
                        {error}
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-center flex-col">
                    <div className="relative">
                      {/* Weather Icon */}
                      <div className="weather-icon">
                        {weatherData.description.includes('cloud') && (
                          <div className="relative">
                            <div className="absolute right-0 top-0">
                              <svg className="h-24 w-24 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                              </svg>
                            </div>
                            <svg className="h-32 w-32 text-blue-200" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                          </div>
                        )}
                        
                        {weatherData.description.includes('rain') && (
                          <div className="relative">
                            <svg className="h-32 w-32 text-blue-300" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M20 16.2A6.4 6.4 0 0016.5 8a7.8 7.8 0 00-7.3-5 7.5 7.5 0 00-7.2 6 6 6 0 00-1 11.6h18.7a4.3 4.3 0 00.3-4.4z" />
                            </svg>
                            <div className="absolute inset-0 flex items-end justify-center pb-4">
                              <div className="space-x-2">
                                <div className="h-4 w-0.5 bg-blue-400 animate-raindrops"></div>
                                <div className="h-4 w-0.5 bg-blue-400 animate-raindrops animation-delay-200"></div>
                                <div className="h-4 w-0.5 bg-blue-400 animate-raindrops animation-delay-300"></div>
                              </div>
                            </div>
                          </div>
                        )}
                        
                        {weatherData.description.includes('clear') && (
                          <svg className="h-32 w-32 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                          </svg>
                        )}
                      </div>
                      
                      {/* Temperature */}
                      <div className="temperature-display text-right mt-4">
                        {Math.round(weatherData.temperature)}°
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 text-[var(--text-secondary)]">
                  {isLoading ? (
                    <p>Loading weather data...</p>
                  ) : (
                    <p>Enter a location to see weather information</p>
                  )}
                </div>
              )}
            </div>
            
            {outfit && (
              <div className="dashboard-card p-8 mt-6">
                <h2 className="card-title">Today's Outfit</h2>
                <OutfitRecommendation outfit={outfit} isLoading={isLoading} />
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
