'use client';

import React from 'react';
import { WeatherData } from '../utils/weatherService';

interface WeatherDisplayProps {
  weatherData: WeatherData | null;
  isLoading: boolean;
  error: string | null;
}

const WeatherDisplay: React.FC<WeatherDisplayProps> = ({ weatherData, isLoading, error }) => {
  if (isLoading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md animate-pulse">
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
        <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-4"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 shadow-md">
        <h2 className="text-xl font-semibold text-red-600 dark:text-red-400 mb-2">Error</h2>
        <p className="text-red-500 dark:text-red-300">{error}</p>
      </div>
    );
  }

  if (!weatherData) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
        <p className="text-gray-500 dark:text-gray-400">Enter a location to see weather information</p>
      </div>
    );
  }

  const getWeatherIcon = (iconCode: string) => {
    return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">{weatherData.location}</h2>
        <img 
          src={getWeatherIcon(weatherData.icon)} 
          alt={weatherData.description} 
          className="w-16 h-16"
        />
      </div>
      
      <div className="mb-4">
        <div className="text-4xl font-bold mb-1">{weatherData.temperature}°F</div>
        <div className="text-gray-600 dark:text-gray-300 capitalize">{weatherData.description}</div>
      </div>
      
      <div className="grid grid-cols-3 gap-2 text-sm">
        <div className="bg-gray-50 dark:bg-gray-700 p-2 rounded">
          <div className="text-gray-500 dark:text-gray-400">Wind</div>
          <div className="font-medium">{weatherData.windSpeed} mph</div>
        </div>
        <div className="bg-gray-50 dark:bg-gray-700 p-2 rounded">
          <div className="text-gray-500 dark:text-gray-400">Humidity</div>
          <div className="font-medium">{weatherData.humidity}%</div>
        </div>
        <div className="bg-gray-50 dark:bg-gray-700 p-2 rounded">
          <div className="text-gray-500 dark:text-gray-400">Rain</div>
          <div className="font-medium">{weatherData.precipitation} mm</div>
        </div>
      </div>
    </div>
  );
};

export default WeatherDisplay; 