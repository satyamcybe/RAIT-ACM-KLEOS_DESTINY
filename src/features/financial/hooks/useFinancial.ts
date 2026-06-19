// ===========================================
// PRANAM - useFinancial Hook
// Client-side financial data state
// ===========================================

"use client";

import { useState, useCallback } from "react";
import type { FinancialData, FinancialConsent } from "../types/financial";

interface UseFinancialState {
  consent: FinancialConsent | null;
  financialData: FinancialData | null;
  isLoading: boolean;
  error: string | null;
}

export function useFinancial() {
  const [state, setState] = useState<UseFinancialState>({
    consent: null,
    financialData: null,
    isLoading: false,
    error: null,
  });

  /** Request AA consent */
  const requestConsent = useCallback(async (fiTypes: string[]) => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));
    try {
      const res = await fetch("/api/financial/consent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fiTypes }),
      });
      const data = await res.json();
      // TODO: Handle consent redirect
      return data;
    } catch (err) {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: err instanceof Error ? err.message : "Failed to request consent",
      }));
      return null;
    }
  }, []);

  /** Fetch financial data after consent */
  const fetchFinancialData = useCallback(async () => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));
    try {
      const res = await fetch("/api/financial/fetch");
      const data = await res.json();
      if (data.success) {
        setState((prev) => ({
          ...prev,
          financialData: data.data,
          isLoading: false,
          error: null,
        }));
      }
      return data;
    } catch (err) {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: err instanceof Error ? err.message : "Failed to fetch data",
      }));
      return null;
    }
  }, []);

  /** Fetch financial profile/summary */
  const fetchProfile = useCallback(async () => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));
    try {
      const res = await fetch("/api/financial/profile");
      const data = await res.json();
      return data;
    } catch (err) {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: err instanceof Error ? err.message : "Failed to fetch profile",
      }));
      return null;
    }
  }, []);

  return {
    ...state,
    requestConsent,
    fetchFinancialData,
    fetchProfile,
  };
}
