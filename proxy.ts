import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher([
  '/sign-in(.*)', 
  '/sign-up(.*)',
  '/scan',
  '/manifest.webmanifest',
  '/logo2.png',
  '/hero-logo.png',
  '/favicon.ico',
  '/api/buses(.*)', // Optional: make some APIs public if needed for the app
]);

export default clerkMiddleware(async (auth, request) => {
  // Hard bypass for manifest and static assets to prevent 401s
  if (
    request.nextUrl.pathname === '/manifest.webmanifest' || 
    request.nextUrl.pathname.endsWith('.png') ||
    request.nextUrl.pathname.endsWith('.ico')
  ) {
    return;
  }

  if (!isPublicRoute(request)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files (those with a dot in the path)
    '/((?!.*\\..*|_next).*)',
    '/',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
