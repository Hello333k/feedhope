import { supabase } from "@/integrations/supabase/client";

// google oauth sign in
export const signInWithGoogle = async () => {
  const redirectUrl = `${window.location.origin}/`;
  
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: redirectUrl,
    },
  });

  return { data, error };
};

export const signInWithEmail = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  return { data, error };
};

export const signUpWithEmail = async (email: string, password: string, fullName: string) => {
  const redirectUrl = `${window.location.origin}/`;
  
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: redirectUrl,
      data: {
        full_name: fullName,
      },
    },
  });

  return { data, error };
};

export const signOut = async () => {
  try {
    // Check if there's an active session first
    const { data: { session } } = await supabase.auth.getSession();
    
    // If no session exists, just clear local storage and return success
    if (!session) {
      console.log("No active session, clearing local state");
      clearLocalAuthState();
      return { error: null };
    }
    
    const { error } = await supabase.auth.signOut({ scope: 'local' });
    
    // Even if there's an error, clear local state
    clearLocalAuthState();
    
    if (error) {
      // If it's a session missing error, treat it as success since user is effectively logged out
      if (error.message?.includes('session') || error.name === 'AuthSessionMissingError') {
        console.log("Session already expired, user logged out");
        return { error: null };
      }
      console.error("Supabase sign out error:", error);
      return { error };
    }
    
    return { error: null };
  } catch (err) {
    // Clear local state even on unexpected errors
    clearLocalAuthState();
    console.error("Unexpected sign out error:", err);
    
    // If the error is about missing session, treat as success
    if (err instanceof Error && err.message?.includes('session')) {
      return { error: null };
    }
    
    return { 
      error: err instanceof Error ? err : new Error("Failed to sign out") 
    };
  }
};

// Helper to clear all local auth state
const clearLocalAuthState = () => {
  // Clear Supabase auth tokens from localStorage
  const keysToRemove = Object.keys(localStorage).filter(key => 
    key.startsWith('sb-') || key.includes('supabase')
  );
  keysToRemove.forEach(key => localStorage.removeItem(key));
};

// get current logged in user
export const getCurrentUser = async () => {
  const { data: { user }, error } = await supabase.auth.getUser();
  return { user, error };
};

export const getCurrentSession = async () => {
  const { data: { session }, error } = await supabase.auth.getSession();
  return { session, error };
};
