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