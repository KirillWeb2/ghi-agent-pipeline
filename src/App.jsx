import { Routes, Route, Navigate } from 'react-router-dom'
import { useState, useEffect, createContext, useContext } from 'react'
import Layout from './components/Layout'
import PostsList from './pages/PostsList'
import CreatePost from './pages/CreatePost'
import './App.css'

// Posts context for global state management
const PostsContext = createContext()

export const usePostsContext = () => {
  const context = useContext(PostsContext)
  if (!context) {
    throw new Error('usePostsContext must be used within PostsProvider')
  }
  return context
}

function App() {
  const [posts, setPosts] = useState([])

  // Load posts from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('posts')
      if (saved) {
        const parsed = JSON.parse(saved)
        if (Array.isArray(parsed)) {
          setPosts(parsed)
        }
      }
    } catch (error) {
      console.error('Failed to load posts from localStorage:', error)
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

  const addPost = (post) => {
    const newPost = {
      id: Date.now(),
      ...post,
      createdAt: new Date().toISOString(),
      imageUrl: getRandomCatImage(),
    }
    setPosts([newPost, ...posts])
    return newPost
  }

  const updatePost = (id, updates) => {
    setPosts(posts.map(p => p.id === id ? { ...p, ...updates } : p))
  }

  const deletePost = (id) => {
    setPosts(posts.filter(p => p.id !== id))
  }

  const searchPosts = (query) => {
    if (!query.trim()) return posts
    const q = query.toLowerCase()
    return posts.filter(p => 
      p.title.toLowerCase().includes(q) || 
      p.body.toLowerCase().includes(q)
    )
  }

  const getRandomCatImage = () => {
    // Using a placeholder cat API
    const randomId = Math.floor(Math.random() * 1000)
    return `https://api.thecatapi.com/v1/images/search?mime_types=jpg&limit=1&random=${randomId}?id=${randomId}`
  }

  const value = {
    posts,
    addPost,
    updatePost,
    deletePost,
    searchPosts,
  }

  return (
    <PostsContext.Provider value={value}>
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate to="/posts" replace />} />
          <Route path="/posts" element={<PostsList />} />
          <Route path="/posts/new" element={<CreatePost />} />
          <Route path="*" element={<Navigate to="/posts" replace />} />
        </Routes>
      </Layout>
    </PostsContext.Provider>
  )
}

export default App
