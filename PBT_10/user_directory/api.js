const api = {
    baseURL: "https://jsonplaceholder.typicode.com",

    async getUsers() {
        const response = await fetch(
            `${this.baseURL}/users`
        );

        if (!response.ok) {
            throw new Error("Failed to fetch users");
        }
        return response.json();
    },

    async getUser(id) {
        const response = await fetch(
            `${this.baseURL}/users/${id}`
        );

        if (!response.ok) {
            throw new Error("Failed to fetch user");
        }

        return response.json();
    },

    async createUser(data) {
        const response = await fetch(
            `${this.baseURL}/users`,
            {
                method: "POST",
                headers: {
                    "Content-Type":
                    "application/json"
                },
                body: JSON.stringify(data)
            }
        );

        if (!response.ok) {
            throw new Error("Create failed");
        }

        return response.json();
    },

    async updateUser(id, data) {
        const response = await fetch(
            `${this.baseURL}/users/${id}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type":
                    "application/json"
                },
                body: JSON.stringify(data)
            }
        );

        if (!response.ok) {
            throw new Error("Update failed");
        }

        return response.json();
    },

    async deleteUser(id) {
        const response = await fetch(
            `${this.baseURL}/users/${id}`,
            {
                method: "DELETE"
            }
        );

        if (!response.ok) {
            throw new Error("Delete failed");
        }
        return true;
    }
};