import React, { createContext, useContext, useMemo, useState, useEffect } from 'react'
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material'

const ThemeContext = createContext()

export function useThemeContext() {
  return useContext(ThemeContext)
}

export function ThemeContextProvider({ children }) {
  const [mode, setMode] = useState(() => localStorage.getItem('themeMode') || 'light')

  useEffect(() => {
    localStorage.setItem('themeMode', mode)
  }, [mode])

  const toggleTheme = () => setMode(prev => (prev === 'light' ? 'dark' : 'light'))

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: { main: '#6C63FF' },
          secondary: { main: '#FF6584' },
          ...(mode === 'light'
            ? {
                background: { default: '#F4F6FB', paper: '#FFFFFF' },
              }
            : {
                background: { default: '#0F1117', paper: '#1A1D27' },
              }),
        },
        typography: {
          fontFamily: 'Inter, sans-serif',
        },
        shape: { borderRadius: 12 },
        components: {
          MuiButton: {
            styleOverrides: {
              root: { textTransform: 'none', fontWeight: 600 },
            },
          },
          MuiCard: {
            styleOverrides: {
              root: { boxShadow: '0 2px 12px rgba(0,0,0,0.08)' },
            },
          },
        },
      }),
    [mode]
  )

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  )
}
