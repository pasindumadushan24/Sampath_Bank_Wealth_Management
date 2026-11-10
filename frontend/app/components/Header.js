'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import LanguageSwitcher from './LanguageSwitcher';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/products', label: 'Products' },
  { href: '/apply', label: 'Apply Online' },
  { href: '/insights', label: 'Market Insights' },
  { href: '/calculators', label: 'Calculators' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const isHome = pathname === '/';

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || !isHome || menuOpen
          ? 'bg-white shadow-md'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#1B2B5B] to-[#2a3f7a] flex items-center justify-center">
              <span className="text-[#C8961E] text-xl font-bold">S</span>
            </div>
            <div>
              <span
                className={`font-bold text-lg leading-tight block transition-colors ${
                  scrolled || !isHome || menuOpen ? 'text-[#1B2B5B]' : 'text-white'
                }`}
              >
                Sampath
              </span>
              <span className="text-[#C8961E] text-xs font-semibold uppercase tracking-wider leading-tight block">
                Wealth Management
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-semibold transition-colors hover:text-[#C8961E] relative group ${
                  pathname === link.href
                    ? 'text-[#C8961E]'
                    : scrolled || !isHome
                    ? 'text-gray-700'
                    : 'text-white'
                }`}
              >
                {link.label}
                <span
                  className={`absolute -bottom-1 left-0 h-0.5 bg-[#C8961E] transition-all duration-300 ${
                    pathname === link.href ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                ></span>
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="hidden lg:flex items-center gap-4">
            <LanguageSwitcher light={!scrolled && isHome} />
            <Link
              href="/appointments"
              className="bg-[#C8961E] hover:bg-[#a07818] text-white font-bold text-sm px-5 py-2.5 rounded-xl transition-all duration-300 hover:shadow-lg"
            >
              Book Appointment
            </Link>
          </div>

          {/* Hamburger */}
          <button
            className={`lg:hidden p-2 rounded-lg transition-colors ${
              scrolled || !isHome || menuOpen ? 'text-[#1B2B5B]' : 'text-white'
            }`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <div className="w-6 h-5 flex flex-col justify-between">
              <span className={`block h-0.5 w-full bg-current transition-transform origin-center ${menuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
              <span className={`block h-0.5 w-full bg-current transition-opacity ${menuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`block h-0.5 w-full bg-current transition-transform origin-center ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 shadow-xl">
          <div className="max-w-7xl mx-auto px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${
                  pathname === link.href
                    ? 'bg-[#1B2B5B] text-white'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-[#C8961E]'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-3 pb-1 flex items-center justify-between gap-3">
              <LanguageSwitcher />
              <Link
                href="/appointments"
                className="flex-1 text-center bg-[#C8961E] hover:bg-[#a07818] text-white font-bold text-sm px-5 py-3 rounded-xl transition-colors"
              >
                Book Appointment
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
