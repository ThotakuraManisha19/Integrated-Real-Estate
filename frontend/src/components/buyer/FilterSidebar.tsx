import React from 'react';
import { 
  Filter, 
  RotateCcw, 
  Search, 
  Compass, 
  ShieldCheck, 
  CornerRightUp, 
  MapPin,
  IndianRupee,
  Layers,
  ChevronDown
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { FacingDirection, ApprovalStatus, PropertyType, PropertyCategory } from '../../types';
import { formatPrice } from '../../utils/formatters';

interface FilterSidebarProps {
  isOpenMobile?: boolean;
  onCloseMobile?: () => void;
}

export const FilterSidebar: React.FC<FilterSidebarProps> = ({
  isOpenMobile = false,
  onCloseMobile
}) => {
  const { filters, updateFilter, resetFilters, properties } = useApp();

  // Extract unique cities from properties
  const availableCities = Array.from(new Set(properties.map(p => p.city))).filter(Boolean);

  const facingOptions: FacingDirection[] = [
    'North', 'East', 'West', 'South', 
    'North-East', 'North-West', 'South-East', 'South-West'
  ];

  const approvalOptions: ApprovalStatus[] = [
    'RERA Approved',
    'DTCP Approved',
    'HMDA Approved',
    'BDA Approved',
    'DC Converted',
    'Agricultural Zone'
  ];

  const plotTypes: { key: PropertyType; label: string }[] = [
    { key: 'residential_plot', label: 'Residential Plot' },
    { key: 'commercial_plot', label: 'Commercial Land' },
    { key: 'agricultural_farm', label: 'Agri / Farm Land' },
    { key: 'house_villa', label: 'House / Villa' },
    { key: 'apartment', label: 'Apartment' },
  ];

  const togglePropertyType = (type: PropertyType) => {
    const current = filters.propertyTypes;
    if (current.includes(type)) {
      updateFilter('propertyTypes', current.filter(t => t !== type));
    } else {
      updateFilter('propertyTypes', [...current, type]);
    }
  };

  const toggleFacing = (f: FacingDirection) => {
    const current = filters.facing;
    if (current.includes(f)) {
      updateFilter('facing', current.filter(item => item !== f));
    } else {
      updateFilter('facing', [...current, f]);
    }
  };

  const toggleApproval = (app: ApprovalStatus) => {
    const current = filters.approvalStatuses;
    if (current.includes(app)) {
      updateFilter('approvalStatuses', current.filter(item => item !== app));
    } else {
      updateFilter('approvalStatuses', [...current, app]);
    }
  };

  return (
    <aside className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-emerald-600" />
          <h3 className="font-bold text-sm text-slate-900 uppercase tracking-wider">
            Smart Filters
          </h3>
        </div>
        <button
          onClick={resetFilters}
          className="text-xs text-slate-500 hover:text-emerald-700 font-semibold flex items-center gap-1 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Reset
        </button>
      </div>

      {/* Category Tabs: All / Plots / Properties */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
          Category
        </label>
        <div className="grid grid-cols-3 gap-1 bg-slate-100 p-1 rounded-xl text-xs font-semibold">
          <button
            onClick={() => updateFilter('category', 'all')}
            className={`py-1.5 rounded-lg transition-all ${
              filters.category === 'all'
                ? 'bg-white text-slate-900 shadow-sm font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            All
          </button>
          <button
            onClick={() => updateFilter('category', 'plot')}
            className={`py-1.5 rounded-lg transition-all ${
              filters.category === 'plot'
                ? 'bg-emerald-600 text-white shadow-sm font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Plots 🌳
          </button>
          <button
            onClick={() => updateFilter('category', 'property')}
            className={`py-1.5 rounded-lg transition-all ${
              filters.category === 'property'
                ? 'bg-blue-600 text-white shadow-sm font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Built 🏢
          </button>
        </div>
      </div>

      {/* City & Locality */}
      <div className="space-y-3">
        <div>
          <label className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 block">
            Select City
          </label>
          <select
            value={filters.city}
            onChange={(e) => updateFilter('city', e.target.value)}
            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:ring-2 focus:ring-emerald-500"
          >
            <option value="">All Cities</option>
            {availableCities.map(city => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 block">
            Locality / Area
          </label>
          <div className="relative">
            <MapPin className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="e.g. Whitefield, Gachibowli..."
              value={filters.locality}
              onChange={(e) => updateFilter('locality', e.target.value)}
              className="w-full pl-8 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>
      </div>

      {/* Property Types */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
          Plot / Property Type
        </label>
        <div className="flex flex-wrap gap-1.5">
          {plotTypes.map(t => {
            const isSelected = filters.propertyTypes.includes(t.key);
            return (
              <button
                key={t.key}
                onClick={() => togglePropertyType(t.key)}
                className={`text-xs px-2.5 py-1 rounded-lg border font-medium transition-all ${
                  isSelected
                    ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                    : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                }`}
              >
                {t.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Price / Budget Range */}
      <div className="space-y-3 p-3.5 bg-slate-50/80 rounded-2xl border border-slate-200">
        <div className="flex items-center justify-between text-xs">
          <span className="font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
            <IndianRupee className="w-3.5 h-3.5 text-emerald-600" />
            Budget Range
          </span>
          <span className="font-bold text-emerald-700 font-mono text-xs px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200">
            {filters.minPrice === 0 && filters.maxPrice >= 100000000
              ? 'Any Budget'
              : filters.minPrice === 0
              ? `Up to ${formatPrice(filters.maxPrice)}`
              : filters.maxPrice >= 100000000
              ? `Above ${formatPrice(filters.minPrice)}`
              : `${formatPrice(filters.minPrice)} – ${formatPrice(filters.maxPrice)}`}
          </span>
        </div>

        {/* Quick Budget Preset Buttons */}
        <div className="grid grid-cols-3 gap-1.5 text-[11px] font-semibold">
          {[
            { label: 'All', min: 0, max: 100000000 },
            { label: '< ₹50 L', min: 0, max: 5000000 },
            { label: '₹50L - 1Cr', min: 5000000, max: 10000000 },
            { label: '₹1Cr - 2Cr', min: 10000000, max: 20000000 },
            { label: '₹2Cr - 4Cr', min: 20000000, max: 40000000 },
            { label: '> ₹4 Cr', min: 40000000, max: 100000000 },
          ].map((preset, idx) => {
            const isSelected = filters.minPrice === preset.min && filters.maxPrice === preset.max;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  updateFilter('minPrice', preset.min);
                  updateFilter('maxPrice', preset.max);
                }}
                className={`py-1.5 px-1 rounded-lg border text-center transition-all ${
                  isSelected
                    ? 'bg-emerald-600 text-white border-emerald-600 font-bold shadow-xs'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-emerald-400 hover:bg-emerald-50/50'
                }`}
              >
                {preset.label}
              </button>
            );
          })}
        </div>

        {/* Min & Max Dropdown Selectors */}
        <div className="grid grid-cols-2 gap-2 pt-1">
          <div>
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
              Min Price
            </label>
            <select
              value={filters.minPrice}
              onChange={(e) => updateFilter('minPrice', Number(e.target.value))}
              className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:ring-2 focus:ring-emerald-500"
            >
              <option value={0}>₹0 (Min)</option>
              <option value={3000000}>₹30 Lakh</option>
              <option value={5000000}>₹50 Lakh</option>
              <option value={7500000}>₹75 Lakh</option>
              <option value={10000000}>₹1 Crore</option>
              <option value={15000000}>₹1.5 Crore</option>
              <option value={20000000}>₹2 Crore</option>
              <option value={30000000}>₹3 Crore</option>
            </select>
          </div>

          <div>
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
              Max Price
            </label>
            <select
              value={filters.maxPrice}
              onChange={(e) => updateFilter('maxPrice', Number(e.target.value))}
              className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:ring-2 focus:ring-emerald-500"
            >
              <option value={5000000}>₹50 Lakh</option>
              <option value={7500000}>₹75 Lakh</option>
              <option value={10000000}>₹1 Crore</option>
              <option value={15000000}>₹1.5 Crore</option>
              <option value={20000000}>₹2 Crore</option>
              <option value={30000000}>₹3 Crore</option>
              <option value={50000000}>₹5 Crore</option>
              <option value={100000000}>No Limit (Any)</option>
            </select>
          </div>
        </div>

        {/* Smooth Drag Slider for Max Budget */}
        <div className="pt-1 space-y-1">
          <div className="flex justify-between text-[10px] font-bold text-slate-500">
            <span>Max Budget Slider:</span>
            <span className="text-emerald-700 font-mono">
              {filters.maxPrice >= 100000000 ? 'Any / Max' : formatPrice(filters.maxPrice)}
            </span>
          </div>
          <input
            type="range"
            min="3000000"
            max="50000000"
            step="1000000"
            value={Math.min(filters.maxPrice, 50000000)}
            onChange={(e) => {
              const val = parseFloat(e.target.value);
              updateFilter('maxPrice', val >= 50000000 ? 100000000 : val);
            }}
            className="w-full accent-emerald-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
          />
          <div className="flex justify-between text-[9px] text-slate-400 font-semibold px-0.5">
            <span>₹30L</span>
            <span>₹1 Cr</span>
            <span>₹2 Cr</span>
            <span>₹3.5 Cr</span>
            <span>₹5+ Cr (Any)</span>
          </div>
        </div>
      </div>

      {/* Facing Direction */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
          <Compass className="w-3.5 h-3.5 text-emerald-600" />
          Facing Direction
        </label>
        <div className="grid grid-cols-4 gap-1.5 text-xs">
          {facingOptions.map(f => {
            const isSelected = filters.facing.includes(f);
            return (
              <button
                key={f}
                onClick={() => toggleFacing(f)}
                className={`py-1.5 px-1 rounded-lg border text-center font-semibold transition-all ${
                  isSelected
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                {f}
              </button>
            );
          })}
        </div>
      </div>

      {/* Minimum Road Width */}
      <div className="space-y-2">
        <div className="flex justify-between text-xs">
          <span className="font-bold text-slate-700 uppercase tracking-wider">Min Road Width</span>
          <span className="font-bold text-slate-900 font-mono">
            {filters.minRoadWidth > 0 ? `${filters.minRoadWidth}+ Ft` : 'Any Width'}
          </span>
        </div>
        <div className="grid grid-cols-4 gap-1.5 text-xs">
          {[0, 30, 40, 60].map(w => (
            <button
              key={w}
              onClick={() => updateFilter('minRoadWidth', w)}
              className={`py-1.5 rounded-lg border font-semibold transition-all ${
                filters.minRoadWidth === w
                  ? 'bg-slate-900 text-white border-slate-900'
                  : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
              }`}
            >
              {w === 0 ? 'All' : `${w} Ft+`}
            </button>
          ))}
        </div>
      </div>

      {/* Approval Status */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
          Approval Authority
        </label>
        <div className="flex flex-wrap gap-1.5">
          {approvalOptions.map(app => {
            const isSelected = filters.approvalStatuses.includes(app);
            return (
              <button
                key={app}
                onClick={() => toggleApproval(app)}
                className={`text-xs px-2 py-1 rounded-lg border font-medium transition-all ${
                  isSelected
                    ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                    : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                }`}
              >
                {app}
              </button>
            );
          })}
        </div>
      </div>

      {/* Trust & Plot Toggles */}
      <div className="space-y-3 pt-3 border-t border-slate-100">
        <label className="flex items-center justify-between cursor-pointer p-2 rounded-xl hover:bg-slate-50 transition-colors">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span className="text-xs font-bold text-slate-800">Verified Plots Only</span>
          </div>
          <input
            type="checkbox"
            checked={filters.isVerifiedOnly}
            onChange={(e) => updateFilter('isVerifiedOnly', e.target.checked)}
            className="w-4 h-4 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500"
          />
        </label>

        <label className="flex items-center justify-between cursor-pointer p-2 rounded-xl hover:bg-slate-50 transition-colors">
          <div className="flex items-center gap-2">
            <CornerRightUp className="w-4 h-4 text-amber-500" />
            <span className="text-xs font-bold text-slate-800">Corner Plots Only</span>
          </div>
          <input
            type="checkbox"
            checked={filters.isCornerPlotOnly}
            onChange={(e) => updateFilter('isCornerPlotOnly', e.target.checked)}
            className="w-4 h-4 text-amber-500 rounded border-slate-300 focus:ring-amber-500"
          />
        </label>

        <label className="flex items-center justify-between cursor-pointer p-2 rounded-xl hover:bg-slate-50 transition-colors">
          <div className="flex items-center gap-2">
            <span className="text-xs">🛡️</span>
            <span className="text-xs font-bold text-slate-800">Gated Community</span>
          </div>
          <input
            type="checkbox"
            checked={filters.isGatedCommunityOnly}
            onChange={(e) => updateFilter('isGatedCommunityOnly', e.target.checked)}
            className="w-4 h-4 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500"
          />
        </label>
      </div>
    </aside>
  );
};
