import React from 'react'
import { Box } from '@mui/material'

import Breadcrumbs from '../../components/Breadcrumbs'
import TaskForm from '../TaskForm'
import TaskList from '../TaskList'

const Home: React.FC = () => {
  return (
    <Box sx={{ maxWidth: 600, margin: 'auto', mt: 4 }}>
      <Breadcrumbs />
      <TaskForm />
      <TaskList />
    </Box>
  )
}

export default Home
