// used to print todays date/
let todaysDate = moment().format("DD-MM-YY");
// global variables

let apiKey = "b3c45a3d775f40413927ce1c2d7bf921";
let weather;
let longitude;
let latitude;
let currentWeather;
let currentCity;
let currentWeatherConditions;
let cityTemp;
let cityWind;
let cityHumid;
let weatherConditions;
let userInput = "";
let history;
let newArr = [];

// to access and create new elements via dom
let searchBtn = document.querySelector("#search-button");
let h1 = document.createElement("h1");
let todaysDisplay = document.querySelector("#today");
let fiveDayDisplay = document.querySelector("#forecast");
let pTemp = document.createElement("p");
let pWind = document.createElement("p");
let pHumidity = document.createElement("p");
let tempImg = document.createElement("img");
let historyDiv = document.querySelector(".list-group");

window.onload = refreshPage();

// event listen that on click take the users and input and saves the longitude and latitude to later pass into weather api.
searchBtn.addEventListener("click", function (e) {
  e.preventDefault();
  userInput = document.querySelector("#search-input").value;
  fetch(
    "https://api.openweathermap.org/geo/1.0/direct?q=" +
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
function foreCast(weatherObj) {
  let day1 = document.createElement("div");
  day1.classList.add("weatherForecast");
  let day1h2 = document.createElement("h2");
  let day1p2 = document.createElement("p");
  let day1p3 = document.createElement("p");
  let day1p4 = document.createElement("p");
  let tempImg = document.createElement("img");

  day1Date = moment(weatherObj.dt_txt).format("DD-MM-YY");
  cityTemp = JSON.stringify(weatherObj.main.temp);
  cityWind = JSON.stringify(weatherObj.wind.speed);
  cityHumid = JSON.stringify(weatherObj.main.humidity);
  weatherConditions = weatherObj.weather[0].icon;
  day1h2.textContent = day1Date;
  tempImg.src =
    "https://openweathermap.org/img/wn/" + weatherConditions + "@2x.png";
  day1p2.textContent = "Temp: " + cityTemp + "°C";
  day1p3.textContent = " Wind Speed: " + cityWind + "KPH ";
  day1p4.textContent = "Humidity: " + cityHumid + "%";
  day1.append(day1h2, tempImg, day1p2, day1p3, day1p4);

  fiveDayDisplay.append(day1);
}

// function that takes the coords from geo api and gives back current weather obj
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
      SaveCity();
      // used to display location temp wind and  humidity into a div with id of today
      fiveDayDisplay.innerHTML = "";
      currentCity = weather.city.name;
      currentWeather = JSON.stringify(weather.list[5].main);
      weatherConditions = weather.list[1].weather[0].icon;
      tempImg.src =
        "https://openweathermap.org/img/wn/" + weatherConditions + "@2x.png";
      h1.textContent = currentCity + " " + "(" + todaysDate + ")";
      todaysDisplay.append(h1);
      todaysDisplay.append(tempImg);
      weatherConditions = weather.list[1].weather[0].icon;
      cityWind = JSON.stringify(weather.list[1].wind.speed);
      cityTemp = JSON.stringify(weather.list[1].main.temp);
      cityHumid = JSON.stringify(weather.list[1].main.humidity);
      pTemp.textContent = "Temp: " + cityTemp + "°C";
      pWind.textContent = " Wind Speed: " + cityWind + "KPH ";
      pHumidity.textContent = "Humidity: " + cityHumid + "%";
      todaysDisplay.append();
      // todaysDisplay.append(tempImg);
      todaysDisplay.append(pTemp);
      todaysDisplay.append(pWind);
      todaysDisplay.append(pHumidity);
      for (let i = 0; i < weather.list.length; i++) {
        // foreCast(weather);
        const foreCastObj = weather.list[i];
        let now = moment();
        let startDate = now.add(1, "days").startOf("day").unix();
        let endDate = now.add(5, "days").startOf("day").unix();

        if (foreCastObj.dt > startDate && foreCastObj.dt < endDate) {
          if (foreCastObj.dt_txt.includes("12:00:00")) {
            foreCast(foreCastObj);
          }
        }
      }
    });
}

//  function to save user input to local storage and append as a button.
function SaveCity() {
  newArr.unshift(userInput);
  localStorage.setItem("userInput", JSON.stringify(newArr));
  // for loop to dynamically create history button
  // for (let j = 0; j < newArr.length; j++){
  let newBtn = document.createElement("button");
  newBtn.textContent = newArr[0];
  historyDiv.append(newBtn);
}
// }
// function to keep search history after refresh
function refreshPage() {
  savedLocation = JSON.parse(localStorage.getItem("userInput"));
  console.log(savedLocation);
  for (let j = 0; j < savedLocation.length; j++) {
    let historyBtn = document.createElement("button");
    historyBtn.textContent = savedLocation[j];
    historyDiv.append(historyBtn);
  }
}
