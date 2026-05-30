const images = [
    {
        src: "https://placehold.co/1200x800?text=Photo+1",
        title: "Mountain View",
        meta: "Ảnh 1 / 9"
    },
    {
        src: "https://placehold.co/1200x800?text=Photo+2",
        title: "City Lights",
        meta: "Ảnh 2 / 9"
    },
    {
        src: "https://placehold.co/1200x800?text=Photo+3",
        title: "Ocean Breeze",
        meta: "Ảnh 3 / 9"
    },
    {
        src: "https://placehold.co/1200x800?text=Photo+4",
        title: "Forest Walk",
        meta: "Ảnh 4 / 9"
    },
    {
        src: "https://placehold.co/1200x800?text=Photo+5",
        title: "Golden Sunset",
        meta: "Ảnh 5 / 9"
    },
    {
        src: "https://placehold.co/1200x800?text=Photo+6",
        title: "Night Sky",
        meta: "Ảnh 6 / 9"
    },
    {
        src: "https://placehold.co/1200x800?text=Photo+7",
        title: "Desert Road",
        meta: "Ảnh 7 / 9"
    },
    {
        src: "https://placehold.co/1200x800?text=Photo+8",
        title: "Snow Peak",
        meta: "Ảnh 8 / 9"
    },
    {
        src: "https://placehold.co/1200x800?text=Photo+9",
        title: "Lake Mirror",
        meta: "Ảnh 9 / 9"
    }
];

const commands = [
    { name: "Go to next image", shortcut: "→", action: () => nextImage() },
    { name: "Go to previous image", shortcut: "←", action: () => prevImage() },
    { name: "Play / pause slideshow", shortcut: "Space", action: () => toggleSlideshow() },
    { name: "Open current image in modal", shortcut: "Enter", action: () => openModal(currentIndex) },
    { name: "Close modal / palette", shortcut: "Escape", action: () => closeAllOverlays() }
];

const mainImage = document.getElementById("mainImage");
const imageTitle = document.getElementById("imageTitle");
const imageMeta = document.getElementById("imageMeta");
const thumbnails = document.getElementById("thumbnails");

const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const playBtn = document.getElementById("playBtn");
const openCommandsBtn = document.getElementById("openCommandsBtn");

const modal = document.getElementById("modal");
const modalImage = document.getElementById("modalImage");
const closeModalBtn = document.getElementById("closeModalBtn");
const overlay = document.getElementById("overlay");

const commandPalette = document.getElementById("commandPalette");
const commandInput = document.getElementById("commandInput");
const commandList = document.getElementById("commandList");

let currentIndex = 0;
let isPlaying = false;
let timerId = null;
let commandIndex = 0;

function renderGallery() {
    mainImage.src = images[currentIndex].src;
    mainImage.alt = images[currentIndex].title;
    imageTitle.textContent = images[currentIndex].title;
    imageMeta.textContent = images[currentIndex].meta;

    thumbnails.innerHTML = "";

    images.forEach((img, index) => {
        const btn = document.createElement("button");
        btn.className = `thumbnail ${index === currentIndex ? "active" : ""}`;
        btn.type = "button";
        btn.setAttribute("aria-label", `Go to image ${index + 1}: ${img.title}`);
        btn.setAttribute("aria-pressed", String(index === currentIndex));

        const thumbImg = document.createElement("img");
        thumbImg.src = img.src;
        thumbImg.alt = img.title;

        const label = document.createElement("span");
        label.textContent = index + 1;

        btn.appendChild(thumbImg);
        btn.appendChild(label);

        btn.addEventListener("click", () => {
            setImage(index);
            mainImage.focus?.();
        });

        thumbnails.appendChild(btn);
    });
}

function setImage(index) {
    currentIndex = (index + images.length) % images.length;
    renderGallery();
}

function nextImage() {
    setImage(currentIndex + 1);
}

function prevImage() {
    setImage(currentIndex - 1);
}

function startSlideshow() {
    stopSlideshow();
    timerId = setInterval(nextImage, 2000);
    isPlaying = true;
    playBtn.textContent = "⏸";
    playBtn.setAttribute("aria-label", "Pause slideshow");
}

function stopSlideshow() {
    if (timerId) clearInterval(timerId);
    timerId = null;
    isPlaying = false;
    playBtn.textContent = "▶";
    playBtn.setAttribute("aria-label", "Play slideshow");
}

function toggleSlideshow() {
    if (isPlaying) {
        stopSlideshow();
    } else {
        startSlideshow();
    }
}

function openModal(index) {
    modalImage.src = images[index].src;
    modalImage.alt = images[index].title;
    modal.classList.remove("hidden");
    overlay.classList.remove("hidden");
    closeModalBtn.focus();
}

function closeModal() {
    modal.classList.add("hidden");
    overlay.classList.add("hidden");
}

function openCommandPalette() {
    commandPalette.classList.remove("hidden");
    overlay.classList.remove("hidden");
    commandInput.value = "";
    commandIndex = 0;
    renderCommands("");
    commandInput.focus();
}

function closeCommandPalette() {
    commandPalette.classList.add("hidden");
    if (!modal.classList.contains("hidden")) return;
    overlay.classList.add("hidden");
}

function closeAllOverlays() {
    closeModal();
    closeCommandPalette();
    overlay.classList.add("hidden");
}

function renderCommands(query) {
    const q = query.trim().toLowerCase();
    const filtered = commands.filter(cmd => cmd.name.toLowerCase().includes(q));

    commandList.innerHTML = "";

    filtered.forEach((cmd, index) => {
        const li = document.createElement("li");
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = `command-item ${index === commandIndex ? "active" : ""}`;
        btn.setAttribute("role", "option");
        btn.setAttribute("aria-selected", String(index === commandIndex));

        const left = document.createElement("span");
        left.textContent = cmd.name;

        const right = document.createElement("span");
        right.className = "command-shortcut";
        right.textContent = cmd.shortcut;

        btn.appendChild(left);
        btn.appendChild(right);

        btn.addEventListener("click", () => {
            cmd.action();
            closeCommandPalette();
            overlay.classList.add("hidden");
        });

        li.appendChild(btn);
        commandList.appendChild(li);
    });
}

prevBtn.addEventListener("click", prevImage);
nextBtn.addEventListener("click", nextImage);
playBtn.addEventListener("click", toggleSlideshow);
openCommandsBtn.addEventListener("click", openCommandPalette);

closeModalBtn.addEventListener("click", closeAllOverlays);
overlay.addEventListener("click", closeAllOverlays);

commandInput.addEventListener("input", (e) => {
    commandIndex = 0;
    renderCommands(e.target.value);
});

commandInput.addEventListener("keydown", (e) => {
    const items = [...commandList.querySelectorAll(".command-item")];
    if (items.length === 0) return;

    if (e.key === "ArrowDown") {
        e.preventDefault();
        commandIndex = (commandIndex + 1) % items.length;
        renderCommands(commandInput.value);
    }

    if (e.key === "ArrowUp") {
        e.preventDefault();
        commandIndex = (commandIndex - 1 + items.length) % items.length;
        renderCommands(commandInput.value);
    }

    if (e.key === "Enter") {
        e.preventDefault();
        const filtered = commands.filter(cmd =>
            cmd.name.toLowerCase().includes(commandInput.value.trim().toLowerCase())
        );
        if (filtered[commandIndex]) {
            filtered[commandIndex].action();
            closeCommandPalette();
            overlay.classList.add("hidden");
        }
    }

    if (e.key === "Escape") {
        e.preventDefault();
        closeAllOverlays();
    }
});

document.addEventListener("keydown", (e) => {
    const activeInInput = ["INPUT", "TEXTAREA"].includes(document.activeElement.tagName);

    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        openCommandPalette();
        return;
    }

    if (!commandPalette.classList.contains("hidden")) {
        if (e.key === "Escape") {
            closeAllOverlays();
        }
        return;
    }

    if (e.key === "ArrowRight") {
        nextImage();
    }

    if (e.key === "ArrowLeft") {
        prevImage();
    }

    if (e.key >= "1" && e.key <= "9") {
        const index = Number(e.key) - 1;
        if (images[index]) setImage(index);
    }

    if (e.key === " " && !activeInInput) {
        e.preventDefault();
        toggleSlideshow();
    }

    if (e.key === "Escape") {
        closeAllOverlays();
    }
});

renderGallery();
renderCommands("");