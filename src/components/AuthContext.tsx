"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import type { User } from "firebase/auth";
import type { Firestore } from "firebase/firestore";
import type { ScheduledActivity } from "../types";

// Define the shape of the context. In a real implementation you would
// populate these values from Firebase; here we stub them for illustration.
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

/**
 * Simplified AuthProvider that stubs out user authentication and Firestore.
 * Replace these placeholders with real implementations when integrating
 * Firebase into your project.
 */
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [scheduledActivities, setScheduledActivities] = useState<ScheduledActivity[]>([]);

  // Dummy classes and details for demonstration
  const classes = ["class-1", "class-2"];
  const classDetails: Record<string, any> = {
    "class-1": { name: "Class 1" },
    "class-2": { name: "Class 2" },
  };
  const classColors: Record<string, string> = {
    "class-1": "#ff9999",
    "class-2": "#99ccff",
  };

  // Placeholder Firestore instance (null for now)
  const db: Firestore | null = null;

  const signIn = async () => {
    // Implement sign-in logic with Firebase here
    setUser({} as User);
  };
  const signOut = async () => {
    // Implement sign-out logic with Firebase here
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