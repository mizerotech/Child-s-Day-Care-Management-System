import React from 'react'
import { Grid, Card, CardContent, Typography, Box } from '@mui/material'
import ChildCareIcon from '@mui/icons-material/ChildCare'
import PeopleIcon from '@mui/icons-material/People'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import EventNoteIcon from '@mui/icons-material/EventNote'
import StatCard from '../../components/common/StatCard'
import WeeklyAttendanceChart from '../../components/charts/WeeklyAttendanceChart'
import AttendanceTrendChart from '../../components/charts/AttendanceTrendChart'
import GroupDistributionChart from '../../components/charts/GroupDistributionChart'
import { childrenData, staffData, activitiesData } from '../../data/mockData'
import '../../styles/dashboard.scss'
import '../../styles/global.scss'

export default function Dashboard() {
  return (
    <Box className="page-container">
      <Grid container spacing={3}>
        {/* Stat Cards */}
        <Grid item xs={12} sm={6} lg={3}>
          <StatCard title="Total Children" value={childrenData.length} subtitle="Enrolled" icon={<ChildCareIcon />} color="#6C63FF" />
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <StatCard title="Staff Members" value={staffData.length} subtitle="Active" icon={<PeopleIcon />} color="#FF6584" />
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <StatCard title="Today's Attendance" value="18/22" subtitle="Present today" icon={<CheckCircleIcon />} color="#43D9AD" />
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <StatCard title="Activities" value={activitiesData.length} subtitle="This week" icon={<EventNoteIcon />} color="#FF9F43" />
        </Grid>

        {/* Charts */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight={600} gutterBottom>Weekly Attendance</Typography>
              <WeeklyAttendanceChart />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card style={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" fontWeight={600} gutterBottom>Group Distribution</Typography>
              <GroupDistributionChart />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight={600} gutterBottom>Attendance Trend (6 Weeks)</Typography>
              <AttendanceTrendChart />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}
