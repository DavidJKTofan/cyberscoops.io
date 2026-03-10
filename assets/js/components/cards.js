import { resources } from "../data/resources.js";
import { updateStats } from "../main.js";
import { getIcon } from "./icons.js";

/**
 * Creates HTML for a single resource card with improved accessibility and animations
 * @param {Object} resource - Resource data object
 * @returns {string} HTML string for the card
 */
export function createResourceCard(resource) {
  return `
    <article class="resource-card" data-category="${resource.category}" role="article">
      <div>
        <h3>
          ${getIcon(resource.icon)}
          ${resource.name}
        </h3>
        <p class="resource-description">${resource.description}</p>
        <div class="resource-meta">
          <span>
            ${getIcon("tag", 14)}
            ${formatCategory(resource.category)}
          </span>
        </div>
      </div>
      <a 
        href="${resource.url}" 
        class="resource-link" 
        target="_blank" 
        rel="noopener noreferrer"
        aria-label="Visit ${resource.name} - opens in new tab"
      >
        Visit Resource
        ${getIcon("externalLink", 16)}
      </a>
    </article>
  `;
}

/**
 * Format category name for display
 * @param {string} category - Category name
 * @returns {string} Formatted category name
 */
function formatCategory(category) {
  const categoryMap = {
    'news': 'News Sites',
    'youtube': 'YouTube',
    'blogs': 'Tech Blogs',
    'podcast': 'Podcasts'
  };
  return categoryMap[category] || category;
}

/**
 * Renders resources to the grid with enhanced loading states and animations
 * @param {string} category - Category to filter by (default: 'all')
 * @param {string} searchTerm - Search term to filter by (default: '')
 */
export function renderResources(category = "all", searchTerm = "") {
  const grid = document.getElementById("resourcesGrid");
  if (!grid) return;

  // Show loading state with animation
  grid.innerHTML = `
    <div class="loading" role="status" aria-live="polite">
      <div class="loading-spinner" aria-hidden="true"></div>
      <p>Loading resources...</p>
    </div>
  `;

  // Simulate loading for smoother transitions and better UX
  setTimeout(() => {
    let filteredResources =
      category === "all"
        ? resources
        : resources.filter((r) => r.category === category);

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filteredResources = filteredResources.filter(
        (r) =>
          r.name.toLowerCase().includes(term) ||
          r.description.toLowerCase().includes(term)
      );
    }

    if (filteredResources.length === 0) {
      grid.innerHTML = `
        <div class="no-results">
          <span class="no-results-icon" aria-hidden="true">🔍</span>
          <h3>No resources found</h3>
          <p>${searchTerm ? `No results for "${searchTerm}"` : 'Try selecting a different category or check back later for updates.'}</p>
        </div>
      `;
    } else {
      grid.innerHTML = filteredResources
        .map((resource, index) => {
          const card = createResourceCard(resource);
          // Add staggered animation delay for visual appeal
          const delay = Math.min(index * 50, 500);
          return card.replace(
            'class="resource-card"',
            `class="resource-card" style="animation-delay: ${delay}ms;"`
          );
        })
        .join("");
      
      // Add CSS animation for cards appearing
      const style = document.createElement('style');
      style.textContent = `
        .resource-card {
          animation: slideInUp 0.5s ease-out both;
        }
        
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `;
      document.head.appendChild(style);
      
      // Remove animation styles after completion to avoid conflicts
      setTimeout(() => {
        if (style.parentNode) {
          style.parentNode.removeChild(style);
        }
      }, 1000);
    }

    updateStats(category, searchTerm, filteredResources.length);
    
    // Announce to screen readers
    const announcement = `${filteredResources.length} resources loaded for ${category === 'all' ? 'all categories' : formatCategory(category)}${searchTerm ? ` searching for "${searchTerm}"` : ''}`;
    announceToScreenReader(announcement);
  }, 300);
}

/**
 * Announce message to screen readers
 * @param {string} message - Message to announce
 */
function announceToScreenReader(message) {
  const announcement = document.createElement('div');
  announcement.setAttribute('aria-live', 'polite');
  announcement.setAttribute('aria-atomic', 'true');
  announcement.style.position = 'absolute';
  announcement.style.left = '-10000px';
  announcement.style.width = '1px';
  announcement.style.height = '1px';
  announcement.style.overflow = 'hidden';
  announcement.textContent = message;
  
  document.body.appendChild(announcement);
  
  setTimeout(() => {
    document.body.removeChild(announcement);
  }, 1000);
}