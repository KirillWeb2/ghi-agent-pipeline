import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { usePostsContext } from '../App'
import PostItem from '../components/PostItem'
import './PostsList.css'

function PostsList() {
  const { posts, deletePost, searchPosts } = usePostsContext()
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('newest')

  const filteredPosts = useMemo(() => {
    let result = searchQuery ? searchPosts(searchQuery) : posts

    if (sortBy === 'newest') {
      result = [...result].sort((a, b) => 
        new Date(b.createdAt) - new Date(a.createdAt)
      )
    } else if (sortBy === 'oldest') {
      result = [...result].sort((a, b) => 
        new Date(a.createdAt) - new Date(b.createdAt)
      )
    } else if (sortBy === 'title') {
      result = [...result].sort((a, b) => 
        a.title.localeCompare(b.title)
      )
    }

    return result
  }, [posts, searchQuery, sortBy, searchPosts])

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value)
  }

  const handleEditPost = (post) => {
    console.log('Edit post:', post)
    // TODO: Implement edit functionality
  }

  const isEmpty = posts.length === 0
  const isSearchEmpty = searchQuery && filteredPosts.length === 0

  return (
    <div className="posts-list-container">
      <div className="posts-header">
        <h1 className="posts-title">📝 Все посты</h1>
        <p className="posts-subtitle">Всего постов: {posts.length}</p>
      </div>

      {!isEmpty && (
        <div className="search-section">
          <div className="search-box">
            <input
              type="text"
              placeholder="🔍 Поиск по заголовку или тексту..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="search-input"
            />
            {searchQuery && (
              <button
                className="clear-search"
                onClick={() => setSearchQuery('')}
                title="Очистить поиск"
              >
                ✕
              </button>
            )}
          </div>

          <div className="sort-box">
            <label htmlFor="sort-select" className="sort-label">Сортировка:</label>
            <select
              id="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="sort-select"
            >
              <option value="newest">📅 Новые первыми</option>
              <option value="oldest">📅 Старые первыми</option>
              <option value="title">🔤 По алфавиту</option>
            </select>
          </div>
        </div>
      )}

      {isEmpty ? (
        <div className="empty-state">
          <div className="empty-icon">📭</div>
          <h2>Постов еще нет</h2>
          <p>Создайте первый пост, чтобы начать!</p>
          <Link to="/posts/new" className="btn-create">
            ➕ Создать пост
          </Link>
        </div>
      ) : isSearchEmpty ? (
        <div className="empty-state">
          <div className="empty-icon">🔍</div>
          <h2>Ничего не найдено</h2>
          <p>По запросу "{searchQuery}" нет постов</p>
          <button
            className="btn-clear"
            onClick={() => setSearchQuery('')}
          >
            Очистить поиск
          </button>
        </div>
      ) : (
        <div className="posts-grid">
          {filteredPosts.map(post => (
            <PostItem
              key={post.id}
              post={post}
              onDelete={deletePost}
              onEdit={handleEditPost}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default PostsList
