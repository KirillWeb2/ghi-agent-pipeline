import React, { createContext, useCallback, useEffect, useState } from 'react';

const CommentsContext = createContext();

const STORAGE_KEY = 'app_comments';

export const CommentsProvider = ({ children }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load comments from localStorage on mount
  useEffect(() => {
    const savedComments = localStorage.getItem(STORAGE_KEY);
    if (savedComments) {
      try {
        setComments(JSON.parse(savedComments));
      } catch (e) {
        console.error('Failed to parse comments from storage:', e);
      }
    }
    setLoading(false);
  }, []);

  // Save comments to localStorage whenever they change
  useEffect(() => {
    if (!loading) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(comments));
    }
  }, [comments, loading]);

  const addComment = useCallback((postId, text, author = 'Anonymous') => {
    const newComment = {
      id: Date.now(),
      postId,
      text,
      author,
      avatar: `https://i.pravatar.cc/40?img=${Math.floor(Math.random() * 70)}`,
      createdAt: new Date().toISOString(),
    };
    setComments(prev => [...prev, newComment]);
    return newComment;
  }, []);

  const deleteComment = useCallback((commentId) => {
    setComments(prev => prev.filter(c => c.id !== commentId));
  }, []);

  const updateComment = useCallback((commentId, text) => {
    setComments(prev =>
      prev.map(c =>
        c.id === commentId ? { ...c, text, updatedAt: new Date().toISOString() } : c
      )
    );
  }, []);

  const getCommentsByPostId = useCallback((postId) => {
    return comments.filter(c => c.postId === postId);
  }, [comments]);

  const getCommentCount = useCallback((postId) => {
    return comments.filter(c => c.postId === postId).length;
  }, [comments]);

  const sortComments = useCallback((postComments, sortBy = 'newest') => {
    const sorted = [...postComments];
    switch (sortBy) {
      case 'oldest':
        return sorted.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
      case 'newest':
      default:
        return sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }
  }, []);

  const paginateComments = useCallback((commentsArray, page = 1, pageSize = 5) => {
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    return {
      data: commentsArray.slice(start, end),
      total: commentsArray.length,
      page,
      pageSize,
      totalPages: Math.ceil(commentsArray.length / pageSize),
    };
  }, []);

  const value = {
    comments,
    loading,
    addComment,
    deleteComment,
    updateComment,
    getCommentsByPostId,
    getCommentCount,
    sortComments,
    paginateComments,
  };

  return (
    <CommentsContext.Provider value={value}>
      {children}
    </CommentsContext.Provider>
  );
};

export default CommentsContext;
