import React from 'react';
import { Heart, ArrowLeft, Layers, Compass } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { PropertyCard } from './PropertyCard';

export const FavoritesView: React.FC = () => {
  const { favorites, properties, setActiveView } = useApp();

  const favoriteProperties = properties.filter(p => favorites.includes(p.id));

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveView('marketplace')}
            className="p-2 bg-white rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h1 className="text-2xl font-black text-slate-900 font-heading">
              My Saved Plots & Wishlist
            </h1>
            <p className="text-xs text-slate-500">
              {favoriteProperties.length} properties saved for comparison and inquiry
            </p>
          </div>
        </div>
      </div>

      {favoriteProperties.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {favoriteProperties.map(p => (
            <PropertyCard key={p.id} property={p} viewMode="grid" />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-16 text-center border border-slate-200 shadow-sm">
          <Heart className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="font-bold text-lg text-slate-800">Your Wishlist is Empty</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1 mb-6">
            Click the heart icon on any plot or property card to save it here for quick access.
          </p>
          <button
            onClick={() => setActiveView('marketplace')}
            className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl transition-colors shadow-md"
          >
            Explore Verified Plots
          </button>
        </div>
      )}
    </div>
  );
};
