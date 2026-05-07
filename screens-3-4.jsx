// Screen 03 — Vehicle Detail Page (VDP) — THE WOW SCREEN
// Screen 04 — Inspection Report
// Screen 05 — Checkout

const Screen03_VDP = () => {
  const [activeTab, setActiveTab] = React.useState(0);
  const [activeThumb, setActiveThumb] = React.useState(0);
  const [hoverThumb, setHoverThumb] = React.useState(-1);
  const [show360, setShow360] = React.useState(false);
  const [frame360, setFrame360] = React.useState(0);
  const [isDragging360, setIsDragging360] = React.useState(false);
  const [showHint360, setShowHint360] = React.useState(false);
  const drag360Ref = React.useRef({ startX: 0, startFrame: 0 });
  const TABS = ['Tổng quan', 'Inspection 200pt', 'Lịch sử xe', 'Tài chính', 'Câu hỏi'];
  const GALLERY = [
    { label: 'EXT_FRONT', src: 'uploads/s03-gallery-01-front.png', alt: 'Honda CR-V front view' },
    { label: 'EXT_SIDE',  src: 'uploads/s03-gallery-02-side.png',  alt: 'Honda CR-V side profile' },
    { label: 'EXT_REAR',  src: 'uploads/s03-gallery-03-rear.png',  alt: 'Honda CR-V rear view' },
    { label: 'INT_DASH',  src: 'uploads/s03-gallery-04-interior.png', alt: 'Honda CR-V interior dashboard' },
    { label: 'ENGINE',    src: 'uploads/s03-gallery-05-engine.png', alt: 'Honda CR-V engine bay' },
  ];
  const FRAMES_360 = [
    'uploads/s03-gallery-01-front.png',
    'uploads/s03-gallery-02-side.png',
    'uploads/s03-gallery-03-rear.png',
    'uploads/s03-gallery-04-interior.png',
    'uploads/s03-gallery-05-engine.png',
  ];

  // ESC key + show hint when modal opens
  React.useEffect(() => {
    if (!show360) return;
    setFrame360(0);
    setShowHint360(true);
    const hintTimer = setTimeout(() => setShowHint360(false), 2500);
    const onKey = (e) => { if (e.key === 'Escape') setShow360(false); };
    window.addEventListener('keydown', onKey);
    return () => { clearTimeout(hintTimer); window.removeEventListener('keydown', onKey); };
  }, [show360]);

  const handle360Down = (clientX) => {
    setIsDragging360(true);
    drag360Ref.current = { startX: clientX, startFrame: frame360 };
  };
  const handle360Move = (clientX) => {
    if (!isDragging360) return;
    const dx = clientX - drag360Ref.current.startX;
    const frameDelta = Math.round(dx / 60);
    const next = Math.max(0, Math.min(FRAMES_360.length - 1, drag360Ref.current.startFrame + frameDelta));
    if (next !== frame360) setFrame360(next);
  };
  const handle360Up = () => setIsDragging360(false);
  return (
  <div className="cario" style={{ width: 1440, minHeight: 2200, background: 'var(--bg)' }}>
    <CarioNav active="buy" />

    {/* Breadcrumb */}
    <div style={{ padding: '20px 48px 12px', display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'var(--text-2)' }}>
      <span>Trang chủ</span> <Ico name="chevron" size={11} />
      <span>SUV</span> <Ico name="chevron" size={11} />
      <span>Honda</span> <Ico name="chevron" size={11} />
      <span style={{ color: 'var(--text)' }}>CR-V 1.5L Turbo 2022</span>
    </div>

    {/* Hero 60/40 */}
    <section style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 40, padding: '24px 48px 64px' }}>
      {/* Gallery */}
      <div>
        {/* Tab strip */}
        <div style={{ display: 'flex', gap: 4, marginBottom: 12 }}>
          {['Exterior', 'Interior', '360° View'].map((t, i) => (
            <span key={t} style={{ fontSize: 12, padding: '8px 14px', borderRadius: 8, background: i === 0 ? 'var(--surface-2)' : 'transparent', color: i === 0 ? 'var(--text)' : 'var(--text-2)', cursor: 'pointer', fontWeight: 500 }}>{t}</span>
          ))}
          <span style={{ marginLeft: 'auto', fontSize: 12, color: 'var(--text-2)', display: 'flex', alignItems: 'center', gap: 6 }}>
            1 / 24 ảnh
          </span>
        </div>

        <div style={{ position: 'relative', width: '100%', aspectRatio: '4 / 3', minHeight: 500, borderRadius: 16, overflow: 'hidden' }}>
          <img
            src={GALLERY[activeThumb].src}
            alt={GALLERY[activeThumb].alt}
            key={activeThumb}
            className="vehicle-image"
            loading="lazy"
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', borderRadius: 16, display: 'block', animation: 'fadeIn 0.2s ease' }}
          />
          <style>{`@keyframes fadeIn{from{opacity:0.3}to{opacity:1}}`}</style>
          {/* Top-left badge */}
          <div style={{ position: 'absolute', top: 24, left: 24, zIndex: 10, display: 'flex', flexDirection: 'column', gap: 8 }}>
            <span style={{ position: 'absolute', top: 0, left: 0, background: '#10B981', color: '#FFFFFF', padding: '8px 16px', borderRadius: 999, fontWeight: 700, fontSize: 14, boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)', whiteSpace: 'nowrap' }}>
              🟢 GREAT DEAL
            </span>
            <span style={{ marginTop: 44, background: 'rgba(15,20,25,0.85)', backdropFilter: 'blur(8px)', padding: '6px 12px', borderRadius: 999, fontSize: 12, color: 'var(--success)', border: '1px solid rgba(16,185,129,0.3)' }}>
              ↓ 5% so với giá thị trường
            </span>
          </div>
          {/* Top-right 360° badge */}
          <button
            onClick={() => setShow360(true)}
            className="rotate-360-badge"
            style={{
              position: 'absolute',
              top: 24,
              right: 24,
              zIndex: 10,
              background: 'rgba(0, 0, 0, 0.6)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              padding: '8px 14px',
              borderRadius: 999,
              color: '#FFFFFF',
              fontSize: 13,
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              cursor: 'pointer',
              border: 'none',
              fontFamily: 'inherit',
              transition: 'all 0.2s ease',
            }}
          >
            <span style={{ fontSize: 14, lineHeight: 1 }}>🔄</span> 360°
          </button>
        </div>

        {/* Thumbnail strip — 5 independent gallery images, click to swap hero */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 8, marginTop: 24 }}>
          {GALLERY.map((g, i) => {
            const isActive = i === activeThumb;
            const isHover = i === hoverThumb;
            return (
              <div
                key={g.label}
                onClick={() => setActiveThumb(i)}
                onMouseEnter={() => setHoverThumb(i)}
                onMouseLeave={() => setHoverThumb(-1)}
                style={{
                  borderRadius: 10,
                  overflow: 'hidden',
                  border: isActive ? '2px solid #E85D2C' : isHover ? '2px solid rgba(232,93,44,0.5)' : '2px solid transparent',
                  cursor: 'pointer',
                  transform: isHover && !isActive ? 'translateY(-2px)' : 'none',
                  transition: 'all 0.2s ease',
                }}
              >
                <img
                  src={g.src}
                  alt={g.alt}
                  className="vehicle-image"
                  loading="lazy"
                  style={{ width: '100%', height: 80, objectFit: 'cover', objectPosition: 'center', borderRadius: 8, display: 'block' }}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Sticky purchase panel */}
      <aside>
        <div style={{ position: 'sticky', top: 100 }}>
          <div style={{ marginBottom: 8 }}>
            <span style={{ fontSize: 13, color: 'var(--text-2)' }}>Honda • SUV 5 chỗ</span>
          </div>
          <h1 style={{ fontFamily: '"Space Grotesk", sans-serif', fontSize: 32, fontWeight: 700, color: '#F5F5F5', lineHeight: 1.2, margin: 0 }}>Honda CR-V 1.5L Turbo</h1>
          <div style={{ fontFamily: '"Inter", sans-serif', fontSize: 14, fontWeight: 400, color: '#A0A4AB', marginTop: 8, marginBottom: 18 }}>
            2022 • 28,500 km • Tự động • Xăng • Trắng ngọc trai
          </div>

          {/* Deal banner */}
          <div style={{ display: 'none' }}></div>

          {/* Price */}
          <span style={{ display: 'inline-block', verticalAlign: 'middle', fontFamily: '"Space Grotesk", sans-serif', fontSize: 72, fontWeight: 800, color: '#E85D2C', lineHeight: 1, letterSpacing: '-0.03em' }}>
            920,000,000 ₫
          </span>
          <span style={{ display: 'inline-block', verticalAlign: 'middle', marginLeft: 16, fontFamily: '"Inter", sans-serif', fontSize: 20, fontWeight: 400, color: '#6B7280', textDecoration: 'line-through' }}>
            964,000,000 ₫
          </span>

          {/* Deal badge below price */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            background: 'rgba(16, 185, 129, 0.1)',
            border: '1px solid #10B981',
            color: '#10B981',
            padding: '8px 12px',
            borderRadius: 8,
            fontSize: 13,
            fontWeight: 600,
            marginTop: 8,
            marginBottom: 16,
            fontFamily: '"Inter", sans-serif',
          }}>
            <span style={{ fontSize: 14, lineHeight: 1 }}>↓</span> Thấp hơn 5% so với giá thị trường
          </div>

          {/* Installment */}
          <div className="card" style={{ padding: 24, marginBottom: 24, background: 'var(--surface-2)' }}>
            <div style={{ fontFamily: '"Inter", sans-serif', fontSize: 13, color: '#A0A4AB', fontWeight: 500, marginBottom: 6 }}>Hoặc trả góp</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
              <span style={{ fontFamily: '"Space Grotesk", sans-serif', fontSize: 24, fontWeight: 700, color: '#F5F5F5' }}>9.800.000 ₫</span>
              <span style={{ fontFamily: '"Inter", sans-serif', fontSize: 13, color: '#A0A4AB', fontWeight: 500 }}>/tháng × 60 tháng</span>
            </div>
            <div style={{ fontFamily: '"Inter", sans-serif', fontSize: 13, color: '#A0A4AB', fontWeight: 500, marginTop: 8, display: 'flex', justifyContent: 'space-between' }}>
              <span>Lãi suất 8.5%/năm</span>
              <a style={{ color: '#E85D2C', fontWeight: 600 }}>Xem các gói tài chính →</a>
            </div>
          </div>

          {/* CTAs */}
          <button className="btn-cta-primary" style={{ marginBottom: 8 }}>
            🛒 Mua ngay với 920,000,000 ₫
          </button>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 18 }}>
            <button className="btn btn-outline" style={{ padding: '12px' }}>
              <Ico name="heart" size={15} /> Lưu xe này
            </button>
            <button className="btn btn-outline" style={{ padding: '12px' }}>
              <Ico name="car" size={15} /> Lái thử 7 ngày
            </button>
          </div>

          {/* Trust trio */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 16,
            marginTop: 24,
            paddingTop: 24,
            borderTop: '1px solid #2D343F',
          }}>
            {[
              { icon: '📍', l1: 'Showroom HCM', l2: 'Bình Tân' },
              { icon: '🚚', l1: 'Giao xe', l2: '24-48 giờ' },
              { icon: '🔄', l1: '7 ngày', l2: 'Đổi/trả' },
            ].map((it, i) => (
              <div key={i} style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 8,
                textAlign: 'center',
              }}>
                <span style={{ fontSize: 24, lineHeight: 1 }}>{it.icon}</span>
                <div style={{ fontFamily: '"Inter", sans-serif', fontSize: 13, color: '#A0A4AB', lineHeight: 1.4 }}>
                  {it.l1}
                </div>
                <div style={{ fontFamily: '"Inter", sans-serif', fontSize: 13, color: '#FFFFFF', fontWeight: 600, lineHeight: 1.4, marginTop: -4 }}>
                  {it.l2}
                </div>
              </div>
            ))}
          </div>
        </div>
      </aside>
    </section>

    {/* Tab bar */}
    <div style={{ borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', padding: '0 48px', position: 'sticky', top: 73, background: 'rgba(15,20,25,0.92)', backdropFilter: 'blur(12px)', zIndex: 50 }}>
      <div style={{ display: 'flex', gap: 8 }}>
        {TABS.map((t, i) => (
          <span
            key={t}
            onClick={() => setActiveTab(i)}
            style={{
              fontSize: 14, padding: '18px 4px', marginRight: 24, fontWeight: 500,
              color: i === activeTab ? '#F5F5F5' : '#A0A4AB',
              borderBottom: i === activeTab ? '2px solid #E85D2C' : '2px solid transparent',
              cursor: 'pointer',
              transition: 'color 0.15s ease, border-color 0.15s ease',
            }}
          >{t}</span>
        ))}
      </div>
    </div>

    {/* Specs */}
    <section style={{ padding: '48px' }}>
      <h2 style={{ fontFamily: '"Space Grotesk", sans-serif', fontSize: 24, fontWeight: 600, color: '#F5F5F5', lineHeight: 1.3, marginBottom: 16, marginTop: 0 }}>Thông số kỹ thuật</h2>
      <div className="card" style={{ padding: 32 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px 32px' }}>
          {[
            ['Động cơ', '1.5L Turbo VTEC'],
            ['Hộp số', 'CVT 7 cấp'],
            ['Truyền động', 'FWD'],
            ['Nhiên liệu', 'Xăng RON95'],
            ['Số km đã đi', '28,500 km'],
            ['Màu ngoại thất', 'Trắng ngọc trai'],
            ['Nội thất', 'Đen, 5 chỗ ngồi'],
            ['Số chủ', '1 (private owner)'],
          ].map(([k, v]) => (
            <div key={k}>
              <div style={{ fontFamily: '"Inter", sans-serif', fontSize: 13, fontWeight: 500, lineHeight: 1.4, color: '#A0A4AB', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 8 }}>{k}</div>
              <div style={{ fontFamily: '"Inter", sans-serif', fontSize: 16, fontWeight: 400, lineHeight: 1.6, color: '#F5F5F5' }}>{v}</div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Inspection Summary Card — between specs and trust badges */}
    <section style={{ padding: '0 48px 48px' }}>
      <div style={{
        background: '#1A1F26',
        border: '1px solid #2D343F',
        padding: 32,
        borderRadius: 16,
        marginTop: 32,
        marginBottom: 32,
        display: 'grid',
        gridTemplateColumns: '60% 40%',
        gap: 32,
      }}>
        {/* LEFT 60% */}
        <div>
          <h3 style={{ fontFamily: '"Space Grotesk", sans-serif', fontSize: 20, fontWeight: 700, color: '#F5F5F5', margin: 0, marginBottom: 8 }}>
            Báo cáo Kiểm định 200 điểm
          </h3>
          <div style={{ fontFamily: '"Inter", sans-serif', fontSize: 14, color: '#A0A4AB', marginBottom: 24 }}>
            Kiểm định bởi Cario Tech Center • 15/04/2026
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
            <span style={{ fontFamily: '"Space Grotesk", sans-serif', fontSize: 48, fontWeight: 800, color: '#10B981', lineHeight: 1 }}>
              192/200
            </span>
            <span style={{
              background: '#10B981',
              color: '#FFFFFF',
              padding: '6px 14px',
              borderRadius: 999,
              fontFamily: '"Inter", sans-serif',
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: '0.05em',
            }}>XUẤT SẮC</span>
          </div>

          <div style={{ width: '100%', height: 8, background: '#2D343F', borderRadius: 999, overflow: 'hidden' }}>
            <div style={{
              width: '96%',
              height: '100%',
              background: 'linear-gradient(90deg, #10B981, #34D399)',
              borderRadius: 999,
              animation: 'inspBarFill 1.5s ease-out',
            }} />
          </div>

          <a className="insp-report-link" style={{
            display: 'inline-block',
            color: '#E85D2C',
            fontFamily: '"Inter", sans-serif',
            fontSize: 14,
            fontWeight: 600,
            marginTop: 16,
            cursor: 'pointer',
            textDecoration: 'none',
          }}>Xem báo cáo đầy đủ →</a>
        </div>

        {/* RIGHT 40% — category mini bars */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {[
            ['Mechanical', 58, 60],
            ['Cosmetic', 46, 50],
            ['Safety', 40, 40],
            ['Electronics', 28, 30],
            ['Documentation', 10, 10],
            ['Road Test', 10, 10],
          ].map(([label, score, max]) => {
            const pct = score / max;
            const color = pct >= 0.95 ? '#10B981' : '#FFB800';
            return (
              <div key={label} style={{ display: 'grid', gridTemplateColumns: '1fr auto 60px', gap: 10, alignItems: 'center' }}>
                <span style={{ fontFamily: '"Inter", sans-serif', fontSize: 13, color: '#F5F5F5', fontWeight: 500 }}>{label}</span>
                <span style={{ fontFamily: '"Space Grotesk", sans-serif', fontSize: 12, color: '#A0A4AB', fontWeight: 600 }}>{score}/{max}</span>
                <div style={{ width: 60, height: 6, background: '#2D343F', borderRadius: 999, overflow: 'hidden' }}>
                  <div style={{ width: `${pct * 100}%`, height: '100%', background: color, borderRadius: 999 }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>

    {/* Trust badges row */}
    <section style={{ padding: '0 48px 48px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginTop: 32, marginBottom: 32 }}>
        {[
          'Kiểm định 200 điểm',
          'Pháp lý sạch verified',
          'Không tai nạn',
          '7-day return policy',
        ].map(label => (
          <div key={label} style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            background: '#1A1F26',
            border: '1px solid #2D343F',
            padding: '16px 20px',
            borderRadius: 12,
          }}>
            <span style={{ color: '#10B981', fontSize: 18, lineHeight: 1 }}>✅</span>
            <span style={{ color: '#F5F5F5', fontSize: 14, fontWeight: 500, fontFamily: 'Inter, sans-serif' }}>{label}</span>
          </div>
        ))}
      </div>
    </section>

    {/* Inspection callout */}
    {false && (
      <section style={{ padding: '48px' }}>
        <h2 style={{ fontFamily: '"Space Grotesk", sans-serif', fontSize: 24, fontWeight: 600, color: '#F5F5F5', lineHeight: 1.3, marginBottom: 16, marginTop: 0 }}>Báo cáo Kiểm định 200 điểm</h2>
        <div className="card" style={{ padding: 32 }}>
          <p style={{ fontFamily: '"Inter", sans-serif', fontSize: 16, fontWeight: 400, color: '#F5F5F5', lineHeight: 1.6, margin: 0, marginBottom: 24 }}>
            Xe đã trải qua quy trình kiểm định 200 điểm tại Cario Tech Center Bình Tân ngày 15/04/2026. 192/200 điểm đạt chuẩn — 8 vấn đề nhỏ đã được khắc phục trước khi list. Xem chi tiết báo cáo đầy đủ 32 trang để biết từng hạng mục.
          </p>
          <button className="btn-cta-primary" style={{ marginTop: 0, width: 'auto', display: 'inline-flex' }}>Xem báo cáo đầy đủ →</button>
        </div>
      </section>
    )}

    {/* Description + Inspection summary */}
    <section style={{ padding: '0 48px 48px', display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: 28 }}>
      <div>
        <h2 style={{ fontFamily: '"Space Grotesk", sans-serif', fontSize: 24, fontWeight: 600, color: '#F5F5F5', lineHeight: 1.3, marginBottom: 16, marginTop: 0 }}>Về chiếc xe này</h2>
        <p style={{ fontFamily: '"Inter", sans-serif', fontSize: 18, fontWeight: 400, color: '#F5F5F5', lineHeight: 1.5, margin: 0 }}>
          Honda CR-V 2022 phiên bản 1.5L Turbo G — bản cao cấp nhất, một chủ mua mới từ Honda Plaza Quận 7 tháng 03/2022. Xe được sử dụng cẩn thận, bảo dưỡng định kỳ tại Honda Việt Nam đầy đủ 6 lần (lịch sử bảo hành điện tử kèm trong báo cáo).
        </p>
        <p style={{ fontFamily: '"Inter", sans-serif', fontSize: 16, fontWeight: 400, color: '#F5F5F5', lineHeight: 1.6, marginTop: 14 }}>
          Đã qua quy trình kiểm định 200 điểm của Cario tại trung tâm reconditioning Bình Tân với <strong style={{ color: 'var(--text)' }}>192/200 điểm</strong> đạt chuẩn. 8 vấn đề nhỏ đã được khắc phục trước khi listing — chi tiết trong báo cáo kèm theo.
        </p>

        <div style={{ display: 'flex', gap: 24, marginTop: 28, padding: '20px 24px', background: 'var(--surface-2)', borderRadius: 12 }}>
          <div>
            <div style={{ fontFamily: '"Inter", sans-serif', fontSize: 13, fontWeight: 500, lineHeight: 1.4, color: '#A0A4AB', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Bảo hiểm còn hạn</div>
            <div style={{ fontFamily: '"Inter", sans-serif', fontSize: 16, fontWeight: 400, lineHeight: 1.6, color: '#F5F5F5', marginTop: 6 }}>03/2026 (PVI)</div>
          </div>
          <div style={{ width: 1, background: 'var(--border)' }} />
          <div>
            <div style={{ fontFamily: '"Inter", sans-serif', fontSize: 13, fontWeight: 500, lineHeight: 1.4, color: '#A0A4AB', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Đăng kiểm</div>
            <div style={{ fontFamily: '"Inter", sans-serif', fontSize: 16, fontWeight: 400, lineHeight: 1.6, color: '#F5F5F5', marginTop: 6 }}>09/2027</div>
          </div>
          <div style={{ width: 1, background: 'var(--border)' }} />
          <div>
            <div style={{ fontFamily: '"Inter", sans-serif', fontSize: 13, fontWeight: 500, lineHeight: 1.4, color: '#A0A4AB', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Biển số</div>
            <div style={{ fontFamily: '"Inter", sans-serif', fontSize: 16, fontWeight: 400, lineHeight: 1.6, color: '#F5F5F5', marginTop: 6 }}>51K-XXX.XX</div>
          </div>
        </div>
      </div>

      {/* Inspection summary card */}
      <div className="card" style={{ padding: 24 }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 16 }}>
          <div>
            <div style={{ fontSize: 12, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Kiểm định</div>
            <div style={{ fontSize: 18, fontWeight: 600, marginTop: 4 }}>200-point Inspection</div>
          </div>
          <span className="badge badge-deal">XUẤT SẮC</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 8 }}>
          <span className="mono" style={{ fontSize: 42, fontWeight: 700, color: 'var(--success)' }}>192</span>
          <span className="mono" style={{ fontSize: 18, color: 'var(--text-2)' }}>/ 200</span>
          <span style={{ marginLeft: 'auto', fontSize: 13, color: 'var(--text-2)' }}>96%</span>
        </div>
        <div style={{ height: 8, background: 'var(--surface-2)', borderRadius: 4, overflow: 'hidden', marginBottom: 18 }}>
          <div style={{ width: '96%', height: '100%', background: 'var(--success)' }} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 18 }}>
          {[
            ['Mechanical', 58, 60],
            ['Cosmetic', 46, 50],
            ['Safety', 40, 40],
            ['Electronics', 28, 30],
          ].map(([k, v, m]) => (
            <div key={k} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 12 }}>
              <span style={{ width: 88, color: 'var(--text-2)' }}>{k}</span>
              <div style={{ flex: 1, height: 4, background: 'var(--surface-2)', borderRadius: 2 }}>
                <div style={{ width: `${v / m * 100}%`, height: '100%', background: v / m === 1 ? 'var(--success)' : v / m >= 0.9 ? 'var(--success)' : 'var(--accent-2)', borderRadius: 2 }} />
              </div>
              <span className="mono" style={{ width: 40, textAlign: 'right', color: 'var(--text)' }}>{v}/{m}</span>
            </div>
          ))}
        </div>

        <div style={{ fontSize: 12, color: 'var(--text-2)', padding: '10px 12px', background: 'rgba(255,184,0,0.08)', borderRadius: 8, border: '1px solid rgba(255,184,0,0.2)', marginBottom: 14 }}>
          ⚠ 8 vấn đề nhỏ đã được khắc phục trước khi list
        </div>

        <a style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 13, color: 'var(--accent)', fontWeight: 600 }}>
          Xem báo cáo đầy đủ (32 trang) <Ico name="arrow" size={14} />
        </a>
      </div>
    </section>

    {/* Similar cars */}
    <section style={{ padding: '48px 48px 96px' }}>
      <h2 style={{ fontFamily: '"Space Grotesk", sans-serif', fontSize: 24, fontWeight: 600, color: '#F5F5F5', lineHeight: 1.3, marginBottom: 16, marginTop: 0 }}>Xe tương tự bạn có thể thích</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}>
        {CARS_FEATURED.map(c => <CarCard key={c.id} car={c} />)}
      </div>
    </section>

    <CarioFooter />

    {show360 && (
      <div
        onClick={() => setShow360(false)}
        style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.95)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', zIndex: 9999, animation: 'fadeIn 0.3s ease' }}
      >
        {/* Close X */}
        <button
          onClick={(e) => { e.stopPropagation(); setShow360(false); }}
          style={{ position: 'absolute', top: 24, right: 32, width: 44, height: 44, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.05)', color: '#FFF', fontSize: 22, cursor: 'pointer', transition: 'transform 0.15s ease', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >×</button>

        {/* Header */}
        <div onClick={e => e.stopPropagation()} style={{ textAlign: 'center', marginBottom: 24, color: '#FFF' }}>
          <h3 style={{ fontFamily: '"Space Grotesk", sans-serif', fontSize: 24, fontWeight: 700, lineHeight: 1.3, margin: 0, marginBottom: 6 }}>Xoay xem 360° • Honda CR-V 1.5L Turbo</h3>
          <div style={{ fontFamily: '"Inter", sans-serif', fontSize: 14, color: 'rgba(255,255,255,0.6)' }}>Kéo trái/phải để xoay xe</div>
        </div>

        {/* Image stage — drag to rotate */}
        <div
          onClick={e => e.stopPropagation()}
          onMouseDown={(e) => { e.preventDefault(); handle360Down(e.clientX); }}
          onMouseMove={(e) => handle360Move(e.clientX)}
          onMouseUp={handle360Up}
          onMouseLeave={handle360Up}
          onTouchStart={(e) => handle360Down(e.touches[0].clientX)}
          onTouchMove={(e) => handle360Move(e.touches[0].clientX)}
          onTouchEnd={handle360Up}
          style={{
            position: 'relative',
            width: '80vw', maxWidth: 1200, maxHeight: '70vh', aspectRatio: '16/10',
            borderRadius: 16, overflow: 'hidden',
            cursor: isDragging360 ? 'grabbing' : 'grab',
            userSelect: 'none', touchAction: 'none',
            background: '#0F1419',
            animation: showHint360 ? 'pulse360 1.6s ease-in-out infinite' : 'none',
          }}
        >
          {FRAMES_360.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`Honda CR-V frame ${i + 1}`}
              className="vehicle-image"
              loading="eager"
              draggable={false}
              style={{
                position: 'absolute', inset: 0,
                width: '100%', height: '100%',
                objectFit: 'cover',
                opacity: i === frame360 ? 1 : 0,
                transition: 'opacity 0.15s ease',
                pointerEvents: 'none',
              }}
            />
          ))}

          {/* First-time hint overlay */}
          {showHint360 && (
            <div style={{
              position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
              padding: '12px 24px', borderRadius: 999,
              background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(12px)',
              color: '#FFF', fontFamily: '"Inter", sans-serif', fontSize: 16, fontWeight: 600, letterSpacing: 1.2,
              animation: 'hintFade 2.5s ease forwards',
              pointerEvents: 'none',
              border: '1px solid rgba(255,255,255,0.15)',
            }}>← KÉO ĐỂ XOAY →</div>
          )}
        </div>

        {/* Frame indicator */}
        <div onClick={e => e.stopPropagation()} style={{ marginTop: 24, display: 'flex', alignItems: 'center', gap: 16, color: 'rgba(255,255,255,0.6)', fontFamily: '"Inter", sans-serif', fontSize: 14 }}>
          <div style={{ display: 'flex', gap: 6 }}>
            {FRAMES_360.map((_, i) => (
              <div key={i} style={{
                width: i === frame360 ? 24 : 8, height: 4, borderRadius: 2,
                background: i === frame360 ? '#E85D2C' : 'rgba(255,255,255,0.25)',
                transition: 'all 0.2s ease',
              }} />
            ))}
          </div>
          <span style={{ fontWeight: 600, color: '#FFF' }}>{frame360 + 1} / {FRAMES_360.length}</span>
        </div>
      </div>
    )}
  </div>
  );
};

// ─────────────────────────────────────────────────────────
// Screen 04 — Inspection Report

const Screen04_Inspection = () => {
  const cats = [
    { i: 'wrench', n: 'Mechanical', s: 58, m: 60, items: ['Engine compression', 'Transmission shift', 'Brake system', 'Suspension', 'Steering'] },
    { i: 'sparkles', n: 'Cosmetic', s: 46, m: 50, items: ['Body paint', 'Interior fabric', 'Glass condition', 'Trim/molding', 'Wheels'] },
    { i: 'shield', n: 'Safety', s: 40, m: 40, items: ['Airbags', 'Seatbelts', 'ABS/EBD', 'Lighting', 'Mirrors'] },
    { i: 'zap', n: 'Electronics', s: 28, m: 30, items: ['Infotainment', 'AC system', 'Battery health', 'Sensors', 'Bluetooth'] },
    { i: 'file', n: 'Documentation', s: 10, m: 10, items: ['Title clean', 'Service history', 'Insurance verify', 'Tax records'] },
    { i: 'car', n: 'Road Test', s: 10, m: 10, items: ['City driving', 'Highway test', 'Braking distance', 'Acceleration'] },
  ];
  const issues = [
    ['Trầy xước nhẹ cánh cửa trước trái', 'Sơn vá đồng màu', 'Q.7 Reconditioning'],
    ['Dầu phanh sắp hết hạn', 'Thay dầu phanh DOT4 chính hãng', 'Honda Plaza'],
    ['Dầu hộp số quá hạn 5,000km', 'Thay dầu CVT chính hãng Honda', 'Honda Plaza'],
    ['Lốp xe mòn 70% (4 bánh)', 'Thay 4 lốp Michelin Primacy 4 mới', 'Cario Bình Tân'],
    ['Bóng đèn sương mù trái yếu', 'Thay bóng LED Osram mới', 'Cario Bình Tân'],
    ['Bộ lọc gió cabin bẩn', 'Thay lọc gió cabin mới', 'Cario Bình Tân'],
    ['Cốp xe đóng không khớp đều', 'Cân chỉnh khớp + thay đệm cao su', 'Cario Bình Tân'],
    ['Camera lùi mờ do bụi', 'Vệ sinh + chỉnh lại tiêu cự', 'Cario Bình Tân'],
  ];
  return (
    <div className="cario" style={{ width: 1440, minHeight: 1900, background: 'var(--bg)' }}>
      <CarioNav active="buy" />

      {/* Hero header — 60/40 split, gradient bg */}
      <section style={{
        background: 'linear-gradient(135deg, #0F1419 0%, #1A1F26 100%)',
        padding: '64px 80px',
        borderBottom: '1px solid #2D343F',
      }}>
        <div style={{ display: 'grid', gridTemplateColumns: '3fr 2fr', gap: 56, alignItems: 'center', maxWidth: 1280, margin: '0 auto' }}>
          {/* LEFT 60% */}
          <div>
            <div style={{
              fontFamily: '"Inter", sans-serif',
              fontSize: 12, fontWeight: 700,
              letterSpacing: '2px',
              color: '#E85D2C',
              textTransform: 'uppercase',
              marginBottom: 16,
            }}>
              📋 BÁO CÁO KIỂM ĐỊNH OFFICIAL
            </div>
            <h1 style={{
              fontFamily: '"Space Grotesk", sans-serif',
              fontSize: 36, fontWeight: 800,
              color: '#F5F5F5',
              margin: 0, marginBottom: 8,
              letterSpacing: '-0.02em',
            }}>
              Honda CR-V 1.5L Turbo 2022
            </h1>
            <div style={{
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: 14,
              color: '#A0A4AB',
              marginBottom: 16,
            }}>
              VIN: VHV-CRV-2022-ABCD1234567
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, fontFamily: '"Inter", sans-serif', fontSize: 14, color: '#A0A4AB' }}>
              <div style={{
                width: 32, height: 32, borderRadius: '50%',
                background: 'linear-gradient(135deg, #E85D2C, #F08F6E)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: '"Space Grotesk", sans-serif', fontSize: 13, fontWeight: 700, color: '#FFF',
              }}>NĐ</div>
              <span>Kỹ thuật viên: Nguyễn Văn Đức</span>
              <span>•</span>
              <span>Cario Tech Center HCM</span>
              <span>•</span>
              <span>15/04/2026</span>
            </div>
          </div>

          {/* RIGHT 40% — Big score */}
          <div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
              <span style={{
                fontFamily: '"Space Grotesk", sans-serif',
                fontSize: 96, fontWeight: 800,
                color: '#10B981',
                lineHeight: 1,
                letterSpacing: '-0.04em',
              }}>192</span>
              <span style={{
                fontFamily: '"Space Grotesk", sans-serif',
                fontSize: 32, fontWeight: 600,
                color: '#A0A4AB',
              }}>/200</span>
            </div>
            <div style={{
              fontFamily: '"Inter", sans-serif',
              fontSize: 18, fontWeight: 600,
              color: '#10B981',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              marginTop: 8,
            }}>
              ĐIỂM XUẤT SẮC ✨
            </div>
            <div style={{
              width: '100%', height: 12,
              background: '#2D343F',
              borderRadius: 999,
              overflow: 'hidden',
              marginTop: 16,
            }}>
              <div style={{
                width: '96%', height: '100%',
                background: 'linear-gradient(90deg, #10B981, #34D399)',
                borderRadius: 999,
              }} />
            </div>
            <div style={{
              fontFamily: '"Inter", sans-serif',
              fontSize: 13, fontWeight: 500,
              color: '#10B981',
              marginTop: 8,
            }}>
              96% — Top 5% xe được kiểm định
            </div>
          </div>
        </div>
      </section>

      <div style={{ padding: '40px 80px 60px', maxWidth: 1280, margin: '0 auto' }}>

        {/* Categories grid */}
        <h2 style={{
          fontFamily: '"Space Grotesk", sans-serif',
          fontSize: 28, fontWeight: 700,
          color: '#F5F5F5',
          margin: 0, marginBottom: 32,
          letterSpacing: '-0.02em',
        }}>
          Chi tiết 6 hạng mục kiểm định
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 16,
          maxWidth: 1200,
          marginBottom: 40,
        }}>
          {[
            { icon: '🔧', name: 'Mechanical', score: 58, max: 60 },
            { icon: '🎨', name: 'Cosmetic', score: 46, max: 50 },
            { icon: '🛡', name: 'Safety', score: 40, max: 40 },
            { icon: '⚡', name: 'Electronics', score: 28, max: 30 },
            { icon: '📋', name: 'Documentation', score: 10, max: 10 },
            { icon: '🚗', name: 'Road Test', score: 10, max: 10 },
          ].map(c => {
            const pct = Math.round((c.score / c.max) * 100);
            const color = pct >= 95 ? '#10B981' : pct >= 85 ? '#F59E0B' : '#E85D2C';
            const fillBg = pct >= 95
              ? 'linear-gradient(90deg, #10B981, #34D399)'
              : pct >= 85
              ? 'linear-gradient(90deg, #F59E0B, #FBBF24)'
              : 'linear-gradient(90deg, #E85D2C, #F08F6E)';
            return (
              <div key={c.name}
                style={{
                  background: '#1A1F26',
                  border: '1px solid #2D343F',
                  padding: 24,
                  borderRadius: 12,
                  transition: 'border-color 0.2s ease',
                  cursor: 'pointer',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = '#E85D2C'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = '#2D343F'; }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <span style={{ fontSize: 32, lineHeight: 1 }}>{c.icon}</span>
                    <span style={{
                      fontFamily: '"Inter", sans-serif',
                      fontSize: 16, fontWeight: 600,
                      color: '#F5F5F5',
                    }}>{c.name}</span>
                  </div>
                  <span style={{
                    fontFamily: '"Space Grotesk", sans-serif',
                    fontSize: 24, fontWeight: 700,
                    color,
                  }}>{c.score}/{c.max}</span>
                </div>
                <div style={{
                  height: 6,
                  background: '#2D343F',
                  borderRadius: 999,
                  marginTop: 12,
                  overflow: 'hidden',
                }}>
                  <div style={{
                    width: `${pct}%`,
                    height: '100%',
                    background: fillBg,
                    borderRadius: 999,
                  }} />
                </div>
                <div style={{
                  fontFamily: '"Inter", sans-serif',
                  fontSize: 14, fontWeight: 700,
                  color,
                  marginTop: 8,
                }}>
                  {pct}%
                </div>
              </div>
            );
          })}
        </div>

        {/* Issues fixed — 8 vấn đề nhỏ */}
        <div style={{
          background: '#1A1F26',
          padding: 40,
          borderRadius: 16,
          marginTop: 48,
          marginBottom: 24,
        }}>
          <h2 style={{
            fontFamily: '"Space Grotesk", sans-serif',
            fontSize: 24, fontWeight: 700,
            color: '#F5F5F5',
            margin: 0, marginBottom: 8,
            letterSpacing: '-0.02em',
          }}>
            8 vấn đề nhỏ — Đã được khắc phục trước khi list
          </h2>
          <p style={{
            fontFamily: '"Inter", sans-serif',
            fontSize: 14,
            color: '#A0A4AB',
            margin: 0, marginBottom: 32,
            lineHeight: 1.6,
          }}>
            Cario sửa hết các issues trước khi đưa xe lên website. Nếu có vấn đề tiềm ẩn không sửa được, xe sẽ không được list.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {[
              ['Trầy xước nhẹ ở cánh cửa trước trái', 'Sơn vá đồng màu, không phát hiện được'],
              ['Dầu phanh sắp hết hạn', 'Thay dầu phanh DOT4 chính hãng Honda'],
              ['Dầu hộp số CVT quá hạn 3,000km', 'Thay dầu CVT chính hãng Honda'],
              ['4 lốp xe mòn dưới 70%', 'Thay 4 lốp Michelin Primacy 4 mới'],
              ['Bóng đèn sương mù trái yếu', 'Thay bóng LED Philips mới'],
              ['Bộ lọc gió cabin bẩn', 'Thay lọc cabin chính hãng'],
              ['Cốp xe đóng không khớp 100%', 'Cân chỉnh khớp đóng cốp'],
              ['Camera lùi mờ nhẹ', 'Vệ sinh + chỉnh tiêu cự camera'],
            ].map(([issue, fix], i, arr) => (
              <div key={i} style={{
                display: 'grid',
                gridTemplateColumns: '6fr auto 4fr',
                gap: 16,
                alignItems: 'center',
                padding: '16px 0',
                borderBottom: i < arr.length - 1 ? '1px dotted #2D343F' : 'none',
              }}>
                {/* LEFT 60% issue */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 16, lineHeight: 1 }}>⚠️</span>
                  <span style={{
                    fontFamily: '"Inter", sans-serif',
                    fontSize: 15, fontWeight: 500,
                    color: '#F5F5F5',
                  }}>{issue}</span>
                </div>
                {/* Arrow */}
                <span style={{
                  fontFamily: '"Inter", sans-serif',
                  fontSize: 18, fontWeight: 700,
                  color: '#E85D2C',
                }}>→</span>
                {/* RIGHT 40% fix */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 16, lineHeight: 1, color: '#10B981' }}>✅</span>
                  <span style={{
                    fontFamily: '"Inter", sans-serif',
                    fontSize: 14, fontWeight: 500,
                    color: '#A0A4AB',
                  }}>{fix}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Total cost summary */}
          <div style={{
            background: 'rgba(16, 185, 129, 0.08)',
            border: '1px solid rgba(16, 185, 129, 0.2)',
            padding: 16,
            borderRadius: 8,
            marginTop: 24,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 16,
          }}>
            <div>
              <div style={{
                fontFamily: '"Space Grotesk", sans-serif',
                fontSize: 18, fontWeight: 700,
                color: '#10B981',
              }}>
                Tổng chi phí refurbish: 12,500,000 ₫
              </div>
              <div style={{
                fontFamily: '"Inter", sans-serif',
                fontSize: 13, fontWeight: 500,
                color: '#A0A4AB',
                marginTop: 4,
              }}>
                Cario tự gánh — không tính vào giá bán
              </div>
            </div>
            <span style={{ fontSize: 32, lineHeight: 1 }}>💚</span>
          </div>
        </div>

        {/* Verified data */}
        <div className="card" style={{ padding: 32 }}>
          <h2 style={{ fontSize: 22, margin: '0 0 16px' }}>Dữ liệu đã được verify</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {[
              { t: 'Verified với Cục Đăng kiểm', d: 'API trực tiếp — biển số, hạn đăng kiểm, kiểm định khí thải' },
              { t: 'Không có lịch sử tai nạn', d: 'Đối chiếu cơ sở dữ liệu bảo hiểm Bảo Việt + PVI + PJICO' },
              { t: 'Pháp lý sạch', d: 'Không cầm cố, không tranh chấp, không thế chấp ngân hàng' },
              { t: '1 chủ duy nhất từ mới', d: 'Chứng nhận từ Honda Plaza Quận 7 (đại lý mua mới)' },
            ].map(v => (
              <div key={v.t} style={{ padding: '16px 18px', background: 'var(--surface-2)', borderRadius: 10, display: 'flex', gap: 14 }}>
                <div style={{ width: 28, height: 28, borderRadius: 8, background: 'rgba(16,185,129,0.15)', color: 'var(--success)', display: 'flex', alignItems: 'center', justifyContent: 'center', flex: '0 0 auto' }}>
                  <Ico name="check" size={16} />
                </div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600 }}>{v.t}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-2)', marginTop: 4, lineHeight: 1.5 }}>{v.d}</div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 20, padding: '14px 18px', background: 'rgba(232,93,44,0.08)', border: '1px solid rgba(232,93,44,0.2)', borderRadius: 10, display: 'flex', alignItems: 'center', gap: 12, fontSize: 13 }}>
            <Ico name="lock" size={18} />
            <span style={{ color: 'var(--text-2)' }}>Báo cáo này được lưu trên blockchain Polygon (#0x4f8a...c2e1) để chống giả mạo. Bất kỳ ai cũng có thể verify hash nội dung báo cáo.</span>
          </div>
        </div>

        {/* PDF download CTA — bottom of page */}
        <div style={{
          marginTop: 32,
          padding: 32,
          background: 'linear-gradient(135deg, rgba(232,93,44,0.08), rgba(232,93,44,0.02))',
          border: '1px solid rgba(232,93,44,0.25)',
          borderRadius: 16,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 24,
        }}>
          <div>
            <h3 style={{
              fontFamily: '"Space Grotesk", sans-serif',
              fontSize: 22, fontWeight: 700,
              color: '#F5F5F5',
              margin: 0, marginBottom: 6,
            }}>
              Tải báo cáo đầy đủ 32 trang
            </h3>
            <p style={{
              fontFamily: '"Inter", sans-serif',
              fontSize: 14,
              color: '#A0A4AB',
              margin: 0,
              lineHeight: 1.6,
            }}>
              PDF có chữ ký số kỹ thuật viên + hash blockchain. Mang đến bất kỳ garage nào để đối chiếu độc lập.
            </p>
          </div>
          <div style={{ display: 'flex', gap: 12, flexShrink: 0 }}>
            <button style={{
              background: '#E85D2C',
              color: '#FFFFFF',
              padding: '16px 28px',
              borderRadius: 12,
              fontFamily: '"Inter", sans-serif',
              fontSize: 15, fontWeight: 700,
              border: 'none',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              boxShadow: '0 8px 24px rgba(232, 93, 44, 0.25)',
            }}>
              📥 Tải PDF (32 trang)
            </button>
            <button style={{
              background: 'transparent',
              border: '1px solid #2D343F',
              color: '#F5F5F5',
              padding: '16px 24px',
              borderRadius: 12,
              fontFamily: '"Inter", sans-serif',
              fontSize: 15, fontWeight: 600,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
            }}>
              🔗 Verify on-chain
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

Object.assign(window, { Screen03_VDP, Screen04_Inspection });
