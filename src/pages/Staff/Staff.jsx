import React, { useState } from 'react'
import { Box, Button, Typography, Chip } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { DataGrid } from '@mui/x-data-grid'
import { staffData as initial } from '../../data/mockData'
import StaffForm from './StaffForm'
import ConfirmDialog from '../../components/common/ConfirmDialog'
import ChildActions from '../Children/ChildActions'
import '../../styles/global.scss'

export default function Staff() {
  const [rows, setRows]           = useState(initial)
  const [formOpen, setFormOpen]   = useState(false)
  const [editStaff, setEditStaff] = useState(null)
  const [deleteId, setDeleteId]   = useState(null)

  const handleAdd  = () => { setEditStaff(null); setFormOpen(true) }
  const handleEdit = (s) => { setEditStaff(s); setFormOpen(true) }

  const handleSave = (data) => {
    if (editStaff) setRows(p => p.map(r => r.id === data.id ? data : r))
    else setRows(p => [...p, { ...data, id: Date.now() }])
    setFormOpen(false)
  }

  const columns = [
    { field: 'name',      headerName: 'Name',       flex: 1, minWidth: 160 },
    { field: 'role',      headerName: 'Role',        width: 160 },
    { field: 'group',     headerName: 'Group',       width: 120 },
    { field: 'email',     headerName: 'Email',       flex: 1, minWidth: 180 },
    { field: 'phone',     headerName: 'Phone',       width: 130 },
    { field: 'startDate', headerName: 'Start Date',  width: 120 },
    {
      field: 'status', headerName: 'Status', width: 120,
      renderCell: ({ value }) => (
        <Chip
          label={value}
          size="small"
          color={value === 'Active' ? 'success' : value === 'On Leave' ? 'warning' : 'default'}
        />
      ),
    },
    {
      field: 'actions', headerName: 'Actions', width: 130, sortable: false,
      renderCell: ({ row }) => (
        <ChildActions
          onView={() => {}}
          onEdit={() => handleEdit(row)}
          onDelete={() => setDeleteId(row.id)}
        />
      ),
    },
  ]

  return (
    <Box className="page-container">
      <Box className="page-header">
        <Box>
          <Typography variant="h5" fontWeight={700} color="text.primary">Staff</Typography>
          <Typography variant="body2" color="text.secondary">{rows.length} staff members</Typography>
        </Box>
        <Button variant="contained" startIcon={<AddIcon />} onClick={handleAdd}>Add Staff</Button>
      </Box>

      <Box className="grid-wrapper h-480" sx={{ bgcolor: 'background.paper' }}>
        <DataGrid
          rows={rows} columns={columns}
          pageSizeOptions={[5, 10]}
          initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
          disableRowSelectionOnClick
        />
      </Box>

      <StaffForm open={formOpen} onClose={() => setFormOpen(false)} onSave={handleSave} initial={editStaff} />
      <ConfirmDialog
        open={!!deleteId} title="Remove Staff Member"
        message="Are you sure you want to remove this staff member? This action cannot be undone."
        onConfirm={() => { setRows(p => p.filter(r => r.id !== deleteId)); setDeleteId(null) }}
        onCancel={() => setDeleteId(null)}
      />
    </Box>
  )
}
