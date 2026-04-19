import React from 'react'
import { IconButton, Tooltip, Stack } from '@mui/material'
import VisibilityIcon from '@mui/icons-material/Visibility'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import '../../styles/global.scss'

export default function ChildActions({ onView, onEdit, onDelete }) {
  return (
    <Stack direction="row" spacing={0.5} className="child-actions">
      <Tooltip title="View">
        <IconButton size="small" color="primary" onClick={onView}><VisibilityIcon fontSize="small" /></IconButton>
      </Tooltip>
      <Tooltip title="Edit">
        <IconButton size="small" color="info" onClick={onEdit}><EditIcon fontSize="small" /></IconButton>
      </Tooltip>
      <Tooltip title="Delete">
        <IconButton size="small" color="error" onClick={onDelete}><DeleteIcon fontSize="small" /></IconButton>
      </Tooltip>
    </Stack>
  )
}
