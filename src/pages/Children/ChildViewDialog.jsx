import React from 'react'
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, Avatar, Box, Typography, Chip, Divider
} from '@mui/material'
import '../../styles/global.scss'

const fields = [
  { label: 'Age',      key: 'age',      fmt: v => `${v} years old` },
  { label: 'Guardian', key: 'guardian' },
  { label: 'Phone',    key: 'phone' },
  { label: 'Email',    key: 'email' },
  { label: 'Allergies',key: 'allergies', fmt: v => v || 'None' },
]

export default function ChildViewDialog({ open, child, onClose }) {
  if (!child) return null

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>Child Profile</DialogTitle>
      <DialogContent dividers>
        {/* Profile header */}
        <Box className="child-view-profile">
          <Avatar
            src={child.image || undefined}
            className="view-avatar"
            sx={{ bgcolor: 'primary.main' }}
          >
            {child.name[0]}
          </Avatar>
          <Typography className="view-name" color="text.primary">{child.name}</Typography>
          <Chip label={child.group} size="small" color="primary" className="view-group" />
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* Info rows */}
        {fields.map(({ label, key, fmt }) => (
          <Box key={key} className="view-info-row">
            <Typography className="info-label" color="text.secondary">{label}</Typography>
            <Typography className="info-value" color="text.primary">
              {fmt ? fmt(child[key]) : child[key] || '—'}
            </Typography>
          </Box>
        ))}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="contained" fullWidth>Close</Button>
      </DialogActions>
    </Dialog>
  )
}
