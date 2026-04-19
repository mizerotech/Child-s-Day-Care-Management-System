import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { ThemeContextProvider } from './context/ThemeContext'
import { AuthProvider } from './context/AuthContext'
import AppRouter from './router/AppRouter'

export default function App() {
  return (
    <BrowserRouter>
      <ThemeContextProvider>
        <AuthProvider>
          <AppRouter />
        </AuthProvider>
      </ThemeContextProvider>
    </BrowserRouter>
  )
}
