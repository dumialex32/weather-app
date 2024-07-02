import { getForecast } from "../services/getCityForecast.js";

export function createCard(data) {
  const [lng, lat] = data.geometry.coordinates;
  const coords = { lng, lat };
  const cityName = data.text;
  const countryName = data.context[0]?.text;

  const $card = $(`
    <div class="card col-md-3 me-2 mb-2">
      <div class="card-body d-flex flex-column gap-2" style="line-height: 1.4;">
        <h5 class="card-title">${cityName}</h5>
        <p class="card-text" style="min-height: 5rem;">Discover the forecast for <span class="loc text-success">${cityName}, ${countryName}</span></p>
        <button type="button" class="btn btn-primary mt-auto">Get forecast</button>
      </div>
    </div>
  `);

  $card.find("button").on("click", async (e) => {
    e.preventDefault();

    try {
      const data = await getForecast(coords);
      console.log(data);

      const modal = createModal(data, cityName);
      $("body").append(modal);
      const modalInstance = new bootstrap.Modal(modal[0]);
      modalInstance.show();

      modal.on("hidden.bs.modal", function () {
        modal.remove();
      });
    } catch (error) {
      console.error(error);
    }
  });

  return $card;
}

function createModal(data, cityName) {
  return $(`
    <div class="modal fade" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="staticBackdropLabel">${cityName} Forecast</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">${data.elevation}</div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
  `);
}

export function createLoader(parentEl) {
  const loader = $(`<div class="text-center">
    <div class="spinner-border text-light" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>`);

  parentEl ? parentEl.append(loader) : $(document).append(loader);

  return loader;
}
