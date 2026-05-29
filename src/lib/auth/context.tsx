'use client'

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { User } from '@supabase/supabase-js'
import type { UserProfile } from './server'

type AuthContextType = {
  user: UserProfile | null
  supabaseUser: User | null
  isLoading: boolean
  refresh: () => Promise<void>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  supabaseUser: null,
  isLoading: true,
  refresh: async () => {},
  signOut: async () => {},
})

export function AuthProvider({ children }: { children: ReactNode }) {
  const [supabaseUser, setSupabaseUser] = useState<User | null>(null)
  const [user, setUser] = useState<UserProfile | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const supabase = createClient()

  async function loadUser() {
    const { data: { user: authUser } } = await supabase.auth.getUser()
    setSupabaseUser(authUser)

    if (authUser) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', authUser.id)
        .single()
      setUser(profile as UserProfile | null)
    } else {
      setUser(null)
    }
    setIsLoading(false)
  }

  useEffect(() => {
    loadUser()

    // 监听 auth 状态变化
    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
      loadUser()
    })

    return () => subscription.unsubscribe()
  }, [])

  async function signOut() {
    await supabase.auth.signOut()
    setSupabaseUser(null)
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, supabaseUser, isLoading, refresh: loadUser, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
