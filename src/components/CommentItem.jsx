import React, { useState } from 'react';
import useComments from '../hooks/useComments';
import './CommentItem.css';

const CommentItem = ({ comment, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(comment.text);
  const { updateComment, deleteComment } = useComments();

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this comment?')) {
      deleteComment(comment.id);
      if (onDelete) onDelete(comment.id);
    }
  };

  const handleUpdate = () => {
    if (!editText.trim()) return;
    updateComment(comment.id, editText.trim());
    setIsEditing(false);
    if (onUpdate) onUpdate(comment.id, editText.trim());
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
    return date.toLocaleDateString();
  };

  return (
    <div className="comment-item">
      <div className="comment-header">
        <img src={comment.avatar} alt={comment.author} className="comment-avatar" />
        <div className="comment-meta">
          <span className="comment-author">{comment.author}</span>
          <span className="comment-time">{formatDate(comment.createdAt)}</span>
        </div>
      </div>
      {isEditing ? (
        <div className="comment-edit">
          <textarea
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            className="comment-edit-textarea"
            rows="2"
            maxLength="500"
          />
          <div className="comment-edit-actions">
            <button
              className="comment-edit-save"
              onClick={handleUpdate}
              disabled={!editText.trim()}
            >
              Save
            </button>
            <button
              className="comment-edit-cancel"
              onClick={() => {
                setEditText(comment.text);
                setIsEditing(false);
              }}
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
              className="comment-action-btn comment-edit-btn"
              onClick={() => setIsEditing(true)}
            >
              Edit
            </button>
            <button
              className="comment-action-btn comment-delete-btn"
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CommentItem;
