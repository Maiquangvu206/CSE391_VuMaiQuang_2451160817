const form = document.getElementById("registerForm");

const nameInput = document.getElementById("name");
const nameStatus = document.getElementById("nameStatus");
const nameError = document.getElementById("nameError");

const emailInput = document.getElementById("email");
const emailError = document.getElementById("emailError");

const passwordInput = document.getElementById("password");
const strengthFill = document.getElementById("strengthFill");
const strengthText = document.getElementById("strengthText");

const confirmPasswordInput = document.getElementById("confirmPassword");
const confirmError = document.getElementById("confirmError");

const phoneInput = document.getElementById("phone");
const phoneError = document.getElementById("phoneError");

const submitBtn = document.getElementById("submitBtn");

const modalOverlay = document.getElementById("modalOverlay");
const modalContent = document.getElementById("modalContent");
const closeModalBtn = document.getElementById("closeModalBtn");

const state = {
    name: false,
    email: false,
    password: false,
    confirm: false,
    phone: false
};

function updateSubmitState() {
    const allValid = Object.values(state).every(Boolean);
    submitBtn.disabled = !allValid;
}

function validateName() {
    const value = nameInput.value.trim();
    const valid = value.length >= 2 && value.length <= 50;

    state.name = valid;
    nameStatus.textContent = valid ? "✅" : "❌";
    nameStatus.className = valid ? "status ok" : "status bad";
    nameError.textContent = value.length === 0
        ? "Tên không được để trống."
        : valid
            ? ""
            : "Tên phải từ 2 đến 50 ký tự.";

    updateSubmitState();
}

function validateEmail() {
    const value = emailInput.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const valid = emailRegex.test(value);

    state.email = valid;
    emailError.textContent = value.length === 0
        ? "Email không được để trống."
        : valid
            ? ""
            : "Email không đúng định dạng. Ví dụ: name@gmail.com";

    updateSubmitState();
}

function getPasswordStrength(password) {
    const hasLetter = /[A-Za-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasSpecial = /[^A-Za-z0-9]/.test(password);

    if (password.length < 8) {
        return {
            level: "weak",
            label: "Yếu",
            width: "33%",
            color: "#dc2626"
        };
    }

    const isMedium = hasLetter && hasNumber;
    const isStrong = hasUpper && hasLower && hasNumber && hasSpecial;

    if (isStrong) {
        return {
            level: "strong",
            label: "Mạnh",
            width: "100%",
            color: "#16a34a"
        };
    }

    if (isMedium) {
        return {
            level: "medium",
            label: "Trung bình",
            width: "66%",
            color: "#f59e0b"
        };
    }

    return {
        level: "weak",
        label: "Yếu",
        width: "33%",
        color: "#dc2626"
    };
}

function validatePassword() {
    const value = passwordInput.value;
    const strength = getPasswordStrength(value);

    strengthFill.style.width = strength.width;
    strengthFill.style.backgroundColor = strength.color;
    strengthText.textContent = value.length === 0 ? "Chưa nhập" : strength.label;

    state.password = strength.level !== "weak";

    validateConfirmPassword();
    updateSubmitState();
}

function validateConfirmPassword() {
    const password = passwordInput.value;
    const confirm = confirmPasswordInput.value;
    const valid = confirm.length > 0 && confirm === password;

    state.confirm = valid;
    confirmError.textContent = confirm.length === 0
        ? "Vui lòng nhập lại mật khẩu."
        : valid
            ? ""
            : "Mật khẩu xác nhận không khớp.";

    updateSubmitState();
}

function formatPhone(digits) {
    const part1 = digits.slice(0, 4);
    const part2 = digits.slice(4, 7);
    const part3 = digits.slice(7, 10);

    let result = part1;
    if (part2.length > 0) result += "-" + part2;
    if (part3.length > 0) result += "-" + part3;

    return result;
}

function validatePhone() {
    const digits = phoneInput.value.replace(/\D/g, "");
    const valid = digits.length === 10;

    state.phone = valid;
    phoneError.textContent = digits.length === 0
        ? "Số điện thoại không được để trống."
        : valid
            ? ""
            : "Số điện thoại phải có đúng 10 chữ số.";

    updateSubmitState();
}

nameInput.addEventListener("input", validateName);
emailInput.addEventListener("input", validateEmail);
passwordInput.addEventListener("input", validatePassword);
confirmPasswordInput.addEventListener("input", validateConfirmPassword);

phoneInput.addEventListener("input", () => {
    const digits = phoneInput.value.replace(/\D/g, "").slice(0, 10);
    phoneInput.value = formatPhone(digits);
    validatePhone();
});

form.addEventListener("submit", (e) => {
    e.preventDefault();

    validateName();
    validateEmail();
    validatePassword();
    validateConfirmPassword();
    validatePhone();

    const allValid = Object.values(state).every(Boolean);
    if (!allValid) return;

    const data = {
        name: nameInput.value.trim(),
        email: emailInput.value.trim(),
        password: passwordInput.value,
        phone: phoneInput.value.trim()
    };

    modalContent.innerHTML = `
        <div><strong>Tên:</strong> ${data.name}</div>
        <div><strong>Email:</strong> ${data.email}</div>
        <div><strong>Password:</strong> ${"*".repeat(Math.max(8, data.password.length))}</div>
        <div><strong>Phone:</strong> ${data.phone}</div>
    `;

    modalOverlay.classList.remove("hidden");
});

closeModalBtn.addEventListener("click", () => {
    modalOverlay.classList.add("hidden");
});

modalOverlay.addEventListener("click", (e) => {
    if (e.target === modalOverlay) {
        modalOverlay.classList.add("hidden");
    }
});

// initial state
validateName();
validateEmail();
validatePassword();
validateConfirmPassword();
validatePhone();
updateSubmitState();