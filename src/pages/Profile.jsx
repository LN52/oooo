import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import './Profile.css'

function Profile() {
  const [stats, setStats] = useState({
    totalTasks: 0,
    completedTasks: 0,
    activeTasks: 0,
    categoriesCount: 0
  })
  const [recentTasks, setRecentTasks] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStats()
    fetchRecentTasks()
    fetchCategories()
  }, [])

  const fetchStats = async () => {
    try {
      const { data: tasks, error: tasksError } = await supabase
        .from('tasks')
        .select('id, completed')

      if (tasksError) throw tasksError

      const totalTasks = tasks?.length || 0
      const completedTasks = tasks?.filter(t => t.completed).length || 0
      const activeTasks = totalTasks - completedTasks

      const { data: categories, error: categoriesError } = await supabase
        .from('categories')
        .select('id')

      if (categoriesError) throw categoriesError

      setStats({
        totalTasks,
        completedTasks,
        activeTasks,
        categoriesCount: categories?.length || 0
      })
    } catch (error) {
      console.error('Error fetching stats:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchRecentTasks = async () => {
    try {
      const { data, error } = await supabase
        .from('tasks')
        .select(`
          *,
          categories (
            name,
            color
          )
        `)
        .order('created_at', { ascending: false })
        .limit(5)

      if (error) throw error
      setRecentTasks(data || [])
    } catch (error) {
      console.error('Error fetching recent tasks:', error)
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

  const completionRate = stats.totalTasks > 0 
    ? Math.round((stats.completedTasks / stats.totalTasks) * 100) 
    : 0

  if (loading) {
    return <div className="loading">加载中...</div>
  }

  return (
    <div className="profile-page">
      <div className="profile-header">
        <h1>个人资料</h1>
        <p className="profile-subtitle">查看您的任务统计和活动概览</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">📋</div>
          <div className="stat-content">
            <h3>{stats.totalTasks}</h3>
            <p>总任务数</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">✅</div>
          <div className="stat-content">
            <h3>{stats.completedTasks}</h3>
            <p>已完成</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🔄</div>
          <div className="stat-content">
            <h3>{stats.activeTasks}</h3>
            <p>进行中</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">📁</div>
          <div className="stat-content">
            <h3>{stats.categoriesCount}</h3>
            <p>分类数</p>
          </div>
        </div>
      </div>

      <div className="profile-content">
        <div className="profile-section">
          <h2>完成率</h2>
          <div className="progress-container">
            <div className="progress-bar">
              <div 
                className="progress-fill"
                style={{ width: `${completionRate}%` }}
              >
                <span className="progress-text">{completionRate}%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="profile-section">
          <h2>最近任务</h2>
          {recentTasks.length === 0 ? (
            <p className="empty-text">暂无最近任务</p>
          ) : (
            <div className="recent-tasks">
              {recentTasks.map(task => (
                <div key={task.id} className="recent-task-item">
                  <div className="task-item-header">
                    <span 
                      className="category-dot"
                      style={{ 
                        backgroundColor: task.categories?.color || '#667eea'
                      }}
                    />
                    <span className={`task-status ${task.completed ? 'completed' : 'active'}`}>
                      {task.completed ? '✅ 已完成' : '🔄 进行中'}
                    </span>
                  </div>
                  <h4>{task.title}</h4>
                  <p className="task-meta">
                    {new Date(task.created_at).toLocaleDateString('zh-CN')}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="profile-section">
          <h2>任务分类</h2>
          {categories.length === 0 ? (
            <p className="empty-text">暂无分类</p>
          ) : (
            <div className="categories-list">
              {categories.map(category => (
                <div 
                  key={category.id} 
                  className="category-item"
                  style={{ 
                    borderLeftColor: category.color || '#667eea'
                  }}
                >
                  <div 
                    className="category-color"
                    style={{ backgroundColor: category.color || '#667eea' }}
                  />
                  <div className="category-info">
                    <h4>{category.name}</h4>
                    {category.description && (
                      <p>{category.description}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Profile

