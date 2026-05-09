// Screen 05 — Checkout / Order Summary
// Screen 06 — Sell My Car (AI Valuation)
// Screen 07 — Pre-approval Financing
// Screen 08 — Mobile App Home

const Stepper = ({ steps, current }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
    {steps.map((s, i) => {
      const done = i < current;
      const active = i === current;
      return (
        <React.Fragment key={i}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 32, height: 32, borderRadius: '50%',
              background: done ? 'var(--success)' : active ? 'var(--accent)' : 'var(--surface-2)',
              color: done || active ? '#fff' : 'var(--text-3)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 13, fontWeight: 700, border: active ? '2px solid var(--accent)' : 'none',
            }}>
              {done ? <Ico name="check" size={14} /> : i + 1}
            </div>
            <span style={{ fontSize: 14, fontWeight: active ? 600 : 500, color: active ? 'var(--text)' : done ? 'var(--text-2)' : 'var(--text-3)' }}>{s}</span>
          </div>
          {i < steps.length - 1 && <div style={{ flex: 1, height: 1, background: done ? 'var(--success)' : 'var(--border)', margin: '0 18px' }} />}
        </React.Fragment>
      );
    })}
  </div>
);

const Screen05_Checkout = () => (
  <div className="otobank" style={{ width: 1440, minHeight: 1500, background: 'var(--bg)' }}>
    <OtobankNav active="buy" />

    <div style={{ padding: '32px 80px 16px', maxWidth: 1280, margin: '0 auto' }}>
      <Stepper steps={['Chọn xe', 'Tài chính', 'Thông tin giao xe', 'Xác nhận']} current={3} />
    </div>

    <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 28, padding: '24px 80px 80px', maxWidth: 1280, margin: '0 auto' }}>
      {/* Left — Order details */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {/* Vehicle */}
        <div className="card" style={{ padding: 24 }}>
          <div style={{ fontSize: 12, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 12 }}>Đơn hàng của bạn</div>
          <div style={{ display: 'grid', gridTemplateColumns: '180px 1fr auto', gap: 18, alignItems: 'center' }}>
            <div style={{ width: 180, aspectRatio: '4/3', borderRadius: 10, overflow: 'hidden' }}>
              <img src="uploads/s02-card01-honda-crv-blue.png" alt="Honda CR-V 2022" className="vehicle-image" loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            </div>
            <div>
              <div style={{ fontSize: 18, fontWeight: 600 }}>Honda CR-V 1.5L Turbo</div>
              <div style={{ fontSize: 13, color: 'var(--text-2)', marginTop: 4 }}>2022 • 28,500 km • Tự động • Xăng • Trắng ngọc trai</div>
              <div className="mono" style={{ fontSize: 22, fontWeight: 700, marginTop: 10 }}>920,000,000 ₫</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 13 }}>
              <a style={{ color: 'var(--accent)' }}>Thay đổi</a>
              <a style={{ color: 'var(--text-3)' }}>Xóa</a>
            </div>
          </div>
        </div>

        {/* Delivery */}
        <div className="card" style={{ padding: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <Ico name="truck" size={18} />
              <div style={{ fontSize: 16, fontWeight: 600 }}>Thông tin giao xe</div>
            </div>
            <a style={{ fontSize: 13, color: 'var(--accent)' }}>Chỉnh sửa</a>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>
            {[
              ['Người nhận', 'Anh Nguyễn Minh Tuấn'],
              ['Số điện thoại', '0901 234 567'],
              ['Địa chỉ giao xe', 'Số 123 Nguyễn Trãi, P. Bến Thành, Q.1, TP. HCM'],
              ['Thời gian', 'Thứ 6, 16/05/2026 lúc 9:00 sáng'],
            ].map(([k, v]) => (
              <div key={k}>
                <div style={{ fontSize: 12, color: 'var(--text-3)', marginBottom: 4 }}>{k}</div>
                <div style={{ fontSize: 14, color: 'var(--text)', fontWeight: 500 }}>{v}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Financing */}
        <div className="card" style={{ padding: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <Ico name="bank" size={18} />
              <div style={{ fontSize: 16, fontWeight: 600 }}>Tài chính</div>
            </div>
            <a style={{ fontSize: 13, color: 'var(--accent)' }}>So sánh các gói</a>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr auto', gap: 16, alignItems: 'center', padding: '14px 16px', background: 'var(--surface-2)', borderRadius: 10 }}>
            <BankLogo name="VPBank" w={84} />
            <div>
              <div style={{ fontSize: 14, fontWeight: 600 }}>VPBank — Gói Auto Plus</div>
              <div style={{ fontSize: 12, color: 'var(--text-2)', marginTop: 2 }}>Lãi suất 8.5%/năm cố định 24 tháng đầu • 60 tháng</div>
            </div>
            <span className="badge badge-deal">✓ APPROVED</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, marginTop: 14 }}>
            {[
              ['Down payment (30%)', '286,000,000 ₫'],
              ['Trả hàng tháng', '11,200,000 ₫'],
              ['Tổng lãi 60 tháng', '~ 183,000,000 ₫'],
            ].map(([k, v]) => (
              <div key={k} style={{ padding: '12px 14px', background: 'var(--surface-2)', borderRadius: 8 }}>
                <div style={{ fontSize: 11, color: 'var(--text-3)', textTransform: 'uppercase' }}>{k}</div>
                <div className="mono" style={{ fontSize: 15, fontWeight: 600, marginTop: 4 }}>{v}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Add-ons */}
        <div className="card" style={{ padding: 24 }}>
          <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 14, display: 'flex', alignItems: 'center', gap: 10 }}>
            <Ico name="plus" size={18} /> Dịch vụ bổ sung
          </div>
          {[
            { c: true, t: 'Bảo hành mở rộng 1 năm', d: 'Bảo hành điện + động cơ + hộp số', p: 12000000 },
            { c: true, t: 'Bảo hiểm vật chất', d: 'PVI — bảo vệ va chạm, mất cắp, thiên tai', p: 18000000 },
            { c: false, t: 'Bảo hiểm TNDS bắt buộc', d: 'Bắt buộc theo luật giao thông VN', p: 5000000 },
            { c: false, t: 'Gói bảo dưỡng 24 tháng', d: '4 lần thay dầu + 2 lần kiểm tra tổng quát', p: 9500000 },
          ].map(s => (
            <div key={s.t} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '12px 0', borderBottom: '1px solid var(--border)' }}>
              <span style={{ width: 18, height: 18, borderRadius: 4, border: '1.5px solid var(--border)', background: s.c ? 'var(--accent)' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', flex: '0 0 auto' }}>
                {s.c && <Ico name="check" size={12} />}
              </span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 500, color: s.c ? 'var(--text)' : 'var(--text-2)' }}>{s.t}</div>
                <div style={{ fontSize: 12, color: 'var(--text-3)' }}>{s.d}</div>
              </div>
              <div className="mono" style={{ fontSize: 14, fontWeight: 600, color: s.c ? 'var(--text)' : 'var(--text-3)' }}>+ {fmt(s.p)} ₫</div>
            </div>
          ))}
        </div>
      </div>

      {/* Right — Sticky payment summary */}
      <aside>
        <div className="card" style={{ padding: 24, position: 'sticky', top: 100 }}>
          <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 18, display: 'flex', alignItems: 'center', gap: 10 }}>
            <Ico name="dollar" size={18} /> Tóm tắt thanh toán
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 16 }}>
            {[
              ['Giá xe', '920,000,000 ₫'],
              ['Phí sang tên + biển số', '3,000,000 ₫'],
              ['Bảo hành mở rộng 1 năm', '12,000,000 ₫'],
              ['Bảo hiểm vật chất (PVI)', '18,000,000 ₫'],
            ].map(([k, v]) => (
              <div key={k} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
                <span style={{ color: 'var(--text-2)' }}>{k}</span>
                <span className="mono" style={{ color: 'var(--text)' }}>{v}</span>
              </div>
            ))}
          </div>

          <div style={{ borderTop: '1px solid var(--border)', paddingTop: 16, marginBottom: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <span style={{ fontSize: 14, color: 'var(--text-2)' }}>Tổng thanh toán</span>
              <span className="mono" style={{ fontSize: 28, fontWeight: 700, color: 'var(--text)' }}>953,000,000 ₫</span>
            </div>
            <div style={{ fontSize: 12, color: 'var(--text-2)', marginTop: 4, textAlign: 'right' }}>
              Hoặc trả góp <span style={{ color: 'var(--accent)', fontWeight: 600 }}>11.2M/tháng × 60 tháng</span>
            </div>
          </div>

          <div style={{ background: 'var(--surface-2)', borderRadius: 10, padding: 14, marginBottom: 16 }}>
            <div style={{ fontSize: 12, color: 'var(--text-3)', textTransform: 'uppercase', marginBottom: 6 }}>Hôm nay bạn cần đặt cọc</div>
            <div className="mono" style={{ fontSize: 24, fontWeight: 700, color: 'var(--accent)' }}>5,000,000 ₫</div>
            <div style={{ fontSize: 12, color: 'var(--text-2)', marginTop: 4 }}>Số còn lại thanh toán khi nhận xe</div>
          </div>

          {/* Trust */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}>
            {[
              ['lock', 'Bảo mật end-to-end SSL 256-bit'],
              ['refresh', 'Hoàn cọc 100% nếu hủy trong 24h'],
              ['shield', '7 ngày đổi trả sau khi nhận xe'],
            ].map(([i, t]) => (
              <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 12, color: 'var(--text-2)' }}>
                <span style={{ color: 'var(--success)' }}><Ico name={i} size={13} /></span>{t}
              </div>
            ))}
          </div>

          <label style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 12, color: 'var(--text-2)', marginBottom: 14, cursor: 'pointer' }}>
            <span style={{ width: 16, height: 16, borderRadius: 4, background: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', flex: '0 0 auto', marginTop: 1 }}>
              <Ico name="check" size={11} />
            </span>
            <span>Tôi đồng ý với <a style={{ color: 'var(--accent)' }}>Điều khoản sử dụng</a> và <a style={{ color: 'var(--accent)' }}>Chính sách bảo mật</a> của Otobank</span>
          </label>

          <button className="btn btn-primary" style={{ width: '100%', padding: 16, fontSize: 15 }}>
            <Ico name="lock" size={16} /> Đặt cọc 5,000,000 ₫
          </button>
          <div style={{ fontSize: 11, color: 'var(--text-3)', textAlign: 'center', marginTop: 10 }}>
            Thanh toán qua VNPay • Momo • Internet Banking
          </div>
        </div>
      </aside>
    </div>
  </div>
);

// ─────────────────────────────────────────────────────────
// Screen 06 — Sell My Car (AI Valuation)

const Screen06_Sell = () => (
  <div className="otobank" style={{ width: 1440, minHeight: 1500, background: 'var(--bg)' }}>
    <OtobankNav active="sell" />

    <div style={{ padding: '32px 80px 16px', maxWidth: 1180, margin: '0 auto' }}>
      <Stepper steps={['Thông tin xe', 'AI phân tích', 'Báo giá']} current={2} />
    </div>

    <div style={{ padding: '24px 80px 60px', maxWidth: 1180, margin: '0 auto' }}>
      {/* Hero result */}
      <div className="card" style={{ padding: 48, textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 0%, rgba(232,93,44,0.12), transparent 60%)', pointerEvents: 'none' }} />
        <div style={{ position: 'relative' }}>
          <div className="badge badge-deal" style={{ marginBottom: 18 }}>
            <Ico name="sparkles" size={12} /> AI Pricing Engine v2.4 • Phân tích trong 4.2 giây
          </div>
          <div style={{ fontSize: 14, color: 'var(--text-2)', marginBottom: 6 }}>Báo giá cam kết của Otobank cho xe của bạn</div>
          <div className="mono display" style={{ fontSize: 84, fontWeight: 800, color: 'var(--accent)', letterSpacing: '-0.04em', lineHeight: 1, marginBottom: 12 }}>
            580,000,000 ₫
          </div>
          <div style={{ fontSize: 16, color: 'var(--text)', marginBottom: 24 }}>
            Toyota Vios 1.5G AT 2021 • 35,000 km • Bạc ánh kim
          </div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '8px 16px', borderRadius: 999, background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.3)', color: 'var(--success)', fontSize: 13, fontWeight: 600, marginBottom: 28 }}>
            <Ico name="lock" size={14} /> Cam kết: nhận tiền trong 24h hoặc 250km
          </div>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
            <button className="btn btn-primary" style={{ padding: '16px 28px', fontSize: 15 }}>
              <Ico name="calendar" size={16} /> Đặt lịch nhân viên đến kiểm tra
            </button>
            <button className="btn btn-outline" style={{ padding: '16px 24px', fontSize: 15 }}>
              <Ico name="info" size={16} /> Xem chi tiết phân tích
            </button>
          </div>
        </div>
      </div>

      {/* 2-col analysis */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginTop: 24 }}>
        {/* Left — AI breakdown */}
        <div className="card" style={{ padding: 28 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
            <Ico name="sparkles" size={18} /> <h3 style={{ margin: 0, fontSize: 18 }}>Cách AI tính ra 580M ₫</h3>
          </div>
          <p style={{ fontSize: 13, color: 'var(--text-2)', marginTop: 4, marginBottom: 18 }}>
            Mỗi giá trị được tính minh bạch — không có giá ép, không salon trung gian.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {[
              { l: 'Giá baseline (12,847 giao dịch tương tự, 90 ngày)', v: '+595M ₫', neutral: true },
              { l: 'Bonus ít km (35k vs trung bình 45k)', v: '+8M ₫', positive: true },
              { l: 'Phiên bản G (cao cấp nhất)', v: '+12M ₫', positive: true },
              { l: 'Tình trạng nội ngoại thất 4.5/5', v: '+5M ₫', positive: true },
              { l: 'Điều chỉnh xu hướng thị trường (-2% / 30 ngày)', v: '−12M ₫', negative: true },
              { l: 'Phí refurb dự kiến (đánh bóng + thay lốp)', v: '−18M ₫', negative: true },
              { l: 'Margin Otobank cam kết (transparent)', v: '−10M ₫', negative: true },
            ].map((r, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '11px 0', borderBottom: '1px solid var(--border)', fontSize: 13 }}>
                <span style={{ color: 'var(--text-2)' }}>{r.l}</span>
                <span className="mono" style={{ color: r.positive ? 'var(--success)' : r.negative ? 'var(--text-2)' : 'var(--text)', fontWeight: 600 }}>{r.v}</span>
              </div>
            ))}
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '14px 0 4px', fontSize: 14, fontWeight: 600 }}>
              <span>Final offer</span>
              <span className="mono" style={{ color: 'var(--accent)', fontSize: 20 }}>580,000,000 ₫</span>
            </div>
          </div>

          <div style={{ marginTop: 20, padding: '12px 14px', background: 'var(--surface-2)', borderRadius: 10, display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ fontSize: 12, color: 'var(--text-2)', flex: 1 }}>Độ tin cậy AI</div>
            <div style={{ flex: 2, height: 6, background: 'var(--bg)', borderRadius: 3 }}>
              <div style={{ width: '94%', height: '100%', background: 'var(--success)', borderRadius: 3 }} />
            </div>
            <div className="mono" style={{ fontSize: 14, fontWeight: 700, color: 'var(--success)' }}>94%</div>
          </div>
        </div>

        {/* Right — Channel comparison */}
        <div className="card" style={{ padding: 28 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
            <Ico name="trending" size={18} /> <h3 style={{ margin: 0, fontSize: 18 }}>So sánh các kênh bán</h3>
          </div>
          <p style={{ fontSize: 13, color: 'var(--text-2)', marginTop: 4, marginBottom: 18 }}>
            Bạn có thể nhận được bao nhiêu nếu bán xe qua các kênh khác.
          </p>

          {[
            { ch: 'Otobank (offer này)', p: '580M ₫', t: '24h', best: true },
            { ch: 'Salon truyền thống', p: '~530M ₫', t: '1-2 tuần', sub: 'Bị ép giá 8-10%' },
            { ch: 'Tự đăng Bonbanh / Chợ Tốt', p: '580 - 620M ₫*', t: '4-6 tuần', sub: 'Tốn thời gian + rủi ro show xe' },
            { ch: 'Đấu giá Vucar', p: '550 - 590M ₫', t: '24-72h', sub: 'Phí nền tảng 2%' },
          ].map(c => (
            <div key={c.ch} style={{ padding: '14px 16px', borderRadius: 10, background: c.best ? 'rgba(232,93,44,0.08)' : 'var(--surface-2)', border: c.best ? '1px solid rgba(232,93,44,0.3)' : '1px solid transparent', marginBottom: 8, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600, color: c.best ? 'var(--accent)' : 'var(--text)', display: 'flex', alignItems: 'center', gap: 8 }}>
                  {c.ch} {c.best && <span className="badge badge-deal">Bạn ở đây</span>}
                </div>
                {c.sub && <div style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 4 }}>{c.sub}</div>}
              </div>
              <div style={{ textAlign: 'right' }}>
                <div className="mono" style={{ fontSize: 15, fontWeight: 700, color: c.best ? 'var(--accent)' : 'var(--text)' }}>{c.p}</div>
                <div style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 2 }}>{c.t}</div>
              </div>
            </div>
          ))}
          <div style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 8 }}>* Giá P2P thường cao hơn nhưng tốn thời gian + rủi ro pháp lý</div>
        </div>
      </div>

      {/* Why Otobank */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginTop: 24 }}>
        {[
          { i: 'dollar', t: 'Giá fair market', d: 'AI loại bỏ trò ép giá của salon — bạn nhận đúng giá thị trường.' },
          { i: 'zap', t: 'Nhận tiền trong 24h', d: 'Không phải chờ tháng như tự bán. Chuyển khoản ngay sau khi ký HĐ.' },
          { i: 'home', t: 'Nhân viên đến tận nơi', d: 'Bạn không phải đi đâu. Kiểm tra + ký HĐ + nhận tiền tại nhà.' },
        ].map(u => (
          <div key={u.t} className="card" style={{ padding: 22 }}>
            <div style={{ width: 40, height: 40, borderRadius: 10, background: 'rgba(232,93,44,0.12)', color: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 14 }}>
              <Ico name={u.i} size={20} />
            </div>
            <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 6 }}>{u.t}</div>
            <div style={{ fontSize: 13, color: 'var(--text-2)', lineHeight: 1.5 }}>{u.d}</div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 24, padding: '14px 20px', background: 'rgba(255,184,0,0.08)', border: '1px solid rgba(255,184,0,0.25)', borderRadius: 10, display: 'flex', alignItems: 'center', gap: 12, fontSize: 13 }}>
        <Ico name="clock" size={16} /> <span style={{ color: 'var(--text-2)' }}>Báo giá có hiệu lực đến <strong style={{ color: 'var(--text)' }}>23/05/2026 23:59</strong> hoặc khi xe đi quá 250km — tuỳ điều kiện nào đến trước.</span>
      </div>
    </div>
  </div>
);

// ─────────────────────────────────────────────────────────
// Screen 07 — Pre-approval Financing

const Screen07_Financing = () => {
  const banks = [
    { n: 'VPBank', best: true, rate: '8.3%', monthly: 13200000, total: 789000000, perks: ['Lãi cố định 24 tháng đầu', 'Miễn phí trả nợ trước hạn từ tháng 13', 'Pre-approval không ảnh hưởng credit score'] },
    { n: 'Techcombank', rate: '8.5%', monthly: 13300000, total: 798000000, perks: ['Giải ngân trong 4 giờ', 'Tích điểm Loyalty 2x', 'Cashback 0.5% nếu thanh toán đúng hạn'] },
    { n: 'VIB', rate: '8.7%', monthly: 13400000, total: 806000000, perks: ['Down payment chỉ từ 20%', 'Tặng 1 năm bảo hiểm vật chất', 'eKYC 100% online'] },
  ];
  return (
    <div className="otobank" style={{ width: 1440, minHeight: 1500, background: 'var(--bg)' }}>
      <OtobankNav active="finance" />

      <div style={{ padding: '32px 80px 16px', maxWidth: 1280, margin: '0 auto' }}>
        <Stepper steps={['Thông tin', 'Thu nhập', 'Xác thực eKYC', 'Kết quả']} current={3} />
      </div>

      <div style={{ padding: '24px 80px 60px', maxWidth: 1280, margin: '0 auto' }}>
        {/* Hero */}
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div className="badge badge-deal" style={{ marginBottom: 14 }}>
            <Ico name="check" size={12} /> Pre-approval thành công trong 4 phút 18 giây
          </div>
          <h1 style={{ fontSize: 36, margin: 0 }}>3 ngân hàng đã pre-approve khoản vay của bạn</h1>
          <p style={{ fontSize: 15, color: 'var(--text-2)', marginTop: 12, maxWidth: 640, margin: '12px auto 0' }}>
            Khoản vay <strong style={{ color: 'var(--text)' }}>644,000,000 ₫</strong> (70% giá xe Honda CR-V 920M ₫) — 60 tháng. Chọn ngân hàng phù hợp với bạn.
          </p>
        </div>

        {/* Offer cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 18, marginBottom: 28 }}>
          {banks.map(b => (
            <div key={b.n} className="card" style={{
              padding: 28, position: 'relative',
              border: b.best ? '2px solid var(--accent-2)' : '1px solid var(--border)',
              background: b.best ? 'linear-gradient(180deg, rgba(255,184,0,0.06), var(--surface))' : 'var(--surface)',
            }}>
              {b.best && (
                <span className="badge badge-premium" style={{ position: 'absolute', top: -12, left: 24, padding: '6px 12px' }}>
                  <Ico name="award" size={12} /> Đề xuất tốt nhất
                </span>
              )}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
                <BankLogo name={b.n} w={120} />
                <span className="badge badge-deal"><Ico name="check" size={11} /> Approved</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 4 }}>
                <span className="mono" style={{ fontSize: 38, fontWeight: 800, color: 'var(--text)' }}>{b.rate}</span>
                <span style={{ fontSize: 14, color: 'var(--text-2)' }}>/năm</span>
              </div>
              <div style={{ fontSize: 13, color: 'var(--text-2)', marginBottom: 18 }}>Cố định 24 tháng đầu • 60 tháng tổng</div>

              <div style={{ padding: '14px 16px', background: 'var(--surface-2)', borderRadius: 10, marginBottom: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 8 }}>
                  <span style={{ color: 'var(--text-2)' }}>Trả hàng tháng</span>
                  <span className="mono" style={{ fontWeight: 700 }}>{fmt(b.monthly)} ₫</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
                  <span style={{ color: 'var(--text-2)' }}>Tổng phải trả</span>
                  <span className="mono" style={{ fontWeight: 600 }}>{fmt(b.total)} ₫</span>
                </div>
              </div>

              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 18px', display: 'flex', flexDirection: 'column', gap: 8 }}>
                {b.perks.map(p => (
                  <li key={p} style={{ fontSize: 12, color: 'var(--text-2)', display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                    <span style={{ color: 'var(--success)', marginTop: 2 }}><Ico name="check" size={11} /></span>{p}
                  </li>
                ))}
              </ul>

              <button className={b.best ? 'btn btn-primary' : 'btn btn-outline'} style={{ width: '100%' }}>
                Chọn {b.n} <Ico name="arrow" size={14} />
              </button>
            </div>
          ))}
        </div>

        {/* Customize */}
        <div className="card" style={{ padding: 28, marginBottom: 24 }}>
          <h3 style={{ fontSize: 18, margin: '0 0 6px' }}>Tuỳ chỉnh khoản vay</h3>
          <p style={{ fontSize: 13, color: 'var(--text-2)', margin: '0 0 22px' }}>Thay đổi down payment hoặc thời hạn để xem trả hàng tháng cập nhật real-time.</p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
            {[
              { l: 'Down payment', v: '286,000,000 ₫ (30%)', sub: '20% — 70%', pos: 0.18 },
              { l: 'Thời hạn vay', v: '60 tháng', sub: '24 — 84 tháng', pos: 0.6 },
            ].map(s => (
              <div key={s.l}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                  <div>
                    <div style={{ fontSize: 13, color: 'var(--text-2)' }}>{s.l}</div>
                    <div className="mono" style={{ fontSize: 18, fontWeight: 600, marginTop: 2 }}>{s.v}</div>
                  </div>
                  <div style={{ fontSize: 11, color: 'var(--text-3)' }}>{s.sub}</div>
                </div>
                <div style={{ position: 'relative', height: 4, background: 'var(--surface-2)', borderRadius: 2 }}>
                  <div style={{ position: 'absolute', left: 0, top: 0, height: 4, background: 'var(--accent)', borderRadius: 2, width: `${s.pos * 100}%` }} />
                  <div style={{ position: 'absolute', left: `${s.pos * 100}%`, top: -6, width: 16, height: 16, borderRadius: '50%', background: 'var(--accent)', transform: 'translateX(-50%)', border: '3px solid var(--bg)' }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Trust footer */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
          {[
            { i: 'zap', t: 'Trong 5 phút', d: 'AI scoring + 3 banks API song song' },
            { i: 'lock', t: 'Mã hoá end-to-end', d: 'Dữ liệu eKYC không lưu trên server' },
            { i: 'shield', t: 'Không ảnh hưởng credit score', d: 'Đây là soft check, không vào CIC report' },
          ].map(t => (
            <div key={t.t} style={{ padding: '14px 18px', background: 'var(--surface-2)', borderRadius: 10, display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ color: 'var(--success)' }}><Ico name={t.i} size={16} /></span>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600 }}>{t.t}</div>
                <div style={{ fontSize: 11, color: 'var(--text-2)', marginTop: 2 }}>{t.d}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────
// Screen 08 — Mobile App Home

const PhoneFrame = ({ children }) => (
  <div style={{ width: 393 + 24, padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <div style={{
      width: 393, height: 852, background: '#000', borderRadius: 50, padding: 12,
      boxShadow: '0 30px 80px rgba(0,0,0,0.6), inset 0 0 0 2px #2a2a2a',
      position: 'relative',
    }}>
      <div style={{ width: '100%', height: '100%', background: 'var(--bg)', borderRadius: 38, overflow: 'hidden', position: 'relative' }}>
        {/* Status bar */}
        <div style={{ height: 48, padding: '14px 28px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 14, fontWeight: 600, color: 'var(--text)' }}>
          <span>9:41</span>
          <div style={{ position: 'absolute', top: 12, left: '50%', transform: 'translateX(-50%)', width: 100, height: 28, background: '#000', borderRadius: 999 }} />
          <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
            <svg width="16" height="11" viewBox="0 0 16 11"><rect x="0" y="6" width="3" height="5" fill="#fff"/><rect x="4" y="4" width="3" height="7" fill="#fff"/><rect x="8" y="2" width="3" height="9" fill="#fff"/><rect x="12" y="0" width="3" height="11" fill="#fff"/></svg>
            <span style={{ fontSize: 12 }}>5G</span>
            <svg width="22" height="11" viewBox="0 0 22 11"><rect x="0" y="0" width="18" height="11" rx="2" fill="none" stroke="#fff" strokeWidth="1"/><rect x="2" y="2" width="14" height="7" fill="#fff"/><rect x="19" y="3.5" width="2" height="4" fill="#fff"/></svg>
          </div>
        </div>
        {children}
      </div>
    </div>
  </div>
);

// Screen 08 — AC Sales Mobile App (PRD §5.5)
const Screen08_Mobile = () => (
  <div style={{ background: 'radial-gradient(ellipse at 50% 30%, #1A1F26 0%, #000 70%)', padding: '40px 60px', display: 'flex', justifyContent: 'center' }}>
    <div className="otobank">
      <PhoneFrame>
        <div style={{ height: 'calc(100% - 48px)', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          {/* Top bar */}
          <div style={{ padding: '8px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <OtobankLogo size={20} />
            <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
              <div style={{ position: 'relative', width: 36, height: 36, borderRadius: 10, background: 'var(--surface-2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Ico name="bell" size={18} />
                <span style={{ position: 'absolute', top: 6, right: 6, minWidth: 16, height: 16, padding: '0 4px', background: 'var(--accent)', borderRadius: 8, fontSize: 9, fontWeight: 700, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>3</span>
              </div>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: 'linear-gradient(135deg, #E85D2C, #FFB800)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700 }}>T</div>
            </div>
          </div>

          {/* AC Greeting + Tier */}
          <div style={{ padding: '12px 20px 16px' }}>
            <div style={{ fontSize: 11, color: 'var(--text-3)', fontFamily: '"JetBrains Mono", monospace', letterSpacing: '0.06em', textTransform: 'uppercase', fontWeight: 600 }}>● AC SALES APP</div>
            <div style={{ fontSize: 22, fontWeight: 700, marginTop: 4 }}>Chào, Anh Tuấn</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 6 }}>
              <span style={{ fontSize: 11, padding: '3px 9px', borderRadius: 999, background: 'rgba(232,93,44,0.15)', border: '1px solid rgba(232,93,44,0.4)', color: 'var(--accent)', fontWeight: 700, letterSpacing: '0.04em' }}>★ TIER SENIOR</span>
              <span style={{ fontSize: 12, color: 'var(--text-2)' }}>Multiplier 1.15x · 28 deals YTD</span>
            </div>
          </div>

          {/* Hero income card */}
          <div style={{ margin: '0 20px 16px', padding: 18, borderRadius: 16, background: 'linear-gradient(135deg, rgba(232,93,44,0.18), rgba(255,184,0,0.08))', border: '1px solid rgba(232,93,44,0.3)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <div style={{ fontSize: 11, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 600 }}>Income tháng 5/2026</div>
                <div className="mono" style={{ fontSize: 28, fontWeight: 800, color: 'var(--text)', marginTop: 4, letterSpacing: '-0.02em' }}>52.4M ₫</div>
                <div style={{ fontSize: 12, color: 'var(--success)', marginTop: 4 }}>↑ vs 41M tháng trước · 4 deals đã closed</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 11, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 600 }}>Pending</div>
                <div className="mono" style={{ fontSize: 18, fontWeight: 700, color: 'var(--accent)', marginTop: 4 }}>+18.2M</div>
                <div style={{ fontSize: 11, color: 'var(--text-2)' }}>2 deals in escrow</div>
              </div>
            </div>
            <div style={{ marginTop: 14, paddingTop: 14, borderTop: '1px solid rgba(232,93,44,0.2)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'var(--text-2)', marginBottom: 6 }}>
                <span>Tier progress: SENIOR → LEAD</span>
                <span className="mono" style={{ color: 'var(--accent)', fontWeight: 700 }}>72%</span>
              </div>
              <div style={{ height: 6, background: 'rgba(255,255,255,0.08)', borderRadius: 3, overflow: 'hidden' }}>
                <div style={{ height: '100%', width: '72%', background: 'linear-gradient(90deg, var(--accent), #FFB800)', borderRadius: 3 }} />
              </div>
            </div>
          </div>

          {/* Quick actions for AC */}
          <div style={{ padding: '0 20px 16px', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
            {[
              { i: 'plus', t: 'Lead mới', alert: true },
              { i: 'dollar', t: 'Loan calc' },
              { i: 'file', t: 'Quote PDF' },
              { i: 'sparkles', t: 'AI co-pilot' },
            ].map(q => (
              <div key={q.t} style={{ padding: '12px 6px', background: q.alert ? 'rgba(232,93,44,0.12)' : 'var(--surface-2)', borderRadius: 12, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, position: 'relative', border: q.alert ? '1px solid rgba(232,93,44,0.4)' : '1px solid transparent' }}>
                <span style={{ color: 'var(--accent)' }}><Ico name={q.i} size={20} /></span>
                <span style={{ fontSize: 11, fontWeight: 600 }}>{q.t}</span>
                {q.alert && <span style={{ position: 'absolute', top: 6, right: 6, width: 8, height: 8, background: 'var(--accent)', borderRadius: '50%' }} />}
              </div>
            ))}
          </div>

          <div style={{ flex: 1, overflow: 'hidden', padding: '0 20px' }}>
            {/* Pipeline section */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <div style={{ fontSize: 15, fontWeight: 700 }}>Pipeline · 7 active leads</div>
              <div style={{ fontSize: 12, color: 'var(--accent)', fontWeight: 600 }}>Xem tất cả →</div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 18 }}>
              {[
                { name: 'Anh Phạm Quốc', vehicle: 'Honda CR-V 2022', sla: 12, slaUrgent: false, stage: 'NEW', stageColor: '#3B82F6', value: 920 },
                { name: 'Chị Nguyễn Hà', vehicle: 'Mazda CX-5 2023', sla: 28, slaUrgent: true, stage: 'CONTACTED', stageColor: '#FFB800', value: 850 },
                { name: 'Anh Lê Tâm', vehicle: 'Toyota Camry 2022', sla: null, stage: 'TEST DRIVE', stageColor: 'var(--success)', value: 1180 },
              ].map((l, i) => (
                <div key={i} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: 12, display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 700 }}>{l.name}</div>
                      <div style={{ fontSize: 11, color: 'var(--text-2)' }}>{l.vehicle} · {l.value}M ₫</div>
                    </div>
                    <span style={{ fontSize: 10, padding: '3px 8px', borderRadius: 999, background: `${l.stageColor}20`, color: l.stageColor, fontWeight: 700, letterSpacing: '0.04em' }}>{l.stage}</span>
                  </div>
                  {l.sla != null && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 10, color: l.slaUrgent ? 'var(--danger)' : 'var(--text-2)' }}>
                      {l.slaUrgent ? '⚠️' : '⏱'} SLA: còn {30 - l.sla} phút để contact (PRD §6.4)
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Microsite stats */}
            <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14, padding: 14, marginBottom: 14 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                <div style={{ fontSize: 13, fontWeight: 700 }}>🌐 anhtuan.otobank.vn</div>
                <div style={{ fontSize: 11, color: 'var(--accent)' }}>Stats →</div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
                {[{ l: 'Visitors', v: '1,247', d: '+18%' }, { l: 'Leads', v: '24', d: '+5' }, { l: 'Conversion', v: '1.9%', d: '+0.3pp' }].map(s => (
                  <div key={s.l}>
                    <div style={{ fontSize: 9, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{s.l}</div>
                    <div className="mono" style={{ fontSize: 16, fontWeight: 700, marginTop: 2 }}>{s.v}</div>
                    <div style={{ fontSize: 10, color: 'var(--success)' }}>{s.d}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Tab bar — AC App */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', padding: '12px 16px 24px', borderTop: '1px solid var(--border)', background: 'var(--bg)' }}>
            {[
              { i: 'home', t: 'Dashboard', a: true },
              { i: 'list', t: 'Pipeline' },
              { i: 'chat', t: 'Inbox' },
              { i: 'sparkles', t: 'Tools' },
              { i: 'user', t: 'Profile' },
            ].map(t => (
              <div key={t.t} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                <span style={{ color: t.a ? 'var(--accent)' : 'var(--text-3)' }}><Ico name={t.i} size={20} /></span>
                <span style={{ fontSize: 10, color: t.a ? 'var(--accent)' : 'var(--text-3)', fontWeight: t.a ? 600 : 500 }}>{t.t}</span>
              </div>
            ))}
          </div>
        </div>
      </PhoneFrame>
    </div>
  </div>
);

Object.assign(window, { Screen05_Checkout, Screen06_Sell, Screen07_Financing, Screen08_Mobile });
