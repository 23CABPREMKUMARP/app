"use client";

import React from "react";
import { motion } from "motion/react";
import { useConductor } from "@/src/context/ConductorContext";

export function ReportIssueTab() {
  const {
    issueType, setIssueType,
    issueSeverity, setIssueSeverity,
    issueDesc, setIssueDesc,
    issueSuccess, setIssueSuccess,
    setLogs, triggerTripBroadcast, playBeep
  } = useConductor();

  const handleReportIssue = (e: React.FormEvent) => {
    e.preventDefault();
    if (!issueDesc.trim()) return;

    setIssueSuccess(true);
    setLogs(prev => [
      { time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), event: `Reported issue: [${issueSeverity}] ${issueType}`, type: "report" },
      ...prev
    ]);

    if (issueSeverity === "Emergency") {
      triggerTripBroadcast("Delayed", `EMERGENCY ALERT: ${issueType}. ${issueDesc}`);
    }

    setTimeout(() => {
      setIssueSuccess(false);
      setIssueDesc("");
    }, 3000);
    playBeep(true);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 text-left">
      <div className="bg-white/70 backdrop-blur-md border border-gray-200 shadow-sm rounded-3xl p-6 space-y-5">
        <h3 className="text-xs font-black uppercase tracking-widest text-gray-500 border-b border-gray-200 pb-3">Report Transit Incident</h3>
        
        <form onSubmit={handleReportIssue} className="space-y-5">
          
          <div className="space-y-1">
            <label className="text-[9px] font-black text-gray-500 uppercase tracking-widest pl-1 block">Incident Type</label>
            <select
              value={issueType}
              onChange={(e) => setIssueType(e.target.value)}
              className="w-full bg-white border border-gray-200 shadow-inner rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm text-gray-900 transition-shadow"
            >
              {["Vehicle Breakdown", "Traffic Delay", "Passenger Complaint", "Route Diversion", "Medical Emergency"].map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-[9px] font-black text-gray-500 uppercase tracking-widest pl-1 block">Severity Level</label>
            <div className="grid grid-cols-3 gap-3">
              {["Medium", "High", "Emergency"].map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setIssueSeverity(s)}
                  className={`py-3 text-[10px] font-black uppercase tracking-wider rounded-xl border transition-all ${
                    issueSeverity === s 
                      ? s === "Emergency" 
                        ? "bg-red-50 border-red-500 text-red-600 shadow-sm" 
                        : "bg-orange-50 border-orange-500 text-orange-600 shadow-sm"
                      : "bg-white hover:bg-gray-50 border-gray-200 text-gray-500"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[9px] font-black text-gray-500 uppercase tracking-widest pl-1 block">Report Details</label>
            <textarea
              placeholder="Describe the vehicle breakdown, delays, or emergency details for the admin control room..."
              value={issueDesc}
              onChange={(e) => setIssueDesc(e.target.value)}
              className="w-full bg-white border border-gray-200 shadow-inner rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm text-gray-900 h-32 placeholder:text-gray-400 transition-shadow resize-none"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-xl font-black uppercase tracking-widest text-[10px] shadow-lg shadow-orange-500/20 active:scale-95 transition-all cursor-pointer"
          >
            Dispatch Report to Control Room
          </button>

          {issueSuccess && (
            <p className="text-green-600 bg-green-50 p-3 rounded-xl border border-green-200 text-[10px] font-black uppercase tracking-wider text-center mt-4">
              Report dispatched successfully to Admin terminal!
            </p>
          )}
        </form>
      </div>
    </motion.div>
  );
}
