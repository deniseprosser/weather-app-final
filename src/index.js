function searchCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#city-input");
  let city = document.querySelector("#current-city");
  city.innerHTML = searchInput.value;
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", searchCity);
