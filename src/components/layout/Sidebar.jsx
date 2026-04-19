import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import {
  Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText,
  Box, Typography, Divider
} from '@mui/material'
import DashboardIcon from '@mui/icons-material/Dashboard'
import ChildCareIcon from '@mui/icons-material/ChildCare'
import PeopleIcon from '@mui/icons-material/People'
import EventNoteIcon from '@mui/icons-material/EventNote'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import FamilyRestroomIcon from '@mui/icons-material/FamilyRestroom'
import ThemeToggle from '../common/ThemeToggle'
import { useAuth } from '../../context/AuthContext'
import '../../styles/global.scss'

const ADMIN_ITEMS = [
  { label: 'Dashboard', path: '/dashboard', icon: <DashboardIcon /> },
  { label: 'Children', path: '/children', icon: <ChildCareIcon /> },
  { label: 'Staff', path: '/staff', icon: <PeopleIcon /> },
  { label: 'Activities', path: '/activities', icon: <EventNoteIcon /> },
  { label: 'Attendance', path: '/attendance', icon: <CheckCircleIcon /> },
  { label: 'Parents Portal', path: '/parents', icon: <FamilyRestroomIcon /> },
]

const PARENT_ITEMS = [
  { label: 'Parents Portal', path: '/parents', icon: <FamilyRestroomIcon /> },
]

export default function Sidebar({ drawerWidth, mobileOpen, onClose, isMobile }) {
  const navigate = useNavigate()
  const location = useLocation()
  const { user, isAdmin, isParent } = useAuth()

  const navItems = isAdmin ? ADMIN_ITEMS : PARENT_ITEMS

  const content = (
    <Box className="sidebar-wrap">
      <Box className="sidebar-brand">
        <Box className="brand-icon"><ChildCareIcon /></Box>
        <Box className="brand-text">
          <Typography className="brand-name" color="text.primary">Little Stars</Typography>
          <Typography className="brand-tagline" color="text.secondary">Daycare Management</Typography>
        </Box>
      </Box>

      <Divider />

      <Typography className="sidebar-section-label" color="text.secondary">
        {isAdmin ? 'Admin Menu' : 'Parent Menu'}
      </Typography>

      <List className="sidebar-nav" disablePadding>
        {navItems.map(item => {
          const active = location.pathname === item.path
          return (
            <ListItem key={item.path} disablePadding className="nav-item">
              <ListItemButton
                className={`nav-btn ${active ? 'active' : ''}`}
                onClick={() => { navigate(item.path); if (isMobile) onClose() }}
              >
                <ListItemIcon className="nav-icon" sx={{ color: active ? '#fff' : 'text.secondary' }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  className="nav-label"
                  primary={item.label}
                  primaryTypographyProps={{
                    fontSize: '0.875rem',
                    fontWeight: active ? 600 : 400,
                    color: active ? '#fff' : 'text.primary',
                  }}
                />
              </ListItemButton>
            </ListItem>
          )
        })}
      </List>

      <Box sx={{ flex: 1 }} />
      <Divider />

      <Box className="sidebar-footer">
        <Typography className="sidebar-footer-label" color="text.secondary">Appearance</Typography>
        <ThemeToggle />
      </Box>
    </Box>
  )

  return (
    <>
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onClose}
        ModalProps={{ keepMounted: true }}
        sx={{ display: { xs: 'block', md: 'none' }, '& .MuiDrawer-paper': { width: drawerWidth } }}
      >
        {content}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{ display: { xs: 'none', md: 'block' }, '& .MuiDrawer-paper': { width: drawerWidth, boxSizing: 'border-box' } }}
        open
      >
        {content}
      </Drawer>
    </>
  )
}
