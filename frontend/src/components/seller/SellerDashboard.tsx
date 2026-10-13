import React, { useState } from 'react';
import { 
  PlusCircle, 
  Layers, 
  Eye, 
  MessageSquare, 
  ShieldCheck, 
  TrendingUp, 
  Edit3, 
  Trash2, 
  Phone, 
  CheckCircle, 
  Clock, 
  Calendar, 
  IndianRupee,
  ExternalLink,
  CornerRightUp
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { formatPrice, getPropertyTypeLabel } from '../../utils/formatters';
import { VerifiedBadge } from '../common/VerifiedBadge';
import { Inquiry } from '../../types';

export const SellerDashboard: React.FC = () => {
  const { 
    properties, 
    inquiries, 
    setIsAddListingOpen, 
    setEditingPropertyId, 
    deleteProperty, 
    setSelectedProperty,
    updateInquiryStatus
  } = useApp();

  const [activeTab, setActiveTab] = useState<'listings' | 'leads'>('listings');

  // Stats
  const totalListings = properties.length;
  const verifiedCount = properties.filter(p => p.isVerified).length;
  const pendingCount = properties.filter(p => !p.isVerified).length;
  const totalViews = properties.reduce((acc, curr) => acc + (curr.viewsCount || 0), 0);
  const totalInquiriesCount = inquiries.length;
  const totalPortfolioValue = properties.reduce((acc, curr) => acc + (curr.price || 0), 0);

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Top Banner & Header */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            Seller & Agent Portal
          </div>
          <h1 className="text-2xl sm:text-3xl font-black font-heading">
            Plot & Property Management Console
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm max-w-xl">
            Manage your land plots, track buyer inquiries, upload verification documents, and audit site leads in real-time.
          </p>
        </div>

        <button
          onClick={() => setIsAddListingOpen(true)}
          className="px-6 py-3.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-2xl font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/25 transition-all transform hover:-translate-y-0.5"
        >
          <PlusCircle className="w-5 h-5" />
          List New Plot / Property
        </button>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase">Total Listings</span>
            <Layers className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-black text-slate-900 font-heading">{totalListings}</div>
          <span className="text-[11px] text-emerald-600 font-semibold">{verifiedCount} Verified by Admin</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase">Buyer Inquiries</span>
            <MessageSquare className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl font-black text-slate-900 font-heading">{totalInquiriesCount}</div>
          <span className="text-[11px] text-blue-600 font-semibold">Active Leads</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase">Total Views</span>
            <Eye className="w-4 h-4 text-purple-600" />
          </div>
          <div className="text-2xl font-black text-slate-900 font-heading">{totalViews}</div>
          <span className="text-[11px] text-purple-600 font-semibold">+18% this week</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase">Pending Badge</span>
            <ShieldCheck className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-black text-slate-900 font-heading">{pendingCount}</div>
          <span className="text-[11px] text-amber-600 font-semibold">In verification queue</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm col-span-2 lg:col-span-1">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase">Portfolio Value</span>
            <TrendingUp className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-black text-emerald-700 font-heading">
            {formatPrice(totalPortfolioValue)}
          </div>
          <span className="text-[11px] text-slate-500">Cumulative asking</span>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-3">
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('listings')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'listings'
                ? 'bg-slate-900 text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Layers className="w-4 h-4" />
            My Listings ({properties.length})
          </button>

          <button
            onClick={() => setActiveTab('leads')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'leads'
                ? 'bg-slate-900 text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            Inquiries & Buyer Leads ({inquiries.length})
          </button>
        </div>
      </div>

      {/* TAB 1: LISTINGS MANAGEMENT */}
      {activeTab === 'listings' && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
                  <th className="p-4">Plot / Property</th>
                  <th className="p-4">Price & Rate</th>
                  <th className="p-4">Dimensions & Facing</th>
                  <th className="p-4">Road Width & Corner</th>
                  <th className="p-4">Approval & Badge</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {properties.map((p) => (
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
                            className="font-bold text-slate-900 text-sm hover:text-emerald-700 cursor-pointer line-clamp-1"
                          >
                            {p.title}
                          </h4>
                          <span className="text-slate-500 text-[11px]">{p.locality}, {p.city}</span>
                        </div>
                      </div>
                    </td>

                    <td className="p-4">
                      <div className="font-extrabold text-slate-900 text-sm">{formatPrice(p.price)}</div>
                      <div className="text-slate-500 text-[11px]">
                        ₹{p.pricePerUnit?.toLocaleString()} / {p.sizeUnit === 'acres' ? 'acre' : 'sq.ft'}
                      </div>
                    </td>

                    <td className="p-4">
                      <div className="font-bold text-slate-800">{p.plotSize} {p.sizeUnit}</div>
                      <div className="text-slate-500 font-mono text-[11px]">
                        {p.dimensions?.length}×{p.dimensions?.breadth} {p.dimensions?.unit} • {p.facing}
                      </div>
                    </td>

                    <td className="p-4">
                      <div className="font-semibold text-slate-800">{p.roadWidth} Ft Road</div>
                      {p.isCornerPlot ? (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
                          <CornerRightUp className="w-3 h-3" /> Corner Plot
                        </span>
                      ) : (
                        <span className="text-slate-400 text-[11px]">Standard</span>
                      )}
                    </td>

                    <td className="p-4">
                      <div className="font-bold text-blue-700 mb-1">{p.approvalStatus}</div>
                      <VerifiedBadge property={p} size="sm" showDetailsOnHover={false} />
                    </td>

                    <td className="p-4">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                        p.status === 'available'
                          ? 'bg-emerald-100 text-emerald-800'
                          : p.status === 'under_offer'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-slate-100 text-slate-800'
                      }`}>
                        {p.status.replace('_', ' ')}
                      </span>
                    </td>

                    <td className="p-4 text-right space-x-1 whitespace-nowrap">
                      <button
                        onClick={() => setSelectedProperty(p)}
                        className="p-1.5 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-200 transition-colors"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => setEditingPropertyId(p.id)}
                        className="p-1.5 text-emerald-700 hover:text-emerald-800 rounded-lg hover:bg-emerald-50 transition-colors"
                        title="Edit Listing"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => {
                          if (confirm(`Delete listing "${p.title}"?`)) {
                            deleteProperty(p.id);
                          }
                        }}
                        className="p-1.5 text-red-500 hover:text-red-700 rounded-lg hover:bg-red-50 transition-colors"
                        title="Delete Listing"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: BUYER INQUIRIES & LEADS CRM */}
      {activeTab === 'leads' && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-base text-slate-900">
              Buyer Inquiries & Leads CRM
            </h3>
            <span className="text-xs text-slate-500">
              Showing all incoming client requests
            </span>
          </div>

          <div className="space-y-3">
            {inquiries.length > 0 ? (
              inquiries.map((inq) => (
                <div
                  key={inq.id}
                  className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                        inq.inquiryType === 'site_visit_request'
                          ? 'bg-blue-100 text-blue-800'
                          : inq.inquiryType === 'price_offer'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-slate-200 text-slate-800'
                      }`}>
                        {inq.inquiryType.replace('_', ' ')}
                      </span>
                      <h4 className="font-bold text-sm text-slate-900">{inq.buyerName}</h4>
                      <span className="text-slate-400 text-xs font-mono">• {inq.createdAt.split('T')[0]}</span>
                    </div>

                    <p className="text-xs text-slate-600">
                      Listing: <strong className="text-slate-800">{inq.propertyTitle}</strong>
                    </p>

                    <p className="text-xs text-slate-700 italic bg-white p-2.5 rounded-xl border border-slate-200">
                      "{inq.message}"
                    </p>

                    {inq.preferredVisitDate && (
                      <div className="flex items-center gap-1.5 text-xs text-blue-700 font-semibold">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>Preferred Visit Date: {inq.preferredVisitDate}</span>
                      </div>
                    )}

                    {inq.offeredPrice && (
                      <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-bold">
                        <IndianRupee className="w-3.5 h-3.5" />
                        <span>Offered Price: {formatPrice(inq.offeredPrice)}</span>
                      </div>
                    )}
                  </div>

                  {/* Actions & Status Pill */}
                  <div className="flex flex-col sm:flex-row md:flex-col items-end gap-2 shrink-0">
                    <select
                      value={inq.status}
                      onChange={(e) => updateInquiryStatus(inq.id, e.target.value as any)}
                      className="text-xs font-bold px-3 py-1.5 rounded-xl border border-slate-300 bg-white text-slate-800 focus:ring-2 focus:ring-emerald-500"
                    >
                      <option value="new">New Lead</option>
                      <option value="contacted">Contacted</option>
                      <option value="visit_scheduled">Visit Scheduled</option>
                      <option value="closed">Deal Closed</option>
                      <option value="rejected">Rejected</option>
                    </select>

                    <div className="flex gap-2">
                      <a
                        href={`tel:${inq.buyerPhone}`}
                        className="px-3 py-1.5 bg-slate-900 text-white rounded-xl text-xs font-bold flex items-center gap-1 hover:bg-slate-800"
                      >
                        <Phone className="w-3.5 h-3.5" /> Call
                      </a>
                      <a
                        href={`https://wa.me/${inq.buyerPhone.replace(/[^0-9]/g, '')}?text=Hi%20${encodeURIComponent(inq.buyerName)},%20regarding%20your%20inquiry%20for%20${encodeURIComponent(inq.propertyTitle)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 bg-emerald-600 text-white rounded-xl text-xs font-bold flex items-center gap-1 hover:bg-emerald-700"
                      >
                        <MessageSquare className="w-3.5 h-3.5" /> WhatsApp
                      </a>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-slate-400">
                No inquiries received yet.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
