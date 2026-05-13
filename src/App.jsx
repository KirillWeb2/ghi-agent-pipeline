import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import PostsList from './pages/PostsList'
import CreatePost from './pages/CreatePost'
import Profile from './pages/Profile'
import './App.css'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<PostsList />} />
        <Route path="/create" element={<CreatePost />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Layout>
  )
}

export default App
