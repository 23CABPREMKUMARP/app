"use client";

import React from "react";
import { motion } from "motion/react";
import { useConductor } from "@/src/context/ConductorContext";

export function AnnouncementsTab() {
  const { notifications } = useConductor();

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 text-left">
      <div className="bg-white/70 backdrop-blur-md border border-gray-200 shadow-sm rounded-3xl p-6 space-y-4">
        <h3 className="text-xs font-black uppercase tracking-widest text-gray-500 border-b border-gray-200 pb-3">Announcements Inbox</h3>
        
        <div className="space-y-3">
          {notifications.length > 0 ? (
            notifications.map((n) => (
              <div key={n.id} className="bg-gray-50/80 p-5 rounded-2xl border border-gray-200 space-y-2 relative overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${n.type === 'warning' ? 'bg-red-500' : 'bg-orange-500'}`} />
                
                <div className="flex justify-between items-center pl-2">
                  <span className={`text-[10px] font-black uppercase tracking-wider ${n.type === 'warning' ? 'text-red-500' : 'text-orange-500'}`}>{n.title}</span>
                  <span className="text-[9px] text-gray-400 font-mono font-medium bg-white px-2 py-0.5 rounded shadow-sm border border-gray-100">{n.time}</span>
                </div>
                <p className="text-xs text-gray-700 leading-relaxed font-medium pl-2">{n.message}</p>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-gray-400 font-bold uppercase tracking-widest text-[10px]">
              No active announcements
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
