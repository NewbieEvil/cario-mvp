// Screen 17 — AC Working Space (Desktop, AC private dashboard)
// Screen 18 — AC Showroom (Public landing page that customers see)
// Per Otobank distribution model: AC pulls from Inventory (Shared) → curates personal showroom → sends link to customer (Shopee-shop-style isolated funnel)

// ─────────────────────────────────────────────────────────
// Screen 17 — AC Working Space

const Screen17_ACWorkspace = () => {
  const myInventory = [
    { name: 'Honda CR-V 1.5L Turbo 2022', km: '28,500', img: 'uploads/s02-card01-honda-crv-blue.png', trust: 92, retail: 920, daysInShop: 12, views: 1247, leads: 18, lastLead: '2h trước', status: 'hot' },
    { name: 'Toyota Camry 2.5Q 2022', km: '34,200', img: 'uploads/s02-card02-toyota-camry-white.png', trust: 95, retail: 1180, daysInShop: 8, views: 892, leads: 12, lastLead: '5h trước', status: 'good' },
    { name: 'Mazda CX-5 Premium 2023', km: '18,700', img: 'uploads/s02-card03-mazda-cx5-red.png', trust: 88, retail: 850, daysInShop: 5, views: 524, leads: 7, lastLead: '1 ngày', status: 'good' },
    { name: 'VinFast VF8 Plus 2023', km: '12,400', img: 'uploads/s02-card11-vinfast-vf8-blue.png', trust: 91, retail: 1200, daysInShop: 24, views: 412, leads: 3, lastLead: '6 ngày', status: 'cold' },
    { name: 'Kia Seltos 1.6L 2023', km: '14,200', img: 'uploads/s02-card06-kia-seltos-silver.png', trust: 85, retail: 690, daysInShop: 3, views: 287, leads: 5, lastLead: '4h trước', status: 'good' },
  ];

  return (
    <div className="otobank" style={{ width: 1440, minHeight: 1800, background: 'var(--bg)' }}>
      <OtobankNav active="workspace" />

      <div style={{ padding: '40px 64px', maxWidth: 1320, margin: '0 auto' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 32 }}>
          <div>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: 'rgba(232,93,44,0.12)', border: '1px solid rgba(232,93,44,0.3)',
              padding: '6px 12px', borderRadius: 999, marginBottom: 16,
            }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#E85D2C', boxShadow: '0 0 8px rgba(232,93,44,0.6)' }} />
              <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 11, fontWeight: 700, color: '#E85D2C', letterSpacing: '0.08em' }}>AC WORKING SPACE · ANH NGUYỄN MINH TUẤN</span>
            </div>
            <h1 style={{ fontFamily: '"Space Grotesk", sans-serif', fontSize: 40, fontWeight: 800, margin: 0, letterSpacing: '-0.02em', lineHeight: 1.05 }}>
              Workspace của tôi
            </h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 12 }}>
              <span style={{ fontSize: 13, padding: '5px 12px', borderRadius: 999, background: 'rgba(232,93,44,0.15)', border: '1px solid rgba(232,93,44,0.4)', color: 'var(--accent)', fontWeight: 700, letterSpacing: '0.04em' }}>★ TIER SENIOR · 1.15x</span>
              <span style={{ fontSize: 14, color: 'var(--text-2)' }}>Shop URL: <strong style={{ color: 'var(--text)' }}>anhtuan.otobank.vn</strong></span>
              <button style={{ fontSize: 12, color: 'var(--accent)', background: 'transparent', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}>Copy link</button>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            <button className="btn btn-outline" style={{ padding: '14px 18px', fontSize: 14, fontWeight: 600 }}>
              <Ico name="eye" size={16} /> Xem shop public
            </button>
            <button className="btn btn-primary" style={{ padding: '14px 22px', fontSize: 14, fontWeight: 700 }}>
              <Ico name="plus" size={16} /> Thêm xe từ Inventory (Shared)
            </button>
          </div>
        </div>

        {/* KPI strip */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 18, marginBottom: 32 }}>
          {[
            { eyebrow: 'Xe trong shop', value: '38', delta: '5 thêm tuần này', color: 'var(--text)' },
            { eyebrow: 'Active leads', value: '24', delta: '+8 trong 24h', color: '#FFB800' },
            { eyebrow: 'Conversion rate', value: '4.2%', delta: '↑ 0.6pp vs T4', color: 'var(--success)' },
            { eyebrow: 'Income tháng 5', value: '52.4M ₫', delta: '4 deals đã closed', color: 'var(--accent)' },
          ].map(k => (
            <div key={k.eyebrow} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14, padding: 22 }}>
              <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 11, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>{k.eyebrow}</div>
              <div className="mono" style={{ fontSize: 32, fontWeight: 800, color: k.color, marginTop: 8, lineHeight: 1, letterSpacing: '-0.02em' }}>{k.value}</div>
              <div style={{ fontSize: 13, color: 'var(--success)', marginTop: 6, fontWeight: 500 }}>{k.delta}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: 4, borderBottom: '1px solid var(--border)', marginBottom: 28 }}>
          {[
            { l: 'Xe trong shop', count: 38, active: true },
            { l: 'Khách của tôi', count: 87 },
            { l: 'Đơn hàng', count: 12 },
            { l: 'Microsite stats', count: null },
            { l: 'Tools (loan/quote)', count: null },
            { l: 'Settings', count: null },
          ].map(t => (
            <div key={t.l} style={{
              padding: '14px 20px', cursor: 'pointer',
              borderBottom: t.active ? '2px solid var(--accent)' : '2px solid transparent',
              color: t.active ? 'var(--accent)' : 'var(--text-2)',
              fontSize: 14, fontWeight: t.active ? 700 : 500,
            }}>
              {t.l} {t.count != null && <span style={{ fontSize: 11, padding: '2px 7px', borderRadius: 4, background: t.active ? 'rgba(232,93,44,0.15)' : 'var(--surface-2)', marginLeft: 6, fontWeight: 700 }}>{t.count}</span>}
            </div>
          ))}
        </div>

        {/* Inventory table */}
        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '80px 2fr 90px 130px 90px 90px 110px 100px 130px', gap: 16, padding: '16px 20px', fontSize: 11, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 600, borderBottom: '1px solid var(--border)', background: 'var(--surface-2)', fontFamily: '"JetBrains Mono", monospace' }}>
            <div>Ảnh</div>
            <div>Xe</div>
            <div>Trust</div>
            <div>Giá retail</div>
            <div>Days</div>
            <div>Views</div>
            <div>Leads</div>
            <div>Last lead</div>
            <div>Hành động</div>
          </div>
          {myInventory.map((c, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '80px 2fr 90px 130px 90px 90px 110px 100px 130px', gap: 16, padding: '16px 20px', alignItems: 'center', borderBottom: i < myInventory.length - 1 ? '1px solid var(--border)' : 'none' }}>
              <div style={{ width: 64, aspectRatio: '4/3', borderRadius: 6, overflow: 'hidden' }}>
                <img src={c.img} alt={c.name} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              </div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600 }}>{c.name}</div>
                <div style={{ fontSize: 12, color: 'var(--text-2)', marginTop: 2 }}>{c.km} km</div>
              </div>
              <div className="mono" style={{ fontSize: 14, fontWeight: 700, color: c.trust >= 90 ? 'var(--success)' : '#E85D2C' }}>{c.trust}</div>
              <div className="mono" style={{ fontSize: 14, fontWeight: 700, color: 'var(--accent)' }}>{c.retail}M ₫</div>
              <div className="mono" style={{ fontSize: 13, color: 'var(--text-2)' }}>{c.daysInShop}d</div>
              <div className="mono" style={{ fontSize: 13, color: 'var(--text-2)' }}>{c.views.toLocaleString('vi-VN')}</div>
              <div className="mono" style={{ fontSize: 14, fontWeight: 700, color: c.status === 'hot' ? 'var(--success)' : c.status === 'good' ? 'var(--text)' : 'var(--text-3)' }}>{c.leads}</div>
              <div style={{ fontSize: 12, color: c.status === 'hot' ? 'var(--success)' : c.status === 'cold' ? 'var(--text-3)' : 'var(--text-2)' }}>{c.lastLead}</div>
              <div style={{ display: 'flex', gap: 6 }}>
                <button style={{ padding: '6px 10px', fontSize: 11, borderRadius: 6, border: '1px solid var(--border)', background: 'transparent', color: 'var(--text)', cursor: 'pointer', fontWeight: 600 }}>Edit</button>
                <button style={{ padding: '6px 10px', fontSize: 11, borderRadius: 6, border: '1px solid rgba(232,93,44,0.3)', background: 'rgba(232,93,44,0.08)', color: 'var(--accent)', cursor: 'pointer', fontWeight: 600 }}>Boost</button>
                <button style={{ padding: '6px 8px', fontSize: 11, borderRadius: 6, border: '1px solid var(--border)', background: 'transparent', color: 'var(--text-3)', cursor: 'pointer' }}>×</button>
              </div>
            </div>
          ))}
        </div>

        {/* AI assist row */}
        <div style={{ marginTop: 24, padding: 24, background: 'linear-gradient(135deg, rgba(232,93,44,0.08), rgba(255,184,0,0.04))', border: '1px solid rgba(232,93,44,0.25)', borderRadius: 14, display: 'grid', gridTemplateColumns: '60px 1fr auto', gap: 20, alignItems: 'center' }}>
          <div style={{
            width: 56, height: 56, borderRadius: 16, background: 'linear-gradient(135deg, #E85D2C, #FFB800)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff',
            boxShadow: '0 8px 20px rgba(232,93,44,0.4), inset 0 1px 0 rgba(255,255,255,0.3)',
          }}>
            <Ico name="sparkles" size={26} />
          </div>
          <div>
            <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--text)' }}>AI co-pilot gợi ý: 8 xe phù hợp với khách của bạn</div>
            <div style={{ fontSize: 13, color: 'var(--text-2)', marginTop: 4 }}>Dựa trên 87 khách bạn đang follow + lịch sử 28 deals đã đóng, AI đề xuất các xe trong Inventory (Shared) bạn nên thêm vào shop.</div>
          </div>
          <button className="btn btn-primary" style={{ padding: '12px 20px', fontSize: 14, fontWeight: 700 }}>Xem gợi ý →</button>
        </div>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────
// Screen 18 — AC Showroom (Public landing — what customers see)
// Like a Shopee shop landing — only this AC's curated cars, isolated funnel

const Screen18_ACShowroom = () => {
  const showroomCars = [
    { name: 'Honda CR-V 1.5L Turbo 2022', km: '28,500', img: 'uploads/s02-card01-honda-crv-blue.png', trust: 92, price: 920, deal: 'great', loc: 'HCM' },
    { name: 'Toyota Camry 2.5Q 2022', km: '34,200', img: 'uploads/s02-card02-toyota-camry-white.png', trust: 95, price: 1180, deal: 'great', loc: 'HCM' },
    { name: 'Mazda CX-5 Premium 2023', km: '18,700', img: 'uploads/s02-card03-mazda-cx5-red.png', trust: 88, price: 850, loc: 'HN' },
    { name: 'VinFast VF8 Plus 2023', km: '12,400', img: 'uploads/s02-card11-vinfast-vf8-blue.png', trust: 91, price: 1200, loc: 'HCM' },
    { name: 'Kia Seltos 1.6L 2023', km: '14,200', img: 'uploads/s02-card06-kia-seltos-silver.png', trust: 85, price: 690, loc: 'HCM' },
    { name: 'Hyundai Tucson 2.0 2022', km: '32,100', img: 'uploads/s02-card07-hyundai-tucson-gray.png', trust: 82, price: 880, loc: 'HCM' },
  ];

  return (
    <div className="otobank" style={{ width: 1440, minHeight: 2000, background: 'var(--bg)' }}>
      {/* Browser-like URL bar to communicate "this is a public shop URL" */}
      <div style={{
        background: '#0A0E12', borderBottom: '1px solid var(--border)',
        padding: '10px 24px', display: 'flex', alignItems: 'center', gap: 14,
        fontFamily: '"JetBrains Mono", monospace',
      }}>
        <div style={{ display: 'flex', gap: 6 }}>
          <span style={{ width: 11, height: 11, borderRadius: '50%', background: '#FF5F56' }} />
          <span style={{ width: 11, height: 11, borderRadius: '50%', background: '#FFBD2E' }} />
          <span style={{ width: 11, height: 11, borderRadius: '50%', background: '#27C93F' }} />
        </div>
        <div style={{ flex: 1, background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8, padding: '7px 14px', fontSize: 13, color: 'var(--text-2)', display: 'flex', alignItems: 'center', gap: 8 }}>
          <Ico name="lock" size={12} />
          <span>https://<strong style={{ color: 'var(--text)' }}>anhtuan</strong>.otobank.vn/shop</span>
          <span style={{ marginLeft: 'auto', fontSize: 11, color: 'var(--text-3)' }}>📌 Khách chỉ thấy xe trong shop này — không xem được shop của AC khác</span>
        </div>
      </div>

      {/* Hero — AC profile block */}
      <section style={{
        background: 'linear-gradient(135deg, #0F1419 0%, #1A1F26 100%)',
        padding: '64px 64px 48px',
        borderBottom: '1px solid var(--border)',
      }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: 'auto 1fr auto', gap: 32, alignItems: 'center' }}>
          {/* AC avatar */}
          <div style={{
            width: 140, height: 140, borderRadius: 32,
            background: 'linear-gradient(135deg, #E85D2C 0%, #FFB800 100%)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#fff', fontFamily: '"Space Grotesk", sans-serif', fontSize: 56, fontWeight: 800,
            boxShadow: '0 20px 50px rgba(232,93,44,0.4), inset 0 2px 0 rgba(255,255,255,0.3)',
            position: 'relative',
          }}>
            <span style={{ position: 'absolute', inset: 4, borderRadius: 28, background: 'radial-gradient(circle at 30% 25%, rgba(255,255,255,0.25), transparent 60%)' }} />
            <span style={{ position: 'relative', zIndex: 1 }}>T</span>
            {/* Verified checkmark */}
            <div style={{ position: 'absolute', bottom: -6, right: -6, width: 36, height: 36, borderRadius: '50%', background: '#10B981', border: '4px solid #0F1419', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
              <Ico name="check" size={16} />
            </div>
          </div>

          {/* Bio */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
              <h1 style={{ fontFamily: '"Space Grotesk", sans-serif', fontSize: 36, fontWeight: 800, margin: 0, color: '#F5F5F5', letterSpacing: '-0.02em' }}>Anh Nguyễn Minh Tuấn</h1>
              <span style={{ fontSize: 12, padding: '4px 10px', borderRadius: 999, background: 'rgba(232,93,44,0.18)', border: '1px solid rgba(232,93,44,0.4)', color: '#E85D2C', fontWeight: 700, letterSpacing: '0.04em', fontFamily: '"JetBrains Mono", monospace' }}>★ AC TIER SENIOR</span>
              <span style={{ fontSize: 12, padding: '4px 10px', borderRadius: 999, background: 'rgba(16,185,129,0.18)', border: '1px solid rgba(16,185,129,0.4)', color: '#10B981', fontWeight: 700, letterSpacing: '0.04em', fontFamily: '"JetBrains Mono", monospace' }}>✓ OTOBANK VERIFIED</span>
            </div>
            <p style={{ fontSize: 16, color: '#A0A4AB', margin: '0 0 16px', maxWidth: 720, lineHeight: 1.5 }}>
              Chuyên viên tư vấn xe SUV gia đình & sedan hạng D · 3 năm kinh nghiệm · 247 khách đã hài lòng. Tôi sẽ giúp bạn chọn đúng xe phù hợp ngân sách & nhu cầu trong 30 phút.
            </p>
            {/* Trust signals */}
            <div style={{ display: 'flex', gap: 24, fontSize: 14, color: '#A0A4AB', flexWrap: 'wrap' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>⭐ <strong style={{ color: '#FFB800', fontSize: 16 }}>4.9</strong> (247 reviews)</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><Ico name="zap" size={14} /> <strong style={{ color: '#fff' }}>Phản hồi ~12 phút</strong> (24/7)</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><Ico name="check" size={14} /> <strong style={{ color: '#fff' }}>28 deals</strong> closed (90 ngày)</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><Ico name="pin" size={14} /> Q.7 + Q.1 + Bình Tân (HCM)</span>
            </div>
          </div>

          {/* CTA */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <button style={{
              padding: '14px 24px', borderRadius: 12, border: 'none',
              background: 'linear-gradient(135deg, #E85D2C, #FFB800)', color: '#fff',
              fontWeight: 700, fontSize: 15, cursor: 'pointer',
              boxShadow: '0 8px 20px rgba(232,93,44,0.4)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            }}>
              💬 Chat Zalo trực tiếp
            </button>
            <button style={{
              padding: '12px 24px', borderRadius: 12, border: '1px solid #2D343F',
              background: 'transparent', color: '#fff',
              fontWeight: 600, fontSize: 14, cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            }}>
              <Ico name="phone" size={14} /> Gọi 0901 234 567
            </button>
          </div>
        </div>

        {/* Featured stats strip */}
        <div style={{ maxWidth: 1280, margin: '32px auto 0', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
          {[
            { l: 'Xe có sẵn', v: '38', sub: 'đã kiểm định' },
            { l: 'Trust Score TB', v: '88', sub: '63% Certified' },
            { l: 'Tỷ lệ closed', v: '11.4%', sub: 'top 8% AC network' },
            { l: 'Khách quay lại', v: '34%', sub: 'mua xe thứ 2/3' },
          ].map(s => (
            <div key={s.l} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 12, padding: '14px 18px' }}>
              <div style={{ fontSize: 11, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 600, fontFamily: '"JetBrains Mono", monospace' }}>{s.l}</div>
              <div className="mono" style={{ fontSize: 24, fontWeight: 800, color: '#F5F5F5', marginTop: 4, letterSpacing: '-0.02em' }}>{s.v}</div>
              <div style={{ fontSize: 11, color: '#A0A4AB', marginTop: 2 }}>{s.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Filters */}
      <section style={{ padding: '32px 64px 24px', maxWidth: 1280, margin: '0 auto', width: '100%' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 20 }}>
          <div>
            <h2 style={{ fontFamily: '"Space Grotesk", sans-serif', fontSize: 32, fontWeight: 700, margin: 0, letterSpacing: '-0.02em' }}>Xe trong shop của tôi</h2>
            <p style={{ fontSize: 14, color: 'var(--text-2)', margin: '6px 0 0' }}>Tôi đã tự tay chọn lọc 38 chiếc xe phù hợp nhất từ kho Otobank — mỗi xe đều có Trust Score ≥75 và inspection 200 điểm.</p>
          </div>
          <span style={{ fontSize: 13, color: 'var(--text-2)' }}>Sắp xếp: <strong style={{ color: 'var(--text)' }}>Mới nhất ↓</strong></span>
        </div>

        <div style={{ display: 'flex', gap: 8, marginBottom: 28, flexWrap: 'wrap' }}>
          {[
            { l: 'Tất cả 38 xe', active: true },
            { l: 'SUV (18)' },
            { l: 'Sedan (12)' },
            { l: 'Pickup (4)' },
            { l: 'Xe điện (4)' },
            { l: 'Dưới 800M (14)' },
            { l: '800M – 1.2 tỷ (16)' },
            { l: 'Trên 1.2 tỷ (8)' },
          ].map(f => (
            <span key={f.l} style={{
              padding: '8px 16px', borderRadius: 999, fontSize: 13, fontWeight: 600, cursor: 'pointer',
              background: f.active ? 'var(--accent)' : 'var(--surface-2)',
              color: f.active ? '#fff' : 'var(--text-2)',
              border: f.active ? 'none' : '1px solid var(--border)',
            }}>{f.l}</span>
          ))}
        </div>

        {/* Inventory grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
          {showroomCars.map((c, i) => (
            <div key={i} style={{
              background: 'var(--surface)', border: '1px solid var(--border)',
              borderRadius: 16, overflow: 'hidden', cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}>
              <div style={{ position: 'relative', aspectRatio: '16/10' }}>
                <img src={c.img} alt={c.name} className="vehicle-image" loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                {c.deal === 'great' && (
                  <span style={{ position: 'absolute', top: 12, left: 12, fontSize: 11, padding: '4px 10px', borderRadius: 999, background: '#10B981', color: '#fff', fontWeight: 700 }}>● Great Deal</span>
                )}
                <div style={{
                  position: 'absolute', bottom: 12, right: 12,
                  background: 'rgba(15,20,25,0.92)', backdropFilter: 'blur(8px)',
                  border: c.trust >= 90 ? '1px solid rgba(16,185,129,0.4)' : '1px solid rgba(232,93,44,0.4)',
                  borderRadius: 8, padding: '5px 9px', display: 'flex', alignItems: 'center', gap: 6,
                }}>
                  <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 12, fontWeight: 700, background: c.trust >= 90 ? '#10B981' : '#E85D2C', color: '#fff', padding: '1px 6px', borderRadius: 4 }}>{c.trust}</span>
                  <span style={{ fontSize: 10, fontWeight: 600, color: c.trust >= 90 ? '#10B981' : '#E85D2C', textTransform: 'uppercase' }}>{c.trust >= 90 ? 'Certified' : 'Verified'}</span>
                </div>
              </div>
              <div style={{ padding: 18 }}>
                <div style={{ fontFamily: '"Space Grotesk", sans-serif', fontSize: 17, fontWeight: 700, color: 'var(--text)', marginBottom: 4 }}>{c.name}</div>
                <div style={{ fontSize: 13, color: 'var(--text-2)', marginBottom: 14 }}>{c.km} km · {c.loc}</div>
                <div className="mono" style={{ fontFamily: '"Space Grotesk", sans-serif', fontSize: 24, fontWeight: 800, color: 'var(--accent)', marginBottom: 6, letterSpacing: '-0.02em' }}>{c.price}M ₫</div>
                <div style={{ fontSize: 13, color: 'var(--text-2)', marginBottom: 14 }}>Trả góp từ <strong style={{ color: 'var(--accent)' }}>{Math.round(c.price * 0.7 / 60 * 10) / 10}M</strong>/tháng</div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                  <button style={{ padding: '10px', borderRadius: 8, border: '1px solid var(--border)', background: 'transparent', color: 'var(--text)', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Chi tiết</button>
                  <button style={{ padding: '10px', borderRadius: 8, border: 'none', background: 'var(--accent)', color: '#fff', fontSize: 13, fontWeight: 700, cursor: 'pointer', boxShadow: '0 4px 12px rgba(232,93,44,0.25)' }}>📅 Đặt lịch xem</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Trust block + footer */}
      <section style={{ padding: '48px 64px', maxWidth: 1280, margin: '0 auto', width: '100%' }}>
        <div style={{ background: 'rgba(232,93,44,0.04)', border: '1px solid rgba(232,93,44,0.15)', borderRadius: 14, padding: 32 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(232,93,44,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)' }}>
              <Ico name="shield" size={22} />
            </div>
            <h3 style={{ fontFamily: '"Space Grotesk", sans-serif', fontSize: 22, fontWeight: 700, margin: 0 }}>Tại sao mua xe qua Anh Tuấn?</h3>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {[
              { i: 'check', t: 'Xe chính hãng có Trust Score', d: 'Tất cả xe trong shop đều được Otobank kiểm định 200 điểm + truy xuất nguồn gốc, Trust Score ≥75' },
              { i: 'zap', t: 'Tư vấn 1-1, không lừa khách', d: 'Tôi không phải sales của 1 hãng — tôi tư vấn theo nhu cầu thật của bạn từ 38 xe đa dạng phân khúc' },
              { i: 'lock', t: 'Bảo vệ bởi Otobank', d: 'Hợp đồng e-sign, escrow VNPay, 7 ngày đổi trả với xe Certified — Otobank đứng tên đảm bảo giao dịch' },
            ].map(r => (
              <div key={r.t}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(16,185,129,0.12)', color: 'var(--success)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 10 }}>
                  <Ico name={r.i} size={18} />
                </div>
                <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text)', marginBottom: 6 }}>{r.t}</div>
                <div style={{ fontSize: 13, color: 'var(--text-2)', lineHeight: 1.5 }}>{r.d}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginTop: 32, padding: '20px 24px', borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 12, color: 'var(--text-3)' }}>
          <span>Powered by <strong style={{ color: 'var(--text)' }}>Otobank</strong> — Distributed Automotive Commerce</span>
          <span>© 2026 Otobank Vietnam · Shop ID: ac_a8f3 · anhtuan.otobank.vn</span>
        </div>
      </section>
    </div>
  );
};

Object.assign(window, { Screen17_ACWorkspace, Screen18_ACShowroom });
