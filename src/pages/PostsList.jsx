import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import PostItem from '../components/PostItem'
import './PostsList.css'

function PostsList({ posts, onDeletePost, onUpdatePost }) {
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('newest')

  const filteredAndSortedPosts = useMemo(() => {
    let result = posts.filter(post => {
      const query = searchQuery.toLowerCase()
      return (
        post.title.toLowerCase().includes(query) ||
        post.body.toLowerCase().includes(query)
      )
    })

    if (sortBy === 'newest') {
      result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    } else if (sortBy === 'oldest') {
      result.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
    } else if (sortBy === 'title-asc') {
      result.sort((a, b) => a.title.localeCompare(b.title))
    } else if (sortBy === 'title-desc') {
      result.sort((a, b) => b.title.localeCompare(a.title))
    }

    return result
  }, [posts, searchQuery, sortBy])

  return (
    <div className="posts-list-container">
      <div className="posts-header">
        <h1 className="posts-title">Все посты</h1>
        <Link to="/posts/new" className="create-post-link">
          + Новый пост
        </Link>
      </div>

      {posts.length > 0 ? (
        <>
          <div className="posts-controls">
            <div className="search-box">
              <input
                type="text"
                className="search-input"
                placeholder="Поиск по заголовку или тексту..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button
                  className="search-clear"
                  onClick={() => setSearchQuery('')}
                  aria-label="Очистить поиск"
                >
                  ✕
                </button>
              )}
            </div>

            <div className="sort-box">
              <label htmlFor="sort-select" className="sort-label">Сортировка:</label>
              <select
                id="sort-select"
                className="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="newest">Новые первыми</option>
                <option value="oldest">Старые первыми</option>
                <option value="title-asc">По названию (А-Я)</option>
                <option value="title-desc">По названию (Я-А)</option>
              </select>
            </div>
          </div>

          {filteredAndSortedPosts.length > 0 ? (
            <>
              <div className="posts-count">
                Показано {filteredAndSortedPosts.length} из {posts.length} постов
              </div>
              <div className="posts-grid">
                {filteredAndSortedPosts.map(post => (
                  <PostItem
                    key={post.id}
                    post={post}
                    onDelete={onDeletePost}
                    onUpdate={onUpdatePost}
                  />
                ))}
              </div>
            </>
          ) : (
            <div className="empty-state">
              <p>По вашему запросу «{searchQuery}» ничего не найдено.</p>
              <button
                className="empty-state-button"
                onClick={() => setSearchQuery('')}
              >
                Очистить поиск
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="empty-state">
          <h2>Нет постов</h2>
          <p>Начните с создания первого поста!</p>
          <Link to="/posts/new" className="empty-state-button">
            Создать пост
          </Link>
        </div>
      )}
    </div>
  )
}

export default PostsList
