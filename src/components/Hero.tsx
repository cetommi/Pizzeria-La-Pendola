/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Calendar, Compass, Star, Award, Heart, ShieldCheck, Flame } from 'lucide-react';
import { RESTAURANT_INFO } from '../data';

interface HeroProps {
  onNav: (view: string) => void;
  onOpenPromo: () => void;
}

export default function Hero({ onNav, onOpenPromo }: HeroProps) {
  return (
    <div className="relative overflow-hidden bg-brand-cream" id="hero-section">
      {/* Absolute Decorative patterns */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-[radial-gradient(circle_at_top_left,rgba(192,92,62,0.06),transparent_50%)] pointer-events-none"></div>
      <div className="absolute bottom-20 right-0 w-96 h-96 bg-[radial-gradient(circle_at_bottom_right,rgba(93,107,84,0.08),transparent_50%)] pointer-events-none"></div>

      {/* Main Hero Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-20 md:pt-16 md:pb-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Text Content */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Real Rating Badge */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center space-x-2 bg-brand-olive/10 border border-brand-olive/20 text-brand-olive px-4 py-2 rounded-full text-[11px] font-bold uppercase tracking-[0.2em]"
            >
              <Star className="w-3.5 h-3.5 text-brand-gold fill-brand-gold animate-bounce" />
              <span>Pizzeria Consigliata a Cremona</span>
              <span className="text-brand-dark/40 font-normal">|</span>
              <span className="flex items-center text-brand-gold">
                {RESTAURANT_INFO.rating} <span className="text-brand-dark/70 ml-1">({RESTAURANT_INFO.reviewCount} recensioni)</span>
              </span>
            </motion.div>

            {/* Slogan & Title */}
            <div className="space-y-4">
              <div className="text-brand-terracotta font-serif italic text-xl">Dal 1982 a Cremona</div>
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="font-serif text-5xl sm:text-7xl lg:text-8xl leading-[0.95] tracking-tight text-brand-dark mb-4"
              >
                Tradizione <br />
                e <span className="italic font-normal font-serif">Passione</span>
              </motion.h1>

              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-[#4a4a4a] text-sm sm:text-base max-w-xl leading-relaxed"
              >
                La leggendaria pizza sottilissima di <strong className="text-brand-dark">La Pendola</strong> con lievitazione naturale di 72 ore. Scopri anche i celebri <strong className="text-brand-dark">marubini</strong> fatti a mano e i caldi dolci della tradizione lombarda serviti con cura editoriale nel cuore della città.
              </motion.p>
            </div>

            {/* Horizontal styling separator rule */}
            <div className="flex gap-6 items-center pt-2">
              <div className="w-24 h-px bg-brand-terracotta"></div>
              <span className="text-[11px] uppercase tracking-[0.3em] font-bold text-brand-dark">Scopri la nostra pizza</span>
            </div>

            {/* Call to Actions */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 pt-4"
            >
              <button
                onClick={() => onNav('booking')}
                className="flex items-center justify-center space-x-2 bg-brand-olive hover:bg-brand-olive-light text-white px-8 py-3.5 rounded-full text-[11px] uppercase tracking-[0.2em] font-bold transition-all text-center cursor-pointer group shadow-none"
              >
                <Calendar className="w-4 h-4 mr-1 text-brand-gold-light group-hover:rotate-12 transition-transform" />
                <span>Prenota un Tavolo</span>
              </button>

              <button
                onClick={() => onNav('menu')}
                className="flex items-center justify-center space-x-2 bg-transparent hover:bg-brand-sand/30 text-brand-dark border border-brand-sand px-8 py-3.5 rounded-full text-[11px] uppercase tracking-[0.2em] font-bold transition-all text-center cursor-pointer shadow-none"
              >
                <Compass className="w-4 h-4 mr-1 text-brand-olive" />
                <span>Scopri il Menu</span>
              </button>
            </motion.div>

            {/* Micro Highlights */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="grid grid-cols-3 gap-4 pt-8 border-t border-brand-terracotta/10 text-center sm:text-left"
            >
              <div className="space-y-1">
                <span className="block font-mono text-xl sm:text-2xl font-bold text-brand-terracotta">72h</span>
                <span className="block text-xs uppercase tracking-wide font-medium text-gray-500">Lievitazione Naturale</span>
              </div>
              <div className="space-y-1">
                <span className="block font-mono text-xl sm:text-2xl font-bold text-brand-olive">100%</span>
                <span className="block text-xs uppercase tracking-wide font-medium text-gray-500">Ingredienti Locali</span>
              </div>
              <div className="space-y-1 max-sm:col-span-3">
                <span className="block font-serif text-xl sm:text-2xl font-bold text-brand-gold">Antica</span>
                <span className="block text-xs uppercase tracking-wide font-medium text-gray-500">Tradizione Cremonese</span>
              </div>
            </motion.div>
          </div>

          {/* Right Image Canvas (Gourmet Pizza) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5 relative"
          >
            {/* Creative Backdrop circle */}
            <div className="absolute inset-0 bg-brand-olive/10 rounded-full blur-3xl -z-10 transform translate-x-4 translate-y-4 scale-95"></div>

            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white transform rotate-1 hover:rotate-0 transition-transform duration-500">
              <img 
                src="https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=800" 
                alt="Pizza Margherita Fumante La Pendola" 
                className="w-full h-[32rem] object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

              {/* Float Pizza Badge */}
              <div className="absolute bottom-6 left-6 right-6 text-white p-4 backdrop-blur-md bg-brand-dark/70 rounded-xl border border-white/10">
                <div className="flex items-center space-x-2 text-brand-gold mb-1">
                  <Flame className="w-4 h-4 fill-brand-gold animate-pulse" />
                  <span className="text-xs uppercase tracking-widest font-mono font-bold">Pizza del Mese</span>
                </div>
                <h3 className="font-serif text-xl font-bold">Pizza Prosciutto e Funghi</h3>
                <p className="text-xs text-gray-300 mt-1 lines-clamp-1">
                  Sfoglia sottile e croccante, prosciutto d'alta salumeria e prataioli profumati.
                </p>
              </div>
            </div>

            {/* Small Floating review circle card */}
            <div className="absolute -top-6 -right-6 bg-brand-cream border border-brand-gold/30 p-4 rounded-xl shadow-xl flex items-center space-x-3 max-md:hidden">
              <span className="bg-brand-gold text-brand-dark font-mono font-bold w-12 h-12 rounded-lg flex items-center justify-center text-lg shadow-sm">
                4.4
              </span>
              <div>
                <span className="block text-xs font-semibold text-brand-dark">Punteggio Google</span>
                <span className="block text-[10px] text-gray-500">Oltre 1.091 Buongustai</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Feature Pillar Grid */}
      <section className="bg-white py-16 border-y border-brand-terracotta/5 relative z-10" id="hero-features">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              whileHover={{ y: -5 }}
              className="p-8 rounded-2xl bg-brand-cream/40 border border-brand-olive/10 hover:border-brand-olive hover:shadow-xl transition-all text-left"
            >
              <div className="w-12 h-12 rounded-xl bg-brand-olive/10 flex items-center justify-center text-brand-olive mb-6">
                <Flame className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold mb-3 text-brand-dark">Lievitazione 72 Ore</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Utilizziamo solo farine da grani biologici scelti, con una lievitazione lenta di tre giorni. Il risultato è una pizza sottilissima, incredibilmente digeribile e croccante nei bordi.
              </p>
            </motion.div>

            <motion.div 
              whileHover={{ y: -5 }}
              className="p-8 rounded-2xl bg-brand-cream/40 border border-brand-terracotta/10 hover:border-brand-terracotta hover:shadow-xl transition-all text-left"
            >
              <div className="w-12 h-12 rounded-xl bg-brand-terracotta/10 flex items-center justify-center text-brand-terracotta mb-6">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold mb-3 text-brand-dark">Tradizione Cremonese</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Non solo grandi pizze. La nostra cucina celebra Cremona con i tradizionali Marubini stirati a mano serviti nei tre brodi caldi selvaggi e la nostra celebre torta Sbrisolona friabile.
              </p>
            </motion.div>

            <motion.div 
              whileHover={{ y: -5 }}
              className="p-8 rounded-2xl bg-brand-cream/40 border border-brand-gold/10 hover:border-brand-gold hover:shadow-xl transition-all text-left"
            >
              <div className="w-12 h-12 rounded-xl bg-brand-gold/10 flex items-center justify-center text-brand-gold mb-6">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold mb-3 text-brand-dark">Ingredienti di Alta Qualità</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Dal pomodoro San Marzano Biologico alla Mozzarella di Bufala DOP della Campania, ogni ingrediente è selezionato con cura maniacale per garantire sapori puliti e naturali.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Special Offer Highlight Promo Bar */}
      <section className="bg-brand-olive text-brand-cream relative py-12 px-6 text-center shadow-lg">
        <div className="max-w-4xl mx-auto space-y-4">
          <span className="inline-block px-3 py-1 rounded bg-brand-gold text-brand-dark text-[11px] font-bold uppercase tracking-widest font-mono">
            Promozione Attiva
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold">Unisciti a noi per il Giro Pizza!</h2>
          <p className="text-brand-cream/80 text-sm max-w-xl mx-auto leading-relaxed">
            Ogni Giovedì sera organizziamo il Giro Pizza: assaggia tutte le nostre ricette sottili a rotazione finché vuoi, e la prima birra Menabrea artigianale te la regaliamo noi!
          </p>
          <div className="pt-2">
            <button
              onClick={() => onNav('booking')}
              className="bg-brand-gold hover:bg-brand-gold-light text-brand-dark font-bold font-serif text-sm px-6 py-2.5 rounded-lg shadow-md transition-colors cursor-pointer"
            >
              Prenota Ora il tuo Giovedì
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
