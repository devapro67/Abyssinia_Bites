import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Flame, Leaf, Compass, Info, Filter, Wine, Swords, Check, RefreshCw } from 'lucide-react';
import { MENU_ITEMS } from '../data';
import { MenuItem } from '../types';

export default function InteractiveMenu() {
  const [activeCategory, setActiveCategory] = useState<'all' | 'meat' | 'vegan' | 'drinks'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDiet, setSelectedDiet] = useState<'all' | 'vegan' | 'gf'>('all');
  const [selectedSpicy, setSelectedSpicy] = useState<number | 'all'>('all');

  const categories = [
    { id: 'all', label: 'All Dishes', icon: Compass },
    { id: 'meat', label: 'Meat Lovers', icon: Swords },
    { id: 'vegan', label: 'Vegan Delights', icon: Leaf },
    { id: 'drinks', label: 'Drinks & Buna', icon: Wine },
  ];

  // Apply filters in useMemo for optimal performance
  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      // Category Filter
      const matchesCategory = activeCategory === 'all' || item.category === activeCategory;

      // Search Filter
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());

      // Diet Filter
      const matchesDiet =
        selectedDiet === 'all' ||
        (selectedDiet === 'vegan' && item.tags.includes('Vegan')) ||
        (selectedDiet === 'gf' && item.tags.includes('Gluten-Free'));

      // Spicy level Filter
      const matchesSpicy = selectedSpicy === 'all' || item.spicyLevel === selectedSpicy;

      return matchesCategory && matchesSearch && matchesDiet && matchesSpicy;
    });
  }, [activeCategory, searchQuery, selectedDiet, selectedSpicy]);

  // Reset all filters easily
  const resetFilters = () => {
    setActiveCategory('all');
    setSearchQuery('');
    setSelectedDiet('all');
    setSelectedSpicy('all');
  };

  return (
    <section id="menu" className="py-24 bg-bg-beige relative overflow-hidden">
      {/* Dynamic Background Circles */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-radial from-gold-accent/5 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-radial from-teal-medium/5 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Title Block */}
        <div id="menu-title-block" className="text-center max-w-2xl mx-auto mb-16 flex flex-col items-center">
          <span className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-teal-medium mb-3 block">
            Crafted with Love
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-semibold text-teal-dark tracking-tight leading-tight">
            Explore Our Culinary <span className="text-gold-dark italic font-light">Elegance</span>
          </h2>
          <div className="w-16 h-1 bg-gold-accent mt-4 rounded-full" />
          <p className="font-sans text-sm text-gray-600 mt-4 max-w-lg leading-relaxed">
            All our dishes are accompanied by freshly baked sourdough <strong>Injera</strong>, made from 100% organic Teff (naturally gluten-free).
          </p>
        </div>

        {/* Floating Teff Quality Notice Banner */}
        <div id="teff-quality-notice" className="mb-10 bg-teal-dark text-white rounded-sm border border-gold-dark/30 p-4 shadow-md flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-sm bg-teal-medium text-gold-accent">
              <Info size={20} className="animate-pulse" />
            </div>
            <div>
              <h4 className="font-serif text-[17px] font-bold tracking-wide text-gold-accent">Our Teff is 100% Pure</h4>
              <p className="font-sans text-xs text-gray-200 mt-0.5 max-w-xl">
                Unlike mass-produced counterparts containing wheat fillers, we mill pure iron-rich red & ivory teff weekly. Our Injera is fermenting for 3 full days to deliver the authentic, sour tang.
              </p>
            </div>
          </div>
          <span className="font-mono text-[9px] uppercase tracking-widest text-teal-medium bg-gold-accent px-3 py-1.5 rounded-full text-bg-dark font-bold whitespace-nowrap">
            100% Gluten-Free Injera Available
          </span>
        </div>

        {/* Filter Toolbar Controls */}
        <div id="menu-filter-toolbar" className="bg-white rounded-sm border border-gold-accent/15 p-6 shadow-md mb-8 flex flex-col space-y-6">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            
            {/* Search inputs */}
            <div className="md:col-span-4 relative">
              <label htmlFor="menu-search-input" className="sr-only">Search menu items</label>
              <input
                id="menu-search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search tender tibs, misir, spicy stew..."
                className="w-full bg-bg-light border border-gold-accent/20 rounded-sm py-3 pl-11 pr-4 font-sans text-sm text-teal-dark placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-teal-medium focus:border-teal-medium transition-all"
              />
              <Search className="absolute left-4 top-3.5 text-slate-400" size={16} />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-3 text-[10px] text-gray-400 hover:text-gray-600 uppercase font-bold"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Diet specific selectors */}
            <div className="md:col-span-4">
              <div className="flex bg-bg-beige/40 p-1 rounded-sm border border-gold-accent/10 items-center justify-between">
                <span className="hidden sm:inline font-mono text-[10px] uppercase text-gray-500 pl-3">Diet:</span>
                <div className="flex gap-1 w-full sm:w-auto justify-end">
                  {[
                    { id: 'all', label: 'All' },
                    { id: 'vegan', label: 'Vegan 🌱' },
                    { id: 'gf', label: 'Gluten-Free 🌾' },
                  ].map((diet) => (
                    <button
                      key={diet.id}
                      onClick={() => setSelectedDiet(diet.id as 'all' | 'vegan' | 'gf')}
                      className={`text-[11px] font-sans font-bold px-3 py-1.5 rounded-sm transition-all focus:outline-none cursor-pointer ${
                        selectedDiet === diet.id
                          ? 'bg-teal-medium text-white shadow-sm'
                          : 'text-teal-dark hover:bg-gold-accent/10'
                      }`}
                    >
                      {diet.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Spicy Rating Level */}
            <div className="md:col-span-4">
              <div className="flex bg-bg-beige/40 p-1 rounded-sm border border-gold-accent/10 items-center justify-between">
                <span className="hidden sm:inline font-mono text-[10px] uppercase text-gray-500 pl-3">Heat Level:</span>
                <div className="flex gap-1 w-full sm:w-auto justify-end">
                  {[
                    { id: 'all', label: 'All' },
                    { id: 0, label: 'Mild' },
                    { id: 1, label: '🌶️' },
                    { id: 2, label: '🌶️🌶️' },
                    { id: 3, label: '🌶️🌶️🌶️' },
                  ].map((spicy) => (
                    <button
                      key={spicy.id}
                      onClick={() => setSelectedSpicy(spicy.id as number | 'all')}
                      className={`text-[11px] font-sans font-bold px-2.5 py-1.5 rounded-sm transition-all focus:outline-none cursor-pointer ${
                        selectedSpicy === spicy.id
                          ? 'bg-gold-accent text-bg-dark shadow-sm'
                          : 'text-teal-dark hover:bg-gold-accent/10'
                      }`}
                    >
                      {spicy.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

          </div>

          {/* Large Tab Selectors */}
          <div className="border-t border-gray-150 pt-4 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-1 flex-wrap gap-4 sm:gap-8 border-b border-gray-150 pb-px">
              {categories.map((cat) => {
                const CatIcon = cat.icon;
                const isSelected = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    id={`menu-cat-trigger-${cat.id}`}
                    onClick={() => setActiveCategory(cat.id as 'all' | 'meat' | 'vegan' | 'drinks')}
                    className={`relative flex items-center gap-1.5 pb-4 text-xs font-bold tracking-widest uppercase font-sans transition-all focus:outline-none cursor-pointer ${
                      isSelected
                        ? 'text-gold-accent border-b-2 border-gold-accent font-extrabold'
                        : 'text-teal-dark/50 hover:text-teal-dark'
                    }`}
                  >
                    <CatIcon size={12} className={isSelected ? 'text-gold-accent' : 'text-teal-dark/40'} />
                    {cat.label}
                  </button>
                );
              })}
            </div>

            {/* Clear Filters Indicator */}
            {(searchQuery || selectedDiet !== 'all' || selectedSpicy !== 'all' || activeCategory !== 'all') && (
              <button
                onClick={resetFilters}
                className="flex items-center gap-1.5 text-xs font-mono font-bold text-gold-dark hover:text-teal-medium transition-colors focus:outline-none cursor-pointer self-center"
              >
                <RefreshCw size={11} className="animate-spin" style={{ animationDuration: '4s' }} />
                Reset Filters
              </button>
            )}
          </div>

        </div>

        {/* Menu Grid Items Layout */}
        <div id="menu-items-grid" className="min-h-[300px]">
          <AnimatePresence mode="wait">
            {filteredItems.length > 0 ? (
              <motion.div
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {filteredItems.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.3 }}
                    className="group bg-white rounded-sm border border-gold-accent/15 hover:border-gold-accent/40 hover:shadow-xl p-6 transition-all duration-300 relative flex flex-col justify-between"
                  >
                    {/* Header line */}
                    <div>
                      <div className="flex justify-between items-start gap-3 mb-2">
                        <h3 className="font-serif text-xl font-bold text-teal-dark group-hover:text-gold-dark transition-colors duration-300">
                          {item.name}
                        </h3>
                        <div className="flex items-center gap-1 mt-1">
                          <span className="font-serif text-[17px] font-bold text-teal-medium">
                            ${item.price.toFixed(2)}
                          </span>
                        </div>
                      </div>

                      {/* Dietary Badges */}
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {item.tags.map((tag) => (
                          <span
                            key={tag}
                            className={`font-mono text-[9px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-sm ${
                              tag === 'Vegan'
                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                : tag === 'Gluten-Free'
                                ? 'bg-amber-50 text-amber-800 border border-amber-200'
                                : 'bg-teal-50 text-teal-800 border border-teal-200'
                            }`}
                          >
                            {tag}
                          </span>
                        ))}
                        {item.spicyLevel > 0 && (
                          <div className="flex items-center gap-0.5 rounded-sm bg-red-50 border border-red-100 px-1.5 py-0.5">
                            {Array.from({ length: item.spicyLevel }).map((_, i) => (
                              <Flame key={i} size={10} className="text-red-600 fill-red-600" />
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Description Text */}
                      <p className="font-sans text-xs text-slate-600 leading-relaxed font-normal">
                        {item.description}
                      </p>
                    </div>

                    {/* Bottom graphic line representing fine dining decoration */}
                    <div className="mt-6 pt-4 border-t border-dotted border-gold-accent/20 flex items-center justify-between">
                      <span className="font-mono text-[8px] uppercase tracking-widest text-gray-400">
                        ABYSSINIA BITES
                      </span>
                      {item.category === 'vegan' ? (
                        <Leaf size={14} className="text-emerald-500 opacity-60" />
                      ) : item.category === 'meat' ? (
                        <Filter size={14} className="text-amber-600 opacity-60" />
                      ) : (
                        <svg className="w-3.5 h-3.5 text-teal-medium opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l.707.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
                        </svg>
                      )}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-16 bg-white rounded-sm border border-gold-accent/15 max-w-lg mx-auto p-8"
              >
                <Filter className="mx-auto text-gold-accent mb-4 animate-bounce" size={40} />
                <h3 className="font-serif text-xl font-bold text-teal-dark">No Dishes Match Filters</h3>
                <p className="font-sans text-xs text-gray-500 mt-2 leading-relaxed">
                  We are sorry! We couldn't find any dishes matching this exact combination of category, search string, dietary constraints, and spicy preference.
                </p>
                <button
                  onClick={resetFilters}
                  className="mt-6 text-xs bg-teal-medium hover:bg-teal-light text-white font-sans tracking-widest uppercase font-bold px-4 py-2.5 rounded-sm transition-all"
                >
                  Show All Items
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
