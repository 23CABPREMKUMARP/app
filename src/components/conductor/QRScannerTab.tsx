"use client";

import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Camera, QrCode, CheckCircle2, AlertTriangle, XCircle, Clock } from "lucide-react";
import { useConductor } from "@/src/context/ConductorContext";
import { Html5Qrcode } from "html5-qrcode";

export function QRScannerTab() {
  const {
    isScanning, setIsScanning,
    validating, setValidating,
    scanResult, setScanResult,
    scannerRef,
    isOffline,
    setPassengersBoarded, setOccupancy,
    logs, setLogs,
    offlineQueue, setOfflineQueue,
    playBeep,
    obBoarding, obDestination,
    isAuthenticated
  } = useConductor();

  useEffect(() => {
    let html5QrCode: any = null;

    const startScanner = async () => {
      if (isAuthenticated && isScanning) {
        html5QrCode = new Html5Qrcode("reader");
        scannerRef.current = html5QrCode;
        
        const config = { fps: 10, qrbox: { width: 250, height: 250 } };
        
        try {
          await html5QrCode.start(
            { facingMode: "environment" },
            config,
            async (decodedText: string) => {
              handleScanSuccess(decodedText);
              await html5QrCode.stop();
              setIsScanning(false);
            },
            (errorMessage: string) => {
              // ignore scanner failures
            }
          );
        } catch (err) {
          console.error("Camera access failed", err);
          setIsScanning(false);
        }
      }
    };

    startScanner();

    return () => {
      if (html5QrCode && html5QrCode.isScanning) {
        html5QrCode.stop().catch(console.error);
      }
    };
  }, [isAuthenticated, isScanning]);

  const handleScanSuccess = async (token: string) => {
    setValidating(true);
    setScanResult(null);

    // 1. Offline Mode Validation Fallback
    if (isOffline) {
      setTimeout(() => {
        setValidating(false);
        const offlineValid = token.startsWith("TB-") || token.includes("JB-NEURAL");
        const ticketId = token.startsWith("TB-") ? token : "TB-" + Math.floor(100000 + Math.random() * 900000);
        
        if (offlineValid) {
          const scanObj = {
            success: true,
            message: "Offline Validated (Sync Pending)",
            booking: {
              ticketId,
              route: `${obBoarding} → ${obDestination}`,
              seats: 1,
              boardingPoint: obBoarding,
              status: "Valid"
            }
          };
          setScanResult(scanObj);
          setPassengersBoarded(p => p + 1);
          setOccupancy(o => Math.min(50, o + 1));
          
          const updatedLogs = [
            { time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), event: `[Offline] Validated Ticket ${ticketId}`, type: "scan" },
            ...logs
          ];
          setLogs(updatedLogs);
          setOfflineQueue(q => [...q, { type: "scan-validation", token, time: Date.now() }]);
          playBeep(true);
          if (navigator.vibrate) navigator.vibrate([100, 50, 100]);
        } else {
          setScanResult({ success: false, message: "Invalid Offline Pass" });
          playBeep(false);
          if (navigator.vibrate) navigator.vibrate([300]);
        }
      }, 1000);
      return;
    }

    // 2. Standard Online API Validation
    try {
      const res = await fetch("/api/conductor/validate-ticket", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          token, 
          scannedBy: "CONDUCTOR_MOBILE_01",
          location: "Mobile Entry"
        }),
      });

      const data = await res.json();
      setScanResult(data);
      
      if (data.success) {
        setPassengersBoarded(p => p + 1);
        setOccupancy(o => Math.min(50, o + 1));
        
        const updatedLogs = [
          { time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), event: `Validated Ticket ${data.booking?.ticketId}`, type: "scan" },
          ...logs
        ];
        setLogs(updatedLogs);
        
        if (navigator.vibrate) navigator.vibrate([100, 50, 100]);
        playBeep(true);
      } else {
        if (navigator.vibrate) navigator.vibrate([300]);
        playBeep(false);
      }
    } catch (err) {
      console.error("Validation failed", err);
    } finally {
      setValidating(false);
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div className="bg-white/70 backdrop-blur-md border border-gray-200 shadow-sm rounded-3xl p-6 text-center space-y-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-orange-600/10 rounded-full blur-2xl pointer-events-none" />
        
        {!isScanning ? (
          <div className="flex flex-col items-center justify-center py-8 gap-6 z-10 relative">
            <div className="relative">
              <div className="absolute inset-0 bg-orange-500 blur-[30px] opacity-20" />
              <div className="w-28 h-28 bg-white/50 backdrop-blur-sm rounded-3xl border-2 border-dashed border-orange-300 flex items-center justify-center relative z-10">
                <QrCode size={40} className="text-orange-500" />
              </div>
            </div>
            <div className="space-y-1">
              <h2 className="text-xl font-black uppercase text-gray-900 tracking-tight">Scanner Ready</h2>
              <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest">Digital passes & Matrix tickets</p>
            </div>
            <button 
              onClick={() => setIsScanning(true)}
              className="w-full max-w-xs bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white py-4 rounded-xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 active:scale-95 transition-all shadow-lg shadow-orange-500/20"
            >
              <Camera size={18} />
              Launch Camera
            </button>
          </div>
        ) : (
          <div className="space-y-4 max-w-sm mx-auto z-10 relative">
            <div id="reader" className="overflow-hidden rounded-2xl border-4 border-orange-500 shadow-inner bg-black" />
            <button 
              onClick={() => setIsScanning(false)}
              className="w-full bg-white hover:bg-gray-50 border border-gray-200 text-gray-600 py-3 rounded-xl font-bold uppercase tracking-widest text-[9px] transition-colors"
            >
              Cancel Scanner
            </button>
          </div>
        )}
      </div>

      {/* Validation Results */}
      <AnimatePresence mode="wait">
        {validating && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="bg-white/70 backdrop-blur-md border border-gray-200 rounded-3xl p-8 text-center space-y-4 shadow-sm">
            <div className="w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-orange-600 font-black uppercase tracking-widest text-[10px]">Validating Digital Ticket...</p>
          </motion.div>
        )}

        {scanResult && !validating && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className={`rounded-[32px] p-6 border-2 transition-all shadow-sm ${
              scanResult.success 
                ? "bg-green-50/50 border-green-200" 
                : scanResult.message?.includes("Used")
                  ? "bg-amber-50/50 border-amber-200"
                  : scanResult.message?.includes("Expired")
                    ? "bg-gray-50/50 border-gray-200"
                    : "bg-red-50/50 border-red-200"
            }`}
          >
            <div className="flex flex-col items-center gap-6">
              <div className="flex items-center gap-4 w-full justify-center">
                {scanResult.success ? (
                   <CheckCircle2 size={40} className="text-green-500" />
                ) : scanResult.message?.includes("Used") ? (
                  <AlertTriangle size={40} className="text-amber-500" />
                ) : scanResult.message?.includes("Expired") ? (
                  <Clock size={40} className="text-gray-400" />
                ) : (
                  <XCircle size={40} className="text-red-500" />
                )}
                <div className="space-y-1 text-left">
                  <h3 className={`text-xl font-black uppercase tracking-tight ${
                    scanResult.success ? "text-green-600" : scanResult.message?.includes("Used") ? "text-amber-600" : scanResult.message?.includes("Expired") ? "text-gray-500" : "text-red-600"
                  }`}>
                    {scanResult.success ? "Valid Ticket" : scanResult.message?.includes("Used") ? "Already Used" : scanResult.message?.includes("Expired") ? "Expired Ticket" : "Invalid Ticket"}
                  </h3>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500">{scanResult.message}</p>
                </div>
              </div>

              {scanResult.booking && (
                <div className="w-full grid grid-cols-2 gap-4 pt-6 border-t border-gray-200/50 text-left text-xs bg-white/50 rounded-2xl p-4">
                  <div className="space-y-1">
                    <span className="text-[9px] font-bold uppercase text-gray-500 tracking-wider">Ticket ID</span>
                    <p className="font-mono font-bold text-gray-900">{scanResult.booking.ticketId || scanResult.booking.ticket_id}</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[9px] font-bold uppercase text-gray-500 tracking-wider">Passengers</span>
                    <p className="font-bold text-gray-900">{scanResult.booking.seats?.length || 1} {scanResult.booking.passengers?.some((p: any) => p.luggage && p.luggage !== 'None') && "(+ Luggage)"}</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[9px] font-bold uppercase text-gray-500 tracking-wider">Boarding Point</span>
                    <p className="text-xs font-bold text-gray-900 leading-tight">
                      {(scanResult.booking.boarding_point === "Combined Journey" || scanResult.booking.boardingPoint === "Combined Journey") && scanResult.booking.passengers 
                        ? scanResult.booking.passengers.map((p: any) => p.boarding).join(' • ') 
                        : (scanResult.booking.boarding_point || scanResult.booking.boardingPoint || "Unknown")}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[9px] font-bold uppercase text-gray-500 tracking-wider">Drop Point</span>
                    <p className="text-xs font-bold text-gray-900 leading-tight">
                      {scanResult.booking.destination === "Multi-Stop" && scanResult.booking.passengers 
                        ? scanResult.booking.passengers.map((p: any) => p.destination).join(' • ') 
                        : (scanResult.booking.destination || "Unknown")}
                    </p>
                  </div>
                </div>
              )}

              <button 
                onClick={() => setScanResult(null)}
                className="w-full py-4 bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 rounded-xl font-black uppercase tracking-widest text-[9px] shadow-sm transition-colors"
              >
                Dismiss Report
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Manual Input Entry validation */}
      <div className="bg-white/70 backdrop-blur-md border border-gray-200 rounded-3xl p-6 space-y-4 shadow-sm">
        <h3 className="text-xs font-black uppercase tracking-widest text-gray-500">Manual Entry</h3>
        <div className="flex gap-2">
          <input 
            type="text" 
            placeholder="E.g. TB-601090"
            id="manualTicketInput"
            className="flex-1 bg-white border border-gray-200 shadow-inner rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm text-gray-900 placeholder:text-gray-400 font-mono transition-shadow"
          />
          <button
            onClick={() => {
              const input = document.getElementById("manualTicketInput") as HTMLInputElement;
              if (input && input.value.trim()) {
                handleScanSuccess(input.value.trim());
                input.value = "";
              }
            }}
            className="px-6 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-xl text-[10px] font-black uppercase tracking-wider shadow-md shadow-orange-500/20 transition-colors"
          >
            Verify
          </button>
        </div>
      </div>
    </motion.div>
  );
}
