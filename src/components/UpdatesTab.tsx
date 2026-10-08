import React, { useState } from 'react';
import {
  Zap,
  GraduationCap,
  AlertTriangle,
  Building2,
  Store,
  Clock,
  MapPin,
  Heart,
  Share2,
  PlusCircle,
  Search,
  CheckCircle2,
  Info
} from 'lucide-react';
import { LocalUpdate, UpdateCategory } from '../types';

interface UpdatesTabProps {
  updates: LocalUpdate[];
  onAddUpdate: () => void;
  onLikeUpdate: (id: string) => void;
  onSelectUpdate: (update: LocalUpdate) => void;
}

export const UpdatesTab: React.FC<UpdatesTabProps> = ({
  updates,
  onAddUpdate,
  onLikeUpdate,
  onSelectUpdate,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categories: { id: string; label: string; icon: React.ReactNode }[] = [
    { id: 'all', label: 'All Feeds', icon: <Info className="w-3.5 h-3.5" /> },
    { id: 'power', label: 'INEC Power', icon: <Zap className="w-3.5 h-3.5 text-amber-400" /> },
    { id: 'mmsu', label: 'MMSU Campus', icon: <GraduationCap className="w-3.5 h-3.5 text-emerald-400" /> },
    { id: 'emergency', label: 'Weather & Safety', icon: <AlertTriangle className="w-3.5 h-3.5 text-rose-400" /> },
    { id: 'barangay', label: 'Quiling Sur Bgy', icon: <Building2 className="w-3.5 h-3.5 text-blue-400" /> },
    { id: 'market', label: 'Food & Events', icon: <Store className="w-3.5 h-3.5 text-purple-400" /> },
  ];

  const filteredUpdates = updates.filter((item) => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesQuery =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  const handleShare = (update: LocalUpdate) => {
    if (navigator.share) {
      navigator.share({
        title: update.title,
        text: `${update.title} - ${update.summary}`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(`${update.title}: ${update.summary}`);
      setCopiedId(update.id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  const getCategoryBadge = (category: UpdateCategory) => {
    switch (category) {
      case 'power':
        return { label: 'INEC Power', color: 'bg-amber-500/15 text-amber-300 border-amber-500/30' };
      case 'mmsu':
        return { label: 'MMSU Notice', color: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30' };
      case 'emergency':
        return { label: 'CDRRMO Weather', color: 'bg-rose-500/15 text-rose-300 border-rose-500/30' };
      case 'barangay':
        return { label: 'Brgy. Quiling Sur', color: 'bg-blue-500/15 text-blue-300 border-blue-500/30' };
      case 'market':
        return { label: 'Batac Local', color: 'bg-purple-500/15 text-purple-300 border-purple-500/30' };
      default:
        return { label: 'General', color: 'bg-slate-700 text-slate-300 border-slate-600' };
    }
  };

  return (
    <div className="space-y-4 pb-20">
      {/* Featured Alert Banner (INEC or Critical Alert) */}
      <div className="bg-gradient-to-r from-amber-950/70 via-slate-900 to-slate-900 border border-amber-500/40 rounded-2xl p-4 shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />
        <div className="flex items-start gap-3">
          <div className="p-2.5 bg-amber-500/20 text-amber-400 rounded-xl border border-amber-500/30 flex-shrink-0 mt-0.5">
            <Zap className="w-5 h-5 animate-pulse" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-500 text-slate-950">
                Scheduled Power Notice
              </span>
              <span className="text-xs text-amber-300/80">INEC Batac Feeder 2</span>
            </div>
            <h3 className="font-bold text-white text-sm mt-1 leading-snug">
              Upcoming Saturday Maintenance in Quiling Sur & MMSU Perimeter
            </h3>
            <p className="text-xs text-slate-300 mt-1 line-clamp-2">
              Power interruption from 8:00 AM to 5:00 PM for transformer upgrades. Note: Villa Mariano & Scholar Haven dorms have standby generator systems.
            </p>
          </div>
        </div>
      </div>

      {/* Search and Report Bar */}
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search power, MMSU exams, weather..."
            className="w-full bg-slate-900/90 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
          />
        </div>
        <button
          onClick={onAddUpdate}
          className="flex items-center gap-1.5 px-3 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-semibold shadow-md active:scale-95 transition flex-shrink-0"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Post Notice</span>
        </button>
      </div>

      {/* Category Pills (Material You Style Filter Chips) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none no-scrollbar">
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all border ${
                isSelected
                  ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-md font-bold'
                  : 'bg-slate-900/80 text-slate-300 border-slate-800 hover:border-slate-700'
              }`}
            >
              {cat.icon}
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Updates Feed */}
      <div className="space-y-3">
        {filteredUpdates.length === 0 ? (
          <div className="text-center py-12 bg-slate-900/50 rounded-2xl border border-slate-800/80 p-6">
            <Info className="w-10 h-10 text-slate-600 mx-auto mb-2" />
            <p className="text-slate-300 font-medium text-sm">No updates found</p>
            <p className="text-slate-500 text-xs mt-1">Try clearing your search query or selecting another category.</p>
          </div>
        ) : (
          filteredUpdates.map((update) => {
            const badge = getCategoryBadge(update.category);
            return (
              <div
                key={update.id}
                className="bg-slate-900/80 border border-slate-800/80 hover:border-slate-700/80 rounded-2xl p-4 shadow-sm transition hover:shadow-md relative overflow-hidden"
              >
                {/* Header row */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${badge.color}`}>
                      {badge.label}
                    </span>
                    {update.urgency === 'high' && (
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-400 border border-rose-500/30">
                        High Priority
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1 text-[11px] text-slate-400">
                    <Clock className="w-3 h-3" />
                    <span>{update.timestamp}</span>
                  </div>
                </div>

                {/* Title */}
                <h4
                  onClick={() => onSelectUpdate(update)}
                  className="font-bold text-white text-sm mt-2.5 hover:text-emerald-300 cursor-pointer leading-snug"
                >
                  {update.title}
                </h4>

                {/* Summary / Body */}
                <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
                  {update.summary}
                </p>

                {/* Location & Source */}
                <div className="mt-3 pt-2.5 border-t border-slate-800/60 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-400">
                  <div className="flex items-center gap-1 text-slate-300">
                    <MapPin className="w-3 h-3 text-emerald-400 flex-shrink-0" />
                    <span className="truncate max-w-[180px] sm:max-w-none">{update.location}</span>
                  </div>
                  <span className="text-slate-500 text-[10px]">Via {update.source}</span>
                </div>

                {/* Footer interactive actions */}
                <div className="mt-3 flex items-center justify-between pt-2 border-t border-slate-800/40">
                  <button
                    onClick={() => onSelectUpdate(update)}
                    className="text-xs font-semibold text-emerald-400 hover:text-emerald-300"
                  >
                    Read full advisory →
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onLikeUpdate(update.id)}
                      className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-800/70 hover:bg-slate-750 text-slate-300 hover:text-rose-400 text-xs transition"
                    >
                      <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400/30" />
                      <span>{update.likes}</span>
                    </button>
                    <button
                      onClick={() => handleShare(update)}
                      className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-800/70 hover:bg-slate-750 text-slate-300 hover:text-white text-xs transition"
                    >
                      {copiedId === update.id ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400">Copied</span>
                        </>
                      ) : (
                        <>
                          <Share2 className="w-3.5 h-3.5" />
                          <span>Share</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
