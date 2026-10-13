import React, { useState } from 'react';
import { X, Calculator, Percent, Calendar, IndianRupee, PieChart } from 'lucide-react';
import { formatExactPrice, formatPrice } from '../../utils/formatters';

interface LoanCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultPrice?: number;
}

export const LoanCalculatorModal: React.FC<LoanCalculatorModalProps> = ({
  isOpen,
  onClose,
  defaultPrice = 5000000 // 50 Lakh default
}) => {
  const [totalPrice, setTotalPrice] = useState<number>(defaultPrice);
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(20); // 20%
  const [interestRate, setInterestRate] = useState<number>(8.75); // 8.75%
  const [tenureYears, setTenureYears] = useState<number>(15); // 15 years

  if (!isOpen) return null;

  const downPaymentAmount = (totalPrice * downPaymentPercent) / 100;
  const loanAmount = totalPrice - downPaymentAmount;

  // EMI Calculation: P * r * (1 + r)^n / ((1 + r)^n - 1)
  const monthlyRate = interestRate / (12 * 100);
  const totalMonths = tenureYears * 12;
  
  let monthlyEmi = 0;
  if (monthlyRate > 0 && totalMonths > 0) {
    monthlyEmi = Math.round(
      (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
      (Math.pow(1 + monthlyRate, totalMonths) - 1)
    );
  }

  const totalPayment = monthlyEmi * totalMonths;
  const totalInterest = totalPayment - loanAmount;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-2xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-600 to-slate-900 p-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/10 rounded-xl">
              <Calculator className="w-5 h-5 text-emerald-200" />
            </div>
            <div>
              <h3 className="font-bold text-lg">Plot & Land Loan EMI Calculator</h3>
              <p className="text-xs text-emerald-100">Estimate monthly installments, down payments & interest</p>
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
        <div className="p-6 overflow-y-auto space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Input Controls */}
            <div className="space-y-4">
              <div>
                <label className="flex justify-between text-xs font-bold text-slate-700 uppercase mb-1.5">
                  <span>Plot / Property Cost</span>
                  <span className="text-emerald-700 font-bold">{formatPrice(totalPrice)}</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-slate-400 font-semibold">₹</span>
                  <input
                    type="number"
                    step="50000"
                    min="100000"
                    value={totalPrice}
                    onChange={(e) => setTotalPrice(parseFloat(e.target.value) || 0)}
                    className="w-full pl-8 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-lg font-bold text-slate-800 text-sm focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold text-slate-700 uppercase mb-1.5">
                  <span>Down Payment ({downPaymentPercent}%)</span>
                  <span className="text-slate-900">{formatPrice(downPaymentAmount)}</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="80"
                  step="5"
                  value={downPaymentPercent}
                  onChange={(e) => setDownPaymentPercent(parseFloat(e.target.value))}
                  className="w-full accent-emerald-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold text-slate-700 uppercase mb-1.5">
                  <span>Interest Rate</span>
                  <span className="text-slate-900">{interestRate}% p.a.</span>
                </div>
                <input
                  type="range"
                  min="6.5"
                  max="14.0"
                  step="0.25"
                  value={interestRate}
                  onChange={(e) => setInterestRate(parseFloat(e.target.value))}
                  className="w-full accent-emerald-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold text-slate-700 uppercase mb-1.5">
                  <span>Loan Tenure</span>
                  <span className="text-slate-900">{tenureYears} Years ({totalMonths} Months)</span>
                </div>
                <input
                  type="range"
                  min="3"
                  max="30"
                  step="1"
                  value={tenureYears}
                  onChange={(e) => setTenureYears(parseInt(e.target.value))}
                  className="w-full accent-emerald-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
                />
              </div>
            </div>

            {/* EMI & Breakdown Card */}
            <div className="bg-slate-900 text-white rounded-xl p-5 flex flex-col justify-between shadow-inner">
              <div>
                <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">
                  Estimated Monthly Installment (EMI)
                </span>
                <div className="text-3xl font-black text-emerald-400 font-heading mt-1">
                  ₹{monthlyEmi.toLocaleString('en-IN')}<span className="text-xs text-slate-400 font-normal"> /month</span>
                </div>
              </div>

              <div className="space-y-2.5 my-4 pt-4 border-t border-slate-800 text-xs">
                <div className="flex justify-between text-slate-300">
                  <span>Principal Loan Amount:</span>
                  <span className="font-bold text-white">{formatPrice(loanAmount)}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Total Interest Payable:</span>
                  <span className="font-bold text-amber-400">{formatPrice(totalInterest)}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Total Amount (Principal + Int):</span>
                  <span className="font-bold text-white">{formatPrice(totalPayment)}</span>
                </div>
              </div>

              <div className="bg-slate-800/80 p-3 rounded-lg text-[11px] text-slate-400 flex items-center gap-2">
                <Percent className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Pre-approved plot loans available from SBI, HDFC & ICICI for verified listings.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-50 px-6 py-3.5 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-900 text-white font-semibold text-sm hover:bg-slate-800 transition-colors"
          >
            Close Calculator
          </button>
        </div>
      </div>
    </div>
  );
};
