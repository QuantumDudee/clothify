import axios from 'axios';

// Define types for weather data
export interface WeatherData {
  temperature: number;
  description: string;
  icon: string;
  windSpeed: number;
  humidity: number;
  precipitation: number;
  location: string;
}

// Function to fetch weather data from OpenWeather API
export async function getWeatherData(city: string): Promise<WeatherData> {
  try {
    // You'll need to sign up for an API key at https://openweathermap.org/
    const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
    
    if (!API_KEY) {
      throw new Error('OpenWeather API key is missing');
    }

    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=imperial`
    );

    const data = response.data;
    
    return {
      temperature: Math.round(data.main.temp),
      description: data.weather[0].description,
      icon: data.weather[0].icon,
      windSpeed: Math.round(data.wind.speed),
      humidity: data.main.humidity,
      precipitation: data.rain ? data.rain['1h'] || 0 : 0,
      location: data.name
    };
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
}

// Function to get user's current location
export function getCurrentLocation(): Promise<GeolocationPosition> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by your browser'));
    } else {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    }
  });
}

// Function to get weather data based on coordinates
export async function getWeatherByCoordinates(lat: number, lon: number): Promise<WeatherData> {
  try {
    const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
    
    if (!API_KEY) {
      throw new Error('OpenWeather API key is missing');
    }

    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=imperial`
    );

    const data = response.data;
    
    return {
      temperature: Math.round(data.main.temp),
      description: data.weather[0].description,
      icon: data.weather[0].icon,
      windSpeed: Math.round(data.wind.speed),
      humidity: data.main.humidity,
      precipitation: data.rain ? data.rain['1h'] || 0 : 0,
      location: data.name
    };
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
} 