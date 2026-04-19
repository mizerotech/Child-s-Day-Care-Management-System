import React, { useState } from 'react'
import { useNavigate, Link as RouterLink, useLocation } from 'react-router-dom'
import {
  Box, Container, Card, CardContent, Typography, TextField,
  Button, Link, Alert, InputAdornment, IconButton, Divider
} from '@mui/material'
import ChildCareIcon from '@mui/icons-material/ChildCare'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import EmailIcon from '@mui/icons-material/Email'
import LockIcon from '@mui/icons-material/Lock'
import { useAuth } from '../../context/AuthContext'
import '../../styles/global.scss'

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function Login() {
  const navigate = useNavigate()
  const location = useLocation()
  const { login, isAuthenticated } = useAuth()

  const [form, setForm] = useState({ email: '', password: '' })
  const [touched, setTouched] = useState({ email: false, password: false })
  const [showPwd, setShowPwd] = useState(false)
  const [serverErr, setServerErr] = useState('')
  const [loading, setLoading] = useState(false)

  React.useEffect(() => {
    if (isAuthenticated) navigate('/dashboard')
  }, [isAuthenticated, navigate])

  const errors = {
    email: !form.email.trim() ? 'Email is required'
      : !emailRe.test(form.email) ? 'Enter a valid email address' : '',
    password: !form.password ? 'Password is required'
      : form.password.length < 6 ? 'Password must be at least 6 characters' : '',
  }

  const isValid = !errors.email && !errors.password

  const handleChange = (e) => {
    setForm(p => ({ ...p, [e.target.name]: e.target.value }))
    setServerErr('')
  }

  const handleBlur = (e) => setTouched(p => ({ ...p, [e.target.name]: true }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setTouched({ email: true, password: true })
    if (!isValid) return

    setLoading(true)
    // Simulate network delay
    await new Promise(r => setTimeout(r, 400))
    const result = login(form.email, form.password)
    setLoading(false)

    if (result.success) {
      navigate(location.state?.from || '/dashboard', { replace: true })
    } else {
      setServerErr('Invalid credentials. Try admin@daycare.com / admin123')
    }
  }

  return (
    <Box className="auth-page">
      <Container maxWidth="sm">
        <Box className="auth-wrapper">
          <Box className="auth-logo">
            <Box className="auth-logo-icon"><ChildCareIcon /></Box>
            <Typography className="auth-logo-title" color="text.primary">Little Stars</Typography>
            <Typography className="auth-logo-sub" color="text.secondary">Sign in to your account</Typography>
          </Box>

          <Card className="auth-card">
            <CardContent className="auth-card-body">
              {serverErr && <Alert severity="error" className="error-alert">{serverErr}</Alert>}

              <Box component="form" onSubmit={handleSubmit} noValidate>
                <TextField
                  fullWidth label="Email Address" name="email" type="email"
                  value={form.email} onChange={handleChange} onBlur={handleBlur}
                  error={touched.email && !!errors.email}
                  helperText={touched.email ? errors.email : ' '}
                  className="auth-field"
                  autoComplete="email"
                  InputProps={{
                    startAdornment: <InputAdornment position="start"><EmailIcon fontSize="small" color="action" /></InputAdornment>,
                  }}
                />
                <TextField
                  fullWidth label="Password" name="password"
                  type={showPwd ? 'text' : 'password'}
                  value={form.password} onChange={handleChange} onBlur={handleBlur}
                  error={touched.password && !!errors.password}
                  helperText={touched.password ? errors.password : ' '}
                  className="auth-field-last"
                  autoComplete="current-password"
                  InputProps={{
                    startAdornment: <InputAdornment position="start"><LockIcon fontSize="small" color="action" /></InputAdornment>,
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setShowPwd(p => !p)} edge="end" size="small">
                          {showPwd ? <VisibilityOffIcon fontSize="small" /> : <VisibilityIcon fontSize="small" />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />

                <Button
                  type="submit" variant="contained" fullWidth size="large"
                  className="auth-submit" disabled={!isValid || loading}
                >
                  {loading ? 'Signing in...' : 'Sign In'}
                </Button>

                <Divider sx={{ my: 2 }}>
                  <Typography variant="caption" color="text.secondary">OR</Typography>
                </Divider>

                <Typography variant="body2" color="text.secondary" textAlign="center">
                  Don't have an account?{' '}
                  <Link component={RouterLink} to="/signup" fontWeight={600} underline="hover">
                    Create one
                  </Link>
                </Typography>
              </Box>
            </CardContent>
          </Card>

          <Box className="auth-back">
            <Link component={RouterLink} to="/" color="text.secondary" underline="hover" fontSize="0.875rem">
              ← Back to Home
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}
