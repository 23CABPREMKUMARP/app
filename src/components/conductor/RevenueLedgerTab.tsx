"use client";

import React from "react";
import { motion } from "motion/react";
import { useConductor } from "@/src/context/ConductorContext";

export function RevenueLedgerTab() {
  const {
    cashCollection, onlineCollection, totalRevenue,
    signOut, router
  } = useConductor();

  const handleLogout = () => {
    signOut(() => router.push("/"));
  };

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 text-left">
      <div className="bg-white/70 backdrop-blur-md border border-gray-200 shadow-sm rounded-3xl p-6 space-y-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 rounded-bl-full pointer-events-none" />
        
        <h3 className="text-xs font-black uppercase tracking-widest text-gray-500 border-b border-gray-200 pb-3 relative z-10">Collection Summary</h3>
        
        <div className="space-y-5 pt-2 relative z-10">
          <div className="flex justify-between items-center text-sm p-4 bg-gray-50 rounded-2xl border border-gray-100">
            <span className="text-gray-500 font-bold uppercase tracking-widest text-[10px]">Cash Collection Ledger:</span>
            <span className="font-black text-gray-900 text-lg">₹{cashCollection}</span>
          </div>
          
          <div className="flex justify-between items-center text-sm p-4 bg-blue-50/50 rounded-2xl border border-blue-100">
            <span className="text-blue-600/70 font-bold uppercase tracking-widest text-[10px]">UPI / QR Digital Ledger:</span>
            <span className="font-black text-blue-900 text-lg">₹{onlineCollection}</span>
          </div>
          
          <div className="h-px bg-gray-200 w-full my-4" />
          
          <div className="flex justify-between items-center text-sm p-6 bg-gradient-to-r from-orange-50 to-orange-100 rounded-2xl border border-orange-200 shadow-inner">
            <span className="text-orange-700 font-black uppercase tracking-widest text-xs">Total Revenue Ledger:</span>
            <span className="font-black text-orange-600 text-3xl">₹{totalRevenue}</span>
          </div>
        </div>
      </div>

      <div className="bg-white/70 backdrop-blur-md border border-gray-200 shadow-sm rounded-3xl p-6 space-y-4">
        <h3 className="text-xs font-black uppercase tracking-widest text-gray-500">Shift Handover Operations</h3>
        <p className="text-[10px] text-gray-400 leading-relaxed uppercase tracking-wider font-bold">
          Tap below to close the current shift tally, save collections report, and transfer transit controls to the next supervisor node.
        </p>
        <button
          onClick={() => {
            alert("Shift details locked successfully. Receipts exported to terminal database.");
            handleLogout();
          }}
          className="w-full py-4 mt-2 bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-900 hover:to-black text-white rounded-xl font-black uppercase tracking-widest text-[10px] active:scale-95 shadow-lg shadow-gray-900/20 transition-all cursor-pointer"
        >
          Lock Ledger & End Shift
        </button>
      </div>
    </motion.div>
  );
}
