// Screen 09 — Order Tracking
// Screen 10 — IRC Operations Dashboard
// Screen 11 — AI Pricing Analyst
// Screen 12 — Cario Tower (Vending Concept)

const Screen09_Tracking = () => (
  <div className="cario" style={{ width: 1440, minHeight: 1300, background: 'var(--bg)' }}>
    <CarioNav active="home" />

    <div style={{ padding: '20px 80px 12px', maxWidth: 1280, margin: '0 auto', display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'var(--text-2)' }}>
      <span>Tài khoản</span> <Ico name="chevron" size={11} />
      <span>Đơn hàng</span> <Ico name="chevron" size={11} />
      <span style={{ color: 'var(--text)' }} className="mono">#ORD-2026-0142</span>
    </div>

    <div style={{ padding: '20px 80px 60px', maxWidth: 1280, margin: '0 auto' }}>
      {/* Header card */}
      <div className="card" style={{ padding: 32, marginBottom: 20 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 28 }}>
          <div>
            <h1 style={{ fontSize: 28, margin: 0 }}>Xe của bạn đang trên đường đến</h1>
            <p style={{ fontSize: 14, color: 'var(--text-2)', marginTop: 6, marginBottom: 0 }}>
              Honda CR-V 1.5L Turbo 2022 • Đặt hàng 12/05/2026 • Giao 16/05/2026
            </p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div className="mono" style={{ fontSize: 32, fontWeight: 700, color: 'var(--accent)' }}>2h 15m</div>
            <div style={{ fontSize: 12, color: 'var(--text-2)', marginTop: 4 }}>ETA dự kiến đến nhà bạn</div>
          </div>
        </div>

        {/* Timeline */}
        <div style={{ position: 'relative' }}>
          <div style={{ position: 'absolute', top: 16, left: 16, right: 16, height: 2, background: 'var(--border)' }} />
          <div style={{ position: 'absolute', top: 16, left: 16, width: 'calc(60% - 16px)', height: 2, background: 'var(--success)' }} />

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', position: 'relative' }}>
            {[
              { t: 'Đặt cọc', d: '12/05 14:32', done: true },
              { t: 'Tài chính approved', d: '12/05 15:08', done: true },
              { t: 'Sang tên hoàn tất', d: '14/05 11:20', done: true },
              { t: 'Đang giao', d: 'Hôm nay 09:00', active: true },
              { t: 'Hoàn tất', d: 'Dự kiến 11:30' },
            ].map((s, i) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
                <div style={{
                  width: 32, height: 32, borderRadius: '50%',
                  background: s.done ? 'var(--success)' : s.active ? 'var(--accent)' : 'var(--surface-2)',
                  border: s.active ? '4px solid rgba(232,93,44,0.3)' : 'none',
                  color: s.done ? '#0F1419' : s.active ? '#fff' : 'var(--text-3)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700,
                  boxShadow: s.active ? '0 0 0 8px rgba(232,93,44,0.15)' : 'none',
                  zIndex: 1,
                }}>
                  {s.done ? <Ico name="check" size={14} /> : s.active ? <span style={{ width: 10, height: 10, background: '#fff', borderRadius: '50%', animation: 'pulse 1.6s infinite' }} /> : i + 1}
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: s.done || s.active ? 'var(--text)' : 'var(--text-2)' }}>{s.t}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 2 }}>{s.d}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 20 }}>
        {/* Map / Live tracking */}
        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
          <div style={{
            height: 380, position: 'relative',
            background: 'linear-gradient(135deg, #1a2332 0%, #0F1419 100%)',
          }}>
            {/* Mock map grid */}
            <svg width="100%" height="100%" viewBox="0 0 600 380" style={{ position: 'absolute', inset: 0 }}>
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1"/>
                </pattern>
              </defs>
              <rect width="600" height="380" fill="url(#grid)" />
              {/* Roads */}
              <path d="M 0 200 Q 200 180 300 200 T 600 220" stroke="rgba(160,164,171,0.2)" strokeWidth="14" fill="none" />
              <path d="M 0 200 Q 200 180 300 200 T 600 220" stroke="rgba(160,164,171,0.4)" strokeWidth="2" fill="none" strokeDasharray="4 8" />
              <path d="M 200 0 L 220 380" stroke="rgba(160,164,171,0.15)" strokeWidth="10" fill="none" />
              <path d="M 450 0 L 460 380" stroke="rgba(160,164,171,0.15)" strokeWidth="10" fill="none" />
              {/* Driver path traveled */}
              <path d="M 80 240 L 200 220 Q 250 200 320 210" stroke="var(--success)" strokeWidth="3" fill="none" strokeLinecap="round" />
              {/* Path remaining */}
              <path d="M 320 210 Q 400 220 480 200" stroke="var(--accent)" strokeWidth="3" fill="none" strokeLinecap="round" strokeDasharray="6 4" />
              {/* Origin */}
              <circle cx="80" cy="240" r="8" fill="var(--success)" />
              <circle cx="80" cy="240" r="14" fill="rgba(16,185,129,0.2)" />
              {/* Driver position */}
              <g transform="translate(320, 210)">
                <circle r="22" fill="rgba(232,93,44,0.2)" />
                <circle r="14" fill="var(--accent)" />
                <text x="0" y="4" textAnchor="middle" fontSize="14">🚗</text>
              </g>
              {/* Destination */}
              <g transform="translate(480, 200)">
                <circle r="10" fill="var(--text)" />
                <circle r="6" fill="var(--bg)" />
              </g>
              <text x="80" y="265" fill="var(--text-2)" fontSize="11" fontFamily="var(--font-mono)">SHOWROOM HCM</text>
              <text x="465" y="225" fill="var(--text)" fontSize="11" fontFamily="var(--font-mono)">NHÀ BẠN</text>
            </svg>

            {/* Floating chip */}
            <div className="card" style={{ position: 'absolute', top: 16, left: 16, padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 10, backdropFilter: 'blur(10px)', background: 'rgba(15,20,25,0.85)' }}>
              <span style={{ width: 8, height: 8, background: 'var(--success)', borderRadius: '50%', animation: 'pulse 1.5s infinite' }} />
              <span style={{ fontSize: 12, fontWeight: 600 }}>LIVE • Cập nhật mỗi 15 giây</span>
            </div>
          </div>

          <div style={{ padding: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'var(--accent)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>HÙ</div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600 }}>Anh Trần Quốc Hùng</div>
                <div style={{ fontSize: 12, color: 'var(--text-2)' }}>Đối tác giao xe (3rd party) • 4.9 ★ • 1,247 chuyến</div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button className="btn btn-outline" style={{ padding: '10px 14px', fontSize: 13 }}><Ico name="phone" size={14} /> Gọi</button>
              <button className="btn btn-outline" style={{ padding: '10px 14px', fontSize: 13 }}><Ico name="chat" size={14} /> Chat</button>
            </div>
          </div>
        </div>

        {/* Order details */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div className="card" style={{ padding: 20 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '90px 1fr', gap: 14, alignItems: 'center', marginBottom: 16 }}>
              <div style={{ width: 90, aspectRatio: '4/3', borderRadius: 6, overflow: 'hidden' }}>
                <img src="uploads/s02-card01-honda-crv-blue.png" alt="Honda CR-V 2022" className="vehicle-image" loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              </div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600 }}>Honda CR-V 1.5L Turbo</div>
                <div style={{ fontSize: 12, color: 'var(--text-2)' }}>2022 • 28,500 km</div>
                <div className="mono" style={{ fontSize: 16, fontWeight: 700, marginTop: 4 }}>953,000,000 ₫</div>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: 12 }}>
              {[
                ['Mã đơn hàng', '#ORD-2026-0142'],
                ['Đã thanh toán', '286,000,000 ₫'],
                ['Còn lại khi nhận xe', '667,000,000 ₫'],
                ['Hợp đồng VPBank', '#VPB-LN-892341'],
              ].map(([k, v]) => (
                <div key={k} style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-2)' }}>{k}</span>
                  <span className="mono" style={{ color: 'var(--text)', fontWeight: 500 }}>{v}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.25)', borderRadius: 12, padding: 18 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
              <span style={{ color: 'var(--success)' }}><Ico name="refresh" size={18} /></span>
              <div style={{ fontSize: 14, fontWeight: 600 }}>7 ngày đổi trả của bạn</div>
            </div>
            <div className="mono" style={{ fontSize: 22, fontWeight: 700, color: 'var(--success)', marginBottom: 4 }}>7 ngày 0 giờ</div>
            <div style={{ fontSize: 12, color: 'var(--text-2)' }}>Bắt đầu khi bạn nhận xe — tối đa 1,000 km</div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            <button className="btn btn-outline" style={{ padding: '12px', fontSize: 13 }}><Ico name="file" size={14} /> Xem hợp đồng</button>
            <button className="btn btn-outline" style={{ padding: '12px', fontSize: 13 }}><Ico name="info" size={14} /> Hỗ trợ</button>
          </div>
        </div>
      </div>
    </div>
    <style>{`@keyframes pulse{0%,100%{transform:scale(1);opacity:1}50%{transform:scale(1.4);opacity:0.5}}`}</style>
  </div>
);

// ─────────────────────────────────────────────────────────
// Screen 10 — IRC Operations Dashboard

const BRAND_TO_IMG = {
  'Toyota Vios 2021': 'uploads/s02-card12-honda-city-white.png',
  'Mazda CX-5 2023': 'uploads/s02-card03-mazda-cx5-red.png',
  'Ford Ranger 2022': 'uploads/s02-card04-ford-ranger-blue.png',
  'Honda CR-V 2022': 'uploads/s02-card01-honda-crv-blue.png',
  'Hyundai Tucson 2021': 'uploads/s02-card07-hyundai-tucson-gray.png',
  'Kia Seltos 2023': 'uploads/s02-card06-kia-seltos-silver.png',
  'Toyota Camry 2022': 'uploads/s02-card02-toyota-camry-white.png',
  'VinFast Lux A 2021': 'uploads/s02-card05-vinfast-suv-white.png',
  'Mazda 3 2022': 'uploads/s02-card10-mazda3-red.png',
  'Honda City 2022': 'uploads/s02-card12-honda-city-white.png',
  'Kia Carnival 2023': 'uploads/s02-card09-toyota-innova-silver.png',
  'Toyota Innova 2021': 'uploads/s02-card09-toyota-innova-silver.png',
  'Mercedes C200 2020': 'uploads/s02-card08-mercedes-c-black.png',
};

const KanbanCard = ({ name, day, tone, variant, badge, sub }) => (
  <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8, padding: 8, cursor: 'pointer' }}>
    <div style={{ borderRadius: 5, overflow: 'hidden', marginBottom: 8, aspectRatio: '16/9' }}>
      <img src={BRAND_TO_IMG[name] || 'uploads/s02-card01-honda-crv-blue.png'} alt={name} className="vehicle-image" loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
    </div>
    <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text)', marginBottom: 2 }}>{name}</div>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 10, color: 'var(--text-2)' }}>
      <span className="mono">{day}</span>
      {badge && <span style={{ color: badge.c, fontWeight: 600 }}>{badge.t}</span>}
    </div>
    {sub && <div style={{ fontSize: 10, color: 'var(--text-3)', marginTop: 4 }}>{sub}</div>}
  </div>
);

const Screen10_IRC = () => (
  <div className="cario" style={{ width: 1440, minHeight: 1100, background: 'var(--bg)', display: 'grid', gridTemplateColumns: '240px 1fr' }}>
    {/* Sidebar */}
    <aside style={{ background: '#0A0E12', borderRight: '1px solid var(--border)', padding: '24px 16px', height: '100%' }}>
      <div style={{ marginBottom: 32, padding: '0 8px' }}>
        <CarioLogo size={20} />
        <div style={{ fontSize: 10, color: 'var(--text-3)', textTransform: 'uppercase', marginTop: 6, letterSpacing: '0.1em' }}>Operations Console</div>
      </div>
      {[
        { i: 'home', t: 'Dashboard', a: true },
        { i: 'car', t: 'Inventory' },
        { i: 'wrench', t: 'Reconditioning' },
        { i: 'eye', t: 'Photography' },
        { i: 'check', t: 'QC' },
        { i: 'truck', t: 'Logistics' },
        { i: 'user', t: 'Team (84)' },
        { i: 'trending', t: 'Analytics' },
        { i: 'settings', t: 'Cài đặt' },
      ].map(n => (
        <div key={n.t} style={{
          display: 'flex', alignItems: 'center', gap: 12, padding: '10px 12px', borderRadius: 8,
          background: n.a ? 'var(--surface-2)' : 'transparent',
          color: n.a ? 'var(--accent)' : 'var(--text-2)',
          fontSize: 13, fontWeight: 500, cursor: 'pointer', marginBottom: 2,
        }}>
          <Ico name={n.i} size={16} /> {n.t}
        </div>
      ))}
    </aside>

    {/* Main */}
    <main style={{ padding: '24px 32px', overflow: 'hidden' }}>
      {/* Top bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 24, margin: 0 }}>Operations Dashboard</h1>
          <div style={{ fontSize: 12, color: 'var(--text-2)', marginTop: 4 }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
              <span style={{ width: 6, height: 6, background: 'var(--success)', borderRadius: '50%' }} /> Live • Cập nhật real-time
            </span>
            <span style={{ marginLeft: 16 }}>Trung tâm Reconditioning Bình Tân, HCM</span>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <div style={{ fontSize: 12, color: 'var(--text-2)' }}>06/05/2026 14:32</div>
          <button className="btn btn-outline" style={{ padding: '8px 14px', fontSize: 12 }}><Ico name="download" size={14} /> Export</button>
          <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 12, fontWeight: 700 }}>LĐ</div>
        </div>
      </div>

      {/* KPI cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 24 }}>
        {[
          { l: 'Xe đang processing', v: '87', c: '↑ 12% WoW', good: true },
          { l: 'Avg cycle time', v: '8.2 ngày', c: '↓ 2.1 ngày', good: true },
          { l: 'Throughput tuần này', v: '42 xe', c: '↑ 18%', good: true },
          { l: 'Cost per refurb', v: '11.8M ₫', c: '↓ 5%', good: true },
        ].map(k => (
          <div key={k.l} className="card" style={{ padding: 16 }}>
            <div style={{ fontSize: 11, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{k.l}</div>
            <div className="mono" style={{ fontSize: 26, fontWeight: 700, marginTop: 6 }}>{k.v}</div>
            <div style={{ fontSize: 11, color: k.good ? 'var(--success)' : 'var(--danger)', marginTop: 4 }}>{k.c} so với tuần trước</div>
          </div>
        ))}
      </div>

      {/* Kanban + sidebar */}
      <div style={{ display: 'grid', gridTemplateColumns: '2.2fr 1fr', gap: 16 }}>
        <div className="card" style={{ padding: 18 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
            <div style={{ fontSize: 14, fontWeight: 600 }}>Reconditioning Pipeline</div>
            <div style={{ display: 'flex', gap: 6, fontSize: 11 }}>
              <span style={{ padding: '4px 10px', background: 'var(--surface-2)', borderRadius: 999, color: 'var(--text-2)' }}>Tất cả 87</span>
              <span style={{ padding: '4px 10px', borderRadius: 999, color: 'var(--text-3)' }}>Ưu tiên</span>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 10 }}>
            {[
              { name: 'Mới nhập', count: 4, c: 'var(--text-2)', cars: [
                { n: 'Toyota Vios 2021', d: 'Day 0', v: 'sedan', t: 'pearl' },
                { n: 'Mazda CX-5 2023', d: 'Day 0', v: 'suv', t: 'burgundy' },
                { n: 'Ford Ranger 2022', d: 'Day 0', v: 'pickup', t: 'midnight' },
              ]},
              { name: 'Inspection', count: 12, c: 'var(--accent-2)', cars: [
                { n: 'Honda CR-V 2022', d: 'Day 1', v: 'suv', t: 'pearl' },
                { n: 'Hyundai Tucson 2021', d: 'Day 2', v: 'suv', t: 'silver' },
                { n: 'Kia Seltos 2023', d: 'Day 1', v: 'suv', t: 'forest' },
              ]},
              { name: 'Repair / Paint', count: 28, c: 'var(--accent)', cars: [
                { n: 'Toyota Camry 2022', d: 'Day 4', v: 'sedan', t: 'midnight', sub: 'Parts: 4.2M ₫' },
                { n: 'VinFast Lux A 2021', d: 'Day 3', v: 'sedan', t: 'pearl', sub: 'Parts: 6.8M ₫' },
                { n: 'Mazda 3 2022', d: 'Day 5', v: 'sedan', t: 'burgundy', sub: 'Parts: 2.1M ₫' },
              ]},
              { name: 'Photography', count: 8, c: '#8B5CF6', cars: [
                { n: 'Honda City 2022', d: 'Day 6', v: 'sedan', t: 'pearl' },
                { n: 'Kia Carnival 2023', d: 'Day 6', v: 'suv', t: 'silver' },
              ]},
              { name: 'QC + List', count: 6, c: 'var(--success)', cars: [
                { n: 'Toyota Innova 2021', d: 'Day 8', v: 'suv', t: 'silver', badge: { t: 'READY', c: 'var(--success)' }},
                { n: 'Mercedes C200 2020', d: 'Day 7', v: 'sedan', t: 'pearl', badge: { t: 'READY', c: 'var(--success)' }},
              ]},
            ].map(col => (
              <div key={col.name}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10, padding: '6px 8px' }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: col.c }} />
                  <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--text)' }}>{col.name}</span>
                  <span style={{ marginLeft: 'auto', fontSize: 11, color: 'var(--text-3)' }}>{col.count}</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {col.cars.map(c => <KanbanCard key={c.n} name={c.n} day={c.d} variant={c.v} tone={c.t} badge={c.badge} sub={c.sub} />)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Side panel */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div className="card" style={{ padding: 16 }}>
            <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 4 }}>Cycle time (30 ngày)</div>
            <div style={{ fontSize: 11, color: 'var(--success)' }}>↓ 2.1 ngày — đang giảm đều</div>
            <svg width="100%" height="80" viewBox="0 0 280 80" style={{ marginTop: 10 }}>
              <defs>
                <linearGradient id="ct-g" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="rgba(16,185,129,0.4)" />
                  <stop offset="100%" stopColor="rgba(16,185,129,0)" />
                </linearGradient>
              </defs>
              <path d="M 0 30 L 30 28 L 60 35 L 90 26 L 120 32 L 150 24 L 180 28 L 210 22 L 240 18 L 270 16 L 270 80 L 0 80 Z" fill="url(#ct-g)" />
              <path d="M 0 30 L 30 28 L 60 35 L 90 26 L 120 32 L 150 24 L 180 28 L 210 22 L 240 18 L 270 16" stroke="var(--success)" strokeWidth="2" fill="none" />
              {[16, 22, 28, 35].map((y, i) => <circle key={i} cx={[270, 210, 180, 60][i]} cy={y} r="3" fill="var(--success)" />)}
            </svg>
          </div>

          <div className="card" style={{ padding: 16 }}>
            <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 12 }}>Top issues tuần này</div>
            {[
              ['Dầu phanh', 12, 75],
              ['Lốp mòn > 60%', 8, 50],
              ['Trầy sơn nhẹ', 7, 44],
              ['Bình ắc quy yếu', 5, 31],
              ['Bộ lọc gió', 4, 25],
            ].map(([n, v, w]) => (
              <div key={n} style={{ display: 'grid', gridTemplateColumns: '110px 1fr 30px', gap: 8, alignItems: 'center', marginBottom: 8 }}>
                <span style={{ fontSize: 11, color: 'var(--text-2)' }}>{n}</span>
                <div style={{ height: 5, background: 'var(--surface-2)', borderRadius: 2 }}>
                  <div style={{ width: `${w}%`, height: '100%', background: 'var(--accent)', borderRadius: 2 }} />
                </div>
                <span className="mono" style={{ fontSize: 11, color: 'var(--text)', textAlign: 'right' }}>{v}</span>
              </div>
            ))}
          </div>

          <div className="card" style={{ padding: 16, background: 'rgba(232,93,44,0.06)', border: '1px solid rgba(232,93,44,0.25)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <Ico name="sparkles" size={14} /> <span style={{ fontSize: 13, fontWeight: 600 }}>AI dự đoán parts cần đặt</span>
            </div>
            <div style={{ fontSize: 11, color: 'var(--text-2)', marginBottom: 10 }}>Cho 7 ngày tới • Confidence 91%</div>
            {[
              ['Lốp Michelin Primacy 4 215/55R17', '32 chiếc'],
              ['Dầu phanh DOT4 1L', '18 chai'],
              ['Bóng LED Osram H11', '14 cặp'],
              ['Lọc gió cabin (Honda)', '12 cái'],
            ].map(([n, q]) => (
              <div key={n} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, padding: '5px 0', borderBottom: '1px solid var(--border)' }}>
                <span style={{ color: 'var(--text-2)' }}>{n}</span>
                <span className="mono" style={{ color: 'var(--accent)', fontWeight: 600 }}>{q}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Activity feed */}
      <div className="card" style={{ padding: 16, marginTop: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <div style={{ fontSize: 13, fontWeight: 600 }}>Hoạt động real-time</div>
          <span style={{ fontSize: 11, color: 'var(--text-2)', display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ width: 6, height: 6, background: 'var(--success)', borderRadius: '50%', animation: 'pulse 1.5s infinite' }} /> Live
          </span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 0, fontSize: 12 }}>
          {[
            { i: 'check', t: 'NV. Lê Hùng hoàn tất QC xe Toyota Vios #VIN-12345', ago: '2 phút', c: 'var(--success)' },
            { i: 'wrench', t: 'Đã thay 4 lốp Michelin cho Honda CR-V #VIN-67890', ago: '8 phút', c: 'var(--accent)' },
            { i: 'eye', t: 'Studio chụp 360° hoàn tất Mazda 3 #VIN-11122', ago: '14 phút', c: '#8B5CF6' },
            { i: 'info', t: 'Phát hiện vấn đề điện ở Ford Ranger #VIN-33445', ago: '23 phút', c: 'var(--warning)' },
            { i: 'truck', t: 'Honda City #VIN-55667 đã giao cho khách Q.7', ago: '31 phút', c: 'var(--success)' },
            { i: 'plus', t: 'Xe mới nhập kho: Mercedes C200 2020 từ KH bán', ago: '46 phút', c: 'var(--text-2)' },
          ].map((a, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px', borderBottom: i < 4 ? '1px solid var(--border)' : 'none' }}>
              <div style={{ width: 28, height: 28, borderRadius: 8, background: 'var(--surface-2)', color: a.c, display: 'flex', alignItems: 'center', justifyContent: 'center', flex: '0 0 auto' }}>
                <Ico name={a.i} size={13} />
              </div>
              <div style={{ flex: 1, color: 'var(--text-2)' }}>{a.t}</div>
              <div style={{ fontSize: 11, color: 'var(--text-3)' }}>{a.ago}</div>
            </div>
          ))}
        </div>
      </div>
    </main>
  </div>
);

// ─────────────────────────────────────────────────────────
// Screen 11 — AI Pricing Analyst

const Screen11_AIPricing = () => (
  <div className="cario" style={{ width: 1440, minHeight: 1200, background: 'var(--bg)' }}>
    <CarioNav active="about" />

    <div style={{ padding: '32px 80px 60px', maxWidth: 1280, margin: '0 auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
        <div>
          <div className="badge badge-deal" style={{ marginBottom: 12 }}>
            <Ico name="sparkles" size={12} /> Pricing AI v2.4 • Production
          </div>
          <h1 style={{ fontSize: 32, margin: 0 }}>Live Market Intelligence</h1>
          <p style={{ fontSize: 14, color: 'var(--text-2)', marginTop: 6, marginBottom: 0 }}>
            Phân tích giá: <strong style={{ color: 'var(--text)' }}>Honda CR-V 1.5L Turbo 2022</strong> • VIN 5J6RW1H53NL024781
          </p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn btn-outline" style={{ padding: '10px 14px', fontSize: 13 }}>
            <Ico name="download" size={14} /> Export model
          </button>
          <button className="btn btn-primary" style={{ padding: '10px 16px', fontSize: 13 }}>
            <Ico name="check" size={14} /> Áp dụng giá 920M ₫
          </button>
        </div>
      </div>

      {/* Hero chart */}
      <div className="card" style={{ padding: 28, marginBottom: 20 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 20 }}>
          <div>
            <div style={{ fontSize: 12, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Fair price recommendation</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, marginTop: 4 }}>
              <span className="mono display" style={{ fontSize: 44, fontWeight: 800, color: 'var(--accent)' }}>920,000,000 ₫</span>
              <span style={{ fontSize: 13, color: 'var(--success)' }}>↓ 4.6% vs market avg</span>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 6 }}>
            {['7D', '30D', '90D', '1Y'].map((t, i) => (
              <span key={t} style={{ fontSize: 12, padding: '6px 12px', borderRadius: 6, background: i === 2 ? 'var(--surface-2)' : 'transparent', color: i === 2 ? 'var(--text)' : 'var(--text-3)', cursor: 'pointer' }}>{t}</span>
            ))}
          </div>
        </div>

        {/* Chart */}
        <svg width="100%" height="280" viewBox="0 0 1100 280" style={{ display: 'block' }}>
          <defs>
            <linearGradient id="bandg" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="rgba(232,93,44,0.18)" />
              <stop offset="100%" stopColor="rgba(232,93,44,0)" />
            </linearGradient>
          </defs>
          {/* Y axis grid */}
          {[0, 0.25, 0.5, 0.75, 1].map((p, i) => (
            <g key={i}>
              <line x1="60" y1={20 + p * 220} x2="1080" y2={20 + p * 220} stroke="var(--border)" strokeDasharray="2 4" opacity="0.5" />
              <text x="50" y={24 + p * 220} fontSize="10" fill="var(--text-3)" textAnchor="end" fontFamily="var(--font-mono)">
                {[1000, 950, 900, 850, 800][i]}M
              </text>
            </g>
          ))}
          {/* X axis labels */}
          {['T2', 'T3', 'T4', 'T5'].map((m, i) => (
            <text key={m} x={60 + (i + 0.5) * 255} y="270" fontSize="11" fill="var(--text-3)" textAnchor="middle">{m}/2026</text>
          ))}

          {/* Confidence band */}
          <path d="M 60 90 Q 200 78 350 88 T 700 96 T 1080 100 L 1080 130 Q 700 122 350 118 T 60 120 Z" fill="url(#bandg)" />

          {/* Bonbanh listings (gray dots) */}
          {[[150,80],[230,72],[310,86],[400,68],[500,92],[580,82],[680,90],[760,88],[860,76],[940,84],[1020,98],[200,110],[440,112],[620,108],[820,114]].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r="3" fill="var(--text-3)" opacity="0.5" />
          ))}

          {/* Cario AI line */}
          <path d="M 60 105 Q 200 95 350 102 T 700 108 T 1080 112" stroke="var(--accent)" strokeWidth="3" fill="none" strokeLinecap="round" />

          {/* Sold checkmarks */}
          {[[120, 100], [320, 105], [560, 110], [780, 108], [980, 114]].map(([x, y], i) => (
            <g key={i}>
              <circle cx={x} cy={y} r="6" fill="var(--success)" />
              <path d={`M ${x-2} ${y} L ${x-0.5} ${y+1.5} L ${x+2.5} ${y-2}`} stroke="#fff" strokeWidth="1.4" fill="none" strokeLinecap="round" />
            </g>
          ))}

          {/* Current price marker */}
          <line x1="1020" y1="20" x2="1020" y2="240" stroke="var(--accent)" strokeWidth="1" strokeDasharray="3 3" />
          <g transform="translate(1020, 110)">
            <rect x="-50" y="-26" width="100" height="22" rx="6" fill="var(--accent)" />
            <text x="0" y="-10" fontSize="11" fill="#fff" textAnchor="middle" fontWeight="700" fontFamily="var(--font-mono)">920M ₫</text>
          </g>
        </svg>

        {/* Legend */}
        <div style={{ display: 'flex', gap: 24, marginTop: 12, fontSize: 11, color: 'var(--text-2)' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><span style={{ width: 16, height: 2, background: 'var(--accent)' }} /> Cario AI fair price</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><span style={{ width: 14, height: 14, borderRadius: '50%', background: 'rgba(232,93,44,0.18)' }} /> Confidence band ±3%</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--text-3)' }} /> Bonbanh + Chợ Tốt listings</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--success)' }} /> Recently sold (verified)</span>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 18, marginBottom: 20 }}>
        {/* Decision factors */}
        <div className="card" style={{ padding: 24 }}>
          <h3 style={{ fontSize: 16, margin: '0 0 6px' }}>Cách AI tính giá 920M ₫</h3>
          <p style={{ fontSize: 12, color: 'var(--text-2)', margin: '0 0 18px' }}>Fully transparent — mỗi feature có weight và contribution rõ ràng.</p>

          {[
            { l: 'Base price (12,847 comparables, 90 ngày)', v: '950M', impact: 0, val: 'baseline' },
            { l: 'Mileage adjustment (28k vs 35k avg)', v: '+8M', impact: 0.1, val: 'positive' },
            { l: 'Trim G premium (vs base)', v: '+12M', impact: 0.15, val: 'positive' },
            { l: 'Color: Trắng ngọc trai (high demand)', v: '+3M', impact: 0.04, val: 'positive' },
            { l: 'Geographic premium (HCM)', v: '+7M', impact: 0.09, val: 'positive' },
            { l: 'Market trend (-2% / 30 ngày)', v: '−19M', impact: -0.24, val: 'negative' },
            { l: 'Seasonality factor (May / pre-Tet)', v: '−7M', impact: -0.09, val: 'negative' },
            { l: 'Stock pressure (3 cars in queue)', v: '−14M', impact: -0.18, val: 'negative' },
            { l: 'Dealer margin target (Cario)', v: '−20M', impact: -0.25, val: 'negative' },
          ].map((r, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 80px 60px', gap: 12, alignItems: 'center', padding: '10px 0', borderBottom: '1px solid var(--border)', fontSize: 12 }}>
              <span style={{ color: 'var(--text-2)' }}>{r.l}</span>
              <div style={{ position: 'relative', height: 4, background: 'var(--surface-2)', borderRadius: 2 }}>
                <div style={{ position: 'absolute', left: '50%', height: '100%',
                  background: r.val === 'positive' ? 'var(--success)' : r.val === 'negative' ? 'var(--danger)' : 'var(--text-3)',
                  width: `${Math.abs(r.impact) * 50}%`,
                  transform: r.val === 'negative' ? 'translateX(-100%)' : 'none',
                }} />
              </div>
              <span className="mono" style={{ textAlign: 'right', color: r.val === 'positive' ? 'var(--success)' : r.val === 'negative' ? 'var(--danger)' : 'var(--text)', fontWeight: 600 }}>{r.v}</span>
            </div>
          ))}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', paddingTop: 14, marginTop: 4 }}>
            <span style={{ fontSize: 13, fontWeight: 600 }}>Final fair price</span>
            <span className="mono" style={{ fontSize: 22, fontWeight: 700, color: 'var(--accent)' }}>920,000,000 ₫</span>
          </div>
        </div>

        {/* Right column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div className="card" style={{ padding: 20 }}>
            <div style={{ fontSize: 12, color: 'var(--text-3)', textTransform: 'uppercase' }}>Demand signal</div>
            <div className="mono" style={{ fontSize: 28, fontWeight: 700, marginTop: 4, color: 'var(--success)' }}>↑ 24%</div>
            <div style={{ fontSize: 12, color: 'var(--text-2)' }}>Search volume tuần này</div>
            <svg width="100%" height="50" viewBox="0 0 240 50" style={{ marginTop: 10 }}>
              <path d="M 0 35 L 30 32 L 60 38 L 90 28 L 120 22 L 150 18 L 180 14 L 210 8 L 240 4" stroke="var(--success)" strokeWidth="2" fill="none" />
            </svg>
          </div>

          <div className="card" style={{ padding: 20 }}>
            <div style={{ fontSize: 12, color: 'var(--text-3)', textTransform: 'uppercase' }}>Time-to-sale prediction</div>
            <div className="mono" style={{ fontSize: 28, fontWeight: 700, marginTop: 4 }}>7 - 14</div>
            <div style={{ fontSize: 12, color: 'var(--text-2)' }}>ngày dự kiến để bán</div>
            <div style={{ marginTop: 10, height: 6, background: 'var(--surface-2)', borderRadius: 3, position: 'relative' }}>
              <div style={{ position: 'absolute', left: '20%', right: '40%', height: 6, background: 'var(--accent)', borderRadius: 3 }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: 'var(--text-3)', marginTop: 4 }}>
              <span>0</span><span>7</span><span>14</span><span>30+ ngày</span>
            </div>
          </div>

          <div className="card" style={{ padding: 20 }}>
            <div style={{ fontSize: 12, color: 'var(--text-3)', textTransform: 'uppercase', marginBottom: 8 }}>Price elasticity</div>
            {[['Giảm 5%', '↑ 38% demand', '+5 days'], ['Giảm 10%', '↑ 72% demand', '+9 days'], ['Tăng 5%', '↓ 22% demand', '−4 days']].map(r => (
              <div key={r[0]} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, padding: '6px 0', borderTop: '1px solid var(--border)' }}>
                <span style={{ color: 'var(--text-2)' }}>{r[0]}</span>
                <span style={{ color: 'var(--text)' }}>{r[1]}</span>
                <span className="mono" style={{ color: 'var(--accent)' }}>{r[2]}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Comparable cars table */}
      <div className="card" style={{ padding: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <h3 style={{ fontSize: 16, margin: 0 }}>Comparable transactions (gần đây)</h3>
          <span style={{ fontSize: 12, color: 'var(--text-2)' }}>12,847 records • Honda CR-V 2022 • 90 ngày qua</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr 100px 90px 130px 120px 100px', gap: 12, padding: '10px 0', fontSize: 11, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid var(--border)' }}>
          <div>VIN (last 4)</div><div>Trim</div><div>Mileage</div><div>Color</div><div>Listed price</div><div>Sold price</div><div>Status</div>
        </div>
        {[
          ['...4781', 'G Premium', '28,500 km', 'Pearl', '935,000,000 ₫', '—', 'Cario listing', 'var(--accent)'],
          ['...8203', 'G', '31,200 km', 'Pearl', '935,000,000 ₫', '925,000,000 ₫', 'Sold (3 ngày)', 'var(--success)'],
          ['...1145', 'L', '28,400 km', 'Black', '945,000,000 ₫', '—', 'Listed (Bonbanh)', 'var(--text-2)'],
          ['...9834', 'G', '25,100 km', 'Silver', '955,000,000 ₫', '—', 'Listed (Chợ Tốt)', 'var(--text-2)'],
          ['...6720', 'G Premium', '35,800 km', 'Pearl', '905,000,000 ₫', '895,000,000 ₫', 'Sold (1 tuần)', 'var(--success)'],
          ['...3308', 'L', '42,000 km', 'Black', '880,000,000 ₫', '870,000,000 ₫', 'Sold (2 tuần)', 'var(--success)'],
        ].map((r, i) => (
          <div key={i} style={{ display: 'grid', gridTemplateColumns: '120px 1fr 100px 90px 130px 120px 100px', gap: 12, padding: '12px 0', fontSize: 12, borderBottom: i < 5 ? '1px solid var(--border)' : 'none', alignItems: 'center' }}>
            <span className="mono" style={{ color: 'var(--text-2)' }}>{r[0]}</span>
            <span>{r[1]}</span>
            <span className="mono">{r[2]}</span>
            <span style={{ color: 'var(--text-2)' }}>{r[3]}</span>
            <span className="mono">{r[4]}</span>
            <span className="mono" style={{ color: r[5] === '—' ? 'var(--text-3)' : 'var(--text)' }}>{r[5]}</span>
            <span style={{ color: r[7], fontSize: 11, fontWeight: 600 }}>● {r[6]}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// ─────────────────────────────────────────────────────────
// Screen 12 — Cario Tower (Vending Concept)

const Screen12_Tower = () => (
  <div className="cario" style={{ width: 1440, minHeight: 1500, background: 'var(--bg)', overflow: 'hidden' }}>
    <CarioNav active="about" />

    {/* Hero */}
    <section style={{ padding: '60px 80px 80px', position: 'relative', minHeight: 720 }}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 75% 50%, rgba(232,93,44,0.15), transparent 60%), radial-gradient(ellipse at 30% 30%, rgba(255,184,0,0.08), transparent 50%)' }} />

      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 40, alignItems: 'center', position: 'relative', maxWidth: 1280, margin: '0 auto' }}>
        <div>
          <div className="badge badge-premium" style={{ marginBottom: 22 }}>
            <Ico name="award" size={12} /> Roadmap Q2/2027 • Concept showcase
          </div>
          <h1 className="display" style={{ fontSize: 76, lineHeight: 1, margin: 0 }}>
            Cario<br/>
            <span style={{ background: 'linear-gradient(120deg, #FFB800, #E85D2C)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Tower.</span>
          </h1>
          <p style={{ fontSize: 22, color: 'var(--text-2)', marginTop: 24, lineHeight: 1.4, maxWidth: 480 }}>
            Lấy xe của bạn như lấy lon nước.
          </p>
          <p style={{ fontSize: 14, color: 'var(--text-2)', marginTop: 14, lineHeight: 1.6, maxWidth: 460 }}>
            Vending machine ô tô đầu tiên tại Việt Nam — 5 tầng kính, 30 chiếc xe trưng bày, hệ thống pickup tự động. Đặt xe online, đến tower, dùng coin kỷ niệm — 90 giây sau xe của bạn xuống đến slot.
          </p>

          <div style={{ display: 'flex', gap: 12, marginTop: 32 }}>
            <button className="btn btn-primary" style={{ padding: '14px 22px' }}>
              <Ico name="calendar" size={15} /> Đặt lịch tham quan concept
            </button>
            <button className="btn btn-outline" style={{ padding: '14px 22px' }}>
              <Ico name="play" size={15} /> Xem video 60s
            </button>
          </div>
        </div>

        {/* Tower illustration */}
        <div style={{ position: 'relative', height: 600 }}>
          <svg viewBox="0 0 400 600" style={{ width: '100%', height: '100%' }}>
            <defs>
              <linearGradient id="towerg" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="rgba(255,184,0,0.15)" />
                <stop offset="100%" stopColor="rgba(232,93,44,0.05)" />
              </linearGradient>
              <linearGradient id="glassg" x1="0" x2="1" y1="0" y2="0">
                <stop offset="0%" stopColor="rgba(120,160,200,0.4)" />
                <stop offset="50%" stopColor="rgba(180,200,220,0.6)" />
                <stop offset="100%" stopColor="rgba(120,160,200,0.4)" />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="6" result="b"/>
                <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
              </filter>
            </defs>

            {/* Ambient glow */}
            <ellipse cx="200" cy="540" rx="180" ry="20" fill="rgba(232,93,44,0.3)" filter="url(#glow)" />

            {/* Tower base */}
            <rect x="60" y="500" width="280" height="40" fill="#1A1F26" stroke="rgba(255,184,0,0.4)" strokeWidth="1" rx="2" />
            <rect x="80" y="510" width="240" height="20" fill="rgba(255,184,0,0.15)" rx="2" />
            <text x="200" y="525" fill="#FFB800" fontSize="11" textAnchor="middle" fontFamily="var(--font-mono)" letterSpacing="2">CARIO TOWER • HCM</text>

            {/* 5 stories with cars */}
            {[0, 1, 2, 3, 4].map(i => {
              const y = 80 + i * 84;
              const tones = ['pearl', 'midnight', 'burgundy', 'silver', 'forest'];
              const variants = ['suv', 'sedan', 'suv', 'pickup', 'sedan'];
              return (
                <g key={i}>
                  {/* Floor base */}
                  <rect x="60" y={y + 70} width="280" height="6" fill="#2D343F" />
                  {/* Glass walls */}
                  <rect x="60" y={y} width="280" height="76" fill="url(#glassg)" opacity="0.18" stroke="rgba(255,184,0,0.3)" strokeWidth="0.5" />
                  {/* Vertical mullions */}
                  {[120, 200, 280].map(x => <line key={x} x1={x} y1={y} x2={x} y2={y + 76} stroke="rgba(255,184,0,0.25)" strokeWidth="0.5" />)}
                  {/* Cars in 3 slots */}
                  {[80, 160, 240].map((cx, k) => (
                    <g key={k} transform={`translate(${cx}, ${y + 18}) scale(0.22)`}>
                      <rect x="0" y="0" width="0" height="0" />
                      <foreignObject x="0" y="0" width="320" height="140">
                        <div xmlns="http://www.w3.org/1999/xhtml" style={{ width: 320, height: 140 }}>
                          <CarSilhouette variant={variants[(i + k) % variants.length]} tone={tones[(i + k) % tones.length]} />
                        </div>
                      </foreignObject>
                    </g>
                  ))}
                  {/* Floor number */}
                  <text x="50" y={y + 42} fill="rgba(255,184,0,0.6)" fontSize="14" textAnchor="end" fontFamily="var(--font-mono)" fontWeight="700">F{5 - i}</text>
                </g>
              );
            })}

            {/* Crown */}
            <polygon points="60,80 200,40 340,80" fill="#1A1F26" stroke="rgba(255,184,0,0.4)" />
            <circle cx="200" cy="50" r="4" fill="#FFB800" filter="url(#glow)" />
            <text x="200" y="68" fill="#FFB800" fontSize="9" textAnchor="middle" fontFamily="var(--font-mono)" letterSpacing="1.5">OPEN 24/7</text>

            {/* Pickup slot beam */}
            <rect x="180" y="540" width="40" height="2" fill="#E85D2C" filter="url(#glow)" />
          </svg>

          {/* Annotation pins */}
          {[
            { top: '8%', right: '-5%', t: '5 tầng kính', v: 'Tầm nhìn 360° toàn xe' },
            { top: '32%', right: '-8%', t: '30 xe trưng bày', v: 'Showcase liên tục cập nhật' },
            { top: '60%', left: '-8%', t: 'Pickup 90 giây', v: 'Cánh tay robot tự động' },
            { top: '85%', right: '-5%', t: 'Open 24/7', v: 'Coin kỷ niệm để mở slot' },
          ].map((p, i) => (
            <div key={i} style={{ position: 'absolute', ...p, padding: '10px 14px', background: 'rgba(15,20,25,0.9)', border: '1px solid rgba(255,184,0,0.3)', borderRadius: 10, backdropFilter: 'blur(8px)', minWidth: 170 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--accent-2)' }}>{p.t}</div>
              <div style={{ fontSize: 11, color: 'var(--text-2)', marginTop: 2 }}>{p.v}</div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* How it works */}
    <section style={{ padding: '60px 80px', maxWidth: 1280, margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: 40 }}>
        <h2 style={{ fontSize: 36, margin: 0 }}>Cách hoạt động</h2>
        <p style={{ fontSize: 15, color: 'var(--text-2)', marginTop: 8 }}>3 bước đơn giản — không xếp hàng, không chờ đợi</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 18 }}>
        {[
          { n: '01', i: 'cart', t: 'Đặt xe online', d: 'Hoàn tất tài chính + chọn ngày pickup qua app Cario. Mọi giấy tờ ký số, không bản giấy.' },
          { n: '02', i: 'pin', t: 'Đến Cario Tower', d: 'Ghé tầng trệt vào ngày hẹn. Nhân viên trao bạn 1 đồng coin Cario kỷ niệm — món quà bạn giữ lại.' },
          { n: '03', i: 'car', t: 'Xe xuống tận nơi', d: 'Bỏ coin vào khe — hệ thống robot tự động đưa xe của bạn từ tầng cao xuống slot pickup. 90 giây.' },
        ].map(s => (
          <div key={s.n} className="card" style={{ padding: 28, position: 'relative' }}>
            <div className="mono display" style={{ fontSize: 64, fontWeight: 800, color: 'rgba(232,93,44,0.15)', position: 'absolute', top: 8, right: 18, lineHeight: 1 }}>{s.n}</div>
            <div style={{ width: 48, height: 48, borderRadius: 12, background: 'rgba(232,93,44,0.12)', color: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 18 }}>
              <Ico name={s.i} size={22} />
            </div>
            <div style={{ fontSize: 18, fontWeight: 600 }}>{s.t}</div>
            <div style={{ fontSize: 13, color: 'var(--text-2)', lineHeight: 1.6, marginTop: 8 }}>{s.d}</div>
          </div>
        ))}
      </div>
    </section>

    {/* Marketing impact */}
    <section style={{ padding: '40px 80px 80px', maxWidth: 1280, margin: '0 auto' }}>
      <div className="card" style={{ padding: 48, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 80% 50%, rgba(255,184,0,0.08), transparent 60%)' }} />
        <div style={{ position: 'relative' }}>
          <div style={{ fontSize: 12, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8 }}>Marketing impact projection</div>
          <h2 style={{ fontSize: 28, margin: 0 }}>Brand awareness machine</h2>
          <p style={{ fontSize: 14, color: 'var(--text-2)', marginTop: 8, maxWidth: 640 }}>
            Tower không chỉ là showroom — đó là viral content engine 24/7. Tham khảo tham số từ thị trường tương đương ở Mỹ và Nhật.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginTop: 28 }}>
            {[
              { n: '1.2M+', l: 'Video TikTok dự kiến / năm', s: 'UGC tự nhiên' },
              { n: '~0 ₫', l: 'Chi phí marketing trực tiếp', s: 'CAC giảm 60%' },
              { n: '+47%', l: 'Brand awareness lift', s: 'Aided + unaided' },
              { n: '180k', l: 'Foot traffic / năm dự kiến', s: '500 lượt/ngày' },
            ].map(s => (
              <div key={s.l} style={{ padding: 20, background: 'var(--surface-2)', borderRadius: 12 }}>
                <div className="mono display" style={{ fontSize: 32, fontWeight: 800, color: 'var(--accent-2)', lineHeight: 1 }}>{s.n}</div>
                <div style={{ fontSize: 13, color: 'var(--text)', marginTop: 8, fontWeight: 500 }}>{s.l}</div>
                <div style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 4 }}>{s.s}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  </div>
);

Object.assign(window, { Screen09_Tracking, Screen10_IRC, Screen11_AIPricing, Screen12_Tower });
