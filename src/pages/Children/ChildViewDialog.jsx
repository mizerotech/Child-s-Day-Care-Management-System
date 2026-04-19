import React from 'react'
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, Avatar, Box, Typography, Chip, Divider, Grid
} from '@mui/material'
import '../../styles/global.scss'

export default function ChildViewDialog({ open, child, onClose }) {
  if (!child) return null
  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth className="child-view-dialog">
      <DialogTitle>Child Profile</DialogTitle>
      <DialogContent dividers>
        <Box className="profile-header">
          <Avatar src={child.image || undefined} className="profile-avatar" color="primary">
            {child.name[0]}
          </Avatar>
          <Typography variant="h6" fontWeight={700}>{child.name}</Typography>
          <Chip label={child.group} size="small" color="primary" className="profile-group" />
        </Box>
        <Divider className="profile-divider" />
        <Grid container spacing={1.5} className="profile-info">
          {[
            ['Age', `${child.age} years`],
            ['Guardian', child.guardian],
            ['Phone', child.phone],
            ['Email', child.email],
            ['Allergies', child.allergies || 'None'],
          ].map(([label, value]) => (
            <Grid item xs={12} key={label}>
              <Box className="info-row">
                <Typography variant="body2" color="text.secondary">{label}</Typography>
                <Typography variant="body2" fontWeight={500}>{value}</Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </DialogContent>
      <DialogActions className="confirm-dialog-actions">
        <Button onClick={onClose} variant="contained" fullWidth>Close</Button>
      </DialogActions>
    </Dialog>
  )
}
