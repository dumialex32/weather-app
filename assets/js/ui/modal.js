export function showForecastModal(forecast) {
  if (forecast) {
    const dailyForecast = {
      time: forecast.hourly.time,
      temp: forecast.hourly.temperature_2m,
    };

    const modal = createModal(dailyForecast);
    const modalInstance = new bootstrap.Modal(modal);
    modalInstance.show();

    modal.on("modal.bs.modal", function (e) {
      modal.remove();
    });
  }
}

function createModal(dailyForecast) {
  let temperatureList = "<ul>";
  for (let i = 0; i < dailyForecast.time.length; i++) {
    temperatureList += `<li>Time:${dailyForecast.time[i]} Temp: ${dailyForecast.temp[i]}</li>`;
  }
  temperatureList += "<ul/>";

  return $(`
      <div class="modal fade" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="staticBackdropLabel">Forecast</h1>
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
