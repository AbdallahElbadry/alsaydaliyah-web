"use client";

import { useState } from "react";
import Image from "next/image";
import type { Locale } from "../dictionaries";
import LanguageSwitcher from "./LanguageSwitcher";

interface NavbarProps {
  lang: Locale;
  dict: {
    episodes: string;
    about: string;
    contact: string;
    listenNow: string;
  };
}

export default function Navbar({ lang, dict }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const isArabic = lang === "ar";

  return (
    <nav className="glass-nav fixed top-0 left-0 right-0 z-50">
      <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
        {/* Brand/Logo */}
        <a href={`/${lang}`} className="flex items-center gap-2" id="nav-brand" onClick={closeMenu}>
          <Image
            src="/logo-transparent.png"
            alt={isArabic ? "الصيدلية بودكاست" : "Alsaydaliyah"}
            width={141}
            height={60}
            className="h-10 sm:h-11 md:h-12 w-auto object-contain"
            priority
          />
        </a>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-8">
          <a
            href="#episodes"
            className="text-sm text-muted hover:text-foreground transition-colors duration-200"
            id="nav-episodes"
          >
            {dict.episodes}
          </a>
          <a
            href="#about"
            className="text-sm text-muted hover:text-foreground transition-colors duration-200"
            id="nav-about"
          >
            {dict.about}
          </a>
          <a
            href="#contact"
            className="text-sm text-muted hover:text-foreground transition-colors duration-200"
            id="nav-contact"
          >
            {dict.contact}
          </a>
        </div>

        {/* Desktop CTA + Lang Switcher & Mobile Menu Toggle */}
        <div className="flex items-center gap-3">
          {/* Always show language switcher on the navbar */}
          <LanguageSwitcher lang={lang} />

          {/* Desktop Listen Now CTA */}
          <span className="hidden md:inline-flex">
            <a
              href="#episodes"
              className="btn-accent !py-2.5 !px-5 !text-sm"
              id="nav-listen-cta"
            >
              {dict.listenNow}
            </a>
          </span>

          {/* Mobile Hamburger button */}
          <button
            onClick={toggleMenu}
            className="md:hidden flex items-center justify-center p-2 rounded-lg bg-glass border border-glass-border text-foreground hover:bg-glass-hover focus:outline-none transition-all duration-200"
            aria-label="Toggle navigation menu"
            aria-expanded={isOpen}
          >
            <svg
              className="w-5 h-5 transition-transform duration-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <div
        className={`md:hidden absolute left-0 right-0 bg-background/95 border-b border-glass-border backdrop-blur-lg transition-all duration-300 ease-in-out overflow-hidden z-40 ${
          isOpen ? "max-h-[300px] opacity-100 py-6 px-6" : "max-h-0 opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col gap-4">
          <a
            href="#episodes"
            onClick={closeMenu}
            className="text-sm font-medium py-2 border-b border-glass-border/50 text-muted hover:text-foreground transition-colors duration-200"
          >
            {dict.episodes}
          </a>
          <a
            href="#about"
            onClick={closeMenu}
            className="text-sm font-medium py-2 border-b border-glass-border/50 text-muted hover:text-foreground transition-colors duration-200"
          >
            {dict.about}
          </a>
          <a
            href="#contact"
            onClick={closeMenu}
            className="text-sm font-medium py-2 border-b border-glass-border/50 text-muted hover:text-foreground transition-colors duration-200"
          >
            {dict.contact}
          </a>

          {/* Mobile CTA (visible only on mobile viewports under 768px) */}
          <span className="md:hidden w-full flex">
            <a
              href="#episodes"
              onClick={closeMenu}
              className="btn-accent justify-center w-full text-center mt-2"
            >
              {dict.listenNow}
            </a>
          </span>
        </div>
      </div>
    </nav>
  );
}
