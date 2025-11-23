import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import './TaskList.css'

function TaskList() {
  const [tasks, setTasks] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    fetchTasks()
    fetchCategories()
  }, [])

  const fetchTasks = async () => {
    try {
      const { data, error } = await supabase
        .from('tasks')
        .select(`
          *,
          categories (
            id,
            name,
            color
          )
        `)
        .order('created_at', { ascending: false })

      if (error) throw error
      setTasks(data || [])
    } catch (error) {
      console.error('Error fetching tasks:', error)
      alert('加载任务失败: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('name')

      if (error) throw error
      setCategories(data || [])
    } catch (error) {
      console.error('Error fetching categories:', error)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('确定要删除这个任务吗？')) return

    try {
      const { error } = await supabase
        .from('tasks')
        .delete()
        .eq('id', id)

      if (error) throw error
      fetchTasks()
    } catch (error) {
      console.error('Error deleting task:', error)
      alert('删除任务失败: ' + error.message)
    }
  }

  const handleToggleComplete = async (task) => {
    try {
      const { error } = await supabase
        .from('tasks')
        .update({ completed: !task.completed })
        .eq('id', task.id)

      if (error) throw error
      fetchTasks()
    } catch (error) {
      console.error('Error updating task:', error)
      alert('更新任务失败: ' + error.message)
    }
  }

  const filteredTasks = filter === 'all' 
    ? tasks 
    : filter === 'completed' 
    ? tasks.filter(t => t.completed)
    : tasks.filter(t => !t.completed)

  if (loading) {
    return <div className="loading">加载中...</div>
  }

  return (
    <div className="task-list-page">
      <div className="page-header">
        <h1>我的任务</h1>
        <Link to="/create" className="btn btn-primary">
          + 新建任务
        </Link>
      </div>

      <div className="filter-buttons">
        <button 
          className={filter === 'all' ? 'active' : ''}
          onClick={() => setFilter('all')}
        >
          全部 ({tasks.length})
        </button>
        <button 
          className={filter === 'active' ? 'active' : ''}
          onClick={() => setFilter('active')}
        >
          进行中 ({tasks.filter(t => !t.completed).length})
        </button>
        <button 
          className={filter === 'completed' ? 'active' : ''}
          onClick={() => setFilter('completed')}
        >
          已完成 ({tasks.filter(t => t.completed).length})
        </button>
      </div>

      <div className="tasks-grid">
        {filteredTasks.length === 0 ? (
          <div className="empty-state">
            <p>暂无任务</p>
            <Link to="/create" className="btn btn-primary">
              创建第一个任务
            </Link>
          </div>
        ) : (
          filteredTasks.map(task => (
            <div 
              key={task.id} 
              className={`task-card ${task.completed ? 'completed' : ''}`}
            >
              <div className="task-header">
                <label className="checkbox-container">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => handleToggleComplete(task)}
                  />
                  <span className="checkmark"></span>
                </label>
                <span 
                  className="category-badge"
                  style={{ 
                    backgroundColor: task.categories?.color || '#667eea',
                    color: 'white'
                  }}
                >
                  {task.categories?.name || '未分类'}
                </span>
              </div>
              
              <h3 className="task-title">{task.title}</h3>
              <p className="task-description">{task.description || '无描述'}</p>
              
              <div className="task-footer">
                <span className={`task-priority priority-${task.priority}`}>
                  {task.priority === 'high' ? '🔴 高优先级' : 
                   task.priority === 'medium' ? '🟡 中优先级' : 
                   '🟢 低优先级'}
                </span>
                <div className="task-actions">
                  <Link to={`/edit/${task.id}`} className="btn-icon">✏️</Link>
                  <button 
                    onClick={() => handleDelete(task.id)}
                    className="btn-icon"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default TaskList

