export function createCard(data) {
  const $card = $(`
      <div class="card col-md-3 mr-2 mb-2">
        <div class="card-body">
          <h5 class="card-title">${data.text}</h5>
          <p class="card-text" style="min-height: 4rem;">Discover the forecast for ${data.text}, ${data.context[0]?.text}</p>
          <button class="btn btn-primary">Get forecast</button>
        </div>
      </div>
    `);

  $card.find("button").on("click", (e) => {
    e.preventDefault();
    console.log("click");
  });

  return $card;
}
