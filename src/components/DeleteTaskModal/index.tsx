import React from 'react'
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Typography,
  Box,
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/DeleteOutline'

interface DeleteTaskModalProps {
  open: boolean
  taskName: string
  onClose: () => void
  onDelete: () => void
}

const DeleteTaskModal: React.FC<DeleteTaskModalProps> = ({
  open,
  taskName,
  onClose,
  onDelete,
}) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <Box sx={{ textAlign: 'center', pt: 3 }}>
        <DeleteIcon sx={{ fontSize: '3rem', color: 'gray' }} />
      </Box>
      <DialogTitle sx={{ textAlign: 'center', fontWeight: 'bold' }}>
        Delete Task?
      </DialogTitle>
      <DialogContent>
        <Typography sx={{ textAlign: 'center' }}>
          You have made changes, are you sure about deleting{' '}
          <strong>{taskName}</strong>?
        </Typography>
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'center', pb: 3 }}>
        <Button variant="outlined" onClick={onClose} sx={{ width: '40%' }}>
          Cancel
        </Button>
        <Button
          variant="contained"
          color="error"
          onClick={onDelete}
          sx={{ width: '40%' }}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default DeleteTaskModal
