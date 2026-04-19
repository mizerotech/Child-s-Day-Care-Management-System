import React from 'react'
import { Grid, Card, CardContent, Box, Typography, Chip } from '@mui/material'
import ChildCareIcon from '@mui/icons-material/ChildCare'
import PeopleIcon from '@mui/icons-material/People'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import EventNoteIcon from '@mui/icons-material/EventNote'
import StatCard from '../../components/common/StatCard'
import WeeklyAttendanceChart from '../../components/charts/WeeklyAttendanceChart'
import AttendanceTrendChart from '../../components/charts/AttendanceTrendChart'
import GroupDistributionChart from '../../components/charts/GroupDistributionChart'
import { childrenData, staffData, activitiesData } from '../../data/mockData'
import { useAuth } from '../../context/AuthContext'
import '../../styles/global.scss'

export default function Dashboard() {
  const { user } = useAuth()

  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening'

  return (
    <Box className="page-container">

      {/* Welcome Banner */}
      <Box className="dashboard-welcome">
        <Typography className="welcome-title">
          {greeting}, {user?.name || 'Admin'} 👋
        </Typography>
        <Typography className="welcome-sub">
          Here's what's happening at Little Stars today.
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* Stat Cards */}
        <Grid item xs={12} sm={6} lg={3}>
          <StatCard
            title="Total Children"
            value={childrenData.length}
            subtitle="Currently enrolled"
            icon={<ChildCareIcon />}
            color="#6C63FF"
            trend="up"
            trendLabel="+2 this month"
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <StatCard
            title="Staff Members"
            value={staffData.length}
            subtitle="Active employees"
            icon={<PeopleIcon />}
            color="#FF6584"
            trend="up"
            trendLabel="Full capacity"
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <StatCard
            title="Today's Attendance"
            value="18/22"
            subtitle="Present today"
            icon={<CheckCircleIcon />}
            color="#22C55E"
            trend="up"
            trendLabel="82% rate"
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <StatCard
            title="Activities"
            value={activitiesData.length}
            subtitle="Scheduled this week"
            icon={<EventNoteIcon />}
            color="#F59E0B"
            trend="up"
            trendLabel="On schedule"
          />
        </Grid>

        {/* Weekly Attendance Bar Chart */}
        <Grid item xs={12} md={8}>
          <Card className="chart-card">
            <CardContent sx={{ p: 3 }}>
              <Box className="chart-header">
                <Typography className="chart-title" color="text.primary">Weekly Attendance</Typography>
                <Box className="chart-badge">This Week</Box>
              </Box>
              <WeeklyAttendanceChart />
            </CardContent>
          </Card>
        </Grid>

        {/* Pie Chart */}
        <Grid item xs={12} md={4}>
          <Card className="chart-card" style={{ height: '100%' }}>
            <CardContent sx={{ p: 3 }}>
              <Box className="chart-header">
                <Typography className="chart-title" color="text.primary">Group Distribution</Typography>
                <Chip label="3 Groups" size="small" color="primary" variant="outlined" />
              </Box>
              <GroupDistributionChart />
            </CardContent>
          </Card>
        </Grid>

        {/* Line Chart */}
        <Grid item xs={12}>
          <Card className="chart-card">
            <CardContent sx={{ p: 3 }}>
              <Box className="chart-header">
                <Typography className="chart-title" color="text.primary">Attendance Trend</Typography>
                <Box className="chart-badge">Last 6 Weeks</Box>
              </Box>
              <AttendanceTrendChart />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}
