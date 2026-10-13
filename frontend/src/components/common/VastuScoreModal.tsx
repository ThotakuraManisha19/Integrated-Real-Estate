import React from 'react';
import { X, Compass, Award, Sparkles, CheckCircle2, ShieldCheck, Sun } from 'lucide-react';
import { PropertyItem } from '../../types';
import { getFacingDegrees } from '../../utils/formatters';

interface VastuScoreModalProps {
  isOpen: boolean;
  onClose: () => void;
  property: PropertyItem | null;
}

export const VastuScoreModal: React.FC<VastuScoreModalProps> = ({
  isOpen,
  onClose,
  property
}) => {
  if (!isOpen || !property) return null;

  const facing = property.facing || 'East';
  const facingAngle = getFacingDegrees(facing);

  // Derive score
  let baseScore = 85;
  if (facing === 'East' || facing === 'North' || facing === 'North-East') {
    baseScore = 95;
  } else if (facing === 'North-West' || facing === 'South-East') {
    baseScore = 88;
  } else {
    baseScore = 80;
  }
  if (property.isCornerPlot) baseScore = Math.min(100, baseScore + 4);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-600 via-orange-600 to-slate-900 p-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/10 rounded-xl">
              <Sun className="w-5 h-5 text-amber-200" />
            </div>
            <div>
              <h3 className="font-bold text-base">Vastu & Energy Orientation Scorecard</h3>
              <p className="text-xs text-amber-100">Directional harmony and spatial alignment analysis</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6 overflow-y-auto max-h-[80vh] text-xs">
          {/* Main Score Dial */}
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-5 rounded-2xl border border-amber-200 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wider block">
                Overall Vastu Alignment Score
              </span>
              <div className="text-3xl font-black text-amber-900 font-heading mt-1 flex items-baseline gap-2">
                <span>{baseScore}/100</span>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md">
                  {baseScore >= 90 ? 'Highly Auspicious' : 'Favorable'}
                </span>
              </div>
              <p className="text-slate-600 text-xs mt-1">
                Orientation: <strong className="text-slate-900">{facing} Facing</strong> with {property.roadWidth}ft Road Frontage
              </p>
            </div>

            {/* Compass Visual */}
            <div className="w-20 h-20 bg-slate-900 rounded-full flex flex-col items-center justify-center border-4 border-amber-400/80 shadow-md relative">
              <div 
                className="transition-transform duration-500"
                style={{ transform: `rotate(${facingAngle}deg)` }}
              >
                <Compass className="w-8 h-8 text-amber-400" />
              </div>
              <span className="text-[9px] font-bold text-white mt-0.5">{facing.slice(0, 2)}</span>
            </div>
          </div>

          {/* Vastu Parameters Breakdown */}
          <div className="space-y-3">
            <h4 className="font-bold text-xs text-slate-800 uppercase tracking-wider">
              Vastu Principles Audit Breakdown
            </h4>

            <div className="space-y-2">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                <div>
                  <strong className="text-slate-900 block font-semibold">1. Entrance Direction ({facing})</strong>
                  <span className="text-slate-500 text-[11px]">
                    {facing === 'East' ? 'Brings morning solar prana, health & clarity.' :
                     facing === 'North' ? 'Favored by Lord Kubera for financial prosperity.' :
                     facing === 'North-East' ? 'Supreme Ishanya quadrant for peace & wellbeing.' :
                     'Standard directional alignment with proper gate placement recommended.'}
                  </span>
                </div>
                <span className="text-emerald-700 font-bold font-mono">
                  {facing === 'East' || facing === 'North' || facing === 'North-East' ? '100%' : '85%'}
                </span>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                <div>
                  <strong className="text-slate-900 block font-semibold">2. Plot Shape & Dimensions</strong>
                  <span className="text-slate-500 text-[11px]">
                    Rectangular {property.dimensions?.length}×{property.dimensions?.breadth} ft with perfect right angles (Gaumukhi / Ayata).
                  </span>
                </div>
                <span className="text-emerald-700 font-bold font-mono">96%</span>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                <div>
                  <strong className="text-slate-900 block font-semibold">3. Road Frontage & Corner Advantage</strong>
                  <span className="text-slate-500 text-[11px]">
                    {property.isCornerPlot 
                      ? 'Dual road exposure allows unobstructed airflow and light ingress.' 
                      : `${property.roadWidth} ft wide frontal approach ensures clean energy ingress.`}
                  </span>
                </div>
                <span className="text-emerald-700 font-bold font-mono">95%</span>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                <div>
                  <strong className="text-slate-900 block font-semibold">4. Boundary & Soil Stability</strong>
                  <span className="text-slate-500 text-[11px]">
                    {property.soilType || 'High load bearing virgin soil with marked boundary.'}
                  </span>
                </div>
                <span className="text-emerald-700 font-bold font-mono">92%</span>
              </div>
            </div>
          </div>

          {/* Vastu Tips */}
          <div className="bg-amber-50 p-3.5 rounded-xl border border-amber-200 text-amber-900 text-[11px] leading-relaxed">
            <strong>💡 Construction Tip:</strong> Place the primary borewell or water sump in the North-East corner (Ishanya) and heavy master bedrooms in the South-West quadrant (Nairuthya) for optimal harmony.
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-50 px-6 py-3.5 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-900 text-white font-semibold text-xs hover:bg-slate-800 transition-colors"
          >
            Close Scorecard
          </button>
        </div>
      </div>
    </div>
  );
};
