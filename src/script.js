//DAY, DATE, MONTH, TIME
let now = new Date();
let dateTime = document.querySelector("#dateTime");
let date = now.getDate();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let day = days[now.getDay()];
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];
let month = months[now.getMonth()];
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
dateTime.innerHTML = `${day} ${date} ${month}, ${hours}:${minutes}`;

//SEARCH BAR
let form = document.querySelector("#search-form");
form.addEventListener("submit", citySearch);

function citySearch(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${searchInput.value}`;
  showCity(searchInput.value);
}

//WEATHER IN SEARCHED LOCATION
function showCity(city) {
  let apiKey = "b7043ee55acc28581f8a4aa13924596c";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showSearchResults);
}
showCity("London");

function showSearchResults(response) {
  //city
  let cityElement = document.querySelector("h1")
  cityElement.innerHTML = response.data.name;
  //temperature
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  celciusTemperature = response.data.main.temp;
  //icon
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute("src", `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  iconElement.setAttribute("alt", response.data.weather[0].description);
  //decription
  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.weather[0].main;
  //feels like
  let feelsLikeElement = document.querySelector("#feelsLike");
  feelsLikeElement.innerHTML = Math.round(response.data.main.feels_like);
  //humidity
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.main.humidity;
  //wind speed
  let windSpeedElement = document.querySelector("#windSpeed");
  windSpeedElement.innerHTML = Math.round(response.data.wind.speed);
}

//CELCIUS OR FAHRENHEIT
function convertToFahrenheit (event){
event.preventDefault();
let temperatureElement = document.querySelector("#temperature");
celciusLink.classList.remove("active");
fahrenheitLink.classList.add("active");
let fahrenheitTemperature = (celciusTemperature * 9 / 5) +32;
temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function convertToCelcius (event){
event.preventDefault();
let temperatureElement = document.querySelector("#temperature");
celciusLink.classList.add("active");
fahrenheitLink.classList.remove("active");
temperatureElement.innerHTML = Math.round(celciusTemperature);
}

let celciusTemperature = null;

let fahrenheitLink=document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let celciusLink=document.querySelector("#celcius-link");
celciusLink.addEventListener("click", convertToCelcius);

//WEATHER IN GEO LOCATION
function retrievePosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "metric";
  let apiKey = "b7043ee55acc28581f8a4aa13924596c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showSearchResults);

  apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely,alerts&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayForecast);
}

function getCurrentPosition(event) {
  event.preventDefault ();
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

let button = document.querySelector ("#geo-button");
button.addEventListener("click", getCurrentPosition);

//forcast
function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  forecast = response.data.daily[0];
  //console.log(response.data);
 forecastElement.innerHTML = `
  <div class="row 1">
    <div class="col-6 forecast-day">
      ${forecast.dt}
    </div>
    <div class="col-3 forecast-temperature">
      ${Math.round(forecast.temp.day)}° C
    </div>
    <div class="col-3 forecast-icon">
      <img src="https://openweathermap.org/img/wn/${response.data.daily[0].weather[0].icon}@2x.png"/>
    </div>
  </div>
`
}