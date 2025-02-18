import { Container, CssBaseline, ThemeProvider } from '@mui/material'
import { theme } from './theme'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import { TaskProvider } from './context/TaskContext'
export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <TaskProvider>
        <Router>
          <Container maxWidth="sm">
            <Routes>
              <Route path="/" element={<Home />} />
            </Routes>
          </Container>
        </Router>
      </TaskProvider>
    </ThemeProvider>
  )
}
