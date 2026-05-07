import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0a0a0a] relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-orange-500/10 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="z-10 w-full max-w-md p-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Join JeffBen</h1>
          <p className="text-gray-400">Pioneering metropolitan transit intelligence</p>
        </div>
        
        <div className="flex justify-center">
          <SignUp 
            appearance={{
              elements: {
                formButtonPrimary: "bg-orange-600 hover:bg-orange-700 text-sm normal-case",
                card: "bg-[#121212] border border-white/10 shadow-2xl",
                headerTitle: "text-white",
                headerSubtitle: "text-gray-400",
                socialButtonsBlockButton: "bg-white/5 border-white/10 text-white hover:bg-white/10",
                formFieldLabel: "text-gray-300",
                formFieldInput: "bg-white/5 border-white/10 text-white focus:ring-orange-500",
                footerActionLink: "text-orange-500 hover:text-orange-400",
                identityPreviewText: "text-white",
                identityPreviewEditButtonIcon: "text-orange-500",
                dividerLine: "bg-white/10",
                dividerText: "text-gray-500"
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}
