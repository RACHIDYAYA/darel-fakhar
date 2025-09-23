import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { supabase } from '@/lib/supabase';
import type { Session, User } from '@supabase/supabase-js';

export type Role = 'admin' | 'user' | 'editor' | 'manager';

type AuthContextType = {
  user: User | null;
  session: Session | null;
  role: Role;
  loading: boolean;
  signIn: (params: { email: string; password: string }) => Promise<{ error?: string }>;
  signUp: (params: { email: string; password: string; role?: Role }) => Promise<{ error?: string }>;
  signOut: () => Promise<void>;
  hasRole: (allowed: Role[] | Role) => boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const computeRole = useCallback((u: User | null): Role => {
    const fromMeta = (u?.user_metadata as any)?.role || (u as any)?.app_metadata?.role;
    if (fromMeta === 'admin' || fromMeta === 'editor' || fromMeta === 'manager' || fromMeta === 'user') return fromMeta;
    return 'user';
  }, []);

  useEffect(() => {
    let isMounted = true;
    const init = async () => {
      setLoading(true);
      try {
        const { data } = await supabase.auth.getSession();
        if (!isMounted) return;
        setSession(data.session);
        setUser(data.session?.user ?? null);
      } catch (error) {
        console.warn('Auth session error:', error);
        // Clear any invalid tokens
        await supabase.auth.signOut();
        if (!isMounted) return;
        setSession(null);
        setUser(null);
      }
      setLoading(false);
    };
    init();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
      setUser(newSession?.user ?? null);
    });

    return () => {
      isMounted = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  const signIn: AuthContextType['signIn'] = useCallback(async ({ email, password }) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return { error: error.message };
    return {};
  }, []);

  const signUp: AuthContextType['signUp'] = useCallback(async ({ email, password }) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { role: 'user' } },
    });
    if (error) return { error: error.message };
    return {};
  }, []);

  const signOut = useCallback(async () => {
    await supabase.auth.signOut();
  }, []);

  const role: Role = useMemo(() => computeRole(user), [user, computeRole]);

  const hasRole = useCallback<AuthContextType['hasRole']>((allowed) => {
    const allowedArr = Array.isArray(allowed) ? allowed : [allowed];
    return allowedArr.includes(role);
  }, [role]);

  const value = useMemo<AuthContextType>(() => ({ user, session, role, loading, signIn, signUp, signOut, hasRole }), [user, session, role, loading, signIn, signUp, signOut, hasRole]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
