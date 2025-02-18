import React, { useState } from 'react'
import { useTaskContext } from '../../context/useTaskContext'
import {
  List,
  Card,
  CardContent,
  CardHeader,
  Box,
  Typography,
  Chip,
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert'

const TaskList: React.FC = () => {
  const { tasks } = useTaskContext()
  const [anchorEl, setAnchorEl] = useState<{
    [key: string]: HTMLElement | null
  }>({})

  const handleMenuOpen = (
    event: React.MouseEvent<HTMLButtonElement>,
    taskId: string,
  ) => {
    setAnchorEl(prev => ({ ...prev, [taskId]: event.currentTarget }))
  }

  const handleMenuClose = (taskId: string) => {
    setAnchorEl(prev => ({ ...prev, [taskId]: null }))
  }

  const handleEditTask = (taskId: string) => {
    console.log(taskId)
  }

  const handleDeleteTask = (taskId: string) => {
    console.log(taskId)
  }

  const handleViewHistory = (taskId: string) => {
    console.log(taskId)
  }
  const trimDescription = (description: string) => {
    const paragraphs = description
      .split('\n')
      .filter(para => para.trim() !== '')
    return paragraphs.length > 3
      ? paragraphs.slice(0, 3).join('\n') + '...'
      : description
  }
  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h5">Your Tasks ({tasks.length})</Typography>

      {tasks.length === 0 ? (
        <Typography sx={{ textAlign: 'center', my: 2 }}>
          <strong>You have nothing to do. Go get some sleep!</strong>
        </Typography>
      ) : (
        <List>
          {tasks.map(task => (
            <Card key={task.id} sx={{ my: 1, boxShadow: 1 }}>
              <CardHeader
                title={
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <Typography>{task.title}</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Chip
                        label={task.status}
                        color={task.status === 'ToDo' ? 'secondary' : 'primary'}
                        size="small"
                      />
                      <IconButton onClick={e => handleMenuOpen(e, task.id)}>
                        <MoreVertIcon />
                      </IconButton>
                    </Box>
                  </Box>
                }
                subheader={`Created on: ${new Date(
                  parseInt(task.id),
                ).toLocaleString()}`}
              />
              <CardContent>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    maxWidth: '100%',
                    whiteSpace: 'normal',
                    wordBreak: 'break-word',
                  }}
                >
                  {trimDescription(task.description)}
                </Typography>
              </CardContent>

              <Menu
                anchorEl={anchorEl[task.id]}
                open={Boolean(anchorEl[task.id])}
                onClose={() => handleMenuClose(task.id)}
              >
                <MenuItem onClick={() => handleViewHistory(task.id)}>
                  Task History
                </MenuItem>
                <MenuItem onClick={() => handleEditTask(task.id)}>
                  Edit Task
                </MenuItem>
                <MenuItem onClick={() => handleDeleteTask(task.id)}>
                  Delete Task
                </MenuItem>
              </Menu>
            </Card>
          ))}
        </List>
      )}
    </Box>
  )
}

export default TaskList
