document.getElementById("search-btn").addEventListener("click", function () {
  const city = document.getElementById("city-input").value.trim();
  if (city) {
    fetchWeatherData(city);
  } else {
    alert("Please enter a city name.");
  }
});

function fetchWeatherData(city) {
  const apiKey = "Your_API_Key"; // Replace with your OpenWeatherMap API key
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

  fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("City not found");
      }
      return response.json();
    })
    .then((data) => {
      displayWeatherData(data);
    })
    .catch((error) => {
      alert("City not found. Please try again.");
      console.error("Error:", error);
    });
}

function displayWeatherData(data) {
  document.getElementById("city-name").textContent = data.name;
  document.getElementById(
    "temperature"
  ).textContent = `Temperature: ${data.main.temp}°C`;
  document.getElementById(
    "weather-description"
  ).textContent = `Weather: ${data.weather[0].description}`;
  document.getElementById(
    "humidity"
  ).textContent = `Humidity: ${data.main.humidity}%`;
  document.getElementById(
    "wind-speed"
  ).textContent = `Wind Speed: ${data.wind.speed} m/s`;

  document.getElementById("weather-info").style.display = "block";
}
