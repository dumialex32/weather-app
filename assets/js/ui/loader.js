export function createLoader(parentEl) {
  const loader = $(`<div class="text-center">
      <div class="spinner-border text-light" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>`);

  parentEl ? parentEl.append(loader) : $(document).append(loader);

  return loader;
}
