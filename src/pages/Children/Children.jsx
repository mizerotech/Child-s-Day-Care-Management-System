import React, { useState } from 'react'
import { Box, Button, Typography, Chip } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { DataGrid } from '@mui/x-data-grid'
import { childrenData as initial } from '../../data/mockData'
import ChildForm from './ChildForm'
import ChildViewDialog from './ChildViewDialog'
import ConfirmDialog from '../../components/common/ConfirmDialog'
import ChildActions from './ChildActions'
import '../../styles/global.scss'

export default function Children() {
  const [rows, setRows]         = useState(initial)
  const [formOpen, setFormOpen] = useState(false)
  const [editChild, setEditChild] = useState(null)
  const [viewChild, setViewChild] = useState(null)
  const [deleteId, setDeleteId]   = useState(null)

  const handleAdd    = () => { setEditChild(null); setFormOpen(true) }
  const handleEdit   = (c) => { setEditChild(c); setFormOpen(true) }
  const handleView   = (c) => setViewChild(c)
  const handleDelete = (id) => setDeleteId(id)

  const handleSave = (data) => {
    if (editChild) setRows(p => p.map(r => r.id === data.id ? data : r))
    else setRows(p => [...p, { ...data, id: Date.now() }])
    setFormOpen(false)
  }

  const handleDeleteConfirm = () => {
    setRows(p => p.filter(r => r.id !== deleteId))
    setDeleteId(null)
  }

  const columns = [
    { field: 'name',     headerName: 'Name',     flex: 1, minWidth: 150 },
    { field: 'age',      headerName: 'Age',       width: 70 },
    {
      field: 'group', headerName: 'Group', width: 130,
      renderCell: ({ value }) => (
        <Chip label={value} size="small" color="primary" variant="outlined" />
      ),
    },
    { field: 'guardian', headerName: 'Guardian',  flex: 1, minWidth: 140 },
    { field: 'phone',    headerName: 'Phone',     width: 130 },
    {
      field: 'allergies', headerName: 'Allergies', width: 120,
      renderCell: ({ value }) => value && value !== 'None'
        ? <Chip label={value} size="small" color="warning" />
        : <Typography variant="caption" color="text.secondary">None</Typography>,
    },
    {
      field: 'actions', headerName: 'Actions', width: 130, sortable: false, filterable: false,
      renderCell: ({ row }) => (
        <ChildActions
          onView={() => handleView(row)}
          onEdit={() => handleEdit(row)}
          onDelete={() => handleDelete(row.id)}
        />
      ),
    },
  ]

  return (
    <Box className="page-container">
      <Box className="page-header">
        <Box>
          <Typography variant="h5" fontWeight={700} color="text.primary">Children</Typography>
          <Typography variant="body2" color="text.secondary">{rows.length} children enrolled</Typography>
        </Box>
        <Button variant="contained" startIcon={<AddIcon />} onClick={handleAdd}>
          Add Child
        </Button>
      </Box>

      <Box className="grid-wrapper h-520" sx={{ bgcolor: 'background.paper' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSizeOptions={[5, 10, 25]}
          initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
          disableRowSelectionOnClick
        />
      </Box>

      <ChildForm
        open={formOpen}
        onClose={() => setFormOpen(false)}
        onSave={handleSave}
        initial={editChild}
      />
      <ChildViewDialog
        open={!!viewChild}
        child={viewChild}
        onClose={() => setViewChild(null)}
      />
      <ConfirmDialog
        open={!!deleteId}
        title="Delete Child"
        message="Are you sure you want to remove this child? This action cannot be undone."
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteId(null)}
      />
    </Box>
  )
}
