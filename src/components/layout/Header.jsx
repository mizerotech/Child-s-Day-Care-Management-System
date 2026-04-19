import React, { useState } from 'react'
import {
  AppBar, Toolbar, IconButton, Typography, Box, Avatar,
  Badge, Menu, MenuItem, Divider
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import NotificationsIcon from '@mui/icons-material/Notifications'
import LogoutIcon from '@mui/icons-material/Logout'
import PersonIcon from '@mui/icons-material/Person'
import { useLocation, useNavigate } from 'react-router-dom'
import ThemeToggle from '../common/ThemeToggle'
import { useAuth } from '../../context/AuthContext'
import '../../styles/global.scss'

const pageMeta = {
  '/dashboard': { title: 'Dashboard', sub: 'Overview & analytics' },
  '/children':  { title: 'Children', sub: 'Manage enrolled children' },
  '/staff':     { title: 'Staff', sub: 'Manage staff members' },
  '/activities':{ title: 'Activities', sub: 'Daily activities & schedule' },
  '/attendance':{ title: 'Attendance', sub: 'Check-in & check-out' },
  '/parents':   { title: 'Parents Portal', sub: 'Read-only parent view' },
}

export default function Header({ onMenuClick, drawerWidth }) {
  const location = useLocation()
  const navigate = useNavigate()
  const { user, logout, isAdmin, isParent } = useAuth()
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)

  const meta = pageMeta[location.pathname] || { title: 'Daycare', sub: '' }
  const roleLabel = isAdmin ? 'Admin' : isParent ? 'Parent' : 'User'

  const handleLogout = () => { logout(); navigate('/login') }

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        width: { md: `calc(100% - ${drawerWidth}px)` },
        bgcolor: 'background.paper',
        color: 'text.primary',
      }}
    >
      <Toolbar className="header-inner" sx={{ minHeight: '64px !important', px: { xs: 2, sm: 3 } }}>
        <IconButton edge="start" onClick={onMenuClick} sx={{ mr: 1, display: { md: 'none' } }}>
          <MenuIcon />
        </IconButton>

        <Box className="header-title-wrap">
          <Typography className="header-title" color="text.primary">{meta.title}</Typography>
          <Typography className="header-breadcrumb" color="text.secondary"
            sx={{ display: { xs: 'none', sm: 'block' } }}>
            {meta.sub}
          </Typography>
        </Box>

        <Box className="header-right">
          <Box className="header-user-info">
            <Typography className="user-name" color="text.primary">
              {user?.name || 'User'} <span style={{ color: '#6C63FF', fontWeight: 600, fontSize: '0.75rem' }}>({roleLabel})</span>
            </Typography>
            <Typography className="user-email" color="text.secondary">{user?.email}</Typography>
          </Box>

          <ThemeToggle />

          <IconButton size="small">
            <Badge badgeContent={3} color="secondary">
              <NotificationsIcon fontSize="small" />
            </Badge>
          </IconButton>

          <Avatar
            className="header-avatar"
            onClick={(e) => setAnchorEl(e.currentTarget)}
          >
            {user?.name?.[0]?.toUpperCase() || 'U'}
          </Avatar>
        </Box>

        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={() => setAnchorEl(null)}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          PaperProps={{ sx: { mt: 1, minWidth: 200, borderRadius: 2 } }}
        >
          <Box sx={{ px: 2, py: 1.5 }}>
            <Typography variant="subtitle2" fontWeight={700}>{user?.name}</Typography>
            <Typography variant="caption" color="text.secondary">{user?.email} <span style={{ color: '#6C63FF' }}>({roleLabel})</span></Typography>
          </Box>
          <Divider />
          <MenuItem onClick={() => setAnchorEl(null)} sx={{ gap: 1.5, py: 1.2 }}>
            <PersonIcon fontSize="small" color="action" /> Profile
          </MenuItem>
          <MenuItem onClick={handleLogout} sx={{ gap: 1.5, py: 1.2, color: 'error.main' }}>
            <LogoutIcon fontSize="small" /> Logout
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  )
}
