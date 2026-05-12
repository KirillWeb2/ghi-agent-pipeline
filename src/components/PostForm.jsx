import { useState } from 'react'
import './PostForm.css'

function PostForm({ onSubmit, initialValues = { title: '', body: '' }, submitText = 'Создать пост' }) {
  const [formData, setFormData] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validateForm = () => {
    const newErrors = {}

    // Title validation
    if (!formData.title.trim()) {
      newErrors.title = 'Заголовок обязателен'
    } else if (formData.title.length < 3) {
      newErrors.title = 'Заголовок должен быть минимум 3 символа'
    } else if (formData.title.length > 100) {
      newErrors.title = 'Заголовок не должен превышать 100 символов'
    }

    // Body validation
    if (!formData.body.trim()) {
      newErrors.body = 'Текст поста обязателен'
    } else if (formData.body.length < 10) {
      newErrors.body = 'Текст должен быть минимум 10 символов'
    } else if (formData.body.length > 5000) {
      newErrors.body = 'Текст не должен превышать 5000 символов'
    }

    return newErrors
  }

  const sanitizeInput = (text) => {
    return text
      .replace(/[<>]/g, '')
      .trim()
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: sanitizeInput(value)
    }))
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    const newErrors = validateForm()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setIsSubmitting(true)
    try {
      // Simulate async operation
      await new Promise(resolve => setTimeout(resolve, 300))
      await onSubmit(formData)
    } catch (error) {
      console.error('Form submission error:', error)
      setErrors({ submit: 'Ошибка при отправке формы' })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form className="post-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="title" className="form-label">
          Заголовок
          <span className="required">*</span>
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Введите заголовок поста..."
          className={`form-input ${errors.title ? 'error' : ''}`}
          disabled={isSubmitting}
        />
        {errors.title && <span className="error-message">{errors.title}</span>}
        <span className="char-count">{formData.title.length}/100</span>
      </div>

      <div className="form-group">
        <label htmlFor="body" className="form-label">
          Текст поста
          <span className="required">*</span>
        </label>
        <textarea
          id="body"
          name="body"
          value={formData.body}
          onChange={handleChange}
          placeholder="Введите текст поста..."
          rows="8"
          className={`form-textarea ${errors.body ? 'error' : ''}`}
          disabled={isSubmitting}
        />
        {errors.body && <span className="error-message">{errors.body}</span>}
        <span className="char-count">{formData.body.length}/5000</span>
      </div>

      {errors.submit && <span className="error-message">{errors.submit}</span>}

      <button 
        type="submit" 
        className="submit-btn"
        disabled={isSubmitting}
      >
        {isSubmitting ? '⏳ Создание...' : submitText}
      </button>
    </form>
  )
}

export default PostForm
