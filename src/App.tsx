/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import AboutStory from './components/AboutStory';
import ChefsSpotlight from './components/ChefsSpotlight';
import InteractiveMenu from './components/InteractiveMenu';
import ReservationForm from './components/ReservationForm';
import ContactFooter from './components/ContactFooter';

export default function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [hasActiveBooking, setHasActiveBooking] = useState(false);
  
  // Create a ref containing a trigger to display the receipt card
  const receiptTriggerRef = useRef<(() => void) | null>(null);

  // Intersection Observer to track scroll positions and light up navbar links automatically
  useEffect(() => {
    const sections = ['hero', 'about', 'spotlight', 'menu', 'reserve', 'contact'];
    
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -60% 0px', // Trigger when section is in primary view center
      threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      sections.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  const handleScrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleViewBookingTicket = () => {
    if (receiptTriggerRef.current) {
      receiptTriggerRef.current();
    }
  };

  return (
    <div className="bg-bg-dark text-white min-h-screen selection:bg-gold-accent selection:text-bg-dark overflow-x-hidden antialiased">
      {/* Primary Sticky Header */}
      <Header
        activeSection={activeSection}
        onNavigate={handleScrollToSection}
        hasActiveBooking={hasActiveBooking}
        onViewBooking={handleViewBookingTicket}
      />

      {/* Main Single-Page Sections flow */}
      <main>
        {/* Section 1: Hero */}
        <Hero onScrollToSection={handleScrollToSection} />

        {/* Section 2: About & Cultural Stories */}
        <AboutStory />

        {/* Chef's Spotlight Feature */}
        <ChefsSpotlight onScrollToSection={handleScrollToSection} />

        {/* Section 3: Interactive Menu */}
        <InteractiveMenu />

        {/* Section 4: Table Reservation */}
        <ReservationForm
          onBookingStatusChange={setHasActiveBooking}
          viewTriggerRef={receiptTriggerRef}
        />
      </main>

      {/* Footer & Location Coordinates */}
      <ContactFooter />
    </div>
  );
}

