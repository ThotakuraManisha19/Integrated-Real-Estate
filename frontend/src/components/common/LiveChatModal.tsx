import React, { useState } from 'react';
import { 
  X, 
  Send, 
  MessageSquare, 
  IndianRupee, 
  Calendar, 
  Phone, 
  CheckCircle2, 
  User, 
  Sparkles,
  Bot
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { PropertyItem, ChatMessage } from '../../types';
import { formatPrice } from '../../utils/formatters';

interface LiveChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  property: PropertyItem | null;
}

export const LiveChatModal: React.FC<LiveChatModalProps> = ({
  isOpen,
  onClose,
  property
}) => {
  const { chats, sendChatMessage, currentRole } = useApp();
  const [inputText, setInputText] = useState('');
  const [showOfferInput, setShowOfferInput] = useState(false);
  const [offerPrice, setOfferPrice] = useState<number>(property?.price ? Math.round(property.price * 0.95) : 5000000);

  if (!isOpen || !property) return null;

  const propertyChats = chats.filter(c => c.propertyId === property.id);

  const handleSend = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputText.trim()) return;

    sendChatMessage({
      propertyId: property.id,
      senderRole: currentRole === 'seller' ? 'seller' : 'buyer',
      senderName: currentRole === 'seller' ? property.seller.name : 'Buyer (You)',
      text: inputText.trim()
    });

    setInputText('');
  };

  const handleSendOffer = () => {
    sendChatMessage({
      propertyId: property.id,
      senderRole: 'buyer',
      senderName: 'Buyer (You)',
      text: `Formal Price Offer: I would like to offer ${formatPrice(offerPrice)} for this listing. Can we proceed?`,
      isOffer: true,
      offerAmount: offerPrice
    });
    setShowOfferInput(false);
  };

  const quickPrompts = [
    'Is the price negotiable?',
    'Can I view the DTCP/BDA layout sanction drawing?',
    'Are all 30-year mother deeds clear of litigation?',
    'Can we schedule an on-site physical visit this weekend?'
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-lg h-[88vh] flex flex-col overflow-hidden">
        
        {/* Top Chat Header */}
        <div className="bg-slate-900 text-white p-4 flex items-center justify-between border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src={property.seller.avatar}
                alt={property.seller.name}
                className="w-10 h-10 rounded-full object-cover border-2 border-emerald-500"
              />
              <span className="w-3 h-3 bg-emerald-500 rounded-full border-2 border-slate-900 absolute bottom-0 right-0"></span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-bold text-sm text-white">{property.seller.name}</h3>
                <span className="text-[9px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.2 rounded font-semibold">
                  Online
                </span>
              </div>
              <p className="text-[11px] text-slate-400 line-clamp-1">
                {property.title} ({formatPrice(property.price)})
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Message Log */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50 text-xs">
          <div className="text-center my-2">
            <span className="text-[10px] bg-slate-200 text-slate-600 px-2.5 py-1 rounded-full font-mono">
              Direct Encrypted Chat with Listing Owner
            </span>
          </div>

          {propertyChats.length > 0 ? (
            propertyChats.map((msg) => {
              const isMe = (currentRole === 'seller' && msg.senderRole === 'seller') || 
                           (currentRole !== 'seller' && msg.senderRole === 'buyer');

              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
                >
                  <span className="text-[10px] text-slate-400 mb-0.5 px-1 font-semibold">
                    {msg.senderName} • {msg.timestamp}
                  </span>
                  
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl shadow-xs leading-relaxed ${
                      isMe
                        ? 'bg-emerald-600 text-white rounded-tr-none'
                        : 'bg-white text-slate-800 border border-slate-200 rounded-tl-none'
                    } ${msg.isOffer ? 'border-2 border-amber-400 bg-amber-50 text-amber-900 font-semibold' : ''}`}
                  >
                    {msg.text}

                    {msg.isOffer && msg.offerAmount && (
                      <div className="mt-2 pt-2 border-t border-amber-300 flex items-center justify-between text-xs font-bold text-emerald-800">
                        <span>Offer Amount:</span>
                        <span>{formatPrice(msg.offerAmount)}</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-10 text-slate-400">
              <MessageSquare className="w-10 h-10 text-slate-300 mx-auto mb-2" />
              <p className="font-semibold text-slate-600">Start the conversation</p>
              <p className="text-[11px] text-slate-400">Ask about plot boundary, deeds, or negotiate price.</p>
            </div>
          )}
        </div>

        {/* Quick Question Chips */}
        <div className="p-2 bg-white border-t border-slate-200 overflow-x-auto flex gap-1.5 shrink-0">
          {quickPrompts.map((q, idx) => (
            <button
              key={idx}
              onClick={() => {
                setInputText(q);
              }}
              className="px-2.5 py-1 bg-slate-100 hover:bg-emerald-50 text-slate-700 hover:text-emerald-800 rounded-lg text-[11px] whitespace-nowrap transition-colors border border-slate-200"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Offer Input Drawer */}
        {showOfferInput && (
          <div className="p-3 bg-amber-50 border-t border-amber-200 flex items-center justify-between gap-3 text-xs">
            <div>
              <span className="font-bold text-amber-900 block">Propose Price Offer (₹)</span>
              <span className="text-[10px] text-amber-700">Asking: {formatPrice(property.price)}</span>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                step="50000"
                value={offerPrice}
                onChange={(e) => setOfferPrice(parseFloat(e.target.value) || 0)}
                className="w-32 px-2.5 py-1 bg-white border border-amber-300 rounded-lg font-bold text-slate-900"
              />
              <button
                onClick={handleSendOffer}
                className="px-3 py-1 bg-amber-600 text-white rounded-lg font-bold hover:bg-amber-700"
              >
                Send Offer
              </button>
            </div>
          </div>
        )}

        {/* Bottom Input Box */}
        <form onSubmit={handleSend} className="p-3 bg-white border-t border-slate-200 flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => setShowOfferInput(!showOfferInput)}
            className="p-2 rounded-xl bg-amber-50 text-amber-700 hover:bg-amber-100 border border-amber-200 transition-colors shrink-0 font-bold text-xs flex items-center gap-1"
            title="Make Official Price Offer"
          >
            <IndianRupee className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Offer</span>
          </button>

          <input
            type="text"
            placeholder="Type your message to owner..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="flex-1 px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
          />

          <button
            type="submit"
            className="p-2.5 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 transition-colors shadow-sm shrink-0"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
