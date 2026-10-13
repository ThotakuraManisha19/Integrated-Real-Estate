import React, { useState, useRef, useEffect } from 'react';
import { 
  ShieldCheck, 
  Heart, 
  Layers, 
  Calculator, 
  ArrowRightLeft, 
  PlusCircle, 
  UserCheck, 
  Building2, 
  Briefcase,
  Sparkles,
  Compass,
  LogIn,
  LogOut,
  ChevronDown
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { UserRole } from '../../types';

export const Navbar: React.FC = () => {
  const { 
    currentRole, 
    setCurrentRole, 
    activeView, 
    setActiveView, 
    favorites, 
    comparisonList, 
    setIsLoanCalculatorOpen, 
    setIsUnitConverterOpen, 
    setIsCompareModalOpen, 
    setIsAddListingOpen,
    currentUser,
    openSignInModal,
    signOut,
    signIn
  } = useApp();

  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(e.target as Node)) {
        setIsProfileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleRoleChange = (role: UserRole) => {
    signIn(role);
    setIsProfileMenuOpen(false);
  };

  const getRoleBadgeStyle = (role: UserRole) => {
    switch (role) {
      case 'seller':
        return 'bg-emerald-100 text-emerald-800 border-emerald-300';
      case 'agent':
        return 'bg-amber-100 text-amber-800 border-amber-300';
      case 'admin':
        return 'bg-purple-100 text-purple-800 border-purple-300';
      case 'buyer':
      default:
        return 'bg-blue-100 text-blue-800 border-blue-300';
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 gap-3">
          
          {/* Brand Logo */}
          <div 
            onClick={() => {
              setActiveView('marketplace');
            }}
            className="flex items-center gap-2.5 cursor-pointer select-none group shrink-0"
          >
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white flex items-center justify-center shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5 font-heading font-black text-xl text-slate-900 tracking-tight">
                <span>Terra</span>
                <span className="text-emerald-600">Plots</span>
              </div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider -mt-1">
                Verified Land & Property Portal
              </p>
            </div>
          </div>

          {/* Center Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1 bg-slate-100/80 p-1 rounded-2xl text-xs font-bold">
            <button
              onClick={() => setActiveView('marketplace')}
              className={`px-3.5 py-2 rounded-xl transition-all ${
                activeView === 'marketplace'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Explore Plots & Properties
            </button>

            <button
              onClick={() => {
                signIn('seller');
              }}
              className={`px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
                activeView === 'seller_dashboard'
                  ? 'bg-emerald-700 text-white shadow-sm'
                  : 'text-slate-600 hover:text-emerald-800'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              Seller Dashboard
            </button>

            <button
              onClick={() => {
                signIn('agent');
              }}
              className={`px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
                activeView === 'agent_dashboard'
                  ? 'bg-indigo-900 text-white shadow-sm'
                  : 'text-slate-600 hover:text-indigo-800'
              }`}
            >
              <Briefcase className="w-3.5 h-3.5" />
              Middleman Agents 🤝
            </button>

            <button
              onClick={() => {
                signIn('admin');
              }}
              className={`px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
                activeView === 'admin_portal'
                  ? 'bg-purple-900 text-white shadow-sm'
                  : 'text-slate-600 hover:text-purple-700'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              Admin Portal
            </button>
          </nav>

          {/* Quick Tools & Role Switcher */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            
            {/* Unit Converter Trigger */}
            <button
              onClick={() => setIsUnitConverterOpen(true)}
              className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              title="Land Unit Converter (Sq.Ft / Gaj / Acre / Guntha)"
            >
              <ArrowRightLeft className="w-4 h-4" />
            </button>

            {/* Loan EMI Calculator */}
            <button
              onClick={() => setIsLoanCalculatorOpen(true)}
              className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              title="Land Loan & EMI Calculator"
            >
              <Calculator className="w-4 h-4" />
            </button>

            {/* Compare Tool Button */}
            <button
              onClick={() => setIsCompareModalOpen(true)}
              className="relative p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              title="Compare Plots"
            >
              <Layers className="w-4 h-4" />
              {comparisonList.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-600 text-white text-[10px] font-black rounded-full flex items-center justify-center">
                  {comparisonList.length}
                </span>
              )}
            </button>

            {/* Wishlist Button */}
            <button
              onClick={() => setActiveView('favorites')}
              className={`relative p-2 rounded-xl transition-colors ${
                activeView === 'favorites'
                  ? 'bg-rose-50 text-rose-600 font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
              title="Saved Plots & Wishlist"
            >
              <Heart className="w-4 h-4" />
              {favorites.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-white text-[10px] font-black rounded-full flex items-center justify-center">
                  {favorites.length}
                </span>
              )}
            </button>

            {/* User Profile & Sign-In Dropdown */}
            <div className="relative" ref={profileMenuRef}>
              <button
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                className="flex items-center gap-2 p-1.5 sm:px-2.5 sm:py-1.5 rounded-2xl border border-slate-200 bg-white hover:bg-slate-50 transition-all shadow-xs"
                title="Account & Role Switcher"
              >
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-7 h-7 rounded-xl object-cover border border-slate-200 shadow-2xs"
                />
                <div className="hidden sm:flex flex-col text-left">
                  <span className="text-xs font-bold text-slate-900 leading-tight">
                    {currentUser.name}
                  </span>
                  <span className={`text-[10px] font-extrabold uppercase px-1.5 py-0.2 rounded border w-fit leading-tight mt-0.5 ${getRoleBadgeStyle(currentUser.role)}`}>
                    {currentUser.role}
                  </span>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
              </button>

              {/* Dropdown Menu */}
              {isProfileMenuOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-200 py-2 z-50 animate-fadeIn">
                  <div className="px-4 py-2.5 border-b border-slate-100">
                    <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Signed In As</p>
                    <p className="text-sm font-bold text-slate-900">{currentUser.name}</p>
                    <p className="text-xs text-slate-500 truncate">{currentUser.email}</p>
                    <div className="mt-1.5">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${getRoleBadgeStyle(currentUser.role)}`}>
                        {currentUser.badge}
                      </span>
                    </div>
                  </div>

                  <div className="px-2 py-1.5">
                    <div className="text-[11px] font-bold text-slate-400 px-2 py-1 uppercase tracking-wider">
                      Switch Active Dashboard
                    </div>

                    <button
                      onClick={() => handleRoleChange('seller')}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-colors ${
                        currentUser.role === 'seller' ? 'bg-emerald-50 text-emerald-800' : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-emerald-600" />
                        <span>Seller Dashboard</span>
                      </div>
                      {currentUser.role === 'seller' && <span className="text-[10px] font-bold text-emerald-600">Active</span>}
                    </button>

                    <button
                      onClick={() => handleRoleChange('agent')}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-colors ${
                        currentUser.role === 'agent' ? 'bg-amber-50 text-amber-800' : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Briefcase className="w-4 h-4 text-amber-600" />
                        <span>Middleman Agent</span>
                      </div>
                      {currentUser.role === 'agent' && <span className="text-[10px] font-bold text-amber-600">Active</span>}
                    </button>

                    <button
                      onClick={() => handleRoleChange('buyer')}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-colors ${
                        currentUser.role === 'buyer' ? 'bg-blue-50 text-blue-800' : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <UserCheck className="w-4 h-4 text-blue-600" />
                        <span>Buyer Marketplace</span>
                      </div>
                      {currentUser.role === 'buyer' && <span className="text-[10px] font-bold text-blue-600">Active</span>}
                    </button>

                    <button
                      onClick={() => handleRoleChange('admin')}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-colors ${
                        currentUser.role === 'admin' ? 'bg-purple-50 text-purple-800' : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4 text-purple-600" />
                        <span>Admin Regulatory Portal</span>
                      </div>
                      {currentUser.role === 'admin' && <span className="text-[10px] font-bold text-purple-600">Active</span>}
                    </button>
                  </div>

                  <div className="border-t border-slate-100 pt-1.5 px-2">
                    <button
                      onClick={() => {
                        setIsProfileMenuOpen(false);
                        openSignInModal();
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-emerald-700 hover:bg-emerald-50 transition-colors"
                    >
                      <LogIn className="w-4 h-4" />
                      <span>Switch Account / Sign In</span>
                    </button>

                    <button
                      onClick={() => {
                        setIsProfileMenuOpen(false);
                        signOut();
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-rose-600 hover:bg-rose-50 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Sign In CTA button (if guest or quick access) */}
            <button
              onClick={openSignInModal}
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl shadow-xs transition-all"
            >
              <LogIn className="w-3.5 h-3.5 text-emerald-400" />
              <span>Sign In</span>
            </button>

            {/* Post Listing CTA */}
            <button
              onClick={() => setIsAddListingOpen(true)}
              className="hidden lg:flex items-center gap-1.5 px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-sm transition-all"
            >
              <PlusCircle className="w-4 h-4" />
              <span>List Property</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
