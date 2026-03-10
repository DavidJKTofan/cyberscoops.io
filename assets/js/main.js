import { resources } from "./data/resources.js";
import { renderResources } from "./components/cards.js";
import { setupFilters, initFiltersFromURL } from "./components/filters.js";
import { initTheme } from "./components/theme.js";

// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
  // Initialize theme system
  initTheme();

  // Initial render
  renderResources();

  // Setup filter functionality
  setupFilters();
  initFiltersFromURL();

  // Setup search functionality
  setupSearch();

  // Update stats counter and filter counts
  updateStats("all");
  updateFilterCounts();
});

function setupSearch() {
  const searchInput = document.getElementById("resourceSearch");
  if (!searchInput) return;

  let debounceTimer;
  searchInput.addEventListener("input", (e) => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      const searchTerm = e.target.value;
      const activeFilter = document.querySelector(".filter-btn.active");
      const category = activeFilter ? activeFilter.dataset.category : "all";
      renderResources(category, searchTerm);
    }, 300);
  });
}

// Export for use in other components
export function updateStats(category, searchTerm = "", count = null) {
  const statsElement = document.getElementById("statsCounter");
  if (!statsElement) return;
  
  const filteredCount = count !== null ? count : (
    category === "all"
      ? resources.length
      : resources.filter((r) => r.category === category).length
  );

  const categoryName = category === "all" ? "resources" : category;
  let text = `Showing ${filteredCount} ${categoryName}`;
  if (searchTerm) {
    text += ` matching "${searchTerm}"`;
  }
  statsElement.textContent = text;
}

// Update filter button counts
export function updateFilterCounts() {
  const categoryCounts = {
    all: resources.length,
    news: resources.filter(r => r.category === "news").length,
    youtube: resources.filter(r => r.category === "youtube").length,
    blogs: resources.filter(r => r.category === "blogs").length,
    podcast: resources.filter(r => r.category === "podcast").length,
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