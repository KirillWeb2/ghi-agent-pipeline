import { NavLink } from 'react-router-dom'
import './Layout.css'

function Layout({ children }) {
  return (
    <div className="layout">
      <header className="header">
        <div className="header-content">
          <h1 className="logo">✨ PostHub</h1>
          <nav className="nav">
            <NavLink 
              to="/posts" 
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              <span className="nav-icon">📝</span>
              Посты
            </NavLink>
            <NavLink 
              to="/posts/new" 
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              <span className="nav-icon">➕</span>
              Новый пост
            </NavLink>
          </nav>
        </div>
      </header>
      <main className="main-content">
        {children}
      </main>
    </div>
  )
}

export default Layout
