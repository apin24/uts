import { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { AuthContext } from '../context/AuthContext';

export default function Settings() {
  const { user } = useContext(AuthContext);
  
  // Profile state
  const [profileForm, setProfileForm] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [isSavingProfile, setIsSavingProfile] = useState(false);

  // Password state
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [isSavingPassword, setIsSavingPassword] = useState(false);

  useEffect(() => {
    if (user) {
      setProfileForm({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || ''
      });
    }
  }, [user]);

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setIsSavingProfile(true);
    try {
      await axios.put('http://localhost:5000/api/users/profile', profileForm);
      toast.success('Profil berhasil diperbarui!');
      setTimeout(() => window.location.reload(), 1000);
    } catch (err) {
      toast.error('Gagal memperbarui profil');
    } finally {
      setIsSavingProfile(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      return toast.error('Konfirmasi password baru tidak cocok!');
    }
    
    setIsSavingPassword(true);
    try {
      await axios.put('http://localhost:5000/api/users/profile', {
        currentPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword
      });
      toast.success('Password berhasil diganti!');
      setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Gagal mengganti password');
    } finally {
      setIsSavingPassword(false);
    }
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h2>Pengaturan Akun</h2>
          <p>Kelola informasi profil dan keamanan akun Anda</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', marginTop: '24px' }}>
        
        {/* Card Profil */}
        <div style={{ background: '#FFF', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
          <h3 style={{ marginBottom: '20px', fontSize: '18px', color: '#0F172A', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="material-symbols-outlined" style={{ color: '#003C90' }}>person</span>
            Informasi Profil
          </h3>
          <form onSubmit={handleProfileSubmit}>
            <div className="form-group">
              <label>Nama Lengkap</label>
              <input type="text" value={profileForm.name} onChange={e => setProfileForm({...profileForm, name: e.target.value})} required />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input type="email" value={profileForm.email} onChange={e => setProfileForm({...profileForm, email: e.target.value})} required />
            </div>
            <div className="form-group">
              <label>No. HP</label>
              <input type="text" value={profileForm.phone} onChange={e => setProfileForm({...profileForm, phone: e.target.value})} />
            </div>
            <button type="submit" disabled={isSavingProfile} style={{ marginTop: '16px', background: '#003C90', color: '#FFF', padding: '10px 16px', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '500', width: '100%' }}>
              {isSavingProfile ? 'Menyimpan...' : 'Simpan Perubahan'}
            </button>
          </form>
        </div>

        {/* Card Ganti Password */}
        <div style={{ background: '#FFF', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
          <h3 style={{ marginBottom: '20px', fontSize: '18px', color: '#0F172A', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="material-symbols-outlined" style={{ color: '#DC2626' }}>lock</span>
            Ganti Password
          </h3>
          <form onSubmit={handlePasswordSubmit}>
            <div className="form-group">
              <label>Password Saat Ini</label>
              <input type="password" value={passwordForm.currentPassword} onChange={e => setPasswordForm({...passwordForm, currentPassword: e.target.value})} required placeholder="Masukkan password lama" />
            </div>
            <div className="form-group">
              <label>Password Baru</label>
              <input type="password" value={passwordForm.newPassword} onChange={e => setPasswordForm({...passwordForm, newPassword: e.target.value})} required placeholder="Masukkan password baru" minLength={6} />
            </div>
            <div className="form-group">
              <label>Konfirmasi Password Baru</label>
              <input type="password" value={passwordForm.confirmPassword} onChange={e => setPasswordForm({...passwordForm, confirmPassword: e.target.value})} required placeholder="Ulangi password baru" minLength={6} />
            </div>
            <button type="submit" disabled={isSavingPassword} style={{ marginTop: '16px', background: '#0F172A', color: '#FFF', padding: '10px 16px', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '500', width: '100%' }}>
              {isSavingPassword ? 'Menyimpan...' : 'Ganti Password'}
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}
