/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, Clock, Users, User, Mail, Phone, MessageSquare, CheckCircle, ShieldAlert, ListFilter, Trash2, Check, X, Award } from 'lucide-react';
import { Reservation } from '../types';
import { RESTAURANT_INFO } from '../data';

export default function BookingForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [guests, setGuests] = useState(2);
  const [notes, setNotes] = useState('');
  
  // App states
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [latestBooking, setLatestBooking] = useState<Reservation | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);
  
  // Custom states for demo admin console
  const [isAdminView, setIsAdminView] = useState(false);
  const [adminFilter, setAdminFilter] = useState<'all' | 'pending' | 'confirmed' | 'cancelled'>('all');

  // Load existing reservations from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('la_pendola_bookings');
    if (saved) {
      try {
        setReservations(JSON.parse(saved));
      } catch (e) {
        console.error('Error parsing reservations', e);
      }
    } else {
      // Seed initial dummy reservation for owner view demo
      const initialDummy: Reservation = {
        id: 'B-8421',
        name: 'Famiglia Rossi',
        email: 'elena.rossi@outlook.it',
        phone: '339 1234567',
        date: new Date(Date.now() + 86400000).toISOString().split('T')[0], // tomorrow
        time: '20:30',
        guests: 4,
        notes: 'Un seggiolone per un bimbo piccolo, grazie!',
        status: 'confirmed',
        createdAt: new Date().toISOString(),
      };
      setReservations([initialDummy]);
      localStorage.setItem('la_pendola_bookings', JSON.stringify([initialDummy]));
    }
  }, []);

  // Save reservations to localStorage
  const saveReservations = (updated: Reservation[]) => {
    setReservations(updated);
    localStorage.setItem('la_pendola_bookings', JSON.stringify(updated));
  };

  // Restrict date selection to today or future
  const getMinDate = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  };

  // Handle day of week closed check
  const handleDateChange = (selectedDate: string) => {
    setDate(selectedDate);
    setValidationError(null);

    const dayOfWeek = new Date(selectedDate).getDay(); // 0 is Sunday, 1 is Monday...
    if (dayOfWeek === 1) {
      setValidationError('Attenzione: Il ristorante è chiuso il Lunedì! Scegli un altro giorno da Martedì a Domenica.');
    }
  };

  // Booking submit handler
  const handleSubmitBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    if (!name || !email || !phone || !date || !time) {
      setValidationError('Per favore, compila tutti i campi obbligatori.');
      return;
    }

    const dayOfWeek = new Date(date).getDay();
    if (dayOfWeek === 1) {
      setValidationError('Ci spiace, siamo chiusi ogni Lunedì. Seleziona un’altra data.');
      return;
    }

    // Sunday special check: Lunch is 12:00-14:30, dinner is 19:00-23:30. Other days only dinner from 19:00.
    const hour = parseInt(time.split(':')[0]);
    const minutes = parseInt(time.split(':')[1]);
    const isLunch = hour < 16;

    if (dayOfWeek !== 0 && isLunch) {
      setValidationError('Siamo aperti a pranzo solo la Domenica (ore 12:00 - 14:30). Da Martedì a Sabato siamo aperti solo a cena a partire dalle 19:00.');
      return;
    }

    // Setup new reservation
    const newId = `B-${Math.floor(1000 + Math.random() * 9000)}`;
    const newBooking: Reservation = {
      id: newId,
      name,
      email,
      phone,
      date,
      time,
      guests,
      notes: notes.trim() || undefined,
      status: 'pending', // Pending confirmation
      createdAt: new Date().toISOString(),
    };

    const updated = [newBooking, ...reservations];
    saveReservations(updated);

    // Trigger success animations
    setLatestBooking(newBooking);
    setFormSubmitted(true);

    // Reset fields except contact to ease multiple bookings
    setName('');
    setNotes('');
  };

  const handleCancelBooking = (id: string) => {
    const updated = reservations.map((res) => 
      res.id === id ? { ...res, status: 'cancelled' as const } : res
    );
    saveReservations(updated);
  };

  const handleDeleteBooking = (id: string) => {
    const updated = reservations.filter((res) => res.id !== id);
    saveReservations(updated);
  };

  // Administrator tools: toggle states
  const handleSetStatus = (id: string, newStatus: 'confirmed' | 'cancelled' | 'pending') => {
    const updated = reservations.map((res) => 
      res.id === id ? { ...res, status: newStatus } : res
    );
    saveReservations(updated);
  };

  const filteredReservationsForAdmin = reservations.filter((res) => {
    if (adminFilter === 'all') return true;
    return res.status === adminFilter;
  });

  // Render Time slots options
  const lunchTimeSlots = ['12:00', '12:30', '13:00', '13:30', '14:00'];
  const dinnerTimeSlots = ['19:00', '19:30', '20:00', '20:30', '21:00', '21:30', '22:00', '22:30', '23:00'];

  const selectedDayNum = date ? new Date(date).getDay() : -1;
  const showLunch = selectedDayNum === 0; // Only Sunday lunch available

  return (
    <section className="py-16 md:py-24 bg-white text-left" id="booking-main-page">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Toggle between Booking as a Guest & Administrator portal */}
        <div className="flex justify-between items-center mb-10 border-b border-brand-sand pb-4">
          <div>
            <span className="text-xs font-mono font-bold tracking-[0.2em] text-[#B35A38] uppercase block">
              SISTEMA PRENOTAZIONI
            </span>
            <span className="font-serif text-2xl sm:text-3xl font-light text-brand-dark block mt-1">
              {isAdminView ? 'Pannello Gestione Proprietario' : 'Richiedi un Tavolo'}
            </span>
          </div>
          <button
            onClick={() => {
              setIsAdminView(!isAdminView);
              setFormSubmitted(false);
            }}
            id="admin-toggle-button"
            className="px-4 py-2.5 bg-brand-cream hover:bg-brand-terracotta hover:text-white border border-brand-sand rounded-none text-[10px] font-bold font-mono tracking-widest uppercase text-brand-dark cursor-pointer transition-all shrink-0"
          >
            {isAdminView ? '← Torna a Cliente' : 'Gestione Locale'}
          </button>
        </div>

        {/* ADMIN VIEW MODE */}
        {isAdminView ? (
          <div className="space-y-6" id="owner-admin-dashboard">
            {/* Warning explain card */}
            <div className="bg-brand-cream border-l border-brand-terracotta p-5 rounded-none space-y-2">
              <div className="flex items-center space-x-2 text-brand-dark font-bold font-serif text-sm">
                <Award className="w-4 h-4 text-brand-terracotta" />
                <span className="tracking-tight italic font-normal">Simulatore Gestionale La Pendola</span>
              </div>
              <p className="text-xs text-[#4a4a4a] leading-relaxed">
                Questo pannello interattivo mostra in tempo reale le prenotazioni dei clienti salvate sul browser. Un ristoratore reale può esaminare le richieste, confermarle per assegnare un tavolo, o cancellarle per notificare la clientela. Prova a inserire un record per vederlo comparire qui sotto!
              </p>
            </div>

            {/* Filter buttons */}
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between bg-white px-6 py-4 rounded-none border border-brand-sand">
              <div className="flex flex-wrap gap-2">
                {(['all', 'pending', 'confirmed', 'cancelled'] as const).map((f) => (
                  <button
                    key={f}
                    onClick={() => setAdminFilter(f)}
                    className={`px-3 py-1.5 rounded-none text-[9px] font-bold uppercase tracking-[0.15em] border transition-colors cursor-pointer ${
                      adminFilter === f
                        ? 'bg-brand-terracotta border-brand-terracotta text-white'
                        : 'bg-white border-brand-sand text-[#6B6B6B] hover:border-brand-terracotta/50'
                    }`}
                  >
                    {f === 'all' ? 'Tutte' : f === 'pending' ? 'Sospese' : f === 'confirmed' ? 'Confermate' : 'Annullate'}
                  </button>
                ))}
              </div>
              <span className="text-[10px] font-mono font-bold tracking-wider text-gray-400">
                TOTALI: {filteredReservationsForAdmin.length} RICHIESTE
              </span>
            </div>

            {/* Reservations table */}
            <div className="bg-white rounded-none border border-brand-sand overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-brand-cream border-b border-brand-sand text-[10px] font-bold text-brand-dark/70 uppercase tracking-widest font-mono">
                      <th className="p-4">Codice / Data</th>
                      <th className="p-4">Ospite</th>
                      <th className="p-4">Contatti</th>
                      <th className="p-4 text-center">Persone / Ora</th>
                      <th className="p-4">Note Speciali</th>
                      <th className="p-4 text-center">Stato</th>
                      <th className="p-4 text-right">Azioni</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredReservationsForAdmin.map((res) => (
                      <tr key={res.id} className="border-b border-brand-sand hover:bg-[#FDFCF8]/60 text-sm">
                        <td className="p-4">
                          <span className="font-mono font-bold text-brand-terracotta block">{res.id}</span>
                          <span className="text-[10px] text-gray-500 font-mono block mt-0.5">{res.date}</span>
                        </td>
                        <td className="p-4 font-serif font-bold text-brand-dark font-normal">
                          {res.name}
                        </td>
                        <td className="p-4 text-xs font-mono text-gray-600">
                          <div className="block">{res.phone}</div>
                          <div className="block mt-0.5 text-gray-400">{res.email}</div>
                        </td>
                        <td className="p-4 text-center">
                          <span className="inline-flex items-center justify-center font-bold px-2 py-1 bg-brand-olive/10 border border-brand-olive/20 text-brand-olive rounded-none text-[10px]">
                            {res.guests} Coperti
                          </span>
                          <span className="block text-[10px] font-mono font-bold mt-1 text-brand-dark/70">
                            ore {res.time}
                          </span>
                        </td>
                        <td className="p-4 text-xs text-gray-600 max-w-xs truncate" title={res.notes}>
                          {res.notes || <span className="text-gray-300 italic">Nessuna nota</span>}
                        </td>
                        <td className="p-4 text-center">
                          <span className={`inline-block px-2.5 py-1 rounded-none text-[8px] font-bold uppercase tracking-widest font-mono ${
                            res.status === 'confirmed'
                              ? 'bg-green-50 border border-green-200 text-green-800'
                              : res.status === 'cancelled'
                              ? 'bg-rose-50 border border-rose-200 text-rose-800'
                              : 'bg-amber-50 border border-amber-200 text-amber-800'
                          }`}>
                            {res.status === 'confirmed' ? 'Confermata' : res.status === 'cancelled' ? 'Annullata' : 'In attesa'}
                          </span>
                        </td>
                        <td className="p-4 text-right space-x-1.5 whitespace-nowrap">
                          {res.status !== 'confirmed' && (
                            <button
                              onClick={() => handleSetStatus(res.id, 'confirmed')}
                              title="Conferma prenotazione"
                              className="p-1.5 rounded-none border border-brand-sand bg-white hover:border-brand-terracotta/60 text-emerald-600 transition-colors cursor-pointer"
                            >
                              <Check className="w-4 h-4" />
                            </button>
                          )}
                          {res.status !== 'cancelled' && (
                            <button
                              onClick={() => handleSetStatus(res.id, 'cancelled')}
                              title="Annulla prenotazione"
                              className="p-1.5 rounded-none border border-brand-sand bg-white hover:border-brand-terracotta/60 text-rose-600 transition-colors cursor-pointer"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          )}
                          <button
                            onClick={() => handleDeleteBooking(res.id)}
                            title="Elimina"
                            className="p-1.5 rounded-none border border-brand-sand bg-white text-gray-500 hover:text-brand-terracotta transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}

                    {filteredReservationsForAdmin.length === 0 && (
                      <tr>
                        <td colSpan={7} className="p-8 text-center text-gray-400 font-serif italic text-base">
                          Nessuna prenotazione registrata in questa categoria.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ) : (
          /* GUEST/CUSTOMER VIEW MODE */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* The Booking Form Column */}
            <div className="lg:col-span-7 bg-[#FDFCF8] rounded-none p-6 sm:p-10 border border-brand-sand">
              
              <AnimatePresence mode="wait">
                {formSubmitted && latestBooking ? (
                  /* Success Feedback Animation block */
                  <motion.div
                    key="success-form"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center py-8 space-y-6"
                    id="booking-success-container"
                  >
                    <div className="w-16 h-16 rounded-none border border-brand-sand bg-white flex items-center justify-center text-emerald-600 mx-auto">
                      <CheckCircle className="w-10 h-10" />
                    </div>
                    <div className="space-y-2">
                      <span className="font-serif text-2xl sm:text-3xl font-normal text-brand-dark block">Richiesta Ricevuta!</span>
                      <p className="text-xs text-gray-500 max-w-md mx-auto">
                        Grazie <strong className="text-brand-dark">{latestBooking.name}</strong>. Abbiamo preso in carico la tua prenotazione per il giorno <strong className="text-brand-dark">{latestBooking.date}</strong> alle ore <strong className="text-brand-dark">{latestBooking.time}</strong>.
                      </p>
                    </div>

                    {/* Digital Receipt styled block */}
                    <div className="bg-white rounded-none p-5 border border-brand-sand max-w-sm mx-auto text-left space-y-3 font-mono text-[10px]">
                      <div className="flex justify-between border-b border-dashed border-brand-sand pb-2 text-brand-dark font-bold font-serif text-xs">
                        <span className="italic font-normal">Ricevuta Digitale</span>
                        <span className="text-brand-terracotta uppercase tracking-wide">{latestBooking.id}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Ospite:</span>
                        <span className="font-semibold text-brand-dark">{latestBooking.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Tavolo da:</span>
                        <span className="font-bold text-brand-olive">{latestBooking.guests} Persone</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Data / Ora:</span>
                        <span className="font-bold text-brand-dark">{latestBooking.date} &bull; {latestBooking.time}</span>
                      </div>
                      <div className="flex justify-between border-t border-dashed border-brand-sand pt-2 text-[9px]">
                        <span className="text-gray-400">Stato:</span>
                        <span className="text-amber-700 font-bold uppercase tracking-widest animate-pulse">
                          Attesa Conferma
                        </span>
                      </div>
                    </div>

                    <div className="pt-4 space-y-4">
                      <p className="text-[10px] uppercase font-mono tracking-wider text-gray-400 max-w-xs mx-auto">
                        Tip: Puoi approvare immediatamente questo tavolo cliccando in alto a destra su "Gestione Locale"!
                      </p>
                      <button
                        onClick={() => setFormSubmitted(false)}
                        className="bg-brand-terracotta hover:bg-[#9c4c2d] text-white font-bold font-mono text-[10px] tracking-widest uppercase px-6 py-3.5 rounded-none transition-colors cursor-pointer"
                      >
                        Prenota un altro tavolo
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  /* Standard Reservation Form */
                  <form key="reservation-form" onSubmit={handleSubmitBooking} className="space-y-6" id="table-reservation-form">
                    <div className="space-y-2">
                      <span className="text-xs font-mono font-bold text-brand-terracotta uppercase tracking-[0.2em] block">
                        COMPILA I CAMPI
                      </span>
                      <h3 className="font-serif text-2xl sm:text-3xl font-normal text-brand-dark">Richiedi un Tavolo</h3>
                      <p className="text-xs text-gray-500 leading-relaxed">
                        La prenotazione garantisce il tavolo per tutta la serata. Riceverai conferme in tempi brevissimi. Servizio coperto & pane artigianale inclusi.
                      </p>
                    </div>

                    {/* Alerts panel */}
                    {validationError && (
                      <div className="bg-rose-50 border-l border-rose-500 text-rose-700 p-4 rounded-none text-xs flex items-start space-x-2" id="booking-error-badge">
                        <ShieldAlert className="w-5 h-5 shrink-0" />
                        <span>{validationError}</span>
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Name input */}
                      <div className="space-y-1.5 text-left">
                        <label className="text-[10px] font-bold text-brand-dark uppercase tracking-wider font-sans block">
                          Nome e Cognome *
                        </label>
                        <div className="relative">
                          <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                          <input
                            type="text"
                            required
                            value={name}
                            onChange={(e) => {
                              setName(e.target.value);
                              setValidationError(null);
                            }}
                            placeholder="Es: Maria Rossi"
                            id="book-input-name"
                            className="w-full pl-10 pr-4 py-3 bg-white border border-brand-sand rounded-none text-xs focus:outline-none focus:border-brand-terracotta text-brand-dark font-medium"
                          />
                        </div>
                      </div>

                      {/* Phone input */}
                      <div className="space-y-1.5 text-left">
                        <label className="text-[10px] font-bold text-brand-dark uppercase tracking-wider font-sans block">
                          Telefono *
                        </label>
                        <div className="relative">
                          <Phone className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                          <input
                            type="tel"
                            required
                            value={phone}
                            onChange={(e) => {
                              setPhone(e.target.value);
                              setValidationError(null);
                            }}
                            placeholder="Es: 339 1234567"
                            id="book-input-phone"
                            className="w-full pl-10 pr-4 py-3 bg-white border border-brand-sand rounded-none text-xs focus:outline-none focus:border-brand-terracotta text-brand-dark font-medium"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Email input */}
                    <div className="space-y-1.5 text-left">
                      <label className="text-[10px] font-bold text-brand-dark uppercase tracking-wider font-sans block">
                        Indirizzo Email *
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                            setValidationError(null);
                          }}
                          placeholder="Es: maria.rossi@email.it"
                          id="book-input-email"
                          className="w-full pl-10 pr-4 py-3 bg-white border border-brand-sand rounded-none text-xs focus:outline-none focus:border-brand-terracotta text-brand-dark font-medium"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {/* Date Select */}
                      <div className="space-y-1.5 text-left col-span-1 sm:col-span-2">
                        <label className="text-[10px] font-bold text-brand-dark uppercase tracking-wider font-sans block">
                          Seleziona Data * (Chiuso Lunedì)
                        </label>
                        <div className="relative">
                          <Calendar className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                          <input
                            type="date"
                            required
                            min={getMinDate()}
                            value={date}
                            onChange={(e) => handleDateChange(e.target.value)}
                            id="book-input-date"
                            className="w-full pl-10 pr-4 py-3 bg-white border border-brand-sand rounded-none text-xs focus:outline-none focus:border-brand-terracotta text-brand-dark font-medium cursor-pointer"
                          />
                        </div>
                      </div>

                      {/* Count of guests */}
                      <div className="space-y-1.5 text-left">
                        <label className="text-[10px] font-bold text-brand-dark uppercase tracking-wider font-sans block">
                          Coperti *
                        </label>
                        <div className="relative">
                          <Users className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                          <select
                            value={guests}
                            onChange={(e) => setGuests(parseInt(e.target.value))}
                            id="book-input-guests"
                            className="w-full pl-10 pr-4 py-3 bg-white border border-brand-sand rounded-none text-xs focus:outline-none focus:border-brand-terracotta text-brand-dark appearance-none font-medium cursor-pointer"
                          >
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((num) => (
                              <option key={num} value={num}>{num} {num === 1 ? 'persona' : 'persone'}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* Time option select */}
                    <div className="space-y-3 text-left">
                      <label className="text-[10px] font-bold text-brand-dark uppercase tracking-wider font-sans block">
                        Orario desiderato * {showLunch && <span className="text-brand-olive text-[9px] lowercase font-semibold font-mono tracking-normal">(Pranzo Domenica disponibile)</span>}
                      </label>
                      
                      <div className="space-y-3">
                        {/* Render lunch only on Sundays */}
                        {showLunch && (
                          <div className="border-b border-dashed border-brand-sand pb-4">
                            <span className="text-[9px] text-gray-400 font-mono font-bold block uppercase tracking-widest mb-2">PRANZO DOMENICALE</span>
                            <div className="flex flex-wrap gap-2">
                              {lunchTimeSlots.map((slot) => (
                                <button
                                  type="button"
                                  key={slot}
                                  onClick={() => { setTime(slot); setValidationError(null); }}
                                  className={`px-3 py-2 rounded-none text-[10px] font-bold transition-all border cursor-pointer ${
                                    time === slot 
                                      ? 'bg-brand-olive border-brand-olive text-white shadow-sm' 
                                      : 'bg-white border-brand-sand hover:border-brand-olive text-brand-dark hover:bg-brand-cream/10'
                                  }`}
                                >
                                  {slot}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}

                        <div>
                          <span className="text-[9px] text-gray-400 font-mono font-bold block uppercase tracking-widest mb-2">SERVIZIO SERA</span>
                          <div className="flex flex-wrap gap-2">
                            {dinnerTimeSlots.map((slot) => (
                              <button
                                type="button"
                                key={slot}
                                onClick={() => { setTime(slot); setValidationError(null); }}
                                className={`px-3 py-2 rounded-none text-[10px] font-bold transition-all border cursor-pointer ${
                                  time === slot 
                                    ? 'bg-brand-terracotta border-brand-terracotta text-white shadow-sm' 
                                    : 'bg-white border-brand-sand hover:border-brand-terracotta text-brand-dark hover:bg-brand-cream/10'
                                }`}
                              >
                                {slot}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Special requests Notes */}
                    <div className="space-y-1.5 text-left">
                      <div className="flex justify-between items-center">
                        <label className="text-[10px] font-bold text-brand-dark uppercase tracking-wider block">
                          Richieste Speciali / Note
                        </label>
                        <span className="text-[10px] text-gray-400 font-mono">Opzionale</span>
                      </div>
                      <div className="relative">
                        <MessageSquare className="w-4 h-4 absolute left-3 top-3.5 text-gray-400" />
                        <textarea
                          rows={3}
                          value={notes}
                          onChange={(e) => setNotes(e.target.value)}
                          placeholder="Es: Allergia al glutine, seggiolone per bambini, preferenza tavolo appartato..."
                          id="book-input-notes"
                          className="w-full pl-10 pr-4 py-3 bg-white border border-brand-sand rounded-none text-xs focus:outline-none focus:border-brand-terracotta text-brand-dark resize-none font-medium"
                        ></textarea>
                      </div>
                    </div>

                    {/* Book now Submit Button */}
                    <button
                      type="submit"
                      id="book-submit-btn"
                      className="w-full bg-brand-terracotta hover:bg-[#9c4c2d] text-white font-bold py-4 rounded-none font-mono text-[10px] tracking-widest uppercase transition-colors cursor-pointer flex items-center justify-center space-x-2"
                    >
                      <Check className="w-4 h-4 mr-1" />
                      <span>Richiedi Prenotazione Tavolo</span>
                    </button>
                  </form>
                )}
              </AnimatePresence>

            </div>

            {/* Sidebar Column: Displaying client active reservations checklist */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Guidelines Info card */}
              <div className="bg-brand-cream text-brand-dark p-7 rounded-none border border-brand-sand space-y-4">
                <span className="px-2.5 py-0.5 rounded-none bg-brand-terracotta text-white text-[9px] font-bold uppercase tracking-widest font-mono">
                  LINEE GUIDA
                </span>
                <h4 className="font-serif text-lg font-bold">Informazioni sul Servizio</h4>
                
                <ul className="space-y-3.5 text-xs text-gray-600 leading-relaxed">
                  <li className="flex items-start space-x-2">
                    <span className="text-brand-terracotta font-bold mr-1">•</span>
                    <span><strong>Nessun costo anticipato</strong>: Prenotare tramite il nostro portale è totalmente gratuito ed immediato.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-brand-terracotta font-bold mr-1">•</span>
                    <span><strong>Ritardi</strong>: Manteniamo il tavolo riservato fino a un massimo di 20 minuti dall'orario stabilito.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-brand-terracotta font-bold mr-1">•</span>
                    <span><strong>Gruppi numerosi</strong>: Se hai bisogno di organizzare tavolate oltre i 12 coperti, contattaci al numero <strong>0372 27707</strong>.</span>
                  </li>
                </ul>
              </div>

              {/* My active Bookings checklist */}
              <div className="bg-[#FDFCF8] border border-brand-sand rounded-none p-6 space-y-4" id="guest-my-reservations-tracker">
                <h4 className="font-serif text-lg font-bold text-brand-dark flex items-center justify-between">
                  <span>Le Tue Prenotazioni</span>
                  <span className="text-[10px] bg-white border border-brand-sand px-2 py-0.5 rounded-none font-mono text-brand-olive font-bold">
                    {reservations.length}
                  </span>
                </h4>
                
                <div className="space-y-3 max-h-[17rem] overflow-y-auto no-scrollbar pr-1">
                  {reservations.map((res) => (
                    <div key={res.id} className="p-4 bg-white rounded-none border border-brand-sand text-xs flex justify-between items-center">
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                           <span className="font-mono font-bold text-brand-terracotta text-[11px]">{res.id}</span>
                           <span className={`px-1.5 py-0.5 rounded-none text-[7px] font-extrabold uppercase font-mono border ${
                             res.status === 'confirmed'
                               ? 'bg-green-50 border-green-200 text-green-800'
                               : res.status === 'cancelled'
                               ? 'bg-rose-50 border-rose-200 text-rose-800'
                               : 'bg-amber-50 border-amber-200 text-amber-800'
                           }`}>
                             {res.status === 'confirmed' ? 'Confermata' : res.status === 'cancelled' ? 'Annullata' : 'In attesa'}
                           </span>
                        </div>
                        <span className="block font-bold text-brand-dark text-xs">{res.name} &bull; {res.guests} Coperti</span>
                        <span className="block text-gray-400 font-mono text-[9px]">{res.date} alle ore {res.time}</span>
                      </div>

                      <div className="flex flex-col space-y-1 items-end shrink-0">
                        {res.status === 'pending' && (
                          <button
                            onClick={() => handleCancelBooking(res.id)}
                            className="px-2.5 py-1 rounded-none border border-rose-200 bg-rose-50 hover:bg-rose-100 text-rose-600 font-bold transition-all text-[9.5px] uppercase tracking-wider cursor-pointer font-mono"
                          >
                            Annulla
                          </button>
                        )}
                        <button
                          onClick={() => handleDeleteBooking(res.id)}
                          className="p-1 text-gray-400 hover:text-brand-terracotta cursor-pointer transition-colors"
                          title="Rimuovi dallo storico"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}

                  {reservations.length === 0 && (
                    <div className="text-center py-6 text-gray-400 italic font-serif text-sm">
                      Non hai ancora effettuato prenotazioni su questo browser.
                    </div>
                  )}
                </div>
              </div>

            </div>

          </div>
        )}

      </div>
    </section>
  );
}
