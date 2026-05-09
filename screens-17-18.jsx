// Screen 17 — AC Working Space (Desktop, AC private dashboard)
// Screen 18 — AC Showroom (Public landing page that customers see)
// Per Otobank distribution model: AC pulls from Inventory (Shared) → curates personal showroom → sends link to customer (Shopee-shop-style isolated funnel)

// ─────────────────────────────────────────────────────────
// Notifications card (used inside Screen 17 Settings tab)

const NotificationsCard = () => {
  const [items, setItems] = React.useState([
    { l: 'Lead mới qua Zalo OA', sub: 'Push instant trong 30s', on: true },
    { l: 'Khách xem xe trên microsite', sub: 'Báo theo batch mỗi 1h', on: true },
    { l: 'Daily digest 8:00 sáng', sub: 'Tóm tắt hôm qua + xe gợi ý từ AI', on: true },
    { l: 'Email weekly report', sub: 'Gửi vào 7:00 sáng thứ 2', on: false },
  ]);
  const toggle = (i) => setItems(items.map((it, idx) => idx === i ? { ...it, on: !it.on } : it));

  return (
    <div className="card" style={{ padding: 24 }}>
      <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 4 }}>Notifications</div>
      <div style={{ fontSize: 12, color: 'var(--text-3)', marginBottom: 14 }}>Bấm để bật/tắt từng kênh thông báo</div>
      {items.map((n, i) => (
        <div key={n.l} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 14, padding: '14px 0', borderBottom: i < items.length - 1 ? '1px dashed var(--border)' : 'none' }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)' }}>{n.l}</div>
            <div style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 4, lineHeight: 1.5 }}>{n.sub}</div>
          </div>
          <button
            type="button"
            role="switch"
            aria-checked={n.on}
            onClick={() => toggle(i)}
            className={`otb-toggle${n.on ? ' on' : ''}`}
          >
            <span className="otb-toggle-track" />
            <span className="otb-toggle-dot" />
          </button>
        </div>
      ))}
    </div>
  );
};

// ─────────────────────────────────────────────────────────
// Screen 17 — AC Working Space

const Screen17_ACWorkspace = () => {
  const [activeTab, setActiveTab] = React.useState('inventory');

  const myInventory = [
    { name: 'Honda CR-V 1.5L Turbo 2022', km: '28,500', img: 'uploads/s02-card01-honda-crv-blue.png', trust: 92, retail: 920, daysInShop: 12, views: 1247, leads: 18, lastLead: '2h trước', status: 'hot' },
    { name: 'Toyota Camry 2.5Q 2022', km: '34,200', img: 'uploads/s02-card02-toyota-camry-white.png', trust: 95, retail: 1180, daysInShop: 8, views: 892, leads: 12, lastLead: '5h trước', status: 'good' },
    { name: 'Mazda CX-5 Premium 2023', km: '18,700', img: 'uploads/s02-card03-mazda-cx5-red.png', trust: 88, retail: 850, daysInShop: 5, views: 524, leads: 7, lastLead: '1 ngày', status: 'good' },
    { name: 'VinFast VF8 Plus 2023', km: '12,400', img: 'uploads/s02-card11-vinfast-vf8-blue.png', trust: 91, retail: 1200, daysInShop: 24, views: 412, leads: 3, lastLead: '6 ngày', status: 'cold' },
    { name: 'Kia Seltos 1.6L 2023', km: '14,200', img: 'uploads/s02-card06-kia-seltos-silver.png', trust: 85, retail: 690, daysInShop: 3, views: 287, leads: 5, lastLead: '4h trước', status: 'good' },
  ];

  const customers = [
    { name: 'Trần Văn Hùng', initial: 'TH', phone: '0912 ••• 487', source: 'Zalo', interest: 'Honda CR-V 1.5L Turbo 2022', budget: '900M – 1.0B', lastContact: '2h trước', status: 'hot', note: 'Đã xem xe trực tiếp, đang xin vợ' },
    { name: 'Lê Thị Mai', initial: 'LM', phone: '0938 ••• 152', source: 'Microsite', interest: 'Toyota Camry 2.5Q 2022', budget: '1.1B – 1.2B', lastContact: '5h trước', status: 'hot', note: 'Đang chốt ngày inspect' },
    { name: 'Nguyễn Quốc Bảo', initial: 'NB', phone: '0905 ••• 233', source: 'Facebook', interest: 'Mazda CX-5 Premium 2023', budget: '800M – 900M', lastContact: '1 ngày', status: 'warm', note: 'Hỏi về tài chính VPBank' },
    { name: 'Phạm Minh Đức', initial: 'PD', phone: '0977 ••• 901', source: 'Zalo', interest: 'VinFast VF8 Plus 2023', budget: '1.1B – 1.3B', lastContact: '2 ngày', status: 'warm', note: 'So sánh với Tesla Model Y' },
    { name: 'Vũ Thanh Hà', initial: 'VH', phone: '0984 ••• 776', source: 'Direct', interest: 'Kia Seltos 1.6L 2023', budget: '650M – 720M', lastContact: '4h trước', status: 'hot', note: 'Vợ chốt mua, đợi chốt giá cuối' },
    { name: 'Đỗ Hữu Tài', initial: 'DT', phone: '0913 ••• 308', source: 'Microsite', interest: 'Hyundai Tucson 2.0', budget: '850M – 920M', lastContact: '1 tuần', status: 'cold', note: 'Đang quan sát thị trường' },
  ];

  const orders = [
    { id: 'OB-2526-0142', customer: 'Trần Văn Hùng', car: 'Honda CR-V 1.5L Turbo 2022', amount: 920, commission: 13.8, phase: 'Cọc', phaseStep: 2, updated: '2h trước', etaDelivery: '12-05-2026' },
    { id: 'OB-2526-0138', customer: 'Lê Thị Mai', car: 'Toyota Camry 2.5Q 2022', amount: 1180, commission: 17.7, phase: 'Inspect', phaseStep: 3, updated: '5h trước', etaDelivery: '14-05-2026' },
    { id: 'OB-2526-0131', customer: 'Vũ Thanh Hà', car: 'Kia Seltos 1.6L 2023', amount: 690, commission: 10.4, phase: 'Finance', phaseStep: 4, updated: '1h trước', etaDelivery: '16-05-2026' },
    { id: 'OB-2526-0124', customer: 'Phạm Quang Long', car: 'Mazda CX-5 Premium 2023', amount: 850, commission: 12.7, phase: 'Hồ sơ', phaseStep: 5, updated: '6h trước', etaDelivery: '18-05-2026' },
    { id: 'OB-2526-0119', customer: 'Bùi Thị Lan', car: 'Honda Civic RS 2022', amount: 780, commission: 11.7, phase: 'Bàn giao', phaseStep: 6, updated: '3h trước', etaDelivery: '10-05-2026' },
    { id: 'OB-2526-0115', customer: 'Tạ Văn Sơn', car: 'Hyundai Tucson 2.0 2022', amount: 880, commission: 13.2, phase: 'Cọc', phaseStep: 2, updated: '1 ngày', etaDelivery: '20-05-2026' },
  ];

  const SourceTag = ({ s }) => {
    const map = {
      Zalo:      { bg: 'rgba(0,144,255,0.12)', fg: '#3DA9FF', border: 'rgba(0,144,255,0.3)' },
      Facebook:  { bg: 'rgba(66,103,178,0.15)', fg: '#7C9BFF', border: 'rgba(66,103,178,0.4)' },
      Microsite: { bg: 'rgba(232,93,44,0.12)', fg: '#E85D2C', border: 'rgba(232,93,44,0.3)' },
      Direct:    { bg: 'rgba(255,255,255,0.05)', fg: 'var(--text-2)', border: 'var(--border)' },
    };
    const c = map[s] || map.Direct;
    return <span style={{ fontSize: 11, padding: '3px 9px', borderRadius: 999, background: c.bg, color: c.fg, border: `1px solid ${c.border}`, fontWeight: 600, fontFamily: '"JetBrains Mono", monospace' }}>{s}</span>;
  };

  const StatusDot = ({ s }) => {
    const map = {
      hot:  { c: 'var(--success)', l: 'Hot' },
      warm: { c: '#FFB800', l: 'Warm' },
      cold: { c: 'var(--text-3)', l: 'Cold' },
    };
    const v = map[s];
    return (
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 12, fontWeight: 700, color: v.c }}>
        <span style={{ width: 8, height: 8, borderRadius: '50%', background: v.c, boxShadow: `0 0 8px ${v.c}` }} />
        {v.l}
      </span>
    );
  };

  const PhaseBadge = ({ phase, step }) => {
    const phases = ['Lead', 'Cọc', 'Inspect', 'Finance', 'Hồ sơ', 'Bàn giao'];
    return (
      <div>
        <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--accent)', fontFamily: '"JetBrains Mono", monospace', letterSpacing: '0.04em' }}>{phase.toUpperCase()}</div>
        <div style={{ display: 'flex', gap: 3, marginTop: 6 }}>
          {phases.map((_, i) => (
            <span key={i} style={{
              flex: 1, height: 4, borderRadius: 2,
              background: i < step ? 'linear-gradient(90deg, #E85D2C, #FFB800)' : 'rgba(255,255,255,0.08)',
            }} />
          ))}
        </div>
      </div>
    );
  };

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
            { id: 'inventory', l: 'Xe trong shop', count: 38 },
            { id: 'customers', l: 'Khách của tôi', count: 87 },
            { id: 'orders', l: 'Đơn hàng', count: 12 },
            { id: 'microsite', l: 'Microsite stats', count: null },
            { id: 'tools', l: 'Tools (loan/quote)', count: null },
            { id: 'settings', l: 'Settings', count: null },
          ].map(t => {
            const active = activeTab === t.id;
            return (
              <div key={t.id} onClick={() => setActiveTab(t.id)} style={{
                padding: '14px 20px', cursor: 'pointer',
                borderBottom: active ? '2px solid var(--accent)' : '2px solid transparent',
                color: active ? 'var(--accent)' : 'var(--text-2)',
                fontSize: 14, fontWeight: active ? 700 : 500,
                transition: 'color 0.2s ease, border-color 0.2s ease',
              }}>
                {t.l} {t.count != null && <span style={{ fontSize: 11, padding: '2px 7px', borderRadius: 4, background: active ? 'rgba(232,93,44,0.15)' : 'var(--surface-2)', marginLeft: 6, fontWeight: 700 }}>{t.count}</span>}
              </div>
            );
          })}
        </div>

        {/* TAB: Xe trong shop — Inventory table */}
        {activeTab === 'inventory' && (
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
        )}

        {/* TAB: Khách của tôi */}
        {activeTab === 'customers' && (
          <div>
            {/* Filter bar */}
            <div style={{ display: 'flex', gap: 10, marginBottom: 18, alignItems: 'center' }}>
              <input placeholder="Tìm theo tên / SĐT / xe quan tâm..." style={{ flex: 1, padding: '12px 16px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, color: 'var(--text)', fontSize: 14, fontFamily: 'inherit' }} />
              {['Tất cả · 87', 'Hot · 24', 'Warm · 41', 'Cold · 22'].map((f, i) => (
                <button key={f} style={{ padding: '11px 16px', fontSize: 13, borderRadius: 10, border: i === 0 ? '1px solid var(--accent)' : '1px solid var(--border)', background: i === 0 ? 'rgba(232,93,44,0.1)' : 'transparent', color: i === 0 ? 'var(--accent)' : 'var(--text-2)', cursor: 'pointer', fontWeight: 600, whiteSpace: 'nowrap' }}>{f}</button>
              ))}
              <button className="btn btn-primary" style={{ padding: '11px 18px', fontSize: 13, fontWeight: 700 }}>+ Thêm khách</button>
            </div>

            <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '50px 1.4fr 1.6fr 1fr 110px 110px 160px', gap: 16, padding: '16px 20px', fontSize: 11, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 600, borderBottom: '1px solid var(--border)', background: 'var(--surface-2)', fontFamily: '"JetBrains Mono", monospace' }}>
                <div></div>
                <div>Khách / SĐT</div>
                <div>Xe quan tâm</div>
                <div>Ngân sách</div>
                <div>Nguồn</div>
                <div>Status</div>
                <div>Hành động</div>
              </div>
              {customers.map((c, i) => (
                <div key={c.name} style={{ display: 'grid', gridTemplateColumns: '50px 1.4fr 1.6fr 1fr 110px 110px 160px', gap: 16, padding: '18px 20px', alignItems: 'center', borderBottom: i < customers.length - 1 ? '1px solid var(--border)' : 'none' }}>
                  <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'linear-gradient(135deg, #E85D2C, #FFB800)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 13, fontWeight: 700, letterSpacing: '0.02em' }}>{c.initial}</div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600 }}>{c.name}</div>
                    <div className="mono" style={{ fontSize: 12, color: 'var(--text-2)', marginTop: 3 }}>{c.phone}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 500 }}>{c.interest}</div>
                    <div style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 4, fontStyle: 'italic' }}>"{c.note}"</div>
                  </div>
                  <div className="mono" style={{ fontSize: 12, color: 'var(--text-2)' }}>{c.budget}</div>
                  <div><SourceTag s={c.source} /></div>
                  <div><StatusDot s={c.status} /></div>
                  <div style={{ display: 'flex', gap: 6 }}>
                    <button title="Chat Zalo" style={{ padding: '7px 9px', fontSize: 11, borderRadius: 6, border: '1px solid rgba(0,144,255,0.3)', background: 'rgba(0,144,255,0.08)', color: '#3DA9FF', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4, fontWeight: 600 }}><Ico name="chat" size={13} /> Chat</button>
                    <button title="Đặt lịch xem" style={{ padding: '7px 9px', fontSize: 11, borderRadius: 6, border: '1px solid var(--border)', background: 'transparent', color: 'var(--text)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4, fontWeight: 600 }}><Ico name="calendar" size={13} /></button>
                    <button title="Gửi báo giá" style={{ padding: '7px 9px', fontSize: 11, borderRadius: 6, border: '1px solid rgba(232,93,44,0.3)', background: 'rgba(232,93,44,0.08)', color: 'var(--accent)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4, fontWeight: 600 }}><Ico name="file" size={13} /> Quote</button>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 16, padding: '16px 20px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, fontSize: 13, color: 'var(--text-2)', display: 'flex', alignItems: 'center', gap: 10 }}>
              <Ico name="info" size={16} /> Hiển thị 6 / 87 khách. Otobank tự động sync khách từ Zalo OA + microsite về workspace của bạn.
            </div>
          </div>
        )}

        {/* TAB: Đơn hàng */}
        {activeTab === 'orders' && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 12, marginBottom: 24 }}>
              {[
                { phase: 'Lead', n: 0, c: 'var(--text-3)' },
                { phase: 'Cọc', n: 4, c: '#FFB800' },
                { phase: 'Inspect', n: 2, c: '#FFB800' },
                { phase: 'Finance', n: 3, c: 'var(--accent)' },
                { phase: 'Hồ sơ', n: 2, c: 'var(--accent)' },
                { phase: 'Bàn giao', n: 1, c: 'var(--success)' },
              ].map(p => (
                <div key={p.phase} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: 14, textAlign: 'center' }}>
                  <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 10, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>{p.phase}</div>
                  <div className="mono" style={{ fontSize: 28, fontWeight: 800, color: p.c, marginTop: 6, lineHeight: 1 }}>{p.n}</div>
                </div>
              ))}
            </div>

            <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '140px 1.2fr 1.6fr 110px 130px 1.4fr 110px 130px', gap: 16, padding: '16px 20px', fontSize: 11, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 600, borderBottom: '1px solid var(--border)', background: 'var(--surface-2)', fontFamily: '"JetBrains Mono", monospace' }}>
                <div>Order ID</div>
                <div>Khách</div>
                <div>Xe</div>
                <div>Giá trị</div>
                <div>Hoa hồng</div>
                <div>Phase</div>
                <div>ETA giao</div>
                <div>Hành động</div>
              </div>
              {orders.map((o, i) => (
                <div key={o.id} style={{ display: 'grid', gridTemplateColumns: '140px 1.2fr 1.6fr 110px 130px 1.4fr 110px 130px', gap: 16, padding: '18px 20px', alignItems: 'center', borderBottom: i < orders.length - 1 ? '1px solid var(--border)' : 'none' }}>
                  <div className="mono" style={{ fontSize: 11, color: 'var(--text-2)', fontWeight: 600 }}>{o.id}</div>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>{o.customer}</div>
                  <div style={{ fontSize: 13 }}>{o.car}</div>
                  <div className="mono" style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)' }}>{o.amount}M ₫</div>
                  <div className="mono" style={{ fontSize: 14, fontWeight: 700, color: 'var(--success)' }}>+{o.commission}M ₫</div>
                  <div><PhaseBadge phase={o.phase} step={o.phaseStep} /></div>
                  <div className="mono" style={{ fontSize: 12, color: 'var(--text-2)' }}>{o.etaDelivery}</div>
                  <div style={{ display: 'flex', gap: 6 }}>
                    <button style={{ padding: '7px 12px', fontSize: 11, borderRadius: 6, border: '1px solid var(--border)', background: 'transparent', color: 'var(--text)', cursor: 'pointer', fontWeight: 600 }}>Detail</button>
                    <button style={{ padding: '7px 10px', fontSize: 11, borderRadius: 6, border: '1px solid rgba(232,93,44,0.3)', background: 'rgba(232,93,44,0.08)', color: 'var(--accent)', cursor: 'pointer', fontWeight: 600 }}>Push</button>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 18, padding: 18, background: 'linear-gradient(135deg, rgba(34,197,94,0.06), rgba(34,197,94,0.02))', border: '1px solid rgba(34,197,94,0.2)', borderRadius: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 11, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>Hoa hồng dự kiến tháng này</div>
                <div className="mono" style={{ fontSize: 30, fontWeight: 800, color: 'var(--success)', marginTop: 6, lineHeight: 1 }}>79.5M ₫</div>
                <div style={{ fontSize: 12, color: 'var(--text-2)', marginTop: 6 }}>6 đơn × tier 1.15x · payout vào ngày 15-06-2026</div>
              </div>
              <button className="btn btn-outline" style={{ padding: '11px 18px', fontSize: 13, fontWeight: 600 }}>Export CSV</button>
            </div>
          </div>
        )}

        {/* TAB: Microsite stats */}
        {activeTab === 'microsite' && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 24 }}>
              {[
                { l: 'Page views (30d)', v: '12,847', d: '+18% vs 30d trước', c: 'var(--text)' },
                { l: 'Unique visitors', v: '8,432', d: '+24% vs 30d trước', c: 'var(--text)' },
                { l: 'Avg time on page', v: '2m 47s', d: 'Top 15% AC toàn quốc', c: '#FFB800' },
                { l: 'Conversion (xem→liên hệ)', v: '6.8%', d: '↑ 1.4pp vs T4', c: 'var(--success)' },
              ].map(k => (
                <div key={k.l} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: 18 }}>
                  <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 10, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>{k.l}</div>
                  <div className="mono" style={{ fontSize: 26, fontWeight: 800, color: k.c, marginTop: 8, lineHeight: 1, letterSpacing: '-0.02em' }}>{k.v}</div>
                  <div style={{ fontSize: 12, color: 'var(--success)', marginTop: 6, fontWeight: 500 }}>{k.d}</div>
                </div>
              ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 18 }}>
              {/* Top performing cars */}
              <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
                <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border)', background: 'var(--surface-2)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ fontSize: 14, fontWeight: 700 }}>Top xe được xem nhiều nhất</div>
                  <span style={{ fontSize: 11, color: 'var(--text-3)', fontFamily: '"JetBrains Mono", monospace' }}>30 ngày qua</span>
                </div>
                {[
                  { name: 'Honda CR-V 1.5L Turbo', img: 'uploads/s02-card01-honda-crv-blue.png', views: 1247, leads: 18, ctr: 1.44 },
                  { name: 'Toyota Camry 2.5Q', img: 'uploads/s02-card02-toyota-camry-white.png', views: 892, leads: 12, ctr: 1.34 },
                  { name: 'Mazda CX-5 Premium', img: 'uploads/s02-card03-mazda-cx5-red.png', views: 524, leads: 7, ctr: 1.34 },
                  { name: 'VinFast VF8 Plus', img: 'uploads/s02-card11-vinfast-vf8-blue.png', views: 412, leads: 3, ctr: 0.73 },
                  { name: 'Kia Seltos 1.6L', img: 'uploads/s02-card06-kia-seltos-silver.png', views: 287, leads: 5, ctr: 1.74 },
                ].map((c, i, arr) => (
                  <div key={c.name} style={{ display: 'grid', gridTemplateColumns: '60px 1fr 90px 80px 90px', gap: 14, padding: '14px 20px', alignItems: 'center', borderBottom: i < arr.length - 1 ? '1px solid var(--border)' : 'none' }}>
                    <div style={{ width: 56, aspectRatio: '4/3', borderRadius: 6, overflow: 'hidden' }}>
                      <img src={c.img} alt={c.name} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                    </div>
                    <div style={{ fontSize: 13, fontWeight: 600 }}>{c.name}</div>
                    <div className="mono" style={{ fontSize: 13, color: 'var(--text-2)' }}>{c.views.toLocaleString('vi-VN')} views</div>
                    <div className="mono" style={{ fontSize: 13, fontWeight: 700, color: 'var(--success)' }}>{c.leads} leads</div>
                    <div className="mono" style={{ fontSize: 12, color: c.ctr >= 1.4 ? 'var(--success)' : 'var(--text-2)', fontWeight: 700 }}>CTR {c.ctr}%</div>
                  </div>
                ))}
              </div>

              {/* Traffic sources */}
              <div className="card" style={{ padding: 22 }}>
                <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 4 }}>Nguồn traffic</div>
                <div style={{ fontSize: 12, color: 'var(--text-3)', marginBottom: 20, fontFamily: '"JetBrains Mono", monospace' }}>30 ngày qua · 12,847 views</div>
                {[
                  { src: 'Zalo OA', n: 5421, pct: 42, c: '#3DA9FF' },
                  { src: 'Microsite SEO', n: 3592, pct: 28, c: '#E85D2C' },
                  { src: 'Facebook', n: 2187, pct: 17, c: '#7C9BFF' },
                  { src: 'Direct (link AC)', n: 1180, pct: 9, c: '#FFB800' },
                  { src: 'Google Ads', n: 467, pct: 4, c: '#22C55E' },
                ].map(s => (
                  <div key={s.src} style={{ marginBottom: 16 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                      <span style={{ fontSize: 13, fontWeight: 500 }}>{s.src}</span>
                      <span className="mono" style={{ fontSize: 12, color: 'var(--text-2)', fontWeight: 600 }}>{s.n.toLocaleString('vi-VN')} · {s.pct}%</span>
                    </div>
                    <div style={{ width: '100%', height: 8, borderRadius: 4, background: 'rgba(255,255,255,0.06)', overflow: 'hidden' }}>
                      <div style={{ width: `${s.pct}%`, height: '100%', background: s.c, borderRadius: 4, boxShadow: `0 0 12px ${s.c}50` }} />
                    </div>
                  </div>
                ))}
                <div style={{ marginTop: 24, padding: 14, background: 'rgba(232,93,44,0.06)', border: '1px solid rgba(232,93,44,0.2)', borderRadius: 10, fontSize: 12, color: 'var(--text-2)', lineHeight: 1.6 }}>
                  <strong style={{ color: 'var(--accent)' }}>💡 Insight:</strong> Zalo OA mang về 42% traffic. Đẩy mạnh broadcast vào 19h-21h (peak window) để tăng thêm 15-20%.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB: Tools (loan/quote) */}
        {activeTab === 'tools' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            {/* Loan calculator */}
            <div className="card" style={{ padding: 26 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: 'linear-gradient(135deg, rgba(0,144,255,0.2), rgba(0,144,255,0.05))', border: '1px solid rgba(0,144,255,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#3DA9FF' }}>
                  <Ico name="bank" size={22} />
                </div>
                <div>
                  <div style={{ fontSize: 16, fontWeight: 700 }}>Loan calculator · VPBank pilot</div>
                  <div style={{ fontSize: 12, color: 'var(--text-3)', marginTop: 2 }}>Tính nhanh khoản trả góp cho khách</div>
                </div>
              </div>

              {[
                { l: 'Giá xe', v: '920,000,000 ₫', sub: 'Honda CR-V 1.5L Turbo 2022' },
                { l: 'Trả trước', v: '276,000,000 ₫ (30%)' },
                { l: 'Khoản vay', v: '644,000,000 ₫' },
                { l: 'Kỳ hạn', v: '60 tháng' },
                { l: 'Lãi suất VPBank', v: '7.9%/năm (12 tháng đầu) → 10.5% thả nổi' },
              ].map(r => (
                <div key={r.l} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px dashed var(--border)' }}>
                  <span style={{ fontSize: 13, color: 'var(--text-2)' }}>{r.l}</span>
                  <span className="mono" style={{ fontSize: 13, fontWeight: 600, textAlign: 'right' }}>{r.v}{r.sub && <div style={{ fontSize: 11, color: 'var(--text-3)', fontWeight: 400, marginTop: 2 }}>{r.sub}</div>}</span>
                </div>
              ))}

              <div style={{ marginTop: 18, padding: 18, background: 'linear-gradient(135deg, rgba(0,144,255,0.1), rgba(0,144,255,0.03))', border: '1px solid rgba(0,144,255,0.3)', borderRadius: 12 }}>
                <div style={{ fontSize: 11, color: 'var(--text-3)', fontFamily: '"JetBrains Mono", monospace', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>Trả góp tháng đầu</div>
                <div className="mono" style={{ fontSize: 32, fontWeight: 800, color: '#3DA9FF', marginTop: 6, letterSpacing: '-0.02em' }}>13,287,000 ₫</div>
                <div style={{ fontSize: 12, color: 'var(--text-2)', marginTop: 8 }}>Tổng phải trả 60 tháng: <strong className="mono" style={{ color: 'var(--text)' }}>847,2M ₫</strong> · Lãi: <strong className="mono" style={{ color: '#FFB800' }}>203,2M ₫</strong></div>
              </div>

              <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
                <button className="btn btn-outline" style={{ flex: 1, padding: '12px', fontSize: 13, fontWeight: 600 }}>Điều chỉnh</button>
                <button className="btn btn-primary" style={{ flex: 1, padding: '12px', fontSize: 13, fontWeight: 700 }}><Ico name="chat" size={14} /> Gửi cho khách qua Zalo</button>
              </div>
            </div>

            {/* Quote generator */}
            <div className="card" style={{ padding: 26 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: 'linear-gradient(135deg, rgba(232,93,44,0.2), rgba(232,93,44,0.05))', border: '1px solid rgba(232,93,44,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)' }}>
                  <Ico name="file" size={22} />
                </div>
                <div>
                  <div style={{ fontSize: 16, fontWeight: 700 }}>Báo giá PDF</div>
                  <div style={{ fontSize: 12, color: 'var(--text-3)', marginTop: 2 }}>Sinh báo giá có brand AC + Otobank seal</div>
                </div>
              </div>

              {/* Mini PDF preview */}
              <div style={{ background: '#fff', borderRadius: 10, padding: 24, color: '#0A0E12', position: 'relative', boxShadow: '0 12px 30px rgba(0,0,0,0.5)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16, borderBottom: '2px solid #E85D2C', paddingBottom: 12 }}>
                  <div>
                    <div style={{ fontFamily: '"Space Grotesk", sans-serif', fontSize: 18, fontWeight: 800, color: '#E85D2C', letterSpacing: '-0.02em' }}>OTOBANK</div>
                    <div style={{ fontSize: 9, color: '#666', marginTop: 2, letterSpacing: '0.05em' }}>BÁO GIÁ XE — QUOTE #Q-20260509-008</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: 10, color: '#666' }}>AC: <strong style={{ color: '#0A0E12' }}>Anh Tuấn</strong></div>
                    <div style={{ fontSize: 9, color: '#999' }}>09-05-2026</div>
                  </div>
                </div>

                <div style={{ fontSize: 12, marginBottom: 8 }}><strong>Khách:</strong> Trần Văn Hùng</div>
                <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 12 }}>Honda CR-V 1.5L Turbo 2022 · 28,500 km</div>

                <div style={{ background: '#FAFAFA', padding: 12, borderRadius: 6, marginBottom: 12, fontSize: 11 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0' }}><span>Giá niêm yết</span><span>920,000,000 ₫</span></div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', color: '#22863A' }}><span>Khuyến mãi pilot</span><span>− 8,000,000 ₫</span></div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0' }}><span>Lệ phí trước bạ (10%)</span><span>91,200,000 ₫</span></div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0' }}><span>Bảo hiểm năm 1</span><span>14,560,000 ₫</span></div>
                  <div style={{ borderTop: '1px solid #DDD', marginTop: 6, paddingTop: 8, display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: 12 }}><span>TỔNG LĂN BÁNH</span><span style={{ color: '#E85D2C' }}>1,017,760,000 ₫</span></div>
                </div>

                <div style={{ fontSize: 9, color: '#999', textAlign: 'center', marginTop: 14, paddingTop: 12, borderTop: '1px dashed #DDD' }}>Báo giá có hiệu lực 7 ngày · Trust Score xe: 92/100 · Powered by Otobank</div>
              </div>

              <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
                <button className="btn btn-outline" style={{ flex: 1, padding: '12px', fontSize: 13, fontWeight: 600 }}><Ico name="download" size={14} /> Tải PDF</button>
                <button className="btn btn-primary" style={{ flex: 1, padding: '12px', fontSize: 13, fontWeight: 700 }}><Ico name="chat" size={14} /> Gửi Zalo</button>
              </div>
            </div>
          </div>
        )}

        {/* TAB: Settings */}
        {activeTab === 'settings' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: 20 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              {/* Profile */}
              <div className="card" style={{ padding: 24 }}>
                <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 4 }}>Profile</div>
                <div style={{ fontSize: 12, color: 'var(--text-3)', marginBottom: 18 }}>Thông tin AC hiển thị trong shop public</div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                  {[
                    { l: 'Họ tên', v: 'Nguyễn Minh Tuấn' },
                    { l: 'SĐT', v: '0912 345 678', mono: true },
                    { l: 'Khu vực hoạt động', v: 'TP.HCM' },
                    { l: 'Năm kinh nghiệm', v: '4 năm' },
                  ].map(f => (
                    <div key={f.l}>
                      <label style={{ fontSize: 11, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600, fontFamily: '"JetBrains Mono", monospace' }}>{f.l}</label>
                      <div style={{ marginTop: 6, padding: '11px 14px', background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 8, fontSize: 13, fontFamily: f.mono ? '"JetBrains Mono", monospace' : 'inherit' }}>{f.v}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Shop branding */}
              <div className="card" style={{ padding: 24 }}>
                <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 4 }}>Shop branding</div>
                <div style={{ fontSize: 12, color: 'var(--text-3)', marginBottom: 18 }}>Tùy chỉnh hiển thị landing public của bạn</div>
                <div style={{ marginBottom: 14 }}>
                  <label style={{ fontSize: 11, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600, fontFamily: '"JetBrains Mono", monospace' }}>Shop URL</label>
                  <div style={{ marginTop: 6, padding: '11px 14px', background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 8, fontSize: 13, fontFamily: '"JetBrains Mono", monospace', display: 'flex', justifyContent: 'space-between' }}>
                    <span><span style={{ color: 'var(--text-3)' }}>https://</span><strong style={{ color: 'var(--accent)' }}>anhtuan</strong><span style={{ color: 'var(--text-3)' }}>.otobank.vn</span></span>
                    <button style={{ background: 'transparent', border: 'none', color: 'var(--accent)', cursor: 'pointer', fontSize: 12, fontWeight: 600 }}>Đổi slug</button>
                  </div>
                </div>
                <div style={{ marginBottom: 14 }}>
                  <label style={{ fontSize: 11, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600, fontFamily: '"JetBrains Mono", monospace' }}>Bio (hiển thị trên landing)</label>
                  <div style={{ marginTop: 6, padding: '11px 14px', background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 8, fontSize: 13, lineHeight: 1.5 }}>4 năm kinh nghiệm, chuyên SUV và sedan tầm giá 700M – 1.5B. Tận tâm tư vấn, hỗ trợ tài chính VPBank.</div>
                </div>
                <div>
                  <label style={{ fontSize: 11, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600, fontFamily: '"JetBrains Mono", monospace' }}>Theme accent</label>
                  <div style={{ marginTop: 8, display: 'flex', gap: 10 }}>
                    {['#E85D2C', '#3DA9FF', '#22C55E', '#A855F7', '#0A0E12'].map((c, i) => (
                      <span key={c} style={{ width: 36, height: 36, borderRadius: 10, background: c, cursor: 'pointer', border: i === 0 ? '2px solid #fff' : '2px solid transparent', boxShadow: i === 0 ? '0 0 0 2px var(--accent)' : 'none' }} />
                    ))}
                  </div>
                </div>
              </div>

              {/* Notifications */}
              <NotificationsCard />

            </div>

            {/* Tier card sidebar */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              <div className="card" style={{ padding: 24, background: 'linear-gradient(160deg, rgba(232,93,44,0.12), rgba(255,184,0,0.04))', border: '1px solid rgba(232,93,44,0.3)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                  <Ico name="award" size={18} /> <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 11, fontWeight: 700, color: 'var(--accent)', letterSpacing: '0.08em' }}>TIER PROGRESSION</span>
                </div>
                <div style={{ fontSize: 28, fontWeight: 800, fontFamily: '"Space Grotesk", sans-serif', letterSpacing: '-0.02em' }}>★ Senior · 1.15x</div>
                <div style={{ fontSize: 12, color: 'var(--text-2)', marginTop: 6 }}>Hoa hồng được nhân 1.15x tier multiplier</div>

                <div style={{ marginTop: 22 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 8 }}>
                    <span style={{ color: 'var(--text-2)' }}>Đến tier <strong style={{ color: '#FFB800' }}>★ Elite · 1.25x</strong></span>
                    <span className="mono" style={{ color: 'var(--text)', fontWeight: 700 }}>52.4 / 80 M ₫</span>
                  </div>
                  <div style={{ width: '100%', height: 10, borderRadius: 5, background: 'rgba(255,255,255,0.06)', overflow: 'hidden' }}>
                    <div style={{ width: '65.5%', height: '100%', background: 'linear-gradient(90deg, #E85D2C, #FFB800)', borderRadius: 5, boxShadow: '0 0 12px rgba(232,93,44,0.5)' }} />
                  </div>
                  <div style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 8 }}>Còn 27.6M ₫ doanh thu trong 22 ngày để lên tier</div>
                </div>
              </div>

              <div className="card" style={{ padding: 22 }}>
                <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 14 }}>Payout</div>
                <div style={{ fontSize: 12, color: 'var(--text-3)', marginBottom: 6 }}>Tài khoản nhận hoa hồng</div>
                <div className="mono" style={{ fontSize: 13, fontWeight: 600 }}>VCB · 0181 ••• 4729</div>
                <div style={{ fontSize: 12, color: 'var(--text-2)', marginTop: 4 }}>Nguyễn Minh Tuấn</div>
                <div style={{ marginTop: 16, padding: 12, background: 'var(--surface-2)', borderRadius: 8, fontSize: 11, color: 'var(--text-2)', lineHeight: 1.5 }}>Otobank chuyển hoa hồng vào ngày <strong style={{ color: 'var(--text)' }}>15 hằng tháng</strong>, sau khi đối soát đơn đã bàn giao.</div>
              </div>

              <button className="btn btn-outline" style={{ padding: '14px', fontSize: 13, fontWeight: 600, color: '#FF5F56', borderColor: 'rgba(255,95,86,0.4)' }}>Đăng xuất</button>
            </div>
          </div>
        )}

        {/* AI assist row */}
        <div className="ai-copilot-row" style={{ marginTop: 24, padding: 24, background: 'linear-gradient(135deg, rgba(232,93,44,0.08), rgba(255,184,0,0.04))', border: '1px solid rgba(232,93,44,0.25)', borderRadius: 14, display: 'grid', gridTemplateColumns: '60px 1fr auto', gap: 20, alignItems: 'center' }}>
          <div className="ai-copilot-icon" style={{
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
  const featured = {
    name: 'Honda CR-V 1.5L Turbo G 2022', km: '28,500', img: 'uploads/s02-card01-honda-crv-blue.png',
    trust: 92, price: 920, monthly: 13.3, downpct: 30,
    badges: ['Great Deal', 'Certified'], year: 2022, fuel: 'Xăng', trans: 'CVT', color: 'Xanh ngọc',
    viewers: 17, savedBy: 42,
  };

  const showroomCars = [
    { name: 'Toyota Camry 2.5Q 2022', km: '34,200', img: 'uploads/s02-card02-toyota-camry-white.png', trust: 95, price: 1180, deal: 'great', loc: 'HCM', viewers: 8, hot: true },
    { name: 'Mazda CX-5 Premium 2023', km: '18,700', img: 'uploads/s02-card03-mazda-cx5-red.png', trust: 88, price: 850, loc: 'HN', viewers: 4 },
    { name: 'VinFast VF8 Plus 2023', km: '12,400', img: 'uploads/s02-card11-vinfast-vf8-blue.png', trust: 91, price: 1200, loc: 'HCM', viewers: 6, deadline: 2 },
    { name: 'Kia Seltos 1.6L 2023', km: '14,200', img: 'uploads/s02-card06-kia-seltos-silver.png', trust: 85, price: 690, loc: 'HCM', viewers: 11, hot: true },
    { name: 'Hyundai Tucson 2.0 2022', km: '32,100', img: 'uploads/s02-card07-hyundai-tucson-gray.png', trust: 82, price: 880, loc: 'HCM', viewers: 3 },
    { name: 'Toyota Innova Cross 2023', km: '21,500', img: 'uploads/s02-card09-toyota-innova-silver.png', trust: 86, price: 720, loc: 'HCM', viewers: 5 },
  ];

  const activities = [
    'Anh Hùng (Q.7) vừa đặt lịch xem Honda CR-V — 2 phút trước',
    'Chị Mai (Q.1) đã chốt cọc 50M cho Toyota Camry — 8 phút trước',
    'Đơn #OB-0142 vừa giao xong: Honda Civic 780M ₫ — 14 phút trước',
    'Anh Quân (Q.10) vừa thêm Mazda CX-5 vào yêu thích — 22 phút trước',
    'Anh Đức (Bình Tân) đặt test-drive VinFast VF8 — 35 phút trước',
    'Chị Lan (Q.7) vừa xin báo giá Kia Seltos — 1 giờ trước',
  ];

  const testimonials = [
    { initial: 'TH', name: 'Trần Văn Hùng', car: 'Honda CR-V 1.5L 2022', stars: 5, when: '2 tuần trước',
      quote: 'Anh Tuấn tư vấn rất thật, không lái khách như sales hãng. Mình đi xem 3 xe rồi chốt CR-V — Otobank lo từ đăng ký đến giao xe trong 5 ngày. Tuyệt vời!' },
    { initial: 'LM', name: 'Lê Thị Mai', car: 'Toyota Camry 2.5Q 2022', stars: 5, when: '1 tháng trước',
      quote: 'Lần đầu mua xe cũ mà không lo sợ. Trust Score 95 + báo cáo 200 điểm rõ ràng từng chi tiết. Anh Tuấn còn cho mượn xe lái thử 1 ngày!' },
    { initial: 'PD', name: 'Phạm Minh Đức', car: 'Mazda CX-5 Premium 2023', stars: 5, when: '3 tuần trước',
      quote: 'Lãi suất VPBank pilot ưu đãi hơn ngân hàng tôi tự đến hỏi. Toàn bộ giấy tờ làm online qua Otobank, không phải đi đâu. 10/10 sẽ giới thiệu bạn bè.' },
  ];

  return (
    <div className="otobank" style={{ width: 1440, minHeight: 3400, background: 'var(--bg)', position: 'relative' }}>
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

      {/* HERO — Cinematic AC + Featured Car split */}
      <section className="showroom-hero" style={{ position: 'relative', overflow: 'hidden', borderBottom: '1px solid var(--border)' }}>
        {/* Animated background blobs */}
        <span className="hero-blob hero-blob-1" />
        <span className="hero-blob hero-blob-2" />
        <span className="hero-grid-overlay" />

        <div style={{ maxWidth: 1320, margin: '0 auto', padding: '56px 64px 56px', display: 'grid', gridTemplateColumns: '1fr 600px', gap: 56, alignItems: 'center', position: 'relative', zIndex: 1 }}>
          {/* Left: AC info */}
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '7px 14px', borderRadius: 999, background: 'rgba(232,93,44,0.12)', border: '1px solid rgba(232,93,44,0.35)', marginBottom: 20 }}>
              <span className="pulse-dot" style={{ width: 8, height: 8, borderRadius: '50%', background: '#E85D2C' }} />
              <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 11, fontWeight: 700, color: '#E85D2C', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Shop chính chủ · anhtuan.otobank.vn</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 18 }}>
              <div style={{ width: 88, height: 88, borderRadius: 22, background: 'linear-gradient(135deg, #E85D2C 0%, #FFB800 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontFamily: '"Space Grotesk", sans-serif', fontSize: 36, fontWeight: 800, boxShadow: '0 16px 40px rgba(232,93,44,0.45), inset 0 2px 0 rgba(255,255,255,0.3)', position: 'relative', flexShrink: 0 }}>
                <span style={{ position: 'absolute', inset: 3, borderRadius: 19, background: 'radial-gradient(circle at 30% 25%, rgba(255,255,255,0.3), transparent 60%)' }} />
                <span style={{ position: 'relative', zIndex: 1 }}>T</span>
                <div style={{ position: 'absolute', bottom: -4, right: -4, width: 28, height: 28, borderRadius: '50%', background: '#10B981', border: '3px solid #0F1419', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
                  <Ico name="check" size={13} />
                </div>
              </div>
              <div>
                <h1 style={{ fontFamily: '"Space Grotesk", sans-serif', fontSize: 42, fontWeight: 800, margin: 0, color: '#F5F5F5', letterSpacing: '-0.025em', lineHeight: 1.05 }}>Anh Nguyễn Minh Tuấn</h1>
                <div style={{ display: 'flex', gap: 8, marginTop: 8, flexWrap: 'wrap' }}>
                  <span style={{ fontSize: 11, padding: '4px 10px', borderRadius: 999, background: 'rgba(232,93,44,0.18)', border: '1px solid rgba(232,93,44,0.4)', color: '#E85D2C', fontWeight: 700, letterSpacing: '0.04em', fontFamily: '"JetBrains Mono", monospace' }}>★ AC TIER SENIOR · 1.15x</span>
                  <span style={{ fontSize: 11, padding: '4px 10px', borderRadius: 999, background: 'rgba(16,185,129,0.18)', border: '1px solid rgba(16,185,129,0.4)', color: '#10B981', fontWeight: 700, letterSpacing: '0.04em', fontFamily: '"JetBrains Mono", monospace' }}>✓ OTOBANK VERIFIED</span>
                </div>
              </div>
            </div>

            <p style={{ fontSize: 17, color: '#A0A4AB', margin: '0 0 22px', lineHeight: 1.55, maxWidth: 560 }}>
              Chuyên SUV gia đình & sedan hạng D — 3 năm kinh nghiệm, <strong style={{ color: '#fff' }}>247 khách hài lòng</strong>. Tôi tự tay chọn 38 chiếc xe phù hợp nhất từ kho Otobank, đảm bảo Trust Score ≥75 + inspection 200 điểm.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 24 }}>
              {[
                { l: '⭐ Rating', v: '4.9', sub: '247 reviews', c: '#FFB800' },
                { l: 'Closed', v: '28', sub: 'deals 90d', c: '#10B981' },
                { l: 'Phản hồi', v: '~12p', sub: '24/7', c: '#3DA9FF' },
                { l: 'Quay lại', v: '34%', sub: 'mua xe #2-3', c: '#E85D2C' },
              ].map(s => (
                <div key={s.l} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, padding: '12px 14px', backdropFilter: 'blur(10px)' }}>
                  <div style={{ fontSize: 10, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600, fontFamily: '"JetBrains Mono", monospace' }}>{s.l}</div>
                  <div className="mono" style={{ fontSize: 22, fontWeight: 800, color: s.c, marginTop: 2, letterSpacing: '-0.02em', lineHeight: 1.1 }}>{s.v}</div>
                  <div style={{ fontSize: 10, color: '#A0A4AB' }}>{s.sub}</div>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: 12 }}>
              <button className="hero-cta-zalo" style={{ padding: '14px 26px', borderRadius: 12, border: 'none', background: 'linear-gradient(135deg, #E85D2C, #FFB800)', color: '#fff', fontWeight: 700, fontSize: 15, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10, position: 'relative', overflow: 'hidden' }}>
                <span style={{ fontSize: 18 }}>💬</span> Chat Zalo với tôi
              </button>
              <button style={{ padding: '14px 22px', borderRadius: 12, border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(255,255,255,0.04)', color: '#fff', fontWeight: 600, fontSize: 14, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}>
                <Ico name="play" size={14} /> Xem video giới thiệu
              </button>
              <button style={{ padding: '14px 18px', borderRadius: 12, border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(255,255,255,0.04)', color: '#fff', fontWeight: 600, fontSize: 14, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}>
                <Ico name="phone" size={14} /> 0901 234 567
              </button>
            </div>
          </div>

          {/* Right: FEATURED CAR — the showpiece */}
          <div className="featured-car-card" style={{ position: 'relative', borderRadius: 22, overflow: 'hidden', background: 'linear-gradient(165deg, #1A1F26 0%, #0F1419 100%)', border: '1px solid rgba(232,93,44,0.3)', boxShadow: '0 30px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(232,93,44,0.15), 0 12px 30px rgba(232,93,44,0.18)' }}>
            <div style={{ position: 'absolute', top: 16, left: 16, zIndex: 3, display: 'inline-flex', alignItems: 'center', gap: 8, padding: '7px 14px', borderRadius: 999, background: 'linear-gradient(135deg, #E85D2C, #FFB800)', color: '#fff', fontSize: 11, fontWeight: 800, letterSpacing: '0.06em', fontFamily: '"JetBrains Mono", monospace', textTransform: 'uppercase', boxShadow: '0 8px 20px rgba(232,93,44,0.5)' }}>
              <span className="pulse-dot" style={{ width: 7, height: 7, borderRadius: '50%', background: '#fff' }} />
              ★ Xe nổi bật tuần này
            </div>

            <div style={{ position: 'relative', aspectRatio: '16/10', overflow: 'hidden' }}>
              <img src={featured.img} alt={featured.name} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              <span className="featured-shine" />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(15,20,25,0.9) 0%, transparent 50%)' }} />
              <div style={{ position: 'absolute', bottom: 14, left: 16, right: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div>
                  <div style={{ display: 'inline-flex', gap: 6, marginBottom: 8 }}>
                    {featured.badges.map(b => (
                      <span key={b} style={{ fontSize: 10, padding: '3px 9px', borderRadius: 4, background: b === 'Great Deal' ? '#10B981' : 'rgba(15,20,25,0.85)', color: '#fff', fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase', fontFamily: '"JetBrains Mono", monospace', border: b === 'Great Deal' ? 'none' : '1px solid rgba(16,185,129,0.5)' }}>● {b}</span>
                    ))}
                  </div>
                  <div style={{ fontFamily: '"Space Grotesk", sans-serif', fontSize: 22, fontWeight: 800, color: '#fff', letterSpacing: '-0.02em', lineHeight: 1.15 }}>{featured.name}</div>
                  <div style={{ fontSize: 12, color: '#A0A4AB', marginTop: 4 }}>{featured.km} km · {featured.year} · {featured.fuel} · {featured.trans} · màu {featured.color}</div>
                </div>
                <div style={{ background: 'rgba(15,20,25,0.92)', backdropFilter: 'blur(8px)', border: '1px solid rgba(16,185,129,0.5)', borderRadius: 8, padding: '6px 10px', display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0 }}>
                  <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 13, fontWeight: 800, background: '#10B981', color: '#fff', padding: '1px 7px', borderRadius: 4 }}>{featured.trust}</span>
                  <span style={{ fontSize: 10, fontWeight: 700, color: '#10B981', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Certified</span>
                </div>
              </div>
            </div>

            <div style={{ padding: '18px 20px 20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 14 }}>
                <div>
                  <div className="mono" style={{ fontFamily: '"Space Grotesk", sans-serif', fontSize: 34, fontWeight: 800, color: '#E85D2C', letterSpacing: '-0.02em', lineHeight: 1 }}>{featured.price}M ₫</div>
                  <div style={{ fontSize: 12, color: '#A0A4AB', marginTop: 4 }}>Trả góp từ <strong style={{ color: '#FFB800' }}>{featured.monthly}M ₫/tháng</strong> · Trả trước {featured.downpct}%</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 11, color: '#6B7280', fontFamily: '"JetBrains Mono", monospace', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Đang có</div>
                  <div style={{ fontSize: 12, color: '#FFB800', fontWeight: 600, marginTop: 2, display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                    <Ico name="eye" size={11} /> {featured.viewers} đang xem
                  </div>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 8 }}>
                <button className="hero-cta-primary" style={{ padding: '13px', borderRadius: 10, border: 'none', background: 'linear-gradient(135deg, #E85D2C, #FFB800)', color: '#fff', fontWeight: 700, fontSize: 14, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                  <Ico name="calendar" size={14} /> Đặt lịch xem ngay
                </button>
                <button style={{ padding: '13px 16px', borderRadius: 10, border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(255,255,255,0.05)', color: '#fff', fontWeight: 600, fontSize: 13, cursor: 'pointer' }}>
                  <Ico name="heart" size={14} /> Lưu
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LIVE ACTIVITY TICKER — pitch wow: shop is alive */}
      <div style={{ background: 'linear-gradient(90deg, rgba(232,93,44,0.08), rgba(232,93,44,0.02) 60%)', borderBottom: '1px solid var(--border)', padding: '12px 64px', display: 'flex', alignItems: 'center', gap: 24, overflow: 'hidden' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, flexShrink: 0, padding: '6px 12px', borderRadius: 8, background: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.4)' }}>
          <span className="pulse-dot" style={{ width: 8, height: 8, borderRadius: '50%', background: '#EF4444', boxShadow: '0 0 8px #EF4444' }} />
          <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 11, fontWeight: 700, color: '#EF4444', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Live · 24 khách đang ở shop</span>
        </div>
        <div className="ticker-track" style={{ flex: 1, overflow: 'hidden', position: 'relative', height: 22 }}>
          <div className="ticker-content" style={{ position: 'absolute', top: 0, left: 0, display: 'flex', gap: 64, whiteSpace: 'nowrap' }}>
            {[...activities, ...activities].map((a, i) => (
              <span key={i} style={{ fontSize: 13, color: '#A0A4AB', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#10B981' }} />{a}
              </span>
            ))}
          </div>
        </div>
      </div>

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
            <div key={i} className="showroom-car" style={{
              background: 'var(--surface)', border: '1px solid var(--border)',
              borderRadius: 16, overflow: 'hidden', cursor: 'pointer',
              transition: 'transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.3s ease, border-color 0.3s ease',
              position: 'relative',
            }}>
              <button className="wishlist-heart" title="Lưu vào yêu thích">
                <Ico name="heart" size={16} />
              </button>
              <div style={{ position: 'relative', aspectRatio: '16/10' }}>
                <img src={c.img} alt={c.name} className="vehicle-image" loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />

                {/* Top-left badges */}
                <div style={{ position: 'absolute', top: 12, left: 12, display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {c.deal === 'great' && (
                    <span style={{ fontSize: 11, padding: '4px 10px', borderRadius: 999, background: '#10B981', color: '#fff', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: 5, width: 'fit-content' }}>● Great Deal</span>
                  )}
                  {c.hot && (
                    <span style={{ fontSize: 11, padding: '4px 10px', borderRadius: 999, background: 'rgba(239,68,68,0.95)', color: '#fff', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: 5, width: 'fit-content', boxShadow: '0 4px 12px rgba(239,68,68,0.4)' }}>🔥 Hot</span>
                  )}
                  {c.deadline && (
                    <span style={{ fontSize: 11, padding: '4px 10px', borderRadius: 999, background: 'linear-gradient(135deg, #E85D2C, #FFB800)', color: '#fff', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: 5, width: 'fit-content', boxShadow: '0 4px 12px rgba(232,93,44,0.4)' }}>⏰ Còn {c.deadline} ngày</span>
                  )}
                </div>

                {/* Bottom-right Trust badge */}
                <div style={{
                  position: 'absolute', bottom: 12, right: 12,
                  background: 'rgba(15,20,25,0.92)', backdropFilter: 'blur(8px)',
                  border: c.trust >= 90 ? '1px solid rgba(16,185,129,0.4)' : '1px solid rgba(232,93,44,0.4)',
                  borderRadius: 8, padding: '5px 9px', display: 'flex', alignItems: 'center', gap: 6,
                }}>
                  <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 12, fontWeight: 700, background: c.trust >= 90 ? '#10B981' : '#E85D2C', color: '#fff', padding: '1px 6px', borderRadius: 4 }}>{c.trust}</span>
                  <span style={{ fontSize: 10, fontWeight: 600, color: c.trust >= 90 ? '#10B981' : '#E85D2C', textTransform: 'uppercase' }}>{c.trust >= 90 ? 'Certified' : 'Verified'}</span>
                </div>

                {/* Bottom-left viewers */}
                {c.viewers >= 5 && (
                  <div style={{ position: 'absolute', bottom: 12, left: 12, background: 'rgba(15,20,25,0.85)', backdropFilter: 'blur(8px)', borderRadius: 6, padding: '4px 9px', fontSize: 11, color: '#FFB800', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 5 }}>
                    <span className="pulse-dot" style={{ width: 6, height: 6, borderRadius: '50%', background: '#FFB800' }} /> {c.viewers} đang xem
                  </div>
                )}
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

      {/* AI MATCHMAKER — pitch wow: AI-driven shopping helper */}
      <section style={{ padding: '40px 64px', maxWidth: 1280, margin: '0 auto', width: '100%' }}>
        <div style={{ position: 'relative', borderRadius: 22, overflow: 'hidden', background: 'linear-gradient(135deg, rgba(232,93,44,0.1) 0%, rgba(255,184,0,0.04) 50%, rgba(15,20,25,0.5) 100%)', border: '1px solid rgba(232,93,44,0.25)', padding: 40, display: 'grid', gridTemplateColumns: '1fr 540px', gap: 40, alignItems: 'center' }}>
          <span className="ai-glow-orb ai-glow-1" />
          <span className="ai-glow-orb ai-glow-2" />

          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 12px', borderRadius: 999, background: 'rgba(232,93,44,0.15)', border: '1px solid rgba(232,93,44,0.4)', marginBottom: 18 }}>
              <Ico name="sparkles" size={14} /> <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 11, fontWeight: 700, color: '#E85D2C', letterSpacing: '0.08em' }}>AI MATCHMAKER · BETA</span>
            </div>
            <h2 style={{ fontFamily: '"Space Grotesk", sans-serif', fontSize: 34, fontWeight: 800, margin: '0 0 12px', letterSpacing: '-0.02em', lineHeight: 1.1, color: '#fff' }}>Không biết chọn xe nào?<br /><span style={{ background: 'linear-gradient(135deg, #E85D2C, #FFB800)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>AI gợi ý cho bạn trong 30 giây.</span></h2>
            <p style={{ fontSize: 15, color: '#A0A4AB', margin: '0 0 22px', lineHeight: 1.5, maxWidth: 520 }}>
              Tôi hỏi 5 câu (ngân sách · gia đình bao người · mục đích · ưu tiên...) → AI sàng lọc 38 xe trong shop ra <strong style={{ color: '#fff' }}>đúng 3 chiếc phù hợp nhất với bạn</strong> + giải thích lý do.
            </p>
            <div style={{ display: 'flex', gap: 12 }}>
              <button className="hero-cta-zalo" style={{ padding: '14px 24px', borderRadius: 12, border: 'none', background: 'linear-gradient(135deg, #E85D2C, #FFB800)', color: '#fff', fontWeight: 700, fontSize: 14, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10, position: 'relative', overflow: 'hidden' }}>
                <Ico name="sparkles" size={16} /> Bắt đầu trợ lý AI
              </button>
              <button style={{ padding: '14px 22px', borderRadius: 12, border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(255,255,255,0.05)', color: '#fff', fontWeight: 600, fontSize: 14, cursor: 'pointer' }}>
                Xem demo 30 giây
              </button>
            </div>
          </div>

          {/* Mock chat preview */}
          <div style={{ position: 'relative', zIndex: 1, background: 'rgba(15,20,25,0.85)', backdropFilter: 'blur(14px)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 18, padding: 18, boxShadow: '0 20px 50px rgba(0,0,0,0.5)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, paddingBottom: 12, borderBottom: '1px solid rgba(255,255,255,0.08)', marginBottom: 14 }}>
              <div style={{ width: 30, height: 30, borderRadius: 8, background: 'linear-gradient(135deg, #E85D2C, #FFB800)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
                <Ico name="sparkles" size={14} />
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#fff' }}>Otobank AI Assistant</div>
                <div style={{ fontSize: 11, color: '#10B981', display: 'flex', alignItems: 'center', gap: 5 }}><span className="pulse-dot" style={{ width: 6, height: 6, borderRadius: '50%', background: '#10B981' }} /> Online · trả lời ngay</div>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: 13 }}>
              <div style={{ alignSelf: 'flex-start', maxWidth: '85%', background: 'rgba(255,255,255,0.06)', padding: '10px 14px', borderRadius: '14px 14px 14px 4px', color: '#E5E7EB', lineHeight: 1.5 }}>
                Chào bạn! 👋 Mình là AI của shop Anh Tuấn. Bạn cho mình biết: <strong style={{ color: '#FFB800' }}>ngân sách</strong> bạn dự định?
              </div>
              <div style={{ alignSelf: 'flex-end', maxWidth: '75%', background: 'linear-gradient(135deg, #E85D2C, #FFB800)', padding: '10px 14px', borderRadius: '14px 14px 4px 14px', color: '#fff', fontWeight: 500, lineHeight: 1.5 }}>
                Khoảng 800-950M ạ, đi gia đình 5 người
              </div>
              <div style={{ alignSelf: 'flex-start', maxWidth: '90%', background: 'rgba(255,255,255,0.06)', padding: '10px 14px', borderRadius: '14px 14px 14px 4px', color: '#E5E7EB', lineHeight: 1.5 }}>
                Tuyệt! Trong 38 xe của Anh Tuấn, mình gợi ý <strong style={{ color: '#fff' }}>3 lựa chọn match nhất</strong>:<br />
                <span style={{ display: 'block', marginTop: 8, padding: '8px 10px', background: 'rgba(232,93,44,0.1)', border: '1px solid rgba(232,93,44,0.25)', borderRadius: 8, fontSize: 12 }}>
                  🥇 <strong>Honda CR-V 1.5L 2022</strong> — 920M · Trust 92 · gia đình 5 thoải mái<br />
                  🥈 Mazda CX-5 Premium 2023 — 850M · Trust 88<br />
                  🥉 Hyundai Tucson 2.0 2022 — 880M · Trust 82
                </span>
              </div>
              <div style={{ alignSelf: 'flex-start', display: 'inline-flex', gap: 4 }}>
                <span className="typing-dot" style={{ animationDelay: '0s' }} />
                <span className="typing-dot" style={{ animationDelay: '0.15s' }} />
                <span className="typing-dot" style={{ animationDelay: '0.3s' }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS — social proof */}
      <section style={{ padding: '24px 64px 40px', maxWidth: 1280, margin: '0 auto', width: '100%' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 24 }}>
          <div>
            <h2 style={{ fontFamily: '"Space Grotesk", sans-serif', fontSize: 30, fontWeight: 700, margin: 0, letterSpacing: '-0.02em' }}>247 khách đã hài lòng</h2>
            <p style={{ fontSize: 14, color: 'var(--text-2)', margin: '6px 0 0' }}>Reviews thật, được xác minh bởi Otobank — không xoá được, không sửa được.</p>
          </div>
          <a style={{ fontSize: 13, color: 'var(--accent)', cursor: 'pointer', fontWeight: 600 }}>Xem 247 reviews →</a>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
          {testimonials.map(t => (
            <div key={t.name} className="testimonial-card" style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, padding: 22, position: 'relative', transition: 'transform 0.3s ease, border-color 0.3s ease' }}>
              <div style={{ position: 'absolute', top: -10, right: 18, fontSize: 60, color: 'rgba(232,93,44,0.15)', lineHeight: 1, fontFamily: 'Georgia, serif' }}>"</div>
              <div style={{ display: 'flex', gap: 4, marginBottom: 14, position: 'relative' }}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} style={{ color: i < t.stars ? '#FFB800' : 'rgba(255,255,255,0.15)', fontSize: 16 }}>★</span>
                ))}
              </div>
              <p style={{ fontSize: 14, color: 'var(--text)', lineHeight: 1.6, margin: '0 0 18px', position: 'relative' }}>{t.quote}</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, paddingTop: 14, borderTop: '1px dashed var(--border)' }}>
                <div style={{ width: 38, height: 38, borderRadius: '50%', background: 'linear-gradient(135deg, #E85D2C, #FFB800)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: 13, flexShrink: 0 }}>{t.initial}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', display: 'flex', alignItems: 'center', gap: 6 }}>{t.name} <span style={{ fontSize: 10, padding: '1px 6px', borderRadius: 4, background: 'rgba(16,185,129,0.15)', color: '#10B981', fontWeight: 700, fontFamily: '"JetBrains Mono", monospace' }}>✓ Verified</span></div>
                  <div style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 2 }}>Đã mua: {t.car} · {t.when}</div>
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
              { i: 'zap', t: 'Cố vấn 1-1, ưu tiên bạn trước', d: 'Tôi không gắn với riêng một hãng nào — quyền lợi của tôi đến từ sự hài lòng dài hạn của khách. Từ 38 xe đa thương hiệu trong shop, tôi chỉ giới thiệu chiếc thực sự phù hợp với nhu cầu và ngân sách của bạn.' },
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

      {/* FLOATING ZALO WIDGET — sticky bottom-right */}
      <div className="floating-zalo">
        <span className="floating-zalo-aura" />
        <button className="floating-zalo-btn" title="Chat Zalo với Anh Tuấn">
          <span style={{ fontSize: 24 }}>💬</span>
        </button>
        <div className="floating-zalo-bubble">
          <div style={{ fontSize: 12, fontWeight: 700, color: '#fff' }}>Hỏi Anh Tuấn</div>
          <div style={{ fontSize: 10, color: '#A0A4AB', marginTop: 1 }}>Phản hồi ~12 phút · 24/7</div>
        </div>
      </div>
    </div>
  );
};

Object.assign(window, { Screen17_ACWorkspace, Screen18_ACShowroom });
