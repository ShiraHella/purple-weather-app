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
formatDate(newDate);

function formatDay (timeStamp) {
let date = new Date(timeStamp * 1000);
let day = date.getDay();
let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

return days[day];
}



function getForecast(coordinates) {
let apiKey = "60dbe083627851751ca64015719aa9ec";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`
axios.get(apiUrl).then(displayForecast);
}

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let humidity = response.data.main.humidity;
  let wind = Math.round(response.data.wind.speed * 3.6);
  let description = response.data.weather[0].description;
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let descriptionElement = document.querySelector("#description");
  let temperatureElement = document.querySelector("h2");
  let cityElement = document.querySelector("#searched-city");
  let iconElement = document.querySelector("#icon");

  celsiusTemperature = response.data.main.temp;

  cityElement.innerHTML = response.data.name;
  temperatureElement.innerHTML = `${temperature}˚`;
  humidityElement.innerHTML = `Humidity: ${humidity}%`;
  windElement.innerHTML = `Wind: ${wind}km/h`;
  descriptionElement.innerHTML = `${description}`;
  iconElement.setAttribute("src", `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  iconElement.setAttribute("alt", response.data.weather[0].description);
 
  getForecast(response.data.coord);
}

function search (city) {
let apiKey = "60dbe083627851751ca64015719aa9ec";
  let endPoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${endPoint}?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

function handleSearch(event) {
  event.preventDefault();

  let city = document.querySelector("#search-city");
  let result = document.querySelector("#searched-city");
  result.innerHTML = `${city.value}`;
  
  search(city.value);
  
}
let city = document.querySelector("#search-form");
city.addEventListener("submit", handleSearch);

let searchedCityName = document.querySelector("#search-form");
searchedCityName.addEventListener("submit", handleSearch);

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "60dbe083627851751ca64015719aa9ec";
  let apiLocation = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiLocation).then(showTemperature);
}

function showCurrent(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}
let currentButton = document.querySelector("#current");
currentButton.addEventListener("click", showCurrent);


function changeToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("h2");
  celsiusDegrees.classList.remove("active");
  fahrenheitDegrees.classList.add("active");
let farenheitTemperature = (celsiusTemperature * 9)/ 5 + 32;
  temperatureElement.innerHTML = `${Math.round(farenheitTemperature)}˚`;
}

function changeToCelsius(event){
  event.preventDefault();
  let temperatureElement = document.querySelector("h2");
  fahrenheitDegrees.classList.remove("active");
  celsiusDegrees.classList.add("active");
  temperatureElement.innerHTML = `${Math.round(celsiusTemperature)}˚`;
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHtml = `<div class="row">`;
  
  forecast.forEach(function(forecastDay, index) {
    if (index < 5 ) {
    forecastHtml = forecastHtml + `
              <div class="col-2">
                <div class="day">${formatDay(forecastDay.dt)}</div>
                <div class="forecastIcon"><img src="https://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" alt=""></div> 
                <div class="temperature">${Math.round(forecastDay.temp.max)}˚ | ${Math.round(forecastDay.temp.min)}˚</div>
              </div>`;}

  })
  
              forecastHtml = forecastHtml + `</div>`;
  forecastElement.innerHTML = forecastHtml;
}

let celsiusTemperature = null;


let fahrenheitDegrees = document.querySelector("#fahrenheit");
fahrenheitDegrees.addEventListener("click", changeToFahrenheit);

let celsiusDegrees = document.querySelector("#celsius");
celsiusDegrees.addEventListener("click", changeToCelsius);

search("Yokohama");
