import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Sidebar from './components/Sidebar'
import TopBar from './components/TopBar'
import Dashboard from './pages/Dashboard'
import KatalogProduk from './pages/KatalogProduk'
import ManajemenUser from './pages/ManajemenUser'
import Login from './pages/Login'
import Settings from './pages/Settings'
import Home from './pages/Home'
import About from './pages/About'
import PublicNavbar from './components/PublicNavbar'
import PublicFooter from './components/PublicFooter'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Toaster position="top-center" toastOptions={{ style: { fontSize: '14px', borderRadius: '10px', fontWeight: 500 } }} />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={
            <div className="public-layout">
              <PublicNavbar />
              <main style={{ minHeight: 'calc(100vh - 140px)' }}>
                <Home />
              </main>
              <PublicFooter />
            </div>
          } />
          <Route path="/tentang-kami" element={
            <div className="public-layout">
              <PublicNavbar />
              <main style={{ minHeight: 'calc(100vh - 140px)' }}>
                <About />
              </main>
              <PublicFooter />
            </div>
          } />
          <Route path="/login" element={<Login />} />

          {/* Admin Routes */}
          <Route path="/dashboard/*" element={
            <div className="app-layout">
              <Sidebar />
              <div className="main-content">
                <TopBar />
                <main>
                  <Routes>
                    <Route path="/" element={<ProtectedRoute allowedRoles={['Admin', 'Kasir']}><Dashboard /></ProtectedRoute>} />
                    <Route path="/produk" element={<ProtectedRoute allowedRoles={['Admin', 'Kasir', 'Staff Packing']}><KatalogProduk /></ProtectedRoute>} />
                    <Route path="/user" element={<ProtectedRoute allowedRoles={['Admin']}><ManajemenUser /></ProtectedRoute>} />
                    <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
                    <Route path="*" element={<Navigate to="/dashboard" replace />} />
                  </Routes>
                </main>
                <footer>
                  <p>&copy; 2026 Kelompok Final Project | <a href="https://github.com/apin24/uts" target="_blank" rel="noopener noreferrer">GitHub</a></p>
                </footer>
              </div>
            </div>
          } />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
