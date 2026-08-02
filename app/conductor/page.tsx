"use client";

import React from "react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import { 
  ShieldCheck, LogIn, LayoutDashboard, QrCode, DollarSign, Users, 
  Bus, MapPin, FileText, Wifi, WifiOff, AlertTriangle, Bell, Menu, X, RefreshCw 
} from "lucide-react";
import SecureView from "@/src/components/SecureView";

// Context and Tabs
import { ConductorProvider, useConductor } from "@/src/context/ConductorContext";
import { DashboardTab } from "@/src/components/conductor/DashboardTab";
import { QRScannerTab } from "@/src/components/conductor/QRScannerTab";
import { TicketingTab } from "@/src/components/conductor/TicketingTab";
import { PassengerLedgerTab } from "@/src/components/conductor/PassengerLedgerTab";
import { OccupancyTab } from "@/src/components/conductor/OccupancyTab";
import { GPSTrackerTab } from "@/src/components/conductor/GPSTrackerTab";
import { RevenueLedgerTab } from "@/src/components/conductor/RevenueLedgerTab";
import { SyncTab } from "@/src/components/conductor/SyncTab";
import { ReportIssueTab } from "@/src/components/conductor/ReportIssueTab";
import { AnnouncementsTab } from "@/src/components/conductor/AnnouncementsTab";
import { BusMatrixQR } from "@/src/components/BusMatrixQR";

const SIDEBAR_TABS = [
  { id: "dashboard", label: "Home Dashboard", icon: LayoutDashboard },
  { id: "scan", label: "QR Pass Scanner", icon: QrCode },
  { id: "ticketing", label: "Onboard Ticketing", icon: DollarSign },
  { id: "passengers", label: "Passenger Ledger", icon: Users },
  { id: "occupancy", label: "Occupancy Map", icon: Bus },
  { id: "gps", label: "GPS & Trip Tracker", icon: MapPin },
  { id: "collections", label: "Revenue Ledger", icon: FileText },
  { id: "offline", label: "Offline Sync", icon: Wifi },
  { id: "issues", label: "Report Issue", icon: AlertTriangle },
  { id: "notifications", label: "Announcements", icon: Bell }
];

function ConductorPortalShell() {
  const {
    isLoaded, isSignedIn, user, router, signOut,
    isCheckingAssignment, isAssigned, isAuthenticated,
    employeeId, assignedRouteName, busDbId, tripStatus,
    activeTab, setActiveTab,
    showQR, setShowQR,
    mobileMenuOpen, setMobileMenuOpen,
    isOffline, offlineQueue, notifications
  } = useConductor();

  if (!isAuthenticated) {
    return (
      <AnimatePresence>
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[1000] bg-gray-50 flex flex-col items-center justify-center p-6 overflow-y-auto"
        >
          <div className="text-center space-y-5 max-w-md w-full p-10 bg-white border border-gray-100 rounded-[2rem] shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 rounded-full blur-[80px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/5 rounded-full blur-[80px] pointer-events-none" />
            
            <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-orange-600 rounded-3xl flex items-center justify-center mx-auto shadow-xl shadow-orange-500/30 relative z-10">
              <ShieldCheck className="text-white" size={40} />
            </div>
            <h1 className="text-2xl font-black uppercase tracking-tight text-gray-900 relative z-10">Transit Console</h1>
            
            <div className="relative z-10">
              {!isLoaded || isCheckingAssignment ? (
                <div className="space-y-4 pt-4">
                  <RefreshCw className="animate-spin mx-auto text-orange-500" size={28} />
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Verifying Clearance...</p>
                </div>
              ) : !isSignedIn ? (
                <div className="space-y-5 pt-4">
                  <p className="text-xs font-bold text-red-500 uppercase tracking-widest">Authentication Required</p>
                  <button onClick={() => router.push("/sign-in?redirect_url=/conductor")} className="w-full py-4 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-black rounded-xl uppercase tracking-widest text-xs shadow-lg shadow-orange-500/20 active:scale-95 transition-all">
                    Sign In to Continue
                  </button>
                </div>
              ) : !isAssigned ? (
                <div className="space-y-5 pt-4">
                  <p className="text-sm font-black text-red-500 uppercase tracking-widest">ACCESS DENIED</p>
                  <p className="text-xs text-gray-600 leading-relaxed font-medium">
                    Your email <b className="text-gray-900">{user?.primaryEmailAddress?.emailAddress}</b> is not assigned to any conductor role. 
                    Please contact Operations for clearance.
                  </p>
                  <div className="pt-4 space-y-3">
                    <button onClick={() => router.push("/")} className="w-full py-4 bg-gray-900 hover:bg-black text-white font-bold rounded-xl text-xs uppercase tracking-wider transition-all shadow-md active:scale-95">
                      Return to Passenger Dashboard
                    </button>
                    <button onClick={() => signOut()} className="w-full py-4 bg-red-50 text-red-600 hover:bg-red-100 font-bold rounded-xl text-xs uppercase tracking-wider transition-all border border-red-200 active:scale-95">
                      Sign Out
                    </button>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    );
  }

  const renderActiveTab = () => {
    switch (activeTab) {
      case "dashboard": return <DashboardTab />;
      case "scan": return <QRScannerTab />;
      case "ticketing": return <TicketingTab />;
      case "passengers": return <PassengerLedgerTab />;
      case "occupancy": return <OccupancyTab />;
      case "gps": return <GPSTrackerTab />;
      case "collections": return <RevenueLedgerTab />;
      case "offline": return <SyncTab />;
      case "issues": return <ReportIssueTab />;
      case "notifications": return <AnnouncementsTab />;
      default: return <DashboardTab />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/50 text-gray-900 font-sans antialiased overflow-x-hidden flex flex-col md:flex-row">
      
      {/* SIDEBAR FOR DESKTOP */}
      <aside className="hidden md:flex flex-col w-72 bg-white border-r border-gray-200 p-6 space-y-8 shrink-0 shadow-[4px_0_24px_rgba(0,0,0,0.02)] z-10 relative">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-[1.25rem] flex items-center justify-center shadow-lg shadow-orange-500/20">
            <Image src="/hero-logo.png" alt="JB" width={24} height={24} className="invert brightness-0" />
          </div>
          <div>
            <h2 className="text-sm font-black uppercase tracking-tight text-gray-900">Transit Console</h2>
            <div className="flex items-center gap-1.5 mt-1">
              <div className={`w-1.5 h-1.5 rounded-full ${isOffline ? "bg-red-500 animate-pulse" : "bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]"}`} />
              <p className={`text-[9px] font-bold uppercase tracking-wider ${isOffline ? "text-red-500" : "text-emerald-600"}`}>
                {isOffline ? "Offline Mode" : "Sync Engaged"}
              </p>
            </div>
          </div>
        </div>

        <nav className="flex-1 space-y-2 overflow-y-auto no-scrollbar">
          {SIDEBAR_TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            
            // Dynamic Labels for certain tabs
            let label = tab.label;
            if (tab.id === "offline" && offlineQueue.length > 0) label = `Offline Sync (${offlineQueue.length})`;
            if (tab.id === "notifications" && notifications.length > 0) label = `Announcements (${notifications.length})`;

            // Icon Override for Offline
            const DisplayIcon = (tab.id === "offline" && isOffline) ? WifiOff : Icon;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl text-[11px] font-bold transition-all relative group overflow-hidden ${
                  isActive 
                    ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-md shadow-orange-500/20" 
                    : "text-gray-500 hover:text-gray-900 hover:bg-gray-100"
                }`}
              >
                {isActive && <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />}
                <DisplayIcon size={18} className="relative z-10" />
                <span className="relative z-10">{label}</span>
                
                {tab.id === "offline" && offlineQueue.length > 0 && !isActive && (
                  <span className="absolute right-3 w-2 h-2 rounded-full bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.6)] animate-pulse" />
                )}
                {tab.id === "notifications" && notifications.length > 0 && !isActive && (
                  <span className="absolute right-3 w-4 h-4 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-[8px]">{notifications.length}</span>
                )}
              </button>
            );
          })}
        </nav>

        <div className="pt-4 border-t border-gray-100 space-y-3">
          <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 text-[10px] space-y-1.5 shadow-inner">
            <span className="text-gray-400 font-bold uppercase block tracking-widest">Conductor ID</span>
            <span className="text-gray-900 font-black uppercase block tracking-wider">{employeeId || "EMP-N/A"}</span>
          </div>
          <button 
            onClick={() => signOut(() => router.push("/"))}
            className="w-full py-4 bg-white hover:bg-gray-50 border border-gray-200 text-gray-500 hover:text-gray-900 text-[10px] font-black uppercase tracking-wider rounded-xl transition-all shadow-sm active:scale-95"
          >
            Logout Shift
          </button>
        </div>
      </aside>

      {/* MOBILE HEADER */}
      <header className="md:hidden flex items-center justify-between px-5 py-4 bg-white/80 backdrop-blur-lg border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setMobileMenuOpen(true)}
            className="p-2 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-xl text-gray-600 transition-colors"
          >
            <Menu size={18} />
          </button>
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-md shadow-orange-500/20">
              <Image src="/hero-logo.png" alt="JB" width={18} height={18} className="invert brightness-0" />
            </div>
            <div>
              <h2 className="text-[11px] font-black uppercase tracking-tight text-gray-900 leading-tight">Console</h2>
              <div className="flex items-center gap-1.5">
                <div className={`w-1 h-1 rounded-full ${isOffline ? "bg-red-500 animate-pulse" : "bg-emerald-500 animate-pulse shadow-[0_0_6px_rgba(16,185,129,0.5)]"}`} />
                <span className={`text-[8px] font-bold uppercase tracking-widest leading-none ${isOffline ? "text-red-500" : "text-emerald-600"}`}>
                  {isOffline ? "Offline" : "Live"}
                </span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          {offlineQueue.length > 0 && (
            <button 
              onClick={() => setActiveTab("offline")} 
              className="bg-orange-50 text-orange-600 px-3 py-1.5 rounded-full text-[9px] font-black animate-pulse border border-orange-200 shadow-sm"
            >
              Sync ({offlineQueue.length})
            </button>
          )}
          <button 
            onClick={() => signOut(() => router.push("/"))}
            className="p-2.5 bg-gray-50 hover:bg-red-50 hover:text-red-600 border border-gray-200 hover:border-red-200 rounded-xl text-gray-400 transition-colors"
          >
            <LogIn size={16} className="rotate-180" />
          </button>
        </div>
      </header>

      {/* MOBILE SLIDE-OUT MENU DRAWER */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-[100] md:hidden">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm"
            />
            
            <motion.div 
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="absolute left-0 top-0 bottom-0 w-72 bg-white border-r border-gray-200 p-6 flex flex-col justify-between shadow-2xl"
            >
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-[1.25rem] flex items-center justify-center shadow-lg shadow-orange-500/20">
                      <Image src="/hero-logo.png" alt="JB" width={20} height={20} className="invert brightness-0" />
                    </div>
                    <span className="font-black text-sm tracking-tight text-gray-900 uppercase">Menu</span>
                  </div>
                  <button onClick={() => setMobileMenuOpen(false)} className="text-gray-400 hover:text-gray-900 p-2 bg-gray-50 rounded-full">
                    <X size={18} />
                  </button>
                </div>

                <div className="h-px bg-gray-100" />

                <nav className="space-y-2 overflow-y-auto max-h-[calc(100vh-220px)] pr-1 no-scrollbar">
                  {SIDEBAR_TABS.map((tab) => {
                    const Icon = tab.icon;
                    const isActive = activeTab === tab.id;
                    const DisplayIcon = (tab.id === "offline" && isOffline) ? WifiOff : Icon;
                    
                    let label = tab.label;
                    if (tab.id === "offline" && offlineQueue.length > 0) label = `Sync Pending (${offlineQueue.length})`;

                    return (
                      <button
                        key={tab.id}
                        onClick={() => {
                          setActiveTab(tab.id);
                          setMobileMenuOpen(false);
                        }}
                        className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl text-[11px] font-bold transition-all ${
                          isActive 
                            ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-md shadow-orange-500/20" 
                            : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                        }`}
                      >
                        <DisplayIcon size={16} />
                        <span>{label}</span>
                      </button>
                    );
                  })}
                </nav>
              </div>

              <div className="pt-4 border-t border-gray-100">
                <button 
                  onClick={() => {
                    signOut(() => router.push("/"));
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-4 bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-500 text-[10px] font-black uppercase tracking-wider rounded-xl transition-all"
                >
                  Logout Shift
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col min-h-screen overflow-y-auto pb-24 md:pb-8 relative">
        
        {/* Top Header Bar */}
        <div className="bg-white/80 backdrop-blur-md border-b border-gray-200 p-4 px-6 flex flex-wrap gap-4 items-center justify-between sticky top-0 z-40 shadow-sm hidden md:flex">
          <div className="flex items-center gap-3">
            <Wifi size={16} className={isOffline ? "text-red-500" : "text-emerald-500"} />
            <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">
              {isOffline ? "Console Offline" : "Telemetry Engaged"}
            </span>
          </div>
          
          <div className="flex items-center gap-5 text-xs font-bold text-gray-500">
            <span>Route: <strong className="text-gray-900 uppercase tracking-wide">{assignedRouteName || "Coimbatore EXP"}</strong></span>
            <span>Bus: <strong className="text-gray-900 bg-gray-100 px-2 py-1 rounded-lg border border-gray-200">{busDbId || "Unknown"}</strong></span>
            <span className="text-[10px] bg-orange-50 border border-orange-200 px-3 py-1 rounded-full text-orange-600 font-black uppercase tracking-wider shadow-sm">
              {tripStatus}
            </span>
          </div>
        </div>

        {/* Tab Content Rendering Container */}
        <div className="p-4 md:p-8 max-w-5xl w-full mx-auto relative z-10 mt-4 md:mt-0">
          {renderActiveTab()}
        </div>
      </div>

      {/* MOBILE BOTTOM NAVIGATION BAR */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-xl border-t border-gray-200 px-6 py-4 flex items-center justify-between z-50 safe-bottom shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
         {[
           { id: "dashboard", label: "Home", icon: LayoutDashboard },
           { id: "scan", label: "Scan", icon: QrCode },
           { id: "ticketing", label: "Tickets", icon: DollarSign },
           { id: "gps", label: "GPS", icon: MapPin },
           { id: "passengers", label: "Ledger", icon: Users }
         ].map((tab) => {
           const Icon = tab.icon;
           const isActive = activeTab === tab.id;
           return (
             <button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center gap-1.5 cursor-pointer transition-all ${
                isActive ? "text-orange-600 scale-110" : "text-gray-400 hover:text-gray-600"
              }`}
             >
                <div className={`p-2 rounded-xl transition-colors ${isActive ? 'bg-orange-100' : 'bg-transparent'}`}>
                  <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                </div>
                <span className={`text-[9px] font-bold tracking-widest uppercase ${isActive ? 'text-orange-700' : ''}`}>{tab.label}</span>
             </button>
           );
         })}
      </nav>

      {/* MATRIX QR OVERLAY */}
      <AnimatePresence>
        {showQR && (
          <BusMatrixQR 
            busId={busDbId || "TEST-BUS-01"} 
            routeCode="TOWN-EXP-38" 
            onClose={() => setShowQR(false)} 
          />
        )}
      </AnimatePresence>
      
    </div>
  );
}

export default function EnterpriseConductorPortal() {
  return (
    <SecureView>
      <ConductorProvider>
        <ConductorPortalShell />
      </ConductorProvider>
    </SecureView>
  );
}
