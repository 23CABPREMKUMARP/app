const fs = require('fs');
const file = 'app/conductor/page.tsx';
let code = fs.readFileSync(file, 'utf8');

// 1. Add Clerk import
code = code.replace(
  /import Image from "next\/image";/,
  `import Image from "next/image";\nimport { useUser, useClerk } from "@clerk/nextjs";\nimport { useRouter } from "next/navigation";`
);

// 2. Modify State and replace useEffect
code = code.replace(
  /\/\/ Navigation & Auth States[\s\S]*?const \[error, setError\] = useState\(""\);/,
  `// Clerk Auth & Assignment States
  const { isLoaded, isSignedIn, user } = useUser();
  const { signOut } = useClerk();
  const router = useRouter();
  const [isCheckingAssignment, setIsCheckingAssignment] = useState(true);
  const [isAssigned, setIsAssigned] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Controls portal visibility
  
  const [employeeId, setEmployeeId] = useState("");
  const [assignedRouteName, setAssignedRouteName] = useState("");
  const [error, setError] = useState("");`
);

// 3. Replace all the localstorage useEffects with Clerk Check
code = code.replace(
  /\/\/ Restore session from localStorage on mount[\s\S]*?playBeep\(true\);\n  \};/m,
  `// Check Clerk User Assignment
  useEffect(() => {
    if (isLoaded) {
      if (!isSignedIn) {
        router.push("/sign-in?redirect_url=/conductor");
      } else if (user?.primaryEmailAddress?.emailAddress) {
        fetch(\`/api/conductor/check-assignment?email=\${encodeURIComponent(user.primaryEmailAddress.emailAddress)}\`)
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

  const handleLogout = () => {
    signOut(() => router.push("/"));
  };`
);

// Remove handleBiometricSuccess & handleLogin definitions
code = code.replace(/const handleLogin =[\s\S]*?playBeep\(true\);\n  \};/, '');

// Replace the Authentication UI Module completely
const authRegex = /\{\/\* 1\. AUTHENTICATION MODULE \*\/\}.*?\{\/\* 2\. CORE LAYOUT DESIGN \(IF AUTHENTICATED\) \*\/\}/s;
code = code.replace(
  authRegex,
  `{/* 1. AUTHENTICATION MODULE (CLERK REPLACEMENT) */}
      <AnimatePresence>
        {!isAuthenticated && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1000] bg-zinc-950 flex flex-col items-center justify-center p-6 text-zinc-200 overflow-y-auto"
          >
            <div className="text-center space-y-4 max-w-md w-full p-8 border border-zinc-800 rounded-3xl bg-zinc-900 shadow-2xl relative">
              <div className="absolute top-0 left-0 w-80 h-80 bg-orange-600/10 rounded-full blur-[100px] pointer-events-none" />
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-3xl flex items-center justify-center mx-auto shadow-lg shadow-orange-600/30">
                <ShieldCheck className="text-white" size={32} />
              </div>
              <h1 className="text-2xl font-black uppercase tracking-tight text-white">Transit Console</h1>
              
              {!isLoaded || isCheckingAssignment ? (
                <div className="space-y-2 pt-4">
                  <RefreshCw className="animate-spin mx-auto text-orange-500" size={24} />
                  <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Verifying Clearance...</p>
                </div>
              ) : !isSignedIn ? (
                <div className="space-y-4 pt-4">
                  <p className="text-xs font-bold text-red-400 uppercase tracking-widest">Authentication Required</p>
                  <button onClick={() => router.push("/sign-in?redirect_url=/conductor")} className="w-full py-3 bg-orange-600 hover:bg-orange-700 text-white font-black rounded-xl uppercase tracking-widest text-[10px]">
                    Sign In to Continue
                  </button>
                </div>
              ) : !isAssigned ? (
                <div className="space-y-4 pt-4">
                  <p className="text-sm font-bold text-red-500">ACCESS DENIED</p>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    Your email <b>{user?.primaryEmailAddress?.emailAddress}</b> is not assigned to any conductor role. 
                    Please contact the Operations Admin for clearance.
                  </p>
                  <div className="pt-4 space-y-3">
                    <button onClick={() => router.push("/")} className="w-full py-3 bg-zinc-800 hover:bg-zinc-700 text-white font-bold rounded-xl text-xs uppercase tracking-wider transition-all">
                      Return to Passenger Dashboard
                    </button>
                    <button onClick={() => signOut()} className="w-full py-3 bg-red-600/10 text-red-500 hover:bg-red-600/20 font-bold rounded-xl text-xs uppercase tracking-wider transition-all border border-red-500/20">
                      Sign Out
                    </button>
                  </div>
                </div>
              ) : null}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. CORE LAYOUT DESIGN (IF AUTHENTICATED) */}`
);

fs.writeFileSync(file, code);
