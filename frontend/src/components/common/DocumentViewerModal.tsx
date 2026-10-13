import React, { useState } from 'react';
import { 
  X, 
  FileText, 
  ShieldCheck, 
  AlertCircle, 
  Download, 
  ZoomIn, 
  ZoomOut, 
  RotateCw, 
  CheckCircle, 
  XCircle, 
  ExternalLink,
  Calendar,
  Hash,
  FileCheck
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { VerificationStatus } from '../../types';

export const DocumentViewerModal: React.FC = () => {
  const { 
    inspectedDocument, 
    setInspectedDocument, 
    currentRole, 
    verifyDocument 
  } = useApp();

  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [rotation, setRotation] = useState<number>(0);
  const [adminNote, setAdminNote] = useState<string>('');
  const [actionSuccess, setActionSuccess] = useState<string | null>(null);

  if (!inspectedDocument) return null;

  const { property, document } = inspectedDocument;

  const handleStatusChange = (status: VerificationStatus) => {
    verifyDocument(property.id, document.id, status, adminNote || undefined);
    setActionSuccess(`Document marked as ${status.toUpperCase()}!`);
    setTimeout(() => {
      setActionSuccess(null);
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-5xl h-[92vh] flex flex-col overflow-hidden">
        
        {/* Top Header Bar */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <FileCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base text-white">{document.name}</h3>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                  document.status === 'verified'
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    : document.status === 'pending'
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                    : 'bg-red-500/20 text-red-300 border border-red-500/30'
                }`}>
                  {document.status}
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Property: <span className="text-slate-200">{property.title}</span> ({property.city})
              </p>
            </div>
          </div>

          {/* Controls & Close */}
          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center bg-slate-800 rounded-lg p-1 text-slate-300">
              <button 
                onClick={() => setZoomLevel(prev => Math.max(0.6, prev - 0.2))}
                className="p-1.5 hover:text-white rounded hover:bg-slate-700" 
                title="Zoom Out"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <span className="text-xs font-mono px-2">{Math.round(zoomLevel * 100)}%</span>
              <button 
                onClick={() => setZoomLevel(prev => Math.min(2.0, prev + 0.2))}
                className="p-1.5 hover:text-white rounded hover:bg-slate-700" 
                title="Zoom In"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              <button 
                onClick={() => setRotation(prev => (prev + 90) % 360)}
                className="p-1.5 hover:text-white rounded hover:bg-slate-700 ml-1" 
                title="Rotate"
              >
                <RotateCw className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={() => setInspectedDocument(null)}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors ml-2"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Main Body: Document Preview + Details Panel */}
        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
          
          {/* Document Canvas Preview */}
          <div className="flex-1 bg-slate-950/90 relative overflow-auto flex items-center justify-center p-6 select-none">
            <div 
              className="transition-transform duration-200 shadow-2xl rounded-lg bg-white p-4 max-w-full max-h-full flex flex-col items-center justify-center relative"
              style={{
                transform: `scale(${zoomLevel}) rotate(${rotation}deg)`
              }}
            >
              {/* Document Simulator Image / Mock Certificate Render */}
              <div className="w-[450px] sm:w-[520px] bg-amber-50/40 border-4 border-double border-amber-900/30 p-8 rounded-sm text-slate-900 shadow-lg relative min-h-[580px] flex flex-col justify-between">
                {/* Government / Authority Header */}
                <div className="text-center border-b-2 border-slate-300 pb-4">
                  <div className="w-12 h-12 mx-auto rounded-full bg-amber-700/10 border border-amber-800/30 flex items-center justify-center font-bold text-amber-900 mb-1">
                    🏛️
                  </div>
                  <h4 className="font-serif font-black text-sm uppercase tracking-wider text-slate-900">
                    Department of Town Planning & Land Records
                  </h4>
                  <p className="text-[10px] text-slate-600 font-serif uppercase tracking-widest mt-0.5">
                    Official Certificate of Registration & Verification
                  </p>
                </div>

                {/* Stamp & Seal */}
                <div className="my-6 space-y-4 text-xs font-serif text-slate-800 leading-relaxed">
                  <div className="flex justify-between border-b border-dashed border-slate-300 pb-2">
                    <span className="font-bold">Document Ref:</span>
                    <span className="font-mono">{document.documentNumber || 'REG-2026-X884'}</span>
                  </div>
                  <div className="flex justify-between border-b border-dashed border-slate-300 pb-2">
                    <span className="font-bold">Plot / Survey No:</span>
                    <span>{property.surveyNumber}</span>
                  </div>
                  <div className="flex justify-between border-b border-dashed border-slate-300 pb-2">
                    <span className="font-bold">Layout Approval Authority:</span>
                    <span>{property.approvalStatus}</span>
                  </div>
                  <div className="flex justify-between border-b border-dashed border-slate-300 pb-2">
                    <span className="font-bold">Plot Area Dimension:</span>
                    <span>{property.plotSize} {property.sizeUnit} ({property.dimensions?.length}x{property.dimensions?.breadth} ft)</span>
                  </div>
                  <div className="flex justify-between border-b border-dashed border-slate-300 pb-2">
                    <span className="font-bold">Registered Owner / Seller:</span>
                    <span>{property.seller.name}</span>
                  </div>

                  <p className="text-[11px] text-slate-600 italic mt-4 bg-white/70 p-3 rounded border border-slate-200">
                    "This document certifies that the land parcel bearing specified survey number has been legally registered and cleared with no pending government encumbrances or litigation."
                  </p>
                </div>

                {/* Official Verification Watermark Stamp */}
                <div className="flex items-center justify-between pt-4 border-t-2 border-slate-300">
                  <div className="w-24 h-24 border-2 border-emerald-700/80 rounded-full flex flex-col items-center justify-center text-emerald-800 font-bold text-[9px] uppercase -rotate-12 bg-emerald-50/50 shadow-sm">
                    <ShieldCheck className="w-5 h-5 text-emerald-700" />
                    <span>VERIFIED</span>
                    <span className="text-[8px] font-mono">TERRAPLOT</span>
                  </div>

                  <div className="text-right text-[10px] text-slate-600">
                    <p className="font-bold text-slate-900">Digitally Certified</p>
                    <p>Sub-Registrar Authority</p>
                    <p className="font-mono text-[9px] text-slate-400 mt-1">{document.uploadedAt}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar Info & Admin Review Panel */}
          <div className="w-full lg:w-80 bg-white border-l border-slate-200 p-5 flex flex-col justify-between overflow-y-auto">
            <div className="space-y-5">
              <div>
                <h4 className="font-bold text-sm text-slate-900 uppercase tracking-wider mb-3">
                  Document Metadata
                </h4>

                <div className="space-y-2.5 text-xs text-slate-600">
                  <div className="flex items-center gap-2">
                    <Hash className="w-4 h-4 text-slate-400" />
                    <span>Doc ID:</span>
                    <span className="font-mono font-bold text-slate-800">{document.documentNumber || document.id}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-slate-400" />
                    <span>Uploaded:</span>
                    <span className="font-semibold text-slate-800">{document.uploadedAt}</span>
                  </div>

                  {document.verifiedAt && (
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      <span>Verified On:</span>
                      <span className="font-semibold text-emerald-700">{document.verifiedAt}</span>
                    </div>
                  )}

                  {document.notes && (
                    <div className="mt-3 p-3 bg-slate-50 rounded-xl border border-slate-200 text-[11px]">
                      <strong className="block text-slate-800 mb-1">Legal Auditor Notes:</strong>
                      <p className="text-slate-600">{document.notes}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Admin Verification Controls */}
              {(currentRole === 'admin') && (
                <div className="pt-4 border-t border-slate-200">
                  <h4 className="font-bold text-xs text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-1.5 text-emerald-800">
                    <ShieldCheck className="w-4 h-4" /> Admin Audit Action
                  </h4>

                  {actionSuccess && (
                    <div className="mb-3 p-2 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-lg text-center animate-bounce">
                      {actionSuccess}
                    </div>
                  )}

                  <div className="mb-3">
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                      Audit Remarks / Notes:
                    </label>
                    <textarea
                      rows={2}
                      value={adminNote}
                      onChange={(e) => setAdminNote(e.target.value)}
                      placeholder="Add compliance notes..."
                      className="w-full text-xs p-2 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => handleStatusChange('verified')}
                      className="py-2 px-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 shadow-sm transition-colors"
                    >
                      <CheckCircle className="w-3.5 h-3.5" /> Approve
                    </button>
                    <button
                      onClick={() => handleStatusChange('rejected')}
                      className="py-2 px-3 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 shadow-sm transition-colors"
                    >
                      <XCircle className="w-3.5 h-3.5" /> Reject
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-slate-200 space-y-2">
              <a
                href={document.fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs rounded-xl flex items-center justify-center gap-2 transition-colors"
              >
                <Download className="w-4 h-4" /> Download Original PDF
              </a>
              <button
                onClick={() => setInspectedDocument(null)}
                className="w-full py-2 bg-slate-900 text-white font-semibold text-xs rounded-xl hover:bg-slate-800 transition-colors"
              >
                Close Viewer
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
