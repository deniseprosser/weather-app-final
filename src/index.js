function displayWeather(response) {
  let temperatureValueElement = document.querySelector("#temperature-value");
  let temperature = response.data.temperature.current;
  let city = document.querySelector("#current-city");
  city.innerHTML = response.data.city;
  temperatureValueElement.innerHTML = Math.round(temperature);
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

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("London");
