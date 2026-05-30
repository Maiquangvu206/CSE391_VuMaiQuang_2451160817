PHẦN A — KIỂM TRA ĐỌC HIỂU (25 điểm)
Câu A1 (5đ) — var / let / const
Đọc chương 03. Không chạy code, dự đoán output cho từng đoạn:

// Đoạn 1
console.log(x);
var x = 5;

// Đoạn 2
console.log(y);
let y = 10;

// Đoạn 3
const z = 15;
z = 20;
console.log(z);

// Đoạn 4
const arr = [1, 2, 3];
arr.push(4);
console.log(arr);

// Đoạn 5
let a = 1;
{
    let a = 2;
    console.log("Trong block:", a);
}
console.log("Ngoài block:", a);
Ghi dự đoán → Tạo file var_let_const.js, chạy → So sánh. Giải thích các kết quả bất ngờ.

Nguồn tham chiếu chương 3:

    Kết quả dự đoán:
        Đoạn 1 cho ra kết quả là 5
        Đoạn 2 cho ra kết quả là 10
        Đoạn 3 cho ra kết quả là 15
        Đoạn 4 cho ra kết quả là [1 2 3 4]
        Đoạn 5 cho ra kết quả là  Trong block: 2 và Ngoài block: 1
    Kết quả thực tế:
        Đoạn 1 cho ra kết quả là underfine
        Đoạn 2 cho ra kết quả là lỗi: Cannot access 'y' before initialization
        Đoạn 3 cho ra kết quả là lỗi: Assignment to constant variable.
        Đoạn 4 cho ra kết quả là [1 2 3 4]
        Đoạn 5 cho ra kết quả là  Trong block: 2 và Ngoài block: 1   

Câu A2 (5đ) — Data Types & Coercion
Không chạy code, dự đoán kết quả:

console.log(typeof null);              // ???
console.log(typeof undefined);         // ???
console.log(typeof NaN);              // ???
console.log("5" + 3);                 // ???
console.log("5" - 3);                 // ???
console.log("5" * "3");              // ???
console.log(true + true);            // ???
console.log([] + []);                // ???
console.log([] + {});                // ???
console.log({} + []);                // ???
Sau khi trả lời, chạy code kiểm tra. Giải thích tại sao "5" + 3 và "5" - 3 cho kết quả khác nhau.

    Dự đoán kết quả:
        console.log(typeof null);      // object
        console.log(typeof undefined); // undefined
        console.log(typeof NaN);       // number
        console.log("5" + 3);          // 53
        console.log("5" - 3);          // 2
        console.log("5" * "3");        // 15
        console.log(true + true);      // 2
        console.log([] + []);          // ""
        console.log([] + {});          // "[object Object]"
        console.log({} + []);          // "[object Object]"

    "5" + 3 và "5" - 3 cho kết quả khác nhau vì:
        "5" + 3 Toán tử + nếu có chuỗi thì ưu tiên nối chuỗi được hiểu là chuỗi với kí tự 5 cộng thêm kí tự 3 là thành số 53
        "5" - 3 Toán tử - không nối chuỗi, nên JS ép "5" thành số 5 được hiểu là biểu thức 5-3 bằng 2

Câu A3 (5đ) — So sánh == vs ===
Dự đoán true hay false:

console.log(5 == "5");                // ???
console.log(5 === "5");               // ???
console.log(null == undefined);       // ???
console.log(null === undefined);      // ???
console.log(NaN == NaN);             // ???
console.log(0 == false);             // ???
console.log(0 === false);            // ???
console.log("" == false);            // ???
Quy tắc: Từ giờ trở đi, bạn nên dùng == hay ===? Tại sao?

    console.log(5 == "5");          // true vì == cho phép ép kiểu, "5" được ép thành số 5
    console.log(5 === "5");         // false vì == so sánh cả giá trị lẫn kiểu dữ liệu. Một bên là number, một bên là string.
    console.log(null == undefined); // true null và undefined chỉ bằng nhau với ==
    console.log(null === undefined);// false khác kiểu dữ liệu nên === trả về false
    console.log(NaN == NaN);        // false NaN là giá trị đặc biệt: không bằng chính nó
    console.log(0 == false);        // true vì false bị ép thành 0
    console.log(0 === false);       // false vì khác kiểu dữ liệu: number và boolean
    console.log("" == false);       // true chuỗi rỗng được ép thành 0, còn false cũng thành 0

    Từ giờ nên dùng === vì:
        Tránh ép kiểu ngầm, giảm lỗi khó đoán.
        So sánh rõ ràng, dễ đọc, dễ debug.
        Hành vi nhất quán hơn.

Câu A4 (5đ) — Truthy & Falsy
Liệt kê TẤT CẢ giá trị Falsy trong JavaScript (đọc tài liệu). Sau đó dự đoán kết quả:
if ("0") console.log("A");           // In hay không?
if ("") console.log("B");            // In hay không?
if ([]) console.log("C");            // In hay không?
if ({}) console.log("D");            // In hay không?
if (null) console.log("E");          // In hay không?
if (0) console.log("F");             // In hay không?
if (-1) console.log("G");            // In hay không?
if (" ") console.log("H");           // In hay không? (space)

    / 6 giá trị FALSY (coi như false):
        false, 0, "", null, undefined, NaN

    if ("0") console.log("A");           // 0 làTruthy In 'A'
    if ("") console.log("B");            // "" là Falsy Không in
    if ([]) console.log("C");            // [] là Truthy In 'C'
    if ({}) console.log("D");            // {} là Truthy In 'D'
    if (null) console.log("E");          // null là Falsy Không in
    if (0) console.log("F");             // 0 là Falsy Không in
    if (-1) console.log("G");            // -1 là Truthy In 'G'
    if (" ") console.log("H");           // " " là Truthy In 'H' 

Câu A5 (5đ) — Template Literals
Viết lại 3 cách nối chuỗi sau bằng template literal (backtick):

// Cách 1:
var greeting = "Xin chào " + name + "! Bạn " + age + " tuổi.";
// Cách 2:
var url = "https://api.example.com/users/" + userId + "/orders?page=" + page;
// Cách 3:
var html = "<div class=\"card\">" +
    "<h2>" + title + "</h2>" +
    "<p>" + description + "</p>" +
    "<span>Giá: " + price + "đ</span>" +
    "</div>";

    // Cách 1:
    var greeting = `Xin chào ${name}! Bạn ${age} tuổi.`;

    // Cách 2:
    var url = `https://api.example.com/users/${userId}/orders?page=${page}`;

    // Cách 3:
    var html = `<div class="card">
        <h2>${title}</h2>
        <p>${description}</p>
        <span>Giá: ${price}đ</span>
    </div>`;