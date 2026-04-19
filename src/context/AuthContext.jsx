import React, { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export function useAuth() {
  return useContext(AuthContext)
}

// Role definitions — what each role can access
export const ROLE_ROUTES = {
  admin:  ['/dashboard', '/children', '/staff', '/activities', '/attendance', '/parents'],
  parent: ['/parents'],
}

export const ROLE_HOME = {
  admin:  '/dashboard',
  parent: '/parents',
}

// Simulated user accounts for demo
const DEMO_ACCOUNTS = [
  { email: 'admin@daycare.com',  password: 'admin123', role: 'admin',  name: 'Admin User' },
  { email: 'parent@daycare.com', password: 'parent123', role: 'parent', name: 'Parent User' },
]

export function AuthProvider({ children }) {
  const [user, setUser]       = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const stored = localStorage.getItem('daycareUser')
    if (stored) {
      try { setUser(JSON.parse(stored)) }
      catch { localStorage.removeItem('daycareUser') }
    }
    setLoading(false)
  }, [])

  const login = (email, password, selectedRole) => {
    // Check demo accounts first
    const demo = DEMO_ACCOUNTS.find(
      a => a.email.toLowerCase() === email.toLowerCase() && a.password === password
    )

    // If demo account found, use its role; otherwise use selectedRole
    const role = demo ? demo.role : (selectedRole || 'admin')
    const name = demo ? demo.name : email.split('@')[0]

    const userData = { id: Date.now(), email, name, role }
    setUser(userData)
    localStorage.setItem('daycareUser', JSON.stringify(userData))
    return { success: true, role }
  }

  const signup = (name, email, password, role = 'admin') => {
    const userData = { id: Date.now(), email, name, role }
    setUser(userData)
    localStorage.setItem('daycareUser', JSON.stringify(userData))
    return { success: true, role }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('daycareUser')
  }

  const canAccess = (path) => {
    if (!user) return false
    const allowed = ROLE_ROUTES[user.role] || []
    return allowed.includes(path)
  }

  return (
    <AuthContext.Provider value={{
      user,
      login,
      signup,
      logout,
      canAccess,
      isAuthenticated: !!user,
      isAdmin:  user?.role === 'admin',
      isParent: user?.role === 'parent',
      homeRoute: user ? (ROLE_HOME[user.role] || '/dashboard') : '/login',
    }}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
