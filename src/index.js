import "./style.css";

function formatDate(newDate) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let currentHour = newDate.getHours();
  if (currentHour < 10) {
    currentHour = `0${currentHour}`;
  }
  let currentMinutes = newDate.getMinutes();
  if (currentMinutes < 10) {
    currentMinutes = `0${currentMinutes}`;
  }
  let currentDay = days[newDate.getDay()];

  let today = document.querySelector("#today");
  today.innerHTML = `${currentDay}, ${currentHour}:${currentMinutes}`;
}
let newDate = new Date();
console.log(formatDate(newDate));

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let humidity = response.data.main.humidity;
  let wind = response.data.wind.speed;
  let description = response.data.weather[0].description;
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let descriptionElement = document.querySelector("#description");
  let temperatureElement = document.querySelector("h2");
  let iconElement = document.querySelector("#icon");
  temperatureElement.innerHTML = `${temperature}˚c`;
  humidityElement.innerHTML = `Humidity: ${humidity}%`;
  windElement.innerHTML = `Wind: ${wind}km/h`;
  descriptionElement.innerHTML = `${description}`;
  iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

function reveal(event) {
  event.preventDefault();
  let input = document.querySelector("#search-city");
  let result = document.querySelector("#searched-city");
  result.innerHTML = `${input.value}`;
  let units = "metric";
  let apiKey = "60dbe083627851751ca64015719aa9ec";
  let endPoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${endPoint}?q=${input.value}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}
let city = document.querySelector("#search-form");
city.addEventListener("submit", reveal);

let searchedCityName = document.querySelector("#search-form");
searchedCityName.addEventListener("submit", reveal);

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "metric";
  let apiKey = "60dbe083627851751ca64015719aa9ec";
  let apiLocation = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiLocation).then(showTemperature);
}

function showCurrent(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}
let currentButton = document.querySelector("#current");
currentButton.addEventListener("click", showCurrent);
