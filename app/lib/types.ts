import { LucideIcon } from "lucide-react";

export interface DropdownItem {
  label: string;
  path: string;
}

export interface NavItem {
  label?: string; // Made optional for icon-only items
  path?: string;
  icon?: LucideIcon; // Changed from string to LucideIcon for proper icon component support
  hidden?: boolean;
  dropdown?: DropdownItem[];
  type?: "link" | "auth-signin" | "auth-signout"; // Kept your existing types
  id?: string; // Added for unique identification of icon-only items
  popupContent?: React.ReactNode; // Added for popup content
}

export interface NavConfig {
  appName?: string;
  logoUrl?: string;
  navigation: NavItem[];
}