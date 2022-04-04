let city = document.getElementById("usercity");
let submitBtn = document.querySelector(".btn");
let nameCityEl = document.querySelector("#cityname");
var weatherContainerEl = document.querySelector("#weather");

const myAPIKey = "78d9272bcac95b3738e5612909e959e6";
// https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}
// let queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;

let formSubmitHandler = function(event) {
   //prevent page from refreshing
   event.preventDefault();

   //get value from input element
   let city = nameCityEl.ariaValueMax.trim();

   if (city) {
     getCityWeather(city);

     // clear old content
     weatherContainerEl.value="";
     nameCityEl.value="";
   }else{
     alert("Please enter a city");
   }
};


// add event lister to the submit button
submitBtn.addEventListener("click", function () {
  // format of the weather api url
  let queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${myAPIKey}&units=imperial`;

// make a get request to url
fetch(queryURL).then(function(response) {
    // request was successful
    if (response.ok) {
      console.log(response);
      response.json().then(function(data) {
        // console(data);
        console.log(data);
        //call display the weather data
        // displayWeather(data);
      });
    }
    else {
      console.log(response);
      alert("There was a problem with your request!");
    }
  });
}); 

let displayWeather = function(weather) {


}
