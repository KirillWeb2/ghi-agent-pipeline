import React, { useState } from 'react';
import { useComments } from '../context/CommentsContext';
import './CommentForm.css';

function CommentForm({ postId, onCommentAdded }) {
  const [text, setText] = useState('');
  const [author, setAuthor] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { addComment } = useComments();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    try {
      setIsSubmitting(true);
      addComment(postId, text, author);
      setText('');
      setAuthor('');
      if (onCommentAdded) {
        onCommentAdded();
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const textLength = text.length;
  const maxLength = 500;

  return (
    <form className="comment-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <input
          type="text"
          placeholder="Your name (optional)"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="form-input"
          maxLength="50"
          disabled={isSubmitting}
        />
      </div>
      <div className="form-group">
        <textarea
          placeholder="Write a comment..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="form-textarea"
          maxLength={maxLength}
          disabled={isSubmitting}
          rows="3"
        />
        <div className="char-counter">
          {textLength}/{maxLength}
        </div>
      </div>
      {error && <div className="error-message">{error}</div>}
      <button
        type="submit"
        className="submit-btn"
        disabled={isSubmitting || !text.trim()}
      >
        {isSubmitting ? 'Posting...' : 'Post Comment'}
      </button>
    </form>
  );
}

export default CommentForm;
