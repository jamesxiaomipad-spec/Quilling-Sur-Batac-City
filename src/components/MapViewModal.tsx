import React, { useState } from 'react';
import {
  X,
  MapPin,
  Building,
  Home,
  UtensilsCrossed,
  ShieldAlert,
  ExternalLink,
  Navigation,
  Compass,
  Layers
} from 'lucide-react';

interface MapViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectDormById?: (id: string) => void;
}

interface MapMarker {
  id: string;
  name: string;
  category: 'college' | 'dorm' | 'food' | 'health' | 'landmark';
  x: number; // percentage from left (0 to 100)
  y: number; // percentage from top (0 to 100)
  description: string;
  walkFromCAS: string;
  query: string;
  dormId?: string;
}

export const MapViewModal: React.FC<MapViewModalProps> = ({
  isOpen,
  onClose,
  onSelectDormById,
}) => {
  const [selectedMarker, setSelectedMarker] = useState<MapMarker | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  if (!isOpen) return null;

  const markers: MapMarker[] = [
    {
      id: 'm-cas',
      name: 'MMSU College of Arts & Sciences (CAS)',
      category: 'college',
      x: 48,
      y: 42,
      description: 'Main academic center in Quiling Sur with the iconic CAS Canopy walkway and turnstiles.',
      walkFromCAS: '0 mins (Center)',
      query: 'MMSU College of Arts and Sciences Batac'
    },
    {
      id: 'm-coe',
      name: 'MMSU College of Engineering (COE)',
      category: 'college',
      x: 35,
      y: 50,
      description: 'Engineering complexes, laboratories, and computer center.',
      walkFromCAS: '4 mins walk',
      query: 'MMSU College of Engineering Batac'
    },
    {
      id: 'm-cafsd',
      name: 'MMSU CAFSD (Agriculture & Forestry)',
      category: 'college',
      x: 68,
      y: 35,
      description: 'Demo farms, Bioenergy Research center, and food processing laboratory.',
      walkFromCAS: '7 mins walk',
      query: 'MMSU CAFSD Batac'
    },
    {
      id: 'm-gate2',
      name: 'MMSU Gate 2 & Tricycle Terminal',
      category: 'landmark',
      x: 46,
      y: 34,
      description: 'Primary entrance connecting Quiling Sur to the campus, flanked by carinderias.',
      walkFromCAS: '2 mins walk',
      query: 'MMSU Gate 2 Batac'
    },
    {
      id: 'm-brgy',
      name: 'Quiling Sur Barangay Hall & Tanod Outpost',
      category: 'landmark',
      x: 42,
      y: 22,
      description: 'Local government seat, multipurpose sports gym, and Tanod safety outpost.',
      walkFromCAS: '5 mins walk',
      query: 'Barangay Quiling Sur Batac City'
    },
    {
      id: 'm-dorm1',
      name: 'Villa Mariano Green Residences',
      category: 'dorm',
      x: 44,
      y: 30,
      description: 'Across Gate 2. Equipped with standby generator and fiber Wi-Fi.',
      walkFromCAS: '3 mins walk',
      query: 'Villa Mariano Green Residences Quiling Sur',
      dormId: 'dorm-1'
    },
    {
      id: 'm-dorm2',
      name: 'St. Therese Ladies Dorm',
      category: 'dorm',
      x: 52,
      y: 38,
      description: 'All-female boarding house right along the well-lit canopy walkway.',
      walkFromCAS: '2 mins walk',
      query: 'St Therese Ladies Dorm Quiling Sur',
      dormId: 'dorm-2'
    },
    {
      id: 'm-dorm3',
      name: 'Pine Tree Quiling Men’s Hall',
      category: 'dorm',
      x: 72,
      y: 42,
      description: 'Peaceful lodging with drafting tables behind CAFSD demo farm.',
      walkFromCAS: '6 mins walk',
      query: 'Pine Tree Quiling Mens Hall Batac',
      dormId: 'dorm-3'
    },
    {
      id: 'm-dorm4',
      name: 'The Scholar Haven Studio Suites',
      category: 'dorm',
      x: 28,
      y: 28,
      description: 'Modern studio suites with backup power near the 7-Eleven highway strip.',
      walkFromCAS: '7 mins walk',
      query: 'Scholar Haven Quiling Sur Batac',
      dormId: 'dorm-4'
    },
    {
      id: 'm-food',
      name: 'Quiling Sur Food Strip & 7-Eleven',
      category: 'food',
      x: 38,
      y: 28,
      description: '24/7 convenience store, carinderias, print hubs, and milk tea cafes.',
      walkFromCAS: '3 mins walk',
      query: '7-Eleven Quiling Batac City'
    },
    {
      id: 'm-empanada',
      name: 'Batac Riverside Empanadahan',
      category: 'food',
      x: 18,
      y: 75,
      description: 'Iconic food park by the river. Home of Glory’s & Evelyn’s special empanadas.',
      walkFromCAS: '15 mins (5 min trike)',
      query: 'Batac Riverside Empanada Batac City'
    },
    {
      id: 'm-hospital',
      name: 'MMMH&MC Tertiary Hospital & ER',
      category: 'health',
      x: 22,
      y: 15,
      description: '24/7 trauma emergency room and regional government training hospital.',
      walkFromCAS: '12 mins (6 min trike)',
      query: 'Mariano Marcos Memorial Hospital and Medical Center Batac'
    }
  ];

  const filteredMarkers = markers.filter((m) => {
    if (categoryFilter === 'all') return true;
    return m.category === categoryFilter;
  });

  const getMarkerColor = (cat: string) => {
    switch (cat) {
      case 'college':
        return 'bg-emerald-500 text-slate-950 border-emerald-300';
      case 'dorm':
        return 'bg-amber-400 text-slate-950 border-amber-200';
      case 'food':
        return 'bg-orange-500 text-white border-orange-300';
      case 'health':
        return 'bg-rose-500 text-white border-rose-300';
      case 'landmark':
        return 'bg-blue-500 text-white border-blue-300';
      default:
        return 'bg-teal-500 text-white border-teal-300';
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-800 w-full sm:max-w-3xl rounded-t-3xl sm:rounded-2xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="px-5 py-3.5 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Compass className="w-5 h-5 text-emerald-400 animate-spin-slow" />
            <div>
              <h3 className="font-extrabold text-white text-base">
                Quiling Sur & MMSU Interactive Layout
              </h3>
              <p className="text-[11px] text-slate-400">
                Visual guide of colleges, gates, boarding houses, and food hubs
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-slate-800 text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filters */}
        <div className="px-4 py-2 bg-slate-900/90 border-b border-slate-800 flex items-center gap-2 overflow-x-auto no-scrollbar text-xs">
          {[
            { id: 'all', label: 'All Pins' },
            { id: 'college', label: '🎓 MMSU Colleges' },
            { id: 'dorm', label: '🏠 Boarding Houses' },
            { id: 'food', label: '🍜 Food & Empanada' },
            { id: 'health', label: '🏥 Hospital / ER' },
            { id: 'landmark', label: '🏛️ Barangay & Gates' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCategoryFilter(cat.id)}
              className={`px-2.5 py-1 rounded-full font-semibold whitespace-nowrap transition border ${
                categoryFilter === cat.id
                  ? 'bg-emerald-500 text-slate-950 border-emerald-400 font-bold'
                  : 'bg-slate-800/80 text-slate-400 border-slate-700'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Map Canvas */}
        <div className="p-4 space-y-4 overflow-y-auto flex-1">
          <div className="relative w-full h-80 sm:h-96 rounded-2xl bg-gradient-to-br from-slate-950 via-teal-950/40 to-slate-950 border border-slate-800 overflow-hidden shadow-inner select-none">
            {/* Visual Grid Lines and Campus zones */}
            <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-60 pointer-events-none" />

            {/* Quiling Sur Highway / River visual representation */}
            <div className="absolute left-0 right-0 top-1/4 h-3 bg-slate-800/60 -rotate-3 border-y border-slate-700/40 flex items-center justify-center">
              <span className="text-[8px] font-mono tracking-widest text-slate-400 uppercase">
                Don Mariano Marcos Avenue
              </span>
            </div>

            <div className="absolute left-1/4 right-0 bottom-1/4 h-2 bg-blue-900/40 rotate-6 border-y border-blue-600/30 flex items-center justify-center">
              <span className="text-[7px] font-mono tracking-widest text-blue-300 uppercase">
                Quiling Riverway Corridor
              </span>
            </div>

            {/* Zones labels */}
            <div className="absolute top-3 left-4 text-[10px] font-extrabold text-emerald-400/80 uppercase tracking-widest">
              [NORTH: MMMH&MC / Batac Center]
            </div>
            <div className="absolute bottom-3 right-4 text-[10px] font-extrabold text-emerald-400/80 uppercase tracking-widest">
              [SOUTH: Paoay / Currimao Corridor]
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-10 rounded-full border border-emerald-500/20 bg-emerald-500/5 pointer-events-none flex items-center justify-center">
              <span className="text-[10px] font-bold text-emerald-500/40 uppercase">
                MMSU Campus Core
              </span>
            </div>

            {/* Markers */}
            {filteredMarkers.map((marker) => {
              const isSelected = selectedMarker?.id === marker.id;
              const colorClass = getMarkerColor(marker.category);
              return (
                <button
                  key={marker.id}
                  onClick={() => setSelectedMarker(marker)}
                  style={{ left: `${marker.x}%`, top: `${marker.y}%` }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 group transition-all duration-200 z-10 ${
                    isSelected ? 'scale-125 z-20' : 'hover:scale-115'
                  }`}
                  title={marker.name}
                >
                  <div
                    className={`w-7 h-7 rounded-xl flex items-center justify-center shadow-lg border-2 font-black text-xs transition ${colorClass}`}
                  >
                    {marker.category === 'college' && <Building className="w-3.5 h-3.5" />}
                    {marker.category === 'dorm' && <Home className="w-3.5 h-3.5" />}
                    {marker.category === 'food' && <UtensilsCrossed className="w-3.5 h-3.5" />}
                    {marker.category === 'health' && <ShieldAlert className="w-3.5 h-3.5" />}
                    {marker.category === 'landmark' && <MapPin className="w-3.5 h-3.5" />}
                  </div>
                  {/* Pin label */}
                  <span className="absolute top-7 left-1/2 -translate-x-1/2 whitespace-nowrap px-1.5 py-0.5 rounded bg-slate-950/90 text-[9px] font-bold text-slate-200 border border-slate-800 shadow pointer-events-none group-hover:block hidden sm:block max-w-[120px] truncate">
                    {marker.name.split(' ')[0]} {marker.name.split(' ')[1] || ''}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Selected Pin Details Box */}
          {selectedMarker ? (
            <div className="p-4 rounded-2xl bg-slate-950 border border-emerald-500/40 shadow-lg space-y-2 animate-in fade-in duration-150">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-extrabold text-white text-sm">
                      {selectedMarker.name}
                    </h4>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300">
                      {selectedMarker.category.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 mt-1">
                    {selectedMarker.description}
                  </p>
                </div>

                <div className="text-right flex-shrink-0">
                  <span className="text-xs font-bold text-teal-400 block">
                    {selectedMarker.walkFromCAS}
                  </span>
                  <span className="text-[10px] text-slate-500">from CAS center</span>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800 flex items-center justify-between gap-2">
                {selectedMarker.dormId && onSelectDormById ? (
                  <button
                    onClick={() => {
                      onClose();
                      onSelectDormById(selectedMarker.dormId!);
                    }}
                    className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs"
                  >
                    View Room Pricing & Landlord
                  </button>
                ) : (
                  <span className="text-[11px] text-slate-400">
                    Located in Quiling Sur, Batac
                  </span>
                )}

                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    selectedMarker.query
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-750 text-emerald-300 font-semibold text-xs border border-slate-700"
                >
                  <Navigation className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Open in Google Maps</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          ) : (
            <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-center text-xs text-slate-400">
              💡 Tap any icon on the map above to inspect details, distance to MMSU CAS, and get directions!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
