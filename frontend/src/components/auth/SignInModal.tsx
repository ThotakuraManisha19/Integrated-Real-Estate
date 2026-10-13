import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  UserCheck, 
  Building2, 
  Briefcase, 
  KeyRound, 
  Mail, 
  Lock, 
  ArrowRight, 
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { useApp, DEMO_USERS } from '../../context/AppContext';
import { UserRole } from '../../types';

export const SignInModal: React.FC = () => {
  const { isSignInModalOpen, closeSignInModal, signIn, currentUser } = useApp();
  const [selectedRole, setSelectedRole] = useState<UserRole>('seller');
  const [activeTab, setActiveTab] = useState<'quick' | 'custom'>('quick');

  // Custom credentials state
  const [customEmail, setCustomEmail] = useState('');
  const [customPassword, setCustomPassword] = useState('');
  const [customName, setCustomName] = useState('');

  if (!isSignInModalOpen) return null;

  const handleRoleQuickSignIn = (role: UserRole) => {
    signIn(role);
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const nameToUse = customName.trim() || customEmail.split('@')[0] || 'User';
    signIn(selectedRole, {
      name: nameToUse,
      email: customEmail || `${nameToUse.toLowerCase().replace(/\s+/g, '')}@terraplots.in`
    });
  };

  const roleProfiles: {
    role: UserRole;
    title: string;
    subtitle: string;
    dashboardName: string;
    description: string;
    user: typeof DEMO_USERS['seller'];
    icon: React.ElementType;
    accentColor: string;
    badgeColor: string;
  }[] = [
    {
      role: 'seller',
      title: 'Plot & Property Seller',
      subtitle: 'Listing Management & Lead Conversion',
      dashboardName: 'Seller Dashboard',
      description: 'Upload plots, agricultural land & apartments, manage buyer inquiries, and review survey documents.',
      user: DEMO_USERS.seller,
      icon: Building2,
      accentColor: 'border-emerald-500 bg-emerald-50/50 hover:bg-emerald-50',
      badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300'
    },
    {
      role: 'agent',
      title: 'Middleman Field Agent',
      subtitle: 'Site Visits & On-Ground Inspection',
      dashboardName: 'Middleman Agent Dashboard',
      description: 'Accept site visit bookings, perform GPS boundary audits, submit inspection reports & escort buyers.',
      user: DEMO_USERS.agent,
      icon: Briefcase,
      accentColor: 'border-amber-500 bg-amber-50/50 hover:bg-amber-50',
      badgeColor: 'bg-amber-100 text-amber-800 border-amber-300'
    },
    {
      role: 'buyer',
      title: 'Buyer & Land Investor',
      subtitle: 'Marketplace & Site Visit Booking',
      dashboardName: 'Buyer Marketplace',
      description: 'Browse verified plots and apartments, calculate EMIs, book middleman agents for site visits & negotiate.',
      user: DEMO_USERS.buyer,
      icon: UserCheck,
      accentColor: 'border-blue-500 bg-blue-50/50 hover:bg-blue-50',
      badgeColor: 'bg-blue-100 text-blue-800 border-blue-300'
    },
    {
      role: 'admin',
      title: 'Legal & Regulatory Admin',
      subtitle: 'RERA Compliance & Title Verification',
      dashboardName: 'Admin Regulatory Portal',
      description: 'Audit revenue land records, verify encumbrance certificates & approve verified plot badges.',
      user: DEMO_USERS.admin,
      icon: ShieldCheck,
      accentColor: 'border-purple-500 bg-purple-50/50 hover:bg-purple-50',
      badgeColor: 'bg-purple-100 text-purple-800 border-purple-300'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div 
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative px-6 py-5 bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-900 text-white flex items-center justify-between">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold mb-1 border border-emerald-500/30">
              <Sparkles className="w-3.5 h-3.5" />
              Role-Based Access
            </div>
            <h2 className="text-xl font-bold tracking-tight">Sign In to TerraPlots</h2>
            <p className="text-xs text-slate-300 mt-0.5">
              Select your role to instantly open your personalized dashboard and features
            </p>
          </div>
          <button
            onClick={closeSignInModal}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switch */}
        <div className="flex border-b border-slate-200 bg-slate-50 px-6">
          <button
            onClick={() => setActiveTab('quick')}
            className={`py-3 px-4 font-semibold text-sm border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'quick'
                ? 'border-emerald-600 text-emerald-700 bg-white'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <KeyRound className="w-4 h-4" />
            1-Click Demo Profiles (Recommended)
          </button>
          <button
            onClick={() => setActiveTab('custom')}
            className={`py-3 px-4 font-semibold text-sm border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'custom'
                ? 'border-emerald-600 text-emerald-700 bg-white'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Mail className="w-4 h-4" />
            Custom Credentials
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1">
          {activeTab === 'quick' ? (
            <div className="space-y-3">
              <div className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">
                Click any role to sign in and launch that specific dashboard:
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {roleProfiles.map((p) => {
                  const isCurrent = currentUser?.role === p.role;
                  const Icon = p.icon;

                  return (
                    <div
                      key={p.role}
                      onClick={() => handleRoleQuickSignIn(p.role)}
                      className={`group cursor-pointer rounded-xl border-2 p-4 transition-all duration-200 relative flex flex-col justify-between ${
                        isCurrent 
                          ? 'border-emerald-600 bg-emerald-50/60 ring-2 ring-emerald-500/20 shadow-md' 
                          : 'border-slate-200 hover:border-emerald-500 hover:shadow-md bg-white hover:bg-slate-50/60'
                      }`}
                    >
                      {isCurrent && (
                        <div className="absolute top-3 right-3 flex items-center gap-1 bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                          <CheckCircle2 className="w-3 h-3" />
                          ACTIVE
                        </div>
                      )}

                      <div>
                        <div className="flex items-center gap-3 mb-2.5">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white shadow-sm ${
                            p.role === 'seller' ? 'bg-emerald-600' :
                            p.role === 'agent' ? 'bg-amber-600' :
                            p.role === 'buyer' ? 'bg-blue-600' : 'bg-purple-600'
                          }`}>
                            <Icon className="w-5 h-5" />
                          </div>
                          <div>
                            <div className="text-sm font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                              {p.title}
                            </div>
                            <div className="text-[11px] font-medium text-slate-500">
                              {p.subtitle}
                            </div>
                          </div>
                        </div>

                        <p className="text-xs text-slate-600 leading-relaxed mb-3">
                          {p.description}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <img
                            src={p.user.avatar}
                            alt={p.user.name}
                            className="w-6 h-6 rounded-full object-cover border border-slate-300"
                          />
                          <span className="text-xs font-semibold text-slate-800">
                            {p.user.name}
                          </span>
                        </div>
                        <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                          Launch &rarr;
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-4 p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Tip:</strong> Selecting <strong>Seller</strong> opens your property inventory and buyer leads. Selecting <strong>Middleman Agent</strong> opens the appointment management board and inspection audits.
                </span>
              </div>
            </div>
          ) : (
            <form onSubmit={handleCustomSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Target Dashboard & Role
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {(['seller', 'agent', 'buyer', 'admin'] as UserRole[]).map((role) => (
                    <button
                      key={role}
                      type="button"
                      onClick={() => setSelectedRole(role)}
                      className={`p-2.5 rounded-xl border text-xs font-semibold capitalize flex flex-col items-center gap-1.5 transition-all ${
                        selectedRole === role
                          ? 'border-emerald-600 bg-emerald-50 text-emerald-800 ring-2 ring-emerald-500/20'
                          : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                      }`}
                    >
                      {role === 'seller' && <Building2 className="w-4 h-4 text-emerald-600" />}
                      {role === 'agent' && <Briefcase className="w-4 h-4 text-amber-600" />}
                      {role === 'buyer' && <UserCheck className="w-4 h-4 text-blue-600" />}
                      {role === 'admin' && <ShieldCheck className="w-4 h-4 text-purple-600" />}
                      <span>{role}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Vikramaditya Rao"
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
                  <input
                    type="email"
                    placeholder="e.g. user@terraplots.in"
                    value={customEmail}
                    onChange={(e) => setCustomEmail(e.target.value)}
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
                  <input
                    type="password"
                    placeholder="Enter password"
                    value={customPassword}
                    onChange={(e) => setCustomPassword(e.target.value)}
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md shadow-emerald-600/20 flex items-center justify-center gap-2 transition-all"
              >
                Sign In as {selectedRole.toUpperCase()} & Launch Dashboard
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <div>
            Currently logged in: <span className="font-semibold text-slate-800 capitalize">{currentUser?.name} ({currentUser?.role})</span>
          </div>
          <button
            onClick={closeSignInModal}
            className="text-slate-600 hover:text-slate-900 font-semibold"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
