"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { App, URLOpenListenerEvent } from "@capacitor/app";
import { Capacitor } from "@capacitor/core";

export function CapacitorDeepLink() {
  const router = useRouter();

  useEffect(() => {
    if (!Capacitor.isNativePlatform()) return;

    const listener = App.addListener("appUrlOpen", (event: URLOpenListenerEvent) => {
      try {
        const urlObj = new URL(event.url);
        const path = urlObj.pathname;
        const search = urlObj.search;

        if (path.startsWith("/bus/") || path.startsWith("/boarding/")) {
          const busCode = path.split("/").pop();
          router.push(`/town-bus/bus_${busCode?.toLowerCase()}/seat-selection`);
        } else if (path.startsWith("/track/")) {
          const ticketId = path.split("/").pop();
          router.push(`/live-map?ticketId=${ticketId}`);
        } else if (path.startsWith("/ticket/")) {
          const ticketId = path.split("/").pop();
          router.push(`/get-ticket?ticketId=${ticketId}`);
        } else if (path.startsWith("/profile")) {
          router.push("/profile");
        } else if (path !== "/") {
          router.push(`${path}${search}`);
        }
      } catch (err) {
        console.error("Deep link parse error:", err);
      }
    });

    return () => {
      listener.then((l) => l.remove());
    };
  }, [router]);

  return null;
}
