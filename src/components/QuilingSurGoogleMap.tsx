import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import {
  Search,
  Layers,
  LocateFixed,
  Plus,
  Minus,
  Navigation,
  Phone,
  Clock,
  Star,
  Zap,
  Wifi,
  ExternalLink,
  X,
  Compass,
  Building,
  Home,
  CheckCircle2,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { Dormitory, Spot } from '../types';

interface QuilingSurGoogleMapProps {
  dorms: Dormitory[];
  spots: Spot[];
  onSelectDorm: (dorm: Dormitory) => void;
  onCallLandlord: (phone: string, name: string) => void;
}

export const QuilingSurGoogleMap: React.FC<QuilingSurGoogleMapProps> = ({
  dorms,
  spots,
  onSelectDorm,
  onCallLandlord,
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);
  const routeLayerRef = useRef<L.Polyline | null>(null);

  // States
  const [mapType, setMapType] = useState<'roadmap' | 'satellite'>('roadmap');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'generator' | 'budget' | 'female' | 'colleges' | 'food'>('all');
  const [selectedDorm, setSelectedDorm] = useState<Dormitory | null>(null);
  const [selectedSpot, setSelectedSpot] = useState<Spot | null>(null);
  const [walkingRouteActive, setWalkingRouteActive] = useState<boolean>(false);
  const [mapLoaded, setMapLoaded] = useState(false);

  // MMSU CAS center coordinates
  const MMSU_CAS_COORDS: [number, number] = [18.0601, 120.5478];

  // College locations
  const MMSU_COLLEGES = [
    { name: 'MMSU CAS (College of Arts and Sciences)', coords: [18.0601, 120.5478] as [number, number], desc: 'Main academic quadrangle in Quiling Sur' },
    { name: 'MMSU COE (College of Engineering)', coords: [18.0585, 120.5458] as [number, number], desc: 'Engineering complex & tech labs' },
    { name: 'MMSU CAFSD (Agriculture & Forestry)', coords: [18.0622, 120.5512] as [number, number], desc: 'Demo farms & Bioenergy center' },
    { name: 'MMSU Gate 2 Canopy Walkway', coords: [18.0608, 120.5482] as [number, number], desc: 'Primary student access from Quiling Sur' },
    { name: 'Quiling Sur Barangay Hall', coords: [18.0618, 120.5460] as [number, number], desc: 'Barangay Center & Tanod Post' },
  ];

  // Initialize Leaflet Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: [18.0605, 120.5485],
        zoom: 16,
        zoomControl: false,
        attributionControl: true,
      });

      // Default roadmap tiles (Clean OSM style)
      const tileLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; OpenStreetMap contributors | Quiling Sur Hub',
      });
      tileLayer.addTo(map);

      // Create layers group
      const markersGroup = L.layerGroup().addTo(map);
      markersLayerRef.current = markersGroup;

      mapInstanceRef.current = map;
      setMapLoaded(true);
    }

    return () => {
      // Cleanup on unmount
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Update Tile Layer when mapType changes
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    // Remove existing tile layers
    map.eachLayer((layer) => {
      if (layer instanceof L.TileLayer) {
        map.removeLayer(layer);
      }
    });

    if (mapType === 'roadmap') {
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; OpenStreetMap contributors | Quiling Sur',
      }).addTo(map);
    } else {
      // Satellite Imagery (Esri World Imagery)
      L.tileLayer(
        'https://server.arcgisonline.com/ArcStation/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
        {
          maxZoom: 19,
          attribution: 'Tiles &copy; Esri, Earthstar Geographics | Quiling Sur',
        }
      ).addTo(map);
    }
  }, [mapType]);

  // Update Markers based on filters & search
  useEffect(() => {
    const map = mapInstanceRef.current;
    const markersGroup = markersLayerRef.current;
    if (!map || !markersGroup) return;

    markersGroup.clearLayers();

    // Filter dorms
    const filteredDorms = dorms.filter((d) => {
      const matchesSearch =
        d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.nearestCollege.toLowerCase().includes(searchQuery.toLowerCase());

      if (!matchesSearch) return false;
      if (activeFilter === 'generator' && !d.generatorBackup) return false;
      if (activeFilter === 'budget' && d.minPrice > 1500) return false;
      if (activeFilter === 'female' && d.genderPolicy !== 'female') return false;
      if (activeFilter === 'colleges') return false; // Show only colleges
      if (activeFilter === 'food') return false;

      return true;
    });

    // Render Dorm Markers with custom HTML pins
    filteredDorms.forEach((dorm) => {
      const isSelected = selectedDorm?.id === dorm.id;
      const customIcon = L.divIcon({
        className: 'custom-dorm-marker',
        html: `
          <div style="
            position: relative;
            transform: translate(-50%, -100%);
            display: flex;
            flex-direction: column;
            align-items: center;
            cursor: pointer;
          ">
            <div style="
              background: ${isSelected ? '#059669' : dorm.generatorBackup ? '#10b981' : '#0284c7'};
              color: white;
              padding: 4px 8px;
              border-radius: 9999px;
              font-size: 11px;
              font-weight: 800;
              box-shadow: 0 4px 12px rgba(0,0,0,0.4);
              border: 2px solid white;
              white-space: nowrap;
              display: flex;
              align-items: center;
              gap: 4px;
            ">
              <span>🏠 ₱${dorm.minPrice}</span>
              ${dorm.generatorBackup ? '<span style="color:#fef08a;">⚡</span>' : ''}
            </div>
            <div style="
              width: 0;
              height: 0;
              border-left: 6px solid transparent;
              border-right: 6px solid transparent;
              border-top: 7px solid ${isSelected ? '#059669' : dorm.generatorBackup ? '#10b981' : '#0284c7'};
              margin-top: -1px;
            "></div>
          </div>
        `,
        iconSize: [80, 40],
        iconAnchor: [40, 40],
      });

      const marker = L.marker([dorm.lat, dorm.lng], { icon: customIcon });
      marker.on('click', () => {
        setSelectedDorm(dorm);
        setSelectedSpot(null);
        map.panTo([dorm.lat, dorm.lng]);
      });
      marker.addTo(markersGroup);
    });

    // Render MMSU Colleges & Landmarks
    if (activeFilter === 'all' || activeFilter === 'colleges') {
      MMSU_COLLEGES.forEach((college) => {
        const collegeIcon = L.divIcon({
          className: 'custom-college-marker',
          html: `
            <div style="
              transform: translate(-50%, -100%);
              display: flex;
              flex-direction: column;
              align-items: center;
              cursor: pointer;
            ">
              <div style="
                background: #047857;
                color: white;
                padding: 4px 8px;
                border-radius: 9999px;
                font-size: 10px;
                font-weight: bold;
                box-shadow: 0 4px 10px rgba(0,0,0,0.5);
                border: 2px solid #a7f3d0;
                white-space: nowrap;
              ">
                🎓 ${college.name.split('(')[0]}
              </div>
              <div style="
                width: 0;
                height: 0;
                border-left: 5px solid transparent;
                border-right: 5px solid transparent;
                border-top: 6px solid #047857;
              "></div>
            </div>
          `,
          iconSize: [120, 35],
          iconAnchor: [60, 35],
        });

        const cMarker = L.marker(college.coords, { icon: collegeIcon });
        cMarker.bindPopup(`
          <div style="color: #0f172a; font-family: sans-serif; padding: 4px;">
            <strong style="font-size: 13px;">${college.name}</strong>
            <p style="font-size: 11px; margin: 4px 0 0; color: #475569;">${college.desc}</p>
          </div>
        `);
        cMarker.addTo(markersGroup);
      });
    }

    // Render Food / Empanada spots
    if (activeFilter === 'all' || activeFilter === 'food') {
      const empanadaCoords: [number, number] = [18.0545, 120.5638];
      const foodIcon = L.divIcon({
        className: 'custom-food-marker',
        html: `
          <div style="
            transform: translate(-50%, -100%);
            display: flex;
            flex-direction: column;
            align-items: center;
          ">
            <div style="
              background: #ea580c;
              color: white;
              padding: 4px 8px;
              border-radius: 9999px;
              font-size: 10px;
              font-weight: bold;
              box-shadow: 0 4px 10px rgba(0,0,0,0.4);
              border: 2px solid white;
            ">
              🥟 Batac Empanada
            </div>
            <div style="
              width: 0;
              height: 0;
              border-left: 5px solid transparent;
              border-right: 5px solid transparent;
              border-top: 6px solid #ea580c;
            "></div>
          </div>
        `,
        iconSize: [110, 35],
        iconAnchor: [55, 35],
      });

      const fMarker = L.marker(empanadaCoords, { icon: foodIcon });
      fMarker.on('click', () => {
        const empanadaSpot = spots.find((s) => s.id === 'spot-1');
        if (empanadaSpot) {
          setSelectedSpot(empanadaSpot);
          setSelectedDorm(null);
        }
      });
      fMarker.addTo(markersGroup);
    }
  }, [dorms, spots, searchQuery, activeFilter, selectedDorm]);

  // Handle Walking Route line
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    if (routeLayerRef.current) {
      map.removeLayer(routeLayerRef.current);
      routeLayerRef.current = null;
    }

    if (walkingRouteActive && selectedDorm) {
      // Draw path from dorm to MMSU CAS
      const latlngs: [number, number][] = [
        [selectedDorm.lat, selectedDorm.lng],
        // Waypoint through Gate 2
        [18.0608, 120.5482],
        MMSU_CAS_COORDS,
      ];

      const polyline = L.polyline(latlngs, {
        color: '#059669',
        weight: 5,
        opacity: 0.9,
        dashArray: '8, 8',
      }).addTo(map);

      routeLayerRef.current = polyline;
      map.fitBounds(polyline.getBounds(), { padding: [50, 50] });
    }
  }, [walkingRouteActive, selectedDorm]);

  // Map Controls Helpers
  const handleZoomIn = () => {
    mapInstanceRef.current?.zoomIn();
  };

  const handleZoomOut = () => {
    mapInstanceRef.current?.zoomOut();
  };

  const handleCenterMMSU = () => {
    mapInstanceRef.current?.flyTo([18.0605, 120.5485], 16, {
      duration: 1.2,
    });
  };

  return (
    <div className="relative w-full h-[calc(100vh-140px)] min-h-[520px] rounded-2xl overflow-hidden border border-slate-800 shadow-2xl flex flex-col bg-slate-950">
      {/* Google Maps Search Bar & Filter Header */}
      <div className="absolute top-3 left-3 right-3 z-[1000] space-y-2 pointer-events-auto">
        {/* Floating Google Maps-styled search capsule */}
        <div className="bg-slate-900/95 backdrop-blur-md border border-slate-700/80 rounded-2xl shadow-xl p-1.5 flex items-center gap-2">
          <div className="p-2 text-emerald-400 flex-shrink-0">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Quiling Sur dorms, CAS, Gate 2..."
            className="flex-1 bg-transparent text-xs text-white placeholder-slate-400 focus:outline-none"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="p-1.5 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}

          {/* Map Layer Switcher (Satellite vs Roadmap) */}
          <button
            onClick={() => setMapType(mapType === 'roadmap' ? 'satellite' : 'roadmap')}
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-[11px] font-bold border transition ${
              mapType === 'satellite'
                ? 'bg-emerald-600 text-white border-emerald-500 shadow'
                : 'bg-slate-800 text-slate-200 border-slate-700 hover:bg-slate-750'
            }`}
            title="Toggle Satellite Imagery"
          >
            <Layers className="w-3.5 h-3.5" />
            <span className="hidden sm:inline capitalize">{mapType}</span>
          </button>
        </div>

        {/* Quick Filter Chips (Google Maps Style) */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs">
          {[
            { id: 'all', label: `All Dorms (${dorms.length})` },
            { id: 'generator', label: '⚡ Has Generator' },
            { id: 'budget', label: '💰 Under ₱1,500' },
            { id: 'female', label: '🌸 All Female' },
            { id: 'colleges', label: '🎓 MMSU Colleges' },
            { id: 'food', label: '🥟 Empanada & Food' },
          ].map((chip) => (
            <button
              key={chip.id}
              onClick={() => {
                setActiveFilter(chip.id as any);
                setWalkingRouteActive(false);
              }}
              className={`px-3 py-1.5 rounded-full font-bold whitespace-nowrap transition-all border shadow-sm ${
                activeFilter === chip.id
                  ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-emerald-950/50'
                  : 'bg-slate-900/90 text-slate-300 border-slate-700/80 backdrop-blur-md hover:border-slate-600'
              }`}
            >
              {chip.label}
            </button>
          ))}
        </div>
      </div>

      {/* Leaflet Canvas Container */}
      <div ref={mapContainerRef} className="w-full h-full z-0 bg-slate-950" />

      {/* Floating Google Maps Controls on Right */}
      <div className="absolute right-3 bottom-24 sm:bottom-20 z-[1000] flex flex-col gap-2 pointer-events-auto">
        {/* Recenter Quiling Sur */}
        <button
          onClick={handleCenterMMSU}
          className="p-3 rounded-2xl bg-slate-900/90 hover:bg-slate-850 text-emerald-400 border border-slate-700 shadow-xl backdrop-blur-md active:scale-95 transition"
          title="Center on MMSU Campus & Quiling Sur"
        >
          <LocateFixed className="w-5 h-5" />
        </button>

        {/* Zoom Controls */}
        <div className="flex flex-col rounded-2xl bg-slate-900/90 border border-slate-700 shadow-xl backdrop-blur-md overflow-hidden">
          <button
            onClick={handleZoomIn}
            className="p-3 text-slate-200 hover:text-white hover:bg-slate-800 transition active:scale-95"
            title="Zoom In"
          >
            <Plus className="w-5 h-5" />
          </button>
          <div className="h-[1px] bg-slate-800" />
          <button
            onClick={handleZoomOut}
            className="p-3 text-slate-200 hover:text-white hover:bg-slate-800 transition active:scale-95"
            title="Zoom Out"
          >
            <Minus className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Floating Compass / North indicator on bottom-left */}
      <div className="absolute left-3 bottom-24 sm:bottom-20 z-[1000] pointer-events-none">
        <div className="bg-slate-900/80 backdrop-blur-md px-2.5 py-1 rounded-xl border border-slate-800 text-[10px] text-slate-400 flex items-center gap-1 shadow">
          <Compass className="w-3.5 h-3.5 text-emerald-400" />
          <span>Quiling Sur • Batac City</span>
        </div>
      </div>

      {/* Google Maps Place Card / Bottom Sheet for Selected Dorm */}
      {selectedDorm && (
        <div className="absolute left-3 right-3 bottom-3 z-[1000] max-w-lg mx-auto bg-slate-900/95 backdrop-blur-xl border border-slate-700 rounded-3xl p-4 shadow-2xl animate-in slide-in-from-bottom-6 duration-300 pointer-events-auto">
          {/* Card Header */}
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  {selectedDorm.purok}, Quiling Sur
                </span>
                {selectedDorm.generatorBackup && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-0.5">
                    <Zap className="w-3 h-3 text-amber-400" />
                    <span>Generator Backup</span>
                  </span>
                )}
                {selectedDorm.hasWifi && (
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-teal-500/20 text-teal-300">
                    WiFi
                  </span>
                )}
              </div>

              <h3 className="font-extrabold text-white text-base mt-1.5 leading-snug">
                {selectedDorm.name}
              </h3>

              <div className="flex items-center gap-2 text-xs text-slate-300 mt-0.5">
                <div className="flex items-center gap-0.5 text-amber-400 font-bold">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>{selectedDorm.rating}</span>
                </div>
                <span>•</span>
                <span className="text-emerald-400 font-semibold flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {selectedDorm.walkingMinutes} min walk ({selectedDorm.distanceToMMSU}) to {selectedDorm.nearestCollege}
                </span>
              </div>
            </div>

            <button
              onClick={() => {
                setSelectedDorm(null);
                setWalkingRouteActive(false);
              }}
              className="p-1.5 rounded-full bg-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Pricing & Vacant Slots */}
          <div className="mt-3 p-2.5 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between">
            <div>
              <span className="text-[10px] text-slate-400 uppercase block font-semibold">
                Available Student Rates:
              </span>
              <div className="text-sm font-black text-emerald-400">
                ₱{selectedDorm.minPrice.toLocaleString()} – ₱{selectedDorm.maxPrice.toLocaleString()}
                <span className="text-xs text-slate-400 font-normal"> /mo</span>
              </div>
            </div>

            <div className="text-right">
              <span className="text-[11px] font-bold text-slate-200 block">
                {selectedDorm.roomOptions[0]?.slotsAvailable} slots vacant
              </span>
              <span className="text-[10px] text-slate-400">
                {selectedDorm.genderPolicy === 'female' ? 'All-Female' : selectedDorm.genderPolicy === 'male' ? 'All-Male' : 'Co-ed'}
              </span>
            </div>
          </div>

          {/* Action Buttons (Directions, Call, Details) */}
          <div className="mt-3 grid grid-cols-3 gap-2">
            {/* Toggle Walking Route */}
            <button
              onClick={() => setWalkingRouteActive(!walkingRouteActive)}
              className={`flex items-center justify-center gap-1 py-2 px-2 rounded-xl text-xs font-bold transition active:scale-95 border ${
                walkingRouteActive
                  ? 'bg-emerald-500 text-slate-950 border-emerald-400'
                  : 'bg-slate-800 text-emerald-300 border-slate-700 hover:bg-slate-750'
              }`}
            >
              <Navigation className="w-3.5 h-3.5" />
              <span>{walkingRouteActive ? 'Hide Path' : 'Walk Path'}</span>
            </button>

            {/* Direct Call */}
            <button
              onClick={() => onCallLandlord(selectedDorm.phone, selectedDorm.name)}
              className="flex items-center justify-center gap-1 py-2 px-2 rounded-xl bg-slate-800 hover:bg-slate-750 text-white text-xs font-bold border border-slate-700 transition active:scale-95"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-400" />
              <span>Call Owner</span>
            </button>

            {/* View Full Rooms & Inquire */}
            <button
              onClick={() => onSelectDorm(selectedDorm)}
              className="flex items-center justify-center gap-1 py-2 px-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md transition active:scale-95"
            >
              <span>View Rooms</span>
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      )}

      {/* Spot Card if Food / Empanada is clicked */}
      {selectedSpot && (
        <div className="absolute left-3 right-3 bottom-3 z-[1000] max-w-lg mx-auto bg-slate-900/95 backdrop-blur-xl border border-slate-700 rounded-3xl p-4 shadow-2xl animate-in slide-in-from-bottom-6 duration-300 pointer-events-auto">
          <div className="flex items-start justify-between gap-2">
            <div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-orange-500/20 text-orange-300 border border-orange-500/30">
                Iconic Batac Food
              </span>
              <h3 className="font-extrabold text-white text-base mt-1">
                {selectedSpot.name}
              </h3>
              <p className="text-xs text-slate-300 mt-1">{selectedSpot.description}</p>
            </div>
            <button
              onClick={() => setSelectedSpot(null)}
              className="p-1.5 rounded-full bg-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="mt-3 pt-2 border-t border-slate-800 flex items-center justify-between">
            <span className="text-xs text-emerald-400 font-semibold">{selectedSpot.distanceFromMMSU}</span>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                selectedSpot.googleMapsQuery
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-emerald-600 text-white text-xs font-bold"
            >
              <span>Open in Google Maps</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      )}
    </div>
  );
};
