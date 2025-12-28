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
    const { error } = await supabase.auth.signOut({ scope: 'local' });
    
    if (error) {
      console.error("Supabase sign out error:", error);
      return { error };
    }
    
    // Ensure local storage is cleared
    localStorage.removeItem('supabase.auth.token');
    
    return { error: null };
  } catch (err) {
    console.error("Unexpected sign out error:", err);
    return { 
      error: err instanceof Error ? err : new Error("Failed to sign out") 
    };
  }
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
