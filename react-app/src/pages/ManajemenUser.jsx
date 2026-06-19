import { useState, useEffect } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'

const API = 'http://localhost:5000/api'
const USERS_PER_PAGE = 5

export default function ManajemenUser() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [selectedUser, setSelectedUser] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [showForm, setShowForm] = useState(false)
  const [editingUser, setEditingUser] = useState(null)
  const [confirmDelete, setConfirmDelete] = useState(null)
  const [formData, setFormData] = useState({
    name: '', username: '', email: '', phone: '',
    role: 'Kasir', password: '',
    address: { street: '', city: '' }
  })

  // Fetch users dari backend
  const getUsers = async () => {
    try {
      const response = await axios.get(`${API}/users`)
      setUsers(response.data)
      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  useEffect(() => {
    getUsers()
  }, [])

  // Filter user
  const filteredUsers = users.filter((user) => {
    const query = search.toLowerCase()
    return (
      !query ||
      user.name.toLowerCase().includes(query) ||
      user.email.toLowerCase().includes(query) ||
      user.username.toLowerCase().includes(query) ||
      user.role.toLowerCase().includes(query)
    )
  })

  // Pagination
  const totalPages = Math.max(1, Math.ceil(filteredUsers.length / USERS_PER_PAGE))
  const safePage = Math.min(currentPage, totalPages)
  const startIndex = (safePage - 1) * USERS_PER_PAGE
  const paginatedUsers = filteredUsers.slice(startIndex, startIndex + USERS_PER_PAGE)
  const showingFrom = filteredUsers.length === 0 ? 0 : startIndex + 1
  const showingTo = Math.min(startIndex + USERS_PER_PAGE, filteredUsers.length)

  const handleSearch = (e) => {
    e.preventDefault()
    setCurrentPage(1)
  }

  const resetForm = () => {
    setFormData({
      name: '', username: '', email: '', phone: '',
      role: 'Kasir', password: '',
      address: { street: '', city: '' }
    })
    setEditingUser(null)
  }

  // Simpan user (Create / Update)
  const handleSave = async (e) => {
    e.preventDefault()
    if (!formData.name || !formData.username || !formData.email) return
    if (!editingUser && !formData.password) {
      alert("Password wajib diisi untuk user baru!");
      return;
    }

    const userPayload = { ...formData };
    if (!userPayload.password) delete userPayload.password;

    try {
      if (editingUser) {
        const response = await axios.put(`${API}/users/${editingUser._id}`, userPayload)
        const updated = users.map(u => u._id === editingUser._id ? response.data : u)
        setUsers(updated)
        if (selectedUser && selectedUser._id === editingUser._id) {
          setSelectedUser(response.data)
        }
        toast.success('Karyawan berhasil diupdate!')
      } else {
        const response = await axios.post(`${API}/users`, userPayload)
        setUsers([response.data, ...users])
        toast.success('Karyawan berhasil ditambahkan!')
      }
      resetForm()
      setShowForm(false)
    } catch (err) {
      console.error('Error saving user', err)
      toast.error('Gagal menyimpan data karyawan')
    }
  }

  // Edit user
  const handleEdit = (user) => {
    setEditingUser(user)
    setFormData({
      name: user.name,
      username: user.username,
      email: user.email,
      phone: user.phone || '',
      role: user.role || 'Kasir',
      password: '', // Kosongkan, hanya isi kalau mau reset
      address: { street: user.address?.street || '', city: user.address?.city || '' }
    })
    setShowForm(true)
  }

  // Hapus user
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API}/users/${id}`)
      setUsers(users.filter(u => u._id !== id))
      if (selectedUser && selectedUser._id === id) {
        setSelectedUser(null)
      }
      setConfirmDelete(null)
      toast.success('Karyawan berhasil dihapus!')
    } catch (err) {
      console.error('Error deleting user', err)
      toast.error('Gagal menghapus karyawan')
    }
  }

  const getRoleBadge = (role) => {
    if (role === 'Admin') return <span className="badge warning">Admin</span>
    if (role === 'Staff Packing') return <span className="badge info">Staff Packing</span>
    return <span className="badge success">Kasir</span>
  }

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading data...</p>
      </div>
    )
  }

  return (
    <div className="fade-in">
      {/* Page Header */}
      <div className="page-header">
        <div>
          <h2>Manajemen Karyawan</h2>
          <p>Kelola akun tim internal (Admin, Kasir, Staff) - Total: {users.length} akun</p>
        </div>
        <button className="btn-primary" onClick={() => { resetForm(); setShowForm(true) }}>
          <span className="material-symbols-outlined" style={{ fontSize: 18 }}>person_add</span>
          Tambah Karyawan
        </button>
      </div>

      {/* Form Pencarian User */}
      <form className="filter-form" onSubmit={handleSearch} style={{ marginBottom: 24 }}>
        <input
          type="text"
          placeholder="Cari berdasarkan nama, username, email, atau jabatan..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value)
            setCurrentPage(1)
          }}
          style={{ flex: 1, minWidth: 200 }}
        />
        <button type="submit">
          <span className="material-symbols-outlined" style={{ fontSize: 18 }}>search</span>
          Cari
        </button>
      </form>

      {/* User Layout */}
      <div className="user-layout">
        {/* Left - User Table */}
        <section>
          <div className="table-card">
            <div className="table-responsive">
              <table>
                <thead>
                  <tr>
                  <th>Nama</th>
                  <th>Jabatan</th>
                  <th>Email / Username</th>
                  <th>Telepon</th>
                  <th style={{ textAlign: 'center' }}>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {paginatedUsers.length > 0 ? (
                  paginatedUsers.map((user) => (
                    <tr key={user._id} onClick={() => setSelectedUser(user)} style={{ cursor: 'pointer' }}>
                      <td style={{ fontWeight: 500 }}>{user.name}</td>
                      <td>{getRoleBadge(user.role)}</td>
                      <td style={{ color: '#64748B' }}>
                        <div>{user.email.toLowerCase()}</div>
                        <div style={{ fontSize: 12 }}>@{user.username.toLowerCase()}</div>
                      </td>
                      <td style={{ color: '#64748B' }}>{user.phone || '-'}</td>
                      <td>
                        <div className="action-btns" style={{ justifyContent: 'center' }}>
                          <button onClick={(e) => { e.stopPropagation(); setSelectedUser(user) }} title="Lihat Detail">
                            <span className="material-symbols-outlined" style={{ fontSize: 18 }}>visibility</span>
                          </button>
                          <button onClick={(e) => { e.stopPropagation(); handleEdit(user) }} title="Edit User">
                            <span className="material-symbols-outlined" style={{ fontSize: 18 }}>edit</span>
                          </button>
                          <button onClick={(e) => { e.stopPropagation(); setConfirmDelete(user._id) }} title="Hapus User">
                            <span className="material-symbols-outlined" style={{ fontSize: 18, color: '#EF4444' }}>delete</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5">
                      <div className="empty-state">
                        <span className="material-symbols-outlined">person_off</span>
                        <h3>Tidak ada karyawan ditemukan</h3>
                        <p>Coba ubah kata kunci pencarian</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            </div>

            {/* Pagination */}
            {filteredUsers.length > 0 && (
              <div className="pagination">
                <span>Menampilkan {showingFrom} - {showingTo} dari {filteredUsers.length}</span>
                <div className="pagination-btns">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={safePage <= 1}
                  >
                    <span className="material-symbols-outlined" style={{ fontSize: 18 }}>chevron_left</span>
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={page === safePage ? 'active' : ''}
                    >
                      {page}
                    </button>
                  ))}
                  <button
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    disabled={safePage >= totalPages}
                  >
                    <span className="material-symbols-outlined" style={{ fontSize: 18 }}>chevron_right</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Right - Detail Panel */}
        <aside>
          {selectedUser ? (
            <div className="user-detail-panel fade-in">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                {getRoleBadge(selectedUser.role)}
                <button onClick={() => setSelectedUser(null)} style={{ background: 'none', padding: 4, borderRadius: 8, color: '#94A3B8' }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 18 }}>close</span>
                </button>
              </div>
              <div style={{ width: 80, height: 80, borderRadius: '50%', background: '#003C90', color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, fontWeight: 700, margin: '0 auto 12px', border: '3px solid #DBEAFE' }}>
                {selectedUser.name.charAt(0)}
              </div>
              <h3>{selectedUser.name}</h3>
              <p style={{ color: '#64748B', fontSize: 13, marginBottom: 4 }}>@{selectedUser.username.toLowerCase()}</p>

              <div className="user-detail-info">
                <div className="detail-item">
                  <span className="material-symbols-outlined">mail</span>
                  <div>
                    <label>Email</label>
                    <span>{selectedUser.email.toLowerCase()}</span>
                  </div>
                </div>
                <div className="detail-item">
                  <span className="material-symbols-outlined">phone</span>
                  <div>
                    <label>Telepon</label>
                    <span>{selectedUser.phone || '-'}</span>
                  </div>
                </div>
                <div className="detail-item">
                  <span className="material-symbols-outlined">location_on</span>
                  <div>
                    <label>Alamat</label>
                    <span>{selectedUser.address?.street || ''}{selectedUser.address?.street && selectedUser.address?.city ? ', ' : ''}{selectedUser.address?.city || '-'}</span>
                  </div>
                </div>
              </div>

              {/* Tombol Edit & Hapus di detail panel */}
              <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
                <button className="btn-primary" onClick={() => handleEdit(selectedUser)} style={{ flex: 1 }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 16, verticalAlign: 'middle', marginRight: 4 }}>edit</span>
                  Edit
                </button>
                <button className="btn-primary" style={{ background: '#EF4444', borderColor: '#EF4444', flex: 'none', width: 'auto' }} onClick={() => setConfirmDelete(selectedUser._id)}>
                  <span className="material-symbols-outlined" style={{ fontSize: 16 }}>delete</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="user-detail-panel hide-on-mobile">
              <div className="user-detail-placeholder">
                <span className="material-symbols-outlined">person_search</span>
                <p style={{ fontWeight: 500 }}>Pilih karyawan dari tabel untuk melihat detail</p>
              </div>
            </div>
          )}
        </aside>
      </div>

      {/* Modal Form Tambah/Edit User */}
      {showForm && (
        <div className="modal-overlay" onClick={() => { setShowForm(false); resetForm() }}>
          <div className="modal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 550 }}>
            <div className="modal-body">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                <h3 style={{ fontSize: 20 }}>{editingUser ? 'Edit Karyawan' : 'Tambah Karyawan Baru'}</h3>
                <button onClick={() => { setShowForm(false); resetForm() }} style={{ background: 'none', padding: 4, borderRadius: 8, color: '#94A3B8' }}>
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>

              <form onSubmit={handleSave}>
                <div style={{ display: 'flex', gap: 12 }}>
                  <div className="form-group" style={{ flex: 1 }}>
                    <label>Nama Lengkap</label>
                    <input type="text" placeholder="Ilham Arifin" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
                  </div>
                  <div className="form-group" style={{ flex: 1 }}>
                    <label>Username</label>
                    <input type="text" placeholder="ilham.arifin" value={formData.username} onChange={(e) => setFormData({ ...formData, username: e.target.value })} required />
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 12 }}>
                  <div className="form-group" style={{ flex: 1 }}>
                    <label>Email</label>
                    <input type="email" placeholder="ilham@tokoku.com" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
                  </div>
                  <div className="form-group" style={{ flex: 1 }}>
                    <label>Telepon</label>
                    <input type="tel" placeholder="081234567890" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
                  </div>
                </div>

                <div style={{ display: 'flex', gap: 12 }}>
                  <div className="form-group" style={{ flex: 1 }}>
                    <label>Jabatan (Role)</label>
                    <select value={formData.role} onChange={(e) => setFormData({ ...formData, role: e.target.value })}>
                      <option value="Admin">Admin</option>
                      <option value="Kasir">Kasir</option>
                      <option value="Staff Packing">Staff Packing</option>
                    </select>
                  </div>
                  <div className="form-group" style={{ flex: 1 }}>
                    <label>Password {editingUser && '(Kosongkan jika tidak diubah)'}</label>
                    <input type="password" placeholder="***" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} required={!editingUser} />
                  </div>
                </div>

                <div style={{ display: 'flex', gap: 12 }}>
                  <div className="form-group" style={{ flex: 1 }}>
                    <label>Alamat (Jalan)</label>
                    <input type="text" placeholder="Jl. Merdeka No. 10" value={formData.address.street} onChange={(e) => setFormData({ ...formData, address: { ...formData.address, street: e.target.value } })} />
                  </div>
                  <div className="form-group" style={{ flex: 1 }}>
                    <label>Kota</label>
                    <input type="text" placeholder="Jakarta" value={formData.address.city} onChange={(e) => setFormData({ ...formData, address: { ...formData.address, city: e.target.value } })} />
                  </div>
                </div>
                
                <div className="form-actions">
                  <button type="button" className="btn-secondary" onClick={() => { setShowForm(false); resetForm() }}>Batal</button>
                  <button type="submit" className="btn-primary" style={{ flex: 1 }}>{editingUser ? 'Update Data' : 'Simpan Karyawan'}</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Modal Konfirmasi Hapus */}
      {confirmDelete && (
        <div className="modal-overlay" onClick={() => setConfirmDelete(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 400 }}>
            <div className="modal-body" style={{ textAlign: 'center', padding: 30 }}>
              <span className="material-symbols-outlined" style={{ fontSize: 48, color: '#EF4444', marginBottom: 12 }}>warning</span>
              <h3 style={{ marginBottom: 8 }}>Hapus Karyawan?</h3>
              <p style={{ color: '#64748B', marginBottom: 20 }}>Akun yang dihapus tidak dapat mengakses sistem lagi.</p>
              <div className="form-actions">
                <button type="button" className="btn-secondary" onClick={() => setConfirmDelete(null)}>Batal</button>
                <button type="button" className="btn-primary" style={{ flex: 1, background: '#EF4444', borderColor: '#EF4444' }} onClick={() => handleDelete(confirmDelete)}>Ya, Hapus</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
