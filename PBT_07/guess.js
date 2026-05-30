// Random số từ 1 → 100
var secretNumber = Math.floor(Math.random() * 100) + 1;

var maxAttempts = 7;
var attempts = 0;

// Lưu các số đã đoán
var guessedNumbers = [];

while (attempts < maxAttempts) {
    var input = prompt("Nhập số từ 1 đến 100:");

    // Nếu user bấm Cancel
    if (input === null) {
        alert("Bạn đã thoát game!");
        break;
    }

    var guess = Number(input);

    // Validate: phải là số và trong khoảng
    if (isNaN(guess) || guess < 1 || guess > 100) {
        alert("Vui lòng nhập số hợp lệ từ 1 đến 100!");
        continue; // không tính lượt
    }

    // Check đoán trùng
    var isDuplicate = false;
    for (var i = 0; i < guessedNumbers.length; i++) {
        if (guessedNumbers[i] === guess) {
            isDuplicate = true;
            break;
        }
    }

    if (isDuplicate) {
        alert("Bạn đã đoán số này rồi!");
        continue; // không tính lượt
    }

    // Lưu lại số đã đoán
    guessedNumbers.push(guess);
    attempts++;

    // So sánh
    if (guess === secretNumber) {
        alert("Đúng rồi! Bạn đoán đúng sau " + attempts + " lần!");
        break;
    } else if (guess < secretNumber) {
        alert("Cao hơn!");
    } else {
        alert("Thấp hơn!");
    }

    // Nếu hết lượt
    if (attempts === maxAttempts) {
        alert("Bạn đã hết lượt! Số đúng là: " + secretNumber);
    }
}