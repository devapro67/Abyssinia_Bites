import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Soup, HeartHandshake, Coffee, Award, Utensils, Share2, X, Link, Facebook, Send, Mail, Check } from 'lucide-react';
import { CULTURAL_STORIES, GALLERY_IMAGES } from '../data';

export default function AboutStory() {
  const [activeTab, setActiveTab] = useState<'gursha' | 'spices' | 'buna'>('gursha');
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const tabsInfo = [
    { id: 'gursha', label: 'The Gursha Ritual', icon: HeartHandshake, title: 'Communal Bonding' },
    { id: 'spices', label: 'Sun-ground Spices', icon: Soup, title: 'Flame & Aroma' },
    { id: 'buna', label: 'Traditional Coffee', icon: Coffee, title: 'Sacred Ceremony' },
  ];

  const activeStoryDetail = CULTURAL_STORIES.find((story) => story.id === activeTab) || CULTURAL_STORIES[0];

  const shareUrl = "https://abyssiniabites.com/story/adinew-mekonnen";

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="about" className="py-24 bg-bg-light relative overflow-hidden">
      {/* Decorative Warm Elements */}
      <div className="absolute top-0 left-0 w-1/4 h-1/4 bg-radial from-gold-accent/5 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-radial from-teal-medium/5 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Editorial Title Header */}
        <div id="about-heading-container" className="text-center max-w-2xl mx-auto mb-16 flex flex-col items-center">
          <span className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-teal-medium mb-3 block">
            Cultural Heritage & Story
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-semibold text-teal-dark tracking-tight leading-tight">
            Rooted in Flavor, Joined in <span className="text-gold-dark italic font-light">Community</span>
          </h2>
          <div className="w-16 h-1 bg-gold-accent mt-4 rounded-full" />
        </div>

        {/* Story Grid Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Tabs Selector and Story Content Area (Left side) */}
          <div className="lg:col-span-7 flex flex-col space-y-8 order-2 lg:order-1">
            
            {/* Custom Interactive Tab Controls */}
            <div
              id="story-tab-selector"
              className="flex space-x-6 sm:space-x-8 border-b border-gold-accent/20 pb-px"
            >
              {tabsInfo.map((tab) => {
                const TabIcon = tab.icon;
                const isCurrent = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    id={`story-tab-trigger-${tab.id}`}
                    onClick={() => setActiveTab(tab.id as 'gursha' | 'spices' | 'buna')}
                    className={`relative pb-4 text-xs tracking-widest font-sans font-bold uppercase transition-all duration-300 focus:outline-none cursor-pointer flex items-center gap-1.5 ${
                      isCurrent
                        ? 'text-gold-accent border-b-2 border-gold-accent font-extrabold'
                        : 'text-teal-dark/50 hover:text-teal-dark'
                    }`}
                  >
                    <TabIcon size={14} className="opacity-80" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Content Box with transition effect */}
            <div id="story-content-box" className="min-h-[280px] flex flex-col justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  className="space-y-4"
                >
                  <div className="inline-flex items-center gap-1.5 text-gold-dark font-mono text-xs uppercase tracking-wider font-bold">
                    <Sparkles size={14} className="animate-spin" style={{ animationDuration: '6s' }} />
                    {activeStoryDetail.subtitle}
                  </div>
                  
                  <h3 className="font-serif text-3xl font-bold text-teal-dark">
                    {activeStoryDetail.title}
                  </h3>
                  
                  <p className="font-sans text-base text-gray-700 leading-relaxed font-normal">
                    {activeStoryDetail.content}
                  </p>

                  {/* Aesthetic quote bullet */}
                  <div className="border-l-2 border-gold-accent pl-4 mt-6 italic font-serif text-lg text-teal-medium font-medium">
                    {activeTab === 'gursha' && '"Let us dine. To feed another is the highest praise of friendship."'}
                    {activeTab === 'spices' && '"In our spices is the sun, the wind, and the clay of the highlands."'}
                    {activeTab === 'buna' && '"Abol prepares the mind, Tona heals the soul, Bereka seals the friendship."'}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

          </div>

          {/* Traditional Image Display Frame (Right side) */}
          <div className="lg:col-span-5 flex justify-center order-1 lg:order-2">
            <div className="relative w-full max-w-sm aspect-[4/5] rounded-sm p-2 border border-gold-accent/20 bg-white shadow-xl overflow-hidden group">
              <div className="relative w-full h-full overflow-hidden rounded-sm bg-teal-dark">
                {/* Visual ceremony asset generated via our custom pipeline */}
                <img
                  src={GALLERY_IMAGES.coffee}
                  alt="Traditional Ethiopian Buna clay Jebena coffee ceremony presentation"
                  className="w-full h-full object-cover transform duration-700 hover:scale-105"
                  referrerPolicy="no-referrer"
                  id="about-asset-img"
                />
                
                {/* Golden shade overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-teal-dark/60 via-transparent to-transparent pointer-events-none" />

                <div className="absolute bottom-4 left-4 right-4 bg-bg-dark/90 backdrop-blur-md p-3.5 rounded-sm border border-gold-accent/20">
                  <span className="font-mono text-[9px] uppercase tracking-widest text-gold-accent">CELEBRATING HOSPITALITY</span>
                  <h4 className="font-serif text-base text-white font-semibold">The Clay Jebena Pot</h4>
                  <p className="font-sans text-[10px] text-gray-400 mt-0.5">Slow-brewed over glowing coals</p>
                </div>
              </div>

              {/* Corner accents */}
              <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-gold-accent" />
              <div className="absolute top-4 right-4 w-4 h-4 border-t border-r border-gold-accent" />
              <div className="absolute bottom-4 left-4 w-4 h-4 border-b border-l border-gold-accent" />
              <div className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-gold-accent" />
            </div>
          </div>

        </div>

        {/* Meet the Chef Sub-Section */}
        <div 
          id="meet-the-chef-section" 
          className="mt-28 pt-20 border-t border-gold-accent/20 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
        >
          {/* Portrait Frame Left (5 columns) */}
          <div className="lg:col-span-5 flex justify-center relative">
            {/* Elegant background offset accent */}
            <div className="absolute -inset-1.5 bg-gradient-to-tr from-gold-accent to-teal-medium opacity-30 blur-sm rounded-none pointer-events-none" />
            
            {/* The primary portrait box */}
            <div className="relative w-full max-w-[340px] aspect-[3/4] p-3 border-2 border-gold-accent/40 bg-white shadow-2xl overflow-hidden group">
              <div className="relative w-full h-full overflow-hidden rounded-none bg-teal-dark">
                <img
                  src="/src/assets/images/head_chef_portrait_1779517242814.png"
                  alt="Executive Chef Adinew Mekonnen portrait"
                  className="w-full h-full object-cover transform duration-700 ease-out group-hover:scale-105"
                  referrerPolicy="no-referrer"
                  id="chef-portrait-img"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg-dark/80 via-transparent to-transparent pointer-events-none" />

                {/* Badge layout overlay inside image frame */}
                <div className="absolute bottom-5 left-5 right-5">
                  <span className="font-mono text-[8px] uppercase tracking-widest text-gold-accent bg-bg-dark/80 px-2 py-1 border border-gold-accent/20 inline-block mb-1.5">
                    GUARDIAN OF FLAVOR
                  </span>
                  <h4 className="font-serif text-lg text-white font-semibold flex items-center gap-1.5">
                    Chef Adinew Mekonnen
                  </h4>
                  <p className="font-sans text-[10px] text-gray-300">Executive Chef & Co-Founder</p>
                </div>
              </div>

              {/* Sophisticated metallic corner brackets */}
              <div className="absolute top-5 left-5 w-4 h-4 border-t-2 border-l-2 border-gold-accent" />
              <div className="absolute top-5 right-5 w-4 h-4 border-t-2 border-r-2 border-gold-accent" />
              <div className="absolute bottom-5 left-5 w-4 h-4 border-b-2 border-l-2 border-gold-accent" />
              <div className="absolute bottom-5 right-5 w-4 h-4 border-b-2 border-r-2 border-gold-accent" />
            </div>
          </div>

          {/* Biography Content Right (7 columns) */}
          <div id="chef-biography-block" className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <span className="font-mono text-[9px] font-bold text-gold-accent uppercase tracking-[0.25em] block">
                The Hands Behind the Feast
              </span>
              <h3 className="font-serif text-3xl md:text-4xl font-semibold text-teal-dark tracking-tight">
                Honoring the Sacred <span className="text-gold-dark italic font-light">Patience</span> of Ethiopian Cooking
              </h3>
              <div className="w-12 h-1 bg-gold-accent mt-2" />
            </div>

            <p className="font-sans text-sm text-gray-700 leading-relaxed font-normal">
              Born and raised in the heart of Addis Ababa, Chef Adinew Mekonnen learned the sacred laws of Ethiopian cuisine at the edge of his family's open clay hearth. For Chef Adinew, traditional cooking is not a set of instructions—it is a spiritual rhythm. It is knowing exactly when the red onions have reached their sweet, jam-like caramelization, and hand-feeling the specific heat of sun-dried Berbere spices to preserve their floral top notes.
            </p>

            <p className="font-sans text-sm text-gray-750 leading-relaxed font-normal">
              After developing his craft in fine culinary kitchens across the globe, he founded <strong>Abyssinia Bites</strong> with a singular mission: to strip away the shortcut methods of modern restaurants and return to the authentic, uncompromising techniques of his heritage.
            </p>

            {/* Chef's Philosophy Callout highlight */}
            <div className="p-5 bg-teal-medium/5 border-l-2 border-gold-accent italic font-serif text-base text-teal-dark relative space-y-3">
              <p>
                "In Ethiopia, food is never a solo experience. It is a shared sacrament of community and love. To cook with patience is to show respect to those who gather at your table."
              </p>
              <div className="flex items-center gap-2 pt-2 border-t border-teal-medium/10">
                <div className="w-7 h-7 rounded-full bg-gold-accent/10 flex items-center justify-center text-gold-dark">
                  <Award size={14} className="text-gold-dark animate-pulse" />
                </div>
                <span className="font-mono text-[10px] text-gold-dark font-bold uppercase tracking-wider">
                  Awarded Best Regional Heritage Chef 2024
                </span>
              </div>
            </div>

            {/* Core Values / Signature Features */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-teal-medium/10 flex items-center justify-center shrink-0 mt-0.5">
                  <Utensils size={14} className="text-teal-medium" />
                </div>
                <div>
                  <h5 className="font-sans text-xs font-bold text-teal-dark uppercase tracking-wider">Zero Short-Cuts</h5>
                  <p className="font-sans text-[11px] text-gray-500 mt-1 leading-relaxed">
                    Our rich spice blends are slow-roasted, ground by hand, and simmered for a minimum of 12 painstaking hours.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-teal-medium/10 flex items-center justify-center shrink-0 mt-0.5">
                  <Soup size={14} className="text-teal-medium" />
                </div>
                <div>
                  <h5 className="font-sans text-xs font-bold text-teal-dark uppercase tracking-wider">Highland Sourcing</h5>
                  <p className="font-sans text-[11px] text-gray-500 mt-1 leading-relaxed">
                    Every seed-pod of Korarima, Black Cardamom, and sacred herbed butter is imported directly from organic farmer collectives.
                  </p>
                </div>
              </div>
            </div>

            {/* Share Chef's Story CTA */}
            <div className="pt-4 flex">
              <button
                id="share-chef-story-trigger"
                onClick={() => setIsShareModalOpen(true)}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-teal-dark to-teal-medium hover:from-gold-dark hover:to-gold-accent text-white hover:text-bg-dark font-sans text-xs tracking-widest uppercase font-bold px-6 py-3 border border-teal-dark/10 shadow-md hover:shadow-teal-medium/10 transition-all duration-300 cursor-pointer"
              >
                <Share2 size={13} />
                Share Chef's Story
              </button>
            </div>

          </div>
        </div>

      </div>

      {/* Share Modal AnimatePresence */}
      <AnimatePresence>
        {isShareModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-bg-dark/85 backdrop-blur-sm">
            {/* Background click to close */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsShareModalOpen(false)}
              className="absolute inset-0 cursor-pointer"
            />
            
            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: "spring", duration: 0.5, bounce: 0.15 }}
              className="bg-bg-dark border-2 border-gold-accent/40 text-white w-full max-w-md relative z-10 p-6 md:p-8 rounded-none shadow-2xl"
            >
              {/* Corner metal clips */}
              <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-gold-accent" />
              <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-gold-accent" />
              <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-gold-accent" />
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-gold-accent" />

              {/* Close Button */}
              <button
                id="close-share-modal"
                onClick={() => setIsShareModalOpen(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gold-accent p-1 transition-colors cursor-pointer rounded-none"
              >
                <X size={18} />
              </button>

              <div className="space-y-6">
                
                {/* Title */}
                <div className="text-center space-y-1">
                  <span className="font-mono text-[9px] uppercase tracking-widest text-gold-accent font-bold">SPREAD THE HERITAGE</span>
                  <h4 className="font-serif text-xl font-bold text-white tracking-tight animate-none">Share Chef Adinew's Legacy</h4>
                  <div className="w-12 h-0.5 bg-gold-accent mx-auto mt-2" />
                </div>

                {/* Card preview */}
                <div className="flex gap-4 p-4 bg-stone-900 border border-gray-800">
                  <div className="w-16 h-16 shrink-0 bg-teal-dark overflow-hidden p-1 border border-gold-accent/20">
                    <img 
                      src="/src/assets/images/head_chef_portrait_1779517242814.png" 
                      alt="Adinew Mekonnen Portrait" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h5 className="font-serif text-xs font-bold text-gold-accent">Chef Adinew Mekonnen</h5>
                    <p className="font-sans text-[10px] text-gray-400 mt-1 line-clamp-3 leading-relaxed">
                      "Traditional cooking is not a set of instructions—it is a spiritual rhythm. Share his culinary journey and connection to Ethiopian heritage."
                    </p>
                  </div>
                </div>

                {/* Form Link Copy */}
                <div className="space-y-2">
                  <label htmlFor="share-input-link" className="block font-mono text-[9px] uppercase text-gray-400 tracking-wider">
                    Direct Story URL
                  </label>
                  <div className="flex">
                    <input
                      id="share-input-link"
                      type="text"
                      readOnly
                      value={shareUrl}
                      className="w-full bg-stone-950 border border-gray-800 px-3 py-2 text-xs font-mono text-gray-300 focus:outline-none rounded-none"
                    />
                    <button
                      id="copy-link-btn"
                      onClick={handleCopyLink}
                      className="bg-gold-accent text-bg-dark hover:bg-gold-light px-4 py-2 font-sans text-xs uppercase font-bold tracking-wider transition-colors cursor-pointer rounded-none shrink-0 flex items-center justify-center gap-1 min-w-[95px]"
                    >
                      {copied ? (
                        <>
                          <Check size={12} />
                          Copied
                        </>
                      ) : (
                        <>
                          <Link size={12} />
                          Copy
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Social Grid buttons */}
                <div className="space-y-2">
                  <span className="block font-mono text-[9px] uppercase text-gray-400 tracking-wider">
                    Share via Socials
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    <a
                      href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-1.5 px-3 py-2.5 bg-stone-900 border border-gray-800 hover:border-gold-accent/40 text-[10px] font-sans font-bold uppercase tracking-wider text-gray-300 hover:text-gold-accent transition-colors"
                    >
                      <Facebook size={12} />
                      Facebook
                    </a>
                    <a
                      href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent("Meet Chef Adinew Mekonnen, the culinary craftsman at Abyssinia Bites honoring slow food traditions.")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-1.5 px-3 py-2.5 bg-stone-900 border border-gray-800 hover:border-gold-accent/40 text-[10px] font-sans font-bold uppercase tracking-wider text-gray-300 hover:text-gold-accent transition-colors"
                    >
                      <Send size={12} />
                      Twitter / X
                    </a>
                    <a
                      href={`https://api.whatsapp.com/send?text=${encodeURIComponent("Read this beautiful story about Head Chef Adinew Mekonnen: " + shareUrl)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-1.5 px-3 py-2.5 bg-stone-900 border border-gray-800 hover:border-gold-accent/40 text-[10px] font-sans font-bold uppercase tracking-wider text-gray-300 hover:text-gold-accent transition-colors"
                    >
                      <Send size={12} />
                      WhatsApp
                    </a>
                    <a
                      href={`mailto:?subject=${encodeURIComponent("Chef Adinew Mekonnen - Culinary Legacy")}&body=${encodeURIComponent("Check out this amazing biography of Adinew Mekonnen: " + shareUrl)}`}
                      className="flex items-center justify-center gap-1.5 px-3 py-2.5 bg-stone-900 border border-gray-800 hover:border-gold-accent/40 text-[10px] font-sans font-bold uppercase tracking-wider text-gray-300 hover:text-gold-accent transition-colors"
                    >
                      <Mail size={12} />
                      Email
                    </a>
                  </div>
                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
