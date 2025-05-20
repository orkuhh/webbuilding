import React, { createContext, useContext, useEffect, useState } from 'react';
import { useConvexAuth, useMutation, useQuery } from 'convex/react';
import { ConvexReactClient } from 'convex/react'; // Needed for auth methods
import { api } from '../../convex/_generated/api'; // Adjusted path

const AuthContext = createContext({});

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }) {
  const { isLoading, isAuthenticated } = useConvexAuth();
  // IMPORTANT: This is a simplification for client instance. 
  // In a real app, manage this instance (initialized in main.jsx) more robustly.
  const convexClient = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL);

  const convexUser = useQuery(api.auth.getUserByAuthId, isAuthenticated ? {} : "skip");
  const createUserMutation = useMutation(api.auth.createUser);

  const [customError, setCustomError] = useState(null); // For custom error messages

  // Combine Convex auth state with your DB user profile
  const user = isAuthenticated && convexUser ? { ...convexUser, ...isAuthenticated } : null;
  
  // Placeholder for email/password sign-in (not directly supported by Convex without third-party)
  async function signIn({ email, password }) { 
    setCustomError("Email/Password sign-in is not directly supported with Convex. Please use OAuth providers.");
    return { error: "Email/Password sign-in not supported." };
  }

  // Helper for OAuth providers
  async function signInWithProvider(provider) {
    try {
      setCustomError(null);
      // The actual sign-in redirect is handled by Convex
      // The promise resolves after the redirect is initiated or if there's an immediate error.
      await convexClient.auth.signIn(provider, {
        // redirectUrl: window.location.href, // Or a specific callback URL
      });
      // Note: After successful OAuth, the `useEffect` for `attemptCreateUser`
      // will handle creating the user profile if it's their first time.
      return { error: null };
    } catch (e) {
      console.error(`Error signing in with ${provider}:`, e);
      setCustomError(e.message);
      return { error: e.message };
    }
  }

  async function signInWithDiscord() {
    return signInWithProvider("discord");
  }

  async function signInWithGoogle() {
    return signInWithProvider("google");
  }
  
  // SignUp is effectively handled by the first OAuth login and the attemptCreateUser effect.
  async function signUp({ email, password, username }) {
    setCustomError("Direct sign-up is not supported with Convex. Please use OAuth (e.g., Google, Discord). Your account will be created on your first login.");
    return { error: "Direct sign-up not supported." };
  }

  async function signOut() {
    try {
      setCustomError(null);
      await convexClient.auth.signOut();
      // isLoading and isAuthenticated will update reactively from useConvexAuth
      return { error: null };
    } catch (e) {
      console.error("Error signing out:", e);
      setCustomError(e.message);
      return { error: e.message };
    }
  }

  // Effect for creating user profile on first OAuth login
  useEffect(() => {
    const attemptCreateUser = async () => {
      if (isAuthenticated && !convexUser && !isLoading) {
        const identity = await convexClient.auth.getUserIdentity();
        if (identity && identity.email) {
          try {
            // Check again to prevent race conditions if possible
            const existing = await convexClient.query(api.auth.getUserByAuthId).get();
            if (!existing) {
              await createUserMutation({
                email: identity.email,
                username: identity.name || identity.email.split('@')[0], // Use name or part of email
              });
            }
          } catch (err) {
            console.error("Failed to create user profile:", err);
            setCustomError("Failed to create user profile. Please try again or contact support.");
          }
        } else if (identity && !isLoading) {
          console.warn("User is authenticated but necessary identity information (email/name) for profile creation is missing.");
          setCustomError("Additional profile information needed. Please complete your profile.");
        }
      }
    };
    attemptCreateUser();
  }, [isAuthenticated, convexUser, isLoading, createUserMutation, convexClient]);


  const value = {
    user,
    isLoading, // from useConvexAuth
    isAuthenticated, // from useConvexAuth
    error: customError, // custom errors
    signIn,
    signInWithDiscord,
    signInWithGoogle,
    signUp,
    signOut,
  };

  return (
    <AuthContext.Provider value={value}>
      {/* Render children regardless of loading state initially, 
          App can decide what to show based on isLoading and isAuthenticated */}
      {children}
    </AuthContext.Provider>
  );
}