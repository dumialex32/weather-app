export async function getCoords(city) {
  try {
    const data = await $.ajax({
      url: "php/coords.php",
      type: "POST",
      data: {
        city,
      },
      dataType: "json",
    });

    if (!data || !data.features) throw new Error("Invalid data structure");

    return data.features;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
