const ui = {
    renderUsers(users) {
        const usersContainer = document.getElementById("users");
        usersContainer.innerHTML =
            users.map(user => `
                <div class="card">
                    <h3>${user.name}</h3>
                    <p>${user.email}</p>
                    <button onclick="editUser(${user.id})">Edit</button>
                    <button onclick="deleteUser(${user.id})">Delete</button>
                </div>
            `).join("");
    },

    showLoading() {
        const loading = document.getElementById("loading");
        loading.innerHTML = `
            <div class="skeleton"></div>
            <div class="skeleton"></div>
            <div class="skeleton"></div>
        `;
    },

    hideLoading() {
        document
            .getElementById("loading")
            .innerHTML = "";
    },

    showError(message) {
        const box = document.getElementById("message");
        box.className = "error";
        box.textContent = message;
    },

    showSuccess(message) {
        const box = document.getElementById("message");
        box.className = "success";
        box.textContent = message;
    }
};