// Screen 13 — Wholesale Auction (Dealer view) — PLACEHOLDER
// Screen 14 — IS App: Săn xe Owner (mobile) — PLACEHOLDER
// Theo PRD Otobank §11 (Trade-in Wholesale Engine) + §12 (Inventory Specialist)

const PlaceholderRibbon = ({ phase, refDoc }) => (
  <div style={{
    position: 'absolute', top: 16, right: 16, zIndex: 50,
    background: 'rgba(232,93,44,0.12)', border: '1px solid rgba(232,93,44,0.4)',
    borderRadius: 8, padding: '8px 14px', display: 'flex', flexDirection: 'column', gap: 2,
    fontFamily: '"JetBrains Mono", monospace',
  }}>
    <div style={{ fontSize: 10, fontWeight: 700, color: '#E85D2C', letterSpacing: '0.1em' }}>● PLACEHOLDER · {phase}</div>
    <div style={{ fontSize: 9, color: '#A0A4AB', letterSpacing: '0.05em' }}>{refDoc}</div>
  </div>
);

// ─────────────────────────────────────────────────────────
// Screen 13 — Wholesale Auction (Dealer view)
// PRD §11.3 Sealed-bid auction 24-72h, notification cascade theo Dealer Tier
// PRD §11.4 AI Wholesale Pricing (Floor / Suggested / Retail Listed)

const Screen13_WholesaleAuction = () => {
  const auctions = [
    {
      id: 'AUC-2026-0142', vehicle: 'Honda CR-V 1.5L Turbo 2022', km: '28,500', source: 'Owner',
      img: 'uploads/s02-card01-honda-crv-blue.png',
      floor: 720, suggested: 760, retail: 920, currentBid: 745, bids: 4,
      ends: '14:32:18', tier: 'GOLD', status: 'live',
    },
    {
      id: 'AUC-2026-0141', vehicle: 'Mazda CX-5 Premium 2023', km: '18,700', source: 'Trade-in',
      img: 'uploads/s02-card03-mazda-cx5-red.png',
      floor: 680, suggested: 720, retail: 850, currentBid: 705, bids: 7,
      ends: '08:15:42', tier: 'GOLD', status: 'live',
    },
    {
      id: 'AUC-2026-0140', vehicle: 'Toyota Camry 2.5Q 2022', km: '34,200', source: 'Owner',
      img: 'uploads/s02-card02-toyota-camry-white.png',
      floor: 950, suggested: 1010, retail: 1180, currentBid: null, bids: 0,
      ends: '47:58:11', tier: 'PLATINUM', status: 'invited',
    },
  ];

  const cascadeStages = [
    { t: 'T+0h', label: 'PLATINUM', count: 8, status: 'sent' },
    { t: 'T+4h', label: 'GOLD', count: 24, status: 'sent' },
    { t: 'T+12h', label: 'SILVER', count: 56, status: 'pending' },
    { t: 'T+24h', label: 'BRONZE', count: 120, status: 'pending' },
    { t: 'T+47h', label: 'Final call', count: 'all', status: 'pending' },
  ];

  return (
    <div className="otobank" style={{ width: 1440, minHeight: 1400, background: 'var(--bg)', position: 'relative' }}>
      <PlaceholderRibbon phase="Phase 4 (Tháng 4-5)" refDoc="PRD §11 Wholesale Engine" />

      {/* Top bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 48px', borderBottom: '1px solid var(--border)', background: '#0F1419' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ fontFamily: '"Space Grotesk", sans-serif', fontWeight: 800, fontSize: 22, color: '#F5F5F5' }}>Otobank · Dealer Portal</div>
          <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 11, padding: '4px 10px', borderRadius: 4, background: 'rgba(232,93,44,0.12)', color: '#E85D2C', border: '1px solid rgba(232,93,44,0.3)' }}>WHOLESALE TIER · GOLD</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, fontSize: 13, color: '#A0A4AB' }}>
          <span>Auto Sài Gòn 168</span>
          <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--accent)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>A</div>
        </div>
      </div>

      {/* Hero — Live auction count + KPIs */}
      <section style={{ padding: '32px 48px', borderBottom: '1px solid var(--border)' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 24 }}>
          <div>
            <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 11, letterSpacing: '0.1em', color: '#E85D2C', fontWeight: 700, marginBottom: 6 }}>● LIVE — SEALED-BID AUCTION</div>
            <h1 style={{ fontFamily: '"Space Grotesk", sans-serif', fontSize: 36, fontWeight: 700, color: '#F5F5F5', margin: 0, letterSpacing: '-0.02em' }}>
              Wholesale Auction Floor
            </h1>
            <p style={{ fontSize: 14, color: '#A0A4AB', margin: '8px 0 0' }}>Bid kín — không thấy giá đối thủ. Floor price ≤ bid ≤ Suggested. Auction tự đóng sau 24-72h.</p>
          </div>
          <div style={{ display: 'flex', gap: 24 }}>
            {[
              { l: 'Auctions live', v: '23', sub: 'eligible cho dealer của bạn' },
              { l: 'Win rate (90d)', v: '38%', sub: '32 thắng / 84 bid' },
              { l: 'Spend (tháng)', v: '12.4 tỷ', sub: '↑ 18% vs tháng trước' },
            ].map(k => (
              <div key={k.l} style={{ background: '#1A1F26', border: '1px solid #2D343F', borderRadius: 12, padding: '14px 18px', minWidth: 140 }}>
                <div style={{ fontSize: 11, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 600 }}>{k.l}</div>
                <div className="mono" style={{ fontSize: 22, fontWeight: 700, color: '#F5F5F5', marginTop: 4 }}>{k.v}</div>
                <div style={{ fontSize: 11, color: '#A0A4AB', marginTop: 2 }}>{k.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main grid: auctions list + notification cascade */}
      <section style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 32, padding: '32px 48px' }}>
        <div>
          <div style={{ fontFamily: '"Space Grotesk", sans-serif', fontSize: 18, fontWeight: 700, color: '#F5F5F5', marginBottom: 16 }}>3 auctions đang mời bạn</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {auctions.map(a => (
              <div key={a.id} style={{
                background: '#1A1F26', border: a.status === 'live' ? '1px solid rgba(232,93,44,0.5)' : '1px solid #2D343F',
                borderRadius: 14, padding: 20, display: 'grid', gridTemplateColumns: '160px 1fr 280px', gap: 24, alignItems: 'center',
              }}>
                <div style={{ borderRadius: 10, overflow: 'hidden', aspectRatio: '4/3' }}>
                  <img src={a.img} alt={a.vehicle} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                    <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 11, color: '#A0A4AB' }}>{a.id}</span>
                    <span style={{ fontSize: 10, padding: '2px 8px', borderRadius: 4, background: a.source === 'Owner' ? 'rgba(232,93,44,0.15)' : 'rgba(16,185,129,0.15)', color: a.source === 'Owner' ? '#E85D2C' : 'var(--success)', fontWeight: 600 }}>{a.source}</span>
                    <span style={{ fontSize: 10, padding: '2px 8px', borderRadius: 4, background: 'rgba(255,184,0,0.15)', color: '#FFB800', fontWeight: 600 }}>Tier {a.tier} eligible</span>
                  </div>
                  <div style={{ fontSize: 18, fontWeight: 700, color: '#F5F5F5', marginBottom: 4 }}>{a.vehicle}</div>
                  <div style={{ fontSize: 13, color: '#A0A4AB', marginBottom: 12 }}>{a.km} km • Trust Score 82 • Inspection ✓</div>
                  <div style={{ display: 'flex', gap: 16, fontSize: 12 }}>
                    <span style={{ color: '#6B7280' }}>Floor (kín): <strong className="mono" style={{ color: '#A0A4AB' }}>{a.floor}M</strong></span>
                    <span style={{ color: '#6B7280' }}>Suggested: <strong className="mono" style={{ color: '#FFB800' }}>{a.suggested}M</strong></span>
                    <span style={{ color: '#6B7280' }}>Retail Listed: <strong className="mono" style={{ color: '#A0A4AB', textDecoration: 'line-through' }}>{a.retail}M</strong></span>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 11, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 4 }}>Còn lại</div>
                  <div className="mono" style={{ fontSize: 28, fontWeight: 700, color: a.status === 'live' ? '#E85D2C' : '#F5F5F5', letterSpacing: '0.05em' }}>{a.ends}</div>
                  <div style={{ fontSize: 11, color: '#A0A4AB', marginBottom: 14 }}>{a.bids} sealed bids</div>
                  <button style={{
                    width: '100%', padding: '12px 18px', borderRadius: 8, border: 'none',
                    background: a.status === 'live' ? '#E85D2C' : 'transparent',
                    color: a.status === 'live' ? '#fff' : '#E85D2C',
                    border: a.status === 'live' ? 'none' : '1px solid #E85D2C',
                    fontWeight: 700, fontSize: 13, cursor: 'pointer',
                  }}>
                    {a.status === 'live' ? 'Đặt bid kín →' : 'Xem & quyết định'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right rail: notification cascade */}
        <aside>
          <div style={{ background: '#1A1F26', border: '1px solid #2D343F', borderRadius: 14, padding: 20 }}>
            <div style={{ fontFamily: '"Space Grotesk", sans-serif', fontSize: 15, fontWeight: 700, color: '#F5F5F5', marginBottom: 4 }}>Notification Cascade</div>
            <div style={{ fontSize: 11, color: '#A0A4AB', marginBottom: 16 }}>Auction AUC-2026-0142 · Honda CR-V</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {cascadeStages.map((s, i) => (
                <div key={s.t} style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                  <div style={{
                    width: 32, height: 32, borderRadius: '50%',
                    background: s.status === 'sent' ? 'rgba(16,185,129,0.15)' : 'rgba(107,114,128,0.15)',
                    border: s.status === 'sent' ? '1px solid var(--success)' : '1px solid #2D343F',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 12, color: s.status === 'sent' ? 'var(--success)' : '#6B7280', fontWeight: 700,
                  }}>{i + 1}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: 13, fontWeight: 600, color: '#F5F5F5' }}>{s.label}</span>
                      <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 10, color: '#A0A4AB' }}>{s.t}</span>
                    </div>
                    <div style={{ fontSize: 11, color: s.status === 'sent' ? 'var(--success)' : '#6B7280' }}>
                      {s.status === 'sent' ? `✓ Đã gửi tới ${s.count} dealers` : `Sẽ gửi tới ${s.count} dealers`}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 18, paddingTop: 14, borderTop: '1px solid #2D343F', fontSize: 11, color: '#6B7280', lineHeight: 1.5 }}>
              <strong style={{ color: '#A0A4AB' }}>Quy tắc PRD §11.3:</strong> Tier cao bid trước. Nếu không đạt floor sau 47h → final call all tiers. Sau 48h → fallback retail.
            </div>
          </div>

          <div style={{ background: 'rgba(232,93,44,0.06)', border: '1px solid rgba(232,93,44,0.2)', borderRadius: 14, padding: 18, marginTop: 16 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#E85D2C', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>Cơ hội dealer</div>
            <div style={{ fontSize: 13, color: '#F5F5F5', lineHeight: 1.5 }}>
              Tier <strong>GOLD</strong> của bạn được mời bid sau 4h kể từ khi auction mở. Tier PLATINUM được ưu tiên 4h đầu.
              <br /><br />
              <span style={{ color: '#A0A4AB' }}>Nâng tier → quarterly review (KPI: win rate, payment speed, dispute rate).</span>
            </div>
          </div>
        </aside>
      </section>
    </div>
  );
};

// ─────────────────────────────────────────────────────────
// Screen 14 — IS App: Săn xe Owner (mobile, iPhone 14 Pro)
// PRD §12.7 Owner Consignment Flow + §12.9 IS Mobile App + §12.4 IS Tier

const Screen14_ISApp = () => {
  const leads = [
    { name: 'Anh Phạm Q.', vehicle: 'Mercedes C200 2020', km: '52,000', area: 'Q.2, HCM', dist: '2.3km', status: 'new', score: 'A' },
    { name: 'Chị Nguyễn H.', vehicle: 'Toyota Innova 2021', km: '78,500', area: 'Q.7, HCM', dist: '5.8km', status: 'visited', score: 'B' },
    { name: 'Anh Lê T.', vehicle: 'Hyundai Tucson 2021', km: '41,200', area: 'Bình Thạnh', dist: '8.1km', status: 'auction', score: 'A' },
  ];

  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '40px 20px', background: 'transparent', position: 'relative' }}>
      <PlaceholderRibbon phase="Phase 5 (Tháng 5-6)" refDoc="PRD §12 IS Role" />
      <div style={{
        width: 393, minHeight: 852, background: '#0F1419', borderRadius: 48,
        border: '8px solid #1A1F26', boxShadow: '0 40px 80px rgba(0,0,0,0.6)',
        overflow: 'hidden', position: 'relative',
      }}>
        {/* Status bar */}
        <div style={{ height: 47, padding: '14px 28px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontFamily: '"Inter", sans-serif', fontSize: 14, fontWeight: 600, color: '#F5F5F5' }}>
          <span>9:41</span>
          <span style={{ display: 'flex', gap: 6, fontSize: 12 }}>📶 📡 🔋</span>
        </div>

        {/* Header */}
        <div style={{ padding: '12px 20px 18px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
            <div>
              <div style={{ fontSize: 11, color: '#A0A4AB', fontFamily: '"JetBrains Mono", monospace', letterSpacing: '0.06em', textTransform: 'uppercase' }}>Inventory Specialist</div>
              <div style={{ fontSize: 22, fontWeight: 700, color: '#F5F5F5', marginTop: 2 }}>Chào, Anh Hoàng</div>
            </div>
            <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'linear-gradient(135deg, #E85D2C, #FFB800)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 16 }}>H</div>
          </div>

          {/* Tier card */}
          <div style={{ background: 'linear-gradient(135deg, rgba(232,93,44,0.18), rgba(255,184,0,0.10))', border: '1px solid rgba(232,93,44,0.3)', borderRadius: 14, padding: 14 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 10, color: '#FFB800', fontWeight: 700, letterSpacing: '0.08em' }}>● TIER GOLD · IS</span>
              <span style={{ fontSize: 10, color: '#A0A4AB' }}>Cập nhật hàng ngày</span>
            </div>
            <div style={{ display: 'flex', gap: 16 }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 10, color: '#A0A4AB', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Income tháng</div>
                <div className="mono" style={{ fontSize: 18, fontWeight: 700, color: '#F5F5F5', marginTop: 2 }}>42.5M ₫</div>
                <div style={{ fontSize: 10, color: '#A0A4AB' }}>↑ vs 38M tháng trước</div>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 10, color: '#A0A4AB', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Owner active</div>
                <div className="mono" style={{ fontSize: 18, fontWeight: 700, color: '#F5F5F5', marginTop: 2 }}>8</div>
                <div style={{ fontSize: 10, color: '#A0A4AB' }}>3 wholesale · 5 retail</div>
              </div>
            </div>
          </div>
        </div>

        {/* AI Valuation prompt */}
        <div style={{ margin: '0 20px 18px', background: '#1A1F26', border: '1px solid rgba(232,93,44,0.3)', borderRadius: 14, padding: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(232,93,44,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>🤖</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#F5F5F5' }}>AI Valuation Tool</div>
              <div style={{ fontSize: 11, color: '#A0A4AB' }}>VIN + odo + condition → Retail/Wholesale range</div>
            </div>
          </div>
          <button style={{ width: '100%', padding: '12px', borderRadius: 10, border: 'none', background: '#E85D2C', color: '#fff', fontWeight: 700, fontSize: 13, cursor: 'pointer' }}>
            Định giá xe mới →
          </button>
        </div>

        {/* Tab bar — Săn xe / Owner CRM / Income */}
        <div style={{ padding: '0 20px', display: 'flex', gap: 8, marginBottom: 14 }}>
          {[
            { l: 'Săn xe', active: true, count: 3 },
            { l: 'Owner CRM', active: false, count: 8 },
            { l: 'Income', active: false, count: null },
          ].map(t => (
            <div key={t.l} style={{
              flex: 1, padding: '10px 8px', borderRadius: 10, textAlign: 'center',
              background: t.active ? 'rgba(232,93,44,0.15)' : 'transparent',
              border: t.active ? '1px solid rgba(232,93,44,0.3)' : '1px solid #2D343F',
            }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: t.active ? '#E85D2C' : '#A0A4AB' }}>
                {t.l} {t.count != null && <span style={{ fontSize: 10, padding: '1px 5px', borderRadius: 4, background: t.active ? 'rgba(232,93,44,0.3)' : '#2D343F', marginLeft: 4 }}>{t.count}</span>}
              </div>
            </div>
          ))}
        </div>

        {/* Lead list */}
        <div style={{ padding: '0 20px 20px', display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={{ fontSize: 12, color: '#A0A4AB', fontWeight: 600, marginBottom: 4 }}>Owner leads gần bạn</div>
          {leads.map(l => (
            <div key={l.name} style={{
              background: '#1A1F26', border: '1px solid #2D343F', borderRadius: 12, padding: 14,
              display: 'flex', flexDirection: 'column', gap: 8,
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: '#F5F5F5' }}>{l.name}</div>
                  <div style={{ fontSize: 12, color: '#A0A4AB', marginTop: 2 }}>{l.vehicle}</div>
                </div>
                <span style={{
                  fontSize: 10, padding: '3px 8px', borderRadius: 12, fontWeight: 700,
                  background: l.score === 'A' ? 'rgba(16,185,129,0.15)' : 'rgba(255,184,0,0.15)',
                  color: l.score === 'A' ? 'var(--success)' : '#FFB800',
                }}>Score {l.score}</span>
              </div>
              <div style={{ display: 'flex', gap: 12, fontSize: 11, color: '#6B7280' }}>
                <span>📍 {l.area}</span>
                <span>🚗 {l.dist}</span>
                <span>{l.km} km</span>
              </div>
              <div style={{ display: 'flex', gap: 6, marginTop: 4 }}>
                {l.status === 'new' && (
                  <button style={{ flex: 1, padding: '8px', borderRadius: 8, border: 'none', background: '#E85D2C', color: '#fff', fontWeight: 700, fontSize: 12, cursor: 'pointer' }}>
                    Nhận lead (30p first-claim)
                  </button>
                )}
                {l.status === 'visited' && (
                  <>
                    <button style={{ flex: 1, padding: '8px', borderRadius: 8, border: '1px solid #2D343F', background: 'transparent', color: '#F5F5F5', fontWeight: 600, fontSize: 12 }}>Định giá lại</button>
                    <button style={{ flex: 1, padding: '8px', borderRadius: 8, border: 'none', background: '#E85D2C', color: '#fff', fontWeight: 700, fontSize: 12 }}>Trình 2 channel</button>
                  </>
                )}
                {l.status === 'auction' && (
                  <div style={{ flex: 1, padding: '8px', borderRadius: 8, background: 'rgba(232,93,44,0.1)', border: '1px solid rgba(232,93,44,0.3)', textAlign: 'center', fontSize: 11, color: '#E85D2C', fontWeight: 600 }}>
                    🔥 Auction live · 4 bids
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom nav placeholder */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 80, background: 'rgba(15,20,25,0.96)', borderTop: '1px solid #2D343F', display: 'flex', alignItems: 'center', padding: '12px 8px 24px' }}>
          {['🎯', '💼', '🤖', '💰', '👤'].map((i, idx) => (
            <div key={idx} style={{ flex: 1, textAlign: 'center', fontSize: 22, opacity: idx === 0 ? 1 : 0.4 }}>{i}</div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────
// Screen 15 — IS Web Dashboard (desktop)
// PRD §12.7 Owner Consignment Flow + §12.9 IS Mobile App + §12.10 Commission

const Screen15_ISWeb = () => {
  const owners = [
    { name: 'Anh Phạm Quốc', vehicle: 'Mercedes C200 2020', valuation: '900-960M', stage: 'Visited', stageColor: '#3B82F6', daysInPipeline: 2, channel: '?' },
    { name: 'Chị Nguyễn Hà', vehicle: 'Toyota Innova 2021', valuation: '680-720M', stage: 'Negotiating', stageColor: '#FFB800', daysInPipeline: 5, channel: 'Wholesale' },
    { name: 'Anh Lê Tâm', vehicle: 'Hyundai Tucson 2021', valuation: '720-780M', stage: 'Auctioning', stageColor: '#E85D2C', daysInPipeline: 1, channel: 'Wholesale' },
    { name: 'Chị Trần My', vehicle: 'Mazda 3 2022', valuation: '580-620M', stage: 'Retail Listed', stageColor: '#10B981', daysInPipeline: 12, channel: 'Retail' },
    { name: 'Anh Vũ Hùng', vehicle: 'Ford Ranger 2022', valuation: '880-940M', stage: 'Sold', stageColor: 'var(--success)', daysInPipeline: 8, channel: 'Wholesale' },
  ];

  const kanbanCols = [
    { stage: 'Lead (mới)', count: 3, color: '#6B7280' },
    { stage: 'Visited', count: 4, color: '#3B82F6' },
    { stage: 'Negotiating', count: 2, color: '#FFB800' },
    { stage: 'Auctioning', count: 1, color: '#E85D2C' },
    { stage: 'Retail listed', count: 3, color: '#10B981' },
    { stage: 'Sold (90d)', count: 12, color: 'var(--success)' },
  ];

  return (
    <div className="otobank" style={{ width: 1440, minHeight: 1800, background: 'var(--bg)', position: 'relative' }}>
      <PlaceholderRibbon phase="Phase 5 (Tháng 5-6)" refDoc="PRD §12 IS Role · Web View" />

      {/* Header bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 48px', borderBottom: '1px solid var(--border)', background: '#0F1419' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <div style={{ fontFamily: '"Space Grotesk", sans-serif', fontWeight: 800, fontSize: 22, color: '#F5F5F5' }}>Otobank · IS Console</div>
          <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 11, padding: '5px 12px', borderRadius: 4, background: 'rgba(255,184,0,0.15)', color: '#FFB800', border: '1px solid rgba(255,184,0,0.3)', fontWeight: 700, letterSpacing: '0.06em' }}>● IS TIER GOLD</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <span style={{ fontSize: 13, color: 'var(--text-2)' }}>Anh Hoàng Minh · 47 Owner đã hợp tác</span>
          <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'linear-gradient(135deg, #E85D2C, #FFB800)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>H</div>
        </div>
      </div>

      <div style={{ padding: '40px 48px' }}>
        {/* Hero header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 32 }}>
          <div>
            <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 11, color: '#FFB800', letterSpacing: '0.1em', fontWeight: 700, marginBottom: 8 }}>● INVENTORY SPECIALIST DASHBOARD</div>
            <h1 style={{ fontFamily: '"Space Grotesk", sans-serif', fontSize: 40, fontWeight: 700, margin: 0, letterSpacing: '-0.02em' }}>Pipeline săn xe Owner</h1>
            <p style={{ fontSize: 16, color: 'var(--text-2)', marginTop: 8, margin: '8px 0 0' }}>Quản lý 13 active Owner consignment · Auto-match 30 phút first-claim · 100% xe Owner phải qua IS</p>
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            <button className="btn btn-outline" style={{ padding: '14px 20px', fontSize: 14, fontWeight: 600 }}>📊 Income breakdown</button>
            <button className="btn btn-primary" style={{ padding: '14px 24px', fontSize: 14, fontWeight: 700 }}>+ Owner mới (manual entry)</button>
          </div>
        </div>

        {/* KPI strip */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20, marginBottom: 40 }}>
          {[
            { eyebrow: 'Income tháng 5', value: '52.4M ₫', delta: '↑ 38% vs T4', sub: 'Wholesale 28M + Retail 18M + Tier bonus 6.4M', color: 'var(--success)' },
            { eyebrow: 'Active Owners', value: '13', delta: '5 wholesale · 8 retail', sub: '5 mới tuần này, 0 từ chối service', color: 'var(--accent)' },
            { eyebrow: 'Win rate Owner', value: '87%', delta: '40/46 ký gửi accept', sub: '90 ngày qua · top 12% IS network', color: 'var(--success)' },
            { eyebrow: 'Auction success', value: '92%', delta: 'Trên target 60% (PRD)', sub: '12/13 wholesale auctions có ≥1 bid', color: 'var(--success)' },
          ].map(k => (
            <div key={k.eyebrow} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, padding: 24 }}>
              <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 11, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>{k.eyebrow}</div>
              <div className="mono" style={{ fontSize: 36, fontWeight: 800, color: 'var(--text)', marginTop: 10, lineHeight: 1, letterSpacing: '-0.02em' }}>{k.value}</div>
              <div style={{ fontSize: 13, color: k.color, marginTop: 6, fontWeight: 600 }}>{k.delta}</div>
              <div style={{ fontSize: 12, color: 'var(--text-2)', marginTop: 8, lineHeight: 1.4 }}>{k.sub}</div>
            </div>
          ))}
        </div>

        {/* Pipeline Kanban */}
        <h2 style={{ fontFamily: '"Space Grotesk", sans-serif', fontSize: 24, fontWeight: 700, margin: '0 0 16px', letterSpacing: '-0.01em' }}>Pipeline kanban</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 14, marginBottom: 40 }}>
          {kanbanCols.map(col => (
            <div key={col.stage} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: 14 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12, paddingBottom: 10, borderBottom: `2px solid ${col.color}` }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: col.color, textTransform: 'uppercase', letterSpacing: '0.04em' }}>{col.stage}</span>
                <span className="mono" style={{ fontSize: 14, fontWeight: 800, color: 'var(--text)' }}>{col.count}</span>
              </div>
              <div style={{ height: 120, background: 'var(--surface-2)', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, color: 'var(--text-3)' }}>
                {col.count > 0 ? `${col.count} card${col.count > 1 ? 's' : ''}` : 'Empty'}
              </div>
            </div>
          ))}
        </div>

        {/* Active Owners table + Income breakdown */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 32, marginBottom: 40 }}>
          {/* Active owners table */}
          <div className="card" style={{ padding: 28 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <h3 style={{ fontFamily: '"Space Grotesk", sans-serif', fontSize: 22, fontWeight: 700, margin: 0, letterSpacing: '-0.01em' }}>Active Owners đang theo dõi</h3>
              <span style={{ fontSize: 13, color: 'var(--text-2)' }}>5 trong tổng 13 active</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1.4fr 130px 120px 80px 90px', gap: 14, padding: '12px 0', fontSize: 11, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 600, borderBottom: '1px solid var(--border)', fontFamily: '"JetBrains Mono", monospace' }}>
              <div>Owner</div><div>Vehicle</div><div>Valuation</div><div>Stage</div><div>Days</div><div>Channel</div>
            </div>
            {owners.map((o, i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '1.2fr 1.4fr 130px 120px 80px 90px', gap: 14, padding: '16px 0', fontSize: 14, borderBottom: i < owners.length - 1 ? '1px solid var(--border)' : 'none', alignItems: 'center' }}>
                <span style={{ fontWeight: 600 }}>{o.name}</span>
                <span style={{ color: 'var(--text-2)' }}>{o.vehicle}</span>
                <span className="mono" style={{ color: 'var(--accent)' }}>{o.valuation}</span>
                <span style={{ fontSize: 11, padding: '4px 10px', borderRadius: 999, background: `${o.stageColor}20`, color: o.stageColor, fontWeight: 700, textAlign: 'center', display: 'inline-block', width: 'fit-content' }}>{o.stage}</span>
                <span className="mono" style={{ color: 'var(--text-2)' }}>{o.daysInPipeline}d</span>
                <span style={{ color: 'var(--text-2)', fontSize: 12 }}>{o.channel}</span>
              </div>
            ))}
          </div>

          {/* Income breakdown */}
          <div className="card" style={{ padding: 28 }}>
            <h3 style={{ fontFamily: '"Space Grotesk", sans-serif', fontSize: 22, fontWeight: 700, margin: '0 0 6px', letterSpacing: '-0.01em' }}>Income breakdown · T5</h3>
            <p style={{ fontSize: 13, color: 'var(--text-2)', margin: '0 0 24px' }}>Theo PRD §12.10 — 4 income streams</p>

            {[
              { l: 'Consignment wholesale (1.5% Owner fee, 50%)', v: '28.0M', pct: 53, color: 'var(--accent)' },
              { l: 'Consignment retail (1.5% Owner fee)', v: '18.0M', pct: 34, color: '#FFB800' },
              { l: 'AC referral (0.3% deal lead)', v: '0M', pct: 0, color: '#3B82F6' },
              { l: 'IS Tier GOLD bonus (acquisition)', v: '6.4M', pct: 13, color: '#10B981' },
            ].map((s, i) => (
              <div key={i} style={{ marginBottom: 20 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8, fontSize: 13 }}>
                  <span style={{ color: 'var(--text)', fontWeight: 500 }}>{s.l}</span>
                  <span className="mono" style={{ color: s.color, fontWeight: 800, fontSize: 16 }}>{s.v} ₫</span>
                </div>
                <div style={{ height: 8, background: 'var(--surface-2)', borderRadius: 4, overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${s.pct}%`, background: s.color, borderRadius: 4 }} />
                </div>
              </div>
            ))}

            <div style={{ paddingTop: 14, marginTop: 4, borderTop: '2px solid var(--accent)', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <span style={{ fontSize: 16, fontWeight: 700 }}>Total tháng 5</span>
              <span className="mono" style={{ fontSize: 28, fontWeight: 800, color: 'var(--accent)', letterSpacing: '-0.02em' }}>52.4M ₫</span>
            </div>
            <div style={{ marginTop: 8, fontSize: 11, color: 'var(--text-3)' }}>
              Hash-chain ledger immutable · TNCN 10% withheld auto · payout T+7
            </div>
          </div>
        </div>

        {/* AI Valuation history */}
        <div className="card" style={{ padding: 28 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <h3 style={{ fontFamily: '"Space Grotesk", sans-serif', fontSize: 22, fontWeight: 700, margin: 0, letterSpacing: '-0.01em' }}>AI Valuation history (10 gần nhất)</h3>
            <span style={{ fontSize: 13, color: 'var(--text-2)' }}>Confidence interval ±5% (Tier GOLD) · Accuracy 94%</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1.4fr 100px 130px 130px 100px 110px', gap: 14, padding: '12px 0', fontSize: 11, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 600, borderBottom: '1px solid var(--border)', fontFamily: '"JetBrains Mono", monospace' }}>
            <div>Date</div><div>Vehicle</div><div>Odo</div><div>AI estimate</div><div>Final price</div><div>Δ</div><div>Outcome</div>
          </div>
          {[
            ['08/05/2026', 'Mercedes C200 2020', '52,000', '930M ±5%', '928M', '−0.2%', 'In auction', 'var(--accent)'],
            ['07/05/2026', 'Toyota Innova 2021', '78,500', '700M ±5%', '695M', '−0.7%', 'Sold (W)', 'var(--success)'],
            ['05/05/2026', 'Hyundai Tucson 2021', '41,200', '750M ±5%', '745M', '−0.7%', 'In auction', 'var(--accent)'],
            ['03/05/2026', 'Mazda 3 2022', '24,500', '600M ±5%', '610M', '+1.7%', 'Retail listed', '#FFB800'],
            ['01/05/2026', 'Ford Ranger 2022', '38,200', '910M ±5%', '905M', '−0.5%', 'Sold (W)', 'var(--success)'],
          ].map((r, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '1.2fr 1.4fr 100px 130px 130px 100px 110px', gap: 14, padding: '14px 0', fontSize: 14, borderBottom: i < 4 ? '1px solid var(--border)' : 'none', alignItems: 'center' }}>
              <span className="mono" style={{ color: 'var(--text-2)' }}>{r[0]}</span>
              <span style={{ fontWeight: 500 }}>{r[1]}</span>
              <span className="mono" style={{ color: 'var(--text-2)' }}>{r[2]}</span>
              <span className="mono" style={{ color: 'var(--text)' }}>{r[3]}</span>
              <span className="mono" style={{ color: 'var(--text)', fontWeight: 600 }}>{r[4]}</span>
              <span className="mono" style={{ color: r[5].startsWith('+') ? 'var(--success)' : 'var(--text-2)' }}>{r[5]}</span>
              <span style={{ color: r[7], fontSize: 12, fontWeight: 700 }}>● {r[6]}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

Object.assign(window, { Screen13_WholesaleAuction, Screen14_ISApp, Screen15_ISWeb });
