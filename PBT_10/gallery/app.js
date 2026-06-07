const gallery = document.getElementById("gallery");
const loading = document.getElementById("loading");
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightbox-image");
const closeBtn = document.getElementById("close");

let page = 1;
let isLoading = false;

async function loadMorePhotos() {
    if (isLoading) return;
    isLoading = true;
    loading.style.display = "block";
    try {
        const response = await fetch(
            `https://jsonplaceholder.typicode.com/photos?_page=${page}&_limit=20`
        );
        const photos = await response.json();
        renderPhotos(photos);
        page++;
    } catch (error) {
        alert(error.message);
    } finally {
        loading.style.display = "none";
        isLoading = false;
    }
}

function renderPhotos(photos) {
    photos.forEach(photo => {
        const img = document.createElement("img");
        img.className = "photo";
        img.dataset.src = photo.thumbnailUrl;
        img.dataset.full = photo.url;
        gallery.appendChild(img);
        lazyObserver.observe(img);
    });
}

const lazyObserver =
    new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const img = entry.target;
            img.src = img.dataset.src;
            lazyObserver.unobserve(img);
        });
    });

gallery.addEventListener("click", e => {
    if (!e.target.classList.contains("photo"))
        return;
    lightbox.classList.remove("hidden");
    lightboxImage.src = e.target.dataset.full;
});

closeBtn.addEventListener("click", () => {
    lightbox.classList.add("hidden");
});

const observer =
    new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
            loadMorePhotos();
        }
    });

observer.observe(
    document.querySelector("#load-trigger")
);

loadMorePhotos();