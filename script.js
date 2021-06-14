"use strict";

const locationBtn = document.querySelector(".current-location-btn");
/////////////////////////////////////

locationBtn.addEventListener("click", function () {
  getLocation();
});

const getLocation = async function () {
  try {
    //Get coordinates
    const loc = await new Promise(function (resolve, reject) {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
    const { latitude, longitude } = loc.coords;

    //Find city and country name
    const res = await fetch(
      `https://geocode.xyz/${latitude},${longitude}?geoit=json`
    );
    if (!res.ok) throw new Error("Error finding location name");
    const data = await res.json();
    const locStr = `${data.city},${data.state}`;

    console.log(locStr);
  } catch (err) {
    console.error(err.message);
  }
};
