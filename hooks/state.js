"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "@/app/utils/supabase";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [username, setUsername] = useState('')
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (data?.session?.user) {
        setCurrentUser(data.session.user);
      }
      setLoading(false);
    };

    fetchUser();

    // auth 状態変化を監視
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setCurrentUser(session.user);
      } else {
        setCurrentUser(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{ email, setEmail, password, setPassword, currentUser, setCurrentUser, username, setUsername }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

