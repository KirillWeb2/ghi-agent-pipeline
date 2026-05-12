import { useState } from 'react'
import './PostItem.css'

function PostItem({ post, onDelete, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedTitle, setEditedTitle] = useState(post.title)
  const [editedBody, setEditedBody] = useState(post.body)
  const [errors, setErrors] = useState({})

  const formatDate = (isoString) => {
    const date = new Date(isoString)
    return date.toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const validateEdit = () => {
    const newErrors = {}

    if (!editedTitle.trim()) {
      newErrors.title = 'Заголовок не может быть пустым'
    } else if (editedTitle.trim().length < 3) {
      newErrors.title = 'Заголовок должен содержать минимум 3 символа'
    } else if (editedTitle.trim().length > 100) {
      newErrors.title = 'Заголовок не может быть длиннее 100 символов'
    }

    if (editedBody.trim() && editedBody.trim().length < 3) {
      newErrors.body = 'Текст должен содержать минимум 3 символа'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSaveEdit = () => {
    if (!validateEdit()) {
      return
    }

    onUpdate(post.id, {
      title: editedTitle.trim(),
      body: editedBody.trim(),
    })

    setIsEditing(false)
    setErrors({})
  }

  const handleCancelEdit = () => {
    setEditedTitle(post.title)
    setEditedBody(post.body)
    setIsEditing(false)
    setErrors({})
  }

  const handleDelete = () => {
    if (window.confirm('Вы уверены, что хотите удалить этот пост?')) {
      onDelete(post.id)
    }
  }

  if (isEditing) {
    return (
      <div className="post-item editing">
        <div className="edit-form">
          <div className="form-group">
            <label className="form-label">Заголовок</label>
            <input
              type="text"
              className={`form-input ${errors.title ? 'input-error' : ''}`}
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
            />
            {errors.title && <span className="field-error">{errors.title}</span>}
          </div>

          <div className="form-group">
            <label className="form-label">Текст</label>
            <textarea
              className={`form-textarea ${errors.body ? 'input-error' : ''}`}
              value={editedBody}
              onChange={(e) => setEditedBody(e.target.value)}
              rows="6"
            />
            {errors.body && <span className="field-error">{errors.body}</span>}
          </div>

          <div className="edit-buttons">
            <button
              className="btn btn-save"
              onClick={handleSaveEdit}
            >
              Сохранить
            </button>
            <button
              className="btn btn-cancel"
              onClick={handleCancelEdit}
            >
              Отмена
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="post-item">
      <div className="post-header">
        <h2 className="post-title">{post.title}</h2>
        <span className="post-date">{formatDate(post.createdAt)}</span>
      </div>
      {post.body && <p className="post-body">{post.body}</p>}
      <div className="post-actions">
        <button
          className="btn btn-edit"
          onClick={() => setIsEditing(true)}
        >
          Редактировать
        </button>
        <button
          className="btn btn-delete"
          onClick={handleDelete}
        >
          Удалить
        </button>
      </div>
    </div>
  )
}

export default PostItem
