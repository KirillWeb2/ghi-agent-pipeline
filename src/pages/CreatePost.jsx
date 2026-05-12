import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PostForm from '../components/PostForm'
import './CreatePost.css'

function CreatePost({ onAddPost }) {
  const navigate = useNavigate()
  const [error, setError] = useState(null)

  const handleSubmit = (postData) => {
    try {
      setError(null)
      onAddPost(postData)
      navigate('/posts')
    } catch (err) {
      setError('Failed to create post. Please try again.')
      console.error('Error creating post:', err)
    }
  }

  const handleCancel = () => {
    navigate('/posts')
  }

  return (
    <div className="create-post-container">
      <h1>Create New Post</h1>
      {error && <div className="error-message">{error}</div>}
      <PostForm onSubmit={handleSubmit} onCancel={handleCancel} />
    </div>
  )
}

export default CreatePost
