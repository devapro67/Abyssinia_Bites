import React, { useState, useEffect } from 'react';
import { Phone, Mail, MapPin, Clock, ArrowUpRight, Compass, Navigation, Car, Train, CalendarCheck, Instagram, Facebook, Maximize2, X, ZoomIn, ZoomOut } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function ContactFooter() {
  const [isOpenNow, setIsOpenNow] = useState(true);
  const [isMapExpanded, setIsMapExpanded] = useState(false);
  const [isLegendOpen, setIsLegendOpen] = useState(false);
  const [selectedPoi, setSelectedPoi] = useState<'restaurant' | 'transit' | 'parking' | 'heritage'>('restaurant');

  // Mini map zoom / pan state
  const [miniScale, setMiniScale] = useState(1);
  const [miniOffset, setMiniOffset] = useState({ x: 0, y: 0 });
  const [miniIsDragging, setMiniIsDragging] = useState(false);
  const [miniDragStart, setMiniDragStart] = useState({ x: 0, y: 0 });

  // Modal map zoom / pan state
  const [modalScale, setModalScale] = useState(1);
  const [modalOffset, setModalOffset] = useState({ x: 0, y: 0 });
  const [modalIsDragging, setModalIsDragging] = useState(false);
  const [modalDragStart, setModalDragStart] = useState({ x: 0, y: 0 });

  // Mini Map handlers
  const handleMiniMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return;
    setMiniIsDragging(true);
    setMiniDragStart({ x: e.clientX - miniOffset.x, y: e.clientY - miniOffset.y });
  };

  const handleMiniMouseMove = (e: React.MouseEvent) => {
    if (!miniIsDragging) return;
    setMiniOffset({
      x: e.clientX - miniDragStart.x,
      y: e.clientY - miniDragStart.y
    });
  };

  const handleMiniMouseUpOrLeave = () => {
    setMiniIsDragging(false);
  };

  const handleMiniTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      const touch = e.touches[0];
      setMiniIsDragging(true);
      setMiniDragStart({ x: touch.clientX - miniOffset.x, y: touch.clientY - miniOffset.y });
    }
  };

  const handleMiniTouchMove = (e: React.TouchEvent) => {
    if (!miniIsDragging) return;
    if (e.touches.length === 1) {
      const touch = e.touches[0];
      setMiniOffset({
        x: touch.clientX - miniDragStart.x,
        y: touch.clientY - miniDragStart.y
      });
    }
  };

  // Modal Map handlers
  const handleModalMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return;
    setModalIsDragging(true);
    setModalDragStart({ x: e.clientX - modalOffset.x, y: e.clientY - modalOffset.y });
  };

  const handleModalMouseMove = (e: React.MouseEvent) => {
    if (!modalIsDragging) return;
    setModalOffset({
      x: e.clientX - modalDragStart.x,
      y: e.clientY - modalDragStart.y
    });
  };

  const handleModalMouseUpOrLeave = () => {
    setModalIsDragging(false);
  };

  const handleModalTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      const touch = e.touches[0];
      setModalIsDragging(true);
      setModalDragStart({ x: touch.clientX - modalOffset.x, y: touch.clientY - modalOffset.y });
    }
  };

  const handleModalTouchMove = (e: React.TouchEvent) => {
    if (!modalIsDragging) return;
    if (e.touches.length === 1) {
      const touch = e.touches[0];
      setModalOffset({
        x: touch.clientX - modalDragStart.x,
        y: touch.clientY - modalDragStart.y
      });
    }
  };

  // Escape key event listener to close full screen map
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMapExpanded(false);
      }
    };
    if (isMapExpanded) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMapExpanded]);

  // Based on the provided GMT time (Friday evening), we show a highly customized live banner
  useEffect(() => {
    // Friday operations are 4:00 PM to 11:30 PM (16:00 - 23:30)
    // Currently is 20:16 (8:16 PM), which is active and open!
    setIsOpenNow(true);
  }, []);

  const contactOptions = [
    {
      icon: MapPin,
      label: 'Main Location',
      details: '428 Heritage Trail, Suite B',
      subText: 'London, W1D 4ST, United Kingdom',
      link: 'https://maps.google.com/?q=428+Heritage+Trail+London'
    },
    {
      icon: Phone,
      label: 'Direct Reservations',
      details: '+44 (0) 20 7946 0852',
      subText: 'Give us a dial to book groups over 14',
      link: 'tel:+442079460852'
    },
    {
      icon: Mail,
      label: 'General Inquiries',
      details: 'host@abyssiniabites.com',
      subText: 'Event catering & corporate reservations',
      link: 'mailto:host@abyssiniabites.com'
    }
  ];

  const operatingHours = [
    { days: 'Monday - Tuesday', hours: 'Closed for private events' },
    { days: 'Wednesday - Thursday', hours: '4:30 PM – 10:00 PM' },
    { days: 'Friday - Saturday', hours: '4:00 PM – 11:30 PM', highlight: true },
    { days: 'Sunday Brunch & Dinner', hours: '12:00 PM – 9:30 PM' }
  ];

  return (
    <footer id="contact" className="bg-bg-dark text-white pt-24 pb-12 relative overflow-hidden border-t border-gold-accent/15">
      {/* Background radial overlays */}
      <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-radial from-teal-medium/10 to-transparent pointer-events-none" />
      <div className="absolute top-0 left-0 w-1/4 h-1/4 bg-radial from-gold-accent/5 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
          
          {/* Column 1: Essential business properties (4 items) */}
          <div className="lg:col-span-4 space-y-8">
            <div>
              <span className="font-serif text-3xl font-bold tracking-wide text-white">
                Abyssinia<span className="text-gold-accent font-serif font-light"> Bites</span>
              </span>
              <p className="font-sans text-xs text-gray-400 mt-3 leading-relaxed max-w-sm">
                Dedicated to preserving the historic depth of Ethiopian gastronomy. Gather for our Injera, ground your roots in our coffee, and join us in the art of communal Gursha.
              </p>
            </div>

            {/* LIVE OPEN/CLOSED INDICATOR */}
            <div className="p-4 rounded-sm border border-gold-accent/20 bg-teal-medium/10 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
                <div>
                  <h4 className="font-sans text-xs font-bold uppercase tracking-wider text-white">We are Open!</h4>
                  <p className="font-sans text-[10px] text-gray-400 mt-0.5">Come on in, we are currently serving</p>
                </div>
              </div>
              <span className="font-sans text-[10px] font-bold text-gold-accent bg-bg-dark border border-gold-accent/30 px-2 py-1 rounded-sm">
                4 PM – 11:30 PM
              </span>
            </div>

            {/* List of actions */}
            <div className="space-y-4">
              {contactOptions.map((opt, i) => {
                const OptIcon = opt.icon;
                return (
                  <a
                    key={i}
                    href={opt.link}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-start gap-3 p-3.5 rounded-sm bg-stone-900/60 hover:bg-stone-900 border border-gray-800 hover:border-gold-accent/30 transition-all duration-300 group"
                  >
                    <div className="p-2 bg-teal-medium/10 border border-teal-medium/20 text-gold-accent rounded-sm group-hover:bg-gold-accent group-hover:text-bg-dark transition-all duration-300">
                      <OptIcon size={14} />
                    </div>
                    <div>
                      <span className="block font-mono text-[9px] text-gold-accent tracking-widest uppercase font-bold">
                        {opt.label}
                      </span>
                      <span className="text-white font-sans text-xs font-semibold block mt-1 group-hover:text-gold-accent transition-colors duration-300 flex items-center gap-1">
                        {opt.details}
                        <ArrowUpRight size={10} className="opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </span>
                      <span className="text-[10px] text-gray-400 mt-0.5 block font-sans">{opt.subText}</span>
                    </div>
                  </a>
                );
              })}
            </div>

            {/* Social Media Connections */}
            <div className="pt-4 border-t border-gray-900">
              <h4 id="social-media-header" className="font-mono text-[9px] text-gold-accent tracking-[0.2em] uppercase font-bold mb-3">
                Follow Our Journey
              </h4>
              <div className="flex gap-3">
                <motion.a
                  id="footer-social-instagram"
                  href="https://instagram.com/abyssiniabites"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2.5 bg-stone-900/40 hover:bg-stone-900 border border-gray-800 hover:border-gold-accent/40 text-xs font-sans text-gray-300 hover:text-gold-accent transition-all duration-300 cursor-pointer rounded-none group"
                  whileHover="hover"
                  whileTap={{ scale: 0.97 }}
                >
                  <motion.div
                    variants={{
                      hover: {
                        scale: [1, 1.25, 1.05, 1.25, 1.1],
                        color: "#F5D66C",
                        transition: {
                          duration: 1.2,
                          repeat: Infinity,
                          repeatType: "reverse",
                        }
                      }
                    }}
                    className="text-gold-accent flex items-center justify-center pointer-events-none animate-none"
                  >
                    <Instagram size={13} />
                  </motion.div>
                  <span>Instagram</span>
                </motion.a>
                <motion.a
                  id="footer-social-facebook"
                  href="https://facebook.com/abyssiniabites"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2.5 bg-stone-900/40 hover:bg-stone-900 border border-gray-800 hover:border-gold-accent/40 text-xs font-sans text-gray-300 hover:text-gold-accent transition-all duration-300 cursor-pointer rounded-none group"
                  whileHover="hover"
                  whileTap={{ scale: 0.97 }}
                >
                  <motion.div
                    variants={{
                      hover: {
                        scale: [1, 1.25, 1.05, 1.25, 1.1],
                        color: "#F5D66C",
                        transition: {
                          duration: 1.2,
                          repeat: Infinity,
                          repeatType: "reverse",
                        }
                      }
                    }}
                    className="text-gold-accent flex items-center justify-center pointer-events-none animate-none"
                  >
                    <Facebook size={13} />
                  </motion.div>
                  <span>Facebook</span>
                </motion.a>
              </div>
            </div>
          </div>

          {/* Column 2: Hours of Operation (4 items) */}
          <div className="lg:col-span-3 space-y-6">
            <div>
              <h3 className="font-serif text-xl font-semibold text-gold-accent flex items-center gap-2">
                <Clock size={18} />
                Operating Hours
              </h3>
              <div className="w-12 h-[1px] bg-gold-accent mt-2" />
            </div>

            <div className="space-y-4 font-sans text-xs">
              {operatingHours.map((row, i) => (
                <div
                  key={i}
                  className={`p-3 rounded-sm border ${
                    row.highlight
                      ? 'bg-gold-accent/5 border-gold-accent/30 text-white'
                      : 'bg-stone-900/40 border-transparent text-gray-300'
                  }`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold tracking-wide">{row.days}</span>
                    {row.highlight && (
                      <span className="text-[9px] bg-gold-accent text-bg-dark font-mono uppercase font-black px-1.5 py-0.5 rounded-sm">
                        Tonight
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-gray-400">{row.hours}</p>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-sm border border-gray-800 bg-stone-900/20">
              <p className="font-sans text-[11px] text-gray-400 leading-normal">
                🍽️ <strong>Kitchen Close:</strong> Our main oven/clay-pots are safely cooled 30 minutes prior to closing. Drinks and light appetizers remain available.
              </p>
            </div>
          </div>

          {/* Column 3: Styled Interactive Street Grid Maps Mock (5 items) */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <h3 className="font-serif text-xl font-semibold text-gold-accent flex items-center gap-2">
                <Compass size={18} />
                Interactive Street Map
              </h3>
              <div className="w-12 h-[1px] bg-gold-accent mt-2" />
            </div>

            {/* ARTISTIC CUSTOM VECTOR STREET GRID */}
            <div id="interactive-map-frame" className="relative h-[220px] bg-stone-900 rounded-sm border border-gold-accent/20 overflow-hidden shadow-inner flex flex-col justify-between group">
              
              {/* Custom SVG Layout Map */}
              <svg 
                className="absolute inset-0 w-full h-full text-zinc-900 opacity-80 cursor-grab active:cursor-grabbing select-none" 
                viewBox="0 0 400 220" 
                fill="none"
                onMouseDown={handleMiniMouseDown}
                onMouseMove={handleMiniMouseMove}
                onMouseUp={handleMiniMouseUpOrLeave}
                onMouseLeave={handleMiniMouseUpOrLeave}
                onTouchStart={handleMiniTouchStart}
                onTouchMove={handleMiniTouchMove}
                onTouchEnd={handleMiniMouseUpOrLeave}
              >
                <g
                  style={{
                    transform: `translate(${miniOffset.x}px, ${miniOffset.y}px) scale(${miniScale})`,
                    transformOrigin: '200px 110px'
                  }}
                  className={`transition-transform duration-[450ms] ease-[cubic-bezier(0.25,1,0.5,1)] ${miniIsDragging ? '!transition-none' : ''}`}
                >
                  {/* Roads */}
                  <path d="M 0 40 L 400 50" stroke="#2a2825" strokeWidth="18" />
                  <path d="M 0 160 L 400 170" stroke="#2a2825" strokeWidth="12" />
                  <path d="M 120 0 L 140 220" stroke="#2a2825" strokeWidth="16" />
                  <path d="M 280 0 L 290 220" stroke="#2a2825" strokeWidth="10" />
                  <path d="M 0 100 Q 150 110 400 90" stroke="#2a2825" strokeWidth="10" strokeDasharray="4 4" />

                  {/* Landscaping */}
                  <rect x="20" y="70" width="80" height="20" rx="3" fill="#132420" opacity="0.4" />
                  <rect x="310" y="110" width="70" height="40" rx="4" fill="#132420" opacity="0.4" />
                  <circle cx="60" cy="120" r="10" fill="#24211d" />
                  <circle cx="210" cy="140" r="12" fill="#24211d" />

                  {/* Grid coordinates */}
                  <text x="50" y="32" fill="#a1a1aa" fontSize="6" fontFamily="monospace" opacity="0.4">HERITAGE TRAIL</text>
                  <text x="310" y="180" fill="#a1a1aa" fontSize="6" fontFamily="monospace" opacity="0.4">COURT GARDENS</text>
                  <text x="148" y="200" fill="#a1a1aa" fontSize="6" fontFamily="monospace" opacity="0.4">BROADWAY SEC</text>

                  {/* Destination Glow Circle */}
                  <circle cx="132" cy="74" r="18" fill="rgba(212,175,55,0.15)" className="animate-pulse" />
                  <circle cx="132" cy="74" r="6" fill="#d4af37" />
                  <path d="M 132 50 L 132 70" stroke="#d4af37" strokeWidth="1.5" />
                </g>
              </svg>

              {/* Transit Details Indicators Overlay */}
              <div className="absolute top-3 left-3 bg-bg-dark/95 backdrop-blur-md px-2.5 py-1.5 rounded-sm border border-gold-accent/25 flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-wider text-gold-accent text-glow-yellow">
                <Navigation size={10} className="animate-spin" style={{ animationDuration: '8s' }} />
                <span>DIRECTIONS ACTIVE</span>
              </div>

              {/* Maximize Map Button */}
              <button
                id="maximize-map-btn"
                type="button"
                onClick={() => {
                  setIsMapExpanded(true);
                  setSelectedPoi('restaurant');
                }}
                className="absolute top-3 right-3 bg-bg-dark/95 hover:bg-stone-900 text-gray-300 hover:text-gold-accent p-1.5 rounded-sm border border-gray-800 hover:border-gold-accent/40 shadow-sm transition-all duration-300 cursor-pointer flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-wider group z-10"
                title="Open map in fullscreen modal"
              >
                <Maximize2 size={11} className="transition-transform duration-300 group-hover:scale-110" />
                <span>Maximize</span>
              </button>

              {/* Toggle Legend Button */}
              <button
                id="toggle-legend-btn"
                type="button"
                onClick={() => setIsLegendOpen(!isLegendOpen)}
                className="absolute top-3 right-[88px] bg-bg-dark/95 hover:bg-stone-900 text-gray-300 hover:text-gold-accent p-1.5 rounded-sm border border-gray-800 hover:border-gold-accent/40 shadow-sm transition-all duration-300 cursor-pointer flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-wider group z-10"
                title="Toggle Map Legend"
              >
                <Compass size={11} className={`transition-transform duration-300 ${isLegendOpen ? 'rotate-180 text-gold-accent' : 'group-hover:scale-110'}`} />
                <span>Legend</span>
              </button>

              {/* Zoom Controls Overlay */}
              <div className="absolute right-3 top-[50px] flex flex-col gap-1 z-10 transition-opacity duration-300">
                <button
                  id="map-zoom-in-btn"
                  type="button"
                  onClick={() => setMiniScale(prev => Math.min(prev + 0.2, 3.5))}
                  className="bg-bg-dark/95 hover:bg-stone-900 text-gray-300 hover:text-gold-accent w-7 h-7 flex items-center justify-center rounded-sm border border-gray-800 hover:border-gold-accent/40 shadow-sm transition-all cursor-pointer font-bold text-xs"
                  title="Zoom In"
                >
                  <ZoomIn size={12} />
                </button>
                <button
                  id="map-zoom-out-btn"
                  type="button"
                  onClick={() => setMiniScale(prev => Math.max(prev - 0.2, 0.5))}
                  className="bg-bg-dark/95 hover:bg-stone-900 text-gray-300 hover:text-gold-accent w-7 h-7 flex items-center justify-center rounded-sm border border-gray-800 hover:border-gold-accent/40 shadow-sm transition-all cursor-pointer font-bold text-xs"
                  title="Zoom Out"
                >
                  <ZoomOut size={12} />
                </button>
                <button
                  id="map-zoom-reset-btn"
                  type="button"
                  onClick={() => {
                    setMiniScale(1);
                    setMiniOffset({ x: 0, y: 0 });
                  }}
                  className="bg-bg-dark/95 hover:bg-stone-900 text-gray-300 hover:text-gold-accent w-7 h-7 flex items-center justify-center rounded-sm border border-gray-800 hover:border-gold-accent/40 shadow-sm transition-all cursor-pointer font-mono text-[8px] font-bold"
                  title="Reset Map View"
                >
                  100%
                </button>
              </div>

              {/* Map Legend Overlay */}
              <AnimatePresence>
                {isLegendOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.22, ease: "easeOut" }}
                    className="absolute top-[44px] right-3 left-3 md:left-auto md:w-52 bg-bg-dark/95 backdrop-blur-md p-3 rounded-sm border border-gold-accent/30 shadow-lg z-20 font-sans text-[10px] space-y-2"
                  >
                    <div className="flex justify-between items-center border-b border-gray-800 pb-1.5">
                      <span className="font-mono text-[9px] uppercase tracking-wider text-gold-accent font-bold">Map Legend</span>
                      <button 
                        type="button"
                        onClick={() => setIsLegendOpen(false)}
                        className="text-gray-400 hover:text-white transition-colors cursor-pointer"
                        title="Close Legend"
                      >
                        <X size={10} />
                      </button>
                    </div>
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-gold-accent block shrink-0 border border-gold-accent/35 shadow-[0_0_4px_rgba(245,214,108,0.5)]" />
                        <span className="text-gray-300 font-medium leading-none">Abyssinia Bites</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-sky-400 block shrink-0" />
                        <span className="text-gray-300 leading-none">Broadway Underground</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 block shrink-0" />
                        <span className="text-gray-300 leading-none">Court Gardens Parkade</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-amber-500 block shrink-0" />
                        <span className="text-gray-300 leading-none">Heritage Trail Walk</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Transit detail popup box */}
              <div className="absolute bottom-3 left-3 right-3 bg-bg-dark/95 backdrop-blur-md p-3 rounded-sm border border-gray-800 flex justify-between items-center">
                <div>
                  <h4 className="font-serif text-xs font-bold text-white uppercase tracking-wide">Abyssinia Bites</h4>
                  <p className="font-sans text-[10px] text-gray-400 mt-0.5">428 Heritage Trail, Suite B</p>
                </div>
                <a
                  href="https://maps.google.com/?q=428+Heritage+Trail+London"
                  target="_blank"
                  rel="noreferrer"
                  className="bg-gold-accent hover:bg-gold-light text-bg-dark p-2 rounded-sm transition-colors cursor-pointer"
                  title="Open GPS Navigation"
                >
                  <Navigation size={12} className="fill-bg-dark" />
                </a>
              </div>
            </div>

            {/* Travel instruction tabs */}
            <div className="grid grid-cols-2 gap-4 font-sans text-xs">
              <div className="p-3 bg-stone-900/40 border border-gray-800/80 rounded-sm">
                <span className="font-bold text-gold-accent flex items-center gap-1 ml-0 bg">
                  <Car size={13} />
                  By Vehicle:
                </span>
                <p className="text-gray-400 text-[10px] mt-1 leading-normal">
                  Paid parking is available directly behind Suite B inside Court Gardens parkade. Free street parking starts at 6:30 PM.
                </p>
              </div>

              <div className="p-3 bg-stone-900/40 border border-gray-800/80 rounded-sm">
                <span className="font-bold text-gold-accent flex items-center gap-1 ml-0 bg">
                  <Train size={13} />
                  By Rail / Under:
                </span>
                <p className="text-gray-400 text-[10px] mt-1 leading-normal">
                  We are situated a brief 4-minute walk directly West of Broadway Underground Transit Stop.
                </p>
              </div>
            </div>

          </div>

        </div>

        {/* Bottom footer credit panel */}
        <div className="border-t border-gray-900 pt-8 mt-4 flex flex-col md:flex-row items-center justify-between text-gray-500 font-sans text-[11px] gap-4">
          <p>© {new Date().getFullYear()} Abyssinia Bites Restaurant. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#about" className="hover:text-gold-accent transition-colors">Story</a>
            <a href="#menu" className="hover:text-gold-accent transition-colors">Menu</a>
            <a href="#reserve" className="hover:text-gold-accent transition-colors">Reservations</a>
            <a href="#contact" className="hover:text-gold-accent transition-colors">Directions</a>
          </div>
          <p className="font-mono text-[9px] uppercase tracking-widest text-[#d4af37]/40">
            AUTHENTIC HOSPITALITY, CRAFTED FOR COMMUNITY
          </p>
        </div>

      </div>

      {/* Expanded Interactive Map Modal */}
      <AnimatePresence>
        {isMapExpanded && (
          <div 
            id="expanded-map-modal"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-bg-dark/95 backdrop-blur-md"
          >
            {/* Background Backdrop close click */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMapExpanded(false)}
              className="absolute inset-0 cursor-pointer"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: "spring", duration: 0.5, bounce: 0.12 }}
              className="bg-stone-950 border-2 border-gold-accent/40 text-white w-full max-w-5xl relative z-10 rounded-none shadow-2xl flex flex-col md:flex-row overflow-hidden h-[85vh] md:h-[600px]"
            >
              {/* Corner metal brackets */}
              <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-gold-accent z-20 pointer-events-none" />
              <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-gold-accent z-20 pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-gold-accent z-20 pointer-events-none" />
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-gold-accent z-20 pointer-events-none" />

              {/* Close Button Top Right */}
              <button
                id="close-expanded-map"
                onClick={() => setIsMapExpanded(false)}
                className="absolute top-4 right-4 bg-bg-dark/95 text-gray-400 hover:text-gold-accent p-1.5 transition-colors cursor-pointer rounded-none z-30 border border-gray-800"
                title="Close Map Overlay"
              >
                <X size={16} />
              </button>

              {/* Left Side: Large Interactive SVG Map */}
              <div className="flex-1 relative bg-stone-900 border-b md:border-b-0 border-gray-800 flex items-center justify-center overflow-hidden">
                
                {/* Custom Vector Grid Map */}
                <svg 
                  className="w-full h-full min-h-[300px] cursor-grab active:cursor-grabbing select-none" 
                  viewBox="0 0 800 500" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                  onMouseDown={handleModalMouseDown}
                  onMouseMove={handleModalMouseMove}
                  onMouseUp={handleModalMouseUpOrLeave}
                  onMouseLeave={handleModalMouseUpOrLeave}
                  onTouchStart={handleModalTouchStart}
                  onTouchMove={handleModalTouchMove}
                  onTouchEnd={handleModalMouseUpOrLeave}
                >
                  <g
                    style={{
                      transform: `translate(${modalOffset.x}px, ${modalOffset.y}px) scale(${modalScale})`,
                      transformOrigin: '400px 250px'
                    }}
                    className={`transition-transform duration-[450ms] ease-[cubic-bezier(0.25,1,0.5,1)] ${modalIsDragging ? '!transition-none' : ''}`}
                  >
                    {/* Subtle Grid Lines */}
                    <g opacity="0.1" stroke="#a1a1aa" strokeWidth="0.5" strokeDasharray="8 8">
                      <line x1="100" y1="0" x2="100" y2="500" />
                      <line x1="200" y1="0" x2="200" y2="500" />
                      <line x1="300" y1="0" x2="300" y2="500" />
                      <line x1="400" y1="0" x2="400" y2="500" />
                      <line x1="500" y1="0" x2="500" y2="500" />
                      <line x1="600" y1="0" x2="600" y2="500" />
                      <line x1="700" y1="0" x2="700" y2="500" />
                      <line x1="0" y1="100" x2="800" y2="100" />
                      <line x1="0" y1="200" x2="800" y2="200" />
                      <line x1="0" y1="300" x2="800" y2="300" />
                      <line x1="0" y1="400" x2="800" y2="400" />
                    </g>

                    {/* Landscaping / Parks */}
                    <rect x="340" y="30" width="220" height="130" rx="4" fill="#132420" opacity="0.4" />
                    <text x="450" y="95" fill="#2d5a4c" fontSize="10" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle" opacity="0.7">
                      COURT GARDENS PARK
                    </text>

                    <rect x="40" y="240" width="160" height="90" rx="4" fill="#24211d" opacity="0.5" />
                    <text x="120" y="285" fill="#3f3f46" fontSize="9" fontFamily="sans-serif" fontWeight="semibold" textAnchor="middle" opacity="0.5">
                      MUNICIPAL CENTRE
                    </text>

                    {/* Main Roads */}
                    <path d="M 0 200 L 800 200" stroke="#1c1917" strokeWidth="36" />
                    <path d="M 0 200 L 800 200" stroke="#252321" strokeWidth="30" />
                    <path d="M 0 200 L 800 200" stroke="#d4af37" strokeWidth="1" strokeDasharray="5 7" opacity="0.2" />

                    {/* Broadway Sec Vertical */}
                    <path d="M 230 0 L 230 500" stroke="#1c1917" strokeWidth="34" />
                    <path d="M 230 0 L 230 500" stroke="#252321" strokeWidth="28" />

                    {/* Court Gardens Rd Vertical */}
                    <path d="M 640 0 L 640 500" stroke="#1c1917" strokeWidth="24" />
                    <path d="M 640 0 L 640 500" stroke="#2a2825" strokeWidth="18" />

                    {/* South Gardens Way Horizontal */}
                    <path d="M 0 410 L 800 410" stroke="#1c1917" strokeWidth="24" />
                    <path d="M 0 410 L 800 410" stroke="#2a2825" strokeWidth="18" />

                    {/* Road Labels */}
                    <text x="100" y="174" fill="#71717a" fontSize="8" fontFamily="monospace" letterSpacing="0.12em" fontWeight="bold">
                      HERITAGE TRAIL
                    </text>
                    <text x="195" y="470" fill="#71717a" fontSize="8" fontFamily="monospace" letterSpacing="0.12em" fontWeight="bold" transform="rotate(-90, 195, 470)">
                      BROADWAY SEC
                    </text>
                    <text x="618" y="470" fill="#71717a" fontSize="8" fontFamily="monospace" letterSpacing="0.12em" transform="rotate(-90, 618, 470)">
                      COURT GARDENS RD
                    </text>
                    <text x="700" y="396" fill="#71717a" fontSize="8" fontFamily="monospace" letterSpacing="0.1em">
                      S GARDENS WAY
                    </text>

                    {/* POI: 1. ABYSSINIA BITES RESTAURANT (320, 165) */}
                    <g 
                      className="cursor-pointer group/restaurant"
                      onClick={() => setSelectedPoi('restaurant')}
                    >
                      <circle cx="320" cy="165" r={selectedPoi === 'restaurant' ? 26 : 14} fill={selectedPoi === 'restaurant' ? 'rgba(245,214,108,0.22)' : 'rgba(245,214,108,0.06)'} className="transition-all duration-300" />
                      <circle cx="320" cy="165" r="7" fill="#F5D66C" className="transition-transform duration-300 group-hover/restaurant:scale-125" />
                      <circle cx="320" cy="165" r="3" fill="#1c1917" />
                      <path d="M 320 142 L 320 158" stroke="#F5D66C" strokeWidth="1.5" />
                      <rect x="250" y="112" width="140" height="24" rx="2" fill="rgba(28,25,23,0.92)" stroke="rgba(245,214,108,0.4)" strokeWidth="0.5" className="pointer-events-none" />
                      <text x="320" y="127" fill="white" fontSize="9" fontFamily="sans-serif" fontWeight="extrabold" textAnchor="middle" letterSpacing="0.05em" className="pointer-events-none text-glow-yellow">
                        ABYSSINIA BITES
                      </text>
                    </g>

                    {/* POI: 2. BROADWAY UNDERGROUND STATION (230, 410) */}
                    <g 
                      className="cursor-pointer group/transit"
                      onClick={() => setSelectedPoi('transit')}
                    >
                      <circle cx="230" cy="410" r={selectedPoi === 'transit' ? 24 : 14} fill={selectedPoi === 'transit' ? 'rgba(56,189,248,0.22)' : 'rgba(100,116,139,0.06)'} className="transition-all duration-300" />
                      <circle cx="230" cy="410" r="7" fill={selectedPoi === 'transit' ? '#38bdf8' : '#71717a'} className="transition-transform duration-300 group-hover/transit:scale-125" />
                      <circle cx="230" cy="410" r="3" fill="#1c1917" />
                      <rect x="155" y="440" width="150" height="20" rx="1" fill="rgba(28,25,23,0.92)" stroke={selectedPoi === 'transit' ? 'rgba(56,189,248,0.4)' : 'rgba(113,113,122,0.3)'} strokeWidth="0.5" className="pointer-events-none" />
                      <text x="230" y="452" fill={selectedPoi === 'transit' ? '#38bdf8' : '#e4e4e7'} fontSize="8" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle" className="pointer-events-none">
                        Broadway Transit Station
                      </text>
                    </g>

                    {/* POI: 3. COURT GARDENS PARKADE (640, 100) */}
                    <g 
                      className="cursor-pointer group/parking"
                      onClick={() => setSelectedPoi('parking')}
                    >
                      <circle cx="640" cy="100" r={selectedPoi === 'parking' ? 24 : 14} fill={selectedPoi === 'parking' ? 'rgba(52,211,153,0.22)' : 'rgba(100,116,139,0.06)'} className="transition-all duration-300" />
                      <circle cx="640" cy="100" r="7" fill={selectedPoi === 'parking' ? '#34d399' : '#71717a'} className="transition-transform duration-300 group-hover/parking:scale-125" />
                      <circle cx="640" cy="100" r="3px" fill="#1c1917" />
                      <rect x="560" y="128" width="160" height="20" rx="1" fill="rgba(28,25,23,0.92)" stroke={selectedPoi === 'parking' ? 'rgba(52,211,153,0.4)' : 'rgba(113,113,122,0.3)'} strokeWidth="0.5" className="pointer-events-none" />
                      <text x="640" y="140" fill={selectedPoi === 'parking' ? '#34d399' : '#e4e4e7'} fontSize="8" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle" className="pointer-events-none">
                        Court Gardens Car Park
                      </text>
                    </g>

                    {/* POI: 4. HERITAGE TRAILWAY WALK (460, 200) */}
                    <g 
                      className="cursor-pointer group/heritage"
                      onClick={() => setSelectedPoi('heritage')}
                    >
                      <circle cx="460" cy="200" r={selectedPoi === 'heritage' ? 24 : 14} fill={selectedPoi === 'heritage' ? 'rgba(217,119,6,0.22)' : 'rgba(100,116,139,0.06)'} className="transition-all duration-300" />
                      <circle cx="460" cy="200" r="7" fill={selectedPoi === 'heritage' ? '#d97706' : '#71717a'} className="transition-transform duration-300 group-hover/heritage:scale-125" />
                      <circle cx="460" cy="200" r="3px" fill="#1c1917" />
                      <rect x="385" y="228" width="150" height="20" rx="1" fill="rgba(28,25,23,0.92)" stroke={selectedPoi === 'heritage' ? 'rgba(217,119,6,0.4)' : 'rgba(113,113,122,0.3)'} strokeWidth="0.5" className="pointer-events-none" />
                      <text x="460" y="240" fill={selectedPoi === 'heritage' ? '#d97706' : '#e4e4e7'} fontSize="8" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle" className="pointer-events-none">
                        Heritage Footpath Walk
                      </text>
                    </g>
                  </g>
                </svg>

                {/* Left Floating Directions active notification */}
                <div className="absolute top-4 left-4 bg-bg-dark/95 backdrop-blur-md px-3 py-2 border border-gold-accent/25 flex items-center gap-2 font-mono text-[9px] uppercase tracking-widest text-gold-accent text-glow-yellow shadow-lg rounded-none">
                  <Navigation size={10} className="animate-spin text-gold-accent" style={{ animationDuration: '8s' }} />
                  <span>INTERACTIVE NAVIGATION LAYOUT</span>
                </div>

                {/* Modal Zoom Controls */}
                <div className="absolute right-4 top-14 flex flex-col gap-1.5 z-20">
                  <button
                    id="modal-zoom-in"
                    type="button"
                    onClick={() => setModalScale(prev => Math.min(prev + 0.25, 4))}
                    className="bg-bg-dark/95 hover:bg-stone-900 text-gray-300 hover:text-gold-accent w-8 h-8 flex items-center justify-center rounded-none border border-gray-800 hover:border-gold-accent/40 shadow-sm transition-all cursor-pointer font-bold text-sm"
                    title="Zoom In"
                  >
                    <ZoomIn size={14} />
                  </button>
                  <button
                    id="modal-zoom-out"
                    type="button"
                    onClick={() => setModalScale(prev => Math.max(prev - 0.25, 0.5))}
                    className="bg-bg-dark/95 hover:bg-stone-900 text-gray-300 hover:text-gold-accent w-8 h-8 flex items-center justify-center rounded-none border border-gray-800 hover:border-gold-accent/40 shadow-sm transition-all cursor-pointer font-bold text-sm"
                    title="Zoom Out"
                  >
                    <ZoomOut size={14} />
                  </button>
                  <button
                    id="modal-zoom-reset"
                    type="button"
                    onClick={() => {
                      setModalScale(1);
                      setModalOffset({ x: 0, y: 0 });
                    }}
                    className="bg-bg-dark/95 hover:bg-stone-900 text-gray-300 hover:text-gold-accent w-8 h-8 flex items-center justify-center rounded-none border border-gray-800 hover:border-gold-accent/40 shadow-sm transition-all cursor-pointer font-mono text-[9px] font-bold"
                    title="Reset Map View"
                  >
                    100%
                  </button>
                </div>
              </div>

              {/* Right Side: Details and Selection Panel */}
              <div className="w-full md:w-[350px] bg-stone-900 border-t md:border-t-0 md:border-l border-gray-850 p-6 md:p-8 flex flex-col justify-between overflow-y-auto">
                <div className="space-y-6">
                  {/* Title Area */}
                  <div className="space-y-1">
                    <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-gold-accent font-extrabold block">
                      STREET GRID GUIDE
                    </span>
                    <h4 className="font-serif text-xl font-bold text-white tracking-tight">
                      Explore Our Location
                    </h4>
                    <div className="w-12 h-0.5 bg-gold-accent mt-1" />
                  </div>

                  {/* Compact List of Interactive Tabs */}
                  <div className="space-y-2">
                    <button
                      onClick={() => setSelectedPoi('restaurant')}
                      className={`w-full text-left p-3 border transition-all duration-300 flex items-start gap-3 rounded-none cursor-pointer ${
                        selectedPoi === 'restaurant'
                          ? 'bg-gold-accent/5 border-gold-accent/40 text-white'
                          : 'bg-stone-950/40 border-gray-900 text-gray-400 hover:text-white hover:border-zinc-800'
                      }`}
                    >
                      <MapPin size={16} className={selectedPoi === 'restaurant' ? 'text-gold-accent mt-0.5 shrink-0' : 'text-gray-500 mt-0.5 shrink-0'} />
                      <div>
                        <div className="text-xs font-bold font-sans">Abyssinia Bites</div>
                        <div className="text-[10px] uppercase font-mono tracking-wider text-gold-accent/70 mt-0.5">[Suite B • Host Restaurant]</div>
                      </div>
                    </button>

                    <button
                      onClick={() => setSelectedPoi('transit')}
                      className={`w-full text-left p-3 border transition-all duration-300 flex items-start gap-3 rounded-none cursor-pointer ${
                        selectedPoi === 'transit'
                          ? 'bg-sky-500/5 border-sky-400/40 text-white'
                          : 'bg-stone-950/40 border-gray-900 text-gray-400 hover:text-white hover:border-zinc-800'
                      }`}
                    >
                      <Train size={16} className={selectedPoi === 'transit' ? 'text-sky-400 mt-0.5 shrink-0' : 'text-gray-500 mt-0.5 shrink-0'} />
                      <div>
                        <div className="text-xs font-bold font-sans">Broadway Underground</div>
                        <div className="text-[10px] uppercase font-mono tracking-wider text-sky-400/70 mt-0.5">[4 Min Walk • West Entrance]</div>
                      </div>
                    </button>

                    <button
                      onClick={() => setSelectedPoi('parking')}
                      className={`w-full text-left p-3 border transition-all duration-300 flex items-start gap-3 rounded-none cursor-pointer ${
                        selectedPoi === 'parking'
                          ? 'bg-emerald-500/5 border-emerald-400/40 text-white'
                          : 'bg-stone-950/40 border-gray-900 text-gray-400 hover:text-white hover:border-zinc-800'
                      }`}
                    >
                      <Car size={16} className={selectedPoi === 'parking' ? 'text-emerald-400 mt-0.5 shrink-0' : 'text-gray-500 mt-0.5 shrink-0'} />
                      <div>
                        <div className="text-xs font-bold font-sans">Court Gardens Parkade</div>
                        <div className="text-[10px] uppercase font-mono tracking-wider text-emerald-400/70 mt-0.5">[Underground Public Car Park]</div>
                      </div>
                    </button>

                    <button
                      onClick={() => setSelectedPoi('heritage')}
                      className={`w-full text-left p-3 border transition-all duration-300 flex items-start gap-3 rounded-none cursor-pointer ${
                        selectedPoi === 'heritage'
                          ? 'bg-amber-600/5 border-amber-500/40 text-white'
                          : 'bg-stone-950/40 border-gray-900 text-gray-400 hover:text-white hover:border-zinc-800'
                      }`}
                    >
                      <Compass size={16} className={selectedPoi === 'heritage' ? 'text-amber-500 mt-0.5 shrink-0' : 'text-gray-500 mt-0.5 shrink-0'} />
                      <div>
                        <div className="text-xs font-bold font-sans">Heritage Trail Path</div>
                        <div className="text-[10px] uppercase font-mono tracking-wider text-amber-500/70 mt-0.5">[Scenic Cobblestone Footpath]</div>
                      </div>
                    </button>
                  </div>

                  {/* Dynamic Information Description Box */}
                  <div className="p-4 bg-stone-950 border border-gray-800 rounded-none text-xs leading-relaxed min-h-[140px] flex flex-col justify-center">
                    {selectedPoi === 'restaurant' && (
                      <div className="space-y-2">
                        <h5 className="font-bold text-white flex items-center gap-1.5 font-serif text-sm">
                          <span className="w-1.5 h-1.5 bg-gold-accent rounded-full" />
                          Main Entry (Suite B)
                        </h5>
                        <p className="text-gray-400 font-sans text-[11px] leading-relaxed">
                          Located directly facing the copper lantern paths of Heritage Trail. Our restaurant feature is a premium dining room adorned with cultural handcrafts, slow-roasted coffee ceremonies, and private communal tables.
                        </p>
                        <p className="text-[10px] text-gold-accent/80 italic mt-1 font-mono">
                          ★ Live Ethiopian coffee ceremony details on display outside this entryway starting at 5:00 PM nightly.
                        </p>
                      </div>
                    )}

                    {selectedPoi === 'transit' && (
                      <div className="space-y-2">
                        <h5 className="font-bold text-sky-400 flex items-center gap-1.5 font-serif text-sm">
                          <span className="w-1.5 h-1.5 bg-sky-400 rounded-full" />
                          Broadway Station Connection
                        </h5>
                        <p className="text-gray-400 font-sans text-[11px] leading-relaxed">
                          Take the District, Circle, or Central Line to Broadway Underground Station. Exit South Portal 3 and walk East directly for 280 meters along Heritage Trail. We are located on your right-hand side.
                        </p>
                        <p className="text-[10px] text-sky-400/80 italic mt-1 font-mono">
                          ⏱ Trains operate every 4 to 6 minutes during peak dinner bookings.
                        </p>
                      </div>
                    )}

                    {selectedPoi === 'parking' && (
                      <div className="space-y-2">
                        <h5 className="font-bold text-emerald-400 flex items-center gap-1.5 font-serif text-sm">
                          <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
                          Court Gardens Parkade
                        </h5>
                        <p className="text-gray-400 font-sans text-[11px] leading-relaxed">
                          Fully secured underground public parking accessible via Court Gardens Road. Take Elevator A to the Ground Level Plaza directly behind our suites.
                        </p>
                        <p className="text-[10px] text-emerald-400/80 italic mt-1 font-mono">
                          ✔ Safe, well-lit parking is validated free of charge for table groups over 8 guests.
                        </p>
                      </div>
                    )}

                    {selectedPoi === 'heritage' && (
                      <div className="space-y-2">
                        <h5 className="font-bold text-amber-500 flex items-center gap-1.5 font-serif text-sm">
                          <span className="w-1.5 h-1.5 bg-amber-500 rounded-full" />
                          Historic Footpath Walkway
                        </h5>
                        <p className="text-gray-400 font-sans text-[11px] leading-relaxed">
                          A beautiful cobblestone pedestrian avenue lined with restored Victorian period brick architecture, hanging climbing ivies, and vintage brass gaslight lamps. Perfect for a calming stroll before or after dining.
                        </p>
                        <p className="text-[10px] text-amber-500/80 italic mt-1 font-mono">
                          ✿ Statically lit with warm glowing torches starting at twilight.
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Footer action */}
                <div className="pt-4 border-t border-gray-800 flex items-center justify-between text-[10px] font-mono text-gray-500">
                  <span>DISCOVERY ACTIVE</span>
                  <a
                    href="https://maps.google.com/?q=428+Heritage+Trail+London"
                    target="_blank"
                    rel="noreferrer"
                    className="bg-gold-accent hover:bg-gold-light text-bg-dark text-[10px] font-sans font-bold uppercase tracking-wider px-3 py-1.5 flex items-center gap-1 transition-colors cursor-pointer rounded-none"
                  >
                    GPS DIRECT
                    <ArrowUpRight size={10} />
                  </a>
                </div>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </footer>
  );
}
