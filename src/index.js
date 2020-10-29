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

  let h2 = document.querySelector("#day-name");
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

function search(city) {
   let apiKey = "45e0d74a1bc7be61b894ed215a9def13";
   let units = "metric";
   let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
   axios.get(apiUrl).then(displayWeather);
   console.log(apiUrl);
}   

function displayWeather(response) {
  let iconElement = document.querySelector("#icon");
  document.querySelector("#current-temp").innerHTML = `${Math.round(response.data.main.temp)}°`;
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
  }  
  
  function getMyLocation(event) {
     event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);   
  }


  function displayFahrenheitTemperature(event) {
    event.preventDefault();
  let temperatureElement = document.querySelector("#current-temp");
  let fahrenheitTemperature = (temperatureElement.innerHTML * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
   
  }



  
  
  let metricFahrenheit = document.querySelector("#fahrenheit");
  metricFahrenheit.addEventListener("click", displayFahrenheitTemperature);
    
  let currentLocationButton = document.querySelector("#current-location-btn");
  currentLocationButton.addEventListener("click", getMyLocation);
    
  let form = document.querySelector("#change-location");
  form.addEventListener("submit", handleSubmit);
  
  let currentDate = new Date();
  formatDate(currentDate);
  
  search("Montreal");

  
  
  
  
  
  
  
  
  
  
  
  
  
  
  