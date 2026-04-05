import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "JeffBen Systems | Metropolitan Transit Intelligence",
  description: "Pioneering industrial-grade automation and real-time telemetry for metropolitan public transit ecosystems across Tamil Nadu.",
  keywords: ["Transit Intelligence", "Public Transport Automation", "Jeffben Systems", "Bus Tracking", "Urban Mobility Solutions", "Tamil Nadu Transit"],
  metadataBase: new URL('https://jeffben.org'),
  openGraph: {
    title: "JeffBen Systems - Future of Automated Mobility",
    description: "Official platform for advanced transit telemetry and smart city infrastructure integration.",
    images: ['/hero-logo.png'],
    type: 'website',
  },
  icons: {
    icon: '/logo2.png',
    apple: '/logo2.png',
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${jakarta.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
