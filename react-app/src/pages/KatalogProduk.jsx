import axios from 'axios'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

const API = 'http://localhost:5000/api'

export default function KatalogProduk() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('')
  const [categories, setCategories] = useState([])
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [confirmDelete, setConfirmDelete] = useState(null)
  const [formData, setFormData] = useState({
    title: '', price: '', description: '', category: '', variants: []
  })
  const [isNewCategory, setIsNewCategory] = useState(false)
  const [imageFile, setImageFile] = useState(null)

  // Fetch produk dari backend
  const getProducts = async () => {
    try {
      const response = await axios.get(`${API}/products`)
      setProducts(response.data)
      const uniqueCategories = [...new Set(response.data.map(p => p.category))]
      setCategories(uniqueCategories)
      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  useEffect(() => {
    getProducts()
  }, [])

  // Filter produk
  const filteredProducts = products.filter((product) => {
    const matchSearch = !search || product.title.toLowerCase().includes(search.toLowerCase())
    const matchCategory = !categoryFilter || product.category === categoryFilter
    return matchSearch && matchCategory
  })

  const formatPrice = (price) => `Rp ${price.toLocaleString('id-ID')}`

  const handleSearch = (e) => {
    e.preventDefault()
  }

  const resetForm = () => {
    setFormData({ title: '', price: '', description: '', category: '', variants: [] })
    setImageFile(null)
    setEditingProduct(null)
    setIsNewCategory(false)
  }

  const handleAddVariant = () => {
    setFormData({ ...formData, variants: [...formData.variants, { size: '', stock: 0 }] })
  }

  const handleRemoveVariant = (index) => {
    const newVariants = [...formData.variants]
    newVariants.splice(index, 1)
    setFormData({ ...formData, variants: newVariants })
  }

  const handleVariantChange = (index, field, value) => {
    const newVariants = [...formData.variants]
    newVariants[index][field] = value
    setFormData({ ...formData, variants: newVariants })
  }

  // Simpan produk (Create / Update)
  const handleSave = async (e) => {
    e.preventDefault()
    if (!formData.title || !formData.price || !formData.category) return

    const payload = new FormData();
    payload.append('title', formData.title);
    payload.append('price', parseInt(formData.price));
    payload.append('description', formData.description);
    payload.append('category', formData.category);
    
    payload.append('variants', JSON.stringify(formData.variants));

    if (imageFile) {
      payload.append('imageFile', imageFile);
    }

    try {
      if (editingProduct) {
        const res = await axios.put(`${API}/products/${editingProduct._id}`, payload, {
          headers: { 'Content-Type': 'multipart/form-data' }
        })
        setProducts(products.map(p => p._id === editingProduct._id ? res.data : p))
        toast.success('Produk berhasil diupdate!')
      } else {
        const res = await axios.post(`${API}/products`, payload, {
          headers: { 'Content-Type': 'multipart/form-data' }
        })
        setProducts([res.data, ...products])
        toast.success('Produk berhasil ditambahkan!')
      }
      // Refresh categories
      const allCats = [...new Set([...products.map(p => p.category), formData.category])]
      setCategories(allCats)
      resetForm()
      setShowForm(false)
    } catch (err) {
      console.error('Error saving product', err)
      toast.error('Gagal menyimpan produk')
    }
  }

  // Edit produk
  const handleEdit = (product) => {
    setEditingProduct(product)
    setFormData({
      title: product.title,
      price: product.price,
      description: product.description || '',
      category: product.category,
      variants: product.variants ? [...product.variants] : []
    })
    setIsNewCategory(false)
    setImageFile(null)
    setShowForm(true)
    setSelectedProduct(null)
  }

  // Hapus produk
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API}/products/${id}`)
      setProducts(products.filter(p => p._id !== id))
      setConfirmDelete(null)
      setSelectedProduct(null)
      toast.success('Produk berhasil dihapus!')
    } catch (err) {
      console.error('Error deleting product', err)
      toast.error('Gagal menghapus produk')
    }
  }

  const getTotalStock = (variants) => {
    if (!variants || variants.length === 0) return 0;
    return variants.reduce((sum, v) => sum + (v.stock || 0), 0);
  }

  const getAvailableSizes = (variants) => {
    if (!variants || variants.length === 0) return '-';
    return variants.map(v => v.size).join(', ');
  }

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading data produk...</p>
      </div>
    )
  }

  return (
    <div className="fade-in">
      {/* Page Header */}
      <div className="page-header">
        <div>
          <h2>Katalog Produk</h2>
          <p>Kelola produk toko online Anda ({products.length} produk)</p>
        </div>
        <button className="btn-primary" onClick={() => { resetForm(); setShowForm(true) }}>
          <span className="material-symbols-outlined" style={{ fontSize: 18 }}>add</span>
          Tambah Produk
        </button>
      </div>

      {/* Form Pencarian / Filter */}
      <form className="filter-form" onSubmit={handleSearch} style={{ marginBottom: 24 }}>
        <input
          type="text"
          placeholder="Cari produk..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ flex: 1, minWidth: 200 }}
        />
        <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
          <option value="">Semua Kategori</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        <button type="submit">
          <span className="material-symbols-outlined" style={{ fontSize: 18 }}>search</span>
          Cari
        </button>
      </form>

      {/* Product Grid */}
      {filteredProducts.length === 0 ? (
        <div className="empty-state">
          <span className="material-symbols-outlined">inventory_2</span>
          <h3>Tidak ada produk ditemukan</h3>
          <p>Coba ubah kata kunci pencarian atau filter</p>
        </div>
      ) : (
        <div className="product-grid">
          {filteredProducts.map((product) => (
            <div className="card" key={product._id}>
              <div style={{ position: 'relative' }}>
                <img src={product.image ? `http://localhost:5000${product.image}` : 'https://via.placeholder.com/300x200?text=No+Image'} alt={product.title} />
              </div>
              <div className="card-body">
                <span className="card-category">{product.category}</span>
                <h3 className="card-title">{product.title}</h3>
                {product.description && (
                  <p style={{ fontSize: 13, color: '#64748B', marginBottom: 12, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {product.description}
                  </p>
                )}
                <p className="card-price">{formatPrice(product.price)}</p>
                <p style={{ fontSize: 12, color: '#64748B', marginBottom: 4 }}>Ukuran: <span style={{ fontWeight: 600 }}>{getAvailableSizes(product.variants)}</span></p>
                <p style={{ fontSize: 12, color: '#64748B', marginBottom: 8 }}>Total Stok: {getTotalStock(product.variants)} pcs</p>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button className="card-btn" onClick={() => setSelectedProduct(product)} style={{ flex: 2, background: '#003C90', color: '#fff', padding: '8px 12px', border: 'none', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s' }}>
                    <span className="material-symbols-outlined" style={{ fontSize: 18 }}>visibility</span>
                    Detail
                  </button>
                  <button className="card-btn" onClick={() => handleEdit(product)} style={{ flex: 1, background: '#F59E0B', color: '#fff', padding: '8px 12px', border: 'none', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.2s' }}>
                    <span className="material-symbols-outlined" style={{ fontSize: 18 }}>edit</span>
                  </button>
                  <button className="card-btn" onClick={() => setConfirmDelete(product._id)} style={{ flex: 1, background: '#EF4444', color: '#fff', padding: '8px 12px', border: 'none', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.2s' }}>
                    <span className="material-symbols-outlined" style={{ fontSize: 18 }}>delete</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal Detail Produk */}
      {selectedProduct && (
        <div className="modal-overlay" onClick={() => setSelectedProduct(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()} style={{ position: 'relative' }}>
            <button className="modal-close-btn" onClick={() => setSelectedProduct(null)}>
              <span className="material-symbols-outlined">close</span>
            </button>
            <img className="modal-img" src={selectedProduct.image ? `http://localhost:5000${selectedProduct.image}` : 'https://via.placeholder.com/300x200?text=No+Image'} alt={selectedProduct.title} />
            <div className="modal-body">
              <span className="card-category">{selectedProduct.category}</span>
              <h3>{selectedProduct.title}</h3>
              <p className="card-price" style={{ marginBottom: 12 }}>{formatPrice(selectedProduct.price)}</p>
              
              {selectedProduct.description && (
                <div style={{ marginBottom: 20 }}>
                  <label style={{ fontSize: 12, fontWeight: 600, color: '#64748B', textTransform: 'uppercase', letterSpacing: 0.5, display: 'block', marginBottom: 6 }}>Deskripsi</label>
                  <p style={{ fontSize: 14, color: '#334155', lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>{selectedProduct.description}</p>
                </div>
              )}
              
              <div className="modal-info-grid">
                <div className="modal-info-item">
                  <label>Total Stok</label>
                  <span>{getTotalStock(selectedProduct.variants)} pcs</span>
                </div>
              </div>

              {selectedProduct.variants && selectedProduct.variants.length > 0 && (
                <div style={{ marginTop: 16 }}>
                  <label style={{ fontSize: 12, fontWeight: 600, color: '#64748B', display: 'block', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 0.5 }}>Stok per Ukuran</label>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
                    {selectedProduct.variants.map((v, i) => (
                      <div key={i} style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: 8, padding: '8px', textAlign: 'center' }}>
                        <div style={{ fontWeight: 700, color: '#0F172A', fontSize: 16 }}>{v.size}</div>
                        <div style={{ color: '#64748B', fontSize: 12 }}>{v.stock} pcs</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
                <button className="btn-primary" onClick={() => handleEdit(selectedProduct)} style={{ flex: 1 }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 16, verticalAlign: 'middle', marginRight: 4 }}>edit</span>
                  Edit Produk
                </button>
                <button className="btn-primary" style={{ background: '#EF4444', borderColor: '#EF4444' }} onClick={() => { setConfirmDelete(selectedProduct._id) }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 16 }}>delete</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal Form Tambah/Edit Produk */}
      {showForm && (
        <div className="modal-overlay" onClick={() => { setShowForm(false); resetForm() }}>
          <div className="modal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 550 }}>
            <div className="modal-body">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                <h3 style={{ fontSize: 20 }}>{editingProduct ? 'Edit Produk' : 'Tambah Produk Baru'}</h3>
                <button onClick={() => { setShowForm(false); resetForm() }} style={{ background: 'none', padding: 4, borderRadius: 8, color: '#94A3B8' }}>
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>

              <form onSubmit={handleSave}>
                <div className="form-group">
                  <label>Nama Produk</label>
                  <input type="text" placeholder="Contoh: Baju Kaos Polos" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} required />
                </div>
                <div style={{ display: 'flex', gap: 12 }}>
                  <div className="form-group" style={{ flex: 1 }}>
                    <label>Harga (Rp)</label>
                    <input type="text" placeholder="150.000" value={formData.price ? formData.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') : ''} onChange={(e) => setFormData({ ...formData, price: e.target.value.replace(/[^0-9]/g, '') })} required />
                  </div>
                  <div className="form-group" style={{ flex: 1 }}>
                    <label>Kategori</label>
                    {isNewCategory ? (
                      <div style={{ display: 'flex', gap: 8 }}>
                        <input type="text" placeholder="Ketik kategori baru..." value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} required style={{ flex: 1 }} />
                        <button type="button" onClick={() => { setIsNewCategory(false); setFormData({ ...formData, category: categories.length > 0 ? categories[0] : '' }) }} style={{ padding: '0 12px', background: '#F1F5F9', border: '1px solid #E2E8F0', borderRadius: 10, color: '#475569', cursor: 'pointer' }}>Batal</button>
                      </div>
                    ) : (
                      <select value={formData.category} onChange={(e) => {
                        if (e.target.value === 'NEW') {
                          setIsNewCategory(true)
                          setFormData({ ...formData, category: '' })
                        } else {
                          setFormData({ ...formData, category: e.target.value })
                        }
                      }} required>
                        <option value="">-- Pilih Kategori --</option>
                        {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                        <option value="NEW" style={{ fontWeight: 'bold', color: '#003C90' }}>+ Tambah Kategori Baru...</option>
                      </select>
                    )}
                  </div>
                </div>
                
                {/* Variasi Ukuran */}
                <div className="form-group">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                    <label style={{ margin: 0 }}>Variasi Ukuran & Stok</label>
                    <button type="button" onClick={handleAddVariant} style={{ background: '#E0E7FF', color: '#003C90', border: 'none', borderRadius: 6, padding: '4px 8px', fontSize: 12, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}>
                      <span className="material-symbols-outlined" style={{ fontSize: 14 }}>add</span> Tambah Ukuran
                    </button>
                  </div>
                  
                  {formData.variants.length === 0 ? (
                    <div style={{ padding: 12, background: '#F8FAFC', borderRadius: 8, border: '1px dashed #CBD5E1', textAlign: 'center', color: '#64748B', fontSize: 13 }}>
                      Belum ada variasi ukuran. Klik tombol di atas untuk menambah.
                    </div>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                      {formData.variants.map((v, i) => (
                        <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                          <select value={v.size} onChange={(e) => handleVariantChange(i, 'size', e.target.value)} required style={{ flex: 1 }}>
                            <option value="">Pilih Ukuran</option>
                            <option value="S">S</option>
                            <option value="M">M</option>
                            <option value="L">L</option>
                            <option value="XL">XL</option>
                            <option value="XXL">XXL</option>
                            <option value="All Size">All Size</option>
                          </select>
                          <input type="number" placeholder="Stok" value={v.stock} onChange={(e) => handleVariantChange(i, 'stock', e.target.value)} required style={{ flex: 1 }} />
                          <button type="button" onClick={() => handleRemoveVariant(i)} style={{ background: '#FEE2E2', color: '#EF4444', border: 'none', borderRadius: 8, width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                            <span className="material-symbols-outlined" style={{ fontSize: 20 }}>delete</span>
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div style={{ display: 'flex', gap: 12 }}>
                  <div className="form-group" style={{ flex: 1 }}>
                    <label>Upload Gambar Baru (opsional)</label>
                    <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files[0])} />
                  </div>
                </div>
                
                <div className="form-group">
                  <label>Deskripsi</label>
                  <textarea
                    placeholder="Deskripsi produk..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={3}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: 10, border: '1.5px solid #E2E8F0', fontSize: 14, fontFamily: 'inherit', resize: 'vertical' }}
                  />
                </div>
                <div className="form-actions">
                  <button type="button" className="btn-secondary" onClick={() => { setShowForm(false); resetForm() }}>Batal</button>
                  <button type="submit" className="btn-primary" style={{ flex: 1 }}>{editingProduct ? 'Update Produk' : 'Simpan Produk'}</button>
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
              <h3 style={{ marginBottom: 8 }}>Hapus Produk?</h3>
              <p style={{ color: '#64748B', marginBottom: 20 }}>Produk yang dihapus tidak dapat dikembalikan.</p>
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
