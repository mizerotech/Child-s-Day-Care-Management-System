import React from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Box, Container, Typography, Button, Grid, Card, CardContent,
  AppBar, Toolbar, Stack
} from '@mui/material'
import ChildCareIcon from '@mui/icons-material/ChildCare'
import DashboardIcon from '@mui/icons-material/Dashboard'
import PeopleIcon from '@mui/icons-material/People'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import EventNoteIcon from '@mui/icons-material/EventNote'
import SecurityIcon from '@mui/icons-material/Security'
import SpeedIcon from '@mui/icons-material/Speed'
import { useAuth } from '../../context/AuthContext'
import ThemeToggle from '../../components/common/ThemeToggle'

const features = [
  { icon: <DashboardIcon />, title: 'Dashboard', desc: 'Real-time insights and analytics' },
  { icon: <ChildCareIcon />, title: 'Child Management', desc: 'Complete profiles with photos' },
  { icon: <PeopleIcon />, title: 'Staff Management', desc: 'Track roles and schedules' },
  { icon: <CheckCircleIcon />, title: 'Attendance', desc: 'Check-in/out tracking' },
  { icon: <EventNoteIcon />, title: 'Activities', desc: 'Plan and schedule activities' },
  { icon: <SecurityIcon />, title: 'Secure', desc: 'Protected data and privacy' },
]

export default function Landing() {
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()

  React.useEffect(() => {
    if (isAuthenticated) navigate('/dashboard')
  }, [isAuthenticated, navigate])

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Navbar */}
      <AppBar position="static" elevation={0} sx={{ bgcolor: 'background.paper', borderBottom: '1px solid', borderColor: 'divider' }}>
        <Toolbar>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flex: 1 }}>
            <ChildCareIcon sx={{ color: 'primary.main', fontSize: 32 }} />
            <Typography variant="h6" fontWeight={700} color="text.primary">Little Stars</Typography>
          </Box>
          <Stack direction="row" spacing={1} alignItems="center">
            <ThemeToggle />
            <Button variant="outlined" onClick={() => navigate('/login')}>Login</Button>
            <Button variant="contained" onClick={() => navigate('/signup')}>Sign Up</Button>
          </Stack>
        </Toolbar>
      </AppBar>

      {/* Hero */}
      <Box sx={{ bgcolor: 'background.default', py: { xs: 6, md: 10 }, flex: 1 }}>
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h2" fontWeight={800} gutterBottom sx={{ fontSize: { xs: '2.5rem', md: '3.5rem' } }}>
                Modern Daycare Management
              </Typography>
              <Typography variant="h6" color="text.secondary" paragraph sx={{ mb: 4 }}>
                Streamline your daycare operations with our all-in-one platform. Manage children, staff, attendance, and activities effortlessly.
              </Typography>
              <Stack direction="row" spacing={2}>
                <Button variant="contained" size="large" onClick={() => navigate('/signup')} sx={{ px: 4, py: 1.5 }}>
                  Get Started
                </Button>
                <Button variant="outlined" size="large" onClick={() => navigate('/login')} sx={{ px: 4, py: 1.5 }}>
                  Login
                </Button>
              </Stack>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  width: '100%',
                  height: 400,
                  bgcolor: 'primary.main',
                  borderRadius: 4,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'linear-gradient(135deg, #6C63FF 0%, #FF6584 100%)',
                }}
              >
                <ChildCareIcon sx={{ fontSize: 180, color: 'white', opacity: 0.9 }} />
              </Box>
            </Grid>
          </Grid>

          {/* Features */}
          <Box sx={{ mt: 10 }}>
            <Typography variant="h4" fontWeight={700} textAlign="center" mb={5}>
              Everything You Need
            </Typography>
            <Grid container spacing={3}>
              {features.map((f, i) => (
                <Grid item xs={12} sm={6} md={4} key={i}>
                  <Card sx={{ height: '100%', textAlign: 'center', transition: 'transform 0.2s', '&:hover': { transform: 'translateY(-4px)' } }}>
                    <CardContent sx={{ p: 3 }}>
                      <Box sx={{ color: 'primary.main', mb: 2 }}>
                        {React.cloneElement(f.icon, { sx: { fontSize: 48 } })}
                      </Box>
                      <Typography variant="h6" fontWeight={600} gutterBottom>{f.title}</Typography>
                      <Typography variant="body2" color="text.secondary">{f.desc}</Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>

          {/* CTA */}
          <Box sx={{ mt: 10, textAlign: 'center', py: 6, bgcolor: 'background.paper', borderRadius: 4 }}>
            <Typography variant="h4" fontWeight={700} gutterBottom>Ready to Get Started?</Typography>
            <Typography variant="body1" color="text.secondary" mb={3}>
              Join hundreds of daycare centers using Little Stars
            </Typography>
            <Button variant="contained" size="large" onClick={() => navigate('/signup')} sx={{ px: 5, py: 1.5 }}>
              Create Free Account
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Footer */}
      <Box sx={{ py: 3, bgcolor: 'background.paper', borderTop: '1px solid', borderColor: 'divider' }}>
        <Container maxWidth="lg">
          <Typography variant="body2" color="text.secondary" textAlign="center">
            © 2026 Little Stars Daycare Management. All rights reserved.
          </Typography>
        </Container>
      </Box>
    </Box>
  )
}
