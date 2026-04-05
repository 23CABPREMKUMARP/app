"use client";

import React, { useState } from "react";
import { Map, Plus, Search, Trash2, Edit2, ChevronRight, Activity, MapPin, Navigation, LayoutDashboard, Bus, ListChecks, Shield } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";

const sidebarLinks = [
  { icon: LayoutDashboard, label: "Overview", href: "/admin" },
  { icon: Bus, label: "Fleet Management", href: "/admin/buses" },
  { icon: ListChecks, label: "Ticket Ledger", href: "/admin/bookings" },
  { icon: Map, label: "Route Engineering", href: "/admin/routes", active: true },
  { icon: Shield, label: "Matrix Tracking", href: "/live-map" },
];

export default function AdminRoutesPage() {
  const [routes, setRoutes] = useState<any[]>([
    { _id: "1", routeName: "Anna Salai Line", from: "Guindy", to: "T Nagar", stops: 12, status: "Active" },
    { _id: "2", routeName: "ECR Express", from: "Mylapore", to: "OMR", stops: 8, status: "Active" },
  ]);

  return (
    <main className="min-h-screen bg-zinc-50 font-sans flex text-zinc-900">
      {/* Sidebar - Consistent with Admin Dashboard */}
      <aside className="w-80 bg-white border-r border-zinc-200 flex flex-col p-8 fixed h-full z-50">
        <div className="mb-12">
           <Image src="/logo2.png" alt="Logo" width={200} height={80} className="object-contain" priority />
        </div>
        <nav className="flex-1 space-y-2">
           {sidebarLinks.map((link, i) => (
             <Link key={i} href={link.href} className={`flex items-center gap-4 px-6 py-4 rounded-2xl font-bold transition-all group ${link.active ? "bg-orange-600 text-white shadow-xl shadow-orange-600/20" : "text-zinc-500 hover:bg-zinc-50 hover:text-orange-600"}`}>
                <link.icon size={22} className={link.active ? "text-white" : "text-zinc-400 group-hover:text-orange-600"} />
                <span>{link.label}</span>
                {link.active && <ChevronRight size={18} className="ml-auto" />}
             </Link>
           ))}
        </nav>
      </aside>

      {/* Main Content */}
      <section className="flex-1 ml-80 p-12 bg-zinc-50">
        <header className="flex items-center justify-between mb-12">
           <div>
             <h2 className="text-4xl font-black text-zinc-900 tracking-tight italic">Route Engineering</h2>
             <p className="text-zinc-400 font-bold uppercase tracking-[0.2em] text-[10px] mt-2 leading-none">Mapping the future of transit</p>
           </div>
           <button className="h-16 bg-black text-white px-10 rounded-[28px] font-black italic text-sm tracking-widest flex items-center gap-4 hover:scale-105 active:scale-95 transition-all shadow-2xl">
              <Plus size={20} /> Deploy New Route
           </button>
        </header>

        <div className="bg-white rounded-[48px] shadow-sm border border-zinc-100 overflow-hidden">
           <div className="p-8 border-b border-zinc-50 flex items-center justify-between bg-zinc-50/10">
              <div className="flex items-center gap-6 flex-1 max-w-xl">
                 <div className="relative flex-1">
                    <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
                    <input type="text" placeholder="Search route matrix..." className="w-full h-14 bg-white border-none rounded-2xl px-14 font-bold text-sm outline-none focus:ring-4 focus:ring-orange-600/5 transition-all" />
                 </div>
              </div>
           </div>

           <div className="p-4 overflow-x-auto">
              <table className="w-full border-collapse">
                 <thead>
                    <tr className="text-left">
                       <th className="p-6 text-[10px] font-black text-zinc-400 uppercase tracking-widest">Route Core</th>
                       <th className="p-6 text-[10px] font-black text-zinc-400 uppercase tracking-widest">Topology</th>
                       <th className="p-6 text-[10px] font-black text-zinc-400 uppercase tracking-widest">Stops</th>
                       <th className="p-6 text-[10px] font-black text-zinc-400 uppercase tracking-widest">Integrity</th>
                       <th className="p-6 text-[10px] font-black text-zinc-400 uppercase tracking-widest">Actions</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-zinc-50">
                    {routes.map((route) => (
                       <tr key={route._id} className="group hover:bg-zinc-50/50 transition-all">
                          <td className="p-6">
                             <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-orange-600/10 rounded-2xl flex items-center justify-center text-orange-600 border border-orange-600/20 group-hover:scale-110 transition-transform">
                                   <Map size={20} />
                                </div>
                                <div>
                                   <p className="font-black italic text-zinc-900 leading-none">{route.routeName}</p>
                                   <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-tighter mt-1 leading-none">Verified Route Link</p>
                                </div>
                             </div>
                          </td>
                          <td className="p-6">
                             <div className="flex items-center gap-3">
                                <span className="text-xs font-bold text-zinc-500">{route.from}</span>
                                <ChevronRight size={14} className="text-zinc-200" />
                                <span className="text-xs font-bold text-zinc-900">{route.to}</span>
                             </div>
                          </td>
                          <td className="p-6">
                             <div className="flex items-center gap-2">
                                <Navigation size={14} className="text-zinc-400" />
                                <span className="text-xs font-black italic">{route.stops} Junctions</span>
                             </div>
                          </td>
                          <td className="p-6">
                             <span className="px-4 py-2 bg-green-50 text-green-600 rounded-full text-[10px] font-black uppercase tracking-widest border border-green-600/10">● {route.status}</span>
                          </td>
                          <td className="p-6">
                             <div className="flex items-center gap-3">
                                <button className="p-3 hover:bg-white hover:text-orange-600 rounded-xl transition-all shadow-sm border border-transparent hover:border-zinc-100">
                                   <Edit2 size={16} />
                                </button>
                                <button className="p-3 hover:bg-red-50 hover:text-red-500 rounded-xl transition-all border border-transparent hover:border-red-100 text-zinc-300">
                                   <Trash2 size={16} />
                                </button>
                             </div>
                          </td>
                       </tr>
                    ))}
                 </tbody>
              </table>
           </div>
        </div>

        {/* Route Graph Visualizer (Mock) */}
        <div className="mt-12 p-8 bg-zinc-900 rounded-[48px] border border-white/5 shadow-2xl relative overflow-hidden group">
           <div className="absolute inset-0 bg-gradient-to-tr from-orange-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
           <div className="relative z-10 flex items-center justify-between">
              <div className="space-y-4">
                 <h3 className="text-2xl font-black italic text-white tracking-widest uppercase italic uppercase">Tactical Route Manifest</h3>
                 <p className="text-zinc-500 text-xs font-bold max-w-sm">Synchronize spatial coordinates and path vectors for real-time telemetry updates. Current accuracy: 99.8%.</p>
                 <button className="bg-orange-600 text-white px-8 py-4 rounded-2xl font-black italic text-xs tracking-widest hover:bg-orange-500 shadow-xl self-start mt-4">Initialize Path Plotting</button>
              </div>
              <div className="w-64 h-64 border-4 border-white/5 rounded-full flex items-center justify-center relative">
                 <div className="absolute inset-0 border-2 border-orange-500/20 rounded-full animate-ping" />
                 <MapPin size={48} className="text-orange-500 shadow-lg shadow-orange-500/50" />
              </div>
           </div>
        </div>
      </section>
    </main>
  );
}
