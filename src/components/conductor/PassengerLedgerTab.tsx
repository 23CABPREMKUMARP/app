"use client";

import React from "react";
import { motion } from "motion/react";
import { Search } from "lucide-react";
import { useConductor } from "@/src/context/ConductorContext";

export function PassengerLedgerTab() {
  const {
    passengers, setPassengers,
    searchQuery, setSearchQuery,
    passengerFilter, setPassengerFilter,
    setPassengersBoarded, setOccupancy,
    setLogs, playBeep
  } = useConductor();

  const filteredPassengers = passengers.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.ticketId.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = passengerFilter === "All" || 
                          (passengerFilter === "Boarded" && p.status === "Boarded") ||
                          (passengerFilter === "Not Boarded" && p.status === "Not Boarded");
    return matchesSearch && matchesFilter;
  });

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 text-left">
      
      {/* Search and Filters */}
      <div className="bg-white/70 backdrop-blur-md border border-gray-200 shadow-sm rounded-3xl p-5 space-y-4">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-4 top-3.5 text-gray-400" />
            <input
              type="text"
              placeholder="Search Passenger Name or Ticket ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-gray-200 shadow-inner rounded-xl py-3 pl-11 pr-4 focus:outline-none focus:ring-2 focus:ring-orange-500 text-xs text-gray-800 placeholder:text-gray-400 transition-shadow"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          {["All", "Boarded", "Not Boarded"].map((filter) => (
            <button
              key={filter}
              onClick={() => setPassengerFilter(filter as any)}
              className={`px-5 py-2 text-[10px] font-black uppercase tracking-wider rounded-xl transition-all ${
                passengerFilter === filter 
                  ? "bg-orange-50 border border-orange-500 text-orange-600 shadow-sm" 
                  : "bg-white hover:bg-gray-50 border border-gray-200 text-gray-500"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Passenger Table/List */}
      <div className="bg-white/70 backdrop-blur-md border border-gray-200 shadow-sm rounded-3xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50/80 border-b border-gray-200 text-[10px] font-black uppercase text-gray-500 tracking-wider">
              <tr>
                <th className="p-4 px-6">Ticket ID</th>
                <th className="p-4">Passenger Name</th>
                <th className="p-4">Boarding</th>
                <th className="p-4">Destination</th>
                <th className="p-4">Seat</th>
                <th className="p-4 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredPassengers.length > 0 ? (
                filteredPassengers.map((p, i) => (
                  <tr key={i} className="hover:bg-orange-50/50 transition-colors group">
                    <td className="p-4 px-6 font-mono font-bold text-gray-500 group-hover:text-orange-600 transition-colors">{p.ticketId}</td>
                    <td className="p-4 font-bold text-gray-900">{p.name}</td>
                    <td className="p-4 text-gray-500 truncate max-w-[120px]">{p.boarding}</td>
                    <td className="p-4 text-gray-500 truncate max-w-[120px]">{p.destination}</td>
                    <td className="p-4 font-bold text-gray-700">{p.seat}</td>
                    <td className="p-4 text-center">
                      <button
                        onClick={() => {
                          const updated = [...passengers];
                          const index = passengers.findIndex(val => val.ticketId === p.ticketId);
                          if (index !== -1) {
                            updated[index].status = p.status === "Boarded" ? "Not Boarded" : "Boarded";
                            setPassengers(updated);
                            
                            // Update stats
                            setPassengersBoarded(prev => p.status === "Boarded" ? prev - 1 : prev + 1);
                            setOccupancy(prev => p.status === "Boarded" ? Math.max(0, prev - 1) : Math.min(50, prev + 1));
                            
                            setLogs(prev => [
                              { time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), event: `Manually marked ${p.name} as ${updated[index].status}`, type: "ledger" },
                              ...prev
                            ]);
                            playBeep(true);
                          }
                        }}
                        className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-wider border transition-all cursor-pointer shadow-sm ${
                          p.status === "Boarded" 
                            ? "bg-green-50 border-green-200 text-green-600 hover:bg-green-100" 
                            : "bg-white border-gray-200 text-gray-500 hover:bg-gray-50 hover:border-gray-300"
                        }`}
                      >
                        {p.status}
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="p-12 text-center text-gray-400 uppercase tracking-widest font-black text-xs">No passengers matched search query</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
}
