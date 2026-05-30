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


PHẦN C — DEBUG & PHÂN TÍCH (15 điểm)
Câu C1 (8đ) — Debug DOM Code
Tìm và sửa tất cả lỗi (ít nhất 7 lỗi):

// App: Counter with history
const countDisplay = document.querySelector(".count");
const historyList = document.getElementById("history");

let count = 0;

document.querySelector("#incrementBtn").addEventListener("click", function() {
    count++;
    countDisplay.innerHTML = count;
    
    // Lưu history
    const li = document.createElement("li");
    li.textContent = "Count changed to " + count;
    li.addEventListener("click", function() {
        deleteHistory(this);
    });
    historyList.append(li);
});

document.querySelector("#decrementBtn").addEventListener("onclick", function() {
    count--;
    countDisplay.innerHTML = count;
});

document.querySelector("#resetBtn").addEventListener("click", () => {
    count = 0;
    countDisplay = count;
    historyList.innerHTML = null;
});

function deleteHistory(element) {
    element.parentNode.removeChild(element);
}

// Clear all history
document.querySelector("#clearHistory").addEventListener("click", () => {
    const items = historyList.querySelectorAll("li");
    items.forEach(item => {
        item.remove;
    });
});

// Save to localStorage
window.addEventListener("beforeunload", () => {
    localStorage.setItem("count", count);
    localStorage.setItem("history", historyList.innerHTML);
});

// Load from localStorage
window.addEventListener("load", () => {
    count = localStorage.getItem("count");
    countDisplay.textContent = count;
});

    1.addEventListener("onclick", ...) → phải là "click".
    2.countDisplay = count; → sai vì countDisplay là phần tử DOM, phải dùng textContent.
    3.countDisplay.innerHTML = count; → nên dùng textContent cho số.
    4.historyList.innerHTML = null; → phải là "".
    5.item.remove; → thiếu () nên không chạy, phải là item.remove().
    6.count = localStorage.getItem("count"); → trả về chuỗi, phải ép kiểu sang Number.
    7.Chỉ lưu count mà không khôi phục history → đã thêm load history từ localStorage.
    8.deleteHistory(this) dùng được, nhưng deleteHistory nên gọi element.remove() gọn hơn.

    Code sau khi sửa:
        // App: Counter with history
        const countDisplay = document.querySelector(".count");
        const historyList = document.getElementById("history");

        let count = 0;

        function saveState() {
            localStorage.setItem("count", String(count));
            localStorage.setItem("history", historyList.innerHTML);
        }

        function deleteHistory(element) {
            element.remove();
            saveState();
        }

        document.querySelector("#incrementBtn").addEventListener("click", function () {
            count++;
            countDisplay.textContent = count;

            const li = document.createElement("li");
            li.textContent = "Count changed to " + count;
            li.addEventListener("click", function () {
                deleteHistory(this);
            });

            historyList.appendChild(li);
            saveState();
        });

        document.querySelector("#decrementBtn").addEventListener("click", function () {
            count--;
            countDisplay.textContent = count;

            const li = document.createElement("li");
            li.textContent = "Count changed to " + count;
            li.addEventListener("click", function () {
                deleteHistory(this);
            });

            historyList.appendChild(li);
            saveState();
        });

        document.querySelector("#resetBtn").addEventListener("click", () => {
            count = 0;
            countDisplay.textContent = count;
            historyList.innerHTML = "";
            saveState();
        });

        // Clear all history
        document.querySelector("#clearHistory").addEventListener("click", () => {
            const items = historyList.querySelectorAll("li");
            items.forEach(item => {
                item.remove();
            });
            saveState();
        });

        // Load from localStorage
        window.addEventListener("load", () => {
            const savedCount = localStorage.getItem("count");
            const savedHistory = localStorage.getItem("history");

            count = savedCount !== null ? Number(savedCount) : 0;
            countDisplay.textContent = count;

            if (savedHistory !== null) {
                historyList.innerHTML = savedHistory;
            }
        });

Câu C2 (7đ) — Performance
Giải thích: Tại sao bind event lên 1000 elements riêng lẻ là BAD PRACTICE? Event Delegation giải quyết thế nào?

Cho code:

for (let i = 0; i < 1000; i++) {
    const div = document.createElement("div");
    div.textContent = `Item ${i}`;
    document.body.appendChild(div);   // ← 1000 lần reflow!
}
Refactor dùng DocumentFragment để chỉ gây 1 lần reflow. Giải thích tại sao nhanh hơn.

    1)Bind event riêng cho 1000 elements là bad practice vì:
        Khi gắn addEventListener cho từng phần tử:
        Tốn bộ nhớ hơn: 1000 elements = 1000 handler functions hoặc 1000 listener registrations.
        Khó bảo trì: thêm/xóa item động thì phải bind/unbind lại.
        Chậm hơn khi khởi tạo: phải lặp qua toàn bộ danh sách để attach event.
        Rủi ro với DOM động: phần tử được thêm sau này không tự có event nếu quên bind.
        Ví dụ xấu
            const items = document.querySelectorAll(".item");

            items.forEach(item => {
                item.addEventListener("click", () => {
                    console.log(item.textContent);
                });
            });
    2) Event Delegation giải quyết

        Event Delegation là đặt event listener ở phần tử cha thay vì từng con.

        Do event bubble từ con lên cha, cha có thể bắt sự kiện của tất cả con bên trong bằng cách kiểm tra event.target.

        Lợi ích
            Chỉ cần 1 listener
            Tiết kiệm bộ nhớ
            Dễ xử lý phần tử sinh ra động
            Code gọn hơn
    3) Vì sao appendChild 1000 lần có thể gây chậm?
        Code gốc:
            for (let i = 0; i < 1000; i++) {
                const div = document.createElement("div");
                div.textContent = `Item ${i}`;
                document.body.appendChild(div);
            }

        Mỗi lần appendChild vào DOM thật, trình duyệt có thể phải:
            cập nhật cây DOM
            tính toán layout
            repaint/reflow khi cần
        =>Nếu làm 1000 lần liên tục, chi phí tăng lên rõ rệt.

    4) Refactor bằng DocumentFragment

        DocumentFragment là một node tạm trong bộ nhớ, chưa gắn vào DOM thật.
        Bạn append 1000 phần tử vào fragment trước, rồi append fragment một lần vào DOM.

        Code tối ưu
        const fragment = document.createDocumentFragment();

        for (let i = 0; i < 1000; i++) {
            const div = document.createElement("div");
            div.textContent = `Item ${i}`;
            fragment.appendChild(div);
        }

        document.body.appendChild(fragment);
    5) Nhanh hơn vì:
        fragment nằm trong memory, chưa ảnh hưởng trực tiếp đến layout của trang
        appendChild vào fragment thường không kích hoạt reflow/repaint trên DOM thật
        chỉ khi document.body.appendChild(fragment) chạy, trình duyệt mới cập nhật một lần
        
        Tóm lại
        Cách cũ: 1000 lần chạm DOM thật
        Cách mới: 1000 lần thao tác trong bộ nhớ + 1 lần chạm DOM thật