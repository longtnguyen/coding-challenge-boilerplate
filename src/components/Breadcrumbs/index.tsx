import React from 'react'
import {
  Breadcrumbs as MUIBreadcrumbs,
  Link,
  Typography,
  Box,
} from '@mui/material'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import { useLocation, Link as RouterLink } from 'react-router-dom'

const Breadcrumbs: React.FC = () => {
  const location = useLocation()
  const pathnames = location.pathname.split('/').filter(x => x)

  const breadcrumbs = [
    <Link key="home" component={RouterLink} to="/" underline="hover">
      Task Management
    </Link>,
  ]

  if (pathnames.includes('edit')) {
    breadcrumbs.push(
      <Typography key="edit" color="text.secondary">
        Edit
      </Typography>,
    )
  } else {
    breadcrumbs.push(
      <Typography key="current" color="text.secondary">
        Home
      </Typography>,
    )
  }

  return (
    <Box sx={{ mb: 2 }}>
      <MUIBreadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
      >
        {breadcrumbs}
      </MUIBreadcrumbs>
    </Box>
  )
}

export default Breadcrumbs
