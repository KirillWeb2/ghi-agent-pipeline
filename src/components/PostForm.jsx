import { useState } from 'react'
import './PostForm.css'

function PostForm({ onSubmit, initialData = null, submitButtonText = 'Создать пост' }) {
  const [title, setTitle] = useState(initialData?.title || '')
  const [body, setBody] = useState(initialData?.body || '')
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validateForm = () => {
    const newErrors = {}

    if (!title.trim()) {
      newErrors.title = 'Заголовок не может быть пустым'
    } else if (title.trim().length < 3) {
      newErrors.title = 'Заголовок должен содержать минимум 3 символа'
    } else if (title.trim().length > 100) {
      newErrors.title = 'Заголовок не может быть длиннее 100 символов'
    }

    if (body.trim()) {
      if (body.trim().length < 3) {
        newErrors.body = 'Текст должен содержать минимум 3 символа'
      } else if (body.trim().length > 5000) {
        newErrors.body = 'Текст не может быть длиннее 5000 символов'
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const sanitizeText = (text) => {
    return text.replace(/[<>]/g, '').trim()
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      const formData = {
        title: sanitizeText(title),
        body: sanitizeText(body),
      }

      await onSubmit(formData)

      // Reset form on success
      setTitle('')
      setBody('')
      setErrors({})
    } catch (error) {
      console.error('Error submitting form:', error)
      setErrors({ submit: 'Ошибка при создании поста. Попробуйте снова.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleTitleChange = (e) => {
    const value = e.target.value
    setTitle(value)
    if (errors.title) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors.title
        return newErrors
      })
    }
  }

  const handleBodyChange = (e) => {
    const value = e.target.value
    setBody(value)
    if (errors.body) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors.body
        return newErrors
      })
    }
  }

  return (
    <form className="post-form" onSubmit={handleSubmit}>
      {errors.submit && (
        <div className="form-error-message">{errors.submit}</div>
      )}

      <div className="form-group">
        <label htmlFor="title" className="form-label">Заголовок *</label>
        <input
          id="title"
          type="text"
          className={`form-input ${errors.title ? 'input-error' : ''}`}
          value={title}
          onChange={handleTitleChange}
          placeholder="Введите заголовок"
          disabled={isSubmitting}
        />
        {errors.title && <span className="field-error">{errors.title}</span>}
        <span className="char-count">{title.length}/100</span>
      </div>

      <div className="form-group">
        <label htmlFor="body" className="form-label">Текст поста</label>
        <textarea
          id="body"
          className={`form-textarea ${errors.body ? 'input-error' : ''}`}
          value={body}
          onChange={handleBodyChange}
          placeholder="Введите текст поста (опционально)"
          rows="10"
          disabled={isSubmitting}
        />
        {errors.body && <span className="field-error">{errors.body}</span>}
        <span className="char-count">{body.length}/5000</span>
      </div>

      <button
        type="submit"
        className="form-submit-btn"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Создание...' : submitButtonText}
      </button>
    </form>
  )
}

export default PostForm
