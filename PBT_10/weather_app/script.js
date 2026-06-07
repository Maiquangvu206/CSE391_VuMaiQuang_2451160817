const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");

const loading = document.getElementById("loading");
const errorDiv = document.getElementById("error");
const weatherDiv = document.getElementById("weather");

const cityName = document.getElementById("cityName");
const temp = document.getElementById("temp");
const humidity = document.getElementById("humidity");
const description = document.getElementById("description");
const weatherIcon = document.getElementById("weatherIcon");

const historyDiv = document.getElementById("history");

loadHistory();

searchBtn.addEventListener("click", () => {
    const city = cityInput.value.trim();
    if (!city) return;
    getWeather(city);
});

async function getWeather(city) {
    showLoading();
    try {
        const url = `https://wttr.in/${city}?format=j1`;
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Không tìm thấy thành phố");
        }

        const data = await response.json();
        const current = data.current_condition[0];

        cityName.textContent = city;
        temp.textContent = current.temp_C;
        humidity.textContent = current.humidity;
        description.textContent = current.weatherDesc[0].value;
        weatherIcon.src = current.weatherIconUrl[0].value;
        weatherDiv.classList.remove("hidden");
        saveHistory(city);
    } catch (error) {
        showError(
            "Không lấy được dữ liệu hoặc mất kết nối mạng."
        );

    } finally {
        loading.classList.add("hidden");
    }
}

function showLoading() {
    loading.classList.remove("hidden");
    weatherDiv.classList.add("hidden");
    errorDiv.classList.add("hidden");
}

function showError(message) {
    errorDiv.textContent = message;
    errorDiv.classList.remove("hidden");
    weatherDiv.classList.add("hidden");
}

function saveHistory(city) {
    let history = JSON.parse(localStorage.getItem("history")) || [];
    history = history.filter(
        item => item.toLowerCase() !== city.toLowerCase()
    );

    history.unshift(city);
    history = history.slice(0, 5);
    localStorage.setItem(
        "history",
        JSON.stringify(history)
    );
    renderHistory();
}

function loadHistory() {
    renderHistory();
}

function renderHistory() {
    const history = JSON.parse(localStorage.getItem("history")) || [];
    historyDiv.innerHTML = "";
    history.forEach(city => {
        const btn = document.createElement("span");
        btn.textContent = city;
        btn.className = "history-item";
        btn.addEventListener("click", () => {
            cityInput.value = city;
            getWeather(city);
        });
        historyDiv.appendChild(btn);
    });
}