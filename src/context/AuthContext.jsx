import React, { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check localStorage on mount
    const storedUser = localStorage.getItem('daycareUser')
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (e) {
        localStorage.removeItem('daycareUser')
      }
    }
    setLoading(false)
  }, [])

  const login = (email, password) => {
    // Simulate authentication
    const userData = {
      id: Date.now(),
      email,
      name: email.split('@')[0],
      role: 'admin',
    }
    setUser(userData)
    localStorage.setItem('daycareUser', JSON.stringify(userData))
    return { success: true }
  }

  const signup = (name, email, password) => {
    // Simulate user creation
    const userData = {
      id: Date.now(),
      email,
      name,
      role: 'admin',
    }
    setUser(userData)
    localStorage.setItem('daycareUser', JSON.stringify(userData))
    return { success: true }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('daycareUser')
  }

  const value = {
    user,
    login,
    signup,
    logout,
    isAuthenticated: !!user,
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
