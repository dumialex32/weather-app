import { loadInputLocations } from "./services/dataLoaders/loadInputLocations.js";
import { createCard } from "./ui/card.js";
import { createLoader } from "./ui/loader.js";

$("#weatherForm").submit(async (e) => {
  e.preventDefault();
  const cardsContainer = $("#locationCards");

  const location = $("#weatherForm").find("#location").val();

  cardsContainer.empty();

  const loader = createLoader(cardsContainer);
  const locations = await loadInputLocations(location);
  console.log(locations);
  loader.remove();

  locations.forEach((location) => {
    const locationCard = createCard(location);
    cardsContainer.append(locationCard);
  });
});
