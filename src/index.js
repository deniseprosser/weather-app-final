function displayWeather(response) {
  let temperatureValueElement = document.querySelector("#temperature-value");
  let temperature = response.data.temperature.current;
  let city = document.querySelector("#current-city");
  let conditionsElement = document.querySelector("#conditions");
  let humidityElement = document.querySelector("#humidity-value");
  let windElement = document.querySelector("#wind-speed-value");
  let dateElement = document.querySelector("#current-date");
  let iconElement = document.querySelector("#temperature-icon");
  let date = new Date(response.data.time * 1000);

  city.innerHTML = response.data.city;
  conditionsElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windElement.innerHTML = `${response.data.wind.speed}km/h`;
  temperatureValueElement.innerHTML = Math.round(temperature);
  iconElement.innerHTML = `<img
                src="${response.data.condition.icon_url}"
                class="temperature-icon"
              />`;
  dateElement.innerHTML = formatDate(date);

  getForecast(response.data.city);
}

function formatDate(date) {
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  return `${day} ${hours}:${minutes}`;
}

function searchCity(city) {
  let apiKey = "aab3d3obc0205ebt561454f09dff85ec";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#city-input");
  searchCity(searchInput.value);
}

function formatForecastDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[date.getDay()];
}

function getForecast(city) {
  let apiKey = "aab3d3obc0205ebt561454f09dff85ec";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        `<div class="weather-forecast-item">
            <div class="weather-forecast-day">${formatForecastDay(
              day.time
            )}</div>
            <div><img src="${
              day.condition.icon_url
            }" class="weather-forecast-icon"/></div>
            <div class="weather-forecast-temp">
              <span class="forecast-high"><strong>${Math.round(
                day.temperature.maximum
              )}°</strong></span>
              <span class="forecast-low">${Math.round(
                day.temperature.minimum
              )}°</span>
            </div>
          </div>`;
    }
  });
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("London");
