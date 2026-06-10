/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { ChefHat, Heart, Award, ShieldCheck, Soup, MapPin } from 'lucide-react';
import { RESTAURANT_INFO } from '../data';

export default function AboutUs() {
  const stats = [
    { number: '1982', label: 'Anno di Fondazione' },
    { number: '72 Ore', label: 'Tempo di Lievitazione' },
    { number: '1.000+', label: 'Recensioni a 5 Stelle' },
    { number: '100%', label: 'Passione Italiana' },
  ];

  return (
    <section className="py-16 md:py-24 bg-[#FDFCF8] overflow-hidden text-left" id="about-us-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Core narrative and image grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-mono tracking-[0.2em] text-[#B35A38] font-bold uppercase block">
              LA NOSTRA IDENTITÀ
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-normal text-brand-dark leading-tight">
              Una storia d'amore per la pizza dal <span className="italic">1982</span>
            </h2>
            <div className="w-24 h-px bg-brand-terracotta"></div>
            
            <p className="text-[#4a4a4a] text-xs sm:text-sm leading-relaxed">
              Fondata nel cuore di Cremona in <strong>Via Luigi Voghera</strong>, la Pizzeria Ristorante La Pendola nasce da una promessa semplice: servire un impasto leggero, digeribile e condito con le migliori materie prime locali. Negli anni siamo diventati un punto di riferimento per famiglie, giovani e amanti dei sapori autentici.
            </p>
            <p className="text-[#4a4a4a] text-xs sm:text-sm leading-relaxed">
              Il nostro segreto risiede nella <strong>lievitazione naturale a 72 ore</strong> e nell'idratazione accurata della farina macinata a pietra. Ogni pizza che esce dai nostri forni è sottilissima, leggermente croccante nei bordi e ricca di condimento genuino, proprio come piace alla nostra numerosissima clientela storica.
            </p>

            {/* Stat counts bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-brand-sand">
              {stats.map((stat, idx) => (
                <div key={idx} className="text-center sm:text-left">
                  <span className="block font-serif italic text-2xl sm:text-3xl font-bold text-brand-terracotta">{stat.number}</span>
                  <span className="block text-[10px] uppercase tracking-wider text-gray-500 font-bold mt-1 leading-snug">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-6 relative">
            {/* Visual layout collage */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="border border-brand-sand bg-white p-2">
                  <img 
                    src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=400" 
                    alt="Lavoro in Cucina del Ristorante" 
                    className="h-64 w-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="border border-brand-sand bg-white p-2">
                  <img 
                    src="https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=400" 
                    alt="Preparazione pizza fresca" 
                    className="h-40 w-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="border border-brand-sand bg-white p-2">
                  <img 
                    src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=400" 
                    alt="Interni accoglienti de La Pendola" 
                    className="h-40 w-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="border border-brand-sand bg-white p-2">
                  <img 
                    src="https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=400" 
                    alt="Marubini fatti a mano Cremona" 
                    className="h-64 w-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* The Chef Section */}
        <div className="bg-brand-cream p-8 md:p-12 border border-brand-sand rounded-none">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Chef Portrait */}
            <div className="md:col-span-4 relative flex justify-center">
              <div className="w-56 h-56 md:w-64 md:h-64 border border-brand-sand bg-white p-2 shrink-0">
                <img 
                  src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?q=80&w=400" 
                  alt="Chef Sergio Voghera" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

            {/* Chef Story and details */}
            <div className="md:col-span-8 space-y-4 text-left">
              <div className="flex items-center space-x-2 text-brand-terracotta">
                <ChefHat className="w-4 h-4 text-brand-terracotta" />
                <span className="text-[10px] uppercase tracking-widest font-bold">INCONTRA IL NOSTRO CHEF</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-brand-dark">
                Sergio Voghera
              </h3>
              <p className="text-[10px] text-brand-olive font-bold uppercase tracking-wider block">
                Mastro Impastatore dal 1982 & Ambasciatore dei gusti di Cremona
              </p>
              
              <p className="text-[#4a4a4a] text-xs sm:text-sm leading-relaxed italic">
                "La cucina non è un semplice assembramento di ingredienti, ma il racconto della nostra terra. I nostri marubini cremonesi seguono la ricetta orale di mia nonna, con ripieno marinato nel vino e stracotto, proprio come si faceva un tempo. Quanto alla pizza, deve essere digeribile, golosa e far sorridere. Se l'impasto riposa 72 ore, il corpo ringrazia e l'esperienza diventa indimenticabile."
              </p>
              
              <div className="flex gap-4 pt-4 border-t border-brand-sand">
                <div className="flex items-center space-x-2 text-brand-dark font-medium text-xs">
                  <ShieldCheck className="w-4 h-4 text-brand-terracotta" />
                  <span className="text-[10px] uppercase tracking-wider font-bold">Ricette Originarie</span>
                </div>
                <div className="flex items-center space-x-2 text-brand-dark font-medium text-xs">
                  <Heart className="w-4 h-4 text-brand-terracotta" />
                  <span className="text-[10px] uppercase tracking-wider font-bold">Cura degli Ingredienti</span>
                </div>
                <div className="flex items-center space-x-2 text-brand-dark font-medium text-xs">
                  <Soup className="w-4 h-4 text-brand-olive" />
                  <span className="text-[10px] uppercase tracking-wider font-bold">Sfoglia e Brodo Freschi</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Corporate Philosophy / Values Cards */}
        <div className="mt-20 text-center space-y-12">
          <div className="max-w-xl mx-auto space-y-4">
            <span className="text-xs uppercase tracking-widest text-brand-olive font-bold block">
              I NOSTRI VALORI
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-normal text-brand-dark">
              Qualità senza <span className="italic">compromessi</span>
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 bg-white border border-brand-sand rounded-none transition-all hover:border-brand-terracotta/40">
              <span className="text-[10px] font-bold text-brand-terracotta uppercase tracking-[0.15em] block mb-2">01. INGREDIENTI BIO DOP</span>
              <h4 className="font-serif text-lg font-bold text-brand-dark mb-3">La Natura in tavola</h4>
              <p className="text-xs text-gray-500 leading-relaxed">
                La freschezza ripaga sempre. Acquistiamo solo formaggi DOP campani o lodigiani, pomodoro a chilometro zero, verdure fresche degli orti locali di Cremona e olio pugliese spremuto a freddo.
              </p>
            </div>

            <div className="p-8 bg-white border border-brand-sand rounded-none transition-all hover:border-brand-terracotta/40">
              <span className="text-[10px] font-bold text-brand-olive uppercase tracking-[0.15em] block mb-2">02. RISPETTO DELLA LENTEZZA</span>
              <h4 className="font-serif text-lg font-bold text-brand-dark mb-3">Tecnica di Lievitazione</h4>
              <p className="text-xs text-gray-500 leading-relaxed">
                Non acceleriamo la natura. Niente lieviti chimici d’assalto: usiamo pochissimo lievito madre naturale, tanta acqua purissima e un riposo perfetto in cella termica controllata per tre interi giorni.
              </p>
            </div>

            <div className="p-8 bg-white border border-brand-sand rounded-none transition-all hover:border-brand-terracotta/40">
              <span className="text-[10px] font-bold text-brand-terracotta uppercase tracking-[0.15em] block mb-2">03. OSPITALITÀ DI FAMIGLIA</span>
              <h4 className="font-serif text-lg font-bold text-brand-dark mb-3">Sempre al vostro servizio</h4>
              <p className="text-xs text-gray-500 leading-relaxed">
                Oltre al sapore, conta la sensazione. Ci impegniamo a servire le pizze rapidamente, a coccolare ogni cliente con gentilezza genuina e professionalità totale per farvi passare una serata magnifica.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
