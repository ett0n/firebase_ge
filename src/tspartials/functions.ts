export function toggleHiddenFlex(domElement: HTMLElement) {
  if (domElement.classList.contains("hidden")) {
    domElement.classList.remove("hidden");
    domElement.classList.add("flex");
  } else {
    domElement.classList.add("hidden");
    domElement.classList.remove("flex");
  }
}
