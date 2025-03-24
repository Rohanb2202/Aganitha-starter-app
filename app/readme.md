# aganitha-nav-bar

A lightweight, customizable navigation bar component for Next.js applications, built with TypeScript and Tailwind CSS. It provides a modern, responsive design with dropdown support, while enforcing a consistent style and allowing color theming via CSS variables.

## Features

- Responsive navigation bar with mobile menu support
- Dropdown menu support for nested navigation items
- Fixed styling to ensure a consistent look across projects
- Color theming via CSS variables (background, foreground, primary, primary-foreground)
- TypeScript support for type-safe props
- Scroll-aware behavior (hides on scroll down, shows on scroll up)

## Installation

Install the package via npm:

```bash
npm install aganitha-nav-bar
```

Ensure you have the following dependencies installed in your Next.js project:
- next
- react
- lucide-react (for icons)

## Usage

### Basic Example

Import and use the NavBar component in your Next.js page. Provide the required navItems prop and optionally customize colors using the colors prop.

```tsx
// pages/index.tsx
import { NavBar } from 'aganitha-nav-bar';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

// Navigation configuration
const navItems = [
  { label: 'Home', path: '#hero' },
  {
    label: 'About',
    path: '#about',
    dropdown: [
      { label: 'Our Team', path: '#team' },
      { label: 'Our Mission', path: '#mission' }
    ]
  },
  { label: 'Features', path: '#features' },
  { label: 'Contact', path: '#contact' }
];

export default function Home() {
  const handleNavigate = (path: string) => {
    console.log(`Navigating to ${path}`);
  };

  return (
    <NavBar
      logoUrl="https://www.aganitha.ai/wp-content/uploads/2023/05/aganitha-logo.png"
      appName="Aganitha"
      navItems={navItems}
      onNavigate={handleNavigate}
      button={
        <Link
          href="/login"
          className="group flex items-center px-4 py-2 bg-[var(--primary)] text-[var(--primary-foreground)] rounded-full hover:bg-[var(--primary)] hover:opacity-80 transition-opacity duration-150 shadow-md"
        >
          Login
          <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      }
      colors={{
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "var(--primary)",
        primaryForeground: "var(--primary-foreground)",
      }}
    />
  );
}
```

## Props

| Prop | Type | Description | Default |
|------|------|-------------|---------|
| appName | string | The name of the application to display next to the logo. | undefined |
| logoUrl | string | URL of the logo image to display. Supports both external and local URLs. | undefined |
| navItems | NavItem[] | Array of navigation items. Supports dropdowns. See NavItem type below. | [] |
| onNavigate | (path: string) => void | Callback function triggered on navigation item click. | undefined |
| button | React.ReactNode | Custom button to display on the right side of the nav bar. | undefined |
| colors | ColorProps | Object to specify CSS variable names for theming. See ColorProps below. | { background: "var(--background)", foreground: "var(--foreground)", primary: "var(--primary)", primaryForeground: "var(--primary-foreground)" } |

### NavItem Type

```tsx
interface NavItem {
  label: string;
  path?: string;
  dropdown?: DropdownItem[];
  type?: string;
  hidden?: boolean;
}

interface DropdownItem {
  label: string;
  path: string;
}
```

### ColorProps Type

The colors prop allows you to specify CSS variable names for theming. Only the variable names (e.g., var(--background)) should be provided; additional styling is not allowed.

```tsx
interface ColorProps {
  background?: string;        // e.g., "var(--background)"
  foreground?: string;        // e.g., "var(--foreground)"
  primary?: string;           // e.g., "var(--primary)"
  primaryForeground?: string; // e.g., "var(--primary-foreground)"
}
```

## Theming

The NavBar component uses CSS variables for theming. Define these variables in your globals.css file to customize the colors:

```css
/* globals.css */
:root {
  --background: oklch(0.97 0.01 314.78);
  --foreground: oklch(0.37 0.03 259.73);
  --primary: oklch(0.71 0.16 293.54);
  --primary-foreground: oklch(1.00 0 0);
}

.dark {
  --background: oklch(0.22 0.01 56.04);
  --foreground: oklch(0.93 0.03 272.79);
  --primary: oklch(0.79 0.12 295.75);
  --primary-foreground: oklch(0.22 0.01 56.04);
}
```

The component will automatically use these variables for its background, text, and accent colors.

## Example with Dropdown

The NavBar component supports dropdown menus. Define them in your navItems array:

```tsx
const navItems = [
  { label: "Home", path: "#hero" },
  {
    label: "About",
    path: "#about",
    dropdown: [
      { label: "Our Team", path: "#team" },
      { label: "Our Mission", path: "#mission" }
    ]
  },
  { label: "Features", path: "#features" }
];
```

The dropdown will be aligned under the "About" item on desktop and indented in the mobile menu.

## Notes

- Styling Restrictions: The component enforces a fixed design. You can only customize colors via the colors prop by passing CSS variable names. Additional styling (e.g., backdrop-blur-md, transition) is not allowed.
- Responsive Design: The nav bar is fully responsive, with a mobile menu toggle for smaller screens.
- Dependencies: Ensure lucide-react is installed for icons like ChevronDown and ArrowRight.

## License

MIT License © Aganitha