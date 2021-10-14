const icon = document.querySelector(".icon");
const weatherStatus = document.querySelector(".weather-status");
const time = document.querySelector(".time");
const city = document.querySelector(".city");
const degree = document.querySelector("#degree");
const speed = document.querySelector("#speed");
const humidity = document.querySelector("#humidity");
const pressure = document.querySelector("#pressure");
const bgP = document.querySelector(".bg");
const inputCity = document.querySelector("#searchBox");
const search = "bhatkal";
const API_KEY = "11834781bff000825b4dad5de1ccaa19";

const cloudy = [
  "cloudy-day-1",
  "cloudy-day-2",
  "cloudy-day-3",
  "cloudy-day-4",
  "cloudy-night-1",
  "cloudy-night-2",
  "cloudy-night-3",
];
const rainy = [
  "rainy-1",
  "rainy-2",
  "rainy-3",
  "rainy-4",
  "rainy-5",
  "rainy-6",
  "rainy-7",
];
const snowy = [
  "snowy-1",
  "snowy-2",
  "snowy-3",
  "snowy-4",
  "snowy-5",
  "snowy-6",
];
const bg = ["bg-1", "bg-2", "bg-3", "bg-4", "bg-5", "bg-6", "bg-7"];

//initial fetch
fetch(
  "https://api.openweathermap.org/data/2.5/weather?q=" +
    search +
    "&appid=" +
    API_KEY
)
  .then((res) => {
    return res.json();
  })
  .then((dat) => {
    report(dat);
  });

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

//background image changing
setInterval(function () {
  bgP.style.backgroundImage = `url("images/${
    bg[getRndInteger(0, bg.length)]
  }.jpg")`;
}, 6500);

function report(data) {
  degree.innerText = `${(data.main.temp - 273.15).toFixed(2)}`;
  city.innerText = `${data.name}`;
  speed.innerText = `${data.wind.speed} meter/sec`;
  humidity.innerText = `${data.main.humidity} %`;
  pressure.innerText = `${data.main.pressure / 1000} bar`;
  weatherStatus.innerText = data.weather[0].description;

  // console.log(data);

  //time updating
  var myDate = new Date();
  time.innerText = `${myDate.getUTCHours()}:${myDate.getUTCMinutes()} UTC | ${myDate.getUTCDate()}/${myDate.getUTCMonth()}/${myDate.getFullYear()}`;

  //weather icons
  let curWeather = data.weather[0].description;
  let rnd;

  if (
    curWeather === "Partly cloud" ||
    (curWeather.search("cloud") !== -1 && curWeather.search("Cloud") !== 1)
  ) {
    if (myDate.getHours() > 7 && myDate.getHours() < 19) {
      rnd = Math.floor(Math.random() * 4);
      icon.src = `images/${cloudy[rnd]}.svg`;
    } else {
      rnd = getRndInteger(4, 7);
      icon.src = `images/${cloudy[rnd]}.svg`;
    }
  } else if (
    curWeather === "Clear" ||
    curWeather === "Sunny" ||
    curWeather.search("clear") !== 1 ||
    curWeather.search("sun") !== 1
  ) {
    if (myDate.getHours() > 7 && myDate.getHours() < 18)
      icon.src = `images/day.svg`;
    else icon.src = `images/night.svg`;
  } else if (
    curWeather.search("rain") !== 1 ||
    curWeather.search("Rain") !== 1 ||
    curWeather.search("shower") !== 1 ||
    curWeather.search("rainy") !== 1 ||
    curWeather.search("drizzle") !== -1 ||
    curWeather.search("or heavy") !== -1 ||
    curWeather.search("Moderate") !== -1 ||
    curWeather.search("heavy") !== -1 ||
    curWeather.search("torrential") !== -1
  ) {
    rnd = getRndInteger(0, 7);
    icon.src = `images/${rainy[rnd]}.svg`;
  } else if (
    curWeather === "Mist" ||
    curWeather.search("snow") !== -1 ||
    curWeather.search("Snow") !== -1 ||
    Math.round(data.main.temp - 273.15) < 10
  ) {
    if (Math.round(data.main.temp - 273.15) <= 0) {
      rnd = getRndInteger(3, 6);
      icon.src = `images/${snowy[rnd]}.svg`;
    } else {
      rnd = getRndInteger(0, 4);
      icon.src = `images/${snowy[rnd]}.svg`;
    }
  } else if (
    curWeather === "Thunderstorm" ||
    curWeather.search("thunder") !== -1 ||
    curWeather.search("storm") !== -1
  ) {
    icon.src = `images/thunder.svg`;
  } else {
    icon.src = `images/day.svg`;
  }
}

inputCity.addEventListener("keyup", function onEvent(e) {
  if (e.keyCode === 13) {
    const searchAgain = inputCity.value;
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        searchAgain +
        "&appid=" +
        API_KEY
    )
      .then((res) => {
        return res.json();
      })
      .then((dat) => {
        report(dat);
      });
  }
});
