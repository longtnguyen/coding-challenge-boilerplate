import React from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  List,
  ListItem,
  ListItemText,
  Divider,
  Typography,
  Box,
} from '@mui/material'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import { TaskHistoryEntry } from '../../context/TaskContext'

interface TaskHistoryModalProps {
  open: boolean
  history: TaskHistoryEntry[]
  onClose: () => void
}

const TaskHistoryModal: React.FC<TaskHistoryModalProps> = ({
  open,
  history,
  onClose,
}) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <Box
        sx={{ p: 2, height: '70vh', display: 'flex', flexDirection: 'column' }}
      >
        <DialogTitle sx={{ fontWeight: 'bold' }}>Task History</DialogTitle>
        <DialogContent sx={{ flex: 1, overflowY: 'auto', p: 2 }}>
          <List>
            {history.map((entry, index) => (
              <React.Fragment key={index}>
                <ListItem sx={{ pl: 1 }}>
                  <ListItemText
                    primary={
                      <Typography
                        component="span"
                        variant="body1"
                        fontWeight="bold"
                      >
                        The task was marked as “{entry.next}”
                      </Typography>
                    }
                    secondary={
                      <Box
                        sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                      >
                        <AccessTimeIcon fontSize="small" color="disabled" />
                        <Typography
                          component="span"
                          variant="body2"
                          color="text.secondary"
                        >
                          {new Date(entry.timestamp).toLocaleString(undefined, {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                            hour12: true,
                          })}
                        </Typography>
                      </Box>
                    }
                  />
                </ListItem>
                {index !== history.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List>
        </DialogContent>
      </Box>
    </Dialog>
  )
}

export default TaskHistoryModal
