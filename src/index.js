function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let h2 = document.querySelector("#day-time");
  h2.innerHTML = days[date.getDay()];

  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  let year = date.getFullYear();
  let currentDate = date.getDate();

  let fullDay = document.querySelector("#day");
  fullDay.innerHTML = `${currentDate} ${months[date.getMonth()]} ${year}`;
}


function formatHours(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes}`;
}


function displayForecast(response) {
let forecastElement = document.querySelector("#forecast");
forecastElement.innerHTML = null;
let forecast = null;

  for (let index = 0; index < 4; index++) {
    forecast = response.data.list[index];
    forecastElement.innerHTML += `
        <div class="col-3" id="col-3" >
          <div class="day-time">
              ${formatHours(forecast.dt * 1000)}
          </div>
        <img class="day-icon" src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png" />
          <div class="day-temp">
              <strong>${Math.round(forecast.main.temp)}°C</strong>
          </div>
    `;

  }
}

function search(city) {
   let apiKey = "45e0d74a1bc7be61b894ed215a9def13";
   let apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
   axios.get(apiUrl).then(displayWeather);
  axios.get(apiUrl).then(displayForecast)
  
   console.log(apiUrl);
   
}   

function displayWeather(response) {
  let iconElement = document.querySelector("#icon");
  celsiusTemperature = response.data.main.temp;

  document.querySelector("#current-temp").innerHTML = `${Math.round(celsiusTemperature)}`;
  document.querySelector("#city-name").innerHTML = response.data.name;
  document.querySelector("#country-code").innerHTML = response.data.sys.country;
  document.querySelector("#wind-unit").innerHTML =  `${Math.round(response.data.wind.speed)} km/h`;
  document.querySelector("#humidity-unit").innerHTML = `${response.data.main.humidity} %`;
  document.querySelector("#weather-description").innerHTML = response.data.weather[0].description;
  document.querySelector("#minimum-temp").innerHTML = `${Math.round(response.data.main.temp_min)}°C`;
  iconElement.setAttribute(
     "src", 
     `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
     iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    iconElement.setAttribute("alt", response.data.weather[0].description);
  


   console.log(response.data);
  }
  
  function handleSubmit(event) {
    event.preventDefault();
    let city = document.querySelector("#city-input").value;
    search(city);
    
     }
  

  function searchLocation(position) {
   let lat = position.coords.latitude; 
    let long = position.coords.longitude;
    let apiKey = "45e0d74a1bc7be61b894ed215a9def13";
    let units = "metric";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=${units}`;
      axios.get(apiUrl).then(displayWeather);
    
    apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=${apiKey}&units=${units}`;
      axios.get(apiUrl).then(displayForecast)
  }  
  
  function getMyLocation(event) {
     event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);   
  }


  function displayFahrenheitTemperature(event) {
    event.preventDefault();
  let temperatureElement = document.querySelector("#current-temp");
  metricCelsius.classList.remove("active");
  metricFahrenheit.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
  }

  function displayCelsiusTemperature(event) {
    event.preventDefault();
    let temperatureElement = document.querySelector("#current-temp");
    metricCelsius.classList.add("active");
    metricFahrenheit.classList.remove("active");
    temperatureElement.innerHTML = Math.round(celsiusTemperature)
  }



let forecast = `https://api.openweathermap.org/data/2.5/forecast?id=524901&appid=45e0d74a1bc7be61b894ed215a9def13&units=metric`;
console.log(forecast);

  let celsiusTemperature = null;
  
  let metricCelsius = document.querySelector("#celsius");
  metricCelsius.addEventListener("click", displayCelsiusTemperature)

  let metricFahrenheit = document.querySelector("#fahrenheit");
  metricFahrenheit.addEventListener("click", displayFahrenheitTemperature);
    
  let currentLocationButton = document.querySelector("#current-location-btn");
  currentLocationButton.addEventListener("click", getMyLocation);
    
  let form = document.querySelector("#change-location");
  form.addEventListener("submit", handleSubmit);
  
  let currentDate = new Date();
  formatDate(currentDate);
  
  search("Montreal");

  
  
  
  
  
  
  
  
  
  
  
  
  
  
  