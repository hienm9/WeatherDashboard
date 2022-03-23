// https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}
let myAPIKey = "78d9272bcac95b3738e5612909e959e6";
let city = "Columbus";
// let queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;
let queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${myAPIKey}&units=imperial`;

// make a get request to url
fetch(queryURL).then(function(response) {
    // request was successful
    if (response.ok) {
      response.json().then(function(data) {
        // displayIssues(data);
        console.log(data);
      });
    }
    else {
      console.log(response);
      alert("There was a problem with your request!");
    }
  });