import React, { useState, useEffect } from 'react';
import { X, Save, Layers, Trash2, Plus, FileText } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { FacingDirection, ApprovalStatus, SizeUnit, PropertyDocument } from '../../types';

export const EditListingModal: React.FC = () => {
  const { editingPropertyId, setEditingPropertyId, properties, updateProperty, deleteDocument, addDocument } = useApp();

  const property = properties.find(p => p.id === editingPropertyId);

  const [title, setTitle] = useState('');
  const [price, setPrice] = useState<number>(0);
  const [status, setStatus] = useState<'available' | 'under_offer' | 'sold'>('available');
  const [plotSize, setPlotSize] = useState<number>(0);
  const [facing, setFacing] = useState<FacingDirection>('East');
  const [roadWidth, setRoadWidth] = useState<number>(30);
  const [isCornerPlot, setIsCornerPlot] = useState(false);
  const [surveyNumber, setSurveyNumber] = useState('');
  const [approvalStatus, setApprovalStatus] = useState<ApprovalStatus>('RERA Approved');
  const [description, setDescription] = useState('');
  const [newDocName, setNewDocName] = useState('');

  useEffect(() => {
    if (property) {
      setTitle(property.title);
      setPrice(property.price);
      setStatus(property.status);
      setPlotSize(property.plotSize);
      setFacing(property.facing);
      setRoadWidth(property.roadWidth);
      setIsCornerPlot(property.isCornerPlot);
      setSurveyNumber(property.surveyNumber);
      setApprovalStatus(property.approvalStatus);
      setDescription(property.description);
    }
  }, [property]);

  if (!property || !editingPropertyId) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProperty(property.id, {
      title,
      price,
      status,
      plotSize,
      facing,
      roadWidth,
      isCornerPlot,
      surveyNumber,
      approvalStatus,
      description
    });
    setEditingPropertyId(null);
  };

  const handleAddDoc = () => {
    if (newDocName.trim()) {
      addDocument(property.id, {
        name: newDocName.trim(),
        type: 'layout_approval',
        fileUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
        status: 'pending',
        documentNumber: `DOC-${Date.now().toString().slice(-4)}`,
        fileSize: '3.6 MB'
      });
      setNewDocName('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-500/20 text-emerald-400 rounded-xl">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base">Edit Plot Listing</h3>
              <p className="text-xs text-slate-400">{property.title}</p>
            </div>
          </div>
          <button
            onClick={() => setEditingPropertyId(null)}
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSave} className="p-6 overflow-y-auto space-y-4 flex-1">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-semibold text-slate-800"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Asking Price (₹)
              </label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-bold text-slate-800 font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Listing Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as any)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-bold text-slate-800"
              >
                <option value="available">Available for Sale</option>
                <option value="under_offer">Under Offer / Token Paid</option>
                <option value="sold">Sold Out</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Facing
              </label>
              <select
                value={facing}
                onChange={(e) => setFacing(e.target.value as any)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-semibold text-slate-800"
              >
                <option value="North">North</option>
                <option value="East">East</option>
                <option value="West">West</option>
                <option value="South">South</option>
                <option value="North-East">North-East</option>
                <option value="North-West">North-West</option>
                <option value="South-East">South-East</option>
                <option value="South-West">South-West</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Road Width (Ft)
              </label>
              <input
                type="number"
                value={roadWidth}
                onChange={(e) => setRoadWidth(parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-semibold text-slate-800"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Survey Number
              </label>
              <input
                type="text"
                value={surveyNumber}
                onChange={(e) => setSurveyNumber(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-mono font-semibold text-slate-800"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Approval Authority
              </label>
              <select
                value={approvalStatus}
                onChange={(e) => setApprovalStatus(e.target.value as any)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-bold text-slate-800"
              >
                <option value="RERA Approved">RERA Approved</option>
                <option value="DTCP Approved">DTCP Approved</option>
                <option value="HMDA Approved">HMDA Approved</option>
                <option value="BDA Approved">BDA Approved</option>
                <option value="DC Converted">DC Converted</option>
                <option value="Agricultural Zone">Agricultural Zone</option>
              </select>
            </div>

            <div className="flex items-center pt-5">
              <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-800">
                <input
                  type="checkbox"
                  checked={isCornerPlot}
                  onChange={(e) => setIsCornerPlot(e.target.checked)}
                  className="w-4 h-4 text-emerald-600 rounded border-slate-300"
                />
                <span>Is Corner Plot</span>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              Description
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-800"
            />
          </div>

          {/* Document Management */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
            <h4 className="font-bold text-xs text-slate-800 uppercase tracking-wider">
              Manage Verification Documents ({property.documents?.length || 0})
            </h4>

            <div className="space-y-1.5">
              {property.documents?.map((d) => (
                <div key={d.id} className="flex items-center justify-between bg-white p-2.5 rounded-lg border border-slate-200 text-xs">
                  <span className="font-semibold text-slate-800 truncate">{d.name}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] uppercase font-bold text-slate-500">{d.status}</span>
                    <button
                      type="button"
                      onClick={() => deleteDocument(property.id, d.id)}
                      className="p-1 text-red-500 hover:text-red-700 rounded hover:bg-red-50"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-2 pt-1">
              <input
                type="text"
                placeholder="New Document Title..."
                value={newDocName}
                onChange={(e) => setNewDocName(e.target.value)}
                className="flex-1 px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs"
              />
              <button
                type="button"
                onClick={handleAddDoc}
                className="px-3 py-1.5 bg-slate-900 text-white rounded-lg text-xs font-bold"
              >
                + Add
              </button>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="pt-4 border-t border-slate-200 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setEditingPropertyId(null)}
              className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-md"
            >
              <Save className="w-4 h-4" /> Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
