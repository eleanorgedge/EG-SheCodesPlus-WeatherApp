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
  "Jan",
  "Feb",
  "March",
  "April",
  "May",
  "June",
  "July",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec"
];
let month = months[now.getMonth()];
let hours = now.getHours();
let minutes = now.getMinutes();
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

//WEATHER IN GEO LOCATION
function showGeoResults(response) {
  //temperature
  let temperature = Math.round(response.data.main.temp);
  let geoTemperature = document.querySelector("#temperature");
  geoTemperature.innerHTML = `${temperature}`;
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
