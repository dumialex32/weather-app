import { createCard, createLoader } from "./utils.js";

$(document).ready(function () {
  $("#weatherForm").submit((e) => {
    e.preventDefault();

    const city = $("#city").val();
    const loaderEl = createLoader("#cards");

    $.ajax({
      url: "php/weather.php",
      type: "POST",
      data: { city },
      dataType: "json",
      success: (data) => {
        if (data && data.features) {
          const geoData = data.features;
          const cardsContainer = $("#cards");
          cardsContainer.empty();

          geoData.forEach((item) => {
            const card = createCard(item);
            cardsContainer.append(card);
          });
        } else {
          console.error("Invalid data structure:", data);
        }
      },
      error: (xhr, status, err) => {
        console.error(`Error: ${err}`);
        console.error(`Status: ${status}`);
        console.error(`XHR: ${xhr.responseText}`);
      },
      complete: () => {
        loaderEl.remove();
      },
    });
  });
});
