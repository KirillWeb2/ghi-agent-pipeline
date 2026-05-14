import { Link } from 'react-router-dom';
import { useCallback } from 'react';
import useComments from '../hooks/useComments';
import './PostItem.css';

const PostItem = ({ post }) => {
  const { getCommentCount } = useComments();
  const commentCount = getCommentCount(post.id);

  return (
    <div className="post-item">
      <h3>
        <Link to={`/post/${post.id}`}>{post.title}</Link>
      </h3>
      <p className="post-excerpt">{post.content.substring(0, 150)}...</p>
      <div className="post-meta">
        <span className="post-author">by {post.author}</span>
        <span className="post-date">{new Date(post.createdAt).toLocaleDateString()}</span>
        <Link to={`/post/${post.id}`} className="post-comments-link">
          {commentCount} {commentCount === 1 ? 'comment' : 'comments'}
        </Link>
      </div>
      <Link to={`/post/${post.id}`} className="post-read-more">
        Read More →
      </Link>
    </div>
  );
};

export default PostItem;
