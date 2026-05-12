import { useNavigate } from 'react-router-dom'
import PostForm from '../components/PostForm'
import './CreatePost.css'

function CreatePost({ onAddPost }) {
  const navigate = useNavigate()

  const handleFormSubmit = async (formData) => {
    try {
      onAddPost(formData)
      navigate('/posts')
    } catch (error) {
      console.error('Error creating post:', error)
      throw error
    }
  }

  return (
    <div className="create-post-container">
      <h1 className="create-post-title">Создать новый пост</h1>
      <PostForm
        onSubmit={handleFormSubmit}
        submitButtonText="Создать пост"
      />
    </div>
  )
}

export default CreatePost
