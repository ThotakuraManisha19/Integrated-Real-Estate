import React from 'react';
import { 
  Heart, 
  MapPin, 
  Compass, 
  Road, 
  Maximize2, 
  Phone, 
  MessageSquare, 
  Layers, 
  FileText,
  CornerRightUp,
  ShieldCheck,
  CheckCircle2,
  UserCheck
} from 'lucide-react';
import { PropertyItem } from '../../types';
import { useApp } from '../../context/AppContext';
import { formatPrice, getPropertyTypeLabel, getApprovalStatusBadge } from '../../utils/formatters';
import { VerifiedBadge } from '../common/VerifiedBadge';

interface PropertyCardProps {
  property: PropertyItem;
  viewMode?: 'grid' | 'list';
}

export const PropertyCard: React.FC<PropertyCardProps> = ({ 
  property,
  viewMode = 'grid'
}) => {
  const { 
    favorites, 
    toggleFavorite, 
    comparisonList, 
    toggleCompare, 
    setSelectedProperty,
    setActiveInquiryProperty,
    setMapSelectedPropertyId,
    openBookAgentModal
  } = useApp();

  const isFavorited = favorites.includes(property.id);
  const isCompared = comparisonList.includes(property.id);
  const isPlot = property.category === 'plot';
  const approvalBadge = getApprovalStatusBadge(property.approvalStatus);

  return (
    <div 
      className={`bg-white rounded-2xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 group flex ${
        viewMode === 'list' ? 'flex-col md:flex-row' : 'flex-col'
      }`}
      onMouseEnter={() => setMapSelectedPropertyId(property.id)}
    >
      {/* Image Container */}
      <div className={`relative overflow-hidden ${viewMode === 'list' ? 'md:w-72 shrink-0 h-56 md:h-auto' : 'h-52 w-full'}`}>
        <img
          src={property.images[0] || 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80'}
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 items-start">
          <VerifiedBadge property={property} size="sm" />
          
          {property.isCornerPlot && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500 text-slate-950 shadow-sm">
              <CornerRightUp className="w-3 h-3" /> Corner Plot
            </span>
          )}
        </div>

        {/* Favorite & Compare Badges */}
        <div className="absolute top-3 right-3 flex items-center gap-1.5">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              toggleFavorite(property.id);
            }}
            className={`p-2 rounded-full backdrop-blur-md transition-all ${
              isFavorited 
                ? 'bg-rose-500 text-white shadow-md' 
                : 'bg-white/80 text-slate-700 hover:bg-white'
            }`}
            title={isFavorited ? 'Remove from Wishlist' : 'Add to Wishlist'}
          >
            <Heart className="w-4 h-4" fill={isFavorited ? 'currentColor' : 'none'} />
          </button>
        </div>

        {/* Bottom Image Overlay Info */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs">
          <span className="font-semibold bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-md">
            {getPropertyTypeLabel(property.propertyType)}
          </span>
          <span className="font-mono text-[11px] bg-slate-900/80 px-2 py-0.5 rounded">
            {property.documents?.length || 0} Docs Ready
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Price & Approval status */}
          <div className="flex items-start justify-between gap-2 mb-2">
            <div>
              <div className="text-xl font-black text-slate-900 font-heading tracking-tight">
                {formatPrice(property.price)}
              </div>
              <div className="text-xs text-slate-500 font-semibold">
                ₹{property.pricePerUnit?.toLocaleString()} / {property.sizeUnit === 'acres' ? 'acre' : 'sq.ft'}
                {property.isNegotiable && <span className="text-emerald-600 font-normal ml-1">(Negotiable)</span>}
              </div>
            </div>

            <span className={`text-[11px] font-bold px-2 py-1 rounded-lg border ${approvalBadge.bg} ${approvalBadge.border}`}>
              {property.approvalStatus}
            </span>
          </div>

          {/* Title */}
          <h3 
            onClick={() => setSelectedProperty(property)}
            className="font-bold text-slate-800 text-sm hover:text-emerald-700 transition-colors line-clamp-1 cursor-pointer mb-1"
          >
            {property.title}
          </h3>

          {/* Location */}
          <div className="flex items-center gap-1 text-xs text-slate-500 mb-3">
            <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span className="line-clamp-1">{property.locality}, {property.city}</span>
          </div>

          {/* Plot Specifications Grid */}
          <div className="grid grid-cols-3 gap-2 py-2.5 px-3 bg-slate-50 rounded-xl border border-slate-100 text-xs mb-3">
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-semibold block">Plot Size</span>
              <span className="font-bold text-slate-800">{property.plotSize} {property.sizeUnit}</span>
            </div>

            <div>
              <span className="text-[10px] text-slate-400 uppercase font-semibold block">Facing</span>
              <span className="font-bold text-emerald-700">{property.facing}</span>
            </div>

            <div>
              <span className="text-[10px] text-slate-400 uppercase font-semibold block">Road Width</span>
              <span className="font-bold text-slate-800">{property.roadWidth} Ft</span>
            </div>
          </div>

          {/* Survey & Dimensions snippet */}
          <div className="flex items-center justify-between text-[11px] text-slate-500 mb-3 px-1">
            <span>Dim: <strong className="text-slate-700 font-mono">{property.dimensions?.length}×{property.dimensions?.breadth} {property.dimensions?.unit}</strong></span>
            <span>Survey: <strong className="text-slate-700 font-mono">{property.surveyNumber}</strong></span>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
          {/* Compare Checkbox */}
          <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={isCompared}
              onChange={() => toggleCompare(property.id)}
              className="w-3.5 h-3.5 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500"
            />
            <span>Compare</span>
          </label>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => openBookAgentModal(property)}
              className="px-2.5 py-1.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 hover:text-indigo-900 border border-indigo-200 text-xs font-bold transition-colors flex items-center gap-1"
              title="Book Middleman Agent to Inspect This Plot"
            >
              <UserCheck className="w-3.5 h-3.5 text-indigo-600" />
              <span>Book Agent</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveInquiryProperty(property)}
              className="p-2 rounded-xl bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-colors border border-emerald-200"
              title="Contact Owner / Agent"
            >
              <Phone className="w-3.5 h-3.5" />
            </button>

            <button
              type="button"
              onClick={() => setSelectedProperty(property)}
              className="px-3.5 py-1.5 rounded-xl bg-slate-900 text-white hover:bg-slate-800 text-xs font-bold transition-colors shadow-sm"
            >
              View Plot
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
