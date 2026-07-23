"use client";

import { ReactLenis } from "lenis/react";
import React from "react";

export const SmoothScrollProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ReactLenis root options={{ lerp: 0.15, duration: 0.8, smoothWheel: true }}>
      {children}
    </ReactLenis>
  );
};
