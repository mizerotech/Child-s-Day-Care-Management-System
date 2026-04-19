import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import {
  Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText,
  Box, Typography, Divider, Avatar
} from '@mui/material'
import DashboardIcon from '@mui/icons-material/Dashboard'
import ChildCareIcon from '@mui/icons-material/ChildCare'
import PeopleIcon from '@mui/icons-material/People'
import EventNoteIcon from '@mui/icons-material/EventNote'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import FamilyRestroomIcon from '@mui/icons-material/FamilyRestroom'
import { useThemeContext } from '../../context/ThemeContext'
import ThemeToggle from '../common/ThemeToggle'

const navItems = [
  { label: 'Dashboard', path: '/dashboard', icon: <DashboardIcon /> },
  { label: 'Children', path: '/children', icon: <ChildCareIcon /> },
  { label: 'Staff', path: '/staff', icon: <PeopleIcon /> },
  { label: 'Activities', path: '/activities', icon: <EventNoteIcon /> },
  { label: 'Attendance', path: '/attendance', icon: <CheckCircleIcon /> },
  { label: "Parents Portal", path: '/parents', icon: <FamilyRestroomIcon /> },
]

export default function Sidebar({ drawerWidth, mobileOpen, onClose, isMobile }) {
  const navigate = useNavigate()
  const location = useLocation()

  const content = (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Logo */}
      <Box sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <Avatar sx={{ bgcolor: 'primary.main', width: 40, height: 40 }}>
          <ChildCareIcon />
        </Avatar>
        <Box>
          <Typography variant="subtitle1" fontWeight={700} lineHeight={1.2}>
            Little Stars
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Daycare Management
          </Typography>
        </Box>
      </Box>

      <Divider />

      {/* Nav */}
      <List sx={{ flex: 1, px: 1.5, pt: 1 }}>
        {navItems.map(item => {
          const active = location.pathname === item.path
          return (
            <ListItem key={item.path} disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton
                onClick={() => { navigate(item.path); if (isMobile) onClose() }}
                sx={{
                  borderRadius: 2,
                  bgcolor: active ? 'primary.main' : 'transparent',
                  color: active ? '#fff' : 'text.primary',
                  '&:hover': { bgcolor: active ? 'primary.dark' : 'action.hover' },
                  '& .MuiListItemIcon-root': { color: active ? '#fff' : 'text.secondary', minWidth: 40 },
                }}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.label} primaryTypographyProps={{ fontWeight: active ? 600 : 400, fontSize: 14 }} />
              </ListItemButton>
            </ListItem>
          )
        })}
      </List>

      <Divider />
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant="caption" color="text.secondary">Theme</Typography>
        <ThemeToggle />
      </Box>
    </Box>
  )

  return (
    <>
      {/* Mobile drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onClose}
        ModalProps={{ keepMounted: true }}
        sx={{ display: { xs: 'block', md: 'none' }, '& .MuiDrawer-paper': { width: drawerWidth } }}
      >
        {content}
      </Drawer>
      {/* Desktop drawer */}
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
