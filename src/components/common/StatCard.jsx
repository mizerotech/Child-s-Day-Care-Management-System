import React from 'react'
import { Card, CardContent, Box, Typography, Avatar } from '@mui/material'
import '../../styles/global.scss'

export default function StatCard({ title, value, subtitle, icon, color = 'primary.main' }) {
  return (
    <Card className="stat-card">
      <CardContent className="stat-card-content">
        <Avatar className="stat-avatar" style={{ backgroundColor: color }}>
          {icon}
        </Avatar>
        <Box>
          <Typography variant="h4" fontWeight={700}>{value}</Typography>
          <Typography variant="subtitle2" fontWeight={600}>{title}</Typography>
          {subtitle && <Typography variant="caption" color="text.secondary">{subtitle}</Typography>}
        </Box>
      </CardContent>
    </Card>
  )
}
