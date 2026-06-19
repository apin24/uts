import { useState, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user, login } = useContext(AuthContext);

  if (user) {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    await login(username, password);
    setIsSubmitting(false);
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#F1F5F9' }}>
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
        <div style={{ width: '100%', maxWidth: 420, background: '#FFF', borderRadius: 20, padding: 40, boxShadow: '0 10px 25px rgba(0,0,0,0.05)' }}>
          <div style={{ textAlign: 'center', marginBottom: 32 }}>
            <div style={{ width: 64, height: 64, background: '#003C90', borderRadius: 16, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: '#FFF', marginBottom: 16 }}>
              <span className="material-symbols-outlined" style={{ fontSize: 32 }}>account_balance</span>
            </div>
            <h1 style={{ fontSize: 24, fontWeight: 700, color: '#0F172A', marginBottom: 8 }}>FinTrack</h1>
            <p style={{ color: '#64748B', fontSize: 14 }}>Enterprise Manager</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-group" style={{ marginBottom: 20 }}>
              <label>Username</label>
              <input 
                type="text" 
                placeholder="Masukkan username" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                style={{ padding: '12px 16px' }}
              />
            </div>
            <div className="form-group" style={{ marginBottom: 24 }}>
              <label>Password</label>
              <input 
                type="password" 
                placeholder="Masukkan password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{ padding: '12px 16px' }}
              />
            </div>
            <button 
              type="submit" 
              disabled={isSubmitting}
              style={{ 
                width: '100%', 
                padding: 14, 
                background: '#003C90', 
                color: '#FFF', 
                border: 'none', 
                borderRadius: 12, 
                fontSize: 16, 
                fontWeight: 600, 
                cursor: isSubmitting ? 'not-allowed' : 'pointer',
                opacity: isSubmitting ? 0.7 : 1,
                transition: '0.2s'
              }}
            >
              {isSubmitting ? 'Loading...' : 'Login ke Dashboard'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
