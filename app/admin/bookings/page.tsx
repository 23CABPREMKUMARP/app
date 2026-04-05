"use client";

import React, { useState } from "react";
import { ListChecks, Search, Trash2, Eye, ChevronRight, Activity, LayoutDashboard, Bus, Map, Shield, Download, QrCode } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";

const sidebarLinks = [
  { icon: LayoutDashboard, label: "Overview", href: "/admin" },
  { icon: Bus, label: "Fleet Management", href: "/admin/buses" },
  { icon: ListChecks, label: "Ticket Ledger", href: "/admin/bookings", active: true },
  { icon: Map, label: "Route Engineering", href: "/admin/routes" },
  { icon: Shield, label: "Matrix Tracking", href: "/live-map" },
];

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<any[]>([
    { _id: "1", ticketId: "JEFF-9A2X", userName: "Prem Kumar", busNumber: "TN-01-AB-1234", status: "Confirmed", date: "2024-03-22", amount: 250 },
    { _id: "2", ticketId: "JEFF-4B8Y", userName: "Anjali Devi", busNumber: "TN-01-XY-5678", status: "Confirmed", date: "2024-03-22", amount: 500 },
  ]);

  return (
    <main className="min-h-screen bg-zinc-50 font-sans flex text-zinc-900">
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

      <section className="flex-1 ml-80 p-12 bg-zinc-50">
        <header className="flex items-center justify-between mb-12">
           <div>
             <h2 className="text-4xl font-black text-zinc-900 tracking-tight italic uppercase italic uppercase">Ticket Ledger</h2>
             <p className="text-zinc-400 font-bold uppercase tracking-[0.2em] text-[10px] mt-2 leading-none">Quantum Booking Matrix</p>
           </div>
           <button className="h-16 bg-black text-white px-10 rounded-[28px] font-black italic text-sm tracking-widest flex items-center gap-4 hover:scale-105 active:scale-95 transition-all shadow-2xl">
              <Download size={20} /> Export Audit Log
           </button>
        </header>

        <div className="bg-white rounded-[48px] shadow-sm border border-zinc-100 overflow-hidden">
           <div className="p-8 border-b border-zinc-50 flex items-center justify-between bg-zinc-50/10">
              <div className="flex items-center gap-6 flex-1 max-w-xl">
                 <div className="relative flex-1">
                    <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
                    <input type="text" placeholder="Filter booking ID / Passenger..." className="w-full h-14 bg-white border-none rounded-2xl px-14 font-bold text-sm outline-none focus:ring-4 focus:ring-orange-600/5 transition-all" />
                 </div>
              </div>
           </div>

           <div className="p-4 overflow-x-auto">
              <table className="w-full border-collapse">
                 <thead>
                    <tr className="text-left">
                       <th className="p-6 text-[10px] font-black text-zinc-400 uppercase tracking-widest">Neural ID</th>
                       <th className="p-6 text-[10px] font-black text-zinc-400 uppercase tracking-widest">Subject</th>
                       <th className="p-6 text-[10px] font-black text-zinc-400 uppercase tracking-widest">Matrix Asset</th>
                       <th className="p-6 text-[10px] font-black text-zinc-400 uppercase tracking-widest">Credits</th>
                       <th className="p-6 text-[10px] font-black text-zinc-400 uppercase tracking-widest">Status</th>
                       <th className="p-6 text-[10px] font-black text-zinc-400 uppercase tracking-widest">Actions</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-zinc-50">
                    {bookings.map((booking) => (
                       <tr key={booking._id} className="group hover:bg-zinc-50/50 transition-all">
                          <td className="p-6">
                             <div className="flex items-center gap-4">
                                <span className="font-black italic text-zinc-900 leading-none">#{booking.ticketId}</span>
                             </div>
                          </td>
                          <td className="p-6 text-sm font-bold text-zinc-600">{booking.userName}</td>
                          <td className="p-6 text-sm font-black text-zinc-900">{booking.busNumber}</td>
                          <td className="p-6 text-sm font-black text-orange-600 italic">₹{booking.amount}</td>
                          <td className="p-6">
                             <span className="px-4 py-2 bg-green-50 text-green-600 rounded-full text-[10px] font-black uppercase tracking-widest border border-green-600/10 whitespace-nowrap">● {booking.status}</span>
                          </td>
                          <td className="p-6">
                             <div className="flex items-center gap-3">
                                <button className="p-3 bg-zinc-900 text-white rounded-xl transition-all shadow-xl hover:bg-orange-600">
                                   <Eye size={16} />
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

        <div className="mt-12 p-8 bg-black rounded-[48px] shadow-2xl relative overflow-hidden group">
           <div className="absolute inset-0 bg-gradient-to-tr from-orange-600/20 to-indigo-600/20 opacity-30 group-hover:opacity-50 transition-opacity" />
           <div className="relative z-10 flex items-center justify-between">
              <div className="space-y-4">
                 <h3 className="text-2xl font-black italic text-white tracking-widest uppercase">Transaction Matrix Active</h3>
                 <p className="text-zinc-500 text-xs font-bold max-w-sm">Secure ledger synchronization in progress. Real-time audit logs are being generated across all fleet deployment zones.</p>
              </div>
              <Activity className="text-orange-500 animate-pulse" size={48} />
           </div>
        </div>
      </section>
    </main>
  );
}
