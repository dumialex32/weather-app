import { formatDate } from "../utils/helpers.js";

export function showForecastModal(forecast, cityName) {
  if (forecast) {
    const dailyForecast = {
      time: forecast.hourly.time,
      temp: forecast.hourly.temperature_2m,
    };

    const modal = createModal(dailyForecast, cityName);
    const modalInstance = new bootstrap.Modal(modal);
    modalInstance.show();

    modal.on("modal.bs.modal", function (e) {
      modal.remove();
    });
  }
}

function createModal(dailyForecast, cityName) {
  let temperatureList = "<ul class='temp-list'>";
  for (let i = 0; i < dailyForecast.time.length; i++) {
    temperatureList += `<li class="d-flex gap-4 alert alert-${dailyForecast.temp[i] > 20 && dailyForecast.temp[i] <= 25 ? "warning" : dailyForecast.temp[i] > 25 ? "danger" : "success"}" role="alert"><span>${formatDate(dailyForecast.time[i])}</span><span>${dailyForecast.temp[i]}°C</span></li>`;
  }
  temperatureList += "<ul/>";

  return $(`
      <div class="modal fade" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="staticBackdropLabel">${cityName} forecast for the next 7 days</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">${temperatureList}</div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    `);
}
