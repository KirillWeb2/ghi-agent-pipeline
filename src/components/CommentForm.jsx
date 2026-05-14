import React, { useState } from 'react';
import useComments from '../hooks/useComments';
import './CommentForm.css';

const CommentForm = ({ postId, onCommentAdded }) => {
  const [text, setText] = useState('');
  const [author, setAuthor] = useState('');
  const { addComment } = useComments();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    const newComment = addComment(postId, text.trim(), author.trim() || 'Anonymous');
    setText('');
    setAuthor('');
    if (onCommentAdded) {
      onCommentAdded(newComment);
    }
  };

  return (
    <form className="comment-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <input
          type="text"
          placeholder="Your name (optional)"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="comment-author-input"
          maxLength="50"
        />
      </div>
      <div className="form-group">
        <textarea
          placeholder="Add a comment..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="comment-textarea"
          rows="3"
          maxLength="500"
        />
      </div>
      <button
        type="submit"
        className="comment-submit-btn"
        disabled={!text.trim()}
      >
        Post Comment
      </button>
    </form>
  );
};

export default CommentForm;
