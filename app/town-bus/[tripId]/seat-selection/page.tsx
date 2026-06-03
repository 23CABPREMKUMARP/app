"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Users, CreditCard, Plus, Minus, ChevronRight, CheckCircle2, Download, RefreshCw, AlertCircle, MapPin, Phone, Package } from 'lucide-react';
import { useRouter, useParams } from 'next/navigation';
import { QRCodeSVG } from "qrcode.react";
import { IntelligentPhoneInput } from "@/src/components/ui/IntelligentPhoneInput";
import Image from 'next/image';
import Script from "next/script";
import { MOCK_BUSES } from "@/src/lib/constants";

export default function TicketCountSelectionPage() {
  const router = useRouter();
  const params = useParams();
  const tripId = params.tripId as string;
  
  const trip = MOCK_BUSES.find(b => b._id === tripId) || MOCK_BUSES[0];
  const stops = trip?.routeId?.stops || [];

  const [boardingPoint, setBoardingPoint] = useState('');
  const [dropPoint, setDropPoint] = useState('');
  
  const [ticketCount, setTicketCount] = useState(1);
  const [farePerTicket] = useState(1);
  const [step, setStep] = useState(1);
  const [paymentState, setPaymentState] = useState<'idle' | 'processing' | 'success' | 'failed'>('idle');
  const [bookingResult, setBookingResult] = useState<any>(null);
  const [luggageType, setLuggageType] = useState('');
  const [phone, setPhone] = useState('');
  const [paymentError, setPaymentError] = useState<string | null>(null);

  const LUGGAGE_PRICES: Record<string, number> = { None: 0, Small: 1, Medium: 2, Large: 3 };
  const totalAmount = ticketCount * farePerTicket + (LUGGAGE_PRICES[luggageType] || 0);

  const handleIncrement = () => {
    if (ticketCount < 10) setTicketCount(prev => prev + 1);
  };

  const handleDecrement = () => {
    if (ticketCount > 1) setTicketCount(prev => prev - 1);
  };

  const handleProceed = async () => {
    setStep(3);
  };

  const loadRazorpay = () => {
    return new Promise((resolve) => {
      if ((window as any).Razorpay) {
        resolve(true);
        return;
      }
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    setPaymentState('processing');
    setPaymentError(null);
    
    try {
      const res = await loadRazorpay();
      if (!res) {
        throw new Error("Failed to load Razorpay SDK. Please check your network or disable adblockers.");
      }

      const amount = totalAmount;
      
      const orderRes = await fetch('/api/payments/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount }),
      });
      const orderData = await orderRes.json();
      
      if (!orderRes.ok) throw new Error(orderData.error || 'Failed to create order');

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_placeholder",
        amount: orderData.amount,
        currency: "INR",
        name: "JeffBen Systems",
        description: `Town Bus Ticket`,
        order_id: orderData.id,
        handler: async (response: any) => {
          setPaymentState('processing');
          try {
            const verifyRes = await fetch('/api/payments/verify', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                bookingDetails: {
                  busId: tripId,
                  seats: Array.from({ length: ticketCount }, (_, i) => `S-${i + 1}`),
                  totalAmount: amount,
                  boardingPoint: boardingPoint || "Town Bus Stop",
                  destination: dropPoint || "Local Destination",
                  passengers: [{ phone: phone || "9999999999" }]
                }
              }),
            });
            const verifyData = await verifyRes.json();
            if (verifyData.success) {
              setBookingResult(verifyData.booking);
              setPaymentState('success');
              setStep(4);
            } else {
              throw new Error(verifyData.message || 'Payment verification failed');
            }
          } catch (err: any) {
            setPaymentState('failed');
            setPaymentError(err.message || "Failed to verify payment");
          }
        },
        modal: {
          ondismiss: function() {
            setPaymentState('failed');
            setPaymentError("Payment cancelled by user");
          }
        },
        prefill: {
          contact: phone || "9999999999",
        },
        theme: {
          color: "#18181b",
        },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
      
    } catch (error: any) {
      setPaymentState('failed');
      setPaymentError(error.message || "Failed to initialize payment");
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 font-sans text-zinc-900 pb-[320px]">
      {/* Header */}
      <div className="bg-white px-6 py-6 border-b border-zinc-200 sticky top-0 z-50 flex items-center justify-between shadow-sm">
        <button onClick={() => {
          if (step > 1 && step < 3) setStep(step - 1);
          else router.back();
        }} className="p-2 bg-zinc-100 rounded-full hover:bg-zinc-200 transition-colors">
          <ArrowLeft size={20} className="text-zinc-900" />
        </button>
        <div className="text-center">
          <h1 className="text-lg font-black uppercase tracking-widest text-zinc-900">Select Tickets</h1>
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Town Bus Express</p>
        </div>
        <div className="w-10"></div>
      </div>

      <div className="px-6 mt-12">
        {/* Routing Dynamic Highlight */}
        <div className="bg-zinc-950 rounded-[32px] p-6 flex items-center justify-between relative overflow-hidden group mb-8 shadow-lg shadow-black/10">
          <div className="absolute inset-y-0 left-0 w-1 bg-[#FF9933]" />
          <div className="flex flex-col gap-1">
            <span className="text-[8px] font-black text-zinc-500 uppercase tracking-[0.3em]">Boarding</span>
            <span className="text-sm font-black text-white uppercase truncate max-w-[120px]">{boardingPoint || "Select Stop"}</span>
          </div>
          <div className="flex-1 flex flex-col items-center px-4">
            <div className="w-full h-[1px] bg-zinc-800 relative">
              <div className="absolute inset-0 bg-[#FF9933] animate-pulse" />
              <ArrowRight size={14} className="absolute -top-1.5 left-1/2 -translate-x-1/2 text-[#FF9933]" />
            </div>
          </div>
          <div className="flex flex-col gap-1 text-right">
            <span className="text-[8px] font-black text-zinc-500 uppercase tracking-[0.3em]">Destination</span>
            <span className="text-sm font-black text-white uppercase truncate max-w-[120px]">{dropPoint || "Choose End"}</span>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div 
              key="step1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-8"
            >
              <div className="bg-white border border-zinc-200 rounded-3xl p-8 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 p-6">
                  <div className="w-16 h-16 bg-[#FF9933]/10 rounded-full flex items-center justify-center">
                    <MapPin size={32} className="text-[#FF9933]" />
                  </div>
                </div>
                
                <h2 className="text-xl font-black uppercase tracking-widest text-zinc-900 mb-2">Trip Route</h2>
                <p className="text-slate-500 text-sm mb-8">Select your boarding and drop locations.</p>

                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                      <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest pl-2">Boarding From</label>
                      <select 
                        value={boardingPoint} 
                        onChange={(e) => setBoardingPoint(e.target.value)} 
                        className="w-full h-16 bg-zinc-50 border border-zinc-100 rounded-[24px] px-6 font-bold text-zinc-900 outline-none focus:ring-2 ring-[#FF9933]/20 transition-all cursor-pointer relative z-50"
                      >
                        <option value="">Choose Station</option>
                        {stops.map((s: any) => <option key={s._id} value={s.stopName}>{s.stopName}</option>)}
                      </select>
                  </div>
                  <div className="space-y-2">
                      <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest pl-2">Drop Destination</label>
                      <select 
                        value={dropPoint} 
                        onChange={(e) => setDropPoint(e.target.value)} 
                        className="w-full h-16 bg-zinc-50 border border-zinc-100 rounded-[24px] px-6 font-bold text-zinc-900 outline-none focus:ring-2 ring-[#FF9933]/20 transition-all cursor-pointer relative z-50"
                      >
                        <option value="">Choose Destination</option>
                        {stops.map((s: any) => <option key={s._id} value={s.stopName}>{s.stopName}</option>)}
                      </select>
                  </div>
                </div>

                <button 
                  onClick={() => setStep(2)}
                  disabled={!boardingPoint || !dropPoint}
                  className="w-full h-20 bg-[#FF9933] text-white rounded-[32px] font-black text-xl tracking-tighter hover:bg-orange-600 transition-all flex items-center justify-center gap-3 disabled:opacity-50 mt-8 active:scale-95 shadow-lg shadow-[#FF9933]/20"
                >
                  Select Passengers <ChevronRight size={24} />
                </button>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div 
              key="step2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="bg-white border border-zinc-200 rounded-3xl p-8 shadow-sm relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-6">
                <div className="w-16 h-16 bg-[#FF9933]/10 rounded-full flex items-center justify-center">
                  <Users size={32} className="text-[#FF9933]" />
                </div>
              </div>
              
              <h2 className="text-xl font-black uppercase tracking-widest text-zinc-900 mb-2">Passengers</h2>
              <p className="text-slate-500 text-sm mb-8">How many tickets do you need?</p>

              <div className="flex items-center justify-between bg-zinc-50 rounded-2xl p-4 border border-zinc-200">
                <button 
                  onClick={handleDecrement}
                  disabled={ticketCount <= 1}
                  className="w-12 h-12 bg-white border border-zinc-200 rounded-xl flex items-center justify-center hover:bg-zinc-100 active:scale-95 transition-all disabled:opacity-50 disabled:active:scale-100"
                >
                  <Minus size={20} className="text-zinc-900" />
                </button>
                
                <div className="text-4xl font-black text-zinc-900">
                  {ticketCount}
                </div>
                
                <button 
                  onClick={handleIncrement}
                  disabled={ticketCount >= 10}
                  className="w-12 h-12 bg-[#FF9933] rounded-xl flex items-center justify-center hover:bg-orange-600 active:scale-95 transition-all disabled:opacity-50 disabled:active:scale-100 shadow-lg shadow-[#FF9933]/20"
                >
                  <Plus size={20} className="text-white" />
                </button>
              </div>

              {/* Phone Details */}
              <div className="mt-8 border-t border-zinc-200 pt-8">
                <h2 className="text-xl font-black uppercase tracking-widest text-zinc-900 mb-2 flex items-center gap-2">
                  <Phone className="text-[#FF9933]" /> Passenger Contact
                </h2>
                <p className="text-slate-500 text-sm mb-6">Enter phone number to receive your digital ticket.</p>
                <IntelligentPhoneInput 
                  value={phone}
                  onChange={(val) => setPhone(val)}
                />
              </div>

              {/* Luggage Selection */}
              <div className="mt-8 border-t border-zinc-200 pt-8">
                <h2 className="text-xl font-black uppercase tracking-widest text-zinc-900 mb-2 flex items-center gap-2">
                  <Package className="text-[#FF9933]" /> Add Luggage?
                </h2>
                <p className="text-slate-500 text-sm mb-6">Select luggage size if you're carrying parcels.</p>
                
                <div className="grid grid-cols-2 gap-3">
                  {['None', 'Small', 'Medium', 'Large'].map(type => (
                    <button 
                      key={type}
                      onClick={() => setLuggageType(type)}
                      className={`py-4 rounded-2xl text-xs font-black uppercase tracking-widest border transition-all ${
                        luggageType === type 
                          ? 'bg-[#FF9933] text-white border-[#FF9933] shadow-lg shadow-[#FF9933]/20' 
                          : 'bg-zinc-50 text-slate-500 border-zinc-200 hover:border-zinc-300 hover:bg-white'
                      }`}
                    >
                      {type} {type !== 'None' && <span className="block mt-1 text-[10px] opacity-75">+₹{LUGGAGE_PRICES[type]}</span>}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div 
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <div className="bg-white rounded-[40px] p-8 text-zinc-900 space-y-6 relative overflow-hidden group border border-zinc-200 shadow-sm">
                <div className="absolute top-0 right-0 p-6 opacity-5 text-[#FF9933]">
                  <CreditCard size={120} />
                </div>
                <div className="space-y-1 relative z-10">
                  <p className="text-[10px] font-black text-[#FF9933] uppercase tracking-[0.4em]">Payment Summary</p>
                  <h4 className="text-3xl font-black tracking-tighter uppercase whitespace-nowrap truncate font-heading">Town Bus</h4>
                </div>
                
                <div className="grid grid-cols-2 gap-6 relative z-10">
                  <div className="space-y-1">
                    <p className="text-[8px] font-black text-zinc-500 uppercase tracking-widest">Tickets</p>
                    <div className="flex items-center gap-1">
                      <span className="text-lg font-black">{ticketCount}</span>
                      <span className="text-lg font-black ml-1">Seats</span>
                    </div>
                  </div>
                  <div className="space-y-1 text-right">
                    <p className="text-[8px] font-black text-zinc-500 uppercase tracking-widest">Luggage</p>
                    <div className="text-lg font-black text-zinc-600 flex justify-end">
                      {luggageType !== 'None' ? `${luggageType} (+₹${LUGGAGE_PRICES[luggageType]})` : 'None'}
                    </div>
                  </div>
                  <div className="space-y-1 mt-4 col-span-2 text-right border-t border-zinc-100 pt-4">
                    <p className="text-[8px] font-black text-zinc-500 uppercase tracking-widest">Total Fare</p>
                    <div className="text-3xl font-black text-[#FF9933] flex justify-end">
                      ₹{totalAmount}
                    </div>
                  </div>
                </div>
              </div>

              <button 
                onClick={handlePayment}
                disabled={paymentState === 'processing'}
                className="w-full h-20 bg-[#FF9933] text-white rounded-[32px] font-black text-xl tracking-tighter hover:bg-orange-600 transition-all flex items-center justify-center gap-3 active:scale-95 disabled:opacity-50 relative overflow-hidden"
              >
                {paymentState === 'processing' ? (
                  <motion.div className="flex items-center gap-3">
                    <RefreshCw size={20} className="animate-spin" />
                    <span className="uppercase tracking-widest text-sm">Processing...</span>
                  </motion.div>
                ) : (
                  <motion.div className="flex items-center gap-3">
                    Secure Checkout <ChevronRight size={24} />
                  </motion.div>
                )}
              </button>

              {paymentError && (
                <div className="mt-4 text-center flex items-center justify-center gap-2 text-rose-500">
                  <AlertCircle size={16} />
                  <span className="text-xs font-bold uppercase tracking-widest">{paymentError}</span>
                </div>
              )}
            </motion.div>
          )}

          {step === 4 && bookingResult && (
            <motion.div 
              key="step4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-8 relative"
            >
              <div className="text-center space-y-4 relative z-10 mb-12">
                <motion.div 
                  initial={{ scale: 0, rotate: -45 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", damping: 12, stiffness: 200 }}
                  className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center mx-auto mb-4 border-2 border-emerald-100"
                >
                  <CheckCircle2 size={32} className="text-emerald-500" />
                </motion.div>
                <div className="space-y-1">
                  <motion.h4 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-2xl font-bold text-zinc-900 tracking-tight uppercase"
                  >
                    Payment Verified
                  </motion.h4>
                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest"
                  >
                    Ticket Generated Successfully
                  </motion.p>
                </div>
              </div>

              {/* VINTAGE ORNATE GOLD TICKET DESIGN */}
              <div className="w-full overflow-hidden flex items-center justify-center py-4">
                <motion.div 
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ type: "spring", damping: 20, stiffness: 100, delay: 0.3 }}
                  className="w-full max-w-[340px] md:max-w-4xl relative group"
                >
                    <div 
                      id="printable-ticket"
                      className="ticket-container relative bg-[#f7e49f] bg-gradient-to-br from-[#f7e49f] via-[#e5c167] to-[#d4af37] rounded-[20px] md:rounded-[40px] shadow-[0_30px_70px_-15px_rgba(0,0,0,0.5)] overflow-hidden border-[6px] md:border-[12px] border-[#b8860b]/30 flex flex-col md:flex-row min-h-[550px] md:min-h-[400px] drop-shadow-[0_20px_50px_rgba(0,0,0,0.3)] print:rounded-none print:shadow-none print:border-[4px] print:m-0"
                    >
                      <div className="absolute inset-0 opacity-100 mix-blend-multiply pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] print:opacity-50" />
                      <div className="absolute inset-0 opacity-20 mix-blend-multiply pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/brushed-alum.png')]" />
                      <div className="absolute inset-0 border-[6px] border-[#d4af37] opacity-80 pointer-events-none" />
                      
                      {/* Left Side: Main Info */}
                      <div className="p-8 md:p-14 flex-1 relative border-b-4 md:border-b-0 md:border-r-4 border-dashed border-[#b8860b]/40">
                        <div className="relative z-10 text-center mb-10">
                          <div className="flex items-center justify-center gap-4 mb-4">
                            <Image src="/logo2.png" alt="JeffBen" width={40} height={40} className="object-contain" />
                            <div className="h-8 w-[1px] bg-[#5d4037]/20" />
                            <Image src="/hero-logo.png" alt="Digi Bus Stand" width={40} height={40} className="object-contain mix-blend-multiply" />
                          </div>
                          <p className="text-[10px] font-black text-[#5d4037]/50 uppercase tracking-[0.4em] mb-1">Digi Bus Stand Framework</p>
                          <p className="text-xl md:text-2xl font-vintage text-[#5d4037]/80 leading-none mb-2">Powered by <span className="text-black">Jeff</span>Ben</p>
                          <h3 className="text-3xl md:text-5xl font-serif font-black tracking-tight text-[#5d4037] leading-none mb-2 uppercase">Town Bus Ticket</h3>
                        </div>

                        <div className="space-y-6 text-left relative z-10 px-4">
                          <div className="grid grid-cols-2 gap-8 border-b border-[#5d4037]/20 pb-4">
                            <div className="flex flex-col">
                              <span className="font-sans font-bold uppercase text-[10px] tracking-[0.3em] text-[#5d4037]/60">Luggage:</span>
                              <span className="text-xl md:text-2xl font-serif text-[#5d4037] font-black tracking-tight uppercase">{luggageType}</span>
                            </div>
                            <div className="flex flex-col">
                              <span className="font-sans font-bold uppercase text-[10px] tracking-[0.3em] text-[#5d4037]/60">Passengers:</span>
                              <span className="text-xl md:text-2xl font-serif text-[#5d4037] font-black tracking-tight">{ticketCount}</span>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-8 border-b border-[#5d4037]/20 pb-4">
                            <div className="flex flex-col">
                              <span className="font-sans font-bold uppercase text-[10px] tracking-[0.3em] text-[#5d4037]/60">Boarding</span>
                              <p className="text-base font-serif text-[#5d4037] font-bold uppercase">Town Bus Stop</p>
                            </div>
                            <div className="flex flex-col">
                              <span className="font-sans font-bold uppercase text-[10px] tracking-[0.3em] text-[#5d4037]/60">Destination</span>
                              <p className="text-base font-serif text-[#5d4037] font-bold uppercase">Local Destination</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Right Side: QR Secure Matrix */}
                      <div className="p-8 md:p-12 md:w-[320px] flex flex-col justify-between items-center relative overflow-hidden bg-black/5">
                        <div className="p-3 bg-[#FF9933]/10 rounded-2xl shadow-inner border-2 border-[#FF9933] relative overflow-hidden group">
                          {/* Secure Watermark Layer */}
                          <div className="absolute inset-0 opacity-[0.4] pointer-events-none flex flex-wrap gap-2 items-center justify-center text-[6px] font-black uppercase tracking-tighter text-white -rotate-12 scale-110">
                            {Array(20).fill(null).map((_, i) => (
                              <span key={i} className="whitespace-nowrap">DIGI BUS STAND • JEFFBEN •</span>
                            ))}
                          </div>
                          <QRCodeSVG 
                              value={btoa(JSON.stringify({
                                t: bookingResult.ticketId || "TOWNBUS",
                                b: tripId,
                                q: ticketCount,
                                m: "JB-NEURAL-SECURE"
                              }))} 
                              size={140} 
                              fgColor="#2d1a12" 
                              bgColor="transparent"
                              level="H" 
                              imageSettings={{
                                src: "/hero-logo.png",
                                x: undefined,
                                y: undefined,
                                height: 35,
                                width: 35,
                                excavate: true,
                              }}
                            />
                        </div>
                        <div className="text-center mt-6">
                           <p className="text-[10px] font-bold text-[#5d4037]/50 uppercase tracking-widest">Serial Key</p>
                           <p className="text-xs font-serif font-black text-[#5d4037]">JB-{bookingResult.ticketId?.slice(-8) || "98765432"}</p>
                           <p className="text-[9px] font-bold text-[#5d4037]/80 uppercase tracking-widest mt-2">Validity: Till 01:00 AM Next Day</p>
                        </div>
                      </div>
                    </div>
                </motion.div>
              </div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="grid grid-cols-2 gap-3 mt-8"
              >
                 <button 
                   onClick={() => window.print()}
                   className="h-16 bg-white text-zinc-950 rounded-[24px] font-black uppercase tracking-widest text-[9px] hover:bg-zinc-200 transition-all flex items-center justify-center gap-2 active:scale-95"
                 >
                   <Download size={14} /> Print Pass
                 </button>
                 <button 
                   onClick={() => router.push('/')}
                   className="h-16 bg-slate-800 text-white rounded-[24px] font-black uppercase tracking-widest text-[9px] hover:bg-slate-700 transition-all flex items-center justify-center gap-2 active:scale-95"
                 >
                   Return to Hub
                 </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Action Bar (Only for Step 2) */}
      <AnimatePresence>
        {step === 2 && phone && phone.length >= 10 && luggageType !== '' && (
          <motion.div 
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            className="fixed bottom-24 left-4 right-4 bg-white border border-zinc-200 p-6 z-50 rounded-[32px] shadow-2xl shadow-black/10"
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-[10px] font-black uppercase tracking-widest text-slate-500">Total Fare</div>
                <div className="text-2xl font-black text-zinc-900">₹{totalAmount}</div>
              </div>
              <div className="text-right flex flex-col gap-1 items-end">
                <div className="text-[10px] font-black uppercase tracking-widest text-slate-500">Tickets & Add-ons</div>
                <div className="text-[10px] font-bold text-zinc-900 bg-zinc-100 px-2 py-1 rounded-md border border-zinc-200">
                  {ticketCount} {ticketCount === 1 ? 'Seat' : 'Seats'} {luggageType !== 'None' && `+ ${luggageType} Luggage`}
                </div>
              </div>
            </div>

            <button 
              onClick={handleProceed}
              disabled={!phone || phone.length < 10}
              className="w-full bg-[#FF9933] text-white py-5 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-orange-600 transition-colors shadow-lg shadow-[#FF9933]/20 active:scale-95 flex items-center justify-center gap-2 disabled:opacity-30"
            >
              Proceed to Pay <CreditCard size={18} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
