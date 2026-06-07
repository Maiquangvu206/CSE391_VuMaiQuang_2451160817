const loading = document.getElementById("loading");

const fetchTime = document.getElementById("fetchTime");

const refreshBtn = document.getElementById("refreshBtn");

function renderWidget(index, data) {
    switch(index) {
        case 0:
            document.getElementById(
                "widget-user"
            ).innerHTML = `
                <h3>User</h3>
                <p>${data.name}</p>
                <p>${data.email}</p>
            `;
            break;
        case 1:
            document.getElementById(
                "widget-weather"
            ).innerHTML = `
                <h3>Weather</h3>
                <p>
                    Temperature:
                    ${data.current_weather.temperature}°C
                </p>
                <p>
                    Wind:
                    ${data.current_weather.windspeed}
                </p>
            `;
            break;
        case 2:
            document.getElementById(
                "widget-dog"
            ).innerHTML = `
                <h3>Random Dog</h3>
                <img src="${data.message}">
            `;
            break;
    }
}

function renderWidgetError(index, message) {
    const widgets = [
        "widget-user",
        "widget-weather",
        "widget-dog"
    ];

    document.getElementById(
        widgets[index]
    ).innerHTML = `
        <p class="error">
            ${message}
        </p>
    `;
}

async function loadDashboard() {
    loading.style.display = "block";
    const startTime = Date.now();
    const results =
        await Promise.allSettled([
            fetch(
                "https://jsonplaceholder.typicode.com/users/1"
            ).then(r => r.json()),

            fetch(
                "https://api.open-meteo.com/v1/forecast?latitude=21.03&longitude=105.85&current_weather=true"
            ).then(r => r.json()),

            fetch(
                "https://dog.ceo/api/breeds/image/random"
            ).then(r => r.json())
        ]);

    results.forEach((result, index) => {
        if (
            result.status === "fulfilled"
        ) {
            renderWidget(
                index,
                result.value
            );
        } else {
            renderWidgetError(
                index,
                result.reason.message
            );
        }
    });

    fetchTime.textContent = `Loaded in ${Date.now() - startTime} ms`;
    loading.style.display = "none";
}

refreshBtn.addEventListener(
    "click",
    loadDashboard
);

loadDashboard();