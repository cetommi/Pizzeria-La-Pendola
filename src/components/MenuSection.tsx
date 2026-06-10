/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Star, Heart, Flame, ShieldAlert, Sparkles } from 'lucide-react';
import { MenuItem, MenuCategory } from '../types';
import { MENU_ITEMS, MENU_CATEGORIES } from '../data';

export default function MenuSection() {
  const [selectedCategory, setSelectedCategory] = useState<MenuCategory>('pizze');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterVegetarian, setFilterVegetarian] = useState(false);
  const [filterPopular, setFilterPopular] = useState(false);
  const [filterGlutenFree, setFilterGlutenFree] = useState(false);

  // Filtered menu items
  const filteredMenuItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      // Category match
      const matchesCategory = item.category === selectedCategory;

      // Text query match
      const matchesSearch = 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.ingredients.some((ing) => ing.toLowerCase().includes(searchQuery.toLowerCase()));

      // Attributes match
      const matchesVegetarian = !filterVegetarian || item.isVegetarian;
      const matchesPopular = !filterPopular || item.isPopular;
      const matchesGlutenFree = !filterGlutenFree || item.isGlutenFree;

      return matchesCategory && matchesSearch && matchesVegetarian && matchesPopular && matchesGlutenFree;
    });
  }, [selectedCategory, searchQuery, filterVegetarian, filterPopular, filterGlutenFree]);

  const activeCategoryDetail = useMemo(() => {
    return MENU_CATEGORIES.find((cat) => cat.key === selectedCategory);
  }, [selectedCategory]);

  const clearFilters = () => {
    setSearchQuery('');
    setFilterVegetarian(false);
    setFilterPopular(false);
    setFilterGlutenFree(false);
  };

  return (
    <section className="py-16 md:py-24 bg-brand-cream/30" id="restaurant-menu-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title & Introduction */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <span className="text-xs font-mono tracking-[0.25em] text-brand-terracotta font-bold uppercase block">
            IL NOSTRO MENU ARTIGIANALE
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-normal text-brand-dark leading-tight">
            Gusta l'Eccellenza <span className="italic">Italiana</span>
          </h2>
          <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
            Dalle celeberrime pizze sottilissime e leggerissime cotte a puntino, ai classici intramontabili della tradizione cremonese fatti in casa con amore.
          </p>
        </div>

        {/* Search & Dynamic Filters Row */}
        <div className="bg-white border border-brand-sand p-6 mb-12 space-y-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search Input */}
            <div className="relative w-full md:max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cerca una pizza, un ingrediente, un dolce..."
                id="menu-search-input"
                className="w-full pl-11 pr-4 py-3 bg-[#FDFCF8] border border-brand-sand rounded-none text-xs tracking-wider uppercase focus:outline-none focus:border-brand-terracotta focus:ring-0 transition-colors text-brand-dark font-medium"
              />
            </div>

            {/* Quick badges filters */}
            <div className="flex flex-wrap gap-2.5 w-full md:w-auto justify-start md:justify-end">
              <button
                onClick={() => setFilterPopular(!filterPopular)}
                id="filter-popular-toggle"
                className={`flex items-center space-x-1.5 px-4 py-2.5 rounded-none text-[10px] font-bold uppercase tracking-[0.15em] border cursor-pointer transition-all ${
                  filterPopular 
                    ? 'bg-brand-terracotta border-brand-terracotta text-white' 
                    : 'bg-white border-brand-sand text-[#6B6B6B] hover:border-brand-terracotta/50'
                }`}
              >
                <Star className={`w-3 h-3 ${filterPopular ? 'fill-white' : ''}`} />
                <span>I più Popolari</span>
              </button>

              <button
                onClick={() => setFilterVegetarian(!filterVegetarian)}
                id="filter-veg-toggle"
                className={`flex items-center space-x-1.5 px-4 py-2.5 rounded-none text-[10px] font-bold uppercase tracking-[0.15em] border cursor-pointer transition-all ${
                  filterVegetarian 
                    ? 'bg-brand-olive text-white border-brand-olive' 
                    : 'bg-white border-brand-sand text-[#6B6B6B] hover:border-brand-olive/50'
                }`}
              >
                <Heart className={`w-3 h-3 ${filterVegetarian ? 'fill-white' : ''}`} />
                <span>Vegetariano</span>
              </button>

              <button
                onClick={() => setFilterGlutenFree(!filterGlutenFree)}
                id="filter-gf-toggle"
                className={`flex items-center space-x-1.5 px-4 py-2.5 rounded-none text-[10px] font-bold uppercase tracking-[0.15em] border cursor-pointer transition-all ${
                  filterGlutenFree 
                    ? 'bg-brand-olive-light text-white border-brand-olive-light' 
                    : 'bg-white border-brand-sand text-[#6B6B6B] hover:border-brand-olive-light/50'
                }`}
              >
                <Sparkles className="w-3 h-3" />
                <span>Senza Glutine</span>
              </button>

              {(searchQuery || filterVegetarian || filterPopular || filterGlutenFree) && (
                <button
                  onClick={clearFilters}
                  id="filter-clear-button"
                  className="px-3 py-2 text-[10px] font-bold uppercase tracking-[0.15em] text-brand-terracotta hover:text-brand-terracotta-dark border border-dashed border-brand-terracotta/30 cursor-pointer transition-colors"
                >
                  Annulla Filtri
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Categories Tab Selector */}
        <div className="flex overflow-x-auto no-scrollbar gap-2 pb-2 mb-6 border-b border-brand-sand select-none scroll-smooth">
          {MENU_CATEGORIES.map((category) => (
            <button
              key={category.key}
              id={`tab-cat-${category.key}`}
              onClick={() => setSelectedCategory(category.key)}
              className={`flex-shrink-0 px-6 py-4.5 rounded-none text-center transition-all cursor-pointer border-b-2 -mb-[9px] ${
                selectedCategory === category.key
                  ? 'border-brand-terracotta text-brand-terracotta font-extrabold'
                  : 'border-transparent text-brand-dark/60 hover:text-brand-dark'
              }`}
            >
              <span className="block font-serif text-base tracking-tight">{category.label}</span>
            </button>
          ))}
        </div>

        {/* Selected Category Header */}
        <div className="text-left bg-brand-cream border-l border-brand-terracotta p-6 rounded-none mb-10">
          <h3 className="font-serif text-2xl italic font-normal text-brand-dark capitalize">
            {activeCategoryDetail?.label}
          </h3>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-olive mt-1">
            {activeCategoryDetail?.description}
          </p>
        </div>

        {/* Menu Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredMenuItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.25 }}
                className="bg-white rounded-none overflow-hidden border border-brand-sand hover:border-brand-terracotta/40 transition-all flex flex-col group justify-between"
                id={`menu-item-card-${item.id}`}
              >
                {/* Product Image Canvas */}
                <div className="relative h-56 overflow-hidden bg-brand-cream/10 shrink-0 border-b border-brand-sand">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Badges Container */}
                  <div className="absolute top-4 left-4 flex flex-col space-y-1.5">
                    {item.isPopular && (
                      <span className="bg-brand-terracotta text-white text-[9px] font-bold uppercase tracking-widest px-2 py-1  flex items-center space-x-1">
                        <Star className="w-3 h-3 fill-white" />
                        <span>Popolare</span>
                      </span>
                    )}
                    {item.isVegetarian && (
                      <span className="bg-brand-olive text-white text-[9px] font-bold uppercase tracking-widest px-2 py-1 flex items-center space-x-1">
                        <Heart className="w-3 h-3 fill-white" />
                        <span>Vegetariano</span>
                      </span>
                    )}
                    {item.isGlutenFree && (
                      <span className="bg-brand-olive-light text-white text-[9px] font-bold uppercase tracking-widest px-2 py-1 flex items-center space-x-1">
                        <Sparkles className="w-3 h-3" />
                        <span>Senza Glutine</span>
                      </span>
                    )}
                  </div>
                </div>

                {/* Content Details */}
                <div className="p-6 flex-grow flex flex-col justify-between">
                  {/* Title & Price Header */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-baseline gap-2">
                      <h4 className="font-serif text-lg font-bold text-brand-dark hover:text-brand-terracotta transition-colors group-hover:italic">
                        {item.name}
                      </h4>
                      <span className="font-serif italic text-base font-bold text-brand-terracotta shrink-0">
                        {item.price.toFixed(2)} €
                      </span>
                    </div>

                    <p className="text-[#4a4a4a] text-xs sm:text-sm line-clamp-3 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Ingredients array tags */}
                  <div className="pt-4 border-t border-brand-sand mt-4">
                    <span className="text-[10px] uppercase tracking-wider font-bold text-[#9A9A9A] block mb-1.5">
                      INGREDIENTI:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {item.ingredients.map((ing, idx) => (
                        <span
                          key={idx}
                          className="bg-[#FDFCF8] text-brand-dark/85 text-[10px] px-2.5 py-0.5 rounded-none border border-brand-sand"
                        >
                          {ing}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Empty state callback */}
        {filteredMenuItems.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16 bg-white rounded-none border border-dashed border-brand-sand mt-6"
            id="menu-empty-state"
          >
            <p className="text-gray-500 font-serif text-lg italic">Nessun piatto corrisponde ai filtri selezionati.</p>
            <button
              onClick={clearFilters}
              className="mt-4 inline-flex text-[10px] font-bold uppercase tracking-[0.15em] bg-brand-terracotta text-white px-6 py-3 rounded-none hover:bg-brand-terracotta-dark transition-colors cursor-pointer"
            >
              Mostra tutto il menu
            </button>
          </motion.div>
        )}

      </div>
    </section>
  );
}
