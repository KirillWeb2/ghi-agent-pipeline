import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import PostItem from '../components/PostItem'
import './PostsList.css'

function PostsList({ posts, onDelete, onSearch }) {
  const [searchQuery, setSearchQuery] = useState('')
  const [sortOrder, setSortOrder] = useState('desc')

  const filteredPosts = useMemo(() => {
    let result = onSearch(searchQuery)
    return result.sort((a, b) => {
      const dateA = new Date(a.createdAt)
      const dateB = new Date(b.createdAt)
      return sortOrder === 'desc' ? dateB - dateA : dateA - dateB
    })
  }, [searchQuery, sortOrder, posts, onSearch])

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value)
  }

  const handleSortChange = () => {
    setSortOrder((prev) => (prev === 'desc' ? 'asc' : 'desc'))
  }

  return (
    <div className="posts-list-container">
      <div className="posts-header">
        <h1>Posts</h1>
        <Link to="/posts/new" className="btn btn-primary">
          + New Post
        </Link>
      </div>

      <div className="posts-controls">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search posts by title or body..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="search-input"
          />
        </div>
        <button
          onClick={handleSortChange}
          className="btn btn-secondary"
          title="Sort by date"
        >
          Sort: {sortOrder === 'desc' ? 'Newest' : 'Oldest'}
        </button>
      </div>

      {filteredPosts.length === 0 ? (
        <div className="empty-state">
          <h2>No posts yet</h2>
          <p>
            {searchQuery
              ? 'No posts match your search. Try different keywords.'
              : 'Start by creating your first post!'}
          </p>
          {!searchQuery && (
            <Link to="/posts/new" className="btn btn-primary">
              Create First Post
            </Link>
          )}
        </div>
      ) : (
        <div className="posts-grid">
          {filteredPosts.map((post) => (
            <PostItem key={post.id} post={post} onDelete={onDelete} />
          ))}
        </div>
      )}
    </div>
  )
}

export default PostsList
