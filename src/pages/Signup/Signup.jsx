import React, { useState } from 'react'
import { useNavigate, Link as RouterLink } from 'react-router-dom'
import {
  Box, Container, Card, CardContent, Typography, TextField,
  Button, Link, Alert, InputAdornment, IconButton, Divider, RadioGroup, Radio, FormControlLabel
} from '@mui/material'
import ChildCareIcon from '@mui/icons-material/ChildCare'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import PersonIcon from '@mui/icons-material/Person'
import EmailIcon from '@mui/icons-material/Email'
import LockIcon from '@mui/icons-material/Lock'
import { useAuth } from '../../context/AuthContext'
import '../../styles/global.scss'

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function Signup() {
  const navigate = useNavigate()
  const { signup, isAuthenticated } = useAuth()

  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '', role: 'admin' })
  const [touched, setTouched] = useState({ name: false, email: false, password: false, confirm: false })
  const [showPwd, setShowPwd] = useState(false)
  const [serverErr, setServerErr] = useState('')
  const [loading, setLoading] = useState(false)

  React.useEffect(() => {
    if (isAuthenticated) navigate('/dashboard')
  }, [isAuthenticated, navigate])

  const errors = {
    name: !form.name.trim() ? 'Full name is required' : '',
    email: !form.email.trim() ? 'Email is required'
      : !emailRe.test(form.email) ? 'Enter a valid email address' : '',
    password: !form.password ? 'Password is required'
      : form.password.length < 6 ? 'Password must be at least 6 characters' : '',
    confirm: !form.confirm ? 'Please confirm your password'
      : form.confirm !== form.password ? 'Passwords do not match' : '',
  }

  const isValid = Object.values(errors).every(e => !e)

  const handleChange = (e) => {
    setForm(p => ({ ...p, [e.target.name]: e.target.value }))
    setServerErr('')
  }

  const handleBlur = (e) => setTouched(p => ({ ...p, [e.target.name]: true }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setTouched({ name: true, email: true, password: true, confirm: true })
    if (!isValid) return

    setLoading(true)
    await new Promise(r => setTimeout(r, 400))
    const result = signup(form.name, form.email, form.password, form.role)
    setLoading(false)

    if (result.success) {
      navigate('/dashboard')
    } else {
      setServerErr('Signup failed. Please try again.')
    }
  }

  return (
    <Box className="auth-page">
      <Container maxWidth="sm">
        <Box className="auth-wrapper">
          <Box className="auth-logo">
            <Box className="auth-logo-icon"><ChildCareIcon /></Box>
            <Typography className="auth-logo-title" color="text.primary">Create Account</Typography>
            <Typography className="auth-logo-sub" color="text.secondary">Join Little Stars today</Typography>
          </Box>

          <Card className="auth-card">
            <CardContent className="auth-card-body">
              {serverErr && <Alert severity="error" className="error-alert">{serverErr}</Alert>}

              <Box component="form" onSubmit={handleSubmit} noValidate>
                <TextField
                  fullWidth label="Full Name" name="name"
                  value={form.name} onChange={handleChange} onBlur={handleBlur}
                  error={touched.name && !!errors.name}
                  helperText={touched.name ? errors.name : ' '}
                  className="auth-field"
                  autoComplete="name"
                  InputProps={{ startAdornment: <InputAdornment position="start"><PersonIcon fontSize="small" color="action" /></InputAdornment> }}
                />
                <TextField
                  fullWidth label="Email Address" name="email" type="email"
                  value={form.email} onChange={handleChange} onBlur={handleBlur}
                  error={touched.email && !!errors.email}
                  helperText={touched.email ? errors.email : ' '}
                  className="auth-field"
                  autoComplete="email"
                  InputProps={{ startAdornment: <InputAdornment position="start"><EmailIcon fontSize="small" color="action" /></InputAdornment> }}
                />
                <TextField
                  fullWidth label="Password" name="password"
                  type={showPwd ? 'text' : 'password'}
                  value={form.password} onChange={handleChange} onBlur={handleBlur}
                  error={touched.password && !!errors.password}
                  helperText={touched.password ? errors.password : ' '}
                  className="auth-field"
                  autoComplete="new-password"
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
                <TextField
                  fullWidth label="Confirm Password" name="confirm"
                  type={showPwd ? 'text' : 'password'}
                  value={form.confirm} onChange={handleChange} onBlur={handleBlur}
                  error={touched.confirm && !!errors.confirm}
                  helperText={touched.confirm ? errors.confirm : ' '}
                  className="auth-field-last"
                  autoComplete="new-password"
                  InputProps={{ startAdornment: <InputAdornment position="start"><LockIcon fontSize="small" color="action" /></InputAdornment> }}
                />

                <Divider sx={{ my: 2 }}>
                  <Typography variant="caption" color="text.secondary">ACCOUNT TYPE</Typography>
                </Divider>

                <RadioGroup name="role" value={form.role} onChange={handleChange} sx={{ mb: 2 }}>
                  <FormControlLabel value="admin" control={<Radio size="small" />} label="Admin (Full Access)" />
                  <FormControlLabel value="parent" control={<Radio size="small" />} label="Parent (Parents Portal Only)" />
                </RadioGroup>

                <Button
                  type="submit" variant="contained" fullWidth size="large"
                  className="auth-submit" disabled={!isValid || loading}
                >
                  {loading ? 'Creating Account...' : 'Create Account'}
                </Button>

                <Typography variant="body2" color="text.secondary" textAlign="center">
                  Already have an account?{' '}
                  <Link component={RouterLink} to="/login" fontWeight={600} underline="hover">
                    Sign in
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
