import { Link } from 'react-router-dom';
import './Layout.css';

export default function Layout({ children }) {
  return (
    <div className="layout">
      <header className="layout-header">
        <div className="layout-header-content">
          <h1 className="layout-logo">
            <Link to="/">MyApp</Link>
          </h1>
          <nav className="layout-nav">
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/create">Create Post</Link>
              </li>
              <li>
                <Link to="/profile">Profile</Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <div className="layout-content">
        {children}
      </div>
      <footer className="layout-footer">
        <p>&copy; 2024 MyApp. All rights reserved.</p>
      </footer>
    </div>
  );
}
