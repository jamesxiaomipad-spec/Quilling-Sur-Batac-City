import React from 'react';
import { ShieldAlert, MapPin, Smartphone, Monitor, CloudSun } from 'lucide-react';

interface AndroidTopBarProps {
  onOpenEmergency: () => void;
  onOpenMap: () => void;
  isFramed: boolean;
  onToggleFrame: () => void;
  unreadCount?: number;
}

export const AndroidTopBar: React.FC<AndroidTopBarProps> = ({
  onOpenEmergency,
  onOpenMap,
  isFramed,
  onToggleFrame,
}) => {
  return (
    <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-30 shadow-md">
      {/* Top Brand & Actions */}
      <div className="px-4 py-2.5 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-600 via-teal-500 to-amber-400 p-0.5 shadow-lg shadow-emerald-950/40 flex-shrink-0 flex items-center justify-center">
            <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
              <span className="text-emerald-400 font-extrabold text-lg tracking-tighter">QS</span>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="font-extrabold text-base tracking-tight text-white flex items-center gap-1">
                Quiling Sur Hub
              </h1>
              <span className="text-[10px] font-bold px-1.5 py-0.5 bg-emerald-500/20 text-emerald-400 rounded-md border border-emerald-500/30">
                BATAC
              </span>
            </div>
            <p className="text-[11px] text-slate-400 flex items-center gap-1">
              <span>Mariano Marcos State Univ.</span>
              <span className="text-slate-600">•</span>
              <span className="text-amber-400/90 font-medium">Ilocos Norte</span>
            </p>
          </div>
        </div>

        {/* Action icons */}
        <div className="flex items-center gap-1.5">
          {/* Emergency SOS button */}
          <button
            onClick={onOpenEmergency}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-rose-500/15 hover:bg-rose-500/25 border border-rose-500/30 text-rose-300 text-xs font-semibold transition active:scale-95 shadow-sm"
            title="Emergency Hotlines"
          >
            <ShieldAlert className="w-3.5 h-3.5 text-rose-400 animate-pulse" />
            <span className="hidden sm:inline">SOS</span>
          </button>

          {/* Interactive Map */}
          <button
            onClick={onOpenMap}
            className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-750 text-emerald-400 border border-slate-700/60 transition active:scale-95"
            title="Campus & Barangay Map"
          >
            <MapPin className="w-4 h-4" />
          </button>

          {/* Phone Frame Toggle (Desktop helper) */}
          <button
            onClick={onToggleFrame}
            className="hidden md:flex p-2 rounded-xl bg-slate-800/80 hover:bg-slate-750 text-slate-300 border border-slate-700/60 transition active:scale-95"
            title={isFramed ? 'Switch to Full Screen' : 'Switch to Android Frame'}
          >
            {isFramed ? <Monitor className="w-4 h-4 text-teal-400" /> : <Smartphone className="w-4 h-4 text-teal-400" />}
          </button>
        </div>
      </div>

      {/* Real-time mini status bar */}
      <div className="px-4 py-1.5 bg-slate-950/60 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-400 overflow-x-auto">
        <div className="flex items-center gap-2 whitespace-nowrap">
          <CloudSun className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
          <span>Batac: <strong className="text-slate-200">29°C Fair</strong> • River Level: <span className="text-emerald-400 font-medium">Normal</span></span>
        </div>
        <div className="flex items-center gap-2 text-[10px] text-slate-400 whitespace-nowrap pl-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
          <span className="text-slate-300">INEC Grid: Normal</span>
        </div>
      </div>
    </header>
  );
};
