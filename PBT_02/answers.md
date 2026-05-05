## PHẦN A — KIỂM TRA ĐỌC HIỂU (25 điểm)

### Câu A1 (5đ) — Input Types

1. `type="email"` → Ô nhập text (keyboard email trên mobile), browser validate format email cơ bản (có @ và domain) → Dùng cho đăng ký, login, khôi phục mật khẩu, liên hệ khách hàng.
2. `type="tel"` → Ô nhập số (keyboard số trên mobile), browser không tự validate ngoài pattern nếu đặt → Dùng cho số điện thoại khách hàng, OTP, hỗ trợ liên hệ.
3. `type="password"` → Ô nhập ẩn ký tự, có thể dùng minlength/pattern để validate → Dùng cho mật khẩu đăng ký/đăng nhập.
4. `type="number"` → Ô nhập số với spinner (↑↓), browser validate min/max/step → Dùng cho số lượng sản phẩm, nhập mã số lượng, giá trị số.
5. `type="date"` → Date picker (calendar), browser validate min/max → Dùng cho chọn ngày giao hàng mong muốn, ngày sinh, lịch hẹn.
6. `type="url"` → Ô nhập URL, browser validate định dạng URL → Dùng cho link sản phẩm ngoại truyện, website người bán, trang tham chiếu.
7. `type="file"` → Cho chọn file (có accept, multiple), browser không kiểm soát kích thước → Dùng để upload ảnh sản phẩm, hóa đơn, giấy tờ (KYC).
8. `type="checkbox"` → Hộp chọn Boolean, có thể dùng required để bắt buộc (một checkbox) → Dùng cho “Tôi đồng ý điều khoản”, chọn tùy chọn bổ sung (gói quà, nhận SMS).
9. `type="radio"` → Nhóm chọn một trong nhiều (mutually exclusive), required bắt buộc chọn 1 → Dùng cho phương thức thanh toán, chọn kích cỡ/màu sản phẩm.
10. `type="search"` → Ô tìm kiếm (giao diện/UX tối ưu cho search), không có validation đặc biệt → Dùng cho thanh tìm kiếm sản phẩm/thu hẹp kết quả.


### Câu A2 (5đ) — Validation Attributes


<!-- Trường hợp 1 -->
<input type="text" required value="">   <!-- User để trống -->

→ Trình duyệt sẽ chặn submit và hiển thị thông báo built-in (“Please fill out this field.”). Tại sao: required bắt buộc trường không được rỗng, nên khi value="" thì validity.valid = false.


<!-- Trường hợp 2 -->
<input type="email" value="abc">        <!-- User gõ "abc" -->

→ Trình duyệt chặn submit và hiển thị thông báo kiểu “Please enter an email address.” Tại sao: type="email" có kiểm tra định dạng cơ bản (phải chứa @ và domain), “abc” không hợp lệ nên validity.typeMismatch = true.


<!-- Trường hợp 3 -->
<input type="number" min="1" max="10" value="15"> <!-- User gõ 15 -->

→ Trình duyệt chặn submit và báo lỗi (ví dụ “Value must be less than or equal to 10”). Tại sao: giá trị 15 nằm ngoài range min/max, nên validity.rangeUnderflow/rangeOverflow = true (tùy trình duyệt sẽ báo overflow).


<!-- Trường hợp 4 -->
<input type="text" pattern="[0-9]{10}" value="abc123"> <!-- User gõ "abc123" -->

→ Trình duyệt chặn submit và báo “Please match the requested format.” Tại sao: giá trị không khớp regex pattern (yêu cầu đúng 10 chữ số), nên validity.patternMismatch = true.


<!-- Trường hợp 5 -->
<input type="password" minlength="8" value="123">  <!-- User gõ "123" -->

→ Trình duyệt chặn submit và báo lỗi kiểu “Please lengthen this text to 8 characters…”. Tại sao: minlength yêu cầu ít nhất 8 ký tự; giá trị 3 ký tự gây validity.tooShort = true.

***So sánh
- Trường hợp 1 (required, rỗng) → chặn submit, thông báo “Vui lòng điền vào trường này”
- Trường hợp 2 (type=email, "abc") → chặn submit, thông báo “Vui lòng bao gồm '@' trong địa chỉ email. 'abc' bị thiếu '@'.”
- Trường hợp 3 (number 15 > max 10) → chặn submit, thông báo về range (ví dụ “Giá trị phải nhỏ hơn hoặc bằng 10”).
- Trường hợp 4 (pattern 10 digits, "abc123") → chặn submit, thông báo “Vui lòng khớp với định dạng được yêu cầu”
- Trường hợp 5 (password minlength=8, "123") → submit bình thường.


### Câu A3 (5đ) — Accessibility

1. Vì for kết nối label với input bằng id, nên khi input được focus screen reader sẽ đọc label kèm theo — giúp người khiếm thị biết mục đích ô nhập. Ngoài ra click vào label cũng focus input (UX tốt), và label hiển thị cho mọi người (không chỉ screen reader).

2. Dùng khi cần nhóm các controls liên quan để cung cấp ngữ cảnh chung cho nhóm (đặc biệt với radio/checkbox). legend là nhãn của nhóm và được screen reader đọc khi vào nhóm.
Ví dụ:
- Nhóm phương thức thanh toán: <fieldset><legend>Phương thức thanh toán</legend><input type="radio"...></fieldset>
- Nhóm địa chỉ giao hàng: <fieldset><legend>Địa chỉ giao hàng</legend>...</fieldset>.

3. Dùng aria-label để cung cấp accessible name khi không có label hiển thị (ví dụ nút chỉ có icon: <button aria-label="Đóng">✕</button>), hoặc khi cần tên ngắn gọn cho AT.
Không nên dùng aria-label thay cho label khi đã có label hiển thị vì:
label cung cấp cả thông tin hình ảnh lẫn semantic cho tất cả người dùng; aria-label chỉ cho AT (không hiển thị).
Dùng cả hai có thể gây mâu thuẫn hoặc làm mất đi hành vi mặc định (screen reader có thể ưu tiên aria-*).
label + for hỗ trợ click-to-focus và là chuẩn HTML dễ bảo trì; aria-label là giải pháp khi không thể thêm label visible.

### Câu A4 (5đ) — Media

1. Chức năng: trì hoãn tải ảnh cho đến khi ảnh gần vào viewport (user sắp nhìn thấy).
Cải thiện: giảm băng thông và số request lúc load trang, tăng tốc initial page load, giảm TTI và có thể cải thiện CLS/LCP nếu không áp dụng cho ảnh chính.
Khi KHÔNG nên dùng: ảnh above‑the‑fold (hero, logo, LCP image), ảnh cần preload (critical images), hoặc khi bạn muốn đảm bảo ảnh được index/preview bởi crawlers cũ; kiểm tra kỹ với ảnh quan trọng cho UX/SEO.

2. Để tương thích trình duyệt và thiết bị (mỗi browser hỗ trợ codec/container khác nhau) và để phục vụ bản nén/độ phân giải phù hợp (performance).
Các format video web phổ biến: MP4 (H.264) , WebM (VP9/VP8) , Ogg/Theora (ngoài ra hiện đại có AV1).

3. Mục đích: cung cấp mô tả ngắn cho screen reader, hiển thị khi ảnh lỗi, và giúp SEO; alt="" dùng cho ảnh trang trí (screen reader bỏ qua). Viết alt nên ngắn, mô tả chức năng/nội dung quan trọng (không ghi tên file).

Ví dụ alt tốt:
- Ảnh sản phẩm iPhone 16: alt="iPhone 16 Pro Max 256GB màu Titan — mặt trước"
- Ảnh trang trí (decorative): alt=""
- Ảnh biểu đồ doanh thu Q1/2026: alt="Biểu đồ cột doanh thu Q1/2026 — tăng dần từ Tháng 1 đến Tháng 3"

### Câu A5 (5đ) — So sánh `<figure>` vs `<img>`
- Cách 1 — <img>: Dùng khi ảnh chỉ hiển thị trực tiếp, không cần chú thích/tài liệu kèm theo; thường là ảnh nhỏ hoặc ảnh chức năng.

Ví dụ A: Thumbnail trong lưới danh mục (product card) — chỉ cần alt ngắn.
Ví dụ B: Ảnh avatar người dùng hoặc icon giao diện (nhỏ, không cần caption).


- Cách 2 — <figure> + <figcaption>: Dùng khi ảnh cần ngữ cảnh/chú thích, nguồn, hoặc sẽ được tham chiếu trong nội dung; figcaption cung cấp mô tả rõ ràng cho mọi người và cho screen reader.

Ví dụ A: Ảnh sản phẩm lớn trên trang chi tiết kèm chú thích giá/phiên bản: hình + figcaption chứa “iPhone 16 Pro Max — 25.990.000₫”.
Ví dụ B: Biểu đồ/infographic trong báo cáo — ảnh + figcaption giải thích nội dung và ghi nguồn (ví dụ “Biểu đồ doanh thu Q1/2026 — nguồn: hệ thống bán hàng”).



### Bài B1 (20đ) — Form Đăng ký Tài khoản
HTML5 không thể tự kiểm tra khớp mật khẩu vì: Thiếu khả năng so sánh: HTML là ngôn ngữ đánh dấu, không phải ngôn ngữ lập trình. Nó chỉ có thể kiểm tra định dạng của từng ô riêng lẻ (như required, minlength), chứ không thể thực hiện logic so sánh giữa hai giá trị (A = B).Phạm vi độc lập: Các thuộc tính validation của HTML hoạt động cục bộ trên từng thẻ <input>. Nó không có cơ chế mặc định để tham chiếu giá trị từ ô này sang ô khác.

### Câu C1 (10đ) — Debug Form

Lỗi 1: Dòng 2 — Input "Tên" không có thẻ <label> liên kết qua id, vi phạm tiêu chuẩn accessibility.

Sửa: <label for="name">Tên:</label> <input type="text" id="name" name="name" required>

Lỗi 2: Dòng 4 — Input "Email" sử dụng placeholder thay thế cho nhãn dán, khiến trình đọc màn hình khó nhận diện và mất thông tin khi người dùng bắt đầu gõ.

Sửa: <label for="email">Email:</label> <input type="email" id="email" name="email" required>

Lỗi 3: Dòng 6 & 7 — Các trường mật khẩu thiếu thuộc tính name để gửi dữ liệu về server và thiếu ràng buộc độ dài/định dạng.

Sửa: <input type="password" id="pw" name="password" minlength="8" required>

Lỗi 4: Dòng 9 — Input "Phone" sử dụng type="text" thay vì type="tel", làm mất bàn phím số tối ưu trên di động.

Sửa: <label for="phone">Phone:</label> <input type="tel" id="phone" name="phone" pattern="[0-9]{10}">

Lỗi 5: Dòng 11 — Thẻ <select> thiếu id để liên kết với nhãn và các thẻ <option> thiếu thuộc tính value để gửi giá trị về server.

Sửa: <select id="city" name="city"><option value="hn">Hà Nội</option>...</select>

Lỗi 6: Dòng 16 — Thẻ <label> cho điều khoản không chứa input hoặc không liên kết với checkbox.

Sửa: <input type="checkbox" id="terms" name="terms" required> <label for="terms">Tôi đồng ý điều khoản</label>

Lỗi 7: Dòng 1 — Thẻ <form> thiếu thuộc tính action và method, dẫn đến việc không xác định được dữ liệu sẽ gửi đi đâu và gửi như thế nào.

Sửa: <form action="/submit-form" method="POST">

Lỗi 8: Dòng 20 — Sử dụng <input type="submit"> thay vì thẻ <button type="submit"> (hạn chế khả năng tùy biến và nội dung bên trong nút).

Sửa: <button type="submit">Gửi thông tin</button>


### Câu C2 (10đ) — Thiết kế chiến lược Validation
1. Trong HTML5, thuộc tính pattern sử dụng biểu thức chính quy (Regex). Lưu ý rằng mặc định pattern sẽ khớp với toàn bộ nội dung của ô nhập liệu.

- CMND/CCCD (Đúng 12 chữ số): pattern="[0-9]{12}" hoặc pattern="\d{12}"
- Số tài khoản (Từ 10 đến 15 chữ số): pattern="[0-9]{10,15}" hoặc pattern="\d{10,15}"

2. CHƯA ĐỦ AN TOÀN.
Lý do:
Dễ bị vượt qua: Bất kỳ người dùng nào có kiến thức cơ bản về trình duyệt đều có thể mở F12 (Developer Tools) để xóa bỏ thuộc tính required, pattern hoặc thay đổi type của input trong tích tắc.

Vô hiệu hóa trình duyệt: Người dùng có thể tắt JavaScript hoặc sử dụng các công cụ như Postman, cURL để gửi dữ liệu trực tiếp đến Server mà không thông qua form HTML, khiến các ràng buộc trên Frontend hoàn toàn vô tác dụng.

Tính toàn vẹn dữ liệu: HTML5 chỉ kiểm tra được định dạng (cú pháp), không kiểm tra được tính đúng đắn (logic) của dữ liệu trong hệ thống ngân hàng.

3.3 loại validation mà HTML5 KHÔNG THỂ làm được (phải dùng JavaScript)
- So khớp dữ liệu giữa các trường (Comparison): Ví dụ: Kiểm tra "Mật khẩu" và "Nhập lại mật khẩu" có trùng khớp nhau hay không.
- Kiểm tra tính duy nhất (Uniqueness Check): HTML5 không thể tự kết nối với cơ sở dữ liệu để biết Email hoặc Số tài khoản này đã tồn tại hay chưa. Việc này cần AJAX/Fetch để gọi API kiểm tra.
- Logic phức tạp theo điều kiện: Ví dụ: Nếu phương thức nhận thông báo là "Email" thì mới bắt buộc nhập trường Email, nếu là "SĐT" thì trường Email có thể để trống.

4. 2 rủi ro bảo mật nếu chỉ validate trên Frontend mà không có Backend
- Tấn công tiêm nhiễm dữ liệu độc hại (Injection Attacks): Kẻ tấn công có thể gửi các đoạn mã SQL (SQL Injection) hoặc mã độc script (XSS) trực tiếp vào Server. Vì Backend không kiểm tra lại, những mã này sẽ thực thi trong cơ sở dữ liệu, dẫn đến lộ thông tin khách hàng hoặc mất tiền trong tài khoản.
- Rác dữ liệu và phá vỡ logic nghiệp vụ: Hệ thống sẽ lưu trữ những dữ liệu sai lệch (ví dụ: số tiền âm, số tài khoản chứa chữ cái, ngày sinh ở tương lai). Điều này gây tê liệt các tính năng tính toán lãi suất, chuyển tiền và làm sai lệch hoàn toàn báo cáo tài chính của ngân hàng.