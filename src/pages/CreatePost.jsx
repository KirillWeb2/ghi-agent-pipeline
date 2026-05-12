import { useNavigate } from 'react-router-dom'
import { usePostsContext } from '../App'
import PostForm from '../components/PostForm'
import './CreatePost.css'

function CreatePost() {
  const navigate = useNavigate()
  const { addPost } = usePostsContext()

  const handleSubmit = async (formData) => {
    try {
      await addPost(formData)
      navigate('/posts', { replace: true })
    } catch (error) {
      console.error('Error creating post:', error)
      throw error
    }
  }

  return (
    <div className="create-post-container">
      <div className="create-post-header">
        <h1>✍️ Создать новый пост</h1>
        <p>Поделитесь своей историей с сообществом</p>
      </div>
      <PostForm onSubmit={handleSubmit} submitText="✨ Создать пост" />
    </div>
  )
}

export default CreatePost
