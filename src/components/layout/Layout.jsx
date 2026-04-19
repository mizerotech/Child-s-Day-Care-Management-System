import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Box, useMediaQuery, useTheme } from '@mui/material'
import Sidebar from './Sidebar'
import Header from './Header'
import '../../styles/layout.scss'

const DRAWER_WIDTH = 260

export default function Layout() {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleDrawerToggle = () => setMobileOpen(prev => !prev)

  return (
    <Box className="layout-root">
      <Sidebar
        drawerWidth={DRAWER_WIDTH}
        mobileOpen={mobileOpen}
        onClose={handleDrawerToggle}
        isMobile={isMobile}
      />
      <Box
        className="layout-main"
        sx={{ width: { md: `calc(100% - ${DRAWER_WIDTH}px)` }, ml: { md: `${DRAWER_WIDTH}px` } }}
      >
        <Header onMenuClick={handleDrawerToggle} drawerWidth={DRAWER_WIDTH} />
        <Box component="main" className="layout-content">
          <Outlet />
        </Box>
      </Box>
    </Box>
  )
}
