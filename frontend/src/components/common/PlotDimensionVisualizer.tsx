import React, { useState } from 'react';
import { Compass, Maximize2, Shield, ArrowRight, CornerRightUp } from 'lucide-react';
import { PlotDimensions, FacingDirection, SizeUnit } from '../../types';
import { getFacingDegrees, convertToSqFt, convertFromSqFt } from '../../utils/formatters';

interface PlotDimensionVisualizerProps {
  dimensions: PlotDimensions;
  facing: FacingDirection;
  roadWidth: number;
  isCornerPlot: boolean;
  plotSize: number;
  sizeUnit: SizeUnit;
  boundaryWall?: string;
  surveyNumber?: string;
  roadType?: string;
}

export const PlotDimensionVisualizer: React.FC<PlotDimensionVisualizerProps> = ({
  dimensions,
  facing,
  roadWidth,
  isCornerPlot,
  plotSize,
  sizeUnit,
  boundaryWall = 'Full Gated Wall',
  surveyNumber,
  roadType = 'Asphalt Road'
}) => {
  const [selectedUnit, setSelectedUnit] = useState<SizeUnit>(sizeUnit);
  
  const length = dimensions.length || 50;
  const breadth = dimensions.breadth || 30;
  const unit = dimensions.unit || 'ft';

  // Calculate aspect ratio for SVG
  const maxDim = Math.max(length, breadth, 1);
  const scale = 200 / maxDim;
  const svgWidth = Math.max(breadth * scale, 120);
  const svgHeight = Math.max(length * scale, 120);

  const facingAngle = getFacingDegrees(facing);
  const sqFt = convertToSqFt(plotSize, sizeUnit);
  const convertedSize = convertFromSqFt(sqFt, selectedUnit);

  return (
    <div className="bg-slate-900 text-white rounded-2xl p-5 shadow-xl border border-slate-800 relative overflow-hidden">
      {/* Background blueprint grid */}
      <div className="absolute inset-0 bg-blueprint opacity-40 pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
            <Maximize2 className="w-4 h-4" />
          </div>
          <div>
            <h4 className="font-bold text-sm text-slate-100 flex items-center gap-2">
              Plot Dimension & Layout Blueprint
              {isCornerPlot && (
                <span className="bg-amber-500/20 text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-amber-500/30">
                  Corner Plot
                </span>
              )}
            </h4>
            <p className="text-xs text-slate-400">
              Survey No: <span className="text-slate-200 font-mono">{surveyNumber || 'Sy. No. Verified'}</span>
            </p>
          </div>
        </div>

        {/* Unit Converter Tabs */}
        <div className="flex items-center bg-slate-800 rounded-lg p-1 text-xs">
          {(['sq.ft', 'sq.yards', 'cents', 'acres'] as SizeUnit[]).map((u) => (
            <button
              key={u}
              onClick={() => setSelectedUnit(u)}
              className={`px-2.5 py-1 rounded-md transition-all font-medium ${
                selectedUnit === u
                  ? 'bg-emerald-500 text-white shadow-sm font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {u}
            </button>
          ))}
        </div>
      </div>

      {/* Visualizer Canvas & Metrics */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-6 mt-5 items-center">
        {/* SVG Drawing Canvas */}
        <div className="md:col-span-7 flex flex-col items-center justify-center p-4 bg-slate-950/60 rounded-xl border border-slate-800/80 min-h-[260px] relative">
          
          {/* Compass Rose */}
          <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-slate-900/90 border border-slate-700 px-2.5 py-1 rounded-full text-xs">
            <div 
              className="transition-transform duration-500"
              style={{ transform: `rotate(${facingAngle}deg)` }}
            >
              <Compass className="w-4 h-4 text-emerald-400" />
            </div>
            <span className="text-[11px] font-semibold text-slate-300">
              Facing: <strong className="text-emerald-400">{facing}</strong>
            </span>
          </div>

          {/* Dimension SVG */}
          <div className="relative flex flex-col items-center my-3">
            {/* Top Dimension Width */}
            <div className="text-[11px] font-mono text-emerald-400 font-bold mb-1 flex items-center gap-1">
              <span>←</span>
              <span>{breadth} {unit}</span>
              <span>→</span>
            </div>

            <div className="flex items-center">
              {/* Left Dimension Length */}
              <div className="text-[11px] font-mono text-emerald-400 font-bold -rotate-90 origin-center mr-1 flex items-center gap-1 whitespace-nowrap">
                <span>←</span>
                <span>{length} {unit}</span>
                <span>→</span>
              </div>

              {/* Main Plot Rectangle */}
              <div 
                className="relative border-2 border-emerald-400 bg-emerald-500/10 rounded-md flex flex-col items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.15)] transition-all duration-300"
                style={{
                  width: `${svgWidth}px`,
                  height: `${svgHeight}px`,
                  minWidth: '130px',
                  minHeight: '130px',
                  maxWidth: '240px',
                  maxHeight: '200px'
                }}
              >
                {/* Center Badge */}
                <div className="text-center p-2">
                  <p className="text-xs font-bold text-slate-200">
                    {convertedSize.toLocaleString()} {selectedUnit}
                  </p>
                  <p className="text-[10px] text-emerald-400 font-mono mt-0.5">
                    ({length} × {breadth} {unit})
                  </p>
                </div>

                {/* Corner Plot Corner Notch Marker */}
                {isCornerPlot && (
                  <div className="absolute top-0 right-0 w-5 h-5 border-b border-l border-amber-400/80 bg-amber-400/20 rounded-bl flex items-center justify-center">
                    <CornerRightUp className="w-3 h-3 text-amber-300" />
                  </div>
                )}
              </div>

              {/* Right Side Road if Corner Plot */}
              {isCornerPlot && (
                <div className="ml-2 h-full py-2 flex flex-col items-center justify-center">
                  <div className="w-5 h-32 bg-slate-800 border-l border-dashed border-amber-400/60 rounded flex items-center justify-center">
                    <span className="text-[9px] text-amber-300 font-semibold -rotate-90 whitespace-nowrap">
                      Side Road
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Front Road Strip */}
            <div className="mt-2 w-full max-w-[280px] bg-slate-800/90 border-t-2 border-dashed border-slate-600 rounded px-3 py-1.5 flex items-center justify-between text-[11px] text-slate-300">
              <span className="flex items-center gap-1 font-semibold text-slate-200">
                <ArrowRight className="w-3 h-3 text-emerald-400" />
                Front Road
              </span>
              <span className="font-mono text-emerald-400 font-bold">
                {roadWidth} Ft Wide ({roadType})
              </span>
            </div>
          </div>
        </div>

        {/* Key Metrics Breakdown */}
        <div className="md:col-span-5 space-y-3">
          <div className="bg-slate-800/60 rounded-xl p-3 border border-slate-700/60">
            <span className="text-[11px] text-slate-400 uppercase font-semibold tracking-wider">Total Area</span>
            <div className="flex items-baseline gap-2 mt-0.5">
              <span className="text-xl font-black text-emerald-400 font-heading">
                {convertedSize.toLocaleString()}
              </span>
              <span className="text-sm font-semibold text-slate-200">{selectedUnit}</span>
              {selectedUnit !== 'sq.ft' && (
                <span className="text-xs text-slate-400">({sqFt.toLocaleString()} sq.ft)</span>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="bg-slate-800/60 rounded-xl p-2.5 border border-slate-700/60">
              <span className="text-[10px] text-slate-400 uppercase font-semibold">Dimensions</span>
              <p className="text-xs font-bold text-slate-100 font-mono mt-0.5">
                {length} × {breadth} {unit}
              </p>
            </div>

            <div className="bg-slate-800/60 rounded-xl p-2.5 border border-slate-700/60">
              <span className="text-[10px] text-slate-400 uppercase font-semibold">Orientation</span>
              <p className="text-xs font-bold text-emerald-400 mt-0.5">
                {facing} Facing
              </p>
            </div>

            <div className="bg-slate-800/60 rounded-xl p-2.5 border border-slate-700/60">
              <span className="text-[10px] text-slate-400 uppercase font-semibold">Road Width</span>
              <p className="text-xs font-bold text-slate-100 mt-0.5">
                {roadWidth} Feet Road
              </p>
            </div>

            <div className="bg-slate-800/60 rounded-xl p-2.5 border border-slate-700/60">
              <span className="text-[10px] text-slate-400 uppercase font-semibold">Plot Type</span>
              <p className="text-xs font-bold text-amber-300 mt-0.5">
                {isCornerPlot ? 'Corner Dual Road' : 'Regular Frontage'}
              </p>
            </div>
          </div>

          <div className="bg-slate-800/40 rounded-xl p-2.5 border border-slate-700/40 flex items-center justify-between text-xs">
            <span className="text-slate-400 flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-emerald-400" />
              Boundary Security:
            </span>
            <span className="font-semibold text-slate-200">{boundaryWall}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
