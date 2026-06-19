import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const API = 'http://localhost:5000/api'

export default function Home() {
  return (
    <div className="public-page fade-in">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="public-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '80px 20px' }}>
          <h1 style={{ fontSize: '3rem', fontWeight: 900, color: '#0F172A', marginBottom: 20, letterSpacing: '-1px', maxWidth: 800 }}>
            Tampil Beda dengan Koleksi <span style={{ color: '#003C90' }}>Waveneap</span>
          </h1>
          <p style={{ fontSize: '1.2rem', color: '#64748B', maxWidth: 600, marginBottom: 40, lineHeight: 1.6 }}>
            Eksplorasi gaya pakaian terkini dengan bahan berkualitas premium yang didesain khusus untuk menemani aktivitas harianmu.
          </p>
          <div style={{ display: 'flex', gap: 16 }}>
            <a href="https://shopee.co.id/waveneap" target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ padding: '14px 32px', fontSize: '1.1rem', borderRadius: 30, textDecoration: 'none' }}>
              Mulai Belanja
            </a>
            <Link to="/tentang-kami" className="btn-secondary" style={{ padding: '14px 32px', fontSize: '1.1rem', borderRadius: 30, textDecoration: 'none' }}>
              Pelajari Lebih Lanjut
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section style={{ padding: '60px 0', background: '#fff' }}>
        <div className="public-container">
          <div className="features-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 30 }}>
            <div className="feature-card" style={{ padding: 30, background: '#F8FAFC', borderRadius: 24, textAlign: 'center' }}>
              <span className="material-symbols-outlined" style={{ fontSize: 40, color: '#003C90', marginBottom: 16 }}>workspace_premium</span>
              <h3 style={{ marginBottom: 10, fontSize: '1.25rem' }}>Kualitas Premium</h3>
              <p style={{ color: '#64748B', lineHeight: 1.6 }}>Terbuat dari bahan pilihan yang nyaman dan tahan lama untuk digunakan setiap hari.</p>
            </div>
            <div className="feature-card" style={{ padding: 30, background: '#F8FAFC', borderRadius: 24, textAlign: 'center' }}>
              <span className="material-symbols-outlined" style={{ fontSize: 40, color: '#003C90', marginBottom: 16 }}>local_shipping</span>
              <h3 style={{ marginBottom: 10, fontSize: '1.25rem' }}>Pengiriman Cepat</h3>
              <p style={{ color: '#64748B', lineHeight: 1.6 }}>Pesanan langsung diproses dan dikirim di hari yang sama ke seluruh Indonesia.</p>
            </div>
            <div className="feature-card" style={{ padding: 30, background: '#F8FAFC', borderRadius: 24, textAlign: 'center' }}>
              <span className="material-symbols-outlined" style={{ fontSize: 40, color: '#003C90', marginBottom: 16 }}>support_agent</span>
              <h3 style={{ marginBottom: 10, fontSize: '1.25rem' }}>Layanan Terbaik</h3>
              <p style={{ color: '#64748B', lineHeight: 1.6 }}>Tim kami siap melayani pertanyaan dan komplain dengan respon yang sangat cepat.</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
