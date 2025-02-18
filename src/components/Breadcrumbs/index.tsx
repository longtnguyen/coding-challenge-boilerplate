import React from 'react'
import { Breadcrumbs as MUIBreadcrumbs, Link, Typography } from '@mui/material'
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

  if (pathnames.length === 0) {
    breadcrumbs.push(
      <Typography key="current" color="text.primary">
        Home
      </Typography>,
    )
  } else {
    pathnames.forEach((value, index) => {
      const to = `/${pathnames.slice(0, index + 1).join('/')}`
      const isLast = index === pathnames.length - 1
      const breadcrumbText = value === 'edit' ? 'Edit' : value

      breadcrumbs.push(
        isLast ? (
          <Typography key={to} color="text.primary">
            {breadcrumbText}
          </Typography>
        ) : (
          <Link key={to} component={RouterLink} to={to} underline="hover">
            {breadcrumbText}
          </Link>
        ),
      )
    })
  }

  return (
    <MUIBreadcrumbs
      separator={<NavigateNextIcon fontSize="small" />}
      aria-label="breadcrumb"
    >
      {breadcrumbs}
    </MUIBreadcrumbs>
  )
}

export default Breadcrumbs
