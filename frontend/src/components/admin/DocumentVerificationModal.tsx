import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  CheckCircle2, 
  XCircle, 
  FileText, 
  Eye, 
  AlertTriangle, 
  Award,
  Sparkles,
  Check
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { VerificationChecklist } from '../../types';
import { formatPrice } from '../../utils/formatters';

export const DocumentVerificationModal: React.FC = () => {
  const { 
    adminVerificationModalProperty, 
    setAdminVerificationModalProperty, 
    toggleVerifyProperty, 
    setInspectedDocument 
  } = useApp();

  const property = adminVerificationModalProperty;

  const [checklist, setChecklist] = useState<VerificationChecklist>({
    titleDeedVerified: property?.verificationChecklist?.titleDeedVerified ?? true,
    encumbranceFree: property?.verificationChecklist?.encumbranceFree ?? true,
    layoutApproved: property?.verificationChecklist?.layoutApproved ?? true,
    physicalInspectionDone: property?.verificationChecklist?.physicalInspectionDone ?? false,
    taxReceiptsCleared: property?.verificationChecklist?.taxReceiptsCleared ?? true,
    boundaryDemarcated: property?.verificationChecklist?.boundaryDemarcated ?? true
  });

  const [notes, setNotes] = useState<string>(property?.adminNotes || 'All documents and physical demarcations verified by TerraPlots Legal Surveyor.');

  if (!property) return null;

  const toggleChecklistItem = (key: keyof VerificationChecklist) => {
    setChecklist(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleGrantBadge = () => {
    toggleVerifyProperty(property.id, true, checklist, notes);
    setAdminVerificationModalProperty(null);
  };

  const handleRevokeBadge = () => {
    toggleVerifyProperty(property.id, false, checklist, notes);
    setAdminVerificationModalProperty(null);
  };

  const checklistPassedCount = Object.values(checklist).filter(Boolean).length;
  const currentScore = Math.round((checklistPassedCount / 6) * 100);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-3xl overflow-hidden max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-900 via-indigo-950 to-slate-900 text-white p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-purple-500/20 text-purple-300 rounded-2xl">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-lg">Plot Verification & Compliance Audit</h3>
                <span className="text-[10px] font-bold px-2 py-0.5 bg-purple-400/20 text-purple-200 rounded-full">
                  Admin Authority
                </span>
              </div>
              <p className="text-xs text-purple-200">
                Auditing: <span className="font-semibold text-white">{property.title}</span>
              </p>
            </div>
          </div>

          <button
            onClick={() => setAdminVerificationModalProperty(null)}
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          
          {/* Plot Quick Summary */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex flex-wrap items-center justify-between gap-4 text-xs">
            <div>
              <span className="text-slate-400 uppercase font-bold block text-[10px]">Location</span>
              <strong className="text-slate-800 text-sm">{property.locality}, {property.city}</strong>
              <div className="text-slate-500 font-mono">Survey: {property.surveyNumber}</div>
            </div>

            <div>
              <span className="text-slate-400 uppercase font-bold block text-[10px]">Size & Road</span>
              <strong className="text-slate-800 text-sm">{property.plotSize} {property.sizeUnit}</strong>
              <div className="text-slate-500">{property.roadWidth} Ft Road • {property.facing}</div>
            </div>

            <div>
              <span className="text-slate-400 uppercase font-bold block text-[10px]">Asking Price</span>
              <strong className="text-emerald-700 text-base">{formatPrice(property.price)}</strong>
              <div className="text-slate-500 font-semibold">{property.approvalStatus}</div>
            </div>

            <div className="bg-white px-3 py-2 rounded-xl border border-slate-200 text-center">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Trust Score</span>
              <span className="text-lg font-black text-purple-700">{currentScore}%</span>
            </div>
          </div>

          {/* Uploaded Documents to Inspect */}
          <div>
            <h4 className="font-bold text-xs text-slate-800 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-emerald-600" />
              Uploaded Legal Documents ({property.documents?.length || 0})
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {property.documents?.map((doc) => (
                <div
                  key={doc.id}
                  className="bg-white p-3 rounded-xl border border-slate-200 flex items-center justify-between text-xs hover:border-slate-300 transition-all"
                >
                  <div>
                    <span className="font-bold text-slate-800 block truncate max-w-[200px]">{doc.name}</span>
                    <span className="text-[10px] text-slate-400 font-mono">Ref: {doc.documentNumber || 'PENDING'}</span>
                  </div>
                  <button
                    onClick={() => setInspectedDocument({ property, document: doc })}
                    className="px-2.5 py-1 bg-slate-900 text-white rounded-lg font-bold text-[11px] hover:bg-slate-800 transition-colors flex items-center gap-1"
                  >
                    <Eye className="w-3 h-3" /> Inspect
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* 6-Point Verification Checklist */}
          <div>
            <h4 className="font-bold text-xs text-slate-800 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <Award className="w-4 h-4 text-purple-600" />
              6-Point Regulatory Verification Audit
            </h4>

            <div className="space-y-2 text-xs">
              {[
                { key: 'titleDeedVerified', label: '1. Registered Mother Title Deed (30-Year clear chain of ownership)' },
                { key: 'encumbranceFree', label: '2. Nil-Encumbrance Certificate (Form 15 without court/bank liens)' },
                { key: 'layoutApproved', label: '3. Sanctioned Master Layout Plan & Town Planning Authority seal' },
                { key: 'physicalInspectionDone', label: '4. Physical Site Visit & GPS Tachymeter Coordinates validated' },
                { key: 'taxReceiptsCleared', label: '5. Up-to-date Municipal Property Tax & DC Conversion clearances' },
                { key: 'boundaryDemarcated', label: '6. Ground Demarcation with physical concrete boundary pillars' },
              ].map(({ key, label }) => {
                const isChecked = checklist[key as keyof VerificationChecklist];
                return (
                  <label
                    key={key}
                    onClick={() => toggleChecklistItem(key as keyof VerificationChecklist)}
                    className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer select-none transition-all ${
                      isChecked
                        ? 'bg-emerald-50/90 border-emerald-300 text-slate-900 font-semibold shadow-xs'
                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <span className="flex-1">{label}</span>
                    <div className={`w-5 h-5 rounded-md flex items-center justify-center transition-all ${
                      isChecked ? 'bg-emerald-600 text-white' : 'border border-slate-300 bg-white'
                    }`}>
                      {isChecked && <Check className="w-3.5 h-3.5" />}
                    </div>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Compliance Remarks */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              Legal Compliance Officer Remarks
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add audit findings..."
              className="w-full text-xs p-3 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>

        {/* Footer Actions */}
        <div className="bg-slate-100 px-6 py-4 border-t border-slate-200 flex items-center justify-between">
          <button
            onClick={handleRevokeBadge}
            className="px-4 py-2 bg-red-50 hover:bg-red-100 text-red-700 rounded-xl text-xs font-bold transition-colors border border-red-200 flex items-center gap-1.5"
          >
            <XCircle className="w-4 h-4" /> Reject / Revoke Badge
          </button>

          <div className="flex gap-2">
            <button
              onClick={() => setAdminVerificationModalProperty(null)}
              className="px-4 py-2 text-slate-600 hover:bg-slate-200 rounded-xl text-xs font-bold"
            >
              Cancel
            </button>
            <button
              onClick={handleGrantBadge}
              className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-black flex items-center gap-2 shadow-lg shadow-emerald-600/25 transition-all transform hover:-translate-y-0.5"
            >
              <Sparkles className="w-4 h-4" /> Grant "Verified Plot" Badge
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
