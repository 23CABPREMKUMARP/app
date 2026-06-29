import re
with open('app/town-bus/[tripId]/seat-selection/page.tsx', 'r') as f:
    content = f.read()

# 1. Update the state for passengers
content = re.sub(
    r'const \[passengers, setPassengers\] = useState<Array<{ phone: string, luggage: string, destination: string }>>\(\[\n\s+{ phone: \'\', luggage: \'None\', destination: \'\' }\n\s+\]\);',
    "const [passengers, setPassengers] = useState<Array<{ phone: string, luggage: string, destination: string, boarding: string, fare: number }>>([\n    { phone: '', luggage: 'None', destination: '', boarding: '', fare: 20 }\n  ]);",
    content
)

# 2. Update calculateFare function and add it before totalAmount
calc_fare = """  const calculateFare = (boarding: string, destination: string) => {
    if (!boarding || !destination) return 20;
    const bIndex = stops.findIndex((s: any) => s.stopName === boarding);
    const dIndex = stops.findIndex((s: any) => s.stopName === destination);
    if (bIndex === -1 || dIndex === -1) return 20;
    const stopsCount = Math.abs(dIndex - bIndex);
    return Math.max(10, stopsCount * 5);
  };
"""
content = re.sub(r'const totalAmount = .*?;', calc_fare + "  const totalAmount = passengers.reduce((sum, p) => sum + (p.fare || 20) + (LUGGAGE_PRICES[p.luggage] || 0), 0);", content)

# 3. Update the handleIncrement / handleDecrement
content = re.sub(
    r'setPassengers\(prev => \[\.\.\.prev, { phone: prev\[0\]\?\.phone \|\| \'\', luggage: \'None\', destination: prev\[0\]\?\.destination \|\| \'\' }\]\);',
    "setPassengers(prev => [...prev, { phone: prev[0]?.phone || '', luggage: 'None', boarding: prev[prev.length - 1]?.destination || '', destination: '', fare: 20 }]);",
    content
)

# 4. We need to replace step 1 and step 2 completely. Let's find the boundaries.
# Starts at `        {/* Routing Dynamic Highlight */}`
# Ends before `{step === 3 && (`
# I'll just do a regex sub between these.

pattern = r'(\{\/\* Routing Dynamic Highlight \*\/\}.*?)\{step === 3 && \('
replacement = """{/* Routing Dynamic Highlight */}
        <div className="bg-zinc-950 rounded-[32px] p-6 flex items-center justify-between relative overflow-hidden group mb-8 shadow-lg shadow-black/10">
          <div className="absolute inset-y-0 left-0 w-1 bg-[#FF9933]" />
          <div className="flex flex-col gap-1">
            <span className="text-[8px] font-black text-zinc-500 uppercase tracking-[0.3em]">Total Journeys</span>
            <span className="text-sm font-black text-white uppercase truncate max-w-[120px]">{passengers.length}</span>
          </div>
          <div className="flex-1 flex flex-col items-center px-4">
            <div className="w-full h-[1px] bg-zinc-800 relative">
              <div className="absolute inset-0 bg-[#FF9933] animate-pulse" />
              <Bus size={14} className="absolute -top-1.5 left-1/2 -translate-x-1/2 text-[#FF9933]" />
            </div>
          </div>
          <div className="flex flex-col gap-1 text-right">
            <span className="text-[8px] font-black text-zinc-500 uppercase tracking-[0.3em]">Combined Fare</span>
            <span className="text-sm font-black text-white uppercase truncate max-w-[120px]">₹{totalAmount}</span>
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
                
                <h2 className="text-xl font-black uppercase tracking-widest text-zinc-900 mb-2">Build Your Journeys</h2>
                <p className="text-slate-500 text-sm mb-8">Add multiple segments to book a combined ticket.</p>

                <div className="mt-8 pt-4">
                  {passengers.map((passenger, index) => (
                    <div key={index} className="mb-6 bg-zinc-50 border border-zinc-200 rounded-2xl p-5 relative">
                      <div className="absolute -top-3 left-4 bg-white px-2 py-0.5 text-[10px] font-black text-[#FF9933] uppercase tracking-widest border border-zinc-200 rounded-full shadow-sm flex items-center gap-2">
                        Journey {index + 1}
                        {passengers.length > 1 && (
                          <button onClick={() => {
                            const newP = [...passengers];
                            newP.splice(index, 1);
                            setPassengers(newP);
                            setTicketCount(newP.length);
                          }} className="text-red-500 hover:text-red-700 ml-2">
                            <Minus size={12} />
                          </button>
                        )}
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 mt-2">
                        {/* Boarding */}
                        <div className="mb-4">
                          <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest pl-1 mb-1 block">Boarding Point</label>
                          <select 
                            value={passenger.boarding} 
                            onChange={(e) => {
                              const newP = [...passengers];
                              newP[index].boarding = e.target.value;
                              newP[index].fare = calculateFare(newP[index].boarding, newP[index].destination);
                              setPassengers(newP);
                            }} 
                            className="w-full h-12 bg-white border border-zinc-200 rounded-xl px-4 font-bold text-sm text-zinc-900 outline-none focus:border-[#FF9933] transition-all cursor-pointer"
                          >
                            <option value="">Choose Start</option>
                            {stops.map((s: any) => <option key={s._id} value={s.stopName}>{s.stopName}</option>)}
                          </select>
                        </div>

                        {/* Destination */}
                        <div className="mb-4">
                          <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest pl-1 mb-1 block">Drop Point</label>
                          <select 
                            value={passenger.destination} 
                            onChange={(e) => {
                              const newP = [...passengers];
                              newP[index].destination = e.target.value;
                              newP[index].fare = calculateFare(newP[index].boarding, newP[index].destination);
                              setPassengers(newP);
                            }} 
                            className="w-full h-12 bg-white border border-zinc-200 rounded-xl px-4 font-bold text-sm text-zinc-900 outline-none focus:border-[#FF9933] transition-all cursor-pointer"
                          >
                            <option value="">Choose End</option>
                            {stops
                              .filter((s: any) => s.stopName !== passenger.boarding)
                              .map((s: any) => <option key={s._id} value={s.stopName}>{s.stopName}</option>)}
                          </select>
                        </div>
                      </div>

                      {/* Phone */}
                      <div className="mb-4">
                        <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest pl-1 mb-1 block">Phone Number</label>
                        <IntelligentPhoneInput 
                          value={passenger.phone}
                          onChange={(val) => {
                            const newP = [...passengers];
                            newP[index].phone = val;
                            setPassengers(newP);
                          }}
                        />
                      </div>

                      {/* Luggage & Fare */}
                      <div className="flex justify-between items-end">
                        <div className="flex-1">
                          <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest pl-1 mb-2 flex items-center gap-1">
                            <Package size={12} className="text-[#FF9933]" /> Luggage Add-on
                          </label>
                          <div className="grid grid-cols-4 gap-2">
                            {['None', 'Small', 'Medium', 'Large'].map(type => (
                              <button 
                                key={type}
                                onClick={() => {
                                  const newP = [...passengers];
                                  newP[index].luggage = type;
                                  setPassengers(newP);
                                }}
                                className={`py-2 rounded-xl text-[9px] font-black uppercase tracking-widest border transition-all ${
                                  passenger.luggage === type 
                                    ? 'bg-[#FF9933] text-white border-[#FF9933] shadow-md shadow-[#FF9933]/20' 
                                    : 'bg-white text-slate-500 border-zinc-200 hover:border-zinc-300'
                                }`}
                              >
                                {type} {type !== 'None' && <span className="block mt-0.5 opacity-75">+₹{LUGGAGE_PRICES[type]}</span>}
                              </button>
                            ))}
                          </div>
                        </div>
                        <div className="ml-4 text-right">
                           <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest block mb-1">Fare</span>
                           <span className="text-xl font-black text-zinc-900">₹{passenger.fare || 20}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  <button
                    onClick={handleIncrement}
                    disabled={ticketCount >= 10}
                    className="w-full py-4 border-2 border-dashed border-zinc-300 text-zinc-500 rounded-2xl font-bold uppercase tracking-widest text-xs hover:border-[#FF9933] hover:text-[#FF9933] transition-all flex items-center justify-center gap-2"
                  >
                    <Plus size={16} /> Add Another Journey
                  </button>
                </div>

                <button 
                  onClick={() => setStep(3)}
                  disabled={passengers.some(p => !p.boarding || !p.destination)}
                  className="w-full h-20 bg-[#FF9933] text-white rounded-[32px] font-black text-xl tracking-tighter hover:bg-orange-600 transition-all flex items-center justify-center gap-3 disabled:opacity-50 mt-8 active:scale-95 shadow-lg shadow-[#FF9933]/20"
                >
                  Proceed to Payment <ChevronRight size={24} />
                </button>
              </div>
            </motion.div>
          )}

          {step === 3 && ("""
content = re.sub(pattern, replacement, content, flags=re.DOTALL)

with open('app/town-bus/[tripId]/seat-selection/page.tsx', 'w') as f:
    f.write(content)
