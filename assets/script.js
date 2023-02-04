
let searchBtn = document.querySelector("#search-button");
apiKey = "b3c45a3d775f40413927ce1c2d7bf921";
let longitude;

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
    .then((city) =>  {
      let longitude = city[0].lon
      let latitude = city[0].lat
          console.log(longitude);
          console.log(latitude)

})});