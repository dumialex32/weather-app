import getLocationForecast from "../api/getLocationForecast.js";

getLocationForecast;

export async function loadCityForecast(coords) {
  try {
    const locationForecast = await getLocationForecast(coords);
    console.log(locationForecast);

    return locationForecast;
  } catch (error) {
    console.error(error);
  }
}
