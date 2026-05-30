// Đoạn 1
try {
    console.log(x);
    var x = 5;
} catch (e) {
    console.error("Đoạn 1 lỗi:", e.message);
}

// Đoạn 2
try {
    console.log(y);
    let y = 10;
} catch (e) {
    console.error("Đoạn 2 lỗi:", e.message);
}

// Đoạn 3
try {
    const z = 15;
    z = 20;
    console.log(z);
} catch (e) {
    console.error("Đoạn 3 lỗi:", e.message);
}

// Đoạn 4
try {
    const arr = [1, 2, 3];
    arr.push(4);
    console.log(arr);
} catch (e) {
    console.error("Đoạn 4 lỗi:", e.message);
}

// Đoạn 5
try {
    let a = 1;
    {
        let a = 2;
        console.log("Trong block:", a);
    }
    console.log("Ngoài block:", a);
} catch (e) {
    console.error("Đoạn 5 lỗi:", e.message);
}