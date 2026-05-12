import { NavLink } from 'react-router-dom'
import './Layout.css'

function Layout({ children }) {
  return (
    <div className="layout">
      <header className="header">
        <nav className="nav">
          <NavLink
            to="/posts"
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            Posts
          </NavLink>
          <NavLink
            to="/posts/new"
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            New Post
          </NavLink>
        </nav>
      </header>
      <main className="main-content">
        {children}
      </main>
      <footer className="footer">
        <p>&copy; 2024 Posts App. Built with React Router.</p>
      </footer>
    </div>
  )
}

export default Layout
