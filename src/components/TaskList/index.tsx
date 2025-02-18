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
  ListItemIcon,
} from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import EventIcon from '@mui/icons-material/Event'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import DeleteTaskModal from '../DeleteTaskModal'
import { useNavigate } from 'react-router-dom'
import TaskHistoryModal from '../TaskHistoryModal'
import { TaskHistoryEntry } from '../../context/TaskContext'

const TaskList: React.FC = () => {
  const { tasks, deleteTask, getTaskHistory } = useTaskContext()
  const navigate = useNavigate()
  const [anchorEl, setAnchorEl] = useState<{
    [key: string]: HTMLElement | null
  }>({})
  const [selectedTask, setSelectedTask] = useState<{
    id: string
    title: string
  } | null>(null)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [historyModalOpen, setHistoryModalOpen] = useState(false)
  const [taskHistory, setTaskHistory] = useState<TaskHistoryEntry[]>([])
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
    navigate(`/edit/${taskId}`)
    handleMenuClose(taskId)
  }

  const handleConfirmDelete = (taskId: string, taskTitle: string) => {
    setSelectedTask({ id: taskId, title: taskTitle })
    setDeleteModalOpen(true)
    handleMenuClose(taskId)
  }

  const handleDeleteTask = () => {
    if (selectedTask) {
      deleteTask(selectedTask.id)
      setDeleteModalOpen(false)
      setSelectedTask(null)
    }
  }

  const handleViewHistory = (taskId: string) => {
    const history = getTaskHistory(taskId)
    setTaskHistory(history)
    setHistoryModalOpen(true)
    handleMenuClose(taskId)
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
      <Typography variant="h4">Tasks</Typography>

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
                        color={
                          task.status === 'To Do' ? 'secondary' : 'primary'
                        }
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
                ).toLocaleString(undefined, {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: true,
                })}`}
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
                  <ListItemIcon>
                    <EventIcon fontSize="small" />
                  </ListItemIcon>
                  Task History
                </MenuItem>
                <MenuItem onClick={() => handleEditTask(task.id)}>
                  <ListItemIcon>
                    <EditIcon fontSize="small" />
                  </ListItemIcon>
                  Edit Task
                </MenuItem>
                <MenuItem
                  onClick={() => handleConfirmDelete(task.id, task.title)}
                >
                  <ListItemIcon>
                    <DeleteIcon fontSize="small" />
                  </ListItemIcon>
                  Delete Task
                </MenuItem>
              </Menu>
            </Card>
          ))}
        </List>
      )}
      {selectedTask && (
        <DeleteTaskModal
          open={deleteModalOpen}
          taskName={selectedTask.title}
          onClose={() => setDeleteModalOpen(false)}
          onDelete={handleDeleteTask}
        />
      )}
      <TaskHistoryModal
        open={historyModalOpen}
        history={taskHistory}
        onClose={() => setHistoryModalOpen(false)}
      />
    </Box>
  )
}

export default TaskList
