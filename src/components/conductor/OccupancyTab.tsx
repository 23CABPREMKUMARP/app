"use client";

import React from "react";
import { motion } from "motion/react";
import { useConductor } from "@/src/context/ConductorContext";

export function OccupancyTab() {
  const { occupancy, seats, setSeats, setOccupancy, playBeep } = useConductor();

  const toggleSeat = (idx: number) => {
    const updated = [...seats];
    updated[idx] = !updated[idx];
    setSeats(updated);
    setOccupancy(updated.filter(v => v).length);
    playBeep(true);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 text-left">
      <div className="bg-white/70 backdrop-blur-md border border-gray-200 shadow-sm rounded-3xl p-6 space-y-4">
        <div className="flex justify-between items-center border-b border-gray-200 pb-4">
          <div>
            <h3 className="text-xs font-black uppercase tracking-widest text-gray-500">Live Occupancy Monitor</h3>
            <p className="text-[10px] text-gray-400 mt-1">Tap seats to manually toggle boarded state</p>
          </div>
          
          <div className="text-right bg-white p-3 rounded-2xl shadow-sm border border-gray-100">
            <span className="text-3xl font-black text-gray-900 leading-none">{occupancy}<span className="text-lg text-gray-400">/50</span></span>
            <span className="text-[9px] text-gray-500 uppercase font-bold tracking-widest block mt-1">Capacity</span>
          </div>
        </div>

        {/* legend status */}
        <div className="flex gap-6 text-[9px] font-black uppercase tracking-wider text-gray-500 justify-center py-2">
          <div className="flex items-center gap-2 bg-orange-50 px-3 py-1.5 rounded-full border border-orange-100">
            <div className="w-3 h-3 bg-orange-500 rounded shadow-[0_0_8px_rgba(249,115,22,0.4)]" />
            <span className="text-orange-700">Occupied ({occupancy})</span>
          </div>
          <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-200">
            <div className="w-3 h-3 bg-white border border-gray-300 rounded" />
            <span>Available ({50 - occupancy})</span>
          </div>
        </div>

        {/* bus layout seats grid */}
        <div className="bg-gray-100/50 border border-gray-200 p-8 rounded-[32px] relative overflow-hidden shadow-inner max-w-md mx-auto mt-4">
          {/* Driver Steering wheel mockup */}
          <div className="flex justify-between items-center border-b-2 border-dashed border-gray-300 pb-6 mb-8 relative">
            <div className="w-12 h-12 rounded-full border-4 border-gray-400 flex items-center justify-center bg-white shadow-sm">
              <div className="w-4 h-4 bg-gray-300 rounded-full" />
              <div className="absolute w-12 h-1 bg-gray-400 rotate-45" />
            </div>
            <div className="bg-white px-4 py-2 rounded-xl shadow-sm border border-gray-200">
              <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest">FRONT ENTRANCE</span>
            </div>
          </div>

          {/* Seats rows grid */}
          <div className="grid grid-cols-5 gap-3 max-w-[340px] mx-auto">
            {seats.map((isOccupied, idx) => {
              const seatNum = idx + 1;
              const isAisle = (idx % 5 === 2); // column 3 is aisle
              
              if (isAisle) {
                return (
                  <React.Fragment key={`aisle-${idx}`}>
                    <div className="h-10 w-4 flex items-center justify-center">
                      <div className="h-full w-px bg-gray-300/50 border-l border-dashed border-gray-400/30" />
                    </div>
                    <button
                      type="button"
                      onClick={() => toggleSeat(idx)}
                      className={`h-10 rounded-xl border text-[10px] font-bold flex items-center justify-center transition-all active:scale-95 cursor-pointer hover:shadow-md ${
                        isOccupied 
                          ? "bg-gradient-to-br from-orange-400 to-orange-500 border-orange-500 text-white shadow-lg shadow-orange-500/30" 
                          : "bg-white border-gray-200 text-gray-500 hover:border-orange-300 hover:text-orange-500 shadow-sm"
                      }`}
                    >
                      S{seatNum}
                    </button>
                  </React.Fragment>
                );
              }

              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => toggleSeat(idx)}
                  className={`h-10 rounded-xl border text-[10px] font-bold flex items-center justify-center transition-all active:scale-95 cursor-pointer hover:shadow-md ${
                    isOccupied 
                      ? "bg-gradient-to-br from-orange-400 to-orange-500 border-orange-500 text-white shadow-lg shadow-orange-500/30" 
                      : "bg-white border-gray-200 text-gray-500 hover:border-orange-300 hover:text-orange-500 shadow-sm"
                  }`}
                >
                  S{seatNum}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
