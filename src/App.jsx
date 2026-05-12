import { Routes, Route, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Layout from './components/Layout'
import PostsList from './pages/PostsList'
import CreatePost from './pages/CreatePost'
import ErrorBoundary from './components/ErrorBoundary'
import './App.css'

function App() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  // Load posts from localStorage on mount
  useEffect(() => {
    try {
      const savedPosts = localStorage.getItem('posts')
      if (savedPosts) {
        setPosts(JSON.parse(savedPosts))
      }
    } catch (error) {
      console.error('Failed to load posts from localStorage:', error)
    } finally {
      setLoading(false)
    }
  }, [])

  // Save posts to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem('posts', JSON.stringify(posts))
    } catch (error) {
      console.error('Failed to save posts to localStorage:', error)
    }
  }, [posts])

  const addPost = (newPost) => {
    const post = {
      id: Date.now(),
      ...newPost,
      createdAt: new Date().toISOString(),
    }
    setPosts((prevPosts) => [post, ...prevPosts])
    return post
  }

  const updatePost = (id, updatedPost) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === id ? { ...post, ...updatedPost, updatedAt: new Date().toISOString() } : post
      )
    )
  }

  const deletePost = (id) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id))
  }

  const searchPosts = (query) => {
    if (!query.trim()) return posts
    const lowerQuery = query.toLowerCase()
    return posts.filter(
      (post) =>
        post.title.toLowerCase().includes(lowerQuery) ||
        post.body.toLowerCase().includes(lowerQuery)
    )
  }

  if (loading) {
    return <div className="loading">Loading posts...</div>
  }

  return (
    <ErrorBoundary>
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate to="/posts" replace />} />
          <Route
            path="/posts"
            element={
              <PostsList
                posts={posts}
                onDelete={deletePost}
                onSearch={searchPosts}
              />
            }
          />
          <Route
            path="/posts/new"
            element={<CreatePost onAddPost={addPost} />}
          />
          <Route path="*" element={<Navigate to="/posts" replace />} />
        </Routes>
      </Layout>
    </ErrorBoundary>
  )
}

export default App
