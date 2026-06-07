const form = document.getElementById("userForm");
const searchInput = document.getElementById("search");
let users = [];
let editingId = null;

async function loadUsers() {
    try {
        ui.showLoading();
        users = await api.getUsers();
        ui.renderUsers(users);
    } catch(error) {
        ui.showError(error.message);
    } finally {
        ui.hideLoading();
    }
}

form.addEventListener(
    "submit",
    async (e) => {
        e.preventDefault();
        const userData = {
            name:
                document.getElementById("name")
                .value,

            email:
                document.getElementById("email")
                .value
        };

        try {
            if(editingId) {
                const updated =
                    await api.updateUser(
                        editingId,
                        userData
                    );
                users = users.map(user =>
                    user.id === editingId
                        ? updated
                        : user
                );
                ui.showSuccess(
                    "User updated successfully"
                );
                editingId = null;
            } else {
                const created = await api.createUser(userData);
                created.id = Date.now();
                users.unshift(created);
                ui.showSuccess(
                    "User created successfully"
                );
            }

            ui.renderUsers(users);
            form.reset();
        } catch(error) {
            ui.showError(error.message);
        }
    }
);

async function editUser(id) {
    try {
        const user = await api.getUser(id);
        document.getElementById("name").value = user.name;
        document.getElementById("email").value = user.email;
        editingId = id;
    } catch(error) {
        ui.showError(error.message);
    }
}

async function deleteUser(id) {
    const confirmed = confirm("Delete this user?");
    if(!confirmed) return;
    try {
        await api.deleteUser(id);
        users = users.filter(user => user.id !== id);
        ui.renderUsers(users);
        ui.showSuccess("User deleted successfully");

    } catch(error) {
        ui.showError(error.message);
    }
}

searchInput.addEventListener(
    "input",
    (e) => {
        const keyword = e.target.value.toLowerCase();

        const filtered =
            users.filter(user =>
                user.name
                    .toLowerCase()
                    .includes(keyword)
                ||
                user.email
                    .toLowerCase()
                    .includes(keyword)
            );
        ui.renderUsers(filtered);
    }
);

loadUsers();