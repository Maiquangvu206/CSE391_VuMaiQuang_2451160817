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