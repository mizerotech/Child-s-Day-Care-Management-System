import React, { useState, useEffect } from 'react'
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, Grid, TextField, MenuItem, Alert
} from '@mui/material'
import '../../styles/global.scss'

const ROLES    = ['Lead Teacher', 'Assistant Teacher', 'Aide', 'Nurse', 'Administrator']
const GROUPS   = ['Sunflowers', 'Butterflies', 'Rainbows', 'All']
const STATUSES = ['Active', 'On Leave', 'Inactive']
const emailRe  = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const empty    = { name: '', role: '', email: '', phone: '', group: '', startDate: '', status: 'Active' }

function getErrors(form) {
  const e = {}
  if (!form.name.trim())                   e.name      = 'Name is required'
  if (!form.role)                          e.role      = 'Role is required'
  if (!form.email.trim())                  e.email     = 'Email is required'
  else if (!emailRe.test(form.email))      e.email     = 'Enter a valid email address'
  if (!form.phone.trim())                  e.phone     = 'Phone is required'
  else if (!/^\d[\d\s\-().+]{6,}$/.test(form.phone)) e.phone = 'Enter a valid phone number'
  if (!form.group)                         e.group     = 'Group is required'
  if (!form.startDate)                     e.startDate = 'Start date is required'
  return e
}

export default function StaffForm({ open, onClose, onSave, initial }) {
  const [form, setForm]       = useState(empty)
  const [touched, setTouched] = useState({})
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    setForm(initial ? { ...initial } : empty)
    setTouched({})
    setSuccess(false)
  }, [initial, open])

  const errors  = getErrors(form)
  const isValid = Object.keys(errors).length === 0

  const handleChange = (e) => setForm(p => ({ ...p, [e.target.name]: e.target.value }))
  const handleBlur   = (e) => setTouched(p => ({ ...p, [e.target.name]: true }))

  const handleSubmit = () => {
    setTouched({ name: true, role: true, email: true, phone: true, group: true, startDate: true })
    if (!isValid) return
    setSuccess(true)
    setTimeout(() => onSave(form), 600)
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{initial ? 'Edit Staff Member' : 'Add Staff Member'}</DialogTitle>
      <DialogContent dividers>
        {success && <Alert severity="success" sx={{ mb: 2 }}>{initial ? 'Staff updated!' : 'Staff member added!'}</Alert>}
        <Grid container spacing={2} sx={{ pt: 1 }}>
          <Grid item xs={12}>
            <TextField fullWidth label="Full Name" name="name" value={form.name}
              onChange={handleChange} onBlur={handleBlur}
              error={touched.name && !!errors.name} helperText={touched.name ? errors.name : ' '} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth select label="Role" name="role" value={form.role}
              onChange={handleChange} onBlur={handleBlur}
              error={touched.role && !!errors.role} helperText={touched.role ? errors.role : ' '}>
              {ROLES.map(r => <MenuItem key={r} value={r}>{r}</MenuItem>)}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth select label="Group" name="group" value={form.group}
              onChange={handleChange} onBlur={handleBlur}
              error={touched.group && !!errors.group} helperText={touched.group ? errors.group : ' '}>
              {GROUPS.map(g => <MenuItem key={g} value={g}>{g}</MenuItem>)}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Email" name="email" value={form.email}
              onChange={handleChange} onBlur={handleBlur}
              error={touched.email && !!errors.email} helperText={touched.email ? errors.email : ' '} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Phone" name="phone" value={form.phone}
              onChange={handleChange} onBlur={handleBlur}
              error={touched.phone && !!errors.phone} helperText={touched.phone ? errors.phone : ' '} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Start Date" name="startDate" type="date" value={form.startDate}
              onChange={handleChange} onBlur={handleBlur}
              error={touched.startDate && !!errors.startDate} helperText={touched.startDate ? errors.startDate : ' '}
              InputLabelProps={{ shrink: true }} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth select label="Status" name="status" value={form.status} onChange={handleChange} helperText=" ">
              {STATUSES.map(s => <MenuItem key={s} value={s}>{s}</MenuItem>)}
            </TextField>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="outlined">Cancel</Button>
        <Button onClick={handleSubmit} variant="contained" disabled={success}>
          {initial ? 'Save Changes' : 'Add Staff'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
