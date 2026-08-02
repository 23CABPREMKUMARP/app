"use client";

import React from "react";
import { motion } from "motion/react";
import { Share2, Bus, FileText, ShieldCheck, DollarSign } from "lucide-react";
import { useConductor } from "@/src/context/ConductorContext";

export function DashboardTab() {
  const {
    employeeId,
    speed, setSpeed,
    tripStatus, setTripStatus,
    triggerTripBroadcast,
    playBeep,
    ticketsSold, passengersBoarded, occupancy, totalRevenue, cashCollection, onlineCollection,
    logs, notifications,
    setShowQR
  } = useConductor();

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      {/* Conductor Profile Welcome */}
      <div className="bg-white/70 backdrop-blur-md border border-gray-200 shadow-lg rounded-3xl p-6 relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all hover:shadow-xl">
        <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-bl-full pointer-events-none" />
        
        <div className="space-y-2 z-10">
          <div className="flex items-center gap-2">
            <span className="text-xs font-black uppercase text-orange-600 tracking-widest">Conductor</span>
            <span className="text-[9px] bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded font-mono border border-emerald-200">Shift Active</span>
          </div>
          <h2 className="text-2xl font-black uppercase tracking-tight text-gray-900">Rajesh Kumar</h2>
          <p className="text-xs text-gray-500">Employee ID: <strong className="text-gray-800">{employeeId || "EMP-N/A"}</strong> • Mobile: <strong className="text-gray-800">9876543210</strong></p>
        </div>

        <div className="flex flex-wrap gap-3 pt-2 md:pt-0 z-10">
          <button 
            onClick={() => setShowQR(true)}
            className="px-4 py-3 bg-white hover:bg-gray-50 border border-gray-200 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 transition-all active:scale-95 shadow-sm text-gray-700"
          >
            <Share2 size={14} className="text-orange-500" />
            Show Matrix QR
          </button>
          
          <button 
            onClick={() => {
              const mockSpeed = speed === 0 ? 52 : 0;
              setSpeed(mockSpeed);
              const nextStatus = tripStatus === "Scheduled" ? "Trip Started" : tripStatus === "Trip Started" ? "Arriving Soon" : "Completed";
              setTripStatus(nextStatus);
              triggerTripBroadcast(nextStatus);
              playBeep(true);
            }}
            className="px-4 py-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 transition-all active:scale-95 shadow-lg shadow-orange-500/30 text-white"
          >
            <Bus size={14} />
            Cycle Status
          </button>
        </div>
      </div>

      {/* Core Statistics grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { title: "Tickets Sold", val: ticketsSold, desc: "Total issuances", color: "text-orange-500", bg: "bg-orange-50", icon: FileText },
          { title: "Boarded", val: passengersBoarded, desc: "QR scans", color: "text-emerald-500", bg: "bg-emerald-50", icon: ShieldCheck },
          { title: "Occupancy", val: `${occupancy}/50`, desc: `${Math.round((occupancy/50)*100)}% Full`, color: "text-blue-500", bg: "bg-blue-50", icon: Bus },
          { title: "Revenue", val: `₹${totalRevenue}`, desc: `UPI: ₹${onlineCollection}`, color: "text-purple-500", bg: "bg-purple-50", icon: DollarSign }
        ].map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="bg-white/70 backdrop-blur-sm border border-gray-100 p-5 rounded-2xl space-y-3 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
              <div className={`absolute -right-4 -top-4 w-16 h-16 rounded-full opacity-50 transition-transform group-hover:scale-150 ${stat.bg}`} />
              <div className="flex justify-between items-center text-gray-500 relative z-10">
                <span className="text-[10px] font-bold uppercase tracking-widest">{stat.title}</span>
                <div className={`p-1.5 rounded-lg ${stat.bg}`}>
                  <Icon size={14} className={stat.color} />
                </div>
              </div>
              <h3 className="text-2xl font-black tracking-tight text-gray-900 relative z-10">{stat.val}</h3>
              <p className="text-[10px] text-gray-500 font-semibold relative z-10">{stat.desc}</p>
            </div>
          );
        })}
      </div>

      {/* Operational Timeline / Announcements Quick Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Shift Logs */}
        <div className="bg-white/70 backdrop-blur-md border border-gray-100 rounded-3xl p-6 space-y-4 shadow-sm">
          <div className="flex justify-between items-center">
            <h3 className="text-xs font-black uppercase tracking-widest text-gray-500">Activity Log</h3>
            <span className="text-[9px] text-gray-400 font-mono bg-gray-100 px-2 py-0.5 rounded">Latest 3</span>
          </div>
          <div className="space-y-4 pt-2">
            {logs.slice(0, 3).map((log, i) => (
              <div key={i} className="flex gap-3 items-start text-xs group">
                <div className="w-2 h-2 bg-orange-400 rounded-full mt-1.5 shrink-0 shadow-[0_0_8px_rgba(251,146,60,0.6)] group-hover:scale-150 transition-transform" />
                <div className="flex-1 border-b border-gray-50 pb-3 group-last:border-0">
                  <p className="text-gray-800 font-bold">{log.event}</p>
                  <p className="text-[10px] text-gray-400 font-mono mt-1">{log.time} • {log.type}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Announcement Cards */}
        <div className="bg-white/70 backdrop-blur-md border border-gray-100 rounded-3xl p-6 space-y-4 shadow-sm">
          <div className="flex justify-between items-center">
            <h3 className="text-xs font-black uppercase tracking-widest text-gray-500">Broadcasts</h3>
            <span className="text-[9px] text-orange-600 font-black animate-pulse bg-orange-100 px-2 py-0.5 rounded-full border border-orange-200">LIVE</span>
          </div>
          <div className="space-y-3">
            {notifications.slice(0, 2).map((n) => (
              <div key={n.id} className="bg-gray-50/80 p-4 rounded-xl border border-gray-100 space-y-2 hover:bg-orange-50/50 transition-colors cursor-default">
                <div className="flex justify-between items-center">
                  <span className={`text-[9px] font-black uppercase tracking-wider ${n.type === 'warning' ? 'text-red-500' : 'text-blue-500'}`}>{n.title}</span>
                  <span className="text-[9px] text-gray-400 font-mono">{n.time}</span>
                </div>
                <p className="text-xs text-gray-700 leading-snug font-medium">{n.message}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
