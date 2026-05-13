### Câu A1 (5đ) — Viewport & Mobile-First

1. Viết chính xác thẻ `<meta viewport>` chuẩn và giải thích

```
<meta name="viewport" content="width=device-width, initial-scale=1">
```

- `name="viewport"`: cho trình duyệt biết thẻ này điều khiển viewport.
- `width=device-width`: đặt chiều rộng của layout viewport bằng chiều rộng thiết bị (tính theo CSS pixels), giúp các media query hoạt động đúng theo kích thước thiết bị.
- `initial-scale=1`: thiết lập tỉ lệ phóng ban đầu là 1 (không phóng to/thu nhỏ khi load).

2. Nếu THIẾU thẻ này, iPhone sẽ hiển thị trang web như thế nào?

- Trình duyệt sẽ giả sử một "virtual viewport" rộng (thường khoảng 980px) và thu nhỏ toàn bộ layout để vừa màn hình. Kết quả: giao diện trông như bản desktop bị co lại, chữ rất nhỏ, các breakpoint responsive không hoạt động như mong muốn.

3. Mobile-First và Desktop-First khác nhau thế nào? Viết ví dụ CSS cho mỗi cách với breakpoint 768px.

- Khái niệm:
	- Mobile-First: viết styles cơ bản cho màn hình nhỏ (mobile), sau đó mở rộng cho màn hình lớn bằng `@media (min-width: ...)`.
	- Desktop-First: viết styles cơ bản cho màn hình lớn (desktop), sau đó ghi đè cho màn hình nhỏ bằng `@media (max-width: ...)`.

- Ví dụ Mobile-First (breakpoint 768px):

```css
/* Mobile-first (base = mobile) */
.nav { display: block; }
.container { padding: 16px; }

@media (min-width: 768px) {
	.nav { display: flex; }
	.container { max-width: 1100px; margin: 0 auto; padding: 24px; }
}
```

- Ví dụ Desktop-First (breakpoint 768px):

```css
/* Desktop-first (base = desktop) */
.nav { display: flex; }
.container { max-width: 1100px; margin: 0 auto; padding: 24px; }

@media (max-width: 767px) {
	.nav { display: block; }
	.container { padding: 16px; }
}
```

4. Tại sao Mobile-First được khuyên dùng?

- Progressive enhancement: bắt đầu từ trải nghiệm cơ bản (mobile) rồi mở rộng cho thiết bị mạnh hơn.
- Hiệu năng: tải ít CSS mặc định cho mobile, giảm chi phí render trên thiết bị yếu và mạng chậm.
- Dễ bảo trì: dùng `min-width` và thêm styles mở rộng thay vì ghi đè nhiều lần.
- Tối ưu UX/SEO: ưu tiên nội dung cho người dùng di động (phổ biến) và cải thiện khả năng truy cập.

---

### Câu A2 (5đ) — Breakpoints

---
- **Extra small (xs)**
	- Kích thước: < 576px (không có media query riêng; base styles)
	- Thiết bị đại diện: điện thoại nhỏ

- **Small (sm)**
	- Kích thước: ≥ 576px
	- Thiết bị đại diện: điện thoại lớn / portrait phablet
	- Media query: `@media (min-width: 576px) { ... }`

- **Medium (md)**
	- Kích thước: ≥ 768px
	- Thiết bị đại diện: tablet / small landscape tablet
	- Media query: `@media (min-width: 768px) { ... }`

- **Large (lg)**
	- Kích thước: ≥ 992px
	- Thiết bị đại diện: laptop / small desktop
	- Media query: `@media (min-width: 992px) { ... }`

- **Extra large (xl)**
	- Kích thước: ≥ 1200px
	- Thiết bị đại diện: desktop
	- Media query: `@media (min-width: 1200px) { ... }`

- **XXL (xxl)**
	- Kích thước: ≥ 1400px
	- Thiết bị đại diện: màn hình lớn / desktop cao phân giải
	- Media query: `@media (min-width: 1400px) { ... }`

### Câu A3 (5đ) — Media Queries


| Chiều rộng màn hình | `.container` width |
|---------------------|--------------------|
| 375px (iPhone SE) | 100% (≈375px) |
| 600px | 540px |
| 800px | 720px |
| 1000px | 960px |
| 1400px | 1140px |

---

### SCSS (refactor) — files added

I created a SCSS structure and compiled CSS in `PBT_05`:

- `scss/_variables.scss` — color, font, breakpoints, spacing variables
- `scss/_mixins.scss` — `respond-to()`, `flex-center`, `card-shadow`
- `scss/_components.scss` — nested `.card` block and components
- `scss/style.scss` — main file importing partials
- `style.css` — compiled CSS output

Compile command (use Dart Sass):

```
sass scss/style.scss style.css --no-source-map
```

Or compile whole folder:

```
sass scss:.
```


### Câu A4 (5đ) — SCSS Basics

1. Variables: Biến cho phép lưu giá trị dùng lại.
```scss
$primary-color: #3498db;
$radius: 6px;

.button {
  background: $primary-color;
  border-radius: $radius;
  color: #fff;
}
```

2. Nesting (CSS lồng nhau): Viết selector lồng để biểu đạt cấu trúc DOM rõ ràng.
```scss
.nav {
  ul {
    margin: 0;
    li {
      display: inline-block;
      a { color: $primary-color; }
    }
  }
}
```

3. Mixins (@mixin / @include): Định nghĩa khối CSS tái sử dụng, có tham số.
```scss
@mixin btn($bg, $pad: .5rem) {
  background: $bg;
  padding: $pad;
  border-radius: 4px;
}

.btn { @include btn($primary-color); }
.btn-large { @include btn(darken($primary-color, 10%), 1rem); }
```

4.@extend / Inheritance: Chia sẻ toàn bộ rules của selector khác (hoặc placeholder %).
```scss
%card-base {
  padding: 1rem;
  box-shadow: 0 2px 6px rgba(0,0,0,.1);
}

.card { @extend %card-base; background: #fff; }
.panel { @extend %card-base; border-left: 4px solid $primary-color; }
```

->.scss là ngôn ngữ tiền xử lý (Sass) có cú pháp mở rộng, biến, mixin, nesting... Trình duyệt chỉ hiểu CSS tiêu chuẩn, nên cần chuyển (compile) .scss thành .css trước khi đưa lên web.

->Cài Sass (Dart Sass được khuyến nghị) và biên dịch hoặc dùng bundler (Webpack/Gulp/Vite).
Ví dụ dùng CLI (cài global hoặc dev-dependency):

### Câu C1 (10đ) — Phân tích trang web thực

- **Navigation thay đổi thế nào?**
	- Mobile: Hiển thị biểu tượng hamburger (`.hamburger`) và ẩn menu chính bằng CSS (`.main-nav { display: none; }`). Khi người dùng mở menu (thêm class `.open`), menu hiện dưới dạng danh sách dọc.
	- Tablet / Desktop: Ẩn hamburger (`display: none`) và hiển thị menu ngang (`.main-nav ul { display: flex; }`). Không dùng dropdown; chuyển đổi là giữa hamburger (mobile) và horizontal nav (desktop).

- **Lưới content thay đổi mấy cột?**
	- Mobile (< 768px): 1 cột.
	- Tablet (≥ 768px và < 1024px): 2 cột.
	- Desktop (≥ 1024px): 4 cột.
	- (Quy tắc: `.product-grid` / `.grid` với `grid-template-columns` thay đổi trong `@media (min-width: 768px)` và `@media (min-width: 1024px)`).

- **Elements nào bị ẩn trên mobile?**
	- `.sidebar` (filter) — ẩn trên mobile, hiển thị ở tablet/desktop.
	- `.ads` (ads bar) — ẩn trên mobile và tablet, hiển thị ở desktop.
	- `.main-nav` về mặt hiển thị mặc định bị ẩn trên mobile (thay bằng hamburger).

- **Font size có thay đổi không?**
	- Có: base `font-size: 16px` trên mobile; tăng lên `17px` ở `@media (min-width: 768px)`; tăng lên `18px` ở `@media (min-width: 1024px)` — giúp readability trên màn hình lớn hơn.

---

### Câu C2 (10đ) — Thiết kế trang "Đặt bàn nhà hàng" (Wireframe & CSS skeleton)

Wireframe (theo Mobile-First):

- Mobile (≤ 767px)
```
[HEADER]
  Logo      Số điện thoại

[HERO IMAGE]  (chiếm toàn chiều ngang)

[FORM ĐẶT BÀN] (xếp dọc: ngày, giờ, số người, ghi chú)

[GALLERY ẢNH MÓN]
  ▢
  ▢  ▢  (trên điện thoại lớn có thể 2 cột; mặc định 1 cột)
  ▢

{BẢN ĐỒ: ẩn hoặc thu gọn}

[FOOTER]
```


- Tablet (768px — 1023px)
```
[HEADER] (logo + số điện thoại nằm ngang)

[HERO IMAGE] (chiếm toàn chiều ngang)

[KHU VỰC TRÊN]
  [FORM ĐẶT BÀN (các trường có thể xếp 2 cột)]

[GALLERY ẢNH MÓN]
  ▢ ▢ ▢   (lưới 3 cột)
  ▢ ▢ ▢

[BẢN ĐỒ] (nhúng, nằm dưới gallery hoặc cạnh form nếu đủ chỗ)

[FOOTER]
```

- Desktop (≥ 1024px)
```
[HEADER] (logo trái, số điện thoại phải)

[HERO IMAGE] (chiếm toàn chiều ngang hoặc banner lớn)

[LAYOUT CHÍNH: 3 cột]
  [TRÁI]   Sidebar (tuỳ chọn): thông tin ngắn / khuyến mãi
  [GIỮA]   Nội dung chính: GALLERY ẢNH (lưới 4 cột)
  [PHẢI]   Panel đặt bàn + Google Map (cố định/sticky)

[FOOTER]
```


Các phần bị ẩn/di chuyển theo breakpoint:
- Mobile: Bản đồ ẩn/thu gọn; sidebar không hiển thị. Gallery giảm số cột (1–2).
- Tablet: Sidebar hợp nhất vào nội dung (xuống dòng) hoặc nằm trên/dưới; bản đồ hiển thị nhưng thường nằm dưới gallery.
- Desktop: Sidebar hiển thị (form + map); gallery hiển thị nhiều cột hơn (4 cột).

CSS skeleton (Mobile-First) — chỉ layout, dùng Grid + media queries

```css
/* Cơ bản (mobile-first) */
:root{
  --gap: 16px;
}
*{box-sizing:border-box}
body{margin:0;font-family:system-ui,Arial,sans-serif}
.site{display:grid;grid-template-rows:auto auto 1fr auto;min-height:100vh}
.header{padding:12px;display:flex;justify-content:space-between;align-items:center}
.hero{width:100%;height:220px;background:#ccc}

/* Nội dung chính xếp dọc trên mobile */
.main{display:grid;gap:var(--gap);padding:12px}
.booking-form{background:#fff;padding:12px;border-radius:6px}
.gallery{display:grid;grid-template-columns:1fr;gap:12px}
.gallery img{width:100%;height:auto;display:block}
.map{display:none} /* ẩn map trên mobile */
.footer{padding:12px;background:#f6f6f6;text-align:center}

/* Tablet */
@media (min-width:768px){
  .hero{height:320px}
  .gallery{grid-template-columns:repeat(3,1fr)} /* 3 cột cho tablet */
  .booking-form{max-width:720px;margin:0 auto} /* căn giữa form hoặc đặt trên gallery */
  .map{display:block;height:300px} /* hiển thị map dưới nội dung */
}

/* Desktop */
@media (min-width:1024px){
  .site{grid-template-columns:240px 1fr 360px;grid-template-rows:auto 1fr auto;grid-template-areas:
    "header header header"
    "sidebar content aside"
    "footer footer footer"}

  .header{grid-column:1/-1}
  .sidebar{grid-area:sidebar;display:block;padding:12px}
  .content{grid-area:content;padding:12px}
  .aside{grid-area:aside;padding:12px} /* form + map đặt ở đây */

  .gallery{grid-template-columns:repeat(4,1fr)} /* 4 cột cho desktop */
  .map{display:block;height:100%}
}

/* Ảnh responsive */
.responsive-img{max-width:100%;height:auto;display:block}

/* Lưu ý: các trường form giữ flow; có thể thêm sticky cho desktop nếu cần */
```
