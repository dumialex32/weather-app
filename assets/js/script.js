import { createCard } from "./utils.js";

$(document).ready(function () {
  $("#weatherForm").submit((e) => {
    e.preventDefault();

    // Retrieve form input
    const city = $("#city").val();

    // Do a POST request
    $.ajax({
      url: "php/weather.php",
      type: "POST",
      data: {
        city,
      },
      dataType: "json",

      success: (data) => {
        if (data) {
          const geoData = data.features;
          console.log(geoData);
          const cardsContainer = $("#cards");
          cardsContainer.empty();

          geoData.forEach((data) => {
            const card = createCard(data);
            cardsContainer.append(card);
          });
        }
      },
      error: (xhr, status, err) => {
        console.error(`Error: ${err}`);
        console.error(`Status: ${status}`);
        console.error(`XHR: ${xhr.responseText}`);
      },
    });
  });
});
