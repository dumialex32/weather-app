export default async function getLocationForecast(coords) {
  try {
    const locationForecast = await $.ajax({
      url: "php/forecast.php",
      type: "POST",
      data: coords,
      dataType: "json",
    });

    if (!locationForecast)
      throw new Error("Coult not provide the forecast for this location");

    console.log(locationForecast);
    return locationForecast;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
