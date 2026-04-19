import React from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Box, Container, Typography, Button, Grid, Card, CardContent,
  AppBar, Toolbar, Divider
} from '@mui/material'
import ChildCareIcon from '@mui/icons-material/ChildCare'
import DashboardIcon from '@mui/icons-material/Dashboard'
import PeopleIcon from '@mui/icons-material/People'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import EventNoteIcon from '@mui/icons-material/EventNote'
import SecurityIcon from '@mui/icons-material/Security'
import BarChartIcon from '@mui/icons-material/BarChart'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { useAuth } from '../../context/AuthContext'
import ThemeToggle from '../../components/common/ThemeToggle'
import '../../styles/global.scss'

const features = [
  { icon: <DashboardIcon />,   title: 'Smart Dashboard',    desc: 'Real-time analytics with interactive charts and key metrics at a glance.' },
  { icon: <ChildCareIcon />,   title: 'Child Profiles',     desc: 'Complete child records with photos, guardian info, and allergy tracking.' },
  { icon: <PeopleIcon />,      title: 'Staff Management',   desc: 'Manage roles, schedules, and staff assignments across all groups.' },
  { icon: <CheckCircleIcon />, title: 'Attendance Tracking',desc: 'Digital check-in/out with timestamps and duplicate prevention.' },
  { icon: <EventNoteIcon />,   title: 'Activity Planning',  desc: 'Schedule and assign daily activities to specific groups or all children.' },
  { icon: <BarChartIcon />,    title: 'Reports & Analytics',desc: 'Visual reports on attendance trends, group distribution, and more.' },
]

export default function Landing() {
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()

  React.useEffect(() => {
    if (isAuthenticated) navigate('/dashboard')
  }, [isAuthenticated, navigate])

  return (
    <Box className="landing-root">
      {/* Navbar */}
      <AppBar
        position="sticky"
        elevation={0}
        className="landing-nav"
        sx={{ bgcolor: 'background.paper', color: 'text.primary' }}
      >
        <Toolbar sx={{ px: { xs: 2, md: 4 } }}>
          <Box className="nav-brand" sx={{ flex: 1, display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Box className="nav-brand-icon">
              <ChildCareIcon />
            </Box>
            <Typography variant="subtitle1" fontWeight={800} color="text.primary">
              Little Stars
            </Typography>
          </Box>
          <Box className="nav-actions">
            <ThemeToggle />
            <Button variant="outlined" size="small" onClick={() => navigate('/login')}>
              Login
            </Button>
            <Button variant="contained" size="small" onClick={() => navigate('/signup')}>
              Sign Up
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Hero */}
      <Box className="landing-hero" sx={{ bgcolor: 'background.default' }}>
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box className="hero-eyebrow">
                ✨ Modern Daycare Management
              </Box>
              <Typography className="hero-title" color="text.primary">
                Manage Your Daycare with Confidence
              </Typography>
              <Typography className="hero-desc" color="text.secondary">
                An all-in-one platform for managing children, staff, attendance, and activities — built for modern daycare centers.
              </Typography>
              <Box className="hero-cta">
                <Button
                  variant="contained"
                  className="hero-btn-primary"
                  endIcon={<ArrowForwardIcon />}
                  onClick={() => navigate('/signup')}
                >
                  Get Started Free
                </Button>
                <Button
                  variant="outlined"
                  className="hero-btn-secondary"
                  onClick={() => navigate('/login')}
                >
                  Sign In
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box className="hero-visual">
                <ChildCareIcon />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features */}
      <Box className="landing-features" sx={{ bgcolor: 'background.paper' }}>
        <Container maxWidth="lg">
          <Typography className="features-eyebrow" color="primary">Features</Typography>
          <Typography className="features-title" color="text.primary">
            Everything You Need to Run a Great Daycare
          </Typography>
          <Grid container spacing={3}>
            {features.map((f, i) => (
              <Grid item xs={12} sm={6} md={4} key={i}>
                <Card className="feature-card" elevation={0} variant="outlined">
                  <CardContent sx={{ p: 3 }}>
                    <Box className="feature-icon-wrap">{f.icon}</Box>
                    <Typography variant="subtitle1" fontWeight={700} gutterBottom>{f.title}</Typography>
                    <Typography variant="body2" color="text.secondary" lineHeight={1.6}>{f.desc}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* CTA */}
      <Box className="landing-cta-section" sx={{ bgcolor: 'background.default' }}>
        <Container maxWidth="md">
          <Box className="cta-box">
            <Typography className="cta-title">Ready to Get Started?</Typography>
            <Typography className="cta-sub">
              Join hundreds of daycare centers already using Little Stars.
            </Typography>
            <Button
              className="cta-btn"
              variant="contained"
              size="large"
              onClick={() => navigate('/signup')}
              endIcon={<ArrowForwardIcon />}
            >
              Create Free Account
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Footer */}
      <Box sx={{ bgcolor: 'background.paper' }}>
        <Divider />
        <Container maxWidth="lg">
          <Box className="landing-footer">
            <Typography variant="body2" color="text.secondary">
              © 2026 Little Stars Daycare Management. All rights reserved.
            </Typography>
          </Box>
        </Container>
      </Box>
    </Box>
  )
}
