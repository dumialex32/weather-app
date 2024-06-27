export function createCard(data) {
  const $card = $(`
    <div class="card col-md-3 me-2 mb-2">
      <div class="card-body d-flex flex-column gap-2" style="line-height: 1.4;">
        <h5 class="card-title">${data.text}</h5>
        <p class="card-text" style="min-height: 5rem;">Discover the forecast for <span class="loc text-success">${data.text}, ${data.context[0]?.text}</span></p>
        <button type="button" class="btn btn-primary mt-auto" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Get forecast</button>
      </div>
    </div>
  `);

  $card.find("button").on("click", (e) => {
    const cityName = data.text;
    const countryName = data.context[0]?.text;

    // Update the modal content before showing
    $("#staticBackdropLabel").text(cityName);
    $("#staticBackdrop .modal-body").text(
      `Forecast details for ${cityName}, ${countryName}`
    );
  });

  return $card;
}

export function createLoader(parentEl) {
  const loader = $(`<div class="text-center">
  <div class="spinner-border text-light" role="status">
    <span class="visually-hidden">Loading...</span>
  </div>
</div>`);

  $(parentEl).append(loader);

  return loader;
}
