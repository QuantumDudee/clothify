import { WeatherData } from './weatherService';

export interface OutfitRecommendation {
  top: string;
  bottom: string;
  footwear: string;
  accessories: string[];
  outerwear?: string;
}

// Function to get outfit recommendations based on weather data
export function getOutfitRecommendation(weatherData: WeatherData): OutfitRecommendation {
  const { temperature, windSpeed, precipitation, description } = weatherData;
  
  // Default outfit
  let outfit: OutfitRecommendation = {
    top: 'T-shirt',
    bottom: 'Jeans',
    footwear: 'Sneakers',
    accessories: [],
    outerwear: undefined
  };
  
  // Temperature-based recommendations
  if (temperature < 32) {
    // Very cold
    outfit = {
      top: 'Thermal shirt with sweater',
      bottom: 'Insulated pants or thick jeans',
      footwear: 'Insulated winter boots',
      accessories: ['Beanie', 'Scarf', 'Gloves'],
      outerwear: 'Heavy winter coat'
    };
  } else if (temperature < 50) {
    // Cold
    outfit = {
      top: 'Long-sleeve shirt with light sweater',
      bottom: 'Jeans or chinos',
      footwear: 'Boots or closed shoes',
      accessories: ['Light scarf'],
      outerwear: 'Jacket or coat'
    };
  } else if (temperature < 65) {
    // Cool
    outfit = {
      top: 'Long-sleeve shirt',
      bottom: 'Jeans or chinos',
      footwear: 'Sneakers or loafers',
      accessories: [],
      outerwear: 'Light jacket'
    };
  } else if (temperature < 75) {
    // Mild
    outfit = {
      top: 'T-shirt or light shirt',
      bottom: 'Jeans, chinos, or shorts',
      footwear: 'Sneakers or casual shoes',
      accessories: [],
      outerwear: undefined
    };
  } else if (temperature < 85) {
    // Warm
    outfit = {
      top: 'T-shirt or light shirt',
      bottom: 'Shorts or light pants',
      footwear: 'Sneakers or sandals',
      accessories: ['Sunglasses'],
      outerwear: undefined
    };
  } else {
    // Hot
    outfit = {
      top: 'Light T-shirt or tank top',
      bottom: 'Shorts',
      footwear: 'Sandals or light shoes',
      accessories: ['Sunglasses', 'Hat'],
      outerwear: undefined
    };
  }
  
  // Precipitation-based adjustments
  if (precipitation > 0 || description.includes('rain') || description.includes('drizzle')) {
    outfit.accessories.push('Umbrella');
    outfit.footwear = 'Waterproof shoes or boots';
    if (!outfit.outerwear) {
      outfit.outerwear = 'Rain jacket';
    }
  }
  
  // Wind-based adjustments
  if (windSpeed > 15) {
    if (!outfit.outerwear) {
      outfit.outerwear = 'Windbreaker';
    }
    if (temperature < 60) {
      outfit.accessories.push('Scarf');
    }
  }
  
  // Snow-based adjustments
  if (description.includes('snow')) {
    outfit.footwear = 'Snow boots';
    outfit.accessories.push('Gloves');
    if (temperature < 40) {
      outfit.accessories.push('Beanie');
    }
  }
  
  return outfit;
}

// Function to save user preferences to local storage
export function savePreference(liked: boolean): void {
  try {
    const preferences = JSON.parse(localStorage.getItem('clothify_preferences') || '{}');
    const date = new Date().toISOString().split('T')[0]; // Get current date in YYYY-MM-DD format
    
    preferences[date] = liked;
    localStorage.setItem('clothify_preferences', JSON.stringify(preferences));
  } catch (error) {
    console.error('Error saving preference:', error);
  }
}

// Function to get user preferences from local storage
export function getPreferences(): Record<string, boolean> {
  try {
    return JSON.parse(localStorage.getItem('clothify_preferences') || '{}');
  } catch (error) {
    console.error('Error getting preferences:', error);
    return {};
  }
} 