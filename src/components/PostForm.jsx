import { useState } from 'react'
import './PostForm.css'

const TITLE_MAX_LENGTH = 100
const BODY_MAX_LENGTH = 5000
const TITLE_MIN_LENGTH = 1
const BODY_MIN_LENGTH = 1

function PostForm({ onSubmit, onCancel, initialData = null }) {
  const [title, setTitle] = useState(initialData?.title || '')
  const [body, setBody] = useState(initialData?.body || '')
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const sanitizeText = (text) => {
    return text
      .trim()
      .replace(/[<>]/g, '') // Remove angle brackets
      .slice(0, initialData ? BODY_MAX_LENGTH : BODY_MAX_LENGTH)
  }

  const validateForm = () => {
    const newErrors = {}

    if (!title.trim() || title.trim().length < TITLE_MIN_LENGTH) {
      newErrors.title = 'Title is required'
    } else if (title.length > TITLE_MAX_LENGTH) {
      newErrors.title = `Title must be ${TITLE_MAX_LENGTH} characters or less`
    }

    if (!body.trim() || body.trim().length < BODY_MIN_LENGTH) {
      newErrors.body = 'Body is required'
    } else if (body.length > BODY_MAX_LENGTH) {
      newErrors.body = `Body must be ${BODY_MAX_LENGTH} characters or less`
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleTitleChange = (e) => {
    const value = e.target.value
    if (value.length <= TITLE_MAX_LENGTH) {
      setTitle(value)
      if (errors.title) {
        setErrors((prev) => ({ ...prev, title: '' }))
      }
    }
  }

  const handleBodyChange = (e) => {
    const value = sanitizeText(e.target.value)
    setBody(value)
    if (errors.body) {
      setErrors((prev) => ({ ...prev, body: '' }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 100)) // Simulate async operation
      onSubmit({
        title: title.trim(),
        body: body.trim(),
      })
    } catch (error) {
      setErrors({ form: 'Failed to submit form. Please try again.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form className="post-form" onSubmit={handleSubmit}>
      {errors.form && <div className="form-error">{errors.form}</div>}

      <div className="form-group">
        <label htmlFor="title" className="label">
          Title *
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={handleTitleChange}
          placeholder="Enter post title"
          className={`input ${errors.title ? 'input-error' : ''}`}
          disabled={isSubmitting}
          maxLength={TITLE_MAX_LENGTH}
          required
        />
        <div className="field-info">
          <span className={errors.title ? 'error-text' : 'help-text'}>
            {errors.title || `${title.length}/${TITLE_MAX_LENGTH}`}
          </span>
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="body" className="label">
          Body *
        </label>
        <textarea
          id="body"
          value={body}
          onChange={handleBodyChange}
          placeholder="Enter post body"
          className={`textarea ${errors.body ? 'input-error' : ''}`}
          disabled={isSubmitting}
          maxLength={BODY_MAX_LENGTH}
          rows="10"
          required
        />
        <div className="field-info">
          <span className={errors.body ? 'error-text' : 'help-text'}>
            {errors.body || `${body.length}/${BODY_MAX_LENGTH}`}
          </span>
        </div>
      </div>

      <div className="form-actions">
        <button
          type="submit"
          className="btn btn-primary"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Creating...' : 'Create Post'}
        </button>
        <button
          type="button"
          className="btn btn-outline"
          onClick={onCancel}
          disabled={isSubmitting}
        >
          Cancel
        </button>
      </div>
    </form>
  )
}

export default PostForm
