import React, { useState } from 'react'
import { Box, Button, Typography, Chip } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { DataGrid } from '@mui/x-data-grid'
import { staffData as initial } from '../../data/mockData'
import StaffForm from './StaffForm'
import ConfirmDialog from '../../components/common/ConfirmDialog'
import ChildActions from '../Children/ChildActions'
import '../../styles/pages.scss'
import '../../styles/global.scss'

export default function Staff() {
  const [rows, setRows] = useState(initial)
  const [formOpen, setFormOpen] = useState(false)
  const [editStaff, setEditStaff] = useState(null)
  const [deleteId, setDeleteId] = useState(null)

  const handleAdd = () => { setEditStaff(null); setFormOpen(true) }
  const handleEdit = (s) => { setEditStaff(s); setFormOpen(true) }

  const handleSave = (data) => {
    if (editStaff) setRows(prev => prev.map(r => r.id === data.id ? data : r))
    else setRows(prev => [...prev, { ...data, id: Date.now() }])
    setFormOpen(false)
  }

  const handleDeleteConfirm = () => {
    setRows(prev => prev.filter(r => r.id !== deleteId))
    setDeleteId(null)
  }

  const columns = [
    { field: 'name', headerName: 'Name', flex: 1, minWidth: 160 },
    { field: 'role', headerName: 'Role', width: 160 },
    { field: 'group', headerName: 'Group', width: 120 },
    { field: 'email', headerName: 'Email', flex: 1, minWidth: 180 },
    { field: 'phone', headerName: 'Phone', width: 130 },
    { field: 'startDate', headerName: 'Start Date', width: 120 },
    {
      field: 'status', headerName: 'Status', width: 110,
      renderCell: ({ value }) => (
        <Chip label={value} size="small" color={value === 'Active' ? 'success' : 'warning'} />
      ),
    },
    {
      field: 'actions', headerName: 'Actions', width: 140, sortable: false,
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
        <Typography variant="h5" fontWeight={700}>Staff</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={handleAdd}>Add Staff</Button>
      </Box>
      <Box className="datagrid-container staff-grid">
        <DataGrid
          rows={rows} columns={columns}
          pageSizeOptions={[5, 10]}
          initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
          disableRowSelectionOnClick
        />
      </Box>
      <StaffForm open={formOpen} onClose={() => setFormOpen(false)} onSave={handleSave} initial={editStaff} />
      <ConfirmDialog
        open={!!deleteId} title="Remove Staff"
        message="Are you sure you want to remove this staff member?"
        onConfirm={handleDeleteConfirm} onCancel={() => setDeleteId(null)}
      />
    </Box>
  )
}
