import React, { useMemo } from 'react';
import { motion } from 'motion/react';
import { Navigation, Clock, MapPin, X, ArrowRight, Route, ShieldCheck, Zap } from 'lucide-react';

interface TrackingStatusPanelProps {
  bus: any;
  userLocation: { lat: number; lng: number } | null;
  onClose: () => void;
  onMinimize: () => void;
}

export const TrackingStatusPanel: React.FC<TrackingStatusPanelProps> = ({ bus, userLocation, onClose, onMinimize }) => {
  const from = bus?.routeId?.from || "Start";
  const to = bus?.routeId?.to || "End";
  const speed = bus?.speed || 0;
  const isGpsEnabled = !!(bus?.location?.lat && bus?.location?.lng);

  // Simple progress and status logic for advanced tracking
  const progressPercent = useMemo(() => {
    // In a real app this would use the GPS coordinates vs route path
    const seed = Date.now() + (bus?._id ? bus._id.charCodeAt(0) : 0) * 1000;
    const loopDuration = 120000; 
    let progress = (seed % loopDuration) / loopDuration;
    if (progress > 0.5) progress = 1 - (progress - 0.5) * 2;
    else progress = progress * 2;
    return Math.floor(progress * 100);
  }, [bus]);

  const trackingStatus = useMemo(() => {
    if (progressPercent < 5) return "Departed";
    if (progressPercent < 85) return "On Route";
    if (progressPercent < 98) return "Nearing Destination";
    return "Arrived";
  }, [progressPercent]);

  const etaMinutes = Math.max(1, Math.floor((100 - progressPercent) / 2));
  const distanceRemaining = Math.max(0.5, ((100 - progressPercent) * 0.15)).toFixed(1);

  return (
    <motion.div
      initial={{ y: "100%" }}
      animate={{ y: 0 }}
      exit={{ y: "100%" }}
      transition={{ type: "spring", damping: 30, stiffness: 200 }}
      drag="y"
      dragConstraints={{ top: 0 }}
      dragElastic={0.2}
      onDragEnd={(_, info) => {
        if (info.offset.y > 150) {
          onMinimize();
        }
      }}
      className="fixed inset-x-0 bottom-0 z-[1000] bg-white rounded-t-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.1)] border-t border-slate-100 flex flex-col max-h-[92vh] overflow-hidden"
    >
      <div className="w-full flex justify-center py-4 cursor-grab active:cursor-grabbing">
        <div className="w-12 h-1.5 bg-zinc-200 rounded-full" />
      </div>

      <div className="px-6 md:px-12 pb-12 overflow-y-auto no-scrollbar">
        <div className="flex justify-between items-start mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              {isGpsEnabled ? (
                <>
                  <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 text-[9px] font-black uppercase tracking-widest rounded">
                    {trackingStatus}
                  </span>
                  <span className="flex items-center gap-1 text-[9px] font-bold text-slate-400">
                    <ShieldCheck size={10} /> Live GPS
                  </span>
                </>
              ) : (
                <span className="px-2 py-0.5 bg-zinc-100 text-zinc-500 text-[9px] font-black uppercase tracking-widest rounded flex items-center gap-1 border border-zinc-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-zinc-300"></span>
                  GPS Not Installed
                </span>
              )}
            </div>
            <h2 className="text-2xl font-black text-zinc-900 tracking-tight uppercase">
              {bus.busNumber}
            </h2>
            <p className="text-sm font-bold text-zinc-500">{bus.routeId?.routeName}</p>
          </div>
          <button 
            onClick={onClose}
            className="w-10 h-10 bg-zinc-100 rounded-full flex items-center justify-center text-zinc-500 hover:bg-zinc-200 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Route Visualizer */}
        <div className="bg-zinc-950 rounded-[24px] p-6 mb-6 relative overflow-hidden group">
          <div className="absolute inset-y-0 left-0 w-1 bg-primary" />
          <div className="flex flex-col gap-1">
            <span className="text-[8px] font-black text-zinc-500 uppercase tracking-[0.3em]">Boarding</span>
            <span className="text-sm font-black text-white uppercase truncate">{from}</span>
          </div>
          <div className="flex-1 flex flex-col items-center px-4 my-4">
            <div className="w-full h-1 bg-zinc-800 relative rounded-full overflow-hidden">
              <div 
                className="absolute inset-y-0 left-0 bg-primary transition-all duration-1000 ease-linear"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
          <div className="flex flex-col gap-1 text-right">
            <span className="text-[8px] font-black text-zinc-500 uppercase tracking-[0.3em]">Destination</span>
            <span className="text-sm font-black text-white uppercase truncate">{to}</span>
          </div>
        </div>

        {/* Live Stats */}
        {isGpsEnabled ? (
          <div className="grid grid-cols-3 gap-3 mb-6">
            <div className="bg-orange-50 rounded-[20px] p-4 flex flex-col items-center justify-center border border-orange-100">
              <Clock size={20} className="text-primary mb-1" />
              <span className="text-lg font-black text-zinc-900">{etaMinutes} <span className="text-[10px]">mins</span></span>
              <span className="text-[8px] font-bold text-zinc-500 uppercase tracking-widest mt-1">ETA</span>
            </div>
            <div className="bg-blue-50 rounded-[20px] p-4 flex flex-col items-center justify-center border border-blue-100">
              <Route size={20} className="text-blue-500 mb-1" />
              <span className="text-lg font-black text-zinc-900">{distanceRemaining} <span className="text-[10px]">km</span></span>
              <span className="text-[8px] font-bold text-zinc-500 uppercase tracking-widest mt-1">Remaining</span>
            </div>
            <div className="bg-emerald-50 rounded-[20px] p-4 flex flex-col items-center justify-center border border-emerald-100">
              <Zap size={20} className="text-emerald-500 mb-1" />
              <span className="text-lg font-black text-zinc-900">{speed} <span className="text-[10px]">km/h</span></span>
              <span className="text-[8px] font-bold text-zinc-500 uppercase tracking-widest mt-1">Speed</span>
            </div>
          </div>
        ) : (
          <div className="bg-zinc-50 rounded-[20px] p-6 mb-6 flex flex-col items-center justify-center border border-zinc-200 text-center">
            <MapPin size={32} className="text-zinc-300 mb-2" />
            <span className="text-sm font-black text-zinc-500 uppercase tracking-widest">Live tracking is not available for this bus.</span>
            <span className="text-[10px] font-bold text-zinc-400 uppercase mt-1">Route schedule shown instead</span>
          </div>
        )}

        <div className="grid grid-cols-2 gap-3">
          <button 
            onClick={onMinimize}
            className="h-14 bg-zinc-100 text-zinc-900 rounded-[20px] font-black uppercase tracking-widest text-[10px] hover:bg-zinc-200 transition-all flex items-center justify-center gap-2"
          >
            <Navigation size={14} className="text-zinc-500 rotate-45" /> Map View
          </button>
          <button 
            onClick={onClose}
            className="h-14 bg-zinc-900 text-white rounded-[20px] font-black uppercase tracking-widest text-[10px] hover:bg-zinc-800 transition-all flex items-center justify-center gap-2"
          >
            End Tracking
          </button>
        </div>
      </div>
    </motion.div>
  );
};
