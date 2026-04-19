import React, { useState } from 'react'
import {
  Box, Typography, Button, Card, CardContent,
  Grid, Chip, Alert, Snackbar
} from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import LoginIcon from '@mui/icons-material/Login'
import LogoutIcon from '@mui/icons-material/Logout'
import { childrenData, initialAttendanceLogs } from '../../data/mockData'
import '../../styles/pages.scss'

function getToday() {
  return new Date().toISOString().split('T')[0]
}
function getTime() {
  return new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })
}

export default function Attendance() {
  const [logs, setLogs] = useState(initialAttendanceLogs)
  const [snack, setSnack] = useState({ open: false, message: '', severity: 'success' })

  const today = getToday()

  const todayLogs = logs.filter(l => l.date === today)

  const getChildLog = (childId) => todayLogs.find(l => l.childId === childId)

  const handleCheckIn = (child) => {
    const existing = getChildLog(child.id)
    if (existing) {
      setSnack({ open: true, message: `${child.name} is already checked in today`, severity: 'warning' })
      return
    }
    const newLog = {
      id: Date.now(),
      childId: child.id,
      childName: child.name,
      date: today,
      checkIn: getTime(),
      checkOut: null,
      status: 'Checked In',
    }
    setLogs(prev => [...prev, newLog])
    setSnack({ open: true, message: `${child.name} checked in at ${newLog.checkIn}`, severity: 'success' })
  }

  const handleCheckOut = (child) => {
    const existing = getChildLog(child.id)
    if (!existing) {
      setSnack({ open: true, message: `${child.name} has not checked in yet`, severity: 'error' })
      return
    }
    if (existing.checkOut) {
      setSnack({ open: true, message: `${child.name} already checked out`, severity: 'warning' })
      return
    }
    const time = getTime()
    setLogs(prev => prev.map(l =>
      l.id === existing.id ? { ...l, checkOut: time, status: 'Present' } : l
    ))
    setSnack({ open: true, message: `${child.name} checked out at ${time}`, severity: 'info' })
  }

  const logColumns = [
    { field: 'childName', headerName: 'Child', flex: 1, minWidth: 150 },
    { field: 'date', headerName: 'Date', width: 120 },
    { field: 'checkIn', headerName: 'Check In', width: 110, renderCell: ({ value }) => value || '—' },
    { field: 'checkOut', headerName: 'Check Out', width: 110, renderCell: ({ value }) => value || '—' },
    {
      field: 'status', headerName: 'Status', width: 130,
      renderCell: ({ value }) => {
        const color = value === 'Present' ? 'success' : value === 'Checked In' ? 'primary' : 'error'
        return <Chip label={value} size="small" color={color} />
      },
    },
  ]

  return (
    <Box className="page-container">
      <Typography variant="h5" fontWeight={700} mb={3}>Attendance — {today}</Typography>

      {/* Quick Check-in/out panel */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="subtitle1" fontWeight={600} mb={2}>Quick Check-In / Check-Out</Typography>
          <Grid container spacing={1.5}>
            {childrenData.map(child => {
              const log = getChildLog(child.id)
              const checkedIn = !!log?.checkIn
              const checkedOut = !!log?.checkOut
              return (
                <Grid item xs={12} sm={6} md={4} lg={3} key={child.id}>
                  <Box sx={{
                    p: 1.5, border: '1px solid', borderColor: 'divider', borderRadius: 2,
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 1
                  }}>
                    <Box>
                      <Typography variant="body2" fontWeight={600} noWrap>{child.name}</Typography>
                      <Typography variant="caption" color="text.secondary">{child.group}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', gap: 0.5 }}>
                      <Button
                        size="small" variant={checkedIn ? 'outlined' : 'contained'}
                        color="success" startIcon={<LoginIcon />}
                        onClick={() => handleCheckIn(child)}
                        disabled={checkedIn}
                        sx={{ minWidth: 0, px: 1, fontSize: 11 }}
                      >
                        In
                      </Button>
                      <Button
                        size="small" variant={checkedOut ? 'outlined' : 'contained'}
                        color="warning" startIcon={<LogoutIcon />}
                        onClick={() => handleCheckOut(child)}
                        disabled={!checkedIn || checkedOut}
                        sx={{ minWidth: 0, px: 1, fontSize: 11 }}
                      >
                        Out
                      </Button>
                    </Box>
                  </Box>
                </Grid>
              )
            })}
          </Grid>
        </CardContent>
      </Card>

      {/* Logs */}
      <Typography variant="subtitle1" fontWeight={600} mb={1.5}>Attendance Logs</Typography>
      <Box sx={{ height: 400 }}>
        <DataGrid
          rows={logs} columns={logColumns}
          pageSizeOptions={[10, 25]}
          initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
          disableRowSelectionOnClick
          sx={{ border: 'none', bgcolor: 'background.paper', borderRadius: 3 }}
        />
      </Box>

      <Snackbar open={snack.open} autoHideDuration={3000} onClose={() => setSnack(s => ({ ...s, open: false }))} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert severity={snack.severity} onClose={() => setSnack(s => ({ ...s, open: false }))} sx={{ width: '100%' }}>
          {snack.message}
        </Alert>
      </Snackbar>
    </Box>
  )
}
