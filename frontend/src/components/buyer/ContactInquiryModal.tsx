import React, { useState } from 'react';
import { 
  X, 
  Send, 
  Calendar, 
  IndianRupee, 
  FileText, 
  Phone, 
  Mail, 
  User, 
  CheckCircle2, 
  Building2,
  Clock
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { formatPrice } from '../../utils/formatters';

export const ContactInquiryModal: React.FC = () => {
  const { 
    activeInquiryProperty, 
    setActiveInquiryProperty, 
    submitInquiry 
  } = useApp();

  const [inquiryType, setInquiryType] = useState<'general_query' | 'site_visit_request' | 'price_offer' | 'document_request'>('site_visit_request');
  const [buyerName, setBuyerName] = useState('');
  const [buyerPhone, setBuyerPhone] = useState('');
  const [buyerEmail, setBuyerEmail] = useState('');
  const [offeredPrice, setOfferedPrice] = useState<number>(activeInquiryProperty?.price || 5000000);
  const [preferredVisitDate, setPreferredVisitDate] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!activeInquiryProperty) return null;

  const property = activeInquiryProperty;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!buyerName || !buyerPhone) {
      alert('Please enter your name and phone number.');
      return;
    }

    submitInquiry({
      propertyId: property.id,
      propertyTitle: property.title,
      propertyCategory: property.category,
      propertyType: property.propertyType,
      buyerName,
      buyerPhone,
      buyerEmail,
      inquiryType,
      offeredPrice: inquiryType === 'price_offer' ? offeredPrice : undefined,
      preferredVisitDate: inquiryType === 'site_visit_request' ? preferredVisitDate : undefined,
      message: message || `Inquiry regarding ${property.title}`,
      sellerId: property.seller.id
    });

    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setActiveInquiryProperty(null);
    }, 2400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 to-emerald-950 p-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-500/20 text-emerald-400 rounded-xl">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base">Contact Seller & Inquire</h3>
              <p className="text-xs text-slate-300">Listing: {property.title}</p>
            </div>
          </div>
          <button
            onClick={() => setActiveInquiryProperty(null)}
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSubmitted ? (
          <div className="p-8 text-center space-y-3">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto animate-bounce">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="font-bold text-xl text-slate-900">Inquiry Sent Successfully!</h4>
            <p className="text-xs text-slate-500">
              The owner / listing agent (<strong>{property.seller.name}</strong>) has received your request and will call you shortly.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto max-h-[80vh]">
            
            {/* Property Summary Pill */}
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
              <div>
                <span className="font-bold text-slate-800">{property.seller.name}</span>
                <span className="text-slate-500 block">({property.seller.type})</span>
              </div>
              <div className="text-right">
                <span className="font-bold text-emerald-700 text-sm">{formatPrice(property.price)}</span>
                <span className="text-slate-500 block">{property.plotSize} {property.sizeUnit}</span>
              </div>
            </div>

            {/* Inquiry Type Tabs */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                What would you like to do?
              </label>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => setInquiryType('site_visit_request')}
                  className={`p-2.5 rounded-xl border text-left font-semibold flex items-center gap-2 transition-all ${
                    inquiryType === 'site_visit_request'
                      ? 'bg-emerald-50 border-emerald-500 text-emerald-900 shadow-sm ring-1 ring-emerald-500'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <Calendar className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Book Site Visit</span>
                </button>

                <button
                  type="button"
                  onClick={() => setInquiryType('price_offer')}
                  className={`p-2.5 rounded-xl border text-left font-semibold flex items-center gap-2 transition-all ${
                    inquiryType === 'price_offer'
                      ? 'bg-emerald-50 border-emerald-500 text-emerald-900 shadow-sm ring-1 ring-emerald-500'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <IndianRupee className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Make Price Offer</span>
                </button>

                <button
                  type="button"
                  onClick={() => setInquiryType('document_request')}
                  className={`p-2.5 rounded-xl border text-left font-semibold flex items-center gap-2 transition-all ${
                    inquiryType === 'document_request'
                      ? 'bg-emerald-50 border-emerald-500 text-emerald-900 shadow-sm ring-1 ring-emerald-500'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <FileText className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Request Legal Docs</span>
                </button>

                <button
                  type="button"
                  onClick={() => setInquiryType('general_query')}
                  className={`p-2.5 rounded-xl border text-left font-semibold flex items-center gap-2 transition-all ${
                    inquiryType === 'general_query'
                      ? 'bg-emerald-50 border-emerald-500 text-emerald-900 shadow-sm ring-1 ring-emerald-500'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <Building2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>General Query</span>
                </button>
              </div>
            </div>

            {/* Conditional Fields based on type */}
            {inquiryType === 'site_visit_request' && (
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Preferred Date of Physical Visit
                </label>
                <input
                  type="date"
                  value={preferredVisitDate}
                  onChange={(e) => setPreferredVisitDate(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-semibold text-slate-800"
                />
              </div>
            )}

            {inquiryType === 'price_offer' && (
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Your Offer Price (Asking: {formatPrice(property.price)})
                </label>
                <input
                  type="number"
                  step="50000"
                  value={offeredPrice}
                  onChange={(e) => setOfferedPrice(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-bold text-slate-800"
                />
              </div>
            )}

            {/* Buyer Contact Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Your Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Patel"
                  value={buyerName}
                  onChange={(e) => setBuyerName(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-800"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Phone / WhatsApp *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  value={buyerPhone}
                  onChange={(e) => setBuyerPhone(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-800"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Email Address (Optional)
              </label>
              <input
                type="email"
                placeholder="ramesh@example.com"
                value={buyerEmail}
                onChange={(e) => setBuyerEmail(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-800"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Message / Specific Questions
              </label>
              <textarea
                rows={3}
                placeholder="Please share more details on boundary fencing, DTCP layout plan..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-800"
              />
            </div>

            {/* Actions */}
            <div className="pt-3 border-t border-slate-200 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setActiveInquiryProperty(null)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-md transition-colors"
              >
                <Send className="w-3.5 h-3.5" />
                Submit Inquiry
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
