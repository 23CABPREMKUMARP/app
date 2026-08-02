"use client";

import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { Minus, Plus, FileText } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { useConductor, STOPS } from "@/src/context/ConductorContext";

export function TicketingTab() {
  const {
    obBoarding, setObBoarding,
    obDestination, setObDestination,
    obQuantity, setObQuantity,
    obPaymentMode, setObPaymentMode,
    obSuccessTicket, setObSuccessTicket,
    ticketsSold, setTicketsSold,
    totalRevenue, setTotalRevenue,
    occupancy, setOccupancy,
    cashCollection, setCashCollection,
    onlineCollection, setOnlineCollection,
    saveStats, passengers, setPassengers,
    logs, setLogs,
    isOffline, offlineQueue, setOfflineQueue,
    playBeep
  } = useConductor();

  const getStopIndex = (stopName: string) => STOPS.indexOf(stopName);
  const stopsDelta = Math.abs(getStopIndex(obDestination) - getStopIndex(obBoarding)) || 1;
  const fareRate = 15; // base price
  const ticketFare = stopsDelta * fareRate * obQuantity;

  const handleIssueTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (obBoarding === obDestination) return;

    const newTicketId = "TB-ONB-" + Math.floor(100000 + Math.random() * 900000);
    const mockTicket = {
      ticketId: newTicketId,
      boarding: obBoarding,
      destination: obDestination,
      quantity: obQuantity,
      fare: ticketFare,
      paymentMode: obPaymentMode,
      issuedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setObSuccessTicket(mockTicket);
    setTicketsSold(t => t + obQuantity);
    setTotalRevenue(r => r + ticketFare);
    setOccupancy(o => Math.min(50, o + obQuantity));

    if (obPaymentMode === "Cash") {
      setCashCollection(c => c + ticketFare);
      saveStats({
        ticketsSold: ticketsSold + obQuantity,
        totalRevenue: totalRevenue + ticketFare,
        cashCollection: cashCollection + ticketFare
      });
    } else {
      setOnlineCollection(o => o + ticketFare);
      saveStats({
        ticketsSold: ticketsSold + obQuantity,
        totalRevenue: totalRevenue + ticketFare,
        onlineCollection: onlineCollection + ticketFare
      });
    }

    // Add passenger entry
    const newPassenger = {
      ticketId: newTicketId,
      name: `Onboard Pass x${obQuantity}`,
      boarding: obBoarding,
      destination: obDestination,
      status: "Boarded",
      seat: "S" + (occupancy + 1)
    };
    setPassengers([newPassenger, ...passengers]);

    // Save logs
    setLogs([
      { time: mockTicket.issuedAt, event: `Issued ${obQuantity} Onboard Ticket(s) (Total ₹${ticketFare})`, type: "onboard" },
      ...logs
    ]);

    // Offline queue if offline
    if (isOffline) {
      setOfflineQueue([...offlineQueue, { type: "ticket-issuance", ticket: mockTicket }]);
    }

    playBeep(true);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* form card */}
        <div className="bg-white/70 backdrop-blur-md border border-gray-200 shadow-sm rounded-3xl p-6 space-y-5 text-left">
          <h3 className="text-xs font-black uppercase tracking-widest text-gray-500 border-b border-gray-200 pb-3">New Passenger Ticket</h3>
          <form onSubmit={handleIssueTicket} className="space-y-4">
            
            <div className="space-y-1">
              <label className="text-[9px] font-black text-gray-500 uppercase tracking-widest pl-1">Boarding From</label>
              <select 
                value={obBoarding}
                onChange={(e) => {
                  setObBoarding(e.target.value);
                  setObSuccessTicket(null);
                }}
                className="w-full bg-white border border-gray-200 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm text-gray-900 shadow-inner"
              >
                {STOPS.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-[9px] font-black text-gray-500 uppercase tracking-widest pl-1">Destination To</label>
              <select 
                value={obDestination}
                onChange={(e) => {
                  setObDestination(e.target.value);
                  setObSuccessTicket(null);
                }}
                className="w-full bg-white border border-gray-200 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm text-gray-900 shadow-inner"
              >
                {STOPS.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
              {obBoarding === obDestination && (
                <p className="text-red-500 text-[8px] font-bold uppercase tracking-wider pl-1 pt-1">Boarding & destination cannot match</p>
              )}
            </div>

            {/* Passenger Quantities selector */}
            <div className="space-y-1">
              <label className="text-[9px] font-black text-gray-500 uppercase tracking-widest pl-1 block">Passenger Count</label>
              <div className="flex items-center gap-3 bg-white border border-gray-200 shadow-sm rounded-xl p-1.5 max-w-[150px] justify-between">
                <button
                  type="button"
                  onClick={() => {
                    setObQuantity(Math.max(1, obQuantity - 1));
                    setObSuccessTicket(null);
                  }}
                  className="w-9 h-9 bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-700 rounded-lg flex items-center justify-center transition-colors cursor-pointer"
                >
                  <Minus size={14} />
                </button>
                <span className="text-sm font-black text-gray-900">{obQuantity}</span>
                <button
                  type="button"
                  onClick={() => {
                    setObQuantity(Math.min(10, obQuantity + 1));
                    setObSuccessTicket(null);
                  }}
                  className="w-9 h-9 bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-700 rounded-lg flex items-center justify-center transition-colors cursor-pointer"
                >
                  <Plus size={14} />
                </button>
              </div>
            </div>

            {/* Payment method */}
            <div className="space-y-2">
              <label className="text-[9px] font-black text-gray-500 uppercase tracking-widest pl-1 block">Payment Method</label>
              <div className="grid grid-cols-4 gap-2">
                {["Cash", "UPI", "PhonePe", "GPay"].map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setObPaymentMode(p as any)}
                    className={`py-3 text-[10px] font-black uppercase tracking-wider rounded-xl border transition-all ${
                      obPaymentMode === p 
                        ? "bg-orange-50 border-orange-500 text-orange-600 shadow-sm" 
                        : "bg-white hover:bg-gray-50 border-gray-200 text-gray-500"
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-2">
              <div className="flex justify-between items-center bg-gray-50 p-4 rounded-xl border border-gray-200 mb-4 shadow-inner">
                <span className="text-[10px] font-black text-gray-500 uppercase tracking-wider">Calculated Fare</span>
                <span className="text-2xl font-black text-gray-900">₹{ticketFare}</span>
              </div>

              <button
                type="submit"
                disabled={obBoarding === obDestination}
                className="w-full py-4 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-xl font-black uppercase tracking-widest text-xs shadow-lg shadow-orange-500/20 disabled:opacity-50 disabled:grayscale transition-all cursor-pointer active:scale-95"
              >
                Print & Issue Ticket
              </button>
            </div>
          </form>
        </div>

        {/* Receipt Output Panel */}
        <div className="flex flex-col items-center justify-center">
          <AnimatePresence mode="wait">
            {obSuccessTicket ? (
              <motion.div 
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="w-full max-w-[280px] bg-gradient-to-br from-yellow-50 to-orange-50 text-gray-900 p-6 rounded-2xl shadow-xl space-y-4 border border-orange-200 relative font-mono text-xs overflow-hidden"
              >
                {/* ticket jagged borders styling */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-orange-500/20 to-transparent opacity-50" />
                
                <div className="text-center border-b-2 border-dashed border-gray-300 pb-4">
                  <h4 className="font-black tracking-widest uppercase text-[10px] text-gray-900">Smart Tamizha Ticket</h4>
                  <p className="text-[8px] text-gray-500 uppercase mt-1">Onboard issuance • Local Node</p>
                </div>

                <div className="space-y-3 py-2 font-medium">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Ticket ID:</span>
                    <span className="font-bold">{obSuccessTicket.ticketId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">From:</span>
                    <span className="font-bold uppercase truncate max-w-[120px]">{obSuccessTicket.boarding}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">To:</span>
                    <span className="font-bold uppercase truncate max-w-[120px]">{obSuccessTicket.destination}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">QTY / Fare:</span>
                    <span className="font-bold">{obSuccessTicket.quantity} Passenger(s)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Payment:</span>
                    <span className="font-bold">{obSuccessTicket.paymentMode}</span>
                  </div>
                </div>

                <div className="border-t-2 border-dashed border-gray-300 pt-4 flex flex-col items-center gap-3">
                  <div className="p-2 bg-white rounded-xl shadow-inner border border-gray-200">
                    <QRCodeSVG 
                      value={btoa(JSON.stringify({ t: obSuccessTicket.ticketId, b: "1024", q: obSuccessTicket.quantity, m: "JB-ONBOARD-TKT" }))}
                      size={100}
                      bgColor="transparent"
                      fgColor="#09090b"
                    />
                  </div>
                  <div className="text-center space-y-1">
                    <span className="text-[18px] font-black text-gray-900">₹{obSuccessTicket.fare}</span>
                    <p className="text-[8px] text-gray-500 uppercase tracking-widest font-sans font-bold">Present to ticket checker</p>
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="text-center p-8 bg-gray-50/50 border-2 border-dashed border-gray-200 rounded-3xl w-full py-16 space-y-3 backdrop-blur-sm">
                <FileText size={32} className="text-gray-400 mx-auto" />
                <p className="text-xs text-gray-500 uppercase tracking-widest font-black">Ticket Output Area</p>
                <p className="text-[10px] text-gray-400 max-w-xs mx-auto font-medium">Fill details and tap Print to generate a live QR boarding pass receipt.</p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
