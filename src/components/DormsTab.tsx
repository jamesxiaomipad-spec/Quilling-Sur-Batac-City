import React, { useState } from 'react';
import {
  Search,
  Filter,
  Wifi,
  Zap,
  Phone,
  MapPin,
  Clock,
  Star,
  Users,
  Check,
  Building,
  Flame,
  ChevronRight,
  ShieldCheck,
  BedDouble
} from 'lucide-react';
import { Dormitory, GenderPolicy } from '../types';

interface DormsTabProps {
  dorms: Dormitory[];
  onSelectDorm: (dorm: Dormitory) => void;
  onDirectCall: (phone: string, dormName: string) => void;
  onSwitchToMap?: () => void;
}

export const DormsTab: React.FC<DormsTabProps> = ({
  dorms,
  onSelectDorm,
  onDirectCall,
  onSwitchToMap,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGender, setSelectedGender] = useState<string>('all');
  const [maxBudget, setMaxBudget] = useState<number>(10000);
  const [filterGenerator, setFilterGenerator] = useState<boolean>(false);
  const [filterWifi, setFilterWifi] = useState<boolean>(false);
  const [filterCooking, setFilterCooking] = useState<boolean>(false);
  const [filterAircon, setFilterAircon] = useState<boolean>(false);
  const [maxWalkMinutes, setMaxWalkMinutes] = useState<number>(15);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState<boolean>(false);

  const filteredDorms = dorms.filter((dorm) => {
    const matchesSearch =
      dorm.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dorm.nearestCollege.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dorm.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dorm.purok.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesGender =
      selectedGender === 'all' || dorm.genderPolicy === selectedGender;

    const matchesPrice = dorm.minPrice <= maxBudget;
    const matchesWalk = dorm.walkingMinutes <= maxWalkMinutes;

    if (filterGenerator && !dorm.generatorBackup) return false;
    if (filterWifi && !dorm.hasWifi) return false;
    if (filterCooking && !dorm.cookingAllowed) return false;
    if (filterAircon && !dorm.airconAvailable) return false;

    return matchesSearch && matchesGender && matchesPrice && matchesWalk;
  });

  const getGenderLabel = (policy: GenderPolicy) => {
    switch (policy) {
      case 'female':
        return { label: 'All Female', bg: 'bg-rose-500/20 text-rose-300 border-rose-500/30' };
      case 'male':
        return { label: 'All Male', bg: 'bg-blue-500/20 text-blue-300 border-blue-500/30' };
      case 'coed':
        return { label: 'Co-ed Housing', bg: 'bg-purple-500/20 text-purple-300 border-purple-500/30' };
    }
  };

  return (
    <div className="space-y-4 pb-20">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-teal-900 to-slate-900 border border-emerald-500/30 rounded-2xl p-4 shadow-md relative overflow-hidden">
        <div className="flex items-center gap-2 mb-1">
          <Building className="w-4 h-4 text-emerald-400" />
          <span className="text-[11px] font-bold text-emerald-300 uppercase tracking-wider">
            MMSU Batac Campus Housing
          </span>
        </div>
        <h2 className="text-base font-extrabold text-white">
          Quiling Sur Dormitories & Boarding Houses
        </h2>
        <p className="text-xs text-slate-300 mt-1">
          Find verified student rooms within 2–8 minutes walk from CAS, COE, CAFSD, and CHS. Includes emergency generator and WiFi statuses.
        </p>

        {/* Quick stat badges */}
        <div className="flex flex-wrap items-center gap-2 mt-3 pt-3 border-t border-emerald-800/40 text-[11px]">
          <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-semibold border border-emerald-500/30">
            {dorms.length} Verified Houses
          </span>
          <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-semibold border border-amber-500/30">
            Rates from ₱900/mo
          </span>
          <span className="px-2 py-0.5 rounded-full bg-teal-500/20 text-teal-300 font-semibold border border-teal-500/30">
            CAS & COE Zone
          </span>
        </div>
      </div>

      {/* Search Bar & Filter Toggle */}
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search dorm, street, or college (e.g. CAS, Gate 2)..."
            className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
          />
        </div>
        {onSwitchToMap && (
          <button
            onClick={onSwitchToMap}
            className="flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-bold bg-emerald-600/20 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-600/30 transition shadow-sm active:scale-95"
            title="Switch to Google Map View"
          >
            <MapPin className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden sm:inline">Map</span>
          </button>
        )}
        <button
          onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
          className={`flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-semibold border transition ${
            showAdvancedFilters
              ? 'bg-emerald-600 text-white border-emerald-500'
              : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700'
          }`}
        >
          <Filter className="w-3.5 h-3.5" />
          <span>Filters</span>
        </button>
      </div>

      {/* Quick Gender Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
        {[
          { id: 'all', label: 'All Genders' },
          { id: 'female', label: 'All Female' },
          { id: 'male', label: 'All Male' },
          { id: 'coed', label: 'Co-Ed' },
        ].map((g) => (
          <button
            key={g.id}
            onClick={() => setSelectedGender(g.id)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition border ${
              selectedGender === g.id
                ? 'bg-emerald-500 text-slate-950 border-emerald-400 font-bold shadow'
                : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700'
            }`}
          >
            {g.label}
          </button>
        ))}

        {/* Quick Generator Pill */}
        <button
          onClick={() => setFilterGenerator(!filterGenerator)}
          className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition border ${
            filterGenerator
              ? 'bg-amber-500 text-slate-950 border-amber-400 font-bold shadow'
              : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700'
          }`}
        >
          <Zap className="w-3 h-3 text-amber-400" />
          <span>Has Generator</span>
        </button>
      </div>

      {/* Expandable Advanced Filters */}
      {showAdvancedFilters && (
        <div className="bg-slate-900/95 border border-slate-800 rounded-2xl p-4 space-y-3.5 shadow-lg animate-in fade-in duration-200">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-white uppercase tracking-wider">
              Filter By Preferences
            </span>
            <button
              onClick={() => {
                setSelectedGender('all');
                setMaxBudget(10000);
                setFilterGenerator(false);
                setFilterWifi(false);
                setFilterCooking(false);
                setFilterAircon(false);
                setMaxWalkMinutes(15);
              }}
              className="text-[11px] text-emerald-400 hover:underline"
            >
              Reset Filters
            </button>
          </div>

          {/* Max Budget Slider */}
          <div>
            <div className="flex justify-between text-xs text-slate-300 mb-1">
              <span>Max Budget:</span>
              <span className="font-bold text-emerald-400">
                {maxBudget >= 10000 ? 'Any Budget' : `Under ₱${maxBudget.toLocaleString()}/mo`}
              </span>
            </div>
            <input
              type="range"
              min="1000"
              max="10000"
              step="500"
              value={maxBudget}
              onChange={(e) => setMaxBudget(Number(e.target.value))}
              className="w-full accent-emerald-500 bg-slate-800 rounded-lg cursor-pointer h-2"
            />
            <div className="flex justify-between text-[10px] text-slate-500 mt-0.5">
              <span>₱1,000</span>
              <span>₱5,000</span>
              <span>₱10,000+</span>
            </div>
          </div>

          {/* Walking Distance to MMSU */}
          <div>
            <div className="flex justify-between text-xs text-slate-300 mb-1">
              <span>Distance to MMSU Gates:</span>
              <span className="font-bold text-teal-400">Within {maxWalkMinutes} mins walk</span>
            </div>
            <input
              type="range"
              min="2"
              max="15"
              step="1"
              value={maxWalkMinutes}
              onChange={(e) => setMaxWalkMinutes(Number(e.target.value))}
              className="w-full accent-teal-500 bg-slate-800 rounded-lg cursor-pointer h-2"
            />
          </div>

          {/* Toggle Amenity Chips */}
          <div className="pt-2 border-t border-slate-800 flex flex-wrap gap-2">
            <button
              onClick={() => setFilterWifi(!filterWifi)}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium border ${
                filterWifi
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                  : 'bg-slate-800/80 text-slate-400 border-slate-700'
              }`}
            >
              <Wifi className="w-3.5 h-3.5" />
              <span>Free Wi-Fi</span>
              {filterWifi && <Check className="w-3 h-3 ml-0.5" />}
            </button>

            <button
              onClick={() => setFilterCooking(!filterCooking)}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium border ${
                filterCooking
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                  : 'bg-slate-800/80 text-slate-400 border-slate-700'
              }`}
            >
              <Flame className="w-3.5 h-3.5" />
              <span>Cooking Allowed</span>
              {filterCooking && <Check className="w-3 h-3 ml-0.5" />}
            </button>

            <button
              onClick={() => setFilterAircon(!filterAircon)}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium border ${
                filterAircon
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                  : 'bg-slate-800/80 text-slate-400 border-slate-700'
              }`}
            >
              <Building className="w-3.5 h-3.5" />
              <span>Aircon Units</span>
              {filterAircon && <Check className="w-3 h-3 ml-0.5" />}
            </button>
          </div>
        </div>
      )}

      {/* Dorms List */}
      <div className="space-y-4">
        {filteredDorms.length === 0 ? (
          <div className="text-center py-12 bg-slate-900/50 rounded-2xl border border-slate-800 p-6">
            <BedDouble className="w-10 h-10 text-slate-600 mx-auto mb-2" />
            <p className="text-slate-300 font-semibold text-sm">No dorms match your criteria</p>
            <p className="text-slate-500 text-xs mt-1">Try relaxing your budget or distance filter to see available options in Quiling Sur.</p>
          </div>
        ) : (
          filteredDorms.map((dorm) => {
            const genderBadge = getGenderLabel(dorm.genderPolicy);
            return (
              <div
                key={dorm.id}
                className="bg-slate-900/90 border border-slate-800 rounded-2xl overflow-hidden shadow-sm hover:border-slate-700 transition group"
              >
                {/* Photo & Badges */}
                <div className="relative h-44 w-full bg-slate-950 overflow-hidden cursor-pointer" onClick={() => onSelectDorm(dorm)}>
                  <img
                    src={dorm.images[0]}
                    alt={dorm.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

                  {/* Price Tag Overlay */}
                  <div className="absolute top-3 left-3 bg-slate-950/85 backdrop-blur-md px-2.5 py-1 rounded-xl border border-slate-800 text-white shadow-lg">
                    <span className="text-[10px] text-slate-400 font-medium block">Starting from</span>
                    <span className="text-sm font-extrabold text-emerald-400">
                      ₱{dorm.minPrice.toLocaleString()}
                    </span>
                    <span className="text-[10px] text-slate-400">/mo</span>
                  </div>

                  {/* Distance to MMSU pill */}
                  <div className="absolute top-3 right-3 bg-emerald-950/90 backdrop-blur-md border border-emerald-500/40 text-emerald-300 px-2.5 py-1 rounded-xl text-xs font-bold flex items-center gap-1 shadow-lg">
                    <Clock className="w-3 h-3" />
                    <span>{dorm.walkingMinutes} min walk</span>
                  </div>

                  {/* Gender and Landlord Badge */}
                  <div className="absolute bottom-3 left-3 flex items-center gap-1.5 flex-wrap">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-lg border backdrop-blur-md ${genderBadge.bg}`}>
                      {genderBadge.label}
                    </span>
                    {dorm.verifiedLandlord && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-lg bg-teal-500/20 text-teal-300 border border-teal-500/40 backdrop-blur-md flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3" />
                        <span>Verified Landlord</span>
                      </span>
                    )}
                  </div>
                </div>

                {/* Content details */}
                <div className="p-4 space-y-3">
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <h3
                        onClick={() => onSelectDorm(dorm)}
                        className="font-bold text-white text-base hover:text-emerald-300 cursor-pointer leading-tight"
                      >
                        {dorm.name}
                      </h3>
                      <div className="flex items-center gap-1 text-xs text-amber-400 font-bold flex-shrink-0">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span>{dorm.rating}</span>
                        <span className="text-slate-500 text-[10px]">({dorm.reviewCount})</span>
                      </div>
                    </div>
                    <p className="text-xs text-slate-400 flex items-center gap-1 mt-1">
                      <MapPin className="w-3 h-3 text-emerald-400 flex-shrink-0" />
                      <span className="truncate">{dorm.address}</span>
                    </p>
                  </div>

                  {/* Nearest College highlighted */}
                  <div className="px-2.5 py-1.5 rounded-xl bg-slate-800/60 border border-slate-700/60 text-xs text-slate-300 flex items-center justify-between">
                    <span className="text-slate-400 text-[11px]">Nearest Campus Gate:</span>
                    <span className="font-semibold text-emerald-300">{dorm.nearestCollege}</span>
                  </div>

                  {/* Amenities highlights */}
                  <div className="flex flex-wrap items-center gap-1.5">
                    {dorm.generatorBackup && (
                      <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-amber-500/15 text-amber-300 border border-amber-500/30 flex items-center gap-1">
                        <Zap className="w-2.5 h-2.5" /> Generator Backup
                      </span>
                    )}
                    {dorm.hasWifi && (
                      <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-teal-500/15 text-teal-300 border border-teal-500/30 flex items-center gap-1">
                        <Wifi className="w-2.5 h-2.5" /> High-speed WiFi
                      </span>
                    )}
                    {dorm.cookingAllowed && (
                      <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700 flex items-center gap-1">
                        <Flame className="w-2.5 h-2.5" /> Cooking OK
                      </span>
                    )}
                    <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                      Curfew: {dorm.curfew.split('(')[0]}
                    </span>
                  </div>

                  {/* Room Slots Summary */}
                  <div className="space-y-1.5 pt-1">
                    <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                      Available Room Options:
                    </span>
                    <div className="grid grid-cols-2 gap-1.5 text-xs">
                      {dorm.roomOptions.map((opt, idx) => (
                        <div
                          key={idx}
                          className="p-1.5 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-between"
                        >
                          <div>
                            <div className="font-medium text-slate-200 text-[11px]">{opt.type}</div>
                            <div className="text-[10px] text-emerald-400 font-bold">₱{opt.priceMonthly.toLocaleString()}/mo</div>
                          </div>
                          <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                            opt.slotsAvailable > 0
                              ? 'bg-emerald-500/20 text-emerald-300'
                              : 'bg-slate-800 text-slate-500'
                          }`}>
                            {opt.slotsAvailable > 0 ? `${opt.slotsAvailable} left` : 'Full'}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Action Buttons */}
                  <div className="flex items-center gap-2 pt-2 border-t border-slate-800/80">
                    <button
                      onClick={() => onDirectCall(dorm.phone, dorm.name)}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-750 text-white font-semibold text-xs border border-slate-700 transition active:scale-95"
                    >
                      <Phone className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Call Landlord</span>
                    </button>
                    <button
                      onClick={() => onSelectDorm(dorm)}
                      className="flex-1 flex items-center justify-center gap-1 py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs shadow-md transition active:scale-95"
                    >
                      <span>View & Inquire</span>
                      <ChevronRight className="w-3.5 h-3.5" />
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
