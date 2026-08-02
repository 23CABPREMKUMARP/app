"use client";

import React from "react";
import { motion } from "motion/react";
import { Radio, Navigation, AlertCircle, Gauge, Signal, Bus, Clock, Users, ShieldCheck, MapPin, Volume2, CheckCircle2 } from "lucide-react";
import { useConductor } from "@/src/context/ConductorContext";

export function GPSTrackerTab() {
  const {
    gpsState, gpsEnabled, setGpsEnabled,
    busDbId, tripStatus, setTripStatus,
    setBroadcasting, triggerTripBroadcast,
    lat, lng, speed, assignedRouteName,
    playBeep
  } = useConductor();

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-5 text-left">

      {/* GPS Status Header Card */}
      <div className="bg-white/70 backdrop-blur-md border border-gray-200 shadow-sm rounded-3xl p-6 relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-orange-500/5 rounded-full blur-2xl pointer-events-none" />
        
        <div className="flex items-center justify-between mb-5 relative z-10">
          <div className="flex items-center gap-4">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all shadow-sm ${
              gpsState.status === 'broadcasting'
                ? 'bg-gradient-to-br from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-500/30'
                : gpsState.status === 'no_permission'
                ? 'bg-red-50 border border-red-200 text-red-500'
                : 'bg-white border border-gray-200 text-gray-400'
            }`}>
              {gpsState.status === 'broadcasting'
                ? <Radio size={26} className="animate-pulse" />
                : <Navigation size={26} />}
            </div>
            <div>
              <h3 className="text-sm font-black text-gray-900">GPS Tracker</h3>
              <p className={`text-[10px] font-bold uppercase tracking-widest mt-1 ${
                gpsState.status === 'broadcasting' ? 'text-orange-600' :
                gpsState.status === 'error' ? 'text-red-500' :
                gpsState.status === 'no_permission' ? 'text-orange-600' :
                'text-gray-400'
              }`}>
                {gpsState.status === 'broadcasting' ? '● Broadcasting Live' :
                 gpsState.status === 'error' ? '⚠ GPS Error' :
                 gpsState.status === 'no_permission' ? '⚠ Permission Denied' :
                 '○ Standby'}
              </p>
            </div>
          </div>

          {/* Start / End Trip */}
          <button
            onClick={() => {
              const next = !gpsEnabled;
              setGpsEnabled(next);
              if (!next) {
                setBroadcasting(false);
                setTripStatus('Completed');
                triggerTripBroadcast('Completed');
              } else { 
                setBroadcasting(true); 
                setTripStatus('Trip Started');
                triggerTripBroadcast('Trip Started');
              }
              playBeep(true);
            }}
            disabled={!busDbId}
            className={`px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all active:scale-95 disabled:opacity-50 disabled:grayscale ${
              gpsEnabled
                ? 'bg-gradient-to-br from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-lg shadow-red-500/30'
                : 'bg-gradient-to-br from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-lg shadow-orange-500/30'
            }`}
          >
            {gpsEnabled ? 'End Trip' : 'Start Trip'}
          </button>
        </div>

        {/* Error message */}
        {gpsState.errorMessage && (
          <div className="flex items-start gap-2 p-4 bg-red-50 border border-red-200 rounded-2xl text-red-600 text-xs font-bold mb-5 shadow-sm relative z-10">
            <AlertCircle size={16} className="flex-shrink-0 mt-0.5" />
            {gpsState.errorMessage}
          </div>
        )}

        {/* Coordinate Readout */}
        <div className="grid grid-cols-2 gap-4 font-mono relative z-10">
          <div className="bg-white border border-gray-100 shadow-sm rounded-2xl p-4">
            <span className="text-[9px] font-bold text-gray-400 block uppercase tracking-widest mb-1">Latitude</span>
            <span className="text-sm font-bold text-gray-900 tracking-wider">
              {gpsState.lat !== null ? gpsState.lat.toFixed(6) : (lat !== 0 ? lat.toFixed(6) : '—')}
            </span>
          </div>
          <div className="bg-white border border-gray-100 shadow-sm rounded-2xl p-4">
            <span className="text-[9px] font-bold text-gray-400 block uppercase tracking-widest mb-1">Longitude</span>
            <span className="text-sm font-bold text-gray-900 tracking-wider">
              {gpsState.lng !== null ? gpsState.lng.toFixed(6) : (lng !== 0 ? lng.toFixed(6) : '—')}
            </span>
          </div>
        </div>
      </div>

      {/* Live Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white/70 backdrop-blur-md border border-gray-200 shadow-sm rounded-3xl p-5 text-center transition-transform hover:-translate-y-1">
          <div className="w-10 h-10 bg-orange-50 rounded-full flex items-center justify-center mx-auto mb-3">
            <Gauge size={20} className="text-orange-500" />
          </div>
          <p className="text-2xl font-black text-gray-900 leading-none">{gpsState.speed || speed}</p>
          <p className="text-[9px] text-gray-400 uppercase tracking-widest font-bold mt-1">km/h</p>
        </div>
        <div className="bg-white/70 backdrop-blur-md border border-gray-200 shadow-sm rounded-3xl p-5 text-center transition-transform hover:-translate-y-1">
          <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-3">
            <Radio size={20} className="text-blue-500" />
          </div>
          <p className="text-2xl font-black text-gray-900 leading-none">{gpsState.updateCount}</p>
          <p className="text-[9px] text-gray-400 uppercase tracking-widest font-bold mt-1">Updates</p>
        </div>
        <div className="bg-white/70 backdrop-blur-md border border-gray-200 shadow-sm rounded-3xl p-5 text-center transition-transform hover:-translate-y-1">
          <div className="w-10 h-10 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-3">
            <Signal size={20} className="text-emerald-500" />
          </div>
          <p className="text-lg font-black text-gray-900 leading-none mt-1">{gpsState.accuracy ? `${Math.round(gpsState.accuracy)}m` : '—'}</p>
          <p className="text-[9px] text-gray-400 uppercase tracking-widest font-bold mt-1">Accuracy</p>
        </div>
      </div>

      {/* Current Route */}
      <div className="bg-white/70 backdrop-blur-md border border-gray-200 shadow-sm rounded-3xl p-5 flex items-center gap-4 hover:shadow-md transition-shadow">
        <div className="w-12 h-12 bg-gray-100 rounded-2xl flex items-center justify-center flex-shrink-0">
          <Bus size={24} className="text-gray-600" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Current Route</p>
          <p className="text-base font-black text-gray-900 truncate">{assignedRouteName || 'Not Assigned'}</p>
        </div>
        <div className={`text-[10px] font-black px-4 py-2 rounded-xl uppercase tracking-widest shadow-sm ${
          tripStatus === 'Trip Started' || tripStatus === 'Boarding'
            ? 'bg-orange-50 text-orange-600 border border-orange-200'
            : 'bg-white border border-gray-200 text-gray-500'
        }`}>{tripStatus}</div>
      </div>

      {/* Trip Status Controls */}
      <div className="bg-white/70 backdrop-blur-md border border-gray-200 shadow-sm rounded-3xl p-6 space-y-4">
        <h3 className="text-xs font-black uppercase tracking-widest text-gray-500">Update Trip Status</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {[
            { name: "Scheduled", icon: Clock },
            { name: "Boarding", icon: Users },
            { name: "Trip Started", icon: ShieldCheck },
            { name: "Reached Stop", icon: MapPin },
            { name: "Arriving Soon", icon: Volume2 },
            { name: "Completed", icon: CheckCircle2 }
          ].map((s) => {
            const Icon = s.icon;
            const isActive = tripStatus === s.name;
            return (
              <button
                key={s.name}
                onClick={() => { setTripStatus(s.name); triggerTripBroadcast(s.name); playBeep(true); }}
                className={`flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all text-center gap-2 cursor-pointer active:scale-95 ${
                  isActive 
                    ? 'bg-gradient-to-br from-orange-50 to-orange-100 border-orange-400 text-orange-700 shadow-md' 
                    : 'bg-white border-gray-100 text-gray-500 hover:border-gray-300 hover:text-gray-700 shadow-sm hover:shadow'
                }`}
              >
                <div className={`p-2 rounded-xl ${isActive ? 'bg-orange-200/50' : 'bg-gray-50'}`}>
                  <Icon size={20} className={isActive ? 'text-orange-600' : 'text-gray-400'} />
                </div>
                <span className="text-[9px] uppercase tracking-wider font-bold leading-tight">{s.name}</span>
              </button>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
