# Phần A
## Câu A1
```js
console.log("1 - Start");

setTimeout(() => console.log("2 - Timeout 0ms"), 0);

Promise.resolve().then(() => console.log("3 - Promise"));

console.log("4 - End");

setTimeout(() => console.log("5 - Timeout 100ms"), 100);

Promise.resolve().then(() => {
    console.log("6 - Promise 2");
    setTimeout(() => console.log("7 - Nested timeout"), 0);
});
```
1. Thứ tự output
    - 1 - Start
    - 4 - End
    - 3 - Promise
    - 6 - Promise 2
    - 2 - Timeout 0ms
    - 7 - Nested timeout
    - 5 - Timeout 100ms
2. Giải thích
    - JavaScript thực thi code đồng bộ trong Call Stack trước nên in `1 - Start` và `4 - End`. Sau khi Call Stack rỗng, Event Loop ưu tiên xử lý toàn bộ Microtask Queue (Promise), nên in `3 - Promise` rồi `6 - Promise 2`. Trong lúc chạy `6 - Promise 2`, callback `7 - Nested timeout` được thêm vào cuối Macrotask Queue. Tiếp theo Event Loop xử lý các Macrotask, nên `2 - Timeout 0ms` chạy trước, rồi `7 - Nested timeout`. Cuối cùng sau khoảng 100ms mới đến `5 - Timeout 100ms`.
## Câu A2
```js
async function getData() {
    try {
        const response = await fetch("https://api.example.com/data");
        
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }
        
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Failed:", error.message);
        return null;
    }
}
```

1. `await fetch(...)` — fetch trả về gì? Tại sao cần await?
    - fetch() gửi HTTP request và trả về một Promise -> Promise này sẽ resolve thành một đối tượng Response.
    - Dùng await để đợi request hoàn thành rồi mới lấy được Response.
2. `response.ok` — Khi nào false? Liệt kê 3 status codes tương ứng.
    - `response.ok === true` khi status từ 200 → 299.
    - `response.ok === false` khi status nằm ngoài khoảng này.
    - 3 status: 404 -> Not Found, 401 -> Unauthorized, 500 -> Internal Server Error
3. `response.json()` — Tại sao cần await lần nữa?
    - Vì response.json() cũng trả về Promise -> Trình duyệt phải đọc dữ liệu từ response body -> Chuyển chuỗi JSON thành object JavaScript.
4. `try...catch` — Catch những lỗi gì? (Network error? 404? JSON parse error?)
    - Network Error: Mất mạng, DNS lỗi, Server không thể kết nối. 
    - Lỗi do chương trình chủ động tạo bằng `throw Error(...)`
    - Lỗi khi phân tích dữ liệu JSON (JSON Parse Error) nếu dữ liệu trả về không đúng định dạng JSON
    - **Lưu ý: Các lỗi HTTP như 404 hoặc 500 không tự động rơi vào `catch`, cần kiểm tra `response.ok` và tự `throw Error()` để xử lý.**
## Câu A3
1. Sơ đồ trạng thái của Promise:
    ```text
            Promise
                |
            Pending
            /         \
        resolve()  reject()
        |             |
    Fulfilled      Rejected
    ```
    - **Pending**: Promise đang chờ xử lý.
    - **Fulfilled**: Promise hoàn thành thành công khi gọi `resolve()`.
    - **Rejected**: Promise thất bại khi gọi `reject()`.
2. Callback Hell là gì?
    - **Callback Hell** là tình trạng nhiều callback lồng nhau gây mã nguồn khó đọc, khó bảo trì và khó xử lý lỗi.

    - Ví dụ Callback Hell (4 cấp)
    ```js
    login(user, function() {
        getProfile(function() {
            getPosts(function() {
                getComments(function() {
                    console.log("Done");
                });
            });
        });
    });
    ``` 

    - Refactor thành async/await
    ```js
    async function loadData() {
        try {
            await login(user);
            await getProfile();
            await getPosts();
            await getComments();

            console.log("Done");
        } catch (error) {
            console.error(error);
        }
    }
    ```

    
# PHẦN C
## Câu C1 (10đ) — Error Handling Strategy
1. Network Errors (Mất mạng giữa chừng)
* Cách xử lý
    - Hiển thị thông báo cho người dùng.
    - Cho phép người dùng thử lại.
    - Ghi log lỗi để theo dõi.
    - Có thể tự động retry một số lần.
* Ví dụ
    ```js
    try {
        const response = await fetch(url);
    } catch (error) {
        alert("Không thể kết nối mạng.");
    }
    ```

2. API Errors
* HTTP 404 — Not Found
    - Endpoint sai.
    - Dữ liệu không tồn tại.
    ```js
    if (response.status === 404) {
        throw new Error("Resource not found");
    }
    ```

* HTTP 500 — Internal Server Error
    - Lỗi phía server.
    ```js
    if (response.status === 500) {
        throw new Error("Server error");
    }
    ```

* HTTP 429 — Too Many Requests
    - Gửi quá nhiều request trong thời gian ngắn.
    ```js
    if (response.status === 429) {
        throw new Error("Too many requests");
    }
    ```
    - Khuyến nghị: Chờ vài giây rồi retry hoặc giới hạn tốc độ gửi request.

3. Timeout (> 10 giây)
* fetchWithTimeout()
    ```js
    async function fetchWithTimeout(url, ms = 10000) {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => {
            controller.abort();
        }, ms);

        try {
            const response = await fetch(url, {
                signal: controller.signal
            });
            clearTimeout(timeoutId);
            return response;
        } catch (error) {
            clearTimeout(timeoutId);
            throw error;
        }
    }
    ```

* Sử dụng
    ```js
    try {
        const response =
            await fetchWithTimeout(
                "https://api.example.com",
                10000
            );

    } catch (error) {
        console.error("Timeout");
    }
    ```

4. Retry Logic
* fetchWithRetry()
    ```js
    async function fetchWithRetry(
        url,
        maxRetries = 3
    ) {
        let attempt = 0;
        while (attempt < maxRetries) {
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(
                        `HTTP ${response.status}`
                    );
                }
                return response;
            } catch (error) {
                attempt++;
                if (attempt >= maxRetries) {
                    throw error;
                }
                console.log(
                    `Retry ${attempt}/${maxRetries}`
                );
            }
        }
    }
    ```

* Sử dụng
    ```js
    const response =
        await fetchWithRetry(
            "https://api.example.com",
            3
        );
    ```

* **Tóm tắt chiến lược xử lý lỗi**
| Loại lỗi | Cách xử lý |
|-----------|-----------|
| Network Error | Thông báo lỗi, retry |
| 404 | Hiển thị không tìm thấy dữ liệu |
| 500 | Hiển thị lỗi server |
| 429 | Chờ rồi retry |
| Timeout | Hủy request bằng AbortController |
| Lỗi tạm thời | Retry tối đa 3 lần |

## Câu C2
1. So sánh

| Method | Khi nào resolve? | Khi nào reject? | Use case |
|----------|----------|----------|----------|
| Promise.all() | Tất cả Promise thành công | Chỉ cần 1 Promise thất bại | Load dữ liệu phụ thuộc nhau |
| Promise.allSettled() | Tất cả Promise hoàn thành | Không reject | Dashboard nhiều widget |
| Promise.race() | Promise đầu tiên hoàn thành | Promise đầu tiên reject | Timeout |
| Promise.any() | Promise đầu tiên thành công | Tất cả Promise thất bại | CDN dự phòng |

2. Promise.all()
* Ví dụ
    ```js
    const [
        product,
        reviews,
        related
    ] = await Promise.all([
        fetch("/product/1").then(r => r.json()),
        fetch("/reviews/1").then(r => r.json()),
        fetch("/related/1").then(r => r.json())
    ]);
    ```
**Use case:** Trang chi tiết sản phẩm cần đủ Product, Reviews và Related Products.

2. Promise.allSettled()
* Ví dụ
    ```js
    const results =
        await Promise.allSettled([
            fetch("/weather").then(r => r.json()),
            fetch("/user").then(r => r.json()),
            fetch("/news").then(r => r.json())
        ]);

    results.forEach(result => {
        if (result.status === "fulfilled") {
            console.log(result.value);
        } else {
            console.log(result.reason);
        }
    });
    ```
**Use case:** Dashboard nhiều widget độc lập.

3. Promise.race()
* Ví dụ
    ```js
    const timeout =
        new Promise((_, reject) => {
            setTimeout(() => {
                reject(
                    new Error("Timeout")
                );
            }, 5000);
        });

    const result =
        await Promise.race([
            fetch("/products"),
            timeout
        ]);
    ```
**Use case:** Giới hạn thời gian phản hồi API.

4. Promise.any()
* Ví dụ
    ```js
    const data =
        await Promise.any([
            fetch("https://cdn1.com/data.json")
                .then(r => r.json()),

            fetch("https://cdn2.com/data.json")
                .then(r => r.json()),

            fetch("https://cdn3.com/data.json")
                .then(r => r.json())
        ]);
    ```
**Use case:** Lấy dữ liệu từ nhiều CDN dự phòng.

## Kết luận
- `Promise.all()` → Cần tất cả dữ liệu.
- `Promise.allSettled()` → Các tác vụ độc lập.
- `Promise.race()` → Timeout hoặc chọn phản hồi nhanh nhất.
- `Promise.any()` → Chỉ cần một nguồn thành công.