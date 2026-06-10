/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Utensils, Calendar, Phone, Clock } from 'lucide-react';
import { RESTAURANT_INFO } from '../data';

interface HeaderProps {
  activeView: string;
  setActiveView: (view: string) => void;
  onOpenPromo: () => void;
}

export default function Header({ activeView, setActiveView, onOpenPromo }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { key: 'home', label: 'Home' },
    { key: 'menu', label: 'Menu' },
    { key: 'about', label: 'Chi Siamo' },
    { key: 'booking', label: 'Prenota' },
    { key: 'contact', label: 'Contatti' },
  ];

  const handleNavClick = (viewKey: string) => {
    setActiveView(viewKey);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Top micro-banner for alerts/specials */}
      <div className="bg-brand-dark text-brand-cream border-b border-brand-gold/20 text-xs py-2 px-4 flex justify-between items-center z-50 relative">
        <div className="flex items-center space-x-4 max-md:hidden text-xs">
          <span className="flex items-center text-brand-gold font-mono">
            <Phone className="w-3.5 h-3.5 mr-1" /> {RESTAURANT_INFO.phone}
          </span>
          <span className="flex items-center text-gray-300 font-mono">
            <Clock className="w-3.5 h-3.5 mr-1" /> Mar-Dom: 19:00 - 23:30
          </span>
        </div>
        <div className="text-center mx-auto md:mx-0 text-brand-gold-light tracking-wide flex items-center gap-1.5">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
          <span>Serata Speciale Giro Pizza del Giovedì!</span>
          <button 
            onClick={onOpenPromo}
            className="underline font-semibold ml-2 hover:text-brand-cream cursor-pointer transition-colors"
          >
            Scopri di più &rarr;
          </button>
        </div>
      </div>

      <header className="sticky top-0 z-40 bg-brand-cream/95 backdrop-blur-md border-b border-brand-sand transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div 
              className="flex items-center space-x-2 cursor-pointer group"
              onClick={() => handleNavClick('home')}
              id="header-logo-container"
            >
              <div>
                <span className="font-serif text-3xl italic tracking-tighter text-brand-terracotta block leading-none select-none">
                  La Pendola
                </span>
                <span className="text-[9px] tracking-[0.25em] font-sans uppercase text-brand-dark/50 font-bold block mt-1">
                  dal 1982 • cremona
                </span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex gap-1">
              {navItems.map((item) => (
                <button
                  key={item.key}
                  id={`nav-desktop-${item.key}`}
                  onClick={() => handleNavClick(item.key)}
                  className={`relative px-3.5 py-2 text-[11px] uppercase tracking-[0.2em] font-bold transition-colors cursor-pointer ${
                    activeView === item.key 
                      ? 'text-brand-terracotta font-extrabold' 
                      : 'text-brand-dark/60 hover:text-brand-terracotta'
                  }`}
                >
                  {item.label}
                  {activeView === item.key && (
                    <motion.div
                      layoutId="activeNavLine"
                      className="absolute bottom-0 left-3.5 right-3.5 h-0.5 bg-brand-terracotta"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                </button>
              ))}
            </nav>

            {/* Action Button & Mobile toggle */}
            <div className="flex items-center space-x-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleNavClick('booking')}
                id="header-book-button"
                className="hidden sm:flex items-center space-x-2 bg-brand-olive hover:bg-brand-olive-light text-white px-7 py-3 rounded-full text-[11px] uppercase tracking-[0.2em] font-bold transition-all cursor-pointer"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Prenota un Tavolo</span>
              </motion.button>

              {/* Mobile menu button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                id="header-mobile-toggle"
                className="p-2 rounded-full text-brand-dark hover:bg-brand-sand focus:outline-none md:hidden cursor-pointer"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu panel */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden border-t border-brand-sand bg-brand-cream overflow-hidden shadow-sm"
              id="mobile-nav-panel"
            >
              <div className="px-4 pt-2 pb-6 space-y-1">
                {navItems.map((item) => (
                  <button
                    key={item.key}
                    id={`nav-mobile-${item.key}`}
                    onClick={() => handleNavClick(item.key)}
                    className={`block w-full text-left px-4 py-3 rounded-lg text-xs uppercase tracking-[0.15em] font-bold transition-colors ${
                      activeView === item.key
                        ? 'bg-brand-terracotta text-white'
                        : 'text-brand-dark/70 hover:bg-brand-sand hover:text-brand-dark'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
                
                <div className="pt-4 px-4">
                  <button
                    onClick={() => handleNavClick('booking')}
                    className="w-full flex items-center justify-center space-x-2 bg-brand-olive hover:bg-brand-olive-light text-white py-3.5 rounded-full text-[11px] uppercase tracking-[0.2em] font-bold"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Prenota un Tavolo</span>
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
