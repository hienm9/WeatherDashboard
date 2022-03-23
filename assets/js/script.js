// https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}
const myAPIKey = "78d9272bcac95b3738e5612909e959e6";
let city = document.getElementById("usercity");
// let queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;
let submitBtn = document.getElementById("btnSubmit");

// add event lister to the submit button
submitbtn.addEventListener("click", function () {
  // format of the weather api url
  let queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${myAPIKey}&units=imperial`;

// make a get request to url
fetch(queryURL).then(function(response) {
    // request was successful
    if (response.ok) {
      response.json().then(function(data) {
        // console(data);
        console.log(data);
        // display the weather data
        displayWeather()
      });
    }
    else {
      console.log(response);
      alert("There was a problem with your request!");
    }
  });

displayWeather(){
  
}
