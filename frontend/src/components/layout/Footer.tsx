import React from 'react';
import { Compass, ShieldCheck, FileCheck, CheckCircle2, RotateCcw } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Footer: React.FC = () => {
  const { resetToMockData } = useApp();

  return (
    <footer className="bg-slate-900 text-slate-400 text-xs border-t border-slate-800 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Brand Info */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-emerald-500 text-white flex items-center justify-center font-bold">
                <Compass className="w-4 h-4" />
              </div>
              <span className="font-heading font-black text-white text-lg">TerraPlots</span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              India's premier verified land, plot, and property exchange portal. Digital document audit, boundary mapping, and direct owner-buyer connectivity.
            </p>
            <div className="pt-2">
              <button
                onClick={resetToMockData}
                className="text-[11px] text-emerald-400 hover:text-emerald-300 font-bold flex items-center gap-1.5 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Reset Portal Demo Data
              </button>
            </div>
          </div>

          {/* Plot Categories */}
          <div>
            <h4 className="font-bold text-white uppercase tracking-wider text-xs mb-3">
              Land & Plot Categories
            </h4>
            <ul className="space-y-2">
              <li><span className="hover:text-white cursor-pointer">Residential Layout Plots (Gated)</span></li>
              <li><span className="hover:text-white cursor-pointer">Highway Commercial Plots</span></li>
              <li><span className="hover:text-white cursor-pointer">Agricultural Farmlands & Estates</span></li>
              <li><span className="hover:text-white cursor-pointer">Corner Plots with Dual Road</span></li>
              <li><span className="hover:text-white cursor-pointer">Industrial MIDC / KIADB Zones</span></li>
            </ul>
          </div>

          {/* Legal Approvals */}
          <div>
            <h4 className="font-bold text-white uppercase tracking-wider text-xs mb-3">
              Sanctions & Approvals
            </h4>
            <ul className="space-y-2">
              <li><span className="hover:text-white cursor-pointer">RERA Registered Plots</span></li>
              <li><span className="hover:text-white cursor-pointer">DTCP Approved Layouts</span></li>
              <li><span className="hover:text-white cursor-pointer">HMDA / BDA Sanctioned</span></li>
              <li><span className="hover:text-white cursor-pointer">DC Converted Commercial</span></li>
              <li><span className="hover:text-white cursor-pointer">7/12 & Patta Land Records</span></li>
            </ul>
          </div>

          {/* Trust & Guarantee */}
          <div>
            <h4 className="font-bold text-white uppercase tracking-wider text-xs mb-3 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              Verified Plot Guarantee
            </h4>
            <p className="text-slate-400 text-xs leading-relaxed">
              Every plot carrying our green badge has undergone rigorous 30-year mother deed verification, encumbrance search, and on-ground GPS boundary survey.
            </p>
            <div className="mt-3 p-3 bg-slate-800/80 rounded-xl border border-slate-700/80 text-[11px] text-emerald-300 flex items-center gap-2">
              <FileCheck className="w-4 h-4 shrink-0" />
              <span>100% Free of Encumbrance & Legal Litigation</span>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} TerraPlots & Realty Technologies Pvt Ltd. All rights reserved.</p>
          <div className="flex gap-4">
            <span className="hover:text-slate-400 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-400 cursor-pointer">Terms of Service</span>
            <span className="hover:text-slate-400 cursor-pointer">RERA Compliance Guidelines</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
