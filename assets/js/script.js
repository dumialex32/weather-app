import { getCoords } from "./services/getCityCoords.js";
import { createCard, createLoader } from "./utils/utils.js";

$("#weatherForm").submit(async (e) => {
  e.preventDefault();
  const cardsContainer = $("#cards");
  const city = $("#weatherForm").find("#city").val();

  cardsContainer.empty();
  const loader = createLoader(cardsContainer);

  try {
    const data = await getCoords(city);
    console.log(data);

    data.forEach((item) => {
      const cityCard = createCard(item);
      cardsContainer.append(cityCard);
    });
  } catch (err) {
    console.error(err);
  } finally {
    loader.remove();
  }
});
