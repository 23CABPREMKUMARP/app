"use client";

import React, { useState } from 'react';
import { Bus, Plus, Edit2, Trash2 } from 'lucide-react';

export default function AdminTownBusPage() {
  const [routes, setRoutes] = useState([
    { id: 1, name: "Gandhipuram - Ukkadam", fare: 15, crowdStatus: "Low", availableSeats: 45 },
    { id: 2, name: "Singanallur - Marudamalai", fare: 25, crowdStatus: "High", availableSeats: 5 }
  ]);

  return (
    <div className="min-h-screen bg-slate-50 font-sans p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tighter">Town Bus Admin</h1>
            <p className="text-slate-500 font-medium">Manage routes, fares, and real-time crowd status</p>
          </div>
          <button className="bg-[#FF9933] text-white px-6 py-3 rounded-xl font-black uppercase tracking-widest text-xs flex items-center gap-2 hover:bg-orange-600 transition-colors shadow-lg shadow-orange-500/20">
            <Plus size={16} /> Add Route
          </button>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="py-4 px-6 text-[10px] font-black uppercase tracking-widest text-slate-500">Route Name</th>
                <th className="py-4 px-6 text-[10px] font-black uppercase tracking-widest text-slate-500">Fare</th>
                <th className="py-4 px-6 text-[10px] font-black uppercase tracking-widest text-slate-500">Seats Left</th>
                <th className="py-4 px-6 text-[10px] font-black uppercase tracking-widest text-slate-500">Crowd Status</th>
                <th className="py-4 px-6 text-[10px] font-black uppercase tracking-widest text-slate-500 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {routes.map(route => (
                <tr key={route.id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors">
                  <td className="py-4 px-6 font-bold text-slate-900 flex items-center gap-3">
                    <div className="bg-slate-100 p-2 rounded-lg"><Bus size={16} className="text-[#FF9933]" /></div>
                    {route.name}
                  </td>
                  <td className="py-4 px-6 font-bold text-slate-700">₹{route.fare}</td>
                  <td className="py-4 px-6 font-bold text-slate-700">{route.availableSeats}</td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                      route.crowdStatus === 'Low' ? 'bg-emerald-100 text-emerald-600' :
                      route.crowdStatus === 'High' ? 'bg-red-100 text-red-600' : 'bg-yellow-100 text-yellow-600'
                    }`}>
                      {route.crowdStatus}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right space-x-2">
                    <button className="p-2 text-slate-400 hover:text-[#FF9933] transition-colors rounded-lg hover:bg-slate-100"><Edit2 size={16} /></button>
                    <button className="p-2 text-slate-400 hover:text-red-500 transition-colors rounded-lg hover:bg-slate-100"><Trash2 size={16} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
