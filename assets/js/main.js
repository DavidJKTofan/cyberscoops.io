import { resources } from "./data/resources.js";
import { renderResources } from "./components/cards.js";
import { setupFilters } from "./components/filters.js";
import { initTheme } from "./components/theme.js";

// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
  // Initialize theme system
  initTheme();

  // Initial render
  renderResources();

  // Setup filter functionality
  setupFilters();

  // Update stats counter and filter counts
  updateStats("all");
  updateFilterCounts();
});

// Export for use in other components
export function updateStats(category) {
  const statsElement = document.getElementById("statsCounter");
  if (!statsElement) return;
  
  const filteredCount =
    category === "all"
      ? resources.length
      : resources.filter((r) => r.category === category).length;

  const categoryName = category === "all" ? "resources" : category;
  statsElement.textContent = `Showing ${filteredCount} ${categoryName}`;
}

// Update filter button counts
export function updateFilterCounts() {
  const categoryCounts = {
    all: resources.length,
    news: resources.filter(r => r.category === "news").length,
    youtube: resources.filter(r => r.category === "youtube").length,
    blogs: resources.filter(r => r.category === "blogs").length
  };

  Object.entries(categoryCounts).forEach(([category, count]) => {
    const countElement = document.getElementById(`filter-${category}-count`);
    if (countElement) {
      countElement.textContent = count;
    }
  });
}

// Export resources for use in other components
export { resources };