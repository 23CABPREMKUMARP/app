"use client";

import React from "react";
import Image from "next/image";
import { UserButton } from "@clerk/nextjs";
import { Menu, Bell, Search } from "lucide-react";
import { usePathname } from "next/navigation";

export function MobileHeader() {
  const pathname = usePathname();
  
  if (pathname.startsWith("/admin")) return null;
  
  // Hide header on map view to maximize screen space (standard for Uber/Rapido)
  if (pathname === "/live-map") return null;

  return (
    <header className="md:hidden sticky top-0 left-0 right-0 z-[60] bg-white/80 premium-blur border-b border-zinc-100 px-6 py-4 flex items-center justify-between safe-top">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-2xl bg-zinc-50 border border-zinc-100 flex items-center justify-center shadow-sm active:scale-95 transition-transform">
          <Menu size={20} className="text-zinc-600" />
        </div>
        <Image 
          src="/logo2.png" 
          alt="JeffBen" 
          width={100} 
          height={32} 
          className="object-contain h-6 w-auto"
        />
      </div>
      
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-2xl bg-zinc-50 border border-zinc-100 flex items-center justify-center shadow-sm active:scale-95 transition-transform">
          <Search size={20} className="text-zinc-600" />
        </div>
        <UserButton 
          appearance={{
            elements: {
              userButtonAvatarBox: "w-10 h-10 rounded-2xl border border-zinc-100 shadow-sm",
              userButtonTrigger: "active:scale-95 transition-transform"
            }
          }}
        />
      </div>
    </header>
  );
}
