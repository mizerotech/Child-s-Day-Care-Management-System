import React, { useState, useEffect } from 'react'
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, Grid, TextField, MenuItem, Box, Avatar, Typography, IconButton, Alert
} from '@mui/material'
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera'
import '../../styles/global.scss'

const GROUPS   = ['Sunflowers', 'Butterflies', 'Rainbows']
const MAX_SIZE = 2 * 1024 * 1024
const empty    = { name: '', age: '', guardian: '', phone: '', email: '', allergies: '', group: '', image: null }

const phoneRe = /^\d{3}-\d{4}$|^\d{10}$|^\d{3}-\d{3}-\d{4}$/
const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function getErrors(form) {
  const e = {}
  if (!form.name.trim())                                    e.name     = 'Name is required'
  if (!form.age || isNaN(form.age) || +form.age < 1 || +form.age > 12) e.age  = 'Age must be between 1 and 12'
  if (!form.guardian.trim())                                e.guardian = 'Guardian name is required'
  if (!form.phone.trim())                                   e.phone    = 'Phone is required'
  else if (!phoneRe.test(form.phone))                       e.phone    = 'Use format: 555-0101 or 5550101234'
  if (!form.email.trim())                                   e.email    = 'Email is required'
  else if (!emailRe.test(form.email))                       e.email    = 'Enter a valid email address'
  if (!form.group)                                          e.group    = 'Please select a group'
  return e
}

export default function ChildForm({ open, onClose, onSave, initial }) {
  const [form, setForm]         = useState(empty)
  const [touched, setTouched]   = useState({})
  const [imageError, setImageError] = useState('')
  const [success, setSuccess]   = useState(false)

  useEffect(() => {
    setForm(initial ? { ...initial } : empty)
    setTouched({})
    setImageError('')
    setSuccess(false)
  }, [initial, open])

  const errors  = getErrors(form)
  const isValid = Object.keys(errors).length === 0

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(p => ({ ...p, [name]: value }))
  }

  const handleBlur = (e) => setTouched(p => ({ ...p, [e.target.name]: true }))

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
    reader.onload = (ev) => setForm(p => ({ ...p, image: ev.target.result }))
    reader.readAsDataURL(file)
  }

  const handleSubmit = () => {
    setTouched({ name: true, age: true, guardian: true, phone: true, email: true, group: true })
    if (!isValid) return
    setSuccess(true)
    setTimeout(() => {
      onSave({ ...form, age: Number(form.age) })
    }, 600)
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{initial ? 'Edit Child' : 'Add New Child'}</DialogTitle>
      <DialogContent dividers>
        {success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {initial ? 'Child updated successfully!' : 'Child added successfully!'}
          </Alert>
        )}

        {/* Image Upload */}
        <Box className="child-form-upload">
          <Box className="upload-avatar-wrap">
            <Avatar
              src={form.image || undefined}
              className="upload-avatar"
              sx={{ bgcolor: 'primary.main' }}
            >
              {form.name ? form.name[0].toUpperCase() : '?'}
            </Avatar>
            <Button
              component="label"
              variant="contained"
              size="small"
              className="upload-btn"
              color="primary"
            >
              <PhotoCameraIcon sx={{ fontSize: 14 }} />
              <input type="file" accept="image/jpeg,image/png" hidden onChange={handleImage} />
            </Button>
          </Box>
          {imageError
            ? <Typography className="upload-error" color="error">{imageError}</Typography>
            : <Typography className="upload-hint" color="text.secondary">JPG or PNG, max 2MB</Typography>
          }
        </Box>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={8}>
            <TextField
              fullWidth label="Full Name" name="name" value={form.name}
              onChange={handleChange} onBlur={handleBlur}
              error={touched.name && !!errors.name}
              helperText={touched.name ? errors.name : ' '}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth label="Age" name="age" type="number" value={form.age}
              onChange={handleChange} onBlur={handleBlur}
              error={touched.age && !!errors.age}
              helperText={touched.age ? errors.age : ' '}
              inputProps={{ min: 1, max: 12 }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth label="Guardian Name" name="guardian" value={form.guardian}
              onChange={handleChange} onBlur={handleBlur}
              error={touched.guardian && !!errors.guardian}
              helperText={touched.guardian ? errors.guardian : ' '}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth label="Phone" name="phone" value={form.phone}
              onChange={handleChange} onBlur={handleBlur}
              error={touched.phone && !!errors.phone}
              helperText={touched.phone ? errors.phone : ' '}
              placeholder="555-0101"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth label="Email" name="email" value={form.email}
              onChange={handleChange} onBlur={handleBlur}
              error={touched.email && !!errors.email}
              helperText={touched.email ? errors.email : ' '}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth select label="Group" name="group" value={form.group}
              onChange={handleChange} onBlur={handleBlur}
              error={touched.group && !!errors.group}
              helperText={touched.group ? errors.group : ' '}
            >
              {GROUPS.map(g => <MenuItem key={g} value={g}>{g}</MenuItem>)}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth label="Allergies" name="allergies" value={form.allergies}
              onChange={handleChange} placeholder="None"
              helperText=" "
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="outlined">Cancel</Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={success}
        >
          {initial ? 'Save Changes' : 'Add Child'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
