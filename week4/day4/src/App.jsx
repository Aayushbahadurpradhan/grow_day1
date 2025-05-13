// src/App.jsx
import Users from './features/components/Users'
import Posts from './features/components/Posts'
import Todos from './features/components/Todos'
import ErrorLogService from './features/components/ErrorLogService'

export default function App() {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>RTK Query Mini Project</h1>
      <Users />
      <Posts />
      <Todos />
      <ErrorLogService />
    </div>
  )
}
