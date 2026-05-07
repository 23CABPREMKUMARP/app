"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Home, MapPin, Ticket, BookOpen, Settings } from "lucide-react";
import { cn } from "@/src/lib/utils";

const navItems = [
  { label: "Home", icon: Home, href: "/" },
  { label: "Track", icon: MapPin, href: "/live-map" },
  { label: "Pass", icon: Ticket, href: "/get-ticket" },
  { label: "Trips", icon: BookOpen, href: "/my-bookings" },
  { label: "Admin", icon: Settings, href: "/admin" },
];

export function MobileNav() {
  const pathname = usePathname();

  if (pathname.startsWith("/admin")) return null;

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-[100] bg-white/80 premium-blur border-t border-zinc-100 px-4 pb-[env(safe-area-inset-bottom,16px)] pt-2 shadow-[0_-8px_24px_rgba(0,0,0,0.05)]">
      <nav className="flex items-center justify-around h-14">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "relative flex flex-col items-center justify-center w-full h-full transition-all duration-300",
                isActive ? "text-orange-600" : "text-zinc-400"
              )}
            >
              <div className={cn(
                "p-2 rounded-2xl transition-all duration-300 relative",
                isActive ? "bg-orange-50 scale-110" : "active:scale-90"
              )}>
                <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
                {isActive && (
                  <motion.div
                    layoutId="bubble"
                    className="absolute inset-0 bg-orange-100/50 rounded-2xl -z-10"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </div>
              <span className={cn(
                "text-[9px] font-black uppercase tracking-tighter mt-1 transition-all",
                isActive ? "opacity-100 scale-105" : "opacity-60"
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
