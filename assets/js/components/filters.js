import { renderResources } from "./cards.js";

/**
 * Sets up filter button functionality with enhanced accessibility and animations
 */
export function setupFilters() {
  const filterButtons = document.querySelectorAll(".filter-btn");
  
  filterButtons.forEach((btn) => {
    // Click handler
    btn.addEventListener("click", (e) => {
      handleFilterChange(btn);
    });
    
    // Keyboard navigation support
    btn.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handleFilterChange(btn);
      }
      
      // Arrow key navigation
      if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
        e.preventDefault();
        navigateFilters(btn, e.key === "ArrowRight");
      }
    });
    
    // Add proper ARIA attributes
    btn.setAttribute('role', 'tab');
    btn.setAttribute('aria-selected', btn.classList.contains('active') ? 'true' : 'false');
  });
  
  // Add role="tablist" to the filters container
  const filtersContainer = document.querySelector('.filters');
  if (filtersContainer) {
    filtersContainer.setAttribute('role', 'tablist');
    filtersContainer.setAttribute('aria-label', 'Resource category filters');
  }
}

/**
 * Handle filter change with animations and state management
 * @param {Element} clickedBtn - The filter button that was clicked
 */
function handleFilterChange(clickedBtn) {
  const allButtons = document.querySelectorAll(".filter-btn");
  
  // Remove active class from all buttons with animation
  allButtons.forEach((btn) => {
    btn.classList.remove("active");
    btn.setAttribute('aria-selected', 'false');
    btn.style.transform = 'scale(1)';
  });
  
  // Add active class to clicked button with animation
  clickedBtn.classList.add("active");
  clickedBtn.setAttribute('aria-selected', 'true');
  clickedBtn.style.transform = 'scale(1.05)';
  
  // Reset transform after animation
  setTimeout(() => {
    clickedBtn.style.transform = 'scale(1)';
  }, 150);
  
  // Render filtered resources
  const category = clickedBtn.dataset.category;
  renderResources(category);
  
  // Update URL hash for bookmarking (optional)
  updateURLHash(category);
  
  // Announce filter change to screen readers
  const categoryText = clickedBtn.querySelector('.filter-text').textContent;
  const announcement = `Showing ${categoryText.toLowerCase()} resources`;
  announceFilterChange(announcement);
}

/**
 * Navigate between filter buttons using arrow keys
 * @param {Element} currentBtn - Currently focused button
 * @param {boolean} forward - Direction of navigation (true = right, false = left)
 */
function navigateFilters(currentBtn, forward) {
  const buttons = Array.from(document.querySelectorAll('.filter-btn'));
  const currentIndex = buttons.indexOf(currentBtn);
  
  let nextIndex;
  if (forward) {
    nextIndex = currentIndex + 1 >= buttons.length ? 0 : currentIndex + 1;
  } else {
    nextIndex = currentIndex - 1 < 0 ? buttons.length - 1 : currentIndex - 1;
  }
  
  buttons[nextIndex].focus();
}

/**
 * Update URL hash for better bookmarking and sharing
 * @param {string} category - Selected category
 */
function updateURLHash(category) {
  const newHash = category === 'all' ? '' : `#${category}`;
  if (window.location.hash !== newHash) {
    history.replaceState(null, null, newHash || window.location.pathname);
  }
}

/**
 * Initialize filters from URL hash on page load
 */
export function initFiltersFromURL() {
  const hash = window.location.hash.slice(1);
  const validCategories = ['news', 'youtube', 'blogs'];
  
  if (hash && validCategories.includes(hash)) {
    const targetBtn = document.querySelector(`[data-category="${hash}"]`);
    if (targetBtn) {
      handleFilterChange(targetBtn);
    }
  }
}

/**
 * Updates active filter button programmatically
 * @param {string} category - Category to set as active
 */
export function updateActiveFilter(category) {
  const buttons = document.querySelectorAll(".filter-btn");
  buttons.forEach((btn) => {
    const isActive = btn.dataset.category === category;
    btn.classList.toggle("active", isActive);
    btn.setAttribute('aria-selected', isActive ? 'true' : 'false');
  });
}

/**
 * Announce filter change to screen readers
 * @param {string} message - Message to announce
 */
function announceFilterChange(message) {
  // Remove any existing announcement
  const existingAnnouncement = document.getElementById('filter-announcement');
  if (existingAnnouncement) {
    existingAnnouncement.remove();
  }
  
  const announcement = document.createElement('div');
  announcement.id = 'filter-announcement';
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
    if (announcement.parentNode) {
      announcement.parentNode.removeChild(announcement);
    }
  }, 1000);
}