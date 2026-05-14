import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CommentsProvider } from './context/CommentsContext';
import ErrorBoundary from './components/ErrorBoundary';
import Layout from './components/Layout';
import PostsList from './pages/PostsList';
import PostDetail from './pages/PostDetail';
import CreatePost from './pages/CreatePost';
import Profile from './pages/Profile';
import './App.css';

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <CommentsProvider>
          <Layout>
            <Routes>
              <Route path="/" element={<PostsList />} />
              <Route path="/post/:id" element={<PostDetail />} />
              <Route path="/create" element={<CreatePost />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </Layout>
        </CommentsProvider>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
