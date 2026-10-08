import React, { useState } from 'react';
import {
  Navigation,
  Calculator,
  Phone,
  Clock,
  ShieldAlert,
  Car,
  Bus,
  BadgePercent,
  CheckCircle,
  HelpCircle,
  MapPin,
  Sparkles
} from 'lucide-react';
import { TransportRoute, DriverContact } from '../types';

interface TransportTabProps {
  routes: TransportRoute[];
  drivers: DriverContact[];
  onDirectCallDriver: (phone: string, driverName: string) => void;
}

export const TransportTab: React.FC<TransportTabProps> = ({
  routes,
  drivers,
  onDirectCallDriver,
}) => {
  const [calcOrigin, setCalcOrigin] = useState<string>('Quiling Sur (MMSU Gate 2)');
  const [calcDest, setCalcDest] = useState<string>('Batac Public Market / Riverside');
  const [isStudent, setIsStudent] = useState<boolean>(true);
  const [activeFilter, setActiveFilter] = useState<'all' | 'tricycle' | 'jeepney' | 'bus'>('all');

  const landmarkPoints = [
    'Quiling Sur (MMSU Gate 2)',
    'MMSU Main Oval / Admin',
    'Batac Public Market / Riverside',
    'Mariano Marcos Memorial Hospital (MMMH&MC)',
    'Laoag City (Rizal Park)',
    'Paoay UNESCO Church',
    'Batac-San Nicolas Border',
    'Partas Bus Terminal Batac',
  ];

  // Calculate fare based on selected points
  const calculateFareEstimate = () => {
    if (calcOrigin === calcDest) {
      return { regular: 0, student: 0, time: 0, type: 'Same location' };
    }

    // Check if direct route exists
    const matching = routes.find(
      (r) =>
        (r.origin.includes(calcOrigin.split(' ')[0]) && r.destination.includes(calcDest.split(' ')[0])) ||
        (r.destination.includes(calcOrigin.split(' ')[0]) && r.origin.includes(calcDest.split(' ')[0]))
    );

    if (matching) {
      return {
        regular: matching.regularFare,
        student: matching.studentFare,
        time: matching.travelTimeMinutes,
        type: matching.vehicleType,
      };
    }

    // Default estimate for localized trips within Batac / Quiling
    const isIntercity = calcOrigin.includes('Laoag') || calcDest.includes('Laoag');
    const isPaoay = calcOrigin.includes('Paoay') || calcDest.includes('Paoay');
    const isHospital = calcOrigin.includes('Hospital') || calcDest.includes('Hospital');

    if (isIntercity) {
      return { regular: 40, student: 32, time: 35, type: 'Jeepney' };
    }
    if (isPaoay) {
      return { regular: 25, student: 20, time: 20, type: 'Jeepney / Trike' };
    }
    if (isHospital) {
      return { regular: 25, student: 20, time: 7, type: 'Tricycle' };
    }
    return { regular: 20, student: 16, time: 6, type: 'Tricycle' };
  };

  const fareEstimate = calculateFareEstimate();

  const filteredRoutes = routes.filter((r) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'tricycle') return r.vehicleType === 'Tricycle';
    if (activeFilter === 'jeepney') return r.vehicleType === 'Jeepney';
    if (activeFilter === 'bus') return r.vehicleType === 'Bus';
    return true;
  });

  return (
    <div className="space-y-4 pb-20">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-950 via-indigo-950 to-slate-900 border border-blue-500/30 rounded-2xl p-4 shadow-md">
        <div className="flex items-center gap-2 mb-1">
          <Car className="w-4 h-4 text-blue-400" />
          <span className="text-[11px] font-bold text-blue-300 uppercase tracking-wider">
            Batac City Commuter Companion
          </span>
        </div>
        <h2 className="text-base font-extrabold text-white">
          Quiling Sur Transport & Tricycle Guide
        </h2>
        <p className="text-xs text-slate-300 mt-1">
          Official fare matrices, 20% student discount guidelines, Call-A-Trike driver numbers, and Laoag-Paoay jeepney terminals.
        </p>
      </div>

      {/* Interactive Fare Calculator */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-md space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calculator className="w-4 h-4 text-emerald-400" />
            <h3 className="font-bold text-white text-sm">Interactive Fare Calculator</h3>
          </div>
          <button
            onClick={() => setIsStudent(!isStudent)}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold border transition ${
              isStudent
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                : 'bg-slate-800 text-slate-400 border-slate-700'
            }`}
          >
            <BadgePercent className="w-3.5 h-3.5" />
            <span>MMSU Student (20% Off)</span>
          </button>
        </div>

        {/* Origin & Destination pickers */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
          <div>
            <label className="text-[11px] font-semibold text-slate-400 block mb-1">
              Pick-up Point:
            </label>
            <select
              value={calcOrigin}
              onChange={(e) => setCalcOrigin(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
            >
              {landmarkPoints.map((pt) => (
                <option key={pt} value={pt}>
                  {pt}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-[11px] font-semibold text-slate-400 block mb-1">
              Destination:
            </label>
            <select
              value={calcDest}
              onChange={(e) => setCalcDest(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
            >
              {landmarkPoints.map((pt) => (
                <option key={pt} value={pt}>
                  {pt}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Result Card */}
        <div className="mt-2 bg-gradient-to-r from-slate-950 to-slate-900 border border-emerald-500/30 rounded-xl p-3 flex items-center justify-between">
          <div>
            <span className="text-[10px] text-slate-400 font-semibold uppercase block">
              Estimated Rate ({fareEstimate.type})
            </span>
            <div className="flex items-baseline gap-2 mt-0.5">
              <span className="text-xl font-black text-emerald-400">
                ₱{isStudent ? fareEstimate.student : fareEstimate.regular}
              </span>
              {isStudent && (
                <span className="text-xs text-slate-500 line-through">
                  ₱{fareEstimate.regular} regular
                </span>
              )}
            </div>
            <div className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
              <Clock className="w-3 h-3 text-teal-400" />
              <span>Est. Travel Time: ~{fareEstimate.time} mins</span>
            </div>
          </div>

          <div className="text-right">
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
              City Ordinance Fare
            </span>
            <p className="text-[10px] text-slate-400 mt-1 max-w-[130px]">
              Special single-rider trips may cost ₱30–₱50 on late hours.
            </p>
          </div>
        </div>
      </div>

      {/* Call-A-Trike Directory */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-emerald-400" />
            <h3 className="font-bold text-white text-sm">Call-A-Trike: Quiling Sur Drivers</h3>
          </div>
          <span className="text-[11px] text-slate-400">Verified TODA</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {drivers.map((driver) => (
            <div
              key={driver.id}
              className="bg-slate-900/90 border border-slate-800 rounded-xl p-3 flex items-center justify-between gap-2 shadow-sm hover:border-slate-700"
            >
              <div>
                <div className="flex items-center gap-1.5">
                  <h4 className="font-bold text-white text-xs">{driver.name}</h4>
                  {driver.isOnline ? (
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" title="Available now" />
                  ) : (
                    <span className="w-2 h-2 rounded-full bg-slate-600" title="Offline" />
                  )}
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5">
                  <span className="text-emerald-300 font-medium">{driver.todaUnit}</span> • {driver.plateNo}
                </div>
                <div className="text-[10px] text-slate-500 flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3 h-3 text-slate-400" />
                  <span className="truncate">{driver.standLocation}</span>
                </div>
              </div>

              <button
                onClick={() => onDirectCallDriver(driver.phone, driver.name)}
                className="px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1 flex-shrink-0 shadow active:scale-95 transition"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Standard Fare Matrix Chart */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-white text-sm flex items-center gap-2">
            <Navigation className="w-4 h-4 text-teal-400" />
            <span>Popular Route Tariffs & Terminals</span>
          </h3>

          {/* Route filter */}
          <div className="flex items-center gap-1 bg-slate-900 p-0.5 rounded-lg border border-slate-800 text-xs">
            {(['all', 'tricycle', 'jeepney', 'bus'] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => setActiveFilter(mode)}
                className={`px-2 py-0.5 rounded-md capitalize font-medium text-[11px] transition ${
                  activeFilter === mode
                    ? 'bg-emerald-500 text-slate-950 font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {mode}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          {filteredRoutes.map((route) => (
            <div
              key={route.id}
              className="bg-slate-900 border border-slate-800/90 rounded-xl p-3 text-xs space-y-2"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30">
                      {route.vehicleType}
                    </span>
                    <span className="text-white font-bold text-xs">
                      {route.origin} → {route.destination}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">{route.description}</p>
                </div>

                <div className="text-right flex-shrink-0">
                  <div className="text-sm font-extrabold text-emerald-400">
                    ₱{route.studentFare} <span className="text-[10px] text-slate-400 font-normal">student</span>
                  </div>
                  <div className="text-[10px] text-slate-500">₱{route.regularFare} regular</div>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800/60 flex flex-wrap items-center justify-between text-[11px] text-slate-400 gap-2">
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3 text-slate-500" />
                  <span>{route.operatingHours}</span>
                </div>
                <div className="text-[10px] text-slate-500">Terminal: {route.terminalLocation}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Commuter Tips & Safety Box */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-3.5 space-y-2 text-xs">
        <div className="flex items-center gap-1.5 font-bold text-amber-300">
          <ShieldAlert className="w-4 h-4 text-amber-400" />
          <span>Commuter Rights & Night Safety in Quiling Sur</span>
        </div>
        <ul className="space-y-1.5 text-slate-300 text-[11px] list-disc list-inside">
          <li>
            <strong className="text-slate-100">Mandatory 20% Student Discount:</strong> By law (RA 11314), all public utility vehicles and tricycles must grant the 20% discount on regular trips upon presentation of your MMSU ID or e-ID.
          </li>
          <li>
            <strong className="text-slate-100">Night Solo Trips:</strong> If boarding alone past 9:30 PM, drivers usually charge a negotiated special rate (₱30–₱50). Agree on the fare before boarding.
          </li>
          <li>
            <strong className="text-slate-100">Report Overcharging:</strong> Call Batac City Public Safety & Tricycle Regulatory Office at (077) 792-3120 with the tricycle body/TODA number.
          </li>
        </ul>
      </div>
    </div>
  );
};
