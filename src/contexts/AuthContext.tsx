
import { createContext, useContext, useEffect, useState } from "react";
import { Session, User } from '@supabase/supabase-js';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

// Define user roles - adding 'admin' to the type
export type UserRole = 'participant' | 'organizer' | 'admin';

type AuthContextType = {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  userRole: UserRole | null;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signUp: (email: string, password: string, userData: any) => Promise<{ error: any, user: User | null }>;
  signOut: () => Promise<{ error: any }>;
  resetPassword: (email: string) => Promise<{ error: any }>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Admin email list - add the specific admin email here
const ADMIN_EMAILS = ['pisillo@gmail.com'];

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const { toast } = useToast();

  // Function to fetch user role
  const fetchUserRole = async (userId: string, email: string) => {
    try {
      // Check if the user is an admin based on their email
      if (ADMIN_EMAILS.includes(email.toLowerCase())) {
        setUserRole('admin');
        console.log('Admin role assigned to:', email);
        return;
      }
      
      // Fetch user role from database
      const { data, error } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', userId)
        .single();
      
      if (error) {
        if (error.code === 'PGRST116') {
          // No role found, default to participant
          console.log('No role found, defaulting to participant');
          setUserRole('participant');
          
          // Insert default role
          const { error: insertError } = await supabase
            .from('user_roles')
            .insert({ user_id: userId, role: 'participant' });
            
          if (insertError) {
            console.error('Error inserting default role:', insertError);
          }
        } else {
          console.error('Error fetching user role:', error);
          setUserRole('participant'); // Default fallback
        }
        return;
      }
      
      if (data) {
        setUserRole(data.role as UserRole);
        console.log('User role set from database:', data.role);
      } else {
        // Default to participant if no role found
        setUserRole('participant');
        console.log('No role data, defaulting to participant');
      }
    } catch (err) {
      console.error('Error in fetchUserRole:', err);
      setUserRole('participant'); // Default fallback
    }
  };

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, currentSession) => {
        setSession(currentSession);
        setUser(currentSession?.user ?? null);
        setIsLoading(false);

        // Fetch role when user changes
        if (currentSession?.user) {
          fetchUserRole(currentSession.user.id, currentSession.user.email || '');
        } else {
          setUserRole(null);
        }

        if (event === 'SIGNED_IN') {
          toast({
            title: "Signed in",
            description: "You have successfully signed in.",
          });
        }
        
        if (event === 'SIGNED_OUT') {
          toast({
            title: "Signed out",
            description: "You have been signed out.",
          });
        }

        // Log auth events for debugging
        console.log('Auth event:', event, currentSession?.user?.email || 'No user');
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      setSession(currentSession);
      setUser(currentSession?.user ?? null);
      
      // Fetch role for existing session
      if (currentSession?.user) {
        fetchUserRole(currentSession.user.id, currentSession.user.email || '');
      }
      
      setIsLoading(false);
      
      // Log session status for debugging
      if (currentSession) {
        console.log('Existing session found:', currentSession.user.email);
      } else {
        console.log('No existing session found');
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [toast]);

  const signIn = async (email: string, password: string) => {
    try {
      console.log(`Attempting to sign in: ${email}`);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        console.error('Sign in error:', error.message);
      } else {
        console.log('Sign in successful:', data.user?.email);
      }
      
      return { error };
    } catch (err) {
      console.error('Unexpected sign in error:', err);
      return { error: err };
    }
  };

  const signUp = async (email: string, password: string, userData: any) => {
    try {
      console.log(`Attempting to sign up: ${email}`);
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: userData,
          emailRedirectTo: window.location.origin + '/login',
        }
      });
      
      if (error) {
        console.error('Sign up error:', error.message);
      } else if (data.user) {
        console.log('Sign up successful:', data.user.email);
        // Check if email confirmation is enabled
        if (data.session === null) {
          toast({
            title: "Verification email sent",
            description: "Please check your email to confirm your account.",
          });
        }
      }
      
      return { error, user: data.user };
    } catch (err) {
      console.error('Unexpected sign up error:', err);
      return { error: err, user: null };
    }
  };

  const signOut = async () => {
    console.log('Attempting to sign out');
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Sign out error:', error.message);
    } else {
      console.log('Sign out successful');
    }
    return { error };
  };

  const resetPassword = async (email: string) => {
    try {
      console.log(`Attempting to send password reset email to: ${email}`);
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: window.location.origin + '/reset-password',
      });
      
      if (error) {
        console.error('Reset password error:', error.message);
      } else {
        console.log('Reset password email sent successfully');
      }
      
      return { error };
    } catch (err) {
      console.error('Unexpected reset password error:', err);
      return { error: err };
    }
  };

  const value = {
    user,
    session,
    isLoading,
    userRole,
    signIn,
    signUp,
    signOut,
    resetPassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
