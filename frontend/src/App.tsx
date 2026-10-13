import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { MarketplaceView } from './components/buyer/MarketplaceView';
import { SellerDashboard } from './components/seller/SellerDashboard';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { FavoritesView } from './components/buyer/FavoritesView';
import { AgentDashboard } from './components/agent/AgentDashboard';

// Modals
import { PropertyDetailModal } from './components/buyer/PropertyDetailModal';
import { DocumentViewerModal } from './components/common/DocumentViewerModal';
import { ContactInquiryModal } from './components/buyer/ContactInquiryModal';
import { BookAgentModal } from './components/agent/BookAgentModal';
import { AddListingModal } from './components/seller/AddListingModal';
import { EditListingModal } from './components/seller/EditListingModal';
import { LoanCalculatorModal } from './components/common/LoanCalculatorModal';
import { UnitConverterModal } from './components/common/UnitConverterModal';
import { CompareModal } from './components/common/CompareModal';
import { DocumentVerificationModal } from './components/admin/DocumentVerificationModal';
import { VastuScoreModal } from './components/common/VastuScoreModal';
import { FactsheetPrintModal } from './components/common/FactsheetPrintModal';
import { LiveChatModal } from './components/common/LiveChatModal';
import { ToastContainer } from './components/common/ToastContainer';
import { SignInModal } from './components/auth/SignInModal';

const MainContent: React.FC = () => {
  const { 
    activeView, 
    isLoanCalculatorOpen, 
    setIsLoanCalculatorOpen, 
    isUnitConverterOpen, 
    setIsUnitConverterOpen,
    selectedProperty,
    isVastuModalOpen,
    setIsVastuModalOpen,
    isFactsheetModalOpen,
    setIsFactsheetModalOpen,
    isLiveChatOpen,
    setIsLiveChatOpen,
    factsheetProperty,
    chatProperty,
    isBookAgentModalOpen,
    closeBookAgentModal,
    bookAgentProperty,
    toasts,
    removeToast
  } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-emerald-500 selection:text-white">
      {/* Top Navigation */}
      <Navbar />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeView === 'marketplace' && <MarketplaceView />}
        {activeView === 'seller_dashboard' && <SellerDashboard />}
        {activeView === 'agent_dashboard' && <AgentDashboard />}
        {activeView === 'admin_portal' && <AdminDashboard />}
        {activeView === 'favorites' && <FavoritesView />}
      </main>

      {/* Footer */}
      <Footer />

      {/* Global Modals & Utilities */}
      <PropertyDetailModal />
      <DocumentViewerModal />
      <ContactInquiryModal />
      <BookAgentModal 
        isOpen={isBookAgentModalOpen} 
        onClose={closeBookAgentModal} 
        property={bookAgentProperty} 
      />
      <AddListingModal />
      <EditListingModal />
      <CompareModal />
      <DocumentVerificationModal />
      
      <VastuScoreModal
        isOpen={isVastuModalOpen}
        onClose={() => setIsVastuModalOpen(false)}
        property={selectedProperty}
      />

      <FactsheetPrintModal
        property={factsheetProperty || selectedProperty}
        onClose={() => setIsFactsheetModalOpen(false)}
      />

      <LiveChatModal
        isOpen={isLiveChatOpen}
        onClose={() => setIsLiveChatOpen(false)}
        property={chatProperty || selectedProperty}
      />

      <LoanCalculatorModal
        isOpen={isLoanCalculatorOpen}
        onClose={() => setIsLoanCalculatorOpen(false)}
        defaultPrice={selectedProperty?.price || 5000000}
      />

      <UnitConverterModal
        isOpen={isUnitConverterOpen}
        onClose={() => setIsUnitConverterOpen(false)}
        initialValue={selectedProperty?.plotSize || 1500}
        initialUnit={selectedProperty?.sizeUnit || 'sq.ft'}
      />

      <SignInModal />

      {/* Toast Alert Notifications */}
      <ToastContainer toasts={toasts} onDismiss={removeToast} />
    </div>
  );
};

export function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}

export default App;
