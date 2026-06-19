import { NavLink, useNavigate } from 'react-router-dom'
import { useState, useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

export default function Sidebar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { user, logout } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleLogout = (e) => {
    e.preventDefault()
    logout()
    navigate('/login')
  }

  if (!user) return null

  return (
    <>
      {mobileOpen && (
        <div className={`mobile-overlay ${mobileOpen ? 'active' : ''}`} onClick={() => setMobileOpen(false)} />
      )}

      <button className={`mobile-toggle ${mobileOpen ? 'open' : ''}`} onClick={() => setMobileOpen(!mobileOpen)}>
        <span className="material-symbols-outlined">{mobileOpen ? 'close' : 'menu'}</span>
      </button>

      <aside className={`sidebar ${mobileOpen ? 'open' : ''}`}>
        <div className="sidebar-brand">
          <div className="sidebar-brand-icon">
            <span className="material-symbols-outlined icon-fill">account_balance</span>
          </div>
          <div>
            <h1>FinTrack</h1>
            <p>Enterprise Manager</p>
          </div>
        </div>

        <nav className="sidebar-nav">
          {['Admin', 'Kasir'].includes(user.role) && (
            <NavLink to="/dashboard" end className={({ isActive }) => isActive ? 'active' : ''} onClick={() => setMobileOpen(false)}>
              <span className="material-symbols-outlined">dashboard</span>
              Dashboard
            </NavLink>
          )}
          {['Admin', 'Kasir', 'Staff Packing'].includes(user.role) && (
            <NavLink to="/dashboard/produk" className={({ isActive }) => isActive ? 'active' : ''} onClick={() => setMobileOpen(false)}>
              <span className="material-symbols-outlined">inventory_2</span>
              Katalog Produk
            </NavLink>
          )}
          {user.role === 'Admin' && (
            <NavLink to="/dashboard/user" className={({ isActive }) => isActive ? 'active' : ''} onClick={() => setMobileOpen(false)}>
              <span className="material-symbols-outlined">group</span>
              Manajemen User
            </NavLink>
          )}
        </nav>

        <div className="sidebar-bottom">
          <NavLink to="/dashboard/settings" className={({ isActive }) => isActive ? 'active' : ''} onClick={() => setMobileOpen(false)}>
            <span className="material-symbols-outlined">settings</span> Pengaturan
          </NavLink>
          <a href="#logout" className="logout" onClick={handleLogout}>
            <span className="material-symbols-outlined">logout</span> Logout
          </a>
        </div>
      </aside>
    </>
  )
}
