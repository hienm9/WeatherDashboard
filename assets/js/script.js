let nameCityEl = document.querySelector("#cityname");
let weatherContainerEl = document.querySelector("#weather");
let submitBtn = document.querySelector(".btn");
let currentForcast = document.querySelector("#current-forcast");
let fiveDaysForcast = document.querySelector("#five-days-forcast");

const myAPIKey = "78d9272bcac95b3738e5612909e959e6";
// https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}
// let queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;

let formSubmitHandler = function(event) {
   //prevent page from refreshing
   event.preventDefault();

   //get value from input element
   let usercity = nameCityEl.value.trim();

   if (usercity) {
     getCityWeather(usercity);

     // clear old content
     weatherContainerEl.value="";
     nameCityEl.value="";
   }else{
     alert("Please enter a city");
   }
};

let getCityWeather = function(city) {
  // format the open weather api url
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${myAPIKey}&units=imperial`;
  
  // make a get request to url
  fetch(apiUrl)
    .then(function(response) {
      // request was successful
      if (response.ok) {
      console.log(response);
      response.json().then(function(data) {
        console.log(data);
        //call the displayWeather function
        displayWeather(data, city);
      });
    }else{
      alert('Error: City note found');
    }
 })
  .catch(function(error) {
    alert('Unable to connect to Open Weather');
  });
};

let displayWeather = function(city, searchCity) {
  // check if api returned any city
  if (city.length === 0) {
    weatherContainerEl.textContent = "City not found.";
    return;
  }

  currentForcast.textContent = searchCity;

  // city found, push the search city to the history box
  // when click on a search history, it calls the submit function and displays the weather data.
}

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