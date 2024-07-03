import { loadCityForecast } from "../services/dataLoaders/loadCityForecast.js";
import { createLoader } from "./loader.js";
import { showForecastModal } from "./modal.js";

export function createCard(location) {
  const [lng, lat] = location.geometry.coordinates;
  const coords = { lng, lat };

  const cityName = location.text;
  const countryName = location.context[0]?.text;

  // Generate a unique id based on cityName and coordinates
  const id = `card-${cityName}-${lng}-${lat}`.replace(/[^a-zA-Z0-9-_]/g, "_");
  console.log(id);

  const $card = $(`
      <div class="card col-md-3 me-2 mb-2" id="${id}">
        <div class="card-body d-flex flex-column gap-2" style="line-height: 1.4;">
          <h5 class="card-title">${cityName}</h5>
          <p class="card-text" style="min-height: 5rem;">Discover the forecast for <span class="loc text-success">${cityName}, ${countryName}</span></p>
          <button type="button" class="btn btn-primary mt-auto d-flex gap-2 justify-content-center"><span>Get forecast</span><span><i class="bi bi-cloud-rain"></i></span></button>
        </div>
      </div>
    `);

  $card.find("button").on("click", async (e) => {
    e.preventDefault();

    const selectedCard = $(`#${id}`).find(".card-text");
    console.log(selectedCard);
    const loader = createLoader(selectedCard, "green");
    const forecast = await loadCityForecast(coords);
    loader.remove();

    showForecastModal(forecast, cityName);
  });

  return $card;
}
