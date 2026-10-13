import React from 'react';
import { X, Layers, CheckCircle2, XCircle, ArrowRight, ShieldCheck } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { formatPrice, getPropertyTypeLabel } from '../../utils/formatters';
import { VerifiedBadge } from './VerifiedBadge';

export const CompareModal: React.FC = () => {
  const { 
    isCompareModalOpen, 
    setIsCompareModalOpen, 
    comparisonList, 
    toggleCompare, 
    properties,
    setSelectedProperty,
    setActiveInquiryProperty
  } = useApp();

  if (!isCompareModalOpen) return null;

  const compareItems = properties.filter(p => comparisonList.includes(p.id));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-5xl overflow-hidden max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="bg-slate-900 p-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-500/20 text-emerald-400 rounded-xl">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-lg">Compare Plots & Properties</h3>
              <p className="text-xs text-slate-400">
                Side-by-side analysis of specifications, legal approvals & pricing ({compareItems.length}/3 selected)
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsCompareModalOpen(false)}
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1">
          {compareItems.length === 0 ? (
            <div className="text-center py-12 text-slate-500">
              <Layers className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <p className="font-semibold">No properties selected for comparison.</p>
              <p className="text-xs text-slate-400 mt-1">
                Click the "Compare" checkbox on any plot or property card to view them side-by-side.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[650px]">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="p-3 text-xs font-bold text-slate-500 uppercase tracking-wider w-1/4">
                      Specification
                    </th>
                    {compareItems.map(item => (
                      <th key={item.id} className="p-3 w-1/3 min-w-[200px] align-top">
                        <div className="relative group">
                          <button
                            onClick={() => toggleCompare(item.id)}
                            className="absolute -top-2 -right-2 p-1 bg-red-100 hover:bg-red-200 text-red-600 rounded-full shadow-sm"
                            title="Remove"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                          <img
                            src={item.images[0]}
                            alt={item.title}
                            className="w-full h-28 object-cover rounded-xl mb-2"
                          />
                          <h4 className="font-bold text-sm text-slate-900 line-clamp-1">{item.title}</h4>
                          <p className="text-xs text-slate-500">{item.locality}, {item.city}</p>
                          <div className="text-emerald-700 font-extrabold text-base mt-1">
                            {formatPrice(item.price)}
                          </div>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
                  {/* Category & Type */}
                  <tr className="bg-slate-50/60">
                    <td className="p-3 font-bold text-slate-900">Type</td>
                    {compareItems.map(item => (
                      <td key={item.id} className="p-3 font-semibold text-slate-800">
                        {getPropertyTypeLabel(item.propertyType)}
                      </td>
                    ))}
                  </tr>

                  {/* Price per Unit */}
                  <tr>
                    <td className="p-3 font-bold text-slate-900">Rate / Unit</td>
                    {compareItems.map(item => (
                      <td key={item.id} className="p-3 font-mono font-bold text-slate-800">
                        ₹{item.pricePerUnit?.toLocaleString()} / {item.sizeUnit === 'acres' ? 'acre' : 'sq.ft'}
                      </td>
                    ))}
                  </tr>

                  {/* Size & Dimensions */}
                  <tr className="bg-slate-50/60">
                    <td className="p-3 font-bold text-slate-900">Plot Size & Dimensions</td>
                    {compareItems.map(item => (
                      <td key={item.id} className="p-3">
                        <div className="font-bold text-slate-900">{item.plotSize} {item.sizeUnit}</div>
                        <div className="text-slate-500 font-mono">
                          {item.dimensions?.length} × {item.dimensions?.breadth} {item.dimensions?.unit}
                        </div>
                      </td>
                    ))}
                  </tr>

                  {/* Facing Direction */}
                  <tr>
                    <td className="p-3 font-bold text-slate-900">Facing Direction</td>
                    {compareItems.map(item => (
                      <td key={item.id} className="p-3 font-bold text-emerald-700">
                        {item.facing} Facing
                      </td>
                    ))}
                  </tr>

                  {/* Road Width */}
                  <tr className="bg-slate-50/60">
                    <td className="p-3 font-bold text-slate-900">Road Width & Type</td>
                    {compareItems.map(item => (
                      <td key={item.id} className="p-3">
                        <span className="font-bold text-slate-800">{item.roadWidth} Feet</span>
                        <div className="text-[11px] text-slate-500">{item.roadType}</div>
                      </td>
                    ))}
                  </tr>

                  {/* Corner Plot */}
                  <tr>
                    <td className="p-3 font-bold text-slate-900">Corner Plot</td>
                    {compareItems.map(item => (
                      <td key={item.id} className="p-3">
                        {item.isCornerPlot ? (
                          <span className="inline-flex items-center gap-1 font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Yes (Dual Road)
                          </span>
                        ) : (
                          <span className="text-slate-400">Standard Frontage</span>
                        )}
                      </td>
                    ))}
                  </tr>

                  {/* Approval Status */}
                  <tr className="bg-slate-50/60">
                    <td className="p-3 font-bold text-slate-900">Approval Authority</td>
                    {compareItems.map(item => (
                      <td key={item.id} className="p-3 font-bold text-blue-700">
                        {item.approvalStatus}
                      </td>
                    ))}
                  </tr>

                  {/* Verification Badge */}
                  <tr>
                    <td className="p-3 font-bold text-slate-900">Verification Status</td>
                    {compareItems.map(item => (
                      <td key={item.id} className="p-3">
                        <VerifiedBadge property={item} size="sm" showDetailsOnHover={false} />
                      </td>
                    ))}
                  </tr>

                  {/* Survey Number */}
                  <tr className="bg-slate-50/60">
                    <td className="p-3 font-bold text-slate-900">Survey / Plot No.</td>
                    {compareItems.map(item => (
                      <td key={item.id} className="p-3 font-mono font-medium text-slate-700">
                        {item.surveyNumber}
                      </td>
                    ))}
                  </tr>

                  {/* Gated Community */}
                  <tr>
                    <td className="p-3 font-bold text-slate-900">Gated Layout</td>
                    {compareItems.map(item => (
                      <td key={item.id} className="p-3">
                        {item.gatedCommunity ? (
                          <span className="text-emerald-700 font-semibold flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Yes
                          </span>
                        ) : (
                          <span className="text-slate-400 flex items-center gap-1">
                            <XCircle className="w-3.5 h-3.5" /> Individual
                          </span>
                        )}
                      </td>
                    ))}
                  </tr>

                  {/* Action */}
                  <tr className="bg-slate-100/70">
                    <td className="p-3 font-bold text-slate-900">Actions</td>
                    {compareItems.map(item => (
                      <td key={item.id} className="p-3 space-y-2">
                        <button
                          onClick={() => {
                            setSelectedProperty(item);
                            setIsCompareModalOpen(false);
                          }}
                          className="w-full py-1.5 px-3 bg-slate-900 text-white rounded-lg font-semibold hover:bg-slate-800 transition-colors text-center text-xs block"
                        >
                          View Full Details
                        </button>
                        <button
                          onClick={() => {
                            setActiveInquiryProperty(item);
                            setIsCompareModalOpen(false);
                          }}
                          className="w-full py-1.5 px-3 bg-emerald-600 text-white rounded-lg font-semibold hover:bg-emerald-700 transition-colors text-center text-xs block"
                        >
                          Contact Owner
                        </button>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
