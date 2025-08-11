// Theme management functionality
const THEME_KEY = 'cyberscoops-theme';
const THEMES = {
  LIGHT: 'light',
  DARK: 'dark'
};

// Get user's preferred theme
function getPreferredTheme() {
  const stored = localStorage.getItem(THEME_KEY);
  if (stored) return stored;
  
  return window.matchMedia('(prefers-color-scheme: dark)').matches 
    ? THEMES.DARK 
    : THEMES.LIGHT;
}

// Apply theme to document
function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem(THEME_KEY, theme);
  
  // Update meta theme-color for mobile browsers
  updateThemeColor(theme);
}

// Update theme color meta tag
function updateThemeColor(theme) {
  let themeColorMeta = document.querySelector('meta[name="theme-color"]');
  if (!themeColorMeta) {
    themeColorMeta = document.createElement('meta');
    themeColorMeta.name = 'theme-color';
    document.head.appendChild(themeColorMeta);
  }
  
  const themeColors = {
    [THEMES.LIGHT]: '#ffffff',
    [THEMES.DARK]: '#1e293b'
  };
  
  themeColorMeta.content = themeColors[theme];
}

// Toggle between themes
function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === THEMES.DARK ? THEMES.LIGHT : THEMES.DARK;
  applyTheme(newTheme);
}

// Initialize theme system
export function initTheme() {
  const preferredTheme = getPreferredTheme();
  applyTheme(preferredTheme);
  
  // Setup theme toggle button
  const themeToggle = document.getElementById('themeToggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
    
    // Add keyboard support
    themeToggle.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleTheme();
      }
    });
  }
  
  // Listen for system theme changes
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  mediaQuery.addEventListener('change', (e) => {
    // Only update if user hasn't manually set a preference
    if (!localStorage.getItem(THEME_KEY)) {
      applyTheme(e.matches ? THEMES.DARK : THEMES.LIGHT);
    }
  });
}

// Export theme utilities
export { getPreferredTheme, applyTheme, toggleTheme, THEMES };