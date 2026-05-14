import React, { useState } from 'react';
import useComments from '../hooks/useComments';
import CommentItem from './CommentItem';
import './CommentsList.css';

const CommentsList = ({ postId }) => {
  const { getCommentsByPostId, sortComments, paginateComments } = useComments();
  const [sortBy, setSortBy] = useState('newest');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  const postComments = getCommentsByPostId(postId);
  const sortedComments = sortComments(postComments, sortBy);
  const paginatedData = paginateComments(sortedComments, currentPage, pageSize);

  if (postComments.length === 0) {
    return <div className="comments-empty">No comments yet. Be the first to comment!</div>;
  }

  return (
    <div className="comments-list-container">
      <div className="comments-controls">
        <h3 className="comments-title">
          Comments ({postComments.length})
        </h3>
        <select
          value={sortBy}
          onChange={(e) => {
            setSortBy(e.target.value);
            setCurrentPage(1);
          }}
          className="comments-sort-select"
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
        </select>
      </div>

      <div className="comments-list">
        {paginatedData.data.map((comment) => (
          <CommentItem key={comment.id} comment={comment} />
        ))}
      </div>

      {paginatedData.totalPages > 1 && (
        <div className="comments-pagination">
          <button
            className="pagination-btn"
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span className="pagination-info">
            Page {paginatedData.page} of {paginatedData.totalPages}
          </span>
          <button
            className="pagination-btn"
            onClick={() =>
              setCurrentPage((p) => Math.min(paginatedData.totalPages, p + 1))
            }
            disabled={currentPage === paginatedData.totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default CommentsList;
