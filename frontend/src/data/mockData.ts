import { PropertyItem, Inquiry, ChatMessage, MiddlemanAgent, Appointment } from '../types';

export const INITIAL_AGENTS: MiddlemanAgent[] = [
  {
    id: 'agent-1',
    name: 'Ramesh K. Hegde',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    role: 'Licensed Land Surveyor',
    phone: '+91 98451 99882',
    email: 'ramesh.surveyor@terraplots.in',
    rating: 4.95,
    reviewCount: 124,
    totalVisitsCompleted: 186,
    experienceYears: 14,
    specialization: ['Boundary Demarcation', 'GPS Surveying', 'BDA & DTCP Approval Verification'],
    languages: ['English', 'Kannada', 'Hindi'],
    territoryCities: ['Bangalore', 'Mysore'],
    serviceFee: 799,
    bio: 'Government licensed land surveyor with 14+ years experience. Specializes in on-ground GPS demarcation, checking survey stones, road setbacks, and mother deed verification.',
    badge: 'Govt Certified Surveyor',
    isAvailableNow: true,
    coordinates: { lat: 12.8795, lng: 77.7468 }
  },
  {
    id: 'agent-2',
    name: 'Suresh V. Reddy',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    role: 'Senior Territory Manager',
    phone: '+91 99880 44321',
    email: 'suresh.reddy@terraplots.in',
    rating: 4.9,
    reviewCount: 98,
    totalVisitsCompleted: 142,
    experienceYears: 10,
    specialization: ['HMDA Highway Corridors', 'Commercial Land Due Diligence', 'Price Negotiation'],
    languages: ['English', 'Telugu', 'Hindi'],
    territoryCities: ['Hyderabad'],
    serviceFee: 599,
    bio: 'Expert local middleman in Hyderabad growth corridors (Gachibowli, ORR, Shankarpally). Coordinates directly with plot owners, checks physical access, and secures best purchase deals.',
    badge: 'Top Rated Middleman',
    isAvailableNow: true,
    coordinates: { lat: 17.4401, lng: 78.3489 }
  },
  {
    id: 'agent-3',
    name: 'Sunita D. Kulkarni',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
    role: 'Legal Liaison Officer',
    phone: '+91 98220 77112',
    email: 'sunita.kulkarni@terraplots.in',
    rating: 4.88,
    reviewCount: 86,
    totalVisitsCompleted: 115,
    experienceYears: 11,
    specialization: ['7/12 Extract Verification', 'Agricultural Zone Permissions', 'Sub-Registrar Escort'],
    languages: ['English', 'Marathi', 'Hindi'],
    territoryCities: ['Pune'],
    serviceFee: 899,
    bio: 'Legal and physical land verification specialist in Pune & Saswad belts. Conducts on-site soil/water checks, title searches, ferfar entries, and escorts buyers to the local revenue office.',
    badge: 'Territory Specialist',
    isAvailableNow: true,
    coordinates: { lat: 18.3421, lng: 74.0321 }
  },
  {
    id: 'agent-4',
    name: 'Balachandar S.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
    role: 'Field Agent',
    phone: '+91 98402 33411',
    email: 'bala.agent@terraplots.in',
    rating: 4.85,
    reviewCount: 72,
    totalVisitsCompleted: 94,
    experienceYears: 8,
    specialization: ['OMR & ECR Layouts', 'DTCP Verification', 'Site Escort & Drone View'],
    languages: ['English', 'Tamil'],
    territoryCities: ['Chennai', 'Coimbatore'],
    serviceFee: 499,
    bio: 'Experienced field representative escorting buyers across Chennai DTCP layouts. Performs physical tape measurements, checks overhead HT lines, and confirms local water table levels.',
    badge: 'Verified Field Agent',
    isAvailableNow: false,
    coordinates: { lat: 12.9654, lng: 80.2468 }
  }
];

export const INITIAL_APPOINTMENTS: Appointment[] = [
  {
    id: 'apt-101',
    propertyId: 'plot-101',
    propertyTitle: 'East-Facing Premium Villa Plot in BDA Approved Gated Community',
    propertyAddress: 'Plot #42, Green Meadows Grand Layout, Near Dommasandra Circle',
    propertyCity: 'Bangalore',
    propertyType: 'residential_plot',
    plotSize: 1500,
    sizeUnit: 'sq.ft',
    surveyNumber: 'Sy. No. 118/2, Plot #42',
    price: 6800000,
    
    agentId: 'agent-1',
    agentName: 'Ramesh K. Hegde',
    agentPhone: '+91 98451 99882',
    agentAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    agentRole: 'Licensed Land Surveyor',

    buyerName: 'Amitabh Sen',
    buyerPhone: '+91 98300 44551',
    buyerEmail: 'amitabh.sen@techcorp.in',

    appointmentDate: '2026-10-15',
    timeSlot: '10:00 AM - 11:30 AM',
    visitType: 'Boundary & Land Survey Audit',
    serviceFee: 799,
    meetingPoint: 'At Plot Location',
    specialInstructions: 'Please verify the yellow boundary stones and measure the internal CC road width (seller claimed 40 ft).',

    status: 'confirmed',
    createdAt: '2026-10-10T09:30:00Z',
    updatedAt: '2026-10-10T10:15:00Z'
  },
  {
    id: 'apt-102',
    propertyId: 'plot-102',
    propertyTitle: 'Dual-Road Corner Commercial Plot on National Highway Express corridor',
    propertyAddress: 'Survey No 88, Near Exit #13, Outer Ring Road Service Zone',
    propertyCity: 'Hyderabad',
    propertyType: 'commercial_plot',
    plotSize: 4800,
    sizeUnit: 'sq.ft',
    surveyNumber: 'Sy. No. 88/4B & 88/5',
    price: 24500000,

    agentId: 'agent-2',
    agentName: 'Suresh V. Reddy',
    agentPhone: '+91 99880 44321',
    agentAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    agentRole: 'Senior Territory Manager',

    buyerName: 'Kavita Chidambaram',
    buyerPhone: '+91 98840 99881',
    buyerEmail: 'kavita.c@logistics.com',

    appointmentDate: '2026-10-13',
    timeSlot: '02:30 PM - 04:00 PM',
    visitType: 'Assisted Site Visit',
    serviceFee: 599,
    meetingPoint: 'Nearest Landmark',
    specialInstructions: 'Meet at ORR Exit #13 Toll Plaza. Need to check heavy vehicular turning radius into the plot.',

    status: 'en_route',
    createdAt: '2026-10-11T14:00:00Z',
    updatedAt: '2026-10-12T13:45:00Z'
  },
  {
    id: 'apt-103',
    propertyId: 'plot-103',
    propertyTitle: 'Fertile Agricultural Farmland & Mango Orchard with Farmhouse Permission',
    propertyAddress: 'Gat No 204, Village Chambli, Saswad Taluka',
    propertyCity: 'Pune',
    propertyType: 'agricultural_farm',
    plotSize: 2,
    sizeUnit: 'acres',
    surveyNumber: 'Gat No. 204/1B',
    price: 8500000,

    agentId: 'agent-3',
    agentName: 'Sunita D. Kulkarni',
    agentPhone: '+91 98220 77112',
    agentAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
    agentRole: 'Legal Liaison Officer',

    buyerName: 'Dr. Rahul Shirke',
    buyerPhone: '+91 94220 11990',
    buyerEmail: 'dr.rahul@shirkeclinic.com',

    appointmentDate: '2026-10-09',
    timeSlot: '11:00 AM - 01:00 PM',
    visitType: 'Boundary & Land Survey Audit',
    serviceFee: 899,
    meetingPoint: 'At Plot Location',
    specialInstructions: 'Verify water yield of the 2 borewells and inspect 7/12 mutation boundaries.',

    status: 'completed',
    createdAt: '2026-10-06T11:00:00Z',
    updatedAt: '2026-10-09T13:30:00Z',

    inspectionReport: {
      id: 'rep-103',
      appointmentId: 'apt-103',
      completedAt: '2026-10-09 13:30',
      boundaryStoneVerified: true,
      boundaryNotes: 'All 4 corner boundary stones matching Gat No 204/1B cadastral map were located and verified in intact condition. Solar fence is active.',
      measuredRoadWidth: 32,
      roadCondition: 'Good condition tar approach road connecting directly to Saswad main highway.',
      groundCondition: 'Level & Clean',
      waterElectricityVerified: true,
      disputeSignsFound: false,
      inspectorNotes: 'Both borewells tested on-site with 2.5-inch continuous flow. 85 mango trees are in fruiting age. Clear single ownership with zero local encumbrances found.',
      groundPhotos: [
        'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1628744448840-55bdb2497bd4?auto=format&fit=crop&w=800&q=80'
      ],
      verificationScore: 98
    }
  }
];

export const INITIAL_PROPERTIES: PropertyItem[] = [
  // 1. RESIDENTIAL PLOT
  {
    id: 'plot-101',
    title: 'East-Facing Premium Villa Plot in BDA Approved Gated Community',
    category: 'plot',
    propertyType: 'residential_plot',
    listingType: 'sale',
    price: 6800000,
    pricePerUnit: 4533,
    isNegotiable: true,
    bookingAmount: 200000,
    status: 'available',
    
    city: 'Bangalore',
    locality: 'Whitefield - Sarjapur Road Link',
    address: 'Plot #42, Green Meadows Grand Layout, Near Dommasandra Circle',
    pincode: '560087',
    landmark: 'Opposite Indus International School',
    coordinates: { lat: 12.8795, lng: 77.7468 },
    boundaryPolygon: [
      { lat: 12.8797, lng: 77.7466 },
      { lat: 12.8797, lng: 77.7471 },
      { lat: 12.8793, lng: 77.7471 },
      { lat: 12.8793, lng: 77.7466 }
    ],
    nearbyLandmarks: [
      { place: 'Indus International School', distance: '0.4 km' },
      { place: 'Sarjapur Main Road', distance: '1.2 km' },
      { place: 'Wipro SEZ Campus', distance: '6.5 km' },
      { place: 'Columbia Asia Hospital', distance: '7.8 km' }
    ],

    plotSize: 1500,
    sizeUnit: 'sq.ft',
    plotSizeSqFt: 1500,
    dimensions: { length: 50, breadth: 30, unit: 'ft' },
    facing: 'East',
    roadWidth: 40,
    roadType: 'CC Concrete Road with underground cabling',
    isCornerPlot: false,
    surveyNumber: 'Sy. No. 118/2, Plot #42',
    khataNumber: 'E-Khata Class A',
    approvalStatus: 'BDA Approved',
    reraId: 'PRM/KA/RERA/1251/308/PR/191024/002981',
    boundaryWall: 'Full Gated Wall',
    soilType: 'Red Gravel Soil (High Load Bearing)',
    waterSupply: 'Borewell Available & Municipal Cauvery Line',
    electricity: 'Standard 3-Phase Connection (Underground)',
    gatedCommunity: true,
    overlooking: 'Community Landscaped Park & Walking Track',

    vastu: {
      score: 96,
      rating: 'Exceptional',
      directionAdvantage: 'East entrance brings maximum morning sunlight, prosperity and positive prana.',
      dosha: null
    },

    isVerified: true,
    verificationDate: '2026-03-15',
    verifiedBy: 'Senior Legal & Survey Officer - Adv. K. Raghavan',
    verificationScore: 98,
    verificationChecklist: {
      titleDeedVerified: true,
      encumbranceFree: true,
      layoutApproved: true,
      physicalInspectionDone: true,
      taxReceiptsCleared: true,
      boundaryDemarcated: true
    },
    adminNotes: 'All BDA layout sanctions and 30-year Encumbrance Certificate verified. Site demarcated with yellow concrete boundary pillars.',

    documents: [
      {
        id: 'doc-1',
        name: 'Clear Mother Title Deed & Registered Sale Chain',
        type: 'title_deed',
        fileUrl: 'https://images.unsplash.com/photo-1568667256549-094345857637?auto=format&fit=crop&w=800&q=80',
        status: 'verified',
        uploadedAt: '2026-03-10',
        verifiedAt: '2026-03-14',
        documentNumber: 'DOC/BDA/2026/9921',
        fileSize: '4.2 MB'
      },
      {
        id: 'doc-2',
        name: 'BDA Approved Master Layout Plan with Sanction Seal',
        type: 'layout_approval',
        fileUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
        status: 'verified',
        uploadedAt: '2026-03-10',
        verifiedAt: '2026-03-14',
        documentNumber: 'BDA/LP/WFD-4412/2023',
        fileSize: '8.1 MB'
      }
    ],

    images: [
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80'
    ],

    seller: {
      id: 'sel-1',
      name: 'Vikramaditya Rao',
      type: 'Owner',
      phone: '+91 98451 23456',
      whatsapp: '+919845123456',
      email: 'vikram.rao@properties.in',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      rating: 4.9,
      totalListings: 3
    },

    description: 'Direct owner listing for an East-facing 1,500 sq.ft residential plot (30x50 ft) situated inside an elite, fully developed gated enclave. Features 40-foot wide asphalt roads, underground drainage, overhead electrical wiring, manicured parks, clubhouse, and 24/7 security.',
    highlights: [
      '100% Vastu Compliant East Facing',
      '40 Feet Wide Internal Asphalt Road',
      'BDA Approved & A-Khata Ready',
      'Underground Electrical & Sanitary Network',
      'Close to Top International Schools',
      'Clear Legal Title & Instant Registry'
    ],
    amenities: [
      'Gated Community with 24/7 Guard',
      'Underground Drainage & STP',
      'Rainwater Harvesting System',
      'Paved Footpaths with LED Streetlights'
    ],
    createdAt: '2026-03-01T10:00:00Z',
    updatedAt: '2026-03-15T12:30:00Z',
    viewsCount: 342,
    inquiriesCount: 18,
    featured: true
  },

  // 2. COMMERCIAL PLOT (CORNER PLOT)
  {
    id: 'plot-102',
    title: 'Dual-Road Corner Commercial Plot on National Highway Express corridor',
    category: 'plot',
    propertyType: 'commercial_plot',
    listingType: 'sale',
    price: 24500000,
    pricePerUnit: 5104,
    isNegotiable: true,
    bookingAmount: 1000000,
    status: 'available',

    city: 'Hyderabad',
    locality: 'Gachibowli - ORR Growth Corridor',
    address: 'Survey No 88, Near Exit #13, Outer Ring Road Service Zone',
    pincode: '500075',
    landmark: 'Adjacent to Infosys & Microsoft SEZ Junction',
    coordinates: { lat: 17.4401, lng: 78.3489 },
    boundaryPolygon: [
      { lat: 17.4405, lng: 78.3485 },
      { lat: 17.4405, lng: 78.3493 },
      { lat: 17.4397, lng: 78.3493 },
      { lat: 17.4397, lng: 78.3485 }
    ],
    nearbyLandmarks: [
      { place: 'Outer Ring Road (ORR)', distance: '0.2 km' },
      { place: 'Gachibowli Financial District', distance: '3.4 km' },
      { place: 'Continental Hospital', distance: '4.1 km' }
    ],

    plotSize: 4800,
    sizeUnit: 'sq.ft',
    plotSizeSqFt: 4800,
    dimensions: { length: 80, breadth: 60, unit: 'ft' },
    facing: 'North-East',
    roadWidth: 80,
    roadType: '80 Ft Main Commercial Avenue + 40 Ft Side Road',
    isCornerPlot: true,
    surveyNumber: 'Sy. No. 88/4B & 88/5',
    khataNumber: 'GHMC Commercial Khata',
    approvalStatus: 'HMDA Approved',
    reraId: 'P02400003112',
    boundaryWall: 'Full Gated Wall',
    soilType: 'Hard Murrum Granite Bed',
    waterSupply: 'Dedicated Commercial Borewell + HMWSSB Connection',
    electricity: '100 KVA Commercial Sub-station Line',
    gatedCommunity: false,
    overlooking: 'Main 80ft Commercial Arterial Road',

    vastu: {
      score: 99,
      rating: 'Exceptional',
      directionAdvantage: 'North-East Corner Plot (Ishanya) with dual road access is the supreme configuration for commercial wealth creation.',
      dosha: null
    },

    isVerified: true,
    verificationDate: '2026-03-20',
    verifiedBy: 'HMDA Certified Land Surveyor - M. Surendra',
    verificationScore: 99,
    verificationChecklist: {
      titleDeedVerified: true,
      encumbranceFree: true,
      layoutApproved: true,
      physicalInspectionDone: true,
      taxReceiptsCleared: true,
      boundaryDemarcated: true
    },
    adminNotes: 'Commercial zone conversion order TS-iPASS certified.',

    documents: [
      {
        id: 'doc-201',
        name: 'HMDA Commercial Layout Sanction Order',
        type: 'layout_approval',
        fileUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
        status: 'verified',
        uploadedAt: '2026-03-18',
        verifiedAt: '2026-03-20',
        documentNumber: 'HMDA/COMM/2025/1198',
        fileSize: '6.4 MB'
      }
    ],

    images: [
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=1200&q=80'
    ],

    seller: {
      id: 'sel-2',
      name: 'Apex Commercial Land Corp (Agent: Rajesh Varma)',
      type: 'Verified Agent',
      phone: '+91 99887 11223',
      whatsapp: '+919988711223',
      email: 'rajesh@apexrealty.in',
      agencyName: 'Apex Commercial Realtors',
      agentExperience: '14+ Years in ORR Commercial Corridor',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80',
      rating: 4.95,
      totalListings: 12
    },

    description: 'Prime North-East facing corner commercial land spanning 4,800 sq.ft with extraordinary dual frontage (80 ft main road and 40 ft cross road). Ideal for commercial complex, auto showroom, hospital, IT office, bank branch.',
    highlights: [
      'Dual Road Corner Advantage (80ft + 40ft)',
      '100% Commercial NALA Converted',
      'High FSI Approved for Multi-story Commercial'
    ],
    amenities: [
      'Commercial Heavy Electricity Grid Access',
      'Wide Heavy-Vehicle Ingress & Egress',
      'Direct Highway Frontage'
    ],
    createdAt: '2026-03-05T08:00:00Z',
    updatedAt: '2026-03-20T14:15:00Z',
    viewsCount: 620,
    inquiriesCount: 29,
    featured: true
  },

  // 3. AGRICULTURAL / FARM LAND
  {
    id: 'plot-103',
    title: 'Fertile Agricultural Farmland & Mango Orchard with Farmhouse Permission',
    category: 'plot',
    propertyType: 'agricultural_farm',
    listingType: 'sale',
    price: 8500000,
    pricePerUnit: 4250000,
    isNegotiable: true,
    bookingAmount: 300000,
    status: 'available',

    city: 'Pune',
    locality: 'Saswad - Jejuri Countryside Belt',
    address: 'Gat No 204, Village Chambli, Saswad Taluka',
    pincode: '412301',
    landmark: '2 km from Purandar Airport Green Zone',
    coordinates: { lat: 18.3421, lng: 74.0321 },
    boundaryPolygon: [
      { lat: 18.3430, lng: 74.0310 },
      { lat: 18.3430, lng: 74.0335 },
      { lat: 18.3412, lng: 74.0335 },
      { lat: 18.3412, lng: 74.0310 }
    ],
    nearbyLandmarks: [
      { place: 'Saswad Town Center', distance: '4.5 km' },
      { place: 'Proposed New Pune Airport', distance: '6.0 km' }
    ],

    plotSize: 2,
    sizeUnit: 'acres',
    plotSizeSqFt: 87120,
    dimensions: { length: 330, breadth: 264, unit: 'ft' },
    facing: 'North',
    roadWidth: 30,
    roadType: 'Tar Approach Road',
    isCornerPlot: false,
    surveyNumber: 'Gat No. 204/1B',
    approvalStatus: 'Agricultural Zone',
    boundaryWall: 'Fenced',
    soilType: 'Rich Organic Black Cotton & Alluvial Soil',
    waterSupply: '2 Dedicated High-Yield Borewells + Canal Touch',
    electricity: 'Agricultural Subsidized 3-Phase Connection',
    gatedCommunity: false,
    overlooking: 'Scenic Sahyadri Hill Valleys',

    vastu: {
      score: 92,
      rating: 'Very Good',
      directionAdvantage: 'North-sloping fertile land ensures excellent harvest yield and natural groundwater retention.',
      dosha: null
    },

    isVerified: true,
    verificationDate: '2026-02-28',
    verifiedBy: 'Revenue Sub-Divisional Inspector - S. Joshi',
    verificationScore: 96,
    verificationChecklist: {
      titleDeedVerified: true,
      encumbranceFree: true,
      layoutApproved: true,
      physicalInspectionDone: true,
      taxReceiptsCleared: true,
      boundaryDemarcated: true
    },
    adminNotes: 'Complete 7/12 Extract and Ferfar mutation entries verified.',

    documents: [
      {
        id: 'doc-301',
        name: '7/12 (Saat-Baara) Extract & 8A Land Record',
        type: '7_12_patta_khata',
        fileUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80',
        status: 'verified',
        uploadedAt: '2026-02-25',
        verifiedAt: '2026-02-28',
        documentNumber: '712/SAS/2026/0491',
        fileSize: '3.8 MB'
      }
    ],

    images: [
      'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1628744448840-55bdb2497bd4?auto=format&fit=crop&w=1200&q=80'
    ],

    seller: {
      id: 'sel-3',
      name: 'Nitin Deshmukh',
      type: 'Owner',
      phone: '+91 94220 56789',
      whatsapp: '+919422056789',
      email: 'nitin.farm@deshmukhagro.in',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      rating: 4.8,
      totalListings: 1
    },

    description: '2 Acres of breathtaking, highly fertile agricultural land with 85 mature Alphonso & Kesar Mango trees, organic soil, and uninterrupted groundwater.',
    highlights: [
      '2 Acres with 85+ Fruiting Mango Trees',
      '2 Active Sweet Water Borewells',
      'Direct Tar Road Frontage (30 ft width)'
    ],
    amenities: [
      'Drip Irrigation Network Installed',
      'Farm Caretaker Cottage & Storage Shed'
    ],
    createdAt: '2026-02-20T11:20:00Z',
    updatedAt: '2026-02-28T16:00:00Z',
    viewsCount: 489,
    inquiriesCount: 22,
    featured: false
  },

  // 4. ELECTRONIC CITY RESIDENTIAL PLOT
  {
    id: 'plot-104',
    title: 'North-Facing Dual-Road Corner Villa Plot in Gated Community',
    category: 'plot',
    propertyType: 'residential_plot',
    listingType: 'sale',
    price: 5200000,
    pricePerUnit: 4333,
    isNegotiable: true,
    bookingAmount: 150000,
    status: 'available',
    city: 'Bangalore',
    locality: 'Electronic City',
    address: 'Plot #88, Silicon Woods Enclave, Neeladri Road, Electronic City Phase 1',
    pincode: '560100',
    landmark: '500m from Infosys Gate #4 & Wipro Campus',
    coordinates: { lat: 12.8452, lng: 77.6602 },
    boundaryPolygon: [
      { lat: 12.8455, lng: 77.6600 },
      { lat: 12.8455, lng: 77.6605 },
      { lat: 12.8449, lng: 77.6605 },
      { lat: 12.8449, lng: 77.6600 }
    ],
    nearbyLandmarks: [
      { place: 'Infosys Main Campus Gate #4', distance: '0.5 km' },
      { place: 'Electronic City Metro Station', distance: '1.4 km' },
      { place: 'Narayana Health City', distance: '4.2 km' }
    ],
    plotSize: 1200,
    sizeUnit: 'sq.ft',
    plotSizeSqFt: 1200,
    dimensions: { length: 40, breadth: 30, unit: 'ft' },
    facing: 'North',
    roadWidth: 35,
    roadType: '35 Ft Wide Asphalted Road with Storm Drains',
    isCornerPlot: true,
    surveyNumber: 'Sy. No. 45/3, Plot #88',
    khataNumber: 'E-Khata Class A',
    approvalStatus: 'BDA Approved',
    reraId: 'PRM/KA/RERA/1251/310/PR/200115/003112',
    boundaryWall: 'Full Gated Wall',
    soilType: 'Red Loam Soil',
    waterSupply: 'Borewell & Kaveri Water Connection',
    electricity: 'BESCOM Underground 3-Phase',
    gatedCommunity: true,
    overlooking: 'Central Club House & Green Boulevard',
    vastu: {
      score: 94,
      rating: 'Exceptional',
      directionAdvantage: 'North-facing corner with positive Kubera wealth corridor.',
      dosha: null
    },
    isVerified: true,
    verificationDate: '2026-03-01',
    verifiedBy: 'Verified by TerraPlots Regulatory Cell',
    verificationScore: 96,
    verificationChecklist: {
      titleDeedVerified: true,
      encumbranceFree: true,
      layoutApproved: true,
      physicalInspectionDone: true,
      taxReceiptsCleared: true,
      boundaryDemarcated: true
    },
    documents: [
      {
        id: 'doc-104-1',
        name: 'BDA Layout Sanction Plan',
        type: 'layout_approval',
        fileUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80',
        status: 'verified',
        uploadedAt: '2026-01-10',
        documentNumber: 'BDA/LP/EC-88/2021',
        fileSize: '3.4 MB'
      }
    ],
    images: [
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80'
    ],
    seller: {
      id: 'sel-4',
      name: 'Pradeep Gowda',
      type: 'Owner',
      phone: '+91 98450 11223',
      whatsapp: '+919845011223',
      email: 'pradeep.gowda@techlands.in',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
      rating: 4.9,
      totalListings: 2
    },
    description: 'Corner residential plot in prestigious gated township. 100% clear BDA sanction with underground electrical conduits and dual road corner vantage.',
    highlights: [
      'Corner Plot with 35 ft Wide Roads on Both Sides',
      'Walkable to Infosys and Neeladri Road Market',
      'BDA A-Khata with 100% Bank Loan Approved'
    ],
    amenities: ['Clubhouse', 'Children Play Park', '24x7 Security Guard', 'Solar Street Lighting'],
    createdAt: '2026-02-15T09:00:00Z',
    updatedAt: '2026-03-01T11:00:00Z',
    viewsCount: 312,
    inquiriesCount: 14,
    featured: true
  },

  // 5. WHITEFIELD LUXURY APARTMENT
  {
    id: 'apt-201',
    title: 'Prestige Lavender 3BHK Ultra-Luxury High-Rise Lake-Facing Apartment',
    category: 'property',
    propertyType: 'apartment',
    listingType: 'sale',
    price: 16500000,
    pricePerUnit: 8918,
    isNegotiable: true,
    bookingAmount: 500000,
    status: 'available',
    city: 'Bangalore',
    locality: 'Whitefield',
    address: 'Tower 4, 18th Floor, Prestige Lavender, ITPL Main Road',
    pincode: '560066',
    landmark: 'Opposite Forum Shantiniketan Mall & ITPL Tech Park',
    coordinates: { lat: 12.9854, lng: 77.7441 },
    boundaryPolygon: [
      { lat: 12.9858, lng: 77.7438 },
      { lat: 12.9858, lng: 77.7445 },
      { lat: 12.9850, lng: 77.7445 },
      { lat: 12.9850, lng: 77.7438 }
    ],
    nearbyLandmarks: [
      { place: 'Forum Shantiniketan Mall', distance: '0.3 km' },
      { place: 'ITPL Tech Park', distance: '0.8 km' },
      { place: 'Whitefield Metro Station', distance: '1.1 km' }
    ],
    plotSize: 1850,
    sizeUnit: 'sq.ft',
    plotSizeSqFt: 1850,
    dimensions: { length: 55, breadth: 34, unit: 'ft' },
    facing: 'East',
    roadWidth: 80,
    roadType: '80 Ft Wide Main Arterial Road',
    isCornerPlot: false,
    surveyNumber: 'Sy. No. 89/1A, Flat 1804',
    khataNumber: 'BBMP A-Khata',
    approvalStatus: 'RERA Approved',
    reraId: 'PRM/KA/RERA/1251/446/PR/171015/000850',
    boundaryWall: 'Full Gated Wall',
    waterSupply: '24x7 Cauvery Water & Dual Water Softener Plant',
    electricity: 'BESCOM with 100% Generator Backup',
    gatedCommunity: true,
    overlooking: 'Varthur Lake & Landscaped Infinity Pool',
    bedrooms: 3,
    bathrooms: 3,
    builtUpArea: 1850,
    carpetArea: 1420,
    furnishing: 'Semi-Furnished',
    floor: '18th of 28 Floors',
    parking: '2 Covered Basement Car Parks',
    vastu: {
      score: 95,
      rating: 'Exceptional',
      directionAdvantage: 'East-facing entrance with unobstructed morning sunlight into living room.',
      dosha: null
    },
    isVerified: true,
    verificationDate: '2026-03-05',
    verifiedBy: 'Verified by TerraPlots Regulatory Cell',
    verificationScore: 98,
    verificationChecklist: {
      titleDeedVerified: true,
      encumbranceFree: true,
      layoutApproved: true,
      physicalInspectionDone: true,
      taxReceiptsCleared: true,
      boundaryDemarcated: true
    },
    documents: [
      {
        id: 'doc-201-1',
        name: 'RERA Registration Certificate',
        type: 'rera_cert',
        fileUrl: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=800&q=80',
        status: 'verified',
        uploadedAt: '2026-02-01',
        documentNumber: 'RERA-KA-2022-850',
        fileSize: '2.5 MB'
      }
    ],
    images: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'
    ],
    seller: {
      id: 'sel-5',
      name: 'Aditi Sharma',
      type: 'Verified Agent',
      agencyName: 'Prestige Elite Realtors',
      phone: '+91 98455 22334',
      whatsapp: '+919845522334',
      email: 'aditi.sharma@prestigerealtors.com',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
      rating: 4.95,
      totalListings: 8
    },
    description: 'Spectacular 3BHK high-rise apartment on the 18th floor with breathtaking lake views. Features Italian marble flooring, VRV central AC, modular kitchen, and double-height balconies.',
    highlights: [
      '18th Floor Panoramic Lake & Horizon Views',
      'Walkable to Forum Shantiniketan & Whitefield Metro',
      'Full OC Received & 100% Home Loan Pre-Approved'
    ],
    amenities: [
      'Infinity Rooftop Swimming Pool',
      '50,000 sq.ft World-Class Clubhouse',
      'Squash Court & Indoor Badminton',
      'EV Charging Bays'
    ],
    createdAt: '2026-03-01T10:00:00Z',
    updatedAt: '2026-03-10T14:00:00Z',
    viewsCount: 654,
    inquiriesCount: 29,
    featured: true
  },

  // 6. ELECTRONIC CITY APARTMENT
  {
    id: 'apt-202',
    title: 'Godrej Reflections 2BHK Lakeview Gated Community Apartment',
    category: 'property',
    propertyType: 'apartment',
    listingType: 'sale',
    price: 8200000,
    pricePerUnit: 6949,
    isNegotiable: true,
    bookingAmount: 250000,
    status: 'available',
    city: 'Bangalore',
    locality: 'Electronic City',
    address: 'Block C, 7th Floor, Godrej Reflections, Electronic City Phase 1',
    pincode: '560100',
    landmark: '1 km from Wipro Gate #2 & Electronic City Metro Station',
    coordinates: { lat: 12.8512, lng: 77.6654 },
    boundaryPolygon: [
      { lat: 12.8515, lng: 77.6650 },
      { lat: 12.8515, lng: 77.6658 },
      { lat: 12.8509, lng: 77.6658 },
      { lat: 12.8509, lng: 77.6650 }
    ],
    nearbyLandmarks: [
      { place: 'Wipro Campus Phase 1', distance: '0.9 km' },
      { place: 'Electronic City Elevated Flyover', distance: '1.2 km' }
    ],
    plotSize: 1180,
    sizeUnit: 'sq.ft',
    plotSizeSqFt: 1180,
    dimensions: { length: 42, breadth: 28, unit: 'ft' },
    facing: 'North',
    roadWidth: 60,
    roadType: '60 Ft Wide Avenue',
    isCornerPlot: false,
    surveyNumber: 'Sy. No. 102/2, Flat C-702',
    khataNumber: 'E-Khata Class A',
    approvalStatus: 'BDA Approved',
    reraId: 'PRM/KA/RERA/1251/310/PR/180602/001850',
    boundaryWall: 'Full Gated Wall',
    waterSupply: '24x7 Treated Water & Cauvery Connection',
    electricity: 'BESCOM with Full Power Backup',
    gatedCommunity: true,
    overlooking: 'Natural Lake & Organic Flora Garden',
    bedrooms: 2,
    bathrooms: 2,
    builtUpArea: 1180,
    carpetArea: 920,
    furnishing: 'Semi-Furnished',
    floor: '7th of 14 Floors',
    parking: '1 Covered Stilt Car Parking',
    vastu: {
      score: 92,
      rating: 'Exceptional',
      directionAdvantage: 'North-facing main entrance ensuring excellent air cross-ventilation.',
      dosha: null
    },
    isVerified: true,
    verificationDate: '2026-03-08',
    verifiedBy: 'Verified by TerraPlots Regulatory Cell',
    verificationScore: 95,
    verificationChecklist: {
      titleDeedVerified: true,
      encumbranceFree: true,
      layoutApproved: true,
      physicalInspectionDone: true,
      taxReceiptsCleared: true,
      boundaryDemarcated: true
    },
    documents: [
      {
        id: 'doc-202-1',
        name: 'Registered Sale Deed Copy',
        type: 'title_deed',
        fileUrl: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=800&q=80',
        status: 'verified',
        uploadedAt: '2026-02-10',
        documentNumber: 'DEED-EC-2023-77',
        fileSize: '3.1 MB'
      }
    ],
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80'
    ],
    seller: {
      id: 'sel-6',
      name: 'Naveen Chandran',
      type: 'Owner',
      phone: '+91 99801 88776',
      whatsapp: '+919980188776',
      email: 'naveen.c@fintechhub.in',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      rating: 4.8,
      totalListings: 1
    },
    description: 'Charming 2BHK flat with zero common walls and great privacy. Overlooks natural lake and serene walking garden. Equipped with modular kitchen and wardrobes.',
    highlights: [
      'Zero Common Walls - Maximum Privacy',
      'Walk to Top Tech IT Parks in Electronic City',
      'Low Maintenance & Solid Rental Yield'
    ],
    amenities: ['Gymnasium', 'Swimming Pool', 'Badminton Court', 'Kids Play Zone'],
    createdAt: '2026-02-28T14:00:00Z',
    updatedAt: '2026-03-08T18:00:00Z',
    viewsCount: 421,
    inquiriesCount: 19,
    featured: false
  },

  // 7. HSR LAYOUT RESIDENTIAL PLOT
  {
    id: 'plot-105',
    title: 'Prime BDA A-Khata Freehold Independent Plot in Gated Sector',
    category: 'plot',
    propertyType: 'residential_plot',
    listingType: 'sale',
    price: 18500000,
    pricePerUnit: 7708,
    isNegotiable: true,
    bookingAmount: 500000,
    status: 'available',
    city: 'Bangalore',
    locality: 'HSR Layout',
    address: 'Plot #14, Sector 2, 17th Cross, HSR Ring Road Corridor',
    pincode: '560102',
    landmark: '300m from Agara Lake Promenade & BDA Complex',
    coordinates: { lat: 12.9121, lng: 77.6446 },
    boundaryPolygon: [
      { lat: 12.9125, lng: 77.6442 },
      { lat: 12.9125, lng: 77.6450 },
      { lat: 12.9117, lng: 77.6450 },
      { lat: 12.9117, lng: 77.6442 }
    ],
    nearbyLandmarks: [
      { place: 'Agara Lake Promenade', distance: '0.3 km' },
      { place: 'HSR Club', distance: '0.8 km' },
      { place: 'Koramangala 5th Block', distance: '3.2 km' }
    ],
    plotSize: 2400,
    sizeUnit: 'sq.ft',
    plotSizeSqFt: 2400,
    dimensions: { length: 60, breadth: 40, unit: 'ft' },
    facing: 'East',
    roadWidth: 40,
    roadType: '40 Ft Wide Concrete Road with Curbs',
    isCornerPlot: false,
    surveyNumber: 'Sy. No. 20/4, Site #14',
    khataNumber: 'BDA A-Khata Clear Title',
    approvalStatus: 'BDA Approved',
    boundaryWall: 'Full Gated Wall',
    soilType: 'Firm Sandy Clay (No excavation needed)',
    waterSupply: '24x7 Cauvery Connection',
    electricity: 'BESCOM High Capacity Connection',
    gatedCommunity: false,
    overlooking: 'Lush Tree Canopy & Agara Lake Park',
    vastu: {
      score: 97,
      rating: 'Exceptional',
      directionAdvantage: 'East-facing wide frontage with prime solar path alignment.',
      dosha: null
    },
    isVerified: true,
    verificationDate: '2026-03-04',
    verifiedBy: 'Verified by TerraPlots Regulatory Cell',
    verificationScore: 99,
    verificationChecklist: {
      titleDeedVerified: true,
      encumbranceFree: true,
      layoutApproved: true,
      physicalInspectionDone: true,
      taxReceiptsCleared: true,
      boundaryDemarcated: true
    },
    documents: [
      {
        id: 'doc-105-1',
        name: 'BDA Title Allotment Letter',
        type: 'title_deed',
        fileUrl: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=800&q=80',
        status: 'verified',
        uploadedAt: '2026-01-18',
        documentNumber: 'BDA-HSR-ALLOT-14',
        fileSize: '4.8 MB'
      }
    ],
    images: [
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80'
    ],
    seller: {
      id: 'sel-1',
      name: 'Vikramaditya Rao',
      type: 'Owner',
      phone: '+91 98450 12345',
      whatsapp: '+919845012345',
      email: 'vikram.rao@bengaluruhomes.in',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80',
      rating: 4.9,
      totalListings: 4
    },
    description: 'Rare 2,400 sq.ft (40x60) independent plot in HSR Sector 2. Perfect for luxury 4-floor stilt+duplex construction or high-yield rental residence.',
    highlights: [
      'Prime 40x60 ft Dimension in HSR Sector 2',
      'Unmatched Connectivity to Koramangala & Silk Board',
      'Clear 40-Year Mother Deed with A-Khata Transfer'
    ],
    amenities: ['Wide 40 ft Road', 'Piped Gas Connection Ready', 'Underground Drainage'],
    createdAt: '2026-03-01T11:00:00Z',
    updatedAt: '2026-03-04T15:00:00Z',
    viewsCount: 890,
    inquiriesCount: 41,
    featured: true
  },

  // 8. HSR LAYOUT APARTMENT
  {
    id: 'apt-203',
    title: 'Sobha Silicon Oasis 3BHK Luxury Garden Residence',
    category: 'property',
    propertyType: 'apartment',
    listingType: 'sale',
    price: 19500000,
    pricePerUnit: 10000,
    isNegotiable: true,
    bookingAmount: 500000,
    status: 'available',
    city: 'Bangalore',
    locality: 'HSR Layout',
    address: 'Tower B, 4th Floor, 24th Main, HSR Layout Sector 1',
    pincode: '560102',
    landmark: 'Near HSR Club & BDA Complex',
    coordinates: { lat: 12.9145, lng: 77.6498 },
    boundaryPolygon: [
      { lat: 12.9150, lng: 77.6492 },
      { lat: 12.9150, lng: 77.6504 },
      { lat: 12.9140, lng: 77.6504 },
      { lat: 12.9140, lng: 77.6492 }
    ],
    nearbyLandmarks: [
      { place: 'HSR Club', distance: '0.4 km' },
      { place: 'NIFT Bangalore Campus', distance: '1.1 km' },
      { place: 'Sony World Signal Koramangala', distance: '2.8 km' }
    ],
    plotSize: 1950,
    sizeUnit: 'sq.ft',
    plotSizeSqFt: 1950,
    dimensions: { length: 58, breadth: 33, unit: 'ft' },
    facing: 'North-East',
    roadWidth: 60,
    roadType: '60 Ft Main Boulevard',
    isCornerPlot: false,
    surveyNumber: 'Sy. No. 12/1, Flat B-402',
    khataNumber: 'BBMP A-Khata',
    approvalStatus: 'BDA Approved',
    reraId: 'PRM/KA/RERA/1251/310/PR/170920/000450',
    boundaryWall: 'Full Gated Wall',
    waterSupply: '24x7 Cauvery Connection',
    electricity: 'BESCOM with 100% DG Backup',
    gatedCommunity: true,
    overlooking: 'Japanese Zen Garden & Olympic Swimming Pool',
    bedrooms: 3,
    bathrooms: 3,
    builtUpArea: 1950,
    carpetArea: 1550,
    furnishing: 'Furnished',
    floor: '4th of 18 Floors',
    parking: '2 Covered Side-by-Side Car Parks',
    vastu: {
      score: 96,
      rating: 'Exceptional',
      directionAdvantage: 'Ishanya (North-East) corner balcony inviting morning peace.',
      dosha: null
    },
    isVerified: true,
    verificationDate: '2026-03-06',
    verifiedBy: 'Verified by TerraPlots Regulatory Cell',
    verificationScore: 97,
    verificationChecklist: {
      titleDeedVerified: true,
      encumbranceFree: true,
      layoutApproved: true,
      physicalInspectionDone: true,
      taxReceiptsCleared: true,
      boundaryDemarcated: true
    },
    documents: [
      {
        id: 'doc-203-1',
        name: 'BBMP Katha Certificate & OC',
        type: 'layout_approval',
        fileUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80',
        status: 'verified',
        uploadedAt: '2026-02-12',
        documentNumber: 'BBMP-OC-HSR-402',
        fileSize: '3.9 MB'
      }
    ],
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80'
    ],
    seller: {
      id: 'sel-7',
      name: 'Rajeshwari Iyer',
      type: 'Owner',
      phone: '+91 98452 77889',
      whatsapp: '+919845277889',
      email: 'rajeshwari.iyer@bangalorelaw.com',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
      rating: 4.95,
      totalListings: 1
    },
    description: 'Designer 3BHK home crafted by Sobha with premium teak wood finishings, Italian marble flooring, and smart automation. Located in the heart of HSR Layout with immediate possession.',
    highlights: [
      'Ultra-Prime HSR Sector 1 Location',
      'Full Teak Wood Craftsmanship & Smart Home Automation',
      '2 Designated Side-by-Side Car Parks'
    ],
    amenities: ['Olympic Swimming Pool', 'Gymnasium', 'Tennis Court', 'Billiards Room', 'Banquet Hall'],
    createdAt: '2026-03-02T12:00:00Z',
    updatedAt: '2026-03-06T17:00:00Z',
    viewsCount: 712,
    inquiriesCount: 34,
    featured: true
  },

  // 9. GACHIBOWLI RESIDENTIAL VILLA PLOT
  {
    id: 'plot-106',
    title: 'HMDA Approved Luxury Gated Villa Plot near Financial Corridor',
    category: 'plot',
    propertyType: 'residential_plot',
    listingType: 'sale',
    price: 14500000,
    pricePerUnit: 5370,
    isNegotiable: true,
    bookingAmount: 400000,
    status: 'available',
    city: 'Hyderabad',
    locality: 'Gachibowli',
    address: 'Plot #76, Prestige Boulevard, Nanakramguda Ext., Gachibowli Corridor',
    pincode: '500032',
    landmark: 'Near Continental Hospital & WaveRock SEZ',
    coordinates: { lat: 17.4285, lng: 78.3412 },
    boundaryPolygon: [
      { lat: 17.4289, lng: 78.3408 },
      { lat: 17.4289, lng: 78.3416 },
      { lat: 17.4281, lng: 78.3416 },
      { lat: 17.4281, lng: 78.3408 }
    ],
    nearbyLandmarks: [
      { place: 'Continental Hospital', distance: '0.8 km' },
      { place: 'WaveRock IT Park', distance: '1.2 km' },
      { place: 'ORR Gachibowli Junction', distance: '2.0 km' }
    ],
    plotSize: 2700,
    sizeUnit: 'sq.ft',
    plotSizeSqFt: 2700,
    dimensions: { length: 60, breadth: 45, unit: 'ft' },
    facing: 'North-East',
    roadWidth: 50,
    roadType: '50 Ft Wide Asphalt Road with Under-pavement Utilities',
    isCornerPlot: false,
    surveyNumber: 'Sy. No. 64/2, Plot #76',
    khataNumber: 'HMDA LP/002341/2022',
    approvalStatus: 'HMDA Approved',
    reraId: 'P02400004521',
    boundaryWall: 'Full Gated Wall',
    soilType: 'Deccan Red Soil (Ideal for multi-story villas)',
    waterSupply: 'HMWSSB Krishna Water Line + Borewell',
    electricity: 'TSSPDCL Dedicated Transformer Grid',
    gatedCommunity: true,
    overlooking: 'Central Lakelet & Palm Tree Avenue',
    vastu: {
      score: 98,
      rating: 'Exceptional',
      directionAdvantage: 'North-East corner orientation maximizing positive cosmic prana.',
      dosha: null
    },
    isVerified: true,
    verificationDate: '2026-03-07',
    verifiedBy: 'Verified by TerraPlots Regulatory Cell',
    verificationScore: 98,
    verificationChecklist: {
      titleDeedVerified: true,
      encumbranceFree: true,
      layoutApproved: true,
      physicalInspectionDone: true,
      taxReceiptsCleared: true,
      boundaryDemarcated: true
    },
    documents: [
      {
        id: 'doc-106-1',
        name: 'HMDA Layout Sanction Order',
        type: 'layout_approval',
        fileUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80',
        status: 'verified',
        uploadedAt: '2026-02-14',
        documentNumber: 'HMDA-LP-2022-76',
        fileSize: '3.7 MB'
      }
    ],
    images: [
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80'
    ],
    seller: {
      id: 'sel-2',
      name: 'K. Chandrashekar Rao',
      type: 'Verified Agent',
      agencyName: 'Deccan Land & Infra Advisory',
      phone: '+91 98490 55667',
      whatsapp: '+919849055667',
      email: 'chandrashekar@deccanland.in',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      rating: 4.95,
      totalListings: 6
    },
    description: '300 sq.yards (2,700 sq.ft) premier villa plot within gated enclave. 50 ft wide blacktop roads, underground cabling, and just 5 minutes from Financial District.',
    highlights: [
      '300 Sq. Yards with North-East Facing',
      '5 Minutes to Financial District & US Consulate',
      '100% HMDA Approved with Clear Title Deed'
    ],
    amenities: ['Clubhouse', 'Underground Utilities', 'Jogging Track', 'Tennis Court'],
    createdAt: '2026-03-03T10:00:00Z',
    updatedAt: '2026-03-07T12:00:00Z',
    viewsCount: 540,
    inquiriesCount: 26,
    featured: true
  },

  // 10. GACHIBOWLI LUXURY APARTMENT
  {
    id: 'apt-204',
    title: 'My Home Bhooja 4BHK Sky Mansion with Panoramic Golf Course Views',
    category: 'property',
    propertyType: 'apartment',
    listingType: 'sale',
    price: 34500000,
    pricePerUnit: 10087,
    isNegotiable: true,
    bookingAmount: 1000000,
    status: 'available',
    city: 'Hyderabad',
    locality: 'Gachibowli',
    address: 'Tower 1, 24th Floor, My Home Bhooja, Knowledge City, Gachibowli',
    pincode: '500081',
    landmark: 'Adjacent to IKEA & Mindspace IT Park',
    coordinates: { lat: 17.4367, lng: 78.3621 },
    boundaryPolygon: [
      { lat: 17.4372, lng: 78.3615 },
      { lat: 17.4372, lng: 78.3627 },
      { lat: 17.4362, lng: 78.3627 },
      { lat: 17.4362, lng: 78.3615 }
    ],
    nearbyLandmarks: [
      { place: 'IKEA Hyderabad', distance: '0.4 km' },
      { place: 'Mindspace IT Park', distance: '0.7 km' },
      { place: 'Inorbit Mall', distance: '1.8 km' }
    ],
    plotSize: 3420,
    sizeUnit: 'sq.ft',
    plotSizeSqFt: 3420,
    dimensions: { length: 70, breadth: 48, unit: 'ft' },
    facing: 'East',
    roadWidth: 100,
    roadType: '100 Ft Wide Knowledge City Expressway',
    isCornerPlot: false,
    surveyNumber: 'Sy. No. 83/1, Sky Mansion 2401',
    khataNumber: 'GHMC A-Khata',
    approvalStatus: 'HMDA Approved',
    reraId: 'P02400000215',
    boundaryWall: 'Full Gated Wall',
    waterSupply: 'HMWSSB Krishna Water Line + Reverse Osmosis Plant',
    electricity: 'TSSPDCL with 100% Dual DG Backup',
    gatedCommunity: true,
    overlooking: 'Hyderabad Golf Course & Sky City Skyline',
    bedrooms: 4,
    bathrooms: 5,
    builtUpArea: 3420,
    carpetArea: 2850,
    furnishing: 'Semi-Furnished',
    floor: '24th of 36 Floors',
    parking: '3 Covered Basement Car Parks',
    vastu: {
      score: 97,
      rating: 'Exceptional',
      directionAdvantage: 'East-facing living balcony welcoming morning sun and abundant wealth energy.',
      dosha: null
    },
    isVerified: true,
    verificationDate: '2026-03-09',
    verifiedBy: 'Verified by TerraPlots Regulatory Cell',
    verificationScore: 99,
    verificationChecklist: {
      titleDeedVerified: true,
      encumbranceFree: true,
      layoutApproved: true,
      physicalInspectionDone: true,
      taxReceiptsCleared: true,
      boundaryDemarcated: true
    },
    documents: [
      {
        id: 'doc-204-1',
        name: 'GHMC Occupancy Certificate',
        type: 'layout_approval',
        fileUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80',
        status: 'verified',
        uploadedAt: '2026-01-20',
        documentNumber: 'GHMC-OC-BHOOJA-2401',
        fileSize: '4.5 MB'
      }
    ],
    images: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80'
    ],
    seller: {
      id: 'sel-8',
      name: 'Dr. Venkat Rao',
      type: 'Owner',
      phone: '+91 98480 33445',
      whatsapp: '+919848033445',
      email: 'dr.venkat.rao@apollohyd.in',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      rating: 4.9,
      totalListings: 1
    },
    description: 'Iconic 4BHK Sky Mansion on the 24th floor of My Home Bhooja. Breathtaking views over the Hyderabad Golf Course, 11 ft ceiling heights, Italian marble, and world-class 80,000 sq.ft clubhouse.',
    highlights: [
      '24th Floor Panoramic Golf Course & Skyline Views',
      'Adjacent to IKEA & Walking Distance to Mindspace',
      '3 Reserved Car Parks & High Speed Private Elevators'
    ],
    amenities: [
      '80,000 sq.ft Clubhouse with Heated Swimming Pool',
      'Rooftop Helipad',
      'Full Squash Courts & Bowling Alley',
      'Private Spa & Salon'
    ],
    createdAt: '2026-03-04T14:00:00Z',
    updatedAt: '2026-03-09T18:00:00Z',
    viewsCount: 1120,
    inquiriesCount: 52,
    featured: true
  },

  // 11. KOKAPET COMMERCIAL HIGH-RISE PLOT
  {
    id: 'plot-107',
    title: 'RERA & HMDA High-Rise Commercial Plot on Golden Mile Corridor',
    category: 'plot',
    propertyType: 'commercial_plot',
    listingType: 'sale',
    price: 38000000,
    pricePerUnit: 7037,
    isNegotiable: true,
    bookingAmount: 1000000,
    status: 'available',
    city: 'Hyderabad',
    locality: 'Kokapet',
    address: 'Survey No. 102/1, Golden Mile SEZ Frontage Road, Kokapet',
    pincode: '500075',
    landmark: 'Opposite Neopolis Kokapet Sky City & Exit #1 Toll Gate',
    coordinates: { lat: 17.4098, lng: 78.3245 },
    boundaryPolygon: [
      { lat: 17.4103, lng: 78.3240 },
      { lat: 17.4103, lng: 78.3250 },
      { lat: 17.4093, lng: 78.3250 },
      { lat: 17.4093, lng: 78.3240 }
    ],
    nearbyLandmarks: [
      { place: 'Neopolis Kokapet', distance: '0.5 km' },
      { place: 'Outer Ring Road Exit #1', distance: '0.8 km' },
      { place: 'Gachibowli Financial District', distance: '4.5 km' }
    ],
    plotSize: 5400,
    sizeUnit: 'sq.ft',
    plotSizeSqFt: 5400,
    dimensions: { length: 90, breadth: 60, unit: 'ft' },
    facing: 'East',
    roadWidth: 100,
    roadType: '100 Ft Master Plan Commercial Arterial Road',
    isCornerPlot: true,
    surveyNumber: 'Sy. No. 102/1A & 102/1B',
    khataNumber: 'HMDA Commercial Clear Title',
    approvalStatus: 'HMDA Approved',
    boundaryWall: 'Fenced',
    soilType: 'Heavy Rock Base (Ideal for deep multi-level basement)',
    waterSupply: 'Dedicated HMWSSB Line Approved',
    electricity: '33KV Substation Direct Connection Available',
    gatedCommunity: false,
    overlooking: 'Kokapet Golden Mile SEZ Boulevard',
    vastu: {
      score: 95,
      rating: 'Exceptional',
      directionAdvantage: 'East-facing wide commercial road frontage guaranteeing high customer footfall.',
      dosha: null
    },
    isVerified: true,
    verificationDate: '2026-03-08',
    verifiedBy: 'Verified by TerraPlots Regulatory Cell',
    verificationScore: 98,
    verificationChecklist: {
      titleDeedVerified: true,
      encumbranceFree: true,
      layoutApproved: true,
      physicalInspectionDone: true,
      taxReceiptsCleared: true,
      boundaryDemarcated: true
    },
    documents: [
      {
        id: 'doc-107-1',
        name: 'HMDA Master Plan Commercial Sanction',
        type: 'layout_approval',
        fileUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80',
        status: 'verified',
        uploadedAt: '2026-02-18',
        documentNumber: 'HMDA-MP-KOKAPET-102',
        fileSize: '5.2 MB'
      }
    ],
    images: [
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80'
    ],
    seller: {
      id: 'sel-2',
      name: 'K. Chandrashekar Rao',
      type: 'Verified Agent',
      agencyName: 'Deccan Land & Infra Advisory',
      phone: '+91 98490 55667',
      whatsapp: '+919849055667',
      email: 'chandrashekar@deccanland.in',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      rating: 4.95,
      totalListings: 6
    },
    description: '600 sq.yards (5,400 sq.ft) commercial plot in the booming Kokapet Golden Mile corridor. Unlimited FSI potential for commercial towers, hotels, and retail complexes.',
    highlights: [
      '100 Ft Master Plan Road Frontage',
      'Opposite Neopolis Sky City Corridor',
      'Unlimited High-Rise FSI Commercial Sanction'
    ],
    amenities: ['100 Ft Wide Road', 'Heavy Power Load Grid', 'Storm Drains Ready'],
    createdAt: '2026-03-05T11:00:00Z',
    updatedAt: '2026-03-08T16:00:00Z',
    viewsCount: 780,
    inquiriesCount: 38,
    featured: true
  },

  // 12. KOKAPET APARTMENT
  {
    id: 'apt-205',
    title: 'Aparna Zenon 3BHK Premium High-Rise Apartment',
    category: 'property',
    propertyType: 'apartment',
    listingType: 'sale',
    price: 14200000,
    pricePerUnit: 8452,
    isNegotiable: true,
    bookingAmount: 400000,
    status: 'available',
    city: 'Hyderabad',
    locality: 'Kokapet',
    address: 'Tower 6, 12th Floor, Aparna Zenon, Narsingi-Kokapet Main Road',
    pincode: '500075',
    landmark: 'Near Rockwell International School & ORR Junction',
    coordinates: { lat: 17.3987, lng: 78.3365 },
    boundaryPolygon: [
      { lat: 17.3992, lng: 78.3360 },
      { lat: 17.3992, lng: 78.3370 },
      { lat: 17.3982, lng: 78.3370 },
      { lat: 17.3982, lng: 78.3360 }
    ],
    nearbyLandmarks: [
      { place: 'Rockwell International School', distance: '0.6 km' },
      { place: 'Narsingi Toll Plaza', distance: '1.4 km' },
      { place: 'Gandipet Osman Sagar Lake', distance: '3.5 km' }
    ],
    plotSize: 1680,
    sizeUnit: 'sq.ft',
    plotSizeSqFt: 1680,
    dimensions: { length: 52, breadth: 32, unit: 'ft' },
    facing: 'West',
    roadWidth: 60,
    roadType: '60 Ft Wide Main Access Road',
    isCornerPlot: false,
    surveyNumber: 'Sy. No. 115/2, Flat 1206',
    khataNumber: 'HMDA A-Khata',
    approvalStatus: 'HMDA Approved',
    reraId: 'P02400003720',
    boundaryWall: 'Full Gated Wall',
    waterSupply: '24x7 HMWSSB Water & Water Softener Plant',
    electricity: 'TSSPDCL with 100% Power Backup',
    gatedCommunity: true,
    overlooking: 'Central Landscaped Podium & Gandipet Breeze',
    bedrooms: 3,
    bathrooms: 3,
    builtUpArea: 1680,
    carpetArea: 1320,
    furnishing: 'Semi-Furnished',
    floor: '12th of 32 Floors',
    parking: '2 Covered Basement Car Parks',
    vastu: {
      score: 93,
      rating: 'Exceptional',
      directionAdvantage: 'Well-aligned kitchen in South-East (Agni) quadrant and master bed in South-West.',
      dosha: null
    },
    isVerified: true,
    verificationDate: '2026-03-09',
    verifiedBy: 'Verified by TerraPlots Regulatory Cell',
    verificationScore: 96,
    verificationChecklist: {
      titleDeedVerified: true,
      encumbranceFree: true,
      layoutApproved: true,
      physicalInspectionDone: true,
      taxReceiptsCleared: true,
      boundaryDemarcated: true
    },
    documents: [
      {
        id: 'doc-205-1',
        name: 'RERA & HMDA Sanction Plan',
        type: 'rera_cert',
        fileUrl: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=800&q=80',
        status: 'verified',
        uploadedAt: '2026-02-15',
        documentNumber: 'RERA-ZENON-3720',
        fileSize: '3.2 MB'
      }
    ],
    images: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80'
    ],
    seller: {
      id: 'sel-9',
      name: 'Sunil Varma',
      type: 'Verified Agent',
      agencyName: 'CyberCity Premier Properties',
      phone: '+91 99880 77665',
      whatsapp: '+919849055667',
      email: 'sunil.varma@cybercityprops.in',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
      rating: 4.88,
      totalListings: 5
    },
    description: 'Chic 3BHK flat on 12th floor with open views towards Gandipet lake. High ceiling, French windows, EV charging point, and world-class sports club amenities.',
    highlights: [
      '12th Floor Lake Breeze Orientation',
      'Fast Access to Financial District via Kokapet Trumpet Interchange',
      '2 Dedicated Parking Slots & Comprehensive Sports Club'
    ],
    amenities: ['Clubhouse', 'Swimming Pool', 'Cricket Nets', 'Tennis Court', 'Supermarket on Campus'],
    createdAt: '2026-03-05T15:00:00Z',
    updatedAt: '2026-03-09T19:00:00Z',
    viewsCount: 620,
    inquiriesCount: 27,
    featured: false
  },

  // 13. HINJEWADI RESIDENTIAL PLOT
  {
    id: 'plot-108',
    title: 'PMRDA Approved Corner Residential Plot in IT Corridor',
    category: 'plot',
    propertyType: 'residential_plot',
    listingType: 'sale',
    price: 4800000,
    pricePerUnit: 2666,
    isNegotiable: true,
    bookingAmount: 150000,
    status: 'available',
    city: 'Pune',
    locality: 'Hinjewadi',
    address: 'Plot #52, Megapolis Meadow Greens, Phase 3, Hinjewadi',
    pincode: '411057',
    landmark: 'Near TCS Sahyadri Park & Tech Mahindra Campus',
    coordinates: { lat: 18.5912, lng: 73.6987 },
    boundaryPolygon: [
      { lat: 18.5916, lng: 73.6982 },
      { lat: 18.5916, lng: 73.6992 },
      { lat: 18.5908, lng: 73.6992 },
      { lat: 18.5908, lng: 73.6982 }
    ],
    nearbyLandmarks: [
      { place: 'TCS Sahyadri Park', distance: '0.8 km' },
      { place: 'Tech Mahindra Campus', distance: '1.2 km' },
      { place: 'Mumbai-Pune Expressway Bypass', distance: '4.5 km' }
    ],
    plotSize: 1800,
    sizeUnit: 'sq.ft',
    plotSizeSqFt: 1800,
    dimensions: { length: 45, breadth: 40, unit: 'ft' },
    facing: 'North',
    roadWidth: 40,
    roadType: '40 Ft Wide Concrete Road with Curbs',
    isCornerPlot: true,
    surveyNumber: 'Gat No. 142/3, Plot #52',
    khataNumber: 'PMRDA Sanctioned Collector NA',
    approvalStatus: 'DC Converted',
    boundaryWall: 'Full Gated Wall',
    soilType: 'Black Cotton with Murrum Subbase',
    waterSupply: 'MIDC Treated Pipeline + Underground Sump',
    electricity: 'MSEDCL 3-Phase Underground Line',
    gatedCommunity: true,
    overlooking: 'Lush Sahyadri Hillock & Green Valley',
    vastu: {
      score: 94,
      rating: 'Exceptional',
      directionAdvantage: 'North-facing hill-view plot bringing prosperity and peace.',
      dosha: null
    },
    isVerified: true,
    verificationDate: '2026-03-08',
    verifiedBy: 'Verified by TerraPlots Regulatory Cell',
    verificationScore: 96,
    verificationChecklist: {
      titleDeedVerified: true,
      encumbranceFree: true,
      layoutApproved: true,
      physicalInspectionDone: true,
      taxReceiptsCleared: true,
      boundaryDemarcated: true
    },
    documents: [
      {
        id: 'doc-108-1',
        name: 'Collector NA Conversion Order & Layout Sanction',
        type: 'conversion_order',
        fileUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80',
        status: 'verified',
        uploadedAt: '2026-01-25',
        documentNumber: 'PMRDA-NA-2023-52',
        fileSize: '4.1 MB'
      }
    ],
    images: [
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80'
    ],
    seller: {
      id: 'sel-10',
      name: 'Sachin Kadam',
      type: 'Owner',
      phone: '+91 98220 44556',
      whatsapp: '+919822044556',
      email: 'sachin.kadam@punelands.in',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80',
      rating: 4.85,
      totalListings: 2
    },
    description: '1,800 sq.ft residential corner plot with mountain views in Hinjewadi Phase 3. Collector NA sanctioned, clear 7/12 extract, immediate building permission.',
    highlights: [
      'Scenic Sahyadri Hill Views with 40 ft Road Frontage',
      '5 Minutes to Hinjewadi Phase 3 IT Companies',
      'Collector NA Clear Title with Bank Loan Sanctioned'
    ],
    amenities: ['Gated Entry Arch', '24x7 Security Guard', 'Street Lights', 'Water Pipeline to Plot'],
    createdAt: '2026-03-02T16:00:00Z',
    updatedAt: '2026-03-08T18:00:00Z',
    viewsCount: 460,
    inquiriesCount: 21,
    featured: true
  },

  // 14. HINJEWADI APARTMENT
  {
    id: 'apt-206',
    title: 'Kolte Patil Life Republic 2BHK Smart City High-Rise Apartment',
    category: 'property',
    propertyType: 'apartment',
    listingType: 'sale',
    price: 6400000,
    pricePerUnit: 6530,
    isNegotiable: true,
    bookingAmount: 200000,
    status: 'available',
    city: 'Pune',
    locality: 'Hinjewadi',
    address: 'Cluster R9, 10th Floor, Life Republic Township, Hinjewadi',
    pincode: '411057',
    landmark: 'Near Infosys Circle & Mumbai-Pune Expressway',
    coordinates: { lat: 18.6012, lng: 73.7123 },
    boundaryPolygon: [
      { lat: 18.6016, lng: 73.7118 },
      { lat: 18.6016, lng: 73.7128 },
      { lat: 18.6008, lng: 73.7128 },
      { lat: 18.6008, lng: 73.7118 }
    ],
    nearbyLandmarks: [
      { place: 'Infosys Hinjewadi Campus', distance: '1.5 km' },
      { place: 'Wipro Technologies', distance: '2.1 km' },
      { place: 'Bhumkar Chowk Wakad', distance: '4.8 km' }
    ],
    plotSize: 980,
    sizeUnit: 'sq.ft',
    plotSizeSqFt: 980,
    dimensions: { length: 35, breadth: 28, unit: 'ft' },
    facing: 'East',
    roadWidth: 60,
    roadType: '60 Ft Wide Township Ring Road',
    isCornerPlot: false,
    surveyNumber: 'Gat No. 74, Flat R9-1004',
    khataNumber: 'PMRDA A-Khata',
    approvalStatus: 'RERA Approved',
    reraId: 'P52100022144',
    boundaryWall: 'Full Gated Wall',
    waterSupply: '24x7 Treated Water Supply',
    electricity: 'MSEDCL with 100% Inverter Backup',
    gatedCommunity: true,
    overlooking: 'Township Botanical Garden & Sports Arena',
    bedrooms: 2,
    bathrooms: 2,
    builtUpArea: 980,
    carpetArea: 760,
    furnishing: 'Semi-Furnished',
    floor: '10th of 22 Floors',
    parking: '1 Covered Stilt Parking',
    vastu: {
      score: 93,
      rating: 'Exceptional',
      directionAdvantage: 'East-facing entrance providing healthy morning sunlight.',
      dosha: null
    },
    isVerified: true,
    verificationDate: '2026-03-08',
    verifiedBy: 'Verified by TerraPlots Regulatory Cell',
    verificationScore: 97,
    verificationChecklist: {
      titleDeedVerified: true,
      encumbranceFree: true,
      layoutApproved: true,
      physicalInspectionDone: true,
      taxReceiptsCleared: true,
      boundaryDemarcated: true
    },
    documents: [
      {
        id: 'doc-206-1',
        name: 'RERA Registration & PMRDA Sanction',
        type: 'rera_cert',
        fileUrl: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=800&q=80',
        status: 'verified',
        uploadedAt: '2026-02-12',
        documentNumber: 'RERA-PUNE-22144',
        fileSize: '3.6 MB'
      }
    ],
    images: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80'
    ],
    seller: {
      id: 'sel-11',
      name: 'Pooja Kulkarni',
      type: 'Owner',
      phone: '+91 98221 99887',
      whatsapp: '+919822199887',
      email: 'pooja.k@puneitconsulting.in',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      rating: 4.88,
      totalListings: 1
    },
    description: 'Bright 2BHK flat in 400-acre mega-township Life Republic. Features double-glazed soundproof windows, high-speed elevators, and proximity to all IT parks.',
    highlights: [
      '400-Acre Gated Township with Multi-Tier Security',
      'Anisha Global International School within Campus',
      'Ready to Move & Low Maintenance Costs'
    ],
    amenities: ['Clubhouse', 'Olympic Swimming Pool', 'Cricket Ground', 'Retail High Street'],
    createdAt: '2026-03-03T14:00:00Z',
    updatedAt: '2026-03-08T17:00:00Z',
    viewsCount: 520,
    inquiriesCount: 24,
    featured: false
  },

  // 15. OMR CHENNAI RESIDENTIAL PLOT
  {
    id: 'plot-109',
    title: 'CMDA & DTCP Approved Coastal Township Villa Plot',
    category: 'plot',
    propertyType: 'residential_plot',
    listingType: 'sale',
    price: 4200000,
    pricePerUnit: 2800,
    isNegotiable: true,
    bookingAmount: 150000,
    status: 'available',
    city: 'Chennai',
    locality: 'OMR',
    address: 'Plot #29, Palm Breeze Avenue, Navalur - OMR Expressway',
    pincode: '600130',
    landmark: 'Adjacent to Marina Mall & AGS Cinemas OMR',
    coordinates: { lat: 12.8423, lng: 80.2287 },
    boundaryPolygon: [
      { lat: 12.8427, lng: 78.2282 },
      { lat: 12.8427, lng: 78.2292 },
      { lat: 12.8419, lng: 78.2292 },
      { lat: 12.8419, lng: 78.2282 }
    ],
    nearbyLandmarks: [
      { place: 'The Marina Mall OMR', distance: '0.4 km' },
      { place: 'Siruseri SIPCOT IT Park', distance: '2.5 km' },
      { place: 'ECR Beach Access Road', distance: '3.8 km' }
    ],
    plotSize: 1500,
    sizeUnit: 'sq.ft',
    plotSizeSqFt: 1500,
    dimensions: { length: 50, breadth: 30, unit: 'ft' },
    facing: 'East',
    roadWidth: 30,
    roadType: '30 Ft Wide Bitumen Road with Avenue Trees',
    isCornerPlot: false,
    surveyNumber: 'Sy. No. 84/2A, Plot #29',
    khataNumber: 'CMDA Patta Freehold',
    approvalStatus: 'DTCP Approved',
    reraId: 'TN/01/Layout/1124/2022',
    boundaryWall: 'Full Gated Wall',
    soilType: 'Coastal Sandy Loam (Sweet Groundwater at 25 ft)',
    waterSupply: 'Sweet Potable Groundwater & Metrowater Ready',
    electricity: 'TANGEDCO 3-Phase Underground Line',
    gatedCommunity: true,
    overlooking: 'Landscaped Boulevard & Coconut Grove',
    vastu: {
      score: 95,
      rating: 'Exceptional',
      directionAdvantage: 'East-facing layout ensuring coastal cross-breeze and sunrise vigor.',
      dosha: null
    },
    isVerified: true,
    verificationDate: '2026-03-08',
    verifiedBy: 'Verified by TerraPlots Regulatory Cell',
    verificationScore: 97,
    verificationChecklist: {
      titleDeedVerified: true,
      encumbranceFree: true,
      layoutApproved: true,
      physicalInspectionDone: true,
      taxReceiptsCleared: true,
      boundaryDemarcated: true
    },
    documents: [
      {
        id: 'doc-109-1',
        name: 'DTCP Layout Approval Certificate',
        type: 'layout_approval',
        fileUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80',
        status: 'verified',
        uploadedAt: '2026-02-08',
        documentNumber: 'DTCP-CHENNAI-2022-29',
        fileSize: '3.4 MB'
      }
    ],
    images: [
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80'
    ],
    seller: {
      id: 'sel-12',
      name: 'R. Subramanian',
      type: 'Owner',
      phone: '+91 98401 22334',
      whatsapp: '+919840122334',
      email: 'subramanian@chennailands.in',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      rating: 4.9,
      totalListings: 1
    },
    description: 'High-and-dry DTCP approved villa plot in Navalur OMR. Walkable to Marina Mall and easy connection to ECR beaches. Sweet drinking water at just 25 feet.',
    highlights: [
      'Sweet Potable Groundwater & Zero Waterlogging',
      'Walkable to The Marina Mall & Vivira Mall',
      'Clear DTCP Patta with 100% Bank Loan Approved'
    ],
    amenities: ['24x7 Security Gate', 'Children Play Park', 'Avenue Trees', 'Blacktop Roads'],
    createdAt: '2026-03-04T10:00:00Z',
    updatedAt: '2026-03-08T15:00:00Z',
    viewsCount: 380,
    inquiriesCount: 18,
    featured: true
  },

  // 16. OMR CHENNAI HIGH-RISE APARTMENT
  {
    id: 'apt-207',
    title: 'Hiranandani Parks 3BHK Ocean-Breeze High-Rise Apartment',
    category: 'property',
    propertyType: 'apartment',
    listingType: 'sale',
    price: 8800000,
    pricePerUnit: 6068,
    isNegotiable: true,
    bookingAmount: 300000,
    status: 'available',
    city: 'Chennai',
    locality: 'OMR',
    address: 'Tower C, 14th Floor, Hiranandani Parks, Padur - OMR',
    pincode: '603103',
    landmark: 'Opposite Siruseri SIPCOT IT Park Main Gate',
    coordinates: { lat: 12.8123, lng: 80.2356 },
    boundaryPolygon: [
      { lat: 12.8128, lng: 80.2350 },
      { lat: 12.8128, lng: 80.2362 },
      { lat: 12.8118, lng: 80.2362 },
      { lat: 12.8118, lng: 80.2350 }
    ],
    nearbyLandmarks: [
      { place: 'Siruseri SIPCOT IT Park', distance: '0.6 km' },
      { place: 'Chettinad Health City', distance: '2.4 km' },
      { place: 'Kovalam Beach ECR', distance: '4.5 km' }
    ],
    plotSize: 1450,
    sizeUnit: 'sq.ft',
    plotSizeSqFt: 1450,
    dimensions: { length: 48, breadth: 30, unit: 'ft' },
    facing: 'North',
    roadWidth: 60,
    roadType: '60 Ft Wide Township Avenue',
    isCornerPlot: false,
    surveyNumber: 'Sy. No. 129/1, Flat C-1402',
    khataNumber: 'CMDA A-Patta',
    approvalStatus: 'DTCP Approved',
    reraId: 'TN/01/Building/0145/2021',
    boundaryWall: 'Full Gated Wall',
    waterSupply: '24x7 Treated Water & Reverse Osmosis Grid',
    electricity: 'TANGEDCO with 100% Generator Backup',
    gatedCommunity: true,
    overlooking: 'Township Golf Greens & Bay of Bengal Horizon',
    bedrooms: 3,
    bathrooms: 3,
    builtUpArea: 1450,
    carpetArea: 1150,
    furnishing: 'Semi-Furnished',
    floor: '14th of 20 Floors',
    parking: '1 Covered Basement Car Park',
    vastu: {
      score: 94,
      rating: 'Exceptional',
      directionAdvantage: 'North-facing with Bay of Bengal cross breeze flowing continuously.',
      dosha: null
    },
    isVerified: true,
    verificationDate: '2026-03-09',
    verifiedBy: 'Verified by TerraPlots Regulatory Cell',
    verificationScore: 98,
    verificationChecklist: {
      titleDeedVerified: true,
      encumbranceFree: true,
      layoutApproved: true,
      physicalInspectionDone: true,
      taxReceiptsCleared: true,
      boundaryDemarcated: true
    },
    documents: [
      {
        id: 'doc-207-1',
        name: 'CMDA Completion & Occupancy Certificate',
        type: 'layout_approval',
        fileUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80',
        status: 'verified',
        uploadedAt: '2026-02-18',
        documentNumber: 'CMDA-OC-HIRANANDANI-1402',
        fileSize: '4.2 MB'
      }
    ],
    images: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'
    ],
    seller: {
      id: 'sel-13',
      name: 'Karthik Narayanan',
      type: 'Verified Agent',
      agencyName: 'Chennai Coast Realty',
      phone: '+91 98402 88990',
      whatsapp: '+919840288990',
      email: 'karthik@chennaicoastrealty.com',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
      rating: 4.92,
      totalListings: 4
    },
    description: 'Neoclassical 3BHK home in prestigious Hiranandani township. High ceiling, sprawling balconies with Bay of Bengal horizon views, and walking distance to Siruseri IT park.',
    highlights: [
      '14th Floor Sea Breeze & Golf Greens View',
      'Walk to Siruseri SIPCOT IT Park (Over 200 IT companies)',
      'World-Class Hiranandani Quality & Clubhouse'
    ],
    amenities: ['9-Hole Golf Course', '50,000 sq.ft Clubhouse', 'Squash & Tennis Courts', 'Supermarket'],
    createdAt: '2026-03-05T12:00:00Z',
    updatedAt: '2026-03-09T17:00:00Z',
    viewsCount: 680,
    inquiriesCount: 31,
    featured: true
  }
];

export const INITIAL_INQUIRIES: Inquiry[] = [
  {
    id: 'inq-1',
    propertyId: 'plot-101',
    propertyTitle: 'East-Facing Premium Villa Plot in BDA Approved Gated Community',
    propertyCategory: 'plot',
    propertyType: 'residential_plot',
    buyerName: 'Dr. Alok Verma',
    buyerPhone: '+91 98765 43210',
    buyerEmail: 'alok.verma@apollo.org',
    inquiryType: 'site_visit_request',
    preferredVisitDate: '2026-04-05',
    message: 'Hello, I am interested in building a duplex villa here. Is the title mother deed ready for legal inspection? Would like to visit this Saturday.',
    status: 'new',
    createdAt: '2026-03-28T14:30:00Z',
    sellerId: 'sel-1'
  }
];

export const INITIAL_CHATS: ChatMessage[] = [
  {
    id: 'chat-1',
    propertyId: 'plot-101',
    senderRole: 'buyer',
    senderName: 'Dr. Alok Verma',
    text: 'Hello Vikramaditya, is the BDA sanction letter available for legal inspection by my lawyer?',
    timestamp: '2026-03-28 14:35'
  },
  {
    id: 'chat-2',
    propertyId: 'plot-101',
    senderRole: 'seller',
    senderName: 'Vikramaditya Rao (Owner)',
    text: 'Yes Dr. Verma! All 30-year deeds and BDA sanction copies are verified and uploaded here on TerraPlots.',
    timestamp: '2026-03-28 14:40'
  }
];
