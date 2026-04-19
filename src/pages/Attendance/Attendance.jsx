import React, { useState } from 'react'
import {
  Box, Typography, Button, Card, CardContent,
  Chip, Alert, Snackbar, Divider
} from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import LoginIcon from '@mui/icons-material/Login'
import LogoutIcon from '@mui/icons-material/Logout'
import PeopleIcon from '@mui/icons-material/People'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import { childrenData, initialAttendanceLogs } from '../../data/mockData'
import '../../styles/global.scss'

const getToday = () => new Date().toISOString().split('T')[0]
const getTime  = () => new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })

export default function Attendance() {
  const [logs, setLogs]   = useState(initialAttendanceLogs)
  const [snack, setSnack] = useState({ open: false, message: '', severity: 'success' })

  const today     = getToday()
  const todayLogs = logs.filter(l => l.date === today)
  const getLog    = (childId) => todayLogs.find(l => l.childId === childId)

  const presentCount  = todayLogs.filter(l => l.checkIn).length
  const checkedOut    = todayLogs.filter(l => l.checkOut).length

  const notify = (message, severity) => setSnack({ open: true, message, severity })

  const handleCheckIn = (child) => {
    const log = getLog(child.id)
    if (log) {
      notify(`${child.name} is already checked in today`, 'warning')
      return
    }
    const time = getTime()
    setLogs(p => [...p, {
      id: Date.now(),
      childId: child.id,
      childName: child.name,
      date: today,
      checkIn: time,
      checkOut: null,
      status: 'Checked In',
    }])
    notify(`${child.name} checked in at ${time}`, 'success')
  }

  const handleCheckOut = (child) => {
    const log = getLog(child.id)
    if (!log) {
      notify(`${child.name} hasn't checked in yet`, 'error')
      return
    }
    if (log.checkOut) {
      notify(`${child.name} already checked out`, 'warning')
      return
    }
    const time = getTime()
    setLogs(p => p.map(l => l.id === log.id ? { ...l, checkOut: time, status: 'Present' } : l))
    notify(`${child.name} checked out at ${time}`, 'info')
  }

  const logColumns = [
    { field: 'childName', headerName: 'Child', flex: 1, minWidth: 150 },
    { field: 'date', headerName: 'Date', width: 120 },
    { field: 'checkIn', headerName: 'Check In', width: 110, renderCell: ({ value }) => value || '—' },
    { field: 'checkOut', headerName: 'Check Out', width: 110, renderCell: ({ value }) => value || '—' },
    {
      field: 'status', headerName: 'Status', width: 130,
      renderCell: ({ value }) => (
        <Chip
          label={value}
          size="small"
          color={value === 'Present' ? 'success' : value === 'Checked In' ? 'primary' : 'error'}
        />
      ),
    },
  ]

  return (
    <Box className="page-container">
      <Box className="page-header">
        <Box>
          <Typography variant="h5" fontWeight={700} color="text.primary">Attendance</Typography>
          <Typography variant="body2" color="text.secondary">{today}</Typography>
        </Box>
      </Box>

      <Box className="attendance-stats">
        <Card>
          <CardContent sx={{ textAlign: 'center', py: 2.5 }}>
            <PeopleIcon sx={{ color: 'primary.main', mb: 0.5 }} />
            <Typography variant="h4" fontWeight={800} color="text.primary">{childrenData.length}</Typography>
            <Typography variant="body2" color="text.secondary">Total Children</Typography>
          </CardContent>
        </Card>
        <Card>
          <CardContent sx={{ textAlign: 'center', py: 2.5 }}>
            <CheckCircleIcon sx={{ color: 'success.main', mb: 0.5 }} />
            <Typography variant="h4" fontWeight={800} color="success.main">{presentCount}</Typography>
            <Typography variant="body2" color="text.secondary">Checked In Today</Typography>
          </CardContent>
        </Card>
        <Card>
          <CardContent sx={{ textAlign: 'center', py: 2.5 }}>
            <AccessTimeIcon sx={{ color: 'warning.main', mb: 0.5 }} />
            <Typography variant="h4" fontWeight={800} color="warning.main">{checkedOut}</Typography>
            <Typography variant="body2" color="text.secondary">Checked Out</Typography>
          </CardContent>
        </Card>
      </Box>

      <Card sx={{ mb: 3 }}>
        <CardContent sx={{ p: 3 }}>
          <Typography variant="subtitle1" fontWeight={700} color="text.primary" gutterBottom>
            Quick Check-In / Check-Out
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Click In/Out buttons to record attendance for each child.
          </Typography>
          <Box className="checkin-grid">
            {childrenData.map(child => {
              const log = getLog(child.id)
              const checkedIn = !!log?.checkIn
              const doneOut = !!log?.checkOut
              const statusCls = doneOut ? 'status-out' : checkedIn ? 'status-in' : 'status-absent'

              return (
                <Box key={child.id} className={`checkin-card ${statusCls}`}>
                  <Box className="checkin-info">
                    <Typography className="checkin-name" color="text.primary">{child.name}</Typography>
                    <Typography className="checkin-group" color="text.secondary">{child.group}</Typography>
                    {log?.checkIn && (
                      <Typography className="checkin-time">
                        In: {log.checkIn}{log.checkOut ? ` · Out: ${log.checkOut}` : ''}
                      </Typography>
                    )}
                  </Box>
                  <Box className="checkin-actions">
                    <Button
                      size="small" variant={checkedIn ? 'outlined' : 'contained'}
                      color="success" onClick={() => handleCheckIn(child)}
                      disabled={checkedIn}
                      sx={{ minWidth: 44, px: 1, fontSize: '0.75rem' }}
                    >
                      <LoginIcon sx={{ fontSize: 14 }} />
                    </Button>
                    <Button
                      size="small" variant={doneOut ? 'outlined' : 'contained'}
                      color="warning" onClick={() => handleCheckOut(child)}
                      disabled={!checkedIn || doneOut}
                      sx={{ minWidth: 44, px: 1, fontSize: '0.75rem' }}
                    >
                      <LogoutIcon sx={{ fontSize: 14 }} />
                    </Button>
                  </Box>
                </Box>
              )
            })}
          </Box>
        </CardContent>
      </Card>

      <Typography variant="subtitle1" fontWeight={700} color="text.primary" gutterBottom>
        Attendance Logs
      </Typography>
      <Box className="grid-wrapper h-420" sx={{ bgcolor: 'background.paper' }}>
        <DataGrid
          rows={logs} columns={logColumns}
          pageSizeOptions={[10, 25]}
          initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
          disableRowSelectionOnClick
        />
      </Box>

      <Snackbar
        open={snack.open}
        autoHideDuration={3000}
        onClose={() => setSnack(s => ({ ...s, open: false }))}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          severity={snack.severity}
          onClose={() => setSnack(s => ({ ...s, open: false }))}
          sx={{ borderRadius: 2, fontWeight: 500 }}
        >
          {snack.message}
        </Alert>
      </Snackbar>
    </Box>
  )
}
