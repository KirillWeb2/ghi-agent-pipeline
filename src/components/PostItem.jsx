import { useState } from 'react'
import './PostItem.css'

function PostItem({ post, onDelete, onEdit }) {
  const [isDeleting, setIsDeleting] = useState(false)
  const [showImage, setShowImage] = useState(true)

  const formatDate = (isoString) => {
    const date = new Date(isoString)
    return date.toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const handleDelete = async () => {
    if (window.confirm('Вы уверены, что хотите удалить этот пост?')) {
      setIsDeleting(true)
      try {
        await new Promise(resolve => setTimeout(resolve, 300))
        onDelete(post.id)
      } finally {
        setIsDeleting(false)
      }
    }
  }

  return (
    <article className="post-item" data-id={post.id}>
      <div className="post-image-container">
        {showImage && (
          <img
            src={post.imageUrl || 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22300%22 height=%22200%22%3E%3Crect fill=%22%231a1a1a%22 width=%22300%22 height=%22200%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 font-size=%2224%22 fill=%22%23666%22 text-anchor=%22middle%22 dy=%22.3em%22%3E🐱%3C/text%3E%3C/svg%3E'}
            alt="Post image"
            className="post-image"
            onError={() => setShowImage(false)}
          />
        )}
      </div>
      <div className="post-content">
        <div className="post-header">
          <h2 className="post-title">{post.title}</h2>
          <time className="post-date">{formatDate(post.createdAt)}</time>
        </div>
        <p className="post-body">{post.body}</p>
        <div className="post-actions">
          <button
            className="btn-edit"
            onClick={() => onEdit(post)}
            disabled={isDeleting}
            title="Редактировать пост"
          >
            ✏️ Редактировать
          </button>
          <button
            className="btn-delete"
            onClick={handleDelete}
            disabled={isDeleting}
            title="Удалить пост"
          >
            {isDeleting ? '⏳' : '🗑️'} Удалить
          </button>
        </div>
      </div>
    </article>
  )
}

export default PostItem
