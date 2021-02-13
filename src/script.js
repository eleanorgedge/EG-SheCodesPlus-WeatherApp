//DAY, DATE, MONTH, TIME
let now = new Date();
let span = document.querySelector("span");
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
span.innerHTML = `${day} ${date} ${month}, ${hours}:${minutes}`;

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
  axios.get(apiUrl).then(showWeatherResults);
}
function showWeatherResults(response) {
  //temperature
  let temperature = Math.round(response.data.main.temp);
  let currentTemperature = document.querySelector("#temperature");
  currentTemperature.innerHTML = `${temperature}`;
  //icon
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  iconElement.setAttribute("alt", response.data.weather[0].description);
  //decription
  let description = response.data.weather[0].main;
  let currentDescription = document.querySelector("#description");
  currentDescription.innerHTML = `${description}`;
  //feels like
  let feelsLike = Math.round(response.data.main.feels_like);
  let currentFeelsLike = document.querySelector("#feelsLike");
  currentFeelsLike.innerHTML = `${feelsLike}`;
  //humidity
  let humidity = response.data.main.humidity;
  let currentHumidity = document.querySelector("#humidity");
  currentHumidity.innerHTML = `${humidity}`;
  //wind speed
  let windSpeed = Math.round(response.data.wind.speed);
  let currentWindSpeed = document.querySelector("#windSpeed");
  currentWindSpeed.innerHTML = `${windSpeed}`;
}

////CELSIUS OR FAHRENHEIT
//function convertToFahrenheit (event){
//event.preventDefault();
//let temperatureElement = document.querySelector("#temperature");
//let temperature= temperatureElement.innerHTML;
//temperatureElement.innerHTML= 43;
//}
//let fahrenheitLink=document.querySelector("#fahrenheit-link");
//fahrenheitLink.addEventListener("click", convertToFahrenheit);

//function convertToCelcius (event){
//event.preventDefault();
//let temperatureElement = document.querySelector("#temperature");
//let temperature= temperatureElement.innerHTML;
//temperatureElement.innerHTML=6;
//}
//let celciusLink=document.querySelector("#celcius-link");
//celciusLink.addEventListener("click", convertToCelcius);

//WEATHER IN GEO LOCATION
function showGeoResults(response) {
  //city name
  let city = response.data.name;
  let geoCity = document.querySelector("h1")
  geoCity.innerHTML = `${city}`;
  //temperature
  let temperature = Math.round(response.data.main.temp);
  let geoTemperature = document.querySelector("#temperature");
  geoTemperature.innerHTML = `${temperature}`;
  //icon
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  iconElement.setAttribute("alt", response.data.weather[0].description);
  //decription
  let description = response.data.weather[0].main;
  let geoDescription = document.querySelector("#description");
  geoDescription.innerHTML = `${description}`;
  //feels like
  let feelsLike = Math.round(response.data.main.feels_like);
  let geoFeelsLike = document.querySelector("#feelsLike");
  geoFeelsLike.innerHTML = `${feelsLike}`;
  //humidity
  let humidity = response.data.main.humidity;
  let geoHumidity = document.querySelector("#humidity");
  geoHumidity.innerHTML = `${humidity}`;
  //wind speed
  let windSpeed = Math.round(response.data.wind.speed);
  let geoWindSpeed = document.querySelector("#windSpeed");
  geoWindSpeed.innerHTML = `${windSpeed}`;
}

function retrievePosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "metric";
  let apiKey = "b7043ee55acc28581f8a4aa13924596c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showGeoResults);
}
navigator.geolocation.getCurrentPosition(retrievePosition);
