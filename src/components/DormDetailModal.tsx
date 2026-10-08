import React, { useState } from 'react';
import {
  X,
  Phone,
  MessageSquare,
  MapPin,
  Clock,
  Star,
  Zap,
  Wifi,
  Flame,
  ShieldCheck,
  Check,
  Building,
  User,
  Send,
  Copy,
  CheckCircle2
} from 'lucide-react';
import { Dormitory } from '../types';

interface DormDetailModalProps {
  dorm: Dormitory | null;
  onClose: () => void;
  onCall: (phone: string, dormName: string) => void;
}

export const DormDetailModal: React.FC<DormDetailModalProps> = ({
  dorm,
  onClose,
  onCall,
}) => {
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [inquirerName, setInquirerName] = useState('');
  const [studentProgram, setStudentProgram] = useState('');
  const [targetDate, setTargetDate] = useState('Next Month');
  const [selectedRoomType, setSelectedRoomType] = useState<string>('');
  const [isCopied, setIsCopied] = useState(false);
  const [showInquiryForm, setShowInquiryForm] = useState(false);

  if (!dorm) return null;

  const activeRoom = dorm.roomOptions.find((r) => r.type === selectedRoomType) || dorm.roomOptions[0];

  const generatedInquiryMessage = `Hello ${dorm.landlord}, I saw your listing for ${dorm.name} in Quiling Sur on the Batac MMSU Hub app. My name is ${
    inquirerName || '[My Name]'
  }${studentProgram ? `, an MMSU student taking ${studentProgram}` : ''}. I would like to inquire about the ${
    activeRoom.type
  } (₱${activeRoom.priceMonthly}/mo). Are there still slots available for move-in around ${targetDate}? Thank you!`;

  const copyInquiry = () => {
    navigator.clipboard.writeText(generatedInquiryMessage);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const sendSMS = () => {
    const cleanPhone = dorm.phone.replace(/[^0-9+]/g, '');
    window.location.href = `sms:${cleanPhone}?body=${encodeURIComponent(
      generatedInquiryMessage
    )}`;
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-800 w-full sm:max-w-2xl rounded-t-3xl sm:rounded-2xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header Bar */}
        <div className="px-5 py-3.5 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              {dorm.purok}, Quiling Sur
            </span>
            <span className="text-xs text-slate-400">Batac City</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-slate-800 text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content body */}
        <div className="p-5 space-y-4 overflow-y-auto flex-1">
          {/* Main Photo Carousel */}
          <div className="space-y-2">
            <div className="relative h-56 w-full rounded-2xl overflow-hidden bg-slate-950 border border-slate-800">
              <img
                src={dorm.images[activeImageIdx] || dorm.images[0]}
                alt={dorm.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-3 left-3 bg-slate-950/80 backdrop-blur-md px-3 py-1 rounded-xl text-xs font-bold text-white border border-slate-700">
                Photo {activeImageIdx + 1} of {dorm.images.length}
              </div>
            </div>

            {/* Thumbnails */}
            {dorm.images.length > 1 && (
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {dorm.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIdx(idx)}
                    className={`h-14 w-20 rounded-xl overflow-hidden border-2 flex-shrink-0 transition ${
                      activeImageIdx === idx
                        ? 'border-emerald-400 scale-105'
                        : 'border-slate-800 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="thumb" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Title & Info */}
          <div>
            <div className="flex items-start justify-between gap-2">
              <div>
                <h2 className="text-lg font-black text-white">{dorm.name}</h2>
                <p className="text-xs text-slate-400 flex items-center gap-1 mt-1">
                  <MapPin className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                  <span>{dorm.address}</span>
                </p>
              </div>

              <div className="flex items-center gap-1 text-sm text-amber-400 font-bold bg-slate-950 px-2.5 py-1 rounded-xl border border-slate-800">
                <Star className="w-4 h-4 fill-amber-400" />
                <span>{dorm.rating}</span>
                <span className="text-slate-500 text-xs">({dorm.reviewCount})</span>
              </div>
            </div>

            <div className="mt-3 p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/30 flex items-center justify-between text-xs">
              <div className="flex items-center gap-1.5 text-emerald-300 font-semibold">
                <Clock className="w-4 h-4 text-emerald-400" />
                <span>{dorm.walkingMinutes} mins walk ({dorm.distanceToMMSU}) to {dorm.nearestCollege}</span>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400">
                Close to Campus
              </span>
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
              About the Boarding House
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              {dorm.description}
            </p>
          </div>

          {/* Room Options & Rates */}
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              Room Options & Monthly Rates
            </h4>
            <div className="space-y-2">
              {dorm.roomOptions.map((opt, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedRoomType(opt.type)}
                  className={`p-3 rounded-xl border transition cursor-pointer flex items-center justify-between gap-2 ${
                    activeRoom.type === opt.type
                      ? 'bg-emerald-950/40 border-emerald-500/60'
                      : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white text-xs">{opt.type}</span>
                      <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded ${
                        opt.slotsAvailable > 0
                          ? 'bg-emerald-500/20 text-emerald-300'
                          : 'bg-rose-500/20 text-rose-300'
                      }`}>
                        {opt.slotsAvailable > 0 ? `${opt.slotsAvailable} slots vacant` : 'Full'}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-0.5">{opt.inclusions}</p>
                  </div>

                  <div className="text-right flex-shrink-0">
                    <span className="text-sm font-extrabold text-emerald-400">
                      ₱{opt.priceMonthly.toLocaleString()}
                    </span>
                    <span className="text-[10px] text-slate-400 block">/month</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Key Amenities */}
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              Amenities & Inclusions
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {dorm.amenities.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 p-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-300"
                >
                  <Check className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                  <span className="text-[11px]">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* House Rules */}
          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs space-y-1">
            <span className="font-bold text-slate-300 block">House Rules & Curfew:</span>
            <p className="text-slate-400 text-[11px]">• Curfew: {dorm.curfew}</p>
            <p className="text-slate-400 text-[11px]">
              • Cooking: {dorm.cookingAllowed ? 'Allowed in designated kitchen space' : 'Not allowed (No burners inside rooms)'}
            </p>
            <p className="text-slate-400 text-[11px]">
              • Electricity: {dorm.submeteredPower ? 'Submetered electricity for heavy appliances (Aircon/Induction)' : 'Included in base rate for fans and laptops'}
            </p>
          </div>

          {/* Student Reviews */}
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              Tenant & Student Reviews ({dorm.reviews.length})
            </h4>
            <div className="space-y-2">
              {dorm.reviews.map((rev) => (
                <div
                  key={rev.id}
                  className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-1"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-white text-[11px]">{rev.author}</span>
                      <span className="text-[10px] text-emerald-400">• {rev.role}</span>
                    </div>
                    <div className="flex items-center gap-0.5 text-amber-400 text-[10px]">
                      <Star className="w-3 h-3 fill-amber-400" />
                      <span>{rev.rating}</span>
                    </div>
                  </div>
                  <p className="text-slate-300 text-[11px] leading-relaxed">{rev.comment}</p>
                  <span className="text-[10px] text-slate-500 block">{rev.date}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Automated Inquiry Generator */}
          <div className="border border-slate-800 rounded-2xl p-4 bg-slate-950 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                <span>Instant Inquire / Reserve Viewing</span>
              </h4>
              <button
                onClick={() => setShowInquiryForm(!showInquiryForm)}
                className="text-[11px] text-emerald-400 font-semibold hover:underline"
              >
                {showInquiryForm ? 'Hide Form' : 'Customize Inquiry'}
              </button>
            </div>

            {showInquiryForm && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <div>
                  <label className="text-[10px] text-slate-400 block mb-0.5">Your Name:</label>
                  <input
                    type="text"
                    value={inquirerName}
                    onChange={(e) => setInquirerName(e.target.value)}
                    placeholder="e.g. Juan dela Cruz"
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-slate-400 block mb-0.5">Course / College:</label>
                  <input
                    type="text"
                    value={studentProgram}
                    onChange={(e) => setStudentProgram(e.target.value)}
                    placeholder="e.g. BS Nursing, CAS"
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white"
                  />
                </div>
              </div>
            )}

            <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-[11px] text-slate-300 leading-relaxed font-mono">
              "{generatedInquiryMessage}"
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={copyInquiry}
                className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-750 text-white font-semibold text-xs border border-slate-700 transition"
              >
                {isCopied ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Text</span>
                  </>
                )}
              </button>
              <button
                onClick={sendSMS}
                className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send SMS to Landlord</span>
              </button>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950 flex items-center justify-between gap-3">
          <div className="text-xs">
            <span className="text-[10px] text-slate-500 block">Landlady / Landlord:</span>
            <span className="font-bold text-white text-xs">{dorm.landlord}</span>
            <span className="text-[11px] text-emerald-400 block">{dorm.phone}</span>
          </div>

          <button
            onClick={() => onCall(dorm.phone, dorm.name)}
            className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg active:scale-95 transition"
          >
            <Phone className="w-4 h-4" />
            <span>Call Landlord Now</span>
          </button>
        </div>
      </div>
    </div>
  );
};
