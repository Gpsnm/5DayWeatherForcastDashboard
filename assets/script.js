let searchBtn = document.querySelector("#search-button");
apiKey = "b3c45a3d775f40413927ce1c2d7bf921";
let longitude;
let latitude;
let currentWeather;

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
      currentWeather = weather.list[6].main;
    });
}
