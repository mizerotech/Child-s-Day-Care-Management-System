import React, { createContext, useContext, useMemo, useState, useEffect } from 'react'
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material'

const ThemeContext = createContext()

export function useThemeContext() {
  return useContext(ThemeContext)
}

export function ThemeContextProvider({ children }) {
  const [mode, setMode] = useState(() => localStorage.getItem('themeMode') || 'light')

  useEffect(() => { localStorage.setItem('themeMode', mode) }, [mode])

  const toggleTheme = () => setMode(p => (p === 'light' ? 'dark' : 'light'))

  const theme = useMemo(() => createTheme({
    palette: {
      mode,
      primary:   { main: '#6C63FF', dark: '#5A52D5', light: '#EEF0FF', contrastText: '#fff' },
      secondary: { main: '#FF6584', light: '#FFF0F3', contrastText: '#fff' },
      success:   { main: '#22C55E', light: '#DCFCE7' },
      warning:   { main: '#F59E0B', light: '#FEF3C7' },
      error:     { main: '#EF4444', light: '#FEE2E2' },
      info:      { main: '#3B82F6', light: '#DBEAFE' },
      ...(mode === 'light'
        ? { background: { default: '#F1F5F9', paper: '#FFFFFF' },
            text: { primary: '#0F172A', secondary: '#64748B' },
            divider: 'rgba(0,0,0,0.07)' }
        : { background: { default: '#0B0F1A', paper: '#141824' },
            text: { primary: '#F1F5F9', secondary: '#94A3B8' },
            divider: 'rgba(255,255,255,0.07)' }),
    },
    typography: {
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      h1: { fontWeight: 800, letterSpacing: '-0.03em' },
      h2: { fontWeight: 800, letterSpacing: '-0.03em' },
      h3: { fontWeight: 700, letterSpacing: '-0.02em' },
      h4: { fontWeight: 700, letterSpacing: '-0.02em' },
      h5: { fontWeight: 700, letterSpacing: '-0.01em' },
      h6: { fontWeight: 700, letterSpacing: '-0.01em' },
      subtitle1: { fontWeight: 600 },
      subtitle2: { fontWeight: 600 },
      button: { fontWeight: 600, textTransform: 'none' },
    },
    shape: { borderRadius: 12 },
    shadows: [
      'none',
      '0 1px 2px rgba(0,0,0,0.05)',
      '0 1px 3px rgba(0,0,0,0.08)',
      '0 4px 6px rgba(0,0,0,0.05)',
      '0 4px 6px rgba(0,0,0,0.07)',
      '0 10px 15px rgba(0,0,0,0.07)',
      '0 10px 15px rgba(0,0,0,0.08)',
      '0 20px 25px rgba(0,0,0,0.08)',
      '0 20px 25px rgba(0,0,0,0.10)',
      ...Array(16).fill('0 20px 25px rgba(0,0,0,0.10)'),
    ],
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: { scrollBehavior: 'smooth' },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            fontWeight: 600,
            borderRadius: 10,
            transition: 'all 0.2s ease',
          },
          contained: {
            boxShadow: 'none',
            '&:hover': { boxShadow: '0 4px 12px rgba(108,99,255,0.3)', transform: 'translateY(-1px)' },
            '&:active': { transform: 'translateY(0)' },
          },
          outlined: {
            '&:hover': { transform: 'translateY(-1px)' },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 16,
            boxShadow: mode === 'light'
              ? '0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)'
              : '0 1px 3px rgba(0,0,0,0.3)',
            backgroundImage: 'none',
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: { backgroundImage: 'none' },
        },
      },
      MuiTextField: {
        defaultProps: { size: 'small' },
        styleOverrides: {
          root: {
            '& .MuiOutlinedInput-root': {
              borderRadius: 10,
              transition: 'all 0.2s ease',
              '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#6C63FF' },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderWidth: 2 },
            },
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: { fontWeight: 600, fontSize: '0.75rem' },
        },
      },
      MuiDialog: {
        styleOverrides: {
          paper: { borderRadius: 16, backgroundImage: 'none' },
        },
      },
      MuiDialogTitle: {
        styleOverrides: {
          root: { fontWeight: 700, fontSize: '1.125rem', padding: '20px 24px 12px' },
        },
      },
      MuiDialogContent: {
        styleOverrides: {
          root: { padding: '12px 24px' },
        },
      },
      MuiDialogActions: {
        styleOverrides: {
          root: { padding: '12px 24px 20px', gap: 8 },
        },
      },
      MuiTableHead: {
        styleOverrides: {
          root: {
            '& .MuiTableCell-head': {
              fontWeight: 700,
              fontSize: '0.8125rem',
              letterSpacing: '0.02em',
            },
          },
        },
      },
      MuiTableRow: {
        styleOverrides: {
          root: {
            '&:hover': { backgroundColor: mode === 'light' ? 'rgba(108,99,255,0.03)' : 'rgba(108,99,255,0.06)' },
          },
        },
      },
      MuiTab: {
        styleOverrides: {
          root: { fontWeight: 600, textTransform: 'none', fontSize: '0.9rem' },
        },
      },
      MuiListItemButton: {
        styleOverrides: {
          root: { borderRadius: 8, transition: 'all 0.15s ease' },
        },
      },
      MuiDrawer: {
        styleOverrides: {
          paper: {
            borderRight: mode === 'light' ? '1px solid rgba(0,0,0,0.07)' : '1px solid rgba(255,255,255,0.07)',
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundImage: 'none',
            borderBottom: mode === 'light' ? '1px solid rgba(0,0,0,0.07)' : '1px solid rgba(255,255,255,0.07)',
          },
        },
      },
      MuiDataGrid: {
        styleOverrides: {
          root: {
            border: 'none',
            borderRadius: 16,
            '& .MuiDataGrid-columnHeaders': { fontWeight: 700, fontSize: '0.8125rem' },
            '& .MuiDataGrid-row:hover': {
              backgroundColor: mode === 'light' ? 'rgba(108,99,255,0.04)' : 'rgba(108,99,255,0.08)',
            },
            '& .MuiDataGrid-cell': { borderColor: mode === 'light' ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.05)' },
            '& .MuiDataGrid-columnSeparator': { display: 'none' },
          },
        },
      },
    },
  }), [mode])

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  )
}
