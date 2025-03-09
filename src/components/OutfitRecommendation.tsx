'use client';

import React from 'react';
import { OutfitRecommendation as OutfitType } from '../utils/outfitRecommendations';
import { savePreference } from '../utils/outfitRecommendations';

interface OutfitRecommendationProps {
  outfit: OutfitType | null;
  isLoading: boolean;
}

const OutfitRecommendation: React.FC<OutfitRecommendationProps> = ({ outfit, isLoading }) => {
  const handleLike = () => {
    savePreference(true);
    alert('Thanks for your feedback! We\'ll improve your recommendations.');
  };

  const handleDislike = () => {
    savePreference(false);
    alert('Thanks for your feedback! We\'ll improve your recommendations.');
  };

  if (isLoading) {
    return (
      <div className="animate-pulse">
        <div className="h-6 bg-[#2a2a2a] rounded w-1/2 mb-6"></div>
        <div className="h-4 bg-[#2a2a2a] rounded w-full mb-4"></div>
        <div className="h-4 bg-[#2a2a2a] rounded w-5/6 mb-4"></div>
        <div className="h-4 bg-[#2a2a2a] rounded w-4/6 mb-4"></div>
        <div className="h-4 bg-[#2a2a2a] rounded w-3/6 mb-6"></div>
        <div className="flex space-x-4">
          <div className="h-10 bg-[#2a2a2a] rounded w-24"></div>
          <div className="h-10 bg-[#2a2a2a] rounded w-24"></div>
        </div>
      </div>
    );
  }

  if (!outfit) {
    return null;
  }

  return (
    <div>
      <div className="space-y-6 mb-8">
        <div className="flex items-start">
          <span className="text-[var(--text-secondary)] w-32">Top:</span>
          <span className="font-medium">{outfit.top}</span>
        </div>
        
        {outfit.outerwear && (
          <div className="flex items-start">
            <span className="text-[var(--text-secondary)] w-32">Outerwear:</span>
            <span className="font-medium">{outfit.outerwear}</span>
          </div>
        )}
        
        <div className="flex items-start">
          <span className="text-[var(--text-secondary)] w-32">Bottom:</span>
          <span className="font-medium">{outfit.bottom}</span>
        </div>
        
        <div className="flex items-start">
          <span className="text-[var(--text-secondary)] w-32">Footwear:</span>
          <span className="font-medium">{outfit.footwear}</span>
        </div>
        
        {outfit.accessories.length > 0 && (
          <div className="flex items-start">
            <span className="text-[var(--text-secondary)] w-32">Accessories:</span>
            <span className="font-medium">{outfit.accessories.join(', ')}</span>
          </div>
        )}
      </div>
      
      <div className="flex space-x-4">
        <button 
          onClick={handleLike}
          className="px-6 py-3 bg-[#2a2a2a] hover:bg-[#3a3a3a] text-white rounded-xl transition-colors flex items-center"
        >
          <span className="mr-2 text-xl">👍</span> Like
        </button>
        <button 
          onClick={handleDislike}
          className="px-6 py-3 bg-[#2a2a2a] hover:bg-[#3a3a3a] text-white rounded-xl transition-colors flex items-center"
        >
          <span className="mr-2 text-xl">👎</span> Dislike
        </button>
      </div>
    </div>
  );
};

export default OutfitRecommendation; 