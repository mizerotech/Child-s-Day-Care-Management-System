import React, { useState, useEffect } from 'react'
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, Grid, TextField, MenuItem, Box, Avatar, Typography, IconButton
} from '@mui/material'
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera'
import '../../styles/global.scss'

const GROUPS = ['Sunflowers', 'Butterflies', 'Rainbows']
const MAX_SIZE = 2 * 1024 * 1024 // 2MB

const empty = { name: '', age: '', guardian: '', phone: '', email: '', allergies: '', group: '', image: null }

function validate(form) {
  const errors = {}
  if (!form.name.trim()) errors.name = 'Name is required'
  if (!form.age || isNaN(form.age) || form.age < 1 || form.age > 12) errors.age = 'Age must be 1–12'
  if (!form.guardian.trim()) errors.guardian = 'Guardian name is required'
  if (!form.phone.trim()) errors.phone = 'Phone is required'
  else if (!/^\d{3}-\d{4}$|^\d{10}$|^\d{3}-\d{3}-\d{4}$/.test(form.phone)) errors.phone = 'Invalid phone format'
  if (!form.email.trim()) errors.email = 'Email is required'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errors.email = 'Invalid email'
  if (!form.group) errors.group = 'Group is required'
  return errors
}

export default function ChildForm({ open, onClose, onSave, initial }) {
  const [form, setForm] = useState(empty)
  const [errors, setErrors] = useState({})
  const [imageError, setImageError] = useState('')

  useEffect(() => {
    setForm(initial ? { ...initial } : empty)
    setErrors({})
    setImageError('')
  }, [initial, open])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }))
  }

  const handleImage = (e) => {
    const file = e.target.files[0]
    if (!file) return
    setImageError('')
    if (!['image/jpeg', 'image/png'].includes(file.type)) {
      setImageError('Only JPG and PNG files are allowed')
      return
    }
    if (file.size > MAX_SIZE) {
      setImageError('File size must be under 2MB')
      return
    }
    const reader = new FileReader()
    reader.onload = (ev) => setForm(prev => ({ ...prev, image: ev.target.result }))
    reader.readAsDataURL(file)
  }

  const handleSubmit = () => {
    const errs = validate(form)
    if (Object.keys(errs).length) { setErrors(errs); return }
    onSave({ ...form, age: Number(form.age) })
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{initial ? 'Edit Child' : 'Add New Child'}</DialogTitle>
      <DialogContent dividers className="child-form">
        <Box className="image-upload-section">
          <Box className="image-preview">
            <Avatar src={form.image || undefined} className="child-avatar" color="primary">
              {form.name ? form.name[0].toUpperCase() : '?'}
            </Avatar>
            <IconButton component="label" className="upload-button" color="primary">
              <PhotoCameraIcon fontSize="small" />
              <input type="file" accept="image/jpeg,image/png" hidden onChange={handleImage} />
            </IconButton>
          </Box>
          {imageError && <Typography variant="caption" color="error" className="upload-error">{imageError}</Typography>}
          <Typography variant="caption" color="text.secondary" className="upload-hint">JPG/PNG, max 2MB</Typography>
        </Box>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={8}>
            <TextField fullWidth label="Full Name" name="name" value={form.name} onChange={handleChange} error={!!errors.name} helperText={errors.name} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField fullWidth label="Age" name="age" type="number" value={form.age} onChange={handleChange} error={!!errors.age} helperText={errors.age} inputProps={{ min: 1, max: 12 }} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Guardian Name" name="guardian" value={form.guardian} onChange={handleChange} error={!!errors.guardian} helperText={errors.guardian} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Phone" name="phone" value={form.phone} onChange={handleChange} error={!!errors.phone} helperText={errors.phone} placeholder="555-0101" />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth label="Email" name="email" value={form.email} onChange={handleChange} error={!!errors.email} helperText={errors.email} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth select label="Group" name="group" value={form.group} onChange={handleChange} error={!!errors.group} helperText={errors.group}>
              {GROUPS.map(g => <MenuItem key={g} value={g}>{g}</MenuItem>)}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Allergies" name="allergies" value={form.allergies} onChange={handleChange} placeholder="None" />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions className="confirm-dialog-actions">
        <Button onClick={onClose} variant="outlined">Cancel</Button>
        <Button onClick={handleSubmit} variant="contained">{initial ? 'Save Changes' : 'Add Child'}</Button>
      </DialogActions>
    </Dialog>
  )
}
