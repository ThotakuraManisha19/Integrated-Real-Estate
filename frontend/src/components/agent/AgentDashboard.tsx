import React, { useState } from 'react';
import { 
  UserCheck, 
  Calendar, 
  Clock, 
  MapPin, 
  Phone, 
  CheckCircle2, 
  Navigation, 
  FileCheck, 
  AlertCircle, 
  Star, 
  ShieldCheck, 
  DollarSign, 
  TrendingUp, 
  Eye, 
  Layers, 
  Check, 
  X, 
  Car,
  FileText,
  Sparkles,
  Camera
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Appointment, MiddlemanAgent, SiteInspectionReport } from '../../types';
import { formatPrice } from '../../utils/formatters';

export const AgentDashboard: React.FC = () => {
  const { 
    agents, 
    appointments, 
    updateAppointmentStatus, 
    submitInspectionReport, 
    setSelectedProperty, 
    properties,
    addToast 
  } = useApp();

  const [activeAgentId, setActiveAgentId] = useState<string>('agent-1');
  const [activeTab, setActiveTab] = useState<'upcoming' | 'pending' | 'completed'>('upcoming');
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [reportAppointment, setReportAppointment] = useState<Appointment | null>(null);
  const [viewReportModalApt, setViewReportModalApt] = useState<Appointment | null>(null);

  // Inspection Report Form State
  const [boundaryStoneVerified, setBoundaryStoneVerified] = useState(true);
  const [boundaryNotes, setBoundaryNotes] = useState('All 4 corner boundary stones matching cadastral map were located and verified in intact condition.');
  const [measuredRoadWidth, setMeasuredRoadWidth] = useState(40);
  const [roadCondition, setRoadCondition] = useState('40 ft wide CC concrete road in excellent condition with roadside curbs.');
  const [groundCondition, setGroundCondition] = useState<'Level & Clean' | 'Overgrown Vegetation' | 'Waterlogged' | 'Sloped / Undulated' | 'Excavated'>('Level & Clean');
  const [waterElectricityVerified, setWaterElectricityVerified] = useState(true);
  const [disputeSignsFound, setDisputeSignsFound] = useState(false);
  const [inspectorNotes, setInspectorNotes] = useState('Ground inspection completed with buyer present. Plot has clear demarcations, fertile soil bed, and active electric connection point.');
  const [groundPhotos, setGroundPhotos] = useState<string[]>([
    'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80'
  ]);

  const activeAgent = agents.find(a => a.id === activeAgentId) || agents[0];
  const agentAppointments = appointments.filter(a => a.agentId === activeAgent.id);

  const upcomingVisits = agentAppointments.filter(a => a.status === 'confirmed' || a.status === 'en_route' || a.status === 'checked_in');
  const pendingRequests = agentAppointments.filter(a => a.status === 'pending');
  const completedVisits = agentAppointments.filter(a => a.status === 'completed');

  const totalEarnings = completedVisits.reduce((acc, curr) => acc + (curr.serviceFee || 799), 0);

  const handleOpenReportModal = (apt: Appointment) => {
    setReportAppointment(apt);
    setMeasuredRoadWidth(40);
    setIsReportModalOpen(true);
  };

  const handleSaveReport = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reportAppointment) return;

    submitInspectionReport(reportAppointment.id, {
      boundaryStoneVerified,
      boundaryNotes,
      measuredRoadWidth,
      roadCondition,
      groundCondition,
      waterElectricityVerified,
      disputeSignsFound,
      inspectorNotes,
      groundPhotos,
      verificationScore: 98
    });

    setIsReportModalOpen(false);
    setReportAppointment(null);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Top Banner & Middleman Profile */}
      <div className="bg-gradient-to-r from-indigo-950 via-slate-900 to-indigo-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6 border border-indigo-900/50">
        <div className="flex items-start sm:items-center gap-4">
          <div className="relative shrink-0">
            <img
              src={activeAgent.avatar}
              alt={activeAgent.name}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-indigo-400 shadow-md"
            />
            <span className="w-4 h-4 bg-emerald-500 rounded-full border-2 border-slate-900 absolute -bottom-1 -right-1" />
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 uppercase tracking-wider">
                {activeAgent.badge}
              </span>
              <span className="text-xs text-emerald-400 font-bold flex items-center gap-1">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                {activeAgent.rating} ({activeAgent.reviewCount} Reviews)
              </span>
            </div>

            <h1 className="text-xl sm:text-2xl font-black font-heading text-white">
              {activeAgent.name}
            </h1>

            <p className="text-slate-300 text-xs">
              {activeAgent.role} • Territories: <strong className="text-white">{activeAgent.territoryCities.join(', ')}</strong> • Fee: <strong className="text-emerald-400 font-mono">₹{activeAgent.serviceFee}/visit</strong>
            </p>
          </div>
        </div>

        {/* Switch Active Agent demo profile */}
        <div className="bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/10 flex flex-col gap-1.5 shrink-0 text-xs">
          <span className="text-[10px] uppercase font-bold text-indigo-200">Switch Middleman Agent Profile</span>
          <select
            value={activeAgentId}
            onChange={(e) => setActiveAgentId(e.target.value)}
            className="px-3 py-1.5 bg-slate-900/90 text-white border border-indigo-400/30 rounded-xl font-bold focus:outline-none"
          >
            {agents.map((ag) => (
              <option key={ag.id} value={ag.id}>
                {ag.name} ({ag.role})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase">Assigned Visits</span>
            <Calendar className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="text-2xl font-black text-slate-900 font-heading">{agentAppointments.length}</div>
          <span className="text-[11px] text-indigo-600 font-semibold">{upcomingVisits.length} Scheduled</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase">Pending Requests</span>
            <Clock className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-black text-amber-600 font-heading">{pendingRequests.length}</div>
          <span className="text-[11px] text-amber-600 font-semibold">Requires acceptance</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase">Completed Reports</span>
            <FileCheck className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-black text-emerald-700 font-heading">{completedVisits.length}</div>
          <span className="text-[11px] text-emerald-600 font-semibold">On-site reports filed</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase">Total Earnings</span>
            <TrendingUp className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-black text-slate-900 font-heading">₹{totalEarnings.toLocaleString()}</div>
          <span className="text-[11px] text-slate-500">Service fees collected</span>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-3">
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('upcoming')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'upcoming'
                ? 'bg-slate-900 text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            Active & Upcoming Visits ({upcomingVisits.length})
          </button>

          <button
            onClick={() => setActiveTab('pending')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'pending'
                ? 'bg-amber-500 text-slate-950 font-black shadow-sm'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            Pending Booking Requests ({pendingRequests.length})
          </button>

          <button
            onClick={() => setActiveTab('completed')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'completed'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <FileCheck className="w-3.5 h-3.5" />
            Completed Visits & Reports ({completedVisits.length})
          </button>
        </div>
      </div>

      {/* TAB 1: ACTIVE & UPCOMING SITE VISITS */}
      {activeTab === 'upcoming' && (
        <div className="space-y-4">
          {upcomingVisits.length > 0 ? (
            upcomingVisits.map((apt) => (
              <div
                key={apt.id}
                className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-5 hover:border-slate-300 transition-all"
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                      apt.status === 'en_route'
                        ? 'bg-blue-100 text-blue-800 animate-pulse'
                        : apt.status === 'checked_in'
                        ? 'bg-purple-100 text-purple-800'
                        : 'bg-emerald-100 text-emerald-800'
                    }`}>
                      {apt.status === 'en_route' ? '🚗 En Route to Plot' :
                       apt.status === 'checked_in' ? '📍 Checked-In on Site' : 'Confirmed'}
                    </span>
                    <span className="text-[11px] font-bold bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-md">
                      {apt.visitType}
                    </span>
                    <span className="font-mono text-slate-400 text-xs">Ref: {apt.id}</span>
                  </div>

                  <h3 className="font-bold text-base text-slate-900 leading-snug">
                    {apt.propertyTitle}
                  </h3>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600">
                    <span className="flex items-center gap-1 font-semibold text-slate-800">
                      <Calendar className="w-3.5 h-3.5 text-indigo-600" />
                      {apt.appointmentDate} ({apt.timeSlot})
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      {apt.meetingPoint}: {apt.propertyAddress}
                    </span>
                    <span className="font-mono text-slate-700">
                      Survey: <strong>{apt.surveyNumber}</strong> • {apt.plotSize} {apt.sizeUnit}
                    </span>
                  </div>

                  {apt.specialInstructions && (
                    <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-700 italic">
                      Buyer Notes: "{apt.specialInstructions}"
                    </div>
                  )}

                  <div className="flex items-center gap-4 text-xs pt-1">
                    <span className="text-slate-500">
                      Buyer: <strong className="text-slate-800">{apt.buyerName}</strong>
                    </span>
                    <a
                      href={`tel:${apt.buyerPhone}`}
                      className="text-indigo-600 font-bold hover:underline flex items-center gap-1"
                    >
                      <Phone className="w-3 h-3" /> {apt.buyerPhone}
                    </a>
                  </div>
                </div>

                {/* Middleman Agent Action Buttons */}
                <div className="flex flex-col sm:flex-row lg:flex-col items-end gap-2 shrink-0 border-t lg:border-t-0 pt-3 lg:pt-0">
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 uppercase font-bold block">Middleman Fee</span>
                    <span className="text-base font-black text-emerald-700 font-mono">₹{apt.serviceFee}</span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {apt.status === 'confirmed' && (
                      <button
                        onClick={() => updateAppointmentStatus(apt.id, 'en_route')}
                        className="px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm transition-colors"
                      >
                        <Car className="w-3.5 h-3.5" /> Start Travel / En Route
                      </button>
                    )}

                    {apt.status === 'en_route' && (
                      <button
                        onClick={() => updateAppointmentStatus(apt.id, 'checked_in')}
                        className="px-3.5 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm transition-colors"
                      >
                        <MapPin className="w-3.5 h-3.5" /> Check-in at Plot
                      </button>
                    )}

                    {(apt.status === 'checked_in' || apt.status === 'confirmed' || apt.status === 'en_route') && (
                      <button
                        onClick={() => handleOpenReportModal(apt)}
                        className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-black flex items-center gap-1.5 shadow-md shadow-emerald-600/20 transition-all"
                      >
                        <FileCheck className="w-3.5 h-3.5" /> Submit Inspection Report
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
              <Calendar className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h3 className="font-bold text-base text-slate-800">No active visits scheduled</h3>
              <p className="text-xs text-slate-500 mt-1">
                New buyer plot viewing requests will appear here once accepted.
              </p>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: PENDING BOOKING REQUESTS */}
      {activeTab === 'pending' && (
        <div className="space-y-4">
          {pendingRequests.length > 0 ? (
            pendingRequests.map((apt) => (
              <div
                key={apt.id}
                className="bg-amber-50/40 rounded-2xl border border-amber-200 p-5 flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500 text-slate-950 uppercase">
                      New Booking Request
                    </span>
                    <span className="font-bold text-xs text-indigo-700">{apt.visitType}</span>
                  </div>

                  <h3 className="font-bold text-base text-slate-900">{apt.propertyTitle}</h3>
                  <p className="text-xs text-slate-600">
                    Requested Date: <strong className="text-slate-900">{apt.appointmentDate}</strong> ({apt.timeSlot})
                  </p>
                  <p className="text-xs text-slate-500">
                    Buyer: <strong className="text-slate-800">{apt.buyerName}</strong> ({apt.buyerPhone})
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => updateAppointmentStatus(apt.id, 'cancelled')}
                    className="px-4 py-2 bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 text-xs font-bold rounded-xl transition-colors"
                  >
                    Decline
                  </button>
                  <button
                    onClick={() => updateAppointmentStatus(apt.id, 'confirmed')}
                    className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black rounded-xl shadow-md transition-colors flex items-center gap-1.5"
                  >
                    <Check className="w-4 h-4" /> Accept Appointment
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
              <Clock className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h3 className="font-bold text-base text-slate-800">No pending booking requests</h3>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: COMPLETED VISITS & FILED INSPECTION REPORTS */}
      {activeTab === 'completed' && (
        <div className="space-y-4">
          {completedVisits.length > 0 ? (
            completedVisits.map((apt) => (
              <div
                key={apt.id}
                className="bg-white rounded-2xl border border-slate-200 p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 uppercase flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Completed & Certified
                    </span>
                    <span className="text-xs text-slate-500">Visited on {apt.appointmentDate}</span>
                  </div>

                  <h3 className="font-bold text-base text-slate-900">{apt.propertyTitle}</h3>
                  <p className="text-xs text-slate-600">
                    Client: {apt.buyerName} • Survey Stone Demarcation Verified
                  </p>

                  {apt.inspectionReport && (
                    <div className="flex flex-wrap gap-3 pt-1 text-[11px] text-slate-700">
                      <span>✓ Boundary Stones: <strong>Verified</strong></span>
                      <span>✓ Measured Road: <strong>{apt.inspectionReport.measuredRoadWidth} Ft</strong></span>
                      <span>✓ Condition: <strong>{apt.inspectionReport.groundCondition}</strong></span>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => setViewReportModalApt(apt)}
                    className="px-4 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5"
                  >
                    <FileCheck className="w-4 h-4" /> View Inspection Dossier
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
              <FileCheck className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h3 className="font-bold text-base text-slate-800">No completed inspection reports yet</h3>
            </div>
          )}
        </div>
      )}

      {/* MODAL: SUBMIT ON-GROUND INSPECTION REPORT */}
      {isReportModalOpen && reportAppointment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-2xl max-h-[92vh] flex flex-col overflow-hidden text-xs">
            
            {/* Modal Header */}
            <div className="bg-slate-900 text-white p-5 flex items-center justify-between border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-emerald-500/20 text-emerald-400 rounded-xl">
                  <FileCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-base">File Official On-Site Land Audit Report</h3>
                  <p className="text-slate-400 text-xs">{reportAppointment.propertyTitle}</p>
                </div>
              </div>

              <button
                onClick={() => setIsReportModalOpen(false)}
                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSaveReport} className="p-6 overflow-y-auto space-y-4 flex-1">
              
              {/* Boundary Stone Check */}
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                <div>
                  <strong className="text-slate-900 block font-bold">1. Corner Boundary Stones Physically Located?</strong>
                  <span className="text-slate-500 text-[11px]">Matching cadastral/survey map stones</span>
                </div>
                <label className="flex items-center gap-2 cursor-pointer font-bold text-emerald-700">
                  <input
                    type="checkbox"
                    checked={boundaryStoneVerified}
                    onChange={(e) => setBoundaryStoneVerified(e.target.checked)}
                    className="w-5 h-5 text-emerald-600 rounded border-slate-300"
                  />
                  <span>Yes, Intact</span>
                </label>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                  Boundary Stones Notes
                </label>
                <input
                  type="text"
                  value={boundaryNotes}
                  onChange={(e) => setBoundaryNotes(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs"
                />
              </div>

              {/* Road Width Measurement */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                    Actual Measured Road Width (Feet) *
                  </label>
                  <input
                    type="number"
                    value={measuredRoadWidth}
                    onChange={(e) => setMeasuredRoadWidth(parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg font-bold text-slate-900 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                    Ground Topography / Condition
                  </label>
                  <select
                    value={groundCondition}
                    onChange={(e) => setGroundCondition(e.target.value as any)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg font-semibold text-slate-800"
                  >
                    <option value="Level & Clean">Level & Clean</option>
                    <option value="Overgrown Vegetation">Overgrown Vegetation</option>
                    <option value="Waterlogged">Waterlogged</option>
                    <option value="Sloped / Undulated">Sloped / Undulated</option>
                    <option value="Excavated">Excavated</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                  Road Surface Condition
                </label>
                <input
                  type="text"
                  value={roadCondition}
                  onChange={(e) => setRoadCondition(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs"
                />
              </div>

              {/* Utilities & Disputes */}
              <div className="grid grid-cols-2 gap-3">
                <label className="flex items-center gap-2 p-3 bg-slate-50 rounded-xl border border-slate-200 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={waterElectricityVerified}
                    onChange={(e) => setWaterElectricityVerified(e.target.checked)}
                    className="w-4 h-4 text-emerald-600 rounded"
                  />
                  <span className="font-semibold text-slate-800">Water / Power Line Verified</span>
                </label>

                <label className="flex items-center gap-2 p-3 bg-slate-50 rounded-xl border border-slate-200 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={disputeSignsFound}
                    onChange={(e) => setDisputeSignsFound(e.target.checked)}
                    className="w-4 h-4 text-red-600 rounded"
                  />
                  <span className="font-semibold text-slate-800">Any Encroachment Signs</span>
                </label>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                  Detailed Inspector Observations & Advice for Buyer
                </label>
                <textarea
                  rows={3}
                  value={inspectorNotes}
                  onChange={(e) => setInspectorNotes(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs"
                />
              </div>

              <div className="pt-3 border-t border-slate-200 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsReportModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold flex items-center gap-1.5 shadow-md"
                >
                  <Sparkles className="w-4 h-4" /> Submit Certified Audit Report
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* VIEW DOSSIER MODAL */}
      {viewReportModalApt && viewReportModalApt.inspectionReport && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-xl max-h-[90vh] flex flex-col overflow-hidden text-xs">
            <div className="bg-slate-900 text-white p-5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <h3 className="font-bold text-base">Certified Middleman Inspection Report</h3>
              </div>
              <button
                onClick={() => setViewReportModalApt(null)}
                className="p-1 rounded-lg bg-white/10 text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-4">
              <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-200 flex items-center justify-between">
                <div>
                  <span className="font-bold text-emerald-900 block text-sm">On-Site Verification Passed</span>
                  <span className="text-slate-600">Filed by {viewReportModalApt.agentName} ({viewReportModalApt.agentRole})</span>
                </div>
                <div className="text-lg font-black text-emerald-800 font-mono">98% Verified</div>
              </div>

              <div className="space-y-2">
                <div className="p-2.5 bg-slate-50 rounded-lg flex justify-between">
                  <span className="text-slate-500">Corner Boundary Stones:</span>
                  <strong className="text-emerald-700">Verified & Intact</strong>
                </div>
                <div className="p-2.5 bg-slate-50 rounded-lg flex justify-between">
                  <span className="text-slate-500">Measured Road Width:</span>
                  <strong className="text-slate-900">{viewReportModalApt.inspectionReport.measuredRoadWidth} Feet</strong>
                </div>
                <div className="p-2.5 bg-slate-50 rounded-lg flex justify-between">
                  <span className="text-slate-500">Ground Topography:</span>
                  <strong className="text-slate-900">{viewReportModalApt.inspectionReport.groundCondition}</strong>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <span className="font-bold text-slate-800 block mb-1">Inspector Notes:</span>
                  <p className="text-slate-600 italic">"{viewReportModalApt.inspectionReport.inspectorNotes}"</p>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 p-4 border-t border-slate-200 flex justify-end">
              <button
                onClick={() => setViewReportModalApt(null)}
                className="px-5 py-2 bg-slate-900 text-white rounded-xl font-bold"
              >
                Close Report
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
