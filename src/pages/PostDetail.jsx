import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import CommentForm from '../components/CommentForm';
import CommentsList from '../components/CommentsList';
import './PostDetail.css';

const PostDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const posts = JSON.parse(localStorage.getItem('posts') || '[]');
    const foundPost = posts.find(p => p.id === parseInt(id));
    if (foundPost) {
      setPost(foundPost);
    }
    setLoading(false);
  }, [id]);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (!post) {
    return (
      <div className="post-not-found">
        <h2>Post not found</h2>
        <button onClick={() => navigate('/')} className="back-btn">
          Back to Posts
        </button>
      </div>
    );
  }

  return (
    <div className="post-detail-container">
      <button onClick={() => navigate('/')} className="back-link">
        ← Back to Posts
      </button>
      <article className="post-detail">
        <h1>{post.title}</h1>
        <div className="post-detail-meta">
          <span className="detail-author">by {post.author}</span>
          <span className="detail-date">{new Date(post.createdAt).toLocaleDateString()}</span>
        </div>
        <div className="post-detail-content">
          {post.content}
        </div>
      </article>

      <section className="comments-section">
        <h2>Comments</h2>
        <CommentForm postId={post.id} />
        <CommentsList postId={post.id} />
      </section>
    </div>
  );
};

export default PostDetail;
