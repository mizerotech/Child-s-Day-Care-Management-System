import React, { useState } from 'react'
import {
  Box, Typography, Grid, Card, CardContent, Tabs, Tab,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Chip, Avatar, MenuItem, TextField, Divider
} from '@mui/material'
import ChildCareIcon from '@mui/icons-material/ChildCare'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import { childrenData, initialAttendanceLogs, activitiesData, mealsData } from '../../data/mockData'
import '../../styles/global.scss'

function TabPanel({ value, index, children }) {
  return value === index
    ? <Box sx={{ pt: 2.5 }}>{children}</Box>
    : null
}

export default function ParentsPortal() {
  const [tab, setTab]               = useState(0)
  const [selectedChild, setSelected] = useState(childrenData[0].id)

  const child          = childrenData.find(c => c.id === selectedChild)
  const childLogs      = initialAttendanceLogs.filter(l => l.childId === selectedChild)
  const childActivities = activitiesData.filter(a => a.group === 'All' || a.group === child?.group)

  return (
    <Box className="page-container">
      <Box className="page-header">
        <Box>
          <Typography variant="h5" fontWeight={700} color="text.primary">Parents Portal</Typography>
          <Typography variant="body2" color="text.secondary">View your child's information</Typography>
        </Box>
      </Box>

      {/* Child selector card */}
      <Card className="portal-child-card">
        <Box className="portal-child-inner">
          <Avatar className="portal-avatar">
            {child?.name?.[0] || <ChildCareIcon />}
          </Avatar>
          <Box className="portal-child-info">
            <Typography variant="caption" color="text.secondary" fontWeight={600}>
              VIEWING PROFILE FOR
            </Typography>
            <TextField
              select size="small" value={selectedChild}
              onChange={e => setSelected(Number(e.target.value))}
              sx={{ display: 'block', mt: 0.5, minWidth: 220 }}
            >
              {childrenData.map(c => (
                <MenuItem key={c.id} value={c.id}>{c.name}</MenuItem>
              ))}
            </TextField>
          </Box>
          {child && (
            <Box className="portal-chips">
              <Chip label={`Age ${child.age}`} size="small" variant="outlined" />
              <Chip label={child.group} size="small" color="primary" />
              {child.allergies && child.allergies !== 'None' && (
                <Chip label={`⚠ ${child.allergies}`} size="small" color="warning" />
              )}
            </Box>
          )}
        </Box>
      </Card>

      {/* Tabs */}
      <Box className="portal-tabs-wrap">
        <Tabs value={tab} onChange={(_, v) => setTab(v)}>
          <Tab label="Attendance" />
          <Tab label="Activities" />
          <Tab label="Meals" />
        </Tabs>
        <Divider />
      </Box>

      {/* Attendance */}
      <TabPanel value={tab} index={0}>
        <Box className="portal-table-wrap">
          <TableContainer component={Paper} elevation={0}>
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
                  <TableRow>
                    <TableCell colSpan={4} align="center" sx={{ py: 4, color: 'text.secondary' }}>
                      No attendance records found
                    </TableCell>
                  </TableRow>
                ) : childLogs.map(log => (
                  <TableRow key={log.id}>
                    <TableCell>{log.date}</TableCell>
                    <TableCell>{log.checkIn || '—'}</TableCell>
                    <TableCell>{log.checkOut || '—'}</TableCell>
                    <TableCell>
                      <Chip
                        label={log.status} size="small"
                        color={log.status === 'Present' ? 'success' : log.status === 'Checked In' ? 'primary' : 'error'}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </TabPanel>

      {/* Activities */}
      <TabPanel value={tab} index={1}>
        <Grid container spacing={2}>
          {childActivities.map(a => (
            <Grid item xs={12} sm={6} md={4} key={a.id}>
              <Card variant="outlined" sx={{ borderRadius: 2 }}>
                <CardContent sx={{ p: 2.5 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5 }}>
                    <Chip label={a.group} size="small" color="primary" variant="outlined" />
                    <Chip label={a.day} size="small" variant="outlined" />
                  </Box>
                  <Typography variant="subtitle2" fontWeight={700} color="text.primary" gutterBottom>
                    {a.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5, lineHeight: 1.5 }}>
                    {a.description}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <AccessTimeIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
                    <Typography variant="caption" color="text.secondary">
                      {a.time}{a.duration ? ` · ${a.duration}` : ''}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </TabPanel>

      {/* Meals */}
      <TabPanel value={tab} index={2}>
        <Box className="portal-table-wrap">
          <TableContainer component={Paper} elevation={0}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Day</TableCell>
                  <TableCell>Breakfast</TableCell>
                  <TableCell>Lunch</TableCell>
                  <TableCell>Snack</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {mealsData.map(m => (
                  <TableRow key={m.day}>
                    <TableCell className="meal-day-cell">{m.day}</TableCell>
                    <TableCell>{m.breakfast}</TableCell>
                    <TableCell>{m.lunch}</TableCell>
                    <TableCell>{m.snack}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </TabPanel>
    </Box>
  )
}
