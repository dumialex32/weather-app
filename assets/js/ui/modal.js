import {
  convertDateToWeekday,
  formatDate,
  convertDateToHour,
} from "../utils/helpers.js";

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
  const groupedByDayForecast = groupByDay(dailyForecast);
  console.log(groupedByDayForecast);
  const forecastDays = [];
  Object.entries(groupedByDayForecast).forEach((groupedForecast) =>
    forecastDays.push(groupedForecast),
  );

  const weeklyForecast = forecastDays
    .map((day) => createForecast(day))
    .join(",")
    .replaceAll(",", " ");

  return $(`
      <div class="modal fade" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="staticBackdropLabel">${cityName} forecast for the next 7 days</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body row gap-2 justify-content-center"><div class="row">${weeklyForecast}</div></div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    `);
}

function groupByDay(dailyForecast) {
  const times = dailyForecast.time;
  const temps = dailyForecast.temp;

  const groupedData = {};

  if (times.length !== temps.length) {
    throw new Error("Times and temperatures arrays must have the same length.");
  }

  times.forEach((time, i) => {
    const date = time.split("T")[0];
    console.log(date);

    if (!groupedData[date]) {
      groupedData[date] = [];
    }
    groupedData[date].push({
      time: time,
      temp: temps[i],
    });
  });
  return groupedData;
}

function createForecast(day) {
  console.log(day);
  const forecast = `
    <div class="temp-box d-flex flex-column justify-content-center align-items-center col-md m-1 py-2 bg-${"info-subtle"} rounded">
      <h3 class="mb-2 display-6">${convertDateToWeekday(day[0])}</h3>
      <ul class="temp-list d-flex flex-column p-0 gap-2">
        ${day[1].map(
          (forecast) => `
          <li class="temp-list-item d-flex gap-3">
            <span>${convertDateToHour(forecast.time)}:</span>
            <span class="fw-bold text-dark rounded p-1 bg-${tempColor(forecast.temp)}">${forecast.temp}°C</span>
          </li>
        `,
        )}
      </ul>
    </div>
  `;
  return forecast;
}

function tempColor(temp) {
  return temp >= 6 && temp <= 12
    ? "danger-subtle"
    : temp > 12 && temp <= 18
      ? "primary-subtle"
      : temp > 18 && temp <= 22
        ? "warning-subtle"
        : temp > 22 && temp <= 28
          ? "danger-subtle"
          : "danger";
}
