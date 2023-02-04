
let todaysDate = moment().format("DD-MM-YY");

let searchBtn = document.querySelector("#search-button");
let apiKey = "b3c45a3d775f40413927ce1c2d7bf921";
let longitude;
let latitude;
let currentWeather;
let currentCity;

let h1 = document.createElement("h1");
let todaysDisplay = document.querySelector("#today");

searchBtn.addEventListener("click", function (e) {
  e.preventDefault();
  let userInput = document.querySelector("#search-input").value;
  // console.log(userInput);
  fetch(
    "http://api.openweathermap.org/geo/1.0/direct?q=" +
      userInput +
      "&limit=5&appid=" +
      apiKey
  )
    .then((response) => response.json())
    .then((city) => {
      longitude = city[0].lon;
      latitude = city[0].lat;
      getWeather();
    });
});

function getWeather() {
  fetch(
    "https://api.openweathermap.org/data/2.5/forecast?lat=" +
      latitude +
      "&lon=" +
      longitude +
      "&appid=" +
      apiKey +
      "&units=metric"
  )
    .then((response) => response.json())
    .then((weather) => {
      console.log(weather)
      currentCity = weather.city.name;
      currentWeather = JSON.stringify(weather.list[6].main);
      console.log(currentCity);
      h1.textContent = currentCity + " " + "(" + todaysDate + ")";
      todaysDisplay.append(h1);
    });
}
