/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Flame, Calendar, Star, Sparkles } from 'lucide-react';
import { PROMOTIONS } from '../data';

interface PromoPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToBooking: () => void;
}

export default function PromoPopup({ isOpen, onClose, onNavigateToBooking }: PromoPopupProps) {
  const promo = PROMOTIONS[0]; // Giro Pizza e Birra Artigianale

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm select-none" id="promo-popup-modal">
          {/* Backdrop click dismisses */}
          <div className="absolute inset-0 cursor-pointer" onClick={onClose}></div>

          {/* Animated Card Container */}
          <motion.div
            initial={{ scale: 0.92, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.92, opacity: 0, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-brand-cream border border-brand-gold/30 max-w-lg w-full rounded-3xl overflow-hidden shadow-2xl relative cursor-default"
          >
            {/* Top decorative visual frame */}
            <div className="h-44 relative bg-gray-900 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=600"
                alt="Pizza Giro Pizza Giovedì"
                className="w-full h-full object-cover opacity-85"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-cream via-transparent to-transparent"></div>
              
              {/* Badge */}
              <div className="absolute top-5 left-5 bg-brand-terracotta text-brand-cream text-[10px] font-bold uppercase font-mono tracking-widest px-3 py-1.5 rounded-full shadow-md">
                {promo.badge}
              </div>
            </div>

            {/* Content body detail */}
            <div className="p-8 text-left space-y-4">
              <span className="flex items-center space-x-1 font-mono text-[11px] font-bold text-brand-olive uppercase tracking-[0.2em]">
                <Flame className="w-4 h-4 text-brand-terracotta fill-brand-terracotta animate-pulse" />
                <span>Evento Speciale &bull; La Pendola</span>
              </span>

              <h3 className="font-serif text-2xl sm:text-3xl font-extrabold text-brand-dark leading-tight">
                {promo.title}
              </h3>

              <p className="text-gray-600 text-sm leading-relaxed">
                {promo.description}
              </p>

              {/* Offer attributes */}
              <div className="bg-brand-dark/5 p-4 rounded-xl space-y-2 border border-brand-terracotta/5">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="text-gray-500">Scadenza Offerta:</span>
                  <span className="text-brand-terracotta font-mono uppercase tracking-wide">{promo.validUntil}</span>
                </div>
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="text-gray-500">Coperto Inclusivo:</span>
                  <span className="text-emerald-700 font-bold uppercase tracking-wide">Incluso nel prezzo</span>
                </div>
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="px-8 pb-8 pt-2 flex flex-col sm:flex-row gap-3">
              <button
                onClick={onNavigateToBooking}
                id="promo-accept-button"
                className="flex-1 flex items-center justify-center space-x-2 bg-brand-terracotta hover:bg-brand-terracotta-dark text-white font-bold font-serif py-3 px-6 rounded-xl transition-all shadow-md shadow-brand-terracotta/15 cursor-pointer text-sm tracking-wide"
              >
                <Calendar className="w-4 h-4" />
                <span>Sì, Prenota un Tavolo</span>
              </button>
              
              <button
                onClick={onClose}
                id="promo-dismiss-button"
                className="px-6 py-3 border border-gray-200 hover:border-gray-400 text-gray-500 hover:text-brand-dark rounded-xl text-center text-sm font-semibold cursor-pointer "
              >
                Solo per stavolta, no grazie
              </button>
            </div>

            {/* Close Cross Button Top-Right absolute */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-brand-dark/30 hover:bg-brand-dark/50 text-white cursor-pointer transition-colors"
              id="promo-close-cross-btn"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
