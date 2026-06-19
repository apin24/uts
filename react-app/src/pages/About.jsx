import { useState } from 'react'

export default function About() {
  const [openFaq, setOpenFaq] = useState(null)

  const faqs = [
    {
      q: 'Berapa lama estimasi pengiriman pesanan?',
      a: 'Kami memproses pesanan di hari yang sama jika pembayaran dikonfirmasi sebelum jam 15.00 WIB. Estimasi pengiriman tergantung layanan ekspedisi, umumnya 1-3 hari kerja untuk Jabodetabek dan 3-5 hari untuk luar pulau.'
    },
    {
      q: 'Apakah saya bisa menukar ukuran baju (size exchange)?',
      a: 'Tentu bisa! Kamu memiliki waktu 3x24 jam sejak barang diterima untuk mengajukan penukaran ukuran, dengan syarat tag belum dilepas, barang belum dicuci/dipakai, dan stok pengganti masih tersedia.'
    },
    {
      q: 'Bagaimana cara melacak pesanan saya?',
      a: 'Resi pengiriman akan dikirimkan otomatis melalui Email atau WhatsApp yang terdaftar maksimal H+1 setelah pesanan dikirim.'
    },
    {
      q: 'Apakah Waveneap memiliki toko fisik (offline store)?',
      a: 'Saat ini Waveneap fokus pada penjualan online. Namun kami sering mengadakan Pop-up Store di berbagai event lokal. Ikuti Instagram kami untuk update terbaru!'
    }
  ]

  const toggleFaq = (index) => {
    if (openFaq === index) {
      setOpenFaq(null)
    } else {
      setOpenFaq(index)
    }
  }

  return (
    <div className="public-page fade-in">
      {/* About Section */}
      <section style={{ padding: '80px 20px', background: '#fff' }}>
        <div className="public-container" style={{ maxWidth: 800, textAlign: 'center' }}>
          <span className="material-symbols-outlined" style={{ fontSize: 48, color: '#003C90', marginBottom: 20 }}>auto_awesome</span>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#0F172A', marginBottom: 24, letterSpacing: '-0.5px' }}>
            Cerita Di Balik <span style={{ color: '#003C90' }}>Waveneap</span>
          </h1>
          <p style={{ fontSize: '1.1rem', color: '#64748B', lineHeight: 1.8, marginBottom: 20 }}>
            Didirikan pada tahun 2026, Waveneap hadir sebagai bentuk apresiasi terhadap perpaduan gaya hidup urban dan kenyamanan pakaian harian. Kami percaya bahwa setiap individu berhak mengekspresikan dirinya melalui pakaian yang tidak hanya terlihat bagus, tetapi juga terasa nyaman dipakai sepanjang hari.
          </p>
          <p style={{ fontSize: '1.1rem', color: '#64748B', lineHeight: 1.8 }}>
            Dengan mengutamakan material berkualitas tinggi dan proses produksi yang etis, Waveneap terus berinovasi menghasilkan koleksi-koleksi yang *timeless* namun tetap relevan dengan tren masa kini.
          </p>
        </div>
      </section>

      {/* FAQ Section */}
      <section style={{ padding: '80px 20px', background: '#F8FAFC' }}>
        <div className="public-container" style={{ maxWidth: 800 }}>
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#0F172A', marginBottom: 12 }}>Pertanyaan yang Sering Diajukan (FAQ)</h2>
            <p style={{ color: '#64748B' }}>Temukan jawaban cepat untuk pertanyaan-pertanyaan umum seputar layanan kami.</p>
          </div>

          <div className="faq-accordion">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className={`faq-item ${openFaq === index ? 'active' : ''}`}
                onClick={() => toggleFaq(index)}
                style={{
                  background: '#fff',
                  borderRadius: 16,
                  padding: '20px 24px',
                  marginBottom: 16,
                  cursor: 'pointer',
                  border: '1px solid #E2E8F0',
                  boxShadow: openFaq === index ? '0 4px 20px rgba(0,0,0,0.05)' : 'none',
                  transition: 'all 0.3s ease'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: openFaq === index ? '#003C90' : '#0F172A', margin: 0 }}>
                    {faq.q}
                  </h3>
                  <span className="material-symbols-outlined" style={{ color: '#94A3B8', transform: openFaq === index ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s' }}>
                    expand_more
                  </span>
                </div>
                {openFaq === index && (
                  <div style={{ marginTop: 16, paddingTop: 16, borderTop: '1px solid #F1F5F9', color: '#64748B', lineHeight: 1.6, animation: 'fadeIn 0.3s ease' }}>
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
