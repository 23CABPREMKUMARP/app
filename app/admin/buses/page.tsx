"use client";

import React, { useState, useEffect } from "react";
import { Bus, Plus, Search, Map, Trash2, Edit2, ChevronRight, Activity, LayoutDashboard, ListChecks, Shield, X, Save, User, Navigation, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";

export default function AdminBusesPage() {
  const [buses, setBuses] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({
    busNumber: "",
    driverName: "",
    status: "Stopped",
    fare: "",
    totalSeats: "40",
    departureTime: "",
    arrivalTime: "",
  });

  useEffect(() => {
    fetchBuses();
  }, []);

  const fetchBuses = async () => {
    try {
      const res = await fetch("/api/buses");
      const data = await res.json();
      setBuses(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddBus = async (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate save or call API
    setIsAdding(false);
  };

  return (
    <main className="min-h-screen bg-zinc-50 font-sans flex flex-col">
      <header className="h-20 bg-white border-b border-zinc-200 flex items-center justify-between px-8">
        <div className="flex items-center gap-4">
          <Bus size={32} className="text-orange-600" />
          <div>
             <h1 className="text-xl font-bold text-zinc-900">Bus Management</h1>
             <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest leading-none mt-1">Admin Dashboard</p>
          </div>
        </div>
        <button 
          onClick={() => setIsAdding(true)}
          className="flex items-center gap-2 bg-black text-white px-6 py-3 rounded-2xl font-bold hover:bg-zinc-800 transition-all shadow-lg"
        >
          <Plus size={20} /> Add Bus
        </button>
      </header>

      <div className="p-8 max-w-7xl mx-auto w-full flex-1">
        {isLoading ? (
           <div className="flex flex-col items-center justify-center py-24 space-y-4">
              <div className="w-10 h-10 border-4 border-orange-600 border-t-transparent rounded-full animate-spin" />
              <p className="text-zinc-500 font-medium font-serif italic tracking-tight">Accessing fleet database...</p>
           </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {buses.map((bus) => (
              <motion.div 
                key={bus._id}
                whileHover={{ y: -5 }}
                className="bg-white rounded-3xl p-6 border border-zinc-100 shadow-sm hover:shadow-xl transition-all"
              >
                <div className="flex items-center justify-between mb-4">
                   <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-zinc-50 text-zinc-400 rounded-2xl flex items-center justify-center">
                        <Bus size={24} />
                      </div>
                      <div>
                        <h3 className="text-lg font-black text-zinc-900 leading-none">{bus.busNumber}</h3>
                        <p className="text-xs font-bold text-zinc-400 uppercase mt-1 tracking-tighter">{bus.driverName}</p>
                        <div className="flex items-center gap-3 mt-3">
                           <button className="p-3 bg-zinc-900 text-white rounded-xl transition-all shadow-xl hover:bg-orange-600 group-hover:scale-105">
                              <Activity size={16} />
                           </button>
                           <button className="p-3 hover:bg-white hover:text-orange-600 rounded-xl transition-all shadow-sm border border-transparent hover:border-zinc-100">
                              <Edit2 size={16} />
                           </button>
                           <button className="p-3 hover:bg-red-50 hover:text-red-500 rounded-xl transition-all border border-transparent hover:border-red-100 text-zinc-300">
                              <Trash2 size={16} />
                           </button>
                        </div>
                      </div>
                   </div>
                   <div className="flex items-center gap-1">
                      <button className="p-2 hover:bg-zinc-50 text-zinc-400 hover:text-orange-600 rounded-lg transition-colors">
                        <Edit2 size={18} />
                      </button>
                      <button className="p-2 hover:bg-red-50 text-zinc-400 hover:text-red-500 rounded-lg transition-colors">
                        <Trash2 size={18} />
                      </button>
                   </div>
                </div>

                <div className="space-y-4">
                   <div className="flex justify-between items-center px-4 py-3 bg-zinc-50 rounded-2xl border border-zinc-100/50">
                      <div className="text-center">
                        <span className="text-[10px] font-black text-zinc-400 uppercase block">Departure</span>
                        <span className="text-sm font-bold text-zinc-900">{bus.departureTime}</span>
                      </div>
                      <div className="flex-1 px-4">
                        <div className="h-px w-full bg-zinc-200 relative">
                           <div className="absolute top-1/2 left-0 -translate-y-1/2 w-1 h-1 rounded-full bg-orange-600" />
                           <div className="absolute top-1/2 right-0 -translate-y-1/2 w-1 h-1 rounded-full bg-orange-600" />
                        </div>
                      </div>
                      <div className="text-center">
                        <span className="text-[10px] font-black text-zinc-400 uppercase block">Arrival</span>
                        <span className="text-sm font-bold text-zinc-900">{bus.arrivalTime}</span>
                      </div>
                   </div>

                   <div className="grid grid-cols-2 gap-3">
                      <div className="p-3 bg-zinc-50 rounded-xl border border-zinc-100/50">
                         <span className="text-[10px] font-black text-zinc-400 uppercase block">Fare</span>
                         <span className="text-sm font-bold text-zinc-900">₹{bus.fare}</span>
                      </div>
                      <div className="p-3 bg-zinc-50 rounded-xl border border-zinc-100/50">
                         <span className="text-[10px] font-black text-zinc-400 uppercase block">Seats</span>
                         <span className="text-sm font-bold text-zinc-900">{bus.availableSeats} / {bus.totalSeats}</span>
                      </div>
                   </div>

                   <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center gap-1.5">
                         <div className={`w-2 h-2 rounded-full ${bus.status === "Running" ? "bg-green-500" : "bg-blue-500"}`} />
                         <span className="text-xs font-bold text-zinc-700">{bus.status}</span>
                      </div>
                      <Link href="/live-map" className="text-xs font-bold text-orange-600 hover:underline">Track Live &rarr;</Link>
                   </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Add Bus Modal */}
      <AnimatePresence>
        {isAdding && (
          <div className="fixed inset-0 z-[1000] flex items-center justify-center px-6">
             <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               onClick={() => setIsAdding(false)}
               className="absolute inset-0 bg-black/60 backdrop-blur-md"
             />
             <motion.div 
               initial={{ scale: 0.9, opacity: 0, y: 20 }}
               animate={{ scale: 1, opacity: 1, y: 0 }}
               exit={{ scale: 0.9, opacity: 0, y: 20 }}
               className="bg-white rounded-[40px] w-full max-w-2xl relative overflow-hidden shadow-2xl border border-white/50"
             >
                <form onSubmit={handleAddBus} className="p-8 md:p-12 space-y-8">
                   <div className="flex items-center justify-between">
                      <h2 className="text-3xl font-black text-zinc-900">Add New Bus</h2>
                      <button 
                        type="button"
                        onClick={() => setIsAdding(false)}
                        className="p-3 hover:bg-zinc-100 rounded-full transition-colors"
                      >
                         <X size={28} className="text-zinc-400" />
                      </button>
                   </div>

                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest pl-2">Bus Identifier</label>
                        <input type="text" required placeholder="TN-01-AB-0000" className="w-full h-16 bg-zinc-100 border-none rounded-3xl px-6 font-bold text-zinc-900 focus:ring-4 focus:ring-orange-600/10 transition-all outline-none" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest pl-2">Deployment Status</label>
                        <select className="w-full h-16 bg-zinc-100 border-none rounded-3xl px-6 font-bold text-zinc-900 focus:ring-4 focus:ring-orange-600/10 transition-all outline-none">
                            <option>Running</option>
                            <option>Stopped</option>
                            <option>Maintenance</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest pl-2">Assign 3D GLB Model</label>
                        <input type="file" className="w-full h-16 bg-zinc-100 border-none rounded-3xl px-6 py-4 font-bold text-zinc-500 focus:ring-4 focus:ring-orange-600/10 transition-all outline-none" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest pl-2">Quantum Fare Rate</label>
                        <input type="number" required placeholder="₹ 0.00" className="w-full h-16 bg-zinc-100 border-none rounded-3xl px-6 font-bold text-zinc-900 focus:ring-4 focus:ring-orange-600/10 transition-all outline-none" />
                      </div>
                   </div>

                   <div className="flex gap-4 pt-4">
                      <button 
                        type="button"
                        onClick={() => setIsAdding(false)}
                        className="flex-1 h-16 rounded-3xl font-bold text-zinc-600 bg-zinc-100 hover:bg-zinc-200 transition-all"
                      >
                         Cancel
                      </button>
                      <button 
                        type="submit"
                        className="flex-[2] h-16 rounded-3xl font-bold bg-black text-white hover:bg-zinc-800 transition-all flex items-center justify-center gap-2 shadow-xl hover:shadow-2xl hover:translate-y-[-2px]"
                      >
                         <Save size={20} /> Deploy Bus into Fleet
                      </button>
                   </div>
                </form>
             </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}
