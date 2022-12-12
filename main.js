////////////////////////////////////////////
////////////////////////////////////////////
////////////////////////////////////////////
let button = document.querySelector("button");
let apiKey = `c4a1a395bff2492382788e15c8abb549`;
button.addEventListener("click", () => {
  if (navigator.geolocation) {
    //if browser support geolocation api
    // geolocation.getCurrentPosition method is used to getCurrentPosition of the device
    button.innerText = "Allow to detect location";

    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  } else {
    button.innerText = "your browser not support";
  }
});
function onSuccess(position) {
  button.innerText = "Detecting your location....";

  let { latitude, longitude } = position.coords; //
  // https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${c4a1a395bff2492382788e15c8abb549}
  fetch(
    `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}`
  )
    .then((response) => response.json())
    .then((result) => {
      let allDetails = result.results[0].components;
      let { city, postcode, country } = allDetails;
      button.innerText = `${city} ${postcode}, ${country}`;
      console.table(allDetails);
    })
    .catch(() => {
      button.innerText = "something went wrong";
    });
}

function onError(error) {
  if (error.code == 1) {
    // if user denide the request
    button.innerText = "You denided the request";
  } else if (error.code == 2) {
    button.innerText = "Location not available";
  } else {
    button.innerText = "something went wrong";
  }
  button.setAttribute("disabled", "true"); // is user denide the request then button willbe disabilad
}
