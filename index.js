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

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `<div class="col-2">
             <div class ="weather-forecast-date"><strong>${formatDay(
               forecastDay.time
             )}</strong></div>
  <img src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${
    forecastDay.condition.icon
  }.png"/>
 
                    <div class="weather-forecast-temperature">
                    <span class ="weather-forecast-temp-max"><strong>${Math.round(
                      forecastDay.temperature.maximum
                    )}</strong>º</span><span class ="weather-forecast-temp-min"> ${Math.round(
          forecastDay.temperature.minimum
        )}º</span>
</div>
</div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function defaultSearch(city) {
  let apiKey = "c9c7oc64f71481aa1fa0f40af020b3t6";
  let apiurl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiurl).then(displayWeather);
}
function getForecast(forecastCity) {
  let apiKey = "c9c7oc64f71481aa1fa0f40af020b3t6";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${forecastCity}&key=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}
function displayWeather(response) {
  document.querySelector("#location").innerHTML = response.data.city;
  document.querySelector("#feel").innerHTML = Math.round(
    response.data.temperature.feels_like
  );
  document.querySelector("#wind-speed").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#cloudy").innerHTML =
    response.data.condition.description;
  {
    let celsiusTemperature = Math.round(response.data.temperature.current);
    let actualTempElement = document.querySelector("#temp-value");
    actualTempElement.innerHTML = celsiusTemperature;
  }
  {
    let humidity = Math.round(response.data.temperature.humidity);
    let humidityElement = document.querySelector("#humidityTemp");
    humidityElement.innerHTML = `${humidity}%`;
  }

  {
    console.log(response.data);
    let iconElement = document.querySelector("#current-icon");
    iconElement.setAttribute(
      "src",
      `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/broken-clouds-night.png`
    );
    iconElement.setAttribute("alt", response.data.condition.icon);
  }
  celsiusTemperature = response.data.temperature.current;

  getForecast(response.data.city);
}
function searchLocation(response) {
  let apiKey = "c9c7oc64f71481aa1fa0f40af020b3t6";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${response.coords.longitude}&lat=${response.coords.latitude}&key=${apiKEY}&units=metric`;
  console.log(apiURL);
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
function displayFarenheitTemp(event) {
  event.preventDefault();
  let tempValue = document.querySelector("#temp-value");
  if (farenheitTemp) {
    tempValue.innerHTML = Math.round((celsiusTemperature * 9) / 5 + 32);
    farenheitTemp.classList.add("active");
    celsiusTemp.classList.remove("active");
  }
}
function displayCelsiusTemp(event) {
  event.preventDefault();
  if (celsiusTemp) {
    celsiusNumber.innerHTML = Math.round(celsiusTemperature);
    celsiusTemp.classList.add("active");
    farenheitTemp.classList.remove("active");
  }
}
let farenheitTemp = document.querySelector("#farenheit");
farenheitTemp.addEventListener("click", displayFarenheitTemp);

let celsiusTemp = document.querySelector("#centigrade");
let celsiusNumber = document.querySelector("#temp-value");
celsiusTemp.addEventListener("click", displayCelsiusTemp);

let celsiusTemperature = null;

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

let searchForm = document.querySelector("#weather-form");
searchForm.addEventListener("submit", search);

defaultSearch("London");
