/* eslint-disable @typescript-eslint/no-unused-vars */
// page.tsx
"use client";
import { NavBar } from "./nav-bar";
import {SessionProvider, useSession, signOut} from 'next-auth/react';
import { useRef, useState, useEffect } from "react";
import {
  ArrowRight,
  ChevronDown,
  Zap,
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Twitter,
  HomeIcon,
  InfoIcon,
  ZapIcon,
  Contact2Icon,
  BellDotIcon,
} from "lucide-react";
import Link from "next/link";
import nav from "../nav-config.json";


const handleLogout = async() =>
{
  await signOut({callbackUrl:'/logout'});
};
// Hardcoded nav config data
const navConfigData = {
  appName: "Aganitha",
  logoUrl: "https://www.aganitha.ai/wp-content/uploads/2023/05/aganitha-logo.png",
  navigation: [
    { label: "Home", path: "#hero", icon: HomeIcon },
    { label: "About", path: "#about", icon: InfoIcon },
    { label: "Features", path: "#features", icon: ZapIcon},
    { label: "Contact", path: "#contact", icon: Contact2Icon},
    {id: "notification", path:"/login", icon: BellDotIcon}
  ],
};

// Utility function to simulate getNavConfig
const getNavConfig = (data: typeof navConfigData) => {
  return {
    appName: data.appName,
    logoUrl: data.logoUrl,
    navigation: data.navigation,
  };
};

// Custom Button Component
const Button = ({
  children,
  variant = "primary",
  className = "",
  onClick,
}: {
  children: React.ReactNode;
  variant?: "primary" | "outline";
  className?: string;
  onClick?: () => void;
}) => {
  return (
    <button
      onClick={onClick}
      className={`
        px-6 py-3 rounded-full font-medium transition-all duration-500 inline-flex items-center justify-center text-sm relative overflow-hidden group cursor-pointer
        ${
          variant === "primary"
            ? "bg-[var(--primary)] text-[var(--primary-foreground)] shadow-lg hover:bg-[var(--primary)]/90"
            : ""
        }
        ${
          variant === "outline"
            ? "border border-[var(--primary)] text-[var(--foreground)] hover:bg-[var(--primary)]/10 hover:border-[var(--primary)]/70"
            : ""
        }
        ${className}
      `}
      style={{
        animation: "button-pulse 2s infinite ease-in-out",
      }}
    >
      <span className="relative z-10 flex items-center">{children}</span>
      <style jsx>{`
        @keyframes button-pulse {
          0% {
            transform: scale(1);
            box-shadow: 0 0 10px var(--ring);
          }
          50% {
            transform: scale(1.05);
            box-shadow: 0 0 20px var(--ring);
          }
          100% {
            transform: scale(1);
            box-shadow: 0 0 10px var(--ring);
          }
        }
      `}</style>
    </button>
  );
};

// Navigation Dots Component
const NavDots = ({ onNavigate }: { onNavigate: (path: string) => void }) => {
  const [isMounted, setIsMounted] = useState(false);
  const sections = [
    { id: "hero", label: "Home" },
    { id: "about", label: "About" },
    { id: "themes", label: "Themes" },
    { id: "features", label: "Features" },
    { id: "contact", label: "Contact" },
  ];

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  const handleThemesClick = (path: string) => {
    if (path === "#themes") {
      // Special handling for themes - scroll to the theming section in about
      const themingSection = document.querySelector("#about .theming-section");
      if (themingSection) {
        themingSection.scrollIntoView({ behavior: "smooth" });
      } else {
        // Fallback to about section if theming section not found
        onNavigate("#about");
      }
    } else {
      onNavigate(path);
    }
  };

  return (
    <div className="fixed right-4 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center gap-4">
      {sections.map((section) => (
        <div key={section.id} className="group relative">
          <button
            onClick={() => handleThemesClick(`#${section.id}`)}
            className="w-3 h-3 bg-[var(--primary)]/50 rounded-full hover:bg-[var(--primary)] transition-all duration-300"
          />
          <span className="absolute right-6 top-1/2 -translate-y-1/2 bg-[var(--card)] text-[var(--foreground)] px-2 py-1 rounded-md text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            {section.id === "themes" 
              ? `${section.label} - Customize at tweakcn.com`
              : section.label}
          </span>
        </div>
      ))}
    </div>
  );
};

// Solutions AI Animation Component
const SolutionsAIAnimation = ({ inView }: { inView: boolean }) => {
  return (
    <div
      className={`relative h-[400px] rounded-2xl overflow-hidden ${
        inView ? "animate-slide-up-scale" : ""
      }`}
      style={{ animationDelay: "0.3s" }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)]/30 to-[var(--secondary)]/30 flex items-center justify-center">
        <div className="relative w-full h-full flex items-center justify-center">
          <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
            <div className="w-40 h-40 animate-rotate-y">
              {Array.from({ length: 20 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute w-full h-full"
                  style={{
                    transform: `rotateY(${i * 18}deg) translateZ(60px)`,
                    transformStyle: "preserve-3d",
                  }}
                >
                  <div
                    className="absolute left-1/2 top-0 w-1 h-full bg-[var(--primary)] origin-center -translate-x-1/2 animate-scale-pulse"
                    style={{ animationDelay: `${(i * 0.1) % 2}s` }}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="absolute w-72 h-72 rounded-full border-2 border-dashed border-[var(--primary)]/30 animate-spin-slow" />
          <div className="absolute w-56 h-56 rounded-full border-2 border-dashed border-[var(--secondary)]/40 animate-spin-reverse" />
          <div className="relative z-10 text-center p-8 backdrop-blur-sm bg-[var(--card)]/10 rounded-xl">
            <div className="animate-fade-in" style={{ animationDelay: "0.5s" }}>
              <div className="flex items-center justify-center mb-4">
                <div className="relative animate-pulse-scale">
                  <Zap className="h-10 w-10 text-[var(--primary)]" />
                  <div className="absolute inset-0 rounded-full animate-pulse-shadow" />
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-[var(--foreground)]">
                Powered by AuthComp
              </h3>
              <p className="text-[var(--muted-foreground)]">
                Our platform provides a seamless authentication solution for
                Next.js applications.
              </p>
              <div className="mt-4 flex justify-center space-x-1">
                {Array.from({ length: 10 }).map((_, i) => (
                  <div
                    suppressHydrationWarning
                    key={i}
                    className="w-1 bg-[var(--primary)] animate-height-change"
                    style={{
                      height: `${Math.random() * 20 + 5}px`,
                      animationDelay: `${i * 0.1}s`,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        @keyframes slide-up-scale {
          0% {
            opacity: 0;
            transform: translateY(50px) scale(0.9);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        .animate-slide-up-scale {
          animation: slide-up-scale 0.8s ease-out forwards;
        }
        @keyframes rotate-y {
          0% {
            transform: rotateY(0deg);
          }
          100% {
            transform: rotateY(360deg);
          }
        }
        .animate-rotate-y {
          animation: rotate-y 20s infinite linear;
        }
        @keyframes scale-pulse {
          0%,
          100% {
            transform: scaleY(1);
          }
          50% {
            transform: scaleY(0.8);
          }
        }
        .animate-scale-pulse {
          animation: scale-pulse 2s infinite ease-in-out;
        }
        @keyframes spin-slow {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
        .animate-spin-slow {
          animation: spin-slow 15s infinite linear;
        }
        @keyframes spin-reverse {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(-360deg);
          }
        }
        .animate-spin-reverse {
          animation: spin-reverse 12s infinite linear;
        }
        @keyframes pulse-scale {
          0%,
          100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.2);
          }
        }
        .animate-pulse-scale {
          animation: pulse-scale 2s infinite ease-in-out;
        }
        @keyframes pulse-shadow {
          0%,
          100% {
            box-shadow: 0 0 10px var(--ring);
          }
          50% {
            box-shadow: 0 0 20px var(--ring);
          }
        }
        .animate-pulse-shadow {
          animation: pulse-shadow 2s infinite ease-in-out;
        }
        @keyframes height-change {
          0%,
          100% {
            height: 5px;
          }
          50% {
            height: 25px;
          }
        }
        .animate-height-change {
          animation: height-change 1.5s infinite ease-in-out;
        }
        @keyframes fade-in {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  const [heroInView, setHeroInView] = useState(false);
  const [aboutInView, setAboutInView] = useState(false);
  const [featuresInView, setFeaturesInView] = useState(false);
  const [contactInView, setContactInView] = useState(false);
  const [footerInView, setFooterInView] = useState(false);

  useEffect(() => {
    const sectionIds = ["hero", "about", "features", "contact", "footer"];
    const observers = sectionIds
      .map((id) => {
        const element = document.getElementById(id);
        if (!element) return null;

        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                switch (id) {
                  case "hero":
                    setHeroInView(true);
                    break;
                  case "about":
                    setAboutInView(true);
                    break;
                  case "features":
                    setFeaturesInView(true);
                    break;
                  case "contact":
                    setContactInView(true);
                    break;
                  case "footer":
                    setFooterInView(true);
                    break;
                }
              }
            });
          },
          { threshold: 0.01 }
        );
        observer.observe(element);
        return { id, observer, element };
      })
      .filter(Boolean);

    return () => {
      observers.forEach((item) => {
        if (item && item.observer && item.element)
          item.observer.unobserve(item.element);
      });
    };
  }, []);

  const handleNavigate = (path: string) => {
    const sectionId = path.replace("#", "");
    const sectionRefs: {
      [key: string]: React.RefObject<HTMLDivElement | null>;
    } = {
      hero: heroRef,
      about: aboutRef,
      features: featuresRef,
      contact: contactRef,
      footer: footerRef,
    };
    const ref = sectionRefs[sectionId];
    if (ref?.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleGetStarted = () => {
    aboutRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen overflow-x-hidden">
      <NavDots onNavigate={handleNavigate} />
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[var(--primary)]/20 rounded-full blur-3xl -z-10 animate-float-blob opacity-30" />
        <div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[var(--secondary)]/20 rounded-full blur-3xl -z-10 animate-float-blob opacity-40"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute top-1/2 right-1/3 w-40 h-40 bg-[var(--primary)]/20 rounded-full blur-3xl -z-10 animate-float-blob opacity-30"
          style={{ animationDelay: "2s" }}
        />
      </div>
      <NavBar
        logoUrl={navConfigData.logoUrl}
        navItems={navConfigData.navigation}
        button={{
          label: "Login",
        onClick: handleLogout
        }}
        onNavigate={handleNavigate}
        appName={""}
      />
      <section
        id="hero"
        ref={heroRef}
        className="min-h-screen pt-32 pb-20 flex items-center justify-center relative overflow-hidden"
      >
        <div className="container mx-auto px-4 z-10">
          <div
            className={`text-center ${heroInView ? "animate-hero-slide-in" : ""}`}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              The Starter Template of{" "}
              <span className="text-[var(--primary)] animate-text-glow">
                Aganitha
              </span>
              , Enriching Fullstack via Typesafe Next.js
            </h1>
            <p
              className={`text-lg md:text-xl text-[var(--muted-foreground)] max-w-2xl mx-auto ${
                heroInView ? "animate-fade-in-delay" : ""
              }`}
              style={{ animationDelay: "0.5s" }}
            >
              A robust foundation for building modern web applications with
              Next.js and TypeScript.
            </p>
            <div
              className={`mt-8 flex flex-wrap justify-center gap-4 ${
                heroInView ? "animate-fade-in-delay" : ""
              }`}
              style={{ animationDelay: "0.8s" }}
            >
              <Button
                variant="primary"
                className="group"
                onClick={handleGetStarted}
              >
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Link
                href="https://github.com/RohanB-acog/Aganitha-Starter-app/blob/main/README.md"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline">Learn More</Button>
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
          <ChevronDown className="h-6 w-6 text-[var(--primary)] animate-scroll-bounce" />
        </div>
        <style jsx>{`
          @keyframes hero-slide-in {
            0% {
              opacity: 0;
              transform: translateY(50px) scale(0.95);
            }
            100% {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }
          .animate-hero-slide-in {
            animation: hero-slide-in 1s ease-out forwards;
          }
          @keyframes text-glow {
            0%,
            100% {
              text-shadow: 0 0 5px var(--ring);
            }
            50% {
              text-shadow: 0 0 15px var(--ring);
            }
          }
          .animate-text-glow {
            animation: text-glow 2s infinite ease-in-out;
          }
          @keyframes fade-in-delay {
            0% {
              opacity: 0;
              transform: translateY(20px);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .animate-fade-in-delay {
            animation: fade-in-delay 0.8s ease-out forwards;
          }
          @keyframes float-blob {
            0%,
            100% {
              transform: translateY(0) scale(1);
              opacity: 0.3;
            }
            50% {
              transform: translateY(-20px) scale(1.1);
              opacity: 0.5;
            }
          }
          .animate-float-blob {
            animation: float-blob 6s infinite ease-in-out;
          }
        `}</style>
      </section>

      <section
        id="about"
        ref={aboutRef}
        className="py-20 px-4 md:px-8 bg-gradient-to-b from-[var(--background)] to-[var(--muted)]"
      >
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <div
              className={`inline-block mb-4 px-3 py-1 bg-[var(--primary)]/20 rounded-full text-[var(--primary)] text-sm font-medium ${
                aboutInView ? "animate-badge-pop" : ""
              }`}
            >
              About AuthComp
            </div>
            <h2
              className={`text-3xl md:text-4xl font-bold mb-4 ${
                aboutInView ? "animate-section-reveal" : ""
              }`}
            >
              Next.js Authentication Component
            </h2>
            <p
              className={`text-lg text-[var(--muted-foreground)] ${
                aboutInView ? "animate-fade-in-delay" : ""
              }`}
              style={{ animationDelay: "0.2s" }}
            >
              A comprehensive authentication solution for Next.js applications.
            </p>
          </div>

          <div className={`mb-16 ${aboutInView ? "animate-slide-up" : ""}`}>
            <h3 className="text-2xl font-semibold mb-4 text-[var(--foreground)] text-center">
              Introduction
            </h3>
            <p className="text-[var(--muted-foreground)] text-center max-w-2xl mx-auto">
              A comprehensive authentication solution for Next.js applications
              that provides customizable authentication UI with social login
              options, email OTP authentication, and middleware for protected
              routes.
            </p>
          </div>

          <div
            className={`mb-16 ${aboutInView ? "animate-slide-up" : ""}`}
            style={{ animationDelay: "0.1s" }}
          >
            <h3 className="text-2xl font-semibold mb-4 text-[var(--foreground)] text-center">
              Aganitha Nav Bar
            </h3>
            <p className="text-[var(--muted-foreground)] text-center max-w-2xl mx-auto mb-4">
              A lightweight, customizable navigation bar component for Next.js
              applications, built with TypeScript and Tailwind CSS. It provides
              a modern, responsive design with dropdown support, while
              enforcing a consistent style and allowing color theming via CSS
              variables.
            </p>
            <div className="flex justify-center gap-4 mb-4">
              <span className="inline-block px-3 py-1 bg-[var(--primary)]/20 rounded-full text-[var(--primary)] text-sm font-medium">
                npm version
              </span>
              <span className="inline-block px-3 py-1 bg-[var(--primary)]/20 rounded-full text-[var(--primary)] text-sm font-medium">
                license
              </span>
            </div>

            <h4 className="text-xl font-medium mb-2 text-[var(--foreground)] text-center">
              Features
            </h4>
            <ul className="list-disc pl-6 text-[var(--muted-foreground)] max-w-md mx-auto">
              <li>Responsive navigation bar with mobile menu support</li>
              <li>Dropdown menu support for nested navigation items</li>
              <li>Fixed styling to ensure a consistent look across projects</li>
              <li>
                Color theming via CSS variables (background, foreground,
                primary, primary-foreground)
              </li>
              <li>TypeScript support for type-safe props</li>
              <li>
                Scroll-aware behavior (hides on scroll down, shows on scroll up)
              </li>
            </ul>

            <h4 className="text-xl font-medium mt-6 mb-2 text-[var(--foreground)] text-center">
              Installation
            </h4>
            <p className="text-[var(--muted-foreground)] text-center mb-2">
              Install the package via npm:
            </p>
            <pre className="bg-[var(--muted)] p-4 rounded-md text-[var(--foreground)] overflow-x-auto max-w-md mx-auto">
              <code>npm install aganitha-nav-bar</code>
            </pre>
            <p className="text-[var(--muted-foreground)] text-center mt-2">
              Ensure you have the following dependencies installed in your
              Next.js project:{" "}
              <code className="bg-[var(--muted)] px-1 rounded">next</code>,{" "}
              <code className="bg-[var(--muted)] px-1 rounded">react</code>, and{" "}
              <code className="bg-[var(---muted)] px-1 rounded">lucide-react</code>{" "}
              (for icons).
            </p>

            <h4 className="text-xl font-medium mt-6 mb-2 text-[var(--foreground)] text-center">
              Usage
            </h4>
            <p className="text-[var(--muted-foreground)] text-center mb-2">
              Import and use the NavBar component in your Next.js page:
            </p>
            <pre className="bg-[var(--muted)] p-4 rounded-md text-[var(--foreground)] overflow-x-auto max-w-2xl mx-auto">
              <code>{`"use client";

import { NavBar } from 'aganitha-nav-bar';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

// Navigation configuration
const navItems = [
  { label: "Home", path: "#hero" },
  {
    label: "About",
    path: "#about",
    dropdown: [
      { label: "Our Team", path: "#team" },
      { label: "Our Mission", path: "#mission" },
    ],
  },
  { label: "Features", path: "#features" },
  { label: "Contact", path: "#contact" },
];

export default function Home() {
  const handleNavigate = (path: string) => {
    const section = document.querySelector(path);
    section?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <NavBar
      logoUrl="https://www.aganitha.ai/wp-content/uploads/2023/05/aganitha-logo.png"
      appName="Aganitha"
      navItems={navItems}
      onNavigate={handleNavigate}
      button={{ label: "Login", href: "/login" }}
    />
  );
}`}</code>
            </pre>

            <h4 className="text-xl font-medium mt-6 mb-2 text-[var(--foreground)] text-center">
              Props
            </h4>
            <div className="overflow-x-auto max-w-4xl mx-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[var(--primary)]/10">
                    <th className="p-3 font-semibold text-[var(--foreground)]">
                      Prop
                    </th>
                    <th className="p-3 font-semibold text-[var(--foreground)]">
                      Type
                    </th>
                    <th className="p-3 font-semibold text-[var(--foreground)]">
                      Description
                    </th>
                    <th className="p-3 font-semibold text-[var(--foreground)]">
                      Default
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      prop: "appName",
                      type: "string",
                      desc: "The name of the application to display next to the logo.",
                      default: "undefined",
                    },
                    {
                      prop: "logoUrl",
                      type: "string",
                      desc: "URL of the logo image to display. Supports both external and local URLs.",
                      default: "undefined",
                    },
                    {
                      prop: "navItems",
                      type: "NavItem[]",
                      desc: "Array of navigation items. Supports dropdowns.",
                      default: "[]",
                    },
                    {
                      prop: "onNavigate",
                      type: "(path: string) => void",
                      desc: "Callback function triggered on navigation item click.",
                      default: "undefined",
                    },
                    {
                      prop: "button",
                      type: "React.ReactNode",
                      desc: "Custom button to display on the right side of the nav bar.",
                      default: "undefined",
                    },
                  ].map((row, index) => (
                    <tr
                      key={index}
                      className={`border-b border-[var(--border)] ${
                        aboutInView ? "animate-table-row" : ""
                      }`}
                      style={{ animationDelay: `${0.05 * index + 0.1}s` }}
                    >
                      <td className="p-3 text-[var(--muted-foreground)]">
                        {row.prop}
                      </td>
                      <td className="p-3 text-[var(--muted-foreground)]">
                        {row.type}
                      </td>
                      <td className="p-3 text-[var(--muted-foreground)]">
                        {row.desc}
                      </td>
                      <td className="p-3 text-[var(--muted-foreground)]">
                        {row.default}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h4 className="text-xl font-medium mt-6 mb-2 text-[var(--foreground)] text-center">
              NavItem Type
            </h4>
            <pre className="bg-[var(--muted)] p-4 rounded-md text-[var(--foreground)] overflow-x-auto max-w-md mx-auto">
              <code>{`interface NavItem {
  label: string;
  path?: string;
  dropdown?: DropdownItem[];
  type?: string;
  hidden?: boolean;
}

interface DropdownItem {
  label: string;
  path: string;
}`}</code>
            </pre>

            <h4 id="theming-section" className="text-xl font-medium mt-6 mb-2 text-[var(--foreground)] text-center theming-section">
              Theming
            </h4>
            <p className="text-[var(--muted-foreground)] text-center mb-2">
              To customize the colors, visit{" "}
              <a
                href="https://tweakcn.com/editor/theme"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--primary)] hover:underline"
              >
                tweakcn.com/editor/theme
              </a>{" "}
              to generate your theme template. Copy the generated CSS code and paste it into your{" "}
              <code className="bg-[var(--muted)] px-1 rounded">globals.css</code>{" "}
              file to apply it to your project.
            </p>
          </div>

          <div
            className={`mb-16 ${aboutInView ? "animate-slide-left" : ""}`}
            style={{ animationDelay: "0.2s" }}
          >
            <h3 className="text-2xl font-semibold mb-4 text-[var(--foreground)] text-center">
              Features
            </h3>
            <h4 className="text-xl font-medium mb-2 text-[var(--foreground)] text-center">
              Authentication Component
            </h4>
            <ul className="list-disc pl-6 text-[var(--muted-foreground)] max-w-md mx-auto">
              <li>
                🔐 Built-in support for Google, GitHub, and LinkedIn
                authentication
              </li>
              <li>📧 Email OTP authentication for passwordless login</li>
              <li>🎨 Fully customizable with Tailwind CSS</li>
              <li>🚀 CLI tool for automatic setup and configuration</li>
              <li>📦 Easy to install and integrate</li>
            </ul>
          </div>

          <div
            className={`mb-16 ${aboutInView ? "animate-slide-right" : ""}`}
            style={{ animationDelay: "0.3s" }}
          >
            <h3 className="text-2xl font-semibold mb-4 text-[var(--foreground)] text-center">
              Quick Start Guide
            </h3>
            <h4 className="text-xl font-medium mb-2 text-[var(--foreground)] text-center">
              Option 1: Create a New Next.js Project
            </h4>
            <p className="mb-2 text-[var(--muted-foreground)] text-center">
              Running{" "}
              <code className="bg-[var(--muted)] px-1 rounded">npx authcomp</code>{" "}
              without an existing Next.js project will:
            </p>
            <ol className="list-decimal pl-6 mb-4 text-[var(--muted-foreground)] max-w-md mx-auto">
              <li>Create a new Next.js application</li>
              <li>Install and configure authentication components</li>
              <li>Set up necessary files and environment variables</li>
            </ol>
            <pre className="bg-[var(--muted)] p-4 rounded-md text-[var(--foreground)] overflow-x-auto max-w-md mx-auto">
              <code>npx authcomp</code>
            </pre>
            <p className="mt-2 text-[var(--muted-foreground)] text-center">
              The setup wizard will guide you through the installation process.
            </p>
            <h4 className="text-xl font-medium mt-4 mb-2 text-[var(--foreground)] text-center">
              Option 2: Add to Existing Project
            </h4>
            <pre className="bg-[var(--muted)] p-4 rounded-md text-[var(--foreground)] overflow-x-auto max-w-md mx-auto">
              <code>{`# Navigate to your project
cd your-nextjs-project

# Run the setup wizard
npx authcomp`}</code>
            </pre>
          </div>

          <div
            className={`mb-16 ${aboutInView ? "animate-scale-in" : ""}`}
            style={{ animationDelay: "0.4s" }}
          >
            <h3 className="text-2xl font-semibold mb-4 text-[var(--foreground)] text-center">
              What the Setup Wizard Does
            </h3>
            <ol className="list-decimal pl-6 text-[var(--muted-foreground)] max-w-2xl mx-auto">
              <li>
                <strong>Creates Authentication Routes</strong>:
                <ul className="list-disc pl-6">
                  <li>
                    Sets up NextAuth route at{" "}
                    <code className="bg-[var(--muted)] px-1 rounded">
                      app/api/auth/[...nextauth]/route.ts
                    </code>
                  </li>
                  <li>
                    Creates OTP authentication endpoints:
                    <ul className="list-disc pl-6">
                      <li>
                        <code className="bg-[var(--muted)] px-1 rounded">
                          /api/auth/request-otp
                        </code>
                      </li>
                      <li>
                        <code className="bg-[var(--muted)] px-1 rounded">
                          /api/auth/verify-otp
                        </code>
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>
              <li>
                <strong>Adds Middleware</strong>:
                <ul className="list-disc pl-6">
                  <li>
                    Creates a{" "}
                    <code className="bg-[var(--muted)] px-1 rounded">
                      middleware.ts
                    </code>{" "}
                    file for route protection
                  </li>
                  <li>Configures protected routes and authentication redirects</li>
                </ul>
              </li>
              <li>
                <strong>Sets Up Utility Files</strong>:
                <ul className="list-disc pl-6">
                  <li>
                    <code className="bg-[var(--muted)] px-1 rounded">
                      utils/auth.ts
                    </code>{" "}
                    - Authentication helper functions
                  </li>
                  <li>
                    <code className="bg-[var(--muted)] px-1 rounded">
                      utils/db.ts
                    </code>{" "}
                    - Database utilities for OTP storage
                  </li>
                  <li>
                    <code className="bg-[var(--muted)] px-1 rounded">
                      utils/email.ts
                    </code>{" "}
                    - Email sending functionality for OTP
                  </li>
                </ul>
              </li>
              <li>
                <strong>Configures Environment Variables</strong>:
                <ul className="list-disc pl-6">
                  <li>
                    Creates or updates{" "}
                    <code className="bg-[var(--muted)] px-1 rounded">.env</code>{" "}
                    file with necessary configuration
                  </li>
                </ul>
              </li>
              <li>
                <strong>Handles File Conflicts</strong>:
                <ul className="list-disc pl-6">
                  <li>
                    If files already exist, they are renamed to{" "}
                    <code className="bg-[var(--muted)] px-1 rounded">{`{filename}`}.old.{`{extension}`}</code>
                  </li>
                  <li>Preserves your existing code while adding new functionality</li>
                </ul>
              </li>
            </ol>
          </div>

          <div
            className={`mb-16 ${aboutInView ? "animate-slide-up" : ""}`}
            style={{ animationDelay: "0.5s" }}
          >
            <h3 className="text-2xl font-semibold mb-4 text-[var(--foreground)] text-center">
              Authentication Methods
            </h3>
            <h4 className="text-xl font-medium mb-2 text-[var(--foreground)] text-center">
              Social Authentication
            </h4>
            <p className="mb-2 text-[var(--muted-foreground)] text-center">
              AuthComp supports the following social authentication providers:
            </p>
            <ul className="list-disc pl-6 mb-4 text-[var(--muted-foreground)] max-w-md mx-auto">
              <li>
                <strong>Google</strong> - OAuth 2.0 authentication with Google
                accounts
              </li>
              <li>
                <strong>GitHub</strong> - OAuth authentication with GitHub
                accounts
              </li>
              <li>
                <strong>LinkedIn</strong> - OAuth authentication with LinkedIn
                accounts
              </li>
            </ul>
            <h4 className="text-xl font-medium mb-2 text-[var(--foreground)] text-center">
              Email OTP Authentication
            </h4>
            <p className="mb-2 text-[var(--muted-foreground)] text-center">
              Passwordless authentication using one-time passwords sent via
              email:
            </p>
            <ol className="list-decimal pl-6 text-[var(--muted-foreground)] max-w-md mx-auto">
              <li>User enters their email address</li>
              <li>A one-time code is sent to their email</li>
              <li>User enters the code to authenticate</li>
              <li>A session is created upon successful verification</li>
            </ol>
          </div>

          <div
            className={`mb-16 ${aboutInView ? "animate-slide-up-scale" : ""}`}
            style={{ animationDelay: "0.6s" }}
          >
            <SolutionsAIAnimation inView={aboutInView} />
          </div>

          <div
            className={`mb-16 ${aboutInView ? "animate-slide-left" : ""}`}
            style={{ animationDelay: "0.7s" }}
          >
            <h3 className="text-2xl font-semibold mb-4 text-[var(--foreground)] text-center">
              Using the AuthLogin Component
            </h3>
            <pre className="bg-[var(--muted)] p-4 rounded-md text-[var(--foreground)] overflow-x-auto max-w-2xl mx-auto">
              <code>{`"use client"

import { AuthLogin } from 'authcomp';

export default function LoginPage() {
  return (
    <AuthLogin
      redirectUrl="/dashboard"
      logoUrl="/your-logo.svg"
      title="Welcome Back"
      subtitle="Sign in to continue"
      showGoogle={true}
      showGithub={true}
      showLinkedin={true}
      showOTP={true}
      showLDAP={true}
      buttonClassName="custom-button-class"
      containerClassName="custom-container-class"
    />
  );
}`}</code>
            </pre>
          </div>

          <div
            className={`mb-16 ${aboutInView ? "animate-slide-right" : ""}`}
            style={{ animationDelay: "0.8s" }}
          >
            <h3 className="text-2xl font-semibold mb-4 text-[var(--foreground)] text-center">
              AuthLogin Component Props
            </h3>
            <div className="overflow-x-auto max-w-4xl mx-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[var(--primary)]/10">
                    <th className="p-3 font-semibold text-[var(--foreground)]">
                      Prop
                    </th>
                    <th className="p-3 font-semibold text-[var(--foreground)]">
                      Type
                    </th>
                    <th className="p-3 font-semibold text-[var(--foreground)]">
                      Default
                    </th>
                    <th className="p-3 font-semibold text-[var(--foreground)]">
                      Description
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      prop: "className",
                      type: "string",
                      default: '""',
                      desc: "Additional CSS classes for the root element",
                    },
                    {
                      prop: "redirectUrl",
                      type: "string",
                      default: '"/"',
                      desc: "URL to redirect after successful login",
                    },
                    {
                      prop: "title",
                      type: "string",
                      default: '"Welcome to Aganitha"',
                      desc: "Main title text",
                    },
                    {
                      prop: "subtitle",
                      type: "string",
                      default:
                        '"You can sign in using your preferred login method"',
                      desc: "Subtitle text",
                    },
                    {
                      prop: "showGoogle",
                      type: "boolean",
                      default: "true",
                      desc: "Toggle Google login button",
                    },
                    {
                      prop: "showGithub",
                      type: "boolean",
                      default: "true",
                      desc: "Toggle GitHub login button",
                    },
                    {
                      prop: "showLinkedin",
                      type: "boolean",
                      default: "true",
                      desc: "Toggle LinkedIn login button",
                    },
                    {
                      prop: "showOTP",
                      type: "boolean",
                      default: "true",
                      desc: "Toggle Email OTP authentication",
                    },
                    {
                      prop: "showLDAP",
                      type: "boolean",
                      default: "true",
                      desc: "Toggle Aganitha's LDAP authentication",
                    },
                    {
                      prop: "buttonClassName",
                      type: "string",
                      default: '""',
                      desc: "Additional CSS classes for buttons",
                    },
                    {
                      prop: "containerClassName",
                      type: "string",
                      default: '""',
                      desc: "Additional CSS classes for container",
                    },
                    {
                      prop: "termsUrl",
                      type: "string",
                      default: '"#"',
                      desc: "URL to terms of service",
                    },
                    {
                      prop: "privacyUrl",
                      type: "string",
                      default: '"#"',
                      desc: "URL to privacy policy",
                    },
                    {
                      prop: "logoUrl",
                      type: "string",
                      default:
                        '"https://www.aganitha.ai/wp-content/uploads/2023/07/logo-crop.svg"',
                      desc: "URL to your logo",
                    },
                    {
                      prop: "logoClassName",
                      type: "string",
                      default: '""',
                      desc: "Additional CSS classes for logo",
                    },
                  ].map((row, index) => (
                    <tr
                      key={index}
                      className={`border-b border-[var(--border)] ${
                        aboutInView ? "animate-table-row" : ""
                      }`}
                      style={{ animationDelay: `${0.05 * index}s` }}
                    >
                      <td className="p-3 text-[var(--muted-foreground)]">
                        {row.prop}
                      </td>
                      <td className="p-3 text-[var(--muted-foreground)]">
                        {row.type}
                      </td>
                      <td className="p-3 text-[var(--muted-foreground)]">
                        {row.default}
                      </td>
                      <td className="p-3 text-[var(--muted-foreground)]">
                        {row.desc}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div
            className={`mb-16 ${aboutInView ? "animate-scale-in" : ""}`}
            style={{ animationDelay: "0.9s" }}
          >
            <h3 className="text-2xl font-semibold mb-4 text-[var(--foreground)] text-center">
              Route Protection with Middleware
            </h3>
            <p className="mb-2 text-[var(--muted-foreground)] text-center">
              AuthComp includes a middleware configuration that protects routes
              based on authentication status:
            </p>
            <pre className="bg-[var(--muted)] p-4 rounded-md text-[var(--foreground)] overflow-x-auto max-w-md mx-auto">
              <code>{`// middleware.ts (automatically created by setup wizard)
export const config = {
  matcher: ['/', '/dashboard/:path*', '/profile/:path*']
};`}</code>
            </pre>
            <p className="mt-2 text-[var(--muted-foreground)] text-center">
              You can customize the protected routes by modifying the{" "}
              <code className="bg-[var(--muted)] px-1 rounded">matcher</code>{" "}
              array.
            </p>
          </div>

          <div
            className={`mb-16 ${aboutInView ? "animate-slide-up" : ""}`}
            style={{ animationDelay: "1s" }}
          >
            <h3 className="text-2xl font-semibold mb-4 text-[var(--foreground)] text-center">
              Environment Configuration
            </h3>
            <p className="mb-2 text-[var(--muted-foreground)] text-center">
              Update your{" "}
              <code className="bg-[var(--muted)] px-1 rounded">.env</code> file
              with your OAuth credentials:
            </p>
            <pre className="bg-[var(--muted)] p-4 rounded-md text-[var(--foreground)] overflow-x-auto max-w-2xl mx-auto">
              <code>{`# Authentication
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here

# Google OAuth
GOOGLE_ID=your-google-client-id
GOOGLE_SECRET=your-google-client-secret

# GitHub OAuth
GITHUB_ID=your-github-client-id
GITHUB_SECRET=your-github-client-secret

# LinkedIn OAuth
LINKEDIN_CLIENT_ID=your-linkedin-client-id
LINKEDIN_CLIENT_SECRET=your-linkedin-client-secret

# Email (for OTP)
EMAIL_SERVER=smtp://username:password@smtp.example.com:587
EMAIL_FROM=noreply@example.com

# LDAP 
LDAP_URI=ldap://ldap.example.com
LDAP_USER_DN=ou=people=,dc=example,dc=com`}
</code>
            </pre>
          </div>

          <div
            className={`mb-16 ${aboutInView ? "animate-slide-left" : ""}`}
            style={{ animationDelay: "1.1s" }}
          >
            <h3 className="text-2xl font-semibold mb-4 text-[var(--foreground)] text-center">
              Advanced Usage
            </h3>
            <h4 className="text-xl font-medium mb-2 text-[var(--foreground)] text-center">
              Custom Email Templates
            </h4>
            <p className="mb-2 text-[var(--muted-foreground)] text-center">
              You can customize the OTP email template by modifying the{" "}
              <code className="bg-[var(--muted)] px-1 rounded">
                utils/email.ts
              </code>{" "}
              file:
            </p>
            <pre className="bg-[var(--muted)] p-4 rounded-md text-[var(--foreground)] overflow-x-auto max-w-md mx-auto">
              <code>{`// Customize the email content and styling
const html = \`
  <div style="...">
    <h1>Your Authentication Code</h1>
    <p>Your one-time password is: <strong>\${otp}</strong></p>
    <p>This code will expire in 10 minutes.</p>
  </div>
\`;`}</code>
            </pre>
            <h4 className="text-xl font-medium mt-4 mb-2 text-[var(--foreground)] text-center">
              Database Integration
            </h4>
            <p className="mb-2 text-[var(--muted-foreground)] text-center">
              By default, AuthComp uses a SQLite database for OTP storage. You
              can customize the database configuration in{" "}
              <code className="bg-[var(--muted)] px-1 rounded">utils/db.ts</code>
              .
            </p>
            <h4 className="text-xl font-medium mt-4 mb-2 text-[var(--foreground)] text-center">
              Styling Customization
            </h4>
            <ul className="list-disc pl-6 text-[var(--muted-foreground)] max-w-md mx-auto">
              <li>
                Use the{" "}
                <code className="bg-[var(--muted)] px-1 rounded">className</code>
                ,{" "}
                <code className="bg-[var(--muted)] px-1 rounded">
                  buttonClassName
                </code>
                , and{" "}
                <code className="bg-[var(--muted)] px-1 rounded">
                  containerClassName
                </code>{" "}
                props to add custom styles
              </li>
              <li>
                The component uses a modern, responsive design that adapts to
                different screen sizes
              </li>
              <li>
                Animation effects are included for a polished user experience
              </li>
            </ul>
          </div>

          <div
            className={`mb-16 ${aboutInView ? "animate-slide-right" : ""}`}
            style={{ animationDelay: "1.2s" }}
          >
            <h3 className="text-2xl font-semibold mb-4 text-[var(--foreground)] text-center">
              Troubleshooting
            </h3>
            <h4 className="text-xl font-medium mb-2 text-[var(--foreground)] text-center">
              File Conflicts
            </h4>
            <p className="mb-2 text-[var(--muted-foreground)] text-center">
              If you encounter file conflicts during setup, AuthComp will rename
              existing files to{" "}
              <code className="bg-[var(--muted)] px-1 rounded">{`{filename}`}.old.{`{extension}`}</code>{" "}
              and create new ones. You can:
            </p>
            <ol className="list-decimal pl-6 mb-4 text-[var(--muted-foreground)] max-w-md mx-auto">
              <li>Compare the old and new files to merge your changes</li>
              <li>
                Delete the{" "}
                <code className="bg-[var(--muted)] px-1 rounded">.old</code>{" "}
                files once you&apos;ve verified everything works
              </li>
            </ol>
            <h4 className="text-xl font-medium mb-2 text-[var(--foreground)] text-center">
              OAuth Configuration
            </h4>
            <p className="mb-2 text-[var(--muted-foreground)] text-center">
              For social login to work correctly:
            </p>
            <ol className="list-decimal pl-6 text-[var(--muted-foreground)] max-w-md mx-auto">
              <li>Create OAuth applications with the respective providers</li>
              <li>
                Configure the correct redirect URIs:
                <ul className="list-disc pl-6">
                  <li>
                    Google:{" "}
                    <code className="bg-[var(--muted)] px-1 rounded">
                      https://your-domain.com/api/auth/callback/google
                    </code>
                  </li>
                  <li>
                    GitHub:{" "}
                    <code className="bg-[var(--muted)] px-1 rounded">
                      https://your-domain.com/api/auth/callback/github
                    </code>
                  </li>
                  <li>
                    LinkedIn:{" "}
                    <code className="bg-[var(--muted)] px-1 rounded">
                      https://your-domain.com/api/auth/callback/linkedin
                    </code>
                  </li>
                </ul>
              </li>
            </ol>
          </div>
        </div>
        <style jsx>{`
          @keyframes section-reveal {
            0% {
              opacity: 0;
              transform: scale(0.95);
            }
            100% {
              opacity: 1;
              transform: scale(1);
            }
          }
          .animate-section-reveal {
            animation: section-reveal 0.8s ease-out forwards;
          }
          @keyframes badge-pop {
            0% {
              transform: scale(0);
              opacity: 0;
            }
            70% {
              transform: scale(1.2);
              opacity: 1;
            }
            100% {
              transform: scale(1);
              opacity: 1;
            }
          }
          .animate-badge-pop {
            animation: badge-pop 0.5s ease-out forwards;
          }
          @keyframes slide-up {
            0% {
              opacity: 0;
              transform: translateY(50px);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .animate-slide-up {
            animation: slide-up 0.8s ease-out forwards;
          }
          @keyframes slide-left {
            0% {
              opacity: 0;
              transform: translateX(-50px);
            }
            100% {
              opacity: 1;
              transform: translateX(0);
            }
          }
          .animate-slide-left {
            animation: slide-left 0.8s ease-out forwards;
          }
          @keyframes slide-right {
            0% {
              opacity: 0;
              transform: translateX(50px);
            }
            100% {
              opacity: 1;
              transform: translateX(0);
            }
          }
          .animate-slide-right {
            animation: slide-right 0.8s ease-out forwards;
          }
          @keyframes scale-in {
            0% {
              opacity: 0;
              transform: scale(0.9);
            }
            100% {
              opacity: 1;
              transform: scale(1);
            }
          }
          .animate-scale-in {
            animation: scale-in 0.8s ease-out forwards;
          }
          @keyframes table-row {
            0% {
              opacity: 0;
              transform: translateY(10px);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .animate-table-row {
            animation: table-row 0.5s ease-out forwards;
          }
          @keyframes fade-in-delay {
            0% {
              opacity: 0;
              transform: translateY(20px);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .animate-fade-in-delay {
            animation: fade-in-delay 0.8s ease-out forwards;
          }
          @keyframes slide-up-scale {
            0% {
              opacity: 0;
              transform: translateY(50px) scale(0.9);
            }
            100% {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }
          .animate-slide-up-scale {
            animation: slide-up-scale 0.8s ease-out forwards;
          }
        `}</style>
      </section>

      <section
        id="features"
        ref={featuresRef}
        className="py-20 px-4 md:px-8 bg-[var(--muted)]"
      >
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div
              className={`inline-block mb-4 px-3 py-1 bg-[var(--primary)]/20 rounded-full text-[var(--primary)] text-sm font-medium ${
                featuresInView ? "animate-badge-pop" : ""
              }`}
            >
              Key Features
            </div>
            <h2
              className={`text-3xl md:text-4xl font-bold mb-4 ${
                featuresInView ? "animate-section-reveal" : ""
              }`}
            >
              The Best of the Full Stack TypeScript Ecosystem
            </h2>
            <p
              className={`text-lg text-[var(--muted-foreground)] ${
                featuresInView ? "animate-fade-in-delay" : ""
              }`}
              style={{ animationDelay: "0.2s" }}
            >
              ...but ONLY the parts you need
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: "Next.js",
                desc: "Powerful framework for server-rendered React applications",
              },
              {
                title: "React",
                desc: "Build dynamic UIs with the leading JavaScript library",
              },
              {
                title: "Theming Variables",
                desc: "Customizable CSS variables for consistent theming",
              },
              {
                title: "Tailwind CSS",
                desc: "Utility-first CSS framework for rapid styling",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className={`bg-[var(--card)] rounded-xl p-6 shadow-md transition-all duration-500 transform hover:scale-[1.02] hover:shadow-xl group ${
                  featuresInView ? "animate-feature-card" : ""
                }`}
                style={{ animationDelay: `${0.2 * index}s` }}
              >
                <h3 className="text-xl font-semibold mb-2 text-[var(--foreground)]">
                  {feature.title}
                </h3>
                <p className="text-[var(--muted-foreground)]">{feature.desc}</p>
                <div className="h-0.5 bg-[var(--primary)] mt-4 transition-all duration-500 w-0 group-hover:w-full" />
              </div>
            ))}
          </div>
        </div>
        <style jsx>{`
          @keyframes feature-card {
            0% {
              opacity: 0;
              transform: translateY(30px) rotateX(-10deg);
            }
            100% {
              opacity: 1;
              transform: translateY(0) rotateX(0deg);
            }
          }
          .animate-feature-card {
            animation: feature-card 0.8s ease-out forwards;
          }
        `}</style>
      </section>

      <section
        id="contact"
        ref={contactRef}
        className="py-20 px-4 md:px-8 bg-gradient-to-b from-[var(--muted)] to-[var(--background)]"
      >
        <div className="max-w-4xl mx-auto text-center">
          <div>
            <div
              className={`inline-block mb-4 px-3 py-1 bg-[var(--primary)]/20 rounded-full text-[var(--primary)] text-sm font-medium ${
                contactInView ? "animate-badge-pop" : ""
              }`}
            >
              Contact Us
            </div>
            <h2
              className={`text-3xl md:text-4xl font-bold mb-6 ${
                contactInView ? "animate-section-reveal" : ""
              }`}
            >
              Get in Touch
            </h2>
            <p
              className={`text-lg text-[var(--muted-foreground)] mb-8 ${
                contactInView ? "animate-fade-in-delay" : ""
              }`}
              style={{ animationDelay: "0.2s" }}
            >
              Reach out for more information or support.
            </p>
            <p
              className={`text-[var(--foreground)] ${
                contactInView ? "animate-fade-in-delay" : ""
              }`}
              style={{ animationDelay: "0.3s" }}
            >
              Email:{" "}
              <a
                href="mailto:info@aganitha.ai"
                className="text-[var(--primary)] hover:underline transition-colors duration-300"
              >
                info@aganitha.ai
              </a>
              <br />
              Website:{" "}
              <a
                href="https://www.aganitha.ai"
                className="text-[var(--primary)] hover:underline transition-colors duration-300"
              >
                www.aganitha.ai
              </a>
            </p>
            <div
              className={`mt-8 flex justify-center gap-4 ${
                contactInView ? "animate-fade-in-delay" : ""
              }`}
              style={{ animationDelay: "0.5s" }}
            >
              <Link href="https://www.aganitha.ai/company/contact/" target="_blank">
                <Button variant="primary">Contact Now</Button>
              </Link>
              <Link
                href="https://www.aganitha.ai/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline">Visit Website</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <footer
        id="footer"
        ref={footerRef}
        className="py-12 px-4 md:px-8 bg-[var(--background)] text-[var(--foreground)] border-t border-[var(--border)]"
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div
              className={`flex flex-col items-center md:items-start ${
                footerInView ? "animate-fade-in-delay" : ""
              }`}
              style={{ animationDelay: "0.2s" }}
            >
              <img
                src="https://www.aganitha.ai/wp-content/uploads/2023/05/aganitha-logo.png"
                alt="Aganitha Logo"
                className="h-10 mb-4"
              />
              <p className="text-sm text-[var(--muted-foreground)] text-center md:text-left">
                Empowering innovation through AI and technology.
              </p>
            </div>

            <div
              className={`flex flex-col items-center md:items-start ${
                footerInView ? "animate-fade-in-delay" : ""
              }`}
              style={{ animationDelay: "0.4s" }}
            >
              <h3 className="text-lg font-semibold mb-4 text-[var(--foreground)]">
                Contact Us
              </h3>
              <ul className="space-y-2 text-[var(--muted-foreground)]">
                <li className="flex items-center">
                  <Mail className="h-5 w-5 mr-2 text-[var(--primary)]" />
                  <a
                    href="mailto:info@aganitha.ai"
                    className="hover:text-[var(--primary)] transition-colors duration-300"
                  >
                    info@aganitha.ai
                  </a>
                </li>
                <li className="flex items-center">
                  <Phone className="h-5 w-5 mr-2 text-[var(--primary)]" />
                  <span>+91-123-456-7890</span>
                </li>
                <li className="flex items-center">
                  <MapPin className="h-5 w-5 mr-2 text-[var(--primary)]" />
                  <span>Hyderabad, Telangana, India</span>
                </li>
              </ul>
            </div>

            <div
              className={`flex flex-col items-center md:items-start ${
                footerInView ? "animate-fade-in-delay" : ""
              }`}
              style={{ animationDelay: "0.6s" }}
            >
              <h3 className="text-lg font-semibold mb-4 text-[var(--foreground)]">
                Follow Us
              </h3>
              <div className="flex space-x-4">
                <a
                  href="https://www.linkedin.com/company/aganitha"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--muted-foreground)] hover:text-[var(--primary)] transition-colors duration-300"
                >
                  <Linkedin className="h-6 w-6" />
                </a>
                <a
                  href="https://x.com/AganithaAI"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--muted-foreground)] hover:text-[var(--primary)] transition-colors duration-300"
                >
                  <Twitter className="h-6 w-6" />
                </a>
              </div>
            </div>
          </div>
          <div className="mt-8 border-t border-[var(--border)] pt-6 text-center text-[var(--muted-foreground)] text-sm">
            <p>© {new Date().getFullYear()} Aganitha. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}