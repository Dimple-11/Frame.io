import { BrowserRouter, Navigate, NavLink, Route, Routes } from 'react-router-dom'
import CreatePost from './pages/CreatePost'
import Feed from './pages/feed'

const App = () => {
  return (
    <BrowserRouter>
      <div className="app-shell">
        <header className="site-header">
          <div className="nav-container">
            <NavLink className="brand" to="/feed">
              Frame.io
            </NavLink>

            <nav className="main-nav" aria-label="Main navigation">
              <NavLink to="/feed">Feed</NavLink>
              <NavLink className="create-link" to="/create">
                Create post
              </NavLink>
            </nav>
          </div>
        </header>

        <main className="page-content">
          <Routes>
            <Route path="/" element={<Navigate to="/feed" replace />} />
            <Route path="/create" element={<CreatePost />} />
            <Route path="/feed" element={<Feed />} />
            <Route path="*" element={<h1 className="not-found">Page Not Found</h1>} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App
