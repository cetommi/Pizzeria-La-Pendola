/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, Info, Star } from 'lucide-react';
import { RESTAURANT_INFO } from '../data';

export default function ContactSection() {
  const [senderName, setSenderName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [sentSuccess, setSentSuccess] = useState(false);
  const [sentError, setSentError] = useState<string | null>(null);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    setSentError(null);

    if (!senderName || !senderEmail || !message) {
      setSentError('Si prega di inserire nome, email e messaggio.');
      return;
    }

    // Simulate sending message
    setSentSuccess(true);
    setSenderName('');
    setSenderEmail('');
    setSubject('');
    setMessage('');
  };

  return (
    <section className="py-16 md:py-24 bg-white text-left" id="restaurant-contact-page">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Contact head */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-mono tracking-[0.2em] text-[#B35A38] font-bold uppercase block">
            CONTATTI & INDIRIZZO
          </span>
          <span className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-brand-dark block mt-1">
            Saremo Felici Di Accoglierti
          </span>
          <p className="text-[#6B6B6B] text-xs sm:text-sm leading-relaxed max-w-xl mx-auto">
            Siamo a Cremona in una via storica e accogliente, pronti a cucinare per te. Per qualsiasi esigenza, compila il modulo o telefona direttamente!
          </p>
        </div>

        {/* Content body split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
          {/* Card detailing operations */}
          <div className="lg:col-span-4 space-y-6">
            
            <div className="bg-[#FDFCF8] border border-brand-sand p-8 rounded-none space-y-6">
              <h3 className="font-serif text-lg font-bold text-brand-dark pb-3 border-b border-brand-sand italic font-normal">
                Informazioni Rapide
              </h3>

              {/* Physical Address */}
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 rounded-none border border-brand-sand bg-white flex items-center justify-center text-brand-terracotta shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="block font-serif text-[13px] font-bold text-brand-dark">Il Nostro Indirizzo</span>
                  <a 
                    href="https://maps.google.com/?q=Pizzeria+La+Pendola+Cremona" 
                    target="_blank" 
                    rel="noreferrer" 
                    className="text-xs text-gray-500 hover:text-brand-terracotta underline leading-relaxed block mt-1"
                  >
                    {RESTAURANT_INFO.address}
                  </a>
                </div>
              </div>

              {/* Phone Line */}
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 rounded-none border border-brand-sand bg-white flex items-center justify-center text-brand-terracotta shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="block font-serif text-[13px] font-bold text-brand-dark">Chiama in Pizzeria</span>
                  <a 
                    href={`tel:${RESTAURANT_INFO.phone}`} 
                    className="text-xs text-brand-terracotta font-bold font-mono tracking-wide hover:underline block mt-1"
                  >
                    {RESTAURANT_INFO.phone}
                  </a>
                  <span className="text-[10px] text-gray-400 block font-sans">Per asporto, tavoli e modifiche rapide</span>
                </div>
              </div>

              {/* Email service */}
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 rounded-none border border-brand-sand bg-white flex items-center justify-center text-brand-terracotta shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="block font-serif text-[13px] font-bold text-brand-dark">Scrivici una Mail</span>
                  <a 
                    href={`mailto:${RESTAURANT_INFO.email}`} 
                    className="text-xs text-gray-500 hover:text-brand-terracotta transition-colors leading-relaxed block mt-1"
                  >
                    {RESTAURANT_INFO.email}
                  </a>
                </div>
              </div>
            </div>

            {/* Structured Hours Widget */}
            <div className="bg-brand-cream border border-brand-sand text-brand-dark p-8 rounded-none space-y-4">
              <h3 className="font-serif text-lg font-bold text-brand-dark pb-3 border-b border-brand-sand italic font-normal">
                Orari di Servizio
              </h3>
              <ul className="space-y-3 font-mono text-xs text-gray-600">
                {RESTAURANT_INFO.hours.map((it, i) => (
                  <li key={i} className="flex justify-between border-b border-brand-sand/50 pb-2">
                    <span className="font-sans text-xs text-gray-700">{it.days}</span>
                    <span className="text-brand-terracotta text-xs font-bold">{it.hours || it.status}</span>
                  </li>
                ))}
              </ul>
              <div className="pt-2 flex items-center space-x-2 text-[10px] text-gray-500 font-sans leading-relaxed">
                <Info className="w-3.5 h-3.5 text-brand-[#B35A38] shrink-0" />
                <span>La cucina chiude 15 minuti prima dell'ora indicata.</span>
              </div>
            </div>

          </div>

          {/* Form Message simulator */}
          <div className="lg:col-span-8 bg-[#FDFCF8] rounded-none p-8 sm:p-10 border border-brand-sand">
            <AnimatePresence mode="wait">
              {sentSuccess ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center py-12 space-y-6"
                  id="contact-sent-success"
                >
                  <div className="w-16 h-16 rounded-none border border-brand-sand bg-white text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle className="w-10 h-10" />
                  </div>
                  <div className="space-y-2">
                     <h3 className="font-serif text-2xl font-bold text-brand-dark">Messaggio Inviato!</h3>
                     <p className="text-xs text-gray-500 max-w-sm mx-auto leading-relaxed">
                       Grazie per averci contattato. Abbiamo salvato la tua richiesta, lo staff di La Pendola ti risponderà all'indirizzo email indicato nel più breve tempo possibile.
                     </p>
                  </div>
                  <div>
                    <button
                      onClick={() => setSentSuccess(false)}
                      className="bg-brand-olive hover:bg-brand-olive/80 text-white font-mono text-[10px] tracking-widest uppercase px-6 py-3 rounded-none transition-colors cursor-pointer"
                    >
                      Invia un altro messaggio
                    </button>
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={handleSendMessage} className="space-y-6" id="contact-form-message">
                  <div>
                    <span className="text-xs font-mono font-bold text-brand-terracotta uppercase tracking-[0.2em] block mb-1">
                      SCRIVICI DIRETTAMENTE
                    </span>
                    <h3 className="font-serif text-2xl font-normal text-brand-dark">Compila il modulo dei contatti</h3>
                    <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                      Compila questo form per organizzare eventi speciali, fare proposte di catering, chiedere chiarimenti sugli allergeni o comunicare con la direzione.
                    </p>
                  </div>

                  {sentError && (
                    <div className="bg-rose-50 border-l border-rose-500 text-rose-700 p-4 rounded-none text-xs">
                      <span>{sentError}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-brand-dark uppercase tracking-wider block">
                        Il Tuo Nome *
                      </label>
                      <input
                        type="text"
                        required
                        value={senderName}
                        onChange={(e) => { setSenderName(e.target.value); setSentError(null); }}
                        placeholder="Es: Francesco Rossi"
                        className="w-full px-4 py-3 bg-white border border-brand-sand rounded-none text-xs focus:outline-none focus:border-brand-terracotta text-brand-dark font-medium"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-brand-dark uppercase tracking-wider block">
                        La Tua Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={senderEmail}
                        onChange={(e) => { setSenderEmail(e.target.value); setSentError(null); }}
                        placeholder="Es: francesco@email.it"
                        className="w-full px-4 py-3 bg-white border border-brand-sand rounded-none text-xs focus:outline-none focus:border-brand-terracotta text-brand-dark font-medium"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-brand-dark uppercase tracking-wider block">
                      Oggetto della richiesta
                    </label>
                    <input
                      type="text"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder="Es: Info per prenotazione tavolo 15 persone, menu celiaci, etc..."
                      className="w-full px-4 py-3 bg-white border border-brand-sand rounded-none text-xs focus:outline-none focus:border-brand-terracotta text-brand-dark font-medium"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-brand-dark uppercase tracking-wider block">
                      Il Tuo Messaggio o Richiesta *
                    </label>
                    <textarea
                      rows={5}
                      required
                      value={message}
                      onChange={(e) => { setMessage(e.target.value); setSentError(null); }}
                      placeholder="Scrivi qui il tuo messaggio in modo dettagliato..."
                      className="w-full px-4 py-3 bg-white border border-brand-sand rounded-none text-xs focus:outline-none focus:border-brand-terracotta text-brand-dark resize-none font-medium"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="bg-brand-terracotta hover:bg-[#9c4c2d] text-white font-mono text-[10px] tracking-widest uppercase py-3.5 px-8 rounded-none transition-all cursor-pointer flex items-center justify-center space-x-2"
                  >
                    <Send className="w-4 h-4 mr-0.5" />
                    <span>Invia messaggio</span>
                  </button>
                </form>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* GOOGLE MAPS EMBED SECTION */}
        <div className="space-y-4" id="google-maps-embed-container">
          <div className="flex items-center space-x-2.5">
            <span className="w-2 h-2 bg-brand-terracotta"></span>
            <span className="font-serif text-xl text-brand-dark italic font-normal">
              Mappa di Cremona e Navigatore
            </span>
          </div>
          
          <div className="rounded-none overflow-hidden border border-brand-sand h-[26rem] bg-gray-50 relative">
            <iframe
              src={RESTAURANT_INFO.googleMapsEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Posizione di Pizzeria La Pendola su Google Maps"
              className="absolute inset-0 w-full h-full"
            ></iframe>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center bg-[#FDFCF8] p-4 rounded-none text-xs text-gray-500 gap-3 border border-brand-sand">
            <span className="flex items-center leading-relaxed text-[11px]">
              <MapPin className="w-4 h-4 text-brand-terracotta mr-1.5 shrink-0" />
              <span><strong>Posizione:</strong> Via Luigi Voghera, 3, Cremona. Parcheggio comodo disponibile nelle immediate vicinanze.</span>
            </span>
            <a
              href="https://maps.apple.com/?address=Via+Luigi+Voghera+3,Cremona,Italia"
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 bg-brand-olive text-white rounded-none text-[9px] uppercase font-bold tracking-widest hover:bg-brand-olive/85 transition-colors cursor-pointer shrink-0 font-mono"
            >
              Naviga Ora &rarr;
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
