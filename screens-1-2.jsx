// Screen 01 — Landing Page Hero
// Screen 02 — Browse Inventory

// Trust Score badge — PRD §10.2 (Documentation 25 + Inspection 30 + History 25 + Source 20)
const trustTier = (s) => {
  if (s >= 90) return { label: 'Certified', color: '#10B981', bg: 'rgba(16,185,129,0.15)', border: 'rgba(16,185,129,0.4)' };
  if (s >= 75) return { label: 'Verified', color: '#E85D2C', bg: 'rgba(232,93,44,0.15)', border: 'rgba(232,93,44,0.4)' };
  if (s >= 60) return { label: 'Standard', color: '#A0A4AB', bg: 'rgba(160,164,171,0.15)', border: 'rgba(160,164,171,0.4)' };
  return { label: 'Not Certified', color: '#EF4444', bg: 'rgba(239,68,68,0.15)', border: 'rgba(239,68,68,0.4)' };
};

const TrustBadge = ({ score, size = 'sm', position }) => {
  const t = trustTier(score);
  const compact = size === 'sm';
  return (
    <div style={{
      position: position || 'absolute', bottom: 12, right: 12, zIndex: 3,
      background: 'rgba(15,20,25,0.92)', backdropFilter: 'blur(8px)',
      border: `1px solid ${t.border}`, borderRadius: compact ? 8 : 10,
      padding: compact ? '5px 9px' : '8px 12px',
      display: 'flex', alignItems: 'center', gap: compact ? 6 : 8,
      boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
    }}>
      <span style={{
        fontFamily: '"JetBrains Mono", monospace',
        fontSize: compact ? 12 : 14, fontWeight: 700,
        background: t.color, color: '#fff',
        padding: compact ? '1px 6px' : '2px 8px', borderRadius: 4,
        lineHeight: 1.2,
      }}>{score}</span>
      <span style={{
        fontFamily: '"Inter", sans-serif',
        fontSize: compact ? 10 : 12, fontWeight: 600, color: t.color,
        textTransform: 'uppercase', letterSpacing: '0.04em',
      }}>{t.label}</span>
    </div>
  );
};

const CARS_FEATURED = [
  { id: 1, name: 'Honda CR-V 1.5L Turbo', year: 2022, km: 28500, price: 920000000, deal: 'great', loc: 'Q.1, HCM', variant: 'suv', tone: 'pearl', trans: 'Tự động', img: 'uploads/s02-card01-honda-crv-blue.png', alt: 'Honda CR-V 2022' },
  { id: 2, name: 'Toyota Camry 2.5Q', year: 2022, km: 34200, price: 1180000000, deal: 'great', loc: 'Q.7, HCM', variant: 'sedan', tone: 'midnight', trans: 'Tự động', img: 'uploads/s02-card02-toyota-camry-white.png', alt: 'Toyota Camry 2022' },
  { id: 3, name: 'Mazda CX-5 Premium', year: 2023, km: 18700, price: 850000000, deal: 'good', loc: 'Cầu Giấy, HN', variant: 'suv', tone: 'burgundy', trans: 'Tự động', img: 'uploads/s02-card03-mazda-cx5-red.png', alt: 'Mazda CX-5 2023' },
  { id: 4, name: 'VinFast VF8 Plus', year: 2023, km: 12400, price: 1200000000, deal: null, loc: 'Q.1, HCM', variant: 'suv', tone: 'silver', trans: 'Điện', img: 'uploads/s02-card11-vinfast-vf8-blue.png', alt: 'VinFast VF8 Plus 2023' },
];

const dealBadge = (d) => {
  if (d === 'great') return <span className="badge badge-deal">● Great Deal</span>;
  if (d === 'good') return <span className="badge badge-good">● Good Deal</span>;
  return null;
};

const CarCard = ({ car, w }) => (
  <div className="card lift car-card" style={{ width: w || '100%', overflow: 'hidden', cursor: 'pointer' }}>
    <div style={{ position: 'relative', padding: 12 }}>
      {car.img ? (
        <div className="car-card-image-wrapper" style={{ position: 'relative', borderRadius: 12, overflow: 'hidden', aspectRatio: '16/10' }}>
          <img
            src={car.img}
            alt={car.alt || car.name}
            className="vehicle-image"
            loading="lazy"
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
          {car.deal && (
            <div style={{ position: 'absolute', top: 12, left: 12, zIndex: 2 }}>
              {dealBadge(car.deal)}
            </div>
          )}
          <TrustBadge score={car.trust ?? 82} />
        </div>
      ) : (
        <CarPhoto variant={car.variant} tone={car.tone} ratio="16/10"
          badge={dealBadge(car.deal)} />
      )}
      <button style={{ position: 'absolute', top: 22, right: 22, width: 34, height: 34, borderRadius: '50%', background: 'rgba(15,20,25,0.7)', border: '1px solid var(--border)', color: 'var(--text-2)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 3 }}>
        <Ico name="heart" size={15} />
      </button>
    </div>
    <div style={{ padding: '4px 16px 18px' }}>
      <div style={{ fontSize: 16, fontWeight: 600, color: 'var(--text)', marginBottom: 4 }}>{car.name}</div>
      <div style={{ fontSize: 12, color: 'var(--text-2)', marginBottom: 12 }}>
        {car.year} • {fmt(car.km)} km • {car.trans}
      </div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
        <span className="mono" style={{ fontSize: 20, fontWeight: 700, color: 'var(--text)' }}>{fmt(car.price)} ₫</span>
      </div>
      <div style={{ fontSize: 12, color: 'var(--text-2)', marginTop: 4 }}>
        Trả góp từ <span style={{ color: 'var(--accent)' }}>{Math.round(car.price * 0.7 / 60 / 1000000 * 10) / 10}M/tháng</span>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 14, paddingTop: 14, borderTop: '1px solid var(--border)', fontSize: 12, color: 'var(--text-2)' }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><Ico name="pin" size={12} />{car.loc}</span>
        <span style={{ color: 'var(--accent)', display: 'flex', alignItems: 'center', gap: 4, fontWeight: 600 }}>
          Chi tiết <Ico name="chevron" size={12} />
        </span>
      </div>
    </div>
  </div>
);

const Screen01_Landing = () => (
  <div className="otobank" style={{ width: 1440, minHeight: 1800, background: 'var(--bg)', overflow: 'hidden' }}>
    <OtobankNav active="home" />

    {/* Hero — 50/50 split, gradient bg #0F1419 → #1A1F26 */}
    <section style={{
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      padding: '88px 48px 96px',
      gap: 56,
      alignItems: 'center',
      background: 'linear-gradient(135deg, #0F1419 0%, #1A1F26 100%)',
      minHeight: 720,
    }}>
      {/* LEFT — Content */}
      <div>
        {/* Eyebrow */}
        <div style={{
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: 11,
          fontWeight: 700,
          color: '#E85D2C',
          textTransform: 'uppercase',
          letterSpacing: '0.15em',
          marginBottom: 24,
        }}>
          ● DISTRIBUTED AUTOMOTIVE COMMERCE
        </div>

        {/* Main headline */}
        <h1 style={{
          fontFamily: '"Space Grotesk", sans-serif',
          fontSize: 60,
          fontWeight: 800,
          color: '#F5F5F5',
          lineHeight: 1.05,
          margin: 0,
          marginBottom: 24,
          letterSpacing: '-0.02em',
        }}>
          Một nền tảng —<br/>
          toàn bộ thị trường ô tô.
        </h1>

        {/* Sub-headline */}
        <p style={{
          fontFamily: '"Inter", sans-serif',
          fontSize: 22,
          fontWeight: 500,
          color: '#A0A4AB',
          margin: 0,
          marginBottom: 16,
          lineHeight: 1.35,
        }}>
          Mạng lưới phân phối · Hạ tầng niềm tin · Hệ sinh thái tài chính.
        </p>

        {/* Description */}
        <p style={{
          fontFamily: '"Inter", sans-serif',
          fontSize: 16,
          fontWeight: 400,
          color: '#A0A4AB',
          lineHeight: 1.6,
          maxWidth: 520,
          margin: 0,
          marginBottom: 36,
        }}>
          Otobank kết nối hãng xe · dealer · chủ xe ký gửi · ngân hàng · bảo hiểm và mạng lưới <strong style={{ color: '#F5F5F5' }}>Automotive Consultants</strong> & <strong style={{ color: '#F5F5F5' }}>Inventory Specialists</strong> trên một nền tảng duy nhất.
        </p>

        {/* 4 Personas CTAs — 2 primary + 2 secondary */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, maxWidth: 520 }}>
          <button style={{
            background: '#E85D2C', color: '#FFFFFF',
            padding: '16px 20px', borderRadius: 12,
            fontFamily: '"Inter", sans-serif', fontSize: 15, fontWeight: 700,
            border: 'none', cursor: 'pointer',
            display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 2,
            boxShadow: '0 8px 24px rgba(232, 93, 44, 0.25)',
          }}>
            <span style={{ fontSize: 11, fontWeight: 600, opacity: 0.85, letterSpacing: '0.04em', textTransform: 'uppercase' }}>Khách mua xe</span>
            <span>Tìm xe của bạn →</span>
          </button>
          <button style={{
            background: '#1A1F26', color: '#FFFFFF',
            padding: '16px 20px', borderRadius: 12,
            fontFamily: '"Inter", sans-serif', fontSize: 15, fontWeight: 700,
            border: '1px solid rgba(232,93,44,0.4)', cursor: 'pointer',
            display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 2,
          }}>
            <span style={{ fontSize: 11, fontWeight: 600, color: '#E85D2C', letterSpacing: '0.04em', textTransform: 'uppercase' }}>Chủ xe</span>
            <span>Ký gửi qua IS →</span>
          </button>
          <button style={{
            background: 'transparent', color: '#A0A4AB',
            padding: '14px 18px', borderRadius: 12,
            fontFamily: '"Inter", sans-serif', fontSize: 14, fontWeight: 600,
            border: '1px solid #2D343F', cursor: 'pointer',
            display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 2,
          }}>
            <span style={{ fontSize: 10, fontWeight: 600, color: '#6B7280', letterSpacing: '0.04em', textTransform: 'uppercase' }}>Sales / Chuyên viên</span>
            <span style={{ color: '#F5F5F5' }}>Trở thành AC / IS →</span>
          </button>
          <button style={{
            background: 'transparent', color: '#A0A4AB',
            padding: '14px 18px', borderRadius: 12,
            fontFamily: '"Inter", sans-serif', fontSize: 14, fontWeight: 600,
            border: '1px solid #2D343F', cursor: 'pointer',
            display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 2,
          }}>
            <span style={{ fontSize: 10, fontWeight: 600, color: '#6B7280', letterSpacing: '0.04em', textTransform: 'uppercase' }}>Dealer / Salon xe</span>
            <span style={{ color: '#F5F5F5' }}>Cổng Dealer →</span>
          </button>
        </div>
      </div>

      {/* RIGHT — Hero image */}
      <div style={{ position: 'relative', minHeight: 600 }}>
        <div style={{
          borderRadius: 16,
          overflow: 'hidden',
          position: 'relative',
          width: '100%',
          minHeight: 600,
          height: '100%',
        }}>
          <img
            src="uploads/s02-card05-vinfast-suv-white.png"
            alt="VinFast SUV"
            className="vehicle-image"
            loading="lazy"
            style={{ width: '100%', maxWidth: 720, height: '100%', minHeight: 600, objectFit: 'cover', objectPosition: 'center', borderRadius: 16, display: 'block' }}
          />
        </div>

        {/* Top-left badge: 200-point inspection */}
        <div style={{
          position: 'absolute',
          top: 24,
          left: 24,
          background: 'rgba(15, 20, 25, 0.85)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(16, 185, 129, 0.3)',
          padding: '12px 18px',
          borderRadius: 999,
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
        }}>
          <span style={{ fontSize: 16, lineHeight: 1 }}>✅</span>
          <span style={{ fontFamily: '"Inter", sans-serif', fontSize: 14, fontWeight: 600, color: '#F5F5F5' }}>
            Inspection 200 điểm
          </span>
        </div>

        {/* Bottom-right badge: Trust Score */}
        <div style={{
          position: 'absolute',
          bottom: 24,
          right: 24,
          background: 'rgba(15, 20, 25, 0.85)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(232, 93, 44, 0.4)',
          padding: '12px 18px',
          borderRadius: 999,
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
        }}>
          <span style={{
            fontFamily: '"JetBrains Mono", monospace', fontSize: 13, fontWeight: 700,
            background: '#E85D2C', color: '#fff', padding: '2px 8px', borderRadius: 6,
          }}>92</span>
          <span style={{ fontFamily: '"Inter", sans-serif', fontSize: 14, fontWeight: 600, color: '#F5F5F5' }}>
            Trust Score
          </span>
        </div>
      </div>
    </section>

    {/* Trust bar — orange tint */}
    <section style={{
      background: 'rgba(232, 93, 44, 0.05)',
      padding: '24px 48px',
      borderTop: '1px solid #2D343F',
      borderBottom: '1px solid #2D343F',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 32, flexWrap: 'wrap' }}>
        <span style={{ fontFamily: '"Inter", sans-serif', fontSize: 14, fontWeight: 500, color: '#A0A4AB' }}>
          Đối tác tài chính:
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
          {['VPBank', 'Techcombank', 'VIB', 'Shinhan Bank'].map(b => (
            <div key={b} style={{
              width: 100,
              height: 32,
              background: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid #2D343F',
              borderRadius: 6,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: '"Inter", sans-serif',
              fontSize: 12,
              fontWeight: 600,
              color: '#F5F5F5',
              letterSpacing: '0.02em',
            }}>
              {b}
            </div>
          ))}
        </div>
        <span style={{
          marginLeft: 'auto',
          fontFamily: '"Inter", sans-serif',
          fontSize: 14,
          fontWeight: 500,
          color: '#F5F5F5',
        }}>
          Tin tưởng bởi <strong style={{ color: '#E85D2C', fontWeight: 700 }}>5,000+</strong> khách hàng
        </span>
      </div>
    </section>

    {/* Featured cars — Xe nổi bật hôm nay */}
    <section style={{ padding: '80px 0', maxWidth: 1280, margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', padding: '0 48px' }}>
        <div>
          <h2 style={{
            fontFamily: '"Space Grotesk", sans-serif',
            fontSize: 32,
            fontWeight: 700,
            color: '#F5F5F5',
            margin: 0,
            letterSpacing: '-0.02em',
          }}>
            Xe nổi bật hôm nay
          </h2>
          <p style={{
            fontFamily: '"Inter", sans-serif',
            fontSize: 16,
            color: '#A0A4AB',
            margin: 0,
            marginTop: 8,
          }}>
            Đã kiểm định và sẵn sàng giao trong 24h
          </p>
        </div>
        <a style={{
          fontFamily: '"Inter", sans-serif',
          fontSize: 16,
          fontWeight: 600,
          color: '#E85D2C',
          cursor: 'pointer',
          marginTop: 6,
        }}>
          Xem tất cả 2,000+ xe →
        </a>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: 20,
        padding: '40px 48px 0',
      }}>
        {[
          { name: 'Honda CR-V 1.5L Turbo', year: 2022, km: '28,500', trans: 'Tự động', price: '920,000,000', installment: '9.8M', loc: 'HCM', deal: 'great', variant: 'suv', tone: 'pearl', img: 'uploads/s02-card01-honda-crv-blue.png', alt: 'Honda CR-V', trust: 92 },
          { name: 'Toyota Camry 2.5Q', year: 2022, km: '34,200', trans: 'Tự động', price: '1,180,000,000', installment: '12.5M', loc: 'HCM', deal: 'great', variant: 'sedan', tone: 'midnight', img: 'uploads/s02-card02-toyota-camry-white.png', alt: 'Toyota Camry', trust: 95 },
          { name: 'Mazda CX-5 Premium', year: 2023, km: '18,700', trans: 'Tự động', price: '850,000,000', installment: '9.0M', loc: 'HN', deal: 'good', variant: 'suv', tone: 'burgundy', img: 'uploads/s02-card03-mazda-cx5-red.png', alt: 'Mazda CX-5', trust: 88 },
          { name: 'VinFast VF8 Plus', year: 2023, km: '12,400', trans: 'Điện', price: '1,200,000,000', installment: '12.7M', loc: 'HCM', deal: null, variant: 'suv', tone: 'silver', img: 'uploads/s02-card11-vinfast-vf8-blue.png', alt: 'VinFast VF8', trust: 91 },
        ].map((c, i) => (
          <div key={i}
            style={{
              background: '#1A1F26',
              borderRadius: 16,
              overflow: 'hidden',
              cursor: 'pointer',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.02)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.3)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = 'none'; }}
          >
            {/* Image area */}
            <div className={c.img ? 'car-card-image-wrapper' : ''} style={{ position: 'relative', aspectRatio: '4 / 3' }}>
              {c.img ? (
                <img
                  src={c.img}
                  alt={c.alt || c.name}
                  className="vehicle-image"
                  loading="lazy"
                  style={{ width: '100%', height: 240, objectFit: 'cover', borderTopLeftRadius: 12, borderTopRightRadius: 12, display: 'block' }}
                />
              ) : (
                <CarPhoto variant={c.variant} tone={c.tone} ratio="4/3" />
              )}

              {/* Deal badge top-left */}
              {c.deal === 'great' && (
                <span style={{
                  position: 'absolute', top: 12, left: 12,
                  background: '#10B981', color: '#FFFFFF',
                  padding: '5px 11px', borderRadius: 999,
                  fontFamily: '"Inter", sans-serif', fontSize: 11, fontWeight: 700,
                  display: 'inline-flex', alignItems: 'center', gap: 4,
                }}>
                  🟢 Great Deal
                </span>
              )}
              {c.deal === 'good' && (
                <span style={{
                  position: 'absolute', top: 12, left: 12,
                  background: '#3B82F6', color: '#FFFFFF',
                  padding: '5px 11px', borderRadius: 999,
                  fontFamily: '"Inter", sans-serif', fontSize: 11, fontWeight: 700,
                }}>
                  🔵 Good Deal
                </span>
              )}

              {/* Heart top-right */}
              <button style={{
                position: 'absolute', top: 12, right: 12,
                width: 32, height: 32, borderRadius: '50%',
                background: 'rgba(15,20,25,0.7)',
                border: '1px solid #2D343F',
                color: '#FFFFFF',
                cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
              onMouseEnter={e => { e.currentTarget.style.color = '#E85D2C'; }}
              onMouseLeave={e => { e.currentTarget.style.color = '#FFFFFF'; }}
              >
                <Ico name="heart" size={14} />
              </button>

              {/* Trust Score badge bottom-right */}
              <TrustBadge score={c.trust ?? 82} />
            </div>

            {/* Content */}
            <div style={{ padding: 16 }}>
              <div style={{
                fontFamily: '"Space Grotesk", sans-serif',
                fontSize: 18, fontWeight: 700,
                color: '#F5F5F5',
                marginBottom: 4,
              }}>
                {c.name}
              </div>
              <div style={{
                fontFamily: '"Inter", sans-serif',
                fontSize: 13, color: '#A0A4AB',
                marginBottom: 12,
              }}>
                {c.year} • {c.km} km • {c.trans}
              </div>

              {/* Price */}
              <div style={{
                fontFamily: '"Space Grotesk", sans-serif',
                fontSize: 22, fontWeight: 800,
                color: '#E85D2C',
                lineHeight: 1.1,
              }}>
                {c.price} ₫
              </div>
              <div style={{
                fontFamily: '"Inter", sans-serif',
                fontSize: 13, color: '#A0A4AB',
                marginTop: 4,
                marginBottom: 12,
              }}>
                Trả góp từ {c.installment}/tháng
              </div>

              {/* Footer */}
              <div style={{
                fontFamily: '"Inter", sans-serif',
                fontSize: 13, color: '#A0A4AB',
              }}>
                📍 {c.loc}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>

    {/* USP section — Tại sao chọn Otobank */}
    <section style={{ padding: '96px 48px 80px' }}>
      <h2 style={{
        fontFamily: '"Space Grotesk", sans-serif',
        fontSize: 40,
        fontWeight: 700,
        color: '#F5F5F5',
        textAlign: 'center',
        margin: 0,
        marginBottom: 16,
        letterSpacing: '-0.02em',
      }}>
        Tại sao mua xe tại Otobank?
      </h2>
      <p style={{
        fontFamily: '"Inter", sans-serif',
        fontSize: 18,
        fontWeight: 400,
        color: '#A0A4AB',
        textAlign: 'center',
        margin: 0,
        marginBottom: 64,
      }}>
        Khác với salon truyền thống, Otobank cam kết:
      </p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 24,
        maxWidth: 1200,
        margin: '0 auto',
      }}>
        {[
          { icon: '🔍', title: 'Kiểm định 200 điểm', body: 'Mọi xe đều qua quy trình chuẩn US, báo cáo công khai từng vết trầy. Không có chỗ để giấu.' },
          { icon: '🔄', title: '7 ngày đổi trả', body: 'Lái thử 7 ngày, 1,000km. Không hài lòng? Hoàn tiền 100%. Cam kết bằng văn bản.' },
          { icon: '🚚', title: 'Giao tận nhà 24h', body: 'Trong nội thành HCM/HN, xe đến nhà bạn trong 24-48 giờ. Bạn không phải đi đâu.' },
        ].map(u => (
          <div key={u.title}
            className="usp-card"
            style={{
              background: '#1A1F26',
              border: '1px solid #2D343F',
              padding: '40px 32px',
              borderRadius: 16,
              transition: 'transform 0.2s ease, border-color 0.2s ease',
              cursor: 'pointer',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.borderColor = '#E85D2C'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = '#2D343F'; }}
          >
            <div style={{
              width: 80,
              height: 80,
              borderRadius: '50%',
              background: 'rgba(232, 93, 44, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 24,
              fontSize: 48,
              lineHeight: 1,
            }}>
              {u.icon}
            </div>
            <h3 style={{
              fontFamily: '"Space Grotesk", sans-serif',
              fontSize: 24,
              fontWeight: 700,
              color: '#F5F5F5',
              margin: 0,
              marginBottom: 12,
            }}>
              {u.title}
            </h3>
            <p style={{
              fontFamily: '"Inter", sans-serif',
              fontSize: 16,
              fontWeight: 400,
              color: '#A0A4AB',
              lineHeight: 1.6,
              margin: 0,
            }}>
              {u.body}
            </p>
          </div>
        ))}
      </div>
    </section>

    <OtobankFooter />
  </div>
);

// Browse inventory — order locked to filename mapping (s02-card01..s02-card12)
const CARS_GRID = [
  { id: 1,  name: 'Honda CR-V 1.5L Turbo', year: 2021, km: 42100, price: 920000000,  deal: 'great', loc: 'Bình Tân, HCM',     variant: 'suv',    tone: 'pearl',    trans: 'Tự động', img: 'uploads/s02-card01-honda-crv-blue.png',        alt: 'Honda CR-V', trust: 92 },
  { id: 2,  name: 'Toyota Camry 2.5Q',     year: 2022, km: 28500, price: 1180000000, deal: 'great', loc: 'Q.1, HCM',          variant: 'sedan',  tone: 'midnight', trans: 'Tự động', img: 'uploads/s02-card02-toyota-camry-white.png',     alt: 'Toyota Camry', trust: 95 },
  { id: 3,  name: 'Mazda CX-5 Premium',    year: 2023, km: 18700, price: 850000000,  deal: 'good',  loc: 'Cầu Giấy, HN',      variant: 'suv',    tone: 'burgundy', trans: 'Tự động', img: 'uploads/s02-card03-mazda-cx5-red.png',          alt: 'Mazda CX-5', trust: 88 },
  { id: 4,  name: 'Ford Ranger Wildtrak',  year: 2022, km: 38200, price: 990000000,  deal: null,    loc: 'Q.7, HCM',          variant: 'pickup', tone: 'silver',   trans: 'Tự động', img: 'uploads/s02-card04-ford-ranger-blue.png',       alt: 'Ford Ranger', trust: 78 },
  { id: 5,  name: 'VinFast Lux SA2.0',     year: 2022, km: 21400, price: 1020000000, deal: 'great', loc: 'Long Biên, HN',     variant: 'suv',    tone: 'pearl',    trans: 'Tự động', img: 'uploads/s02-card05-vinfast-suv-white.png',      alt: 'VinFast SUV', trust: 90 },
  { id: 6,  name: 'Kia Seltos 1.6L',       year: 2023, km: 14200, price: 690000000,  deal: 'good',  loc: 'Tân Bình, HCM',     variant: 'suv',    tone: 'silver',   trans: 'Tự động', img: 'uploads/s02-card06-kia-seltos-silver.png',      alt: 'Kia Seltos', trust: 85 },
  { id: 7,  name: 'Hyundai Tucson 2.0',    year: 2022, km: 32100, price: 880000000,  deal: 'good',  loc: 'Hải Châu, ĐN',      variant: 'suv',    tone: 'midnight', trans: 'Tự động', img: 'uploads/s02-card07-hyundai-tucson-gray.png',    alt: 'Hyundai Tucson', trust: 82 },
  { id: 8,  name: 'Mercedes-Benz C200',    year: 2020, km: 48700, price: 1420000000, deal: null,    loc: 'Q.1, HCM',          variant: 'sedan',  tone: 'midnight', trans: 'Tự động', img: 'uploads/s02-card08-mercedes-c-black.png',       alt: 'Mercedes C-Class', trust: 72 },
  { id: 9,  name: 'Toyota Innova 2.0V',    year: 2021, km: 56300, price: 750000000,  deal: 'great', loc: 'Hai Bà Trưng, HN',  variant: 'suv',    tone: 'silver',   trans: 'Tự động', img: 'uploads/s02-card09-toyota-innova-silver.png',   alt: 'Toyota Innova', trust: 76 },
  { id: 10, name: 'Mazda 3 1.5L',          year: 2022, km: 24500, price: 620000000,  deal: 'good',  loc: 'Thủ Đức, HCM',      variant: 'sedan',  tone: 'burgundy', trans: 'Tự động', img: 'uploads/s02-card10-mazda3-red.png',             alt: 'Mazda 3', trust: 84 },
  { id: 11, name: 'VinFast VF8 Plus',      year: 2023, km: 12400, price: 1200000000, deal: null,    loc: 'Q.1, HCM',          variant: 'suv',    tone: 'midnight', trans: 'Điện',    img: 'uploads/s02-card11-vinfast-vf8-blue.png',       alt: 'VinFast VF8', trust: 91 },
  { id: 12, name: 'Honda City RS',         year: 2022, km: 31800, price: 580000000,  deal: 'great', loc: 'Q.7, HCM',          variant: 'sedan',  tone: 'pearl',    trans: 'Tự động', img: 'uploads/s02-card12-honda-city-white.png',       alt: 'Honda City', trust: 87 },
];

const FilterSection = ({ title, children }) => (
  <div style={{ paddingBottom: 18, marginBottom: 18, borderBottom: '1px solid var(--border)' }}>
    <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)', marginBottom: 12 }}>{title}</div>
    {children}
  </div>
);

const Screen02_Browse = () => (
  <div className="otobank" style={{ width: 1440, minHeight: 1500, background: 'var(--bg)' }}>
    <OtobankNav active="buy" />

    <div style={{ padding: '20px 48px 12px', display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'var(--text-2)' }}>
      <span>Trang chủ</span> <Ico name="chevron" size={11} />
      <span>Mua xe</span> <Ico name="chevron" size={11} />
      <span style={{ color: 'var(--text)' }}>Tất cả xe</span>
    </div>

    <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: 28, padding: '12px 48px 60px' }}>
      {/* Sidebar */}
      <aside className="card" style={{ padding: 22, height: 'fit-content', position: 'sticky', top: 100 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
          <div style={{ fontSize: 15, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8 }}>
            <Ico name="filter" size={14} /> Bộ lọc
          </div>
          <span style={{ fontSize: 12, color: 'var(--accent)' }}>Đặt lại</span>
        </div>

        <FilterSection title="Trust Score">
          {[
            { l: 'Otobank Certified', range: '≥ 90', count: 412, color: '#10B981', selected: true },
            { l: 'Verified', range: '75–89', count: 1840, color: '#E85D2C', selected: true },
            { l: 'Standard', range: '60–74', count: 720, color: '#A0A4AB', selected: false },
          ].map((t, i) => (
            <label key={t.l} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '7px 0', fontSize: 13, color: 'var(--text-2)', cursor: 'pointer' }}>
              <span style={{ width: 16, height: 16, borderRadius: 4, border: '1.5px solid var(--border)', background: t.selected ? t.color : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {t.selected && <Ico name="check" size={11} />}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 6, flex: 1, color: t.selected ? 'var(--text)' : 'var(--text-2)' }}>
                <span style={{ display: 'inline-block', width: 6, height: 6, borderRadius: '50%', background: t.color }} />
                {t.l}
                <span className="mono" style={{ fontSize: 11, color: 'var(--text-3)', marginLeft: 'auto' }}>{t.range}</span>
              </span>
            </label>
          ))}
          <div style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 8, lineHeight: 1.5 }}>
            Score = Documentation 25% + Inspection 30% + History 25% + Source 20%
          </div>
        </FilterSection>

        <FilterSection title="Nguồn xe">
          {[
            { l: 'OEM / Hãng xe', count: 124 },
            { l: 'Certified Dealer', count: 856 },
            { l: 'Verified Owner (qua IS)', count: 320 },
            { l: 'Bank Liquidation', count: 48 },
          ].map(s => (
            <label key={s.l} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '6px 0', fontSize: 13, color: 'var(--text-2)', cursor: 'pointer' }}>
              <span style={{ width: 16, height: 16, borderRadius: 4, border: '1.5px solid var(--border)' }} />
              <span style={{ flex: 1 }}>{s.l}</span>
              <span className="mono" style={{ fontSize: 11, color: 'var(--text-3)' }}>{s.count}</span>
            </label>
          ))}
        </FilterSection>

        <FilterSection title="Hãng xe">
          {['Toyota (412)', 'Honda (287)', 'Mazda (198)', 'Ford (134)', 'Hyundai (167)', 'Kia (145)', 'VinFast (98)', 'Mercedes-Benz (74)'].map((b, i) => (
            <label key={b} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '6px 0', fontSize: 13, color: 'var(--text-2)', cursor: 'pointer' }}>
              <span style={{ width: 16, height: 16, borderRadius: 4, border: '1.5px solid var(--border)', background: i < 2 ? 'var(--accent)' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {i < 2 && <Ico name="check" size={11} />}
              </span>
              <span style={{ color: i < 2 ? 'var(--text)' : 'var(--text-2)' }}>{b}</span>
            </label>
          ))}
        </FilterSection>

        <FilterSection title="Khoảng giá">
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'var(--text-2)', marginBottom: 8 }}>
            <span className="mono">200M ₫</span><span className="mono">2 tỷ ₫</span>
          </div>
          <div style={{ position: 'relative', height: 4, background: 'var(--surface-2)', borderRadius: 2 }}>
            <div style={{ position: 'absolute', left: '15%', right: '40%', height: 4, background: 'var(--accent)', borderRadius: 2 }} />
            <div style={{ position: 'absolute', left: '15%', top: -5, width: 14, height: 14, borderRadius: '50%', background: 'var(--accent)', transform: 'translateX(-50%)' }} />
            <div style={{ position: 'absolute', left: '60%', top: -5, width: 14, height: 14, borderRadius: '50%', background: 'var(--accent)', transform: 'translateX(-50%)' }} />
          </div>
          <div className="mono" style={{ fontSize: 13, color: 'var(--text)', marginTop: 12, textAlign: 'center' }}>500M – 1,2 tỷ ₫</div>
        </FilterSection>

        <FilterSection title="Năm sản xuất">
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {['2024', '2023', '2022', '2021', '2020', '<2020'].map((y, i) => (
              <span key={y} style={{ fontSize: 12, padding: '6px 10px', borderRadius: 6, border: '1px solid var(--border)', background: i === 2 ? 'var(--accent)' : 'transparent', color: i === 2 ? '#fff' : 'var(--text-2)', cursor: 'pointer' }}>{y}</span>
            ))}
          </div>
        </FilterSection>

        <FilterSection title="Hộp số">
          <div style={{ display: 'flex', gap: 6 }}>
            <span style={{ flex: 1, fontSize: 12, padding: '8px 10px', borderRadius: 6, border: '1px solid var(--accent)', background: 'rgba(232,93,44,0.1)', color: 'var(--accent)', textAlign: 'center', cursor: 'pointer' }}>Tự động</span>
            <span style={{ flex: 1, fontSize: 12, padding: '8px 10px', borderRadius: 6, border: '1px solid var(--border)', color: 'var(--text-2)', textAlign: 'center', cursor: 'pointer' }}>Số sàn</span>
          </div>
        </FilterSection>

        <FilterSection title="Nhiên liệu">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
            {['Xăng', 'Dầu', 'Hybrid', 'Điện'].map(f => (
              <span key={f} style={{ fontSize: 12, padding: '8px 10px', borderRadius: 6, border: '1px solid var(--border)', color: 'var(--text-2)', textAlign: 'center', cursor: 'pointer' }}>{f}</span>
            ))}
          </div>
        </FilterSection>

        <button className="btn btn-primary" style={{ width: '100%', marginTop: 6 }}>Áp dụng (12 xe)</button>
      </aside>

      {/* Main grid */}
      <main>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 22 }}>
          <div>
            <h1 style={{ fontSize: 28, margin: 0 }}>Xe đã kiểm định</h1>
            <div style={{ fontSize: 13, color: 'var(--text-2)', marginTop: 4 }}>
              Hiển thị <strong style={{ color: 'var(--text)' }}>12 / 12 xe</strong> • Cập nhật 2 phút trước
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 14px', border: '1px solid var(--border)', borderRadius: 8, fontSize: 13, color: 'var(--text)' }}>
              <span style={{ color: 'var(--text-2)' }}>Sắp xếp:</span> Nổi bật <Ico name="chevronDown" size={12} />
            </div>
            <div style={{ display: 'flex', border: '1px solid var(--border)', borderRadius: 8, overflow: 'hidden' }}>
              <span style={{ padding: '9px 12px', background: 'var(--surface-2)', color: 'var(--text)', borderRight: '1px solid var(--border)' }}><Ico name="grid" size={14} /></span>
              <span style={{ padding: '9px 12px', color: 'var(--text-2)' }}><Ico name="list" size={14} /></span>
            </div>
          </div>
        </div>

        {/* Active filter chips */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 22, flexWrap: 'wrap' }}>
          {['Toyota ×', 'Honda ×', '500M – 1,2 tỷ ×', '2022 ×', 'Tự động ×'].map(c => (
            <span key={c} style={{ fontSize: 12, padding: '6px 12px', borderRadius: 999, background: 'var(--surface-2)', border: '1px solid var(--border)', color: 'var(--text)' }}>{c}</span>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
          {CARS_GRID.map(c => <CarCard key={c.id} car={c} />)}
        </div>

        {/* End-of-list counter — only 1 page (12/12) */}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 36, fontSize: 14, color: 'rgba(255,255,255,0.6)' }}>
          Hiển thị 12 / 12 xe
        </div>
      </main>
    </div>
  </div>
);

Object.assign(window, { Screen01_Landing, Screen02_Browse, CarCard });
