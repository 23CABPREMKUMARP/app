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
    const fetchBookings = async () => {
      try {
        const res = await fetch("/api/bookings/all");
        if (res.ok) {
          const data = await res.json();
          setBookings(data.map((b: any) => ({
             _id: b._id,
             ticketId: b.ticketId || b._id.substring(b._id.length - 8).toUpperCase(),
             busDetails: { 
               busNumber: b.busId?.busNumber || "N/A", 
               routeName: b.busId?.routeId?.routeName || "General Line" 
             },
             boardingPoint: b.boardingPoint || "System Entry",
             destination: b.dropPoint || "System Exit",
             departureTime: b.busId?.departureTime || "N/A",
             date: new Date(b.bookingDate || Date.now()).toLocaleDateString(),
             totalAmount: b.totalFare || 0,
             passengers: b.passengerDetails ? [b.passengerDetails] : [{ name: "Matrix Traveler", seatNumber: "A1" }]
          })));
        }
      } catch (e) {
        console.error("Booking fetch error:", e);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  return (
    <main className="min-h-screen bg-zinc-50 font-sans p-6 md:p-12 text-zinc-900 selection:bg-blue-600 selection:text-white">
      {/* Navigation */}
      <nav className="max-w-7xl mx-auto mb-16 flex items-center justify-between relative z-10 px-6 py-4 bg-white rounded-[32px] border border-zinc-100 shadow-xl shadow-zinc-200/50">
        <Link href="/live-map" className="group flex items-center gap-4 bg-zinc-50 hover:bg-blue-600 px-8 py-3 rounded-2xl transition-all active:scale-95 text-zinc-400 hover:text-white">
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-[10px] font-black uppercase tracking-widest">Return to Map</span>
        </Link>
        <Image src="/logo2.png" alt="Logo" width={180} height={70} className="object-contain" priority />
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
                className="group relative bg-white rounded-[40px] md:rounded-[56px] border border-zinc-100 shadow-[0_40px_100px_-15px_rgba(0,0,0,0.08)] overflow-hidden transition-all duration-700"
              >
                <div className="flex flex-col md:flex-row relative">
                  {/* Perforated Edge Cutouts for Desktop (Side) */}
                  <div className="absolute top-1/2 -left-4 w-8 h-8 bg-zinc-50 rounded-full border border-zinc-100 z-10 hidden md:block -translate-y-1/2" />
                  <div className="absolute top-1/2 -right-4 w-8 h-8 bg-zinc-50 rounded-full border border-zinc-100 z-10 hidden md:block -translate-y-1/2" />

                  {/* Ticket Main Section */}
                  <div className="p-8 md:p-12 flex-1 space-y-8 md:space-y-10">
                    <div className="flex items-center justify-between">
                       <div className="space-y-3">
                          <div className="flex items-center gap-2">
                             <div className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-[8px] font-black uppercase tracking-widest border border-blue-600/10">Matrix-Verified</div>
                             <span className="text-[8px] font-black text-zinc-300 uppercase tracking-widest">{booking.date}</span>
                          </div>
                          <h3 className="text-2xl md:text-4xl font-black text-zinc-900 tracking-tighter uppercase italic">#{booking.ticketId}</h3>
                       </div>
                       <div className="w-12 h-12 md:w-16 md:h-16 bg-zinc-50 rounded-2xl md:rounded-3xl flex items-center justify-center text-blue-600 shadow-inner group-hover:rotate-12 transition-transform">
                          <Bus size={24} className="md:w-8 md:h-8" />
                       </div>
                    </div>

                    <div className="flex items-center justify-between text-center gap-4 relative py-6 border-y border-zinc-50">
                       <div className="flex-1 text-left">
                          <p className="text-[8px] font-black text-zinc-300 uppercase tracking-widest mb-1">Origin</p>
                          <p className="text-xl md:text-3xl font-black text-zinc-900 uppercase italic leading-none">{booking.boardingPoint}</p>
                          <p className="text-[10px] font-bold text-blue-600 mt-1 uppercase tracking-tighter">{booking.departureTime}</p>
                       </div>
                       <div className="flex flex-col items-center px-2 opacity-20">
                          <div className="w-px h-8 bg-zinc-300 mb-1" />
                          <ChevronRight size={20} className="md:rotate-0" />
                          <div className="w-px h-8 bg-zinc-300 mt-1" />
                       </div>
                       <div className="flex-1 text-right">
                          <p className="text-[8px] font-black text-zinc-300 uppercase tracking-widest mb-1">Terminal</p>
                          <p className="text-xl md:text-3xl font-black text-zinc-900 uppercase italic leading-none">{booking.destination}</p>
                          <p className="text-[10px] font-bold text-zinc-400 mt-1 uppercase tracking-tighter">Final Hub</p>
                       </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                       <div className="flex items-center gap-4 p-4 bg-zinc-50 rounded-2xl border border-zinc-100">
                          <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center border border-zinc-100 shadow-sm"><Navigation size={14} className="text-blue-600" /></div>
                          <div>
                            <p className="text-[8px] font-black text-zinc-400 uppercase tracking-widest leading-none">Vehicle</p>
                            <p className="text-xs font-black text-zinc-900 mt-0.5">{booking.busDetails.busNumber.split('-').slice(-1)}</p>
                          </div>
                       </div>
                       <div className="flex items-center gap-4 p-4 bg-zinc-50 rounded-2xl border border-zinc-100">
                          <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center border border-zinc-100 shadow-sm"><CheckCircle size={14} className="text-green-500" /></div>
                          <div>
                            <p className="text-[8px] font-black text-zinc-400 uppercase tracking-widest leading-none">Zone</p>
                            <p className="text-xs font-black text-zinc-900 mt-0.5">Seat {booking.passengers[0].seatNumber}</p>
                          </div>
                       </div>
                    </div>
                  </div>

                  {/* Vertical Perforated Line for Desktop */}
                  <div className="hidden md:block w-px border-r-2 border-dashed border-zinc-100 relative h-auto"></div>

                  {/* Horizontal Perforated Line for Mobile */}
                  <div className="md:hidden border-t-2 border-dashed border-zinc-100 mx-8 relative">
                     <div className="absolute -top-3 -left-12 w-6 h-6 bg-zinc-50 rounded-full border border-zinc-100" />
                     <div className="absolute -top-3 -right-12 w-6 h-6 bg-zinc-50 rounded-full border border-zinc-100" />
                  </div>

                  {/* Ticket Right - QR Section */}
                  <div className="p-8 md:p-12 md:w-72 bg-zinc-50/50 flex flex-col justify-between items-center gap-8">
                    <div className="text-center group flex flex-col items-center">
                       <div className="p-6 bg-white rounded-[32px] shadow-xl border border-zinc-50 group-hover:scale-105 transition-all duration-500 mb-6">
                          <QRCodeSVG value={`TKT-${booking.ticketId}`} size={120} fgColor="#18181b" />
                       </div>
                       <div className="space-y-0.5">
                          <p className="text-[8px] font-black text-zinc-300 uppercase tracking-widest">Quantum Fare</p>
                          <p className="text-4xl font-black text-zinc-900 tracking-tighter italic">₹{booking.totalAmount}</p>
                       </div>
                    </div>

                    <button className="w-full h-14 bg-zinc-900 text-white rounded-2xl font-black text-xs tracking-widest uppercase hover:bg-blue-600 transition-all shadow-xl active:scale-95 flex items-center justify-center gap-3">
                       <Download size={18} /> Get Pass
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
