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

  // === AI Chat state for "Câu hỏi" tab ===
  const INITIAL_CHIPS = ['Xe có bảo hành không?','Có giao tận nhà?','Tôi muốn lái thử','Cách thanh toán?','Đổi ý có được?','Chi phí bảo dưỡng/năm?'];
  const [chatMessages, setChatMessages] = React.useState([{
    role: 'ai',
    text: '👋 Chào bạn! Mình là Otobank AI — trợ lý ảo cho xe Honda CR-V 1.5L Turbo này. Mình đã đọc kỹ hồ sơ 200 điểm + lịch sử + financing options. Bạn muốn hỏi gì?',
    chips: INITIAL_CHIPS,
    confidence: null,
    citation: null,
    typing: false,
  }]);
  const [chatTyping, setChatTyping] = React.useState(false);
  const [chatInput, setChatInput] = React.useState('');
  const chatScrollRef = React.useRef(null);

  const AI_RESPONSES = {
    'Xe có bảo hành không?': {
      text: 'Honda CR-V này có **3 lớp bảo hành** chồng nhau:\n\n✓ **Otobank 7-day Money-Back** — Đổi trả 100% trong 7 ngày, không hỏi lý do\n✓ **Bảo hành chính hãng Honda** — Còn hiệu lực đến 03/2025 hoặc 100,000 km\n✓ **Otobank+ Extended** (optional) — +12M cho 12 tháng bảo hành thêm\n\nNếu xe có vấn đề kỹ thuật trong 7 ngày đầu, Otobank hoàn 100% tiền + chi phí giao. Bạn cần mình giải thích thêm phần nào?',
      chips: ['Otobank+ giá bao nhiêu?','Quy trình đổi trả?','Đặt lịch xem xe'],
      citation: 'Otobank Policy v2.4 • Honda Vietnam Warranty Doc',
    },
    'Có giao tận nhà?': {
      text: 'Có nhé! Otobank giao tận nhà toàn quốc:\n\n🚚 **Nội thành HCM, HN**: MIỄN PHÍ\n🚚 **Tỉnh giáp ranh** (Bình Dương, Đồng Nai, Long An...): 1.5M\n🚚 **Các tỉnh xa hơn**: 2.5M – 3.5M (tùy khoảng cách)\n\n⏱ **Thời gian giao: trong 24h** kể từ khi hoàn tất thanh toán + ký hợp đồng. Tài xế Otobank gọi xác nhận trước 1h.\n\nBạn ở đâu để mình check phí giao chính xác?',
      chips: ['Giao Bình Dương?','Thời gian rảnh?','Đặt lịch giao'],
      citation: 'Otobank Logistics Policy • Updated 04/2026',
    },
    'Tôi muốn lái thử': {
      text: 'Test drive Honda CR-V **hoàn toàn miễn phí**:\n\n📍 **Showroom HCM**: 123 Nguyễn Trãi, P. Bến Thành, Q.1\n📍 **Showroom HN**: 45 Bà Triệu, Hoàn Kiếm\n⏱ Mỗi buổi 30-60 phút\n🛣 Lái trên đường thực tế — KHÔNG bó hẹp trong showroom\n👤 Có sale Otobank đi cùng tư vấn\n\nĐặt lịch qua app Otobank hoặc gọi **1900-OTOBANK**. Bạn muốn lái thử khi nào?',
      chips: ['Đặt lịch ngay','Mang giấy tờ gì?','Có sale tiếng Anh?'],
      citation: 'Otobank Test Drive Program v1.8',
    },
    'Cách thanh toán?': {
      text: 'Otobank hỗ trợ **3 phương thức**:\n\n💵 **Tiền mặt** tại showroom — giảm 0.5% cho deal lớn\n🏦 **Chuyển khoản**: VCB / Techcom / MB / VPBank / 10+ ngân hàng\n💳 **Trả góp** qua VPBank (partner): 9.8%/năm, kỳ hạn 12-60 tháng, **pre-approve trong 30 GIÂY**\n\nBạn có thể combo: VD trả trước 30% tiền mặt + 70% trả góp. Mình tính chi tiết giúp ở tab **Tài chính** được không?',
      chips: ['Tính trả góp','Pre-approve ngay','So sánh banks'],
      citation: 'Otobank Payment Methods • VPBank Partnership Doc',
    },
    'Đổi ý có được?': {
      text: 'Hoàn toàn được — đây là **lý do khác biệt nhất** của Otobank:\n\n✓ **7 ngày đầu**: Hoàn 100% tiền, không hỏi lý do (chỉ trừ phí giao ~1.5M)\n✓ **Sau 7 ngày**: Otobank thu mua lại theo giá AI Pricing\n✓ **Trong 1 năm đầu**: Priority buyback, giá tốt hơn 5-8% thị trường\n\nĐây là policy rủi ro thấp nhất ngành ô tô VN. Bạn cứ yên tâm mua thử nhé!',
      chips: ['Buyback program','Trade-in xe cũ','Yêu cầu báo giá'],
      citation: 'Otobank Return & Buyback Policy v3.0',
    },
    'Chi phí bảo dưỡng/năm?': {
      text: 'Honda CR-V 1.5L Turbo chi phí bảo dưỡng dự kiến:\n\n🔧 Bảo dưỡng định kỳ (mỗi 10,000 km): **~3-5M**\n🔧 Thay dầu + lọc (mỗi 5,000 km): **1.2M**\n🔧 Tổng năm (avg 20,000 km/năm): **12-15M**\n🔧 Đăng kiểm + bảo hiểm bắt buộc: **4-5M**\n🔧 Bảo hiểm vật chất (khuyến nghị): **8-12M**\n\n**TỔNG: ~24-32M/năm**\n\nOtobank có gói **Worry-Free Ownership** 18M/năm — bao trọn bảo dưỡng + bảo hiểm + roadside assist. Tiết kiệm 30%. Có muốn mình giới thiệu không?',
      chips: ['Worry-Free package','Chi phí xăng?','So Toyota CR-V'],
      citation: 'Honda Vietnam Service Cost Estimate • 2026 Q2',
    },
    // === ROUND 2 — Follow-up responses ===
    'Otobank+ giá bao nhiêu?': {
      text: 'Otobank+ Extended Warranty có **3 gói**:\n\n💎 **Otobank+ Basic** — 12M / 12 tháng\n  • Bảo hành powertrain (động cơ, hộp số)\n  • Roadside assist 24/7 (HCM, HN, Đà Nẵng)\n\n💎 **Otobank+ Pro** — 18M / 24 tháng (HOT)\n  • Tất cả Basic + bảo hành điện tử + AC\n  • Free 4 lần bảo dưỡng định kỳ\n  • Replacement vehicle khi xe sửa >24h\n\n💎 **Otobank+ Premium** — 28M / 36 tháng\n  • Bao trọn mọi bộ phận (trừ wear items)\n  • Free oil change suốt thời gian gói\n  • Concierge support cá nhân\n\n→ Cho Honda CR-V này, **Pro là sweet spot**. Add vào order luôn?',
      chips: ['Add Otobank+ Pro vào order','So sánh chi tiết 3 gói','Đặt lịch xem xe'],
      citation: 'Otobank+ Warranty Plans 2026 v3.1',
    },
    'Quy trình đổi trả?': {
      text: 'Quy trình đổi trả **siêu đơn giản**, 4 bước:\n\n1️⃣ **Báo trong 7 ngày** — qua app hoặc gọi 1900-OTOBANK, không hỏi lý do\n2️⃣ **Otobank lấy xe tận nhà** — trong 24h, miễn phí\n3️⃣ **Inspection 1 ngày** — verify tình trạng xe\n4️⃣ **Hoàn 100% tiền** — về tài khoản trong 3 ngày làm việc (chỉ trừ phí giao 1.5M)\n\nKHÔNG có catch, không fine print. Đây là **moneyback đơn giản nhất ngành ô tô VN**.',
      chips: ['Đặt lịch xem xe','Đảm bảo gì khác?','Cám ơn'],
      citation: 'Otobank Return Policy v3.0 — Section 4.2',
    },
    'Đặt lịch xem xe': {
      text: '✅ Mình pre-fill thông tin xem xe Honda CR-V cho bạn:\n\n📅 **Slot trống gần nhất**:\n• Thứ 5, 09/05/2026 — 10:00 AM hoặc 2:00 PM\n• Thứ 6, 10/05/2026 — Cả ngày\n• Thứ 7, 11/05/2026 — 9:00 AM hoặc 3:00 PM\n\n📍 Showroom Otobank Q.7 (gần xe đang list)\n📞 Sale chuyên trách: **Anh Hùng** — 4.9★ (1,247 chuyến)\n\nClick chip để mình book ngay, hoặc gọi 1900-OTOBANK.',
      chips: ['Book Thứ 5 10AM','Book Thứ 7 9AM','Cần slot khác'],
      citation: 'Otobank Booking System v2.1',
    },
    'Giao Bình Dương?': {
      text: 'Có chứ! Bình Dương là **tỉnh giáp ranh HCM**:\n\n🚚 **Phí giao**: 1.5M (cố định, không tính theo km)\n⏱ **Thời gian**: 24h kể từ ký hợp đồng\n📍 **Khu vực**: Tất cả huyện thị xã Thuận An, Dĩ An, Thủ Dầu Một, Tân Uyên, Bến Cát, Phú Giáo...\n👤 **Tài xế**: Otobank in-house, 4.9★, kèm hợp đồng + bàn giao\n\nBạn ở khu nào trong Bình Dương để mình check thời gian chính xác?',
      chips: ['Thuận An','Dĩ An','Đặt lịch giao'],
      citation: 'Otobank Logistics — Bình Dương Coverage',
    },
    'Thời gian rảnh?': {
      text: 'Otobank giao **7 ngày/tuần**, slot rất linh hoạt:\n\n⏰ **Thứ 2 → Thứ 6**: 8:00 AM → 8:00 PM\n⏰ **Thứ 7 → Chủ Nhật**: 9:00 AM → 6:00 PM\n⏰ **Holiday**: vẫn giao, có sale on-call\n\n💡 **Slot popular**: Thứ 6 tối 6-8 PM hoặc sáng thứ 7 — khách thường rảnh check xe kỹ.\n\nBạn pick slot nào?',
      chips: ['Tối thứ 6','Sáng thứ 7','Đặt lịch giao'],
      citation: 'Otobank Delivery Slots — Updated Weekly',
    },
    'Đặt lịch giao': {
      text: '✅ Ghi nhận yêu cầu giao xe Honda CR-V 1.5L Turbo:\n\n📋 **Order summary**:\n• Xe: Honda CR-V 1.5L Turbo 2022 (920M)\n• Pre-approval: chưa có (sẽ verify ở bước thanh toán)\n• Giao: tận nhà, theo slot bạn chọn\n• Thời gian: 24h sau ký hợp đồng\n\nMình chuyển sang **Anh Hùng** (sale chuyên trách CR-V) confirm chi tiết qua Zalo/SMS trong 5 phút. OK không?',
      chips: ['OK chuyển ngay','Cần xem hợp đồng trước','Hỏi thêm'],
      citation: 'Otobank Order Confirmation Flow',
    },
    'Đặt lịch ngay': {
      text: '✅ Mình đặt test drive cho bạn:\n\n📅 **Slot khả dụng nhanh nhất**:\n• Hôm nay, 5:00 PM (1.5h sau)\n• Ngày mai, 10:00 AM hoặc 3:00 PM\n• Thứ 7, cả ngày\n\n📍 **Địa điểm**: Otobank Showroom Q.7 — có sẵn xe Honda CR-V\n👤 **Sale**: Anh Hùng (4.9★) hoặc Chị Linh (4.8★)\n🛣 **Lộ trình test**: 30 phút quanh Quận 1 + Quận 7 (city + highway)\n\nBạn pick slot nào?',
      chips: ['Hôm nay 5PM','Ngày mai 10AM','Thứ 7'],
      citation: 'Otobank Test Drive Booking — Real-time slots',
    },
    'Mang giấy tờ gì?': {
      text: 'Test drive **CỰC ĐƠN GIẢN**, chỉ cần 1 thứ:\n\n📄 **Bắt buộc**: Bằng lái xe ô tô B2 (B1 cũng được)\n\n💡 **Optional**:\n• CMND/CCCD (xác nhận booking)\n• Cọc 0đ — KHÔNG yêu cầu cọc, KHÔNG ép buộc mua\n\n⚠️ **Lưu ý**:\n• Bằng lái phải còn hạn\n• Mới có B1 < 6 tháng → có thể yêu cầu sale lái cùng (free)\n• Không lái thử nếu có cồn (Otobank test BAC trước)\n\nBạn có B2 chưa?',
      chips: ['Có B2 rồi','Mới có B1','Đặt lịch ngay'],
      citation: 'Otobank Test Drive Requirements v1.5',
    },
    'Có sale tiếng Anh?': {
      text: 'Có nhé! Otobank có **đội sale international**:\n\n🌐 **Tiếng Anh**:\n• **John (Mỹ)** — 5★, 312 chuyến — chuyên Honda/Toyota\n• **Sarah (Anh)** — 4.9★, 198 chuyến — chuyên VinFast/Mercedes\n\n🌐 **Tiếng Trung**: Lin Wei — 4.9★, 247 chuyến\n🌐 **Tiếng Hàn**: Park Min-ho — 4.8★, 156 chuyến\n\nBook qua app Otobank, chọn "Language preference" → "English" → auto match. Book sale tiếng Anh cho test drive?',
      chips: ['Book John (English)','Book Sarah (English)','Đặt lịch ngay'],
      citation: 'Otobank Multilingual Sales Team',
    },
    'Tính trả góp': {
      text: 'OK quick-calc trả góp Honda CR-V 920M:\n\n💰 **3 scenarios phổ biến**:\n\n**A. Trả trước 20% (184M) + 60 tháng**\n• Vay: 736M @ 9.8%/năm\n• Trả/tháng: **15.6M đ**\n• Tổng lãi: ~187M\n\n**B. Trả trước 30% (276M) + 36 tháng** (sweet spot)\n• Vay: 644M @ 9.8%/năm\n• Trả/tháng: **21.6M đ**\n• Tổng lãi: ~98M\n\n**C. Trả trước 50% (460M) + 24 tháng**\n• Vay: 460M @ 9.5%/năm\n• Trả/tháng: **21.2M đ**\n• Tổng lãi: ~49M\n\nBạn fit scenario nào?',
      chips: ['Scenario A 60T','Scenario B 36T','Pre-approve ngay'],
      citation: 'Otobank Loan Calculator + VPBank Rates',
    },
    'Pre-approve ngay': {
      text: '✅ Pre-approve VPBank trong **30 GIÂY** — không ảnh hưởng credit score:\n\n📋 **Cần thông tin**:\n• Họ tên + CMND/CCCD\n• Mức lương / thu nhập tháng\n• Hợp đồng lao động (chụp ảnh)\n• Bảo lãnh không cần (Otobank là partner VPBank)\n\n💡 **Sau khi submit**:\n• 30s → VPBank trả về kết quả ML model\n• Approve → có ngay limit + lãi suất chính xác\n• Reject → Otobank gợi ý 9 banks khác (95% có 1 trong 10 banks approve)\n\nOpen form pre-approve không?',
      chips: ['Open form pre-approve','Cần xem hợp đồng trước','So sánh banks'],
      citation: 'VPBank ML Pre-approval API v4.2',
    },
    'So sánh banks': {
      text: 'So sánh **10 ngân hàng partner** Otobank cho khoản 644M / 36 tháng:\n\n🏆 **Top 3 (recommend)**:\n1. **VPBank** — 9.8%/năm — 21.5M/tháng — pre-approve 30s ⭐\n2. **Techcombank** — 10.2%/năm — 21.8M/tháng — 2 phút\n3. **MB Bank** — 10.5%/năm — 21.9M/tháng — 5 phút\n\n📊 **Còn 7 banks**: VCB, TPBank, VIB, ACB, Sacombank, BIDV, HDBank — lãi 10.8-12%\n\n💡 **Tip**: Lãi VPBank thấp nhất vì là **partner chiến lược Otobank**. Credit profile tốt → có thể negotiate xuống 9.5%.',
      chips: ['Pre-approve VPBank','Pre-approve nhiều banks','Đặt lịch xem xe'],
      citation: 'Otobank Bank Partnership Rates — Q2 2026',
    },
    'Buyback program': {
      text: 'Otobank **Priority Buyback** — exclusive cho khách Otobank:\n\n🔄 **Quy tắc**:\n• Year 1: Otobank mua lại với giá **+5-8% so thị trường**\n• Year 2: Giá thị trường\n• Year 3+: Theo AI Pricing Engine của Otobank\n\n📊 **Ví dụ Honda CR-V 920M**:\n• Sau 1 năm: Otobank mua ~870M (depreciation ~5%)\n• Thị trường: ~830M\n• → Bạn save ~40M nếu sell qua Otobank\n\n💡 **Sao Otobank làm vậy?** Xe quay lại pipeline IRC nhanh hơn (verified history) → margin cao hơn classified. Win-win.\n\nQuan tâm trade-in xe cũ luôn không?',
      chips: ['Trade-in xe cũ','Yêu cầu báo giá','Đặt lịch xem xe'],
      citation: 'Otobank Priority Buyback Program v2.0',
    },
    'Trade-in xe cũ': {
      text: 'Trade-in xe cũ **giảm 5-15% tổng tiền** Honda CR-V mới.\n\n📋 **Quy trình**:\n1. Bạn cho mình **VIN/biển số xe cũ** + ảnh\n2. AI Pricing Engine định giá trong 2 phút\n3. Sale Otobank verify physical (15 phút showroom)\n4. Otobank thu mua tại chỗ — TIỀN MẶT hoặc deduct order\n\n💰 **Ví dụ phổ biến**:\n• Toyota Vios 2018 → ~280M\n• Mazda 3 2019 → ~420M\n• Hyundai Accent 2020 → ~340M\n\nBạn có xe gì để trade-in?',
      chips: ['Toyota Vios','Mazda 3','Yêu cầu báo giá'],
      citation: 'Otobank Trade-in AI Pricing Engine',
    },
    'Yêu cầu báo giá': {
      text: '✅ Mình tạo **báo giá chính thức** Honda CR-V 1.5L Turbo:\n\n📄 **Quote PDF chứa**:\n• Giá listed: 920,000,000 đ\n• Phí trước bạ HCM (~10%): 92,000,000 đ\n• Phí đăng ký + biển: ~3,500,000 đ\n• Bảo hiểm bắt buộc: ~480,000 đ\n• **TỔNG OUT-THE-DOOR: 1,015,980,000 đ**\n\n💰 **Discount khả dụng**:\n• Mua trong 7 ngày: −5M\n• Trade-in xe cũ: tùy giá\n• Otobank+ Pro: +18M (offset by 5M discount)\n\nGửi qua đâu?',
      chips: ['Gửi email','Gửi Zalo','Đặt lịch xem xe'],
      citation: 'Otobank Quote Generator v2.1',
    },
    'Worry-Free package': {
      text: 'Otobank **Worry-Free Ownership** — gói all-inclusive:\n\n💎 **18M/năm** bao gồm:\n• ✓ Bảo dưỡng định kỳ (4 lần/năm tại Otobank Tech Center)\n• ✓ Thay dầu + lọc miễn phí (8 lần/năm)\n• ✓ Bảo hiểm vật chất (full coverage)\n• ✓ Bảo hiểm bắt buộc + đăng kiểm\n• ✓ Roadside assist 24/7 toàn quốc\n• ✓ Replacement vehicle khi sửa >24h\n• ✓ Free wash xe (1 lần/tháng)\n\n📊 **Tiết kiệm**:\n• Tự DIY: ~26M/năm\n• Worry-Free: 18M/năm\n• → **Save 8M/năm** + zero stress\n\nAdd vào order luôn?',
      chips: ['Add Worry-Free vào order','Đặt lịch xem xe','Cám ơn'],
      citation: 'Otobank Worry-Free Plan v2.0',
    },
    'Chi phí xăng?': {
      text: 'Honda CR-V 1.5L Turbo **tiêu thụ xăng**:\n\n⛽ **Mức tiêu thụ thực tế** (avg):\n• City: **8.5L/100km** (kẹt xe HCM/HN)\n• Highway: **6.2L/100km**\n• Mixed: **7.4L/100km** (most common)\n\n💰 **Chi phí xăng/năm** (avg 20,000 km):\n• 7.4L × 200 = 1,480 lít\n• @ giá xăng RON95 (24,500đ/L tháng 5/2026)\n• → **~36,260,000 đ/năm**\n• → **~3,000,000 đ/tháng**\n\n📊 **So với competitor**:\n• Toyota Camry 2.5: ~9.0L/100km — đắt hơn 22%\n• Mazda CX-5 2.0: ~7.8L/100km — đắt hơn 5%\n• → CR-V 1.5L Turbo **economical nhất segment**',
      chips: ['So Toyota CR-V','Worry-Free package','Đặt lịch xem xe'],
      citation: 'Otobank Real-world Fuel Test • 200+ samples',
    },
    'So Toyota CR-V': {
      text: 'Thực ra **Toyota không có CR-V** — đó là model riêng của Honda. Chắc bạn ý so với **Toyota RAV4** hoặc **Toyota Corolla Cross**?\n\n🥊 **Honda CR-V vs Toyota RAV4** (cùng segment):\n\n| | CR-V 1.5T | RAV4 2.0 |\n|--|--|--|\n| Giá VN | 920M | 1.150B |\n| HP | 190 | 173 |\n| Tiêu thụ | 7.4L | 8.5L |\n| Bảo dưỡng | Thấp | Trung bình |\n| Resale | Tốt | Rất tốt |\n\n🏆 **CR-V win**: rẻ hơn 230M, máy mạnh hơn, ăn xăng ít hơn\n🏆 **RAV4 win**: resale value cao hơn 5-8%\n\n→ CR-V tốt hơn cho **value buyer**, RAV4 cho **long-term resale**.',
      chips: ['Đặt lịch xem xe','Buyback program','Cám ơn'],
      citation: 'Otobank Comparison Engine • VN Market 2026',
    },
    // === ROUND 3+ — Terminal CTAs ===
    'Add Otobank+ Pro vào order': {
      text: '✅ Done! Mình add **Otobank+ Pro (18M / 24 tháng)** vào order:\n\n📋 **Updated total**:\n• Xe: 920M\n• Otobank+ Pro: +18M\n• **NEW TOTAL: 938M**\n\n🎁 **Bonus**: Add Otobank+ trong cùng order → **free 1 lần Otobank Tech Center inspection** (giá trị 2.5M).\n\nSale (Anh Hùng) sẽ Zalo bạn trong 5 phút xác nhận. Còn gì nữa?',
      chips: ['Add Worry-Free vào order','Đặt lịch xem xe','Cám ơn'],
      citation: 'Otobank Order System v3.2',
    },
    'Add Worry-Free vào order': {
      text: '✅ Worry-Free Ownership đã add vào order:\n\n📋 **Final order**:\n• Honda CR-V 1.5L Turbo: 920M\n• Otobank+ Pro (24 tháng): 18M\n• Worry-Free Year 1: 18M\n• **TOTAL: 956M**\n\n💎 **Bonus stack** vì add cả 2 gói:\n• Free Otobank Tech Center inspection\n• Free 6 lần wash xe (thay vì 12)\n• Priority hotline (skip queue)\n\nMọi thứ ready, Anh Hùng sẽ confirm trong 5 phút!',
      chips: ['Track order','Cám ơn','Đặt lịch giao'],
      citation: 'Otobank Order System v3.2',
    },
    'Book Thứ 5 10AM': {
      text: '✅ **Booked!** Lịch xem xe:\n\n📅 **Thứ 5, 09/05/2026 — 10:00 AM**\n📍 Otobank Showroom Q.7 — 123 Nguyễn Trãi, P. Bến Thành, Q.1\n👤 Sale: **Anh Hùng** (4.9★)\n🚗 Xe sẽ ready: pre-warmed engine, full tank, all docs\n\n📲 SMS confirm gửi tới số đăng ký Otobank của bạn trong 30s.\n📧 Email confirm + map + parking instructions cũng đã gửi.\n\nCòn câu hỏi gì trước buổi xem?',
      chips: ['Mang giấy tờ gì?','Đặt thêm test drive','Cám ơn'],
      citation: 'Otobank Booking System — Confirmed',
    },
    'Book Thứ 7 9AM': {
      text: '✅ **Booked Thứ 7, 11/05/2026 — 9:00 AM**!\n\n📍 Otobank Showroom Q.7\n👤 Sale: **Anh Hùng** hoặc **Chị Linh** (cả 2 cùng on-shift)\n📱 SMS + Email confirm đã gửi.\n\nCòn gì giúp bạn?',
      chips: ['Mang giấy tờ gì?','Đặt lịch ngay','Cám ơn'],
      citation: 'Otobank Booking System — Confirmed',
    },
    'Hôm nay 5PM': {
      text: '✅ **Booked test drive HÔM NAY — 5:00 PM!**\n\n📍 Otobank Showroom Q.7\n👤 Sale: **Anh Hùng** đang on-shift\n🚗 Xe Honda CR-V đang chuẩn bị: pre-warmed, full tank, docs ready\n⏰ Bạn cần đến trước 4:50 PM để check-in\n\n📲 SMS confirm vừa gửi. Map: Otobank Showroom Q.7, 123 Nguyễn Trãi.\n\nMang theo bằng lái B2 hoặc B1!',
      chips: ['Mang giấy tờ gì?','Đặt lịch xem xe','Cám ơn'],
      citation: 'Otobank Test Drive — Confirmed',
    },
    'OK chuyển ngay': {
      text: '✅ Done! Mình **routing order** sang Anh Hùng:\n\n📲 **Trong 5 phút**:\n• Anh Hùng sẽ Zalo + gọi bạn\n• Send quote PDF chính thức (chữ ký số Otobank)\n• Hướng dẫn 3 phương thức thanh toán\n• Confirm slot giao xe\n\nQuay lại app Otobank bất kỳ lúc nào để track order real-time. Cám ơn bạn đã chọn Otobank! 🚀',
      chips: ['Track order','Đặt lịch giao','Cám ơn'],
      citation: 'Otobank Order Routing',
    },
    'Open form pre-approve': {
      text: '✅ Form pre-approve VPBank đã open ở tab khác.\n\n⏱ **Thời gian**: ~2 phút điền + 30 giây ML check\n📋 **Bạn cần ready**:\n• CMND/CCCD (chụp 2 mặt)\n• Hợp đồng lao động (1 trang)\n• 3 tháng bank statement (PDF/screenshot)\n\n💡 **Sau approve**:\n• Có ngay limit + lãi suất chính xác\n• Lock rate 30 ngày\n• Chuyển thẳng vào order Honda CR-V của bạn\n\nKhi xong báo mình nhé!',
      chips: ['Đã submit','Cần xem hợp đồng trước','Cám ơn'],
      citation: 'VPBank Pre-approval Form',
    },
    'Track order': {
      text: '📍 **Track order Honda CR-V — Live**:\n\n✅ Step 1: Order placed (vừa xong)\n⏳ Step 2: Sale verify (5 phút) — Anh Hùng đang call\n⏳ Step 3: Quote PDF gửi (10 phút)\n⏳ Step 4: Bạn ký hợp đồng điện tử\n⏳ Step 5: Thanh toán\n⏳ Step 6: Otobank lấy xe khỏi pipeline IRC\n⏳ Step 7: Logistics chuẩn bị giao\n⏳ Step 8: Tài xế Otobank giao xe đến nhà\n\nBạn có thể track real-time trong app Otobank, tab "My Orders". ETA giao xe: **trong 24h**.',
      chips: ['Đặt lịch giao','Cám ơn','Hỏi thêm'],
      citation: 'Otobank Order Tracking — Real-time',
    },
    'Cám ơn': {
      text: '🙏 **Cám ơn bạn đã quan tâm Otobank!**\n\nNếu có câu hỏi mới (giờ hay sau này), cứ quay lại đây — mình online 24/7. Hoặc gọi **1900-OTOBANK** gặp sale.\n\nChúc bạn tìm được chiếc xe hoàn hảo! 🚗💨',
      chips: ['Xe có bảo hành không?','Có giao tận nhà?','Tôi muốn lái thử'],
      citation: 'Otobank AI Concierge',
    },
  };
  const FALLBACK_RESPONSE = {
    text: '🤔 Câu hỏi của bạn cần thông tin chi tiết hơn từ đội Otobank. Mình sẽ chuyển ngay tới sale chuyên trách Honda CR-V — phản hồi trong **5 phút** qua SMS/Zalo.\n\nTrong lúc chờ, có thể bạn quan tâm:',
    chips: ['Xe có bảo hành không?','Có giao tận nhà?','Tôi muốn lái thử'],
    citation: 'Otobank AI Routing v1.2',
  };

  const renderChatMarkdown = (text) => {
    const out = [];
    const lines = text.split('\n');
    lines.forEach((line, li) => {
      if (li > 0) out.push(React.createElement('br', { key: `br-${li}` }));
      const segs = line.split(/(\*\*[^*]+\*\*)/g);
      segs.forEach((seg, si) => {
        if (seg.startsWith('**') && seg.endsWith('**')) {
          out.push(React.createElement('strong', { key: `b-${li}-${si}`, style: { color: '#F5F5F5', fontWeight: 700 } }, seg.slice(2, -2)));
        } else if (seg) {
          out.push(seg);
        }
      });
    });
    return out;
  };

  const askAI = (question) => {
    if (chatTyping) return;
    setChatMessages(prev => [...prev, { role: 'user', text: question }]);
    setChatTyping(true);
    const response = AI_RESPONSES[question] || FALLBACK_RESPONSE;
    setTimeout(() => {
      setChatTyping(false);
      // Start typing animation
      setChatMessages(prev => [...prev, {
        role: 'ai', text: '', typing: true,
        chips: response.chips, citation: response.citation, confidence: '98%',
        fullText: response.text,
      }]);
      let i = 0;
      const tick = () => {
        i += 3;
        setChatMessages(prev => {
          const last = prev[prev.length - 1];
          if (!last || !last.typing) return prev;
          if (i >= response.text.length) {
            return [...prev.slice(0, -1), { ...last, text: response.text, typing: false }];
          }
          return [...prev.slice(0, -1), { ...last, text: response.text.substring(0, i) }];
        });
        if (i < response.text.length) setTimeout(tick, 70);
      };
      setTimeout(tick, 50);
    }, 1100);
  };

  const submitChatInput = () => {
    const q = chatInput.trim();
    if (!q || chatTyping) return;
    setChatInput('');
    const matched = Object.keys(AI_RESPONSES).find(k =>
      k.toLowerCase().replace(/[?]/g, '').includes(q.toLowerCase().replace(/[?]/g, '')) ||
      q.toLowerCase().includes(k.toLowerCase().replace(/[?]/g, '').slice(0, 8))
    );
    askAI(matched || q);
  };

  React.useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
    }
  }, [chatMessages, chatTyping]);

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
  <div className="otobank" style={{ width: 1440, minHeight: 2200, background: 'var(--bg)' }}>
    <OtobankNav active="buy" />

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

          {/* Trust Score Hero — PRD §10.2 */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(16,185,129,0.12), rgba(16,185,129,0.04))',
            border: '1px solid rgba(16,185,129,0.4)',
            borderRadius: 14, padding: 18, marginBottom: 18,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 14 }}>
              <div style={{
                width: 64, height: 64, borderRadius: 12, background: '#10B981', color: '#fff',
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              }}>
                <span style={{ fontFamily: '"Space Grotesk", sans-serif', fontSize: 26, fontWeight: 800, lineHeight: 1 }}>92</span>
                <span style={{ fontSize: 9, fontWeight: 700, opacity: 0.9, letterSpacing: '0.04em' }}>/100</span>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 10, color: '#10B981', fontWeight: 700, letterSpacing: '0.08em', marginBottom: 2 }}>● OTOBANK CERTIFIED</div>
                <div style={{ fontSize: 16, fontWeight: 700, color: '#F5F5F5' }}>Trust Score 92/100</div>
                <div style={{ fontSize: 11, color: '#A0A4AB', marginTop: 2 }}>Top 10% inventory · Bảo hành 6 tháng + 7 ngày đổi trả</div>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8, paddingTop: 14, borderTop: '1px solid rgba(16,185,129,0.2)' }}>
              {[
                { l: 'Documentation', v: 24, max: 25, sub: 'Đầy đủ giấy tờ' },
                { l: 'Inspection', v: 28, max: 30, sub: '192/200 điểm' },
                { l: 'History', v: 22, max: 25, sub: 'Odo verified' },
                { l: 'Source', v: 18, max: 20, sub: 'Verified Owner' },
              ].map(c => (
                <div key={c.l} title={c.sub}>
                  <div style={{ fontSize: 9, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>{c.l}</div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 2, marginTop: 2 }}>
                    <span className="mono" style={{ fontSize: 16, fontWeight: 700, color: '#F5F5F5' }}>{c.v}</span>
                    <span className="mono" style={{ fontSize: 10, color: '#6B7280' }}>/{c.max}</span>
                  </div>
                  <div style={{ height: 3, background: 'rgba(16,185,129,0.15)', borderRadius: 2, marginTop: 4, overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${(c.v / c.max) * 100}%`, background: '#10B981' }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

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

    {activeTab === 0 && (<>
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

    </>)}

    {activeTab === 1 && (<>
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
            Kiểm định bởi Otobank Tech Center • 15/04/2026
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

    </>)}

    {activeTab === 0 && (<>
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
            Xe đã trải qua quy trình kiểm định 200 điểm tại Otobank Tech Center Bình Tân ngày 15/04/2026. 192/200 điểm đạt chuẩn — 8 vấn đề nhỏ đã được khắc phục trước khi list. Xem chi tiết báo cáo đầy đủ 32 trang để biết từng hạng mục.
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
          Đã qua quy trình kiểm định 200 điểm của Otobank tại trung tâm reconditioning Bình Tân với <strong style={{ color: 'var(--text)' }}>192/200 điểm</strong> đạt chuẩn. 8 vấn đề nhỏ đã được khắc phục trước khi listing — chi tiết trong báo cáo kèm theo.
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

    </>)}

    {activeTab === 2 && (
      <section style={{ padding: '48px' }}>
        <h2 style={{ fontFamily: '"Space Grotesk", sans-serif', fontSize: 24, fontWeight: 600, color: '#F5F5F5', lineHeight: 1.3, marginBottom: 16, marginTop: 0 }}>Lịch sử xe</h2>
        <div style={{ display: 'flex', gap: 16, marginBottom: 32 }}>
          {[
            { icon: '👤', label: '1 chủ sở hữu', sub: 'Private owner' },
            { icon: '🚫', label: '0 tai nạn', sub: 'Verified clean' },
            { icon: '✓', label: 'Odometer Verified', sub: 'VinCheck pass' },
          ].map(s => (
            <div key={s.label} style={{ flex: 1, background: '#1A1F26', border: '1px solid #2D343F', padding: 20, borderRadius: 12 }}>
              <div style={{ fontSize: 24, marginBottom: 8 }}>{s.icon}</div>
              <div style={{ fontSize: 16, fontWeight: 600, color: '#F5F5F5' }}>{s.label}</div>
              <div style={{ fontSize: 13, color: '#A0A4AB', marginTop: 4 }}>{s.sub}</div>
            </div>
          ))}
        </div>
        <div className="card" style={{ padding: 32 }}>
          <h3 style={{ fontFamily: '"Space Grotesk", sans-serif', fontSize: 18, fontWeight: 600, color: '#F5F5F5', marginBottom: 24, marginTop: 0 }}>Timeline</h3>
          <div style={{ position: 'relative', paddingLeft: 28 }}>
            <div style={{ position: 'absolute', left: 8, top: 8, bottom: 8, width: 2, background: 'linear-gradient(180deg, #10B981, #2D343F)' }} />
            {[
              { date: '01/2022', event: 'Mua mới tại Honda Plaza Quận 7', detail: 'Chủ sở hữu đầu tiên, biển số 51K-XXX.XX' },
              { date: '06/2022', event: 'Bảo dưỡng 5,000 km', detail: 'Honda Service — kiểm tra dầu, lọc' },
              { date: '12/2022', event: 'Bảo dưỡng 15,000 km', detail: 'Honda Service — thay dầu định kỳ' },
              { date: '06/2023', event: 'Bảo dưỡng 25,000 km', detail: 'Honda Service — kiểm tra phanh, lốp' },
              { date: '12/2023', event: 'Bảo dưỡng 35,000 km', detail: 'Garage độc lập (chứng nhận đầy đủ)' },
              { date: '11/2024', event: 'Otobank kiểm định 200 điểm → Nhập kho', detail: '192/200 điểm — XUẤT SẮC' },
            ].map((e, i) => (
              <div key={i} style={{ position: 'relative', paddingBottom: 24 }}>
                <div style={{ position: 'absolute', left: -27, top: 4, width: 16, height: 16, borderRadius: '50%', background: '#10B981', border: '3px solid #0a0d11' }} />
                <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 12, color: '#10B981', fontWeight: 600, marginBottom: 4 }}>{e.date}</div>
                <div style={{ fontSize: 15, fontWeight: 600, color: '#F5F5F5', marginBottom: 4 }}>{e.event}</div>
                <div style={{ fontSize: 13, color: '#A0A4AB' }}>{e.detail}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )}

    {activeTab === 3 && (
      <section style={{ padding: '48px' }}>
        <h2 style={{ fontFamily: '"Space Grotesk", sans-serif', fontSize: 24, fontWeight: 600, color: '#F5F5F5', lineHeight: 1.3, marginBottom: 16, marginTop: 0 }}>Tài chính</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 24 }}>
          <div className="card" style={{ padding: 32 }}>
            <h3 style={{ fontFamily: '"Space Grotesk", sans-serif', fontSize: 18, fontWeight: 600, color: '#F5F5F5', marginBottom: 24, marginTop: 0 }}>Tính trả góp</h3>
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontSize: 13, color: '#A0A4AB', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 8 }}>Trả trước</div>
              <div style={{ fontSize: 22, fontWeight: 700, color: '#F5F5F5', fontFamily: '"Space Grotesk", sans-serif' }}>276,000,000 đ <span style={{ fontSize: 14, color: '#A0A4AB', fontWeight: 400 }}>(30%)</span></div>
              <div style={{ height: 6, background: '#2D343F', borderRadius: 999, marginTop: 10, position: 'relative' }}>
                <div style={{ position: 'absolute', left: 0, top: 0, width: '30%', height: '100%', background: 'linear-gradient(90deg, #10B981, #34D399)', borderRadius: 999 }} />
                <div style={{ position: 'absolute', left: '30%', top: -4, width: 14, height: 14, borderRadius: '50%', background: '#10B981', border: '2px solid #0a0d11' }} />
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 8, marginBottom: 24 }}>
              {[12, 24, 36, 48, 60].map(m => (
                <div key={m} style={{ textAlign: 'center', padding: '10px 0', borderRadius: 8, border: m === 36 ? '1px solid #E85D2C' : '1px solid #2D343F', background: m === 36 ? 'rgba(232,93,44,0.12)' : 'transparent', color: m === 36 ? '#E85D2C' : '#A0A4AB', fontWeight: 600, fontSize: 13, cursor: 'pointer' }}>{m} tháng</div>
              ))}
            </div>
            <div style={{ padding: 24, background: 'rgba(16,185,129,0.06)', border: '1px solid rgba(16,185,129,0.2)', borderRadius: 12 }}>
              <div style={{ fontSize: 13, color: '#A0A4AB', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 6 }}>Trả góp hàng tháng</div>
              <div style={{ fontFamily: '"Space Grotesk", sans-serif', fontSize: 36, fontWeight: 800, color: '#10B981', lineHeight: 1 }}>21,580,000 đ</div>
              <div style={{ fontSize: 12, color: '#A0A4AB', marginTop: 10 }}>Lãi suất 9.8%/năm (VPBank — partner Otobank)</div>
            </div>
          </div>
          <div className="card" style={{ padding: 32 }}>
            <h3 style={{ fontFamily: '"Space Grotesk", sans-serif', fontSize: 18, fontWeight: 600, color: '#F5F5F5', marginBottom: 16, marginTop: 0 }}>Đối tác ngân hàng</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10, marginBottom: 20 }}>
              {['VPBank ⭐','Vietcombank','Techcombank','MB Bank','TPBank','VIB','ACB','Sacombank'].map(b => (
                <div key={b} style={{ padding: '10px 14px', background: '#1A1F26', border: '1px solid #2D343F', borderRadius: 8, fontSize: 13, color: '#F5F5F5', textAlign: 'center' }}>{b}</div>
              ))}
            </div>
            <div style={{ fontSize: 13, color: '#A0A4AB', marginBottom: 20 }}>10+ ngân hàng đối tác — pre-approve trong 30 giây</div>
            <button className="btn-cta-primary" style={{ width: '100%' }}>Pre-approve ngay (30s) →</button>
          </div>
        </div>
      </section>
    )}

    {activeTab === 4 && (
      <section style={{ padding: '48px' }}>
        <h2 style={{ fontFamily: '"Space Grotesk", sans-serif', fontSize: 24, fontWeight: 600, color: '#F5F5F5', lineHeight: 1.3, marginBottom: 8, marginTop: 0 }}>Trợ lý AI Otobank</h2>
        <div style={{ fontSize: 14, color: '#A0A4AB', marginBottom: 24, display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#10B981', boxShadow: '0 0 0 4px rgba(16,185,129,0.2)', animation: 'aiPulse 2s ease-in-out infinite' }} />
          Online • Đã trả lời 47,392 câu hỏi • Avg 1.2s
          <span style={{ marginLeft: 'auto', fontFamily: '"JetBrains Mono", monospace', fontSize: 11, color: '#6B7280' }}>Powered by Otobank AI v2.4</span>
        </div>

        {/* Messages container */}
        <div ref={chatScrollRef} style={{ maxHeight: 540, overflowY: 'auto', marginBottom: 16, padding: '4px 4px 8px' }}>
          {chatMessages.map((m, idx) => m.role === 'user' ? (
            <div key={idx} style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 16 }}>
              <div style={{ maxWidth: '70%', padding: '10px 16px', background: 'rgba(255,255,255,0.08)', borderRadius: '14px 14px 4px 14px', color: '#F5F5F5', fontSize: 14, lineHeight: 1.5 }}>{m.text}</div>
            </div>
          ) : (
            <div key={idx} style={{ marginBottom: 20 }}>
              <div style={{ display: 'flex', gap: 12 }}>
                <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'linear-gradient(135deg, #10B981, #34D399)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFF', fontWeight: 700, flexShrink: 0, fontSize: 16, boxShadow: '0 0 0 3px rgba(16,185,129,0.15)' }}>C</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: '#F5F5F5', marginBottom: 6, display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                    Otobank AI
                    {m.confidence && <span style={{ fontSize: 11, padding: '2px 8px', borderRadius: 999, border: '1px solid #10B981', color: '#10B981', fontWeight: 500 }}>{m.confidence} confident</span>}
                    {!m.typing && idx > 0 && <span style={{ fontSize: 11, color: '#6B7280', fontWeight: 400 }}>vừa xong</span>}
                  </div>
                  <div style={{ padding: '10px 14px', background: 'rgba(255,255,255,0.03)', borderLeft: '3px solid #10B981', borderRadius: '4px 14px 14px 14px', color: '#E5E7EB', fontSize: 14, lineHeight: 1.65 }}>
                    {renderChatMarkdown(m.text)}
                    {m.typing && <span style={{ display: 'inline-block', width: 2, height: 14, background: '#10B981', marginLeft: 2, animation: 'cursorBlink 0.6s ease infinite', verticalAlign: 'middle' }} />}
                  </div>
                  {!m.typing && m.citation && (
                    <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginTop: 6, paddingLeft: 4 }}>📚 Nguồn: {m.citation}</div>
                  )}
                  {!m.typing && m.chips && m.chips.length > 0 && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 12 }}>
                      {m.chips.map(c => (
                        <button
                          key={c}
                          onClick={() => askAI(c)}
                          disabled={chatTyping}
                          style={{ padding: '8px 14px', background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 999, color: '#F5F5F5', fontSize: 13, cursor: chatTyping ? 'not-allowed' : 'pointer', fontFamily: 'inherit', opacity: chatTyping ? 0.5 : 1, transition: 'all 0.15s ease' }}
                          onMouseEnter={(e) => { if (!chatTyping) { e.currentTarget.style.borderColor = '#10B981'; e.currentTarget.style.background = 'rgba(16,185,129,0.08)'; } }}
                          onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; e.currentTarget.style.background = 'transparent'; }}
                        >{c}</button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}

          {/* Typing indicator */}
          {chatTyping && (
            <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
              <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'linear-gradient(135deg, #10B981, #34D399)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFF', fontWeight: 700, flexShrink: 0, fontSize: 16 }}>C</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '10px 16px', background: 'rgba(255,255,255,0.03)', borderRadius: 14, color: '#A0A4AB', fontSize: 13 }}>
                <span style={{ display: 'flex', gap: 4 }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#10B981', animation: 'typingBounce 1.2s ease-in-out infinite', animationDelay: '0s' }} />
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#10B981', animation: 'typingBounce 1.2s ease-in-out infinite', animationDelay: '0.15s' }} />
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#10B981', animation: 'typingBounce 1.2s ease-in-out infinite', animationDelay: '0.3s' }} />
                </span>
                <span style={{ marginLeft: 6 }}>Otobank AI đang suy nghĩ…</span>
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div style={{ display: 'flex', gap: 8, padding: 12, background: '#1A1F26', border: '1px solid #2D343F', borderRadius: 12 }}>
          <input
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') submitChatInput(); }}
            placeholder="Hoặc gõ câu hỏi của bạn..."
            disabled={chatTyping}
            style={{ flex: 1, background: 'transparent', border: 'none', color: '#F5F5F5', fontSize: 14, outline: 'none', fontFamily: 'inherit', padding: '8px 12px' }}
          />
          <button
            onClick={submitChatInput}
            disabled={chatTyping || !chatInput.trim()}
            style={{ padding: '8px 18px', background: chatTyping || !chatInput.trim() ? '#2D343F' : '#10B981', border: 'none', borderRadius: 8, color: '#FFF', fontWeight: 600, cursor: chatTyping || !chatInput.trim() ? 'not-allowed' : 'pointer', fontFamily: 'inherit', fontSize: 14, transition: 'background 0.15s ease' }}
          >➤</button>
        </div>
        <div style={{ fontSize: 12, color: '#6B7280', marginTop: 10, textAlign: 'center' }}>📚 Powered by Otobank AI • Phản hồi tức thì • Train trên 47k Q&A</div>

        <style>{`
          @keyframes aiPulse {
            0%, 100% { box-shadow: 0 0 0 4px rgba(16,185,129,0.2); }
            50% { box-shadow: 0 0 0 8px rgba(16,185,129,0.05); }
          }
          @keyframes typingBounce {
            0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
            30% { transform: translateY(-4px); opacity: 1; }
          }
          @keyframes cursorBlink {
            0%, 50% { opacity: 1; }
            51%, 100% { opacity: 0; }
          }
        `}</style>
      </section>
    )}

    {/* Similar cars */}
    <section style={{ padding: '48px 48px 96px' }}>
      <h2 style={{ fontFamily: '"Space Grotesk", sans-serif', fontSize: 24, fontWeight: 600, color: '#F5F5F5', lineHeight: 1.3, marginBottom: 16, marginTop: 0 }}>Xe tương tự bạn có thể thích</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}>
        {CARS_FEATURED.map(c => <CarCard key={c.id} car={c} />)}
      </div>
    </section>

    <OtobankFooter />

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
    ['Lốp xe mòn 70% (4 bánh)', 'Thay 4 lốp Michelin Primacy 4 mới', 'Otobank Bình Tân'],
    ['Bóng đèn sương mù trái yếu', 'Thay bóng LED Osram mới', 'Otobank Bình Tân'],
    ['Bộ lọc gió cabin bẩn', 'Thay lọc gió cabin mới', 'Otobank Bình Tân'],
    ['Cốp xe đóng không khớp đều', 'Cân chỉnh khớp + thay đệm cao su', 'Otobank Bình Tân'],
    ['Camera lùi mờ do bụi', 'Vệ sinh + chỉnh lại tiêu cự', 'Otobank Bình Tân'],
  ];
  return (
    <div className="otobank" style={{ width: 1440, minHeight: 1900, background: 'var(--bg)' }}>
      <OtobankNav active="buy" />

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
              <span>Otobank Tech Center HCM</span>
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
            Otobank sửa hết các issues trước khi đưa xe lên website. Nếu có vấn đề tiềm ẩn không sửa được, xe sẽ không được list.
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
                Otobank tự gánh — không tính vào giá bán
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
