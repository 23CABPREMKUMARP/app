"use client";

import React, { createContext, useContext, useState, useEffect, useRef } from "react";
import { useUser, useClerk } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useGPS } from "@/src/hooks/useGPS";

interface ConductorContextType {
  // Auth & Assignment
  isLoaded: boolean;
  isSignedIn: boolean;
  user: any;
  signOut: any;
  router: any;
  isCheckingAssignment: boolean;
  isAssigned: boolean;
  isAuthenticated: boolean;
  employeeId: string;
  assignedRouteName: string;
  error: string;
  setError: (e: string) => void;

  // Portal Shell State
  activeTab: string;
  setActiveTab: (t: string) => void;
  showQR: boolean;
  setShowQR: (s: boolean) => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (o: boolean) => void;
  busDbId: string;
  tripStatus: string;
  setTripStatus: (s: string) => void;
  speed: number;
  lat: number;
  lng: number;
  gpsEnabled: boolean;
  setGpsEnabled: (e: boolean) => void;
  isOffline: boolean;
  setIsOffline: (o: boolean) => void;
  gpsState: any;

  // Statistics
  ticketsSold: number;
  setTicketsSold: React.Dispatch<React.SetStateAction<number>>;
  passengersBoarded: number;
  setPassengersBoarded: React.Dispatch<React.SetStateAction<number>>;
  totalRevenue: number;
  setTotalRevenue: React.Dispatch<React.SetStateAction<number>>;
  cashCollection: number;
  setCashCollection: React.Dispatch<React.SetStateAction<number>>;
  onlineCollection: number;
  setOnlineCollection: React.Dispatch<React.SetStateAction<number>>;
  completedTrips: number;
  occupancy: number;
  setOccupancy: React.Dispatch<React.SetStateAction<number>>;

  // Scanner States
  isScanning: boolean;
  setIsScanning: (s: boolean) => void;
  validating: boolean;
  setValidating: (v: boolean) => void;
  scanResult: any;
  setScanResult: (r: any) => void;
  scannerRef: any;

  // Onboard Ticketing
  obBoarding: string;
  setObBoarding: (s: string) => void;
  obDestination: string;
  setObDestination: (s: string) => void;
  obQuantity: number;
  setObQuantity: (n: number) => void;
  obPaymentMode: "Cash" | "UPI" | "PhonePe" | "GPay";
  setObPaymentMode: (m: "Cash" | "UPI" | "PhonePe" | "GPay") => void;
  obSuccessTicket: any;
  setObSuccessTicket: (t: any) => void;

  // Passengers
  passengers: any[];
  setPassengers: React.Dispatch<React.SetStateAction<any[]>>;
  searchQuery: string;
  setSearchQuery: (s: string) => void;
  passengerFilter: "All" | "Boarded" | "Not Boarded";
  setPassengerFilter: (f: "All" | "Boarded" | "Not Boarded") => void;

  // Seats
  seats: boolean[];
  setSeats: React.Dispatch<React.SetStateAction<boolean[]>>;

  // Offline Queue
  offlineQueue: any[];
  setOfflineQueue: React.Dispatch<React.SetStateAction<any[]>>;

  // Issue Reporting
  issueType: string;
  setIssueType: (t: string) => void;
  issueSeverity: string;
  setIssueSeverity: (s: string) => void;
  issueDesc: string;
  setIssueDesc: (d: string) => void;
  issueSuccess: boolean;
  setIssueSuccess: (s: boolean) => void;

  // Notifications & Logs
  notifications: any[];
  setNotifications: React.Dispatch<React.SetStateAction<any[]>>;
  logs: any[];
  setLogs: React.Dispatch<React.SetStateAction<any[]>>;

  // Helpers
  playBeep: (success: boolean) => void;
  triggerTripBroadcast: (statusOverride?: string, customText?: string) => Promise<void>;
  saveStats: (updated: any) => void;
}

const ConductorContext = createContext<ConductorContextType | undefined>(undefined);

export const STOPS = ["Gandhipuram", "Lakshmi Mills", "Peelamedu", "Hope College", "Singanallur", "Ukkadam", "Railway Station"];

const INITIAL_PASSENGERS = [
  { ticketId: "TB-849204", name: "Anand Kumar", boarding: "Gandhipuram", destination: "Singanallur", status: "Boarded", seat: "S4" },
  { ticketId: "TB-732049", name: "Priya Sharma", boarding: "Lakshmi Mills", destination: "Ukkadam", status: "Not Boarded", seat: "S12" },
  { ticketId: "TB-590234", name: "Karthik Mani", boarding: "Peelamedu", destination: "Railway Station", status: "Boarded", seat: "S18" },
  { ticketId: "TB-920482", name: "Divya Nathan", boarding: "Hope College", destination: "Singanallur", status: "Not Boarded", seat: "S25" },
  { ticketId: "TB-310492", name: "Ramesh Krishnan", boarding: "Gandhipuram", destination: "Ukkadam", status: "Boarded", seat: "S7" }
];

export function ConductorProvider({ children }: { children: React.ReactNode }) {
  const { isLoaded, isSignedIn, user } = useUser();
  const { signOut } = useClerk();
  const router = useRouter();

  const [isCheckingAssignment, setIsCheckingAssignment] = useState(true);
  const [isAssigned, setIsAssigned] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  const [employeeId, setEmployeeId] = useState("");
  const [assignedRouteName, setAssignedRouteName] = useState("");
  const [error, setError] = useState("");

  const [activeTab, setActiveTab] = useState("dashboard");
  const [showQR, setShowQR] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [busDbId, setBusDbId] = useState("");
  const [tripStatus, setTripStatus] = useState("Scheduled");
  const [speed, setSpeed] = useState(0);
  const [lat, setLat] = useState(11.0168); 
  const [lng, setLng] = useState(76.9558);
  const [gpsEnabled, setGpsEnabled] = useState(false);

  const [ticketsSold, setTicketsSold] = useState(12);
  const [passengersBoarded, setPassengersBoarded] = useState(3);
  const [totalRevenue, setTotalRevenue] = useState(180);
  const [cashCollection, setCashCollection] = useState(120);
  const [onlineCollection, setOnlineCollection] = useState(60);
  const [completedTrips, setCompletedTrips] = useState(1);
  const [occupancy, setOccupancy] = useState(28);

  const [isScanning, setIsScanning] = useState(false);
  const [validating, setValidating] = useState(false);
  const [scanResult, setScanResult] = useState<any>(null);
  const scannerRef = useRef<any>(null);

  const [obBoarding, setObBoarding] = useState(STOPS[0]);
  const [obDestination, setObDestination] = useState(STOPS[1]);
  const [obQuantity, setObQuantity] = useState(1);
  const [obPaymentMode, setObPaymentMode] = useState<"Cash" | "UPI" | "PhonePe" | "GPay">("Cash");
  const [obSuccessTicket, setObSuccessTicket] = useState<any>(null);

  const [passengers, setPassengers] = useState<any[]>(INITIAL_PASSENGERS);
  const [searchQuery, setSearchQuery] = useState("");
  const [passengerFilter, setPassengerFilter] = useState<"All" | "Boarded" | "Not Boarded">("All");

  const [seats, setSeats] = useState<boolean[]>(
    Array(50).fill(false).map((_, i) => i < 28)
  );

  const [isOffline, setIsOffline] = useState(false);
  const [offlineQueue, setOfflineQueue] = useState<any[]>([]);

  const [issueType, setIssueType] = useState("Vehicle Breakdown");
  const [issueSeverity, setIssueSeverity] = useState("Medium");
  const [issueDesc, setIssueDesc] = useState("");
  const [issueSuccess, setIssueSuccess] = useState(false);

  const [notifications, setNotifications] = useState<any[]>([
    { id: 1, title: "Route Delay Info", message: "Coimbatore Local: Traffic delays near Hope College bypass.", time: "5m ago", type: "warning" },
    { id: 2, title: "Assigned Bus", message: "Assigned to Bus Code 1024 (TN-38-EF-2025) for current shift.", time: "1h ago", type: "info" },
    { id: 3, title: "Announcement", message: "Conductors must enforce digital QR pass scanning strictly.", time: "2h ago", type: "info" }
  ]);

  const [logs, setLogs] = useState<any[]>([
    { time: "08:30 AM", event: "Shift engaged by Employee EMP-N/A", type: "system" },
    { time: "09:12 AM", event: "Validated Ticket TB-849204 (Boarded: Gandhipuram)", type: "scan" },
    { time: "09:45 AM", event: "Completed Trip 1: Ukkadam Express", type: "trip" }
  ]);

  const gpsState = useGPS({
    busId: busDbId,
    conductorId: employeeId,
    enabled: gpsEnabled && !!busDbId,
    onLocationUpdate: ({ lat: newLat, lng: newLng, speed: newSpeed }) => {
      setLat(newLat);
      setLng(newLng);
      setSpeed(newSpeed);
    },
    onError: (err) => setError(err),
  });

  useEffect(() => {
    if (isAuthenticated && busDbId) {
      fetch("/api/buses")
        .then((res) => res.json())
        .then((data) => {
          if (Array.isArray(data)) {
            const matchedBus = data.find((b: any) => b.id === busDbId || b._id === busDbId || b.busNumber === busDbId);
            if (matchedBus) {
              setTripStatus(matchedBus.status || "Scheduled");
              setSpeed(matchedBus.speed || 0);
              if (matchedBus.location) {
                setLat(matchedBus.location.lat || 11.0168);
                setLng(matchedBus.location.lng || 76.9558);
              }
            }
          }
        })
        .catch((err) => console.error("Error fetching buses:", err));
    }
  }, [isAuthenticated, busDbId]);

  useEffect(() => {
    if (isLoaded) {
      if (!isSignedIn) {
        router.push("/sign-in?redirect_url=/conductor");
      } else if (user?.primaryEmailAddress?.emailAddress) {
        fetch(`/api/conductor/check-assignment?email=${encodeURIComponent(user.primaryEmailAddress.emailAddress)}`)
          .then(res => res.json())
          .then(data => {
            if (data.success && data.isAssigned) {
              setEmployeeId(data.assignment.employee_id || "EMP-N/A");
              setBusDbId(data.assignment.assigned_bus || "");
              setAssignedRouteName(data.assignment.assigned_route || "Route Unassigned");
              setIsAssigned(true);
              setIsAuthenticated(true);
            } else {
              setIsAssigned(false);
            }
            setIsCheckingAssignment(false);
          })
          .catch(err => {
            console.error("Assignment check failed", err);
            setIsCheckingAssignment(false);
          });
      }
    }
  }, [isLoaded, isSignedIn, user, router]);

  const playBeep = (success: boolean) => {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      
      osc.type = "sine";
      osc.frequency.setValueAtTime(success ? 880 : 220, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.5);
      
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      
      osc.start();
      osc.stop(audioCtx.currentTime + 0.5);
    } catch (e) {}
  };

  const triggerTripBroadcast = async (statusOverride?: string, customText?: string) => {
    if (isOffline) return;
    try {
      const res = await fetch("/api/conductor/update-trip", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          busId: busDbId || "65f02cdcf8dbd5225c588825",
          status: statusOverride || tripStatus,
          speed: speed,
          lat: lat,
          lng: lng,
          customBroadcast: customText || undefined
        })
      });
      const data = await res.json();
      if (data.success) {
        if (statusOverride) {
          setTripStatus(statusOverride);
          setLogs(prev => [
            { time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), event: `Trip status broadcasted: ${statusOverride}`, type: "trip" },
            ...prev
          ]);
        }
      }
    } catch (err) {}
  };

  const saveStats = (updated: any) => {
    localStorage.setItem("conductorStats", JSON.stringify({
      ticketsSold: updated.ticketsSold ?? ticketsSold,
      passengersBoarded: updated.passengersBoarded ?? passengersBoarded,
      totalRevenue: updated.totalRevenue ?? totalRevenue,
      cashCollection: updated.cashCollection ?? cashCollection,
      onlineCollection: updated.onlineCollection ?? onlineCollection
    }));
  };

  const value = {
    isLoaded, isSignedIn, user, signOut, router,
    isCheckingAssignment, isAssigned, isAuthenticated, employeeId, assignedRouteName,
    error, setError,
    activeTab, setActiveTab, showQR, setShowQR, mobileMenuOpen, setMobileMenuOpen,
    busDbId, tripStatus, setTripStatus, speed, lat, lng, gpsEnabled, setGpsEnabled,
    isOffline, setIsOffline, gpsState,
    ticketsSold, setTicketsSold, passengersBoarded, setPassengersBoarded,
    totalRevenue, setTotalRevenue, cashCollection, setCashCollection,
    onlineCollection, setOnlineCollection, completedTrips, occupancy, setOccupancy,
    isScanning, setIsScanning, validating, setValidating, scanResult, setScanResult, scannerRef,
    obBoarding, setObBoarding, obDestination, setObDestination, obQuantity, setObQuantity,
    obPaymentMode, setObPaymentMode, obSuccessTicket, setObSuccessTicket,
    passengers, setPassengers, searchQuery, setSearchQuery, passengerFilter, setPassengerFilter,
    seats, setSeats, offlineQueue, setOfflineQueue,
    issueType, setIssueType, issueSeverity, setIssueSeverity, issueDesc, setIssueDesc, issueSuccess, setIssueSuccess,
    notifications, setNotifications, logs, setLogs,
    playBeep, triggerTripBroadcast, saveStats
  };

  return <ConductorContext.Provider value={value}>{children}</ConductorContext.Provider>;
}

export function useConductor() {
  const context = useContext(ConductorContext);
  if (context === undefined) {
    throw new Error("useConductor must be used within a ConductorProvider");
  }
  return context;
}
