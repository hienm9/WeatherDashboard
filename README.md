# WeatherDashboard-ServerSide-APIs

This is a weather dashboard that will run in the browser and feature dynamically updated HTML and CSS using a third-party APIs called https://openweathermap.org/api/one-call-api to retrieve weather data for cities. The dashboard presents a form for user to enter a City, then if the City is found it displays 
1. A container with the City, current date, weather icon, and weather information such as humidity, wind speed.
2. A contain below displays 5 days of forecast data with similar information as date, temp, wind, humitity.
3. It saves the city data to local storage, and then push it to the search history list. User can click on a search history item the weather forecast will display for the city.

Deployment: https://hienm9.github.io/WeatherDashboard/


Technology used in this application:
1. HTML and CSS to create basic structure and design
3. JavaScript objects and functions
4. local Storage API to store results from input

![Screen Shot 2022-04-13 at 12 29 51 AM](https://user-images.githubusercontent.com/98295316/163100748-8d400282-448d-4a07-95ac-8986bddf482b.png)

![Scr een Shot 2022-04-13 at 12 30 06 AM](https://user-images.githubusercontent.com/98295316/163101104-6c285a0d-3e79-463a-a353-0e5092312793.png)


User story
AS A traveler
I WANT to see the weather outlook for multiple cities
SO THAT I can plan a trip accordingly


Acceptance Criteria
GIVEN a weather dashboard with form inputs
WHEN I search for a city
THEN I am presented with current and future conditions for that city and that city is added to the search history
WHEN I view current weather conditions for that city
THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
WHEN I view the UV index
THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
WHEN I view future weather conditions for that city
THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
WHEN I click on a city in the search history
THEN I am again presented with current and future conditions for that city

