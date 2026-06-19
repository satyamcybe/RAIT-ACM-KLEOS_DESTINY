// ===========================================
// PRAMAAN - useIdentity Hook
// Client-side identity verification state
// ===========================================

"use client";

import { useState, useCallback } from "react";
import type { IdentityVerification } from "../types/identity";

interface UseIdentityState {
  verification: IdentityVerification | null;
  isLoading: boolean;
  error: string | null;
}

export function useIdentity() {
  const [state, setState] = useState<UseIdentityState>({
    verification: null,
    isLoading: false,
    error: null,
  });

  /** Fetch current verification status */
  const fetchVerification = useCallback(async () => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));
    try {
      // TODO: Call API route
      const res = await fetch("/api/identity/profile");
      const data = await res.json();
      if (data.success) {
        setState({ verification: data.data, isLoading: false, error: null });
      } else {
        setState({ verification: null, isLoading: false, error: data.error });
      }
    } catch (err) {
      setState({
        verification: null,
        isLoading: false,
        error: err instanceof Error ? err.message : "Failed to fetch verification",
      });
    }
  }, []);

  /** Initiate DigiLocker verification */
  const initiateDigiLocker = useCallback(async () => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));
    try {
      const res = await fetch("/api/identity/digilocker", { method: "POST" });
      const data = await res.json();
      // TODO: Handle redirect to DigiLocker
      return data;
    } catch (err) {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: err instanceof Error ? err.message : "Failed to initiate DigiLocker",
      }));
      return null;
    }
  }, []);

  /** Verify eShram card */
  const verifyEshram = useCallback(async (uan: string) => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));
    try {
      const res = await fetch("/api/identity/eshram", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ uan }),
      });
      const data = await res.json();
      if (data.success) {
        await fetchVerification();
      }
      return data;
    } catch (err) {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: err instanceof Error ? err.message : "Failed to verify eShram",
      }));
      return null;
    }
  }, [fetchVerification]);

  return {
    ...state,
    fetchVerification,
    initiateDigiLocker,
    verifyEshram,
  };
}
