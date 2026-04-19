import React, { useState } from 'react'
import {
  Box, Typography, Button, Grid, Card, CardContent, CardActions,
  Chip, Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, MenuItem, Alert, Divider
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import GroupIcon from '@mui/icons-material/Group'
import { activitiesData as initial } from '../../data/mockData'
import ConfirmDialog from '../../components/common/ConfirmDialog'
import '../../styles/global.scss'

const GROUPS = ['All', 'Sunflowers', 'Butterflies', 'Rainbows']
const DAYS   = ['Daily', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
const empty  = { title: '', description: '', group: '', time: '', duration: '', day: '' }

const GROUP_COLORS = { All: 'default', Sunflowers: 'warning', Butterflies: 'secondary', Rainbows: 'info' }

function getErrors(f) {
  const e = {}
  if (!f.title.trim()) e.title = 'Title is required'
  if (!f.group)        e.group = 'Group is required'
  if (!f.time)         e.time  = 'Time is required'
  if (!f.day)          e.day   = 'Day is required'
  return e
}

export default function Activities() {
  const [activities, setActivities] = useState(initial)
  const [formOpen, setFormOpen]     = useState(false)
  const [editItem, setEditItem]     = useState(null)
  const [form, setForm]             = useState(empty)
  const [touched, setTouched]       = useState({})
  const [deleteId, setDeleteId]     = useState(null)
  const [success, setSuccess]       = useState(false)

  const openAdd  = () => { setEditItem(null); setForm(empty); setTouched({}); setSuccess(false); setFormOpen(true) }
  const openEdit = (a) => { setEditItem(a); setForm({ ...a }); setTouched({}); setSuccess(false); setFormOpen(true) }

  const handleChange = (e) => setForm(p => ({ ...p, [e.target.name]: e.target.value }))
  const handleBlur   = (e) => setTouched(p => ({ ...p, [e.target.name]: true }))

  const errors  = getErrors(form)
  const isValid = Object.keys(errors).length === 0

  const handleSave = () => {
    setTouched({ title: true, group: true, time: true, day: true })
    if (!isValid) return
    setSuccess(true)
    setTimeout(() => {
      if (editItem) setActivities(p => p.map(a => a.id === editItem.id ? { ...form, id: editItem.id } : a))
      else setActivities(p => [...p, { ...form, id: Date.now() }])
      setFormOpen(false)
    }, 600)
  }

  return (
    <Box className="page-container">
      <Box className="page-header">
        <Box>
          <Typography variant="h5" fontWeight={700} color="text.primary">Activities</Typography>
          <Typography variant="body2" color="text.secondary">{activities.length} activities scheduled</Typography>
        </Box>
        <Button variant="contained" startIcon={<AddIcon />} onClick={openAdd}>Add Activity</Button>
      </Box>

      <Grid container spacing={2.5}>
        {activities.map(a => (
          <Grid item xs={12} sm={6} md={4} key={a.id}>
            <Card className="activity-card">
              <Box className="activity-body">
                <Box className="activity-chips">
                  <Chip label={a.group} size="small" color={GROUP_COLORS[a.group] || 'default'} />
                  <Chip label={a.day} size="small" variant="outlined" />
                </Box>
                <Typography className="activity-title" color="text.primary">{a.title}</Typography>
                <Typography className="activity-desc" color="text.secondary">{a.description}</Typography>
                <Box className="activity-meta" color="text.secondary">
                  <AccessTimeIcon sx={{ fontSize: 15 }} />
                  <Typography variant="caption">{a.time}</Typography>
                  {a.duration && <>
                    <Typography variant="caption" sx={{ mx: 0.5 }}>·</Typography>
                    <Typography variant="caption">{a.duration}</Typography>
                  </>}
                </Box>
              </Box>
              <Divider />
              <Box className="activity-footer" sx={{ borderColor: 'divider' }}>
                <Button size="small" startIcon={<EditIcon />} onClick={() => openEdit(a)}>Edit</Button>
                <Button size="small" color="error" startIcon={<DeleteIcon />} onClick={() => setDeleteId(a.id)}>
                  Delete
                </Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Form Dialog */}
      <Dialog open={formOpen} onClose={() => setFormOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>{editItem ? 'Edit Activity' : 'Add Activity'}</DialogTitle>
        <DialogContent dividers>
          {success && <Alert severity="success" sx={{ mb: 2 }}>{editItem ? 'Activity updated!' : 'Activity added!'}</Alert>}
          <Grid container spacing={2} sx={{ pt: 1 }}>
            <Grid item xs={12}>
              <TextField fullWidth label="Title" name="title" value={form.title}
                onChange={handleChange} onBlur={handleBlur}
                error={touched.title && !!errors.title} helperText={touched.title ? errors.title : ' '} />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Description" name="description" value={form.description}
                onChange={handleChange} multiline rows={2} helperText=" " />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth select label="Group" name="group" value={form.group}
                onChange={handleChange} onBlur={handleBlur}
                error={touched.group && !!errors.group} helperText={touched.group ? errors.group : ' '}>
                {GROUPS.map(g => <MenuItem key={g} value={g}>{g}</MenuItem>)}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth select label="Day" name="day" value={form.day}
                onChange={handleChange} onBlur={handleBlur}
                error={touched.day && !!errors.day} helperText={touched.day ? errors.day : ' '}>
                {DAYS.map(d => <MenuItem key={d} value={d}>{d}</MenuItem>)}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Time" name="time" type="time" value={form.time}
                onChange={handleChange} onBlur={handleBlur}
                error={touched.time && !!errors.time} helperText={touched.time ? errors.time : ' '}
                InputLabelProps={{ shrink: true }} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Duration (e.g. 30 min)" name="duration" value={form.duration}
                onChange={handleChange} helperText=" " />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setFormOpen(false)} variant="outlined">Cancel</Button>
          <Button onClick={handleSave} variant="contained" disabled={success}>
            {editItem ? 'Save Changes' : 'Add Activity'}
          </Button>
        </DialogActions>
      </Dialog>

      <ConfirmDialog
        open={!!deleteId} title="Delete Activity"
        message="Are you sure you want to remove this activity?"
        onConfirm={() => { setActivities(p => p.filter(a => a.id !== deleteId)); setDeleteId(null) }}
        onCancel={() => setDeleteId(null)}
      />
    </Box>
  )
}
