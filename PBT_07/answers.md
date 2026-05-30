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

	
Phần C: Suy Luận
Câu C1 (10đ) — Debug JavaScript
Tìm và sửa TẤT CẢ lỗi trong code sau (có ít nhất 6 lỗi):

function tinhGiaGiamGia(giaBan, phanTramGiam) {
    if (phanTramGiam < 0 || phanTramGiam > 100) {
        return "Phần trăm giảm không hợp lệ"
    }
    
    var giamGia = giaBan * phanTramGiam / 100
    let giaSauGiam = giaBan - giamGia
    
    if (giaSauGiam = 0) {
        console.log("Sản phẩm miễn phí!")
    }
    
    return giaSauGiam
}

// Test
const gia = tinhGiaGiamGia("100000", 20)
console.log("Giá sau giảm: " + gia + "đ")

const gia2 = tinhGiaGiamGia(50000, 110)
console.log("Giá: " + gia2)

for (var i = 0; i < 5; i++) {
    setTimeout(function() {
        console.log("Item " + i)
    }, 1000)
}
Liệt kê lỗi + giải thích + cách sửa. Có 1 lỗi "ẩn" liên quan đến var trong vòng lặp — giải thích tại sao và sửa bằng let.

    1.Không kiểm tra kiểu dữ liệu của giaBan
        const gia = tinhGiaGiamGia("100000", 20)
        
        giaBan đang là chuỗi ("100000"), không phải số.
        JavaScript có thể tự ép kiểu trong phép nhân/trừ, nên code vẫn chạy, nhưng đây là lỗi logic vì hàm tính giá nên nhận number rõ ràng.

        Cách sửa: kiểm tra typeof giaBan === "number" và !isNaN(...).

    2. Dùng phép gán thay vì so sánh
        if (giaSauGiam = 0) {

        Đây là lỗi quan trọng nhất.
        = là gán, không phải so sánh. Dòng này sẽ gán giaSauGiam = 0, rồi điều kiện trở thành 0 (falsy), làm sai logic.

        Cách sửa:

        if (giaSauGiam === 0) {
    3. Hàm chỉ console.log nhưng không báo lỗi chuẩn khi input sai
    return "Phần trăm giảm không hợp lệ"

        Câu này ổn về mặt trả về, nhưng hàm đang thiếu kiểm tra đầy đủ cho:
            giaBan không phải số
            phanTramGiam không phải số
            giaBan âm
            phanTramGiam âm hoặc > 100

        Cách sửa: validate cả hai đầu vào trước khi tính.

    4) Thiếu dấu chấm phẩy không phải lỗi bắt buộc, nhưng nên chuẩn hóa

        Ví dụ:
            return "Phần trăm giảm không hợp lệ"
            var giamGia = giaBan * phanTramGiam / 100

        JavaScript có cơ chế tự chèn dấu chấm phẩy, nên thường vẫn chạy. Nhưng đây là lỗi style dễ gây nhầm trong bài kiểm tra.

        Cách sửa: thêm ; cho rõ ràng.

    5) Lỗi “ẩn” trong vòng lặp dùng var
        for (var i = 0; i < 5; i++) {
            setTimeout(function() {
                console.log("Item " + i)
            }, 1000)
        }

        Đây là lỗi kinh điển.
        var có phạm vi hàm, không có phạm vi block. Vì vậy đến lúc setTimeout chạy, vòng lặp đã kết thúc và i lúc đó bằng 5. Kết quả là in ra:
            Item 5
            Item 5
            Item 5
            Item 5
            Item 5

        Cách sửa: dùng let để mỗi vòng lặp có một biến i riêng.

    6) Thiếu xử lý trường hợp giá sau giảm bằng 0
        if (giaSauGiam === 0) {
            console.log("Sản phẩm miễn phí!")
        }

        Logic này đúng ý, nhưng nên dùng sau khi đã tính xong và không nên vừa console.log vừa trả về số mà không rõ ràng.

        Cách sửa: giữ nguyên hoặc trả về thông báo đặc biệt nếu cần.

Câu C2 (10đ) — Bài toán thực tế
Viết chương trình tính hóa đơn nhà hàng:

Input: Danh sách món ăn + giá + số lượng
Quy tắc:
- Tổng > 500k → giảm 10%
- Tổng > 1 triệu → giảm 15%  
- Ngày thứ 3 (Wednesday) → giảm thêm 5%
- VAT 8%
- Tip 5% (optional)

Output: Hóa đơn chi tiết dạng:
╔══════════════════════════════════════╗
║        HÓA ĐƠN NHÀ HÀNG           ║
╠══════════════════════════════════════╣
║ 1. Phở bò      x2    @65k  = 130k  ║
║ 2. Trà đá      x3    @5k   = 15k   ║
║ 3. Bún chả     x1    @55k  = 55k   ║
╠══════════════════════════════════════╣
║ Tổng cộng:              200.000đ    ║
║ Giảm giá (0%):           0đ         ║
║ VAT (8%):                16.000đ    ║
║ Tip (5%):                10.000đ    ║
╠══════════════════════════════════════╣
║ THANH TOÁN:              226.000đ   ║
╚══════════════════════════════════════╝
// ========================
// INPUT
// ========================

const items = [
    { name: "Phở bò", price: 65000, quantity: 2 },
    { name: "Trà đá", price: 5000, quantity: 3 },
    { name: "Bún chả", price: 55000, quantity: 1 },
];

// config
const isWednesday = true; // đổi false nếu không phải thứ 3
const hasTip = true;

// ========================
// HELPER FORMAT
// ========================

function formatMoney(n) {
    return n.toLocaleString("vi-VN") + "đ";
}

function padRight(str, len) {
    str = String(str);
    while (str.length < len) str += " ";
    return str;
}

function padLeft(str, len) {
    str = String(str);
    while (str.length < len) str = " " + str;
    return str;
}

// ========================
// TÍNH TOÁN
// ========================

let total = 0;

// in header
console.log("╔══════════════════════════════════════╗");
console.log("║        HÓA ĐƠN NHÀ HÀNG           ║");
console.log("╠══════════════════════════════════════╣");

// từng món
for (let i = 0; i < items.length; i++) {
    const item = items[i];
    const lineTotal = item.price * item.quantity;
    total += lineTotal;

    const line =
        `${i + 1}. ${padRight(item.name, 10)} ` +
        `x${item.quantity} ` +
        `@${Math.round(item.price / 1000)}k ` +
        `= ${Math.round(lineTotal / 1000)}k`;

    console.log("║ " + padRight(line, 36) + " ║");
}

console.log("╠══════════════════════════════════════╣");

// ========================
// GIẢM GIÁ
// ========================

let discountPercent = 0;

// rule tổng tiền
if (total > 1000000) {
    discountPercent = 15;
} else if (total > 500000) {
    discountPercent = 10;
}

// thêm giảm thứ 3
if (isWednesday) {
    discountPercent += 5;
}

let discountAmount = total * discountPercent / 100;

// ========================
// VAT + TIP
// ========================

let afterDiscount = total - discountAmount;

let vat = afterDiscount * 0.08;

let tip = hasTip ? total * 0.05 : 0;

// ========================
// FINAL
// ========================

let finalAmount = afterDiscount + vat + tip;

// ========================
// IN KẾT QUẢ
// ========================

function printLine(label, value) {
    const left = padRight(label, 25);
    const right = padLeft(formatMoney(value), 10);
    console.log(`║ ${left}${right}    ║`);
}

printLine("Tổng cộng:", total);
printLine(`Giảm giá (${discountPercent}%):`, discountAmount);
printLine("VAT (8%):", vat);
printLine("Tip (5%):", tip);

console.log("╠══════════════════════════════════════╣");
printLine("THANH TOÁN:", finalAmount);
console.log("╚══════════════════════════════════════╝");