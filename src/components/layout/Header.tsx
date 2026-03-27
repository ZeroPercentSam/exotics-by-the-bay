"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Phone, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { NAV_LINKS, LOCATIONS } from "@/lib/constants";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-black/90 backdrop-blur-md border-b border-white/5"
            : "bg-transparent"
        }`}
      >
        {/* Top Bar - Phone Numbers */}
        <div
          className={`border-b border-white/5 transition-all duration-300 overflow-hidden ${
            isScrolled ? "max-h-0 opacity-0" : "max-h-12 opacity-100"
          }`}
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-end gap-6 py-2 text-sm text-white/60">
              <a
                href={`tel:${LOCATIONS.tampa.phoneRaw}`}
                className="flex items-center gap-1.5 transition-colors hover:text-gold"
              >
                <Phone className="h-3 w-3" />
                Tampa: {LOCATIONS.tampa.phone}
              </a>
              <a
                href={`tel:${LOCATIONS.miami.phoneRaw}`}
                className="hidden sm:flex items-center gap-1.5 transition-colors hover:text-gold"
              >
                <Phone className="h-3 w-3" />
                Miami: {LOCATIONS.miami.phone}
              </a>
            </div>
          </div>
        </div>

        {/* Main Nav */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between lg:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3">
              <span className="text-gradient-gold text-xl font-bold tracking-tight lg:text-2xl font-heading">
                EXOTICS BY THE BAY
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-8">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-white/70 transition-colors hover:text-gold tracking-wide uppercase"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* CTA Buttons */}
            <div className="hidden lg:flex items-center gap-4">
              <a href={`tel:${LOCATIONS.tampa.phoneRaw}`}>
                <Button
                  variant="outline"
                  className="border-gold/30 text-gold hover:bg-gold/10 hover:border-gold"
                >
                  <Phone className="mr-2 h-4 w-4" />
                  Call Now
                </Button>
              </a>
              <Link href="/fleet">
                <Button className="gold-shimmer bg-gold text-black font-semibold hover:bg-gold-dark">
                  Browse Fleet
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-white"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-lg lg:hidden"
          >
            <motion.nav
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ delay: 0.1 }}
              className="flex flex-col items-center justify-center h-full gap-8"
            >
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.05 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-2xl font-heading font-semibold text-white tracking-wider uppercase hover:text-gold transition-colors"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex flex-col items-center gap-4 mt-8"
              >
                <a href={`tel:${LOCATIONS.tampa.phoneRaw}`}>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-gold/30 text-gold hover:bg-gold/10"
                  >
                    <Phone className="mr-2 h-5 w-5" />
                    Call Now
                  </Button>
                </a>
                <Link href="/fleet" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button
                    size="lg"
                    className="gold-shimmer bg-gold text-black font-semibold"
                  >
                    Browse Fleet
                  </Button>
                </Link>
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
