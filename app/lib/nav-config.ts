import type { NavConfig, NavItem } from "./types";

// Default config to use if no custom config is provided
const defaultConfig: NavConfig = {
  appName: "Default App",
  logoUrl: "/default-logo.png",
  navigation: [
    {
      label: "Home",
      path: "/",
      hidden: false
    }
  ]
};

// Helper function to ensure all NavItems have required properties with defaults
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function normalizeNavItem(item: any): NavItem {
  return {
    label: item.label || "",
    path: item.path || "#",
    hidden: item.hidden === true,
    icon: item.icon || undefined,
    dropdown: Array.isArray(item.dropdown) ? item.dropdown : undefined,
    type: "link" // Always set type to "link" regardless of what's provided
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getNavConfig(customConfig?: any): NavConfig {
  try {
    // Handle undefined or null customConfig
    if (!customConfig) {
      return defaultConfig;
    }
    
    // Handle empty JSON case
    if (typeof customConfig === 'object' && Object.keys(customConfig).length === 0) {
      return {
        navigation: [] // Return empty navigation array instead of default
      };
    }
    
    // If custom config is provided, normalize it
    return {
      appName: customConfig.appName || defaultConfig.appName,
      logoUrl: customConfig.logoUrl || defaultConfig.logoUrl,
      navigation: Array.isArray(customConfig.navigation) 
        ? customConfig.navigation.map(normalizeNavItem)
        : [],
    };
  } catch (error) {
    console.error("Error loading navigation config:", error);
    
    // Return empty navigation config on error instead of default
    return {
      navigation: []
    };
  }
}