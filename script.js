const getCityName = () => {
  const $cityName = document.querySelector(".cityName");
  return $cityName.value;
};

const getLatAndLongByCityName = async () => {
  let cityName = getCityName();
  if (!cityName) {
    cityName = "Kathmandu";
  }
  const geoCodeUri = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=30b7fc37b850daeee43bf8b7080b7bb6`;
  const response = await fetch(geoCodeUri);
  const data = await response.json();
  document.querySelector(".city").innerHTML = data[0].name;
  return data[0];
};

const getWeather = async () => {
  const { lat, lon } = await getLatAndLongByCityName();
  const api_uri = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=30b7fc37b850daeee43bf8b7080b7bb6&units=metric`;
  const response = await fetch(api_uri);
  const data = await response.json();
  document.querySelector(".temp").innerHTML =
    Math.round(parseInt(data.main.temp)) + "°C";
  document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
  document.querySelector(".wind").innerHTML = data.wind.speed + "km/hr";
  const iconElement = document.querySelector(".weather-icon");
  switch (data.weather[0].main.toLowerCase()) {
    case "clouds":
      iconElement.src = "images/clouds.png";
      break;
    case "clear":
      iconElement.src = "images/clear.png";
      break;
    case "drizzle":
      iconElement.src = "images/drizzle.png";
      break;
    case "humidity":
      iconElement.src = "images/humidity.png";
      break;
    case "mist":
      iconElement.src = "images/mist.png";
      break;
    case "rain":
      iconElement.src = "images/rain.png";
      break;
    case "search":
      iconElement.src = "images/search.png";
      break;
    case "snow":
      iconElement.src = "images/snow.png";
      break;
    case "wind":
      iconElement.src = "images/wind.png";
      break;
  }
};

getWeather()