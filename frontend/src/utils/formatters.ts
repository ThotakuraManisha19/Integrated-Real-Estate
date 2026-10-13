import { SizeUnit, ApprovalStatus, FacingDirection, PropertyType } from '../types';

/**
 * Format Indian / Global Currency nicely
 * e.g., 4500000 -> ₹45 Lakh | 15000000 -> ₹1.50 Cr
 */
export function formatPrice(amount: number): string {
  if (!amount && amount !== 0) return '₹ 0';
  
  if (amount >= 10000000) {
    const cr = amount / 10000000;
    return `₹${cr.toFixed(2).replace(/\.?0+$/, '')} Cr`;
  }
  if (amount >= 100000) {
    const lakh = amount / 100000;
    return `₹${lakh.toFixed(2).replace(/\.?0+$/, '')} Lakh`;
  }
  if (amount >= 1000) {
    const k = amount / 1000;
    return `₹${k.toFixed(1).replace(/\.?0+$/, '')}k`;
  }
  return `₹${amount.toLocaleString('en-IN')}`;
}

/**
 * Format full exact currency for details & calculators
 */
export function formatExactPrice(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
}

/**
 * Unit conversion factors to normalized Sq.Ft
 */
export const SQFT_CONVERSIONS: Record<SizeUnit, number> = {
  'sq.ft': 1,
  'sq.yards': 9,
  'cents': 435.6,
  'acres': 43560,
  'gunthas': 1089,
};

/**
 * Convert any unit to Sq.Ft
 */
export function convertToSqFt(value: number, unit: SizeUnit): number {
  return Math.round(value * (SQFT_CONVERSIONS[unit] || 1));
}

/**
 * Convert Sq.Ft to target unit
 */
export function convertFromSqFt(sqFtValue: number, targetUnit: SizeUnit): number {
  const factor = SQFT_CONVERSIONS[targetUnit] || 1;
  const result = sqFtValue / factor;
  return targetUnit === 'acres' ? Number(result.toFixed(3)) : Number(result.toFixed(2));
}

/**
 * Friendly property type label
 */
export function getPropertyTypeLabel(type: PropertyType): string {
  const map: Record<PropertyType, string> = {
    residential_plot: 'Residential Plot',
    commercial_plot: 'Commercial Land',
    agricultural_farm: 'Agricultural / Farm Land',
    apartment: 'Apartment / Flat',
    house_villa: 'House / Villa',
    commercial_space: 'Commercial Property',
  };
  return map[type] || type;
}

/**
 * Approval status badge color styling
 */
export function getApprovalStatusBadge(status: ApprovalStatus): { bg: string; text: string; border: string } {
  switch (status) {
    case 'RERA Approved':
      return { bg: 'bg-emerald-50 text-emerald-700', text: 'text-emerald-700', border: 'border-emerald-300' };
    case 'DTCP Approved':
    case 'HMDA Approved':
    case 'BDA Approved':
      return { bg: 'bg-blue-50 text-blue-700', text: 'text-blue-700', border: 'border-blue-300' };
    case 'Panchayat Approved':
    case 'DC Converted':
      return { bg: 'bg-teal-50 text-teal-700', text: 'text-teal-700', border: 'border-teal-300' };
    case 'Freehold / Clear Title':
      return { bg: 'bg-indigo-50 text-indigo-700', text: 'text-indigo-700', border: 'border-indigo-300' };
    case 'Agricultural Zone':
      return { bg: 'bg-amber-50 text-amber-800', text: 'text-amber-800', border: 'border-amber-300' };
    default:
      return { bg: 'bg-slate-100 text-slate-700', text: 'text-slate-700', border: 'border-slate-300' };
  }
}

/**
 * Facing compass angle in degrees for visual arrow
 */
export function getFacingDegrees(facing: FacingDirection): number {
  const angles: Record<FacingDirection, number> = {
    'North': 0,
    'North-East': 45,
    'East': 90,
    'South-East': 135,
    'South': 180,
    'South-West': 225,
    'West': 270,
    'North-West': 315
  };
  return angles[facing] ?? 0;
}
