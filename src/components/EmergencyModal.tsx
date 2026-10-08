import React from 'react';
import { ShieldAlert, Phone, X, AlertOctagon, MapPin, CheckCircle2 } from 'lucide-react';
import { EmergencyContact } from '../types';

interface EmergencyModalProps {
  isOpen: boolean;
  onClose: () => void;
  contacts: EmergencyContact[];
}

export const EmergencyModal: React.FC<EmergencyModalProps> = ({
  isOpen,
  onClose,
  contacts,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-800 w-full sm:max-w-lg rounded-t-3xl sm:rounded-2xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="px-5 py-4 bg-gradient-to-r from-rose-950 via-slate-900 to-slate-900 border-b border-rose-500/30 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-rose-500/20 text-rose-400 rounded-xl border border-rose-500/30">
              <ShieldAlert className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h3 className="font-extrabold text-white text-base">
                Emergency Hotlines & Rescue
              </h3>
              <p className="text-xs text-rose-300">Batac City & Quiling Sur Response</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-slate-800 text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Notice */}
        <div className="px-5 py-2.5 bg-rose-500/10 border-b border-rose-500/20 text-xs text-rose-200 flex items-center gap-2">
          <AlertOctagon className="w-4 h-4 flex-shrink-0 text-rose-400" />
          <span>Tap any telephone number to dial directly on your mobile device.</span>
        </div>

        {/* Contacts List */}
        <div className="p-4 space-y-3 overflow-y-auto flex-1">
          {contacts.map((contact) => (
            <div
              key={contact.id}
              className="bg-slate-950 border border-slate-800 rounded-xl p-3.5 space-y-2 hover:border-slate-700 transition"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h4 className="font-bold text-white text-xs">{contact.agency}</h4>
                  <div className="text-[10px] text-slate-400 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3 text-slate-500" />
                    <span>{contact.address}</span>
                  </div>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-800 text-emerald-400 border border-slate-700">
                  {contact.badge}
                </span>
              </div>

              <p className="text-[11px] text-slate-400 leading-tight">
                {contact.available}
              </p>

              {/* Action buttons */}
              <div className="pt-2 border-t border-slate-800/80 flex items-center gap-2">
                <a
                  href={`tel:${contact.phone.replace(/[^0-9+]/g, '')}`}
                  className="flex-1 flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs transition active:scale-95 shadow"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call {contact.phone}</span>
                </a>

                {contact.alternatePhone && (
                  <a
                    href={`tel:${contact.alternatePhone.replace(/[^0-9+]/g, '')}`}
                    className="flex items-center justify-center gap-1 py-1.5 px-3 rounded-lg bg-slate-800 hover:bg-slate-750 text-slate-200 text-xs font-semibold border border-slate-700 transition"
                  >
                    <span>Alt: {contact.alternatePhone}</span>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950 flex justify-end">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs"
          >
            Close Hotlines
          </button>
        </div>
      </div>
    </div>
  );
};
