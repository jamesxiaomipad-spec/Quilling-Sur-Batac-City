import React from 'react';
import { X, Clock, MapPin, Share2, CheckCircle2, Heart, AlertTriangle, Zap, Building2, GraduationCap, Store } from 'lucide-react';
import { LocalUpdate } from '../types';

interface UpdateDetailModalProps {
  update: LocalUpdate | null;
  onClose: () => void;
  onLike: (id: string) => void;
}

export const UpdateDetailModal: React.FC<UpdateDetailModalProps> = ({
  update,
  onClose,
  onLike,
}) => {
  const [copied, setCopied] = React.useState(false);

  if (!update) return null;

  const handleShare = () => {
    navigator.clipboard.writeText(`${update.title}\n\n${update.content}\n\nSource: ${update.source}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'power':
        return <Zap className="w-5 h-5 text-amber-400" />;
      case 'mmsu':
        return <GraduationCap className="w-5 h-5 text-emerald-400" />;
      case 'emergency':
        return <AlertTriangle className="w-5 h-5 text-rose-400" />;
      case 'barangay':
        return <Building2 className="w-5 h-5 text-blue-400" />;
      default:
        return <Store className="w-5 h-5 text-purple-400" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-800 w-full sm:max-w-lg rounded-t-3xl sm:rounded-2xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="px-5 py-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-slate-900 rounded-xl border border-slate-800">
              {getCategoryIcon(update.category)}
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                Official Advisory
              </span>
              <div className="flex items-center gap-1.5 text-xs text-slate-400">
                <Clock className="w-3 h-3" />
                <span>{update.timestamp}</span>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-slate-800 text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4 overflow-y-auto flex-1">
          <h2 className="text-base font-extrabold text-white leading-snug">
            {update.title}
          </h2>

          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span>Coverage Area: <strong>{update.location}</strong></span>
          </div>

          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Full Advisory Notice
            </h4>
            <p className="text-xs text-slate-200 whitespace-pre-line leading-relaxed bg-slate-950/60 p-4 rounded-xl border border-slate-800/80">
              {update.content}
            </p>
          </div>

          <div className="pt-2 border-t border-slate-800 text-xs text-slate-400 flex items-center justify-between">
            <span>Verified Source: <strong className="text-slate-200">{update.source}</strong></span>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950 flex items-center justify-between gap-2">
          <button
            onClick={() => onLike(update.id)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-200 text-xs font-semibold"
          >
            <Heart className="w-4 h-4 text-rose-400 fill-rose-400/20" />
            <span>{update.likes} Helpful</span>
          </button>

          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md"
          >
            {copied ? (
              <>
                <CheckCircle2 className="w-4 h-4" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Share2 className="w-4 h-4" />
                <span>Share Advisory</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
