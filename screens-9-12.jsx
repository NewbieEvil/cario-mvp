// Screen 09 — Order Tracking
// Screen 10 — IRC Operations Dashboard
// Screen 11 — AI Pricing Analyst
// Screen 12 — Otobank Tower (Vending Concept)

const Screen09_Tracking = () => (
  <div className="otobank" style={{ width: 1440, minHeight: 1300, background: 'var(--bg)' }}>
    <OtobankNav active="home" />

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
  <div className="otobank" style={{ width: 1440, minHeight: 1100, background: 'var(--bg)', display: 'grid', gridTemplateColumns: '240px 1fr' }}>
    {/* Sidebar */}
    <aside style={{ background: '#0A0E12', borderRight: '1px solid var(--border)', padding: '24px 16px', height: '100%' }}>
      <div style={{ marginBottom: 32, padding: '0 8px' }}>
        <OtobankLogo size={20} />
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
  <div className="otobank" style={{ width: 1440, minHeight: 2400, background: 'var(--bg)' }}>
    <OtobankNav active="about" />

    <div style={{ padding: '48px 96px 80px', maxWidth: 1320, margin: '0 auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 40 }}>
        <div>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'rgba(16,185,129,0.12)', border: '1px solid rgba(16,185,129,0.3)',
            padding: '8px 14px', borderRadius: 999, marginBottom: 20,
          }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--success)', animation: 'pulse 1.5s infinite' }} />
            <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 12, fontWeight: 700, color: 'var(--success)', letterSpacing: '0.08em' }}>
              PRICING AI v2.4 · LIVE PRODUCTION
            </span>
          </div>
          <h1 style={{ fontFamily: '"Space Grotesk", sans-serif', fontSize: 48, fontWeight: 800, margin: 0, letterSpacing: '-0.02em', lineHeight: 1.05 }}>
            Live Market Intelligence
          </h1>
          <p style={{ fontSize: 18, color: 'var(--text-2)', marginTop: 12, marginBottom: 0, lineHeight: 1.5, maxWidth: 760 }}>
            Phân tích giá real-time từ <strong style={{ color: 'var(--text)' }}>47,000+ giao dịch</strong> + <strong style={{ color: 'var(--text)' }}>4 nguồn dữ liệu</strong> · Áp dụng cho Honda CR-V 1.5L Turbo 2022 · VIN 5J6RW1H53NL024781
          </p>
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          <button className="btn btn-outline" style={{ padding: '14px 20px', fontSize: 15, fontWeight: 600 }}>
            <Ico name="download" size={16} /> Export model
          </button>
          <button className="btn btn-primary" style={{ padding: '14px 24px', fontSize: 15, fontWeight: 700 }}>
            <Ico name="check" size={16} /> Áp dụng giá 920M ₫
          </button>
        </div>
      </div>

      {/* Hero KPIs strip — investor wow */}
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20, marginBottom: 32,
      }}>
        {[
          { eyebrow: 'Pricing accuracy (90d)', value: '95.7%', delta: '↑ 2.1pp vs H1', valueColor: 'var(--success)', sub: 'Sai số trong ±3% giá thực bán' },
          { eyebrow: 'Training records', value: '47,284', delta: '+1,820 / tuần', valueColor: 'var(--text)', sub: 'Verified transactions từ 12 tháng' },
          { eyebrow: 'ML model', value: 'XGBoost v2.4', delta: 'Retrain hàng ngày 03:00', valueColor: 'var(--accent)', sub: '127 features · gradient boosted trees' },
          { eyebrow: 'Dealer ROI lift', value: '+23%', delta: 'Faster turnover', valueColor: 'var(--success)', sub: 'AI-priced xe bán nhanh hơn 2.4x' },
        ].map(k => (
          <div key={k.eyebrow} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, padding: 24 }}>
            <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 11, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>{k.eyebrow}</div>
            <div className="mono" style={{ fontSize: 36, fontWeight: 800, color: k.valueColor, marginTop: 10, lineHeight: 1, letterSpacing: '-0.02em' }}>{k.value}</div>
            <div style={{ fontSize: 13, color: 'var(--success)', marginTop: 6, fontWeight: 600 }}>{k.delta}</div>
            <div style={{ fontSize: 13, color: 'var(--text-2)', marginTop: 8, lineHeight: 1.4 }}>{k.sub}</div>
          </div>
        ))}
      </div>

      {/* Hero chart */}
      <div className="card" style={{ padding: 40, marginBottom: 32 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 32 }}>
          <div>
            <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 12, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600, marginBottom: 8 }}>Fair price recommendation</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 20 }}>
              <span className="mono display" style={{ fontFamily: '"Space Grotesk", sans-serif', fontSize: 64, fontWeight: 800, color: 'var(--accent)', lineHeight: 1, letterSpacing: '-0.03em' }}>920,000,000 ₫</span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <span style={{ fontSize: 16, color: 'var(--success)', fontWeight: 700 }}>↓ 4.6% vs market avg</span>
                <span style={{ fontSize: 13, color: 'var(--text-2)' }}>Confidence band: 905M – 935M ₫ (±1.6%)</span>
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            {['7D', '30D', '90D', '1Y'].map((t, i) => (
              <span key={t} style={{
                fontSize: 14, padding: '10px 18px', borderRadius: 8,
                background: i === 2 ? 'var(--surface-2)' : 'transparent',
                color: i === 2 ? 'var(--text)' : 'var(--text-3)',
                cursor: 'pointer', fontWeight: 600,
                border: i === 2 ? '1px solid var(--border)' : '1px solid transparent',
              }}>{t}</span>
            ))}
          </div>
        </div>

        {/* Chart */}
        <svg width="100%" height="360" viewBox="0 0 1100 280" preserveAspectRatio="none" style={{ display: 'block' }}>
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

          {/* Otobank AI line */}
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
        <div style={{ display: 'flex', gap: 32, marginTop: 24, fontSize: 14, color: 'var(--text-2)', flexWrap: 'wrap' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}><span style={{ width: 24, height: 3, background: 'var(--accent)' }} /> Otobank AI fair price</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}><span style={{ width: 18, height: 18, borderRadius: '50%', background: 'rgba(232,93,44,0.18)' }} /> Confidence band ±3%</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}><span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--text-3)' }} /> Public listings (3rd-party*)</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}><span style={{ width: 12, height: 12, borderRadius: '50%', background: 'var(--success)' }} /> Recently sold (verified)</span>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 32, marginBottom: 32 }}>
        {/* Decision factors */}
        <div className="card" style={{ padding: 36 }}>
          <h3 style={{ fontFamily: '"Space Grotesk", sans-serif', fontSize: 24, fontWeight: 700, margin: '0 0 8px', letterSpacing: '-0.01em' }}>Cách AI tính giá 920M ₫</h3>
          <p style={{ fontSize: 15, color: 'var(--text-2)', margin: '0 0 28px', lineHeight: 1.5 }}>Fully transparent — mỗi feature có weight và contribution rõ ràng. Dealer & Owner xem được full breakdown.</p>

          {[
            { l: 'Base price (12,847 comparables, 90 ngày)', v: '950M', impact: 0, val: 'baseline' },
            { l: 'Mileage adjustment (28k vs 35k avg)', v: '+8M', impact: 0.1, val: 'positive' },
            { l: 'Trim G premium (vs base)', v: '+12M', impact: 0.15, val: 'positive' },
            { l: 'Color: Trắng ngọc trai (high demand)', v: '+3M', impact: 0.04, val: 'positive' },
            { l: 'Geographic premium (HCM)', v: '+7M', impact: 0.09, val: 'positive' },
            { l: 'Market trend (−2% / 30 ngày)', v: '−19M', impact: -0.24, val: 'negative' },
            { l: 'Seasonality factor (May / pre-Tet)', v: '−7M', impact: -0.09, val: 'negative' },
            { l: 'Stock pressure (3 cars in queue)', v: '−14M', impact: -0.18, val: 'negative' },
            { l: 'Trust Score 92 (Certified premium)', v: '+5M', impact: 0.06, val: 'positive' },
            { l: 'Buyer demand signal (this week)', v: '−5M', impact: -0.06, val: 'negative' },
          ].map((r, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 120px 90px', gap: 16, alignItems: 'center', padding: '14px 0', borderBottom: '1px solid var(--border)', fontSize: 14 }}>
              <span style={{ color: 'var(--text)', fontWeight: 500 }}>{r.l}</span>
              <div style={{ position: 'relative', height: 6, background: 'var(--surface-2)', borderRadius: 3 }}>
                <div style={{ position: 'absolute', left: '50%', height: '100%',
                  background: r.val === 'positive' ? 'var(--success)' : r.val === 'negative' ? 'var(--danger)' : 'var(--text-3)',
                  width: `${Math.abs(r.impact) * 50}%`,
                  transform: r.val === 'negative' ? 'translateX(-100%)' : 'none',
                  borderRadius: 3,
                }} />
              </div>
              <span className="mono" style={{ textAlign: 'right', color: r.val === 'positive' ? 'var(--success)' : r.val === 'negative' ? 'var(--danger)' : 'var(--text)', fontWeight: 700, fontSize: 16 }}>{r.v}</span>
            </div>
          ))}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', paddingTop: 24, marginTop: 8, borderTop: '2px solid var(--accent)' }}>
            <span style={{ fontSize: 18, fontWeight: 700 }}>Final fair price</span>
            <span className="mono" style={{ fontSize: 32, fontWeight: 800, color: 'var(--accent)' }}>920,000,000 ₫</span>
          </div>
        </div>

        {/* Right column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div className="card" style={{ padding: 28 }}>
            <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 12, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>Demand signal</div>
            <div className="mono" style={{ fontSize: 44, fontWeight: 800, marginTop: 8, color: 'var(--success)', letterSpacing: '-0.02em' }}>↑ 24%</div>
            <div style={{ fontSize: 14, color: 'var(--text-2)', marginTop: 4 }}>Search volume tuần này (Honda CR-V 2022)</div>
            <svg width="100%" height="80" viewBox="0 0 240 50" preserveAspectRatio="none" style={{ marginTop: 16 }}>
              <path d="M 0 35 L 30 32 L 60 38 L 90 28 L 120 22 L 150 18 L 180 14 L 210 8 L 240 4" stroke="var(--success)" strokeWidth="2.5" fill="none" />
              <path d="M 0 35 L 30 32 L 60 38 L 90 28 L 120 22 L 150 18 L 180 14 L 210 8 L 240 4 L 240 50 L 0 50 Z" fill="rgba(16,185,129,0.1)" />
            </svg>
          </div>

          <div className="card" style={{ padding: 28 }}>
            <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 12, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>Time-to-sale prediction</div>
            <div className="mono" style={{ fontSize: 44, fontWeight: 800, marginTop: 8, letterSpacing: '-0.02em' }}>7 – 14</div>
            <div style={{ fontSize: 14, color: 'var(--text-2)', marginTop: 4 }}>ngày dự kiến để bán retail</div>
            <div style={{ marginTop: 18, height: 10, background: 'var(--surface-2)', borderRadius: 5, position: 'relative' }}>
              <div style={{ position: 'absolute', left: '20%', right: '40%', height: 10, background: 'var(--accent)', borderRadius: 5 }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'var(--text-3)', marginTop: 8, fontFamily: '"JetBrains Mono", monospace' }}>
              <span>0</span><span>7</span><span>14</span><span>30+ ngày</span>
            </div>
          </div>

          <div className="card" style={{ padding: 28 }}>
            <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 12, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600, marginBottom: 16 }}>Price elasticity</div>
            {[['Giảm 5%', '↑ 38% demand', '+5 days', 'var(--success)'], ['Giảm 10%', '↑ 72% demand', '+9 days', 'var(--success)'], ['Tăng 5%', '↓ 22% demand', '−4 days', 'var(--danger)']].map(r => (
              <div key={r[0]} style={{ display: 'grid', gridTemplateColumns: '90px 1fr 90px', gap: 12, fontSize: 14, padding: '12px 0', borderTop: '1px solid var(--border)', alignItems: 'center' }}>
                <span style={{ color: 'var(--text-2)', fontWeight: 600 }}>{r[0]}</span>
                <span style={{ color: r[3] }}>{r[1]}</span>
                <span className="mono" style={{ color: 'var(--accent)', textAlign: 'right', fontWeight: 700 }}>{r[2]}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Live data sources — investor-facing transparency */}
      <div style={{ marginBottom: 32 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <h2 style={{ fontFamily: '"Space Grotesk", sans-serif', fontSize: 28, fontWeight: 700, margin: 0, letterSpacing: '-0.02em' }}>4 nguồn dữ liệu vận hành</h2>
          <span style={{ fontSize: 14, color: 'var(--text-2)' }}>Updated <strong style={{ color: 'var(--text)' }}>2 phút trước</strong> · Auto-sync mỗi 6h</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}>
          {[
            { name: 'Otobank Internal', count: '12,847', delta: '+1,820/tuần', desc: 'Verified transactions từ retail + wholesale auction trên platform', tier: 'PRIMARY', color: '#E85D2C' },
            { name: 'OEM Partners API', count: '8,420', delta: '+312/tuần', desc: 'VinFast · Toyota VN · Honda VN · Hyundai · Kia (factory MSRP + dealer rates)', tier: 'PARTNER', color: '#10B981' },
            { name: 'Public Listings*', count: '24,167', delta: '+2,100/tuần', desc: 'Bonbanh + Chợ Tốt Xe (chỉ MVP — post-launch sẽ chuyển public API)', tier: 'PROTOTYPE', color: '#FFB800' },
            { name: 'Bank & Insurance', count: '1,850', delta: '+98/tuần', desc: 'VPBank loan portfolio + Bảo Việt claim data (collision/odo verification)', tier: 'PARTNER', color: '#3B82F6' },
          ].map(s => (
            <div key={s.name} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, padding: 24, position: 'relative' }}>
              <div style={{
                position: 'absolute', top: 16, right: 16,
                fontFamily: '"JetBrains Mono", monospace', fontSize: 9, fontWeight: 700,
                padding: '3px 8px', borderRadius: 4, letterSpacing: '0.06em',
                background: `${s.color}20`, color: s.color, border: `1px solid ${s.color}40`,
              }}>{s.tier}</div>
              <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--text)', marginBottom: 6 }}>{s.name}</div>
              <div className="mono" style={{ fontSize: 32, fontWeight: 800, color: s.color, marginTop: 12, lineHeight: 1, letterSpacing: '-0.02em' }}>{s.count}</div>
              <div style={{ fontSize: 13, color: 'var(--success)', marginTop: 4, fontWeight: 600 }}>{s.delta}</div>
              <div style={{ fontSize: 13, color: 'var(--text-2)', marginTop: 12, lineHeight: 1.5 }}>{s.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Geographic demand heatmap + Revenue impact */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 32, marginBottom: 32 }}>
        <div className="card" style={{ padding: 36 }}>
          <h3 style={{ fontFamily: '"Space Grotesk", sans-serif', fontSize: 22, fontWeight: 700, margin: '0 0 8px', letterSpacing: '-0.01em' }}>Nhu cầu theo địa lý — Honda CR-V</h3>
          <p style={{ fontSize: 14, color: 'var(--text-2)', margin: '0 0 24px' }}>Search-to-purchase ratio · 30 ngày · Top 6 thị trường</p>
          {[
            { city: 'TP. Hồ Chí Minh', searches: 4280, sold: 142, rate: 78, color: '#E85D2C' },
            { city: 'Hà Nội', searches: 2940, sold: 98, rate: 72, color: '#FFB800' },
            { city: 'Đà Nẵng', searches: 880, sold: 24, rate: 58, color: '#10B981' },
            { city: 'Hải Phòng', searches: 540, sold: 14, rate: 52, color: '#10B981' },
            { city: 'Cần Thơ', searches: 420, sold: 9, rate: 45, color: '#3B82F6' },
            { city: 'Bình Dương', searches: 720, sold: 28, rate: 68, color: '#FFB800' },
          ].map(c => (
            <div key={c.city} style={{ display: 'grid', gridTemplateColumns: '160px 1fr 100px 80px', gap: 16, alignItems: 'center', padding: '14px 0', borderBottom: '1px solid var(--border)', fontSize: 14 }}>
              <span style={{ fontWeight: 600 }}>{c.city}</span>
              <div style={{ position: 'relative', height: 12, background: 'var(--surface-2)', borderRadius: 6, overflow: 'hidden' }}>
                <div style={{ position: 'absolute', left: 0, top: 0, height: '100%', width: `${c.rate}%`, background: c.color, borderRadius: 6 }} />
              </div>
              <span className="mono" style={{ color: 'var(--text-2)', textAlign: 'right' }}>{c.searches.toLocaleString('vi-VN')} 🔍</span>
              <span className="mono" style={{ color: c.color, textAlign: 'right', fontWeight: 700 }}>{c.rate}%</span>
            </div>
          ))}
        </div>

        <div style={{ background: 'linear-gradient(135deg, rgba(232,93,44,0.12), rgba(255,184,0,0.06))', border: '1px solid rgba(232,93,44,0.3)', borderRadius: 16, padding: 36, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 11, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700, marginBottom: 12 }}>● DEALER ROI IMPACT</div>
            <div className="mono" style={{ fontFamily: '"Space Grotesk", sans-serif', fontSize: 56, fontWeight: 800, color: 'var(--accent)', lineHeight: 1, letterSpacing: '-0.03em' }}>2.4x</div>
            <div style={{ fontSize: 18, color: 'var(--text)', marginTop: 8, fontWeight: 600 }}>Thời gian bán nhanh hơn</div>
            <div style={{ fontSize: 14, color: 'var(--text-2)', marginTop: 6, lineHeight: 1.5 }}>
              So với pricing thủ công Excel của 50 dealer pilot. Inventory turnover từ 67 ngày → 28 ngày.
            </div>
          </div>
          <div style={{ borderTop: '1px solid rgba(232,93,44,0.2)', paddingTop: 20, marginTop: 24 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
              {[
                { l: 'Margin uplift', v: '+8.2pp', sub: 'Tránh under-pricing' },
                { l: 'Holding cost saved', v: '−43%', sub: 'Vốn lưu động nhanh' },
                { l: 'Customer satisfaction', v: '4.8★', sub: 'Giá fair được trusted' },
                { l: 'Dispute rate', v: '0.4%', sub: 'Vs 3.1% market avg' },
              ].map(k => (
                <div key={k.l}>
                  <div style={{ fontSize: 11, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>{k.l}</div>
                  <div className="mono" style={{ fontSize: 24, fontWeight: 800, color: 'var(--text)', marginTop: 4, letterSpacing: '-0.02em' }}>{k.v}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-2)', marginTop: 2 }}>{k.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Comparable cars table */}
      <div className="card" style={{ padding: 36 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <h3 style={{ fontFamily: '"Space Grotesk", sans-serif', fontSize: 24, fontWeight: 700, margin: 0, letterSpacing: '-0.01em' }}>Comparable transactions</h3>
          <span style={{ fontSize: 14, color: 'var(--text-2)' }}><strong style={{ color: 'var(--text)' }}>12,847</strong> records · Honda CR-V 2022 · 90 ngày qua</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '130px 1fr 110px 100px 150px 140px 140px', gap: 14, padding: '14px 0', fontSize: 12, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 600, borderBottom: '1px solid var(--border)', fontFamily: '"JetBrains Mono", monospace' }}>
          <div>VIN (last 4)</div><div>Trim</div><div>Mileage</div><div>Color</div><div>Listed price</div><div>Sold price</div><div>Status</div>
        </div>
        {[
          ['...4781', 'G Premium', '28,500 km', 'Pearl', '935,000,000 ₫', '—', 'Otobank listing', 'var(--accent)'],
          ['...8203', 'G', '31,200 km', 'Pearl', '935,000,000 ₫', '925,000,000 ₫', 'Sold (3 ngày)', 'var(--success)'],
          ['...1145', 'L', '28,400 km', 'Black', '945,000,000 ₫', '—', 'Public listing', 'var(--text-2)'],
          ['...9834', 'G', '25,100 km', 'Silver', '955,000,000 ₫', '—', 'Public listing', 'var(--text-2)'],
          ['...6720', 'G Premium', '35,800 km', 'Pearl', '905,000,000 ₫', '895,000,000 ₫', 'Sold (1 tuần)', 'var(--success)'],
          ['...3308', 'L', '42,000 km', 'Black', '880,000,000 ₫', '870,000,000 ₫', 'Sold (2 tuần)', 'var(--success)'],
        ].map((r, i) => (
          <div key={i} style={{ display: 'grid', gridTemplateColumns: '130px 1fr 110px 100px 150px 140px 140px', gap: 14, padding: '18px 0', fontSize: 15, borderBottom: i < 5 ? '1px solid var(--border)' : 'none', alignItems: 'center' }}>
            <span className="mono" style={{ color: 'var(--text-2)' }}>{r[0]}</span>
            <span style={{ fontWeight: 600 }}>{r[1]}</span>
            <span className="mono">{r[2]}</span>
            <span style={{ color: 'var(--text-2)' }}>{r[3]}</span>
            <span className="mono" style={{ fontWeight: 600 }}>{r[4]}</span>
            <span className="mono" style={{ color: r[5] === '—' ? 'var(--text-3)' : 'var(--success)', fontWeight: 600 }}>{r[5]}</span>
            <span style={{ color: r[7], fontSize: 13, fontWeight: 700 }}>● {r[6]}</span>
          </div>
        ))}
        <div style={{ marginTop: 16, paddingTop: 16, borderTop: '1px solid var(--border)', fontSize: 12, color: 'var(--text-3)' }}>
          * Public listings từ Bonbanh + Chợ Tốt chỉ dùng trong giai đoạn MVP. Post-launch chuyển sang public API + OEM partner data per client decision 2026-05-09.
        </div>
      </div>
    </div>
  </div>
);


Object.assign(window, { Screen09_Tracking, Screen10_IRC, Screen11_AIPricing });
