export interface DropdownItem {
    label: string;
    path: string;
  }
  
  export interface NavItem {
    label: string;
    path?: string;
    icon?: string;
    hidden?: boolean;
    dropdown?: DropdownItem[];
    type?: "link" | "auth-signin" | "auth-signout";  // Removed "button" type
  }
  
  export interface NavConfig {
    appName?: string;
    logoUrl?: string;
    navigation: NavItem[];
  }
  
  