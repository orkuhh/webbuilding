import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth, supabase } from '../lib/supabase';

const AuthContext = createContext({});

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check for existing session
    checkUser();

    // Subscribe to auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session?.user) {
        setUser(session.user);
        // Refresh session if it's about to expire
        const expiresAt = session.expires_at * 1000; // Convert to milliseconds
        const timeUntilExpiry = expiresAt - Date.now();
        if (timeUntilExpiry < 600000) { // Less than 10 minutes until expiry
          const { error } = await auth.refreshSession();
          if (error) {
            console.error('Failed to refresh session:', error);
          }
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => {
      if (subscription) subscription.unsubscribe();
    };
  }, []);

  async function checkUser() {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setUser(session.user);
        // Refresh session if it's about to expire
        const expiresAt = session.expires_at * 1000; // Convert to milliseconds
        const timeUntilExpiry = expiresAt - Date.now();
        if (timeUntilExpiry < 600000) { // Less than 10 minutes until expiry
          const { error } = await auth.refreshSession();
          if (error) {
            console.error('Failed to refresh session:', error);
          }
        }
      }
      setError(null);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  async function signIn({ email, password }) {
    try {
      setLoading(true);
      const { data, error } = await auth.signIn({ email, password });
      if (error) throw error;
      if (data?.session) {
        setUser(data.session.user);
      }
      return { error: null };
    } catch (e) {
      setError(e.message);
      return { error: e.message };
    } finally {
      setLoading(false);
    }
  }

  async function signInWithDiscord() {
    try {
      setLoading(true);
      const { error } = await auth.signInWithDiscord();
      if (error) throw error;
      return { error: null };
    } catch (e) {
      setError(e.message);
      return { error: e.message };
    } finally {
      setLoading(false);
    }
  }

  async function signInWithGoogle() {
    try {
      setLoading(true);
      const { error } = await auth.signInWithGoogle();
      if (error) throw error;
      return { error: null };
    } catch (e) {
      setError(e.message);
      return { error: e.message };
    } finally {
      setLoading(false);
    }
  }

  async function signUp({ email, password, username }) {
    try {
      setLoading(true);
      const { error } = await auth.signUp({ email, password, username });
      if (error) throw error;
      await checkUser();
      return { error: null };
    } catch (e) {
      setError(e.message);
      return { error: e.message };
    } finally {
      setLoading(false);
    }
  }

  async function signOut() {
    try {
      setLoading(true);
      const { error } = await auth.signOut();
      if (error) throw error;
      setUser(null);
      return { error: null };
    } catch (e) {
      setError(e.message);
      return { error: e.message };
    } finally {
      setLoading(false);
    }
  }

  const value = {
    user,
    loading,
    error,
    signIn,
    signInWithDiscord,
    signInWithGoogle,
    signUp,
    signOut,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
} 