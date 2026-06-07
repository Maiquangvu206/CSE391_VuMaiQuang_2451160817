# Weather App
## Mô tả
Ứng dụng tra cứu thời tiết hiện tại theo tên thành phố bằng JavaScript, Fetch API và LocalStorage.

## API sử dụng
### wttr.in
* Endpoint: https://wttr.in/{city}?format=j1
* Ví dụ: https://wttr.in/Hanoi?format=j1

* Dữ liệu sử dụng:
  - Nhiệt độ (`temp_C`)
  - Độ ẩm (`humidity`)
  - Mô tả thời tiết (`weatherDesc`)
  - Icon thời tiết (`weatherIconUrl`)

## Chức năng
* Tìm kiếm thời tiết theo tên thành phố
* Hiển thị:
  - Nhiệt độ
  - Độ ẩm
  - Mô tả thời tiết
  - Icon thời tiết
* Loading State
* Success State
* Error State
* Lưu 5 thành phố tìm kiếm gần nhất bằng LocalStorage
* Click lịch sử để tìm lại nhanh

## Cấu trúc thư mục

weather_app/

├── index.html

├── style.css

├── script.js

└── README.md

## Cách chạy
  - Mở trực tiếp file: index.html bằng trình duyệt Chrome hoặc Edge.

## Công nghệ sử dụng
* HTML5
* CSS3
* JavaScript ES6+
* Fetch API
* Async/Await
* LocalStorage