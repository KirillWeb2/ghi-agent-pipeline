import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CommentsProvider } from './context/CommentsContext';
import Layout from './components/Layout';
import PostsList from './pages/PostsList';
import CreatePost from './pages/CreatePost';
import Profile from './pages/Profile';
import PostDetail from './pages/PostDetail';
import ErrorBoundary from './components/ErrorBoundary';
import './App.css';

function App() {
  return (
    <ErrorBoundary>
      <CommentsProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<PostsList />} />
              <Route path="/create" element={<CreatePost />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/post/:id" element={<PostDetail />} />
            </Routes>
          </Layout>
        </Router>
      </CommentsProvider>
    </ErrorBoundary>
  );
}

export default App;
