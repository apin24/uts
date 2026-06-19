import React from 'react';

export default function PublicFooter() {
  return (
    <footer style={{ background: '#0F172A', color: '#94A3B8', padding: '60px 20px 40px', textAlign: 'center' }}>
      <div className="public-container">
        <h3 style={{ color: '#fff', marginBottom: 16, fontSize: '24px' }}>Waveneap</h3>
        <p style={{ marginBottom: 30, maxWidth: 400, margin: '0 auto 30px', lineHeight: 1.6 }}>
          Eksplorasi gaya pakaian terkini dengan bahan berkualitas premium yang didesain khusus untuk menemani aktivitas harianmu.
        </p>
        
        <div style={{ display: 'flex', justifyContent: 'center', gap: 16, marginBottom: 40, flexWrap: 'wrap' }}>
          <a href="https://shopee.co.id/waveneap" target="_blank" rel="noopener noreferrer" style={{ color: '#fff', textDecoration: 'none', padding: '8px 20px', background: 'rgba(255,255,255,0.1)', borderRadius: 20, fontSize: 14, transition: 'all 0.3s' }}>
            Shopee
          </a>
          <a href="https://tiktok.com/@waveneap" target="_blank" rel="noopener noreferrer" style={{ color: '#fff', textDecoration: 'none', padding: '8px 20px', background: 'rgba(255,255,255,0.1)', borderRadius: 20, fontSize: 14, transition: 'all 0.3s' }}>
            TikTok
          </a>
          <a href="https://www.instagram.com/waveneap_?igsh=MTE0bHVnNm5kMXg0cg==" target="_blank" rel="noopener noreferrer" style={{ color: '#fff', textDecoration: 'none', padding: '8px 20px', background: 'rgba(255,255,255,0.1)', borderRadius: 20, fontSize: 14, transition: 'all 0.3s' }}>
            Instagram
          </a>
          <a href="https://wa.me/6288215305554?text=halo%20admin%20waveneap%2C%20saya%20ingin%20bertanya%20tentang..." target="_blank" rel="noopener noreferrer" style={{ color: '#fff', textDecoration: 'none', padding: '8px 20px', background: '#25D366', borderRadius: 20, fontSize: 14, fontWeight: 600, transition: 'all 0.3s' }}>
            WhatsApp
          </a>
        </div>

        <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: 30 }}>
          <p>&copy; 2026 Waveneap. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
