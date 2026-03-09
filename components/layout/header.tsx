'use client';

import Link from 'next/link';
import { useState, useEffect, useRef, useCallback } from 'react';
import { Menu, X, ChevronDown, Phone } from 'lucide-react';
import { Container } from './container';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/ui/logo';

const services = [
  { name: 'The Osprey', href: '/services/osprey', description: '62ft Striker - Up to 13 guests' },
  { name: 'White Nights', href: '/services/white-nights', description: '58ft Hatteras - Up to 12 guests' },
  { name: 'Relentless', href: '/services/relentless', description: '45ft Catamaran - Up to 15 guests' },
  { name: 'At-Home Memorial', href: '/services/at-home', description: 'Mail-in service - $400' },
];

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Services', href: '#', dropdown: services },
  { name: 'About', href: '/about' },
  { name: 'Blog', href: '/blog' },
  { name: 'Give Back', href: '/give-back' },
  { name: 'Contact', href: '/contact' },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const mobileToggleRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on Escape key (WCAG 2.1.1 Keyboard)
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      if (servicesOpen) {
        setServicesOpen(false);
      }
      if (mobileMenuOpen) {
        setMobileMenuOpen(false);
        mobileToggleRef.current?.focus();
      }
    }
  }, [mobileMenuOpen, servicesOpen]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // Lock body scroll when mobile menu is open (prevents background scrolling on iOS)
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setServicesOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'glass-light shadow-lg'
          : 'bg-transparent'
      }`}
      role="banner"
    >
      <Container>
        <nav className="flex items-center justify-between py-4" aria-label="Main navigation">
          <div className="flex lg:flex-1">
            <Logo variant="dark" size="md" />
          </div>

          <div className="flex lg:hidden">
            <button
              ref={mobileToggleRef}
              type="button"
              className="inline-flex items-center justify-center rounded-lg p-2.5 text-foreground hover:bg-secondary/50 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
            >
              <span className="sr-only">
                {mobileMenuOpen ? 'Close menu' : 'Open menu'}
              </span>
              {mobileMenuOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>

          {/* Desktop navigation */}
          <div className="hidden lg:flex lg:gap-x-8">
            {navigation.map((item) => (
              <div key={item.name} className="relative">
                {item.dropdown ? (
                  <div
                    ref={dropdownRef}
                    className="relative"
                    onMouseEnter={() => setServicesOpen(true)}
                    onMouseLeave={() => setServicesOpen(false)}
                  >
                    <button
                      aria-expanded={servicesOpen}
                      aria-haspopup="true"
                      aria-controls="services-dropdown"
                      onClick={() => setServicesOpen(!servicesOpen)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          setServicesOpen(!servicesOpen);
                        }
                        if (e.key === 'ArrowDown' && !servicesOpen) {
                          e.preventDefault();
                          setServicesOpen(true);
                        }
                      }}
                      className="flex items-center gap-1 text-sm font-medium leading-6 text-foreground hover:text-gold transition-colors py-2"
                    >
                      {item.name}
                      <ChevronDown
                        className={`h-4 w-4 transition-transform duration-200 ${
                          servicesOpen ? 'rotate-180' : ''
                        }`}
                        aria-hidden="true"
                      />
                    </button>
                    {servicesOpen && (
                      <div
                        id="services-dropdown"
                        className="absolute left-1/2 -translate-x-1/2 top-full pt-2 w-72"
                        role="menu"
                        aria-label="Services submenu"
                      >
                        <div className="glass-light rounded-xl p-2 shadow-xl">
                          {item.dropdown.map((service) => (
                            <Link
                              key={service.name}
                              href={service.href}
                              className="block px-4 py-3 rounded-lg hover:bg-gold/10 transition-colors group"
                              role="menuitem"
                              onClick={() => setServicesOpen(false)}
                            >
                              <span className="block text-sm font-semibold text-foreground group-hover:text-gold transition-colors">
                                {service.name}
                              </span>
                              <span className="block text-xs text-muted-foreground mt-0.5">
                                {service.description}
                              </span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className="text-sm font-medium leading-6 text-foreground hover:text-gold transition-colors py-2"
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </div>

          <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-4 lg:items-center">
            <a
              href="tel:619-928-9160"
              aria-label="Call us at 619-928-9160"
              className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-gold transition-colors"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              <span>619-928-9160</span>
            </a>
            <Button asChild className="btn-gold border-0 rounded-full px-6">
              <Link href="/contact">Get Started</Link>
            </Button>
          </div>
        </nav>

        {/* Mobile menu */}
        <div
          id="mobile-menu"
          className={`lg:hidden glass-light rounded-2xl mb-4 p-4 transition-all duration-300 ease-in-out overflow-hidden ${
            mobileMenuOpen
              ? 'max-h-[80vh] opacity-100 scale-100 overflow-y-auto'
              : 'max-h-0 opacity-0 scale-95 p-0 mb-0 border-0'
          }`}
          aria-hidden={!mobileMenuOpen}
          role="navigation"
          aria-label="Mobile navigation"
        >
          {mobileMenuOpen && (
            <div className="space-y-1">
              {navigation.map((item) => (
                <div key={item.name}>
                  {item.dropdown ? (
                    <div>
                      <button
                        onClick={() => setServicesOpen(!servicesOpen)}
                        aria-expanded={servicesOpen}
                        aria-haspopup="true"
                        className="flex w-full items-center justify-between rounded-lg px-4 py-3 text-base font-semibold text-foreground hover:bg-gold/10 transition-colors"
                      >
                        {item.name}
                        <ChevronDown
                          className={`h-5 w-5 transition-transform duration-200 ${
                            servicesOpen ? 'rotate-180' : ''
                          }`}
                          aria-hidden="true"
                        />
                      </button>
                      {servicesOpen && (
                        <div className="ml-4 mt-1 space-y-1 border-l-2 border-gold/30 pl-4" role="group" aria-label="Service vessels">
                          {item.dropdown.map((service) => (
                            <Link
                              key={service.name}
                              href={service.href}
                              className="block rounded-lg px-4 py-2 text-sm text-foreground hover:bg-gold/10 transition-colors"
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              {service.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      className="block rounded-lg px-4 py-3 text-base font-semibold text-foreground hover:bg-gold/10 transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
              <div className="pt-4 space-y-3">
                <a
                  href="tel:619-928-9160"
                  aria-label="Call us at 619-928-9160"
                  className="flex items-center justify-center gap-2 text-base font-medium text-muted-foreground"
                >
                  <Phone className="h-5 w-5" aria-hidden="true" />
                  <span>619-928-9160</span>
                </a>
                <Button asChild className="w-full btn-gold border-0 rounded-full">
                  <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>
                    Get Started
                  </Link>
                </Button>
              </div>
            </div>
          )}
        </div>
      </Container>
    </header>
  );
}
