import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Public routes that don't require authentication
const isPublicRoute = createRouteMatcher([
  "/", // Web landing page is fully public
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/api/webhooks(.*)",
  // Allow assets to load
  "/favicon.ico",
  "/manifest.json",
  "/manifest.webmanifest",
  "/logo2.png",
  "/hero-logo.png",
  "/smart-bus.png",
  "/bus-marker-3d.png",
  "/.well-known/(.*)",
  // Allow external callbacks like PhonePe if they exist
  "/api/phonepe(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  // Check if the request is coming from the installed Capacitor app
  const userAgent = req.headers.get("user-agent") || "";
  const isCapacitorApp = userAgent.includes("JeffBenMobileApp") || userAgent.includes("Capacitor");

  // Enforce authentication for non-public routes OR if the mobile app is requesting its root dashboard
  if (!isPublicRoute(req) || (isCapacitorApp && req.nextUrl.pathname === "/")) {
    const { userId, redirectToSignIn } = await auth();
    if (!userId) {
      return redirectToSignIn({ returnBackUrl: req.url });
    }
  }

  // If it's the mobile app requesting the root domain, silently rewrite to /mobile-dashboard
  if (isCapacitorApp && req.nextUrl.pathname === "/") {
    return NextResponse.rewrite(new URL("/mobile-dashboard", req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
