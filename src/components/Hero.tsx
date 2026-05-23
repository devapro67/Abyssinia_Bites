import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Leaf, Users, Star } from 'lucide-react';
import { GALLERY_IMAGES } from '../data';

interface HeroProps {
  onScrollToSection: (sectionId: string) => void;
}

export default function Hero({ onScrollToSection }: HeroProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1], // Premium ease-out cubic-bezier
      },
    },
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen bg-bg-dark flex items-center pt-24 pb-12 overflow-hidden"
    >
      {/* Editorial Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-radial from-teal-medium/10 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-radial from-gold-accent/5 to-transparent pointer-events-none" />
      
      {/* Background Graphic Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

      <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Typographic Columns */}
          <motion.div
            className="lg:col-span-6 flex flex-col items-start text-left space-y-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div
              id="hero-label-container"
              variants={itemVariants}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gold-accent/30 bg-gold-accent/5"
            >
              <Star size={12} className="text-gold-accent animate-pulse" />
              <span className="font-mono text-xs font-bold tracking-[0.25em] text-gold-accent uppercase">
                An Authentic Ethiopian Kitchen
              </span>
            </motion.div>

            <motion.h1
              id="hero-main-heading"
              variants={itemVariants}
              className="font-serif text-5xl md:text-6xl xl:text-7xl font-semibold text-white leading-[1.1] tracking-tight"
            >
              Authentic <br />
              <span className="text-gold-accent font-serif font-light italic">Ethiopian</span> Flavors, <br />
              <span className="relative">
                Crafted for Community
                <span className="absolute bottom-2 left-0 w-full h-[6px] bg-teal-medium/80 -z-10" />
              </span>
            </motion.h1>

            <motion.p
              id="hero-description-paragraph"
              variants={itemVariants}
              className="font-sans text-base md:text-lg text-gray-300 font-normal leading-relaxed max-w-lg"
            >
              Welcome to <span className="text-white font-medium">Abyssinia Bites</span>, where ancient traditions meet modern refinement. Gather around our sourdough Injera, share the rich depth of hand-blended Berbere, and celebrate the beautiful, slow art of our coffee ceremonies.
            </motion.p>

            {/* CTA action buttons */}
            <motion.div
              id="hero-actions-container"
              variants={itemVariants}
              className="flex flex-wrap gap-4 pt-2 w-full sm:w-auto"
            >
              <button
                id="hero-view-menu-btn"
                onClick={() => onScrollToSection('menu')}
                className="group relative flex items-center gap-2 bg-gold-accent text-bg-dark hover:bg-gold-light px-8 py-4 font-bold uppercase tracking-widest text-xs font-sans transition-all duration-300 rounded-none shadow-md hover:shadow-gold-accent/10 focus:outline-none cursor-pointer"
              >
                Explore Our Menu
                <ArrowRight size={14} className="group-hover:translate-x-1.5 transition-transform duration-300" />
              </button>
              
              <button
                id="hero-book-table-btn"
                onClick={() => onScrollToSection('reserve')}
                className="flex items-center gap-2 border border-gold-accent text-gold-accent hover:bg-gold-accent hover:text-bg-dark px-8 py-4 font-bold uppercase tracking-widest text-xs font-sans transition-all duration-300 rounded-none focus:outline-none cursor-pointer"
              >
                Book a Table
              </button>
            </motion.div>

            {/* Dynamic Culinary Highlights badge bars */}
            <motion.div
              id="hero-highlights-badges"
              variants={itemVariants}
              className="grid grid-cols-2 md:grid-cols-3 gap-6 pt-8 border-t border-gray-900 w-full"
            >
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-sm bg-teal-medium/10 border border-teal-medium/20 text-gold-accent">
                  <Leaf size={18} />
                </div>
                <div>
                  <h4 className="font-sans text-xs font-bold uppercase tracking-wider text-white">100% Teff</h4>
                  <p className="font-sans text-[11px] text-gray-400">Authentic Gluten-Free Injera</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-sm bg-teal-medium/10 border border-teal-medium/20 text-gold-accent">
                  <Users size={18} />
                </div>
                <div>
                  <h4 className="font-sans text-xs font-bold uppercase tracking-wider text-white">Gursha Feast</h4>
                  <p className="font-sans text-[11px] text-gray-400">Shared plates & platters</p>
                </div>
              </div>
              <div className="flex items-center gap-3 col-span-2 md:col-span-1">
                <div className="p-2.5 rounded-sm bg-teal-medium/10 border border-teal-medium/20 text-gold-accent">
                  <Star size={18} />
                </div>
                <div>
                  <h4 className="font-sans text-xs font-bold uppercase tracking-wider text-white">Imported Spices</h4>
                  <p className="font-sans text-[11px] text-gray-400">Sun-dried sun-ground spices</p>
                </div>
              </div>
            </motion.div>

          </motion.div>

          {/* Visual Platter Image Column */}
          <div className="lg:col-span-6 relative flex justify-center">
            <motion.div
              id="hero-image-frame"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: 'easeOut', delay: 0.15 }}
              className="relative w-full max-w-xl aspect-[4/3] rounded-sm p-2 border border-gold-accent/30 bg-bg-dark/80 shadow-2xl overflow-hidden group"
            >
              <div className="relative w-full h-full overflow-hidden rounded-sm">
                {/* Real local generated asset */}
                <img
                  src={GALLERY_IMAGES.injera}
                  alt="Traditional Ethiopian communal Injera food platter with colorful wot stews at Abyssinia Bites"
                  className="w-full h-full object-cover transform duration-1000 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                  id="hero-asset-img"
                />
                
                {/* Elegant overlay gradient frame */}
                <div className="absolute inset-0 bg-gradient-to-t from-bg-dark/80 via-transparent to-transparent opacity-80" />

                <div className="absolute bottom-4 left-4 right-4 bg-bg-dark/90 backdrop-blur-md p-4 rounded-sm border border-gold-accent/20 flex justify-between items-center">
                  <div>
                    <span className="font-mono text-[9px] uppercase tracking-widest text-gold-accent">COMMUNAL EXPERIENCE</span>
                    <h3 className="font-serif text-lg text-white font-medium">Bountiful Ge’beta Platter</h3>
                  </div>
                  <span className="font-serif text-xl font-bold text-gold-accent">$26.00</span>
                </div>
              </div>
              
              {/* Outer floating golden ornament lines representing premium fine dining feel */}
              <div className="absolute -top-1 -left-1 w-6 h-6 border-t-2 border-l-2 border-gold-accent" />
              <div className="absolute -top-1 -right-1 w-6 h-6 border-t-2 border-r-2 border-gold-accent" />
              <div className="absolute -bottom-1 -left-1 w-6 h-6 border-b-2 border-l-2 border-gold-accent" />
              <div className="absolute -bottom-1 -right-1 w-6 h-6 border-b-2 border-r-2 border-gold-accent" />
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
