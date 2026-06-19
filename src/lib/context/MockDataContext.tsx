"use client";

import React, { createContext, useContext, useState } from "react";

interface UserProfile {
  name: string;
  aadhaar: string;
  dob: string;
  occupation: string;
}

interface Credential {
  id: string;
  type: string;
  issuer: string;
  date: string;
}

interface MockDataContextType {
  user: UserProfile;
  setUser: (user: UserProfile) => void;
  identityVerified: boolean;
  setIdentityVerified: (val: boolean) => void;
  bankLinked: boolean;
  setBankLinked: (val: boolean) => void;
  credentials: Credential[];
  setCredentials: (creds: Credential[]) => void;
}

const defaultUser: UserProfile = {
  name: "Raju Kumar",
  aadhaar: "XXXX-XXXX-1234",
  dob: "15 Aug 1992",
  occupation: "Delivery Partner"
};

const MockDataContext = createContext<MockDataContextType | undefined>(undefined);

export function MockDataProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile>(defaultUser);
  const [identityVerified, setIdentityVerified] = useState(false);
  const [bankLinked, setBankLinked] = useState(false);
  const [credentials, setCredentials] = useState<Credential[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage and API on mount
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("pranam_mock_user");
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch (e) {}
      }
      
      const localIdVerified = localStorage.getItem("pranam_identity_verified") === "true";
      const localBankLinked = localStorage.getItem("pranam_bank_linked") === "true";
      
      setIdentityVerified(localIdVerified);
      setBankLinked(localBankLinked);
      setIsLoaded(true);

      // Sync with DB status
      fetch("/api/identity/profile")
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            if (data.identityVerified) {
              setIdentityVerified(true);
              localStorage.setItem("pranam_identity_verified", "true");
            }
            if (data.bankLinked) {
              setBankLinked(true);
              localStorage.setItem("pranam_bank_linked", "true");
            }
            if (data.name) {
              setUser(prev => {
                const nextUser = { ...prev, name: data.name, dob: data.dob || prev.dob };
                localStorage.setItem("pranam_mock_user", JSON.stringify(nextUser));
                return nextUser;
              });
            }
          }
        })
        .catch(err => console.error("Failed to sync status with DB", err));
    }
  }, []);

  // Save to localStorage when state changes
  React.useEffect(() => {
    if (isLoaded && typeof window !== "undefined") {
      localStorage.setItem("pranam_mock_user", JSON.stringify(user));
    }
  }, [user, isLoaded]);

  React.useEffect(() => {
    if (isLoaded && typeof window !== "undefined") {
      localStorage.setItem("pranam_identity_verified", String(identityVerified));
    }
  }, [identityVerified, isLoaded]);

  React.useEffect(() => {
    if (isLoaded && typeof window !== "undefined") {
      localStorage.setItem("pranam_bank_linked", String(bankLinked));
    }
  }, [bankLinked, isLoaded]);

  // Automatically issue credentials when verifications are complete
  React.useEffect(() => {
    const newCreds: Credential[] = [];
    if (identityVerified) {
      newCreds.push({
        id: "vc-id-1001",
        type: "Identity Credential",
        issuer: "DigiLocker Authority",
        date: new Date().toISOString().split('T')[0]
      });
    }
    if (bankLinked) {
      newCreds.push({
        id: "vc-fin-2002",
        type: "Financial Score Credential",
        issuer: "Pramaan Trust Infrastructure",
        date: new Date().toISOString().split('T')[0]
      });
    }
    setCredentials(newCreds);
  }, [identityVerified, bankLinked]);

  return (
    <MockDataContext.Provider
      value={{
        user,
        setUser,
        identityVerified,
        setIdentityVerified,
        bankLinked,
        setBankLinked,
        credentials,
        setCredentials
      }}
    >
      {children}
    </MockDataContext.Provider>
  );
}

export function useMockData() {
  const context = useContext(MockDataContext);
  if (context === undefined) {
    throw new Error("useMockData must be used within a MockDataProvider");
  }
  return context;
}
