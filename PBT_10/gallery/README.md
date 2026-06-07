# Infinite Scroll Gallery
## Mô tả
Ứng dụng hiển thị thư viện ảnh sử dụng Infinite Scroll và Lazy Loading.

### Chức năng
* Tải 20 ảnh đầu tiên khi mở trang.
* Tự động tải thêm ảnh khi cuộn gần cuối trang.
* Hiển thị trạng thái "Đang tải thêm..." khi fetch dữ liệu.
* Lazy Loading ảnh bằng IntersectionObserver.
* Click ảnh để mở Lightbox (Modal).
* Responsive Grid:
  - Desktop: 4 cột
  - Tablet: 2 cột
  - Mobile: 1 cột

## API sử dụng
* JSONPlaceholder Photos API
```http
GET https://jsonplaceholder.typicode.com/photos?_page=1&_limit=20
```
Hoặc:
```http
GET https://picsum.photos/v2/list?page=1&limit=20
```

## Cấu trúc thư mục

```text
gallery/
│
├── index.html
├── style.css
├── app.js
└── README.md
```

## Công nghệ sử dụng
* HTML5
* CSS3
* JavaScript ES6+
* Fetch API
* Async/Await
* IntersectionObserver
* Infinite Scroll
* Lazy Loading

## Cách chạy
1. Mở file `index.html`.
2. Cuộn xuống cuối trang để tải thêm ảnh.
3. Click vào ảnh để xem kích thước lớn.