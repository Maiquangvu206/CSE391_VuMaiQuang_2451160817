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