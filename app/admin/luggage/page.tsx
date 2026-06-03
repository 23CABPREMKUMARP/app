"use client";

import React, { useState } from 'react';
import { Package, Truck, Search, CheckCircle, Clock } from 'lucide-react';

export default function AdminLuggagePage() {
  const [parcels, setParcels] = useState([
    { id: "TRK-A9X7B2", sender: "Rahul", receiver: "Sneha", status: "In Transit", date: "Today, 10:00 AM", amount: 150 },
    { id: "TRK-K8M4P1", sender: "Vikram", receiver: "Pooja", status: "Booked", date: "Today, 12:30 PM", amount: 250 }
  ]);

  return (
    <div className="min-h-screen bg-slate-50 font-sans p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tighter">Luggage Admin</h1>
            <p className="text-slate-500 font-medium">Manage parcel bookings and update tracking status</p>
          </div>
          
          <div className="bg-white px-4 py-2 rounded-xl shadow-sm border border-slate-200 flex items-center gap-3 w-72">
            <Search size={18} className="text-slate-400" />
            <input type="text" placeholder="Search tracking ID..." className="outline-none bg-transparent flex-1 text-sm font-bold text-slate-700" />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-500 flex items-center justify-center"><Package size={24} /></div>
            <div>
              <div className="text-2xl font-black text-slate-900">124</div>
              <div className="text-[10px] font-black uppercase tracking-widest text-slate-500">Total Parcels Today</div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-orange-50 text-[#FF9933] flex items-center justify-center"><Truck size={24} /></div>
            <div>
              <div className="text-2xl font-black text-slate-900">45</div>
              <div className="text-[10px] font-black uppercase tracking-widest text-slate-500">In Transit</div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-500 flex items-center justify-center"><CheckCircle size={24} /></div>
            <div>
              <div className="text-2xl font-black text-slate-900">79</div>
              <div className="text-[10px] font-black uppercase tracking-widest text-slate-500">Delivered</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="py-4 px-6 text-[10px] font-black uppercase tracking-widest text-slate-500">Tracking ID</th>
                <th className="py-4 px-6 text-[10px] font-black uppercase tracking-widest text-slate-500">Details</th>
                <th className="py-4 px-6 text-[10px] font-black uppercase tracking-widest text-slate-500">Amount</th>
                <th className="py-4 px-6 text-[10px] font-black uppercase tracking-widest text-slate-500">Status</th>
                <th className="py-4 px-6 text-[10px] font-black uppercase tracking-widest text-slate-500 text-right">Update Status</th>
              </tr>
            </thead>
            <tbody>
              {parcels.map(parcel => (
                <tr key={parcel.id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors">
                  <td className="py-4 px-6 font-black text-slate-900">{parcel.id}</td>
                  <td className="py-4 px-6">
                    <div className="font-bold text-slate-700 text-sm">{parcel.sender} &rarr; {parcel.receiver}</div>
                    <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1 flex items-center gap-1"><Clock size={10} /> {parcel.date}</div>
                  </td>
                  <td className="py-4 px-6 font-bold text-slate-700">₹{parcel.amount}</td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                      parcel.status === 'In Transit' ? 'bg-[#FF9933]/10 text-[#FF9933]' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {parcel.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <select className="bg-slate-100 border border-slate-200 text-slate-700 text-xs font-bold rounded-lg px-3 py-2 outline-none cursor-pointer hover:border-slate-300 transition-colors">
                      <option>Booked</option>
                      <option>Picked up</option>
                      <option>In Transit</option>
                      <option>Reached Destination</option>
                      <option>Delivered</option>
                    </select>
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
