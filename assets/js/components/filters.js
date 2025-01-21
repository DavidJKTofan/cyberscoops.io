import { renderResources } from "./cards.js";

/**
 * Sets up filter button functionality
 */
export function setupFilters() {
  document.querySelectorAll(".filter-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      // Remove active class from all buttons
      document
        .querySelectorAll(".filter-btn")
        .forEach((b) => b.classList.remove("active"));

      // Add active class to clicked button
      btn.classList.add("active");

      // Render filtered resources
      renderResources(btn.dataset.category);
    });
  });
}

/**
 * Updates active filter button
 * @param {string} category - Category to set as active
 */
export function updateActiveFilter(category) {
  document.querySelectorAll(".filter-btn").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.category === category);
  });
}
