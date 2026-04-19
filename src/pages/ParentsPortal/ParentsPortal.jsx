import React, { useState } from 'react'
import {
  Box, Typography, Grid, Card, CardContent, Tabs, Tab,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Chip, Avatar, MenuItem, TextField
} from '@mui/material'
import ChildCareIcon from '@mui/icons-material/ChildCare'
import { childrenData, initialAttendanceLogs, activitiesData, mealsData } from '../../data/mockData'
import '../../styles/pages.scss'

function TabPanel({ value, index, children }) {
  return value === index ? <Box sx={{ pt: 2 }}>{children}</Box> : null
}

export default function ParentsPortal() {
  const [tab, setTab] = useState(0)
  const [selectedChild, setSelectedChild] = useState(childrenData[0].id)

  const child = childrenData.find(c => c.id === selectedChild)
  const childLogs = initialAttendanceLogs.filter(l => l.childId === selectedChild)
  const childActivities = activitiesData.filter(a => a.group === 'All' || a.group === child?.group)

  return (
    <Box className="page-container">
      <Typography variant="h5" fontWeight={700} mb={3}>Parents Portal</Typography>

      {/* Child Selector */}
      <Card sx={{ mb: 3 }}>
        <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
          <Avatar sx={{ bgcolor: 'primary.main', width: 52, height: 52 }}>
            <ChildCareIcon />
          </Avatar>
          <Box sx={{ flex: 1, minWidth: 200 }}>
            <Typography variant="subtitle2" color="text.secondary">Viewing profile for</Typography>
            <TextField
              select size="small" value={selectedChild}
              onChange={e => setSelectedChild(Number(e.target.value))}
              sx={{ minWidth: 200, mt: 0.5 }}
            >
              {childrenData.map(c => (
                <MenuItem key={c.id} value={c.id}>{c.name}</MenuItem>
              ))}
            </TextField>
          </Box>
          {child && (
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              <Chip label={`Age: ${child.age}`} size="small" />
              <Chip label={child.group} size="small" color="primary" />
              {child.allergies !== 'None' && <Chip label={`⚠ ${child.allergies}`} size="small" color="warning" />}
            </Box>
          )}
        </CardContent>
      </Card>

      <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ mb: 1 }}>
        <Tab label="Attendance" />
        <Tab label="Activities" />
        <Tab label="Meals" />
      </Tabs>

      {/* Attendance Tab */}
      <TabPanel value={tab} index={0}>
        <TableContainer component={Paper} sx={{ borderRadius: 3 }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Check In</TableCell>
                <TableCell>Check Out</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {childLogs.length === 0 ? (
                <TableRow><TableCell colSpan={4} align="center">No attendance records</TableCell></TableRow>
              ) : childLogs.map(log => (
                <TableRow key={log.id}>
                  <TableCell>{log.date}</TableCell>
                  <TableCell>{log.checkIn || '—'}</TableCell>
                  <TableCell>{log.checkOut || '—'}</TableCell>
                  <TableCell>
                    <Chip label={log.status} size="small"
                      color={log.status === 'Present' ? 'success' : log.status === 'Checked In' ? 'primary' : 'error'} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </TabPanel>

      {/* Activities Tab */}
      <TabPanel value={tab} index={1}>
        <Grid container spacing={2}>
          {childActivities.map(a => (
            <Grid item xs={12} sm={6} md={4} key={a.id}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="subtitle2" fontWeight={600}>{a.title}</Typography>
                  <Typography variant="body2" color="text.secondary" mt={0.5}>{a.description}</Typography>
                  <Box sx={{ mt: 1, display: 'flex', gap: 1 }}>
                    <Chip label={a.day} size="small" variant="outlined" />
                    <Chip label={a.time} size="small" variant="outlined" />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </TabPanel>

      {/* Meals Tab */}
      <TabPanel value={tab} index={2}>
        <TableContainer component={Paper} sx={{ borderRadius: 3 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>Day</strong></TableCell>
                <TableCell><strong>Breakfast</strong></TableCell>
                <TableCell><strong>Lunch</strong></TableCell>
                <TableCell><strong>Snack</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {mealsData.map(m => (
                <TableRow key={m.day}>
                  <TableCell><strong>{m.day}</strong></TableCell>
                  <TableCell>{m.breakfast}</TableCell>
                  <TableCell>{m.lunch}</TableCell>
                  <TableCell>{m.snack}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </TabPanel>
    </Box>
  )
}
