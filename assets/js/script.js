let userFormEl = document.querySelector("#user-form");
let nameCityEl = document.querySelector("#cityname");
let searchHistoryList = document.querySelector("#search-history-container");
let weatherContainerEl = document.querySelector(".weather");
let submitBtn = document.querySelector("#submitBtn");
let searchList = [];
let clearHistoryBtn = document.querySelector(".btnClear");
const myAPIKey = "f186c057bcef67933489204c248dcd30";

let formSubmitHandler = function(event) {
   //prevent page from refreshing
   event.preventDefault();
   //get value from input element
   let usercity = nameCityEl.value.trim();
   if (usercity) {
     getCityWeather(usercity);
     searchHistory(usercity);
     // clear old content
     weatherContainerEl.value="";
     nameCityEl.value="";
   }else{
     alert("Please enter a city");
   }
};
let getCityWeather = function(city) {
  // format the open weather api url
  var apiUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid="+ myAPIKey + "&units=imperial";
  // make a get request to url
  fetch(apiUrl)
    .then(function(response) {
      if (response.ok) {
      response.json().then(function(data) {
        //call the displayWeather function
        displayWeather(data);
      });
    }else{
      alert('Error: City not found');
    }
 })
  .catch(function(error) {
    alert('Unable to connect to Open Weather');
  });
};

// set date format
const dateOptions = {year: 'numeric', month: 'long', day: 'numeric' };

// function to display weather
  let displayWeather = function(data) {
    // set latitude and longtitue from the api
    let lat = data.city.coord.lat;
    let lon = data.city.coord.lon;
    var cityname = data.city.name;
    var apiUrl = `https://api.openweathermap.org/data/2.5/onecall?&units=imperial&exclude=hourly&lat=${lat}&lon=${lon}&appid=${myAPIKey}`
    
    let currentForecast = document.querySelector("#current-forecast");

  // make a get request to url
  fetch(apiUrl)
    .then(function(response) {
      // request was successful
      if (response.ok) {
      //console.log(response);
      response.json().then(function(data) {
        // clear the current forecast data
        currentForecast.innerHTML ="";
        let dayname = new Date(data.current.dt * 1000).toLocaleDateString("en", {weekday: "long"});
        let daynum = new Date(data.current.dt * 1000).toLocaleDateString(dateOptions);
        let temp = data.current.temp;
        let wind = data.current.wind_speed;
        let humidity = data.current.humidity;
        let UVindex = data.daily[0].uvi;
        let iconCurrent = data.current.weather[0].icon;
        let forecastDay = `<div class="forecast-day">
          <h2 class="cityname">${cityname} - ${dayname} (${daynum}) <img src="https://openweathermap.org/img/w/${iconCurrent}.png"> </h2>
          <div <label for="" class="forecast-temp">Temp: </label>${temp}<sup>°F</sup></div>
          <div <label for="" class="forecast-wind">Wind: </label>${wind} MPH</div>
          <div <label for="" class="forecast-humidity">Humidity: </label>${humidity}</div>
          <div <label for="" class="UVIndex">UV Index: </label>${UVindex}</div>
          </div>`;

        // display the forcast for the current day
        currentForecast.innerHTML += forecastDay;

        // get data for 5 days forecast
        let fiveDayForecast = document.querySelector("#five-days-forecast");
        // reset the forcast data to blank
        fiveDayForecast.innerHTML = "";
        for (let i = 1; i < 6; i++) {
         let dayname = new Date(data.daily[i].dt * 1000).toLocaleDateString("en", {weekday: "long"});
         let daynum = new Date(data.daily[i].dt * 1000).toLocaleDateString(dateOptions);    
         let icon = data.daily[i].weather[0].icon;
         let temp = data.daily[i].temp.day;
         let wind = data.daily[i].wind_speed;
         let humidity = data.daily[i].humidity;
        //  let weatherDescription = data.daily[i].weather[0].description;
         let forecastFiveDay = `<div class="forecast-5day">
          <p class="dayname">${dayname} ${daynum}</p>
          <img src="https://openweathermap.org/img/w/${icon}.png">
          <div <label for="" class="forecast-temp">Temp: </label>${temp}<sup>°F</sup></div>
          <div <label for="" class="forecast-wind">Wind: </label>${wind} MPH</div>
          <div <label for="" class="forecast-humidity">Humidity: </label>${humidity}</div>
          </div>`;
          // display the forcast for 5 days
          fiveDayForecast.innerHTML += forecastFiveDay;
        }
      });
      }else{
      alert('Error: City not found');
      }
    })
    .catch(function(error) {
    alert('Unable to connect to Open Weather');
    });
};

//
// savedCities = [];
function searchHistory(usercity){
  // let savedCities = localStorage.getItem("savedCities");
  // if (savedCities === null) {
  //   savedCities = [];
  // }else{
  //   // parse cities into the savedCities array object
  //   savedCities = JSON.parse(savedCities);
  // }
  let savedCities = JSON.parse(localStorage.getItem("savedCities")) || [];
      // push entered city to the savedCities array
  savedCities.push(usercity);
  // convert the save cities object to string
  // let cities = JSON.stringify(savedCities);
  localStorage.setItem("savedCities", JSON.stringify(savedCities));
  // call function to display the cities to the search history list
  displaySearchHistory(savedCities);
}

function displaySearchHistory(savedCities) {
  searchHistoryList.innerHTML = "";

  for (i = 0; i < savedCities.length; i ++) {
    let listEL = document.createElement('button');
    listEL.setAttribute('type','button');
    listEL.classList.add('history-list');
    listEL.textContent = savedCities[i];
    searchHistoryList.append(listEL);
    listEL.addEventListener("click", function(event) {
      weatherContainerEl.value="";
      getCityWeather(event.target.textContent);
    })
  }
  }

function clearHistory() {
  localStorage.clear();
  searchHistoryList.innerHTML = "";
}

clearHistoryBtn.addEventListener('click', clearHistory );


userFormEl.addEventListener("submit", formSubmitHandler);
submitBtn.addEventListener('click',formSubmitHandler);
