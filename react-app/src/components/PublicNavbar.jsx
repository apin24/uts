import { Link, useLocation } from 'react-router-dom'

export default function PublicNavbar() {
  const location = useLocation()

  return (
    <nav className="public-navbar">
      <div className="public-container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '100%' }}>
        <div className="nav-brand">
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
            <span className="material-symbols-outlined" style={{ fontSize: 28, color: '#003C90' }}>storefront</span>
            <span style={{ fontWeight: 800, fontSize: 22, color: '#0F172A', letterSpacing: '-0.5px' }}>Waveneap</span>
          </Link>
        </div>
        
        <div className="nav-links hide-on-mobile" style={{ display: 'flex', gap: 30 }}>
          <Link to="/" className={location.pathname === '/' ? 'active' : ''} style={{ textDecoration: 'none', fontWeight: 600, color: location.pathname === '/' ? '#003C90' : '#64748B', transition: '0.2s' }}>Beranda</Link>
          <Link to="/tentang-kami" className={location.pathname === '/tentang-kami' ? 'active' : ''} style={{ textDecoration: 'none', fontWeight: 600, color: location.pathname === '/tentang-kami' ? '#003C90' : '#64748B', transition: '0.2s' }}>Tentang Kami & FAQ</Link>
        </div>

        <div className="nav-actions">
          <Link to="/dashboard" className="btn-primary" style={{ padding: '10px 24px', borderRadius: 30, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 6, fontSize: 14 }}>
            <span className="material-symbols-outlined" style={{ fontSize: 18 }}>login</span>
            Area Karyawan
          </Link>
        </div>
      </div>
    </nav>
  )
}
