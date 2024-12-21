"use strict";

const headerContainer = document.querySelector(".header");
const section = document.querySelector(".section");
const headerSpenner = document.querySelector(".header__spinner");

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      // console.log(longitude, latitude);
      getApiWeather(longitude, latitude);
    },
    function () {
      alert("Невозвожно определить местоположение, включите геолокацию!");
    }
  );
}

getCurrentPosition();

function getApiWeather(lng, lat) {
  const apiKey = "03a3783684c64afe9cf145020242112";
  const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${lat},${lng}&aqi=no`;

  fetch(url)
    .then((response) => {
      // console.log(response);
      if (!response.ok) throw new Error("Что-то пошло не так");

      headerSpenner.classList.add("hidden");

      return response.json();
    })
    .then((data) => {
      console.log(data);

      displayWeather(data);
    })
    .catch((error) => console.error("Ошибка:", error.message));
}

function displayError() {}

function displayWeather(data) {
  const locationName = data.location.name;
  const region = data.location.region;
  const country = data.location.country;
  const localTime = data.location.localtime;
  const timeZone = data.location.tz_id;

  const tempC = data.current.temp_c;
  const tempFeelsC = data.current.feelslike_c;
  const cloud = data.current.cloud;
  const img = data.current.condition.icon;

  const dayOrNight = data.current.is_day === 0 ? "Ночь" : "День";

  const humidity = data.current.humidity;
  const windKph = data.current.wind_kph;
  const windDir = data.current.wind_dir;
  const windGustKph = data.current.gust_kph;

  const headerHTML = `
    <div class="container">
      <img class="weather__condition-img" src="${img}">
      <div class="header__container">
        <div class="header__container-name">Город: ${locationName}</div>
        <div class="header__container-region">Регион: ${region}</div>
        <div class="header__container-country">Страна: ${country}</div>
        <div class="header__container-time">Время: ${localTime}</div>
        <div class="header__container-timezone">Временная зона: ${timeZone}</div>
      </div>
    </div>
    `;

  headerContainer.insertAdjacentHTML("beforeend", headerHTML);

  const sectionHTML = `
    <div class="container">
      <div class="weather__one">
        <div class="weather__temp-c">Температура: ${tempC}°</div>
        <div class="weather__temp-feelslice-c">
        Ощущаемая температура: ${tempFeelsC}°</div>
        <div class="weather__cloud">Облачность: ${cloud}%</div>
        <div class="weather__condition-day-night">${dayOrNight}</div>
      </div>
      <div class="weather__two">
        <div class="weather__humidity">Влажность воздуха: ${humidity}%</div>
        <div class="weather__wind-kph">Скорость ветра: ${windKph} км.ч</div>
        <div class="weather__wind-dir">Направление ветра: ${windDir}</div>
        <div class="weather__gust-kph">Порывы ветра: ${windGustKph} км.ч</div>
      </div>
    </div>
    `;

  section.insertAdjacentHTML("beforeend", sectionHTML);
}
