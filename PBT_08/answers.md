# PHẦN A
## Câu A1
1. Function Declaration
```js 
console.log(tinhThueBaoHiem(15000000));
function tinhThueBaoHiem(luong) {
    let thue = luong > 11000000 ? luong * 0.1 : 0;
    return {
        thue,
        thuc_nhan: luong - thue
    };
}
```
-  Về hoisting không bị lỗi bởi vì các khai báo biến được đưa hết lên đầu khi thực thi

2. Function Expression
```js
console.log(tinhThueBaoHiem(15000000));
const tinhThueBaoHiem = function(luong) {
    let thue = luong > 11000000 ? luong * 0.1 : 0;
    return {
        thue,
        thuc_nhan: luong - thue
    };
};
```
- Biến `const tinhThueBaoHiem` được hoisting nhưng chưa khởi tạo -> Hàm chỉ được gán cho biến khi chạy đến dòng khai báo. 

3. Arrow Function -> Giống Function Expression
```js
console.log(tinhThueBaoHiem(15000000));
const tinhThueBaoHiem = (luong) => {
    let thue = luong > 11000000 ? luong * 0.1 : 0;
    return {
        thue,
        thuc_nhan: luong - thue
    };
};
```
**Chỉ có Function Declaration cho phép gọi hàm trước khi khai báo. Function Expression và Arrow Function phải được khai báo trước rồi mới sử dụng.**
## Câu A2
```js
// Đoạn 1:
function counter() {
    let count = 0;
    return {
        increment: () => ++count,
        decrement: () => --count,
        getCount: () => count
    };
}
const c = counter();
console.log(c.increment());  // 1
console.log(c.increment());  // 2
console.log(c.increment());  // 3
console.log(c.decrement());  // 2
console.log(c.getCount());   // 2

// Đoạn 2:
for (var i = 0; i < 3; i++) {
    setTimeout(() => console.log("var:", i), 100);
}
for (let j = 0; j < 3; j++) {
    setTimeout(() => console.log("let:", j), 200);
}
// Output sau 200ms: 
// var: 3 
// var: 3
// var: 3
// let: 0
// let: 1
// let: 2
```
- `var` dùng chung một biến cho toàn vòng lặp -> `let` mỗi vòng lặp dùng biến riêng
## Câu A3
- Cho mảng: const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
1. Lấy các số chẵn
const soChan = nums.filter(n => n%2==0)    → [2, 4, 6, 8, 10]
2. Nhân mỗi số với 3
const  nhanBa = nums.map(n => n*3)   → [3, 6, 9, ..., 30]
3. Tính tổng tất cả
const tong = nums.reduce((acc, n) => acc + n, 0);   → 55
4. Tìm số đầu tiên > 7
const tim = nums.find(n => n>7)     → 8
5. Kiểm tra CÓ số > 10 không
const hasGreaterThan10 = nums.some(n => n > 10);     → false
6. Kiểm tra TẤT CẢ đều > 0
const allPositive = nums.every(n => n > 0);    → true
7. Tạo mảng "Số X là [chẵn/lẻ]"
const descriptions = nums.map(n => `Số ${n} là ${n % 2 === 0 ? 'chẵn' : 'lẻ'}`);    → ["Số 1 là lẻ", "Số 2 là chẵn", ...]
8. Đảo ngược mảng (không mutate gốc)
const reversed = [...nums].reverse();   → [10, 9, ..., 1]
## Câu A4
```js
const product = {
    name: "iPhone 16",
    price: 25990000,
    specs: { ram: 8, storage: 256, color: "Titan" }
};

// Destructuring
const { name, price, specs: { ram, color } } = product;
console.log(name, price, ram, color);   //iPhone 16 25990000 8 Titan
console.log(specs);                     //error

// Spread
const updated = { ...product, price: 23990000, sale: true };
console.log(updated.price);            // 23990000
console.log(updated.sale);             // true
console.log(product.price);            // 25990000 -> gốc không đổi

// Spread gotcha
const copy = { ...product };
copy.specs.ram = 16;
console.log(product.specs.ram);        // 16 -> product và copy là 2 object khác nhau. Nhưng product.specs và copy.specs cùng trỏ đến 1 object specs. => product.specs.ram = 16
```
```
# PHẦN C
## Câu C1
```js
const processOrders = orders =>
    orders
        .filter(({ status, total }) => status === "completed" && total > 100000)
        .map(({ id, customer, total }) => ({
            id, customer, total,
            discount: total * 0.1,
            finalTotal: total * 0.9
        }))
        .sort((a, b) => b.finalTotal - a.finalTotal);
```
## Câu C2
```js
const miniArray = {
    map(arr, fn) {
        const result = [];
        for (let i = 0; i < arr.length; i++) {
            result.push(fn(arr[i], i, arr));
        }
        return result;
    },

    filter(arr, fn) {
        const result = [];
        for (let i = 0; i < arr.length; i++) {
            if (fn(arr[i], i, arr)) {
                result.push(arr[i]);
            }
        }
        return result;
    },

    reduce(arr, fn, initialValue) {
        let accumulator = initialValue;
        for (let i = 0; i < arr.length; i++) {
            accumulator = fn(accumulator, arr[i], i, arr);
        }
        return accumulator;
    }
};

console.log(miniArray.map([1, 2, 3], x => x * 2));
console.log(miniArray.filter([1, 2, 3, 4], x => x > 2));
console.log(miniArray.reduce([1, 2, 3, 4], (a, b) => a + b, 0));
```
