const STORAGE_KEY = "todos";

let todos = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
let filter = "all";

const todoForm = document.getElementById("todoForm");
const todoInput = document.getElementById("todoInput");
const todoList = document.getElementById("todoList");
const countEl = document.getElementById("count");
const clearBtn = document.getElementById("clearCompleted");
const filterBtns = document.querySelectorAll(".filters button");

// ================= SAVE =================
function saveTodos() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

// ================= RENDER =================
function render() {
    todoList.innerHTML = ""; // OK (không dùng cho từng item)

    let filtered = todos.filter(todo => {
        if (filter === "active") return !todo.completed;
        if (filter === "completed") return todo.completed;
        return true;
    });

    filtered.forEach(todo => {
        const li = document.createElement("li");
        li.dataset.id = todo.id;

        if (todo.completed) li.classList.add("completed");

        const span = document.createElement("span");
        span.textContent = todo.text;

        const btn = document.createElement("button");
        btn.textContent = "❌";

        li.appendChild(span);
        li.appendChild(btn);
        todoList.appendChild(li);
    });

    updateCount();
}

// ================= COUNT =================
function updateCount() {
    const left = todos.filter(t => !t.completed).length;
    countEl.textContent = `${left} items left`;
}

// ================= ADD =================
todoForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const text = todoInput.value.trim();
    if (!text) return;

    todos.push({
        id: Date.now(),
        text,
        completed: false
    });

    todoInput.value = "";
    saveTodos();
    render();
});

// ================= EVENT DELEGATION =================
todoList.addEventListener("click", (e) => {
    const li = e.target.closest("li");
    if (!li) return;

    const id = Number(li.dataset.id);

    // DELETE
    if (e.target.tagName === "BUTTON") {
        todos = todos.filter(t => t.id !== id);
    }

    // TOGGLE
    if (e.target.tagName === "SPAN") {
        const todo = todos.find(t => t.id === id);
        todo.completed = !todo.completed;
    }

    saveTodos();
    render();
});

// ================= EDIT =================
todoList.addEventListener("dblclick", (e) => {
    if (e.target.tagName !== "SPAN") return;

    const li = e.target.closest("li");
    const id = Number(li.dataset.id);

    const input = document.createElement("input");
    input.value = e.target.textContent;

    li.innerHTML = "";
    li.appendChild(input);
    input.focus();

    input.addEventListener("keydown", (ev) => {
        if (ev.key === "Enter") {
            const todo = todos.find(t => t.id === id);
            todo.text = input.value.trim();

            saveTodos();
            render();
        }
    });
});

// ================= FILTER =================
filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        filter = btn.dataset.filter;

        filterBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        render();
    });
});

// ================= CLEAR COMPLETED =================
clearBtn.addEventListener("click", () => {
    todos = todos.filter(t => !t.completed);
    saveTodos();
    render();
});

// ================= INIT =================
render();