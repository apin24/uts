import { useState, useEffect } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'

const API = 'http://localhost:5000/api'

export default function Dashboard() {
  const [loading, setLoading] = useState(true)
  const [transactions, setTransactions] = useState([])
  const [allTransactions, setAllTransactions] = useState([])
  const [products, setProducts] = useState([])
  const [users, setUsers] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedMonth, setSelectedMonth] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [editingTx, setEditingTx] = useState(null)
  const [confirmDelete, setConfirmDelete] = useState(null)
  const [newTx, setNewTx] = useState({
    name: '', category: 'Penjualan Produk', amount: '', status: 'Success',
    platform: 'Shopee', productId: '', variantSize: '', notes: '', isIncome: true
  })
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const incomeCategories = ['Penjualan Produk']
  const expenseCategories = ['Jasa Iklan', 'Jasa Fotografer', 'Stok Barang', 'Gaji', 'Operasional', 'Lainnya']

  // Fetch all data dari backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [txRes, prodRes, userRes] = await Promise.all([
          axios.get(`${API}/transactions`),
          axios.get(`${API}/products`),
          axios.get(`${API}/users`)
        ])
        setTransactions(txRes.data)
        setAllTransactions(txRes.data)
        setProducts(prodRes.data)
        setUsers(userRes.data)
        setLoading(false)
      } catch (err) {
        console.error('Error fetching data', err)
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  // Listen event dari sidebar button
  useEffect(() => {
    const handleOpen = () => { resetForm(); setShowForm(true) }
    window.addEventListener('openNewTransaction', handleOpen)
    return () => window.removeEventListener('openNewTransaction', handleOpen)
  }, [])

  const formatRupiah = (num) => `Rp ${num.toLocaleString('id-ID')}`

  // Data filter by month for stats & charts
  const monthlyTransactions = selectedMonth
    ? allTransactions.filter(tx => {
        const d = new Date(tx.date)
        if (isNaN(d.getTime())) return false // safe fallback
        const ym = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
        return ym === selectedMonth
      })
    : allTransactions

  // Hitung statistik dari data database
  const totalRevenue = monthlyTransactions.filter(t => t.isIncome).reduce((sum, t) => sum + t.amount, 0)
  const totalExpense = monthlyTransactions.filter(t => !t.isIncome).reduce((sum, t) => sum + t.amount, 0)
  const totalTransaksi = monthlyTransactions.length
  const totalProduk = products.length
  const totalKaryawan = users.length

  // Hitung persentase pemasukan vs pengeluaran
  const totalAll = totalRevenue + totalExpense
  const incomePercent = totalAll > 0 ? Math.round((totalRevenue / totalAll) * 100) : 0
  const expensePercent = totalAll > 0 ? 100 - incomePercent : 0

  // Pagination logic
  const totalPages = Math.ceil(transactions.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const currentTransactions = transactions.slice(startIndex, startIndex + itemsPerPage)

  // Filter (Month + Search)
  useEffect(() => {
    let filtered = monthlyTransactions
    if (searchQuery) {
      const q = searchQuery.toLowerCase()
      filtered = filtered.filter(tx =>
        tx.name.toLowerCase().includes(q) ||
        tx.category.toLowerCase().includes(q) ||
        tx.platform.toLowerCase().includes(q)
      )
    }
    setTransactions(filtered)
    setCurrentPage(1)
  }, [allTransactions, selectedMonth, searchQuery])

  const handleFilter = (e) => {
    e.preventDefault() // Now handled automatically by useEffect
  }

  const exportToCSV = () => {
    const headers = ['Tanggal', 'Platform', 'Nama Transaksi', 'Kategori', 'Tipe', 'Nominal', 'Status', 'Catatan']
    const rows = transactions.map(tx => [
      `"${tx.date}"`,
      `"${tx.platform}"`,
      `"${tx.name}${tx.variantSize ? ` (Size: ${tx.variantSize})` : ''}"`,
      `"${tx.category}"`,
      `"${tx.isIncome ? 'Pemasukan' : 'Pengeluaran'}"`,
      tx.amount,
      `"${tx.status}"`,
      `"${tx.notes || ''}"`
    ])
    
    const csvContent = "data:text/csv;charset=utf-8," 
      + headers.join(',') + '\n' 
      + rows.map(e => e.join(',')).join('\n')
      
    const encodedUri = encodeURI(csvContent)
    const link = document.createElement('a')
    link.setAttribute('href', encodedUri)
    link.setAttribute('download', `Laporan_Transaksi${selectedMonth ? '_' + selectedMonth : '_Semua'}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    toast.success('Berhasil mendownload Excel/CSV!')
  }

  const resetForm = () => {
    setNewTx({ name: '', category: 'Penjualan Produk', amount: '', status: 'Success', platform: 'Shopee', productId: '', variantSize: '', notes: '', isIncome: true })
    setEditingTx(null)
  }

  const handleJenisChange = (isIncome) => {
    setNewTx({
      ...newTx,
      isIncome,
      category: isIncome ? 'Penjualan Produk' : 'Jasa Iklan',
      productId: '',
      variantSize: '',
      name: ''
    })
  }

  // Saat pilih produk dari katalog
  const handleProductSelect = (productId) => {
    const product = products.find(p => p._id === productId)
    if (product) {
      setNewTx({ ...newTx, productId, variantSize: '', name: product.title + ' - Terjual', amount: product.price })
    } else {
      setNewTx({ ...newTx, productId: '', variantSize: '', name: '', amount: '' })
    }
  }

  // Simpan transaksi (Create / Update)
  const handleSaveTransaction = async (e) => {
    e.preventDefault()
    if (!newTx.name || !newTx.amount) return

    const today = new Date()
    const dateStr = today.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })

    const txPayload = {
      date: editingTx ? editingTx.date : dateStr,
      name: newTx.name,
      category: newTx.category,
      amount: parseInt(newTx.amount),
      isIncome: newTx.isIncome,
      status: newTx.status,
      platform: newTx.platform,
      productId: newTx.productId || null,
      variantSize: newTx.variantSize || null,
      notes: newTx.notes
    }

    try {
      if (editingTx) {
        const response = await axios.put(`${API}/transactions/${editingTx._id}`, txPayload)
        const updated = allTransactions.map(t => t._id === editingTx._id ? response.data : t)
        setAllTransactions(updated)
        setTransactions(updated)
        toast.success('Transaksi berhasil diupdate!')
      } else {
        const response = await axios.post(`${API}/transactions`, txPayload)
        setAllTransactions([response.data, ...allTransactions])
        setTransactions([response.data, ...transactions])
        toast.success('Transaksi berhasil ditambahkan!')
      }
      resetForm()
      setShowForm(false)
    } catch (err) {
      console.error('Error saving transaction', err)
      toast.error('Gagal menyimpan transaksi')
    }
  }

  // Edit transaksi
  const handleEdit = (tx) => {
    setEditingTx(tx)
    setNewTx({
      name: tx.name,
      category: tx.category,
      amount: tx.amount,
      status: tx.status,
      platform: tx.platform || 'Lainnya',
      productId: tx.productId || '',
      variantSize: tx.variantSize || '',
      notes: tx.notes || '',
      isIncome: tx.isIncome
    })
    setShowForm(true)
  }

  // Hapus transaksi
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API}/transactions/${id}`)
      const updated = allTransactions.filter(t => t._id !== id)
      setAllTransactions(updated)
      setTransactions(updated)
      setConfirmDelete(null)
      toast.success('Transaksi berhasil dihapus!')
    } catch (err) {
      console.error('Error deleting transaction', err)
      toast.error('Gagal menghapus transaksi')
    }
  }

  const platformIcon = (p) => {
    if (p === 'Shopee') return <span className="material-symbols-outlined" style={{ fontSize: 18, verticalAlign: 'middle', marginRight: 4, color: '#f4511e' }}>shopping_bag</span>
    if (p === 'Tokopedia') return <span className="material-symbols-outlined" style={{ fontSize: 18, verticalAlign: 'middle', marginRight: 4, color: '#42b549' }}>local_mall</span>
    if (p === 'Offline') return <span className="material-symbols-outlined" style={{ fontSize: 18, verticalAlign: 'middle', marginRight: 4, color: '#0F172A' }}>storefront</span>
    return <span className="material-symbols-outlined" style={{ fontSize: 18, verticalAlign: 'middle', marginRight: 4, color: '#64748B' }}>receipt_long</span>
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
      <section>
        <div className="page-header">
          <div>
            <h2>Dashboard Keuangan</h2>
            <p>Ringkasan performa keuangan toko Anda</p>
          </div>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <input 
              type={selectedMonth ? "month" : "text"}
              placeholder="Semua Waktu (Pilih Bulan)"
              onFocus={(e) => e.target.type = 'month'}
              onBlur={(e) => { if (!e.target.value) e.target.type = 'text' }}
              value={selectedMonth} 
              onChange={(e) => setSelectedMonth(e.target.value)} 
              style={{ padding: '8px 16px', borderRadius: 10, border: '1px solid #E2E8F0', fontFamily: 'inherit', color: '#0F172A', outline: 'none', cursor: 'pointer' }}
              title="Filter per Bulan"
            />
            <button className="btn-primary" onClick={() => { resetForm(); setShowForm(true) }}>
              <span className="material-symbols-outlined" style={{ fontSize: 18 }}>add</span>
              Transaksi Baru
            </button>
          </div>
        </div>
      </section>

      {/* Statistik Cards - dihitung dari database */}
      <section>
        <div className="statistic-cards">
          <div className="statistic-card revenue">
            <div>
              <p className="stat-label">Total Pemasukan</p>
              <h3 className="stat-value">{formatRupiah(totalRevenue)}</h3>
              <p className="stat-change">
                <span className="material-symbols-outlined" style={{ fontSize: 16 }}>trending_up</span>
                dari {monthlyTransactions.filter(t => t.isIncome).length} transaksi
              </p>
            </div>
            <div className="stat-icon">
              <span className="material-symbols-outlined icon-fill">account_balance_wallet</span>
            </div>
          </div>

          <div className="statistic-card" style={{ borderLeft: '4px solid #EF4444' }}>
            <div>
              <p className="stat-label">Total Pengeluaran</p>
              <h3 className="stat-value">{formatRupiah(totalExpense)}</h3>
              <p className="stat-change" style={{ color: '#EF4444' }}>
                <span className="material-symbols-outlined" style={{ fontSize: 16 }}>trending_down</span>
                dari {monthlyTransactions.filter(t => !t.isIncome).length} transaksi
              </p>
            </div>
            <div className="stat-icon">
              <span className="material-symbols-outlined">money_off</span>
            </div>
          </div>

          <div className="statistic-card">
            <div>
              <p className="stat-label">Total Transaksi</p>
              <h3 className="stat-value">{totalTransaksi}</h3>
              <p className="stat-change" style={{ color: '#64748B' }}>Semua transaksi</p>
            </div>
            <div className="stat-icon">
              <span className="material-symbols-outlined">receipt_long</span>
            </div>
          </div>

          <div className="statistic-card">
            <div>
              <p className="stat-label">Produk & Karyawan</p>
              <h3 className="stat-value">{totalProduk} / {totalKaryawan}</h3>
              <p className="stat-change" style={{ color: '#64748B' }}>Produk / Karyawan</p>
            </div>
            <div className="stat-icon">
              <span className="material-symbols-outlined">inventory_2</span>
            </div>
          </div>
        </div>
      </section>

      {/* Charts Section */}
      <section className="charts-section">
        <div className="chart-card">
          <h3>Transaksi per Platform</h3>
          <div className="bar-chart">
            {['Shopee', 'Tokopedia', 'Offline', 'Lainnya'].map((p) => {
              const count = monthlyTransactions.filter(t => t.platform === p).length
              const maxCount = Math.max(...['Shopee', 'Tokopedia', 'Offline', 'Lainnya'].map(pl => monthlyTransactions.filter(t => t.platform === pl).length), 1)
              return (
                <div className="bar-item" key={p}>
                  <div className={`bar ${p === 'Shopee' ? 'primary' : 'light'}`} style={{ height: `${(count / maxCount) * 100}%` }}></div>
                  <span className="bar-label" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{platformIcon(p)} {p}</span>
                </div>
              )
            })}
          </div>
        </div>

        <div className="chart-card">
          <h3>Pemasukan vs Pengeluaran</h3>
          <div className="donut-container">
            <div className="donut" style={{ background: `conic-gradient(#003C90 0% ${incomePercent}%, #F59E0B ${incomePercent}% 100%)` }}></div>
            <div className="donut-legend">
              <div className="legend-item">
                <div>
                  <span className="legend-dot" style={{ background: '#003C90' }}></span>
                  Pemasukan
                </div>
                <strong>{incomePercent}%</strong>
              </div>
              <div className="legend-item">
                <div>
                  <span className="legend-dot" style={{ background: '#F59E0B' }}></span>
                  Pengeluaran
                </div>
                <strong>{expensePercent}%</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tabel Transaksi */}
      <section>
        <div className="table-card">
          <div className="table-header">
            <h3>Transaksi Terbaru</h3>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <form className="filter-form" onSubmit={handleFilter} style={{ display: 'flex', gap: 8 }}>
                <input
                  type="text"
                  placeholder="Cari transaksi / kategori / platform..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{ minWidth: 200, padding: '8px 16px', borderRadius: 8, border: '1px solid #E2E8F0' }}
                />
              </form>
              <button className="btn-secondary" onClick={exportToCSV} style={{ padding: '8px 16px', display: 'flex', alignItems: 'center', gap: 6 }}>
                <span className="material-symbols-outlined" style={{ fontSize: 18, color: '#16A34A' }}>download</span>
                Export Excel
              </button>
            </div>
          </div>
          <div className="table-responsive">
            <table>
              <thead>
                <tr>
                <th>Tanggal</th>
                <th>Platform</th>
                <th>Nama Transaksi</th>
                <th>Kategori</th>
                <th style={{ textAlign: 'right' }}>Nominal</th>
                <th style={{ textAlign: 'center' }}>Status</th>
                <th style={{ textAlign: 'center' }}>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {currentTransactions.length > 0 ? (
                currentTransactions.map((tx) => (
                  <tr key={tx._id}>
                    <td style={{ color: '#64748B' }}>{tx.date}</td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        {platformIcon(tx.platform)} {tx.platform}
                      </div>
                    </td>
                    <td style={{ fontWeight: 500 }}>
                      {tx.name}
                      {tx.variantSize && (
                        <span style={{ marginLeft: 8, padding: '2px 6px', background: '#F1F5F9', color: '#64748B', borderRadius: 4, fontSize: 12, border: '1px solid #E2E8F0' }}>
                          Size: {tx.variantSize}
                        </span>
                      )}
                    </td>
                    <td>{tx.category}</td>
                    <td style={{ textAlign: 'right', fontWeight: 500, color: tx.isIncome ? '#16A34A' : '#EF4444' }}>
                      {tx.isIncome ? '+ ' : '- '}{formatRupiah(tx.amount)}
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      <span className={`badge ${tx.status === 'Success' ? 'success' : tx.status === 'Pending' ? 'warning' : 'error'}`}>
                        <span className="badge-dot"></span>
                        {tx.status}
                      </span>
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      <div className="action-btns">
                        <button title="Edit" onClick={() => handleEdit(tx)}>
                          <span className="material-symbols-outlined" style={{ fontSize: 18 }}>edit</span>
                        </button>
                        <button title="Hapus" onClick={() => setConfirmDelete(tx._id)}>
                          <span className="material-symbols-outlined" style={{ fontSize: 18, color: '#EF4444' }}>delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" style={{ textAlign: 'center', padding: 40, color: '#94A3B8' }}>
                    Tidak ada transaksi ditemukan.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          </div>
          
          {/* Pagination Controls */}
          {transactions.length > 0 && (
            <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 16, padding: '16px 24px', borderTop: '1px solid #E2E8F0' }}>
              <span style={{ fontSize: 13, color: '#64748B' }}>
                Menampilkan {startIndex + 1} - {Math.min(startIndex + itemsPerPage, transactions.length)} dari {transactions.length} transaksi
              </span>
              <div style={{ display: 'flex', gap: 8 }}>
                <button 
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))} 
                  disabled={currentPage === 1}
                  style={{ padding: '6px', borderRadius: 6, border: '1px solid #E2E8F0', background: currentPage === 1 ? '#F8FAFC' : '#fff', color: currentPage === 1 ? '#94A3B8' : '#0F172A', cursor: currentPage === 1 ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center' }}
                >
                  <span className="material-symbols-outlined" style={{ fontSize: 20 }}>chevron_left</span>
                </button>
                <button 
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} 
                  disabled={currentPage === totalPages}
                  style={{ padding: '6px', borderRadius: 6, border: '1px solid #E2E8F0', background: currentPage === totalPages ? '#F8FAFC' : '#fff', color: currentPage === totalPages ? '#94A3B8' : '#0F172A', cursor: currentPage === totalPages ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center' }}
                >
                  <span className="material-symbols-outlined" style={{ fontSize: 20 }}>chevron_right</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Modal Form Transaksi */}
      {showForm && (
        <div className="modal-overlay" onClick={() => { setShowForm(false); resetForm() }}>
          <div className="modal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 550 }}>
            <div className="modal-body">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                <h3 style={{ fontSize: 20 }}>{editingTx ? 'Edit Transaksi' : 'Tambah Transaksi Baru'}</h3>
                <button onClick={() => { setShowForm(false); resetForm() }} style={{ background: 'none', padding: 4, borderRadius: 8, color: '#94A3B8' }}>
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>

              <form onSubmit={handleSaveTransaction}>
                {/* Jenis Transaksi */}
                <div className="form-group">
                  <label>Jenis Transaksi</label>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button type="button"
                      className={newTx.isIncome ? 'btn-primary' : 'btn-secondary'}
                      onClick={() => handleJenisChange(true)}
                      style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}
                    ><span className="material-symbols-outlined" style={{ fontSize: 18 }}>payments</span> Pemasukan</button>
                    <button type="button"
                      className={!newTx.isIncome ? 'btn-primary' : 'btn-secondary'}
                      onClick={() => handleJenisChange(false)}
                      style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, background: !newTx.isIncome ? '#EF4444' : undefined, borderColor: !newTx.isIncome ? '#EF4444' : undefined }}
                    ><span className="material-symbols-outlined" style={{ fontSize: 18 }}>money_off</span> Pengeluaran</button>
                  </div>
                </div>

                {/* Platform */}
                <div className="form-group">
                  <label>Platform</label>
                  <select value={newTx.platform} onChange={(e) => setNewTx({ ...newTx, platform: e.target.value })}>
                    <option value="Shopee">Shopee</option>
                    <option value="Tokopedia">Tokopedia</option>
                    <option value="Offline">Offline</option>
                    <option value="Lainnya">Lainnya</option>
                  </select>
                </div>

                {/* Pilih Produk (hanya untuk Pemasukan) */}
                {newTx.isIncome && (
                  <div style={{ display: 'flex', gap: 12 }}>
                    <div className="form-group" style={{ flex: 2 }}>
                      <label>Pilih Produk (dari Katalog)</label>
                      <select value={newTx.productId} onChange={(e) => handleProductSelect(e.target.value)}>
                        <option value="">-- Pilih produk atau isi manual --</option>
                        {products.map(p => (
                          <option key={p._id} value={p._id}>{p.title} - {formatRupiah(p.price)}</option>
                        ))}
                      </select>
                    </div>
                    {newTx.productId && products.find(p => p._id === newTx.productId)?.variants?.length > 0 && (
                      <div className="form-group" style={{ flex: 1 }}>
                        <label>Ukuran <span style={{ color: '#EF4444' }}>*</span></label>
                        <select value={newTx.variantSize} onChange={(e) => setNewTx({ ...newTx, variantSize: e.target.value })} required>
                          <option value="">Pilih...</option>
                          {products.find(p => p._id === newTx.productId).variants.map((v, i) => (
                            <option key={i} value={v.size} disabled={v.stock === 0}>{v.size} (Sisa: {v.stock})</option>
                          ))}
                        </select>
                      </div>
                    )}
                  </div>
                )}

                {/* Kategori */}
                <div className="form-group">
                  <label>Kategori</label>
                  <select value={newTx.category} onChange={(e) => setNewTx({ ...newTx, category: e.target.value })}>
                    {(newTx.isIncome ? incomeCategories : expenseCategories).map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                {/* Nama Transaksi */}
                <div className="form-group">
                  <label>Nama Transaksi</label>
                  <input
                    type="text"
                    placeholder={newTx.isIncome ? 'Contoh: Baju Kaos Polos - Terjual' : 'Contoh: Facebook Ads Campaign'}
                    value={newTx.name}
                    onChange={(e) => setNewTx({ ...newTx, name: e.target.value })}
                    required
                  />
                </div>

                {/* Nominal */}
                <div className="form-group">
                  <label>Nominal (Rp)</label>
                  <input
                    type="text"
                    placeholder="Contoh: 150.000"
                    value={newTx.amount ? newTx.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') : ''}
                    onChange={(e) => setNewTx({ ...newTx, amount: e.target.value.replace(/[^0-9]/g, '') })}
                    required
                  />
                </div>

                {/* Catatan */}
                <div className="form-group">
                  <label>Catatan (opsional)</label>
                  <textarea
                    placeholder="Keterangan tambahan..."
                    value={newTx.notes}
                    onChange={(e) => setNewTx({ ...newTx, notes: e.target.value })}
                    rows={2}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: 10, border: '1.5px solid #E2E8F0', fontSize: 14, fontFamily: 'inherit', resize: 'vertical' }}
                  />
                </div>

                {/* Status */}
                <div className="form-group">
                  <label>Status</label>
                  <select value={newTx.status} onChange={(e) => setNewTx({ ...newTx, status: e.target.value })}>
                    <option value="Success">Success</option>
                    <option value="Pending">Pending</option>
                    <option value="Failed">Failed</option>
                  </select>
                </div>

                <div className="form-actions">
                  <button type="button" className="btn-secondary" onClick={() => { setShowForm(false); resetForm() }}>Batal</button>
                  <button type="submit" className="btn-primary" style={{ flex: 1 }}>{editingTx ? 'Update Transaksi' : 'Simpan Transaksi'}</button>
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
              <h3 style={{ marginBottom: 8 }}>Hapus Transaksi?</h3>
              <p style={{ color: '#64748B', marginBottom: 20 }}>Transaksi yang dihapus tidak dapat dikembalikan.</p>
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
