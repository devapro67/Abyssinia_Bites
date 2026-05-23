import React from 'react';
import { motion } from 'motion/react';
import { Flame, Star, Sparkles, UtensilsCrossed, ArrowRight } from 'lucide-react';
import { GALLERY_IMAGES } from '../data';

interface ChefsSpotlightProps {
  onScrollToSection: (sectionId: string) => void;
}

export default function ChefsSpotlight({ onScrollToSection }: ChefsSpotlightProps) {
  return (
    <section 
      id="spotlight" 
      className="py-24 bg-teal-dark text-white relative overflow-hidden"
    >
      {/* Decorative premium elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,#1B4D4B80,transparent)] pointer-events-none" />
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-radial from-gold-accent/10 to-transparent pointer-events-none" />
      <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-bg-dark/20 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Spotight Header */}
        <div id="spotlight-title-block" className="text-center max-w-2xl mx-auto mb-16 flex flex-col items-center">
          <span className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-gold-accent mb-3 block">
            The Crown Jewel
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-semibold text-white tracking-tight leading-tight">
            Chef’s Culinary <span className="text-gold-accent italic font-light">Spotlight</span>
          </h2>
          <div className="w-16 h-1 bg-gold-accent mt-4 rounded-full" />
          <p className="font-sans text-xs text-gray-300 mt-4 max-w-lg leading-relaxed">
            Every day, our master chefs curate a single, extraordinarily complex traditional dish that requires time, ancient techniques, and absolute devotion.
          </p>
        </div>

        {/* Highlight Card Block */}
        <div 
          id="spotlight-card-container"
          className="bg-bg-dark/95 border-2 border-gold-accent/40 rounded-none shadow-2xl overflow-hidden max-w-5xl mx-auto relative group"
        >
          {/* Subtle gold outer corner highlights */}
          <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-gold-accent" />
          <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-gold-accent" />
          <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-gold-accent" />
          <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-gold-accent" />

          <div className="grid grid-cols-1 lg:grid-cols-12">
            
            {/* Spotlight Image & Visual Badge container */}
            <div className="lg:col-span-5 h-[320px] lg:h-auto relative overflow-hidden bg-teal-dark min-h-[350px]">
              <img 
                src={GALLERY_IMAGES.injera} 
                alt="Chef's masterpiece Celebration Doro Wot" 
                className="w-full h-full object-cover transform duration-700 ease-out group-hover:scale-103"
                referrerPolicy="no-referrer"
                id="spotlight-featured-image"
              />
              <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-bg-dark via-transparent to-transparent opacity-85" />
              
              {/* Floating Award Label */}
              <div className="absolute top-6 left-6 bg-gold-accent text-bg-dark font-sans text-[10px] font-black uppercase tracking-widest px-3.5 py-2 border border-gold-light/40 shadow-lg flex items-center gap-1.5 z-20">
                <Star size={12} className="fill-bg-dark text-bg-dark animate-spin" style={{ animationDuration: '8s' }} />
                <span>Masterpiece Dish</span>
              </div>

              {/* Price floating tag */}
              <div className="absolute bottom-6 left-6 z-20 bg-bg-dark/90 backdrop-blur-md px-4 py-2 border border-gold-accent/20">
                <span className="block font-mono text-[8px] text-gray-400 uppercase tracking-widest">SPOTLIGHT VALUE</span>
                <span className="font-serif text-2xl font-bold text-gold-accent">$25.00</span>
              </div>
            </div>

            {/* Content, Story and Table Reservations trigger */}
            <div className="lg:col-span-7 p-8 md:p-12 flex flex-col justify-between space-y-8">
              
              <div className="space-y-4">
                
                {/* Visual Category & Spicy Scale */}
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[9px] font-bold text-gold-accent uppercase tracking-[0.2em] bg-gold-accent/10 px-2.5 py-1 rounded-none border border-gold-accent/20">
                    Traditional Feast (Doro Wot)
                  </span>
                  <div className="flex items-center gap-0.5 bg-red-950/40 border border-red-900/40 px-2 py-0.5">
                    <Flame size={11} className="text-red-500 fill-red-500" />
                    <Flame size={11} className="text-red-500 fill-red-500" />
                    <span className="font-mono text-[9px] text-red-400 ml-1 font-bold uppercase tracking-wider">Aromatic Spicy</span>
                  </div>
                </div>

                <h3 className="font-serif text-3xl md:text-4xl font-bold text-white tracking-tight leading-none">
                  Celebration <span className="text-gold-accent italic font-light">Doro Wot</span>
                </h3>

                {/* Cultural Narrative Text */}
                <div className="p-4 bg-teal-medium/10 border-l-2 border-gold-accent font-sans text-xs text-gray-300 italic leading-relaxed">
                  "If a host serves you Doro Wot, you are welcomed as family. It is the ultimate culinary demonstration of respect."
                </div>

                <p className="font-sans text-sm text-gray-300 leading-relaxed font-normal">
                  Doro Wot is the undisputed King of Ethiopian cuisine. This isn't just basic food preparation—it is a <strong>slow-cooked, twelve-hour ritual</strong>. We start with four kilograms of hand-caramelized red onions slow-cooked dry without oil. We slow-infuse our house sun-dried Berbere spices and aromatic herbed butter (Niter Kibbeh). Tender chicken legs are slow-simmered in this velvety, complex red gravy until falling off the bone, served alongside organic hard-boiled eggs that absorb the rich spice complexity.
                </p>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-4 border-t border-gray-950">
                  <div>
                    <span className="block font-mono text-[9px] text-gray-500 uppercase tracking-widest">PREP HOUR</span>
                    <span className="font-sans text-xs font-bold text-white">12 Hours Cook</span>
                  </div>
                  <div>
                    <span className="block font-mono text-[9px] text-gray-500 uppercase tracking-widest">GLUTEN-FREE</span>
                    <span className="font-sans text-xs font-bold text-white">100% Teff Injera</span>
                  </div>
                  <div className="col-span-2 md:col-span-1">
                    <span className="block font-mono text-[9px] text-gray-500 uppercase tracking-widest">ACCOMPANIED</span>
                    <span className="font-sans text-xs font-bold text-white">Spiced Hard Egg, Ayibe</span>
                  </div>
                </div>

              </div>

              {/* Call to Order Table reservation button */}
              <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
                <button
                  id="spotlight-reserve-btn"
                  onClick={() => onScrollToSection('reserve')}
                  className="w-full sm:w-auto bg-gradient-to-r from-gold-accent to-gold-dark hover:from-gold-light hover:to-gold-accent text-bg-dark font-sans text-xs tracking-widest uppercase font-bold px-8 py-4 rounded-none transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-md hover:shadow-gold-accent/15"
                >
                  <UtensilsCrossed size={14} />
                  Book Table to Feast
                  <ArrowRight size={14} className="animate-pulse" />
                </button>
                <div className="flex flex-col justify-center text-center sm:text-left">
                  <span className="font-mono text-[8px] uppercase tracking-wider text-gray-500">LIMITED WEEKEND CAPACITY</span>
                  <p className="font-sans text-[11px] text-gray-300">Reserve a slot to ensure your portion of Doro Wot won't run out!</p>
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
