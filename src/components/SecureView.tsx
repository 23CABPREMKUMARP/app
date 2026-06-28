"use client";

import React, { useEffect } from "react";
import { PrivacyScreen } from "@capacitor-community/privacy-screen";
import { Capacitor } from "@capacitor/core";

export default function SecureView({ children }: { children: React.ReactNode }) {
  // Screenshot protection has been disabled per user request
  return <>{children}</>;
}
