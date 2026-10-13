import React, { useState } from 'react';
import { X, ArrowRightLeft, Calculator, Sparkles } from 'lucide-react';
import { SizeUnit } from '../../types';
import { convertToSqFt, convertFromSqFt } from '../../utils/formatters';

interface UnitConverterModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialValue?: number;
  initialUnit?: SizeUnit;
}

export const UnitConverterModal: React.FC<UnitConverterModalProps> = ({
  isOpen,
  onClose,
  initialValue = 1500,
  initialUnit = 'sq.ft'
}) => {
  const [value, setValue] = useState<number>(initialValue);
  const [sourceUnit, setSourceUnit] = useState<SizeUnit>(initialUnit);

  if (!isOpen) return null;

  const sqFt = convertToSqFt(value || 0, sourceUnit);

  const units: { key: SizeUnit; label: string; desc: string }[] = [
    { key: 'sq.ft', label: 'Square Feet (Sq.Ft)', desc: 'Standard urban residential unit' },
    { key: 'sq.yards', label: 'Square Yards (Gaj)', desc: '1 Sq.Yard = 9 Sq.Ft' },
    { key: 'cents', label: 'Cents', desc: '1 Cent = 435.6 Sq.Ft (South India)' },
    { key: 'acres', label: 'Acres', desc: '1 Acre = 43,560 Sq.Ft = 100 Cents' },
    { key: 'gunthas', label: 'Gunthas (Gunta)', desc: '1 Guntha = 1,089 Sq.Ft = 33x33 ft' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-700 p-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-white/10 rounded-xl">
              <Calculator className="w-5 h-5 text-emerald-200" />
            </div>
            <div>
              <h3 className="font-bold text-lg">Plot Area & Land Unit Converter</h3>
              <p className="text-xs text-emerald-100">Instant multi-unit conversion for real estate plots</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Input section */}
        <div className="p-6 space-y-6">
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Enter Plot Measurement
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="sm:col-span-2">
                <input
                  type="number"
                  min="0"
                  value={value || ''}
                  onChange={(e) => setValue(parseFloat(e.target.value) || 0)}
                  placeholder="Enter size..."
                  className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-lg text-lg font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono"
                />
              </div>
              <div>
                <select
                  value={sourceUnit}
                  onChange={(e) => setSourceUnit(e.target.value as SizeUnit)}
                  className="w-full px-3 py-2.5 bg-white border border-slate-300 rounded-lg font-semibold text-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="sq.ft">Sq.Ft</option>
                  <option value="sq.yards">Sq.Yards (Gaj)</option>
                  <option value="cents">Cents</option>
                  <option value="acres">Acres</option>
                  <option value="gunthas">Gunthas</option>
                </select>
              </div>
            </div>
          </div>

          {/* Real-time converted values */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between text-xs font-bold text-slate-500 uppercase tracking-wider px-1">
              <span>Converted Equivalents</span>
              <span className="flex items-center gap-1 text-emerald-600">
                <Sparkles className="w-3.5 h-3.5" /> Instant Sync
              </span>
            </div>

            <div className="grid grid-cols-1 gap-2.5 max-h-[260px] overflow-y-auto pr-1">
              {units.map(({ key, label, desc }) => {
                const isSelected = key === sourceUnit;
                const converted = convertFromSqFt(sqFt, key);

                return (
                  <div
                    key={key}
                    className={`p-3 rounded-xl border transition-all flex items-center justify-between ${
                      isSelected
                        ? 'bg-emerald-50/80 border-emerald-300 shadow-sm'
                        : 'bg-white border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-slate-800">{label}</span>
                        {isSelected && (
                          <span className="text-[10px] font-bold bg-emerald-200 text-emerald-800 px-1.5 py-0.5 rounded">
                            Input
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-slate-500">{desc}</span>
                    </div>

                    <div className="text-right">
                      <span className="text-lg font-black text-slate-900 font-mono">
                        {converted.toLocaleString()}
                      </span>
                      <span className="text-xs font-semibold text-slate-500 ml-1.5">{key}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-900 text-white font-semibold text-sm hover:bg-slate-800 transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
