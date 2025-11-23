import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import './TaskForm.css'

function TaskForm() {
  const navigate = useNavigate()
  const { id } = useParams()
  const isEdit = !!id

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium',
    category_id: null,
    completed: false
  })
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchCategories()
    if (isEdit) {
      fetchTask()
    }
  }, [id])

  const fetchTask = async () => {
    try {
      const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .eq('id', id)
        .single()

      if (error) throw error
      if (data) {
        setFormData({
          title: data.title || '',
          description: data.description || '',
          priority: data.priority || 'medium',
          category_id: data.category_id || null,
          completed: data.completed || false
        })
      }
    } catch (error) {
      console.error('Error fetching task:', error)
      alert('加载任务失败: ' + error.message)
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

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!formData.title.trim()) {
      alert('请输入任务标题')
      return
    }

    setLoading(true)

    try {
      if (isEdit) {
        const { error } = await supabase
          .from('tasks')
          .update({
            title: formData.title,
            description: formData.description,
            priority: formData.priority,
            category_id: formData.category_id || null,
            completed: formData.completed
          })
          .eq('id', id)

        if (error) throw error
        alert('任务更新成功！')
      } else {
        const { error } = await supabase
          .from('tasks')
          .insert([{
            title: formData.title,
            description: formData.description,
            priority: formData.priority,
            category_id: formData.category_id || null,
            completed: false
          }])

        if (error) throw error
        alert('任务创建成功！')
      }

      navigate('/')
    } catch (error) {
      console.error('Error saving task:', error)
      alert('保存失败: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  return (
    <div className="task-form-page">
      <div className="form-container">
        <h1>{isEdit ? '编辑任务' : '创建新任务'}</h1>
        
        <form onSubmit={handleSubmit} className="task-form">
          <div className="form-group">
            <label htmlFor="title">任务标题 *</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="输入任务标题"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">任务描述</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="输入任务详细描述"
              rows="5"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="priority">优先级</label>
              <select
                id="priority"
                name="priority"
                value={formData.priority}
                onChange={handleChange}
              >
                <option value="low">低优先级</option>
                <option value="medium">中优先级</option>
                <option value="high">高优先级</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="category_id">分类</label>
              <select
                id="category_id"
                name="category_id"
                value={formData.category_id || ''}
                onChange={handleChange}
              >
                <option value="">选择分类</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {isEdit && (
            <div className="form-group checkbox-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="completed"
                  checked={formData.completed}
                  onChange={handleChange}
                />
                <span>标记为已完成</span>
              </label>
            </div>
          )}

          <div className="form-actions">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="btn btn-secondary"
            >
              取消
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? '保存中...' : (isEdit ? '更新任务' : '创建任务')}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default TaskForm

