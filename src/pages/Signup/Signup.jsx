import React, { useState } from 'react'
import { useNavigate, Link as RouterLink } from 'react-router-dom'
import {
  Box, Container, Card, CardContent, Typography, TextField,
  Button, Link, Alert, InputAdornment, IconButton, Avatar
} from '@mui/material'
import ChildCareIcon from '@mui/icons-material/ChildCare'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import { useAuth } from '../../context/AuthContext'
import '../../styles/global.scss'

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export default function Signup() {
  const navigate = useNavigate()
  const { signup, isAuthenticated } = useAuth()
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' })
  const [errors, setErrors] = useState({})
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')

  React.useEffect(() => {
    if (isAuthenticated) navigate('/dashboard')
  }, [isAuthenticated, navigate])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }))
    setError('')
  }

  const validate = () => {
    const errs = {}
    if (!form.name.trim()) errs.name = 'Name is required'
    if (!form.email.trim()) errs.email = 'Email is required'
    else if (!validateEmail(form.email)) errs.email = 'Invalid email format'
    if (!form.password) errs.password = 'Password is required'
    else if (form.password.length < 6) errs.password = 'Password must be at least 6 characters'
    if (!form.confirmPassword) errs.confirmPassword = 'Please confirm password'
    else if (form.password !== form.confirmPassword) errs.confirmPassword = 'Passwords do not match'
    return errs
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) {
      setErrors(errs)
      return
    }
    const result = signup(form.name, form.email, form.password)
    if (result.success) {
      navigate('/dashboard')
    } else {
      setError('Signup failed. Please try again.')
    }
  }

  return (
    <Box className="auth-page">
      <Container maxWidth="sm">
        <Card className="auth-card">
          <CardContent className="auth-card-content">
            <Box className="auth-header">
              <Avatar className="auth-avatar" color="primary">
                <ChildCareIcon fontSize="large" />
              </Avatar>
              <Typography variant="h4" fontWeight={700} gutterBottom>Create Account</Typography>
              <Typography variant="body2" color="text.secondary">Sign up to get started</Typography>
            </Box>

            {error && <Alert severity="error" className="error-alert">{error}</Alert>}

            <Box component="form" onSubmit={handleSubmit} className="auth-form">
              <TextField
                fullWidth
                label="Full Name"
                name="name"
                value={form.name}
                onChange={handleChange}
                error={!!errors.name}
                helperText={errors.name}
                className="form-field"
                autoComplete="name"
              />
              <TextField
                fullWidth
                label="Email Address"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                error={!!errors.email}
                helperText={errors.email}
                className="form-field"
                autoComplete="email"
              />
              <TextField
                fullWidth
                label="Password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={form.password}
                onChange={handleChange}
                error={!!errors.password}
                helperText={errors.password}
                className="form-field"
                autoComplete="new-password"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword(p => !p)} edge="end">
                        {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                fullWidth
                label="Confirm Password"
                name="confirmPassword"
                type={showPassword ? 'text' : 'password'}
                value={form.confirmPassword}
                onChange={handleChange}
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword}
                className="form-field-last"
                autoComplete="new-password"
              />
              <Button type="submit" variant="contained" fullWidth size="large" className="submit-button">
                Create Account
              </Button>
              <Box className="auth-footer">
                <Typography variant="body2" color="text.secondary">
                  Already have an account?{' '}
                  <Link component={RouterLink} to="/login" underline="hover" fontWeight={600}>
                    Sign in
                  </Link>
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
        <Box className="back-link">
          <Link component={RouterLink} to="/" underline="hover" color="text.secondary">
            ← Back to Home
          </Link>
        </Box>
      </Container>
    </Box>
  )
}
