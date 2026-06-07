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