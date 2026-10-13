import React, { useState } from 'react';
import { 
  ShieldCheck, 
  AlertCircle, 
  CheckCircle2, 
  Clock, 
  FileText, 
  Eye, 
  Award, 
  Layers, 
  Search,
  Filter,
  Check
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { formatPrice, getPropertyTypeLabel } from '../../utils/formatters';
import { VerifiedBadge } from '../common/VerifiedBadge';

export const AdminDashboard: React.FC = () => {
  const { 
    properties, 
    setAdminVerificationModalProperty, 
    setSelectedProperty,
    setInspectedDocument 
  } = useApp();

  const [filterTab, setFilterTab] = useState<'pending' | 'verified' | 'all'>('pending');
  const [searchQuery, setSearchQuery] = useState('');

  const pendingListings = properties.filter(p => !p.isVerified);
  const verifiedListings = properties.filter(p => p.isVerified);

  const displayedListings = properties.filter(p => {
    if (filterTab === 'pending' && p.isVerified) return false;
    if (filterTab === 'verified' && !p.isVerified) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        p.title.toLowerCase().includes(q) ||
        p.city.toLowerCase().includes(q) ||
        p.locality.toLowerCase().includes(q) ||
        p.surveyNumber.toLowerCase().includes(q) ||
        p.seller.name.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-purple-950 via-slate-900 to-indigo-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-purple-300 text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-purple-400" />
            Official Regulatory & Compliance Cell
          </div>
          <h1 className="text-2xl sm:text-3xl font-black font-heading">
            Admin Verification & Document Audit Console
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm max-w-xl">
            Review land records, validate 30-year mother deeds, verify layout approvals, and issue the prestigious "Verified Plot Badge".
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10 flex items-center gap-4">
          <div className="text-center">
            <span className="text-[10px] text-purple-200 uppercase font-bold block">In Queue</span>
            <span className="text-2xl font-black text-amber-300">{pendingListings.length}</span>
          </div>
          <div className="w-px h-8 bg-white/20" />
          <div className="text-center">
            <span className="text-[10px] text-purple-200 uppercase font-bold block">Verified</span>
            <span className="text-2xl font-black text-emerald-400">{verifiedListings.length}</span>
          </div>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase">Pending Audits</span>
            <div className="text-2xl font-black text-amber-600 font-heading">{pendingListings.length} Listings</div>
            <span className="text-[11px] text-slate-500">Requires legal deed checks</span>
          </div>
          <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-600">
            <Clock className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase">Verified Plots Live</span>
            <div className="text-2xl font-black text-emerald-600 font-heading">{verifiedListings.length} Listings</div>
            <span className="text-[11px] text-emerald-600 font-semibold">100% Trust Guarantee</span>
          </div>
          <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600">
            <Award className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase">Audit Pass Rate</span>
            <div className="text-2xl font-black text-purple-700 font-heading">
              {properties.length > 0 ? Math.round((verifiedListings.length / properties.length) * 100) : 0}%
            </div>
            <span className="text-[11px] text-slate-500">Strict legal criteria</span>
          </div>
          <div className="w-12 h-12 bg-purple-50 rounded-2xl flex items-center justify-center text-purple-600">
            <ShieldCheck className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Filter Tabs & Search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex gap-2">
          <button
            onClick={() => setFilterTab('pending')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              filterTab === 'pending'
                ? 'bg-amber-500 text-slate-950 font-extrabold shadow-sm'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            Verification Queue ({pendingListings.length})
          </button>

          <button
            onClick={() => setFilterTab('verified')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              filterTab === 'verified'
                ? 'bg-emerald-600 text-white font-extrabold shadow-sm'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            Verified Plots ({verifiedListings.length})
          </button>

          <button
            onClick={() => setFilterTab('all')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              filterTab === 'all'
                ? 'bg-slate-900 text-white font-extrabold shadow-sm'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            All Listings ({properties.length})
          </button>
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search by survey #, title, owner..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:ring-2 focus:ring-purple-500"
          />
        </div>
      </div>

      {/* Listings Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
                <th className="p-4">Plot / Property</th>
                <th className="p-4">Survey & Khata</th>
                <th className="p-4">Dimensions & Road</th>
                <th className="p-4">Seller Details</th>
                <th className="p-4">Docs Uploaded</th>
                <th className="p-4">Badge Status</th>
                <th className="p-4 text-right">Admin Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {displayedListings.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={p.images[0]}
                        alt={p.title}
                        className="w-14 h-14 rounded-xl object-cover border border-slate-200 shrink-0"
                      />
                      <div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                          {getPropertyTypeLabel(p.propertyType)}
                        </span>
                        <h4 
                          onClick={() => setSelectedProperty(p)}
                          className="font-bold text-slate-900 text-sm hover:text-purple-700 cursor-pointer line-clamp-1"
                        >
                          {p.title}
                        </h4>
                        <span className="text-slate-500 text-[11px]">{p.locality}, {p.city}</span>
                      </div>
                    </div>
                  </td>

                  <td className="p-4">
                    <div className="font-mono font-bold text-slate-800">{p.surveyNumber}</div>
                    <div className="text-slate-500 text-[11px]">{p.khataNumber || 'Regular Khata'}</div>
                  </td>

                  <td className="p-4">
                    <div className="font-bold text-slate-800">{p.plotSize} {p.sizeUnit}</div>
                    <div className="text-slate-500 font-mono text-[11px]">
                      {p.dimensions?.length}×{p.dimensions?.breadth} {p.dimensions?.unit} • {p.roadWidth}ft Road
                    </div>
                  </td>

                  <td className="p-4">
                    <div className="font-semibold text-slate-900">{p.seller.name}</div>
                    <div className="text-slate-500 text-[11px]">{p.seller.phone} ({p.seller.type})</div>
                  </td>

                  <td className="p-4">
                    <div className="flex items-center gap-1.5">
                      <FileText className="w-4 h-4 text-emerald-600" />
                      <span className="font-bold text-slate-800">{p.documents?.length || 0} Docs</span>
                    </div>
                    <span className="text-[10px] text-slate-400">
                      {p.documents?.filter(d => d.status === 'verified').length} verified
                    </span>
                  </td>

                  <td className="p-4">
                    <VerifiedBadge property={p} size="sm" showDetailsOnHover={false} />
                  </td>

                  <td className="p-4 text-right">
                    <button
                      onClick={() => setAdminVerificationModalProperty(p)}
                      className={`px-3.5 py-1.5 rounded-xl font-bold text-xs transition-all flex items-center gap-1.5 ml-auto ${
                        p.isVerified
                          ? 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                          : 'bg-purple-600 hover:bg-purple-700 text-white shadow-md shadow-purple-600/20'
                      }`}
                    >
                      <ShieldCheck className="w-3.5 h-3.5" />
                      {p.isVerified ? 'Re-Audit' : 'Audit & Verify'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
