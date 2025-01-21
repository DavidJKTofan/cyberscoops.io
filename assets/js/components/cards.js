import { resources } from "../data/resources.js";
import { updateStats } from "../main.js";

/**
 * Creates HTML for a single resource card
 * @param {Object} resource - Resource data object
 * @returns {string} HTML string for the card
 */
export function createResourceCard(resource) {
  return `
        <div class="resource-card" data-category="${resource.category}">
            <div>
                <h3>
                    <i data-feather="${resource.icon}"></i>
                    ${resource.name}
                </h3>
                <p class="resource-description">${resource.description}</p>
                <div class="resource-meta">
                    <span>
                        <i data-feather="tag" size="14"></i>
                        ${resource.category}
                    </span>
                </div>
            </div>
            <a href="${resource.url}" class="resource-link" target="_blank" rel="noopener noreferrer external">
                Visit Resource
                <i data-feather="external-link" size="14"></i>
            </a>
        </div>
    `;
}

/**
 * Renders resources to the grid
 * @param {string} category - Category to filter by (default: 'all')
 */
export function renderResources(category = "all") {
  const grid = document.getElementById("resourcesGrid");

  // Show loading state
  grid.innerHTML = `
        <div class="loading">
            <i data-feather="loader" class="loading-spinner"></i>
            <p>Loading resources...</p>
        </div>
    `;
  feather.replace();

  // Simulate loading for smoother transitions
  setTimeout(() => {
    const filteredResources =
      category === "all"
        ? resources
        : resources.filter((r) => r.category === category);

    grid.innerHTML = filteredResources.map(createResourceCard).join("");
    feather.replace();
    updateStats(category);
  }, 300);
}
