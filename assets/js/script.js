let userFormEl = document.querySelector("#user-form");
let nameCityEl = document.querySelector("#cityname");
let weatherContainerEl = document.querySelector(".weather");
let submitBtn = document.querySelector("#submitBtn");
const myAPIKey = "f186c057bcef67933489204c248dcd30";


// https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}
// let queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;

let formSubmitHandler = function(event) {
   //prevent page from refreshing
   event.preventDefault();

   //get value from input element
   let usercity = nameCityEl.value.trim();

   if (usercity) {
     getCityWeather(usercity);
    //  searchHistory(usercity);
     // clear old content
     weatherContainerEl.value="";
     nameCityEl.value="";
   }else{
     alert("Please enter a city");
   }
};

let getCityWeather = function(city) {
  // const myAPIKey = "78d9272bcac95b3738e5612909e959e6";
  // format the open weather api url
  var apiUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid="+ myAPIKey + "&cnt=6&units=imperial";

  // make a get request to url
  fetch(apiUrl)
    .then(function(response) {
      // request was successful
      if (response.ok) {
      console.log(response);
      response.json().then(function(data) {
        console.log(data);
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

// use the date time and format from moment js library
// let currentDay = moment();
// $("#currentDay").text(moment().format('dddd MMMM Do YYYY, h:mm a'));

let displayCurrent = function(lat, lon) {
  let currentForecast = (document.querySelector("#current-forecast"));
  console.log(nameCityEl)

 var apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${myAPIKey}`
  // make a get request to url
  fetch(apiUrl)
    .then(function(response) {
      // request was successful
      if (response.ok) {
      console.log(response);
      response.json().then(function(data) {
        console.log(data);
        //call the displayWeather function
        let dayname = new Date(data.current.dt * 1000).toLocaleDateString("en-US");

        // let icon = data.current.weather[0].icon;
        let temp = data.current.temp;
        let humidity = data.current.humidity;
        let weatherDesc = data.current.weather[0].description;
        let currentIcon = data.current.weather[0].icon;     
        // console.log(" temp: " + temp + " dayname:" + dayname + " weatherDescription:" + weatherDescription);
       let forecastDay = `<div class="forecast-day">
          <p>Test + ${dayname}</p>
          <img src="https://openweathermap.org/img/w/${currentIcon}.png">
          <div class="forecast-day-desc">${weatherDesc}</div>
          <div class="forecast-day-temp">${temp}<sup>°F</sup></div>
          <div <label for="" class="forecast-day-humidity">${humidity}>Humidity</label></div>
        </div>`;
        // display the forcast for 5 days
        currentForecast.innerHTML += forecastDay;

      });
    }else{
      alert('Error: City not found');
    }
 })
  .catch(function(error) {
    alert('Unable to connect to Open Weather');
  });


};

let displayWeather = function(searchCity) {
  // check if api returned any city
  // if (searchCity.length === 0) {
  //   weatherContainerEl.textContent = "City not found.";
  //   return;
  // }
  displayCurrent(searchCity.city.coord.lat, searchCity.city.coord.lon);
  let fiveDayForecast = document.querySelector("#five-days-forecast");

// reset the forcast data to blank
  fiveDayForecast.innerHTML = "";

  // const weekday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  // const d = new Date();
  // let day = weekday[d.getDay()];
  // document.getElementById("#current-forecast").innerHTML = day;

  for (let i = 0; i < 6; i++) {
      
        // let dayname = new Date(searchCity.list[i].dt * 1000).toLocaleDateString("en", {weekday: "long"});
        let day = new Date(searchCity.list[i].dt * 1000).toLocaleDateString("en-US");
      
        let icon = searchCity.list[i].weather[0].icon;
        let temp = searchCity.list[i].main.temp;
        let humidity = searchCity.list[i].main.humidity;
        let weatherDescription = searchCity.list[i].weather[0].description;
        // let wind = searchCity.list[i].main.wind.speed;
        //  <div class="forecast-day-wind">${wind}</div>
     
        console.log(" temp: " + temp + " dayname:" + day + " weatherDescription:" + weatherDescription);
       let forecastDay = `<div class="forecast-day">
          <p>${day}</p>
          <img src="https://openweathermap.org/img/w/${icon}.png">
          <div <label for="" class="forecast-day-temp">Temp: </label>${temp}<sup>°F</sup></div>
          <div <label for="" class="forecast-day-desc">Condition: </label>${weatherDescription}</div>
          <div <label for="" class="orecast-day-humidity">Humitidy: </label>${humidity}</div>
        </div>`;
        // display the forcast for 5 days
        fiveDayForecast.innerHTML += forecastDay;
    }


  // city found, push the search city to the history box, save it to the local storage, display to the local storage
  // when click on a search history, it calls  displayWeather function and displays the weather data.

}

userFormEl.addEventListener("submit", formSubmitHandler);
submitBtn.addEventListener('click',formSubmitHandler);
// add  a click event for the button

// on the current forcast section with border and radius
// display the City enter  + (current date) + weather icon
// display label "Temp:" + current temperature + "degree icon" + F 
// display label "Wind:" + current wind + MPH
// display label Humidity: current + %
// display UV Index: current number

// on the 5-day Forcast section
// display 5 cards from today's date.
// on each card show the date in dd/mm/yyyy format
// the weather icon
// Temp:
// Wind:
// Humidity:

