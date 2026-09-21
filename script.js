const searchBox = document.querySelector(".search-box");
const cityInput = document.querySelector("#cityInput");

const cityElement = document.querySelector("#city");
const temperatureElement = document.querySelector("#temperature");
const descriptionElement = document.querySelector("#weatherDescription");
const humidityElement = document.querySelector("#humidity");
const windElement = document.querySelector("#wind");

const errorElement = document.querySelector("#error");

searchBox.addEventListener("submit", (event) => {
  event.preventDefault();

  const city = cityInput.value;

  getWeather(city);
});

async function getWeather(city) {
  // 1. نجيب إحداثيات المدينة
  const url =
    `https://geocoding-api.open-meteo.com/v1/search?name=${city}`;

  const response = await fetch(url);

  const data = await response.json();

  console.log(data);


  // 2. ناخد latitude و longitude
  const latitude = data.results[0].latitude;
  const longitude = data.results[0].longitude;


  // 3. نجيب بيانات الطقس
  const weatherUrl =
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m`;

  const weatherResponse = await fetch(weatherUrl);

  const weatherData = await weatherResponse.json();

temperatureElement.textContent =
  weatherData.current.temperature_2m;

humidityElement.textContent =
  weatherData.current.relative_humidity_2m + "%";

windElement.textContent =
  weatherData.current.wind_speed_10m + " km/h";

cityElement.textContent = city;

  console.log(weatherData);
}





