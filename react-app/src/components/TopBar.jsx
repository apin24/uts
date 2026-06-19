import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export default function TopBar() {
  const { user } = useContext(AuthContext);

  if (!user) return null;

  return (
    <header>
      <div></div>
      <div className="header-right" style={{ marginLeft: 'auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '6px 16px', background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: 50 }}>
          <div className="profile-avatar" style={{ width: 28, height: 28, fontSize: 12 }}>{user.name.charAt(0).toUpperCase()}</div>
          <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.2 }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: '#0F172A' }}>{user.name}</span>
            <span style={{ fontSize: 11, color: '#64748B' }}>{user.role}</span>
          </div>
        </div>
      </div>
    </header>
  );
}
