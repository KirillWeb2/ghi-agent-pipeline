import { useState } from 'react'
import './PostItem.css'

function PostItem({ post, onDelete }) {
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      setIsDeleting(true)
      try {
        onDelete(post.id)
      } catch (error) {
        console.error('Error deleting post:', error)
        setIsDeleting(false)
      }
    }
  }

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString)
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
    } catch (error) {
      return 'Unknown date'
    }
  }

  if (isDeleting) {
    return <div className="post-item post-item-deleting">Deleting...</div>
  }

  return (
    <article className="post-item">
      <div className="post-header">
        <h2 className="post-title">{post.title}</h2>
        <button
          className="btn-delete"
          onClick={handleDelete}
          title="Delete post"
          aria-label="Delete post"
        >
          ×
        </button>
      </div>
      <p className="post-body">{post.body}</p>
      <footer className="post-footer">
        <time className="post-date">
          Created: {formatDate(post.createdAt)}
        </time>
        {post.updatedAt && (
          <time className="post-date">
            Updated: {formatDate(post.updatedAt)}
          </time>
        )}
      </footer>
    </article>
  )
}

export default PostItem
