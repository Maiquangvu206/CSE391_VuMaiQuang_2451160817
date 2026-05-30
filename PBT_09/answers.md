PHẦN A — KIỂM TRA ĐỌC HIỂU
Câu A1 (5đ) — DOM Tree
Cho HTML:

<div id="app">
    <header>
        <h1>Todo App</h1>
        <nav>
            <a href="#" class="active">All</a>
            <a href="#">Active</a>
            <a href="#">Completed</a>
        </nav>
    </header>
    <main>
        <form id="todoForm">
            <input id="todoInput" type="text">
            <button type="submit">Add</button>
        </form>
        <ul id="todoList">
            <li class="todo-item">Learn HTML</li>
            <li class="todo-item completed">Learn CSS</li>
        </ul>
    </main>
</div>
Vẽ DOM tree (sơ đồ cây) cho HTML trên
Viết querySelector cho mỗi yêu cầu:
Chọn thẻ <h1>
Chọn input trong form
Chọn tất cả .todo-item
Chọn link đang active
Chọn <li> đầu tiên trong #todoList
Chọn tất cả <a> bên trong <nav>

    1) DOM tree
        document
        └── div#app
            ├── header
            │   ├── h1
            │   │   └── "Todo App"
            │   └── nav
            │       ├── a.active[href="#"]
            │       │   └── "All"
            │       ├── a[href="#"]
            │       │   └── "Active"
            │       └── a[href="#"]
            │           └── "Completed"
            └── main
                ├── form#todoForm
                │   ├── input#todoInput[type="text"]
                │   └── button[type="submit"]
                │       └── "Add"
                └── ul#todoList
                    ├── li.todo-item
                    │   └── "Learn HTML"
                    └── li.todo-item.completed
                        └── "Learn CSS"

    2) querySelector cho từng yêu cầu

        Chọn thẻ <h1>
        document.querySelector("h1")

        Chọn input trong form
        document.querySelector("#todoForm input")

        Chọn tất cả .todo-item
        document.querySelectorAll(".todo-item")

        Chọn link đang active
        document.querySelector("a.active")

        Chọn <li> đầu tiên trong #todoList
        document.querySelector("#todoList li:first-child")

        Chọn tất cả <a> bên trong <nav>
        document.querySelectorAll("nav a")
    
Câu A2 (5đ) — innerHTML vs textContent
Giải thích sự khác nhau. Cho ví dụ khi nào dùng mỗi cái.

Câu hỏi bảo mật: Tại sao innerHTML có thể gây lỗ hổng XSS? Viết 1 ví dụ code minh họa:

// Giả sử user nhập vào input: <img src=x onerror="alert('Hacked!')">
const userInput = document.querySelector("#search").value;
document.querySelector("#result").innerHTML = userInput;  // ← Nguy hiểm!
// Sửa thế nào?

    1) innerHTML vs textContent
    Bản chất khác nhau
    innerHTML
    Làm việc với HTML string
    Trình duyệt sẽ parse (phân tích) thành DOM
    Có thể chèn thẻ HTML, thuộc tính, event inline
    Chậm hơn (vì phải parse HTML)
    Nguy hiểm nếu dữ liệu không tin cậy
    textContent
    Chỉ làm việc với text thuần
    Không parse HTML
    Hiển thị đúng nguyên văn (escape tự nhiên)
    Nhanh hơn
    An toàn hơn
    Ví dụ trực quan
    const el = document.querySelector("#demo");

    // innerHTML
    el.innerHTML = "<b>Hello</b>";
    // → render: Hello (in đậm)

    // textContent
    el.textContent = "<b>Hello</b>";
    // → render: <b>Hello</b> (hiện nguyên text)
    2) Khi nào dùng cái nào?
    Dùng textContent khi:
    Hiển thị dữ liệu người dùng nhập
    Nội dung không cần HTML
    Ưu tiên bảo mật + hiệu năng
    result.textContent = userInput;
    Dùng innerHTML khi:
    Bạn chủ động tạo HTML
    Dữ liệu đã được kiểm soát / sanitize
    Cần render cấu trúc phức tạp
    result.innerHTML = "<li>Item 1</li><li>Item 2</li>";
    3) Vì sao innerHTML gây lỗ hổng XSS?
    Cơ chế
    innerHTML parse chuỗi thành HTML thật
    Nếu chuỗi chứa:
    <script>
    hoặc event như onerror, onclick
    → Trình duyệt thực thi code JavaScript

    Đây là XSS (Cross-Site Scripting)

    4) Ví dụ tấn công XSS
    // User nhập:
    <img src=x onerror="alert('Hacked!')">

    const userInput = document.querySelector("#search").value;
    document.querySelector("#result").innerHTML = userInput;
    Điều gì xảy ra?
    <img src=x> → lỗi load ảnh
    onerror chạy → alert('Hacked!')

    Code độc được thực thi ngay lập tức

    5) Cách sửa
    Cách 1: Dùng textContent
    const userInput = document.querySelector("#search").value;
    document.querySelector("#result").textContent = userInput;

    → Không parse HTML → không chạy JS

    Cách 2: Sanitize HTML (nâng cao)

    Nếu bắt buộc dùng innerHTML, cần lọc input

    Ví dụ:

    function escapeHTML(str) {
        return str
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;");
    }

    result.innerHTML = escapeHTML(userInput);
    Cách 3 :

    Dùng thư viện sanitize như:

    DOMPurify
    result.innerHTML = DOMPurify.sanitize(userInput);

Câu A3 (5đ) — Event Bubbling
Không chạy code, dự đoán thứ tự console.log:

document.querySelector("#outer").addEventListener("click", () => {
    console.log("OUTER");
});

document.querySelector("#inner").addEventListener("click", () => {
    console.log("INNER");
});

document.querySelector("#btn").addEventListener("click", (e) => {
    console.log("BUTTON");
    // e.stopPropagation();  ← nếu bỏ comment → output thay đổi thế nào?
});
<div id="outer">
    <div id="inner">
        <button id="btn">Click me</button>
    </div>
</div>
Khi click vào button, output = ???. Nếu uncomment stopPropagation(), output = ???

    1) Cơ chế cần nhớ: Event Bubbling
        Khi click vào <button>:
        Event xảy ra tại target (#btn)
        Sau đó bubble lên cha: #inner → #outer → document

        Thứ tự mặc định: từ trong ra ngoài

    2) Trường hợp KHÔNG dùng stopPropagation()
        Click vào button:
            BUTTON
            INNER
            OUTER
        Giải thích
            #btn chạy trước → "BUTTON"
            Event nổi lên #inner → "INNER"
            Tiếp tục lên #outer → "OUTER"
    3) Trường hợp CÓ e.stopPropagation()
        document.querySelector("#btn").addEventListener("click", (e) => {
            console.log("BUTTON");
            e.stopPropagation();
        });

        Event bị chặn lại tại button
            BUTTON
    Giải thích
        Sau khi chạy handler ở #btn
        stopPropagation() ngăn không cho event bubble lên parent
        → #inner và #outer không nhận được event
