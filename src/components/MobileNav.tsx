"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Home, MapPin, Ticket, BookOpen, QrCode } from "lucide-react";
import { cn } from "@/src/lib/utils";

const navItems = [
  { label: "Home", icon: Home, href: "/" },
  { label: "Track", icon: MapPin, href: "/live-map" },
  { label: "Scan", icon: QrCode, href: "/scan", isCenter: true },
  { label: "Pass", icon: Ticket, href: "/get-ticket" },
  { label: "Trips", icon: BookOpen, href: "/my-bookings" },
];

export function MobileNav() {
  const pathname = usePathname();

  if (pathname.startsWith("/admin")) return null;

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-[100] bg-white/80 premium-blur border-t border-zinc-100 px-2 pb-[env(safe-area-inset-bottom,16px)] pt-2 shadow-[0_-8px_32px_rgba(0,0,0,0.08)]">
      <nav className="flex items-end justify-between h-14 relative">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          if (item.isCenter) {
            return (
              <Link
                key={item.href}
                href={item.href}
                className="relative -top-6 flex flex-col items-center justify-center w-20"
              >
                <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center shadow-[0_8px_20px_rgba(0,0,0,0.3)] border-4 border-white active:scale-95 transition-transform duration-200">
                  <Icon size={28} className="text-white" strokeWidth={2.5} />
                </div>
                <span className="text-[10px] font-black text-black uppercase tracking-tighter mt-1">
                  {item.label}
                </span>
              </Link>
            );
          }

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "relative flex flex-col items-center justify-center flex-1 h-full transition-all duration-300 pb-1",
                isActive ? "text-orange-600" : "text-zinc-400"
              )}
            >
              <div className={cn(
                "p-2 rounded-2xl transition-all duration-300 relative",
                isActive ? "bg-orange-50" : "active:scale-90"
              )}>
                <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
              </div>
              <span className={cn(
                "text-[9px] font-black uppercase tracking-tighter mt-0.5 transition-all",
                isActive ? "opacity-100" : "opacity-60"
              )}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
