import React, { useState } from 'react';
import { 
  Search, 
  MapPin, 
  Grid, 
  List, 
  Map as MapIcon, 
  SlidersHorizontal, 
  ShieldCheck, 
  CornerRightUp, 
  Sparkles,
  ArrowUpDown,
  Compass,
  TreePine,
  Building2
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { PropertyCard } from './PropertyCard';
import { FilterSidebar } from './FilterSidebar';
import { PropertyMap } from '../map/PropertyMap';
import { PropertyItem, PropertyType, PropertyCategory } from '../../types';
import { formatPrice } from '../../utils/formatters';

export const MarketplaceView: React.FC = () => {
  const { 
    filteredProperties, 
    filters, 
    updateFilter, 
    setSelectedProperty,
    mapSelectedPropertyId,
    setMapSelectedPropertyId,
    isFilterFallback,
    resetFilters,
    resetToMockData
  } = useApp();

  const [viewMode, setViewMode] = useState<'grid' | 'list' | 'map_split'>('map_split');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Quick Hero Category Filter
  const heroCategories: { label: string; cat: PropertyCategory | 'all'; type?: PropertyType; icon: string }[] = [
    { label: 'All Listings', cat: 'all', icon: '✨' },
    { label: 'Residential Plots', cat: 'plot', type: 'residential_plot', icon: '🏡' },
    { label: 'Commercial Land', cat: 'plot', type: 'commercial_plot', icon: '🏬' },
    { label: 'Agri / Farmlands', cat: 'plot', type: 'agricultural_farm', icon: '🌾' },
    { label: 'Villas & Houses', cat: 'property', type: 'house_villa', icon: '🏰' },
    { label: 'Apartments', cat: 'property', type: 'apartment', icon: '🏢' },
  ];

  const handleHeroCategoryClick = (cat: PropertyCategory | 'all', type?: PropertyType) => {
    updateFilter('category', cat);
    if (type) {
      updateFilter('propertyTypes', [type]);
    } else {
      updateFilter('propertyTypes', []);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Hero Search & Discovery Banner */}
      <section className="relative rounded-3xl overflow-hidden bg-slate-900 text-white p-6 sm:p-10 shadow-2xl border border-slate-800">
        {/* Background photo overlay */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1600&q=80')] bg-cover bg-center opacity-25 mix-blend-overlay" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/90 to-emerald-950/80" />

        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>Over 100% RERA & Legal Document Verified Plots</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black font-heading leading-tight tracking-tight">
            Discover Verified <span className="text-emerald-400">Plots & Lands</span> for Sale
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Direct owner & verified agent listings with digitized 30-year mother deeds, layout approval drawings, and exact GPS boundary demarcations.
          </p>

          {/* Main Search Input */}
          <div className="pt-2">
            <div className="bg-white/95 backdrop-blur-md rounded-2xl p-2 shadow-2xl flex flex-col sm:flex-row items-center gap-2 border border-slate-200">
              <div className="flex-1 flex items-center gap-2 px-3 py-1 w-full text-slate-800">
                <Search className="w-5 h-5 text-slate-400 shrink-0" />
                <input
                  type="text"
                  placeholder="Search by city, locality, plot size, survey number..."
                  value={filters.searchQuery}
                  onChange={(e) => updateFilter('searchQuery', e.target.value)}
                  className="w-full bg-transparent text-sm font-semibold text-slate-900 focus:outline-none placeholder:text-slate-400"
                />
              </div>

              <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 w-full sm:w-auto">
                <select
                  value={filters.city}
                  onChange={(e) => updateFilter('city', e.target.value)}
                  className="w-full sm:w-32 px-3 py-2.5 bg-slate-100 border-none rounded-xl text-xs font-bold text-slate-800 focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="">All Cities</option>
                  <option value="Bangalore">Bangalore</option>
                  <option value="Hyderabad">Hyderabad</option>
                  <option value="Pune">Pune</option>
                  <option value="Chennai">Chennai</option>
                </select>

                <select
                  value={
                    filters.minPrice === 0 && filters.maxPrice >= 100000000 ? 'all' :
                    filters.minPrice === 0 && filters.maxPrice === 5000000 ? 'u50' :
                    filters.minPrice === 5000000 && filters.maxPrice === 10000000 ? '50-100' :
                    filters.minPrice === 10000000 && filters.maxPrice === 20000000 ? '100-200' :
                    filters.minPrice === 20000000 && filters.maxPrice === 40000000 ? '200-400' :
                    filters.minPrice >= 40000000 ? 'a400' : 'custom'
                  }
                  onChange={(e) => {
                    const val = e.target.value;
                    if (val === 'all') {
                      updateFilter('minPrice', 0);
                      updateFilter('maxPrice', 100000000);
                    } else if (val === 'u50') {
                      updateFilter('minPrice', 0);
                      updateFilter('maxPrice', 5000000);
                    } else if (val === '50-100') {
                      updateFilter('minPrice', 5000000);
                      updateFilter('maxPrice', 10000000);
                    } else if (val === '100-200') {
                      updateFilter('minPrice', 10000000);
                      updateFilter('maxPrice', 20000000);
                    } else if (val === '200-400') {
                      updateFilter('minPrice', 20000000);
                      updateFilter('maxPrice', 40000000);
                    } else if (val === 'a400') {
                      updateFilter('minPrice', 40000000);
                      updateFilter('maxPrice', 100000000);
                    }
                  }}
                  className="w-full sm:w-36 px-3 py-2.5 bg-slate-100 border-none rounded-xl text-xs font-bold text-slate-800 focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="all">Any Budget</option>
                  <option value="u50">Under ₹50 Lakh</option>
                  <option value="50-100">₹50L - ₹1 Cr</option>
                  <option value="100-200">₹1 Cr - ₹2 Cr</option>
                  <option value="200-400">₹2 Cr - ₹4 Cr</option>
                  <option value="a400">Above ₹4 Cr</option>
                  {filters.minPrice > 0 || (filters.maxPrice < 100000000 && ![5000000, 10000000, 20000000, 40000000].includes(filters.maxPrice)) ? (
                    <option value="custom">
                      {filters.minPrice > 0 ? `${formatPrice(filters.minPrice)} - ` : '< '}{formatPrice(filters.maxPrice)}
                    </option>
                  ) : null}
                </select>

                <button
                  onClick={() => updateFilter('isVerifiedOnly', !filters.isVerifiedOnly)}
                  className={`px-3.5 py-2.5 rounded-xl text-xs font-bold transition-colors shrink-0 flex items-center gap-1.5 ${
                    filters.isVerifiedOnly 
                      ? 'bg-emerald-600 text-white shadow-md' 
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span className="hidden sm:inline">Verified Only</span>
                </button>
              </div>
            </div>
          </div>

          {/* Hero Category Filter Pills */}
          <div className="flex flex-wrap gap-2 pt-2">
            {heroCategories.map((hc, idx) => {
              const isSelected = 
                filters.category === hc.cat && 
                (!hc.type || filters.propertyTypes.includes(hc.type));

              return (
                <button
                  key={idx}
                  onClick={() => handleHeroCategoryClick(hc.cat, hc.type)}
                  className={`text-xs px-3.5 py-1.5 rounded-xl font-bold transition-all flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-emerald-500 text-slate-950 shadow-md font-black'
                      : 'bg-slate-800/80 hover:bg-slate-800 text-slate-300 border border-slate-700/60'
                  }`}
                >
                  <span>{hc.icon}</span>
                  <span>{hc.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Filter Sidebar (Desktop) */}
        <div className="hidden lg:block lg:col-span-3 sticky top-24">
          <FilterSidebar />
        </div>

        {/* Right: Listings & Map Area */}
        <div className="lg:col-span-9 space-y-4">
          
          {/* Controls Bar: Total Found, Sort, View Modes */}
          <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            
            {/* Left Info & Mobile Filter Trigger */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
                className="lg:hidden px-3 py-2 bg-slate-100 rounded-xl text-xs font-bold text-slate-800 flex items-center gap-1.5"
              >
                <SlidersHorizontal className="w-4 h-4 text-emerald-600" />
                Filters
              </button>

              <div>
                <h2 className="text-sm font-black text-slate-900">
                  Showing {filteredProperties.length} Properties & Plots
                </h2>
                <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                  <span>{filters.city ? `in ${filters.city}` : 'Across all locations'}</span>
                  {(filters.minPrice > 0 || (filters.maxPrice > 0 && filters.maxPrice < 100000000)) && (
                    <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200 text-[11px]">
                      {filters.minPrice > 0 && filters.maxPrice < 100000000
                        ? `${formatPrice(filters.minPrice)} – ${formatPrice(filters.maxPrice)}`
                        : filters.minPrice > 0
                        ? `> ${formatPrice(filters.minPrice)}`
                        : `< ${formatPrice(filters.maxPrice)}`}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Right: Sort By & View Mode Buttons */}
            <div className="flex items-center gap-3">
              {/* Sort Dropdown */}
              <div className="flex items-center gap-1.5 text-xs text-slate-600 font-semibold">
                <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
                <select
                  value={filters.sortBy}
                  onChange={(e) => updateFilter('sortBy', e.target.value as any)}
                  className="px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="featured">Featured First</option>
                  <option value="verified_first">Verified Badge First</option>
                  <option value="price_asc">Price: Low to High</option>
                  <option value="price_desc">Price: High to Low</option>
                  <option value="size_desc">Plot Size: Largest First</option>
                  <option value="newest">Newest Listed</option>
                </select>
              </div>

              {/* View Switcher: Split Map / Grid / List */}
              <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-slate-600">
                <button
                  onClick={() => setViewMode('map_split')}
                  className={`p-1.5 rounded-lg transition-colors ${
                    viewMode === 'map_split' ? 'bg-white text-slate-900 shadow-xs' : 'hover:text-slate-900'
                  }`}
                  title="Split View (Listings + Map)"
                >
                  <MapIcon className="w-4 h-4" />
                </button>

                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded-lg transition-colors ${
                    viewMode === 'grid' ? 'bg-white text-slate-900 shadow-xs' : 'hover:text-slate-900'
                  }`}
                  title="Grid View"
                >
                  <Grid className="w-4 h-4" />
                </button>

                <button
                  onClick={() => setViewMode('list')}
                  className={`p-1.5 rounded-lg transition-colors ${
                    viewMode === 'list' ? 'bg-white text-slate-900 shadow-xs' : 'hover:text-slate-900'
                  }`}
                  title="List View"
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Fallback Relaxed Matching Alert Banner */}
          {isFilterFallback && (
            <div className="bg-gradient-to-r from-amber-50 to-emerald-50 border border-amber-200/90 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs animate-fadeIn">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0 font-bold shadow-xs">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-black text-slate-900">
                    {filters.maxPrice < 4200000
                      ? 'Showing Closest Entry-Level Options'
                      : 'Showing Top Recommended Plots, Lands & Buildings'}
                  </h4>
                  <p className="text-xs text-slate-600 mt-0.5">
                    {filters.maxPrice < 4200000
                      ? `No properties are currently listed under ${formatPrice(filters.maxPrice)}. Showing the closest verified plots starting at ₹42 Lakh.`
                      : filters.maxPrice < 100000000
                      ? `Showing verified options matching your budget range up to ${formatPrice(filters.maxPrice)} across available locations.`
                      : `We relaxed rigid secondary criteria so you don't miss out on prime land & high-rise opportunities.`}
                  </p>
                </div>
              </div>
              <button
                onClick={resetFilters}
                className="self-start sm:self-auto px-3.5 py-1.5 rounded-xl bg-white border border-slate-200 hover:border-slate-300 text-xs font-bold text-slate-700 shadow-2xs hover:bg-slate-50 transition-all shrink-0"
              >
                Clear All Filters
              </button>
            </div>
          )}

          {/* Mobile Filter Drawer */}
          {isMobileFilterOpen && (
            <div className="lg:hidden">
              <FilterSidebar />
            </div>
          )}

          {/* SPLIT VIEW (Map + Cards side-by-side or stacked) */}
          {viewMode === 'map_split' && (
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
              {/* Left Column: Property Cards */}
              <div className="xl:col-span-7 space-y-4">
                {filteredProperties.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {filteredProperties.map(p => (
                      <PropertyCard key={p.id} property={p} viewMode="grid" />
                    ))}
                  </div>
                ) : (
                  <div className="bg-white rounded-2xl p-10 text-center border border-slate-200">
                    <Compass className="w-10 h-10 text-emerald-600 mx-auto mb-2.5 animate-pulse" />
                    <h3 className="font-bold text-base text-slate-900">Discovering Land & Building Opportunities</h3>
                    <p className="text-xs text-slate-500 mt-1 mb-4">
                      Explore our full portfolio of RERA-approved plots, farmland & apartments.
                    </p>
                    <button
                      onClick={resetToMockData}
                      className="px-4 py-2 bg-emerald-600 text-white text-xs font-bold rounded-xl shadow-xs"
                    >
                      Show All Listings
                    </button>
                  </div>
                )}
              </div>

              {/* Right Column: Sticky Interactive Leaflet Map */}
              <div className="xl:col-span-5 sticky top-24 h-[580px]">
                <PropertyMap
                  properties={filteredProperties}
                  selectedPropertyId={mapSelectedPropertyId}
                  onSelectProperty={(prop) => setSelectedProperty(prop)}
                  height="100%"
                />
              </div>
            </div>
          )}

          {/* GRID VIEW */}
          {viewMode === 'grid' && (
            <div>
              {filteredProperties.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                  {filteredProperties.map(p => (
                    <PropertyCard key={p.id} property={p} viewMode="grid" />
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-2xl p-10 text-center border border-slate-200">
                  <Compass className="w-10 h-10 text-emerald-600 mx-auto mb-2.5" />
                  <h3 className="font-bold text-base text-slate-900">Discovering Land & Building Opportunities</h3>
                  <button
                    onClick={resetToMockData}
                    className="mt-4 px-4 py-2 bg-emerald-600 text-white text-xs font-bold rounded-xl shadow-xs"
                  >
                    Show All Listings
                  </button>
                </div>
              )}
            </div>
          )}

          {/* LIST VIEW */}
          {viewMode === 'list' && (
            <div className="space-y-4">
              {filteredProperties.length > 0 ? (
                filteredProperties.map(p => (
                  <PropertyCard key={p.id} property={p} viewMode="list" />
                ))
              ) : (
                <div className="bg-white rounded-2xl p-10 text-center border border-slate-200">
                  <Compass className="w-10 h-10 text-emerald-600 mx-auto mb-2.5" />
                  <h3 className="font-bold text-base text-slate-900">Discovering Land & Building Opportunities</h3>
                  <button
                    onClick={resetToMockData}
                    className="mt-4 px-4 py-2 bg-emerald-600 text-white text-xs font-bold rounded-xl shadow-xs"
                  >
                    Show All Listings
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
