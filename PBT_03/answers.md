### Câu A1 (5đ) — 3 Cách nhúng CSS
1. Inline CSS (CSS nội dòng): Đây là cách viết trực tiếp thuộc tính CSS vào thẻ HTML thông qua thuộc tính style.

Ví dụ: <h1 style="color: blue; font-size: 20px;">Chào mừng bạn!</h1>

Ưu điểm: Nhanh, tiện khi muốn test nhanh hoặc thay đổi duy nhất một phần tử mà không muốn động vào file CSS.

Nhược điểm: Làm code HTML trở nên rối rắm, khó bảo trì và không thể tái sử dụng cho các thẻ khác.

Khi nào nên dùng: Khi bạn cần sửa gấp một element đơn lẻ hoặc dùng trong Email Marketing (vì một số trình duyệt email hỗ trợ inline CSS tốt nhất).

2. Internal CSS (CSS nội bộ): Viết các quy tắc CSS bên trong thẻ <style>, thường được đặt trong phần <head> của file HTML.

Ví dụ:
<head>
    <style>
        p {
            color: red;
            line-height: 1.5;
        }
    </style>
</head>

Ưu điểm: Kiểm soát tất cả phong cách của một trang web duy nhất tại một nơi. Không cần tạo thêm file bên ngoài.

Nhược điểm: Chỉ có tác dụng trên đúng trang đó. Nếu website có 100 trang, bạn phải copy đoạn code này 100 lần.

Khi nào nên dùng: Khi bạn chỉ làm một trang đơn (Landing Page) hoặc muốn định nghĩa style riêng biệt cho một trang đặc thù.

3. External CSS (CSS bên ngoài): Viết các quy tắc CSS trong một file riêng biệt có đuôi .css và liên kết nó với file HTML thông qua thẻ <link>.

Ví dụ:
File style.css: 
body {
    background-color: #f0f0f0;
}
.content {
    margin: 20px;
}

File index.html:
<head>
    <link rel="stylesheet" href="styles.css">
</head>


Ưu điểm: Tách biệt hoàn toàn giữa nội dung (HTML) và trình bày (CSS), giúp code sạch sẽ, dễ bảo trì và tái sử dụng cho nhiều trang.

Nhược điểm: Cần phải tải thêm một file CSS, có thể làm chậm trang nếu file quá lớn hoặc mạng chậm.

Khi nào nên dùng: Khi bạn xây dựng một website có nhiều trang hoặc muốn tái sử dụng cùng một phong cách cho nhiều phần tử trên toàn bộ website. Đây là phương pháp được khuyến khích sử dụng nhất trong phát triển web hiện đại.

4. Nếu cùng một element bị tác động bởi cả 3 cách, thứ tự ưu tiên (từ cao xuống thấp) thông thường sẽ là: Inline CSS -> Internal CSS == External CSS

Giải thích:
Độ ưu tiên (Specificity): Inline CSS thắng vì nó nằm trực tiếp trên phần tử, trình duyệt coi đó là chỉ thị cụ thể nhất.
Internal CSS và External CSS có độ ưu tiên bằng nhau, nhưng nếu có xung đột, quy tắc nào xuất hiện sau sẽ thắng (theo nguyên tắc "càng gần càng ưu tiên"). Tuy nhiên, trong thực tế, External CSS thường được đặt trước Internal CSS trong phần <head>, nên Internal CSS sẽ thắng nếu có xung đột.

### Câu A2 (8đ) — CSS Selectors — Dự đoán kết quả
1. h1                           → Chọn: ShopTLU
2. .price                       → Chọn: 25.990.000đ và 45.990.000đ
3. #app header                  → Chọn: Toàn bộ nội dung bên trong thẻ <header>
4. nav a:first-child             → Chọn: Home
5. .product.featured h2         → Chọn: MacBook Pro
6. article > p                  → Chọn: 25.990.000đ, Mô tả sản phẩm... (của iPhone 16) và 45.990.000đ, Mô tả sản phẩm... (của MacBook Pro)
7. a[href="/"]                  → Chọn: Home
8. .top-bar.dark h1              → Chọn: ShopTLU

### Câu A3 (7đ) — Box Model — Tính toán kích thước

/* Trường hợp 1: content-box (mặc định) */
.box-1 {
    width: 400px;
    padding: 20px;
    border: 5px solid black;
    margin: 10px;
}
→ Chiều rộng hiển thị = 400 +(20x2) + (5x2) = 450px
→ Không gian chiếm trên trang = 450 + (10x2) = 470px

/* Trường hợp 2: border-box */
.box-2 {
    box-sizing: border-box;
    width: 400px;
    padding: 20px;
    border: 5px solid black;
    margin: 10px;
}
→ Chiều rộng hiển thị = 400px
→ Kích thước content thực tế = 400 - (20x2) - (5x2) = 350px
→ Không gian chiếm trên trang = 400 + (10x2) = 420px

/* Trường hợp 3: Margin collapse */
.box-a { margin-bottom: 25px; }
.box-b { margin-top: 40px; }
→ Khoảng cách giữa box-a và box-b = 40px
→ Giải thích tại sao KHÔNG PHẢI 65px: Theo quy tắc Margin Collapse, khi hai lề dương tiếp xúc với nhau, trình duyệt sẽ chọn giá trị lớn nhất (trong trường hợp này là 40px của box-b) và bỏ qua giá trị nhỏ hơn.

/*Nâng cao:
Khi có sự xuất hiện của margin âm, quy tắc tính toán sẽ thay đổi  lấy giá trị dương lớn nhất cộng với giá trị âm nhỏ nhất.Khoảng cách giữa box-a và box-b: 40px + (-10px) = 30px

### Câu A4 (5đ) — Specificity (Độ ưu tiên)
1.Tính độ ưu tiên:
- p: 0-0-1 (1 element)
- .price: 0-1-0 (1 class)
- #main-price: 1-0-0 (1 ID)
- p.price: 0-1-1 (1 class + 1 element)

2. Element sẽ có màu Đỏ (Red). vì ID có độ ưu tiên cao nhất (1-0-0) so với class (0-1-0) và element (0-0-1). Mặc dù p.price có cả class và element, nhưng nó vẫn có độ ưu tiên thấp hơn ID. Do đó, quy tắc #main-price sẽ được áp dụng, khiến cho đoạn văn có màu đỏ.

3. Nếu thêm `<p class="price" id="main-price" style="color: orange;">`, element có màu Cam (Orange)

4. Nếu Rule A thêm `!important`, element có màu gì? Tại sao? 
   - Element sẽ có màu Đỏ (Red) vì `!important` có độ ưu tiên cao hơn cả ID. Cụ thể, khi một quy tắc CSS được đánh dấu là `!important`, nó sẽ ghi đè tất cả các quy tắc khác, bất kể độ ưu tiên của chúng. Do đó, dù Rule B có ID và Rule A có `!important`, màu sắc sẽ được xác định bởi Rule A, khiến cho đoạn văn có màu đỏ.

### Bài B1 (20đ) — Style trang Profile

- Element selectors: `body`, `table`, `img`, `footer`.
- Class selectors: `.active`, `.highlight`.
- ID selectors: `#about`, `#skills`, `#contact`.
- Descendant selector: `header nav ul li a`.
- Pseudo-classes: `a:hover`, `tr:hover`, `tr:nth-child(even)`.

### Bài B2 (20đ) — Box Model Lab

Phần 1 — Content-box vs Border-box

- Hộp 1 (content-box): chiều rộng thực tế = 350 px (300px width + 20px padding ×2 + 5px border ×2)
- Hộp 2 (border-box): chiều rộng thực tế = 300 px (width 300px đã bao gồm padding và border)

Giải thích sự khác biệt:

Content-box là chế độ mặc định: thuộc tính `width` chỉ áp dụng cho phần content bên trong; padding và border được cộng thêm vào khiến tổng chiều rộng hiển thị = content width  + 2×padding + 2×border. Ở ví dụ này: 300 + 40 + 10 = 350px.

Border-box: `width` bao gồm cả padding và border nên tổng chiều rộng hiển thị bằng đúng giá trị `width` khai báo (300px). Vì vậy cùng một `width`+`padding`+`border` cho hai chế độ sẽ dẫn tới kết quả khác nhau trong kích thước hiển thị.

Phần 2 — Layout 3 cột

- Phiên bản `border-box`: tổng chiều rộng 3 cột = 1000px (ghi kết quả và đính kèm screenshot DevTools).
- Phiên bản `content-box`: tổng chiều rộng 3 cột = ___ px (ghi kết quả và đính kèm screenshot DevTools showing overflow > 1000px).

### Bài B3 (15đ) — Specificity Battle

1) Danh sách 10 rules (theo file `PBT_03/specificity.css`) và điểm specificity (id-class-element):

- `p { color: #777777; }` — Specificity: 0-0-1
- `body p { color: #0066cc; }` — Specificity: 0-0-2
- `section article p { color: #008000; }` — Specificity: 0-0-3
- `.text { color: #aa00aa; }` — Specificity: 0-1-0
- `[class~="text"] { color: #ff6600; }` — Specificity: 0-1-0
- `div .text { color: #0000ff; }` — Specificity: 0-1-1
- `.text.highlight { color: #ff1493; }` — Specificity: 0-2-0
- `#demo { color: #00ced1; }` — Specificity: 1-0-0
- `#demo.text { color: #8b0000; }` — Specificity: 1-1-0
- `html body section article #demo.text.highlight { color: #000000; }` — Specificity: 1-2-4

2) Element cuối cùng hiển thị màu gì? Tại sao?

- Hiển thị màu: `#000000` (đen). Vì rule cuối cùng (`html body section article #demo.text.highlight`) có specificity cao nhất (1-2-4) nên nó thắng mọi rule khác mặc dù tất cả đều target cùng phần tử.

4) Thay đổi thứ tự rules trong CSS file. Kết quả có đổi không? Giải thích.

- Nếu đổi thứ tự giữa các rules có specificity khác nhau (ví dụ một rule có class vs một rule có id), rule có specificity cao hơn luôn thắng bất kể thứ tự xuất hiện. Vì vậy thay đổi thứ tự không làm thay đổi kết quả khi specificity khác nhau.
- Nếu có hai rules có specificity bằng nhau (ví dụ `.text {}` và `[class~="text"] {}` đều 0-1-0), thì rule xuất hiện sau trong file sẽ thắng (cascade by source order). Vì vậy thay đổi thứ tự giữa các rules cùng specificity sẽ thay đổi màu hiển thị.

