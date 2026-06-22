const fs = require('fs');
const file = 'app/admin/town-bus/page.tsx';
let code = fs.readFileSync(file, 'utf8');

// Replace Conductor Interface
code = code.replace(
  /interface Conductor \{[\s\S]*?\}/,
  `interface Conductor {
  id: string;
  name: string;
  email: string;
  employee_id: string;
  assigned_bus: string;
  assigned_route: string;
  status: 'Active' | 'Suspended';
  created_at?: string;
  // Fallbacks for UI backwards compatibility
  attendance?: 'Present' | 'Absent';
  walletBalance?: number;
  shift?: string;
}`
);

// Remove INITIAL_CONDUCTORS definition
code = code.replace(
  /const INITIAL_CONDUCTORS: Conductor\[\] = \[\s*\{.*?\},\s*\{.*?\},\s*\{.*?\},\s*\{.*?\},\s*\];/s,
  `const INITIAL_CONDUCTORS: Conductor[] = [];`
);

// Add fetchConductors
code = code.replace(
  /const fetchBookings = async \(\) => \{/,
  `const fetchConductors = async () => {
    try {
      const res = await fetch("/api/admin/conductors");
      const data = await res.json();
      if (Array.isArray(data)) {
        setConductors(data);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const fetchBookings = async () => {`
);

// Add fetchConductors to Promise.all in useEffect
code = code.replace(
  /Promise\.all\(\[fetchBuses\(\), fetchBookings\(\)\]\)/,
  `Promise.all([fetchBuses(), fetchBookings(), fetchConductors()])`
);

// Update Conductor rendering logic in the map
code = code.replace(
  /const assignedBus = buses\.find\(b => b\.busCode === c\.busCode\);/g,
  `const assignedBus = buses.find(b => b.busCode === c.assigned_bus || b.busNumber === c.assigned_bus);`
);

// Update phone to email in the map
code = code.replace(
  /<div className="flex justify-between items-center bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-\[9px\] font-mono text-slate-400">[\s\S]*?<\/div>/,
  (match) => {
    return `<div className="flex justify-between items-center bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-[9px] font-mono text-slate-400">
                                <span>Email: {c.email || 'N/A'}</span>
                                <span className="text-[#FF9933]">{c.employee_id || 'N/A'}</span>
                              </div>`
  }
);

fs.writeFileSync(file, code);
