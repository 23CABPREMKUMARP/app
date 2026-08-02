"use client";

import React from "react";
import { motion } from "motion/react";
import { Wifi, WifiOff } from "lucide-react";
import { useConductor } from "@/src/context/ConductorContext";

export function SyncTab() {
  const {
    isOffline, setIsOffline,
    offlineQueue, setOfflineQueue,
    validating, setValidating,
    setLogs, playBeep
  } = useConductor();

  const handleSyncData = () => {
    if (offlineQueue.length === 0) return;
    
    setValidating(true);
    setTimeout(() => {
      setValidating(false);
      setLogs(prev => [
        { time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), event: `Offline Sync completed successfully (${offlineQueue.length} records)`, type: "sync" },
        ...prev
      ]);
      setOfflineQueue([]);
      playBeep(true);
    }, 2000);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 text-left">
      
      {/* Offline Settings Status */}
      <div className="bg-white/70 backdrop-blur-md border border-gray-200 shadow-sm rounded-3xl p-6 space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            {isOffline ? (
              <div className="w-12 h-12 bg-red-50 border border-red-200 text-red-500 rounded-2xl flex items-center justify-center shadow-sm"><WifiOff size={24} /></div>
            ) : (
              <div className="w-12 h-12 bg-green-50 border border-green-200 text-green-600 rounded-2xl flex items-center justify-center shadow-sm"><Wifi size={24} /></div>
            )}
            <div>
              <h3 className="text-base font-black text-gray-900">Offline Transit Mode</h3>
              <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mt-1">
                {isOffline ? "Currently working in disconnected mode" : "Synced to central database node"}
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              setIsOffline(!isOffline);
              playBeep(true);
            }}
            className={`px-5 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all cursor-pointer shadow-sm active:scale-95 ${
              isOffline 
                ? "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white" 
                : "bg-gradient-to-r from-red-50 to-red-100 hover:from-red-100 hover:to-red-200 border border-red-200 text-red-600"
            }`}
          >
            {isOffline ? "Go Online" : "Go Offline"}
          </button>
        </div>
      </div>

      {/* Sync Queue */}
      <div className="bg-white/70 backdrop-blur-md border border-gray-200 shadow-sm rounded-3xl p-6 space-y-4">
        <div className="flex justify-between items-center border-b border-gray-200 pb-4">
          <h3 className="text-xs font-black uppercase tracking-widest text-gray-500">Offline Queue Cache</h3>
          <span className="text-[10px] bg-gray-100 border border-gray-200 px-3 py-1 rounded-full font-mono text-gray-600 font-bold shadow-inner">
            {offlineQueue.length} pending actions
          </span>
        </div>

        {offlineQueue.length > 0 ? (
          <div className="space-y-3">
            {offlineQueue.map((item, idx) => (
              <div key={idx} className="bg-gray-50/80 p-4 rounded-xl border border-gray-200 flex justify-between items-center text-xs shadow-sm hover:shadow transition-shadow">
                <div>
                  <span className="text-[9px] font-black uppercase tracking-wider text-orange-500 block mb-1">{item.type}</span>
                  <span className="font-mono font-bold text-gray-700">{item.token || item.ticket?.ticketId}</span>
                </div>
                <span className="text-[10px] text-gray-400 font-mono font-medium">{new Date(item.time || Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
              </div>
            ))}

            <button
              onClick={handleSyncData}
              disabled={isOffline || validating}
              className="w-full py-4 mt-4 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-xl font-black uppercase tracking-widest text-[10px] active:scale-95 shadow-lg shadow-orange-500/20 disabled:opacity-50 disabled:grayscale transition-all cursor-pointer"
            >
              {validating ? "Syncing..." : "Sync Offline Queue Now"}
            </button>
            {isOffline && <p className="text-center text-[10px] text-red-500 font-bold uppercase tracking-wider mt-2">Cannot sync while offline mode is active.</p>}
          </div>
        ) : (
          <div className="text-center py-12 text-gray-400 uppercase tracking-widest font-black text-[10px] space-y-3 bg-gray-50/50 rounded-2xl border-2 border-dashed border-gray-200">
            <Wifi size={32} className="mx-auto text-gray-300" />
            <p>No offline transactions in queue cache</p>
          </div>
        )}
      </div>
    </motion.div>
  );
}
