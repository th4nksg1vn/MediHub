"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";
import Logo from "../../../public/assets/Frame.png";

export default function Header() {
  const pathname = usePathname();

  // Hide header on authentication flows/pages and dashboard/dev routes
  const hideOn = ["/login", "/register", "/onboarding", "/dashboard", "/dev"];
  if (pathname && hideOn.some((p) => pathname.startsWith(p))) return null;

  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [developersOpen, setDevelopersOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!event.target) return;
      const target = event.target as HTMLElement;
      
      if (developersOpen && !target.closest('.developers-dropdown')) {
        setDevelopersOpen(false);
      }
      if (solutionsOpen && !target.closest('.solutions-dropdown')) {
        setSolutionsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [developersOpen, solutionsOpen]);

  return (
    <header
      className={` bg-[#003DB8] text-white shadow-md h-16`}
    >
      <div className="flex items-center px-6 max-w-7xl mx-auto gap-4 h-full">
        {/* Left: Logo */}
        <div className="flex items-center gap-2">
          <Link href="/" className="hh-logo-link flex items-center no-underline">
            <Image src={Logo} alt="MediHub Logo" height={32} width={120} className="mr-2 h-8 w-auto" priority />
          </Link>
        </div>

        {/* Middle: Nav links (centered) */}
        <div className="flex-1 flex justify-center">
          <nav className="hh-nav flex items-center gap-6">
            <div className="hh-nav-links flex items-center gap-6">
              <Link href="#hero" className="hh-nav-link">
                Home
              </Link>
              <Link href="/about" className="hh-nav-link">
                About
              </Link>

              {/* Solutions Dropdown */}
              <div className="relative inline-block text-left solutions-dropdown">
                <button
                  type="button"
                  className="hh-nav-link inline-flex items-center gap-2"
                  onClick={() => setSolutionsOpen(!solutionsOpen)}
                >
                  Solutions
                  <svg
                    className={`h-4 w-4 transition-transform ${solutionsOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {solutionsOpen && (
                  <div className="absolute left-0 mt-2 w-80 origin-top-left rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="p-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h3 className="font-semibold text-slate-900 mb-2">Skill Level</h3>
                          <ul className="space-y-2">
                            <li>
                              <Link href="/solutions/ai-builders" className="text-slate-600 hover:text-slate-900 block">
                                AI Builders
                              </Link>
                            </li>
                            <li>
                              <Link href="/solutions/no-code" className="text-slate-600 hover:text-slate-900 block">
                                No Code
                              </Link>
                            </li>
                            <li>
                              <Link href="/solutions/beginners" className="text-slate-600 hover:text-slate-900 block">
                                Beginners
                              </Link>
                            </li>
                            <li>
                              <Link href="/solutions/developers" className="text-slate-600 hover:text-slate-900 block">
                                Developers
                              </Link>
                            </li>
                            <li>
                              <Link href="/solutions/postgres-devs" className="text-slate-600 hover:text-slate-900 block">
                                Postgres Devs
                              </Link>
                            </li>
                            <li>
                              <Link href="/solutions/vibe-coders" className="text-slate-600 hover:text-slate-900 block">
                                Vibe Coders
                              </Link>
                            </li>
                          </ul>
                        </div>

                        <div>
                          <h3 className="font-semibold text-slate-900 mb-2">Who it&apos;s for</h3>
                          <ul className="space-y-2">
                            <li>
                              <Link href="/solutions/researchers" className="text-slate-600 hover:text-slate-900 block">
                                Researchers
                              </Link>
                            </li>
                            <li>
                              <Link href="/solutions/companies" className="text-slate-600 hover:text-slate-900 block">
                                Companies
                              </Link>
                            </li>
                            <li>
                              <Link href="/solutions/medical-institutions" className="text-slate-600 hover:text-slate-900 block">
                                Medical Institutions
                              </Link>
                            </li>
                            <li>
                              <Link href="/solutions/healthcare-providers" className="text-slate-600 hover:text-slate-900 block">
                                Healthcare Providers
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Developers Dropdown */}
              <div className="relative inline-block text-left developers-dropdown">
                <button
                  type="button"
                  className="hh-nav-link inline-flex items-center gap-2"
                  onClick={() => setDevelopersOpen(!developersOpen)}
                >
                  Developers
                  <svg
                    className={`h-4 w-4 transition-transform ${developersOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {developersOpen && (
                  <div className="absolute left-0 mt-2 w-90 origin-top-left rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="p-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h3 className="font-semibold text-slate-900 mb-2">Developers</h3>
                          <ul className="space-y-2">
                            <li>
                              <Link href="/docs" className="text-slate-600 hover:text-slate-900 block">
                                Documentation
                              </Link>
                            </li>
                            <li>
                              <Link href="/integrations" className="text-slate-600 hover:text-slate-900 block">
                                Integrations
                              </Link>
                            </li>
                            <li>
                              <Link href="/ui" className="text-slate-600 hover:text-slate-900 block">
                                MediHub UI
                              </Link>
                            </li>
                            <li>
                              <Link href="/changelog" className="text-slate-600 hover:text-slate-900 block">
                                Changelog
                              </Link>
                            </li>
                            <li>
                              <Link href="/support" className="text-slate-600 hover:text-slate-900 block">
                                Support
                              </Link>
                            </li>
                          </ul>
                        </div>
                        <div>
                          <h3 className="font-semibold text-slate-900 mb-2">Resources</h3>
                          <ul className="space-y-2">
                            <li>
                              <Link href="https://github.com/your-org/health-hack" className="text-slate-600 hover:text-slate-900 block">
                                Open Source
                              </Link>
                            </li>
                            <li>
                              <Link href="https://github.com/your-org/health-hack/discussions" className="text-slate-600 hover:text-slate-900 block">
                                GitHub Discussions
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <Link href="/research" className="hh-nav-link">
                Research
              </Link>
            </div>
          </nav>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-4">
          <ThemeToggle />

          <select
            aria-label="Language"
            defaultValue="en"
            className="hh-lang-select"
            onChange={(e) => {
              // placeholder: implement i18n routing
              void e;
            }}
          >
            <option value="en">EN</option>
            <option value="fr">FR</option>
          </select>

          <Link href="/login" className="hh-btn hh-btn-secondary">
            Login
          </Link>
          <Link href="/register" className="hh-btn hh-btn-primary">
            Get Started
          </Link>

          <button
            className="hh-hamburger"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? "✕" : "☰"}
          </button>
        </div>
        </div>

      {/* Mobile sheet */}
      {open && (
        <div className="hh-mobile-sheet">
          <div className="hh-mobile-links">
            <Link href="#hero" onClick={() => setOpen(false)}>
              Home
            </Link>
            <Link href="/about" onClick={() => setOpen(false)}>
              About
            </Link>
            <Link href="/solutions" onClick={() => setOpen(false)}>
              Solutions
            </Link>
            <Link href="/developers" onClick={() => setOpen(false)}>
              Developers
            </Link>
            <Link href="/research" onClick={() => setOpen(false)}>
              Research
            </Link>
            <Link
              href="/login"
              className="hh-btn hh-btn-secondary"
              onClick={() => setOpen(false)}
            >
              Login
            </Link>
            <Link
              href="/register"
              className="hh-btn hh-btn-primary"
              onClick={() => setOpen(false)}
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
