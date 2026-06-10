/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Utensils, Phone, Mail, MapPin, Instagram, Facebook, ArrowUpRight } from 'lucide-react';
import { RESTAURANT_INFO } from '../data';

interface FooterProps {
  setActiveView: (view: string) => void;
}

export default function Footer({ setActiveView }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const handleLinkClick = (viewKey: string) => {
    setActiveView(viewKey);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-brand-dark text-brand-cream pt-16 pb-8 border-t border-brand-gold/10 relative overflow-hidden" id="main-footer">
      {/* Decorative olive branch silhouette overlay if any */}
      <div className="absolute right-0 bottom-0 w-96 h-96 bg-[radial-gradient(circle_at_bottom_right,rgba(93,107,84,0.1),transparent_50%)] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2.5">
              <div className="bg-brand-terracotta text-brand-cream p-2.5 rounded-xl">
                <Utensils className="w-5 h-5" />
              </div>
              <span className="font-serif text-2xl font-bold text-brand-cream tracking-tight">
                La Pendola
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              La storica pizzeria e ristorante di Cremona. Dal 1991 offriamo pizze sottili, croccanti ed ingredienti ricchi e sani, affiancati dai piatti più amati della tradizione italiana.
            </p>
            <div className="flex space-x-4 pt-2">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noreferrer" 
                className="w-9 h-9 rounded-lg bg-gray-800 hover:bg-brand-terracotta hover:text-brand-cream flex items-center justify-center transition-colors text-brand-gold-light"
                id="social-fb-footer"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noreferrer" 
                className="w-9 h-9 rounded-lg bg-gray-800 hover:bg-brand-terracotta hover:text-brand-cream flex items-center justify-center transition-colors text-brand-gold-light"
                id="social-ig-footer"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-lg font-semibold text-brand-gold mb-5 tracking-wide">
              Link Rapidi
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <button 
                  onClick={() => handleLinkClick('home')} 
                  className="text-gray-400 hover:text-brand-gold transition-colors text-left flex items-center group cursor-pointer"
                >
                  <ArrowUpRight className="w-3.5 h-3.5 mr-1.5 opacity-0 group-hover:opacity-100 transition-all text-brand-gold" />
                  Homepage
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleLinkClick('menu')} 
                  className="text-gray-400 hover:text-brand-gold transition-colors text-left flex items-center group cursor-pointer"
                >
                  <ArrowUpRight className="w-3.5 h-3.5 mr-1.5 opacity-0 group-hover:opacity-100 transition-all text-brand-gold" />
                  Menu Completo
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleLinkClick('about')} 
                  className="text-gray-400 hover:text-brand-gold transition-colors text-left flex items-center group cursor-pointer"
                >
                  <ArrowUpRight className="w-3.5 h-3.5 mr-1.5 opacity-0 group-hover:opacity-100 transition-all text-brand-gold" />
                  La nostra storia
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleLinkClick('booking')} 
                  className="text-gray-400 hover:text-brand-gold transition-colors text-left flex items-center group cursor-pointer"
                >
                  <ArrowUpRight className="w-3.5 h-3.5 mr-1.5 opacity-0 group-hover:opacity-100 transition-all text-brand-gold" />
                  Prenota Tavolo
                </button>
              </li>
            </ul>
          </div>

          {/* Opening Hours */}
          <div>
            <h4 className="font-serif text-lg font-semibold text-brand-gold mb-5 tracking-wide">
              Orari di Apertura
            </h4>
            <ul className="space-y-2.5 text-xs text-gray-400 font-mono">
              {RESTAURANT_INFO.hours.map((item, idx) => (
                <li key={idx} className="flex justify-between border-b border-gray-800/60 pb-1.5">
                  <span className="font-sans text-sm text-gray-300">{item.days}</span>
                  <span className="text-brand-gold-light text-sm">{item.hours || item.status}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="font-serif text-lg font-semibold text-brand-gold mb-5 tracking-wide">
              Contatti
            </h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start space-x-3 text-gray-400">
                <MapPin className="w-5 h-5 text-brand-terracotta shrink-0 mt-0.5" />
                <span>
                  Via Luigi Voghera, 3,<br />
                  26100 Cremona CR
                </span>
              </li>
              <li className="flex items-center space-x-3 text-gray-400">
                <Phone className="w-5 h-5 text-brand-terracotta shrink-0" />
                <a 
                  href={`tel:${RESTAURANT_INFO.phone}`} 
                  className="hover:text-brand-gold transition-colors font-mono text-gray-300"
                >
                  {RESTAURANT_INFO.phone}
                </a>
              </li>
              <li className="flex items-center space-x-3 text-gray-400">
                <Mail className="w-5 h-5 text-brand-terracotta shrink-0" />
                <a 
                  href={`mailto:${RESTAURANT_INFO.email}`} 
                  className="hover:text-brand-gold transition-colors text-gray-300"
                >
                  {RESTAURANT_INFO.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider and copyright */}
        <div className="border-t border-gray-800 mt-14 pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-gray-500">
          <p>&copy; {currentYear} Ristorante Pizzeria La Pendola s.r.l. Tutti i diritti riservati.</p>
          <div className="flex space-x-6 mt-4 md:mt-0 font-medium">
            <span className="hover:text-brand-gold transition-colors cursor-pointer">Privacy Policy</span>
            <span className="hover:text-brand-gold transition-colors cursor-pointer">Cookie Settings</span>
            <span className="hover:text-brand-gold transition-colors cursor-pointer" onClick={() => handleLinkClick('contact')}>Dove Siamo</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
