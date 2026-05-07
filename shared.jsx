// Cario shared components — logo, navbar, footer, car placeholder
// Imported by every screen JSX file.

const CarioLogo = ({ size = 22 }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: size, letterSpacing: '-0.02em', color: 'var(--text)' }}>
    <svg width={size + 4} height={size + 4} viewBox="0 0 28 28" fill="none">
      <rect x="2" y="2" width="24" height="24" rx="7" fill="var(--accent)" />
      <path d="M8 17 L8 13 Q8 10 11 10 L17 10 Q20 10 20 13 L20 17" stroke="#fff" strokeWidth="2" strokeLinecap="round" fill="none"/>
      <circle cx="11" cy="18" r="1.6" fill="#fff" />
      <circle cx="17" cy="18" r="1.6" fill="#fff" />
    </svg>
    <span>Cario</span>
  </div>
);

// Photorealistic-ish stylized car SVG silhouette (side view) — uses CSS vars
const CarSilhouette = ({ variant = 'sedan', tone = 'pearl' }) => {
  const palettes = {
    pearl: { body: '#E8E6E0', shadow: '#9DA0A8', highlight: '#F8F7F4' },
    midnight: { body: '#1F242C', shadow: '#0A0D11', highlight: '#3A4250' },
    burgundy: { body: '#3F1A20', shadow: '#1F0A0E', highlight: '#5F2A33' },
    silver: { body: '#B8BDC4', shadow: '#7A7F86', highlight: '#D8DCE2' },
    forest: { body: '#1F3A2C', shadow: '#0A1A12', highlight: '#2F4F40' },
  };
  const p = palettes[tone] || palettes.pearl;
  if (variant === 'suv') {
    return (
      <svg viewBox="0 0 320 140" style={{ width: '100%', height: '100%', display: 'block' }}>
        <defs>
          <linearGradient id={`g-${tone}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={p.highlight} />
            <stop offset="100%" stopColor={p.body} />
          </linearGradient>
        </defs>
        <ellipse cx="160" cy="125" rx="140" ry="6" fill="rgba(0,0,0,0.4)" />
        {/* Body */}
        <path d="M 30 100 L 30 78 Q 35 60 60 50 L 110 35 Q 130 30 160 30 L 220 32 Q 250 36 270 50 L 290 70 L 290 100 Z" fill={`url(#g-${tone})`} stroke={p.shadow} strokeWidth="0.5"/>
        {/* Window */}
        <path d="M 75 55 L 110 40 Q 130 35 160 35 L 215 38 Q 240 42 255 55 L 255 70 L 75 70 Z" fill="#0F1419" opacity="0.85" />
        <path d="M 130 35 L 130 70" stroke={p.shadow} strokeWidth="1" />
        <path d="M 175 35 L 175 70" stroke={p.shadow} strokeWidth="1" />
        {/* Side accent */}
        <path d="M 35 92 L 285 92" stroke={p.shadow} strokeWidth="0.8" opacity="0.6" />
        {/* Wheels */}
        <circle cx="80" cy="105" r="22" fill="#0A0D11" />
        <circle cx="80" cy="105" r="14" fill="#2D343F" />
        <circle cx="80" cy="105" r="5" fill="#0A0D11" />
        <circle cx="240" cy="105" r="22" fill="#0A0D11" />
        <circle cx="240" cy="105" r="14" fill="#2D343F" />
        <circle cx="240" cy="105" r="5" fill="#0A0D11" />
        {/* Headlight */}
        <ellipse cx="285" cy="78" rx="6" ry="4" fill="#FFF8DC" opacity="0.9" />
        <ellipse cx="35" cy="80" rx="3" ry="3" fill="#E85D2C" opacity="0.8" />
      </svg>
    );
  }
  if (variant === 'pickup') {
    return (
      <svg viewBox="0 0 320 140" style={{ width: '100%', height: '100%', display: 'block' }}>
        <defs>
          <linearGradient id={`g-${tone}-p`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={p.highlight} />
            <stop offset="100%" stopColor={p.body} />
          </linearGradient>
        </defs>
        <ellipse cx="160" cy="125" rx="140" ry="6" fill="rgba(0,0,0,0.4)" />
        <path d="M 30 100 L 30 75 Q 35 58 60 48 L 110 35 Q 130 30 155 30 L 175 30 L 180 65 L 290 65 L 290 100 Z" fill={`url(#g-${tone}-p)`} />
        <path d="M 75 55 L 110 40 Q 130 35 155 35 L 170 35 L 175 65 L 75 65 Z" fill="#0F1419" opacity="0.85" />
        <path d="M 125 35 L 125 65" stroke={p.shadow} strokeWidth="1" />
        <circle cx="80" cy="105" r="22" fill="#0A0D11" /><circle cx="80" cy="105" r="14" fill="#2D343F" /><circle cx="80" cy="105" r="5" fill="#0A0D11" />
        <circle cx="240" cy="105" r="22" fill="#0A0D11" /><circle cx="240" cy="105" r="14" fill="#2D343F" /><circle cx="240" cy="105" r="5" fill="#0A0D11" />
        <ellipse cx="285" cy="80" rx="6" ry="4" fill="#FFF8DC" opacity="0.9" />
      </svg>
    );
  }
  // sedan default
  return (
    <svg viewBox="0 0 320 140" style={{ width: '100%', height: '100%', display: 'block' }}>
      <defs>
        <linearGradient id={`g-${tone}-s`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={p.highlight} />
          <stop offset="100%" stopColor={p.body} />
        </linearGradient>
      </defs>
      <ellipse cx="160" cy="125" rx="140" ry="6" fill="rgba(0,0,0,0.4)" />
      <path d="M 30 102 L 35 88 Q 40 72 65 65 L 100 50 Q 130 42 160 42 L 215 44 Q 250 50 275 70 L 290 88 L 290 102 Z" fill={`url(#g-${tone}-s)`} />
      <path d="M 80 70 L 110 52 Q 135 45 160 45 L 210 47 Q 235 52 255 68 L 255 80 L 80 80 Z" fill="#0F1419" opacity="0.85" />
      <path d="M 135 45 L 135 80" stroke={p.shadow} strokeWidth="1" />
      <path d="M 180 45 L 180 80" stroke={p.shadow} strokeWidth="1" />
      <path d="M 35 95 L 285 95" stroke={p.shadow} strokeWidth="0.8" opacity="0.6" />
      <circle cx="80" cy="105" r="20" fill="#0A0D11" /><circle cx="80" cy="105" r="13" fill="#2D343F" /><circle cx="80" cy="105" r="4" fill="#0A0D11" />
      <circle cx="240" cy="105" r="20" fill="#0A0D11" /><circle cx="240" cy="105" r="13" fill="#2D343F" /><circle cx="240" cy="105" r="4" fill="#0A0D11" />
      <ellipse cx="285" cy="82" rx="6" ry="4" fill="#FFF8DC" opacity="0.9" />
      <ellipse cx="35" cy="84" rx="3" ry="3" fill="#E85D2C" opacity="0.8" />
    </svg>
  );
};

// Photo-style placeholder with gradient floor + label
const CarPhoto = ({ variant = 'sedan', tone = 'pearl', label, ratio = '16/10', badge, dark = true }) => (
  <div style={{
    position: 'relative', width: '100%', aspectRatio: ratio, borderRadius: 12, overflow: 'hidden',
    background: dark
      ? 'radial-gradient(ellipse at 50% 30%, #2A323D 0%, #0F1419 70%)'
      : 'radial-gradient(ellipse at 50% 30%, #E8E6E0 0%, #C8C5BD 70%)',
    display: 'flex', alignItems: 'center', justifyContent: 'center'
  }}>
    {/* Studio floor reflection */}
    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '40%', background: 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.4))' }} />
    <div style={{ width: '88%', maxHeight: '70%', position: 'relative', zIndex: 1 }}>
      <CarSilhouette variant={variant} tone={tone} />
    </div>
    {label && (
      <div style={{ position: 'absolute', bottom: 10, left: 12, fontFamily: 'var(--font-mono)', fontSize: 10, color: dark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
        {label}
      </div>
    )}
    {badge && (
      <div style={{ position: 'absolute', top: 12, left: 12 }}>{badge}</div>
    )}
  </div>
);

// Simple icon system (line)
const Ico = ({ name, size = 16 }) => {
  const paths = {
    search: 'M11 4a7 7 0 1 1 0 14a7 7 0 0 1 0-14ZM21 21l-4.3-4.3',
    heart: 'M12 21s-7-4.5-9.5-9C.5 8 3 4 7 4c2 0 3.5 1 5 3c1.5-2 3-3 5-3c4 0 6.5 4 4.5 8c-2.5 4.5-9.5 9-9.5 9Z',
    bell: 'M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9ZM10 21a2 2 0 0 0 4 0',
    cart: 'M2 4h3l3 13h12l3-9H7M10 21a2 2 0 1 0 0-4a2 2 0 0 0 0 4Zm10 0a2 2 0 1 0 0-4a2 2 0 0 0 0 4Z',
    check: 'M5 13l4 4L19 7',
    chevron: 'M9 6l6 6l-6 6',
    chevronDown: 'M6 9l6 6l6-6',
    user: 'M12 12a4 4 0 1 0 0-8a4 4 0 0 0 0 8ZM4 21c0-4 4-7 8-7s8 3 8 7',
    pin: 'M12 22s8-7.5 8-13a8 8 0 1 0-16 0c0 5.5 8 13 8 13ZM12 11a2 2 0 1 0 0-4a2 2 0 0 0 0 4Z',
    truck: 'M2 7h11v10H2zM13 10h5l3 3v4h-8M6 21a2 2 0 1 0 0-4a2 2 0 0 0 0 4Zm12 0a2 2 0 1 0 0-4a2 2 0 0 0 0 4Z',
    refresh: 'M3 12a9 9 0 0 1 15-6.7L21 8M21 3v5h-5M21 12a9 9 0 0 1-15 6.7L3 16M3 21v-5h5',
    shield: 'M12 2l8 4v6c0 5-3.5 9-8 10c-4.5-1-8-5-8-10V6l8-4Z',
    arrow: 'M5 12h14M13 5l7 7l-7 7',
    plus: 'M12 5v14M5 12h14',
    grid: 'M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z',
    list: 'M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01',
    star: 'M12 2l3 7l7 1l-5 5l1 7l-6-3l-6 3l1-7l-5-5l7-1Z',
    phone: 'M22 16.9V20a2 2 0 0 1-2.2 2A19 19 0 0 1 2 4.2A2 2 0 0 1 4 2h3.1a2 2 0 0 1 2 1.7c.1.9.3 1.8.6 2.6a2 2 0 0 1-.5 2.1L8 9.6a16 16 0 0 0 6.4 6.4l1.2-1.2a2 2 0 0 1 2.1-.5c.8.3 1.7.5 2.6.6a2 2 0 0 1 1.7 2Z',
    chat: 'M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2Z',
    home: 'M3 12l9-9l9 9M5 10v10h14V10',
    settings: 'M12 15a3 3 0 1 0 0-6a3 3 0 0 0 0 6ZM19.4 15a1.6 1.6 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.6 1.6 0 0 0-1.8-.3a1.6 1.6 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.6 1.6 0 0 0-1-1.5a1.6 1.6 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.6 1.6 0 0 0 .3-1.8a1.6 1.6 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.6 1.6 0 0 0 1.5-1a1.6 1.6 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.6 1.6 0 0 0 1.8.3H9a1.6 1.6 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.6 1.6 0 0 0 1 1.5a1.6 1.6 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.6 1.6 0 0 0-.3 1.8V9a1.6 1.6 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.6 1.6 0 0 0-1.5 1Z',
    download: 'M12 3v12M7 10l5 5l5-5M5 21h14',
    sparkles: 'M12 3l2 5l5 2l-5 2l-2 5l-2-5l-5-2l5-2ZM19 14l1 2.5l2.5 1l-2.5 1l-1 2.5l-1-2.5l-2.5-1l2.5-1ZM5 4l.7 1.5L7 6l-1.3.5L5 8l-.7-1.5L3 6l1.3-.5Z',
    lock: 'M5 11h14v10H5zM8 11V7a4 4 0 1 1 8 0v4',
    filter: 'M3 4h18l-7 9v7l-4-2v-5L3 4Z',
    heart_fill: 'M12 21s-7-4.5-9.5-9C.5 8 3 4 7 4c2 0 3.5 1 5 3c1.5-2 3-3 5-3c4 0 6.5 4 4.5 8c-2.5 4.5-9.5 9-9.5 9Z',
    info: 'M12 22a10 10 0 1 0 0-20a10 10 0 0 0 0 20ZM12 8h.01M11 12h1v4h1',
    play: 'M5 3l14 9l-14 9V3Z',
    eye: 'M2 12s4-7 10-7s10 7 10 7s-4 7-10 7s-10-7-10-7ZM12 15a3 3 0 1 0 0-6a3 3 0 0 0 0 6Z',
    dollar: 'M12 2v20M17 5H9.5a3.5 3.5 0 1 0 0 7h5a3.5 3.5 0 1 1 0 7H6',
    calendar: 'M3 5h18v16H3zM3 9h18M8 3v4M16 3v4',
    clock: 'M12 22a10 10 0 1 0 0-20a10 10 0 0 0 0 20ZM12 6v6l4 2',
    file: 'M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9ZM14 3v6h6',
    trending: 'M3 17l6-6l4 4l8-8M14 7h7v7',
    award: 'M12 15a7 7 0 1 0 0-14a7 7 0 0 0 0 14ZM8.2 13.9L7 22l5-3l5 3l-1.2-8.1',
    zap: 'M13 2L3 14h7l-1 8l10-12h-7l1-8Z',
    bank: 'M3 21h18M5 21V10M19 21V10M3 10l9-7l9 7M9 21v-7M15 21v-7',
    car: 'M5 17h14l-1.5-7H6.5L5 17ZM5 17h14l1 4H4l1-4ZM7 7l1-3h8l1 3',
    wrench: 'M14.7 6.3a4 4 0 0 0 5.3 5.3L21 21l-3-3l-9.4-9.4Z',
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d={paths[name] || paths.info} />
    </svg>
  );
};

// Format VND
const fmt = (n) => n.toLocaleString('vi-VN');

// Sticky navbar
const CarioNav = ({ active = 'home', sticky = false }) => {
  const items = [
    { id: 'home', label: 'Trang chủ' },
    { id: 'buy', label: 'Mua xe' },
    { id: 'sell', label: 'Bán xe' },
    { id: 'finance', label: 'Tài chính' },
    { id: 'about', label: 'Giới thiệu' },
  ];
  return (
    <nav style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '18px 48px', borderBottom: '1px solid var(--border)',
      background: 'rgba(15,20,25,0.85)', backdropFilter: 'blur(12px)',
      position: sticky ? 'sticky' : 'relative', top: 0, zIndex: 100,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 40 }}>
        <CarioLogo />
        <div style={{ display: 'flex', gap: 28 }}>
          {items.map(it => (
            <a key={it.id} style={{
              fontSize: 14, fontWeight: 500,
              color: active === it.id ? 'var(--text)' : 'var(--text-2)',
              cursor: 'pointer', position: 'relative',
            }}>
              {it.label}
              {active === it.id && <div style={{ position: 'absolute', bottom: -22, left: 0, right: 0, height: 2, background: 'var(--accent)' }} />}
            </a>
          ))}
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 14px', background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 999, color: 'var(--text-3)', fontSize: 13, minWidth: 220 }}>
          <Ico name="search" size={14} />
          <span>Tìm xe theo hãng, model...</span>
        </div>
        <button className="btn btn-ghost" style={{ padding: '8px 14px', fontSize: 14 }}>Đăng nhập</button>
        <button className="btn btn-primary" style={{ padding: '8px 18px', fontSize: 14 }}>Đăng ký</button>
      </div>
    </nav>
  );
};

const CarioFooter = () => (
  <footer style={{ padding: '40px 48px 24px', borderTop: '1px solid var(--border)', background: 'var(--bg)' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 60, marginBottom: 32 }}>
      <div style={{ maxWidth: 320 }}>
        <CarioLogo />
        <p style={{ marginTop: 14, fontSize: 13, color: 'var(--text-2)', lineHeight: 1.6 }}>
          Mua xe ô tô như mua điện thoại. Đơn giản. Minh bạch. Giao tận nhà.
        </p>
      </div>
      {[
        { title: 'Sản phẩm', items: ['Mua xe', 'Bán xe', 'Đổi xe', 'Pre-approval', 'Lái thử 7 ngày'] },
        { title: 'Hỗ trợ', items: ['Trung tâm trợ giúp', 'Quy trình kiểm định', 'Chính sách đổi trả', 'Liên hệ'] },
        { title: 'Công ty', items: ['Về Cario', 'Tuyển dụng', 'Báo chí', 'Đối tác ngân hàng'] },
      ].map(col => (
        <div key={col.title}>
          <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)', marginBottom: 14 }}>{col.title}</div>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
            {col.items.map(i => <li key={i} style={{ fontSize: 13, color: 'var(--text-2)', cursor: 'pointer' }}>{i}</li>)}
          </ul>
        </div>
      ))}
    </div>
    <div style={{ paddingTop: 18, borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'var(--text-3)' }}>
      <div>© 2026 Cario Vietnam JSC. Giấy phép DKKD số 0316XXXXXX</div>
      <div style={{ display: 'flex', gap: 20 }}>
        <span>Điều khoản</span><span>Bảo mật</span><span>Cookie</span>
      </div>
    </div>
  </footer>
);

// Bank logo placeholder
const BankLogo = ({ name, w = 100 }) => (
  <div style={{
    width: w, height: 36, borderRadius: 6, background: 'var(--surface-2)',
    border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 13, color: 'var(--text-2)', letterSpacing: '0.02em',
  }}>{name}</div>
);

Object.assign(window, { CarioLogo, CarioNav, CarioFooter, CarSilhouette, CarPhoto, Ico, fmt, BankLogo });
