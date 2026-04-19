import React, { useState, useEffect } from 'react'
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, Grid, TextField, MenuItem
} from '@mui/material'
import '../../styles/global.scss'

const ROLES = ['Lead Teacher', 'Assistant Teacher', 'Aide', 'Nurse', 'Administrator']
const GROUPS = ['Sunflowers', 'Butterflies', 'Rainbows', 'All']
const STATUSES = ['Active', 'On Leave', 'Inactive']

const empty = { name: '', role: '', email: '', phone: '', group: '', startDate: '', status: 'Active' }

function validate(form) {
  const errors = {}
  if (!form.name.trim()) errors.name = 'Name is required'
  if (!form.role) errors.role = 'Role is required'
  if (!form.email.trim()) errors.email = 'Email is required'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errors.email = 'Invalid email'
  if (!form.phone.trim()) errors.phone = 'Phone is required'
  if (!form.group) errors.group = 'Group is required'
  if (!form.startDate) errors.startDate = 'Start date is required'
  return errors
}

export default function StaffForm({ open, onClose, onSave, initial }) {
  const [form, setForm] = useState(empty)
  const [errors, setErrors] = useState({})

  useEffect(() => {
    setForm(initial ? { ...initial } : empty)
    setErrors({})
  }, [initial, open])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }))
  }

  const handleSubmit = () => {
    const errs = validate(form)
    if (Object.keys(errs).length) { setErrors(errs); return }
    onSave(form)
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{initial ? 'Edit Staff Member' : 'Add Staff Member'}</DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={2} className="staff-form-content">
          <Grid item xs={12}>
            <TextField fullWidth label="Full Name" name="name" value={form.name} onChange={handleChange} error={!!errors.name} helperText={errors.name} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth select label="Role" name="role" value={form.role} onChange={handleChange} error={!!errors.role} helperText={errors.role}>
              {ROLES.map(r => <MenuItem key={r} value={r}>{r}</MenuItem>)}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth select label="Group" name="group" value={form.group} onChange={handleChange} error={!!errors.group} helperText={errors.group}>
              {GROUPS.map(g => <MenuItem key={g} value={g}>{g}</MenuItem>)}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Email" name="email" value={form.email} onChange={handleChange} error={!!errors.email} helperText={errors.email} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Phone" name="phone" value={form.phone} onChange={handleChange} error={!!errors.phone} helperText={errors.phone} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Start Date" name="startDate" type="date" value={form.startDate} onChange={handleChange} error={!!errors.startDate} helperText={errors.startDate} InputLabelProps={{ shrink: true }} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth select label="Status" name="status" value={form.status} onChange={handleChange}>
              {STATUSES.map(s => <MenuItem key={s} value={s}>{s}</MenuItem>)}
            </TextField>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions className="staff-form-actions">
        <Button onClick={onClose} variant="outlined">Cancel</Button>
        <Button onClick={handleSubmit} variant="contained">{initial ? 'Save Changes' : 'Add Staff'}</Button>
      </DialogActions>
    </Dialog>
  )
}
