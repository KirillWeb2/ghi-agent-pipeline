import { useState, useEffect } from 'react';
import PostForm from '../components/PostForm';
import PostItem from '../components/PostItem';
import './PostsList.css';

const PostsList = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const storedPosts = localStorage.getItem('posts');
    if (storedPosts) {
      try {
        const parsedPosts = JSON.parse(storedPosts);
        if (Array.isArray(parsedPosts)) {
          setPosts(parsedPosts);
        } else {
          setPosts([]);
        }
      } catch (err) {
        setError('Ошибка при загрузке постов');
        setPosts([]);
      }
    }
  }, []);

  const handleAddPost = (newPost) => {
    const updatedPosts = [newPost, ...posts];
    setPosts(updatedPosts);
    localStorage.setItem('posts', JSON.stringify(updatedPosts));
  };

  const handleDeletePost = (postId) => {
    const updatedPosts = posts.filter((post) => post.id !== postId);
    setPosts(updatedPosts);
    localStorage.setItem('posts', JSON.stringify(updatedPosts));
  };

  return (
    <main>
      <div className="posts-list-container">
        <h1>Посты</h1>
        {error && <div className="error-message">{error}</div>}
        <PostForm onAddPost={handleAddPost} />
        <div className="posts-grid">
          {posts && posts.length > 0 ? (
            posts.map((post) => (
              <PostItem
                key={post.id}
                post={post}
                onDelete={handleDeletePost}
              />
            ))
          ) : (
            <p className="no-posts">Нет постов. Создайте первый пост!</p>
          )}
        </div>
      </div>
    </main>
  );
};

export default PostsList;