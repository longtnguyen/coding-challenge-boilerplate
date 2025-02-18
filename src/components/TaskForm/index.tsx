import React, { useState } from 'react'
import {
  TextField,
  Button,
  Box,
  Card,
  CardHeader,
  CardContent,
} from '@mui/material'
import { useTaskContext } from '../../context/useTaskContext'

const TaskForm: React.FC = () => {
  const { addTask } = useTaskContext()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (title && description) {
      addTask(title, description)
      setTitle('')
      setDescription('')
    }
  }

  return (
    <Card sx={{ mb: 3 }}>
      <CardHeader title="Add a new Task" />
      <CardContent>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
        >
          <TextField
            label="Title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
          />
          <TextField
            label="Description"
            value={description}
            onChange={e => setDescription(e.target.value)}
            required
            multiline
            rows={3}
          />
          <Button type="submit" variant="contained">
            Add
          </Button>
        </Box>
      </CardContent>
    </Card>
  )
}

export default TaskForm
