let currentDate = new Date();
formatDate(currentDate);

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

function displayTemperature(response) {
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let countryElement = document.querySelector("#country-input");
  let descriptionElement = document.querySelector("#description");
  let minimumElement = document.querySelector("#minimum");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let iconElement = document.querySelector("#icon");

  countryElement = response.data.sys.country;
  celsiusTemperature = response.data.main.temp;
  minimumElement.innerHTML = `${(Math.round(response.data.main.temp_min))} °C`;
  temperatureElement.innerHTML = `${(Math.round(celsiusTemperature))} °`;
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = `${response.data.main.humidity} %`;
  windElement.innerHTML = `${(Math.round(response.data.wind.speed))} km/h`;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

function displayForecast(response) {

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;
  let forecast = null;
  
  for (let index = 0; index < 4; index++) {
    forecast = response.data.list[index];
    forecastElement.innerHTML += `
    <div class="col-3">
      <div class="day-time" id="day-time">
        ${formatHours(forecast.dt * 1000)}
      </div>
        <img class="day-icon" src="http://openweathermap.org/img/wn/${
          forecast.weather[0].icon
        }@2x.png" alt="clear" id="day-icon" 
        />
         
      <div class="day-temp" id="day-temp">
          ${Math.round(forecast.main.temp_max)}°
      </div>
    </div>
  `;
  }
}

function search(city) {

let apiKey = "45e0d74a1bc7be61b894ed215a9def13";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayTemperature);

apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayForecast);
}


function getMyLocation(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(searchLocation);   
  }
  
function handleSubmit(event) {
    event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
  }

  function displayFahrenheitTemperature(event) {
    event.preventDefault();
    let temperatureElement = document.querySelector("#temperature");
    celsiusLink.classList.remove("active");
    fahrenheitLink.classList.add("active");
    let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
    temperatureElement.innerHTML = (Math.round(fahrenheitTemperature));
  }

  function displayCelsiusTemperature(event) {
    event.preventDefault();
    let temperatureElement = document.querySelector("#temperature");
    celsiusLink.classList.add("active");
    fahrenheitLink.classList.remove("active");
    temperatureElement.innerHTML = Math.round(celsiusTemperature)
  }



  function searchLocation(position) {
    let lat = position.coords.latitude; 
    let long = position.coords.longitude;
    let apiKey = "45e0d74a1bc7be61b894ed215a9def13";
    let units = "metric";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=${units}`;
    axios.get(apiUrl).then(displayTemperature);
    
    apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=${apiKey}&units=${units}`;
    axios.get(apiUrl).then(displayForecast)
  }  

 
  let celsiusTemperature = null;
  
  let form = document.querySelector("#search-form");
  form.addEventListener("submit", handleSubmit);
  
  let fahrenheitLink = document.querySelector("#fahrenheitLink");
  fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);
  
  let celsiusLink = document.querySelector("#celsiusLink");
  celsiusLink.addEventListener("click", displayCelsiusTemperature);
  
  search("New York");
  
  let currentLocationButton = document.querySelector("#current-location-btn");
  currentLocationButton.addEventListener("click", getMyLocation);
  
  
  
  
  
  
  
  
  
  
  
  
  
  