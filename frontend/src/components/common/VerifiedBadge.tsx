import React, { useState } from 'react';
import { ShieldCheck, CheckCircle2, AlertCircle, Award } from 'lucide-react';
import { PropertyItem } from '../../types';

interface VerifiedBadgeProps {
  property: PropertyItem;
  size?: 'sm' | 'md' | 'lg';
  showDetailsOnHover?: boolean;
}

export const VerifiedBadge: React.FC<VerifiedBadgeProps> = ({ 
  property, 
  size = 'md',
  showDetailsOnHover = true
}) => {
  const [showTooltip, setShowTooltip] = useState(false);

  if (!property.isVerified) {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-800 border border-amber-200">
        <AlertCircle className="w-3.5 h-3.5 text-amber-600 animate-pulse" />
        Verification Pending
      </span>
    );
  }

  const checklist = property.verificationChecklist || {
    titleDeedVerified: true,
    encumbranceFree: true,
    layoutApproved: true,
    physicalInspectionDone: true,
    taxReceiptsCleared: true,
    boundaryDemarcated: true
  };

  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5 gap-1',
    md: 'text-xs px-2.5 py-1 gap-1.5 font-semibold',
    lg: 'text-sm px-3.5 py-1.5 gap-2 font-bold shadow-sm'
  };

  return (
    <div 
      className="relative inline-block"
      onMouseEnter={() => showDetailsOnHover && setShowTooltip(true)}
      onMouseLeave={() => showDetailsOnHover && setShowTooltip(false)}
    >
      <div 
        className={`inline-flex items-center rounded-full bg-emerald-600 text-white border border-emerald-500 shadow-sm badge-verified-glow cursor-pointer transition-all hover:bg-emerald-700 ${sizeClasses[size]}`}
      >
        <ShieldCheck className={size === 'lg' ? 'w-4 h-4' : 'w-3.5 h-3.5'} />
        <span>Verified {property.category === 'plot' ? 'Plot' : 'Property'}</span>
        <span className="bg-emerald-800/80 text-[10px] font-bold px-1.5 py-0.2 rounded-full ml-0.5">
          {property.verificationScore || 98}%
        </span>
      </div>

      {/* Tooltip on Hover */}
      {showTooltip && (
        <div className="absolute left-0 top-full mt-2 w-72 bg-white rounded-xl shadow-2xl border border-slate-200 p-4 z-50 text-slate-800 text-xs animate-in fade-in duration-200">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100">
            <div className="flex items-center gap-1.5 font-bold text-emerald-700">
              <Award className="w-4 h-4" />
              <span>Admin Verified Listing</span>
            </div>
            <span className="text-[10px] font-semibold text-slate-400">
              Score: {property.verificationScore || 98}/100
            </span>
          </div>

          <p className="text-[11px] text-slate-500 mb-3">
            Audited & digitally validated by TerraPlots Legal & Land Survey cell.
          </p>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-slate-600">Registered Title Deed</span>
              {checklist.titleDeedVerified ? (
                <span className="text-emerald-600 flex items-center gap-1 font-medium"><CheckCircle2 className="w-3.5 h-3.5" /> Checked</span>
              ) : (
                <span className="text-slate-400">Pending</span>
              )}
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-600">30-Yr Encumbrance Certificate</span>
              {checklist.encumbranceFree ? (
                <span className="text-emerald-600 flex items-center gap-1 font-medium"><CheckCircle2 className="w-3.5 h-3.5" /> Clear</span>
              ) : (
                <span className="text-slate-400">Pending</span>
              )}
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-600">Layout / Master Sanction</span>
              {checklist.layoutApproved ? (
                <span className="text-emerald-600 flex items-center gap-1 font-medium"><CheckCircle2 className="w-3.5 h-3.5" /> Approved</span>
              ) : (
                <span className="text-slate-400">Pending</span>
              )}
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-600">Ground Boundary Demarcation</span>
              {checklist.boundaryDemarcated ? (
                <span className="text-emerald-600 flex items-center gap-1 font-medium"><CheckCircle2 className="w-3.5 h-3.5" /> Pinned</span>
              ) : (
                <span className="text-slate-400">Pending</span>
              )}
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-600">Physical Site Verification</span>
              {checklist.physicalInspectionDone ? (
                <span className="text-emerald-600 flex items-center gap-1 font-medium"><CheckCircle2 className="w-3.5 h-3.5" /> Visited</span>
              ) : (
                <span className="text-slate-400">Pending</span>
              )}
            </div>
          </div>

          {property.verificationDate && (
            <div className="mt-3 pt-2 border-t border-slate-100 text-[10px] text-slate-400 flex justify-between">
              <span>Verified On: {property.verificationDate}</span>
              <span className="text-emerald-600 font-semibold">100% Guaranteed</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
