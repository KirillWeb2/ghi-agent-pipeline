import './PostItem.css';
import CommentForm from './CommentForm';
import CommentList from './CommentList';
import { useState } from 'react';

function PostItem({ id, title, content, author = 'Anonymous', createdAt }) {
  const [showComments, setShowComments] = useState(false);
  const [commentCount, setCommentCount] = useState(0);

  const handleCommentAdded = () => {
    setCommentCount((prev) => prev + 1);
  };

  return (
    <article className="post-item">
      <div className="post-header">
        <h3 className="post-title">{title}</h3>
        <span className="post-author">by {author}</span>
      </div>
      <p className="post-content">{content}</p>
      {createdAt && (
        <span className="post-date">
          {new Date(createdAt).toLocaleDateString()}
        </span>
      )}
      <button
        className="toggle-comments-btn"
        onClick={() => setShowComments(!showComments)}
      >
        {showComments ? '▼ Hide Comments' : '▶ Show Comments'} ({commentCount})
      </button>

      {showComments && (
        <div className="comments-section">
          <CommentForm
            postId={id}
            onCommentAdded={handleCommentAdded}
          />
          <CommentList postId={id} />
        </div>
      )}
    </article>
  );
}

export default PostItem;
