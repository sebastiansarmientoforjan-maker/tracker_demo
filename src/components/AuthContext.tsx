"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import type { User } from "firebase/auth";
import type { Firestore } from "firebase/firestore";
import type { ScheduledActivity } from "../types";

interface AuthContextProps {
  user: User | null;
  loading: boolean;
  message: string;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
  classes: string[];
  classDetails: Record<string, any>;
  classColors: Record<string, string>;
  scheduledActivities: ScheduledActivity[];
  setScheduledActivities: React.Dispatch<React.SetStateAction<ScheduledActivity[]>>;
  db: Firestore | null;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

// Proveedor de autenticación simplificado.
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [scheduledActivities, setScheduledActivities] = useState<ScheduledActivity[]>([]);

  // Clases de ejemplo.
  const classes = ["class-1", "class-2"];
  const classDetails: Record<string, any> = {
    "class-1": { name: "Class 1" },
    "class-2": { name: "Class 2" },
  };
  const classColors: Record<string, string> = {
    "class-1": "#ff9999",
    "class-2": "#99ccff",
  };

  const db: Firestore | null = null;

  const signIn = async () => {
    setUser({} as User);
  };
  const signOut = async () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        message,
        setMessage,
        signIn,
        signOut,
        classes,
        classDetails,
        classColors,
        scheduledActivities,
        setScheduledActivities,
        db,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
