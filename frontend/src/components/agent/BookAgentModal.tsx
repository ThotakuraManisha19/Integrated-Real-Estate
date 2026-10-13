import React, { useState } from 'react';
import { 
  X, 
  UserCheck, 
  Calendar, 
  Clock, 
  MapPin, 
  ShieldCheck, 
  Star, 
  CheckCircle2, 
  Compass, 
  FileText, 
  IndianRupee,
  Phone,
  Sparkles
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { MiddlemanAgent, PropertyItem } from '../../types';
import { formatPrice } from '../../utils/formatters';

interface BookAgentModalProps {
  isOpen: boolean;
  onClose: () => void;
  property: PropertyItem | null;
}

export const BookAgentModal: React.FC<BookAgentModalProps> = ({
  isOpen,
  onClose,
  property
}) => {
  const { agents, bookAppointment, addToast } = useApp();

  const [selectedAgentId, setSelectedAgentId] = useState<string>('agent-1');
  const [appointmentDate, setAppointmentDate] = useState<string>('2026-10-16');
  const [timeSlot, setTimeSlot] = useState<string>('10:00 AM - 11:30 AM');
  const [visitType, setVisitType] = useState<'Assisted Site Visit' | 'Boundary & Land Survey Audit' | 'Deed & Revenue Escort' | 'Owner Negotiation Meeting'>('Boundary & Land Survey Audit');
  const [meetingPoint, setMeetingPoint] = useState<'At Plot Location' | 'Nearest Landmark' | 'Buyer Pickup'>('At Plot Location');
  const [specialInstructions, setSpecialInstructions] = useState<string>('Please verify boundary corner pillars and measure road width.');
  const [buyerName, setBuyerName] = useState<string>('Amitabh Sen');
  const [buyerPhone, setBuyerPhone] = useState<string>('+91 98300 44551');
  const [buyerEmail, setBuyerEmail] = useState<string>('amitabh.sen@techcorp.in');
  const [isBooked, setIsBooked] = useState<boolean>(false);

  if (!isOpen || !property) return null;

  const selectedAgent = agents.find(a => a.id === selectedAgentId) || agents[0];

  const timeSlots = [
    '09:00 AM - 10:30 AM',
    '10:30 AM - 12:00 PM',
    '02:00 PM - 03:30 PM',
    '04:00 PM - 05:30 PM'
  ];

  const visitTypes = [
    {
      title: 'Boundary & Land Survey Audit' as const,
      desc: 'Physical tape measurement, survey stone inspection & road width check',
      fee: selectedAgent?.serviceFee || 799
    },
    {
      title: 'Assisted Site Visit' as const,
      desc: 'Middleman agent escorts you to plot and guides neighborhood check',
      fee: (selectedAgent?.serviceFee ? selectedAgent.serviceFee - 200 : 599)
    },
    {
      title: 'Deed & Revenue Escort' as const,
      desc: 'Agent coordinates with local revenue office & checks 7/12 records',
      fee: (selectedAgent?.serviceFee ? selectedAgent.serviceFee + 200 : 999)
    },
    {
      title: 'Owner Negotiation Meeting' as const,
      desc: 'Middleman facilitates face-to-face price bargaining with seller',
      fee: selectedAgent?.serviceFee || 799
    }
  ];

  const handleBook = (e: React.FormEvent) => {
    e.preventDefault();
    if (!buyerName || !buyerPhone) {
      alert('Please provide your name and phone number.');
      return;
    }

    bookAppointment({
      propertyId: property.id,
      agentId: selectedAgent.id,
      buyerName,
      buyerPhone,
      buyerEmail,
      appointmentDate,
      timeSlot,
      visitType,
      meetingPoint,
      specialInstructions
    });

    setIsBooked(true);
    setTimeout(() => {
      setIsBooked(false);
      onClose();
    }, 2800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-3xl max-h-[92vh] flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-5 flex items-center justify-between border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-indigo-500/20 text-indigo-300 rounded-2xl">
              <UserCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base text-white">Book Middleman Agent for Plot Viewing</h3>
                <span className="text-[10px] font-bold px-2 py-0.5 bg-emerald-500/20 text-emerald-300 rounded-full border border-emerald-500/30">
                  Verified Field Escort
                </span>
              </div>
              <p className="text-xs text-slate-300 line-clamp-1">
                For: <span className="font-semibold text-white">{property.title}</span> ({property.city})
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Success Screen */}
        {isBooked ? (
          <div className="p-10 text-center space-y-4 my-auto">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto animate-bounce shadow-md">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="font-bold text-xl text-slate-900">Middleman Agent Booked Successfully!</h4>
            <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
              <strong>{selectedAgent.name}</strong> ({selectedAgent.role}) has been assigned to your appointment on <strong>{appointmentDate}</strong> ({timeSlot}). The agent will call your number ({buyerPhone}) to coordinate meeting logistics.
            </p>
            <div className="inline-flex items-center gap-2 bg-slate-100 px-4 py-2 rounded-xl text-xs font-mono font-bold text-slate-700">
              Booking Ref: APT-{Date.now().toString().slice(-6)}
            </div>
          </div>
        ) : (
          <form onSubmit={handleBook} className="p-6 overflow-y-auto space-y-6 flex-1 text-xs">
            
            {/* Plot Quick Header */}
            <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={property.images[0]}
                  alt={property.title}
                  className="w-12 h-12 rounded-xl object-cover border border-slate-200 shrink-0"
                />
                <div>
                  <h4 className="font-bold text-xs text-slate-900 line-clamp-1">{property.title}</h4>
                  <p className="text-[11px] text-slate-500">
                    {property.locality}, {property.city} • Survey No: <strong className="font-mono text-slate-700">{property.surveyNumber}</strong>
                  </p>
                </div>
              </div>

              <div className="text-right shrink-0">
                <span className="font-black text-emerald-700 text-sm">{formatPrice(property.price)}</span>
                <span className="text-[10px] text-slate-400 block">{property.plotSize} {property.sizeUnit}</span>
              </div>
            </div>

            {/* Step 1: Select Verified Middleman Agent */}
            <div>
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2.5">
                1. Select Verified Local Middleman Agent
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {agents.map((ag) => (
                  <div
                    key={ag.id}
                    onClick={() => setSelectedAgentId(ag.id)}
                    className={`p-3.5 rounded-2xl border-2 cursor-pointer transition-all flex items-start gap-3 relative ${
                      selectedAgentId === ag.id
                        ? 'border-indigo-600 bg-indigo-50/60 shadow-md ring-2 ring-indigo-500/20'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <img
                      src={ag.avatar}
                      alt={ag.name}
                      className="w-12 h-12 rounded-xl object-cover border border-slate-200 shrink-0"
                    />

                    <div className="flex-1 space-y-0.5">
                      <div className="flex items-center justify-between">
                        <h4 className="font-bold text-slate-900 text-xs">{ag.name}</h4>
                        <span className="font-bold text-emerald-700 text-xs font-mono">₹{ag.serviceFee}</span>
                      </div>

                      <span className="text-[10px] text-indigo-700 font-semibold block">{ag.role}</span>

                      <div className="flex items-center gap-2 text-[10px] text-slate-500">
                        <span className="flex items-center gap-0.5 text-amber-600 font-bold">
                          <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                          {ag.rating}
                        </span>
                        <span>•</span>
                        <span>{ag.totalVisitsCompleted} visits done</span>
                      </div>

                      <div className="flex flex-wrap gap-1 pt-1">
                        <span className="text-[9px] bg-slate-100 text-slate-700 px-1.5 py-0.2 rounded font-medium">
                          {ag.languages.join(', ')}
                        </span>
                      </div>
                    </div>

                    {selectedAgentId === ag.id && (
                      <div className="w-4 h-4 rounded-full bg-indigo-600 text-white flex items-center justify-center absolute top-2 right-2">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Step 2: Choose Visit Type */}
            <div>
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                2. Select Service & Visit Scope
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {visitTypes.map((vt, i) => (
                  <div
                    key={i}
                    onClick={() => setVisitType(vt.title)}
                    className={`p-3 rounded-xl border cursor-pointer transition-all ${
                      visitType === vt.title
                        ? 'border-indigo-600 bg-indigo-50/50 shadow-xs ring-1 ring-indigo-500'
                        : 'border-slate-200 bg-white hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex justify-between items-center mb-1">
                      <strong className="text-slate-900 text-xs font-bold">{vt.title}</strong>
                      <span className="font-bold text-indigo-800 font-mono">₹{vt.fee}</span>
                    </div>
                    <p className="text-[11px] text-slate-500">{vt.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Step 3: Schedule Date, Time Slot & Meeting Point */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-indigo-600" />
                  Visit Date *
                </label>
                <input
                  type="date"
                  required
                  value={appointmentDate}
                  onChange={(e) => setAppointmentDate(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs font-semibold text-slate-800 focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-indigo-600" />
                  Time Slot *
                </label>
                <select
                  value={timeSlot}
                  onChange={(e) => setTimeSlot(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs font-semibold text-slate-800 focus:ring-2 focus:ring-indigo-500"
                >
                  {timeSlots.map((ts, idx) => (
                    <option key={idx} value={ts}>{ts}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-indigo-600" />
                  Meeting Point
                </label>
                <select
                  value={meetingPoint}
                  onChange={(e) => setMeetingPoint(e.target.value as any)}
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs font-semibold text-slate-800 focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="At Plot Location">Directly at Plot Location</option>
                  <option value="Nearest Landmark">At Nearest Highway Landmark</option>
                  <option value="Buyer Pickup">Local Sub-Registrar Office</option>
                </select>
              </div>
            </div>

            {/* Step 4: Buyer Details & Instructions */}
            <div className="space-y-3">
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
                3. Your Contact Details & Special Instructions
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <input
                    type="text"
                    required
                    placeholder="Full Name *"
                    value={buyerName}
                    onChange={(e) => setBuyerName(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs"
                  />
                </div>
                <div>
                  <input
                    type="tel"
                    required
                    placeholder="Phone / WhatsApp *"
                    value={buyerPhone}
                    onChange={(e) => setBuyerPhone(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="Email Address"
                    value={buyerEmail}
                    onChange={(e) => setBuyerEmail(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs"
                  />
                </div>
              </div>

              <div>
                <textarea
                  rows={2}
                  placeholder="Special instructions for the middleman agent (e.g. Bring measuring tape, check boundary stone 118/2, verify road setback)..."
                  value={specialInstructions}
                  onChange={(e) => setSpecialInstructions(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-800 focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            {/* Footer Summary & Book Button */}
            <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Estimated Middleman Fee</span>
                <div className="text-lg font-black text-slate-900 font-mono">
                  ₹{selectedAgent.serviceFee} <span className="text-xs text-slate-400 font-normal">(Pay after site visit)</span>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 rounded-xl text-slate-600 hover:bg-slate-100 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-indigo-600/25 transition-all transform hover:-translate-y-0.5"
                >
                  <UserCheck className="w-4 h-4" />
                  Confirm Agent Booking
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
