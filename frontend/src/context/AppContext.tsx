import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { 
  PropertyItem, 
  Inquiry, 
  UserRole, 
  UserProfile,
  FilterState, 
  PropertyDocument, 
  VerificationChecklist,
  VerificationStatus,
  ChatMessage,
  ToastMessage,
  MiddlemanAgent,
  Appointment,
  AppointmentStatus,
  SiteInspectionReport
} from '../types';
import { INITIAL_PROPERTIES, INITIAL_INQUIRIES, INITIAL_CHATS, INITIAL_AGENTS, INITIAL_APPOINTMENTS } from '../data/mockData';
import { api } from '../services/api';
import confetti from 'canvas-confetti';

export const DEMO_USERS: Record<UserRole, UserProfile> = {
  buyer: {
    id: 'user-buyer',
    name: 'Arun Kumar',
    email: 'arun.buyer@terraplots.in',
    role: 'buyer',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
    phone: '+91 98450 77112',
    badge: 'Verified Buyer / Investor'
  },
  seller: {
    id: 'sel-1',
    name: 'Vikramaditya Rao',
    email: 'vikram.rao@bengaluruhomes.in',
    role: 'seller',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80',
    phone: '+91 98450 12345',
    badge: 'Verified Plot Owner / Seller',
    agencyName: 'Bengaluru Heritage Properties'
  },
  agent: {
    id: 'agent-1',
    name: 'Ramesh K. Hegde',
    email: 'ramesh.surveyor@terraplots.in',
    role: 'agent',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    phone: '+91 98451 99882',
    badge: 'Licensed Land Surveyor & Middleman',
    agencyName: 'TerraPlots Field Regulatory Escort'
  },
  admin: {
    id: 'admin-1',
    name: 'Dr. Meenakshi Sundaram',
    email: 'meenakshi.audit@terraplots.gov.in',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80',
    phone: '+91 98440 99001',
    badge: 'Chief Regulatory Audit Officer',
    agencyName: 'TerraPlots Compliance Board'
  }
};

export const DEFAULT_FILTERS: FilterState = {
  searchQuery: '',
  category: 'all',
  propertyTypes: [],
  city: '',
  locality: '',
  minPrice: 0,
  maxPrice: 100000000,
  minSize: 0,
  maxSize: 100000,
  sizeUnit: 'sq.ft',
  facing: [],
  minRoadWidth: 0,
  approvalStatuses: [],
  isCornerPlotOnly: false,
  isVerifiedOnly: false,
  isGatedCommunityOnly: false,
  hasBoundaryWallOnly: false,
  sortBy: 'featured'
};

interface AppContextType {
  // Authentication & Role
  currentUser: UserProfile;
  isSignInModalOpen: boolean;
  openSignInModal: () => void;
  closeSignInModal: () => void;
  signIn: (role: UserRole, customUser?: Partial<UserProfile>) => void;
  signOut: () => void;

  // State
  properties: PropertyItem[];
  inquiries: Inquiry[];
  chats: ChatMessage[];
  toasts: ToastMessage[];
  favorites: string[];
  comparisonList: string[];
  currentRole: UserRole;
  activeView: 'marketplace' | 'seller_dashboard' | 'admin_portal' | 'agent_dashboard' | 'favorites';
  filters: FilterState;
  selectedProperty: PropertyItem | null;
  inspectedDocument: { property: PropertyItem; document: PropertyDocument } | null;
  activeInquiryProperty: PropertyItem | null;
  isAddListingOpen: boolean;
  editingPropertyId: string | null;
  isLoanCalculatorOpen: boolean;
  isUnitConverterOpen: boolean;
  isCompareModalOpen: boolean;
  adminVerificationModalProperty: PropertyItem | null;
  mapSelectedPropertyId: string | null;
  
  // New Enhanced Modals
  isVastuModalOpen: boolean;
  isFactsheetModalOpen: boolean;
  isLiveChatOpen: boolean;
  factsheetProperty: PropertyItem | null;
  chatProperty: PropertyItem | null;

  // Middleman Agents & Appointments
  agents: MiddlemanAgent[];
  appointments: Appointment[];
  isBookAgentModalOpen: boolean;
  bookAgentProperty: PropertyItem | null;
  openBookAgentModal: (property: PropertyItem) => void;
  closeBookAgentModal: () => void;
  bookAppointment: (bookingData: {
    propertyId: string;
    agentId: string;
    buyerName: string;
    buyerPhone: string;
    buyerEmail?: string;
    appointmentDate: string;
    timeSlot: string;
    visitType: 'Assisted Site Visit' | 'Boundary & Land Survey Audit' | 'Deed & Revenue Escort' | 'Owner Negotiation Meeting';
    meetingPoint: 'At Plot Location' | 'Nearest Landmark' | 'Buyer Pickup';
    specialInstructions?: string;
  }) => void;
  updateAppointmentStatus: (appointmentId: string, status: AppointmentStatus) => void;
  submitInspectionReport: (appointmentId: string, report: Omit<SiteInspectionReport, 'id' | 'appointmentId' | 'completedAt'>) => void;

  // Setters
  setCurrentRole: (role: UserRole) => void;
  setActiveView: (view: 'marketplace' | 'seller_dashboard' | 'admin_portal' | 'agent_dashboard' | 'favorites') => void;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  updateFilter: <K extends keyof FilterState>(key: K, value: FilterState[K]) => void;
  resetFilters: () => void;
  setSelectedProperty: (prop: PropertyItem | null) => void;
  setInspectedDocument: (val: { property: PropertyItem; document: PropertyDocument } | null) => void;
  setActiveInquiryProperty: (prop: PropertyItem | null) => void;
  setIsAddListingOpen: (open: boolean) => void;
  setEditingPropertyId: (id: string | null) => void;
  setIsLoanCalculatorOpen: (open: boolean) => void;
  setIsUnitConverterOpen: (open: boolean) => void;
  setIsCompareModalOpen: (open: boolean) => void;
  setAdminVerificationModalProperty: (prop: PropertyItem | null) => void;
  setMapSelectedPropertyId: (id: string | null) => void;
  setIsVastuModalOpen: (open: boolean) => void;
  setIsFactsheetModalOpen: (open: boolean) => void;
  setIsLiveChatOpen: (open: boolean) => void;
  setFactsheetProperty: (prop: PropertyItem | null) => void;
  setChatProperty: (prop: PropertyItem | null) => void;

  // Actions
  addToast: (title: string, message: string, type?: ToastMessage['type']) => void;
  removeToast: (id: string) => void;
  toggleFavorite: (id: string) => void;
  toggleCompare: (id: string) => void;
  addProperty: (newProp: Omit<PropertyItem, 'id' | 'createdAt' | 'updatedAt' | 'viewsCount' | 'inquiriesCount'>) => string;
  updateProperty: (id: string, updates: Partial<PropertyItem>) => void;
  deleteProperty: (id: string) => void;
  toggleVerifyProperty: (id: string, isVerified: boolean, checklist?: Partial<VerificationChecklist>, adminNotes?: string) => void;
  verifyDocument: (propertyId: string, docId: string, status: VerificationStatus, notes?: string) => void;
  addDocument: (propertyId: string, doc: Omit<PropertyDocument, 'id' | 'uploadedAt'>) => void;
  deleteDocument: (propertyId: string, docId: string) => void;
  submitInquiry: (inquiry: Omit<Inquiry, 'id' | 'createdAt' | 'status'>) => void;
  updateInquiryStatus: (inquiryId: string, status: Inquiry['status']) => void;
  sendChatMessage: (msg: Omit<ChatMessage, 'id' | 'timestamp'>) => void;
  resetToMockData: () => void;
  filteredProperties: PropertyItem[];
  isFilterFallback: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const LOCAL_STORAGE_PROPERTIES_KEY = 'terraplot_properties_v4';
const LOCAL_STORAGE_INQUIRIES_KEY = 'terraplot_inquiries_v4';
const LOCAL_STORAGE_FAVORITES_KEY = 'terraplot_favorites_v4';
const LOCAL_STORAGE_CHATS_KEY = 'terraplot_chats_v4';
const LOCAL_STORAGE_AGENTS_KEY = 'terraplot_agents_v4';
const LOCAL_STORAGE_APPOINTMENTS_KEY = 'terraplot_appointments_v4';
const LOCAL_STORAGE_USER_KEY = 'terraplot_active_user_v4';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [properties, setProperties] = useState<PropertyItem[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_PROPERTIES_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return INITIAL_PROPERTIES;
  });

  const [inquiries, setInquiries] = useState<Inquiry[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_INQUIRIES_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return INITIAL_INQUIRIES;
  });

  const [chats, setChats] = useState<ChatMessage[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_CHATS_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return INITIAL_CHATS;
  });

  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_FAVORITES_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return ['plot-101'];
  });

  const [comparisonList, setComparisonList] = useState<string[]>([]);
  const [currentRole, setCurrentRole] = useState<UserRole>('buyer');
  const [activeView, setActiveView] = useState<'marketplace' | 'seller_dashboard' | 'admin_portal' | 'agent_dashboard' | 'favorites'>('marketplace');
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);

  // User Authentication State
  const [currentUser, setCurrentUser] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_USER_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return DEMO_USERS.buyer;
  });

  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);

  const openSignInModal = () => setIsSignInModalOpen(true);
  const closeSignInModal = () => setIsSignInModalOpen(false);

  const signIn = (role: UserRole, customUser?: Partial<UserProfile>) => {
    const baseUser = DEMO_USERS[role];
    const userToSet: UserProfile = {
      ...baseUser,
      ...(customUser || {})
    };

    setCurrentUser(userToSet);
    setCurrentRole(role);

    // Auto-navigate to respective dashboard
    if (role === 'seller') {
      setActiveView('seller_dashboard');
    } else if (role === 'agent') {
      setActiveView('agent_dashboard');
    } else if (role === 'admin') {
      setActiveView('admin_portal');
    } else {
      setActiveView('marketplace');
    }

    try {
      localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(userToSet));
      confetti({
        particleCount: 75,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {}

    const roleLabels: Record<UserRole, string> = {
      buyer: 'Buyer Portal (Wishlist & Bookings)',
      seller: 'Seller Dashboard (My Listings & Leads)',
      agent: 'Middleman Agent Portal (Appointments & Reports)',
      admin: 'Admin Compliance Portal (Audits & Verifications)'
    };

    addToast(
      `Signed in as ${userToSet.name}`,
      `Loaded ${roleLabels[role]}.`,
      'success'
    );

    setIsSignInModalOpen(false);
  };

  const signOut = () => {
    const guestBuyer = DEMO_USERS.buyer;
    setCurrentUser(guestBuyer);
    setCurrentRole('buyer');
    setActiveView('marketplace');
    localStorage.removeItem(LOCAL_STORAGE_USER_KEY);
    addToast('Signed Out', 'You are now browsing as a Guest Buyer.', 'info');
  };

  // Middleman Agents and Appointments State
  const [agents, setAgents] = useState<MiddlemanAgent[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_AGENTS_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return INITIAL_AGENTS;
  });

  const [appointments, setAppointments] = useState<Appointment[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_APPOINTMENTS_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return INITIAL_APPOINTMENTS;
  });

  const [isBookAgentModalOpen, setIsBookAgentModalOpen] = useState(false);
  const [bookAgentProperty, setBookAgentProperty] = useState<PropertyItem | null>(null);

  const openBookAgentModal = (prop: PropertyItem) => {
    setBookAgentProperty(prop);
    setIsBookAgentModalOpen(true);
  };

  const closeBookAgentModal = () => {
    setIsBookAgentModalOpen(false);
    setBookAgentProperty(null);
  };

  const [selectedProperty, setSelectedProperty] = useState<PropertyItem | null>(null);
  const [inspectedDocument, setInspectedDocument] = useState<{ property: PropertyItem; document: PropertyDocument } | null>(null);
  const [activeInquiryProperty, setActiveInquiryProperty] = useState<PropertyItem | null>(null);
  const [isAddListingOpen, setIsAddListingOpen] = useState(false);
  const [editingPropertyId, setEditingPropertyId] = useState<string | null>(null);
  const [isLoanCalculatorOpen, setIsLoanCalculatorOpen] = useState(false);
  const [isUnitConverterOpen, setIsUnitConverterOpen] = useState(false);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);
  const [adminVerificationModalProperty, setAdminVerificationModalProperty] = useState<PropertyItem | null>(null);
  const [mapSelectedPropertyId, setMapSelectedPropertyId] = useState<string | null>(null);

  // New Modals
  const [isVastuModalOpen, setIsVastuModalOpen] = useState(false);
  const [isFactsheetModalOpen, setIsFactsheetModalOpen] = useState(false);
  const [isLiveChatOpen, setIsLiveChatOpen] = useState(false);
  const [factsheetProperty, setFactsheetProperty] = useState<PropertyItem | null>(null);
  const [chatProperty, setChatProperty] = useState<PropertyItem | null>(null);

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_PROPERTIES_KEY, JSON.stringify(properties));
    } catch (e) {}
  }, [properties]);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_INQUIRIES_KEY, JSON.stringify(inquiries));
    } catch (e) {}
  }, [inquiries]);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_CHATS_KEY, JSON.stringify(chats));
    } catch (e) {}
  }, [chats]);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_FAVORITES_KEY, JSON.stringify(favorites));
    } catch (e) {}
  }, [favorites]);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_AGENTS_KEY, JSON.stringify(agents));
    } catch (e) {}
  }, [agents]);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_APPOINTMENTS_KEY, JSON.stringify(appointments));
    } catch (e) {}
  }, [appointments]);

  // Initial backend sync check
  useEffect(() => {
    let mounted = true;
    const syncBackendData = async () => {
      try {
        const [backendProps, backendAgents, backendApts] = await Promise.all([
          api.getProperties(),
          api.getAgents(),
          api.getAppointments()
        ]);
        if (mounted) {
          if (backendProps && Array.isArray(backendProps) && backendProps.length > 0) {
            setProperties(backendProps);
          }
          if (backendAgents && Array.isArray(backendAgents) && backendAgents.length > 0) {
            setAgents(backendAgents);
          }
          if (backendApts && Array.isArray(backendApts) && backendApts.length > 0) {
            setAppointments(backendApts);
          }
        }
      } catch (err) {
        // Backend offline, fallback to local state is active
      }
    };
    syncBackendData();
    return () => { mounted = false; };
  }, []);

  const addToast = (title: string, message: string, type: ToastMessage['type'] = 'success') => {
    const id = `toast-${Date.now()}`;
    setToasts(prev => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const updateFilter = <K extends keyof FilterState>(key: K, value: FilterState[K]) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => {
    setFilters(DEFAULT_FILTERS);
    addToast('Filters Reset', 'Marketplace search parameters cleared to default.', 'info');
  };

  const toggleFavorite = (id: string) => {
    const exists = favorites.includes(id);
    setFavorites(prev => exists ? prev.filter(item => item !== id) : [...prev, id]);
    addToast(
      exists ? 'Removed from Wishlist' : 'Saved to Wishlist',
      exists ? 'Listing removed from your saved list.' : 'Listing added to your saved wishlist.',
      exists ? 'info' : 'success'
    );
  };

  const toggleCompare = (id: string) => {
    setComparisonList(prev => {
      if (prev.includes(id)) {
        return prev.filter(i => i !== id);
      }
      if (prev.length >= 3) {
        addToast('Comparison Limit Reached', 'You can compare up to 3 plots at a time.', 'warning');
        return prev;
      }
      addToast('Added to Comparison', 'Added plot to side-by-side comparison table.', 'success');
      return [...prev, id];
    });
  };

  const addProperty = (newProp: Omit<PropertyItem, 'id' | 'createdAt' | 'updatedAt' | 'viewsCount' | 'inquiriesCount'>): string => {
    const id = `${newProp.category}-${Date.now()}`;
    const newItem: PropertyItem = {
      ...newProp,
      id,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      viewsCount: 1,
      inquiriesCount: 0
    };
    setProperties(prev => [newItem, ...prev]);
    addToast('Listing Published!', 'Your plot/property is now live on the marketplace and queued for admin verification.', 'success');
    return id;
  };

  const updateProperty = (id: string, updates: Partial<PropertyItem>) => {
    setProperties(prev => 
      prev.map(p => p.id === id ? { ...p, ...updates, updatedAt: new Date().toISOString() } : p)
    );
    if (selectedProperty && selectedProperty.id === id) {
      setSelectedProperty(prev => prev ? { ...prev, ...updates } : null);
    }
    addToast('Listing Updated', 'Changes saved successfully.', 'success');
  };

  const deleteProperty = (id: string) => {
    setProperties(prev => prev.filter(p => p.id !== id));
    setFavorites(prev => prev.filter(favId => favId !== id));
    setComparisonList(prev => prev.filter(cId => cId !== id));
    if (selectedProperty && selectedProperty.id === id) {
      setSelectedProperty(null);
    }
    addToast('Listing Deleted', 'Plot listing removed from database.', 'info');
  };

  const toggleVerifyProperty = (
    id: string, 
    isVerified: boolean, 
    checklist?: Partial<VerificationChecklist>, 
    adminNotes?: string
  ) => {
    setProperties(prev => prev.map(p => {
      if (p.id === id) {
        const updatedChecklist = checklist 
          ? { ...p.verificationChecklist, ...checklist } 
          : p.verificationChecklist;

        const countPassed = Object.values(updatedChecklist).filter(Boolean).length;
        const newScore = Math.round((countPassed / 6) * 100);

        return {
          ...p,
          isVerified,
          verificationDate: isVerified ? new Date().toISOString().split('T')[0] : undefined,
          verifiedBy: isVerified ? 'Verified by TerraPlots Regulatory Cell' : undefined,
          verificationScore: newScore,
          verificationChecklist: updatedChecklist,
          adminNotes: adminNotes ?? p.adminNotes
        };
      }
      return p;
    }));

    if (isVerified) {
      try {
        confetti({
          particleCount: 90,
          spread: 80,
          origin: { y: 0.6 }
        });
      } catch (e) {}
      addToast('✓ Verified Plot Badge Issued!', 'Plot has passed all 6 compliance audits and received official badge.', 'success');
    } else {
      addToast('Verification Revoked', 'Plot badge removed / marked pending.', 'warning');
    }

    if (selectedProperty && selectedProperty.id === id) {
      setSelectedProperty(prev => prev ? {
        ...prev,
        isVerified,
        verificationDate: isVerified ? new Date().toISOString().split('T')[0] : undefined,
        verificationScore: 98
      } : null);
    }
  };

  const verifyDocument = (propertyId: string, docId: string, status: VerificationStatus, notes?: string) => {
    setProperties(prev => prev.map(p => {
      if (p.id === propertyId) {
        const updatedDocs = p.documents.map(d => {
          if (d.id === docId) {
            return {
              ...d,
              status,
              verifiedAt: status === 'verified' ? new Date().toISOString().split('T')[0] : undefined,
              notes: notes || d.notes
            };
          }
          return d;
        });
        return { ...p, documents: updatedDocs };
      }
      return p;
    }));

    if (selectedProperty && selectedProperty.id === propertyId) {
      setSelectedProperty(prev => {
        if (!prev) return null;
        return {
          ...prev,
          documents: prev.documents.map(d => d.id === docId ? { ...d, status, notes: notes || d.notes } : d)
        };
      });
    }

    addToast('Document Audit Saved', `Document marked as ${status.toUpperCase()}.`, 'success');
  };

  const addDocument = (propertyId: string, doc: Omit<PropertyDocument, 'id' | 'uploadedAt'>) => {
    const newDoc: PropertyDocument = {
      ...doc,
      id: `doc-${Date.now()}`,
      uploadedAt: new Date().toISOString().split('T')[0]
    };
    setProperties(prev => prev.map(p => {
      if (p.id === propertyId) {
        return { ...p, documents: [...p.documents, newDoc] };
      }
      return p;
    }));
    addToast('Document Uploaded', `${doc.name} added to verification vault.`, 'success');
  };

  const deleteDocument = (propertyId: string, docId: string) => {
    setProperties(prev => prev.map(p => {
      if (p.id === propertyId) {
        return { ...p, documents: p.documents.filter(d => d.id !== docId) };
      }
      return p;
    }));
    addToast('Document Removed', 'Document deleted from listing vault.', 'info');
  };

  const submitInquiry = (inquiryData: Omit<Inquiry, 'id' | 'createdAt' | 'status'>) => {
    const newInquiry: Inquiry = {
      ...inquiryData,
      id: `inq-${Date.now()}`,
      createdAt: new Date().toISOString(),
      status: 'new'
    };
    setInquiries(prev => [newInquiry, ...prev]);

    setProperties(prev => prev.map(p => {
      if (p.id === inquiryData.propertyId) {
        return { ...p, inquiriesCount: p.inquiriesCount + 1 };
      }
      return p;
    }));

    addToast('Inquiry Dispatched!', 'The owner / agent has received your request and phone details.', 'success');
  };

  const updateInquiryStatus = (inquiryId: string, status: Inquiry['status']) => {
    setInquiries(prev => prev.map(inq => inq.id === inquiryId ? { ...inq, status } : inq));
    addToast('Lead Status Updated', `Inquiry status changed to ${status.toUpperCase()}.`, 'info');
  };

  const sendChatMessage = (msg: Omit<ChatMessage, 'id' | 'timestamp'>) => {
    const newMsg: ChatMessage = {
      ...msg,
      id: `chat-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setChats(prev => [...prev, newMsg]);

    // Simulated Auto-Reply if buyer sends message
    if (msg.senderRole === 'buyer') {
      setTimeout(() => {
        const autoReplies = [
          'Thank you for your message! All title deeds and layout sanction maps are uploaded and verified on TerraPlots. When would you like to schedule an on-site visit?',
          'Hello! We can arrange a physical site inspection with the survey engineer this Saturday or Sunday morning.',
          'Your offer has been noted and forwarded to the land owner for review. We will update you shortly.'
        ];
        const randomReply = autoReplies[Math.floor(Math.random() * autoReplies.length)];

        setChats(prev => [
          ...prev,
          {
            id: `chat-reply-${Date.now()}`,
            propertyId: msg.propertyId,
            senderRole: 'seller',
            senderName: 'Verified Seller Agent',
            text: randomReply,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ]);
        addToast('New Seller Message', 'Listing owner replied in live chat.', 'info');
      }, 1400);
    }
  };

  const bookAppointment = (bookingData: {
    propertyId: string;
    agentId: string;
    buyerName: string;
    buyerPhone: string;
    buyerEmail?: string;
    appointmentDate: string;
    timeSlot: string;
    visitType: 'Assisted Site Visit' | 'Boundary & Land Survey Audit' | 'Deed & Revenue Escort' | 'Owner Negotiation Meeting';
    meetingPoint: 'At Plot Location' | 'Nearest Landmark' | 'Buyer Pickup';
    specialInstructions?: string;
  }) => {
    const targetProp = properties.find(p => p.id === bookingData.propertyId) || bookAgentProperty;
    const targetAgent = agents.find(a => a.id === bookingData.agentId) || agents[0];

    const newApt: Appointment = {
      id: `apt-${Date.now()}`,
      propertyId: bookingData.propertyId,
      propertyTitle: targetProp?.title || 'Selected Plot Listing',
      propertyAddress: targetProp?.address || 'Site Location',
      propertyCity: targetProp?.city || 'City Location',
      propertyType: targetProp?.propertyType || 'residential_plot',
      plotSize: targetProp?.plotSize || 1500,
      sizeUnit: targetProp?.sizeUnit || 'sq.ft',
      surveyNumber: targetProp?.surveyNumber || 'Survey Demarcated',
      price: targetProp?.price || 0,
      
      agentId: targetAgent.id,
      agentName: targetAgent.name,
      agentPhone: targetAgent.phone,
      agentAvatar: targetAgent.avatar,
      agentRole: targetAgent.role,

      buyerName: bookingData.buyerName,
      buyerPhone: bookingData.buyerPhone,
      buyerEmail: bookingData.buyerEmail || 'buyer@terraplots.in',

      appointmentDate: bookingData.appointmentDate,
      timeSlot: bookingData.timeSlot,
      visitType: bookingData.visitType,
      serviceFee: targetAgent.serviceFee,
      meetingPoint: bookingData.meetingPoint,
      specialInstructions: bookingData.specialInstructions,

      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    setAppointments(prev => [newApt, ...prev]);
    api.bookAppointment(newApt).catch(() => {});

    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.7 }
      });
    } catch (e) {}

    addToast(
      'Middleman Agent Booked!',
      `Appointment scheduled with ${targetAgent.name} (${targetAgent.role}) for ${bookingData.appointmentDate}.`,
      'success'
    );
  };

  const updateAppointmentStatus = (appointmentId: string, status: AppointmentStatus) => {
    setAppointments(prev => prev.map(apt => 
      apt.id === appointmentId ? { ...apt, status, updatedAt: new Date().toISOString() } : apt
    ));
    api.updateAppointmentStatus(appointmentId, status).catch(() => {});
    addToast(
      'Appointment Updated',
      `Visit status changed to ${status.replace('_', ' ').toUpperCase()}.`,
      'info'
    );
  };

  const submitInspectionReport = (appointmentId: string, report: Omit<SiteInspectionReport, 'id' | 'appointmentId' | 'completedAt'>) => {
    const fullReport: SiteInspectionReport = {
      ...report,
      id: `rep-${Date.now()}`,
      appointmentId,
      completedAt: new Date().toISOString()
    };

    setAppointments(prev => prev.map(apt => {
      if (apt.id === appointmentId) {
        return {
          ...apt,
          status: 'completed' as AppointmentStatus,
          updatedAt: new Date().toISOString(),
          inspectionReport: fullReport
        };
      }
      return apt;
    }));

    api.submitInspectionReport(appointmentId, fullReport).catch(() => {});

    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {}

    addToast(
      'Inspection Report Certified & Filed!',
      'Ground boundary report signed, sealed, and attached to plot inspection dossier.',
      'success'
    );
  };

  const resetToMockData = () => {
    setProperties(INITIAL_PROPERTIES);
    setInquiries(INITIAL_INQUIRIES);
    setChats(INITIAL_CHATS);
    setAgents(INITIAL_AGENTS);
    setAppointments(INITIAL_APPOINTMENTS);
    setFavorites(['plot-101']);
    setComparisonList([]);
    setFilters(DEFAULT_FILTERS);
    localStorage.removeItem(LOCAL_STORAGE_PROPERTIES_KEY);
    localStorage.removeItem(LOCAL_STORAGE_INQUIRIES_KEY);
    localStorage.removeItem(LOCAL_STORAGE_CHATS_KEY);
    localStorage.removeItem(LOCAL_STORAGE_FAVORITES_KEY);
    localStorage.removeItem(LOCAL_STORAGE_AGENTS_KEY);
    localStorage.removeItem(LOCAL_STORAGE_APPOINTMENTS_KEY);
    addToast('Demo State Reset', 'Restored complete rich dataset with all plots & properties.', 'success');
  };

  const sortProperties = (list: PropertyItem[]) => {
    return [...list].sort((a, b) => {
      switch (filters.sortBy) {
        case 'price_asc':
          return a.price - b.price;
        case 'price_desc':
          return b.price - a.price;
        case 'size_desc':
          return b.plotSizeSqFt - a.plotSizeSqFt;
        case 'newest':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'verified_first':
          return (b.isVerified ? 1 : 0) - (a.isVerified ? 1 : 0);
        case 'featured':
        default:
          return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      }
    });
  };

  const { filteredProperties, isFilterFallback } = useMemo(() => {
    const exact = properties.filter(p => {
      if (filters.category !== 'all' && p.category !== filters.category) return false;
      if (filters.propertyTypes.length > 0 && !filters.propertyTypes.includes(p.propertyType)) return false;

      if (filters.searchQuery.trim()) {
        const q = filters.searchQuery.toLowerCase();
        const match = 
          p.title.toLowerCase().includes(q) ||
          p.city.toLowerCase().includes(q) ||
          p.locality.toLowerCase().includes(q) ||
          p.landmark.toLowerCase().includes(q) ||
          p.surveyNumber.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q);
        if (!match) return false;
      }

      if (filters.city && p.city.toLowerCase() !== filters.city.toLowerCase()) return false;
      if (filters.locality && !p.locality.toLowerCase().includes(filters.locality.toLowerCase())) return false;
      if (filters.minPrice > 0 && p.price < filters.minPrice) return false;
      if (filters.maxPrice > 0 && filters.maxPrice < 100000000 && p.price > filters.maxPrice) return false;
      if (filters.minSize > 0 && p.plotSizeSqFt < filters.minSize) return false;
      if (filters.maxSize > 0 && p.plotSizeSqFt > filters.maxSize) return false;
      if (filters.facing.length > 0 && !filters.facing.includes(p.facing)) return false;
      if (filters.minRoadWidth > 0 && p.roadWidth < filters.minRoadWidth) return false;
      if (filters.approvalStatuses.length > 0 && !filters.approvalStatuses.includes(p.approvalStatus)) return false;
      if (filters.isCornerPlotOnly && !p.isCornerPlot) return false;
      if (filters.isVerifiedOnly && !p.isVerified) return false;
      if (filters.isGatedCommunityOnly && !p.gatedCommunity) return false;
      if (filters.hasBoundaryWallOnly && (p.boundaryWall === 'None' || !p.boundaryWall)) return false;

      return true;
    });

    const hasBudgetFilter = filters.minPrice > 0 || (filters.maxPrice > 0 && filters.maxPrice < 100000000);

    if (exact.length > 0) {
      return {
        filteredProperties: sortProperties(exact),
        isFilterFallback: false
      };
    }

    // Fallback: Strictly respect budget if user specified a budget range
    if (hasBudgetFilter) {
      const inBudget = properties.filter(p => {
        if (filters.minPrice > 0 && p.price < filters.minPrice) return false;
        if (filters.maxPrice > 0 && filters.maxPrice < 100000000 && p.price > filters.maxPrice) return false;
        return true;
      });

      if (inBudget.length > 0) {
        // Prioritize inBudget items that also match city / locality / category
        const preferred = inBudget.filter(p => {
          if (filters.city && p.city.toLowerCase() === filters.city.toLowerCase()) return true;
          if (filters.locality && p.locality.toLowerCase().includes(filters.locality.toLowerCase())) return true;
          if (filters.category !== 'all' && p.category === filters.category) return true;
          return false;
        });

        const finalList = preferred.length > 0 ? preferred : inBudget;
        return {
          filteredProperties: sortProperties(finalList),
          isFilterFallback: true
        };
      }

      // If budget is lower than any property in catalog (e.g. < 40 Lakh when minimum is 42 Lakh):
      // Return the closest entry-level properties sorted by lowest price first
      const lowestPriced = [...properties].sort((a, b) => a.price - b.price).slice(0, 5);
      return {
        filteredProperties: lowestPriced,
        isFilterFallback: true
      };
    }

    // Fallback when NO budget was set, but secondary criteria returned 0 exact:
    let relaxed = properties.filter(p => {
      if (filters.city && p.city.toLowerCase() === filters.city.toLowerCase()) return true;
      if (filters.locality && p.locality.toLowerCase().includes(filters.locality.toLowerCase())) return true;
      if (filters.category !== 'all' && p.category === filters.category) return true;
      if (filters.searchQuery.trim()) {
        const q = filters.searchQuery.toLowerCase();
        return (
          p.title.toLowerCase().includes(q) ||
          p.locality.toLowerCase().includes(q) ||
          p.city.toLowerCase().includes(q) ||
          p.propertyType.toLowerCase().includes(q)
        );
      }
      return false;
    });

    if (relaxed.length === 0) {
      relaxed = [...properties];
    } else if (relaxed.length < 4) {
      const existingIds = new Set(relaxed.map(r => r.id));
      const supplement = properties.filter(p => !existingIds.has(p.id));
      relaxed = [...relaxed, ...supplement];
    }

    return {
      filteredProperties: sortProperties(relaxed),
      isFilterFallback: true
    };
  }, [properties, filters]);

  return (
    <AppContext.Provider value={{
      currentUser,
      isSignInModalOpen,
      openSignInModal,
      closeSignInModal,
      signIn,
      signOut,
      properties,
      inquiries,
      chats,
      toasts,
      favorites,
      comparisonList,
      currentRole,
      activeView,
      filters,
      selectedProperty,
      inspectedDocument,
      activeInquiryProperty,
      isAddListingOpen,
      editingPropertyId,
      isLoanCalculatorOpen,
      isUnitConverterOpen,
      isCompareModalOpen,
      adminVerificationModalProperty,
      mapSelectedPropertyId,
      isVastuModalOpen,
      isFactsheetModalOpen,
      isLiveChatOpen,
      factsheetProperty,
      chatProperty,
      agents,
      appointments,
      isBookAgentModalOpen,
      bookAgentProperty,
      openBookAgentModal,
      closeBookAgentModal,
      bookAppointment,
      updateAppointmentStatus,
      submitInspectionReport,
      setCurrentRole,
      setActiveView,
      setFilters,
      updateFilter,
      resetFilters,
      setSelectedProperty,
      setInspectedDocument,
      setActiveInquiryProperty,
      setIsAddListingOpen,
      setEditingPropertyId,
      setIsLoanCalculatorOpen,
      setIsUnitConverterOpen,
      setIsCompareModalOpen,
      setAdminVerificationModalProperty,
      setMapSelectedPropertyId,
      setIsVastuModalOpen,
      setIsFactsheetModalOpen,
      setIsLiveChatOpen,
      setFactsheetProperty,
      setChatProperty,
      addToast,
      removeToast,
      toggleFavorite,
      toggleCompare,
      addProperty,
      updateProperty,
      deleteProperty,
      toggleVerifyProperty,
      verifyDocument,
      addDocument,
      deleteDocument,
      submitInquiry,
      updateInquiryStatus,
      sendChatMessage,
      resetToMockData,
      filteredProperties,
      isFilterFallback
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
