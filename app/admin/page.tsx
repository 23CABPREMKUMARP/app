"use client";

import React from "react";
import { LayoutDashboard, Bus, ListChecks, Map, Shield, ChevronRight, Activity, Users, Settings } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";

const sidebarLinks = [
  { icon: LayoutDashboard, label: "Overview", href: "/admin", active: true },
  { icon: Bus, label: "Fleet Management", href: "/admin/buses" },
  { icon: ListChecks, label: "Ticket Ledger", href: "/admin/bookings" },
  { icon: Map, label: "Route Engineering", href: "/admin/routes" },
  { icon: Shield, label: "Matrix Tracking", href: "/live-map" },
];

export default function AdminDashboard() {
  const stats = [
    { label: "Active Buses", value: "18", color: "text-green-600", bg: "bg-green-50" },
    { label: "Daily Revenue", value: "₹42,500", color: "text-orange-600", bg: "bg-orange-50" },
    { label: "New Bookings", value: "128", color: "text-blue-600", bg: "bg-blue-50" },
  ];

  return (
    <main className="min-h-screen bg-zinc-50 font-sans flex text-zinc-900">
      {/* Sidebar */}
      <aside className="w-80 bg-white border-r border-zinc-200 flex flex-col p-8 fixed h-full z-50">
        <div className="mb-12">
           <Image src="/logo2.png" alt="Logo" width={200} height={80} className="object-contain" />
           <div className="mt-4 flex items-center gap-2 px-3 py-1 bg-black text-white rounded-full w-fit">
              <Shield size={14} />
              <span className="text-[10px] font-black uppercase tracking-widest">Admin Matrix</span>
           </div>
        </div>

        <nav className="flex-1 space-y-2">
           {sidebarLinks.map((link, i) => (
             <Link 
               key={i}
               href={link.href}
               className={`flex items-center gap-4 px-6 py-4 rounded-2xl font-bold transition-all group ${
                 link.active ? "bg-orange-600 text-white shadow-xl shadow-orange-600/20" : "text-zinc-500 hover:bg-zinc-50 hover:text-orange-600"
               }`}
             >
                <link.icon size={22} className={link.active ? "text-white" : "text-zinc-400 group-hover:text-orange-600"} />
                <span>{link.label}</span>
                {link.active ? <ChevronRight size={18} className="ml-auto" /> : null}
             </Link>
           ))}
        </nav>

        <div className="pt-8 border-t border-zinc-100 space-y-4">
           <div className="p-6 bg-zinc-900 rounded-3xl text-white space-y-4 shadow-2xl relative overflow-hidden group">
              <div className="absolute -right-4 -top-4 w-24 h-24 bg-orange-600/20 rounded-full blur-2xl group-hover:bg-orange-600/30 transition-all duration-500" />
              <h4 className="font-bold relative z-10">System Status</h4>
              <div className="flex items-center gap-3 relative z-10">
                 <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                 <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Core Online</span>
              </div>
              <button className="w-full h-12 bg-white/10 hover:bg-white/20 rounded-xl text-xs font-black uppercase transition-all relative z-10">View Integrity Report</button>
           </div>
        </div>
      </aside>

      {/* Main Content */}
      <section className="flex-1 ml-80 p-12">
        <header className="flex items-center justify-between mb-12">
           <div>
             <h2 className="text-4xl font-black text-zinc-900 tracking-tight">System Overview</h2>
             <p className="text-zinc-400 font-bold uppercase tracking-[0.2em] text-[10px] mt-2 leading-none">Real-time enterprise intelligence</p>
           </div>
           <div className="flex items-center gap-6">
              <div className="text-right">
                 <p className="text-sm font-bold text-zinc-900">Prem Kumar</p>
                 <p className="text-xs font-bold text-zinc-400">Fleet Operations Chief</p>
              </div>
              <div className="w-14 h-14 bg-white rounded-2xl border border-zinc-100 flex items-center justify-center p-3 shadow-sm hover:shadow-xl transition-all cursor-pointer">
                 <Settings size={22} className="text-zinc-400 hover:rotate-90 transition-all duration-500" />
              </div>
           </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-8 mb-12">
           {stats.map((stat, i) => (
             <motion.div 
               key={i}
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: i * 0.1 }}
               className="bg-white p-8 rounded-[40px] border border-zinc-50 shadow-sm relative overflow-hidden group hover:shadow-2xl transition-all duration-500"
             >
                <div className={`absolute right-0 top-0 w-32 h-32 ${stat.bg} rounded-bl-[100px] -mr-8 -mt-8 opacity-50 group-hover:scale-125 transition-transform duration-700`} />
                <p className="text-xs font-black text-zinc-400 uppercase tracking-widest mb-2 relative z-10">{stat.label}</p>
                <p className={`text-4xl font-black ${stat.color} relative z-10`}>{stat.value}</p>
                <div className="mt-6 flex items-center gap-2 relative z-10">
                   <Activity size={14} className="text-green-500" />
                   <span className="text-[10px] font-bold text-green-600 uppercase">+12% from baseline</span>
                </div>
             </motion.div>
           ))}
        </div>

        {/* Recent Activity Mockup */}
        <div className="grid grid-cols-3 gap-8">
           <div className="col-span-2 bg-white rounded-[40px] border border-zinc-50 shadow-sm p-10">
              <div className="flex items-center justify-between mb-8">
                 <h3 className="text-xl font-bold">Fleet Dispersion Matrix</h3>
                 <button className="text-xs font-black text-orange-600 uppercase tracking-widest hover:underline">Full Real-time Report &rarr;</button>
              </div>
              <div className="h-[400px] w-full bg-zinc-50/50 rounded-3xl border border-dashed border-zinc-200 flex items-center justify-center">
                 <div className="text-center space-y-4">
                    <Map size={48} className="mx-auto text-zinc-200" />
                    <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Interactive telemetry visualization offline in dashboard</p>
                    <Link href="/live-map" className="inline-block bg-black text-white px-8 py-3 rounded-2xl font-bold mt-4 shadow-xl">Go to Live Map Terminal</Link>
                 </div>
              </div>
           </div>

           <div className="bg-white rounded-[40px] border border-zinc-50 shadow-sm p-10">
              <h3 className="text-xl font-bold mb-8">Terminal Activity</h3>
              <div className="space-y-8">
                 {[
                   { label: "TN-01-AB-1234", action: "Status: RUNNING", time: "2m ago" },
                   { label: "TN-01-XY-5678", action: "Booking: #JEFF-4A2D", time: "5m ago" },
                   { label: "Mylapore Terminal", action: "Signal: OPTIMAL", time: "12m ago" },
                   { label: "Senthil Kumar", action: "Shift: STARTED", time: "45m ago" },
                 ].map((item, i) => (
                   <div key={i} className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-zinc-50 rounded-xl flex items-center justify-center shrink-0">
                         <Activity size={18} className="text-zinc-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                         <p className="text-sm font-bold text-zinc-900 truncate">{item.label}</p>
                         <p className="text-[10px] font-bold text-zinc-400 mt-0.5">{item.action}</p>
                      </div>
                      <p className="text-[10px] font-bold text-zinc-300 uppercase shrink-0 pt-0.5">{item.time}</p>
                   </div>
                 ))}
              </div>
           </div>
        </div>
      </section>
    </main>
  );
}
