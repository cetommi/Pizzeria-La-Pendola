/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, Flame, Calendar, MessageSquare, ArrowRight, ShieldCheck, Heart, Sparkles, MapPin, Phone } from 'lucide-react';

// Sub-components import
import Header from './components/Header';
import Footer from './components/Footer';
import Hero from './components/Hero';
import MenuSection from './components/MenuSection';
import AboutUs from './components/AboutUs';
import BookingForm from './components/BookingForm';
import ContactSection from './components/ContactSection';
import PromoPopup from './components/PromoPopup';

// Static Data
import { REVIEWS, RESTAURANT_INFO } from './data';

export default function App() {
  const [activeView, setActiveView] = useState<string>('home');
  const [isPromoOpen, setIsPromoOpen] = useState<boolean>(false);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);

  // Trigger campaign popup on mount with delay for premium look
  useEffect(() => {
    const timer = setTimeout(() => {
      // Check if already dismissed in this session to protect UX
      const dismissed = sessionStorage.getItem('la_pendola_promo_dismissed');
      if (!dismissed) {
        setIsPromoOpen(true);
      }
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  const handleClosePromo = () => {
    setIsPromoOpen(false);
    sessionStorage.setItem('la_pendola_promo_dismissed', 'true');
  };

  const handleNavigateToBookingFromPromo = () => {
    setIsPromoOpen(false);
    sessionStorage.setItem('la_pendola_promo_dismissed', 'true');
    setActiveView('booking');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Subscribe news simulation
  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setNewsletterSuccess(true);
    setNewsletterEmail('');
  };

  return (
    <div className="min-h-screen bg-brand-cream/80 text-brand-dark flex flex-col font-sans transition-all selection:bg-brand-terracotta selection:text-white">
      {/* Header Sticky Bar */}
      <Header 
        activeView={activeView} 
        setActiveView={setActiveView} 
        onOpenPromo={() => setIsPromoOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          {activeView === 'home' && (
            <motion.div
              key="home-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              {/* Home main Hero with sliders */}
              <Hero onNav={setActiveView} onOpenPromo={() => setIsPromoOpen(true)} />

              {/* Special chef recommendation slider or miniature menu preview */}
              <section className="py-20 bg-[#FDFCF8] border-b border-brand-sand text-left">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="flex flex-col md:flex-row justify-between items-baseline mb-12 gap-4">
                    <div className="space-y-4 max-w-xl">
                      <span className="text-xs font-mono font-bold text-[#606C38] uppercase tracking-[0.2em] block">
                        I PREFERITI DEGLI OSPITI
                      </span>
                      <h2 className="font-serif text-3xl sm:text-4xl font-light text-brand-dark">
                        Provati e Consigliati da Centinaia di Cremonesi
                      </h2>
                    </div>
                    <button
                      onClick={() => { setActiveView('menu'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                      className="inline-flex items-center space-x-1.5 text-brand-terracotta hover:text-brand-terracotta-dark font-serif italic font-normal text-[15px] cursor-pointer group border-b border-brand-terracotta pb-0.5"
                    >
                      <span>Vedi tutto il menu</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Featured Item 1 */}
                    <div className="bg-[#FDFCF8] border border-brand-sand rounded-none overflow-hidden p-6 hover:shadow-sm transition-all flex flex-col sm:flex-row gap-6 relative group">
                      <div className="w-full sm:w-44 h-44 rounded-none overflow-hidden bg-gray-50 shrink-0 border border-brand-sand">
                        <img 
                          src="https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?q=80&w=400" 
                          alt="Pizza Prosciutto e Funghi" 
                          className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="flex flex-col justify-between">
                        <div className="space-y-2">
                          <div className="flex justify-between items-baseline">
                            <h4 className="font-serif text-lg font-bold text-brand-dark italic">Pizza Prosciutto e Funghi</h4>
                            <span className="text-brand-terracotta font-mono font-bold text-sm">8.50 €</span>
                          </div>
                          <p className="text-xs text-[#555555] leading-relaxed">
                            Sottilissima e leggerissima. Pomodoro, mozzarella fior di latte fresco, prosciutto cotto e funghi porcini nostrani prataioli.
                          </p>
                        </div>
                        <div className="flex flex-wrap gap-1.5 pt-4">
                          <span className="bg-[#B35A38]/10 text-[#B35A38] text-[9px] font-bold uppercase px-2.5 py-0.5 rounded-none font-mono">Più Richiesta</span>
                          <span className="bg-neutral-50 text-gray-600 text-[9px] px-2 py-0.5 rounded-none border border-brand-sand font-mono">Cottura 400°C</span>
                        </div>
                      </div>
                    </div>

                    {/* Featured Item 2 */}
                    <div className="bg-[#FDFCF8] border border-brand-sand rounded-none overflow-hidden p-6 hover:shadow-sm transition-all flex flex-col sm:flex-row gap-6 relative group">
                      <div className="w-full sm:w-44 h-44 rounded-none overflow-hidden bg-gray-50 shrink-0 border border-brand-sand">
                        <img 
                          src="https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=400" 
                          alt="Marubini Cremonesi" 
                          className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="flex flex-col justify-between">
                        <div className="space-y-2">
                          <div className="flex justify-between items-baseline">
                            <h4 className="font-serif text-lg font-bold text-brand-dark italic">Marubini ai Tre Brodi</h4>
                            <span className="text-brand-terracotta font-mono font-bold text-sm">13.00 €</span>
                          </div>
                          <p className="text-xs text-[#555555] leading-relaxed">
                            Tipica sfoglia all'uovo ripiena di brasato scelto di manzo e maiale, cotta e servita fumante nella tazza dei tre brodi tradizionali.
                          </p>
                        </div>
                        <div className="flex flex-wrap gap-1.5 pt-4">
                          <span className="bg-[#606C38]/10 text-[#606C38] text-[9px] font-bold uppercase px-2.5 py-0.5 rounded-none font-mono">Specialità Locale</span>
                          <span className="bg-neutral-50 text-gray-600 text-[9px] px-2 py-0.5 rounded-none border border-brand-sand font-mono">Fatti a mano</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Real Google Maps reviews feed with rating badge */}
              <section className="py-20 bg-[#FDFCF8] border-b border-brand-sand text-left" id="home-reviews-slider">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="text-center max-w-2xl mx-auto mb-14 space-y-4">
                    <span className="text-xs font-mono font-bold tracking-[0.2em] text-brand-terracotta uppercase block">
                      FEEDBACK DA GOOGLE MAPS
                    </span>
                    <h2 className="font-serif text-3xl sm:text-4xl font-light text-brand-dark">
                      Cosa Dicono I Nostri Ospiti
                    </h2>
                    <p className="text-xs text-gray-500 max-w-lg mx-auto">
                      Oltre 1.091 recensioni su Google confermano la squisitezza del nostro servizio, la rapidità delle pizze ed il nostro rapporto qualità-prezzo.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {REVIEWS.map((review) => (
                      <div 
                        key={review.id} 
                        className="bg-[#FDFCF8] rounded-none p-6 border border-brand-sand hover:border-brand-terracotta/40 transition-all flex flex-col justify-between"
                        id={`review-card-${review.id}`}
                      >
                        <div className="space-y-4">
                          {/* Rating stars row */}
                          <div className="flex gap-1.5">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star 
                                key={i} 
                                className={`w-3.5 h-3.5 ${
                                  i < review.rating 
                                    ? 'text-[#B35A38] fill-[#B35A38]' 
                                    : 'text-gray-200'
                                  }`} 
                              />
                            ))}
                          </div>
                          <p className="text-xs text-[#555555] line-clamp-6 leading-relaxed italic">
                            "{review.text}"
                          </p>
                        </div>

                        {/* Customer profile at bottom */}
                        <div className="flex items-center space-x-3 pt-6 border-t border-brand-sand/55 mt-6 shrink-0">
                          <img 
                            src={review.avatarUrl} 
                            alt={review.author} 
                            className="w-10 h-10 rounded-none border border-brand-sand"
                            referrerPolicy="no-referrer"
                          />
                          <div>
                            <span className="block font-serif text-[13px] font-bold text-brand-dark leading-none">
                              {review.author}
                            </span>
                            <span className="text-[9px] text-[#7A7A7A] font-mono block mt-1">
                              {review.isLocalGuide ? 'Local Guide' : 'Ospite Verificato'} &bull; {review.date}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Cozy Atmosphere Gallery teaser */}
              <section className="bg-brand-dark text-brand-cream py-20 text-left relative overflow-hidden border-y border-brand-sand/10">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(195,155,80,0.06),transparent_50%)] pointer-events-none"></div>
                
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                    <div className="lg:col-span-6 space-y-6">
                      <span className="text-xs font-mono font-bold inline-block text-brand-gold uppercase tracking-[0.2em]">
                        PRENOTA IL TUO TAVOLO
                      </span>
                      <h2 className="font-serif text-3xl sm:text-4xl font-light leading-tight">
                        Organizza la Tua Serata a La Pendola
                      </h2>
                      <p className="text-xs text-gray-300 leading-relaxed">
                        Siamo la scelta ideale per festeggiamenti, cene in famiglia o serate sfiziose. La nostra sala offre ampi spazi, mentre il servizio garantito ti serve pizze dorate e fragranti in pochissimi minuti. Offriamo anche servizio d'asporto telefonico.
                      </p>
                      
                      <div className="grid grid-cols-2 gap-4 pt-2">
                        <div className="space-y-1">
                          <span className="text-brand-gold font-mono font-bold block text-base uppercase tracking-wider">Consumazione sul posto</span>
                          <span className="text-xs text-gray-400 block">Tavoli confortevoli e climatizzati</span>
                        </div>
                        <div className="space-y-1">
                          <span className="text-brand-gold font-mono font-bold block text-base uppercase tracking-wider">Asporto</span>
                          <span className="text-xs text-gray-400 block">Prenota per telefono, ritira caldo</span>
                        </div>
                      </div>

                      <div className="pt-4">
                        <button
                          onClick={() => { setActiveView('booking'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                          className="bg-brand-gold hover:bg-[#d4b46c] text-brand-dark font-mono text-[10px] tracking-widest uppercase px-6 py-3.5 rounded-none transition-all cursor-pointer"
                        >
                          Richiedi Tavolo Online &rarr;
                        </button>
                      </div>
                    </div>

                    <div className="lg:col-span-6 relative">
                      <div className="aspect-video rounded-none overflow-hidden border border-brand-gold/15 shadow-none">
                        <img 
                          src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=800" 
                          alt="Ristorante accogliente La Pendola" 
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Newsletter subscription form */}
              <section className="bg-brand-cream border-t border-brand-sand py-20 text-center">
                <div className="max-w-xl mx-auto px-4 space-y-6">
                  <div className="w-12 h-12 rounded-none bg-brand-terracotta/10 text-brand-terracotta border border-brand-sand flex items-center justify-center mx-auto">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-serif text-2xl font-normal text-brand-dark">Resta in contatto</h3>
                    <p className="text-xs text-[#555555] leading-relaxed max-w-sm mx-auto">
                      Iscriviti alla newsletter mensile per ricevere codici sconto, inviti a serate degustazione esclusive e aggiornamenti sui nostri nuovi piatti.
                    </p>
                  </div>

                  {newsletterSuccess ? (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-emerald-50 text-emerald-800 p-4 rounded-none text-xs flex items-center justify-center space-x-2 border border-emerald-100 font-mono"
                    >
                      <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Ottimo! Sei iscritto con successo alla nostra newsletter.</span>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleNewsletterSubmit} className="flex gap-2" id="home-newsletter-form">
                      <input
                        type="email"
                        required
                        value={newsletterEmail}
                        onChange={(e) => setNewsletterEmail(e.target.value)}
                        placeholder="Inserisci la tua email..."
                        className="flex-grow px-4 py-3 bg-white border border-brand-sand rounded-none text-xs focus:outline-none focus:border-brand-terracotta text-brand-dark font-medium font-sans"
                      />
                      <button
                        type="submit"
                        className="bg-brand-terracotta hover:bg-[#9c4c2d] text-white font-mono text-[10px] tracking-widest uppercase px-6 py-3 rounded-none transition-all cursor-pointer whitespace-nowrap"
                      >
                        Iscriviti
                      </button>
                    </form>
                  )}
                </div>
              </section>

            </motion.div>
          )}

          {activeView === 'menu' && (
            <motion.div
              key="menu-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <MenuSection />
            </motion.div>
          )}

          {activeView === 'about' && (
            <motion.div
              key="about-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <AboutUs />
            </motion.div>
          )}

          {activeView === 'booking' && (
            <motion.div
              key="booking-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <BookingForm />
            </motion.div>
          )}

          {activeView === 'contact' && (
            <motion.div
              key="contact-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <ContactSection />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Floating quick reservation & call overlay widget (Visible on scroll) */}
      <div className="fixed bottom-6 right-6 z-30 flex flex-col space-y-2.5 max-sm:bottom-4 max-sm:right-4 pointer-events-none">
        {/* Reservation shortcut overlay btn */}
        {activeView !== 'booking' && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => { setActiveView('booking'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="pointer-events-auto bg-brand-terracotta text-brand-cream p-4 rounded-none shadow-lg flex items-center justify-center border border-white/10 cursor-pointer shadow-black/10 hover:bg-[#9c4c2d]"
            title="Prenota ora un tavolo!"
            id="floating-book-shortcut"
          >
            <Calendar className="w-5 h-5 text-brand-gold-light" />
          </motion.button>
        )}

        {/* Instantly Phone overlay btn */}
        <motion.a
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          href={`tel:${RESTAURANT_INFO.phone}`}
          className="pointer-events-auto bg-brand-olive text-brand-cream p-4 rounded-none shadow-lg flex items-center justify-center border border-white/10 cursor-pointer shadow-black/10 hover:bg-[#4d572d]"
          title="Telefona in pizzeria"
          id="floating-phone-shortcut"
        >
          <Phone className="w-5 h-5" />
        </motion.a>
      </div>

      {/* Newsletter Campaign Alert Banner Modal */}
      <PromoPopup 
        isOpen={isPromoOpen} 
        onClose={handleClosePromo} 
        onNavigateToBooking={handleNavigateToBookingFromPromo}
      />

      {/* Footer component */}
      <Footer setActiveView={setActiveView} />
    </div>
  );
}
