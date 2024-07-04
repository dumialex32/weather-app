const spinnerColors = {
  green: "success",
  red: "danger",
  white: "light",
};

export function createLoader(parentEl, color) {
  const spinnerColorClass = spinnerColors[color] || "light";
  const loader = $(`<div class="d-flex justify-content-center m-2">
    <div class="text-${spinnerColorClass}">
      <div class="spinner-border text-${spinnerColorClass}" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>`);

  parentEl ? parentEl.append(loader) : $(document).append(loader);

  return loader;
}
