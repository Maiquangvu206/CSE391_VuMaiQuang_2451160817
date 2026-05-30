const products = [
    { id: 1, name: "iPhone 16", price: 25990000, category: "phone", image: "https://placehold.co/200", rating: 4.5, inStock: true },
    { id: 2, name: "Samsung S24", price: 21990000, category: "phone", image: "https://placehold.co/200", rating: 4.3, inStock: true },
    { id: 3, name: "MacBook Pro", price: 45990000, category: "laptop", image: "https://placehold.co/200", rating: 4.8, inStock: true },
    { id: 4, name: "Dell XPS", price: 39990000, category: "laptop", image: "https://placehold.co/200", rating: 4.6, inStock: true },
    { id: 5, name: "AirPods", price: 4990000, category: "accessory", image: "https://placehold.co/200", rating: 4.4, inStock: true },
    { id: 6, name: "Sony Headphone", price: 7990000, category: "accessory", image: "https://placehold.co/200", rating: 4.7, inStock: true },
    { id: 7, name: "iPad Pro", price: 29990000, category: "tablet", image: "https://placehold.co/200", rating: 4.6, inStock: true },
    { id: 8, name: "Galaxy Tab", price: 18990000, category: "tablet", image: "https://placehold.co/200", rating: 4.2, inStock: true },
    { id: 9, name: "Asus ROG", price: 35990000, category: "laptop", image: "https://placehold.co/200", rating: 4.5, inStock: true },
    { id: 10, name: "Xiaomi 14", price: 15990000, category: "phone", image: "https://placehold.co/200", rating: 4.1, inStock: true },
    { id: 11, name: "Logitech Mouse", price: 990000, category: "accessory", image: "https://placehold.co/200", rating: 4.3, inStock: true },
    { id: 12, name: "Surface Pro", price: 32990000, category: "tablet", image: "https://placehold.co/200", rating: 4.4, inStock: true },
];

let filtered = [...products];
let cartCount = 0;
let currentCategory = "all";

const app = document.getElementById("app");

function init() {
    const container = document.createElement("div");
    container.className = "container";

    // topbar
    const topbar = document.createElement("div");
    topbar.className = "topbar";

    const search = document.createElement("input");
    search.placeholder = "Search...";
    search.addEventListener("input", searchProducts);

    const sort = document.createElement("select");
    ["default","price-asc","price-desc","name","rating"].forEach(v => {
        const opt = document.createElement("option");
        opt.value = v;
        opt.textContent = v;
        sort.appendChild(opt);
    });
    sort.addEventListener("change", sortProducts);

    const darkBtn = document.createElement("button");
    darkBtn.textContent = "🌙";
    darkBtn.onclick = () => document.body.classList.toggle("dark-mode");

    topbar.append(search, sort, darkBtn);

    // category buttons
    ["all","phone","laptop","tablet","accessory"].forEach(cat => {
        const btn = document.createElement("button");
        btn.textContent = cat;
        btn.onclick = () => filterByCategory(cat);
        topbar.appendChild(btn);
    });

    // cart
    const cart = document.createElement("div");
    cart.className = "cart";
    cart.innerHTML = `🛒 <span id="badge" class="badge">0</span>`;

    // grid
    const grid = document.createElement("div");
    grid.className = "grid";
    grid.id = "grid";

    container.append(topbar, grid);
    app.append(container, cart);

    renderProducts(filtered);
}

init();

function renderProducts(list) {
    const grid = document.getElementById("grid");
    grid.innerHTML = "";

    list.forEach(p => {
        const card = document.createElement("div");
        card.className = "card";

        const img = document.createElement("img");
        img.src = p.image;

        const name = document.createElement("h4");
        name.textContent = p.name;

        const price = document.createElement("p");
        price.textContent = p.price.toLocaleString();

        const btn = document.createElement("button");
        btn.textContent = "Add to cart";

        btn.addEventListener("click", (e) => {
            e.stopPropagation();
            cartCount++;
            document.getElementById("badge").textContent = cartCount;
        });

        card.addEventListener("click", () => openModal(p));

        card.append(img, name, price, btn);
        grid.appendChild(card);
    });
}

function searchProducts(e) {
    const keyword = e.target.value.toLowerCase();

    filtered = products.filter(p =>
        p.name.toLowerCase().includes(keyword)
    );

    renderProducts(filtered);
}

function filterByCategory(cat) {
    currentCategory = cat;

    filtered = cat === "all"
        ? products
        : products.filter(p => p.category === cat);

    renderProducts(filtered);
}

function sortProducts(e) {
    const type = e.target.value;

    let sorted = [...filtered];

    if (type === "price-asc") sorted.sort((a,b)=>a.price-b.price);
    if (type === "price-desc") sorted.sort((a,b)=>b.price-a.price);
    if (type === "name") sorted.sort((a,b)=>a.name.localeCompare(b.name));
    if (type === "rating") sorted.sort((a,b)=>b.rating-a.rating);

    renderProducts(sorted);
}

function openModal(p) {
    const modal = document.createElement("div");
    modal.className = "modal";

    const content = document.createElement("div");
    content.className = "modal-content";

    content.innerHTML = `
        <h2>${p.name}</h2>
        <p>Price: ${p.price}</p>
        <p>Rating: ${p.rating}</p>
        <button id="close">Close</button>
    `;

    modal.appendChild(content);
    document.body.appendChild(modal);

    content.querySelector("#close").onclick = () => modal.remove();
    modal.onclick = (e) => {
        if (e.target === modal) modal.remove();
    };
}