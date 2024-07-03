import getLocationCoords from "../api/getLocationCoords.js";

getLocationCoords;
export async function loadInputLocations(location) {
  try {
    const locations = await getLocationCoords(location);
    return locations;
  } catch (err) {
    console.error(err);
  }
}
