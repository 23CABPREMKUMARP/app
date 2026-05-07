import { SignIn } from "@clerk/nextjs";
import Image from "next/image";

export default function Page() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white p-4">
      {/* Centered Logo */}
      <div className="mb-10 animate-fade-in">
        <Image 
          src="/logo2.png" 
          alt="Jeff Ben Logo" 
          width={240} 
          height={80} 
          className="object-contain"
          priority
        />
      </div>
      
      <div className="w-full max-w-md">
        <SignIn 
          appearance={{
            elements: {
              formButtonPrimary: "bg-orange-600 hover:bg-orange-700 text-sm normal-case py-3 rounded-xl",
              card: "shadow-none border-none bg-transparent",
              headerTitle: "text-2xl font-bold text-zinc-900",
              headerSubtitle: "text-zinc-500",
              socialButtonsBlockButton: "bg-white border border-zinc-200 text-zinc-900 hover:bg-zinc-50 rounded-xl",
              formFieldLabel: "text-zinc-700 font-medium",
              formFieldInput: "bg-zinc-50 border-zinc-200 text-zinc-900 focus:ring-orange-500 rounded-xl h-12",
              footerActionLink: "text-orange-600 hover:text-orange-500 font-bold",
              dividerLine: "bg-zinc-100",
              dividerText: "text-zinc-400",
              identityPreviewText: "text-zinc-900",
              identityPreviewEditButtonIcon: "text-orange-600",
              footer: "hidden" // Hiding Clerk branding for a cleaner look if possible
            }
          }}
        />
      </div>
      
      <p className="mt-8 text-zinc-400 text-xs font-medium uppercase tracking-widest">
        JeffBen Systems | Transit Intelligence Ecosystem
      </p>
    </div>
  );
}
