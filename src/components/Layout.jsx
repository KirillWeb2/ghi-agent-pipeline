import { NavLink } from 'react-router-dom'
import './Layout.css'

function Layout({ children }) {
  return (
    <div className="layout">
      <nav className="navbar">
        <div className="navbar-container">
          <h1 className="navbar-title">PostApp</h1>
          <div className="nav-links">
            <NavLink
              to="/posts"
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              Посты
            </NavLink>
            <NavLink
              to="/posts/new"
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              Новый пост
            </NavLink>
          </div>
        </div>
      </nav>
      <main className="main-content">
        {children}
      </main>
    </div>
  )
}

export default Layout
