import React from 'react';
import { 
  X, 
  Printer, 
  Download, 
  ShieldCheck, 
  Compass, 
  Layers, 
  MapPin, 
  CheckCircle2, 
  QrCode,
  FileText
} from 'lucide-react';
import { PropertyItem } from '../../types';
import { formatExactPrice, formatPrice, getPropertyTypeLabel } from '../../utils/formatters';

interface FactsheetPrintModalProps {
  property: PropertyItem | null;
  onClose: () => void;
}

export const FactsheetPrintModal: React.FC<FactsheetPrintModalProps> = ({
  property,
  onClose
}) => {
  if (!property) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-4xl max-h-[94vh] flex flex-col overflow-hidden">
        
        {/* Header (Hidden during actual print via print:hidden) */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between border-b border-slate-800 print:hidden">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-500/20 text-emerald-400 rounded-xl">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base">Official Plot Factsheet & Dossier</h3>
              <p className="text-xs text-slate-400">Ready for print & PDF generation</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-md transition-colors"
            >
              <Printer className="w-4 h-4" /> Print / Save PDF
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Factsheet Sheet Body */}
        <div id="printable-factsheet" className="p-8 overflow-y-auto space-y-6 flex-1 bg-white text-slate-900 font-sans text-xs">
          
          {/* Official Letterhead Header */}
          <div className="flex items-start justify-between border-b-2 border-slate-900 pb-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-700 text-white flex items-center justify-center font-bold">
                  <Compass className="w-5 h-5" />
                </div>
                <span className="font-heading font-black text-2xl text-slate-900">TerraPlots & Realty</span>
              </div>
              <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">
                Certified Land Dossier • Survey & Legal Verification Report
              </p>
            </div>

            <div className="text-right">
              <span className="inline-flex items-center gap-1 text-[11px] font-bold bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full border border-emerald-300">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                Verified Plot Listing
              </span>
              <p className="text-[10px] text-slate-400 font-mono mt-1">Doc ID: TP-DOSSIER-{property.id.toUpperCase()}</p>
            </div>
          </div>

          {/* Title & Key Highlights */}
          <div className="flex justify-between items-end gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
            <div>
              <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider block">
                {getPropertyTypeLabel(property.propertyType)} • {property.approvalStatus}
              </span>
              <h2 className="text-xl font-bold text-slate-900 mt-0.5">{property.title}</h2>
              <p className="text-xs text-slate-600 mt-1 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                {property.address}, {property.locality}, {property.city} - {property.pincode}
              </p>
            </div>

            <div className="text-right shrink-0">
              <span className="text-[10px] text-slate-400 font-bold uppercase block">Asking Price</span>
              <div className="text-2xl font-black text-emerald-800 font-heading">
                {formatExactPrice(property.price)}
              </div>
              <span className="text-[11px] font-semibold text-slate-600">
                ₹{property.pricePerUnit?.toLocaleString()} / {property.sizeUnit === 'acres' ? 'acre' : 'sq.ft'}
              </span>
            </div>
          </div>

          {/* Photo & Plot Layout Thumbnail */}
          <div className="grid grid-cols-2 gap-4">
            <div className="h-44 rounded-xl overflow-hidden border border-slate-200">
              <img src={property.images[0]} alt="Property" className="w-full h-full object-cover" />
            </div>
            <div className="h-44 rounded-xl overflow-hidden border border-slate-200 bg-slate-900 text-white p-4 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">Plot Layout Blueprint</span>
                <div className="text-lg font-black mt-1 font-heading text-slate-100">
                  {property.plotSize} {property.sizeUnit} ({property.plotSizeSqFt?.toLocaleString()} Sq.Ft)
                </div>
                <div className="text-xs text-slate-300 font-mono mt-0.5">
                  Dimensions: {property.dimensions?.length} × {property.dimensions?.breadth} {property.dimensions?.unit}
                </div>
              </div>
              <div className="pt-2 border-t border-slate-800 flex justify-between text-[11px] text-slate-400">
                <span>Facing: <strong className="text-emerald-400">{property.facing}</strong></span>
                <span>Road Width: <strong className="text-white">{property.roadWidth} Ft</strong></span>
              </div>
            </div>
          </div>

          {/* Specifications Matrix Table */}
          <div className="border border-slate-200 rounded-xl overflow-hidden">
            <table className="w-full text-left border-collapse">
              <tbody>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <td className="p-2.5 font-bold text-slate-700 w-1/4">Survey / Plot No.</td>
                  <td className="p-2.5 font-mono font-bold text-slate-900 w-1/4">{property.surveyNumber}</td>
                  <td className="p-2.5 font-bold text-slate-700 w-1/4">Khata Classification</td>
                  <td className="p-2.5 font-semibold text-slate-900 w-1/4">{property.khataNumber || 'Clear Title'}</td>
                </tr>
                <tr className="border-b border-slate-200">
                  <td className="p-2.5 font-bold text-slate-700">Approval Authority</td>
                  <td className="p-2.5 font-bold text-blue-700">{property.approvalStatus}</td>
                  <td className="p-2.5 font-bold text-slate-700">RERA Sanction ID</td>
                  <td className="p-2.5 font-mono text-slate-800">{property.reraId || 'Approved / Clear'}</td>
                </tr>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <td className="p-2.5 font-bold text-slate-700">Road Width & Type</td>
                  <td className="p-2.5 text-slate-900">{property.roadWidth} Ft ({property.roadType})</td>
                  <td className="p-2.5 font-bold text-slate-700">Corner Plot Status</td>
                  <td className="p-2.5 text-slate-900">{property.isCornerPlot ? 'Yes (Dual Road Frontage)' : 'Regular Frontage'}</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold text-slate-700">Boundary & Wall</td>
                  <td className="p-2.5 text-slate-900">{property.boundaryWall}</td>
                  <td className="p-2.5 font-bold text-slate-700">GPS Coordinates</td>
                  <td className="p-2.5 font-mono text-slate-800">{property.coordinates?.lat}, {property.coordinates?.lng}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Legal Document Checklist Verification Seal */}
          <div className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-4 flex items-center justify-between">
            <div className="space-y-1">
              <h4 className="font-bold text-xs text-emerald-900 uppercase tracking-wider flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-700" />
                Legal Due Diligence Verification Clearance
              </h4>
              <p className="text-[11px] text-emerald-800">
                Audited by TerraPlots Legal Cell: Title deeds verified clear of encumbrance, court stays and municipal liens.
              </p>
              <div className="flex flex-wrap gap-3 pt-1 text-[10px] text-emerald-900 font-semibold">
                <span>✓ 30-Yr Title Deed</span>
                <span>✓ Nil-Encumbrance Certificate</span>
                <span>✓ Town Planning Sanction</span>
                <span>✓ Demarcated Boundary Pillars</span>
              </div>
            </div>

            <div className="w-20 h-20 rounded-full border-2 border-dashed border-emerald-700 flex flex-col items-center justify-center text-center text-emerald-800 font-bold text-[8px] uppercase shrink-0 -rotate-6">
              <span>OFFICIAL</span>
              <span className="text-xs">SEAL</span>
              <span>VERIFIED</span>
            </div>
          </div>

          {/* Seller / Contact Profile */}
          <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Listing Contact / Direct Owner
              </span>
              <h4 className="font-bold text-sm text-slate-900">{property.seller.name} ({property.seller.type})</h4>
              <p className="text-slate-600 text-[11px]">Phone: {property.seller.phone} • Email: {property.seller.email}</p>
            </div>

            <div className="text-right text-[10px] text-slate-400">
              <p>Generated via TerraPlots Exchange</p>
              <p className="font-mono">{new Date().toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
