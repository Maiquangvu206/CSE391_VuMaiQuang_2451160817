
# Câu A1

## a. Ý 1

    1. DNS lookup: trình duyệt/OS kiểm tra cache → hỏi DNS resolver → nhận địa chỉ IP (có thể là IP của CDN edge).
    2. TCP 3-way handshake: client và server (hoặc CDN) thiết lập kết nối TCP (SYN, SYN-ACK, ACK).
    3. TLS handshake: thiết lập phiên bảo mật HTTPS, xác thực chứng chỉ, sinh khóa phiên.
    4. HTTP request: trình duyệt gửi HTTP GET (ví dụ GET /) qua kết nối đã mã hóa đến server/CDN.
    5. Server xử lý và trả về HTTP response (200 OK) chứa HTML (có thể kèm redirect).
    6. Browser nhận HTML → bắt đầu parse, xây dựng DOM tree; khi gặp resource (CSS/JS/img) sẽ gửi thêm các request song song.
    7. Parse CSS → xây dựng CSSOM; thực thi JavaScript (JS có thể thay đổi DOM/CSS và/hoặc chặn render).
    8. Tạo render tree → layout (reflow) để tính toán kích thước/vị trí → paint và composite → hiển thị nội dung lên màn hình.

## b. Ý 2

**Tab Network** là công cụ giúp giám sát hoạt động truyền tải giữa trình duyệt và máy chủ; nó hiển thị:

- Danh sách file được tải về (HTML, CSS, JS, ảnh, API).
- Trạng thái phản hồi (thành công hay lỗi).
- Kích thước file và loại file.
- Thời gian tải từng tài nguyên.

# Câu A2
    Trang web dưới đây bị Google đánh giá SEO thấp vì lạm dụng <div>.
    Lỗi 1: Không dùng <header> cho phần đầu trang mà dùng <div>: <div class="header">
    Lỗi 2: Không dùng <nav> cho menu mà dùng <div class="menu">
    Lỗi 3: Không dùng <main> cho nội dung chính mà dùng <div class="main">
    Lỗi 4: Không dùng <article> cho sản phẩm mà dùng  <div class="product">
    Dùng <p> để chứa 1 đoạn văn thay vì <div class="price">25.990.000đ</div>
    Nên dùng <footer> thay vì <div class="footer">© 2026 ShopTLU</div>
    Sửa lại:
    <header>
        <div class="logo">ShopTLU</div>
        <nav>
            <a href="/">Trang chủ</a>
            <a href="/products">Sản phẩm</a>
        </nav>
    </header>

    <main>
       <article class="product">
        <h1>iPhone 16 Pro</h1>
        <p class="price">25.990.000đ</p>
        <img src="iphone.jpg" alt= "iPhone 16 Pro">
       </article>
    </main>

    <footer>
        <p>© 2026 ShopTLU</p>
    </footer>

# Câu A3
    Do thẻ <div> là thẻ block, chiếm cả dòng nên khi đóng thẻ </div> thì sẽ phải xuống dòng mới để viết, còn các thẻ <span> và <strong> là các thẻ inline, chỉ chiếm phần nội dung nằm trong thẻ nên khí đóng 2 thẻ này vẫn có thể viết tiếp nội dung nằm cạnh nhau trên dòng đó hoặc xuống dòng mới để viết.
    Text art:
        Hộp 1
        Text A Text B
        Hộp 2
        Text C Text D
        Hộp 3

# Câu A4
    <thead>: Là phần đầu bảng, chứa tiêu đề cột
    <tbody>: Là phần nội dung chính của bảng, dùng để chứa dữ liệu chính của bảng
    <tfoot>: Là phần cuối bảng dùng để chứa các kết luận, thống kê, tổng kết của bảng
    KHÔNG NÊN dùng table để tạo layout trang web vì:
    - Accessibility: Screen reader và trợ năng kỳ vọng cấu trúc tabular; dùng table cho layout gây hiểu lầm nội dung, làm khó điều hướng cho người dùng khuyết tật.
    - Semantic & SEO: Tables biểu thị dữ liệu có hàng-cột; lạm dụng làm layout phá nghĩa ngữ nghĩa DOM, ảnh hưởng tới SEO và khả năng hiểu nội dung của bot/assistive tech.
    - Responsiveness / Flexibility: Table cố định theo lưới, khó responsive; CSS Grid/Flexbox cung cấp cách bố cục linh hoạt và dễ điều chỉnh cho nhiều kích thước màn hình.
    - Hiệu năng & Bảo trì: Bảng lớn gây reflow nặng khi thay đổi nội dung; code layout bằng table thường phức tạp, khó maintain và kém tách bạch giữa cấu trúc & trình bày.

# Câu B3
    Lỗi 1 — Dòng 1 — <!DOCTYPE> không đầy đủ; nên dùng <!DOCTYPE html> — Sửa thành <!DOCTYPE html>.
    Lỗi 2 — Dòng 5 — Thẻ <title> chưa đóng trước khi chèn <meta>; meta nằm bên trong title — Đóng </title> rồi chèn <meta charset="utf-8"> ở dòng tiếp theo.
    Lỗi 3 — Dòng 6 — meta charset="utf8" không chuẩn (thiếu dấu nối) — Đổi thành meta charset="utf-8".
    Lỗi 4 — Dòng 10 — Thẻ <h1> mở hai lần, thiếu </h1> đóng — Thay <h1>Welcome to ShopTLU<h1> bằng <h1>Welcome to ShopTLU</h1>.
    Lỗi 5 — Dòng 14 — Các thẻ <a> trong nav không được đóng đúng (<a>...<a> thay vì </a>) — Đóng mỗi anchor bằng </a> (ví dụ <a href="home">Trang chủ</a>).
    Lỗi 6 — Dòng 14,15 — Giá trị href="home"/"products" có thể không đúng (nên là đường dẫn file hoặc anchor) — Đổi thành href="#home" hoặc href="#index"
    Lỗi 7 — Dòng 22 — img src=iphone.jpg thiếu dấu ngoặc kép quanh giá trị và không có alt — Viết img src="iphone.jpg" alt="iPhone 16 Pro">.
    Lỗi 8 — Dòng 24 — Thẻ <b> và </p> bị lồng sai: <p>Giá: <b>25.990.000đ</p></b> — Sửa thứ tự đóng: <p>Giá: <b>25.990.000đ</b></p>.
    Lỗi 9 — Dòng 19,42 — Có hai thẻ <main>; chỉ nên có một main chính — Đổi thẻ phụ thành <aside> hoặc một section cho sidebar.
    Lỗi 10 — Dòng 47 — Thẻ <footer> chứa <p> nhưng không đóng </p> — Thêm </p> trước </footer>.
    Lỗi 11 — Dòng 2- end — Không có thuộc tính lang cho thẻ <html> — Thêm lang="vi" (hoặc en) vào <html>.
    Lỗi 12 — Toàn file — Indentation & cấu trúc thụt lề lộn xộn, làm giảm đọc hiểu — Canh lại indent và format file để readable.

# Câu B4
    1. 
    2. 
    3. action: giá trị "/tim-kiem"
       method: Get
       input type: "text" và "submit"


# Câu C1
    <article class="product-info"> <!-- article vì thông tin sản phẩm là một nội dung độc lập có thể chia sẻ/nhúng -->
        <header> <!-- header nội bộ chứa tên và hành động nhanh (giá, nút mua) -->
            <h1> <!-- Tên sản phẩm là heading chính trong vùng nội dung -->Tên sản phẩm</h1>
            <p class="price"><strong>Giá</strong></p> <!-- strong để nhấn giá -->
            <div class="rating" role="img" aria-label="Đánh giá: 4 trên 5 sao"><!-- dùng role/aria-label để mô tả rating cho assistive tech -->★★★★★</div>
        </header>

        <section class="short-description"> <!-- mô tả ngắn, section phù hợp cho 1 block nội dung -->
            <p><!-- Mô tả ngắn/khuyến nghị --></p>
        </section>

        <section class="purchase-actions"> <!-- khu vực nút mua/gio hàng -->
            <button type="button">Mua ngay</button>
            <button type="button">Thêm vào giỏ</button>
            <a href="#reviews">Xem đánh giá</a>
        </section>

        <section class="specs" aria-labelledby="specs-heading"> <!-- bảng thông số kỹ thuật -->
            <h2 id="specs-heading">Thông số kỹ thuật</h2>
            <table> <!-- table vì là dữ liệu có hàng/cột có cấu trúc -->
                <thead>
                    <tr>
                        <th>Tiêu chí</th>
                        <th>Thông số</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Màn hình</td>
                        <td><!-- value --></td>
                    </tr>
                    <tr>
                        <td>CPU</td>
                        <td><!-- value --></td>
                    </tr>
                    <!-- thêm hàng thông số -->
                </tbody>
            </table>
        </section>

    </article>

    <aside class="product-sidebar" aria-label="Sản phẩm tương tự"> <!-- aside vì nội dung phụ trợ cho trang chính -->
        <h2>Sản phẩm tương tự</h2>
        <ul>
            <li>
                <article> <!-- mỗi item có thể là một article ngắn đại diện sản phẩm --> 
                    <h3></h3>
                    <p></p>
                </article>
            </li>
            <!-- thêm item tương tự -->
        </ul>
    </aside>

    <section id="reviews" class="reviews" aria-labelledby="reviews-heading"> <!-- khu vực đánh giá/bình luận -->
        <h2 id="reviews-heading">Đánh giá & Bình luận</h2>

        <form class="review-form" aria-label="Gửi đánh giá"> <!-- form để gửi bình luận -->
            <label for="rating">Đánh giá</label>
            <select id="rating" name="rating">
                <option>5</option>
            </select>

            <label for="comment">Bình luận</label>
            <textarea id="comment" name="comment"></textarea>

            <button type="submit">Gửi</button>
        </form>

        <section class="review-list" aria-live="polite"> <!-- danh sách đánh giá hiện có -->
            <article class="review"> <!-- mỗi đánh giá là một article độc lập -->
                <header>
                    <h3><!-- Tên người đánh giá --></h3>
                    <time datetime=""><!-- thời gian --></time>
                </header>
                <p><!-- nội dung đánh giá --></p>
            </article>
            <!-- thêm review -->
        </section>
    </section>

# Câu C2
    - Dùng div cho mọi thứ có vẻ nhanh nhưng về lâu dài gây hại cho SEO, accessibility và bảo trì. Về SEO: công cụ tìm kiếm dựa vào cấu trúc tài liệu (ví dụ header, nav, main, article, h1…) để hiểu đâu là nội dung chính, đâu là điều hướng — trang có cấu trúc semantic rõ ràng thường được lập chỉ mục chính xác hơn và có cơ hội hiển thị rich snippet (tiêu đề/giá/đánh giá) trên trang kết quả. Về Accessibility: trình đọc màn hình và các assistive technologies dùng landmark (ví dụ nav[aria-label], main, aside) để nhảy nhanh tới khu vực cần thiết; nếu toàn bộ đều là div, người dùng khiếm thị sẽ phải đọc tuần tự toàn bộ DOM, trải nghiệm kém hơn nhiều.

    - Ví dụ cụ thể: một trang chi tiết sản phẩm có <main><article><h1>...</h1><p class="price"><strong>...</strong></p></article></main> cho phép bot lấy đúng h1 làm tiêu đề sản phẩm và screen reader nhảy tới main rồi article — giúp người dùng tiếp cận tên/giá nhanh, và search engine có thể trích giá/đánh giá làm snippet nếu thêm microdata.

    - Tuy nhiên, không phải lúc nào cũng cần thẻ semantic mới: div hợp lý cho container thuần layout (grid wrapper, flex container) hoặc khi một vùng chỉ dùng để tạo lưới/spacing mà không mang ý nghĩa nội dung. Kết luận: học semantic không tốn vô ích — nó tăng tính truy cập, khả năng SEO và dễ bảo trì; còn div nên dùng cho mục đích bố cục thuần túy.