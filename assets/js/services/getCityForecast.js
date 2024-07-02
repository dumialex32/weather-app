export async function getForecast(coords) {
  console.log(coords);
  try {
    const data = await $.ajax({
      url: "php/forecast.php",
      type: "POST",
      data: coords,
      dataType: "json",
    });

    if (!data)
      throw new Error("Coult not provide the forecast for this location");

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
