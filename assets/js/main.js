import { resources } from "./data/resources.js";
import { renderResources } from "./components/cards.js";
import { setupFilters } from "./components/filters.js";

// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
  // Initial render
  renderResources();

  // Setup filter functionality
  setupFilters();

  // Update stats counter
  updateStats("all");
});

// Export for use in other components
export function updateStats(category) {
  const statsElement = document.getElementById("statsCounter");
  const filteredCount =
    category === "all"
      ? resources.length
      : resources.filter((r) => r.category === category).length;

  const categoryName = category === "all" ? "resources" : category;
  statsElement.textContent = `Showing ${filteredCount} ${categoryName}`;
}
