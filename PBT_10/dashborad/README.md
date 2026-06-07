# Multi-API Dashboard
## Mô tả
Dashboard tổng hợp dữ liệu từ nhiều API khác nhau bằng Promise.allSettled().

### Chức năng
* Gọi song song 3 APIs.
* Loading tổng thể khi tải dữ liệu.
* Mỗi API hiển thị trong một widget riêng.
* Một API lỗi không ảnh hưởng các widget khác.
* Refresh toàn bộ dữ liệu.
* Hiển thị thời gian fetch.

## APIs sử dụng
### JSONPlaceholder
```http
GET https://jsonplaceholder.typicode.com/users/1
```
### Open-Meteo
```http
GET https://api.open-meteo.com/v1/forecast?latitude=21.03&longitude=105.85&current_weather=true
```
### Dog API
```http
GET https://dog.ceo/api/breeds/image/random
```

## Cấu trúc thư mục
```text
dashboard/
│
├── index.html
├── style.css
├── app.js
└── README.md
```

## Công nghệ
* HTML5
* CSS3
* JavaScript ES6+
* Fetch API
* Async/Await
* Promise.allSettled()

## Cách chạy
- Mở file index.html bằng trình duyệt 