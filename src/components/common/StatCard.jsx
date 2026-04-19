import React from 'react'
import { Card, CardContent, Box, Typography } from '@mui/material'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import TrendingDownIcon from '@mui/icons-material/TrendingDown'
import '../../styles/global.scss'

export default function StatCard({ title, value, subtitle, icon, color = '#6C63FF', trend, trendLabel }) {
  const isUp = trend === 'up'
  const isDown = trend === 'down'

  return (
    <Card className="stat-card">
      <Box className="stat-card-inner">
        <Box className="stat-body">
          <Typography className="stat-value" color="text.primary">{value}</Typography>
          <Typography className="stat-label" color="text.primary">{title}</Typography>
          {subtitle && (
            <Typography className="stat-sub" color="text.secondary">{subtitle}</Typography>
          )}
          {trend && (
            <Box className={`stat-trend ${isUp ? 'up' : 'down'}`}>
              {isUp ? <TrendingUpIcon sx={{ fontSize: 13 }} /> : <TrendingDownIcon sx={{ fontSize: 13 }} />}
              {trendLabel}
            </Box>
          )}
        </Box>
        <Box className="stat-icon-wrap" style={{ backgroundColor: color }}>
          {icon}
        </Box>
      </Box>
    </Card>
  )
}
