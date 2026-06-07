# User Directory (CRUD)
## Mô tả
Ứng dụng quản lý người dùng sử dụng JavaScript, Fetch API và JSONPlaceholder.
* Các chức năng:
    - Hiển thị danh sách users
    - Thêm user mới
    - Cập nhật user
    - Xóa user
    - Tìm kiếm theo tên hoặc email
    - Skeleton Loading khi tải dữ liệu
    - Thông báo thành công/thất bại

## API sử dụng: JSONPlaceholder
    - Website: https://jsonplaceholder.typicode.com

### Endpoints
* Lấy danh sách users
    - GET: https://jsonplaceholder.typicode.com/users

* Lấy chi tiết user
    - GET: https://jsonplaceholder.typicode.com/users/{id}
* Tạo user
    - POST: https://jsonplaceholder.typicode.com/users
* Cập nhật user
    - PUT: https://jsonplaceholder.typicode.com/users/{id}
* Xóa user
    - DELETE: https://jsonplaceholder.typicode.com/users/{id}

## Cấu trúc thư mục

user_directory/

├── index.html

├── style.css

├── api.js

├── ui.js

├── app.js

└── README.md

## Phân chia code

### api.js: Chứa toàn bộ xử lý gọi API
* getUsers()
* getUser(id)
* createUser(data)
* updateUser(id, data)
* deleteUser(id)

### ui.js: Chứa xử lý giao diện
* renderUsers()
* showLoading()
* hideLoading()
* showError()
* showSuccess()

### app.js: Điều phối ứng dụng
* Load dữ liệu
* CRUD
* Search
* Event listeners

## Cách chạy
- Mở file: index.html bằng trình duyệt.

## Công nghệ sử dụng
* HTML5
* CSS3
* JavaScript ES6+
* Fetch API
* Async/Await
* JSONPlaceholder REST API