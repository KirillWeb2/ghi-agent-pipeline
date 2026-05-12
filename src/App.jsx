import { Routes, Route, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Layout from './components/Layout'
import PostsList from './pages/PostsList'
import CreatePost from './pages/CreatePost'
import ErrorBoundary from './components/ErrorBoundary'
import './App.css'

const STORAGE_KEY = 'posts_data'

function App() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  // Load posts from localStorage on mount
  useEffect(() => {
    try {
      const savedPosts = localStorage.getItem(STORAGE_KEY)
      if (savedPosts) {
        const parsedPosts = JSON.parse(savedPosts)
        if (Array.isArray(parsedPosts)) {
          setPosts(parsedPosts)
        }
      }
    } catch (error) {
      console.error('Error loading posts from localStorage:', error)
    } finally {
      setLoading(false)
    }
  }, [])

  // Save posts to localStorage whenever they change
  useEffect(() => {
    if (!loading) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(posts))
      } catch (error) {
        console.error('Error saving posts to localStorage:', error)
      }
    }
  }, [posts, loading])

  const addPost = (newPost) => {
    const post = {
      id: Date.now(),
      ...newPost,
      createdAt: new Date().toISOString(),
    }
    setPosts([post, ...posts])
    return post
  }

  const deletePost = (id) => {
    setPosts(posts.filter(post => post.id !== id))
  }

  const updatePost = (id, updatedData) => {
    setPosts(posts.map(post =>
      post.id === id
        ? { ...post, ...updatedData, updatedAt: new Date().toISOString() }
        : post
    ))
  }

  return (
    <ErrorBoundary>
      <Layout>
        <Routes>
          <Route path="/posts" element={<PostsList posts={posts} onDeletePost={deletePost} onUpdatePost={updatePost} />} />
          <Route path="/posts/new" element={<CreatePost onAddPost={addPost} />} />
          <Route path="/" element={<Navigate to="/posts" replace />} />
          <Route path="*" element={<Navigate to="/posts" replace />} />
        </Routes>
      </Layout>
    </ErrorBoundary>
  )
}

export default App
