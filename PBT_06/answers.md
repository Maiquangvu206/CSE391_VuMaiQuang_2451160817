#### Câu A1 (10đ) — Grid System

```html
<div class="container">
		<div class="row">
				<div class="col-12 col-md-6 col-lg-3">Box 1</div>
				<div class="col-12 col-md-6 col-lg-3">Box 2</div>
				<div class="col-12 col-md-6 col-lg-3">Box 3</div>
				<div class="col-12 col-md-6 col-lg-3">Box 4</div>
		</div>
</div>
```
| Kích thước | < 768px | 768px - 991px | ≥ 992px |
|------------|---------|---------------|---------|
| Số cột | 1 | 2 | 4 |
| Box layout | Stack | 2 columns | 4 columns |

- col-md-6 nghĩa là: từ breakpoint md (≥768px) trở lên, phần tử chiếm 6/12 cột (tức 50% chiều ngang).
- vì col-12 (không có tiền tố breakpoint) đã đặt chiều rộng 12/12 cho mọi kích thước mặc định (mobile-first). Khi tới breakpoint md/lg các lớp col-md-*/col-lg-* sẽ ghi đè. Viết thêm col-sm-12 là thừa (chỉ lặp lại giá trị đã có).

#### Câu A2 (10đ) — Utilities & Components
1) d-none d-md-block — khi/ẩn/hiện
d-none: ẩn (display: none) trên mọi kích thước (mặc định).
d-md-block: từ breakpoint md trở lên (Bootstrap: >=768px) ghi đè thành display: block.
Kết luận: phần tử sẽ ẩn trên mobile / nhỏ (<768px) và **hiện dạng block trên tablet+ / desktop** (>=768px).

2) 5 utility spacing (margin / padding) — ví dụ & giải thích
mt-3 : margin-top mức 3 (mức số tăng dần theo thang của framework). Dùng để thêm khoảng cách phía trên.
mb-auto : margin-bottom = auto — thường dùng để đẩy phần tử về phía trên trong flex/cột (flex spacer).
px-4 : padding-left và padding-right mức 4 — thêm khoảng ngang hai bên.
py-2 : padding-top và padding-bottom mức 2 — thêm khoảng dọc trên/dưới.
mx-auto : margin-left/right = auto — thường dùng để canh giữa phần tử theo chiều ngang (chẳng hạn display:block; width:...; margin:auto).
Ghi chú: các mức như -0 → -1 → -2 … -5 thường tương ứng với các giá trị kích thước tăng dần (thang của Bootstrap). auto có nghĩa là margin: auto.

3) Khác nhau giữa .container, .container-fluid, .container-md
.container — hộp có chiều rộng cố định từng breakpoint (responsive max-width). Ở mỗi breakpoint có max-width khác nhau; không chiếm toàn chiều ngang, có padding bên trong. Dùng cho layout căn giữa với giới hạn chiều rộng.
.container-fluid — chiếm 100% chiều rộng viewport (full-width) ở mọi kích thước. Thường dùng cho background hoặc layout trải toàn trang.
.container-{breakpoint} (ví dụ .container-md) — hành vi lai: chiếm toàn chiều rộng (100%) dưới breakpoint đó, và chuyển thành container cố định (max-width) từ breakpoint đó trở lên. Ví dụ .container-md là full-width dưới md, và từ md (>=768px) trở lên sẽ có max-width tương ứng breakpoint md.

#### Câu C1 (10đ) — Tùy biến Bootstrap
- Các bước
1. Xác định biến SASS dùng cho màu chủ đạo (ví dụ ` $primary` hoặc `$primary-color`).
2. Thay giá trị biến bằng `#E63946` trong file biến SASS.
3. Biên dịch lại SCSS sang CSS bằng Dart Sass (`sass`) hoặc chạy task build của project.


Tại sao KHÔNG nên override trực tiếp ` .btn-primary { background: red; }`
- **Bảo trì:** Thay đổi biến một chỗ cập nhật toàn site; override selector phải sửa nhiều chỗ.
- **Nhất quán giao diện:** Các thành phần khác (border, hover, focus, disabled) thường dùng cùng biến — dùng biến giữ tất cả đồng bộ.
- **Theming & reuse:** Dễ tạo theme (ví dụ light/dark) hoặc đổi nhanh bằng cách thay vài biến, không phải tìm/replace CSS.
- **Phép toán màu:** SASS cho phép dùng `lighten()`, `darken()`, `mix()` trên biến màu để tự sinh hover/active tự động.
- **Tránh vấn đề specificity/cascade:** Việc ghi đè selector có thể cần `!important` hoặc selectors phức tạp; biến tránh rối này.

#### Câu C2 (10đ) — So sánh

```html
<nav class="nav">
	<div class="container">
		<a href="#" class="brand">MyShop</a>

		<input id="nav-check" type="checkbox" />
		<label class="nav-toggle" for="nav-check"></label>

		<div class="nav-links">
			<a href="#">Home</a>
			<a href="#">Products</a>
			<a href="#">About</a>
			<a href="#">Contact</a>
		</div>
	</div>
</nav>

<main class="container">
	<section class="cards">
		<article class="card">
			<img src="https://via.placeholder.com/400x240" alt="">
			<div class="card-body">
				<div class="card-title">Product name</div>
				<div class="card-price">$29.99</div>
				<div class="card-actions">
					<a class="btn btn-primary" href="#">Buy</a>
					<a class="btn btn-outline" href="#">Details</a>
				</div>
			</div>
		</article>
	</section>
</main>
```

CSS thuần (ví dụ tối giản):

```css
*{box-sizing:border-box}
body{font-family:Arial,sans-serif;margin:0;color:#111}
.container{max-width:1100px;margin:0 auto;padding:0 16px}

.nav{background:#fff;border-bottom:1px solid #e5e5e5}
.nav .container{display:flex;align-items:center;justify-content:space-between;height:60px}
.brand{font-weight:700;color:#E63946;text-decoration:none;font-size:1.1rem}
.nav-links{display:flex;gap:16px;align-items:center}
.nav-links a{color:#333;text-decoration:none;padding:8px 12px;border-radius:6px}
.nav-links a:hover{background:#f2f2f2}

.nav-toggle{display:none}
.nav input[type=checkbox]{display:none}

@media (max-width:768px){
	.nav-toggle{display:inline-block;cursor:pointer;width:36px;height:36px;border-radius:6px;background:#f7f7f7}
	.nav-toggle:after{content:"☰";font-size:20px;line-height:36px;display:block;text-align:center;color:#333}
	.nav-links{position:fixed;top:56px;left:0;right:0;background:#fff;flex-direction:column;padding:12px;gap:8px;transform:translateY(-120%);transition:transform .25s ease;box-shadow:0 6px 18px rgba(0,0,0,.08)}
	.nav input[type=checkbox]:checked + .nav-toggle + .nav-links{transform:translateY(0)}
}

.cards{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:20px;padding:24px 0}
.card{background:#fff;border:1px solid #e6e6e6;border-radius:8px;overflow:hidden;display:flex;flex-direction:column}
.card img{width:100%;height:160px;object-fit:cover;display:block}
.card-body{padding:12px 14px;display:flex;flex-direction:column;gap:8px;flex:1}
.card-title{font-size:1rem;font-weight:600;color:#111}
.card-price{color:#E63946;font-weight:700;margin-top:auto}
.card-actions{display:flex;gap:8px;margin-top:8px}
.btn{padding:8px 12px;border-radius:6px;border:1px solid transparent;cursor:pointer;text-decoration:none;text-align:center;display:inline-block}
.btn-primary{background:#E63946;color:#fff;border-color:#E63946}
.btn-outline{background:transparent;color:#333;border-color:#dcdcdc}
.btn:hover{opacity:.95;transform:translateY(-1px);transition:transform .12s ease,opacity .12s ease}
```

So sánh với phiên bản dùng Bootstrap
- **Số dòng CSS cần viết:**
	- CSS thuần: ~30–80 dòng cho ví dụ trên (tùy chi tiết, responsiveness, states).
	- Bootstrap: 0 dòng custom để có layout cơ bản (chỉ include framework); tuỳ biến nhỏ có thể cần vài dòng hoặc thay đổi biến SASS.
- **Thời gian phát triển:**
	- CSS thuần: lâu hơn (viết layout, responsivity, interactions, test trên nhiều trình duyệt).
	- Bootstrap: nhanh hơn cho prototype và các component chuẩn (grid, navbar, cards có sẵn).
- **Khả năng tùy biến:**
	- CSS thuần: tối đa — toàn quyền kiểm soát mọi chi tiết.
	- Bootstrap: dễ tùy biến về spacing/layout bằng utilities; thay đổi visual system tốt nhất qua SASS variables; can thiệp sâu có thể cần override phức tạp.
- **Khi nào NÊN dùng Bootstrap:**
	- Prototype nhanh, deadline gấp, cần nhiều thành phần UI chuẩn sẵn.
	- Team cần consistency nhanh và muốn tận dụng utilities + components.
- **Khi nào KHÔNG NÊN dùng Bootstrap:**
	- Yêu cầu UI hoàn toàn custom, branding khác biệt (tránh bloat classes không cần thiết).
	- Dự án rất nhỏ, nơi đưa cả framework là quá nặng.
	- Muốn tối ưu bundle/độ mỏng CSS tối đa hoặc dùng hệ thống khác (utility-first, CSS-in-JS).

