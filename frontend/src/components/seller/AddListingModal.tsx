import React, { useState } from 'react';
import { 
  X, 
  Layers, 
  MapPin, 
  FileText, 
  Upload, 
  Image as ImageIcon, 
  Check, 
  ChevronRight, 
  ChevronLeft, 
  Sparkles,
  ShieldCheck,
  CornerRightUp,
  Trash2,
  FilePlus,
  Compass
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { 
  PropertyCategory, 
  PropertyType, 
  FacingDirection, 
  ApprovalStatus, 
  SizeUnit,
  PropertyDocument,
  Coordinates
} from '../../types';
import { convertToSqFt } from '../../utils/formatters';
import { MapLocationPicker } from '../map/MapLocationPicker';

export const AddListingModal: React.FC = () => {
  const { isAddListingOpen, setIsAddListingOpen, addProperty, addToast } = useApp();

  const [step, setStep] = useState<number>(1);

  // Form State
  const [category, setCategory] = useState<PropertyCategory>('plot');
  const [propertyType, setPropertyType] = useState<PropertyType>('residential_plot');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  
  // Specifications
  const [plotSize, setPlotSize] = useState<number>(1500);
  const [sizeUnit, setSizeUnit] = useState<SizeUnit>('sq.ft');
  const [length, setLength] = useState<number>(50);
  const [breadth, setBreadth] = useState<number>(30);
  const [facing, setFacing] = useState<FacingDirection>('East');
  const [roadWidth, setRoadWidth] = useState<number>(40);
  const [roadType, setRoadType] = useState('CC Concrete Road');
  const [isCornerPlot, setIsCornerPlot] = useState(false);
  const [surveyNumber, setSurveyNumber] = useState('');
  const [khataNumber, setKhataNumber] = useState('E-Khata Class A');
  const [approvalStatus, setApprovalStatus] = useState<ApprovalStatus>('RERA Approved');
  const [reraId, setReraId] = useState('');
  const [boundaryWall, setBoundaryWall] = useState<'Full Gated Wall' | 'Fenced' | 'Open / Marked Pillars' | 'None'>('Full Gated Wall');
  const [gatedCommunity, setGatedCommunity] = useState(true);

  // Location
  const [city, setCity] = useState('Bangalore');
  const [locality, setLocality] = useState('');
  const [address, setAddress] = useState('');
  const [pincode, setPincode] = useState('');
  const [landmark, setLandmark] = useState('');
  const [coordinates, setCoordinates] = useState<Coordinates>({ lat: 12.9716, lng: 77.5946 });

  // Pricing
  const [price, setPrice] = useState<number>(5000000);
  const [isNegotiable, setIsNegotiable] = useState(true);
  const [bookingAmount, setBookingAmount] = useState<number>(200000);

  // Media
  const [images, setImages] = useState<string[]>([
    'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80'
  ]);
  const [newImageUrl, setNewImageUrl] = useState('');

  // Documents
  const [docs, setDocs] = useState<Omit<PropertyDocument, 'id' | 'uploadedAt'>[]>([
    {
      name: 'Registered Title Mother Deed',
      type: 'title_deed',
      fileUrl: 'https://images.unsplash.com/photo-1568667256549-094345857637?auto=format&fit=crop&w=800&q=80',
      status: 'pending',
      documentNumber: 'DOC-TITLE-883',
      fileSize: '3.8 MB'
    }
  ]);
  const [newDocName, setNewDocName] = useState('');
  const [newDocNumber, setNewDocNumber] = useState('');

  // Seller profile defaults
  const [sellerName, setSellerName] = useState('Rajesh Sharma');
  const [sellerType, setSellerType] = useState<'Owner' | 'Verified Agent' | 'Developer / Builder'>('Owner');
  const [sellerPhone, setSellerPhone] = useState('+91 98450 12345');
  const [sellerEmail, setSellerEmail] = useState('rajesh.plots@gmail.com');

  if (!isAddListingOpen) return null;

  // Local File Upload Handler for Images
  const handleFileUploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    Array.from(files).forEach(file => {
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        if (uploadEvent.target?.result) {
          setImages(prev => [...prev, uploadEvent.target!.result as string]);
          addToast('Photo Uploaded', `${file.name} added to gallery preview.`, 'success');
        }
      };
      reader.readAsDataURL(file);
    });
  };

  // Local File Upload Handler for Documents
  const handleFileUploadDoc = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    Array.from(files).forEach(file => {
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        if (uploadEvent.target?.result) {
          const sizeMb = (file.size / (1024 * 1024)).toFixed(1);
          setDocs(prev => [
            ...prev,
            {
              name: file.name.replace(/\.[^/.]+$/, ""),
              type: file.name.toLowerCase().includes('deed') ? 'title_deed' : 'layout_approval',
              fileUrl: uploadEvent.target!.result as string,
              status: 'pending',
              documentNumber: `DOC-FILE-${Math.floor(Math.random() * 9000) + 1000}`,
              fileSize: `${sizeMb} MB`,
              notes: 'Uploaded from local filesystem for verification.'
            }
          ]);
          addToast('Document Uploaded', `${file.name} uploaded to compliance vault.`, 'success');
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleAddImage = () => {
    if (newImageUrl.trim()) {
      setImages([...images, newImageUrl.trim()]);
      setNewImageUrl('');
    }
  };

  const handleAddDoc = () => {
    if (newDocName.trim()) {
      setDocs([
        ...docs,
        {
          name: newDocName.trim(),
          type: 'layout_approval',
          fileUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
          status: 'pending',
          documentNumber: newDocNumber || `DOC-${Date.now().toString().slice(-4)}`,
          fileSize: '4.2 MB'
        }
      ]);
      setNewDocName('');
      setNewDocNumber('');
    }
  };

  const handleSubmit = () => {
    const sqFt = convertToSqFt(plotSize, sizeUnit);
    const pricePerUnit = sizeUnit === 'acres' 
      ? Math.round(price / (plotSize || 1))
      : Math.round(price / (sqFt || 1));

    const finalDocs: PropertyDocument[] = docs.map((d, index) => ({
      ...d,
      id: `doc-${Date.now()}-${index}`,
      uploadedAt: new Date().toISOString().split('T')[0]
    }));

    // Generate boundary polygon around coordinates
    const lat = coordinates.lat || 12.9716;
    const lng = coordinates.lng || 77.5946;
    const offset = 0.0004;
    const boundaryPolygon: Coordinates[] = [
      { lat: lat + offset, lng: lng - offset },
      { lat: lat + offset, lng: lng + offset },
      { lat: lat - offset, lng: lng + offset },
      { lat: lat - offset, lng: lng - offset }
    ];

    addProperty({
      title: title || `${facing}-Facing ${plotSize} ${sizeUnit} ${category === 'plot' ? 'Plot' : 'Property'} in ${locality || city}`,
      category,
      propertyType,
      listingType: 'sale',
      price,
      pricePerUnit,
      isNegotiable,
      bookingAmount,
      status: 'available',
      
      city,
      locality: locality || 'Central Growth Corridor',
      address: address || `Plot #${surveyNumber || '12'}, ${locality || city}`,
      pincode: pincode || '560001',
      landmark: landmark || 'Near Main Highway Junction',
      coordinates,
      boundaryPolygon,
      nearbyLandmarks: [
        { place: 'Main Ring Road', distance: '1.2 km' },
        { place: 'Metro Station / Transit', distance: '3.5 km' }
      ],

      plotSize,
      sizeUnit,
      plotSizeSqFt: sqFt,
      dimensions: { length, breadth, unit: 'ft' },
      facing,
      roadWidth,
      roadType,
      isCornerPlot,
      surveyNumber: surveyNumber || `Sy. No. ${Math.floor(Math.random() * 200) + 1}/1`,
      khataNumber,
      approvalStatus,
      reraId: reraId || 'RERA-REG-PENDING',
      boundaryWall,
      gatedCommunity,

      vastu: {
        score: facing === 'East' || facing === 'North' || facing === 'North-East' ? 96 : 86,
        rating: facing === 'East' || facing === 'North' || facing === 'North-East' ? 'Exceptional' : 'Favorable',
        directionAdvantage: `${facing}-facing approach with ${roadWidth}ft road width frontage.`,
        dosha: null
      },

      isVerified: false,
      verificationScore: 50,
      verificationChecklist: {
        titleDeedVerified: false,
        encumbranceFree: false,
        layoutApproved: false,
        physicalInspectionDone: false,
        taxReceiptsCleared: false,
        boundaryDemarcated: false
      },
      adminNotes: 'Newly created listing. Pending document audit by Admin.',

      documents: finalDocs,
      images: images.length > 0 ? images : ['https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80'],
      
      seller: {
        id: `sel-${Date.now()}`,
        name: sellerName,
        type: sellerType,
        phone: sellerPhone,
        whatsapp: sellerPhone.replace(/[^0-9]/g, ''),
        email: sellerEmail,
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        rating: 5.0,
        totalListings: 1
      },

      description: description || `Excellent investment and development opportunity for ${plotSize} ${sizeUnit} plot in ${locality}, ${city}. Features ${roadWidth} ft frontage, clear title, and immediate registration.`,
      highlights: [
        `${facing} Facing with ${roadWidth}ft Road Frontage`,
        `${approvalStatus} with Clear Title`,
        isCornerPlot ? 'Corner Plot Advantage' : 'Well Demarcated Boundaries',
        'Ready for Immediate Construction'
      ],
      amenities: [
        'Underground Water & Sewage',
        'Electricity Grid Ready',
        'Wide Asphalt Road Access'
      ],
      featured: false
    });

    setIsAddListingOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-4xl h-[92vh] flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-500/20 text-emerald-400 rounded-xl">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base">List Plot / Property for Sale</h3>
              <p className="text-xs text-slate-400">Step {step} of 5: {
                step === 1 ? 'Category & Basic Details' :
                step === 2 ? 'Plot Dimensions & Specifications' :
                step === 3 ? 'Location & Interactive Map Pin' :
                step === 4 ? 'Photos & Legal Document Upload' :
                'Pricing & Final Review'
              }</p>
            </div>
          </div>

          <button
            onClick={() => setIsAddListingOpen(false)}
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Wizard Steps */}
        <div className="bg-slate-100 px-6 py-2.5 border-b border-slate-200 flex items-center justify-between text-xs font-semibold overflow-x-auto">
          {[
            { num: 1, label: '1. Basics' },
            { num: 2, label: '2. Dimensions' },
            { num: 3, label: '3. Location & Pin' },
            { num: 4, label: '4. Media & Docs' },
            { num: 5, label: '5. Pricing' }
          ].map((s) => (
            <button
              key={s.num}
              onClick={() => setStep(s.num)}
              className={`flex items-center gap-1.5 py-1 px-3 rounded-lg transition-all ${
                step === s.num
                  ? 'bg-slate-900 text-white font-bold shadow-sm'
                  : step > s.num
                  ? 'text-emerald-700 bg-emerald-100/70'
                  : 'text-slate-400'
              }`}
            >
              {step > s.num ? <Check className="w-3.5 h-3.5" /> : null}
              <span>{s.label}</span>
            </button>
          ))}
        </div>

        {/* Step Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* STEP 1 */}
          {step === 1 && (
            <div className="space-y-5 animate-in fade-in">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-2">
                  Select Listing Category
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setCategory('plot')}
                    className={`p-4 rounded-2xl border-2 text-left transition-all ${
                      category === 'plot'
                        ? 'border-emerald-600 bg-emerald-50/80 shadow-md ring-2 ring-emerald-500/20'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <div className="text-2xl mb-1">🌳</div>
                    <h4 className="font-bold text-slate-900 text-sm">Land / Plot</h4>
                    <p className="text-xs text-slate-500 mt-0.5">Residential plot, Commercial land, Farm / Agro plots</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setCategory('property')}
                    className={`p-4 rounded-2xl border-2 text-left transition-all ${
                      category === 'property'
                        ? 'border-blue-600 bg-blue-50/80 shadow-md ring-2 ring-blue-500/20'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <div className="text-2xl mb-1">🏢</div>
                    <h4 className="font-bold text-slate-900 text-sm">Built Property</h4>
                    <p className="text-xs text-slate-500 mt-0.5">House / Villa, Apartment, Commercial Building</p>
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-2">
                  Specific Property Type
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(category === 'plot' ? [
                    { key: 'residential_plot', label: 'Residential Plot' },
                    { key: 'commercial_plot', label: 'Commercial Land' },
                    { key: 'agricultural_farm', label: 'Agri / Farm Land' }
                  ] : [
                    { key: 'house_villa', label: 'House / Villa' },
                    { key: 'apartment', label: 'Apartment' },
                    { key: 'commercial_space', label: 'Commercial Office' }
                  ]).map((t) => (
                    <button
                      key={t.key}
                      type="button"
                      onClick={() => setPropertyType(t.key as PropertyType)}
                      className={`p-2.5 rounded-xl border text-xs font-bold transition-all ${
                        propertyType === t.key
                          ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Listing Title *
                </label>
                <input
                  type="text"
                  placeholder="e.g. East Facing 30x50 BDA Approved Plot in Gated Community"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-semibold text-slate-900 focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Detailed Description & Development Potential
                </label>
                <textarea
                  rows={4}
                  placeholder="Describe road access, surroundings, soil type, water & power connectivity, nearby schools/IT parks..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-800 focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <div className="space-y-5 animate-in fade-in">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Total Plot Size / Area *
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={plotSize}
                    onChange={(e) => setPlotSize(parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg font-bold text-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Measurement Unit
                  </label>
                  <select
                    value={sizeUnit}
                    onChange={(e) => setSizeUnit(e.target.value as SizeUnit)}
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg font-bold text-slate-800 text-xs"
                  >
                    <option value="sq.ft">Sq.Ft</option>
                    <option value="sq.yards">Sq.Yards (Gaj)</option>
                    <option value="cents">Cents</option>
                    <option value="acres">Acres</option>
                    <option value="gunthas">Gunthas</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Plot Length (Depth in Feet)
                  </label>
                  <input
                    type="number"
                    value={length}
                    onChange={(e) => setLength(parseFloat(e.target.value) || 0)}
                    placeholder="e.g. 50"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg font-mono font-bold text-slate-900 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Plot Breadth (Frontage in Feet)
                  </label>
                  <input
                    type="number"
                    value={breadth}
                    onChange={(e) => setBreadth(parseFloat(e.target.value) || 0)}
                    placeholder="e.g. 30"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg font-mono font-bold text-slate-900 text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-2">
                  Plot Facing Direction
                </label>
                <div className="grid grid-cols-4 sm:grid-cols-8 gap-1.5 text-xs">
                  {(['North', 'East', 'West', 'South', 'North-East', 'North-West', 'South-East', 'South-West'] as FacingDirection[]).map((f) => (
                    <button
                      key={f}
                      type="button"
                      onClick={() => setFacing(f)}
                      className={`py-2 px-1 rounded-lg border text-center font-bold transition-all ${
                        facing === f
                          ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Front Road Width (in Feet)
                  </label>
                  <input
                    type="number"
                    value={roadWidth}
                    onChange={(e) => setRoadWidth(parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg font-bold text-slate-900 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Road Surface Type
                  </label>
                  <input
                    type="text"
                    value={roadType}
                    onChange={(e) => setRoadType(e.target.value)}
                    placeholder="e.g. 40ft Asphalt Road"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 text-xs"
                  />
                </div>
              </div>

              <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CornerRightUp className="w-5 h-5 text-amber-600" />
                  <div>
                    <h5 className="font-bold text-xs text-amber-900">Is this a Corner Plot?</h5>
                    <p className="text-[11px] text-amber-700">Has dual road frontage on two sides</p>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={isCornerPlot}
                  onChange={(e) => setIsCornerPlot(e.target.checked)}
                  className="w-5 h-5 text-amber-600 rounded border-amber-300 focus:ring-amber-500 cursor-pointer"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Approval Authority
                  </label>
                  <select
                    value={approvalStatus}
                    onChange={(e) => setApprovalStatus(e.target.value as ApprovalStatus)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-bold text-slate-800"
                  >
                    <option value="RERA Approved">RERA Approved</option>
                    <option value="DTCP Approved">DTCP Approved</option>
                    <option value="HMDA Approved">HMDA Approved</option>
                    <option value="BDA Approved">BDA Approved</option>
                    <option value="Panchayat Approved">Panchayat Approved</option>
                    <option value="DC Converted">DC Converted</option>
                    <option value="Freehold / Clear Title">Freehold / Clear Title</option>
                    <option value="Agricultural Zone">Agricultural Zone</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Survey / Plot No. *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sy. No. 118/2, Plot #45"
                    value={surveyNumber}
                    onChange={(e) => setSurveyNumber(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-mono font-bold text-slate-800"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Boundary Wall Status
                  </label>
                  <select
                    value={boundaryWall}
                    onChange={(e) => setBoundaryWall(e.target.value as any)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-semibold text-slate-800"
                  >
                    <option value="Full Gated Wall">Full Gated Wall</option>
                    <option value="Fenced">Fenced (Chainlink/Barbed)</option>
                    <option value="Open / Marked Pillars">Open / Marked Pillars</option>
                    <option value="None">None</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <div className="space-y-5 animate-in fade-in">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    City *
                  </label>
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-bold text-slate-800"
                  >
                    <option value="Bangalore">Bangalore</option>
                    <option value="Hyderabad">Hyderabad</option>
                    <option value="Pune">Pune</option>
                    <option value="Chennai">Chennai</option>
                    <option value="Mumbai">Mumbai</option>
                    <option value="Delhi-NCR">Delhi-NCR</option>
                    <option value="Coimbatore">Coimbatore</option>
                    <option value="Mysore">Mysore</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Locality / Growth Belt *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Whitefield - Sarjapur Link"
                    value={locality}
                    onChange={(e) => setLocality(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-800"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Full Site Address / Plot Number
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Plot #42, Green Meadows Layout, Off Main Highway"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-800"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Pincode
                  </label>
                  <input
                    type="text"
                    placeholder="560087"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-800"
                  />
                </div>
              </div>

              <div className="pt-2">
                <MapLocationPicker
                  coordinates={coordinates}
                  onChange={setCoordinates}
                  city={city}
                />
              </div>
            </div>
          )}

          {/* STEP 4: Photos & Real Local Document Uploading */}
          {step === 4 && (
            <div className="space-y-6 animate-in fade-in">
              {/* Photo Upload with Local File Picker */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold text-slate-700 uppercase flex items-center gap-2">
                    <ImageIcon className="w-4 h-4 text-emerald-600" />
                    Plot Photos & Layout Blueprint ({images.length} added)
                  </label>
                  
                  {/* File input button */}
                  <label className="cursor-pointer px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors">
                    <Upload className="w-3.5 h-3.5" />
                    Upload from Device
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleFileUploadImage}
                      className="hidden"
                    />
                  </label>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-2">
                  {images.map((img, i) => (
                    <div key={i} className="relative h-24 rounded-xl overflow-hidden border border-slate-200 group shadow-xs">
                      <img src={img} alt="Preview" className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => setImages(images.filter((_, idx) => idx !== i))}
                        className="absolute top-1 right-1 p-1 bg-red-600 text-white rounded-full text-xs shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Direct Image URL input */}
                <div className="flex gap-2">
                  <input
                    type="url"
                    placeholder="Or paste direct image URL..."
                    value={newImageUrl}
                    onChange={(e) => setNewImageUrl(e.target.value)}
                    className="flex-1 px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs"
                  />
                  <button
                    type="button"
                    onClick={handleAddImage}
                    className="px-4 py-2 bg-slate-900 text-white text-xs font-bold rounded-xl hover:bg-slate-800"
                  >
                    Add URL
                  </button>
                </div>
              </div>

              {/* Legal Document Vault with File Upload */}
              <div className="bg-slate-900 text-white p-5 rounded-2xl space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-sm flex items-center gap-1.5 text-emerald-400">
                      <ShieldCheck className="w-4 h-4" /> Legal Document Verification Vault
                    </h4>
                    <p className="text-xs text-slate-400">
                      Upload 30-year mother deed, 7/12 extract, EC certificate & sanctioned layout drawings.
                    </p>
                  </div>
                  
                  {/* Local Document File Upload Button */}
                  <label className="cursor-pointer px-3 py-1.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors shadow-sm">
                    <FilePlus className="w-3.5 h-3.5" />
                    Upload PDF / Deed
                    <input
                      type="file"
                      multiple
                      accept=".pdf,.doc,.docx,image/*"
                      onChange={handleFileUploadDoc}
                      className="hidden"
                    />
                  </label>
                </div>

                <div className="space-y-2">
                  {docs.map((d, i) => (
                    <div key={i} className="bg-slate-800 p-3 rounded-xl border border-slate-700 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-emerald-400" />
                        <div>
                          <span className="font-bold text-slate-100">{d.name}</span>
                          <span className="text-slate-400 block text-[10px]">
                            {d.fileSize || '3.5 MB'} • Ref: {d.documentNumber || 'PENDING'}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="bg-amber-500/20 text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded">
                          Verification Pending
                        </span>
                        <button
                          type="button"
                          onClick={() => setDocs(docs.filter((_, idx) => idx !== i))}
                          className="p-1 text-slate-400 hover:text-red-400"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2 border-t border-slate-800">
                  <input
                    type="text"
                    placeholder="Document Name (e.g. DTCP Layout Approval)"
                    value={newDocName}
                    onChange={(e) => setNewDocName(e.target.value)}
                    className="sm:col-span-2 px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white"
                  />
                  <button
                    type="button"
                    onClick={handleAddDoc}
                    className="px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl"
                  >
                    + Add Record
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* STEP 5 */}
          {step === 5 && (
            <div className="space-y-5 animate-in fade-in">
              <div className="bg-emerald-50 p-5 rounded-2xl border border-emerald-200 space-y-4">
                <h4 className="font-bold text-sm text-emerald-900 uppercase tracking-wider">
                  Pricing & Terms
                </h4>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                      Total Asking Price (in ₹) *
                    </label>
                    <input
                      type="number"
                      step="50000"
                      min="100000"
                      value={price}
                      onChange={(e) => setPrice(parseFloat(e.target.value) || 0)}
                      className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-xl text-lg font-black text-slate-900 font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                      Booking / Token Advance
                    </label>
                    <input
                      type="number"
                      step="10000"
                      value={bookingAmount}
                      onChange={(e) => setBookingAmount(parseFloat(e.target.value) || 0)}
                      className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-xl text-sm font-bold text-slate-900"
                    />
                  </div>
                </div>

                <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-800">
                  <input
                    type="checkbox"
                    checked={isNegotiable}
                    onChange={(e) => setIsNegotiable(e.target.checked)}
                    className="w-4 h-4 text-emerald-600 rounded border-slate-300"
                  />
                  <span>Price is open to reasonable negotiations</span>
                </label>
              </div>

              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4">
                <h4 className="font-bold text-xs text-slate-800 uppercase tracking-wider">
                  Seller Contact Profile
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      value={sellerName}
                      onChange={(e) => setSellerName(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs font-semibold text-slate-800"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                      Seller Category
                    </label>
                    <select
                      value={sellerType}
                      onChange={(e) => setSellerType(e.target.value as any)}
                      className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs font-semibold text-slate-800"
                    >
                      <option value="Owner">Direct Owner</option>
                      <option value="Verified Agent">Verified Agent</option>
                      <option value="Developer / Builder">Developer / Builder</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      value={sellerPhone}
                      onChange={(e) => setSellerPhone(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs font-semibold text-slate-800"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-slate-100 px-6 py-4 border-t border-slate-200 flex items-center justify-between">
          {step > 1 ? (
            <button
              type="button"
              onClick={() => setStep(step - 1)}
              className="px-4 py-2 bg-white hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold flex items-center gap-1.5 border border-slate-300 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" /> Previous
            </button>
          ) : <div />}

          {step < 5 ? (
            <button
              type="button"
              onClick={() => setStep(step + 1)}
              className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-md transition-colors"
            >
              Next Step <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              className="px-8 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-black flex items-center gap-1.5 shadow-lg transition-colors"
            >
              <Sparkles className="w-4 h-4" /> Publish Plot Listing
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
