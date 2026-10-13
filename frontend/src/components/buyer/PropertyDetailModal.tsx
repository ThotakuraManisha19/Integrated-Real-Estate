import React, { useState } from 'react';
import { 
  X, 
  MapPin, 
  Compass, 
  Layers, 
  FileText, 
  ShieldCheck, 
  CheckCircle2, 
  Phone, 
  MessageSquare, 
  Share2, 
  Heart, 
  Calculator, 
  ArrowRightLeft, 
  CornerRightUp, 
  Sun,
  Printer,
  Sparkles,
  Eye,
  UserCheck
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { 
  formatExactPrice, 
  getPropertyTypeLabel, 
  getApprovalStatusBadge 
} from '../../utils/formatters';
import { VerifiedBadge } from '../common/VerifiedBadge';
import { PlotDimensionVisualizer } from '../common/PlotDimensionVisualizer';
import { PropertyMap } from '../map/PropertyMap';

export const PropertyDetailModal: React.FC = () => {
  const { 
    selectedProperty, 
    setSelectedProperty, 
    favorites, 
    toggleFavorite,
    setInspectedDocument,
    setActiveInquiryProperty,
    setIsLoanCalculatorOpen,
    setIsUnitConverterOpen,
    setAdminVerificationModalProperty,
    setIsVastuModalOpen,
    setIsFactsheetModalOpen,
    setIsLiveChatOpen,
    setFactsheetProperty,
    setChatProperty,
    currentRole,
    openBookAgentModal
  } = useApp();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [copiedLink, setCopiedLink] = useState(false);

  if (!selectedProperty) return null;

  const property = selectedProperty;
  const isFavorited = favorites.includes(property.id);
  const approvalBadge = getApprovalStatusBadge(property.approvalStatus);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleOpenFactsheet = () => {
    setFactsheetProperty(property);
    setIsFactsheetModalOpen(true);
  };

  const handleOpenVastu = () => {
    setIsVastuModalOpen(true);
  };

  const handleOpenLiveChat = () => {
    setChatProperty(property);
    setIsLiveChatOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-6xl h-[94vh] flex flex-col overflow-hidden">
        
        {/* Top Floating Action Bar */}
        <div className="bg-white px-6 py-4 border-b border-slate-200 flex items-center justify-between z-10 shrink-0">
          <div className="flex items-center gap-2 sm:gap-3">
            <VerifiedBadge property={property} size="lg" />
            <span className={`text-xs font-bold px-3 py-1 rounded-full border ${approvalBadge.bg} ${approvalBadge.border}`}>
              {property.approvalStatus}
            </span>
            {property.isCornerPlot && (
              <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-500 text-slate-950">
                <CornerRightUp className="w-3.5 h-3.5" /> Corner Plot
              </span>
            )}
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Vastu Trigger */}
            <button
              onClick={handleOpenVastu}
              className="px-3 py-1.5 rounded-xl bg-amber-50 text-amber-900 hover:bg-amber-100 text-xs font-bold flex items-center gap-1.5 border border-amber-200 transition-colors"
              title="Vastu Score"
            >
              <Sun className="w-3.5 h-3.5 text-amber-600" />
              <span className="hidden md:inline">Vastu Score ({property.vastu?.score || 95}%)</span>
            </button>

            {/* Factsheet PDF Dossier */}
            <button
              onClick={handleOpenFactsheet}
              className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold flex items-center gap-1.5 transition-colors border border-slate-300"
              title="Print Factsheet"
            >
              <Printer className="w-3.5 h-3.5 text-slate-700" />
              <span className="hidden md:inline">Factsheet</span>
            </button>

            {/* Admin direct verify button */}
            {currentRole === 'admin' && (
              <button
                onClick={() => setAdminVerificationModalProperty(property)}
                className="px-3 py-1.5 rounded-xl bg-purple-100 text-purple-800 hover:bg-purple-200 text-xs font-bold flex items-center gap-1.5 transition-colors"
              >
                <ShieldCheck className="w-4 h-4 text-purple-700" />
                Audit Listing
              </button>
            )}

            <button
              onClick={() => setIsUnitConverterOpen(true)}
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
              title="Unit Converter"
            >
              <ArrowRightLeft className="w-4 h-4 text-emerald-600" />
            </button>

            <button
              onClick={() => setIsLoanCalculatorOpen(true)}
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
              title="EMI Calculator"
            >
              <Calculator className="w-4 h-4 text-emerald-600" />
            </button>

            <button
              onClick={() => openBookAgentModal(property)}
              className="p-2 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 transition-colors"
              title="Book Middleman Agent / Field Surveyor"
            >
              <UserCheck className="w-4 h-4 text-indigo-600" />
            </button>

            <button
              onClick={handleShare}
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors relative"
              title="Share Link"
            >
              <Share2 className="w-4 h-4" />
              {copiedLink && (
                <span className="absolute -bottom-7 right-0 bg-slate-900 text-white text-[10px] py-0.5 px-2 rounded font-semibold whitespace-nowrap">
                  Link Copied!
                </span>
              )}
            </button>

            <button
              onClick={() => toggleFavorite(property.id)}
              className={`p-2 rounded-xl transition-colors ${
                isFavorited ? 'bg-rose-500 text-white' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
              title="Save to Wishlist"
            >
              <Heart className="w-4 h-4" fill={isFavorited ? 'currentColor' : 'none'} />
            </button>

            <button
              onClick={() => setSelectedProperty(null)}
              className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white transition-colors ml-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8 space-y-8">
          
          {/* Header Title & Price Overview */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 pb-6 border-b border-slate-200">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 uppercase tracking-wider">
                <span>{property.category.toUpperCase()}</span>
                <span>•</span>
                <span>{getPropertyTypeLabel(property.propertyType)}</span>
                <span>•</span>
                <span className="text-slate-500 font-mono">ID: {property.id}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 font-heading leading-snug">
                {property.title}
              </h1>
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{property.address}, {property.locality}, {property.city} - {property.pincode}</span>
              </div>
            </div>

            {/* Price Block */}
            <div className="bg-emerald-50/80 border border-emerald-200 rounded-2xl p-4 lg:text-right shrink-0">
              <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider block">
                Total Asking Price
              </span>
              <div className="text-3xl font-black text-slate-900 font-heading">
                {formatExactPrice(property.price)}
              </div>
              <div className="text-xs font-semibold text-slate-600 mt-0.5">
                ₹{property.pricePerUnit?.toLocaleString()} / {property.sizeUnit === 'acres' ? 'acre' : 'sq.ft'}
                {property.isNegotiable && (
                  <span className="ml-1 text-emerald-700 font-bold bg-emerald-100 px-2 py-0.5 rounded-md">
                    Price Negotiable
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Media Gallery */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            <div className="lg:col-span-9 h-[340px] sm:h-[440px] rounded-2xl overflow-hidden relative shadow-md bg-slate-900">
              <img
                src={property.images[activeImageIndex] || property.images[0]}
                alt={property.title}
                className="w-full h-full object-cover transition-all duration-300"
              />
              <div className="absolute bottom-4 left-4 bg-slate-900/80 backdrop-blur-md text-white text-xs px-3 py-1.5 rounded-lg font-medium">
                Photo {activeImageIndex + 1} of {property.images.length}
              </div>
            </div>

            <div className="lg:col-span-3 flex lg:flex-col gap-3 overflow-x-auto lg:overflow-y-auto max-h-[440px] pr-1">
              {property.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative rounded-xl overflow-hidden shrink-0 w-24 h-20 lg:w-full lg:h-24 border-2 transition-all ${
                    activeImageIndex === idx
                      ? 'border-emerald-500 ring-2 ring-emerald-500/40 shadow-md scale-[1.02]'
                      : 'border-slate-200 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Core Plot Parameters Grid */}
          <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 space-y-4">
            <h3 className="font-bold text-base text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <Layers className="w-5 h-5 text-emerald-600" />
              Plot & Property Specifications
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-sm">
                <span className="text-[10px] font-bold text-slate-400 uppercase block">Plot Size</span>
                <span className="text-base font-black text-slate-900">{property.plotSize} {property.sizeUnit}</span>
                <span className="text-[11px] text-slate-500 block mt-0.5">({property.plotSizeSqFt?.toLocaleString()} sq.ft)</span>
              </div>

              <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-sm">
                <span className="text-[10px] font-bold text-slate-400 uppercase block">Dimensions</span>
                <span className="text-base font-bold text-slate-900 font-mono">
                  {property.dimensions?.length} × {property.dimensions?.breadth} {property.dimensions?.unit}
                </span>
                <span className="text-[11px] text-slate-500 block mt-0.5">Length × Breadth</span>
              </div>

              <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-sm">
                <span className="text-[10px] font-bold text-slate-400 uppercase block">Facing Direction</span>
                <span className="text-base font-bold text-emerald-700">{property.facing}</span>
                <span className="text-[11px] text-slate-500 block mt-0.5">100% Vastu Compliant</span>
              </div>

              <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-sm">
                <span className="text-[10px] font-bold text-slate-400 uppercase block">Road Width</span>
                <span className="text-base font-bold text-slate-900">{property.roadWidth} Feet</span>
                <span className="text-[11px] text-slate-500 block mt-0.5 truncate">{property.roadType}</span>
              </div>

              <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-sm">
                <span className="text-[10px] font-bold text-slate-400 uppercase block">Corner Plot</span>
                <span className={`text-base font-bold ${property.isCornerPlot ? 'text-amber-600' : 'text-slate-700'}`}>
                  {property.isCornerPlot ? 'Yes (Dual Road)' : 'No (Single Road)'}
                </span>
                <span className="text-[11px] text-slate-500 block mt-0.5">Road Access</span>
              </div>

              <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-sm">
                <span className="text-[10px] font-bold text-slate-400 uppercase block">Approval Authority</span>
                <span className="text-sm font-black text-blue-700 truncate block">{property.approvalStatus}</span>
                <span className="text-[10px] text-slate-500 font-mono block mt-0.5">{property.reraId || 'Approved'}</span>
              </div>
            </div>

            {/* Extra Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-xs">
              <div className="flex justify-between py-1.5 px-3 bg-white rounded-lg border border-slate-200">
                <span className="text-slate-500">Survey No:</span>
                <span className="font-mono font-bold text-slate-800">{property.surveyNumber}</span>
              </div>
              <div className="flex justify-between py-1.5 px-3 bg-white rounded-lg border border-slate-200">
                <span className="text-slate-500">Khata Status:</span>
                <span className="font-bold text-slate-800">{property.khataNumber || 'Clear Title'}</span>
              </div>
              <div className="flex justify-between py-1.5 px-3 bg-white rounded-lg border border-slate-200">
                <span className="text-slate-500">Boundary Wall:</span>
                <span className="font-bold text-slate-800">{property.boundaryWall}</span>
              </div>
              <div className="flex justify-between py-1.5 px-3 bg-white rounded-lg border border-slate-200">
                <span className="text-slate-500">Gated Community:</span>
                <span className="font-bold text-emerald-700">{property.gatedCommunity ? 'Yes' : 'No'}</span>
              </div>
            </div>
          </div>

          {/* 2D Plot Blueprint Visualizer */}
          <div>
            <h3 className="font-bold text-base text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-2">
              <Compass className="w-5 h-5 text-emerald-600" />
              Interactive Plot Layout Visualizer & Orientation
            </h3>
            <PlotDimensionVisualizer
              dimensions={property.dimensions}
              facing={property.facing}
              roadWidth={property.roadWidth}
              isCornerPlot={property.isCornerPlot}
              plotSize={property.plotSize}
              sizeUnit={property.sizeUnit}
              boundaryWall={property.boundaryWall}
              surveyNumber={property.surveyNumber}
              roadType={property.roadType}
            />
          </div>

          {/* Document Verification Vault */}
          <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-xl border border-slate-800">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
              <div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-6 h-6 text-emerald-400" />
                  <h3 className="font-bold text-lg text-white">Document Vault & Verification Certificates</h3>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">
                  Uploaded legal deeds, layout sanctions, 7/12 land records and encumbrance certificates
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs bg-emerald-500/20 text-emerald-300 font-bold px-3 py-1 rounded-full border border-emerald-500/30">
                  {property.documents?.length || 0} Documents Uploaded
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              {property.documents && property.documents.length > 0 ? (
                property.documents.map((doc) => (
                  <div
                    key={doc.id}
                    className="bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 rounded-xl p-4 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div className="flex items-center gap-2">
                          <FileText className="w-5 h-5 text-emerald-400 shrink-0" />
                          <h4 className="font-bold text-sm text-slate-100 line-clamp-1">{doc.name}</h4>
                        </div>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                          doc.status === 'verified'
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                            : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                        }`}>
                          {doc.status}
                        </span>
                      </div>

                      <div className="text-xs text-slate-400 space-y-1 my-2">
                        <div className="flex justify-between">
                          <span>Ref / Serial No:</span>
                          <span className="font-mono text-slate-300">{doc.documentNumber || 'REG-4421'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>File Size:</span>
                          <span className="text-slate-300">{doc.fileSize || '3.5 MB'}</span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => setInspectedDocument({ property, document: doc })}
                      className="mt-3 w-full py-2 bg-emerald-600/20 hover:bg-emerald-600 text-emerald-300 hover:text-white rounded-lg text-xs font-bold transition-colors flex items-center justify-center gap-1.5 border border-emerald-500/30"
                    >
                      <Eye className="w-4 h-4" /> View & Inspect Document
                    </button>
                  </div>
                ))
              ) : (
                <div className="col-span-2 text-center py-6 text-slate-500">
                  No documents uploaded yet.
                </div>
              )}
            </div>
          </div>

          {/* Description & Contact Sidebar */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 space-y-6">
              <div>
                <h3 className="font-bold text-lg text-slate-900 mb-3">About this Plot / Property</h3>
                <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-line">
                  {property.description}
                </p>
              </div>

              {property.highlights && property.highlights.length > 0 && (
                <div>
                  <h4 className="font-bold text-sm text-slate-900 uppercase tracking-wider mb-3">
                    Key Property Highlights
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {property.highlights.map((h, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs font-semibold text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="lg:col-span-4 space-y-6">
              {/* Seller Contact Card with Live Chat */}
              <div className="bg-white rounded-2xl p-6 border-2 border-slate-200 shadow-lg space-y-4">
                <div className="flex items-center gap-3">
                  <img
                    src={property.seller.avatar}
                    alt={property.seller.name}
                    className="w-14 h-14 rounded-full object-cover border-2 border-emerald-500"
                  />
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                      {property.seller.type}
                    </span>
                    <h4 className="font-bold text-base text-slate-900 mt-1">{property.seller.name}</h4>
                    <p className="text-xs text-slate-500">{property.seller.agencyName || 'Verified Seller'}</p>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 space-y-2">
                  <button
                    onClick={handleOpenLiveChat}
                    className="w-full py-2.5 bg-emerald-600 text-white hover:bg-emerald-700 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-colors shadow-md shadow-emerald-600/20"
                  >
                    <MessageSquare className="w-4 h-4" /> Live Chat & Make Offer
                  </button>

                  <a
                    href={`tel:${property.seller.phone}`}
                    className="w-full py-2 bg-slate-900 text-white hover:bg-slate-800 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-colors"
                  >
                    <Phone className="w-4 h-4" /> Call {property.seller.phone}
                  </a>

                  <a
                    href={`https://wa.me/${property.seller.whatsapp.replace(/[^0-9]/g, '')}?text=Hi,%20I%20am%20interested%20in%20your%20listing:%20${encodeURIComponent(property.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2 bg-slate-100 text-slate-800 hover:bg-slate-200 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-colors"
                  >
                    WhatsApp Directly
                  </a>

                  <button
                    onClick={() => openBookAgentModal(property)}
                    className="w-full py-2.5 bg-gradient-to-r from-indigo-900 to-indigo-800 text-white hover:from-indigo-800 hover:to-indigo-700 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md shadow-indigo-950/20"
                  >
                    <UserCheck className="w-4 h-4 text-indigo-300" /> Book Middleman Agent 🤝
                  </button>

                  <button
                    onClick={() => setActiveInquiryProperty(property)}
                    className="w-full py-2 bg-emerald-50 text-emerald-800 hover:bg-emerald-100 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-colors border border-emerald-200"
                  >
                    Direct Owner Visit Inquiry
                  </button>
                </div>
              </div>

              {property.nearbyLandmarks && property.nearbyLandmarks.length > 0 && (
                <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-3">
                  <h4 className="font-bold text-xs text-slate-900 uppercase tracking-wider">
                    Nearby Key Locations
                  </h4>
                  <div className="space-y-2 text-xs">
                    {property.nearbyLandmarks.map((nl, i) => (
                      <div key={i} className="flex items-center justify-between text-slate-700">
                        <span>{nl.place}</span>
                        <span className="font-mono font-bold text-emerald-700 bg-white px-2 py-0.5 rounded border border-slate-200">
                          {nl.distance}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Interactive Map with Polygons */}
          <div>
            <h3 className="font-bold text-base text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-emerald-600" />
              Plot Boundary Polygon & Surroundings
            </h3>
            <div className="h-72 rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
              <PropertyMap
                properties={[property]}
                selectedPropertyId={property.id}
                center={[property.coordinates.lat, property.coordinates.lng]}
                zoom={15}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
