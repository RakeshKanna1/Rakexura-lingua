"use client";

import { useState } from "react";

export interface DevicePerformance {
  isLowEnd: boolean;
  hardwareConcurrency: number;
  deviceMemory: number | null;
}

export function useDevicePerformance(): DevicePerformance {
  const [perf] = useState<DevicePerformance>(() => {
    if (typeof window === "undefined") {
      return { isLowEnd: false, hardwareConcurrency: 4, deviceMemory: null };
    }
    const concurrency = navigator.hardwareConcurrency || 4;
    const memory = (navigator as unknown as { deviceMemory?: number }).deviceMemory || null;
    const isLow = concurrency < 4 || (memory !== null && memory < 4);
    return {
      isLowEnd: isLow,
      hardwareConcurrency: concurrency,
      deviceMemory: memory,
    };
  });

  return perf;
}
