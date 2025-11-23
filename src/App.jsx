import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import TaskList from './pages/TaskList'
import TaskForm from './pages/TaskForm'
import Profile from './pages/Profile'
import './App.css'

function App() {
  return (
    <Router>
      <div className="app">
        <nav className="navbar">
          <div className="nav-container">
            <Link to="/" className="nav-logo">
              📋 任务管理平台
            </Link>
            <div className="nav-links">
              <Link to="/" className="nav-link">任务列表</Link>
              <Link to="/create" className="nav-link">创建任务</Link>
              <Link to="/profile" className="nav-link">个人资料</Link>
            </div>
          </div>
        </nav>
        
        <main className="main-content">
          <Routes>
            <Route path="/" element={<TaskList />} />
            <Route path="/create" element={<TaskForm />} />
            <Route path="/edit/:id" element={<TaskForm />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App

