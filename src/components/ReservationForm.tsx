import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, Users, Phone, Mail, User, Clock, CheckCircle2, QrCode, Trash2, ShieldCheck, Ticket } from 'lucide-react';
import { Reservation } from '../types';

interface ReservationFormProps {
  onBookingStatusChange: (hasBooking: boolean) => void;
  // Trigger callback when user clicks a button to view active booking
  viewTriggerRef: React.MutableRefObject<(() => void) | null>;
}

export default function ReservationForm({ onBookingStatusChange, viewTriggerRef }: ReservationFormProps) {
  const [booking, setBooking] = useState<Reservation | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '2026-05-23', // Default to tomorrow based on current date
    time: '18:30',
    guests: 4,
    notes: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionProgress, setSubmissionProgress] = useState(0);
  const [showAnimatedReceipt, setShowAnimatedReceipt] = useState(false);

  // Load active booking from localStorage on load
  useEffect(() => {
    const savedBooking = localStorage.getItem('abyssinia_booking');
    if (savedBooking) {
      try {
        const parsed = JSON.parse(savedBooking) as Reservation;
        setBooking(parsed);
        onBookingStatusChange(true);
      } catch (err) {
        localStorage.removeItem('abyssinia_booking');
      }
    }
  }, [onBookingStatusChange]);

  // Wire up the ref to let parent components trigger viewing the receipt
  useEffect(() => {
    viewTriggerRef.current = () => {
      if (booking) {
        setShowAnimatedReceipt(true);
        // Scroll to reservation section
        const element = document.getElementById('reserve');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };
    return () => {
      viewTriggerRef.current = null;
    };
  }, [booking, viewTriggerRef]);

  // Validate inputs
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Please provide your full name.';
    
    // Simple Email regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Please provide your email address.';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please provide a valid email address.';
    }

    // Phone validation
    const phoneRegex = /^[+]?[0-9\s-]{7,15}$/;
    if (!formData.phone.trim()) {
      newErrors.phone = 'Please provide your phone number.';
    } else if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number.';
    }

    if (!formData.date) newErrors.date = 'Select a booking date.';
    if (!formData.time) newErrors.time = 'Select an arrival time.';
    
    if (formData.guests < 1 || formData.guests > 14) {
      newErrors.guests = 'Reservations must be between 1 and 14 guests.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'guests' ? parseInt(value) || 1 : value
    }));
    // Clear targeted error as user types
    if (errors[name]) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      });
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmissionProgress(0);

    const totalDuration = 1200; // ms
    const intervalPeriod = 20; // update progress every 20ms
    const totalSteps = totalDuration / intervalPeriod;
    const progressIncrement = 100 / totalSteps;

    const intervalId = setInterval(() => {
      setSubmissionProgress((prev) => {
        if (prev >= 100) {
          clearInterval(intervalId);
          return 100;
        }
        return Math.min(prev + progressIncrement, 100);
      });
    }, intervalPeriod);

    // Simulate reliable API verification delay
    setTimeout(() => {
      clearInterval(intervalId);
      setSubmissionProgress(100);
      const generatedBooking: Reservation = {
        id: 'ABY-' + Math.floor(100000 + Math.random() * 900000),
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        date: formData.date,
        time: formData.time,
        guests: formData.guests,
        status: 'confirmed',
        notes: formData.notes
      };

      localStorage.setItem('abyssinia_booking', JSON.stringify(generatedBooking));
      setBooking(generatedBooking);
      setIsSubmitting(false);
      setShowAnimatedReceipt(true);
      onBookingStatusChange(true);
    }, totalDuration);
  };

  const handleCancelBooking = () => {
    if (window.confirm('Are you sure you want to cancel your table reservation at Abyssinia Bites?')) {
      localStorage.removeItem('abyssinia_booking');
      setBooking(null);
      setShowAnimatedReceipt(false);
      onBookingStatusChange(false);
      // Reset form data
      setFormData({
        name: '',
        email: '',
        phone: '',
        date: '2026-05-23',
        time: '18:30',
        guests: 4,
        notes: ''
      });
    }
  };

  const getDayName = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });
  };

  return (
    <section id="reserve" className="py-24 bg-teal-dark text-white relative overflow-hidden">
      {/* Editorial graphics and masks */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,#124e4f50,transparent)] pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-bg-beige to-transparent opacity-10 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Reservation section headers */}
        <div id="reserve-header" className="text-center max-w-2xl mx-auto mb-16 flex flex-col items-center">
          <span className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-gold-accent mb-3 block">
            Dine With Us
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-semibold text-white tracking-tight leading-tight">
            Reserve Your <span className="text-gold-accent italic font-light">Communal Platter</span>
          </h2>
          <div className="w-16 h-1 bg-gold-accent mt-4 rounded-full" />
          <p className="font-sans text-xs text-gray-300 mt-4 leading-relaxed max-w-md">
            For communal dining, we recommend gatherings of 2 to 6 guests to properly share a traditional Ge'beta platter. For larger parties or custom requests, secure your booking below.
          </p>
        </div>

        {/* Dynamic Booking Screen toggle */}
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            {booking && showAnimatedReceipt ? (
              
              /* STUNNING ACTIVE RECEIPT OR PASS ENGINE */
              <motion.div
                key="receipt"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="max-w-md mx-auto relative"
              >
                {/* Visual Ticket Shape Background */}
                <div className="bg-white text-teal-dark rounded-md overflow-hidden shadow-2xl border-2 border-gold-accent relative">
                  
                  {/* Gold Ornament Top Header Banner */}
                  <div className="bg-gradient-to-r from-gold-dark to-gold-accent p-6 text-center text-bg-dark relative">
                    <div className="absolute top-2 left-1/2 transform -translate-x-1/2 font-mono text-[8px] uppercase tracking-[0.3em] opacity-80 font-bold">
                      ABYSSINIA BITES TICKET
                    </div>
                    <CheckCircle2 size={44} className="mx-auto mt-2 text-bg-dark fill-gold-light" />
                    <h3 className="font-serif text-2xl font-bold mt-2">Reservation Confirmed!</h3>
                    <p className="font-sans text-[11px] uppercase tracking-widest font-black opacity-90 mt-1">
                      Id: {booking.id}
                    </p>
                    
                    {/* Semi circles cut into the sides representing physical cinema/dinner ticket */}
                    <div className="absolute -bottom-3 -left-3 w-6 h-6 rounded-full bg-teal-dark" />
                    <div className="absolute -bottom-3 -right-3 w-6 h-6 rounded-full bg-teal-dark" />
                  </div>

                  {/* Body Info Box */}
                  <div className="p-8 space-y-6 bg-amber-50/50">
                    <div className="grid grid-cols-2 gap-y-4 gap-x-2 text-sm border-b border-gold-accent/20 pb-6">
                      
                      <div>
                        <span className="block font-mono text-[9px] text-gray-500 uppercase tracking-widest">GUEST NAME</span>
                        <span className="font-serif text-base font-bold text-teal-dark">{booking.name}</span>
                      </div>
                      
                      <div>
                        <span className="block font-mono text-[9px] text-gray-500 uppercase tracking-widest">TABLE FOR</span>
                        <span className="font-sans text-sm font-bold text-teal-dark flex items-center gap-1">
                          <Users size={14} className="text-teal-medium" />
                          {booking.guests} Guests
                        </span>
                      </div>

                      <div className="pt-2">
                        <span className="block font-mono text-[9px] text-gray-500 uppercase tracking-widest">DATE & DAY</span>
                        <span className="font-sans text-sm font-bold text-teal-dark flex items-center gap-1">
                          <Calendar size={14} className="text-teal-medium" />
                          {getDayName(booking.date)}
                        </span>
                      </div>

                      <div className="pt-2">
                        <span className="block font-mono text-[9px] text-gray-500 uppercase tracking-widest">TIME OF ARRIVAL</span>
                        <span className="font-sans text-sm font-bold text-teal-dark flex items-center gap-1">
                          <Clock size={14} className="text-teal-medium" />
                          {booking.time}
                        </span>
                      </div>

                      <div className="col-span-2 pt-2">
                        <span className="block font-mono text-[9px] text-gray-500 uppercase tracking-widest">CONTACT INFO</span>
                        <span className="font-sans text-xs text-gray-600 block">{booking.email}</span>
                        <span className="font-sans text-xs text-gray-600 block">{booking.phone}</span>
                      </div>

                    </div>

                    {/* Dining Notes & Recommendations */}
                    <div className="space-y-3">
                      <div>
                        <span className="font-mono text-[9px] text-gray-500 uppercase tracking-widest block">SPECIAL INSTRUCTIONS</span>
                        <p className="font-sans text-xs text-slate-700 italic">
                          {booking.notes ? `"${booking.notes}"` : '"No special requests provided."'}
                        </p>
                      </div>

                      <div className="p-3 bg-white border border-gold-accent/10 rounded-sm">
                        <span className="font-serif font-bold text-xs text-gold-dark block mb-0.5">💡 Your Culinary Tip:</span>
                        <p className="font-sans text-[10px] text-slate-600 leading-normal">
                          For the perfect dinner flow, we recommend ordering one <strong>Beyaynetu Vegan Platter</strong> and one <strong>Beef Tibs</strong> to share. Eat with your right hand using the Injera as your utensil!
                        </p>
                      </div>
                    </div>

                    {/* QR Code Graphic Section */}
                    <div className="pt-4 flex flex-col items-center border-t border-dashed border-gold-accent/30 space-y-3">
                      <QrCode size={110} className="text-teal-dark bg-white p-1 rounded-sm border border-gold-accent/25" />
                      <span className="font-mono text-[8px] uppercase tracking-widest text-gray-400">
                        SHOW THIS CARD TO HOST ON ARRIVAL
                      </span>
                    </div>

                  </div>

                  {/* Footer Section holding actions to book another or cancel */}
                  <div className="bg-bg-beige/80 px-6 py-4 flex items-center justify-between border-t border-gold-accent/20">
                    <button
                      onClick={() => setShowAnimatedReceipt(false)}
                      className="text-[11px] font-sans font-bold text-teal-medium hover:text-gold-dark flex items-center gap-1 transition-colors uppercase tracking-wider focus:outline-none"
                    >
                      <Ticket size={12} />
                      Book Another
                    </button>
                    
                    <button
                      onClick={handleCancelBooking}
                      className="text-[11px] font-sans font-bold text-red-600 hover:text-red-800 flex items-center gap-1 transition-colors uppercase tracking-wider focus:outline-none"
                    >
                      <Trash2 size={12} />
                      Cancel Table
                    </button>
                  </div>

                  {/* Top-right corner booking tick of authenticity */}
                  <div className="absolute top-4 right-4 text-[9px] font-mono px-2 py-0.5 rounded-full bg-teal-dark border border-gold-accent text-gold-accent leading-none font-bold uppercase tracking-wider flex items-center gap-1 select-none">
                    <ShieldCheck size={10} />
                    Verified
                  </div>

                </div>
              </motion.div>

            ) : (

              /* THE BOOKING FORM CONTAINER */
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-12 bg-bg-dark/80 rounded-sm border border-gold-accent/20 overflow-hidden shadow-2xl p-6 md:p-10"
              >
                
                {/* Form Sidebar guidelines (Column 5) */}
                <div className="lg:col-span-5 flex flex-col justify-between space-y-8 lg:border-r lg:border-gray-800 lg:pr-10">
                  <div className="space-y-4">
                    <h3 className="font-serif text-2xl font-semibold text-gold-accent">Dining Guidelines</h3>
                    <p className="font-sans text-xs text-gray-300 leading-relaxed font-normal">
                      We look forward to welcoming you to Abyssinia Bites. Please take note of our guidelines to optimize your culinary experience:
                    </p>
                    <ul className="space-y-3 font-sans text-xs text-gray-300">
                      <li className="flex items-start gap-2.5">
                        <span className="text-gold-accent font-bold mt-0.5">•</span>
                        <span><strong>Teff Injera:</strong> Standard reservation includes our standard organic Teff sourdough bread. Pure 100% white Teff is naturally gluten-free.</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <span className="text-gold-accent font-bold mt-0.5">•</span>
                        <span><strong>Grace Period:</strong> We hold tables for up to 15 minutes past reservation time. Phone us if running late.</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <span className="text-gold-accent font-bold mt-0.5">•</span>
                        <span><strong>Communal Platters:</strong> Groups larger than 8 will be seated at our master circle platters.</span>
                      </li>
                    </ul>
                  </div>

                  {/* Active ticket warning indicator */}
                  {booking && (
                    <div className="p-4 rounded-sm border border-gold-accent/30 bg-gold-accent/5">
                      <p className="font-sans text-[11px] text-gold-accent leading-relaxed">
                        ⚠️ You have an active table reservation for <strong>{booking.guests} guests</strong> on <strong>{booking.date}</strong>.
                      </p>
                      <button
                        onClick={() => setShowAnimatedReceipt(true)}
                        className="mt-2 text-xs font-mono font-bold text-white hover:text-gold-accent underline flex items-center gap-1 focus:outline-none"
                      >
                        <Ticket size={12} />
                        View Active Ticket Card
                      </button>
                    </div>
                  )}

                  {/* Authentic Stamp Graphic */}
                  <div className="hidden lg:block border-t border-gray-800/80 pt-6">
                    <div className="flex items-center gap-3">
                      <div className="font-serif text-3xl text-gray-600 font-bold select-none italic tracking-wider">
                        BUNA
                      </div>
                      <div className="h-4 w-[1px] bg-gray-800" />
                      <div className="font-sans text-[10px] text-gray-500 tracking-widest uppercase">
                        Abyssinia Bites Hospitality
                      </div>
                    </div>
                  </div>
                </div>

                {/* Main Form Fields area (Column 7) */}
                <form id="reservation-booking-form" onSubmit={handleFormSubmit} className="lg:col-span-7 space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    
                    {/* Full Name */}
                    <div className="space-y-1.5">
                      <label className="block font-mono text-[10px] uppercase tracking-widest text-gold-accent font-semibold" htmlFor="booking-name">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <input
                          id="booking-name"
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Makeda Solomon"
                          className={`w-full bg-slate-900 border ${
                            errors.name ? 'border-red-500 focus:ring-red-500' : 'border-gray-700 focus:ring-gold-accent'
                          } rounded-sm py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-1 transition-all`}
                        />
                        <User className="absolute left-3.5 top-3 text-gray-500" size={15} />
                      </div>
                      {errors.name && <p className="font-sans text-[10px] text-red-500">{errors.name}</p>}
                    </div>

                    {/* Email Addr */}
                    <div className="space-y-1.5">
                      <label className="block font-mono text-[10px] uppercase tracking-widest text-gold-accent font-semibold" htmlFor="booking-email">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <input
                          id="booking-email"
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="solomon@example.com"
                          className={`w-full bg-slate-900 border ${
                            errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-700 focus:ring-gold-accent'
                          } rounded-sm py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-1 transition-all`}
                        />
                        <Mail className="absolute left-3.5 top-3.5 text-gray-500" size={14} />
                      </div>
                      {errors.email && <p className="font-sans text-[10px] text-red-500">{errors.email}</p>}
                    </div>

                    {/* Phone Number */}
                    <div className="space-y-1.5">
                      <label className="block font-mono text-[10px] uppercase tracking-widest text-gold-accent font-semibold" htmlFor="booking-phone">
                        Phone Number <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <input
                          id="booking-phone"
                          type="text"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="+251 911 234 567"
                          className={`w-full bg-slate-900 border ${
                            errors.phone ? 'border-red-500 focus:ring-red-500' : 'border-gray-700 focus:ring-gold-accent'
                          } rounded-sm py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-1 transition-all`}
                        />
                        <Phone className="absolute left-3.5 top-3.5 text-gray-500" size={14} />
                      </div>
                      {errors.phone && <p className="font-sans text-[10px] text-red-500">{errors.phone}</p>}
                    </div>

                    {/* Number of Guests */}
                    <div className="space-y-1.5">
                      <label className="block font-mono text-[10px] uppercase tracking-widest text-gold-accent font-semibold" htmlFor="booking-guests">
                        Number of Guests <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <select
                          id="booking-guests"
                          name="guests"
                          value={formData.guests}
                          onChange={handleInputChange}
                          className="w-full bg-slate-900 border border-gray-700 rounded-sm py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-gold-accent text-white"
                        >
                          {Array.from({ length: 14 }, (_, i) => i + 1).map((num) => (
                            <option key={num} value={num} className="bg-slate-900 text-white">
                              {num} {num === 1 ? 'Guest' : 'Guests'}
                            </option>
                          ))}
                        </select>
                        <Users className="absolute left-3.5 top-3.5 text-gray-500" size={14} />
                      </div>
                    </div>

                    {/* Booking Date */}
                    <div className="space-y-1.5">
                      <label className="block font-mono text-[10px] uppercase tracking-widest text-gold-accent font-semibold" htmlFor="booking-date">
                        Reservation Date <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <input
                          id="booking-date"
                          type="date"
                          name="date"
                          value={formData.date}
                          onChange={handleInputChange}
                          min="2026-05-22"
                          className="w-full bg-slate-900 border border-gray-700 rounded-sm py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-gold-accent text-white"
                        />
                        <Calendar className="absolute left-3.5 top-3.5 text-gray-500" size={14} />
                      </div>
                    </div>

                    {/* Seating Time */}
                    <div className="space-y-1.5">
                      <label className="block font-mono text-[10px] uppercase tracking-widest text-gold-accent font-semibold" htmlFor="booking-time">
                        Seating Time <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <select
                          id="booking-time"
                          name="time"
                          value={formData.time}
                          onChange={handleInputChange}
                          className="w-full bg-slate-900 border border-gray-700 rounded-sm py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-gold-accent text-white"
                        >
                          {['17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30', '22:00'].map((slot) => (
                            <option key={slot} value={slot} className="bg-slate-900 text-white">
                              {slot} PM
                            </option>
                          ))}
                        </select>
                        <Clock className="absolute left-3.5 top-3.5 text-gray-500" size={14} />
                      </div>
                    </div>

                  </div>

                  {/* Special Requests */}
                  <div className="space-y-1.5">
                    <label className="block font-mono text-[10px] uppercase tracking-widest text-gold-accent font-semibold" htmlFor="booking-notes">
                      Special Dietary Requests (Optional)
                    </label>
                    <textarea
                      id="booking-notes"
                      name="notes"
                      value={formData.notes}
                      onChange={handleInputChange}
                      rows={3}
                      placeholder="e.g. Please seat us near the coffee ceremony station, gluten-free requests, celebration etc."
                      className="w-full bg-slate-900 border border-gray-700 focus:border-gold-accent rounded-sm py-2.5 px-4 text-sm focus:outline-none focus:ring-1 focus:ring-gold-accent"
                    />
                  </div>

                  {/* Submit Button with loading progress ring */}
                  <motion.button
                    id="booking-submit-btn"
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gold-accent hover:bg-gold-light text-bg-dark font-sans text-xs tracking-widest uppercase font-bold py-4 rounded-none transition-all duration-300 shadow-md hover:shadow-xl hover:shadow-gold-accent/35 hover:ring-2 hover:ring-gold-accent hover:ring-offset-2 hover:ring-offset-slate-900 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-55"
                    animate={isSubmitting ? {
                      scale: [1, 1.02, 1],
                      opacity: [1, 0.8, 1],
                      boxShadow: [
                        "0 0 0 0px rgba(212, 175, 55, 0)",
                        "0 0 0 6px rgba(212, 175, 55, 0.55)",
                        "0 0 0 0px rgba(212, 175, 55, 0)"
                      ]
                    } : {}}
                    transition={isSubmitting ? {
                      duration: 1.2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    } : undefined}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="relative flex items-center justify-center w-4 h-4 shrink-0">
                          <svg className="w-full h-full -rotate-90" viewBox="0 0 32 32">
                            {/* Background Track */}
                            <circle
                              cx="16"
                              cy="16"
                              r={10}
                              className="stroke-bg-dark/15"
                              strokeWidth="3.5"
                              fill="transparent"
                            />
                            {/* Animated Progress Ring */}
                            <motion.circle
                              cx="16"
                              cy="16"
                              r={10}
                              className="stroke-bg-dark"
                              strokeWidth="3.5"
                              strokeLinecap="round"
                              fill="transparent"
                              strokeDasharray={2 * Math.PI * 10}
                              initial={{ strokeDashoffset: 2 * Math.PI * 10 }}
                              animate={{ strokeDashoffset: 2 * Math.PI * 10 - (submissionProgress / 100) * (2 * Math.PI * 10) }}
                              transition={{ duration: 0.05, ease: "linear" }}
                            />
                          </svg>
                        </div>
                        Securing Seating ({Math.round(submissionProgress)}%)
                      </>
                    ) : (
                      <>
                        <Calendar size={14} />
                        Confirm Secure Seating
                      </>
                    )}
                  </motion.button>

                  <p className="font-sans text-[10px] text-gray-400 text-center">
                    🔒 Rest assured, your reservation is instantaneously locked and saved safely.
                  </p>
                </form>

              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
