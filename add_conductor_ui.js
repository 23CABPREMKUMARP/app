const fs = require('fs');
const file = 'app/admin/town-bus/page.tsx';
let code = fs.readFileSync(file, 'utf8');

// 1. Add states
const stateInjection = `
  const [showAddConductor, setShowAddConductor] = useState(false);
  const [newConductor, setNewConductor] = useState({
    name: '',
    email: '',
    employee_id: '',
    assigned_bus: '',
    assigned_route: ''
  });
`;

code = code.replace(/const \[showAddRoute, setShowAddRoute\] = useState\(false\);/, 
  'const [showAddRoute, setShowAddRoute] = useState(false);\n' + stateInjection);

// 2. Add handleAddConductorSubmit
const submitInjection = `
  const handleAddConductorSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isRestricted('Operations Admin')) return;

    try {
      const res = await fetch("/api/admin/conductors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newConductor)
      });
      const data = await res.json();
      if (data.success) {
        setConductors([...conductors, data.conductor]);
        setShowAddConductor(false);
        addOpLog(\`Assigned Conductor \${newConductor.name} (\${newConductor.email})\`, "success");
        setNewConductor({ name: '', email: '', employee_id: '', assigned_bus: '', assigned_route: '' });
      } else {
        alert(data.error || "Failed to assign conductor");
      }
    } catch (e) {
      alert("Network error");
    }
  };
`;

code = code.replace(/const handleAddRouteSubmit = /, submitInjection + '\n  const handleAddRouteSubmit = ');

// 3. Add button next to "Active Conductor Rosters"
const buttonInjection = `
                    <div className="flex justify-between items-center bg-slate-900 p-5 rounded-2xl border border-slate-800">
                      <div>
                        <h4 className="text-xs font-bold text-white uppercase tracking-widest">Active Conductor Rosters</h4>
                        <p className="text-[10px] text-slate-400 mt-0.5">Manage conductor assignments and email access control</p>
                      </div>
                      <button 
                        onClick={() => setShowAddConductor(true)}
                        className="px-4 py-2 bg-[#FF9933] hover:bg-orange-600 text-white text-[10px] font-black uppercase tracking-wider rounded-xl transition-all flex items-center gap-2 shadow-lg shadow-orange-500/20 active:scale-95"
                      >
                        <Plus size={14} /> Assign Conductor
                      </button>
                    </div>
`;

code = code.replace(/<div className="flex justify-between items-center bg-slate-900 p-5 rounded-2xl border border-slate-800">[\s\S]*?<\/div>/, buttonInjection);

// 4. Add the modal UI right before the final closing tag of the component
const modalInjection = `
      {/* ADD CONDUCTOR MODAL */}
      <AnimatePresence>
        {showAddConductor && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowAddConductor(false)} className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="relative bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 w-full max-w-md shadow-2xl overflow-y-auto max-h-[90vh]">
              <button onClick={() => setShowAddConductor(false)} className="absolute top-6 right-6 text-slate-500 hover:text-white transition-colors">
                <X size={20} />
              </button>
              
              <div className="mb-6">
                <h3 className="text-xl font-black tracking-tight text-white">Assign Conductor</h3>
                <p className="text-xs text-slate-400 font-medium mt-1">Grant portal access via Clerk Email Auth</p>
              </div>

              <form onSubmit={handleAddConductorSubmit} className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5 ml-1">Full Name</label>
                    <input type="text" required value={newConductor.name} onChange={e => setNewConductor({...newConductor, name: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:border-[#FF9933] focus:ring-1 focus:ring-[#FF9933] outline-none transition-all placeholder:text-slate-600" placeholder="e.g. Ramesh Kumar" />
                  </div>
                  
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5 ml-1">Clerk Auth Email</label>
                    <input type="email" required value={newConductor.email} onChange={e => setNewConductor({...newConductor, email: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:border-[#FF9933] focus:ring-1 focus:ring-[#FF9933] outline-none transition-all placeholder:text-slate-600" placeholder="e.g. ramesh@example.com" />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5 ml-1">Employee ID</label>
                      <input type="text" required value={newConductor.employee_id} onChange={e => setNewConductor({...newConductor, employee_id: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:border-[#FF9933] outline-none transition-all" placeholder="EMP-1024" />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5 ml-1">Assigned Bus</label>
                      <input type="text" value={newConductor.assigned_bus} onChange={e => setNewConductor({...newConductor, assigned_bus: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:border-[#FF9933] outline-none transition-all" placeholder="TN38..." />
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5 ml-1">Assigned Route</label>
                    <input type="text" value={newConductor.assigned_route} onChange={e => setNewConductor({...newConductor, assigned_route: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:border-[#FF9933] outline-none transition-all" placeholder="Gandhipuram → Airport" />
                  </div>
                </div>

                <div className="pt-4 flex gap-3">
                  <button type="button" onClick={() => setShowAddConductor(false)} className="flex-1 px-4 py-3 bg-slate-800 hover:bg-slate-700 text-white text-[10px] font-black uppercase tracking-wider rounded-xl transition-all">Cancel</button>
                  <button type="submit" className="flex-1 px-4 py-3 bg-[#FF9933] hover:bg-orange-600 text-white text-[10px] font-black uppercase tracking-wider rounded-xl transition-all shadow-lg shadow-orange-500/20 flex items-center justify-center gap-2"><CheckCircle size={14} /> Authorize</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
`;

// Insert the modal before the final `</div>`
const lastDivIndex = code.lastIndexOf('</div>');
if (lastDivIndex !== -1) {
  code = code.substring(0, lastDivIndex) + modalInjection + code.substring(lastDivIndex);
}

fs.writeFileSync(file, code);
