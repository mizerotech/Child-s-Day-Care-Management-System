import React, { useState } from 'react'
import {
  Box, Typography, Button, Grid, Card, CardContent,
  CardActions, Chip, Dialog, DialogTitle, DialogContent,
  DialogActions, TextField, MenuItem
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import { activitiesData as initial } from '../../data/mockData'
import ConfirmDialog from '../../components/common/ConfirmDialog'
import '../../styles/pages.scss'

const GROUPS = ['All', 'Sunflowers', 'Butterflies', 'Rainbows']
const DAYS = ['Daily', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
const empty = { title: '', description: '', group: '', time: '', duration: '', day: '' }

function validate(f) {
  const e = {}
  if (!f.title.trim()) e.title = 'Title is required'
  if (!f.group) e.group = 'Group is required'
  if (!f.time) e.time = 'Time is required'
  if (!f.day) e.day = 'Day is required'
  return e
}

const GROUP_COLORS = { All: 'default', Sunflowers: 'warning', Butterflies: 'secondary', Rainbows: 'info' }

export default function Activities() {
  const [activities, setActivities] = useState(initial)
  const [formOpen, setFormOpen] = useState(false)
  const [editItem, setEditItem] = useState(null)
  const [form, setForm] = useState(empty)
  const [errors, setErrors] = useState({})
  const [deleteId, setDeleteId] = useState(null)

  const openAdd = () => { setEditItem(null); setForm(empty); setErrors({}); setFormOpen(true) }
  const openEdit = (a) => { setEditItem(a); setForm({ ...a }); setErrors({}); setFormOpen(true) }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(p => ({ ...p, [name]: value }))
    if (errors[name]) setErrors(p => ({ ...p, [name]: '' }))
  }

  const handleSave = () => {
    const errs = validate(form)
    if (Object.keys(errs).length) { setErrors(errs); return }
    if (editItem) setActivities(p => p.map(a => a.id === editItem.id ? { ...form, id: editItem.id } : a))
    else setActivities(p => [...p, { ...form, id: Date.now() }])
    setFormOpen(false)
  }

  return (
    <Box className="page-container">
      <Box className="page-header">
        <Typography variant="h5" fontWeight={700}>Activities</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={openAdd}>Add Activity</Button>
      </Box>

      <Grid container spacing={2}>
        {activities.map(a => (
          <Grid item xs={12} sm={6} md={4} key={a.id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flex: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Chip label={a.group} size="small" color={GROUP_COLORS[a.group] || 'default'} />
                  <Chip label={a.day} size="small" variant="outlined" />
                </Box>
                <Typography variant="subtitle1" fontWeight={600}>{a.title}</Typography>
                <Typography variant="body2" color="text.secondary" mt={0.5}>{a.description}</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 1.5 }}>
                  <AccessTimeIcon fontSize="small" color="action" />
                  <Typography variant="caption" color="text.secondary">{a.time} · {a.duration}</Typography>
                </Box>
              </CardContent>
              <CardActions sx={{ px: 2, pb: 1.5 }}>
                <Button size="small" startIcon={<EditIcon />} onClick={() => openEdit(a)}>Edit</Button>
                <Button size="small" color="error" startIcon={<DeleteIcon />} onClick={() => setDeleteId(a.id)}>Delete</Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Form Dialog */}
      <Dialog open={formOpen} onClose={() => setFormOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>{editItem ? 'Edit Activity' : 'Add Activity'}</DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2} sx={{ pt: 1 }}>
            <Grid item xs={12}>
              <TextField fullWidth label="Title" name="title" value={form.title} onChange={handleChange} error={!!errors.title} helperText={errors.title} />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Description" name="description" value={form.description} onChange={handleChange} multiline rows={2} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth select label="Group" name="group" value={form.group} onChange={handleChange} error={!!errors.group} helperText={errors.group}>
                {GROUPS.map(g => <MenuItem key={g} value={g}>{g}</MenuItem>)}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth select label="Day" name="day" value={form.day} onChange={handleChange} error={!!errors.day} helperText={errors.day}>
                {DAYS.map(d => <MenuItem key={d} value={d}>{d}</MenuItem>)}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Time" name="time" type="time" value={form.time} onChange={handleChange} error={!!errors.time} helperText={errors.time} InputLabelProps={{ shrink: true }} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Duration (e.g. 30 min)" name="duration" value={form.duration} onChange={handleChange} />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={() => setFormOpen(false)} variant="outlined">Cancel</Button>
          <Button onClick={handleSave} variant="contained">{editItem ? 'Save' : 'Add'}</Button>
        </DialogActions>
      </Dialog>

      <ConfirmDialog
        open={!!deleteId} title="Delete Activity"
        message="Remove this activity?"
        onConfirm={() => { setActivities(p => p.filter(a => a.id !== deleteId)); setDeleteId(null) }}
        onCancel={() => setDeleteId(null)}
      />
    </Box>
  )
}
