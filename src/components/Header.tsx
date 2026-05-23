import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, CalendarDays, Compass, FileText, MapPin, Eye } from 'lucide-react';

interface HeaderProps {
  onNavigate: (sectionId: string) => void;
  activeSection: string;
  hasActiveBooking: boolean;
  onViewBooking: () => void;
}

export default function Header({ onNavigate, activeSection, hasActiveBooking, onViewBooking }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'about', label: 'Our Story', icon: Compass },
    { id: 'menu', label: 'Interactive Menu', icon: FileText },
    { id: 'reserve', label: 'Reservations', icon: CalendarDays },
    { id: 'contact', label: 'Location & Hours', icon: MapPin },
  ];

  const handleItemClick = (id: string) => {
    setIsOpen(false);
    onNavigate(id);
  };

  return (
    <header
      id="main-navigation-header"
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-bg-dark/95 border-b border-gold-accent/20 py-3 shadow-lg backdrop-blur-md'
          : 'bg-gradient-to-b from-bg-dark/90 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Branding */}
        <button
          id="branding-logo-btn"
          onClick={() => handleItemClick('hero')}
          className="flex items-center space-x-2.5 focus:outline-none group text-left cursor-pointer"
        >
          <div className="w-9 h-9 bg-gold-accent rounded-full flex items-center justify-center text-bg-dark font-bold text-lg select-none group-hover:scale-105 transition-transform duration-300">
            A
          </div>
          <span className="font-serif text-2xl font-semibold italic tracking-wider text-gold-accent transition-colors duration-300">
            Abyssinia Bites
          </span>
        </button>

        {/* Desktop Navigation */}
        <nav id="desktop-nav-menu" className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                id={`nav-${item.id}`}
                onClick={() => handleItemClick(item.id)}
                className={`relative text-sm tracking-widest uppercase font-sans font-medium hover:text-gold-accent transition-colors duration-300 focus:outline-none flex items-center gap-1.5 py-1 ${
                  isActive ? 'text-gold-accent' : 'text-gray-300 hover:text-white'
                }`}
              >
                <Icon size={14} className="opacity-70 group-hover:opacity-100" />
                {item.label}
                {isActive && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold-accent"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Desktop Call to Actions */}
        <div className="hidden md:flex items-center space-x-3">
          {hasActiveBooking && (
            <button
              id="view-active-booking-btn"
              onClick={onViewBooking}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-sm border border-gold-accent/40 bg-gold-accent/5 hover:bg-gold-accent/20 text-gold-accent font-sans text-xs tracking-wider uppercase font-medium transition-all duration-300 focus:outline-none"
            >
              <Eye size={13} />
              Your Ticket
            </button>
          )}
          <button
            id="header-reserve-now-btn"
            onClick={() => handleItemClick('reserve')}
            className="px-5 py-2 border border-gold-accent text-gold-accent hover:bg-gold-accent hover:text-bg-dark text-xs uppercase tracking-widest transition-all font-bold font-sans rounded-none duration-300 flex items-center gap-1.5 focus:outline-none cursor-pointer"
          >
            <CalendarDays size={13} />
            Book a Table
          </button>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex items-center space-x-2 md:hidden">
          {hasActiveBooking && (
            <button
              id="view-active-booking-mobile-btn"
              onClick={onViewBooking}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-sm border border-gold-accent/40 bg-gold-accent/10 text-gold-accent font-sans text-xs font-medium focus:outline-none"
            >
              <Eye size={13} />
            </button>
          )}
          <button
            id="mobile-menu-hamburger-btn"
            onClick={() => setIsOpen(!isOpen)}
            className="text-white hover:text-gold-accent focus:outline-none p-1.5 rounded-md border border-gray-800 bg-bg-dark/40"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-navigation-overlay"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="md:hidden w-full bg-bg-dark border-b border-gold-accent/20 shadow-xl overflow-hidden"
          >
            <div className="px-6 py-6 flex flex-col space-y-4">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    id={`mobile-nav-${item.id}`}
                    onClick={() => handleItemClick(item.id)}
                    className={`flex items-center space-x-3 py-2 text-base font-medium tracking-wide border-b border-gray-900/40 text-left ${
                      isActive ? 'text-gold-accent' : 'text-gray-300 hover:text-white'
                    }`}
                  >
                    <Icon size={18} className="opacity-70" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
              <div className="pt-2 flex flex-col space-y-2">
                <button
                  id="mobile-nav-reserve-btn"
                  onClick={() => handleItemClick('reserve')}
                  className="w-full text-center bg-gradient-to-r from-gold-accent to-gold-dark text-bg-dark font-sans text-sm tracking-widest uppercase font-bold py-3 rounded-sm shadow-md focus:outline-none"
                >
                  Book a Table
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
