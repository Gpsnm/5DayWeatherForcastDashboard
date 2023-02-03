
apiKey = "b3c45a3d775f40413927ce1c2d7bf921"


    fetch("http://api.openweathermap.org/geo/1.0/direct?q=london&limit=5&appid=" + apiKey)
    .then((response) => response.json())
    .then((city) => console.log(city))


