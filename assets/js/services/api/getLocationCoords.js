export default async function getLocationCoords(location) {
  try {
    const locationCoords = await $.ajax({
      url: "php/coords.php",
      type: "POST",
      data: {
        location,
      },
      dataType: "json",
    });

    if (!locationCoords) throw new Error("Invalid data structure");

    return locationCoords.features;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
