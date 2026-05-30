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