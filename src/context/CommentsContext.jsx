import React, { createContext, useState, useEffect } from 'react';

export const CommentsContext = createContext();

export const CommentsProvider = ({ children }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('comments');
    if (saved) {
      try {
        setComments(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to load comments from localStorage', e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('comments', JSON.stringify(comments));
  }, [comments]);

  const addComment = (postId, text, author) => {
    const newComment = {
      id: Date.now(),
      postId,
      text,
      author,
      timestamp: new Date().toISOString(),
    };
    setComments([...comments, newComment]);
    return newComment;
  };

  const deleteComment = (commentId) => {
    setComments(comments.filter(c => c.id !== commentId));
  };

  const getCommentsByPostId = (postId) => {
    return comments.filter(c => c.postId === postId);
  };

  return (
    <CommentsContext.Provider value={{ comments, addComment, deleteComment, getCommentsByPostId }}>
      {children}
    </CommentsContext.Provider>
  );
};
