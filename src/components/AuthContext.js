import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../utils/supabase';

const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) fetchProfile(session.user.id);
      else setLoading(false);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) await fetchProfile(session.user.id);
      else { setProfile(null); setLoading(false); }
    });
    return () => subscription.unsubscribe();
  }, []);

  async function fetchProfile(userId) {
    const { data } = await supabase.from('profiles').select('*').eq('id', userId).single();
    setProfile(data);
    setLoading(false);
  }

  async function signUp({ email, password, fullName, org, expertise }) {
    const { data, error } = await supabase.auth.signUp({ email, password, options: { data: { full_name: fullName } } });
    if (error) return { error };
    if (data.user) {
      await supabase.from('profiles').update({ full_name: fullName, org: org, title: expertise, avatar_initials: fullName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) }).eq('id', data.user.id);
    }
    return { data };
  }

  async function signIn({ email, password }) {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    return { data, error };
  }

  async function signOut() {
    await supabase.auth.signOut();
    setUser(null);
    setProfile(null);
  }

  async function updateProfile(updates) {
    if (!user) return { error: 'Not logged in' };
    const { data, error } = await supabase.from('profiles').update(updates).eq('id', user.id).select().single();
    if (data) setProfile(data);
    return { data, error };
  }

  return (
    <AuthContext.Provider value={{ user, profile, loading, signUp, signIn, signOut, updateProfile, fetchProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
