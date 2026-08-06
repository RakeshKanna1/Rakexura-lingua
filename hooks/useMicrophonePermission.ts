"use client";

import { useState, useCallback, useEffect } from "react";

export type PermissionState = "prompt" | "granted" | "denied" | "unsupported";

export function useMicrophonePermission() {
  const [permissionState, setPermissionState] = useState<PermissionState>(() => {
    if (typeof window === "undefined" || !navigator?.mediaDevices?.getUserMedia) {
      return "unsupported";
    }
    return "prompt";
  });

  useEffect(() => {
    if (typeof window === "undefined" || !navigator?.mediaDevices?.getUserMedia) {
      return;
    }

    if (navigator.permissions && navigator.permissions.query) {
      navigator.permissions
        .query({ name: "microphone" as PermissionName })
        .then((permissionStatus) => {
          setPermissionState(permissionStatus.state as PermissionState);
          permissionStatus.onchange = () => {
            setPermissionState(permissionStatus.state as PermissionState);
          };
        })
        .catch(() => {
          // Fallback if query for microphone is not supported by browser
        });
    }
  }, []);

  const requestPermission = useCallback(async (): Promise<boolean> => {
    if (typeof window === "undefined" || !navigator?.mediaDevices?.getUserMedia) {
      setPermissionState("unsupported");
      return false;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      // Stop tracks immediately after permission check
      stream.getTracks().forEach((track) => track.stop());
      setPermissionState("granted");
      return true;
    } catch {
      setPermissionState("denied");
      return false;
    }
  }, []);

  return {
    permissionState,
    requestPermission,
  };
}
