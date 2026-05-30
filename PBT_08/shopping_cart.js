function createCart() {
    let items = [];
    let discountPercent = 0;
    let fixedDiscount = 0;

    return {
        addItem(product, quantity = 1) {
            const existing = items.find(item => item.id === product.id);
            if (existing) {
                existing.quantity += quantity;
            } else {
                items.push({
                    ...product,
                    quantity
                });
            }
        },

        removeItem(productId) {
            items = items.filter(item => item.id !== productId);
        },

        updateQuantity(productId, newQuantity) {
            const item = items.find(item => item.id === productId);
            if (!item) return;
            if (newQuantity <= 0) {
                this.removeItem(productId);
            } else {
                item.quantity = newQuantity;
            }
        },

        applyDiscount(code) {
            discountPercent = 0;
            fixedDiscount = 0;
            switch (code) {
                case "SALE10":
                    discountPercent = 0.1;
                    break;
                case "SALE20":
                    discountPercent = 0.2;
                    break;
                case "FREESHIP":
                    fixedDiscount = 30000;
                    break;
                default:
                    console.log("Mã giảm giá không hợp lệ!");
            }
        },

        getTotal() {
            const subtotal = items.reduce(
                (sum, item) => sum + item.price * item.quantity,
                0
            );
            return subtotal - subtotal * discountPercent - fixedDiscount;
        },

        getItemCount() {
            return items.reduce(
                (sum, item) => sum + item.quantity,
                0
            );
        },

        clearCart() {
            items = [];
            discountPercent = 0;
            fixedDiscount = 0;
        },

        printCart() {
            console.log("\n==============================================================");
            console.log("STT | Sản phẩm         | SL | Đơn giá      | Thành tiền");
            console.log("--------------------------------------------------------------");
            items.forEach((item, index) => {
                const lineTotal = item.price * item.quantity;
                console.log(
                    `${String(index + 1).padEnd(3)} | ` +
                    `${item.name.padEnd(16)} | ` +
                    `${String(item.quantity).padStart(2)} | ` +
                    `${item.price.toLocaleString("vi-VN").padStart(12)} | ` +
                    `${lineTotal.toLocaleString("vi-VN").padStart(12)}`
                );
            });

            console.log("--------------------------------------------------------------");
            console.log(
                `Tổng số lượng: ${this.getItemCount()}`
            );
            console.log(
                `Tổng cộng: ${this.getTotal().toLocaleString("vi-VN")}đ`
            );
            console.log("==============================================================");
        }
    };
}

const cart = createCart();
cart.addItem(
    { id: 1, name: "iPhone 16", price: 25990000 },
    1
);
cart.addItem(
    { id: 3, name: "AirPods Pro", price: 6990000 },
    2
);
cart.addItem(
    { id: 1, name: "iPhone 16", price: 25990000 },
    1
);

console.log("=== GIỎ HÀNG BAN ĐẦU ===");
cart.printCart();

cart.applyDiscount("SALE10");

console.log("\n=== SAU KHI ÁP DỤNG SALE10 ===");
cart.printCart();

console.log("\nSố SP:", cart.getItemCount());

cart.removeItem(3);

console.log("\nSau xóa AirPods:");
cart.printCart();

console.log("Số SP:", cart.getItemCount());