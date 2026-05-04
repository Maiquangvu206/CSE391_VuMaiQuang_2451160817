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