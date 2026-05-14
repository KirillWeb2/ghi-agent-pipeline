import React, { useState } from 'react';
import { useComments } from '../context/CommentsContext';
import './CommentList.css';

function CommentList({ postId }) {
  const { getPostComments, deleteComment, editComment } = useComments();
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');
  const [error, setError] = useState('');

  const postComments = getPostComments(postId);

  const handleEdit = (comment) => {
    setEditingId(comment.id);
    setEditText(comment.text);
    setError('');
  };

  const handleSaveEdit = (commentId) => {
    try {
      setError('');
      editComment(commentId, editText);
      setEditingId(null);
      setEditText('');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditText('');
    setError('');
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;

    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  if (postComments.length === 0) {
    return <div className="no-comments">No comments yet. Be the first!</div>;
  }

  return (
    <div className="comments-list">
      {postComments.map((comment) => (
        <div key={comment.id} className="comment-item">
          <div className="comment-header">
            <span className="comment-author">{comment.author}</span>
            <span className="comment-date">{formatDate(comment.createdAt)}</span>
            {comment.updatedAt && (
              <span className="comment-edited">(edited)</span>
            )}
          </div>

          {editingId === comment.id ? (
            <div className="comment-edit">
              <textarea
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                className="edit-textarea"
                maxLength="500"
                rows="3"
              />
              {error && <div className="error-message">{error}</div>}
              <div className="edit-actions">
                <button
                  onClick={() => handleSaveEdit(comment.id)}
                  className="save-btn"
                >
                  Save
                </button>
                <button
                  onClick={handleCancelEdit}
                  className="cancel-btn"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <>
              <p className="comment-text">{comment.text}</p>
              <div className="comment-actions">
                <button
                  onClick={() => handleEdit(comment)}
                  className="edit-btn"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteComment(comment.id)}
                  className="delete-btn"
                >
                  Delete
                </button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
}

export default CommentList;
