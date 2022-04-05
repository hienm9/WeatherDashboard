let userFormEl = document.querySelector("#user-form");
let nameCityEl = document.querySelector("#cityname");
let weatherContainerEl = document.querySelector("#weather");
// let submitBtn = document.querySelector(".btn");
let currentForcast = document.querySelector("#current-forcast");
let fiveDaysForcast = document.querySelector("#five-days-forcast");

// https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}
// let queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;

let formSubmitHandler = function(event) {
   //prevent page from refreshing

   debugger;
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
  // const myAPIKey = "78d9272bcac95b3738e5612909e959e6";
  const myAPIKey = "723d63948977f3325b374c286817003e";
  // format the open weather api url
  debugger;
  var apiUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid="+ myAPIKey + "&cnt=5&units=imperial";

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
  // .catch(function(error) {
  //   alert('Unable to connect to Open Weather');
  // });
};

// use the date time and format from moment js library
let currentDay = moment();
// $("#currentDay").text(moment().format('dddd MMMM Do YYYY, h:mm a'));

// var currentDate = moment().format('L');
// $("#current-date").text("(" + currentDate + ")");


let displayWeather = function(searchCity) {
  // check if api returned any city
  if (searchCity.length === 0) {
    weatherContainerEl.textContent = "City not found.";
    return;
  }
  let forecastEl = document.getElementsByClassName("forecast");

  // reset the forcast data to blank
  // forecastEl[0].classList.add('loaded');

  for (let i = 0; i < 5; i++) {
      
    console.log('display value: --->'+(searchCity.list[i]) + ": i>>: " + i);

        let dayname = new Date(searchCity.list[i].dt * 1000).toLocaleDateString("en", {weekday: "long",});

        let icon = searchCity.list[i].weather.icon;
        let temp = searchCity.list[i].main.temp;
        let weatherDescription = searchCity.list[i].weather[0].description;
     
        console.log(" temp: " + temp + " dayname:" + dayname + " weatherDescription:" + weatherDescription);
        forcastDay = `<div class="forecast-day">
          <p>${dayname}</p>
          <p><span class="ico-${icon}" title="${icon}"></span></p>
          <div class="forecast-day-temp">${temp}<sup>°F</sup></div>
          <div class="forecast-day-desc">${weatherDescription}</div>
        </div>`;
        // display the forcast for 5 days
        forecastEl[0].insertAdjacentHTML('afterend', forcastDay);
    }


  // city found, push the search city to the history box
  // when click on a search history, it calls the submit function and displays the weather data.

}

userFormEl.addEventListener("submit", formSubmitHandler);

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

