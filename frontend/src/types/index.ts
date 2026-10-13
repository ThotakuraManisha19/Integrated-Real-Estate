export type PropertyCategory = 'plot' | 'property';

export type PlotType = 'residential_plot' | 'commercial_plot' | 'agricultural_farm';
export type BuiltPropertyType = 'apartment' | 'house_villa' | 'commercial_space';
export type PropertyType = PlotType | BuiltPropertyType;

export type FacingDirection = 
  | 'North' 
  | 'South' 
  | 'East' 
  | 'West' 
  | 'North-East' 
  | 'North-West' 
  | 'South-East' 
  | 'South-West';

export type ApprovalStatus = 
  | 'RERA Approved'
  | 'DTCP Approved'
  | 'HMDA Approved'
  | 'BDA Approved'
  | 'Panchayat Approved'
  | 'DC Converted'
  | 'Freehold / Clear Title'
  | 'Agricultural Zone'
  | 'In Progress';

export type SizeUnit = 'sq.ft' | 'sq.yards' | 'cents' | 'acres' | 'gunthas';

export type DocumentType = 
  | 'title_deed'
  | '7_12_patta_khata'
  | 'encumbrance_cert'
  | 'layout_approval'
  | 'rera_cert'
  | 'tax_receipt'
  | 'conversion_order'
  | 'possession_letter';

export type VerificationStatus = 'verified' | 'pending' | 'rejected' | 'under_review';

export interface PropertyDocument {
  id: string;
  name: string;
  type: DocumentType;
  fileUrl: string;
  status: VerificationStatus;
  uploadedAt: string;
  verifiedAt?: string;
  documentNumber?: string;
  notes?: string;
  fileSize?: string;
}

export interface VerificationChecklist {
  titleDeedVerified: boolean;
  encumbranceFree: boolean;
  layoutApproved: boolean;
  physicalInspectionDone: boolean;
  taxReceiptsCleared: boolean;
  boundaryDemarcated: boolean;
}

export interface PlotDimensions {
  length: number;
  breadth: number;
  unit: 'ft' | 'm';
}

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface NearbyLandmark {
  place: string;
  distance: string;
}

export interface SellerInfo {
  id: string;
  name: string;
  type: 'Owner' | 'Verified Agent' | 'Developer / Builder';
  phone: string;
  whatsapp: string;
  email: string;
  agencyName?: string;
  agentExperience?: string;
  avatar: string;
  rating?: number;
  totalListings?: number;
}

export interface VastuInfo {
  score: number;
  rating: 'Exceptional' | 'Very Good' | 'Favorable' | 'Average';
  directionAdvantage: string;
  dosha: string | null;
  remedy?: string;
}

export interface PropertyItem {
  id: string;
  title: string;
  category: PropertyCategory;
  propertyType: PropertyType;
  listingType: 'sale' | 'lease';
  price: number;
  pricePerUnit: number;
  isNegotiable: boolean;
  bookingAmount?: number;
  status: 'available' | 'under_offer' | 'sold';
  
  city: string;
  locality: string;
  address: string;
  pincode: string;
  landmark: string;
  coordinates: Coordinates;
  boundaryPolygon?: Coordinates[];
  nearbyLandmarks: NearbyLandmark[];

  plotSize: number;
  sizeUnit: SizeUnit;
  plotSizeSqFt: number;
  dimensions: PlotDimensions;
  facing: FacingDirection;
  roadWidth: number;
  roadType: string;
  isCornerPlot: boolean;
  surveyNumber: string;
  khataNumber?: string;
  approvalStatus: ApprovalStatus;
  reraId?: string;
  boundaryWall: 'Full Gated Wall' | 'Fenced' | 'Open / Marked Pillars' | 'None';
  soilType?: string;
  waterSupply?: string;
  electricity?: string;
  gatedCommunity: boolean;
  overlooking?: string;

  vastu?: VastuInfo;

  bedrooms?: number;
  bathrooms?: number;
  builtUpArea?: number;
  carpetArea?: number;
  furnishing?: 'Furnished' | 'Semi-Furnished' | 'Unfurnished';
  floor?: string;
  parking?: string;

  isVerified: boolean;
  verificationDate?: string;
  verifiedBy?: string;
  verificationScore: number;
  verificationChecklist: VerificationChecklist;
  adminNotes?: string;

  documents: PropertyDocument[];
  images: string[];
  layoutPlanUrl?: string;
  videoTourUrl?: string;

  seller: SellerInfo;

  description: string;
  highlights: string[];
  amenities: string[];
  createdAt: string;
  updatedAt: string;
  viewsCount: number;
  inquiriesCount: number;
  featured: boolean;
}

// ==========================================
// MIDDLEMAN AGENT & APPOINTMENT TYPES
// ==========================================

export interface MiddlemanAgent {
  id: string;
  name: string;
  avatar: string;
  role: 'Field Agent' | 'Licensed Land Surveyor' | 'Legal Liaison Officer' | 'Senior Territory Manager';
  phone: string;
  email: string;
  rating: number;
  reviewCount: number;
  totalVisitsCompleted: number;
  experienceYears: number;
  specialization: string[];
  languages: string[];
  territoryCities: string[];
  serviceFee: number;
  bio: string;
  badge: 'Govt Certified Surveyor' | 'Top Rated Middleman' | 'Verified Field Agent' | 'Territory Specialist';
  isAvailableNow: boolean;
  coordinates?: Coordinates;
}

export type AppointmentStatus = 
  | 'pending'          // Requested by buyer, awaiting agent confirmation
  | 'confirmed'        // Agent accepted, scheduled
  | 'en_route'         // Agent is traveling to the plot site
  | 'checked_in'       // Agent arrived on site with buyer/owner
  | 'completed'        // Visit completed and report filed
  | 'cancelled';

export interface SiteInspectionReport {
  id: string;
  appointmentId: string;
  completedAt: string;
  boundaryStoneVerified: boolean;
  boundaryNotes: string;
  measuredRoadWidth: number;
  roadCondition: string;
  groundCondition: 'Level & Clean' | 'Overgrown Vegetation' | 'Waterlogged' | 'Sloped / Undulated' | 'Excavated';
  waterElectricityVerified: boolean;
  disputeSignsFound: boolean;
  inspectorNotes: string;
  groundPhotos: string[];
  verificationScore: number;
}

export interface Appointment {
  id: string;
  propertyId: string;
  propertyTitle: string;
  propertyAddress: string;
  propertyCity: string;
  propertyType: PropertyType;
  plotSize: number;
  sizeUnit: SizeUnit;
  surveyNumber: string;
  price: number;
  
  agentId: string;
  agentName: string;
  agentPhone: string;
  agentAvatar: string;
  agentRole: string;

  buyerName: string;
  buyerPhone: string;
  buyerEmail: string;

  appointmentDate: string;
  timeSlot: string;
  visitType: 'Assisted Site Visit' | 'Boundary & Land Survey Audit' | 'Deed & Revenue Escort' | 'Owner Negotiation Meeting';
  serviceFee: number;
  meetingPoint: 'At Plot Location' | 'Nearest Landmark' | 'Buyer Pickup';
  specialInstructions?: string;

  status: AppointmentStatus;
  createdAt: string;
  updatedAt: string;

  inspectionReport?: SiteInspectionReport;
}

export interface Inquiry {
  id: string;
  propertyId: string;
  propertyTitle: string;
  propertyCategory: PropertyCategory;
  propertyType: PropertyType;
  buyerName: string;
  buyerPhone: string;
  buyerEmail: string;
  inquiryType: 'general_query' | 'site_visit_request' | 'price_offer' | 'document_request';
  offeredPrice?: number;
  preferredVisitDate?: string;
  message: string;
  status: 'new' | 'contacted' | 'visit_scheduled' | 'closed' | 'rejected';
  createdAt: string;
  sellerId: string;
}

export interface ChatMessage {
  id: string;
  propertyId: string;
  senderRole: 'buyer' | 'seller' | 'agent';
  senderName: string;
  text: string;
  timestamp: string;
  isOffer?: boolean;
  offerAmount?: number;
}

export type UserRole = 'buyer' | 'seller' | 'agent' | 'admin';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  phone?: string;
  badge?: string;
  agencyName?: string;
}

export interface FilterState {
  searchQuery: string;
  category: 'all' | PropertyCategory;
  propertyTypes: PropertyType[];
  city: string;
  locality: string;
  minPrice: number;
  maxPrice: number;
  minSize: number;
  maxSize: number;
  sizeUnit: SizeUnit;
  facing: FacingDirection[];
  minRoadWidth: number;
  approvalStatuses: ApprovalStatus[];
  isCornerPlotOnly: boolean;
  isVerifiedOnly: boolean;
  isGatedCommunityOnly: boolean;
  hasBoundaryWallOnly: boolean;
  sortBy: 'featured' | 'price_asc' | 'price_desc' | 'size_desc' | 'newest' | 'verified_first';
}

export interface ToastMessage {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'info' | 'warning' | 'error';
}
