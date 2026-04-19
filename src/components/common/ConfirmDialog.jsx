import React from 'react'
import {
  Dialog, DialogTitle, DialogContent, DialogContentText,
  DialogActions, Button, Box
} from '@mui/material'
import WarningAmberIcon from '@mui/icons-material/WarningAmber'
import '../../styles/global.scss'

export default function ConfirmDialog({ open, title, message, onConfirm, onCancel }) {
  return (
    <Dialog open={open} onClose={onCancel} maxWidth="xs" fullWidth>
      <DialogTitle>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <WarningAmberIcon color="error" />
          {title}
        </Box>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>{message}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel} variant="outlined">Cancel</Button>
        <Button onClick={onConfirm} variant="contained" color="error">Delete</Button>
      </DialogActions>
    </Dialog>
  )
}
