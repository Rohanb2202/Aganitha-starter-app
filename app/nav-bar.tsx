/* eslint-disable @typescript-eslint/no-unused-vars */
// nav-bar.tsx
"use client"

import React, { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { ChevronDown, ArrowRight } from "lucide-react"
import type { NavItem, DropdownItem } from "../app/lib/types"

interface NavBarProps {
  appName?: string;
  logoUrl?: string;
  navItems: NavItem[];
  onNavigate?: (path: string) => void;
  button?: {
    label: string;
    href: string;
  };
}

export function NavBar({ 
  appName, 
  logoUrl, 
  navItems = [],
  onNavigate, 
  button,
}: NavBarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [isNavVisible, setIsNavVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const pathname = usePathname()
  const dropdownRefs = useRef<{ [key: string]: HTMLDivElement | null }>({})

  // Fixed styles for the nav bar using CSS variables directly
  const containerStyle = `bg-[var(--background)]/80 backdrop-blur-md border-none fixed top-0 w-full z-50 transition-transform duration-300`;
  const navItemStyle = `text-[var(--foreground)] hover:text-[var(--primary)] transition-colors duration-300 px-3 py-2 rounded-md text-sm font-medium`;
  const navItemActiveStyle = `text-[var(--primary)] transition-colors duration-300 px-3 py-2 rounded-md text-sm font-medium`;
  const dropdownStyle = `absolute left-0 mt-1 w-48 rounded-md shadow-lg border border-[var(--foreground)] overflow-hidden bg-[var(--background)] transition-all duration-200`;
  const dropdownItemStyle = `block px-4 py-2 text-sm text-[var(--foreground)] hover:bg-[var(--primary)]/10 transition-colors duration-150`;
  const mobileMenuStyle = `md:hidden bg-[var(--background)]`;
  const mobileMenuItemStyle = `block px-3 py-2 rounded-md text-base font-medium text-[var(--foreground)] hover:bg-[var(--primary)]/10 transition-colors duration-150`;
  const mobileMenuItemActiveStyle = `block px-3 py-2 rounded-md text-base font-medium bg-[var(--primary)]/10 text-[var(--primary)]`;
  const logoStyle = "h-8 w-auto";
  const appNameStyle = `ml-2 text-xl font-bold text-[var(--foreground)]`;
  const menuButtonStyle = `inline-flex items-center justify-center p-2 rounded-md text-[var(--foreground)] hover:bg-[var(--primary)]/10 transition-colors duration-150`;

  // Fixed button style with Tailwind classes for hover effect
  const buttonStyle = `group inline-flex items-center px-3 py-2 bg-[var(--primary)] text-[var(--primary-foreground)] rounded-full hover:opacity-60 focus:opacity-60 active:opacity-60 transition-all duration-150 shadow-md cursor-pointer text-base font-medium`;

  const filteredNavItems = navItems.filter(item => 
    item.label && 
    (item.type !== "auth-signin" && item.type !== "auth-signout") && 
    item.hidden !== true
  )

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      
      if (currentScrollY <= 0) {
        setIsNavVisible(true)
      } else if (currentScrollY > lastScrollY) {
        setIsNavVisible(false)
      } else {
        setIsNavVisible(true)
      }
      
      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (activeDropdown) {
        const dropdownRef = dropdownRefs.current[activeDropdown]
        if (dropdownRef && !dropdownRef.contains(event.target as Node)) {
          setActiveDropdown(null)
        }
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [activeDropdown])

  const toggleDropdown = (label: string) => {
    setActiveDropdown(activeDropdown === label ? null : label)
  }

  const renderDropdown = (item: NavItem) => {
    if (!item.dropdown || item.dropdown.length === 0) return null

    return (
      <div
        className={`${dropdownStyle} ${
          activeDropdown === item.label ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"
        }`}
        ref={(el) => {
          if (item.label) dropdownRefs.current[item.label] = el
        }}
      >
        <div className="py-1">
          {item.dropdown.map((dropdownItem: DropdownItem) => (
            <Link
              key={dropdownItem.path}
              href={dropdownItem.path}
              onClick={() => {
                if (onNavigate) onNavigate(dropdownItem.path)
                setActiveDropdown(null)
              }}
              className={dropdownItemStyle}
            >
              {dropdownItem.label}
            </Link>
          ))}
        </div>
      </div>
    )
  }

  const renderNavItem = (item: NavItem) => {
    if (item.type === "auth-signin" || item.type === "auth-signout") return null

    if (item.dropdown && item.dropdown.length > 0) {
      return (
        <div
          className="relative"
          onMouseEnter={() => item.dropdown && setActiveDropdown(item.label)}
          onMouseLeave={() => item.dropdown && setActiveDropdown(null)}
        >
          {item.path ? (
            <Link
              href={item.path}
              className={pathname === item.path ? navItemActiveStyle : navItemStyle}
              onClick={(e) => {
                if (item.dropdown) {
                  e.preventDefault()
                  toggleDropdown(item.label)
                }
              }}
            >
              <div className="flex items-center">
                {item.label}
                <ChevronDown className="ml-1 h-4 w-4" />
              </div>
            </Link>
          ) : (
            <div
              className={pathname === item.path ? navItemActiveStyle : navItemStyle}
              onClick={() => toggleDropdown(item.label)}
            >
              <div className="flex items-center">
                {item.label}
                <ChevronDown className="ml-1 h-4 w-4" />
              </div>
            </div>
          )}
          {renderDropdown(item)}
        </div>
      )
    }

    return (
      <Link
        href={item.path || "#"}
        className={pathname === item.path ? navItemActiveStyle : navItemStyle}
      >
        {item.label}
      </Link>
    )
  }

  const renderMobileNavItem = (item: NavItem) => {
    if (item.type === "auth-signin" || item.type === "auth-signout") return null

    if (item.dropdown && item.dropdown.length > 0) {
      return (
        <div className="space-y-1">
          {item.path ? (
            <Link
              href={item.path}
              className={pathname === item.path ? mobileMenuItemActiveStyle : mobileMenuItemStyle}
              onClick={(e) => {
                e.preventDefault()
                toggleDropdown(item.label)
              }}
            >
              <div className="flex items-center justify-between">
                <div>{item.label}</div>
                <ChevronDown className="h-4 w-4" />
              </div>
            </Link>
          ) : (
            <div
              className={pathname === item.path ? mobileMenuItemActiveStyle : mobileMenuItemStyle}
              onClick={() => toggleDropdown(item.label)}
            >
              <div className="flex items-center justify-between">
                <div>{item.label}</div>
                <ChevronDown className="h-4 w-4" />
              </div>
            </div>
          )}

          {activeDropdown === item.label && (
            <div className="pl-6 space-y-1 mt-1">
              {item.dropdown.map((dropdownItem) => (
                <Link
                  key={dropdownItem.path}
                  href={dropdownItem.path}
                  onClick={() => {
                    setIsOpen(false)
                    setActiveDropdown(null)
                  }}
                  className={dropdownItemStyle}
                >
                  {dropdownItem.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      )
    }

    return (
      <Link
        href={item.path || "#"}
        onClick={() => setIsOpen(false)}
        className={pathname === item.path ? mobileMenuItemActiveStyle : mobileMenuItemStyle}
      >
        {item.label}
      </Link>
    )
  }

  const isExternalUrl = (url?: string) => {
    if (!url) return false
    return url.startsWith('http://') || url.startsWith('https://')
  }

  const renderButton = () => {
    if (!button) return null;

    return (
      <Link
        href={button.href}
        className={buttonStyle}
        onMouseEnter={() => console.log("Hovering over Login button")} // Debug hover event
      >
        {button.label}
        <ArrowRight className="ml-2 h-4 w-4" />
      </Link>
    );
  }

  return (
    <nav className={`${containerStyle} ${isNavVisible ? 'translate-y-0' : '-translate-y-full'}`}>
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            {(appName || logoUrl) && (
              <div className="flex items-center">
                <Link href="/">
                  <div className="flex-shrink-0 flex items-center">
                    {logoUrl && (
                      isExternalUrl(logoUrl) ? (
                        <img
                          src={logoUrl}
                          alt="Logo"
                          className={logoStyle}
                        />
                      ) : (
                        <Image
                          src={logoUrl}
                          alt="Logo"
                          width={32}
                          height={32}
                          className={logoStyle}
                        />
                      )
                    )}
                    {appName && <span className={appNameStyle}>{appName}</span>}
                  </div>
                </Link>
              </div>
            )}
          </div>

          <div className="flex items-center">
            <div className="hidden md:flex md:items-center md:space-x-4">
              {filteredNavItems.map((item, index) => (
                <React.Fragment key={`${item.label}-${index}`}>{renderNavItem(item)}</React.Fragment>
              ))}
              {button && (
                <div className="flex items-center ml-4">
                  {renderButton()}
                </div>
              )}
            </div>
            <div className="flex md:hidden items-center ml-auto">
              <button
                className={menuButtonStyle}
                onClick={() => setIsOpen(!isOpen)}
              >
                <span className="sr-only">Open main menu</span>
                <svg
                  className={`${isOpen ? "hidden" : "block"} h-6 w-6`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                <svg
                  className={`${isOpen ? "block" : "hidden"} h-6 w-6`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className={`${mobileMenuStyle} ${isOpen ? "block" : "hidden"}`}>
        <div className="px-2 pt-2 pb-3 space-y-1">
          {filteredNavItems.map((item, index) => (
            <React.Fragment key={`${item.label}-${index}`}>{renderMobileNavItem(item)}</React.Fragment>
          ))}
          {button && (
            <div className="space-y-1">
              {renderButton()}
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}