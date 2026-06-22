import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { supabase, T } from '../lib/supabase'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  // 프로필(역할 포함) 조회 — 없으면 기본 수강생으로 생성
  const loadProfile = useCallback(async (u) => {
    if (!u) { setProfile(null); return }
    const { data } = await supabase.from(T.profiles).select('*').eq('id', u.id).maybeSingle()
    if (data) { setProfile(data); return }
    const seed = {
      id: u.id,
      email: u.email,
      name: u.user_metadata?.name || u.user_metadata?.full_name || u.email?.split('@')[0] || '회원',
      avatar_url: u.user_metadata?.avatar_url || null,
      role: 'student',
    }
    const { data: created } = await supabase.from(T.profiles).upsert(seed).select().maybeSingle()
    setProfile(created || seed)
  }, [])

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      const u = data.session?.user ?? null
      setUser(u)
      loadProfile(u).finally(() => setLoading(false))
    })
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      const u = session?.user ?? null
      setUser(u)
      loadProfile(u)
    })
    return () => sub.subscription.unsubscribe()
  }, [loadProfile])

  const signInWith = useCallback(async (provider) => {
    await supabase.auth.signInWithOAuth({
      provider,
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    })
  }, [])

  const signOut = useCallback(async () => {
    await supabase.auth.signOut()
    setUser(null); setProfile(null)
  }, [])

  const value = {
    user, profile, loading,
    role: profile?.role || 'guest',
    isAdmin: profile?.role === 'admin',
    isInstructor: profile?.role === 'instructor' || profile?.role === 'admin',
    signInWith, signOut,
    refreshProfile: () => loadProfile(user),
  }
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
