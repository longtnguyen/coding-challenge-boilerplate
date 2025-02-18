import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useTaskContext } from '../../context/useTaskContext'
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  TextField,
  Button,
  MenuItem,
  Select,
  Typography,
} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import CheckIcon from '@mui/icons-material/Check'
import { TASK_STATUSES, STATUS_OPTIONS } from '../../constants'
import Breadcrumbs from '../Breadcrumbs'
import { TaskStatus } from '../../context/TaskContext'
const EditTask: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { tasks, updateTask, updateStatus } = useTaskContext()
  const task = tasks.find(task => task.id === id)

  const [title, setTitle] = useState(task?.title || '')
  const [description, setDescription] = useState(task?.description || '')
  const [status, setStatus] = useState(task?.status || TASK_STATUSES.ToDo)
  useEffect(() => {
    if (!task) navigate('/')
  }, [task, navigate])

  const handleSaveChanges = () => {
    if (id) {
      updateTask(id, title, description)
      updateStatus(id, status)
      navigate('/')
    }
  }

  return (
    <Box sx={{ maxWidth: 600, margin: 'auto', mt: 4 }}>
      <Breadcrumbs />
      <Card sx={{ boxShadow: 1, borderRadius: 3, p: 2 }}>
        <CardHeader
          title={
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <EditIcon fontSize="small" />
              <Typography variant="h6" fontWeight="bold">
                Edit Task
              </Typography>
            </Box>
          }
        />
        <CardContent>
          <TextField
            fullWidth
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="Title of the task"
            variant="outlined"
            sx={{ mb: 2, borderRadius: 3 }}
          />
          <TextField
            fullWidth
            multiline
            minRows={5}
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="Description of task goes here."
            variant="outlined"
            sx={{ mb: 2, borderRadius: 3 }}
          />
          <Select
            fullWidth
            value={status}
            onChange={e => setStatus(e.target.value as TaskStatus)}
            sx={{ mb: 3, borderRadius: 3 }}
          >
            {STATUS_OPTIONS[status]?.map(option => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>

          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSaveChanges}
              disabled={!title.trim() || !description.trim()}
              sx={{
                width: '45%',
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                py: 1,
                borderRadius: 5,
                backgroundColor: 'black',
                '&:hover': { backgroundColor: '#333' },
                fontSize: '1rem',
                '@media (max-width: 400px)': { fontSize: '0.6rem', gap: 0.3 },
              }}
            >
              <CheckIcon
                sx={{
                  fontSize: '1rem',
                  '@media (max-width: 400px)': { fontSize: '0.75rem' },
                }}
              />
              Save Changes
            </Button>
            <Button
              variant="outlined"
              onClick={() => navigate('/')}
              sx={{
                width: '45%',
                py: 1,
                borderRadius: 5,
                borderColor: 'rgba(0, 0, 0, 0.23)',
                color: 'black',
                '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.08)' },
                fontSize: '1rem',
                '@media (max-width: 400px)': { fontSize: '0.6rem' },
              }}
            >
              Cancel
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  )
}

export default EditTask
