import { resources } from "../data/resources.js";
import { updateStats } from "../main.js";
import { getIcon } from "./icons.js";

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
                    ${getIcon(resource.icon)}
                    ${resource.name}
                </h3>
                <p class="resource-description">${resource.description}</p>
                <div class="resource-meta">
                    <span>
                        ${getIcon("tag", 14)}
                        ${resource.category}
                    </span>
                </div>
            </div>
            <a href="${
              resource.url
            }" class="resource-link" target="_blank" rel="noopener noreferrer">
                Visit Resource
                ${getIcon("externalLink", 14)}
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
            ${getIcon("loader")}
            <p>Loading resources...</p>
        </div>
    `;

  // Simulate loading for smoother transitions
  setTimeout(() => {
    const filteredResources =
      category === "all"
        ? resources
        : resources.filter((r) => r.category === category);

    grid.innerHTML = filteredResources.map(createResourceCard).join("");
    updateStats(category);
  }, 300);
}
