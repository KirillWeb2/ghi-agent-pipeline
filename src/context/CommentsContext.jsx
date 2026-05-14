import React, { createContext, useState, useCallback, useEffect } from 'react';

export const CommentsContext = createContext();

const STORAGE_KEY = 'app_comments';

export function CommentsProvider({ children }) {
  const [comments, setComments] = useState([]);

  // Загрузка комментариев из localStorage при монтировании
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setComments(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Failed to load comments from localStorage:', error);
    }
  }, []);

  // Сохранение комментариев в localStorage при изменении
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(comments));
    } catch (error) {
      console.error('Failed to save comments to localStorage:', error);
    }
  }, [comments]);

  const addComment = useCallback((postId, text, author = 'Anonymous') => {
    if (!text.trim()) {
      throw new Error('Comment text cannot be empty');
    }
    if (text.trim().length > 500) {
      throw new Error('Comment text cannot exceed 500 characters');
    }

    const newComment = {
      id: Date.now(),
      postId,
      text: text.trim(),
      author: author.trim() || 'Anonymous',
      createdAt: new Date().toISOString(),
    };

    setComments((prev) => [...prev, newComment]);
    return newComment;
  }, []);

  const deleteComment = useCallback((commentId) => {
    setComments((prev) => prev.filter((comment) => comment.id !== commentId));
  }, []);

  const editComment = useCallback((commentId, newText) => {
    if (!newText.trim()) {
      throw new Error('Comment text cannot be empty');
    }
    if (newText.trim().length > 500) {
      throw new Error('Comment text cannot exceed 500 characters');
    }

    setComments((prev) =>
      prev.map((comment) =>
        comment.id === commentId
          ? { ...comment, text: newText.trim(), updatedAt: new Date().toISOString() }
          : comment
      )
    );
  }, []);

  const getPostComments = useCallback((postId) => {
    return comments.filter((comment) => comment.postId === postId);
  }, [comments]);

  const value = {
    comments,
    addComment,
    deleteComment,
    editComment,
    getPostComments,
  };

  return (
    <CommentsContext.Provider value={value}>
      {children}
    </CommentsContext.Provider>
  );
}

export function useComments() {
  const context = React.useContext(CommentsContext);
  if (!context) {
    throw new Error('useComments must be used within CommentsProvider');
  }
  return context;
}
