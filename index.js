function defaultSearch(city) {
  let apiKey = "4de6f78efdcff22546b533360a84173a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

function displayWeather(response) {
  document.querySelector("#location").innerHTML = response.data.name;
  document.querySelector("#feel").innerHTML = Math.round(
    response.data.main.feels_like
  );
  document.querySelector("#wind-speed").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#cloudy").innerHTML =
    response.data.weather[0].description;
  {
    let actualTemp = Math.round(response.data.main.temp);
    let actualTempElement = document.querySelector("#temp-value");
    actualTempElement.innerHTML = `${actualTemp}ºC`;
  }
  {
    let humidity = Math.round(response.data.main.humidity);
    let humidityElement = document.querySelector("#humidityTemp");
    humidityElement.innerHTML = `${humidity}%`;
  }
  {
    let iconElement = document.querySelector("#current-icon");
    iconElement.setAttribute(
      "src",
      `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
    iconElement.setAttribute("alt", response.data.weather[0].description);
  }
}
function searchLocation(response) {
  let apiKey = "4de6f78efdcff22546b533360a84173a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${response.coords.latitude}&lon=${response.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}
function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function search(event) {
  event.preventDefault();
  let city = document.querySelector("#text-input").value;
  defaultSearch(city);
}

defaultSearch("London");

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

let searchForm = document.querySelector("#weather-form");
searchForm.addEventListener("submit", search);

let currentDate = new Date();

let hour = (currentDate.getHours() < 10 ? "0" : "") + currentDate.getHours();
let minute =
  (currentDate.getMinutes() < 10 ? "0" : "") + currentDate.getMinutes();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[currentDate.getDay()];
let date = document.querySelector("#current-date");
date.innerHTML = `${day}, ${hour}:${minute}`;
