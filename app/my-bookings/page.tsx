"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { Ticket, ArrowLeft, Calendar, MapPin, Clock, User, Download, QrCode, Zap, Info, ShieldCheck, Navigation, Bus, CheckCircle, ChevronRight } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";

export default function MyBookingsPage() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setBookings([
        {
          _id: "1",
          ticketId: "MTRX-9A2X",
          busDetails: { busNumber: "TN-01-AB-1234", routeName: "Anna Salai Line" },
          boardingPoint: "Guindy",
          destination: "T Nagar",
          departureTime: "08:00 AM",
          date: "2024-03-22",
          totalAmount: 250,
          passengers: [{ name: "Prem Kumar", seatNumber: "12" }],
        }
      ]);
      setLoading(false);
    }, 1500);
  }, []);

  return (
    <main className="min-h-screen bg-zinc-50 font-sans p-6 md:p-12 text-zinc-900 selection:bg-blue-600 selection:text-white">
      {/* Navigation */}
      <nav className="max-w-7xl mx-auto mb-16 flex items-center justify-between relative z-10 px-6 py-4 bg-white rounded-[32px] border border-zinc-100 shadow-xl shadow-zinc-200/50">
        <Link href="/live-map" className="group flex items-center gap-4 bg-zinc-50 hover:bg-blue-600 px-8 py-3 rounded-2xl transition-all active:scale-95 text-zinc-400 hover:text-white">
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-[10px] font-black uppercase tracking-widest">Return to Map</span>
        </Link>
        <Image src="/logo2.png" alt="Logo" width={180} height={70} className="object-contain" />
        <Link href="/admin" className="p-4 bg-zinc-50 rounded-2xl hover:bg-zinc-100 transition-all text-zinc-400">
           <ShieldCheck size={20} />
        </Link>
      </nav>

      <div className="max-w-4xl mx-auto relative px-4">
        <div className="mb-12 space-y-2 relative z-10 text-center">
           <h1 className="text-5xl font-black tracking-tighter uppercase italic text-zinc-900">My Tickets</h1>
           <p className="text-[10px] font-black text-blue-600 uppercase tracking-[0.4em] mt-3 animate-pulse">Journey Records Synchronized</p>
        </div>

        {loading ? (
          <div className="grid gap-12">
            {[1].map((i) => (
               <div key={i} className="h-64 w-full bg-white rounded-[56px] animate-pulse border border-zinc-100" />
            ))}
          </div>
        ) : bookings.length === 0 ? (
          <div className="text-center py-32 space-y-8 bg-white rounded-[56px] border border-dashed border-zinc-200">
            <div className="w-24 h-24 bg-zinc-50 rounded-full flex items-center justify-center mx-auto text-zinc-300">
               <Ticket size={48} />
            </div>
            <div className="space-y-4">
               <h3 className="text-3xl font-black text-zinc-900 tracking-tighter">No Active Journeys</h3>
               <p className="text-zinc-400 text-xs font-bold leading-relaxed px-10">Start your next journey by exploring our live 3D transit matrix.</p>
            </div>
            <Link href="/live-map" className="inline-block bg-blue-600 text-white px-12 py-5 rounded-3xl font-black text-xl tracking-tighter hover:scale-105 transition-all shadow-2xl shadow-blue-600/20">Explore Map &rarr;</Link>
          </div>
        ) : (
          <div className="grid gap-10 relative z-10">
            {bookings.map((booking) => (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                key={booking._id}
                className="group relative bg-white rounded-[56px] border-4 border-white shadow-[0_40px_100px_-10px_rgba(0,0,0,0.08)] overflow-hidden hover:shadow-blue-600/10 transition-all duration-700"
              >
                <div className="flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-zinc-50">
                  {/* Ticket Left */}
                  <div className="p-10 flex-1 space-y-10">
                    <div className="flex items-center justify-between">
                       <div className="space-y-4">
                          <div className="flex items-center gap-3">
                             <div className="px-4 py-1.5 bg-blue-50 text-blue-600 rounded-full text-[10px] font-black uppercase tracking-widest border border-blue-600/10 shadow-sm">Verified Booking</div>
                             <span className="text-[10px] font-black text-zinc-300 uppercase tracking-widest italic">{booking.date}</span>
                          </div>
                          <h3 className="text-4xl font-black text-zinc-900 tracking-tighter italic uppercase italic">#{booking.ticketId}</h3>
                       </div>
                       <div className="w-16 h-16 bg-zinc-50 rounded-3xl flex items-center justify-center text-blue-600 shadow-inner group-hover:rotate-12 transition-transform">
                          <Bus size={32} />
                       </div>
                    </div>

                    <div className="flex items-center justify-between text-center gap-6 relative">
                       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center w-full px-20 text-zinc-100">
                          <div className="h-1 w-full border-t-2 border-dashed border-zinc-200" />
                          <ChevronRight size={24} className="mx-[-10px] text-blue-100" />
                       </div>
                       <div className="relative z-10 flex-1">
                          <p className="text-[10px] font-black text-zinc-300 uppercase tracking-widest mb-2">Origin</p>
                          <p className="text-3xl font-black text-zinc-900 italic uppercase">{booking.boardingPoint}</p>
                          <p className="text-xs font-bold text-blue-600 mt-2 uppercase italic tracking-tighter">{booking.departureTime}</p>
                       </div>
                       <div className="relative z-10 flex-1">
                          <p className="text-[10px] font-black text-zinc-300 uppercase tracking-widest mb-2">Terminal</p>
                          <p className="text-3xl font-black text-zinc-900 italic uppercase">{booking.destination}</p>
                          <p className="text-xs font-bold text-zinc-400 mt-2 uppercase italic tracking-tighter">Final Stop</p>
                       </div>
                    </div>

                    <div className="grid grid-cols-2 gap-8 pt-10 border-t border-zinc-50">
                       <div className="flex items-center gap-5 p-6 bg-zinc-50/50 rounded-[32px] border border-zinc-100">
                          <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center border border-zinc-100 shadow-sm"><Navigation size={20} className="text-blue-600" /></div>
                          <div><p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Bus</p><p className="text-sm font-black text-zinc-900">{booking.busDetails.busNumber}</p></div>
                       </div>
                       <div className="flex items-center gap-5 p-6 bg-zinc-50/50 rounded-[32px] border border-zinc-100">
                          <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center border border-zinc-100 shadow-sm"><CheckCircle size={20} className="text-green-500" /></div>
                          <div><p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Seat</p><p className="text-sm font-black text-zinc-900">#{booking.passengers[0].seatNumber}</p></div>
                       </div>
                    </div>
                  </div>

                  {/* Ticket Right - QR Section */}
                  <div className="p-12 md:w-80 bg-zinc-50/30 flex flex-col justify-between items-center md:items-end gap-12">
                    <div className="text-center md:text-right space-y-8 w-full">
                       <div className="p-8 bg-white rounded-[48px] shadow-2xl shadow-zinc-200/50 flex items-center justify-center group-hover:scale-105 transition-all duration-500 border border-zinc-50">
                          <QRCodeSVG value={`TKT-${booking.ticketId}`} size={140} fgColor="#1e293b" />
                       </div>
                       <div className="space-y-1">
                          <p className="text-[10px] font-black text-zinc-300 uppercase tracking-widest">Payment Amount</p>
                          <p className="text-5xl font-black text-zinc-900 tracking-tighter italic italic tracking-tighter">₹{booking.totalAmount}</p>
                       </div>
                    </div>

                    <button className="w-full flex items-center justify-center gap-4 bg-zinc-900 text-white py-6 rounded-[32px] font-black text-base tracking-widest uppercase hover:bg-blue-600 transition-all shadow-xl shadow-zinc-950/20 active:scale-95">
                       <Download size={24} /> Get Ticket
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        <div className="mt-20 flex items-center justify-center gap-12 text-[10px] font-black text-zinc-300 uppercase tracking-[0.4em] relative z-10">
           <div className="flex items-center gap-3"><div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" /> Live Status Sync</div>
           <div>© 2024 JEFFBEN SYSTEMS</div>
           <div className="flex items-center gap-3"><ShieldCheck size={14} className="text-blue-400" /> End-to-End Encrypted</div>
        </div>
      </div>
    </main>
  );
}
